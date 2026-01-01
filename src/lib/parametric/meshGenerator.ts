// Parametric mesh generator - creates hull geometry from curves

import * as THREE from "three";
import { HullParams } from "./types";
import { evalBeamCurve, evalKeelCurve, evalDeckCurve, lerp, smoothstep } from "./curves";

export interface GeneratedMesh {
  geometry: THREE.BufferGeometry;
  vertexCount: number;
  triangleCount: number;
}

// Section law F(s) - determines cross-section shape
function sectionLaw(s: number, params: {
  vDepth: number;
  deadrise: number;
  bilgeRadius: number;
  chineSharpness: number;
  flare: number;
  railRadius: number;
}): number {
  const { vDepth, deadrise, bilgeRadius, chineSharpness, flare, railRadius } = params;
  
  // Base power curve
  const bodyPow = lerp(0.7, 2.5, 0.5);
  let t0 = Math.pow(s, bodyPow);
  
  // V-hull component - steeper rise near centerline
  const q = lerp(1.5, 4, deadrise);
  const tV = 1 - Math.pow(1 - s, q);
  
  // Blend base and V based on vDepth
  let t = lerp(t0, tV, vDepth);
  
  // Bilge/chine knee shaping
  const kneePos = lerp(0.3, 0.6, bilgeRadius);
  const kneeSharpness = lerp(1, 3, chineSharpness);
  
  if (s < kneePos) {
    // Bottom region
    const s0 = s / kneePos;
    t = Math.pow(s0, kneeSharpness) * 0.3;
  } else {
    // Side region
    const s1 = (s - kneePos) / (1 - kneePos);
    const sideT = 0.3 + 0.7 * (1 - Math.pow(1 - s1, 1.5));
    t = sideT;
  }
  
  // Flare adjustment
  if (s > 0.5) {
    const flareS = (s - 0.5) / 0.5;
    t += flare * 0.1 * flareS;
  }
  
  // Rail rounding
  if (s > 0.85) {
    const railS = (s - 0.85) / 0.15;
    const railBlend = smoothstep(0, 1, railS);
    t = lerp(t, 1, railBlend * railRadius);
  }
  
  return Math.max(0, Math.min(1, t));
}

export function generateHullMesh(params: HullParams, Nu: number = 64, Nv: number = 32): GeneratedMesh {
  const { length } = params;
  
  const positions: number[] = [];
  const normals: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];
  
  // Generate vertices for both sides (mirrored)
  for (let side = -1; side <= 1; side += 2) {
    for (let i = 0; i <= Nu; i++) {
      const u = i / Nu;
      const x = (u - 0.5) * length; // Center at origin
      
      // Evaluate curves at this station
      const b = evalBeamCurve(u, params);
      const yK = evalKeelCurve(u, params);
      const yD = evalDeckCurve(u, params);
      
      for (let j = 0; j <= Nv; j++) {
        const s = j / Nv;
        const z = side * s * b;
        
        // Section law determines height fraction
        const t = sectionLaw(s, params);
        const y = yK + (yD - yK) * t;
        
        positions.push(x, y, z);
        
        // UV coordinates
        uvs.push(u, (side + 1) / 2 * 0.5 + s * 0.5);
        
        // Placeholder normals (will compute properly)
        normals.push(0, 1, 0);
      }
    }
  }
  
  // Generate indices for each side
  const vertsPerSide = (Nu + 1) * (Nv + 1);
  
  for (let sideOffset = 0; sideOffset < 2; sideOffset++) {
    const base = sideOffset * vertsPerSide;
    const flip = sideOffset === 1; // Flip winding for other side
    
    for (let i = 0; i < Nu; i++) {
      for (let j = 0; j < Nv; j++) {
        const a = base + i * (Nv + 1) + j;
        const b = base + (i + 1) * (Nv + 1) + j;
        const c = base + (i + 1) * (Nv + 1) + j + 1;
        const d = base + i * (Nv + 1) + j + 1;
        
        if (flip) {
          indices.push(a, c, b);
          indices.push(a, d, c);
        } else {
          indices.push(a, b, c);
          indices.push(a, c, d);
        }
      }
    }
  }
  
  // Create geometry
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  
  // Compute proper normals
  geometry.computeVertexNormals();
  
  return {
    geometry,
    vertexCount: positions.length / 3,
    triangleCount: indices.length / 3,
  };
}

// Generate deck surface
export function generateDeckMesh(params: HullParams, Nu: number = 64, Nv: number = 16): GeneratedMesh {
  const { length } = params;
  
  const positions: number[] = [];
  const normals: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];
  
  for (let i = 0; i <= Nu; i++) {
    const u = i / Nu;
    const x = (u - 0.5) * length;
    
    const b = evalBeamCurve(u, params);
    const yD = evalDeckCurve(u, params);
    
    for (let j = 0; j <= Nv; j++) {
      const s = j / Nv;
      const zNorm = s * 2 - 1; // -1 to 1
      const z = zNorm * b * 0.95; // Slightly inset from rail
      
      // Deck crown (slight curve across)
      const crown = 0.02 * (1 - zNorm * zNorm);
      const y = yD + crown;
      
      positions.push(x, y, z);
      normals.push(0, 1, 0);
      uvs.push(u, s);
    }
  }
  
  // Generate indices
  for (let i = 0; i < Nu; i++) {
    for (let j = 0; j < Nv; j++) {
      const a = i * (Nv + 1) + j;
      const b = (i + 1) * (Nv + 1) + j;
      const c = (i + 1) * (Nv + 1) + j + 1;
      const d = i * (Nv + 1) + j + 1;
      
      indices.push(a, b, c);
      indices.push(a, c, d);
    }
  }
  
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  
  return {
    geometry,
    vertexCount: positions.length / 3,
    triangleCount: indices.length / 3,
  };
}
