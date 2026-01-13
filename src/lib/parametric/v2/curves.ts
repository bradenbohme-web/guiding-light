// ============================================
// V2 HULL CURVE EVALUATION FUNCTIONS
// ============================================
// Evaluates parametric curves for hull generation

import { HullV2Params } from './types';

// Smoothstep for smooth transitions
export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

// Linear interpolation
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

// Clamp value
export function clamp(x: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, x));
}

// ============================================
// BEAM CURVE B(u) - Half-width distribution
// u=0 is STERN, u=1 is BOW
// ============================================

export function evalBeamV2(u: number, params: HullV2Params): number {
  const { beam } = params.dimensions;
  const { sternWidth, maxBeamPos, bowTaper, sternBlend } = params.beam;
  const halfBeam = beam / 2;
  
  let factor = 1.0;
  
  // Stern region - stays wide for flat transom
  if (u < sternBlend) {
    const t = u / sternBlend;
    factor = lerp(sternWidth, 1.0, smoothstep(0, 1, t));
  }
  // Mid region - full beam
  else if (u < maxBeamPos) {
    factor = 1.0;
  }
  // Forward of max beam - gradual taper
  else if (u < 0.9) {
    const t = (u - maxBeamPos) / (0.9 - maxBeamPos);
    factor = 1.0 - Math.pow(t, bowTaper) * 0.7;
  }
  // Bow knife region - aggressive taper to knife edge
  else {
    const t = (u - 0.9) / 0.1;
    const baseWidth = 1.0 - Math.pow((0.9 - maxBeamPos) / (0.9 - maxBeamPos), bowTaper) * 0.7;
    // Don't go to zero - maintain knife edge width
    const knifeWidth = 0.02; // Small but not zero
    factor = lerp(baseWidth, knifeWidth, smoothstep(0, 1, t));
  }
  
  return halfBeam * Math.max(0.01, factor);
}

// ============================================
// KEEL CURVE K(u) - Bottom profile with rocker
// ============================================

export function evalKeelV2(u: number, params: HullV2Params): number {
  const { rockerAmp, rockerPower, forefoot } = params.bottom;
  
  // Base rocker - parabolic
  const centered = Math.abs(u - 0.5) * 2; // 0 at center, 1 at ends
  let y = rockerAmp * Math.pow(centered, rockerPower);
  
  // Forefoot lift - extra rise at bow
  if (u > 0.85) {
    const bowT = (u - 0.85) / 0.15;
    y += forefoot * smoothstep(0, 1, bowT);
  }
  
  return -params.dimensions.heightKeel + y;
}

// ============================================
// DECK CURVE D(u) - Top profile
// Flat in side view - returns constant height
// Crown is handled separately in cross-section
// ============================================

export function evalDeckV2(u: number, params: HullV2Params): number {
  // Deck is flat in side view
  return params.dimensions.heightDeck;
}

// ============================================
// DECK CROWN at station u
// Convex crown at stern that fades to flat forward
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
// ============================================

export function sectionLawV2(
  s: number, 
  u: number, 
  params: HullV2Params
): number {
  const { vDepth, vPower, chinePos, chineSoftness, deadrise } = params.bottom;
  
  const absS = Math.abs(s);
  
  // V-hull component
  const vT = 1 - Math.pow(1 - absS, lerp(1.5, 4, deadrise));
  
  // Chine/bilge knee
  let t = 0;
  if (absS < chinePos) {
    // Bottom region - V shape
    const normalizedS = absS / chinePos;
    const vComponent = Math.pow(normalizedS, vPower) * vDepth;
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
// BOW CONVERGENCE - Simplified 2-stage taper
// 1. Shoulder fade – hull width eases toward knife region
// 2. Knife edge – aggressive pinch controlled by params.bow.angle
// Returns how much to push the surface back (positive = aft)
// ============================================

export function bowBevelConstraint(
  x: number,
  _y: number,
  params: HullV2Params
): number {
  const { length } = params.dimensions;
  const { edgeLength, angle, shoulderBlend } = params.bow;

  const bowX = length / 2; // furthest forward point
  const blendStart = bowX - shoulderBlend - edgeLength;
  if (x < blendStart) return 0;

  // Inside the transition band
  const totalZone = shoulderBlend + edgeLength;
  const distFromBow = bowX - x;

  // Normalized 0 (bow) to 1 (shoulder start)
  const t = clamp(distFromBow / totalZone, 0, 1);

  // Convergence profile: sharper at bow (angle controls steepness)
  // Use inverse smoothstep so knife portion tapers faster.
  const angleRad = (angle * Math.PI) / 180;
  const taperCurve = Math.pow(1 - t, 1 + Math.tan(angleRad) * 0.5);

  // Maximum push-back is capped to edgeLength
  return edgeLength * (1 - taperCurve);
}

// ============================================
// TRANSOM - Stern face shape
// Returns points for transom outline
// ============================================

export interface TransomPoint {
  y: number;
  z: number;
  isUpper: boolean;
}

export function getTransomOutline(params: HullV2Params, samples: number = 32): TransomPoint[] {
  const { beam, heightDeck, heightKeel } = params.dimensions;
  const { width, topCrown, bottomCrown, upperCornerRadius, lowerCornerRadius, height } = params.transom;
  
  const halfWidth = (beam / 2) * width;
  const points: TransomPoint[] = [];
  
  const topY = heightDeck - 0.01; // Just below deck
  const bottomY = -heightKeel * height;
  
  for (let i = 0; i <= samples; i++) {
    const t = i / samples;
    const z = (t * 2 - 1) * halfWidth; // -halfWidth to +halfWidth
    const absZ = Math.abs(z);
    const normalizedZ = absZ / halfWidth;
    
    // Top edge with crown
    const topCrownOffset = topCrown * (1 - normalizedZ * normalizedZ);
    points.push({
      y: topY + topCrownOffset,
      z: z,
      isUpper: true,
    });
  }
  
  // Add bottom edge (reverse direction for closed loop)
  for (let i = samples; i >= 0; i--) {
    const t = i / samples;
    const z = (t * 2 - 1) * halfWidth;
    const absZ = Math.abs(z);
    const normalizedZ = absZ / halfWidth;
    
    // Bottom edge with crown
    const bottomCrownOffset = bottomCrown * (1 - normalizedZ * normalizedZ);
    points.push({
      y: bottomY - bottomCrownOffset,
      z: z,
      isUpper: false,
    });
  }
  
  return points;
}
