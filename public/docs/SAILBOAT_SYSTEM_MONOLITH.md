# 🔷 SAILBOAT SYSTEM MONOLITH
**Complete System Anatomy Mapping - Laser/ILCA Sailing Boat Simulation**
**Single Source of Truth - Code + Physics + Settings + Mappings**

**[TAG:SAM] [TAG:MONOLITH] [TAG:SAILBOAT] [TAG:INDEX] [TAG:NAVIGATION]**

**Version:** 1.0.0  
**Date:** 2026-01-01  
**Purpose:** Complete mapping of entire sailboat adjustment system - model, physics, settings, code  
**Target Audience:** AI Agents, Developers, Physics Engineers  
**Search Methods:** Grep (keywords), RAG (semantic), Direct Navigation (anchors)

---

## 📋 QUICK NAVIGATION INDEX

**[TAG:NAV:INDEX]**

### **Jump to Section (Anchor Links):**
1. [METADATA & SEARCH](#metadata--search-optimization) `[TAG:META] [TAG:SEARCH]`
2. [CODE ARCHITECTURE](#code-architecture) `[TAG:CODE]`
3. [PHYSICS SYSTEMS](#physics-systems) `[TAG:PHYSICS]`
4. [SETTINGS & CONFIGURATION](#settings--configuration) `[TAG:SETTINGS]`
5. [MODEL & GEOMETRY](#model--geometry) `[TAG:MODEL]`
6. [INTEGRATION POINTS](#integration-points) `[TAG:INTEGRATION]`
7. [CONTROLS & INPUT](#controls--input) `[TAG:CONTROLS]`
8. [PERFORMANCE & OPTIMIZATION](#performance--optimization) `[TAG:PERF]`

**[END:TAG:NAV:INDEX]**

---

## 🔍 METADATA & SEARCH OPTIMIZATION

**[TAG:META] [TAG:SEARCH]**

### **Document Metadata**
```yaml
document_type: sam_monolith_sailboat
version: 1.0.0
created: 2026-01-01
project: unified_wave_sailing_boat
system_anatomy_mapping: true
ai_navigation_optimized: true
search_methods: [grep, rag, semantic, direct_navigation]
file_consolidation: true
```

### **Search Optimization Hints**

**For Grep/Keyword Search:**
- Component names: `LaserBoatModel`, `SailClothSimulation`, `BoatRuntime`, `GptwavesV7Scene`
- Concepts: `buoyancy`, `hull`, `sail`, `rigging`, `hardpoint`, `foil`, `rudder`, `boom`, `mast`
- Physics terms: `apparent wind`, `hydrodynamic`, `aerodynamic`, `planing`, `leeway`, `heel`
- Settings: `BoatBuilderSettings`, `BoatObjectSettings`, `BoatKind`, `hardpoints`

**For RAG/Semantic Search:**
- Natural language descriptions throughout
- Physics explanations in prose
- Relationship descriptions between components
- Problem/solution narratives

**[END:TAG:META] [END:TAG:SEARCH]**

---

## 🏗️ CODE ARCHITECTURE

**[TAG:CODE] [TAG:ARCHITECTURE]**

### **File Structure**

```
Documentation/appexamples/water-showcase-unified/src/
├── engines/gptwaves-v7/
│   ├── GptwavesV7Scene.tsx          # Main scene, boat physics loop
│   ├── boats/
│   │   ├── LaserBoatModel.tsx       # Procedural hull + rigging model
│   │   └── SailClothSimulation.ts   # CPU Verlet cloth simulation
│   ├── hooks/
│   │   └── useWaterSimulation.ts    # Water heightfield solver (boat coupling API)
│   └── components/
│       └── WaterSurface.tsx         # Water rendering
└── types/
    └── WaterSettings.ts             # Complete settings schema (boats, boatBuilder)
```

### **Core Components**

#### **1. GptwavesV7Scene.tsx** (Main Integration Point)

**Location:** `Documentation/appexamples/water-showcase-unified/src/engines/gptwaves-v7/GptwavesV7Scene.tsx`

**Purpose:** Main scene component that orchestrates boat physics, water coupling, and rendering

**Key Types:**
```typescript
type BoatKind = 'laser' | 'motorboat' | 'yacht' | 'containership';

type BoatHullSphere = {
  local: THREE.Vector3;
  radius: number;
  prevWorld: THREE.Vector3;
};

type BoatRuntime = {
  kind: BoatKind;
  mass: number;
  dims: { length: number; width: number; height: number };
  position: THREE.Vector3;
  quaternion: THREE.Quaternion;
  velocity: THREE.Vector3;
  angularVelocity: THREE.Vector3;
  buoyancySamplesLocal: THREE.Vector3[];
  hullSpheres: BoatHullSphere[];
  // Controls
  throttle: number; // -1..1
  rudder: number; // -1..1
  sailAngle: number; // radians (laser)
  propRpm: number; // visuals
};
```

**Key Responsibilities:**
- Boat physics update loop (in `useFrame`)
- Water-boat coupling via `moveSphere()` and `addImpulse()`
- GPU buoyancy sampling (max 64 samples per boat)
- Sail force calculation (apparent wind → sail angle → force)
- Boat rendering via `<LaserBoatModel>`
- Keyboard input handling (WASD/QE for boat controls)

**Critical Constants:**
```typescript
const BUOYANCY_MAX_SAMPLES = 64;  // Hard cap for GPU readback
```

**Water Coupling API (from `useWaterSimulation.ts`):**
```typescript
// Inject boat displacement into water
moveSphere(oldCenter, newCenter, radius, displacementScale)

// Inject wake impulses
addImpulse(x, z, radius, strength)

// Sample water heightfield
getTexture() // Returns heightfield texture for sampling
```

#### **2. LaserBoatModel.tsx** (Procedural Model)

**Location:** `Documentation/appexamples/water-showcase-unified/src/engines/gptwaves-v7/boats/LaserBoatModel.tsx`

**Purpose:** Procedural Laser/ILCA boat model with editable rigging hardpoints

**Key Features:**
- Procedural hull geometry (sculpted box → dinghy shape)
- Rigging hardpoints system (boat/boom/rudder-local coordinates)
- Visual hardpoint markers (when boatBuilder enabled)
- Rope path preview (mainsheet, vang)
- Batten visualization (follows deformed sail cloth)
- Component highlighting (hull, deck, mast, boom, sail, centerboard, rudder, COM, hardpoints)

**Geometry Functions:**
- `buildLaserHullGeometry()` - Sculpts subdivided box into Laser hull
  - Bow/stern taper
  - V-hull shape
  - Rocker (curved bottom)
  - Cockpit cutout
  - Deck edge rounding
  - Bow tip shaping
- `createFoilGeometry()` - Creates centerboard/rudder foil shapes

**Hardpoint System:**
```typescript
type BoatBuilderHardpoint = {
  attach: 'boat' | 'boom' | 'rudder';
  position: { x: number; y: number; z: number };
};

// Hardpoints stored in settings: boatBuilder.laser.hardpoints
// Examples:
// - mast_base, gooseneck, centerboard_trunk (boat-local)
// - boom_end, boom_block, vang_boom (boom-local)
// - tiller_attach, tiller_extension_hinge (rudder-local)
```

**Coordinate Systems:**
- **Boat-local:** Forward +X, Up +Y, Starboard +Z
- **Boom-local:** Origin at gooseneck, Aft +X (behind mast)
- **Rudder-local:** Origin at rudder pivot

#### **3. SailClothSimulation.ts** (Cloth Physics)

**Location:** `Documentation/appexamples/water-showcase-unified/src/engines/gptwaves-v7/boats/SailClothSimulation.ts`

**Purpose:** CPU-based Verlet-integrated cloth simulation specialized for sails

**Key Features:**
- Position-Based Dynamics (PBD) with Verlet integration
- Sail-local coordinate system (X = boom direction, Y = mast direction, Z = billow)
- Wind + gravity forces applied in sail-local space
- Pinned particles (mast/boom edges)
- Batten constraints (stiff strips reduce flutter)
- Tapered sail shape (head width < foot width)

**Configuration:**
```typescript
interface SailClothConfig {
  widthSegments: number;        // 18 default
  heightSegments: number;       // 24 default
  segmentWidth: number;         // 0.03
  segmentHeight: number;        // 0.035
  headWidthScale: number;       // 0.25 (25% width at head)
  
  battensEnabled: boolean;      // true
  battenCount: number;          // 3
  battenStiffness: number;      // 0.92
  
  mass: number;                 // 0.015 per particle
  damping: number;              // 0.985
  iterations: number;           // 6 constraint iterations
  
  structuralStiffness: number;  // 0.95
  shearStiffness: number;       // 0.8
  bendStiffness: number;        // 0.55
}
```

**Physics Loop:**
```typescript
update(dt: number) {
  1. applyForces()      // Gravity + wind (sail-local)
  2. integrate(dt)      // Verlet integration with damping
  3. solveConstraints() // Iterative constraint solving
  4. updateGeometry()   // Write particle positions to BufferGeometry
}
```

**Wind Interaction:**
- Wind provided in sail-local space each frame
- Small turbulence added (sin/cos noise)
- Wind strength scales force magnitude

**[END:TAG:CODE] [END:TAG:ARCHITECTURE]**

---

## ⚙️ PHYSICS SYSTEMS

**[TAG:PHYSICS]**

### **1. Hull-Boat Coupling**

**Method:** Union-of-spheres hull representation

**How It Works:**
1. Boat hull represented as collection of spheres (`BoatHullSphere[]`)
2. Each frame, for each sphere:
   - Track previous world position
   - Calculate current world position (boat transform)
   - Call `moveSphere(oldWorld, newWorld, radius, displacementScale)`
   - This injects displacement into water heightfield

**Water Interaction:**
- Spheres displace water as they move
- Creates realistic wake following boat
- Water pushes back via buoyancy forces

### **2. Buoyancy System**

**Method:** GPU-accelerated heightfield sampling

**Implementation:**
- Sample water heightfield at multiple points under hull
- Hard cap: `BUOYANCY_MAX_SAMPLES = 64` per boat
- Batched GPU readback for performance
- Calculate submerged volume → Archimedes' principle → buoyancy force

**Sampling Points:**
- Defined in `BoatRuntime.buoyancySamplesLocal[]`
- Transformed to world space via boat transform
- Sampled from water heightfield texture

**Force Application:**
- Buoyancy force = ρ * g * V_submerged
- Applied at center of buoyancy (calculated from sample distribution)

### **3. Sail Aerodynamics**

**Current Implementation:**
- Apparent wind calculation: `v_app = v_wind - v_boat`
- Sail angle from control input (`sailAngle` in radians)
- Simplified force model:
  - Lift-like force scaled by apparent wind speed
  - Small leeway/side-force component

**Future Enhancement (Per T4_complete.md):**
- Panel-based force calculation (sample sail mesh at 16-64 points)
- Local AoA (angle of attack) per panel
- Lift/drag curves with stall behavior
- Luff detection (high curvature oscillation → reduced area, increased drag)
- Center of effort calculation

**Force Application:**
- Total sail force applied at sail center of effort
- Creates heeling moment (torque about hull)
- Yaw moment for weather helm tendencies

### **4. Wake Generation**

**Method:** Impulse injection into water simulation

**Implementation:**
- Front/back dipole pattern:
  - `addImpulse(frontPoint, radius, +strength)`
  - `addImpulse(backPoint, radius, -strength)`
- Creates realistic wake pattern behind boat
- Wake strength scales with boat speed and `impulseStrengthMultiplier`

### **5. Hull Hydrodynamics (Planned)**

**Displacement Mode:**
- Buoyancy + viscous drag
- Wave-making resistance

**Planing Mode (Future):**
- Dynamic lift at high speeds
- Reduced wetted area
- Surfing on wave faces
- Speed threshold ~5-6 knots

**Wave Interaction:**
- Sample water height at multiple hull points (bow/mid/stern, port/starboard)
- Fit local water plane
- Apply:
  - Restoring forces (buoyancy distribution)
  - Wave face sliding forces
  - Pitch/roll moments from wave slope

### **6. Foil System (Centerboard + Rudder)**

**Centerboard:**
- Deployment control: `boatBuilder.laser.centerboard.drop` (0..1)
- Lateral resistance: `boatBuilder.laser.centerboard.lateralResistance`
- Simple model: resists sideways velocity (leeway)

**Rudder:**
- Angle controlled by `boats.laser.rudder` (-1..1)
- Applied as rotation on `laserRudderGroupRef`
- Future: hydrofoil physics (lift/drag based on AoA)

**Future Enhancement:**
- Lift/drag curves: `L = ½ρv²S C_L(α)`
- Stall behavior (excessive leeway/rudder angle)
- Ventilation risk when near surface

**[END:TAG:PHYSICS]**

---

## ⚙️ SETTINGS & CONFIGURATION

**[TAG:SETTINGS]**

### **Settings Schema Location**

**File:** `Documentation/appexamples/water-showcase-unified/src/types/WaterSettings.ts`

### **1. Boat Object Settings**

```typescript
export interface BoatObjectSettings {
  enabled: boolean;                  // Whether boat is simulated/rendered
  overrideControls: boolean;         // If true, controls from settings (no keyboard smoothing)
  throttle: number;                  // -1..1 (ignored for laser)
  rudder: number;                    // -1..1
  sailAngle: number;                 // radians (-1.25..1.25) (laser only)
  overridePosition: boolean;         // Lock boat to specified position
  position: { x: number; y: number; z: number };
}

export interface ObjectsSettings {
  boatsEnabled: boolean;             // Master toggle
  showOnlyActiveBoat: boolean;       // Hide other boats
  activeBoat: BoatKind;              // Which boat receives keyboard input
  keyboardControlsEnabled: boolean;  // Enable WASD/QE controls
  resetNonce: number;                // Increment to request reset
  boats: Record<BoatKind, BoatObjectSettings>;
  boatBuilder: BoatBuilderSettings;
}
```

### **2. Boat Builder Settings**

```typescript
export interface BoatBuilderSettings {
  enabled: boolean;                  // Master toggle for builder tools
  showHardpoints: boolean;           // Visual markers
  showRopePaths: boolean;            // Preview lines
  showLabels: boolean;               // Hardpoint labels
  
  laser: {
    // Hardpoints (rigging attachment points)
    hardpoints: Record<string, BoatBuilderHardpoint>;
    
    // Centerboard
    centerboard: {
      drop: number;                  // 0..1 (0 = up, 1 = down)
      lateralResistance: number;     // Scales sideways resistance
    };
    
    // Hull geometry
    hull: {
      length: number;
      height: number;
      beam: number;
      bowTaperMin: number;
      sternTaperMin: number;
      taperPower: number;
      rockerAmp: number;
      bowLiftAmp: number;
      sternDeckDrop: number;
      vHullDepth: number;
      bowTipPoint: number;
      bowTipRound: number;
    };
    
    // Cockpit
    cockpit: {
      main: {
        position: { x, y, z };
        size: { x, y, z };
      };
    };
    
    // Rig (spars)
    rig: {
      mastHeight: number;
      boomLength: number;
    };
    
    // Sail
    sail: {
      luffHeight: number;            // Vertical size
      headWidthScale: number;        // 0..1 (width at head relative to foot)
      cloth: {
        widthSegments: number;       // 18 default
        heightSegments: number;      // 24 default
      };
      battens: {
        enabled: boolean;
        show: boolean;
        count: number;               // 3 default
        positions?: number[];        // Fractions along luff (0..1)
      };
    };
    
    // Rudder
    rudder: {
      tiller: {
        length: number;
        width: number;
        thickness: number;
        offset: { x, y, z };
      };
      extension: {
        length: number;
        radius: number;
        yawDeg: number;
        pitchDeg: number;
        offset: { x, y, z };
      };
    };
    
    // Physics
    physics: {
      centerOfMass: { x, y, z };     // In boat-local space
    };
    
    // Colors
    colors: {
      hull: string;
      deck: string;
      spar: string;
      foil: string;
      sail: string;
      block: string;
    };
  };
}
```

### **3. Default Values**

**Location:** `WaterSettings.ts` → `DEFAULT_SETTINGS`

**Laser Boat Defaults:**
```typescript
laser: {
  enabled: true,
  overrideControls: false,
  throttle: 0,
  rudder: 0,
  sailAngle: 0,
  overridePosition: false,
  position: { x: -0.45, y: 0.06, z: 0.25 },
}

// Hardpoints (boat-local frame, forward +X, up +Y, starboard +Z)
mast_base: { attach: 'boat', position: { x: 0.06, y: 0.09, z: 0.0 } }
gooseneck: { attach: 'boat', position: { x: 0.06, y: 0.09, z: 0.0 } }
centerboard_trunk: { attach: 'boat', position: { x: 0.02, y: -0.01, z: 0.0 } }
traveler_port: { attach: 'boat', position: { x: -0.33, y: 0.09, z: 0.07 } }
traveler_starboard: { attach: 'boat', position: { x: -0.33, y: 0.09, z: -0.07 } }
mainsheet_base: { attach: 'boat', position: { x: -0.33, y: 0.09, z: 0.0 } }
rudder_pivot: { attach: 'boat', position: { x: -0.36, y: 0.05, z: 0.0 } }
vang_base: { attach: 'boat', position: { x: 0.04, y: 0.06, z: 0.0 } }

// Boom-local (origin at gooseneck, aft +X)
boom_end: { attach: 'boom', position: { x: -0.34, y: 0.0, z: 0.0 } }
boom_block: { attach: 'boom', position: { x: -0.31, y: -0.012, z: 0.0 } }
vang_boom: { attach: 'boom', position: { x: -0.12, y: -0.012, z: 0.0 } }

// Rudder-local (origin at rudder pivot)
tiller_attach: { attach: 'rudder', position: { x: 0.06, y: 0.03, z: 0.0 } }
```

**[END:TAG:SETTINGS]**

---

## 🎨 MODEL & GEOMETRY

**[TAG:MODEL]**

### **Hull Geometry**

**Function:** `buildLaserHullGeometry()` in `LaserBoatModel.tsx`

**Process:**
1. Start with subdivided box: `BoxGeometry(length, height, beam, 40, 10, 18)`
2. Sculpt vertices:
   - **Bow/stern taper:** Narrow ends based on `bowTaperMin`, `sternTaperMin`, `taperPower`
   - **V-hull shape:** Deepen centerline via `vHullDepth`
   - **Rocker:** Lift bottom near ends via `rockerAmp`
   - **Bow lift:** Slight upward curve at bow via `bowLiftAmp`
   - **Deck rounding:** Pull rails inward near deck edge
   - **Cockpit cutout:** Sculpt recess for cockpit
   - **Bow tip:** Point centerline, round rails via `bowTipPoint`, `bowTipRound`
   - **Stern deck drop:** Lower aft deck edge via `sternDeckDrop`

**Key Parameters:**
- `length`: Overall hull length
- `beam`: Width (transverse)
- `height`: Vertical dimension
- `vHullDepth`: How deep the V-hull is (0 = flat, 0.2 = deep V)
- `rockerAmp`: Amount of bottom curvature (0 = flat, 0.2 = highly curved)

### **Sail Cloth Geometry**

**Function:** Generated by `SailClothSimulation` class

**Structure:**
- Grid of particles: `(widthSegments + 1) × (heightSegments + 1)`
- Default: 19 × 25 = 475 particles
- Tapered shape: Head width = `headWidthScale × foot width`
- UV coordinates: Standard (0,0) to (1,1) mapping

**Constraints:**
- **Structural:** Neighboring particles (stretch)
- **Shear:** Diagonal connections (shear resistance)
- **Bend:** Skip-one connections (bending stiffness)
- **Battens:** High-stiffness constraints along batten rows

### **Rigging Geometry**

**Mast:**
- Cylinder: `radiusTop = 0.012`, `radiusBottom = 0.013`, `height = mastHeight`
- Positioned at `mast_base` hardpoint
- Material: `sparMat` (metal)

**Boom:**
- Cylinder: `radius = 0.008`, `length = boomLength`
- Rotates about gooseneck (Y-axis)
- Material: `sparMat` (metal)

**Centerboard:**
- Foil shape: Tapered planform
- Parameters: `chord = 0.06`, `span = 0.18`, `thickness = 0.01`, `tipScale = 0.55`
- Deployment: Vertical translation based on `centerboard.drop` (0..1)

**Rudder:**
- Blade: Box geometry (`0.06 × 0.12 × 0.009`)
- Hinge: Cylinder at transom
- Rotation: Controlled by `rudder` input (-1..1)
- Tiller: Box + extension cylinder

### **Materials**

**Hull:** `boatMaterial` (provided as prop, typically `MeshStandardMaterial`)

**Deck:** `deckMat` (`roughness: 0.9`, `metalness: 0.05`)

**Spars (Mast/Boom):** `sparMat` (`roughness: 0.35`, `metalness: 0.6`)

**Foils (Centerboard/Rudder):** `foilMat` (`roughness: 0.65`, `metalness: 0.12`)

**Sail:** `MeshStandardMaterial` from `SailClothSimulation` (`roughness: 0.9`, `metalness: 0.0`, `opacity: 0.92`, `transparent: true`)

**Blocks:** `blockMat` (`roughness: 0.6`, `metalness: 0.25`)

**[END:TAG:MODEL]**

---

## 🔗 INTEGRATION POINTS

**[TAG:INTEGRATION]**

### **1. Water Simulation Integration**

**Water Solver:** `useWaterSimulation.ts`

**API:**
```typescript
const { moveSphere, addImpulse, getTexture, stepSimulation, updateNormals } = useWaterSimulation();
```

**Coupling Pattern:**
1. **Displacement:** `moveSphere(oldWorld, newWorld, radius, scale)` per hull sphere
2. **Wake:** `addImpulse(x, z, radius, strength)` at front/back points
3. **Sampling:** `getTexture()` → sample heightfield for buoyancy

**Performance:**
- GPU-accelerated heightfield simulation
- Batched operations (all spheres processed together)
- Buoyancy sampling capped at 64 points (GPU readback limit)

### **2. Settings Integration**

**Provider:** `useUnifiedSettings()` hook

**Settings Access:**
```typescript
const { settings } = useUnifiedSettings();

// Boat settings
settings.objects.boats.laser.enabled
settings.objects.boats.laser.rudder
settings.objects.boats.laser.sailAngle

// Boat builder settings
settings.objects.boatBuilder.laser.hull.length
settings.objects.boatBuilder.laser.hardpoints.mast_base
settings.objects.boatBuilder.laser.centerboard.drop
```

**Settings Updates:**
- Real-time updates (no debouncing for settings)
- Auto-save to localStorage
- Export/import via JSON backup

### **3. Rendering Integration**

**Three.js / React Three Fiber:**
- `LaserBoatModel` rendered as R3F component
- `SailClothSimulation.mesh` added to boom group
- Materials use Three.js `MeshStandardMaterial`
- Shadows: Hull casts/receives, sail does not

**Scene Graph:**
```
GptwavesV7Scene
  └─ Group (laserBoatGroupRef)
      ├─ LaserBoatModel
      │   ├─ Hull Mesh
      │   ├─ Deck Mesh
      │   ├─ Mast Mesh
      │   ├─ Group (boomRef)
      │   │   ├─ Boom Mesh
      │   │   ├─ Sail Mesh (from SailClothSimulation)
      │   │   └─ Batten Lines
      │   ├─ Centerboard Mesh
      │   └─ Group (rudderRef)
      │       ├─ Rudder Blade
      │       └─ Tiller
      └─ Hardpoint Markers (if boatBuilder.enabled)
```

### **4. Input Integration**

**Keyboard Controls:**
- `W/A/S/D`: Boat movement (forward/port/back/starboard)
- `Q/E`: Sail trim (ease/sheet in)
- `Shift`: Modifier for fine control

**UI Controls:**
- Settings drawer: Direct value editing
- Boat Builder drawer: Hardpoint editing, geometry tuning
- Override controls: Settings-driven (no keyboard smoothing)

**[END:TAG:INTEGRATION]**

---

## 🎮 CONTROLS & INPUT

**[TAG:CONTROLS]**

### **Keyboard Controls (WASD/QE)**

**Mapping:**
- `W`: Forward (motorboats: throttle +)
- `S`: Backward (motorboats: throttle -)
- `A`: Port (rudder -)
- `D`: Starboard (rudder +)
- `Q`: Sail ease (sailAngle -)
- `E`: Sail sheet in (sailAngle +)
- `Shift`: Fine control modifier

**Implementation:**
- Handled in `GptwavesV7Scene.tsx` via keyboard event listeners
- Only active when `keyboardControlsEnabled === true`
- Applied to `activeBoat` only

### **Settings Override**

**When `overrideControls === true`:**
- Controls read directly from `boats.laser.rudder` and `boats.laser.sailAngle`
- No keyboard input
- No smoothing/interpolation
- Direct value application

**Use Cases:**
- Precise tuning via UI sliders
- Animation/keyframing
- Testing specific control values

### **Sail Angle Range**

**Laser:**
- Range: `-1.25..1.25` radians
- `0.0` = boom perpendicular to centerline (broad reach)
- Negative = port tack
- Positive = starboard tack

**Conversion:**
- UI may display in degrees: `sailAngle * (180 / Math.PI)`
- Boom rotation: `boomRef.current.rotation.y = sailAngle`

### **Rudder Range**

**All Boats:**
- Range: `-1..1`
- `-1` = hard port (max left)
- `0` = centered
- `+1` = hard starboard (max right)

**Conversion to Angle:**
- Rudder max angle: ~35 degrees
- `rudderAngle = rudder * 35 * (Math.PI / 180)`
- Applied as: `rudderRef.current.rotation.y = rudderAngle`

**[END:TAG:CONTROLS]**

---

## ⚡ PERFORMANCE & OPTIMIZATION

**[TAG:PERF]**

### **Buoyancy Sampling Limit**

**Hard Cap:** `BUOYANCY_MAX_SAMPLES = 64`

**Reason:** GPU readback bottleneck

**Impact:**
- Must balance sample count vs performance
- More samples = better force distribution but slower
- Current implementation: Grid of samples under hull

**Optimization Strategies:**
- Adaptive sampling (fewer samples when stable)
- LOD system (distant boats use fewer samples)
- Cached water heights (sample once, use for multiple frames)

### **Sail Cloth Performance**

**CPU Cost:**
- Scales with particle count: `(widthSegments + 1) × (heightSegments + 1)`
- Default: 475 particles
- Constraint iterations: 6 per frame
- Per-particle operations: Force application, Verlet integration, constraint solving

**Optimization:**
- Reduce segments for lower-end hardware
- Reduce constraint iterations (lower quality)
- GPU migration (future): Move to compute shaders

### **Hull Sphere Count**

**Performance:**
- Each sphere requires `moveSphere()` call
- More spheres = more accurate displacement but higher cost
- Typical: 5-15 spheres per hull

**Optimization:**
- Adaptive sphere count (fewer when boat is stable)
- Sphere culling (skip spheres above water surface)

### **Water Coupling Performance**

**Bottlenecks:**
1. GPU readback for buoyancy (hard cap at 64)
2. `moveSphere()` calls per hull sphere
3. `addImpulse()` calls for wake

**Optimization:**
- Batch operations (all boats processed together)
- Reduce update frequency (update every N frames)
- LOD: Skip coupling for distant boats

### **Rendering Performance**

**Geometry:**
- Hull: ~40×10×18 = 7,200 vertices (high detail)
- Sail: 475 vertices (configurable)
- Total: ~8,000 vertices per boat

**Optimization:**
- Reduce hull segments (lower detail)
- Reduce sail segments (lower cloth quality)
- Frustum culling (don't render off-screen boats)
- LOD: Simplified geometry at distance

**[END:TAG:PERF]**

---

## 📊 COMPLETE SETTINGS REFERENCE

**[TAG:SETTINGS:REF]**

### **All Boat-Related Settings Paths**

```
objects.boatsEnabled                    // Master toggle
objects.showOnlyActiveBoat              // Hide others
objects.activeBoat                      // 'laser' | 'motorboat' | 'yacht' | 'containership'
objects.keyboardControlsEnabled         // WASD/QE enabled
objects.resetNonce                      // Reset trigger

objects.boats.laser.enabled             // Laser boat enabled
objects.boats.laser.overrideControls    // Use settings (no keyboard)
objects.boats.laser.rudder              // -1..1
objects.boats.laser.sailAngle           // radians (-1.25..1.25)
objects.boats.laser.overridePosition    // Lock position
objects.boats.laser.position.x/y/z      // Locked position

objects.boatBuilder.enabled             // Builder tools enabled
objects.boatBuilder.showHardpoints      // Show markers
objects.boatBuilder.showRopePaths       // Show preview lines
objects.boatBuilder.showLabels          // Show hardpoint labels

objects.boatBuilder.laser.hardpoints.{id}.attach    // 'boat' | 'boom' | 'rudder'
objects.boatBuilder.laser.hardpoints.{id}.position  // { x, y, z }

objects.boatBuilder.laser.centerboard.drop           // 0..1
objects.boatBuilder.laser.centerboard.lateralResistance

objects.boatBuilder.laser.hull.length
objects.boatBuilder.laser.hull.height
objects.boatBuilder.laser.hull.beam
objects.boatBuilder.laser.hull.bowTaperMin
objects.boatBuilder.laser.hull.sternTaperMin
objects.boatBuilder.laser.hull.taperPower
objects.boatBuilder.laser.hull.rockerAmp
objects.boatBuilder.laser.hull.bowLiftAmp
objects.boatBuilder.laser.hull.sternDeckDrop
objects.boatBuilder.laser.hull.vHullDepth
objects.boatBuilder.laser.hull.bowTipPoint
objects.boatBuilder.laser.hull.bowTipRound

objects.boatBuilder.laser.cockpit.main.position.x/y/z
objects.boatBuilder.laser.cockpit.main.size.x/y/z

objects.boatBuilder.laser.rig.mastHeight
objects.boatBuilder.laser.rig.boomLength

objects.boatBuilder.laser.sail.luffHeight
objects.boatBuilder.laser.sail.headWidthScale
objects.boatBuilder.laser.sail.cloth.widthSegments
objects.boatBuilder.laser.sail.cloth.heightSegments
objects.boatBuilder.laser.sail.battens.enabled
objects.boatBuilder.laser.sail.battens.show
objects.boatBuilder.laser.sail.battens.count
objects.boatBuilder.laser.sail.battens.positions[]

objects.boatBuilder.laser.rudder.tiller.length
objects.boatBuilder.laser.rudder.tiller.width
objects.boatBuilder.laser.rudder.tiller.thickness
objects.boatBuilder.laser.rudder.tiller.offset.x/y/z
objects.boatBuilder.laser.rudder.extension.length
objects.boatBuilder.laser.rudder.extension.radius
objects.boatBuilder.laser.rudder.extension.yawDeg
objects.boatBuilder.laser.rudder.extension.pitchDeg
objects.boatBuilder.laser.rudder.extension.offset.x/y/z

objects.boatBuilder.laser.physics.centerOfMass.x/y/z

objects.boatBuilder.laser.colors.hull
objects.boatBuilder.laser.colors.deck
objects.boatBuilder.laser.colors.spar
objects.boatBuilder.laser.colors.foil
objects.boatBuilder.laser.colors.sail
objects.boatBuilder.laser.colors.block
```

**[END:TAG:SETTINGS:REF]**

---

## 🔄 PHYSICS UPDATE LOOP

**[TAG:PHYSICS:LOOP]**

### **Complete Frame Update Sequence**

**Location:** `GptwavesV7Scene.tsx` → `useFrame` hook

**Sequence:**
1. **Water Simulation Step**
   - `stepSimulation()` - Advance water heightfield
   - `updateNormals()` - Recalculate surface normals

2. **Boat Physics Update (per boat)**
   - Read control inputs (keyboard or settings override)
   - Update sail angle / rudder angle
   - Update sail cloth simulation (`SailClothSimulation.update(dt)`)
   - Calculate apparent wind: `v_app = v_wind - v_boat`
   - Calculate sail forces (apparent wind → sail angle → force)
   - Sample water heightfield for buoyancy (max 64 points)
   - Calculate buoyancy forces (Archimedes' principle)
   - Apply forces to boat (sail + buoyancy)
   - Integrate physics (velocity, position, rotation)

3. **Water-Boat Coupling (per boat)**
   - For each hull sphere:
     - Transform to world space
     - Call `moveSphere(oldWorld, newWorld, radius, scale)`
   - Generate wake: `addImpulse(front, +strength)`, `addImpulse(back, -strength)`

4. **Rendering Update**
   - Update boat transform (position, rotation)
   - Update boom rotation (`sailAngle`)
   - Update rudder rotation (`rudderAngle`)
   - Update sail cloth mesh (from `SailClothSimulation.geometry`)
   - Update hardpoint markers (if builder enabled)
   - Update rope path previews (if builder enabled)

**Timing:**
- Physics: ~16ms target (60 FPS)
- Water coupling: GPU-accelerated, async
- Buoyancy readback: Synchronous GPU → CPU transfer (bottleneck)

**[END:TAG:PHYSICS:LOOP]**

---

## 🎯 FUTURE ENHANCEMENTS

**[TAG:FUTURE]**

### **Planned Features (Per T4_complete.md)**

1. **Advanced Sail Aerodynamics**
   - Panel-based force calculation
   - Local AoA per panel
   - Lift/drag curves with stall
   - Luff detection and penalty

2. **Foil Hydrodynamics**
   - Centerboard lift/drag curves
   - Rudder hydrofoil physics
   - Stall behavior
   - Ventilation detection

3. **Planing Physics**
   - Dynamic lift calculation
   - Wetted area reduction
   - Surfing on waves
   - Porpoising detection

4. **Rope/Rigging Physics**
   - Full rope simulation (Verlet)
   - Pulley mechanical advantage
   - Tension propagation
   - Mainsheet, vang, cunningham, outhaul

5. **Character System**
   - Animated sailor (skeletal rigging)
   - Body weight distribution
   - Hiking physics
   - Capsize/recovery sequences

6. **Wind System**
   - 3D wind field
   - Turbulence and gusts
   - Wind shadow effects
   - Vertical gradient

7. **Wave Interaction**
   - Local water plane fitting
   - Wave face sliding
   - Slamming forces
   - Spray particle generation

8. **Sound & Haptics**
   - Bow slap audio
   - Sail flutter sounds
   - Water hiss when planing
   - Rope squeak

**[END:TAG:FUTURE]**

---

## 📚 REFERENCES & SOURCES

**[TAG:REFERENCES]**

### **Documentation Files**
- `T4_complete.md` - Complete reference (6718 words)
- `SAILING_BOAT_SIMULATION_COMPREHENSIVE.md` - Design document
- `T2_architecture.md` - Architecture details
- `PHYSICS_VISUALIZATION_SYSTEM_DESIGN.md` - Physics visualization

### **Code Files**
- `GptwavesV7Scene.tsx` - Main integration (5909+ lines)
- `LaserBoatModel.tsx` - Procedural model (848 lines)
- `SailClothSimulation.ts` - Cloth physics (394 lines)
- `WaterSettings.ts` - Settings schema (1638 lines)

### **Related Systems**
- Water simulation: `useWaterSimulation.ts`
- Water rendering: `WaterSurface.tsx`
- Buoyancy visualization: `LayerBuoyancySamples3D.tsx`
- Forces visualization: `LayerForces3D.tsx`

**[END:TAG:REFERENCES]**

---

**END OF MONOLITH**

**Last Updated:** 2026-01-01  
**Status:** Complete Mapping  
**Next Update:** As system evolves

