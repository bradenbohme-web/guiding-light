# Revolutionary Browser-Based Ocean Simulation
## Technical Specification & Implementation Roadmap

**Target Platform:** Web Browser (React Three Fiber)
**Performance Goal:** Real-time 60 FPS on mid-tier hardware
**Quality Target:** Exceed Unreal Engine 5/6 visual fidelity
**Date:** February 2026
**GPU Strategy:** WebGPU with WebGL2 fallback

---

## Architecture Overview

### Three-Layer Hybrid Architecture

```
LAYER 1: Base Ocean Surface (L1-L2)
├─ Procedural Gerstner Waves (cheap, infinite)
├─ FFT Spectral Ocean (WebGPU, physically accurate)
└─ Performance: Always active, <2ms/frame

LAYER 2: Heightfield Simulation (L3)
├─ 2.5D Shallow Water Equations (SWE)
├─ Object interactions, wakes, shoreline
├─ Dynamic limits (inertia, severity)
├─ Heat map for transition zones
└─ Performance: Active in interaction zones, 2-4ms/frame

LAYER 3: Particle-Based Breaching (L4-L5)
├─ MLS-MPM Fluid Simulation (WebGPU compute)
├─ 100K-300K particles (hardware adaptive)
├─ Screen-space fluid rendering
├─ Foam, spray, droplets, curling lips
└─ Performance: Localized events only, 8-12ms/frame
```

### Component Hierarchy

```tsx
<OceanSimulation>
  ├─ <BaseOceanLayer>
  │   ├─ GerstnerWaveField (procedural, infinite extent)
  │   └─ FFTSpectralOcean (WebGPU, physically based)
  ├─ <HeightfieldLayer>
  │   ├─ SWESolver (shallow water equations)
  │   ├─ ObjectInteraction (coupling system)
  │   ├─ BoundaryConditions (shoreline, walls)
  │   └─ TransitionHeatMap (breach detection)
  ├─ <BreachingLayer>
  │   ├─ MLSMPMSimulation (particle physics)
  │   ├─ ScreenSpaceFluidRenderer
  │   ├─ FoamSystem
  │   └─ SprayParticles
  ├─ <VisualEffectsLayer>
  │   ├─ SubsurfaceScattering
  │   ├─ CausticsRenderer
  │   ├─ UnderwaterEffects
  │   └─ AtmosphericScattering
  └─ <PerformanceManager>
      ├─ LODController
      ├─ BudgetEnforcer
      └─ AdaptiveQuality
```

---

## Phase 1: Foundation (Weeks 1-4)

### Gerstner Wave Model
```glsl
vec3 gerstnerWave(vec2 pos, float t, Wave w) {
    float k = 2.0 * PI / w.wavelength;
    float omega = sqrt(9.81 * k);
    float phase = k * dot(w.direction, pos) - omega * t + w.phase;
    float steepness = w.amplitude * k;
    return vec3(
        w.direction.x * steepness * sin(phase),
        w.amplitude * cos(phase),
        w.direction.y * steepness * sin(phase)
    );
}
```

### FFT Spectral Ocean (Phillips Spectrum)
```glsl
float phillipsSpectrum(vec2 k, float windSpeed, vec2 windDir) {
    float kLen = length(k);
    if (kLen < 0.0001) return 0.0;
    float L = windSpeed * windSpeed / 9.81;
    float kDotW = dot(normalize(k), windDir);
    return A * exp(-1.0 / (kLen * kLen * L * L)) / pow(kLen, 4.0)
           * pow(kDotW, 2.0) * exp(-kLen * kLen * l * l);
}
```

### Hybrid Strategy
- Use Gerstner for 3-5 large hero waves (artistic control)
- Use FFT for medium/small-scale detail (100+ wavelengths)
- Combine via simple addition: η_total = η_gerstner + η_fft

### Water Shader (PBR)
- Schlick fresnel: `f0 + (1-f0) * pow(1 - cosθ, 5)`
- Beer's law absorption: `exp(-absorption * depth)`
- Subsurface scattering approximation
- Caustics from photon mapping approximation
- Foam from wave steepness/curvature

---

## Phase 2: Heightfield Simulation (Weeks 5-8)

### Shallow Water Equations
```
∂η/∂t + ∇·(hu) = 0              // Mass conservation
∂(hu)/∂t + ∇·(hu⊗u) + g∇(η²/2) = F  // Momentum conservation
```

- Texture-based representation (R32F height, RG32F velocity)
- Semi-Lagrangian advection
- 2D FFT pressure solve
- WebGPU compute shaders

---

## Phase 3: Breach Physics (Weeks 9-14)

### MLS-MPM Algorithm
1. **P2G**: Transfer mass/momentum to grid (quadratic B-spline kernel)
2. **Grid Update**: Apply gravity, pressure, boundary conditions
3. **G2P**: Update particle positions/velocities (APIC)

### Breach Analysis Texture (BAT)
- Steepness |∇η|
- Curvature ∇²η
- Vertical velocity η̇
- Local energy density

### Spawn Field (SF0/SF1)
- Crust curvature, lift bias, curl magnitude, flow direction
- Ribbon geometry: 15-60cm length, 5-20cm width
- Wave-inherited velocity

### Breach Feedback Texture (BFT)
- Mexican hat kernel for smooth deposition
- Ring wave generation from particle impacts
- 10% decay per frame

---

## Phase 4: Visual Polish (Weeks 15-18)

- Subsurface scattering (full volumetric approximation)
- Real-time caustics (photon mapping)
- Atmospheric scattering
- HDR tone mapping
- Foam system (generation, advection, decay)
- Spray particles
- Bubble rendering
- Underwater effects

---

## Phase 5: Optimization (Weeks 19-22)

### LOD Tiers
| Tier | Distance | Grid | Particles | Breach |
|------|----------|------|-----------|--------|
| 0 Near | 0-50m | 512² | 300K | Ultra |
| 1 Mid | 50-200m | 256² | 100K | High |
| 2 Far | 200-1000m | 128² | 0 | None |
| 3 Horizon | 1000m+ | 64² | 0 | None |

### Performance Targets
- HIGH (RTX 3060): 60 FPS, 300K particles, 512² grid, Ultra
- MID (GTX 1660): 60 FPS, 100K particles, 256² grid, High
- LOW (iPad Air): 30 FPS, 40K particles, 128² grid, Medium

### Memory Budget
- Heightfield: 2MB (RGBA32F, double-buffered)
- Velocity: 2MB
- BAT/BFT: 2MB
- Foam + Caustics: 2MB
- Particles: 14.4MB (300K)
- Total: ~24MB

---

## Phase 6: Integration & Testing (Weeks 23-24)

- Cross-device testing
- Performance regression tests
- API documentation
- Example scenes

---

## Implementation Notes

### Current State
- Basic OceanEnvironment.tsx with simplex noise waves
- BoatSpray.tsx particle system exists
- WebGL2 shaders only
- No WebGPU detection yet

### Next Steps (Incremental)
1. Replace simplex waves with multi-Gerstner
2. Upgrade water shader to PBR (fresnel, absorption, foam)
3. Add WebGPU detection utility
4. Implement FFT ocean (WebGPU compute)
5. Add SWE heightfield solver
6. Implement MLS-MPM breach system
7. LOD mesh + performance monitor
