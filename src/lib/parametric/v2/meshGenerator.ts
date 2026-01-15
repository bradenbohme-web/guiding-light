// ============================================
// V2 HULL MESH GENERATOR - Simplified
// ============================================
// Hull is a unified surface: V-shape converges to knife edge at bow
// No separate bow cap - bow emerges naturally from beam taper
// Transom fills the stern gap where V is widest

import * as THREE from 'three';
import { HullV2Params, MeshResolution, MESH_RESOLUTIONS } from './types';
import { 
  evalBeamV2, 
  evalKeelV2, 
  evalDeckV2, 
  evalDeckCrownV2,
  sectionLawV2,
  getVAngleFactor,
  lerp,
  smoothstep,
  clamp,
} from './curves';

export interface GeneratedMeshV2 {
  geometry: THREE.BufferGeometry;
  vertexCount: number;
  triangleCount: number;
}

// ============================================
// BOTTOM HULL MESH - Unified surface
// V-shape that converges to knife edge at bow
// Both port and starboard in one continuous mesh
// ============================================

export function generateBottomHullV2(
  params: HullV2Params, 
  resolution: 'low' | 'medium' | 'high' = 'medium'
): GeneratedMeshV2 {
  const { Nu, Nv } = MESH_RESOLUTIONS[resolution];
  const { length } = params.dimensions;
  
  const positions: number[] = [];
  const normals: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];
  
  // Generate vertices: full width mesh (port to starboard)
  // At bow, both sides converge to same vertices on centerline
  for (let i = 0; i <= Nu; i++) {
    const u = i / Nu;
    const x = (u - 0.5) * length;
    
    const halfBeam = evalBeamV2(u, params);
    const yKeel = evalKeelV2(u, params);
    const yDeck = evalDeckV2(u, params);
    const deckCrown = evalDeckCrownV2(u, params);
    const vFactor = getVAngleFactor(u, params);
    
    // Full width: -Nv to +Nv (port to starboard)
    for (let j = -Nv; j <= Nv; j++) {
      const sNorm = j / Nv; // -1 to 1
      const s = Math.abs(sNorm); // 0 to 1 for section law
      
      // Z position based on beam (narrows at bow)
      let z = sNorm * halfBeam;
      
      // Section law determines height fraction
      const t = sectionLawV2(s, u, params);
      let y = yKeel + (yDeck - yKeel) * t;
      
      // Apply deck crown near top
      if (s > 0.85) {
        const crownT = smoothstep(0.85, 1.0, s);
        const normalizedZ = Math.abs(z) / (halfBeam + 0.001);
        const crownOffset = deckCrown * Math.pow(1 - normalizedZ * normalizedZ, params.deck.crownPower);
        y += crownOffset * crownT;
      }
      
      // At extreme bow, ensure convergence to knife edge
      if (vFactor > 0.9) {
        const convergeFactor = (vFactor - 0.9) / 0.1;
        // Push vertices toward centerline
        z *= (1 - convergeFactor * 0.5);
      }
      
      positions.push(x, y, z);
      uvs.push(u, (sNorm + 1) / 2);
      normals.push(0, 1, 0); // Placeholder
    }
  }
  
  const vertsPerRow = 2 * Nv + 1;
  
  // Generate indices
  for (let i = 0; i < Nu; i++) {
    for (let j = 0; j < vertsPerRow - 1; j++) {
      const a = i * vertsPerRow + j;
      const b = (i + 1) * vertsPerRow + j;
      const c = (i + 1) * vertsPerRow + j + 1;
      const d = i * vertsPerRow + j + 1;
      
      // Determine winding based on side
      const jCenter = Nv;
      if (j < jCenter) {
        // Port side
        indices.push(a, c, b);
        indices.push(a, d, c);
      } else {
        // Starboard side
        indices.push(a, b, c);
        indices.push(a, c, d);
      }
    }
  }
  
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  
  return {
    geometry,
    vertexCount: positions.length / 3,
    triangleCount: indices.length / 3,
  };
}

// ============================================
// DECK SHEET MESH
// Flat in side view, crowned at stern
// ============================================

export function generateDeckSheetV2(
  params: HullV2Params,
  resolution: 'low' | 'medium' | 'high' = 'medium'
): GeneratedMeshV2 {
  const { Nu, Nv } = MESH_RESOLUTIONS[resolution];
  const { length } = params.dimensions;
  
  const positions: number[] = [];
  const normals: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];
  
  for (let i = 0; i <= Nu; i++) {
    const u = i / Nu;
    const x = (u - 0.5) * length;
    
    const halfBeam = evalBeamV2(u, params);
    const yDeck = evalDeckV2(u, params);
    const deckCrown = evalDeckCrownV2(u, params);
    
    // Deck inset from rail to match lip attachment
    const lipInset = params.lip.overhang * 0.7;
    
    for (let j = 0; j <= Nv; j++) {
      const s = j / Nv;
      const zNorm = s * 2 - 1; // -1 to 1
      const z = zNorm * (halfBeam - lipInset);
      
      // Apply crown across beam
      const normalizedZ = Math.abs(zNorm);
      const edgeFade = smoothstep(0.85, 1.0, normalizedZ);
      const crownOffset = deckCrown * Math.pow(1 - normalizedZ * normalizedZ, params.deck.crownPower);
      const y = yDeck + crownOffset * (1 - edgeFade * 0.3);
      
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
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  
  return {
    geometry,
    vertexCount: positions.length / 3,
    triangleCount: indices.length / 3,
  };
}

// ============================================
// LIP ELBOW MESH - Around entire perimeter
// ============================================

export function generateLipElbowV2(
  params: HullV2Params,
  resolution: 'low' | 'medium' | 'high' = 'medium'
): GeneratedMeshV2 {
  const { Nu, lipSamples } = MESH_RESOLUTIONS[resolution];
  const { length } = params.dimensions;
  const { overhang, drop, tuckSharpness } = params.lip;
  
  const positions: number[] = [];
  const normals: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];
  
  interface LipPoint {
    x: number;
    y: number;
    z: number;
    nx: number;
    nz: number;
  }
  
  const perimeterPoints: LipPoint[] = [];
  
  // Port side (stern to bow)
  for (let i = 0; i <= Nu; i++) {
    const u = i / Nu;
    const x = (u - 0.5) * length;
    const halfBeam = evalBeamV2(u, params);
    const yDeck = evalDeckV2(u, params);
    const lipInset = overhang * 0.7;
    
    perimeterPoints.push({
      x,
      y: yDeck,
      z: -(halfBeam - lipInset),
      nx: 0,
      nz: -1,
    });
  }
  
  // Starboard side (bow to stern)
  for (let i = Nu; i >= 0; i--) {
    const u = i / Nu;
    const x = (u - 0.5) * length;
    const halfBeam = evalBeamV2(u, params);
    const yDeck = evalDeckV2(u, params);
    const lipInset = overhang * 0.7;
    
    perimeterPoints.push({
      x,
      y: yDeck,
      z: (halfBeam - lipInset),
      nx: 0,
      nz: 1,
    });
  }
  
  // Transom edge (connects back)
  const transomSamples = Math.floor(Nu / 4);
  const sternHalfBeam = evalBeamV2(0, params);
  const sternY = evalDeckV2(0, params);
  const sternX = -length / 2;
  const lipInset = overhang * 0.7;
  
  for (let i = 1; i < transomSamples; i++) {
    const t = i / transomSamples;
    const z = lerp(sternHalfBeam - lipInset, -(sternHalfBeam - lipInset), t);
    
    perimeterPoints.push({
      x: sternX,
      y: sternY,
      z,
      nx: -1,
      nz: 0,
    });
  }
  
  const totalPerimeterPoints = perimeterPoints.length;
  
  // Generate lip profile for each point
  for (let pi = 0; pi < totalPerimeterPoints; pi++) {
    const pt = perimeterPoints[pi];
    
    let cornerSharpness = 0.5;
    if (pt.nx < -0.5) {
      cornerSharpness = params.lip.transomUpperSharpness;
    }
    
    for (let j = 0; j <= lipSamples; j++) {
      const t = j / lipSamples;
      
      const angle = t * Math.PI * (0.4 + 0.1 * cornerSharpness);
      const lipOffsetH = overhang * Math.sin(angle);
      const lipOffsetY = -drop * (1 - Math.cos(angle));
      
      const tuckT = t * t * (3 - 2 * t);
      const tuckY = -drop * tuckT * tuckSharpness;
      
      const x = pt.x + pt.nx * lipOffsetH;
      const y = pt.y + lipOffsetY + tuckY;
      const z = pt.z + pt.nz * lipOffsetH;
      
      positions.push(x, y, z);
      
      const outwardFactor = Math.sin(angle);
      const downFactor = Math.cos(angle) * 0.5;
      const nx = pt.nx * outwardFactor;
      const ny = downFactor;
      const nz = pt.nz * outwardFactor;
      const nLen = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
      normals.push(nx / nLen, ny / nLen, nz / nLen);
      
      uvs.push(pi / totalPerimeterPoints, t);
    }
  }
  
  // Generate indices
  for (let pi = 0; pi < totalPerimeterPoints; pi++) {
    const nextPi = (pi + 1) % totalPerimeterPoints;
    
    for (let j = 0; j < lipSamples; j++) {
      const a = pi * (lipSamples + 1) + j;
      const b = nextPi * (lipSamples + 1) + j;
      const c = nextPi * (lipSamples + 1) + j + 1;
      const d = pi * (lipSamples + 1) + j + 1;
      
      indices.push(a, b, c);
      indices.push(a, c, d);
    }
  }
  
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  
  return {
    geometry,
    vertexCount: positions.length / 3,
    triangleCount: indices.length / 3,
  };
}

// ============================================
// TRANSOM FACE MESH - Fills stern gap
// ============================================

export function generateTransomV2(
  params: HullV2Params,
  resolution: 'low' | 'medium' | 'high' = 'medium'
): GeneratedMeshV2 {
  const { length } = params.dimensions;
  const { rake } = params.transom;
  const Nv = MESH_RESOLUTIONS[resolution].Nv;
  
  const positions: number[] = [];
  const normals: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];
  
  const sternX = -length / 2;
  const rakeRad = (rake * Math.PI) / 180;
  
  const halfBeam = evalBeamV2(0, params);
  const yKeel = evalKeelV2(0, params);
  const yDeck = evalDeckV2(0, params);
  const deckCrown = evalDeckCrownV2(0, params);
  
  const Nz = Nv;
  const Ny = Math.floor(Nv / 2);
  
  for (let iy = 0; iy <= Ny; iy++) {
    const vFrac = iy / Ny;
    
    for (let iz = 0; iz <= Nz; iz++) {
      const uFrac = iz / Nz;
      const sNorm = uFrac * 2 - 1;
      const s = Math.abs(sNorm);
      
      const z = sNorm * halfBeam;
      
      const sectionT = sectionLawV2(s, 0, params);
      const yHullSection = yKeel + (yDeck - yKeel) * sectionT;
      
      const normalizedZ = Math.abs(sNorm);
      const crownOffset = deckCrown * Math.pow(1 - normalizedZ * normalizedZ, params.deck.crownPower);
      const yDeckWithCrown = yDeck + crownOffset;
      
      const y = lerp(yHullSection, yDeckWithCrown, vFrac);
      
      const heightRange = yDeckWithCrown - yHullSection;
      const xOffset = heightRange * Math.tan(rakeRad) * vFrac;
      const xPos = sternX - xOffset;
      
      positions.push(xPos, y, z);
      
      const nx = -Math.cos(rakeRad);
      const ny = Math.sin(rakeRad) * 0.1;
      normals.push(nx, ny, 0);
      
      uvs.push(uFrac, vFrac);
    }
  }
  
  // Generate indices
  for (let iy = 0; iy < Ny; iy++) {
    for (let iz = 0; iz < Nz; iz++) {
      const a = iy * (Nz + 1) + iz;
      const b = iy * (Nz + 1) + iz + 1;
      const c = (iy + 1) * (Nz + 1) + iz + 1;
      const d = (iy + 1) * (Nz + 1) + iz;
      
      indices.push(a, c, b);
      indices.push(a, d, c);
    }
  }
  
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  
  return {
    geometry,
    vertexCount: positions.length / 3,
    triangleCount: indices.length / 3,
  };
}

// ============================================
// COMPLETE HULL - All pieces (no bow cap)
// ============================================

export interface CompleteHullV2 {
  bottomHull: GeneratedMeshV2;
  deckSheet: GeneratedMeshV2;
  lipElbow: GeneratedMeshV2;
  transom: GeneratedMeshV2;
}

export function generateCompleteHullV2(
  params: HullV2Params,
  resolution: 'low' | 'medium' | 'high' = 'medium'
): CompleteHullV2 {
  return {
    bottomHull: generateBottomHullV2(params, resolution),
    deckSheet: generateDeckSheetV2(params, resolution),
    lipElbow: generateLipElbowV2(params, resolution),
    transom: generateTransomV2(params, resolution),
  };
}
