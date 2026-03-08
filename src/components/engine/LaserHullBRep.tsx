// ==============================================================================
//  ULTIMATE PARAMETRIC LASER HULL - B-Rep Solid
//  Converted from OpenSCAD to Three.js/R3F
//  Strictly mathematically calibrated Bézier curves locked to 4.23m × 1.37m
// ==============================================================================

import * as React from "react";
import * as THREE from "three";
import { GroupProps } from "@react-three/fiber";

// Dimensions in mm internally, converted to meters for output
const LOA = 4230;
const BEAM = 1370;
const LIP_OUT = 15;
const LIP_UP = 12;

// Resolution
const DEFAULT_NX = 100;
const DEFAULT_NB = 15;
const DEFAULT_NT = 15;
const DEFAULT_ND = 20;

// Cubic Bézier
function bez(t: number, p0: number, p1: number, p2: number, p3: number): number {
  const mt = 1 - t;
  return mt * mt * mt * p0 + 3 * mt * mt * t * p1 + 3 * mt * t * t * p2 + t * t * t * p3;
}

// Safe power (prevent NaN at 0)
function spow(base: number, exp: number): number {
  return base <= 0 ? 0 : Math.pow(base, exp);
}

// Hull defining curves — locked to Laser dimensions
function half_beam(t: number) { return bez(t, 440, 860, 740, 0); }
function chine_y(t: number) { return bez(t, 360, 780, 600, 0); }
function sheer_z(t: number) { return bez(t, 420, 300, 380, 520); }
function chine_z(t: number) { return bez(t, 220, 50, 180, 520); }
function keel_z(t: number) { return bez(t, 180, -20, 100, 520); }
function deck_camber(t: number) { return bez(t, 20, 60, 60, 10); }

// Lip taper
function current_lip(t: number) { return LIP_OUT * (1 - Math.pow(t, 8)); }

// Patch evaluators
function pt_bot_patch(t: number, v: number): [number, number, number] {
  return [
    LOA * t,
    chine_y(t) * v,
    keel_z(t) + (chine_z(t) - keel_z(t)) * spow(v, bez(t, 1.5, 1.2, 1.0, 1.0)),
  ];
}

function pt_top_patch(t: number, v: number): [number, number, number] {
  return [
    LOA * t,
    chine_y(t) + (half_beam(t) - chine_y(t)) * v,
    chine_z(t) + (sheer_z(t) - chine_z(t)) * spow(v, bez(t, 0.8, 0.9, 1.0, 1.0)),
  ];
}

function pt_deck(t: number, v: number): [number, number, number] {
  return [
    LOA * t,
    half_beam(t) * v,
    sheer_z(t) + LIP_UP + deck_camber(t) * (1 - spow(v, 2)),
  ];
}

export interface LaserBRepParams {
  nx?: number;
  nb?: number;
  nt?: number;
  nd?: number;
}

function buildBRepGeometry(params: LaserBRepParams = {}) {
  const Nx = params.nx ?? DEFAULT_NX;
  const Nb = params.nb ?? DEFAULT_NB;
  const Nt = params.nt ?? DEFAULT_NT;
  const Nd = params.nd ?? DEFAULT_ND;

  // Build section loop for station t
  function sectionLoop(t: number): number[] {
    const w = half_beam(t);
    const lip = current_lip(t);
    const sz = sheer_z(t);
    const pts: number[] = [];

    // Helper to push a point
    const push = (x: number, y: number, z: number) => {
      pts.push(x, y, z);
    };

    // 1. Starboard bottom (keel to chine)
    for (let i = 0; i < Nb; i++) {
      const [x, y, z] = pt_bot_patch(t, i / Nb);
      push(x, y, z);
    }

    // 2. Starboard topside (chine to sheer)
    for (let i = 0; i < Nt; i++) {
      const [x, y, z] = pt_top_patch(t, i / Nt);
      push(x, y, z);
    }

    // 3. Starboard gunwale flange
    const topEnd = pt_top_patch(t, 1);
    push(topEnd[0], topEnd[1], topEnd[2]);
    push(LOA * t, w + lip, sz);
    push(LOA * t, w + lip, sz + LIP_UP);
    const deckEnd = pt_deck(t, 1);
    push(deckEnd[0], deckEnd[1], deckEnd[2]);

    // 4. Starboard deck
    for (let i = 1; i < Nd; i++) {
      const [x, y, z] = pt_deck(t, 1 - i / Nd);
      push(x, y, z);
    }

    // 5. Centerline deck peak
    const center = pt_deck(t, 0);
    push(center[0], center[1], center[2]);

    // 6. Port deck (mirrored)
    for (let i = 1; i < Nd; i++) {
      const [x, y, z] = pt_deck(t, i / Nd);
      push(x, -y, z);
    }

    // 7. Port gunwale flange (mirrored)
    const pDeckEnd = pt_deck(t, 1);
    push(pDeckEnd[0], -pDeckEnd[1], pDeckEnd[2]);
    push(LOA * t, -(w + lip), sz + LIP_UP);
    push(LOA * t, -(w + lip), sz);
    const pTopEnd = pt_top_patch(t, 1);
    push(pTopEnd[0], -pTopEnd[1], pTopEnd[2]);

    // 8. Port topside (mirrored)
    for (let i = 1; i <= Nt; i++) {
      const [x, y, z] = pt_top_patch(t, 1 - i / Nt);
      push(x, -y, z);
    }

    // 9. Port bottom (mirrored)
    for (let i = 1; i < Nb; i++) {
      const [x, y, z] = pt_bot_patch(t, 1 - i / Nb);
      push(x, -y, z);
    }

    return pts;
  }

  const M = 2 * Nb + 2 * Nt + 2 * Nd + 6; // vertices per section

  // Build all section points
  const allPts: number[] = [];
  for (let i = 0; i < Nx; i++) {
    const t = (i / (Nx - 1)) * 0.999; // stop just before 1.0 for manifold bow
    const loop = sectionLoop(t);
    allPts.push(...loop);
  }

  // Bow tip vertex
  const bowTipIdx = allPts.length / 3;
  allPts.push(LOA, 0, sheer_z(1) + LIP_UP / 2);

  // Transom center vertex
  const transomCenterIdx = allPts.length / 3;
  allPts.push(0, 0, (sheer_z(0) + keel_z(0)) / 2);

  // Build faces
  const indices: number[] = [];

  // Main body quads (as triangles)
  for (let i = 0; i < Nx - 1; i++) {
    for (let j = 0; j < M; j++) {
      const jNext = (j + 1) % M;
      const a = i * M + j;
      const b = i * M + jNext;
      const c = (i + 1) * M + jNext;
      const d = (i + 1) * M + j;
      indices.push(a, b, c);
      indices.push(a, c, d);
    }
  }

  // Bow cap
  for (let j = 0; j < M; j++) {
    const jNext = (j + 1) % M;
    indices.push((Nx - 1) * M + j, (Nx - 1) * M + jNext, bowTipIdx);
  }

  // Transom cap
  for (let j = 0; j < M; j++) {
    const jNext = (j + 1) % M;
    indices.push(transomCenterIdx, jNext, j);
  }

  // Convert mm → meters
  const positions = new Float32Array(allPts.length);
  for (let i = 0; i < allPts.length; i++) {
    positions[i] = allPts[i] / 1000;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  geometry.computeBoundingBox();
  geometry.computeBoundingSphere();

  return geometry;
}

export function useLaserBRepGeometry(params?: LaserBRepParams) {
  return React.useMemo(() => buildBRepGeometry(params), [
    params?.nx, params?.nb, params?.nt, params?.nd,
  ]);
}

export type LaserHullBRepModelProps = GroupProps & {
  params?: LaserBRepParams;
  color?: THREE.ColorRepresentation;
  wireframe?: boolean;
};

export function LaserHullBRepModel({
  params,
  color = "#F4F6F8",
  wireframe = false,
  ...groupProps
}: LaserHullBRepModelProps) {
  const geometry = useLaserBRepGeometry(params);

  return (
    <group {...groupProps}>
      <mesh geometry={geometry}>
        <meshStandardMaterial
          color={color}
          wireframe={wireframe}
          metalness={0.05}
          roughness={0.82}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

export default LaserHullBRepModel;
