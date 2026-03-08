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

// Quintic smoothstep for C2 continuity (no hard kinks)
function smootherstep(t: number): number {
  const c = clamp(t, 0, 1);
  return c * c * c * (c * (c * 6 - 15) + 10);
}

// Apply interpolation style to a normalized curve value
function applyInterpolationStyle(t: number, style: InterpolationStyle): number {
  switch (style) {
    case 'balloon':
      return Math.sin(t * Math.PI / 2);
    case 'vacuum':
      return 1 - Math.cos(t * Math.PI / 2);
    case 'straight':
    default:
      return t;
  }
}

// ============================================
// BEAM CURVE B(u) - Half-width distribution
// u=0 is STERN, u=1 is BOW
// Smooth continuous curve - no piecewise hard transitions
// ============================================

export function evalBeamV2(u: number, params: HullV2Params): number {
  const { beam } = params.dimensions;
  const { sternWidth, maxBeamPos, sternBlend, interpolation } = params.beam;
  const {
    knifeWidth,
    taperStart,
    taperPower,
    entryLength = 0.16,
    noseBluntness = 0.45,
  } = params.bow;

  const halfBeam = beam / 2;
  const uClamped = clamp(u, 0, 1);

  // Keep a physical stem floor so top-view cannot collapse into a needle.
  const baseKnifeRatio = clamp(knifeWidth / Math.max(1e-6, halfBeam), 0.014, 0.22);

  let factor: number;

  if (uClamped <= maxBeamPos) {
    const t = clamp(uClamped / Math.max(1e-6, maxBeamPos), 0, 1);

    const blendNorm = clamp((sternBlend - 0.05) / 0.25, 0, 1);
    const sternShape = lerp(0.8, 2.4, blendNorm);

    const base = Math.pow(smootherstep(t), sternShape);
    const shaped = applyInterpolationStyle(base, interpolation);
    factor = lerp(sternWidth, 1.0, shaped);
  } else {
    // Rebuilt top-view bow law: shoulder hold -> transition -> short entry collapse.
    const bowSpan = Math.max(1e-6, 1 - maxBeamPos);
    const t = clamp((uClamped - maxBeamPos) / bowSpan, 0, 1);

    const shoulderU = clamp(
      Math.max(taperStart, maxBeamPos + 0.05),
      maxBeamPos + 0.05,
      0.9
    );
    const entryStartU = clamp(
      1 - entryLength,
      shoulderU + 0.04,
      0.97
    );

    const shoulderNorm = clamp((shoulderU - maxBeamPos) / bowSpan, 0.05, 0.88);
    const entryNorm = clamp((entryStartU - maxBeamPos) / bowSpan, shoulderNorm + 0.06, 0.98);

    const fullness = clamp((taperPower - 0.3) / (3 - 0.3), 0, 1);
    const bluntness = clamp(noseBluntness, 0, 1);

    // Laser-like shoulder carry: hold width forward, then collapse late.
    const shoulderDrop = lerp(0.16, 0.05, fullness);
    const shoulderTarget = 1 - shoulderDrop;

    const midDrop = lerp(0.36, 0.2, fullness);
    const midTarget = clamp(shoulderTarget - midDrop, 0.24, shoulderTarget - 0.02);

    const minTipRatio = Math.max(baseKnifeRatio, 0.014);
    const tipRatio = lerp(
      minTipRatio,
      clamp(minTipRatio + 0.12, minTipRatio, 0.34),
      bluntness
    );

    if (t <= shoulderNorm) {
      const ns = clamp(t / Math.max(1e-6, shoulderNorm), 0, 1);
      const shoulderExp = lerp(0.9, 2.1, fullness);
      const shoulderCurve = Math.pow(smootherstep(ns), shoulderExp);
      factor = lerp(1.0, shoulderTarget, shoulderCurve);
    } else if (t <= entryNorm) {
      const ns = clamp((t - shoulderNorm) / Math.max(1e-6, entryNorm - shoulderNorm), 0, 1);
      const midExp = lerp(1.2, 2.8, fullness);
      const midCurve = Math.pow(smootherstep(ns), midExp);
      factor = lerp(shoulderTarget, midTarget, midCurve);
    } else {
      const ns = clamp((t - entryNorm) / Math.max(1e-6, 1 - entryNorm), 0, 1);
      const noseHoldExp = lerp(0.95, 2.4, bluntness);
      const noseCurve = Math.pow(smootherstep(ns), noseHoldExp);
      factor = lerp(midTarget, tipRatio, noseCurve);
    }
  }

  const minFactor = Math.max(baseKnifeRatio, 0.014);
  return halfBeam * clamp(factor, minFactor, 1.05);
}

// ============================================
// KEEL CURVE K(u) - Bottom profile with rocker
// This defines the bottom line in SIDE VIEW
// Edge rake ONLY affects keel, not deck
// ============================================

export function evalKeelV2(u: number, params: HullV2Params): number {
  const { rockerAmp, rockerPower, forefoot } = params.bottom;
  const { edgeRake } = params.bow;
  const { length } = params.dimensions;

  // Base rocker - parabolic curve centered at midship
  const centered = Math.abs(u - 0.5) * 2; // 0 at center, 1 at ends
  let y = rockerAmp * Math.pow(centered, rockerPower);

  // Forefoot lift - extra rise at bow
  if (u > 0.8) {
    const bowT = (u - 0.8) / 0.2;
    y += forefoot * smootherstep(bowT);
  }

  // Bow edge rake - shifts keel up at bow (ONLY keel, not deck)
  if (u > 0.85) {
    const rakeT = (u - 0.85) / 0.15;
    const rakeRad = (edgeRake * Math.PI) / 180;
    y += Math.tan(rakeRad) * (length * 0.06) * smootherstep(rakeT);
  }

  return -params.dimensions.heightKeel + y;
}

// ============================================
// DECK CURVE D(u) - Top profile
// FLAT in side view - constant height
// Edge rake does NOT affect deck
// ============================================

export function evalDeckV2(u: number, params: HullV2Params): number {
  // Deck is flat. Period. Edge rake only moves the keel.
  return params.dimensions.heightDeck;
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
  return crownAft * (1 - smootherstep(t));
}

// ============================================
// SECTION LAW F(s, u) - Cross-section shape
// s = normalized lateral position (0 = centerline, 1 = rail)
// Returns height fraction between keel and deck
// This is the FRONT VIEW section shape
//
// FIXED: vDepth now properly controls the depth of the V bottom.
// The V extends from centerline (keel) upward. chinePos marks
// where the hard chine transitions to the topsides.
// ============================================

export function sectionLawV2(
  s: number,
  u: number,
  params: HullV2Params
): number {
  const { vDepth, vPower, chinePos, chineSoftness, deadrise } = params.bottom;

  const absS = clamp(Math.abs(s), 0, 1);

  // Section shape: going from centerline (s=0) to rail (s=1)
  // At centerline s=0: we're at the keel bottom → t=0
  // At rail s=1: we're at the deck → t=1
  //
  // The V-hull means: the bottom is V-shaped, so height rises
  // steeply from centerline. vDepth controls how deep the V goes
  // (how much of the total height is consumed by the V portion).

  let t: number;

  if (absS <= chinePos) {
    // BOTTOM V REGION: from centerline to chine
    // Normalized position within the V region
    const ns = absS / chinePos;

    // V-shape: rises from keel using power curve
    // At ns=0 (centerline): t = 0 (at keel)
    // At ns=1 (chine): t = vDepth (top of V region)
    const vShape = Math.pow(ns, vPower);

    // Deadrise adds a linear component (flat bottom tendency)
    const deadriseComponent = ns * deadrise;
    const vComponent = vShape * (1 - deadrise);

    t = (vComponent + deadriseComponent) * vDepth;
  } else {
    // TOPSIDE REGION: from chine to rail
    const ns = (absS - chinePos) / (1 - chinePos);

    // Chine softness: 0 = hard chine (sharp corner), 1 = round bilge
    // Hard chine: linear rise from vDepth to 1.0
    // Soft chine: smooth curved rise
    const blend = lerp(1.2, 2.5, chineSoftness);
    const curved = 1 - Math.pow(1 - ns, blend);

    t = lerp(vDepth, 1.0, curved);
  }

  // Final rail rounding - ensure we reach exactly 1.0 at rail
  if (absS > 0.92) {
    const railT = (absS - 0.92) / 0.08;
    t = lerp(t, 1.0, smootherstep(railT));
  }

  return clamp(t, 0, 1);
}

// ============================================
// V-ANGLE at station u
// Returns how collapsed the V is (0=flat, 1=knife)
// Used by mesh generator to understand convergence
// ============================================

export function getVAngleFactor(u: number, params: HullV2Params): number {
  const { beam } = params.dimensions;
  const { knifeWidth } = params.bow;

  // V-angle factor is simply how narrow the beam is relative to knife width
  const halfBeam = evalBeamV2(u, params);
  const maxHalf = beam / 2;
  const knifeHalf = knifeWidth / 2;

  if (maxHalf <= knifeHalf) return 1;
  return clamp(1 - (halfBeam - knifeHalf) / (maxHalf - knifeHalf), 0, 1);
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
