// ============================================
// V2 HULL MESH GENERATOR
// ============================================
// Generates proper 2-piece hull: Deck sheet + Bottom hull
// Features: Deck crown, lip elbow, bow knife edge, flat transom
// Improved seam transitions between all components

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

// Smooth blending function for seamless transitions
function seamBlend(t: number, sharpness: number = 2): number {
  return Math.pow(t, sharpness) * (3 - 2 * t);
}

// ============================================
// BOTTOM HULL MESH
// The main hull body below the deck seam
// Includes smooth transition to transom at stern
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
      
      // Stern transition blend - smooth blend near u=0
      const sternBlend = smoothstep(0, params.beam.sternBlend, u);
      
      for (let j = 0; j <= Nv; j++) {
        const s = j / Nv;
        let z = side * s * halfBeam;
        
        // Section law determines height fraction
        const t = sectionLawV2(s, u, params);
        let y = yKeel + (yDeck - yKeel) * t;
        
        // Apply deck crown near top (s approaching 1)
        if (s > 0.85) {
          const crownT = smoothstep(0.85, 1.0, s);
          const normalizedZ = Math.abs(z) / (halfBeam + 0.001);
          const crownOffset = deckCrown * Math.pow(1 - normalizedZ * normalizedZ, params.deck.crownPower);
          y += crownOffset * crownT;
        }
        
        // Apply bow bevel constraint
        const bevelPush = bowBevelConstraint(x, y, params);
        const adjustedX = x - bevelPush;
        
        // Smooth stern-to-transom transition
        // At very stern (u near 0), blend vertices toward transom plane
        if (u < params.beam.sternBlend * 0.5) {
          const transomBlend = 1 - smoothstep(0, params.beam.sternBlend * 0.5, u);
          const transomX = -length / 2;
          const blendedX = lerp(adjustedX, transomX + 0.005, transomBlend * 0.3);
          positions.push(blendedX, y, z);
        } else {
          positions.push(adjustedX, y, z);
        }
        
        uvs.push(u, (side + 1) / 2 * 0.5 + s * 0.5);
        normals.push(0, 1, 0); // Placeholder - computed later
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
// Seamlessly connects to lip at edges
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
    
    // Deck inset from rail to match lip attachment
    const lipInset = params.lip.overhang * 0.7;
    
    for (let j = 0; j <= Nv; j++) {
      const s = j / Nv;
      const zNorm = s * 2 - 1; // -1 to 1
      const z = zNorm * (halfBeam - lipInset);
      
      // Apply crown across beam with smooth falloff at edges
      const normalizedZ = Math.abs(zNorm);
      const edgeFade = smoothstep(0.85, 1.0, normalizedZ);
      const crownOffset = deckCrown * Math.pow(1 - normalizedZ * normalizedZ, params.deck.crownPower);
      const y = yDeck + crownOffset * (1 - edgeFade * 0.3);
      
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
// Smooth transition from deck edge to hull
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
      
      // Lip attachment point matches deck edge
      const lipInset = overhang * 0.7;
      const attachZ = side * (halfBeam - lipInset);
      const attachY = yDeck;
      
      // Transom corner sharpness - more squared at stern
      const cornerSharpness = u < 0.1 
        ? lerp(params.lip.transomUpperSharpness, 0.5, smoothstep(0, 0.1, u))
        : 0.5;
      
      // Generate lip profile points
      for (let j = 0; j <= lipSamples; j++) {
        const t = j / lipSamples;
        
        // Lip follows arc from top to underside with variable sharpness
        const angle = t * Math.PI * (0.4 + 0.1 * cornerSharpness);
        const lipOffsetZ = side * overhang * Math.sin(angle);
        const lipOffsetY = -drop * (1 - Math.cos(angle));
        
        // Add tuck sharpness effect with smooth blend
        const tuckY = -drop * seamBlend(t, 2) * tuckSharpness;
        
        const z = attachZ + lipOffsetZ;
        const y = attachY + lipOffsetY + tuckY;
        
        positions.push(x, y, z);
        
        // Normal calculation
        const nx = 0;
        const ny = Math.cos(angle) * 0.5;
        const nz = side * Math.sin(angle);
        const nLen = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
        normals.push(nx / nLen, ny / nLen, nz / nLen);
        
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
// Seamless connection to hull and deck
// ============================================

export function generateTransomV2(
  params: HullV2Params,
  resolution: 'low' | 'medium' | 'high' = 'medium'
): GeneratedMeshV2 {
  const Nv = MESH_RESOLUTIONS[resolution].Nv;
  const { beam, heightDeck, heightKeel } = params.dimensions;
  const { width, topCrown, bottomCrown, rake, height, lowerCornerRadius } = params.transom;
  const { length } = params.dimensions;
  
  // Get stern dimensions from hull curves for seamless match
  const sternHalfBeam = evalBeamV2(0, params);
  const halfWidth = Math.min(sternHalfBeam, (beam / 2) * width);
  
  const topY = heightDeck - 0.005; // Slight offset for clean seam
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
    
    // Interpolate crown from bottom to top with smooth blend
    const crownBlend = seamBlend(vFrac, 1.5);
    const crown = lerp(bottomCrown, topCrown, crownBlend);
    
    // Rake offset at this height
    const xOffset = rakeOffset * vFrac;
    
    for (let i = 0; i <= Nz; i++) {
      const uFrac = i / Nz;
      const zNorm = uFrac * 2 - 1; // -1 to 1
      let baseZ = zNorm * halfWidth;
      
      // Apply lower corner rounding
      if (vFrac < 0.25 && Math.abs(zNorm) > 0.7) {
        const cornerT = (1 - vFrac / 0.25) * ((Math.abs(zNorm) - 0.7) / 0.3);
        const cornerRadius = lowerCornerRadius * cornerT;
        const inset = Math.sign(zNorm) * cornerRadius * 0.5;
        baseZ -= inset;
      }
      
      // Apply crown
      const crownOffset = crown * (1 - zNorm * zNorm);
      const adjustedY = y + crownOffset;
      
      positions.push(sternX - xOffset, adjustedY, baseZ);
      
      // Normal facing aft with slight rake
      const nx = -Math.cos(rakeRad);
      const ny = Math.sin(rakeRad) * 0.1;
      normals.push(nx, ny, 0);
      
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
// Smooth blend from hull to knife edge
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
  const knifeEdgeSamples = Math.max(8, Math.floor(Nv / 2));
  const widthSamples = 5; // Samples across width of bow cap
  
  // Generate bow cap as a smooth surface from knife edge to hull
  for (let i = 0; i <= knifeEdgeSamples; i++) {
    const t = i / knifeEdgeSamples;
    
    // Knife edge from keel to deck
    const keelY = evalKeelV2(1, params);
    const deckY = evalDeckV2(1, params);
    const y = lerp(keelY, deckY, t);
    
    // X position along knife edge
    const edgeX = bowX - edgeLength * Math.cos(angleRad) * (1 - t);
    
    // Get beam at this height fraction
    const heightFrac = 1 - t * 0.15; // Slightly behind bow tip
    const halfBeam = evalBeamV2(heightFrac, params);
    
    for (let j = 0; j <= widthSamples; j++) {
      const s = j / widthSamples;
      const sNorm = s * 2 - 1; // -1 to 1
      
      // Blend from knife edge (s=0.5) to sides
      const sideBlend = Math.abs(sNorm);
      const sideWidth = Math.min(halfBeam * 0.3, bullnoseRadius * 4) * sideBlend;
      
      // X pulls back at sides for smooth hull blend
      const xPullback = shoulderBlend * sideBlend * sideBlend;
      const finalX = edgeX - xPullback + tipRadius * (1 - sideBlend);
      
      const z = sNorm * sideWidth;
      
      positions.push(finalX, y, z);
      
      // Normal calculation - blend from forward to outward
      const nx = 1 - sideBlend * 0.5;
      const ny = 0;
      const nz = sNorm * sideBlend;
      const nLen = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
      normals.push(nx / nLen, ny / nLen, nz / nLen);
      
      uvs.push(s, t);
    }
  }
  
  // Generate indices
  for (let i = 0; i < knifeEdgeSamples; i++) {
    for (let j = 0; j < widthSamples; j++) {
      const a = i * (widthSamples + 1) + j;
      const b = (i + 1) * (widthSamples + 1) + j;
      const c = (i + 1) * (widthSamples + 1) + j + 1;
      const d = i * (widthSamples + 1) + j + 1;
      
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
