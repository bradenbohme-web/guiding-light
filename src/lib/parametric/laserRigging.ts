// Complete Laser/ILCA Sailboat Rigging System Types and Defaults

import * as THREE from "three";

// ===== HARDPOINT SYSTEM =====
export interface Hardpoint {
  id: string;
  attach: "hull" | "boom" | "mast" | "rudder";
  position: THREE.Vector3;
  label?: string;
}

// ===== MAST PARAMETERS =====
export interface MastParams {
  height: number;           // Laser: ~6.8m / ~7.2m for Radial
  baseRadius: number;       // Bottom radius: ~0.025m
  tipRadius: number;        // Top radius: ~0.012m
  taper: number;            // 0..1 how much it tapers
  bend: number;             // Mast pre-bend amount: 0..0.1m
  position: THREE.Vector3;  // Position relative to hull
  color: string;
}

// ===== BOOM PARAMETERS =====
export interface BoomParams {
  length: number;           // Laser: ~2.65m
  radius: number;           // ~0.02m
  gooseneckHeight: number;  // Height at mast attachment
  vanAttach: number;        // Position along boom for vang: 0..1 (typically 0.25)
  outhaul: number;          // Clew tension: 0..1
  position: THREE.Vector3;  // Gooseneck position relative to mast
  color: string;
}

// ===== SAIL PARAMETERS =====
export interface SailBattenParams {
  enabled: boolean;
  count: number;            // Laser has 4 battens
  positions: number[];      // Fractional positions along luff [0..1]
  lengths: number[];        // Length of each batten in meters
  stiffness: number;        // 0..1
}

export interface SailWindowParams {
  enabled: boolean;
  position: { u: number; v: number }; // Position on sail (normalized)
  size: { width: number; height: number };
  color: string;            // Vinyl window color (usually clear/transparent)
}

export interface SailParams {
  luffLength: number;       // Along mast: ~6.0m
  footLength: number;       // Along boom: ~2.5m
  headWidth: number;        // Width at top: ~0.8m
  footWidth: number;        // Width at bottom/clew: full
  leechCurve: number;       // 0..1 roach amount
  cunningham: number;       // Luff tension: 0..1
  battens: SailBattenParams;
  window: SailWindowParams;
  clothSegmentsWidth: number;  // ~18
  clothSegmentsHeight: number; // ~24
  color: string;
  opacity: number;
}

// ===== CENTERBOARD PARAMETERS =====
export interface CenterboardParams {
  chord: number;            // Chord length: ~0.25m
  span: number;             // Vertical length when deployed: ~0.9m
  thickness: number;        // Max thickness: ~0.02m
  profile: "NACA0012" | "NACA0009" | "flat";
  tipChordScale: number;    // How much tip tapers: 0..1 (0.6 typical)
  deployment: number;       // 0 = up, 1 = fully down
  position: THREE.Vector3;  // Trunk position
  pivotOffset: number;      // Pivot point from top
  color: string;
}

// ===== RUDDER SYSTEM PARAMETERS =====
export interface RudderBladeParams {
  chord: number;            // ~0.20m
  span: number;             // ~0.6m
  thickness: number;        // ~0.015m
  profile: "NACA0012" | "NACA0009" | "flat";
  tipChordScale: number;    // Tip taper
  position: THREE.Vector3;  // Pivot position on transom
  color: string;
}

export interface TillerParams {
  length: number;           // ~0.9m
  width: number;            // ~0.04m
  thickness: number;        // ~0.02m
  offset: THREE.Vector3;    // Offset from rudder pivot
  color: string;
}

export interface TillerExtensionParams {
  length: number;           // ~0.8m
  radius: number;           // ~0.012m
  hingeAngle: number;       // Fold angle in degrees
  yawOffset: number;        // Rotation offset
  color: string;
}

export interface RudderSystemParams {
  blade: RudderBladeParams;
  tiller: TillerParams;
  extension: TillerExtensionParams;
  angle: number;            // Current rudder angle: -35..35 degrees
  maxAngle: number;         // Max deflection: ~35 degrees
}

// ===== PULLEY/BLOCK SYSTEM =====
export interface PulleyParams {
  id: string;
  position: THREE.Vector3;
  attach: "hull" | "boom" | "mast";
  type: "single" | "double" | "triple" | "fiddle" | "ratchet";
  radius: number;
  color: string;
}

// ===== ROPE/LINE SYSTEM =====
export interface RopeSegment {
  startPoint: string;       // Hardpoint ID or "free"
  endPoint: string;         // Hardpoint ID or "free"
  throughPulleys: string[]; // Pulley IDs the rope passes through
}

export interface RopeParams {
  id: string;
  name: string;
  diameter: number;
  color: string;
  segments: RopeSegment[];
  tension: number;          // 0..1 how tight
  elasticity: number;       // Stretch factor
}

// ===== TRAVELER SYSTEM =====
export interface TravelerParams {
  x: number;               // Track center X in hull space
  y: number;               // Track height above deck
  trackHalfSpan: number;   // Half-width port/stbd
  carZ: number;            // Current car Z position along track (meters)
}

// ===== COMPLETE RIGGING PARAMETERS =====
export interface LaserRiggingParams {
  mast: MastParams;
  boom: BoomParams;
  sail: SailParams;
  centerboard: CenterboardParams;
  rudder: RudderSystemParams;
  pulleys: PulleyParams[];
  ropes: RopeParams[];
  hardpoints: Hardpoint[];

  traveler: TravelerParams;

  // Tuning state
  vangTension: number;      // Boom angle control: 0..1
  cunninghamTension: number;// Luff tension: 0..1
  outhaulTension: number;   // Foot tension: 0..1
  mainsheetTension: number; // Main control: 0..1
}

// ===== DEFAULT LASER HARDPOINTS =====
export const DEFAULT_LASER_HARDPOINTS: Hardpoint[] = [
  // Hull hardpoints
  { id: "mast_step", attach: "hull", position: new THREE.Vector3(0.06, 0.0, 0.0), label: "Mast Step" },
  { id: "mast_partner", attach: "hull", position: new THREE.Vector3(0.06, 0.12, 0.0), label: "Mast Partner" },
  { id: "centerboard_trunk", attach: "hull", position: new THREE.Vector3(0.02, -0.01, 0.0), label: "CB Trunk" },
  { id: "vang_base", attach: "hull", position: new THREE.Vector3(0.04, 0.06, 0.0), label: "Vang Base" },
  { id: "cunningham_base", attach: "hull", position: new THREE.Vector3(0.08, 0.08, 0.0), label: "Cunningham" },
  { id: "traveler_port", attach: "hull", position: new THREE.Vector3(-0.33, 0.09, 0.35), label: "Traveler Port" },
  { id: "traveler_starboard", attach: "hull", position: new THREE.Vector3(-0.33, 0.09, -0.35), label: "Traveler Stbd" },
  { id: "mainsheet_base", attach: "hull", position: new THREE.Vector3(-0.33, 0.09, 0.0), label: "Mainsheet" },
  { id: "rudder_pivot", attach: "hull", position: new THREE.Vector3(-2.0, 0.05, 0.0), label: "Rudder Pivot" },
  { id: "hiking_strap_bow", attach: "hull", position: new THREE.Vector3(0.3, 0.05, 0.0), label: "Hiking Fwd" },
  { id: "hiking_strap_stern", attach: "hull", position: new THREE.Vector3(-0.8, 0.05, 0.0), label: "Hiking Aft" },
  
  // Boom hardpoints
  { id: "gooseneck", attach: "boom", position: new THREE.Vector3(0.0, 0.0, 0.0), label: "Gooseneck" },
  { id: "vang_boom", attach: "boom", position: new THREE.Vector3(-0.5, -0.03, 0.0), label: "Vang Boom" },
  { id: "boom_block", attach: "boom", position: new THREE.Vector3(-1.8, -0.03, 0.0), label: "Boom Block" },
  { id: "outhaul_cleat", attach: "boom", position: new THREE.Vector3(-2.4, 0.0, 0.0), label: "Outhaul" },
  { id: "boom_end", attach: "boom", position: new THREE.Vector3(-2.55, 0.0, 0.0), label: "Boom End" },
  
  // Mast hardpoints
  { id: "mast_head", attach: "mast", position: new THREE.Vector3(0.0, 6.8, 0.0), label: "Masthead" },
  { id: "halyard_exit", attach: "mast", position: new THREE.Vector3(0.0, 0.3, 0.0), label: "Halyard Exit" },
  { id: "cunningham_mast", attach: "mast", position: new THREE.Vector3(0.0, 0.4, 0.0), label: "Cunningham Mast" },
  
  // Rudder hardpoints
  { id: "tiller_attach", attach: "rudder", position: new THREE.Vector3(0.06, 0.03, 0.0), label: "Tiller" },
  { id: "extension_hinge", attach: "rudder", position: new THREE.Vector3(0.85, 0.03, 0.0), label: "Extension" },
];

// ===== DEFAULT LASER PULLEYS =====
export const DEFAULT_LASER_PULLEYS: PulleyParams[] = [
  { id: "mainsheet_boom", position: new THREE.Vector3(-1.8, -0.03, 0.0), attach: "boom", type: "double", radius: 0.02, color: "#1a1a1a" },
  // NOTE: traveler pulley Z gets overridden at runtime from rigging.traveler.carZ
  { id: "mainsheet_traveler", position: new THREE.Vector3(-0.33, 0.09, 0.0), attach: "hull", type: "single", radius: 0.02, color: "#1a1a1a" },
  { id: "vang_boom_block", position: new THREE.Vector3(-0.5, -0.03, 0.0), attach: "boom", type: "double", radius: 0.015, color: "#1a1a1a" },
  { id: "vang_base_block", position: new THREE.Vector3(0.04, 0.06, 0.0), attach: "hull", type: "double", radius: 0.015, color: "#1a1a1a" },
  { id: "cunningham_block", position: new THREE.Vector3(0.08, 0.08, 0.0), attach: "hull", type: "single", radius: 0.012, color: "#1a1a1a" },
  { id: "outhaul_block", position: new THREE.Vector3(-2.4, 0.0, 0.0), attach: "boom", type: "single", radius: 0.012, color: "#1a1a1a" },
];

// ===== DEFAULT LASER ROPES =====
export const DEFAULT_LASER_ROPES: RopeParams[] = [
  {
    id: "mainsheet",
    name: "Mainsheet",
    diameter: 0.008,
    color: "#ffffff",
    segments: [
      { startPoint: "mainsheet_boom", endPoint: "mainsheet_traveler", throughPulleys: ["mainsheet_boom", "mainsheet_traveler"] }
    ],
    tension: 0.5,
    elasticity: 0.02
  },
  {
    id: "vang",
    name: "Vang",
    diameter: 0.006,
    color: "#2563eb",
    segments: [
      { startPoint: "vang_boom_block", endPoint: "vang_base_block", throughPulleys: ["vang_boom_block", "vang_base_block"] }
    ],
    tension: 0.3,
    elasticity: 0.01
  },
  {
    id: "cunningham",
    name: "Cunningham",
    diameter: 0.005,
    color: "#dc2626",
    segments: [
      { startPoint: "cunningham_mast", endPoint: "cunningham_base", throughPulleys: ["cunningham_block"] }
    ],
    tension: 0.2,
    elasticity: 0.01
  },
  {
    id: "outhaul",
    name: "Outhaul",
    diameter: 0.005,
    color: "#16a34a",
    segments: [
      { startPoint: "boom_end", endPoint: "outhaul_cleat", throughPulleys: ["outhaul_block"] }
    ],
    tension: 0.4,
    elasticity: 0.01
  },
];

// ===== DEFAULT LASER RIGGING PARAMS =====
export const DEFAULT_LASER_RIGGING: LaserRiggingParams = {
  mast: {
    height: 6.8,
    baseRadius: 0.025,
    tipRadius: 0.012,
    taper: 0.5,
    bend: 0.02,
    position: new THREE.Vector3(0.06, 0.12, 0.0),
    color: "#c0c0c0"
  },
  boom: {
    length: 2.55,
    radius: 0.018,
    gooseneckHeight: 0.9,
    vanAttach: 0.2,
    outhaul: 0.5,
    position: new THREE.Vector3(0.0, 0.9, 0.0),
    color: "#c0c0c0"
  },
  sail: {
    luffLength: 5.5,
    footLength: 2.4,
    headWidth: 0.15,
    footWidth: 1.0,
    leechCurve: 0.05,
    cunningham: 0.3,
    battens: {
      enabled: true,
      count: 4,
      positions: [0.25, 0.45, 0.65, 0.85],
      lengths: [0.9, 0.75, 0.55, 0.35],
      stiffness: 0.8
    },
    window: {
      enabled: true,
      position: { u: 0.4, v: 0.35 },
      size: { width: 0.35, height: 0.45 },
      color: "rgba(200, 220, 255, 0.3)"
    },
    clothSegmentsWidth: 18,
    clothSegmentsHeight: 24,
    color: "#f8f8ff",
    opacity: 0.92
  },
  centerboard: {
    chord: 0.25,
    span: 0.9,
    thickness: 0.02,
    profile: "NACA0012",
    tipChordScale: 0.6,
    deployment: 1.0,
    position: new THREE.Vector3(0.02, -0.01, 0.0),
    pivotOffset: 0.05,
    color: "#e8e8e8"
  },
  rudder: {
    blade: {
      chord: 0.20,
      span: 0.6,
      thickness: 0.015,
      profile: "NACA0012",
      tipChordScale: 0.7,
      position: new THREE.Vector3(-2.0, 0.0, 0.0),
      color: "#e8e8e8"
    },
    tiller: {
      length: 0.9,
      width: 0.04,
      thickness: 0.02,
      offset: new THREE.Vector3(0.06, 0.03, 0.0),
      color: "#8b4513"
    },
    extension: {
      length: 0.8,
      radius: 0.012,
      hingeAngle: 30,
      yawOffset: 0,
      color: "#1a1a1a"
    },
    angle: 0,
    maxAngle: 35
  },
  pulleys: DEFAULT_LASER_PULLEYS,
  ropes: DEFAULT_LASER_ROPES,
  hardpoints: DEFAULT_LASER_HARDPOINTS,

  traveler: {
    x: -0.33,
    y: 0.09,
    trackHalfSpan: 0.35,
    carZ: 0,
  },

  vangTension: 0.4,
  cunninghamTension: 0.3,
  outhaulTension: 0.5,
  mainsheetTension: 0.5
};

// ===== COMPLETE ASSET PARAMS (Hull + Rigging) =====
export interface LaserAssetParams {
  hull: import("./types").HullParams;
  rigging: LaserRiggingParams;
}
