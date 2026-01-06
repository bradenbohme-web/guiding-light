// ============================================
// V2 HULL PARAMETRIC SYSTEM - TYPE DEFINITIONS
// ============================================
// Based on comprehensive design document for Laser dinghy hull
// Two-piece fiberglass construction: Deck sheet + Bottom hull
// Features: Proper transom, bow knife edge, deck crown, lip elbow

// Coordinate system: X = forward (bow), Y = up, Z = starboard

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
// HULL V2 PARAMETERS
// ============================================

export interface HullV2Dimensions {
  length: number;          // Overall length (m)
  beam: number;            // Maximum beam (m)
  heightDeck: number;      // Deck height at rail (m)
  heightKeel: number;      // Keel depth below waterline (m)
}

export interface DeckSheetParams {
  // Deck is flat in side view but has crown at stern
  crownAft: number;        // Crown height at stern centerline (m)
  crownFadeStart: number;  // U position where crown starts fading (0-1)
  crownFadeEnd: number;    // U position where crown is zero (0-1)
  crownPower: number;      // Exponent for crown shape across beam
}

export interface LipElbowParams {
  // The 30mm finger-grip lip around deck perimeter
  overhang: number;        // How far lip extends outboard (m) - default 0.030
  drop: number;            // How far lip drops below deck (m)
  radiusTop: number;       // Rounding at top edge (m)
  radiusUnder: number;     // Rounding on underside (m)
  tuckSharpness: number;   // 0-1: how abruptly underside tucks in
  // Corner overrides
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
  // Flat vertical stern - the anchor shape
  width: number;           // 0-1: ratio of transom width to beam
  topCrown: number;        // Match deck crown at stern
  bottomCrown: number;     // Bottom edge curvature
  upperCornerRadius: number;  // Small radius (squared feel) (m)
  lowerCornerRadius: number;  // Quarter-cylinder radius (m)
  rake: number;            // Transom lean angle (degrees)
  height: number;          // 0-1: ratio of hull height
}

export interface BowKnifeParams {
  // Samurai knife edge - not a point, but a 45° edge
  edgeLength: number;      // Length of knife edge (m) - ~0.20-0.25
  angle: number;           // Bevel angle (degrees) - ~45
  tipRadius: number;       // Rounding on edge (m) - never sharp
  bullnoseRadius: number;  // Cylindrical rounding at front (m)
  shoulderBlend: number;   // How far back blend extends (m)
  lipOverhang: number;     // How far deck lip protrudes past stem (m)
}

export interface BeamDistribution {
  // Half-beam curve B(u)
  sternWidth: number;      // 0-1: width at transom relative to max beam
  maxBeamPos: number;      // U position of maximum beam (0-1)
  bowTaper: number;        // How quickly bow tapers (power)
  sternBlend: number;      // Region over which stern stays wide
}

export interface HullV2Params {
  dimensions: HullV2Dimensions;
  deck: DeckSheetParams;
  lip: LipElbowParams;
  bottom: BottomHullParams;
  transom: TransomParams;
  bow: BowKnifeParams;
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
    crownAft: 0.025,       // Slight crown at stern
    crownFadeStart: 0.0,   // Starts fading from stern
    crownFadeEnd: 0.4,     // Flat by 40% forward
    crownPower: 2.0,       // Parabolic crown shape
  },
  lip: {
    overhang: 0.030,       // 30mm finger grip
    drop: 0.025,
    radiusTop: 0.008,
    radiusUnder: 0.006,
    tuckSharpness: 0.6,
    transomUpperSharpness: 0.8,  // Squared at transom top
    transomLowerRadius: 0.015,   // Quarter-round at bottom
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
    width: 0.85,           // Wide flat transom
    topCrown: 0.02,        // Matches deck crown
    bottomCrown: 0.015,
    upperCornerRadius: 0.005,  // Nearly square
    lowerCornerRadius: 0.02,   // Quarter cylinder
    rake: 8,               // Slight rake
    height: 0.85,
  },
  bow: {
    edgeLength: 0.22,      // ~22cm knife edge
    angle: 45,             // 45 degree bevel
    tipRadius: 0.006,      // Rounded edge
    bullnoseRadius: 0.010, // Cylindrical front rounding
    shoulderBlend: 0.15,   // Blend region
    lipOverhang: 0.012,    // Deck lip protrudes past stem
  },
  beam: {
    sternWidth: 0.85,      // Wide at transom
    maxBeamPos: 0.45,      // Max beam slightly aft of center
    bowTaper: 1.8,
    sternBlend: 0.15,
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
  paramKeys: string[];  // Which params affect this part
}

export const HULL_PARTS: Record<string, PartInfo> = {
  deck_sheet: {
    id: 'deck_sheet',
    name: 'Deck / Top Sheet',
    description: 'Flat fiberglass piece forming the top surface. Flat in side view, but has gentle convex crown at stern that flattens forward.',
    location: 'Entire top surface from bow to transom',
    category: 'deck',
    paramKeys: ['deck.crownAft', 'deck.crownFadeStart', 'deck.crownFadeEnd', 'deck.crownPower'],
  },
  bottom_hull: {
    id: 'bottom_hull',
    name: 'Bottom Hull',
    description: 'Main hull body - V-shaped bottom with rocker. Single fiberglass piece from transom to bow knife edge.',
    location: 'Entire hull below deck seam',
    category: 'hull',
    paramKeys: ['bottom.vDepth', 'bottom.vPower', 'bottom.chinePos', 'bottom.chineSoftness', 'bottom.rockerAmp'],
  },
  lip_elbow: {
    id: 'lip_elbow',
    name: 'Deck Lip / Rail',
    description: '30mm finger-grip lip where deck meets hull. Continuous rounded 90° elbow around entire perimeter.',
    location: 'Perimeter seam between deck and hull',
    category: 'lip',
    paramKeys: ['lip.overhang', 'lip.drop', 'lip.radiusTop', 'lip.tuckSharpness'],
  },
  transom_face: {
    id: 'transom_face',
    name: 'Transom',
    description: 'Flat vertical stern plate. Top edge is gently crowned to match deck. Upper corners squared, lower corners are quarter-cylinder rounded.',
    location: 'Aft end - WIDE and FLAT (not pointed)',
    category: 'transom',
    paramKeys: ['transom.width', 'transom.rake', 'transom.upperCornerRadius', 'transom.lowerCornerRadius'],
  },
  bow_knife: {
    id: 'bow_knife',
    name: 'Bow Knife Edge',
    description: 'Samurai knife-style bow. Not a point - a ~20-25cm edge at ~45° angle. Deck lip protrudes past stem. All edges rounded (never sharp).',
    location: 'Forward extremity of hull',
    category: 'bow',
    paramKeys: ['bow.edgeLength', 'bow.angle', 'bow.tipRadius', 'bow.bullnoseRadius'],
  },
  beam_curve: {
    id: 'beam_curve',
    name: 'Beam Distribution',
    description: 'How hull width varies from stern to bow. Wide at transom, maximum beam around midship, tapering to knife at bow.',
    location: 'Plan view outline',
    category: 'hull',
    paramKeys: ['beam.sternWidth', 'beam.maxBeamPos', 'beam.bowTaper'],
  },
  section_shape: {
    id: 'section_shape',
    name: 'Section Shape',
    description: 'Cross-sectional profile - V-hull depth, chine position, bilge roundness. Varies smoothly along length.',
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
  icon: string;  // Lucide icon name
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
    id: 'deck',
    name: 'Deck Sheet',
    icon: 'Layers',
    description: 'Top surface - flat in side view, crowned at stern',
    params: [
      { key: 'deck.crownAft', label: 'Crown Height (Stern)', min: 0, max: 0.05, step: 0.001, unit: 'm', tooltip: 'Convex crown height at stern centerline', hoverTarget: 'deck_sheet' },
      { key: 'deck.crownFadeStart', label: 'Crown Fade Start', min: 0, max: 0.5, step: 0.01, tooltip: 'U position where crown starts diminishing', hoverTarget: 'deck_sheet' },
      { key: 'deck.crownFadeEnd', label: 'Crown Fade End', min: 0.2, max: 0.8, step: 0.01, tooltip: 'U position where crown is zero (flat deck)', hoverTarget: 'deck_sheet' },
      { key: 'deck.crownPower', label: 'Crown Power', min: 1, max: 4, step: 0.1, tooltip: 'Exponent controlling crown shape: 2=parabolic', hoverTarget: 'deck_sheet' },
    ],
  },
  {
    id: 'lip',
    name: 'Deck Lip / Rail',
    icon: 'Grip',
    description: '30mm finger-grip elbow around perimeter',
    params: [
      { key: 'lip.overhang', label: 'Overhang', min: 0.010, max: 0.050, step: 0.001, unit: 'm', tooltip: 'How far lip extends outboard (30mm default)', hoverTarget: 'lip_elbow' },
      { key: 'lip.drop', label: 'Drop', min: 0.010, max: 0.040, step: 0.001, unit: 'm', tooltip: 'How far lip drops below deck surface', hoverTarget: 'lip_elbow' },
      { key: 'lip.radiusTop', label: 'Top Radius', min: 0.002, max: 0.015, step: 0.001, unit: 'm', tooltip: 'Rounding at visible top edge', hoverTarget: 'lip_elbow' },
      { key: 'lip.tuckSharpness', label: 'Tuck Sharpness', min: 0, max: 1, step: 0.05, tooltip: 'How abruptly underside tucks inward', hoverTarget: 'lip_elbow' },
      { key: 'lip.transomUpperSharpness', label: 'Transom Upper Corners', min: 0, max: 1, step: 0.05, tooltip: 'How squared the top transom corners are', hoverTarget: 'transom_face' },
      { key: 'lip.transomLowerRadius', label: 'Transom Lower Radius', min: 0.005, max: 0.03, step: 0.001, unit: 'm', tooltip: 'Quarter-cylinder radius at transom bottom corners', hoverTarget: 'transom_face' },
    ],
  },
  {
    id: 'bottom',
    name: 'Bottom Hull',
    icon: 'Ship',
    description: 'V-hull shape, rocker, and section',
    params: [
      { key: 'bottom.vDepth', label: 'V-Hull Depth', min: 0, max: 1, step: 0.01, tooltip: 'How pronounced the V-shape is: 0=flat, 1=deep V', hoverTarget: 'section_shape' },
      { key: 'bottom.vPower', label: 'V-Hull Power', min: 1, max: 4, step: 0.1, tooltip: 'Exponent for V-shape curve', hoverTarget: 'section_shape' },
      { key: 'bottom.chinePos', label: 'Chine Position', min: 0.2, max: 0.6, step: 0.01, tooltip: 'Lateral position of chine (0=centerline, 1=rail)', hoverTarget: 'section_shape' },
      { key: 'bottom.chineSoftness', label: 'Chine Softness', min: 0, max: 1, step: 0.01, tooltip: 'Blend toward rounded: 0=hard chine, 1=round', hoverTarget: 'section_shape' },
      { key: 'bottom.deadrise', label: 'Deadrise', min: 0, max: 1, step: 0.01, tooltip: 'Deadrise angle factor', hoverTarget: 'section_shape' },
      { key: 'bottom.rockerAmp', label: 'Rocker', min: 0, max: 0.15, step: 0.005, unit: 'm', tooltip: 'Maximum keel rise at ends', hoverTarget: 'bottom_hull' },
      { key: 'bottom.rockerPower', label: 'Rocker Power', min: 1, max: 4, step: 0.1, tooltip: 'Exponent for rocker curve', hoverTarget: 'bottom_hull' },
      { key: 'bottom.forefoot', label: 'Forefoot Lift', min: 0, max: 0.08, step: 0.005, unit: 'm', tooltip: 'Extra bow lift at forefoot', hoverTarget: 'bow_knife' },
    ],
  },
  {
    id: 'transom',
    name: 'Transom',
    icon: 'Square',
    description: 'Flat vertical stern plate',
    params: [
      { key: 'transom.width', label: 'Width Ratio', min: 0.5, max: 1, step: 0.01, tooltip: 'Transom width as ratio of max beam', hoverTarget: 'transom_face' },
      { key: 'transom.topCrown', label: 'Top Edge Crown', min: 0, max: 0.04, step: 0.001, unit: 'm', tooltip: 'Crown at top edge (matches deck)', hoverTarget: 'transom_face' },
      { key: 'transom.bottomCrown', label: 'Bottom Edge Crown', min: 0, max: 0.03, step: 0.001, unit: 'm', tooltip: 'Crown at bottom edge', hoverTarget: 'transom_face' },
      { key: 'transom.upperCornerRadius', label: 'Upper Corner Radius', min: 0.002, max: 0.015, step: 0.001, unit: 'm', tooltip: 'Small radius = squared feel', hoverTarget: 'transom_face' },
      { key: 'transom.lowerCornerRadius', label: 'Lower Corner Radius', min: 0.010, max: 0.04, step: 0.001, unit: 'm', tooltip: 'Quarter-cylinder radius', hoverTarget: 'transom_face' },
      { key: 'transom.rake', label: 'Rake Angle', min: 0, max: 20, step: 0.5, unit: '°', tooltip: 'How much transom leans back', hoverTarget: 'transom_face' },
      { key: 'transom.height', label: 'Height Ratio', min: 0.5, max: 1, step: 0.01, tooltip: 'Transom height as ratio of hull depth', hoverTarget: 'transom_face' },
    ],
  },
  {
    id: 'bow',
    name: 'Bow Knife Edge',
    icon: 'Sword',
    description: 'Samurai knife-style bow, not a point',
    params: [
      { key: 'bow.edgeLength', label: 'Edge Length', min: 0.10, max: 0.35, step: 0.01, unit: 'm', tooltip: 'Length of the knife edge (20-25cm typical)', hoverTarget: 'bow_knife' },
      { key: 'bow.angle', label: 'Bevel Angle', min: 30, max: 60, step: 1, unit: '°', tooltip: 'Angle of knife edge (45° typical)', hoverTarget: 'bow_knife' },
      { key: 'bow.tipRadius', label: 'Edge Radius', min: 0.002, max: 0.015, step: 0.001, unit: 'm', tooltip: 'Rounding on knife edge (never sharp)', hoverTarget: 'bow_knife' },
      { key: 'bow.bullnoseRadius', label: 'Bullnose Radius', min: 0.005, max: 0.02, step: 0.001, unit: 'm', tooltip: 'Cylindrical rounding at very front', hoverTarget: 'bow_knife' },
      { key: 'bow.shoulderBlend', label: 'Shoulder Blend', min: 0.05, max: 0.25, step: 0.01, unit: 'm', tooltip: 'How far back bow knife blends into hull', hoverTarget: 'bow_knife' },
      { key: 'bow.lipOverhang', label: 'Lip Overhang', min: 0.005, max: 0.025, step: 0.001, unit: 'm', tooltip: 'How far deck lip protrudes past stem', hoverTarget: 'bow_knife' },
    ],
  },
  {
    id: 'beam',
    name: 'Beam Distribution',
    icon: 'MoveHorizontal',
    description: 'Plan view outline - width along length',
    params: [
      { key: 'beam.sternWidth', label: 'Stern Width', min: 0.5, max: 1, step: 0.01, tooltip: 'Width at transom as ratio of max beam', hoverTarget: 'beam_curve' },
      { key: 'beam.maxBeamPos', label: 'Max Beam Position', min: 0.3, max: 0.6, step: 0.01, tooltip: 'U position of maximum beam (0=stern, 1=bow)', hoverTarget: 'beam_curve' },
      { key: 'beam.bowTaper', label: 'Bow Taper Power', min: 1, max: 3, step: 0.1, tooltip: 'How quickly bow tapers to knife edge', hoverTarget: 'beam_curve' },
      { key: 'beam.sternBlend', label: 'Stern Blend Region', min: 0.05, max: 0.3, step: 0.01, tooltip: 'Length of region where stern stays wide', hoverTarget: 'transom_face' },
    ],
  },
];

// ============================================
// MESH GENERATION OPTIONS
// ============================================

export interface MeshResolution {
  Nu: number;  // Longitudinal samples
  Nv: number;  // Lateral samples
  lipSamples: number;  // Extra samples in lip region
}

export const MESH_RESOLUTIONS: Record<'low' | 'medium' | 'high', MeshResolution> = {
  low: { Nu: 32, Nv: 16, lipSamples: 4 },
  medium: { Nu: 64, Nv: 32, lipSamples: 6 },
  high: { Nu: 128, Nv: 64, lipSamples: 8 },
};
