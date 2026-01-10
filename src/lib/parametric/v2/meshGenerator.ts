// ============================================
// V2 HULL MESH GENERATOR
// ============================================
// Generates proper 2-piece hull: Deck sheet + Bottom hull
// CRITICAL: Transom is derived from hull/deck stern edges - not independent
// The bottom hull and deck define the boat shape, transom fills the gap

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

// Store stern edge vertices for transom to use
export interface SternEdgeData {
  bottomHullEdge: THREE.Vector3[];  // Bottom hull vertices at u=0 (stern)
  deckEdge: THREE.Vector3[];        // Deck vertices at u=0 (stern)
}

// Module-level cache for stern edge data
let sternEdgeCache: SternEdgeData | null = null;

// ============================================
// BOTTOM HULL MESH
// The main hull body below the deck seam
// Stern edge (u=0) defines half of transom boundary
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
  
  // Collect stern edge for transom (port + starboard)
  const sternEdgeBottom: THREE.Vector3[] = [];
  
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
        if (s > 0.85) {
          const crownT = smoothstep(0.85, 1.0, s);
          const normalizedZ = Math.abs(z) / (halfBeam + 0.001);
          const crownOffset = deckCrown * Math.pow(1 - normalizedZ * normalizedZ, params.deck.crownPower);
          y += crownOffset * crownT;
        }
        
        // Apply bow bevel constraint
        const bevelPush = bowBevelConstraint(x, y, params);
        const adjustedX = x - bevelPush;
        
        positions.push(adjustedX, y, z);
        uvs.push(u, (side + 1) / 2 * 0.5 + s * 0.5);
        normals.push(0, 1, 0); // Placeholder - computed later
        
        // Capture stern edge (u=0, i=0)
        if (i === 0) {
          sternEdgeBottom.push(new THREE.Vector3(adjustedX, y, z));
        }
      }
    }
  }
  
  // Store stern edge for transom generation
  // Port side is first half, starboard is second half
  const vertsPerSide = (Nu + 1) * (Nv + 1);
  const sternVertsPort = sternEdgeBottom.slice(0, Nv + 1);
  const sternVertsStbd = sternEdgeBottom.slice(Nv + 1, (Nv + 1) * 2);
  
  // Combine: port (reversed for CCW winding) + starboard
  const combinedSternEdge = [...sternVertsPort.slice().reverse(), ...sternVertsStbd];
  
  // Initialize cache if needed
  if (!sternEdgeCache) {
    sternEdgeCache = { bottomHullEdge: [], deckEdge: [] };
  }
  sternEdgeCache.bottomHullEdge = combinedSternEdge;
  
  // Generate indices for each side
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
// Stern edge (u=0) defines top of transom boundary
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
  
  // Collect stern edge for transom
  const sternEdgeDeck: THREE.Vector3[] = [];
  
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
      
      // Capture stern edge (u=0, i=0)
      if (i === 0) {
        sternEdgeDeck.push(new THREE.Vector3(adjustedX, y, z));
      }
    }
  }
  
  // Store deck stern edge for transom
  if (!sternEdgeCache) {
    sternEdgeCache = { bottomHullEdge: [], deckEdge: [] };
  }
  sternEdgeCache.deckEdge = sternEdgeDeck;
  
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
        
        // Add tuck sharpness effect
        const tuckT = t * t * (3 - 2 * t);
        const tuckY = -drop * tuckT * tuckSharpness;
        
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
// TRANSOM FACE MESH - DERIVED FROM HULL EDGES
// This fills the gap between bottom hull and deck at stern
// Bottom edge follows hull section curve, top edge follows deck
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
  
  // Get stern position and curves at u=0
  const sternX = -length / 2;
  const rakeRad = (rake * Math.PI) / 180;
  
  const halfBeam = evalBeamV2(0, params);
  const yKeel = evalKeelV2(0, params);
  const yDeck = evalDeckV2(0, params);
  const deckCrown = evalDeckCrownV2(0, params);
  
  // Number of samples across the transom (port to starboard)
  const Nz = Nv;
  // Number of samples vertically
  const Ny = Math.floor(Nv / 2);
  
  // For each lateral position, calculate the hull bottom Y and deck top Y
  // Then interpolate between them vertically
  
  for (let iy = 0; iy <= Ny; iy++) {
    const vFrac = iy / Ny; // 0 at bottom, 1 at top
    
    for (let iz = 0; iz <= Nz; iz++) {
      const uFrac = iz / Nz;
      const sNorm = uFrac * 2 - 1; // -1 to 1 (port to starboard)
      const s = Math.abs(sNorm); // 0 to 1 for section law
      
      // Z position based on beam at stern
      const z = sNorm * halfBeam;
      
      // Calculate the hull section Y at this lateral position (bottom edge of transom)
      // This is the same calculation used in generateBottomHullV2 at u=0
      const sectionT = sectionLawV2(s, 0, params);
      const yHullSection = yKeel + (yDeck - yKeel) * sectionT;
      
      // Apply deck crown for the deck edge (top edge of transom)
      const normalizedZ = Math.abs(sNorm);
      const crownOffset = deckCrown * Math.pow(1 - normalizedZ * normalizedZ, params.deck.crownPower);
      const yDeckWithCrown = yDeck + crownOffset;
      
      // Now interpolate between hull section (bottom) and deck (top)
      // vFrac=0 -> yHullSection (follows the V-shape)
      // vFrac=1 -> yDeckWithCrown
      const y = lerp(yHullSection, yDeckWithCrown, vFrac);
      
      // Rake offset - top is further aft
      const heightRange = yDeckWithCrown - yHullSection;
      const xOffset = heightRange * Math.tan(rakeRad) * vFrac;
      const xPos = sternX - xOffset;
      
      positions.push(xPos, y, z);
      
      // Normal facing aft with slight rake
      const nx = -Math.cos(rakeRad);
      const ny = Math.sin(rakeRad) * 0.1;
      normals.push(nx, ny, 0);
      
      uvs.push(uFrac, vFrac);
    }
  }
  
  // Generate indices - winding for aft-facing normal
  for (let iy = 0; iy < Ny; iy++) {
    for (let iz = 0; iz < Nz; iz++) {
      const a = iy * (Nz + 1) + iz;
      const b = iy * (Nz + 1) + iz + 1;
      const c = (iy + 1) * (Nz + 1) + iz + 1;
      const d = (iy + 1) * (Nz + 1) + iz;
      
      // CCW winding for -X facing normal
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
// Order matters: bottom hull and deck first (define stern edges)
// Then transom uses those edges
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
  // Reset cache
  sternEdgeCache = null;
  
  // Generate bottom hull first - it captures stern edge
  const bottomHull = generateBottomHullV2(params, resolution);
  
  // Generate deck - it captures deck stern edge
  const deckSheet = generateDeckSheetV2(params, resolution);
  
  // Now transom can use the stern edges from both
  const transom = generateTransomV2(params, resolution);
  
  return {
    bottomHull,
    deckSheet,
    lipElbow: generateLipElbowV2(params, resolution),
    transom,
    bowCap: generateBowCapV2(params, resolution),
  };
}
