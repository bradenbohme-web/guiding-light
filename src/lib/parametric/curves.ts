// Curve evaluation utilities for parametric surfaces

import { Curve1D } from "./types";

// Create a bezier curve from control points
export function createBezierCurve(controlPoints: number[]): Curve1D {
  const n = controlPoints.length - 1;
  
  return {
    controlPoints: [...controlPoints],
    eval(u: number): number {
      // Clamp u to [0, 1]
      u = Math.max(0, Math.min(1, u));
      
      // De Casteljau's algorithm for Bezier evaluation
      const points = [...controlPoints];
      for (let r = 1; r <= n; r++) {
        for (let i = 0; i <= n - r; i++) {
          points[i] = (1 - u) * points[i] + u * points[i + 1];
        }
      }
      return points[0];
    }
  };
}

// Smoothstep interpolation
export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

// Smooth envelope function for localized effects
export function envelope(u: number, u0: number, width: number, power: number = 1): number {
  const dist = Math.abs(u - u0);
  if (dist > width) return 0;
  const t = 1 - dist / width;
  return Math.pow(t, power);
}

// Linear interpolation
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

// Evaluate beam curve B(u) - half-width distribution
export function evalBeamCurve(u: number, params: {
  beam: number;
  bowTaperMin: number;
  sternTaperMin: number;
  taperPower: number;
  bowTipPoint: number;
  bowTipRound: number;
}): number {
  const { beam, bowTaperMin, sternTaperMin, taperPower, bowTipPoint, bowTipRound } = params;
  const halfBeam = beam / 2;
  
  // Base taper envelope
  let taperFactor = 1;
  
  // Bow taper (u approaching 1)
  if (u > 0.5) {
    const bowU = (u - 0.5) * 2; // 0 to 1 over bow half
    const bowTaper = 1 - Math.pow(bowU, taperPower) * (1 - bowTaperMin);
    taperFactor *= bowTaper;
  }
  
  // Stern taper (u approaching 0)
  if (u < 0.5) {
    const sternU = (0.5 - u) * 2; // 0 to 1 over stern half
    const sternTaper = 1 - Math.pow(sternU, taperPower) * (1 - sternTaperMin);
    taperFactor *= sternTaper;
  }
  
  // Bow tip shaping
  if (u > 0.9) {
    const tipU = (u - 0.9) / 0.1;
    const tipFactor = 1 - tipU * bowTipPoint;
    const roundFactor = lerp(1, Math.cos(tipU * Math.PI / 2), bowTipRound);
    taperFactor *= tipFactor * roundFactor;
  }
  
  return halfBeam * Math.max(0.001, taperFactor);
}

// Evaluate keel curve K(u) - bottom profile with rocker
export function evalKeelCurve(u: number, params: {
  rockerAmp: number;
  bowLiftAmp: number;
}): number {
  const { rockerAmp, bowLiftAmp } = params;
  
  // Base rocker (parabolic)
  const centered = (u - 0.5) * 2; // -1 to 1
  let y = rockerAmp * centered * centered;
  
  // Bow lift
  if (u > 0.85) {
    const bowU = (u - 0.85) / 0.15;
    y += bowLiftAmp * smoothstep(0, 1, bowU);
  }
  
  return y;
}

// Evaluate deck curve D(u) - top profile
export function evalDeckCurve(u: number, params: {
  height: number;
  sternDeckDrop: number;
}): number {
  const { height, sternDeckDrop } = params;
  
  let y = height;
  
  // Stern deck drop
  if (u < 0.15) {
    const sternU = u / 0.15;
    y -= sternDeckDrop * (1 - smoothstep(0, 1, sternU));
  }
  
  return y;
}
