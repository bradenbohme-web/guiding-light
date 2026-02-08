// Comprehensive ocean & weather parameter types

export interface SwellGroup {
  enabled: boolean;
  direction: number;      // degrees, 0=North, 90=East
  wavelength: number;     // meters
  amplitude: number;      // meters
  steepness: number;      // 0-1, Gerstner Q factor
}

export interface WindSeaParams {
  enabled: boolean;
  direction: number;      // degrees
  speed: number;          // m/s (Beaufort-convertible)
  fetch: number;          // km — distance over which wind blows
  spreadAngle: number;    // degrees — directional spread
  choppiness: number;     // 0-2
}

export interface CapillaryParams {
  enabled: boolean;
  intensity: number;      // 0-1
  scale: number;          // wavelength multiplier
}

export interface FoamParams {
  enabled: boolean;
  threshold: number;      // steepness threshold for foam generation
  coverage: number;       // 0-1 overall foam density
  decay: number;          // seconds — foam lifetime
  color: string;          // hex color
  whitecapIntensity: number;  // 0-1
  streakLength: number;   // 0-1 wind-blown foam streak
}

export interface SprayParams {
  enabled: boolean;
  intensity: number;      // 0-1
  height: number;         // max spray height multiplier
  windEffect: number;     // how much wind carries spray
  mistDensity: number;    // 0-1 low-lying mist
}

export interface WaterMaterialParams {
  deepColor: string;
  shallowColor: string;
  absorptionR: number;    // Beer's law coefficients
  absorptionG: number;
  absorptionB: number;
  absorptionDepth: number;
  clarity: number;        // 0-1 (inverse turbidity)
  ior: number;            // index of refraction (~1.333)
  roughness: number;      // 0-1 surface microroughness
}

export interface SSSParams {
  enabled: boolean;
  intensity: number;
  power: number;
  color: string;
  ambientOcclusion: number;  // 0-1
}

export interface SunParams {
  azimuth: number;        // degrees
  elevation: number;      // degrees
  intensity: number;      // 0-5
  color: string;          // hex
  diskSize: number;       // sun disk angular size
}

export interface SkyParams {
  turbidity: number;      // 1-10
  rayleigh: number;       // 0-4
  mieCoefficient: number; // 0-0.1
  mieDirectionalG: number; // 0-1
}

export interface FogParams {
  enabled: boolean;
  color: string;
  near: number;
  far: number;
  density: number;        // 0-1
}

export interface AtmosphereParams {
  sun: SunParams;
  sky: SkyParams;
  fog: FogParams;
  godRays: boolean;
  godRayIntensity: number;
}

export interface CausticsParams {
  enabled: boolean;
  intensity: number;
  scale: number;
  speed: number;
}

export interface UnderwaterParams {
  causticsEnabled: boolean;
  causticsIntensity: number;
  causticsScale: number;
  depthFogEnabled: boolean;
  depthFogColor: string;
  depthFogDensity: number;
  particlesEnabled: boolean;
  particleDensity: number;
}

export interface FFTParams {
  enabled: boolean;
  resolution: 64 | 128 | 256 | 512;
  windSpeed: number;      // m/s
  windDirection: number;  // degrees
  amplitude: number;      // Phillips spectrum amplitude
  choppiness: number;     // 0-2
  detailBlend: number;    // 0-1 how much FFT adds to Gerstner
}

export interface PerformanceParams {
  meshResolution: number;   // segments per side (128-1024)
  oceanSize: number;        // world units
  maxParticles: number;
  adaptiveQuality: boolean;
  targetFPS: number;
}

export interface OceanSettings {
  // Wave groups
  primarySwell: SwellGroup;
  secondarySwell: SwellGroup;
  windSea: WindSeaParams;
  capillary: CapillaryParams;

  // FFT detail
  fft: FFTParams;

  // Visual
  foam: FoamParams;
  spray: SprayParams;
  material: WaterMaterialParams;
  sss: SSSParams;
  underwater: UnderwaterParams;

  // Environment
  atmosphere: AtmosphereParams;

  // Performance
  performance: PerformanceParams;

  // Master scale
  globalWaveHeight: number;   // master multiplier (0-3)
  timeScale: number;          // animation speed (0-3)
}

// ---- Beaufort scale presets ----
export type BeaufortScale = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export const BEAUFORT_PRESETS: Record<BeaufortScale, { label: string; windSpeed: number; waveHeight: number; description: string }> = {
  0: { label: "Calm",            windSpeed: 0,   waveHeight: 0.0,  description: "Sea like a mirror" },
  1: { label: "Light Air",       windSpeed: 1.5, waveHeight: 0.05, description: "Ripples without crests" },
  2: { label: "Light Breeze",    windSpeed: 3.3, waveHeight: 0.15, description: "Small wavelets, glassy crests" },
  3: { label: "Gentle Breeze",   windSpeed: 5.4, waveHeight: 0.4,  description: "Large wavelets, crests begin to break" },
  4: { label: "Moderate Breeze", windSpeed: 7.9, waveHeight: 1.0,  description: "Small waves, frequent whitecaps" },
  5: { label: "Fresh Breeze",    windSpeed: 10.7,waveHeight: 2.0,  description: "Moderate waves, many whitecaps, some spray" },
  6: { label: "Strong Breeze",   windSpeed: 13.8,waveHeight: 3.0,  description: "Large waves, extensive whitecap foam, spray" },
  7: { label: "Near Gale",       windSpeed: 17.1,waveHeight: 4.5,  description: "Sea heaps up, foam begins to streak" },
  8: { label: "Gale",            windSpeed: 20.7,waveHeight: 6.0,  description: "Moderately high waves, well-marked foam streaks" },
};

// ---- Default settings (Beaufort 3-4, typical Laser dinghy sailing) ----
export const DEFAULT_OCEAN_SETTINGS: OceanSettings = {
  primarySwell: {
    enabled: true,
    direction: 315,       // NW swell
    wavelength: 18,
    amplitude: 0.35,
    steepness: 0.6,
  },
  secondarySwell: {
    enabled: true,
    direction: 200,       // SSW cross-swell
    wavelength: 11,
    amplitude: 0.18,
    steepness: 0.65,
  },
  windSea: {
    enabled: true,
    direction: 270,       // westerly wind
    speed: 7.0,           // ~14 knots, good Laser sailing
    fetch: 50,
    spreadAngle: 30,
    choppiness: 0.7,
  },
  capillary: {
    enabled: true,
    intensity: 0.5,
    scale: 1.0,
  },
  fft: {
    enabled: true,
    resolution: 128,
    windSpeed: 7.0,
    windDirection: 270,
    amplitude: 0.0004,
    choppiness: 1.2,
    detailBlend: 0.3,
  },
  foam: {
    enabled: true,
    threshold: 0.35,
    coverage: 0.4,
    decay: 3.0,
    color: "#e8e8e0",
    whitecapIntensity: 0.6,
    streakLength: 0.3,
  },
  spray: {
    enabled: true,
    intensity: 0.5,
    height: 1.0,
    windEffect: 0.7,
    mistDensity: 0.2,
  },
  material: {
    deepColor: "#001a33",
    shallowColor: "#0077aa",
    absorptionR: 0.4,
    absorptionG: 0.04,
    absorptionB: 0.02,
    absorptionDepth: 3.0,
    clarity: 0.7,
    ior: 1.333,
    roughness: 0.1,
  },
  sss: {
    enabled: true,
    intensity: 0.35,
    power: 3.0,
    color: "#1ab890",
    ambientOcclusion: 0.3,
  },
  underwater: {
    causticsEnabled: true,
    causticsIntensity: 0.5,
    causticsScale: 3.0,
    depthFogEnabled: true,
    depthFogColor: "#003355",
    depthFogDensity: 0.3,
    particlesEnabled: true,
    particleDensity: 0.4,
  },
  atmosphere: {
    sun: {
      azimuth: 210,
      elevation: 35,
      intensity: 2.5,
      color: "#fff5e0",
      diskSize: 1.0,
    },
    sky: {
      turbidity: 2,
      rayleigh: 0.5,
      mieCoefficient: 0.005,
      mieDirectionalG: 0.8,
    },
    fog: {
      enabled: true,
      color: "#b0d4e8",
      near: 50,
      far: 250,
      density: 0.5,
    },
    godRays: true,
    godRayIntensity: 0.5,
  },
  performance: {
    meshResolution: 512,
    oceanSize: 300,
    maxParticles: 100000,
    adaptiveQuality: true,
    targetFPS: 60,
  },
  globalWaveHeight: 0.3,
  timeScale: 1.0,
};
