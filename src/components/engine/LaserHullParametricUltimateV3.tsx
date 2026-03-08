import * as React from "react";
import * as THREE from "three";
import { GroupProps } from "@react-three/fiber";
import { Line } from "@react-three/drei";

type ScalarPoint = [number, number];

type LoftGrid = {
  vertices: number[];
  indices: number[];
};

export type LaserBlueprintReference = {
  planHalfBeamCurve: ScalarPoint[];
  sheerCurve: ScalarPoint[];
  keelCurve: ScalarPoint[];
  bodySectionCurve: ScalarPoint[];
  cockpitOpeningCurve: ScalarPoint[];
  cockpitFloorCurve: ScalarPoint[];
};

export const LASER_BLUEPRINT_REFERENCE: LaserBlueprintReference = {
  // Reconstructed from the supplied orthographic sheet, then regularized for a smooth parametric surface.
  // X axis is normalized by overall length. Y values are normalized shape magnitudes.
  planHalfBeamCurve: [
    [0.0, 1.0],
    [0.04, 1.005],
    [0.08, 1.018],
    [0.125, 1.03],
    [0.1875, 1.045],
    [0.25, 1.055],
    [0.3125, 1.06],
    [0.375, 1.06],
    [0.4375, 1.052],
    [0.5, 1.03],
    [0.5625, 0.995],
    [0.625, 0.935],
    [0.6875, 0.855],
    [0.75, 0.735],
    [0.8125, 0.59],
    [0.875, 0.43],
    [0.9375, 0.24],
    [1.0, 0.0],
  ],
  // Heights in meters in the model coordinate system.
  sheerCurve: [
    [0.0, 0.415],
    [0.06, 0.408],
    [0.14, 0.41],
    [0.24, 0.415],
    [0.36, 0.422],
    [0.5, 0.432],
    [0.64, 0.444],
    [0.78, 0.456],
    [0.9, 0.468],
    [1.0, 0.478],
  ],
  keelCurve: [
    [0.0, 0.118],
    [0.04, 0.085],
    [0.1, 0.055],
    [0.2, 0.024],
    [0.35, 0.0],
    [0.55, -0.008],
    [0.72, -0.004],
    [0.84, 0.014],
    [0.92, 0.05],
    [0.97, 0.15],
    [1.0, 0.325],
  ],
  // Normalized half-section from keel (0,0) to sheer (1,1) based on the supplied body plan.
  bodySectionCurve: [
    [0.0, 0.0],
    [0.06, 0.01],
    [0.13, 0.026],
    [0.22, 0.06],
    [0.34, 0.125],
    [0.5, 0.25],
    [0.66, 0.44],
    [0.8, 0.67],
    [0.92, 0.9],
    [1.0, 1.0],
  ],
  // Opening and tub width are absolute half widths in meters.
  cockpitOpeningCurve: [
    [0.0, 0.0],
    [0.205, 0.0],
    [0.225, 0.335],
    [0.32, 0.338],
    [0.46, 0.338],
    [0.57, 0.332],
    [0.62, 0.29],
    [0.675, 0.0],
    [1.0, 0.0],
  ],
  cockpitFloorCurve: [
    [0.0, 0.0],
    [0.225, 0.0],
    [0.255, 0.235],
    [0.34, 0.24],
    [0.48, 0.245],
    [0.58, 0.236],
    [0.63, 0.18],
    [0.675, 0.0],
    [1.0, 0.0],
  ],
};

export type LaserHullUltimateParams = {
  length: number;
  beam: number;
  shellThickness: number;
  deckMargin: number;
  deckCamberCurve: ScalarPoint[];
  planHalfBeamCurve: ScalarPoint[];
  sheerCurve: ScalarPoint[];
  keelCurve: ScalarPoint[];
  sectionFloorCurve: ScalarPoint[];
  sectionBottomRiseCurve: ScalarPoint[];
  sectionBilgeCurve: ScalarPoint[];
  sectionBilgeHeightCurve: ScalarPoint[];
  sectionSheerPullCurve: ScalarPoint[];
  sectionSheerTensionCurve: ScalarPoint[];
  stations: number;
  sectionSamples: number;
  deckSamples: number;
  deckWidthSamples: number;
  cockpitSamples: number;
  cockpitVerticalSamples: number;
  cockpitFloorDish: number;
  cockpitOpeningCurve: ScalarPoint[];
  cockpitFloorCurve: ScalarPoint[];
  cockpitFloorZCurve: ScalarPoint[];
  coamingHeightCurve: ScalarPoint[];
  coamingOutboard: number;
  coamingThickness: number;
  trunkX: number;
  trunkLength: number;
  trunkWidth: number;
  trunkHeight: number;
  trunkWall: number;
  mastX: number;
  mastRadius: number;
  mastTubeDepth: number;
  daggerboardChord: number;
  daggerboardThickness: number;
  daggerboardSpan: number;
  rudderChord: number;
  rudderThickness: number;
  rudderSpan: number;
  includeCockpit: boolean;
  includeCenterboardCase: boolean;
  includeFoils: boolean;
  includeMastStep: boolean;
  includeCoaming: boolean;
  includeTiller: boolean;
  stemBlendStart: number;
  debug: boolean;
};

export const defaultLaserHullUltimateParams: LaserHullUltimateParams = {
  length: 4.23,
  beam: 1.37,
  shellThickness: 0.012,
  deckMargin: 0.022,
  planHalfBeamCurve: LASER_BLUEPRINT_REFERENCE.planHalfBeamCurve,
  sheerCurve: LASER_BLUEPRINT_REFERENCE.sheerCurve,
  keelCurve: LASER_BLUEPRINT_REFERENCE.keelCurve,
  deckCamberCurve: [
    [0.0, 0.018],
    [0.12, 0.022],
    [0.3, 0.028],
    [0.5, 0.03],
    [0.72, 0.022],
    [0.9, 0.014],
    [1.0, 0.01],
  ],
  sectionFloorCurve: [
    [0.0, 0.3],
    [0.08, 0.24],
    [0.2, 0.18],
    [0.4, 0.13],
    [0.58, 0.12],
    [0.74, 0.14],
    [0.9, 0.1],
    [1.0, 0.04],
  ],
  sectionBottomRiseCurve: [
    [0.0, 0.045],
    [0.16, 0.03],
    [0.36, 0.02],
    [0.58, 0.018],
    [0.78, 0.032],
    [0.92, 0.08],
    [1.0, 0.18],
  ],
  sectionBilgeCurve: [
    [0.0, 0.45],
    [0.12, 0.42],
    [0.28, 0.4],
    [0.5, 0.38],
    [0.7, 0.42],
    [0.86, 0.48],
    [1.0, 0.56],
  ],
  sectionBilgeHeightCurve: [
    [0.0, 0.22],
    [0.16, 0.2],
    [0.34, 0.22],
    [0.5, 0.25],
    [0.7, 0.29],
    [0.86, 0.34],
    [1.0, 0.46],
  ],
  sectionSheerPullCurve: [
    [0.0, 1.0],
    [0.2, 0.98],
    [0.45, 0.97],
    [0.7, 0.965],
    [0.88, 0.955],
    [1.0, 0.92],
  ],
  sectionSheerTensionCurve: [
    [0.0, 1.0],
    [0.2, 0.95],
    [0.5, 0.92],
    [0.8, 0.88],
    [1.0, 0.8],
  ],
  stations: 128,
  sectionSamples: 40,
  deckSamples: 140,
  deckWidthSamples: 18,
  cockpitSamples: 96,
  cockpitVerticalSamples: 12,
  cockpitFloorDish: 0.012,
  cockpitOpeningCurve: LASER_BLUEPRINT_REFERENCE.cockpitOpeningCurve,
  cockpitFloorCurve: LASER_BLUEPRINT_REFERENCE.cockpitFloorCurve,
  cockpitFloorZCurve: [
    [0.0, 0.0],
    [0.225, 0.0],
    [0.255, 0.155],
    [0.38, 0.162],
    [0.52, 0.168],
    [0.62, 0.178],
    [0.675, 0.0],
    [1.0, 0.0],
  ],
  coamingHeightCurve: [
    [0.0, 0.0],
    [0.225, 0.0],
    [0.255, 0.075],
    [0.42, 0.082],
    [0.56, 0.085],
    [0.62, 0.07],
    [0.675, 0.0],
    [1.0, 0.0],
  ],
  coamingOutboard: 0.018,
  coamingThickness: 0.012,
  trunkX: 2.03,
  trunkLength: 0.84,
  trunkWidth: 0.09,
  trunkHeight: 0.355,
  trunkWall: 0.01,
  mastX: 2.93,
  mastRadius: 0.035,
  mastTubeDepth: 0.46,
  daggerboardChord: 0.92,
  daggerboardThickness: 0.028,
  daggerboardSpan: 1.05,
  rudderChord: 0.69,
  rudderThickness: 0.026,
  rudderSpan: 0.92,
  includeCockpit: true,
  includeCenterboardCase: true,
  includeFoils: true,
  includeMastStep: true,
  includeCoaming: true,
  includeTiller: true,
  stemBlendStart: 0.965,
  debug: false,
};

function mergeParams(overrides?: Partial<LaserHullUltimateParams>): LaserHullUltimateParams {
  return {
    ...defaultLaserHullUltimateParams,
    ...overrides,
    deckCamberCurve: overrides?.deckCamberCurve ?? defaultLaserHullUltimateParams.deckCamberCurve,
    planHalfBeamCurve: overrides?.planHalfBeamCurve ?? defaultLaserHullUltimateParams.planHalfBeamCurve,
    sheerCurve: overrides?.sheerCurve ?? defaultLaserHullUltimateParams.sheerCurve,
    keelCurve: overrides?.keelCurve ?? defaultLaserHullUltimateParams.keelCurve,
    sectionFloorCurve: overrides?.sectionFloorCurve ?? defaultLaserHullUltimateParams.sectionFloorCurve,
    sectionBottomRiseCurve: overrides?.sectionBottomRiseCurve ?? defaultLaserHullUltimateParams.sectionBottomRiseCurve,
    sectionBilgeCurve: overrides?.sectionBilgeCurve ?? defaultLaserHullUltimateParams.sectionBilgeCurve,
    sectionBilgeHeightCurve: overrides?.sectionBilgeHeightCurve ?? defaultLaserHullUltimateParams.sectionBilgeHeightCurve,
    sectionSheerPullCurve: overrides?.sectionSheerPullCurve ?? defaultLaserHullUltimateParams.sectionSheerPullCurve,
    sectionSheerTensionCurve: overrides?.sectionSheerTensionCurve ?? defaultLaserHullUltimateParams.sectionSheerTensionCurve,
    cockpitOpeningCurve: overrides?.cockpitOpeningCurve ?? defaultLaserHullUltimateParams.cockpitOpeningCurve,
    cockpitFloorCurve: overrides?.cockpitFloorCurve ?? defaultLaserHullUltimateParams.cockpitFloorCurve,
    cockpitFloorZCurve: overrides?.cockpitFloorZCurve ?? defaultLaserHullUltimateParams.cockpitFloorZCurve,
    coamingHeightCurve: overrides?.coamingHeightCurve ?? defaultLaserHullUltimateParams.coamingHeightCurve,
  };
}

function clamp01(v: number) {
  return Math.min(1, Math.max(0, v));
}

function monotoneCubic1D(points: ScalarPoint[], t: number): number {
  const n = points.length;
  if (n === 0) return 0;
  if (n === 1) return points[0][1];

  const tt = clamp01(t);
  if (tt <= points[0][0]) return points[0][1];
  if (tt >= points[n - 1][0]) return points[n - 1][1];

  const xs = points.map((p) => p[0]);
  const ys = points.map((p) => p[1]);
  const h = new Array<number>(n - 1);
  const d = new Array<number>(n - 1);

  for (let i = 0; i < n - 1; i++) {
    h[i] = Math.max(xs[i + 1] - xs[i], 1e-6);
    d[i] = (ys[i + 1] - ys[i]) / h[i];
  }

  const m = new Array<number>(n);
  m[0] = d[0];
  m[n - 1] = d[n - 2];

  for (let i = 1; i < n - 1; i++) {
    if (d[i - 1] === 0 || d[i] === 0 || Math.sign(d[i - 1]) !== Math.sign(d[i])) {
      m[i] = 0;
    } else {
      const w1 = 2 * h[i] + h[i - 1];
      const w2 = h[i] + 2 * h[i - 1];
      m[i] = (w1 + w2) / (w1 / d[i - 1] + w2 / d[i]);
    }
  }

  let i = 0;
  while (i < n - 1 && tt > xs[i + 1]) i++;

  const hi = h[i];
  const u = clamp01((tt - xs[i]) / hi);
  const u2 = u * u;
  const u3 = u2 * u;

  const h00 = 2 * u3 - 3 * u2 + 1;
  const h10 = u3 - 2 * u2 + u;
  const h01 = -2 * u3 + 3 * u2;
  const h11 = u3 - u2;

  const y = h00 * ys[i] + h10 * hi * m[i] + h01 * ys[i + 1] + h11 * hi * m[i + 1];
  const lo = Math.min(ys[i], ys[i + 1]);
  const hiClamp = Math.max(ys[i], ys[i + 1]);
  return THREE.MathUtils.clamp(y, lo, hiClamp);
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp01((x - edge0) / Math.max(edge1 - edge0, 1e-6));
  return t * t * (3 - 2 * t);
}

function curve1D(points: ScalarPoint[], t: number): number {
  return monotoneCubic1D(points, t);
}

function cubic2(a: THREE.Vector2, b: THREE.Vector2, c: THREE.Vector2, d: THREE.Vector2, t: number) {
  const mt = 1 - t;
  const mt2 = mt * mt;
  const mt3 = mt2 * mt;
  const t2 = t * t;
  const t3 = t2 * t;
  return new THREE.Vector2(
    mt3 * a.x + 3 * mt2 * t * b.x + 3 * mt * t2 * c.x + t3 * d.x,
    mt3 * a.y + 3 * mt2 * t * b.y + 3 * mt * t2 * c.y + t3 * d.y
  );
}

function buildIndexedGeometry(vertices: number[], indices: number[]) {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  geometry.computeBoundingBox();
  geometry.computeBoundingSphere();
  return geometry;
}

function loftRows(rows: number[][], reverse = false): LoftGrid {
  const vertices: number[] = [];
  const indices: number[] = [];
  const grid: number[][] = [];

  for (const row of rows) {
    const rowIndices: number[] = [];
    for (let i = 0; i < row.length; i += 3) {
      rowIndices.push(vertices.length / 3);
      vertices.push(row[i], row[i + 1], row[i + 2]);
    }
    grid.push(rowIndices);
  }

  for (let i = 0; i < grid.length - 1; i++) {
    for (let j = 0; j < grid[i].length - 1; j++) {
      const a = grid[i][j];
      const b = grid[i + 1][j];
      const c = grid[i + 1][j + 1];
      const d = grid[i][j + 1];
      if (reverse) {
        indices.push(a, c, b, a, d, c);
      } else {
        indices.push(a, b, c, a, c, d);
      }
    }
  }

  return { vertices, indices };
}

function appendGeometry(target: LoftGrid, source: LoftGrid) {
  const offset = target.vertices.length / 3;
  target.vertices.push(...source.vertices);
  target.indices.push(...source.indices.map((i) => i + offset));
}

function halfBeamAt(params: LaserHullUltimateParams, s: number) {
  return 0.5 * params.beam * Math.max(0, curve1D(params.planHalfBeamCurve, s));
}

function sheerZAt(params: LaserHullUltimateParams, s: number) {
  return curve1D(params.sheerCurve, s);
}

function keelZAt(params: LaserHullUltimateParams, s: number) {
  return curve1D(params.keelCurve, s);
}

function deckZAt(params: LaserHullUltimateParams, x: number, y: number) {
  const s = clamp01(x / params.length);
  const hb = Math.max(halfBeamAt(params, s), 1e-6);
  const crown = curve1D(params.deckCamberCurve, s) * (1 - Math.pow(Math.abs(y) / hb, 2));
  return sheerZAt(params, s) + crown;
}

function cockpitOpeningHalfWidthAt(params: LaserHullUltimateParams, s: number) {
  return Math.max(0, curve1D(params.cockpitOpeningCurve, s));
}

function cockpitFloorHalfWidthAt(params: LaserHullUltimateParams, s: number) {
  return Math.max(0, curve1D(params.cockpitFloorCurve, s));
}

function cockpitFloorZAt(params: LaserHullUltimateParams, s: number) {
  const base = keelZAt(params, s) + curve1D(params.cockpitFloorZCurve, s);
  return base;
}

function coamingHeightAt(params: LaserHullUltimateParams, s: number) {
  return Math.max(0, curve1D(params.coamingHeightCurve, s));
}

function sectionControlPoints(params: LaserHullUltimateParams, s: number) {
  const hb = Math.max(halfBeamAt(params, s), 1e-6);
  const z0 = keelZAt(params, s);
  const z3 = sheerZAt(params, s);
  const depth = Math.max(z3 - z0, 1e-5);
  const floor = curve1D(params.sectionFloorCurve, s);
  const bottomRise = curve1D(params.sectionBottomRiseCurve, s);
  const bilge = curve1D(params.sectionBilgeCurve, s);
  const bilgeHeight = curve1D(params.sectionBilgeHeightCurve, s);
  const sheerPull = curve1D(params.sectionSheerPullCurve, s);
  const sheerTension = curve1D(params.sectionSheerTensionCurve, s);

  const p0 = new THREE.Vector2(0, z0);
  const p1 = new THREE.Vector2(hb * floor, z0 + depth * bottomRise);
  const p2 = new THREE.Vector2(hb * bilge * sheerPull, z0 + depth * bilgeHeight);
  const p3 = new THREE.Vector2(hb, z3);

  return { p0, p1, p2, p3, sheerTension };
}

function buildHullGeometry(params: LaserHullUltimateParams) {
  const verts: number[] = [];
  const indices: number[] = [];
  const rows = params.stations;
  const cols = params.sectionSamples * 2 - 1;
  const grid: number[][] = [];
  const bowKeelZ = keelZAt(params, 1);
  const bowSheerZ = sheerZAt(params, 1);

  for (let i = 0; i < rows; i++) {
    const s = i / (rows - 1);
    const xBase = s * params.length;
    const stemBlend = smoothstep(params.stemBlendStart, 1, s);
    const x = THREE.MathUtils.lerp(xBase, params.length, stemBlend);
    const { p0, p1, p2, p3, sheerTension } = sectionControlPoints(params, s);
    const halfSection: THREE.Vector2[] = [];

    for (let j = 0; j < params.sectionSamples; j++) {
      const tRaw = j / (params.sectionSamples - 1);
      const t = Math.pow(tRaw, sheerTension);
      const p = cubic2(p0, p1, p2, p3, t);

      if (stemBlend > 0) {
        const stemZ = THREE.MathUtils.lerp(bowKeelZ, bowSheerZ, Math.pow(tRaw, 1.05));
        p.x *= 1 - stemBlend;
        p.y = THREE.MathUtils.lerp(p.y, stemZ, stemBlend);
      }

      halfSection.push(p);
    }

    const fullSection: THREE.Vector2[] = [];
    for (let j = halfSection.length - 1; j > 0; j--) {
      const p = halfSection[j];
      fullSection.push(new THREE.Vector2(-p.x, p.y));
    }
    for (const p of halfSection) fullSection.push(p.clone());

    const row: number[] = [];
    for (const p of fullSection) {
      row.push(verts.length / 3);
      verts.push(x, p.x, p.y);
    }
    grid.push(row);
  }

  for (let i = 0; i < rows - 1; i++) {
    for (let j = 0; j < cols - 1; j++) {
      const a = grid[i][j];
      const b = grid[i + 1][j];
      const c = grid[i + 1][j + 1];
      const d = grid[i][j + 1];
      indices.push(a, b, c, a, c, d);
    }
  }

  const sternCenter = new THREE.Vector3(0, 0, (sheerZAt(params, 0) + keelZAt(params, 0)) * 0.5);
  const sternCenterIndex = verts.length / 3;
  verts.push(sternCenter.x, sternCenter.y, sternCenter.z);
  for (let j = 0; j < cols - 1; j++) {
    indices.push(sternCenterIndex, grid[0][j + 1], grid[0][j]);
  }

  return buildIndexedGeometry(verts, indices);
}

function buildDeckGeometry(params: LaserHullUltimateParams, side: 1 | -1) {
  const rows: number[][] = [];

  for (let i = 0; i < params.deckSamples; i++) {
    const s = i / (params.deckSamples - 1);
    const x = s * params.length;
    const outer = Math.max(halfBeamAt(params, s), 1e-5);
    const open = cockpitOpeningHalfWidthAt(params, s);
    const inner = open > 0 ? Math.min(open + params.deckMargin, outer - 0.01) : 0;
    const row: number[] = [];

    for (let j = 0; j < params.deckWidthSamples; j++) {
      const t = j / (params.deckWidthSamples - 1);
      const y = (inner + (outer - inner) * t) * side;
      row.push(x, y, deckZAt(params, x, y));
    }
    rows.push(row);
  }

  const loft = loftRows(rows, side < 0);
  return buildIndexedGeometry(loft.vertices, loft.indices);
}

function buildCockpitFloorGeometry(params: LaserHullUltimateParams) {
  const rows: number[][] = [];
  for (let i = 0; i < params.cockpitSamples; i++) {
    const s = i / (params.cockpitSamples - 1);
    const open = cockpitFloorHalfWidthAt(params, s);
    if (open <= 1e-5) continue;
    const x = s * params.length;
    const baseZ = cockpitFloorZAt(params, s);
    const row: number[] = [];

    for (let j = 0; j < params.deckWidthSamples; j++) {
      const t = -1 + (2 * j) / (params.deckWidthSamples - 1);
      const y = open * t;
      const dish = params.cockpitFloorDish * (1 - Math.pow(Math.abs(t), 1.65));
      row.push(x, y, baseZ - dish);
    }
    rows.push(row);
  }

  const loft = loftRows(rows, false);
  return buildIndexedGeometry(loft.vertices, loft.indices);
}

function buildCockpitWallGeometry(params: LaserHullUltimateParams, side: 1 | -1) {
  const rows: number[][] = [];
  for (let i = 0; i < params.cockpitSamples; i++) {
    const s = i / (params.cockpitSamples - 1);
    const open = cockpitOpeningHalfWidthAt(params, s);
    const floor = cockpitFloorHalfWidthAt(params, s);
    if (open <= 1e-5 || floor <= 1e-5) continue;
    const x = s * params.length;
    const deckEdgeY = (open + params.deckMargin * 0.35) * side;
    const floorEdgeY = floor * side;
    const zTop = deckZAt(params, x, deckEdgeY);
    const zBottom = cockpitFloorZAt(params, s);
    const row: number[] = [];

    for (let j = 0; j < params.cockpitVerticalSamples; j++) {
      const t = j / (params.cockpitVerticalSamples - 1);
      const tCurve = 1 - Math.pow(1 - t, 1.5);
      const y = THREE.MathUtils.lerp(deckEdgeY, floorEdgeY, tCurve);
      const z = THREE.MathUtils.lerp(zTop, zBottom, Math.pow(t, 1.12));
      row.push(x, y, z);
    }
    rows.push(row);
  }

  const loft = loftRows(rows, side < 0);
  return buildIndexedGeometry(loft.vertices, loft.indices);
}

function buildCockpitBulkhead(params: LaserHullUltimateParams, s: number, flipWinding: boolean) {
  const open = cockpitOpeningHalfWidthAt(params, s);
  const floor = cockpitFloorHalfWidthAt(params, s);
  if (open <= 0 || floor <= 0) return undefined;

  const x = s * params.length;
  const verts: number[] = [];
  const indices: number[] = [];
  const perimeter: THREE.Vector3[] = [];
  const steps = 26;

  for (let i = 0; i < steps; i++) {
    const t = i / (steps - 1);
    const y = -open + 2 * open * t;
    perimeter.push(new THREE.Vector3(x, y, deckZAt(params, x, y)));
  }
  for (let i = 0; i < steps; i++) {
    const t = i / (steps - 1);
    const y = floor - 2 * floor * t;
    perimeter.push(new THREE.Vector3(x, y, cockpitFloorZAt(params, s)));
  }

  const center = perimeter.reduce((acc, p) => acc.add(p), new THREE.Vector3()).multiplyScalar(1 / perimeter.length);
  for (const p of perimeter) verts.push(p.x, p.y, p.z);
  const centerIndex = verts.length / 3;
  verts.push(center.x, center.y, center.z);

  for (let i = 0; i < perimeter.length; i++) {
    const a = i;
    const b = (i + 1) % perimeter.length;
    if (flipWinding) {
      indices.push(centerIndex, a, b);
    } else {
      indices.push(centerIndex, b, a);
    }
  }

  return buildIndexedGeometry(verts, indices);
}

function buildCoamingGeometry(params: LaserHullUltimateParams, side: 1 | -1) {
  const outerRows: number[][] = [];
  const topRows: number[][] = [];

  for (let i = 0; i < params.cockpitSamples; i++) {
    const s = i / (params.cockpitSamples - 1);
    const open = cockpitOpeningHalfWidthAt(params, s);
    const h = coamingHeightAt(params, s);
    if (open <= 1e-5 || h <= 1e-5) continue;

    const x = s * params.length;
    const baseY = (open + params.deckMargin * 0.25) * side;
    const baseZ = deckZAt(params, x, baseY);
    const outerY = baseY + params.coamingOutboard * side;
    const outerZ = baseZ + h;
    const innerY = outerY - params.coamingThickness * side;
    const innerZ = outerZ - params.coamingThickness * 0.35;

    outerRows.push([x, baseY, baseZ, x, outerY, outerZ]);
    topRows.push([x, innerY, innerZ, x, outerY, outerZ]);
  }

  const outer = loftRows(outerRows, side < 0);
  const top = loftRows(topRows, side > 0);
  const merged: LoftGrid = { vertices: [], indices: [] };
  appendGeometry(merged, outer);
  appendGeometry(merged, top);
  return buildIndexedGeometry(merged.vertices, merged.indices);
}

function roundedBoxGeometry(width: number, depth: number, height: number, radius: number) {
  const shape = new THREE.Shape();
  const hw = width * 0.5;
  const hd = depth * 0.5;
  const r = Math.min(radius, hw, hd);
  shape.moveTo(-hw + r, -hd);
  shape.lineTo(hw - r, -hd);
  shape.quadraticCurveTo(hw, -hd, hw, -hd + r);
  shape.lineTo(hw, hd - r);
  shape.quadraticCurveTo(hw, hd, hw - r, hd);
  shape.lineTo(-hw + r, hd);
  shape.quadraticCurveTo(-hw, hd, -hw, hd - r);
  shape.lineTo(-hw, -hd + r);
  shape.quadraticCurveTo(-hw, -hd, -hw + r, -hd);

  const geom = new THREE.ExtrudeGeometry(shape, {
    depth: height,
    bevelEnabled: false,
    curveSegments: 10,
    steps: 1,
  });
  geom.rotateX(Math.PI * 0.5);
  geom.translate(0, 0, -height * 0.5);
  geom.computeVertexNormals();
  return geom;
}

function symmetricNacaShape(chord: number, thickness: number, samples = 32) {
  const shape = new THREE.Shape();
  const pts: THREE.Vector2[] = [];
  for (let i = 0; i <= samples; i++) {
    const x = i / samples;
    const yt = 5 * thickness * (
      0.2969 * Math.sqrt(x) -
      0.1260 * x -
      0.3516 * x * x +
      0.2843 * x * x * x -
      0.1015 * x * x * x * x
    );
    pts.push(new THREE.Vector2(x * chord, yt));
  }
  shape.moveTo(pts[0].x, pts[0].y);
  for (let i = 1; i < pts.length; i++) shape.lineTo(pts[i].x, pts[i].y);
  for (let i = pts.length - 1; i >= 0; i--) shape.lineTo(pts[i].x, -pts[i].y);
  shape.closePath();
  return shape;
}

function foilGeometry(chord: number, thickness: number, span: number) {
  const shape = symmetricNacaShape(chord, thickness / chord, 42);
  const geom = new THREE.ExtrudeGeometry(shape, {
    depth: span,
    bevelEnabled: false,
    steps: 1,
    curveSegments: 32,
  });
  geom.translate(-chord * 0.25, 0, -span * 0.5);
  geom.computeVertexNormals();
  return geom;
}

function buildReferenceLines(params: LaserHullUltimateParams) {
  const planUpper: THREE.Vector3[] = [];
  const planLower: THREE.Vector3[] = [];
  const sheer: THREE.Vector3[] = [];
  const keel: THREE.Vector3[] = [];

  const samples = 96;
  for (let i = 0; i < samples; i++) {
    const s = i / (samples - 1);
    const x = s * params.length;
    const hb = halfBeamAt(params, s);
    const zSheer = sheerZAt(params, s);
    const zKeel = keelZAt(params, s);
    planUpper.push(new THREE.Vector3(x, hb, zSheer + 0.002));
    planLower.push(new THREE.Vector3(x, -hb, zSheer + 0.002));
    sheer.push(new THREE.Vector3(x, 0, zSheer + 0.003));
    keel.push(new THREE.Vector3(x, 0, zKeel - 0.003));
  }

  return {
    planUpper: new THREE.BufferGeometry().setFromPoints(planUpper),
    planLower: new THREE.BufferGeometry().setFromPoints(planLower),
    sheer: new THREE.BufferGeometry().setFromPoints(sheer),
    keel: new THREE.BufferGeometry().setFromPoints(keel),
  };
}

export function useLaserHullUltimateGeometries(overrides?: Partial<LaserHullUltimateParams>) {
  return React.useMemo(() => {
    const params = mergeParams(overrides);
    const cockpitAftS = 0.225;
    const cockpitForeS = 0.675;

    return {
      params,
      hull: buildHullGeometry(params),
      deckPort: buildDeckGeometry(params, -1),
      deckStarboard: buildDeckGeometry(params, 1),
      cockpitFloor: params.includeCockpit ? buildCockpitFloorGeometry(params) : undefined,
      cockpitWallPort: params.includeCockpit ? buildCockpitWallGeometry(params, -1) : undefined,
      cockpitWallStarboard: params.includeCockpit ? buildCockpitWallGeometry(params, 1) : undefined,
      cockpitAft: params.includeCockpit ? buildCockpitBulkhead(params, cockpitAftS, false) : undefined,
      cockpitFore: params.includeCockpit ? buildCockpitBulkhead(params, cockpitForeS, true) : undefined,
      coamingPort: params.includeCockpit && params.includeCoaming ? buildCoamingGeometry(params, -1) : undefined,
      coamingStarboard: params.includeCockpit && params.includeCoaming ? buildCoamingGeometry(params, 1) : undefined,
      centerboardCase: params.includeCenterboardCase ? roundedBoxGeometry(params.trunkLength, params.trunkWidth, params.trunkHeight, 0.012) : undefined,
      mastTube: params.includeMastStep ? new THREE.CylinderGeometry(params.mastRadius, params.mastRadius, params.mastTubeDepth, 32, 1, false) : undefined,
      mastPartner: params.includeMastStep ? new THREE.CylinderGeometry(params.mastRadius * 1.45, params.mastRadius * 1.45, 0.02, 32, 1, false) : undefined,
      daggerboard: params.includeFoils ? foilGeometry(params.daggerboardChord, params.daggerboardThickness, params.daggerboardSpan) : undefined,
      rudder: params.includeFoils ? foilGeometry(params.rudderChord, params.rudderThickness, params.rudderSpan) : undefined,
      referenceLines: params.debug ? buildReferenceLines(params) : undefined,
    };
  }, [JSON.stringify(overrides ?? {})]);
}

export type LaserHullUltimateModelProps = GroupProps & {
  params?: Partial<LaserHullUltimateParams>;
  color?: THREE.ColorRepresentation;
  detailColor?: THREE.ColorRepresentation;
  wireframe?: boolean;
};

export function LaserHullUltimateModel({
  params: overrides,
  color = "#d6dce5",
  detailColor = "#9aa9bb",
  wireframe = false,
  ...groupProps
}: LaserHullUltimateModelProps) {
  const geo = useLaserHullUltimateGeometries(overrides);
  const params = geo.params;
  const trunkZ = cockpitFloorZAt(params, params.trunkX / params.length) + params.trunkHeight * 0.5;
  const mastDeckZ = deckZAt(params, params.mastX, 0);
  const mastTubeCenterZ = mastDeckZ - params.mastTubeDepth * 0.5 + 0.01;

  return (
    <group {...groupProps}>
      <mesh geometry={geo.hull}>
        <meshStandardMaterial color={color} wireframe={wireframe} metalness={0.05} roughness={0.82} />
      </mesh>

      <mesh geometry={geo.deckPort}>
        <meshStandardMaterial color={color} wireframe={wireframe} metalness={0.04} roughness={0.78} />
      </mesh>

      <mesh geometry={geo.deckStarboard}>
        <meshStandardMaterial color={color} wireframe={wireframe} metalness={0.04} roughness={0.78} />
      </mesh>

      {geo.cockpitFloor && (
        <mesh geometry={geo.cockpitFloor}>
          <meshStandardMaterial color={detailColor} wireframe={wireframe} metalness={0.04} roughness={0.84} />
        </mesh>
      )}

      {geo.cockpitWallPort && (
        <mesh geometry={geo.cockpitWallPort}>
          <meshStandardMaterial color={detailColor} wireframe={wireframe} metalness={0.04} roughness={0.84} />
        </mesh>
      )}

      {geo.cockpitWallStarboard && (
        <mesh geometry={geo.cockpitWallStarboard}>
          <meshStandardMaterial color={detailColor} wireframe={wireframe} metalness={0.04} roughness={0.84} />
        </mesh>
      )}

      {geo.cockpitAft && (
        <mesh geometry={geo.cockpitAft}>
          <meshStandardMaterial color={detailColor} wireframe={wireframe} metalness={0.04} roughness={0.84} />
        </mesh>
      )}

      {geo.cockpitFore && (
        <mesh geometry={geo.cockpitFore}>
          <meshStandardMaterial color={detailColor} wireframe={wireframe} metalness={0.04} roughness={0.84} />
        </mesh>
      )}

      {geo.coamingPort && (
        <mesh geometry={geo.coamingPort}>
          <meshStandardMaterial color={detailColor} wireframe={wireframe} metalness={0.04} roughness={0.8} />
        </mesh>
      )}

      {geo.coamingStarboard && (
        <mesh geometry={geo.coamingStarboard}>
          <meshStandardMaterial color={detailColor} wireframe={wireframe} metalness={0.04} roughness={0.8} />
        </mesh>
      )}

      {geo.centerboardCase && (
        <mesh geometry={geo.centerboardCase} position={[params.trunkX, 0, trunkZ]}>
          <meshStandardMaterial color={detailColor} wireframe={wireframe} metalness={0.04} roughness={0.75} />
        </mesh>
      )}

      {params.includeCenterboardCase && (
        <mesh position={[params.trunkX, 0, cockpitFloorZAt(params, params.trunkX / params.length) - 0.16]}>
          <boxGeometry args={[params.trunkLength - 0.08, params.trunkWall * 0.6, 0.36]} />
          <meshStandardMaterial color={detailColor} wireframe={wireframe} metalness={0.04} roughness={0.8} />
        </mesh>
      )}

      {geo.mastTube && (
        <mesh geometry={geo.mastTube} position={[params.mastX, 0, mastTubeCenterZ]} rotation={[Math.PI * 0.5, 0, 0]}>
          <meshStandardMaterial color={detailColor} wireframe={wireframe} metalness={0.08} roughness={0.72} />
        </mesh>
      )}

      {geo.mastPartner && (
        <mesh geometry={geo.mastPartner} position={[params.mastX, 0, mastDeckZ + 0.01]} rotation={[Math.PI * 0.5, 0, 0]}>
          <meshStandardMaterial color={detailColor} wireframe={wireframe} metalness={0.08} roughness={0.72} />
        </mesh>
      )}

      {geo.daggerboard && (
        <mesh
          geometry={geo.daggerboard}
          position={[params.trunkX + 0.02, 0, cockpitFloorZAt(params, params.trunkX / params.length) - params.daggerboardSpan * 0.48]}
          rotation={[0, Math.PI * 0.5, Math.PI * 0.5]}
        >
          <meshStandardMaterial color={detailColor} wireframe={wireframe} metalness={0.05} roughness={0.72} />
        </mesh>
      )}

      {geo.rudder && (
        <mesh
          geometry={geo.rudder}
          position={[0.03, 0, -0.16]}
          rotation={[0, Math.PI * 0.5, Math.PI * 0.5]}
        >
          <meshStandardMaterial color={detailColor} wireframe={wireframe} metalness={0.05} roughness={0.72} />
        </mesh>
      )}

      {params.includeTiller && (
        <mesh position={[0.32, 0, 0.345]} rotation={[0, 0, 0.01]}>
          <boxGeometry args={[1.12, 0.028, 0.028]} />
          <meshStandardMaterial color={detailColor} wireframe={wireframe} metalness={0.04} roughness={0.78} />
        </mesh>
      )}

      {params.debug && geo.referenceLines && (
        <>
          <Line points={Array.from(geo.referenceLines.planUpper.attributes.position.array).reduce<[number,number,number][]>((acc, v, i) => { const idx = Math.floor(i/3); if (i%3===0) acc.push([v,0,0]); else acc[idx][i%3] = v; return acc; }, [])} color="#ff5050" lineWidth={1} />
          <Line points={Array.from(geo.referenceLines.planLower.attributes.position.array).reduce<[number,number,number][]>((acc, v, i) => { const idx = Math.floor(i/3); if (i%3===0) acc.push([v,0,0]); else acc[idx][i%3] = v; return acc; }, [])} color="#ff5050" lineWidth={1} />
          <Line points={Array.from(geo.referenceLines.sheer.attributes.position.array).reduce<[number,number,number][]>((acc, v, i) => { const idx = Math.floor(i/3); if (i%3===0) acc.push([v,0,0]); else acc[idx][i%3] = v; return acc; }, [])} color="#4cff88" lineWidth={1} />
          <Line points={Array.from(geo.referenceLines.keel.attributes.position.array).reduce<[number,number,number][]>((acc, v, i) => { const idx = Math.floor(i/3); if (i%3===0) acc.push([v,0,0]); else acc[idx][i%3] = v; return acc; }, [])} color="#44a0ff" lineWidth={1} />
        </>
      )}
    </group>
  );
}

export default LaserHullUltimateModel;
