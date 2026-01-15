// ============================================
// V2 HULL CURVE EVALUATION FUNCTIONS
// ============================================
// Ortho-driven design: Hull emerges from curves in 2D views
// Bow is where V-shape converges to knife edge - NOT a separate piece

import { HullV2Params, InterpolationStyle } from './types';

// ============================================
// UTILITY FUNCTIONS
// ============================================

export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function clamp(x: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, x));
}

// Apply interpolation style to a normalized curve value
function applyInterpolationStyle(t: number, style: InterpolationStyle): number {
  switch (style) {
    case 'balloon':
      // Bulge outward - curve goes outside the straight line
      return Math.sin(t * Math.PI / 2);
    case 'vacuum':
      // Curve inward - below the straight line
      return 1 - Math.cos(t * Math.PI / 2);
    case 'straight':
    default:
      return t;
  }
}

// ============================================
// BEAM CURVE B(u) - Half-width distribution
// u=0 is STERN, u=1 is BOW
// This defines the TOP VIEW outline
// ============================================

export function evalBeamV2(u: number, params: HullV2Params): number {
  const { beam } = params.dimensions;
  const { sternWidth, maxBeamPos, sternBlend, interpolation } = params.beam;
  const { taperStart, taperPower, knifeWidth } = params.bow;
  const halfBeam = beam / 2;
  
  let factor = 1.0;
  
  // STERN REGION: Wide for flat transom
  if (u < sternBlend) {
    const t = u / sternBlend;
    const smoothT = applyInterpolationStyle(smoothstep(0, 1, t), interpolation);
    factor = lerp(sternWidth, 1.0, smoothT);
  }
  // MID REGION: Full beam
  else if (u < maxBeamPos) {
    factor = 1.0;
  }
  // MAX TO TAPER START: Gentle narrowing
  else if (u < taperStart) {
    const t = (u - maxBeamPos) / (taperStart - maxBeamPos);
    const smoothT = applyInterpolationStyle(smoothstep(0, 1, t), interpolation);
    factor = lerp(1.0, 0.85, smoothT);
  }
  // TAPER START TO BOW: Converge to knife edge
  else {
    const t = (u - taperStart) / (1 - taperStart);
    const curved = Math.pow(t, taperPower);
    // From 85% beam down to knife width
    const knifeRatio = knifeWidth / halfBeam;
    factor = lerp(0.85, knifeRatio, curved);
  }
  
  return halfBeam * Math.max(knifeWidth / halfBeam, factor);
}

// ============================================
// KEEL CURVE K(u) - Bottom profile with rocker
// This defines the bottom line in SIDE VIEW
// ============================================

export function evalKeelV2(u: number, params: HullV2Params): number {
  const { rockerAmp, rockerPower, forefoot } = params.bottom;
  const { edgeRake } = params.bow;
  const { length } = params.dimensions;
  
  // Base rocker - parabolic curve
  const centered = Math.abs(u - 0.5) * 2; // 0 at center, 1 at ends
  let y = rockerAmp * Math.pow(centered, rockerPower);
  
  // Forefoot lift - extra rise at bow
  if (u > 0.85) {
    const bowT = (u - 0.85) / 0.15;
    y += forefoot * smoothstep(0, 1, bowT);
  }
  
  // Apply bow edge rake - shifts keel up/down at bow
  if (u > 0.9) {
    const rakeT = (u - 0.9) / 0.1;
    const rakeRad = (edgeRake * Math.PI) / 180;
    // Positive rake = bow tilts forward, keel rises
    y += Math.tan(rakeRad) * (length * 0.05) * smoothstep(0, 1, rakeT);
  }
  
  return -params.dimensions.heightKeel + y;
}

// ============================================
// DECK CURVE D(u) - Top profile
// Flat in side view - constant height
// ============================================

export function evalDeckV2(u: number, params: HullV2Params): number {
  const { edgeRake } = params.bow;
  const { length } = params.dimensions;
  
  let y = params.dimensions.heightDeck;
  
  // Apply bow edge rake at extreme bow
  if (u > 0.95) {
    const rakeT = (u - 0.95) / 0.05;
    const rakeRad = (edgeRake * Math.PI) / 180;
    y += Math.tan(rakeRad) * (length * 0.02) * smoothstep(0, 1, rakeT);
  }
  
  return y;
}

// ============================================
// DECK CROWN at station u
// Convex crown at stern that fades forward
// ============================================

export function evalDeckCrownV2(u: number, params: HullV2Params): number {
  const { crownAft, crownFadeStart, crownFadeEnd } = params.deck;
  
  if (u >= crownFadeEnd) return 0;
  if (u <= crownFadeStart) return crownAft;
  
  const t = (u - crownFadeStart) / (crownFadeEnd - crownFadeStart);
  return crownAft * (1 - smoothstep(0, 1, t));
}

// ============================================
// SECTION LAW F(s, u) - Cross-section shape
// s = normalized lateral position (0 = centerline, 1 = rail)
// Returns height fraction between keel and deck
// This is the FRONT VIEW section shape
// ============================================

export function sectionLawV2(
  s: number, 
  u: number, 
  params: HullV2Params
): number {
  const { vDepth, vPower, chinePos, chineSoftness, deadrise } = params.bottom;
  const { taperStart } = params.bow;
  
  const absS = Math.abs(s);
  
  // As we approach bow, V-angle increases (sides converge)
  let bowFactor = 1.0;
  if (u > taperStart) {
    const t = (u - taperStart) / (1 - taperStart);
    bowFactor = 1 + t * 0.5; // V becomes sharper at bow
  }
  
  let t = 0;
  if (absS < chinePos) {
    // Bottom region - V shape
    const normalizedS = absS / chinePos;
    const vComponent = Math.pow(normalizedS, vPower * bowFactor) * vDepth;
    const roundComponent = Math.pow(normalizedS, 2) * (1 - vDepth);
    t = (vComponent + roundComponent) * 0.35;
  } else {
    // Side region - transition to rail
    const normalizedS = (absS - chinePos) / (1 - chinePos);
    const sideT = 0.35 + 0.65 * (1 - Math.pow(1 - normalizedS, lerp(1.2, 2, chineSoftness)));
    t = sideT;
  }
  
  // Rail rounding - smooth transition at top
  if (absS > 0.85) {
    const railT = (absS - 0.85) / 0.15;
    t = lerp(t, 1.0, smoothstep(0, 1, railT));
  }
  
  return clamp(t, 0, 1);
}

// ============================================
// V-ANGLE at station u
// Returns how collapsed the V is (0=flat, 1=knife)
// Used by mesh generator to understand convergence
// ============================================

export function getVAngleFactor(u: number, params: HullV2Params): number {
  const { taperStart, taperPower } = params.bow;
  
  if (u <= taperStart) return 0;
  
  const t = (u - taperStart) / (1 - taperStart);
  return Math.pow(t, taperPower);
}

// ============================================
// TRANSOM OUTLINE - Stern face shape
// ============================================

export interface TransomPoint {
  y: number;
  z: number;
  isUpper: boolean;
}

export function getTransomOutline(params: HullV2Params, samples: number = 32): TransomPoint[] {
  const { beam, heightDeck, heightKeel } = params.dimensions;
  const { width, topCrown, bottomCrown, height } = params.transom;
  
  const halfWidth = (beam / 2) * width;
  const points: TransomPoint[] = [];
  
  const topY = heightDeck - 0.01;
  const bottomY = -heightKeel * height;
  
  for (let i = 0; i <= samples; i++) {
    const t = i / samples;
    const z = (t * 2 - 1) * halfWidth;
    const normalizedZ = Math.abs(z) / halfWidth;
    
    const topCrownOffset = topCrown * (1 - normalizedZ * normalizedZ);
    points.push({
      y: topY + topCrownOffset,
      z: z,
      isUpper: true,
    });
  }
  
  for (let i = samples; i >= 0; i--) {
    const t = i / samples;
    const z = (t * 2 - 1) * halfWidth;
    const normalizedZ = Math.abs(z) / halfWidth;
    
    const bottomCrownOffset = bottomCrown * (1 - normalizedZ * normalizedZ);
    points.push({
      y: bottomY - bottomCrownOffset,
      z: z,
      isUpper: false,
    });
  }
  
  return points;
}
