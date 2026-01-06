// ============================================
// V2 HULL MESH GENERATOR
// ============================================
// Generates proper 2-piece hull: Deck sheet + Bottom hull
// Features: Deck crown, lip elbow, bow knife edge, flat transom

import * as THREE from 'three';
import { HullV2Params, MeshResolution, MESH_RESOLUTIONS } from './types';
import { 
  evalBeamV2, 
  evalKeelV2, 
  evalDeckV2, 
  evalDeckCrownV2,
  sectionLawV2,
  bowBevelConstraint,
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
// BOTTOM HULL MESH
// The main hull body below the deck seam
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
  
  // Generate vertices for both sides
  for (let side = -1; side <= 1; side += 2) {
    for (let i = 0; i <= Nu; i++) {
      const u = i / Nu;
      const x = (u - 0.5) * length;
      
      // Evaluate curves at this station
      const halfBeam = evalBeamV2(u, params);
      const yKeel = evalKeelV2(u, params);
      const yDeck = evalDeckV2(u, params);
      const deckCrown = evalDeckCrownV2(u, params);
      
      for (let j = 0; j <= Nv; j++) {
        const s = j / Nv;
        let z = side * s * halfBeam;
        
        // Section law determines height fraction
        const t = sectionLawV2(s, u, params);
        let y = yKeel + (yDeck - yKeel) * t;
        
        // Apply deck crown near top (s approaching 1)
        if (s > 0.9) {
          const crownT = (s - 0.9) / 0.1;
          const normalizedZ = Math.abs(z) / halfBeam;
          const crownOffset = deckCrown * Math.pow(1 - normalizedZ * normalizedZ, params.deck.crownPower);
          y += crownOffset * crownT;
        }
        
        // Apply bow bevel constraint
        const bevelPush = bowBevelConstraint(x, y, params);
        const adjustedX = x - bevelPush;
        
        positions.push(adjustedX, y, z);
        uvs.push(u, (side + 1) / 2 * 0.5 + s * 0.5);
        normals.push(0, 1, 0); // Placeholder
      }
    }
  }
  
  // Generate indices for each side
  const vertsPerSide = (Nu + 1) * (Nv + 1);
  
  for (let sideOffset = 0; sideOffset < 2; sideOffset++) {
    const base = sideOffset * vertsPerSide;
    const flip = sideOffset === 1;
    
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
  const { length, beam } = params.dimensions;
  
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
    
    // Apply bow bevel constraint to x
    const bevelPush = bowBevelConstraint(x, yDeck, params);
    const adjustedX = x - bevelPush;
    
    for (let j = 0; j <= Nv; j++) {
      const s = j / Nv;
      const zNorm = s * 2 - 1; // -1 to 1
      const z = zNorm * halfBeam * 0.95; // Slightly inset from rail
      
      // Apply crown across beam
      const normalizedZ = Math.abs(zNorm);
      const crownOffset = deckCrown * Math.pow(1 - normalizedZ * normalizedZ, params.deck.crownPower);
      const y = yDeck + crownOffset;
      
      positions.push(adjustedX, y, z);
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
// LIP ELBOW MESH
// 30mm finger-grip around deck perimeter
// ============================================

export function generateLipElbowV2(
  params: HullV2Params,
  resolution: 'low' | 'medium' | 'high' = 'medium'
): GeneratedMeshV2 {
  const { Nu, lipSamples } = MESH_RESOLUTIONS[resolution];
  const { length } = params.dimensions;
  const { overhang, drop, radiusTop, tuckSharpness } = params.lip;
  
  const positions: number[] = [];
  const normals: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];
  
  // Generate lip around perimeter
  for (let side = -1; side <= 1; side += 2) {
    for (let i = 0; i <= Nu; i++) {
      const u = i / Nu;
      const x = (u - 0.5) * length;
      
      const halfBeam = evalBeamV2(u, params);
      const yDeck = evalDeckV2(u, params);
      const deckCrown = evalDeckCrownV2(u, params);
      
      // Lip attachment point (at rail)
      const attachZ = side * halfBeam;
      const attachY = yDeck; // Top of rail
      
      // Generate lip profile points
      for (let j = 0; j <= lipSamples; j++) {
        const t = j / lipSamples;
        
        // Lip follows arc from top to underside
        const angle = t * Math.PI * 0.5; // Quarter circle
        const lipOffsetZ = side * overhang * Math.sin(angle);
        const lipOffsetY = -drop * (1 - Math.cos(angle));
        
        // Add tuck sharpness effect
        const tuckY = -drop * t * t * tuckSharpness;
        
        const z = attachZ + lipOffsetZ;
        const y = attachY + lipOffsetY + tuckY;
        
        positions.push(x, y, z);
        normals.push(0, -side * Math.sin(angle), Math.cos(angle));
        uvs.push(u, t);
      }
    }
  }
  
  // Generate indices for each side
  const vertsPerSide = (Nu + 1) * (lipSamples + 1);
  
  for (let sideOffset = 0; sideOffset < 2; sideOffset++) {
    const base = sideOffset * vertsPerSide;
    const flip = sideOffset === 0;
    
    for (let i = 0; i < Nu; i++) {
      for (let j = 0; j < lipSamples; j++) {
        const a = base + i * (lipSamples + 1) + j;
        const b = base + (i + 1) * (lipSamples + 1) + j;
        const c = base + (i + 1) * (lipSamples + 1) + j + 1;
        const d = base + i * (lipSamples + 1) + j + 1;
        
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
// TRANSOM FACE MESH
// Flat vertical stern plate
// ============================================

export function generateTransomV2(
  params: HullV2Params,
  resolution: 'low' | 'medium' | 'high' = 'medium'
): GeneratedMeshV2 {
  const Nv = MESH_RESOLUTIONS[resolution].Nv;
  const { beam, heightDeck, heightKeel } = params.dimensions;
  const { width, topCrown, bottomCrown, rake, height } = params.transom;
  const { length } = params.dimensions;
  
  const halfWidth = (beam / 2) * width;
  const topY = heightDeck - 0.01;
  const bottomY = -heightKeel * height;
  const sternX = -length / 2;
  
  // Rake offset - top is further aft
  const rakeRad = (rake * Math.PI) / 180;
  const rakeOffset = (topY - bottomY) * Math.tan(rakeRad);
  
  const positions: number[] = [];
  const normals: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];
  
  const Ny = Math.floor(Nv / 2); // Vertical samples
  const Nz = Nv; // Horizontal samples
  
  for (let j = 0; j <= Ny; j++) {
    const vFrac = j / Ny;
    const y = lerp(bottomY, topY, vFrac);
    
    // Interpolate crown from bottom to top
    const crown = lerp(bottomCrown, topCrown, vFrac);
    
    // Rake offset at this height
    const xOffset = rakeOffset * vFrac;
    
    for (let i = 0; i <= Nz; i++) {
      const uFrac = i / Nz;
      const zNorm = uFrac * 2 - 1; // -1 to 1
      const baseZ = zNorm * halfWidth;
      
      // Apply crown
      const crownOffset = crown * (1 - zNorm * zNorm);
      const adjustedY = y + crownOffset;
      
      positions.push(sternX - xOffset, adjustedY, baseZ);
      normals.push(-1, 0, 0); // Facing aft
      uvs.push(uFrac, vFrac);
    }
  }
  
  // Generate indices
  for (let j = 0; j < Ny; j++) {
    for (let i = 0; i < Nz; i++) {
      const a = j * (Nz + 1) + i;
      const b = j * (Nz + 1) + i + 1;
      const c = (j + 1) * (Nz + 1) + i + 1;
      const d = (j + 1) * (Nz + 1) + i;
      
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
// BOW CAP MESH
// Knife edge closure at bow
// ============================================

export function generateBowCapV2(
  params: HullV2Params,
  resolution: 'low' | 'medium' | 'high' = 'medium'
): GeneratedMeshV2 {
  const { Nu, Nv } = MESH_RESOLUTIONS[resolution];
  const { length, heightDeck, heightKeel } = params.dimensions;
  const { edgeLength, angle, tipRadius, bullnoseRadius, shoulderBlend } = params.bow;
  
  const bowX = length / 2;
  const angleRad = (angle * Math.PI) / 180;
  
  const positions: number[] = [];
  const normals: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];
  
  // Sample the knife edge and surrounding surface
  const knifeEdgeSamples = Math.floor(Nv / 2);
  
  // Generate knife edge vertices
  for (let i = 0; i <= knifeEdgeSamples; i++) {
    const t = i / knifeEdgeSamples;
    
    // Knife edge from keel to deck
    const keelY = evalKeelV2(1, params);
    const deckY = evalDeckV2(1, params);
    const y = lerp(keelY, deckY, t);
    
    // X position along knife edge
    const edgeX = bowX - edgeLength * Math.cos(angleRad) * t;
    
    // Add center vertex (on knife edge)
    positions.push(edgeX + tipRadius, y, 0);
    normals.push(1, 0, 0);
    uvs.push(0.5, t);
    
    // Add side vertices (with bullnose rounding)
    const halfBeam = evalBeamV2(1 - t * 0.1, params);
    const sideZ = Math.min(halfBeam, bullnoseRadius * 3);
    
    positions.push(edgeX, y, sideZ);
    normals.push(0.7, 0, 0.7);
    uvs.push(0.7, t);
    
    positions.push(edgeX, y, -sideZ);
    normals.push(0.7, 0, -0.7);
    uvs.push(0.3, t);
  }
  
  // Generate indices (triangles connecting knife edge to sides)
  const vertsPerRow = 3;
  for (let i = 0; i < knifeEdgeSamples; i++) {
    const row0 = i * vertsPerRow;
    const row1 = (i + 1) * vertsPerRow;
    
    // Center to right side
    indices.push(row0, row1, row0 + 1);
    indices.push(row0 + 1, row1, row1 + 1);
    
    // Center to left side
    indices.push(row0, row0 + 2, row1);
    indices.push(row0 + 2, row1 + 2, row1);
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
// COMPLETE HULL - All pieces combined
// ============================================

export interface CompleteHullV2 {
  bottomHull: GeneratedMeshV2;
  deckSheet: GeneratedMeshV2;
  lipElbow: GeneratedMeshV2;
  transom: GeneratedMeshV2;
  bowCap: GeneratedMeshV2;
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
    bowCap: generateBowCapV2(params, resolution),
  };
}
