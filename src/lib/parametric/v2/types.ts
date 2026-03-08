// ============================================
// V2 HULL PARAMETRIC SYSTEM - TYPE DEFINITIONS
// ============================================
// Ortho-driven design: Curves define hull shape in 2D views
// Hull is a unified surface where bow emerges from V converging to edge

// Coordinate system: X = forward (bow), Y = up, Z = starboard

// ============================================
// INTERPOLATION STYLE - Controls curve bulge
// ============================================

export type InterpolationStyle = 'balloon' | 'straight' | 'vacuum';

// ============================================
// CURVE FIELD TYPES
// ============================================

export interface CurveKnot {
  t: number;  // Parameter position 0-1
  value: number;
  handleIn?: number;  // Bezier handle delta
  handleOut?: number;
}

export interface CurveField {
  id: string;
  knots: CurveKnot[];
  interpolation: 'linear' | 'bezier' | 'catmullrom';
}

// Evaluate curve at parameter t
export function evalCurveField(curve: CurveField, t: number): number {
  const clampedT = Math.max(0, Math.min(1, t));
  const knots = curve.knots;
  
  if (knots.length === 0) return 0;
  if (knots.length === 1) return knots[0].value;
  
  // Find bracketing knots
  let i = 0;
  while (i < knots.length - 1 && knots[i + 1].t < clampedT) i++;
  
  const k0 = knots[Math.min(i, knots.length - 1)];
  const k1 = knots[Math.min(i + 1, knots.length - 1)];
  
  if (k0.t === k1.t) return k0.value;
  
  const localT = (clampedT - k0.t) / (k1.t - k0.t);
  
  // Smoothstep interpolation for smoother results
  const smooth = localT * localT * (3 - 2 * localT);
  return k0.value + (k1.value - k0.value) * smooth;
}

// ============================================
// HULL V2 PARAMETERS - Simplified for ortho-driven design
// ============================================

export interface HullV2Dimensions {
  length: number;          // Overall length (m)
  beam: number;            // Maximum beam (m)
  heightDeck: number;      // Deck height at rail (m)
  heightKeel: number;      // Keel depth below waterline (m)
}

export interface DeckSheetParams {
  crownAft: number;        // Crown height at stern centerline (m)
  crownFadeStart: number;  // U position where crown starts fading (0-1)
  crownFadeEnd: number;    // U position where crown is zero (0-1)
  crownPower: number;      // Exponent for crown shape across beam
  sternRise: number;       // How much the stern deck edges rise upward (m)
  sternRiseStart: number;  // U position where stern rise begins (0-1)
}

export interface LipElbowParams {
  overhang: number;        // How far lip extends outboard (m)
  drop: number;            // How far lip drops below deck (m)
  radiusTop: number;       // Rounding at top edge (m)
  radiusUnder: number;     // Rounding on underside (m)
  tuckSharpness: number;   // 0-1: how abruptly underside tucks in
  transomUpperSharpness: number; // 0-1: squared corners at transom top
  transomLowerRadius: number;    // Radius at transom bottom corners (m)
}

export interface BottomHullParams {
  // V-hull and section shape
  vDepth: number;          // 0-1: how V-shaped
  vPower: number;          // Exponent for V-shape
  chinePos: number;        // 0-1: lateral position of chine
  chineSoftness: number;   // 0-1: blend toward rounded
  deadrise: number;        // Deadrise angle factor
  // Rocker (keel curve)
  rockerAmp: number;       // Maximum rocker height (m)
  rockerPower: number;     // Exponent for rocker curve
  forefoot: number;        // Extra bow lift (m)
}

export interface TransomParams {
  width: number;           // 0-1: ratio of transom width to beam
  topCrown: number;        // Match deck crown at stern
  bottomCrown: number;     // Bottom edge curvature
  upperCornerRadius: number;
  lowerCornerRadius: number;
  rake: number;            // Transom lean angle (degrees)
  height: number;          // 0-1: ratio of hull height
  flatness: number;        // 0-1: 0=follows hull section, 1=perfectly flat
}

// SIMPLIFIED BOW PARAMS - No separate bow cap, just edge control
export interface BowParams {
  edgeRake: number;        // Bow edge angle in side view (degrees) - forward/back tilt
  taperStart: number;      // U position where broad bow taper begins (0-1)
  taperPower: number;      // Fullness carry through the shoulder region
  entryLength: number;     // Final nose-run length as fraction of hull length
  noseBluntness: number;   // 0-1: sharp entry to blunt/rounded entry
  knifeWidth: number;      // Minimum width at bow tip (m) - never zero
}

export interface BeamDistribution {
  sternWidth: number;      // 0-1: width at transom relative to max beam
  maxBeamPos: number;      // U position of maximum beam (0-1)
  sternBlend: number;      // Region over which stern stays wide
  interpolation: InterpolationStyle; // How beam curve bulges
}

export interface HullV2Params {
  dimensions: HullV2Dimensions;
  deck: DeckSheetParams;
  lip: LipElbowParams;
  bottom: BottomHullParams;
  transom: TransomParams;
  bow: BowParams;
  beam: BeamDistribution;
}

// ============================================
// DEFAULT LASER DINGHY PARAMETERS
// ============================================

export const DEFAULT_HULL_V2_PARAMS: HullV2Params = {
  dimensions: {
    length: 4.2,
    beam: 1.37,
    heightDeck: 0.35,
    heightKeel: 0.15,
  },
  deck: {
    crownAft: 0.025,
    crownFadeStart: 0.0,
    crownFadeEnd: 0.4,
    crownPower: 2.0,
    sternRise: 0.015,
    sternRiseStart: 0.15,
  },
  lip: {
    overhang: 0.030,
    drop: 0.025,
    radiusTop: 0.008,
    radiusUnder: 0.006,
    tuckSharpness: 0.6,
    transomUpperSharpness: 0.8,
    transomLowerRadius: 0.015,
  },
  bottom: {
    vDepth: 0.45,
    vPower: 1.8,
    chinePos: 0.35,
    chineSoftness: 0.3,
    deadrise: 0.5,
    rockerAmp: 0.06,
    rockerPower: 2.0,
    forefoot: 0.03,
  },
  transom: {
    width: 0.85,
    topCrown: 0.02,
    bottomCrown: 0.015,
    upperCornerRadius: 0.005,
    lowerCornerRadius: 0.02,
    rake: 8,
    height: 0.85,
    flatness: 0.3,
  },
  bow: {
    edgeRake: 15,
    taperStart: 0.62,      // Shoulder release point
    taperPower: 2.1,       // Shoulder fullness carry
    entryLength: 0.11,     // Short nose run-in to avoid a long needle
    noseBluntness: 0.72,   // Rounded Laser-style entry
    knifeWidth: 0.016,     // Physical stem width control
  },
  beam: {
    sternWidth: 0.84,
    maxBeamPos: 0.50,
    sternBlend: 0.15,
    interpolation: 'balloon',
  },
};

// ============================================
// PART REGISTRY - For settings panel hover-to-glow
// ============================================

export interface PartInfo {
  id: string;
  name: string;
  description: string;
  location: string;
  category: 'hull' | 'deck' | 'transom' | 'bow' | 'lip' | 'section';
  paramKeys: string[];
}

export const HULL_PARTS: Record<string, PartInfo> = {
  deck_sheet: {
    id: 'deck_sheet',
    name: 'Deck / Top Sheet',
    description: 'Flat fiberglass piece forming the top surface. Flat in side view, crowned at stern.',
    location: 'Entire top surface from bow to transom',
    category: 'deck',
    paramKeys: ['deck.crownAft', 'deck.crownFadeStart', 'deck.crownFadeEnd', 'deck.crownPower'],
  },
  bottom_hull: {
    id: 'bottom_hull',
    name: 'Bottom Hull',
    description: 'Main hull body - V-shaped bottom with rocker. Sides converge to knife edge at bow.',
    location: 'Entire hull below deck seam',
    category: 'hull',
    paramKeys: ['bottom.vDepth', 'bottom.vPower', 'bottom.chinePos', 'bottom.chineSoftness', 'bottom.rockerAmp'],
  },
  lip_elbow: {
    id: 'lip_elbow',
    name: 'Deck Lip / Rail',
    description: '30mm finger-grip lip where deck meets hull. Continuous around entire perimeter.',
    location: 'Perimeter seam between deck and hull',
    category: 'lip',
    paramKeys: ['lip.overhang', 'lip.drop', 'lip.radiusTop', 'lip.tuckSharpness'],
  },
  transom_face: {
    id: 'transom_face',
    name: 'Transom',
    description: 'Flat vertical stern plate. Fills the gap where V-hull is widest at rear.',
    location: 'Aft end - WIDE and FLAT',
    category: 'transom',
    paramKeys: ['transom.width', 'transom.rake', 'transom.upperCornerRadius', 'transom.lowerCornerRadius'],
  },
  bow_edge: {
    id: 'bow_edge',
    name: 'Bow Edge',
    description: 'Where the V-hull sides converge to a knife edge. Not a separate piece - emerges from hull shape.',
    location: 'Forward extremity where hull sides meet',
    category: 'bow',
    paramKeys: ['bow.edgeRake', 'bow.taperStart', 'bow.taperPower', 'bow.entryLength', 'bow.noseBluntness', 'bow.knifeWidth'],
  },
  beam_curve: {
    id: 'beam_curve',
    name: 'Beam Distribution',
    description: 'How hull width varies from stern to bow. Wide at transom, tapering to knife at bow.',
    location: 'Plan view outline',
    category: 'hull',
    paramKeys: ['beam.sternWidth', 'beam.maxBeamPos', 'beam.interpolation'],
  },
  section_shape: {
    id: 'section_shape',
    name: 'Section Shape',
    description: 'Cross-sectional profile - V-hull depth, chine position, bilge roundness.',
    location: 'Any cross-section of hull',
    category: 'section',
    paramKeys: ['bottom.vDepth', 'bottom.deadrise', 'bottom.chinePos'],
  },
};

// ============================================
// PARAMETER GROUP DEFINITIONS - For organized UI
// ============================================

export interface ParamGroupDef {
  id: string;
  name: string;
  icon: string;
  description: string;
  params: {
    key: string;
    label: string;
    min: number;
    max: number;
    step: number;
    unit?: string;
    tooltip: string;
    hoverTarget?: string;
  }[];
}

export const PARAM_GROUPS: ParamGroupDef[] = [
  {
    id: 'dimensions',
    name: 'Dimensions',
    icon: 'Ruler',
    description: 'Overall hull size',
    params: [
      { key: 'dimensions.length', label: 'Length', min: 2, max: 8, step: 0.1, unit: 'm', tooltip: 'Overall length from bow to transom', hoverTarget: 'bottom_hull' },
      { key: 'dimensions.beam', label: 'Beam', min: 0.5, max: 3, step: 0.05, unit: 'm', tooltip: 'Maximum width', hoverTarget: 'beam_curve' },
      { key: 'dimensions.heightDeck', label: 'Deck Height', min: 0.1, max: 0.8, step: 0.01, unit: 'm', tooltip: 'Height of deck rail above baseline', hoverTarget: 'deck_sheet' },
      { key: 'dimensions.heightKeel', label: 'Keel Depth', min: 0, max: 0.5, step: 0.01, unit: 'm', tooltip: 'Depth of keel below waterline', hoverTarget: 'bottom_hull' },
    ],
  },
  {
    id: 'beam',
    name: 'Plan View (Top)',
    icon: 'MoveHorizontal',
    description: 'Hull width distribution - editable in top ortho view',
    params: [
      { key: 'beam.sternWidth', label: 'Stern Width', min: 0.5, max: 1, step: 0.01, tooltip: 'Width at transom as ratio of max beam', hoverTarget: 'transom_face' },
      { key: 'beam.maxBeamPos', label: 'Max Beam Position', min: 0.3, max: 0.6, step: 0.01, tooltip: 'U position of maximum beam (0=stern, 1=bow)', hoverTarget: 'beam_curve' },
      { key: 'beam.sternBlend', label: 'Stern Blend Region', min: 0.05, max: 0.3, step: 0.01, tooltip: 'Length of region where stern stays wide', hoverTarget: 'transom_face' },
    ],
  },
  {
    id: 'bow',
    name: 'Bow Convergence',
    icon: 'Navigation',
    description: 'How hull sides converge to knife edge',
    params: [
      { key: 'bow.taperStart', label: 'Taper Start', min: 0.45, max: 0.82, step: 0.01, tooltip: 'Where bow shoulders release into taper (higher = fuller shoulders)', hoverTarget: 'bow_edge' },
      { key: 'bow.taperPower', label: 'Shoulder Fullness', min: 0.5, max: 3, step: 0.1, tooltip: 'How strongly width is carried through the shoulder region', hoverTarget: 'bow_edge' },
      { key: 'bow.entryLength', label: 'Entry Length', min: 0.04, max: 0.2, step: 0.01, tooltip: 'Length of final nose run-in (shorter = stubbier Laser-like bow)', hoverTarget: 'bow_edge' },
      { key: 'bow.noseBluntness', label: 'Nose Bluntness', min: 0, max: 1, step: 0.01, tooltip: '0=sharper entry, 1=rounder/blunter entry', hoverTarget: 'bow_edge' },
      { key: 'bow.knifeWidth', label: 'Stem Width', min: 0.01, max: 0.08, step: 0.005, unit: 'm', tooltip: 'Physical width at bow tip', hoverTarget: 'bow_edge' },
      { key: 'bow.edgeRake', label: 'Edge Rake', min: -30, max: 30, step: 1, unit: '°', tooltip: 'Bow edge angle in side view (bottom hull only)', hoverTarget: 'bow_edge' },
    ],
  },
  {
    id: 'bottom',
    name: 'Section Shape (Front)',
    icon: 'Ship',
    description: 'V-hull cross-section - editable in front ortho view',
    params: [
      { key: 'bottom.vDepth', label: 'V-Hull Depth', min: 0, max: 1, step: 0.01, tooltip: 'How pronounced the V-shape is', hoverTarget: 'section_shape' },
      { key: 'bottom.vPower', label: 'V-Hull Power', min: 1, max: 4, step: 0.1, tooltip: 'Exponent for V-shape curve', hoverTarget: 'section_shape' },
      { key: 'bottom.chinePos', label: 'Chine Position', min: 0.2, max: 0.6, step: 0.01, tooltip: 'Lateral position of chine', hoverTarget: 'section_shape' },
      { key: 'bottom.chineSoftness', label: 'Chine Softness', min: 0, max: 1, step: 0.01, tooltip: 'Blend toward rounded bilge', hoverTarget: 'section_shape' },
      { key: 'bottom.deadrise', label: 'Deadrise', min: 0, max: 1, step: 0.01, tooltip: 'Deadrise angle factor', hoverTarget: 'section_shape' },
    ],
  },
  {
    id: 'rocker',
    name: 'Profile (Side)',
    icon: 'TrendingUp',
    description: 'Keel rocker curve - editable in side ortho view',
    params: [
      { key: 'bottom.rockerAmp', label: 'Rocker', min: 0, max: 0.15, step: 0.005, unit: 'm', tooltip: 'Maximum keel rise at ends', hoverTarget: 'bottom_hull' },
      { key: 'bottom.rockerPower', label: 'Rocker Power', min: 1, max: 4, step: 0.1, tooltip: 'Exponent for rocker curve', hoverTarget: 'bottom_hull' },
      { key: 'bottom.forefoot', label: 'Forefoot Lift', min: 0, max: 0.08, step: 0.005, unit: 'm', tooltip: 'Extra bow lift at forefoot', hoverTarget: 'bow_edge' },
    ],
  },
  {
    id: 'deck',
    name: 'Deck Sheet',
    icon: 'Layers',
    description: 'Top surface - flat in side view, crowned at stern',
    params: [
      { key: 'deck.crownAft', label: 'Crown Height', min: 0, max: 0.05, step: 0.001, unit: 'm', tooltip: 'Crown height at stern centerline', hoverTarget: 'deck_sheet' },
      { key: 'deck.crownFadeStart', label: 'Crown Fade Start', min: 0, max: 0.5, step: 0.01, tooltip: 'U where crown starts diminishing', hoverTarget: 'deck_sheet' },
      { key: 'deck.crownFadeEnd', label: 'Crown Fade End', min: 0.2, max: 0.8, step: 0.01, tooltip: 'U where crown is zero', hoverTarget: 'deck_sheet' },
      { key: 'deck.crownPower', label: 'Crown Power', min: 1, max: 4, step: 0.1, tooltip: 'Exponent for crown shape', hoverTarget: 'deck_sheet' },
      { key: 'deck.sternRise', label: 'Stern Rise', min: 0, max: 0.05, step: 0.001, unit: 'm', tooltip: 'How much the stern deck edges curve upward', hoverTarget: 'deck_sheet' },
      { key: 'deck.sternRiseStart', label: 'Stern Rise Start', min: 0.05, max: 0.3, step: 0.01, tooltip: 'U position where stern rise begins', hoverTarget: 'deck_sheet' },
    ],
  },
  {
    id: 'transom',
    name: 'Transom',
    icon: 'Square',
    description: 'Flat stern plate - fills the rear V opening',
    params: [
      { key: 'transom.width', label: 'Width Ratio', min: 0.5, max: 1, step: 0.01, tooltip: 'Transom width as ratio of max beam', hoverTarget: 'transom_face' },
      { key: 'transom.rake', label: 'Rake Angle', min: 0, max: 20, step: 0.5, unit: '°', tooltip: 'How much transom leans back', hoverTarget: 'transom_face' },
      { key: 'transom.height', label: 'Height Ratio', min: 0.5, max: 1, step: 0.01, tooltip: 'Transom height as ratio of hull depth', hoverTarget: 'transom_face' },
      { key: 'transom.flatness', label: 'Flatness', min: 0, max: 1, step: 0.01, tooltip: '0=follows hull section shape, 1=perfectly flat', hoverTarget: 'transom_face' },
      { key: 'transom.topCrown', label: 'Top Crown', min: 0, max: 0.04, step: 0.001, unit: 'm', tooltip: 'Crown at top edge', hoverTarget: 'transom_face' },
    ],
  },
  {
    id: 'lip',
    name: 'Deck Lip / Rail',
    icon: 'Grip',
    description: '30mm finger-grip elbow around perimeter',
    params: [
      { key: 'lip.overhang', label: 'Overhang', min: 0.010, max: 0.050, step: 0.001, unit: 'm', tooltip: 'How far lip extends outboard', hoverTarget: 'lip_elbow' },
      { key: 'lip.drop', label: 'Drop', min: 0.010, max: 0.040, step: 0.001, unit: 'm', tooltip: 'How far lip drops below deck', hoverTarget: 'lip_elbow' },
      { key: 'lip.tuckSharpness', label: 'Tuck Sharpness', min: 0, max: 1, step: 0.05, tooltip: 'How abruptly underside tucks', hoverTarget: 'lip_elbow' },
    ],
  },
];

// ============================================
// MESH GENERATION OPTIONS
// ============================================

export interface MeshResolution {
  Nu: number;  // Longitudinal samples
  Nv: number;  // Lateral samples
  lipSamples: number;  // Lip profile samples
}

export const MESH_RESOLUTIONS: Record<'low' | 'medium' | 'high', MeshResolution> = {
  low: { Nu: 24, Nv: 12, lipSamples: 4 },
  medium: { Nu: 48, Nv: 24, lipSamples: 8 },
  high: { Nu: 96, Nv: 48, lipSamples: 12 },
};
