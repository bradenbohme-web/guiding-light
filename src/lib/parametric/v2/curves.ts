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
// LASER HALF-BREADTH OFFSET TABLE
// ============================================
// Derived from ILCA class measurement diagrams and known Laser geometry.
// u = 0 is STERN, u = 1 is BOW.
// Values are half-beam in metres for a 4.23m LOA, 1.37m max beam hull.
// These are the ground truth — the planform MUST pass through these points.

const LASER_OFFSETS: { u: number; halfBeam: number }[] = [
  { u: 0.000, halfBeam: 0.575 },  // Transom — ~84% of max beam
  { u: 0.025, halfBeam: 0.590 },  // Just forward of transom, slight flare
  { u: 0.050, halfBeam: 0.610 },
  { u: 0.100, halfBeam: 0.645 },  // Stern quarter — widening
  { u: 0.150, halfBeam: 0.665 },
  { u: 0.200, halfBeam: 0.678 },
  { u: 0.250, halfBeam: 0.685 },  // Approaching max beam
  { u: 0.300, halfBeam: 0.685 },  // Max beam zone — broad and flat
  { u: 0.350, halfBeam: 0.685 },  // Still at max beam
  { u: 0.400, halfBeam: 0.683 },  // Very slight narrowing begins
  { u: 0.450, halfBeam: 0.678 },
  { u: 0.500, halfBeam: 0.665 },  // Midship — starting to taper
  { u: 0.550, halfBeam: 0.645 },
  { u: 0.600, halfBeam: 0.615 },  // Forward — taper accelerating
  { u: 0.650, halfBeam: 0.575 },
  { u: 0.700, halfBeam: 0.520 },
  { u: 0.750, halfBeam: 0.450 },  // Bow quarter — rapid narrowing
  { u: 0.800, halfBeam: 0.365 },
  { u: 0.850, halfBeam: 0.270 },
  { u: 0.900, halfBeam: 0.175 },  // Approaching stem
  { u: 0.925, halfBeam: 0.125 },
  { u: 0.950, halfBeam: 0.080 },
  { u: 0.975, halfBeam: 0.045 },
  { u: 1.000, halfBeam: 0.030 },  // Knife edge / stem
];

// Catmull-Rom spline interpolation through offset table
function catmullRomInterp(offsets: { u: number; halfBeam: number }[], uQuery: number): number {
  const n = offsets.length;
  const u = clamp(uQuery, offsets[0].u, offsets[n - 1].u);

  // Find the segment
  let idx = 0;
  for (let i = 0; i < n - 1; i++) {
    if (u >= offsets[i].u && u <= offsets[i + 1].u) {
      idx = i;
      break;
    }
  }

  // Four control points for Catmull-Rom (clamp at boundaries)
  const p0 = offsets[Math.max(0, idx - 1)];
  const p1 = offsets[idx];
  const p2 = offsets[Math.min(n - 1, idx + 1)];
  const p3 = offsets[Math.min(n - 1, idx + 2)];

  const segLen = p2.u - p1.u;
  if (segLen < 1e-9) return p1.halfBeam;
  const t = (u - p1.u) / segLen;
  const t2 = t * t;
  const t3 = t2 * t;

  // Catmull-Rom basis (tension = 0.5)
  const v = 0.5 * (
    (2 * p1.halfBeam) +
    (-p0.halfBeam + p2.halfBeam) * t +
    (2 * p0.halfBeam - 5 * p1.halfBeam + 4 * p2.halfBeam - p3.halfBeam) * t2 +
    (-p0.halfBeam + 3 * p1.halfBeam - 3 * p2.halfBeam + p3.halfBeam) * t3
  );

  return Math.max(0.005, v);
}

// ============================================
// BEAM CURVE B(u) - Half-width distribution
// u=0 is STERN, u=1 is BOW
// Uses Catmull-Rom through real Laser offsets, then applies
// user adjustments as proportional deltas from baseline.
// ============================================

export function evalBeamV2(u: number, params: HullV2Params): number {
  const { beam } = params.dimensions;
  const { sternWidth, maxBeamPos, sternBlend, interpolation } = params.beam;
  const { knifeWidth, noseBluntness } = params.bow;

  const uClamped = clamp(u, 0, 1);
  const halfBeam = beam / 2;

  // Base shape: Catmull-Rom through Laser offset table
  // Scale the table values proportionally to the current beam parameter
  const scaleFactor = halfBeam / 0.685; // 0.685 = max half-beam in table
  let baseValue = catmullRomInterp(LASER_OFFSETS, uClamped) * scaleFactor;

  // Apply user adjustments as DELTAS from baseline, not replacements:

  // 1. maxBeamPos shift: laterally shifts the widest point
  //    Default is ~0.30 in the table. User param shifts the peak.
  const defaultMaxPos = 0.325; // center of the flat max-beam zone in table
  const posShift = maxBeamPos - defaultMaxPos;
  if (Math.abs(posShift) > 0.01) {
    // Re-query the table with shifted u to move the peak
    const shiftedU = clamp(uClamped - posShift * 0.8, 0, 1);
    baseValue = catmullRomInterp(LASER_OFFSETS, shiftedU) * scaleFactor;
  }

  // 2. sternWidth: scale the stern region proportionally
  const defaultSternRatio = 0.575 / 0.685; // ~0.839
  if (uClamped < 0.15) {
    const sternT = uClamped / 0.15;
    const sternAdjust = sternWidth / defaultSternRatio;
    const blend = 1 - smootherstep(sternT);
    baseValue *= lerp(sternAdjust, 1.0, blend);
  }

  // 3. Knife width at bow tip
  const stemHalf = clamp(knifeWidth / 2, 0.005, halfBeam * 0.15);
  if (uClamped > 0.9) {
    const bowT = (uClamped - 0.9) / 0.1;
    baseValue = lerp(baseValue, stemHalf, smootherstep(bowT));
  }

  // 4. noseBluntness softens the final convergence
  if (uClamped > 0.85 && noseBluntness > 0) {
    const bluntT = (uClamped - 0.85) / 0.15;
    const bluntInflate = noseBluntness * 0.03 * scaleFactor * (1 - bluntT);
    baseValue += bluntInflate * smootherstep(bluntT);
  }

  return clamp(baseValue, stemHalf, halfBeam);
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
