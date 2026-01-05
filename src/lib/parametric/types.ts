// Core types for the Universal Parametric Asset Engine

export interface Curve1D {
  controlPoints: number[]; // Y values at evenly spaced U positions
  eval(u: number): number;
}

export interface SectionParams {
  vDepth: number;        // 0..1 - how "V" the bottom is
  deadrise: number;      // 0..1 - V angle steepness
  bilgeRadius: number;   // 0..1 - roundness at bottom/side meet
  chineSharpness: number;// 0..1 - 0=round, 1=hard edge
  flare: number;         // -1..+1 - tumblehome to flare
  railRadius: number;    // 0..1 - rounding at rail
  bodyPow: number;       // 0..1 - section curve power
}

export interface BaseFormSpec {
  L: number;             // Length in meters
  B: Curve1D;            // half-beam curve
  K: Curve1D;            // keel/underside
  D: Curve1D;            // deck/roofline
  Nu: number;            // longitudinal samples
  Nv: number;            // lateral samples
  sectionParams: SectionParams;
}

export interface EnvelopeParams {
  rockerAmp: number;
  bowLiftAmp: number;
  sternDeckDrop: number;
  bowTaperMin: number;
  sternTaperMin: number;
  taperPower: number;
}

export interface HullParams {
  length: number;
  beam: number;
  height: number;
  vDepth: number;
  deadrise: number;
  bilgeRadius: number;
  chineSharpness: number;
  flare: number;
  railRadius: number;
  rockerAmp: number;
  bowLiftAmp: number;
  sternDeckDrop: number;
  bowTaperMin: number;
  sternTaperMin: number;
  taperPower: number;
  bowTipPoint: number;
  bowTipRound: number;
  // Stern/Transom shape parameters
  sternFlatWidth: number;     // How wide the flat transom is (0-1 of beam)
  sternFlatBlend: number;     // How smoothly hull blends into transom (0-1)
  transomHeight: number;      // Height of transom relative to deck (0-1)
  transomRake: number;        // Transom rake angle in degrees (0-15)
}

export interface VertexData {
  position: [number, number, number];
  normal: [number, number, number];
  uv: [number, number];
  u: number; // design coordinate
  s: number; // design coordinate
  side: 1 | -1;
}

export type FeatureStage = "BASE" | "MACRO" | "EDGE" | "MICRO" | "FINISH";

export interface MaskSpec {
  kind: "ellipse" | "roundedRect" | "curveBand";
  u?: number;
  s?: number;
  ru?: number;
  rs?: number;
  uMin?: number;
  uMax?: number;
  sMin?: number;
  sMax?: number;
  r?: number;
  pow?: number;
  curveId?: string;
  width?: number;
  sharpness?: number;
}

export interface FeatureNode {
  id: string;
  type: "PatchDisplace" | "RecessCut" | "CreaseLine" | "VectorWarp" | "BossHole";
  stage: FeatureStage;
  enabled: boolean;
  targetRegions: string[];
  placement: {
    mode: "UV" | "ANCHOR";
    u0?: number;
    s0?: number;
    anchorId?: string;
  };
  mask: MaskSpec;
  params: Record<string, number | boolean | string>;
}

export interface AssetSpec {
  id: string;
  hull: HullParams;
  features: FeatureNode[];
}

// Default Laser hull parameters
export const DEFAULT_HULL_PARAMS: HullParams = {
  length: 4.2,
  beam: 1.37,
  height: 0.35,
  vDepth: 0.45,
  deadrise: 0.50,
  bilgeRadius: 0.70,
  chineSharpness: 0.10,
  flare: 0.08,
  railRadius: 0.65,
  rockerAmp: 0.06,
  bowLiftAmp: 0.03,
  sternDeckDrop: 0.02,
  bowTaperMin: 0.02,
  sternTaperMin: 0.75,  // Much wider stern - real Laser has wide transom
  taperPower: 1.6,
  bowTipPoint: 0.70,
  bowTipRound: 0.55,
  // Stern/Transom 
  sternFlatWidth: 0.85,      // Wide flat transom
  sternFlatBlend: 0.15,      // Smooth blend from hull to transom
  transomHeight: 0.85,       // Transom extends most of hull height
  transomRake: 8,            // Slight rake angle
};
