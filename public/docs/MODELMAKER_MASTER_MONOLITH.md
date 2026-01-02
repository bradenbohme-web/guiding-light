# 🔷 MODELMAKER MASTER MONOLITH
**Universal Parametric Asset Engine - Complete System Documentation**
**Single Source of Truth - Perfect Organization - AI-Optimized Navigation**

**[TAG:MODELMAKER] [TAG:MONOLITH] [TAG:MASTER] [TAG:INDEX] [TAG:NAVIGATION]**

**Version:** 1.0.0
**Last Built:** 2026-01-01 20:48:00
**Purpose:** Complete modelmaker/3D parametric asset engine documentation in one perfectly organized file
**Target Audience:** AI Agents (Lovable AI, etc.), Developers, System Architects
**Search Methods:** Grep (keywords), RAG (semantic), Direct Navigation (anchors)

---

## 🎯 FOR AI AGENTS: EXECUTIVE SUMMARY & BUILD INSTRUCTIONS

**[TAG:AI_INSTRUCTIONS] [TAG:EXECUTIVE_SUMMARY]**

### **What You Are Building**

**Universal Parametric Asset Engine** - A system where:
- **Any asset = Base Template + Deform Pipeline + Feature Graph + Validation Loop + Runtime Outputs**
- Everything is editable, fit-able to orthographic references, and exportable to game-ready LOD/colliders/hardpoints
- **Primary Use Case:** Parametric 3D modeling (boats, cars, buildings, etc.) with curve-based editing instead of "100 sliders"

### **Core Vision (North Star)**

```
[ReferencePack Images] ---> [Calibrate + Extract Curves] ---> [Targets B,K,D + Sections]
                                     |                                   |
                                     v                                   v
[SVG Diagram Editors] -----> [Param Graph + Feature Nodes] -----> [Compile Pipeline]
                                     |                                   |
                                     v                                   v
                               [Build Base Mesh] ---> [Apply Deforms] ---> [Outputs]
                                                             |
                                                             v
                                            [Ortho Render + Error Metrics]
                                                             |
                                                             v
                                           [Human + LLM propose bounded edits]
```

### **Key Principles**

1. **Canonical Spaces & Determinism** - Same inputs → identical geometry (foundation)
2. **Base Templates** - Editable defaults with stable topology
3. **Deform Pipeline** - Composable deforms (not SDF, but SDF-like power)
4. **Feature Graph** - Add new "variables" forever (feature nodes)
5. **Ortho Reference Pack** - Fit to reference images (LLM accelerator)
6. **SVG Diagram Editor** - User-facing control surface (replaces "100 sliders")
7. **Runtime Outputs** - Game-ready LOD/colliders/hardpoints every time

### **Implementation Build Order (CRITICAL - Follow This Sequence)**

**Phase 1: Foundation (Build First)**
1. ✅ **ReferencePack System** (Step 1) - Ortho image calibration + overlay
2. ✅ **Curve-First Generator** (Step 2) - Primary curves B(x), K(x), D(x) → base mesh
3. ✅ **3D Editor Infrastructure** - Viewport3D, Scene Objects, Tools (required foundation)

**Phase 2: Core Systems (Build Second)**
4. ✅ **Feature Node System** (Step 3) - Feature node contract + 5 core types
5. ✅ **Metrics + Fitting Loop** (Step 4) - Error metrics + silhouette extraction
6. ✅ **Compiler + Runtime Outputs** (Step 5) - LOD generation + colliders + hardpoints

**Phase 3: Advanced Systems (Build Third)**
7. ✅ **ParamFields System** - Curve-based parametric fields (replaces sliders)
8. ✅ **Field Evaluation & Cross-Section Generator** - Core geometry generation engine
9. ✅ **Curve1D Solver** - Generic 1D curve solver + StationCache formulas
10. ✅ **Polygon & 2D Geometry Algorithms** - Production-ready 2D geometry library

**Phase 4: Specialized Systems (Build Fourth)**
11. ✅ **GraphTemplate System** - Graph-based structures (wheels, ribs, skeletons)
12. ✅ **Architecture Operator Algorithms** - FrameWall, FloorJoist, RoofTruss, MEP Router
13. ✅ **Constraint Bundles** - "CAD but alive" constraint layer
14. ✅ **Cross-Section Generator Refinements** - Step A-E refinements, bow collapse, deck surface

**Phase 5: Authoring & Calibration (Build Last)**
15. ✅ **Library, Presets, and Authoring UX** (Step 6) - Template library + preset system
16. ✅ **ReferencePack Calibration Workflow** - First-fit automation + calibration UI

### **Dependency Graph**

```
ReferencePack (Step 1)
    ↓
Curve-First Generator (Step 2) ──→ 3D Editor Infrastructure
    ↓                                    ↓
Feature Node System (Step 3) ───────────┘
    ↓
ParamFields System ──→ Field Evaluation ──→ Cross-Section Generator
    ↓                        ↓                        ↓
Curve1D Solver ──────────────┴────────────────────────┘
    ↓
Polygon & 2D Geometry Algorithms
    ↓
Metrics + Fitting Loop (Step 4)
    ↓
Compiler + Runtime Outputs (Step 5)
    ↓
GraphTemplate System
    ↓
Architecture Operator Algorithms
    ↓
Constraint Bundles
    ↓
Library, Presets, Authoring UX (Step 6)
    ↓
ReferencePack Calibration Workflow
```

### **Critical Implementation Notes for AI**

**1. Start with ReferencePack (Step 1)**
- This enables ortho image fitting (the "LLM accelerator")
- Without it, you can't fit models to reference images
- Build the calibration UI and Three.js overlay system first

**2. Curve-First Generator (Step 2) is Core**
- Primary curves: B(x) = half-beam, K(x) = keel/rocker, D(x) = deck/sheer
- These drive everything else - build this before feature nodes
- Output: Base mesh from curves

**3. Feature Nodes (Step 3) Extend the System**
- Feature node contract: Target region, placement, mask field, operation, params, handles
- 5 core types: patch, recess, crease, warp, boss/hole
- Build AFTER curve-first generator (features modify the base)

**4. ParamFields Replace Sliders**
- Instead of "100 sliders", use 6-12 knots per curve
- Curve1D Solver provides constraint enforcement
- This is the "secret weapon" for user experience

**5. All Formulas and Algorithms Are Complete**
- Every system map includes full TypeScript pseudocode
- All formulas are extracted from modelmaker.txt
- Implementation-ready (not conceptual)

**6. Build Deterministically**
- Same inputs → identical geometry (critical invariant)
- All operations are ordered and re-runnable
- No randomness, no drift

### **What NOT to Build**

❌ **Do NOT build an image editor** - This is a 3D parametric asset engine
❌ **Do NOT build 2D canvas tools** - This is for 3D parametric modeling
❌ **Do NOT build segmentation tools** - This is for parametric geometry generation

### **What TO Build**

✅ **3D parametric modeling system** - Curve-based editing of 3D assets
✅ **Ortho reference fitting** - Fit models to reference images
✅ **SVG diagram editors** - Top/Side/Section views for curve editing
✅ **Feature node system** - Extensible feature graph
✅ **Game-ready outputs** - LOD meshes, colliders, hardpoints

### **Quick Reference: System Locations in This Document**

- **ReferencePack System:** Section starts at line ~85
- **Curve-First Generator:** Search for "CURVE-FIRST GENERATOR"
- **Feature Node System:** Search for "FEATURE NODE SYSTEM"
- **ParamFields System:** Search for "PARAMFIELDS SYSTEM"
- **Field Evaluation:** Search for "FIELD EVALUATION"
- **All Algorithms:** Each system map includes complete TypeScript pseudocode

### **Implementation Checklist for AI**

- [ ] Read this executive summary completely
- [ ] Understand the vision: Universal Parametric Asset Engine
- [ ] Follow build order: ReferencePack → Curve-First → Feature Nodes → etc.
- [ ] Implement deterministically (same inputs → identical outputs)
- [ ] Use provided TypeScript pseudocode as implementation guide
- [ ] Build 3D parametric modeling system, NOT image editor
- [ ] Include SVG diagram editors for curve editing
- [ ] Output game-ready LOD/colliders/hardpoints

**[END:TAG:AI_INSTRUCTIONS]**

---

## ⚠️ IMPORTANT: AUTO-GENERATED FILE

**This file is AUTO-GENERATED from source files.**

**DO NOT EDIT THIS FILE DIRECTLY**

**To make changes:**
1. Edit the source file (e.g., `MASTER_GRAPH_TEMPLATE_SYSTEM_MAP.md`)
2. Run build script: `python scripts/build_modelmaker_monolith.py`
3. Monolith will be regenerated with your changes

**Source Files:**
1. `MASTER_REFERENCE_PACK_SYSTEM_MAP.md`
2. `MASTER_CURVE_FIRST_GENERATOR_SYSTEM_MAP.md`
3. `MASTER_FEATURE_NODE_SYSTEM_MAP.md`
4. `MASTER_METRICS_FITTING_LOOP_SYSTEM_MAP.md`
5. `MASTER_COMPILER_RUNTIME_OUTPUTS_SYSTEM_MAP.md`
6. `MASTER_LIBRARY_PRESETS_AUTHORING_SYSTEM_MAP.md`
7. `MASTER_REFERENCE_PACK_CALIBRATION_WORKFLOW_SYSTEM_MAP.md`
8. `MASTER_GRAPH_TEMPLATE_SYSTEM_MAP.md`
9. `MASTER_ARCHITECTURE_OPERATOR_ALGORITHMS_SYSTEM_MAP.md`
10. `MASTER_CONSTRAINT_BUNDLES_SYSTEM_MAP.md`
11. `MASTER_PARAMFIELDS_SYSTEM_MAP.md`
12. `MASTER_FIELD_EVALUATION_CROSS_SECTION_GENERATOR_SYSTEM_MAP.md`
13. `MASTER_POLYGON_2D_GEOMETRY_ALGORITHMS_SYSTEM_MAP.md`
14. `MASTER_CROSS_SECTION_GENERATOR_REFINEMENTS_SYSTEM_MAP.md`
15. `MASTER_CURVE1D_SOLVER_SYSTEM_MAP.md`
16. `MASTER_3D_EDITOR_SYSTEM_MAP.md`
17. `MASTER_VIEWPORT_3D_SYSTEM_MAP.md`
18. `MASTER_3D_SCENE_OBJECT_SYSTEM_MAP.md`
19. `MASTER_3D_TOOL_SYSTEM_MAP.md`

---

## 📋 TABLE OF CONTENTS

**[TAG:NAV:INDEX]**

### **Core Modelmaker Systems (Steps 1-6)**
- [MASTER REFERENCE PACK SYSTEM MAP](#reference-pack-system-map)
- [MASTER CURVE-FIRST GENERATOR SYSTEM MAP](#curve-first-generator-system-map)
- [MASTER FEATURE NODE SYSTEM MAP](#feature-node-system-map)
- [MASTER METRICS + FITTING LOOP SYSTEM MAP](#metrics-fitting-loop-system-map)
- [MASTER COMPILER + RUNTIME OUTPUTS SYSTEM MAP](#compiler-runtime-outputs-system-map)
- [MASTER LIBRARY, PRESETS, AND AUTHORING UX SYSTEM MAP](#library-presets-authoring-system-map)
- [MASTER REFERENCE PACK CALIBRATION WORKFLOW SYSTEM MAP](#reference-pack-calibration-workflow-system-map)

### **Advanced Modelmaker Systems**
- [MASTER GRAPH TEMPLATE SYSTEM MAP](#graph-template-system-map)
- [MASTER ARCHITECTURE OPERATOR ALGORITHMS SYSTEM MAP](#architecture-operator-algorithms-system-map)
- [MASTER CONSTRAINT BUNDLES SYSTEM MAP](#constraint-bundles-system-map)
- [MASTER PARAMFIELDS SYSTEM MAP](#paramfields-system-map)
- [MASTER FIELD EVALUATION & CROSS-SECTION GENERATOR SYSTEM MAP](#field-evaluation-cross-section-generator-system-map)
- [MASTER POLYGON & 2D GEOMETRY ALGORITHMS SYSTEM MAP](#polygon-2d-geometry-algorithms-system-map)
- [MASTER CROSS-SECTION GENERATOR REFINEMENTS SYSTEM MAP](#cross-section-generator-refinements-system-map)

### **3D Editor Infrastructure**
- [MASTER CURVE1D SOLVER SYSTEM MAP](#curve1d-solver-system-map)
- [MASTER 3D EDITOR SYSTEM MAP](#3d-editor-system-map)
- [MASTER VIEWPORT 3D SYSTEM MAP](#viewport-3d-system-map)
- [MASTER 3D SCENE OBJECT SYSTEM MAP](#3d-scene-object-system-map)
- [MASTER 3D TOOL SYSTEM MAP](#3d-tool-system-map)

**[END:TAG:NAV:INDEX]**

---


---

<!-- AUTO-GENERATED FROM: MASTER_REFERENCE_PACK_SYSTEM_MAP.md -->
<!-- DO NOT EDIT THIS SECTION DIRECTLY -->
<!-- Source File: MASTER_REFERENCE_PACK_SYSTEM_MAP.md -->
<!-- File Size: 28999 bytes -->

<a id='reference-pack-system-map'></a>

# MASTER REFERENCE PACK SYSTEM MAP
**Complete System Anatomy Mapping - ReferencePack + Ortho Overlay System (Step 1)**

**Date:** 2025-01-27  
**Version:** 1.0.0  
**Purpose:** Complete S.A.M. documentation for ReferencePack System (modelmaker.txt Step 1)  
**Status:** PHASE 1 - Foundation System Mapping  
**System:** Lucid Image Editor - Universal Parametric Asset Engine  
**Reference:** modelmaker.txt Step 1 (Lines 247-572)

---

## 📋 TABLE OF CONTENTS

1. [System Overview](#1-system-overview)
2. [Goal and Invariants](#2-goal-and-invariants)
3. [Universal Data Format: ReferencePack](#3-universal-data-format-referencepack)
4. [View Conventions](#4-view-conventions)
5. [Calibration: Pixel to Meter Conversion](#5-calibration-pixel-to-meter-conversion)
6. [Alignment: Rotation from Centerline](#6-alignment-rotation-from-centerline)
7. [Three.js Implementation Pattern](#7-threejs-implementation-pattern)
8. [Concrete Code Skeleton](#8-concrete-code-skeleton)
9. [Axis Mapping: Plane Local to World](#9-axis-mapping-plane-local-to-world)
10. [Calibration UI Workflow](#10-calibration-ui-workflow)
11. [Ortho Camera Setup](#11-ortho-camera-setup)
12. [Integration Points](#12-integration-points)
13. [Performance Characteristics](#13-performance-characteristics)
14. [File Dependency Graph](#14-file-dependency-graph)
15. [Type Flow Map](#15-type-flow-map)
16. [State Management](#16-state-management)
17. [Relationship Matrix](#17-relationship-matrix)

---

## 1. SYSTEM OVERVIEW

**[TAG:OVERVIEW] [TAG:REFERENCE_PACK]**

### **What is the ReferencePack System?**

The ReferencePack system is a universal subsystem for loading, calibrating, and aligning orthographic reference images as CAD-like underlays. It provides a complete solution for working with ortho plan sets (top, side, front, rear views) with precise meter-scale calibration and alignment.

**Location:** Architecture defined in modelmaker.txt Step 1  
**Purpose:** Universal ortho overlay system for parametric asset creation  
**Core Principle:** 1 unit = 1 meter, orthographic cameras, deterministic alignment

### **Key Responsibilities**

1. **Reference Image Loading**: Load orthographic reference images (top, side, front, rear)
2. **Meter-Scale Calibration**: Convert pixel coordinates to world meters using scale bars
3. **Alignment System**: Align images using centerline + anchor points
4. **Orthographic Camera Setup**: Configure cameras matching reference image scales
5. **Deterministic Storage**: Save calibration data for reproducibility

### **Core Principles**

- **1 unit = 1 meter**: World space is in meters, images are calibrated to meters
- **Orthographic cameras**: No perspective distortion
- **Deterministic**: Same calibration data → same alignment
- **Universal**: Works for boats, cars, helicopters, buildings

### **Goal Statement**

**You want the reference images to behave like CAD underlays:**

1. 1 unit = 1 meter (world space)
2. Orthographic cameras (no perspective)
3. Each view image is placed on a plane whose size in meters is correct using the 1m scale bar
4. Each view is aligned by centerline + two anchor points (e.g., bow tip + transom, or front bumper + rear bumper)
5. The system is deterministic and saved as data (so you can reopen and continue tuning later)

**Once this is done, everything else (curve extraction, silhouette error, auto-fitting) becomes straightforward.**

**[END:TAG:OVERVIEW]**

---

## 2. GOAL AND INVARIANTS

**[TAG:GOALS] [TAG:REFERENCE_PACK]**

### **Core Invariants**

1. **1 unit = 1 meter** (world space)
   - All calculations are in meters
   - Images are calibrated to meters using scale bars
   - No unit conversion needed during geometry generation

2. **Orthographic cameras** (no perspective)
   - Preserves parallel lines
   - No foreshortening
   - Matches technical drawings

3. **Correct plane sizing**
   - Each view image is placed on a plane
   - Plane size in meters matches the calibrated image size
   - Uses the 1m scale bar for calibration

4. **Centerline + anchor alignment**
   - Each view is aligned by centerline (two points defining direction)
   - Two anchor points (A and B) define longitudinal positioning
   - Example: bow tip + transom for boats, front bumper + rear bumper for cars

5. **Deterministic and saved as data**
   - Calibration data is stored in JSON
   - Can reopen and continue tuning later
   - Reproducible alignment

### **What This Enables**

Once Step 1 is built, you can:

- Load any AI-generated ortho plan set
- Align it in meters and lock it
- Extract curves from silhouettes
- Compute silhouette error for auto-fitting
- Fit curves to reference images

**This is the foundation for the entire parametric asset system.**

**[END:TAG:GOALS]**

---

## 3. UNIVERSAL DATA FORMAT: REFERENCEPACK

**[TAG:DATA_FORMAT] [TAG:REFERENCE_PACK]**

### **File Layout**

Store everything needed to align without guessing.

**Directory Structure**:
```
reference_packs/
  laser_01/
    top.png
    side.png
    front.png
    rear.png
    pack.json
```

### **pack.json Schema**

**Complete Schema (minimal but complete)**:

```json
{
  "id": "laser_01",
  "units": "meter",
  "notes": "Nano Banana ortho set, trust scale bars not text labels.",
  "views": {
    "top": {
      "image": "top.png",
      "axis": "TOP",
      "cal": {
        "pxPerMeter": 512,
        "originPx": [1024, 768],
        "centerlinePx": [[100, 768], [1948, 768]],
        "anchorA_Px": [1900, 770],
        "anchorB_Px": [120, 770]
      },
      "crop": null,
      "opacity": 0.55
    },
    "side": {
      "image": "side.png",
      "axis": "SIDE",
      "cal": {
        "pxPerMeter": 498,
        "originPx": [980, 650],
        "centerlinePx": [[90, 650], [1960, 650]],
        "anchorA_Px": [1920, 640],
        "anchorB_Px": [110, 640]
      },
      "crop": null,
      "opacity": 0.55
    },
    "front": {
      "image": "front.png",
      "axis": "FRONT",
      "cal": {
        "pxPerMeter": 520,
        "originPx": [1024, 700],
        "centerlinePx": [[1024, 50], [1024, 1350]],
        "anchorA_Px": [1024, 120],
        "anchorB_Px": [1024, 1320]
      },
      "crop": null,
      "opacity": 0.55
    },
    "rear": {
      "image": "rear.png",
      "axis": "REAR",
      "cal": {
        "pxPerMeter": 520,
        "originPx": [1024, 700],
        "centerlinePx": [[1024, 50], [1024, 1350]],
        "anchorA_Px": [1024, 120],
        "anchorB_Px": [1024, 1320]
      },
      "crop": null,
      "opacity": 0.55
    }
  }
}
```

### **Field Meanings (No Ambiguity)**

**pxPerMeter**:
- Measured from the 1m bar in that view
- Unit: pixels per meter
- Example: If a 1m scale bar is 512 pixels long, pxPerMeter = 512

**originPx**:
- Pixel coordinate that maps to world origin in that view
- Usually center of hull at some datum
- Format: [x, y] in pixel coordinates (image space)

**centerlinePx**:
- Two pixel points defining the centerline direction
- Used to compute rotation
- Format: [[x0, y0], [x1, y1]]
- For TOP and SIDE views, should be horizontal (or will be rotated to horizontal)

**anchorA_Px, anchorB_Px**:
- Two pixels on the centerline that define longitudinal positioning
- Example: bow/stern, front/rear
- Format: [x, y] in pixel coordinates
- Used for alignment and scaling

**opacity**:
- How strong the underlay is in the viewport
- Range: 0.0 (transparent) to 1.0 (opaque)
- Typical: 0.55 for good visibility without obscuring geometry

**crop**:
- Optional crop rectangle (null if not cropped)
- Format: { x: number, y: number, width: number, height: number }

**Critical Rule**: We never trust AI-printed dimensions. Only pxPerMeter from the bar + your anchors.

**[END:TAG:DATA_FORMAT]**

---

## 4. VIEW CONVENTIONS

**[TAG:VIEW_CONVENTIONS] [TAG:REFERENCE_PACK]**

### **Standardized View Plane Mappings**

You must standardize how each "view plane" maps into world meters.

**Asset Frame Convention**:
- X = forward (length)
- Y = up (height)
- Z = right (beam)

### **View Mappings**

Each view has a fixed mapping from image coordinates to world coordinates:

#### **TOP View Plane**

**Image to World Mapping**:
- image +X → world +X
- image +Y → world -Z (because image y increases downward)
- plane sits at some constant Y (above object)

**World Position**:
- X: from image u coordinate
- Z: from image v coordinate (negated)
- Y: constant (e.g., Y_max + margin)

#### **SIDE View Plane (Port/Starboard)**

**Image to World Mapping**:
- image +X → world +X
- image +Y → world -Y
- plane sits at some constant Z (beside object)

**World Position**:
- X: from image u coordinate
- Y: from image v coordinate (negated)
- Z: constant (e.g., -(Z_max + margin))

#### **FRONT View Plane**

**Image to World Mapping**:
- image +X → world +Z
- image +Y → world -Y
- plane sits at some constant X (in front of object)

**World Position**:
- Z: from image u coordinate
- Y: from image v coordinate (negated)
- X: constant (e.g., X_max + margin)

#### **REAR View Plane**

**Image to World Mapping**:
- image +X → world -Z (mirrored to face camera cleanly)
- image +Y → world -Y
- plane sits at some constant X (behind object)

**World Position**:
- Z: from image u coordinate (negated)
- Y: from image v coordinate (negated)
- X: constant (e.g., -(X_max + margin))

### **Summary**

**This mapping is the backbone. Everything else is just scale + translation + rotation.**

The same pack schema works for boats, cars, helicopters, buildings because the axis mappings are standardized.

**[END:TAG:VIEW_CONVENTIONS]**

---

## 5. CALIBRATION: PIXEL TO METER CONVERSION

**[TAG:CALIBRATION] [TAG:REFERENCE_PACK]**

### **Pixel to Meter Conversion**

Given an image of size (Wpx, Hpx) and pxPerMeter:

**Meters per Pixel**:
```
metersPerPx = 1 / pxPerMeter
```

**Plane Size in Meters**:
```
Wm = Wpx * metersPerPx
Hm = Hpx * metersPerPx
```

### **Pixel-to-Plane Coordinates (Meters)**

With origin at originPx = (ox, oy):

**Local Plane Coordinates**:
```
u = (px - ox) * metersPerPx
v = (py - oy) * metersPerPx
```

**Note**: Here v is "down is positive" in image coordinates; we'll flip when mapping to world.

**Complete Formula**:
```
u = (px[0] - originPx[0]) * (1 / pxPerMeter)
v = (px[1] - originPx[1]) * (1 / pxPerMeter)
```

### **Implementation Function**

```typescript
function pxToMeters(px: Px, cal: ViewCal): { u: number; v: number } {
  const mpp = 1 / cal.pxPerMeter;
  const u = (px[0] - cal.originPx[0]) * mpp;
  const v = (px[1] - cal.originPx[1]) * mpp;
  return { u, v };
}
```

**[END:TAG:CALIBRATION]**

---

## 6. ALIGNMENT: ROTATION FROM CENTERLINE

**[TAG:ALIGNMENT] [TAG:REFERENCE_PACK]**

### **Centerline Angle Computation**

From centerlinePx = [p0, p1]:

**Direction Vector**:
```
dirPx = normalize(p1 - p0)
```

**Angle in Image Space**:
```
θ = atan2(dirPx.y, dirPx.x)
```

### **Rotation to Horizontal**

For TOP and SIDE views, the desired direction is "perfect horizontal" along +X.

**Rotate the plane** (or equivalently rotate the texture UV transform) by -θ.

**Rotation Formula**:
```
rotZ = -θ
```

This makes the centerline horizontal (along +X direction).

### **Translation for Anchor Alignment**

After rotation, translate so that:

- anchorA_Px maps to your chosen world anchor (e.g., bow tip at x = +L/2)
- anchorB_Px maps to the stern plane (x = -L/2)

**Translation Calculation**:
```
// Convert anchor pixels to local plane coordinates (after rotation)
anchorA_local = rotate(pxToMeters(anchorA_Px, cal), -θ)
anchorB_local = rotate(pxToMeters(anchorB_Px, cal), -θ)

// Compute translation to align anchors
// (Implementation depends on target world positions)
```

**Note**: If you don't know world L yet, you can simply align anchors to your current model bow/stern points (interactive), and later the fit system will tune L.

### **Implementation Function**

```typescript
function centerlineAngle(cal: ViewCal): number {
  const [a, b] = cal.centerlinePx;
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  return Math.atan2(dy, dx); // image-space angle
}
```

**[END:TAG:ALIGNMENT]**

---

## 7. THREE.JS IMPLEMENTATION PATTERN

**[TAG:THREEJS] [TAG:REFERENCE_PACK]**

### **ReferencePlane Object per View**

Each view is a "ReferencePlane" object:

**Components**:
1. A plane mesh with the image texture
2. A fixed orthographic camera matched to that view
3. User controls: opacity, show/hide, nudge, lock

### **Plane Placement**

You can place each plane at a constant offset so it never intersects geometry:

**Placement Strategy**:
- **TOP plane** at Y = +Y_max + margin
- **SIDE plane** at Z = -(Z_max + margin) (or +)
- **FRONT plane** at X = +X_max + margin
- **REAR plane** at X = -(X_max + margin)

**The plane should always face the camera.**

### **Plane Geometry Setup**

**Plane Size**:
```
planeWidth = Wm  (meters, from image width)
planeHeight = Hm (meters, from image height)
```

**Plane Mesh**:
```typescript
const planeGeometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
const planeMaterial = new THREE.MeshBasicMaterial({
  map: texture,
  transparent: true,
  opacity: viewDef.opacity,
  side: THREE.DoubleSide
});
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
```

**Texture Loading**:
```typescript
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load(viewDef.imageUrl);
texture.flipY = false; // Important: prevent texture flipping
```

### **Camera Positioning**

Position camera to look at the plane:

**TOP View**:
```typescript
camera.position.set(0, Y_max + margin + 1, 0);
camera.lookAt(0, Y_max + margin, 0);
camera.up.set(0, 0, -1); // Adjust for correct orientation
```

**SIDE View**:
```typescript
camera.position.set(0, 0, -(Z_max + margin + 1));
camera.lookAt(0, 0, -(Z_max + margin));
```

**FRONT View**:
```typescript
camera.position.set(X_max + margin + 1, 0, 0);
camera.lookAt(X_max + margin, 0, 0);
```

**REAR View**:
```typescript
camera.position.set(-(X_max + margin + 1), 0, 0);
camera.lookAt(-(X_max + margin), 0, 0);
```

**[END:TAG:THREEJS]**

---

## 8. CONCRETE CODE SKELETON

**[TAG:CODE] [TAG:REFERENCE_PACK]**

### **Core Transform Logic**

This is the core transform logic you'll reuse everywhere.

### **Type Definitions**

```typescript
type Px = [number, number];
type ViewAxis = "TOP" | "SIDE" | "FRONT" | "REAR";

interface ViewCal {
  pxPerMeter: number;
  originPx: Px;
  centerlinePx: [Px, Px];
  anchorA_Px: Px;
  anchorB_Px: Px;
}

interface ViewDef {
  imageUrl: string;
  axis: ViewAxis;
  cal: ViewCal;
  opacity: number;
  crop?: { x: number; y: number; width: number; height: number };
}
```

### **Pixel to Meters Conversion**

```typescript
function pxToMeters(px: Px, cal: ViewCal): { u: number; v: number } {
  const mpp = 1 / cal.pxPerMeter;
  const u = (px[0] - cal.originPx[0]) * mpp;
  const v = (px[1] - cal.originPx[1]) * mpp;
  return { u, v };
}
```

### **Centerline Angle Computation**

```typescript
function centerlineAngle(cal: ViewCal): number {
  const [a, b] = cal.centerlinePx;
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  return Math.atan2(dy, dx); // image-space angle
}
```

### **Reference Plane Transform Builder**

```typescript
/**
 * Returns a local-plane transform that:
 * 1) scales plane to meters
 * 2) rotates to make centerline horizontal
 * 3) positions so that originPx is at world origin (you can add extra offsets per view)
 */
function buildReferencePlaneTransform(view: ViewDef) {
  const theta = centerlineAngle(view.cal);

  // rotate by -theta so centerline becomes horizontal
  const rotZ = -theta;

  // originPx maps to local plane origin by construction, so translation is zero here.
  // We'll set final world translation by placing the plane at a fixed offset (per view).
  return { rotZ };
}
```

**Note**: This is intentionally minimal. The final world orientation depends on axis mapping (next section).

### **Complete ReferencePack Interface**

```typescript
interface ReferencePack {
  id: string;
  units: "meter";
  notes?: string;
  views: {
    top?: ViewDef;
    side?: ViewDef;
    front?: ViewDef;
    rear?: ViewDef;
  };
}

function loadReferencePack(packPath: string): ReferencePack {
  // Load pack.json
  const packData = JSON.parse(fs.readFileSync(packPath + "/pack.json", "utf-8"));
  return packData;
}
```

**[END:TAG:CODE]**

---

## 9. AXIS MAPPING: PLANE LOCAL TO WORLD

**[TAG:AXIS_MAPPING] [TAG:REFERENCE_PACK]**

### **Plane Local Coordinates**

After building a plane where:
- local +u is "right"
- local +v is "down" (image convention)

You map into world per view:

### **TOP View Mapping**

**Local to World**:
```
worldX = +u
worldZ = -v  (flip because image v is down, world Z is right)
worldY = constant
```

**Implementation**:
```typescript
function localToWorld_TOP(u: number, v: number, yPos: number): [number, number, number] {
  return [u, yPos, -v];
}
```

### **SIDE View Mapping**

**Local to World**:
```
worldX = +u
worldY = -v  (flip because image v is down, world Y is up)
worldZ = constant
```

**Implementation**:
```typescript
function localToWorld_SIDE(u: number, v: number, zPos: number): [number, number, number] {
  return [u, -v, zPos];
}
```

### **FRONT View Mapping**

**Local to World**:
```
worldZ = +u
worldY = -v  (flip because image v is down, world Y is up)
worldX = constant
```

**Implementation**:
```typescript
function localToWorld_FRONT(u: number, v: number, xPos: number): [number, number, number] {
  return [xPos, -v, u];
}
```

### **REAR View Mapping**

**Local to World**:
```
worldZ = -u  (mirror to face camera cleanly)
worldY = -v  (flip because image v is down, world Y is up)
worldX = constant
```

**Implementation**:
```typescript
function localToWorld_REAR(u: number, v: number, xPos: number): [number, number, number] {
  return [xPos, -v, -u];  // Note: -u for mirroring
}
```

### **Universal Mapping Function**

```typescript
function localToWorld(
  axis: ViewAxis,
  u: number,
  v: number,
  constantPos: number
): [number, number, number] {
  switch (axis) {
    case "TOP":
      return [u, constantPos, -v];
    case "SIDE":
      return [u, -v, constantPos];
    case "FRONT":
      return [constantPos, -v, u];
    case "REAR":
      return [constantPos, -v, -u];
  }
}
```

**This mapping is what makes the same pack schema work for boats and cars.**

**[END:TAG:AXIS_MAPPING]**

---

## 10. CALIBRATION UI WORKFLOW

**[TAG:CALIBRATION_UI] [TAG:REFERENCE_PACK]**

### **Calibration Tool Design**

Don't over-engineer detection. Make it a tight tool.

### **For Each View Image, User Clicks:**

1. **Scale bar endpoints (1m)**
   - Click two points on the 1m scale bar
   - System computes: pxPerMeter = distance(p1, p2) / 1.0

2. **Centerline endpoints**
   - Click two points defining the centerline
   - System stores: centerlinePx = [p0, p1]

3. **AnchorA and AnchorB on the centerline (front/back)**
   - Click two points on the centerline
   - Example: bow tip and transom for boats
   - System stores: anchorA_Px, anchorB_Px

4. **Origin (optional)**
   - Default = centerline midpoint at mid-length
   - Or click to set custom origin
   - System stores: originPx

### **Calibration Computation**

**After user clicks scale bar**:
```typescript
function computePxPerMeter(p1: Px, p2: Px, meters: number = 1.0): number {
  const dx = p2[0] - p1[0];
  const dy = p2[1] - p1[1];
  const pixels = Math.sqrt(dx * dx + dy * dy);
  return pixels / meters;
}
```

**After user clicks centerline**:
```typescript
// Already have centerlinePx = [p0, p1]
// Can compute angle immediately
const angle = centerlineAngle({ centerlinePx: [p0, p1] });
```

**After user clicks anchors**:
```typescript
// Store anchorA_Px and anchorB_Px
// Will be used for alignment
```

**After user clicks origin (or defaults)**:
```typescript
// If default: compute centerline midpoint
function defaultOrigin(centerlinePx: [Px, Px]): Px {
  const [p0, p1] = centerlinePx;
  return [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2];
}
```

### **Save Calibration Data**

**Then compute and store pack.json**:
```typescript
function saveCalibration(
  packId: string,
  views: Record<string, {
    image: string;
    axis: ViewAxis;
    pxPerMeter: number;
    originPx: Px;
    centerlinePx: [Px, Px];
    anchorA_Px: Px;
    anchorB_Px: Px;
    opacity: number;
  }>
): void {
  const pack: ReferencePack = {
    id: packId,
    units: "meter",
    views: {}
  };
  
  for (const [viewName, viewData] of Object.entries(views)) {
    pack.views[viewName] = {
      image: viewData.image,
      axis: viewData.axis,
      cal: {
        pxPerMeter: viewData.pxPerMeter,
        originPx: viewData.originPx,
        centerlinePx: viewData.centerlinePx,
        anchorA_Px: viewData.anchorA_Px,
        anchorB_Px: viewData.anchorB_Px
      },
      opacity: viewData.opacity
    };
  }
  
  // Write to pack.json
  fs.writeFileSync(
    `reference_packs/${packId}/pack.json`,
    JSON.stringify(pack, null, 2)
  );
}
```

**This gives you perfect reproducibility.**

**[END:TAG:CALIBRATION_UI]**

---

## 11. ORTHO CAMERA SETUP

**[TAG:ORTHO_CAMERA] [TAG:REFERENCE_PACK]**

### **Camera Configuration Rule**

Each view camera must be orthographic and match the plane's meters.

**Rule**: Set camera frustum so that the visible width/height in world meters matches your plane coverage.

### **Camera Setup Example**

**If TOP plane is Wm × Hm meters, set**:
```typescript
const camera = new THREE.OrthographicCamera(
  -Wm / 2,   // left
  +Wm / 2,   // right
  +Hm / 2,   // top
  -Hm / 2    // bottom
);
```

### **Camera Positioning**

**Then position the camera above, looking down**:
```typescript
camera.position.set(0, Y_plane + 1, 0);
camera.lookAt(0, Y_plane, 0);
camera.up.set(0, 0, -1); // Adjust for correct up vector
```

### **Camera for Each View**

**TOP View Camera**:
```typescript
const camera = new THREE.OrthographicCamera(-Wm/2, +Wm/2, +Hm/2, -Hm/2);
camera.position.set(0, Y_plane + 1, 0);
camera.lookAt(0, Y_plane, 0);
camera.up.set(0, 0, -1);
```

**SIDE View Camera**:
```typescript
const camera = new THREE.OrthographicCamera(-Wm/2, +Wm/2, +Hm/2, -Hm/2);
camera.position.set(0, 0, Z_plane - 1);
camera.lookAt(0, 0, Z_plane);
```

**FRONT View Camera**:
```typescript
const camera = new THREE.OrthographicCamera(-Wm/2, +Wm/2, +Hm/2, -Hm/2);
camera.position.set(X_plane + 1, 0, 0);
camera.lookAt(X_plane, 0, 0);
```

**REAR View Camera**:
```typescript
const camera = new THREE.OrthographicCamera(-Wm/2, +Wm/2, +Hm/2, -Hm/2);
camera.position.set(X_plane - 1, 0, 0);
camera.lookAt(X_plane, 0, 0);
```

### **Near/Far Planes**

Set appropriate near/far planes:
```typescript
camera.near = 0.1;
camera.far = 1000.0;  // Adjust based on scene size
```

**[END:TAG:ORTHO_CAMERA]**

---

## 12. INTEGRATION POINTS

**[TAG:INTEGRATION] [TAG:REFERENCE_PACK]**

### **Integration with Curve-First Generator (Step 2)**

**Fitting Flow**:
```
ReferencePack (Step 1)
  → Extract silhouettes from ortho images
  → Fit B(u), K(u), D(u) curves to silhouettes
  → Generate base mesh (Step 2)
```

### **Integration with Fitting Loop (Step 4)**

**Auto-Fitting**:
```
ReferencePack
  → Render model in orthographic views
  → Extract silhouettes + keypoints
  → Compare against reference images
  → Compute error metrics
  → Adjust curves to minimize error
```

### **Integration with SVG Diagram Editor**

**SVG Overlay**:
- Reference images appear as SVG backgrounds
- User edits curves overlaid on references
- Real-time alignment feedback

**[END:TAG:INTEGRATION]**

---

## 13. PERFORMANCE CHARACTERISTICS

**[TAG:PERFORMANCE] [TAG:REFERENCE_PACK]**

### **Texture Loading Performance**

**Image Sizes**:
- Typical: 1024×768 to 4096×3072 pixels
- Memory: ~4-16 MB per image (uncompressed)
- Four views: ~16-64 MB total

**Optimization**:
- Use compressed textures (JPEG, WebP)
- Load on demand (lazy loading)
- Unload when not visible

### **Rendering Performance**

**Plane Meshes**:
- Four planes: minimal geometry (2 triangles each)
- Texture sampling: standard GPU operation
- Opacity blending: standard alpha blending

**Performance Impact**: Negligible for modern GPUs.

**[END:TAG:PERFORMANCE]**

---

## 14. FILE DEPENDENCY GRAPH

**[TAG:DEPS] [TAG:REFERENCE_PACK]**

```
ReferencePack System
  │
  ├─→ modelmaker.txt (Step 1 specification)
  │   └─→ Lines 247-572: Complete specification
  │
  ├─→ ReferencePack JSON Schema
  │   ├─→ pack.json format
  │   └─→ View calibration data
  │
  ├─→ Three.js Implementation
  │   ├─→ PlaneGeometry
  │   ├─→ TextureLoader
  │   ├─→ OrthographicCamera
  │   └─→ MeshBasicMaterial
  │
  ├─→ Calibration UI
  │   ├─→ Scale bar measurement
  │   ├─→ Centerline selection
  │   └─→ Anchor point selection
  │
  └─→ Transform System
      ├─→ Pixel-to-meter conversion
      ├─→ Centerline rotation
      └─→ Axis mapping
```

**[END:TAG:DEPS]**

---

## 15. TYPE FLOW MAP

**[TAG:TYPE_FLOW] [TAG:REFERENCE_PACK]**

### **Type Flow**

```
ReferencePack JSON (Input)
  ↓
ViewDef Objects
  ↓
ViewCal Data Extraction
  ↓
Pixel-to-Meter Conversion
  ↓
Plane Transform Computation
  ↓
Three.js Plane Mesh
  ↓
Orthographic Camera
  ↓
Rendered Reference Overlay
```

### **Calibration Flow**

```
User Clicks (UI)
  ↓
Pixel Coordinates
  ↓
Calibration Computation
  ↓
ViewCal Objects
  ↓
pack.json (Saved)
  ↓
ReferencePack (Loaded)
```

**[END:TAG:TYPE_FLOW]**

---

## 16. STATE MANAGEMENT

**[TAG:STATE_MGMT] [TAG:REFERENCE_PACK]**

### **ReferencePack State**

```typescript
interface ReferencePackState {
  pack: ReferencePack | null;
  views: Map<ViewAxis, {
    mesh: THREE.Mesh;
    camera: THREE.OrthographicCamera;
    texture: THREE.Texture;
    visible: boolean;
    opacity: number;
  }>;
  loaded: boolean;
}
```

### **Calibration State**

```typescript
interface CalibrationState {
  currentView: ViewAxis | null;
  scaleBarPoints: [Px, Px] | null;
  centerlinePoints: [Px, Px] | null;
  anchorPoints: [Px, Px] | null;
  originPoint: Px | null;
  computed: ViewCal | null;
}
```

**[END:TAG:STATE_MGMT]**

---

## 17. RELATIONSHIP MATRIX

**[TAG:RELATIONS] [TAG:REFERENCE_PACK]**

### **System Relationships**

| System | Relationship | Data Flow |
|--------|-------------|-----------|
| Curve-First Generator | Fits curves | Reference images → B(u), K(u), D(u) curves |
| Fitting Loop | Auto-fitting | Reference images → Error metrics → Curve adjustments |
| SVG Editor | Overlay display | Reference images → SVG backgrounds |
| Three.js Scene | Rendering | ReferencePack → Plane meshes → Scene |

### **Formula Relationships**

| Formula | Inputs | Output | Used By |
|---------|--------|--------|---------|
| metersPerPx = 1 / pxPerMeter | pxPerMeter | metersPerPx | Pixel-to-meter conversion |
| u = (px - ox) * mpp | px, originPx, mpp | u coordinate | Local plane coordinates |
| θ = atan2(dy, dx) | centerlinePx | Rotation angle | Alignment |
| rotZ = -θ | θ | Rotation | Plane transform |
| worldX = f(u, v, axis) | u, v, axis | worldX | Axis mapping |
| Wm = Wpx * mpp | Image width, mpp | Plane width | Camera setup |

**[END:TAG:RELATIONS]**

---

## 📝 WHAT YOU GET IMMEDIATELY AFTER STEP 1 IS BUILT

**You can:**

- Load any AI-generated ortho plan set
- Align it in meters and lock it
- Extract curves from silhouettes (next step)
- Compute silhouette error for auto-fitting (Step 4)
- Fit curves to reference images (Step 2 integration)

**This is the foundation for the entire parametric asset system.**

---

**Status:** PHASE 1 - Foundation System Mapping  
**Confidence:** 0.95 (Very High - Complete specification extracted from modelmaker.txt)  
**Next:** Implement ReferencePack system based on this specification



---


---

<!-- AUTO-GENERATED FROM: MASTER_CURVE_FIRST_GENERATOR_SYSTEM_MAP.md -->
<!-- DO NOT EDIT THIS SECTION DIRECTLY -->
<!-- Source File: MASTER_CURVE_FIRST_GENERATOR_SYSTEM_MAP.md -->
<!-- File Size: 28872 bytes -->

<a id='curve-first-generator-system-map'></a>

# MASTER CURVE-FIRST GENERATOR SYSTEM MAP
**Complete System Anatomy Mapping - Curve-First Generator Architecture (Step 2)**

**Date:** 2025-01-27  
**Version:** 1.0.0  
**Purpose:** Complete S.A.M. documentation for Curve-First Generator System (modelmaker.txt Step 2)  
**Status:** PHASE 1 - Foundation System Mapping  
**System:** Lucid Image Editor - Universal Parametric Asset Engine  
**Reference:** modelmaker.txt Step 2 (Lines 587-1306)

---

## 📋 TABLE OF CONTENTS

1. [System Overview](#1-system-overview)
2. [Canonical Parameterization](#2-canonical-parameterization)
3. [Section Law Core Concept](#3-section-law-core-concept)
4. [SectionParams Specification](#4-sectionparams-specification)
5. [Section Law F(s) Implementation](#5-section-law-fs-implementation)
6. [Top View Curve B(u) Specification](#6-top-view-curve-bu-specification)
7. [Mesh Synthesis Algorithm](#7-mesh-synthesis-algorithm)
8. [Deck Surface Specification](#8-deck-surface-specification)
9. [Secondary Modifiers and Envelopes](#9-secondary-modifiers-and-envelopes)
10. [Curve Fairness Algorithm](#10-curve-fairness-algorithm)
11. [TypeScript Type Definitions](#11-typescript-type-definitions)
12. [Generator Algorithm Implementation](#12-generator-algorithm-implementation)
13. [Integration Points](#13-integration-points)
14. [Performance Characteristics](#14-performance-characteristics)
15. [File Dependency Graph](#15-file-dependency-graph)
16. [Type Flow Map](#16-type-flow-map)
17. [State Management](#17-state-management)
18. [Relationship Matrix](#18-relationship-matrix)

---

## 1. SYSTEM OVERVIEW

**[TAG:OVERVIEW] [TAG:CURVE_FIRST_GENERATOR]**

### **What is the Curve-First Generator System?**

The Curve-First Generator is the "universal 'base form' engine" (modelmaker.txt Step 2). Every "main shape" asset (hull, car body, fuselage, fairing) is driven primarily by 3 longitudinal curves — and everything else is derived or layered as features later.

**Location:** Architecture defined in modelmaker.txt Step 2  
**Purpose:** Universal base mesh generator for parametric asset creation  
**Core Principle:** "Truth-from-fields" - Deterministic geometry generation from curves

### **Key Responsibilities**

1. **Three Primary Curves**: B(u), K(u), D(u) - The fundamental drivers
2. **Section Law Computation**: F(s; SectionParams) - Universal section shaping
3. **Mesh Generation**: Parametric surface grid synthesis
4. **Design Coordinate Storage**: (u, s) attributes for feature mask compatibility
5. **Deterministic Rebuild**: Same inputs → identical geometry

### **Core Principles**

- **Three Curves Rule**: B(u) = half-beam, K(u) = keel/underside, D(u) = deck/topside
- **Section Law**: F(s; params) converts lateral coordinate s to height fraction t
- **Deterministic**: Same inputs → identical geometry always
- **Design Coordinates**: Every vertex stores (u, s) for feature mask compatibility
- **Universal**: Same system works for boats, cars, helicopters, buildings

### **Goal Statement**

The goal of Step 2 is simple and absolute:

**Every "main shape" asset (hull, car body, fuselage, fairing) is driven primarily by 3 longitudinal curves — and everything else is derived or layered as features later.**

Once you have this, you can fit to ortho packs, keep the whole thing editable forever, and scale to any object class.

**[END:TAG:OVERVIEW]**

---

## 2. CANONICAL PARAMETERIZATION

**[TAG:PARAMETERIZATION] [TAG:CURVE_FIRST_GENERATOR]**

### **Asset Axis Conventions**

Standard coordinate frame for all assets:

```
World X = forward (length)
World Y = up (height)
World Z = right (beam)
```

This convention is universal and never changes.

### **Normalized Coordinate**

**Definition**: u ∈ [0, 1] is normalized length along the asset.

**Convention**: 
- u = 0 stern (or rear/aft)
- u = 1 bow (or front/nose)
- **Choose once and never change**

**Conversion to Meters**:

```
x(u) = (u - u₀) * L
```

Typically u₀ = 0.5 so:
```
x ∈ [-L/2, +L/2]
```

Where L is the total length in meters.

### **Cross-Section Coordinate**

For a given u, we define a normalized lateral coordinate:

**Actual Half-Beam**:
```
b = B(u)  (meters)
```

**Lateral Position**:
```
z ∈ [-b, +b]
```

**Normalized Lateral Magnitude**:
```
s = clamp(|z| / max(b, ε), 0, 1)
```

Where ε is a small epsilon to prevent division by zero.

**Interpretation**:
- s = 0 is centerline (keel)
- s = 1 is rail / max beam

This normalized coordinate system is stable and LOD-friendly.

**[END:TAG:PARAMETERIZATION]**

---

## 3. SECTION LAW CORE CONCEPT

**[TAG:SECTION_LAW] [TAG:CURVE_FIRST_GENERATOR]**

### **The Core Idea**

The hull surface is basically defined by three curves and a section law function.

**Baselines**:
- **Bottom baseline**: yK = K(u)
- **Top baseline**: yD = D(u)

**Section Fraction**:
```
t = F(s; SectionParams(u))  where t ∈ [0,1]
```

**Surface Height Formula**:

```
y(u,z) = yK(u) + (yD(u) - yK(u)) · t
```

Or in expanded form:

```
y(u,z) = K(u) + (D(u) - K(u)) · F(s; SectionParams(u))
```

### **What F(s) Must Represent**

The entire problem becomes designing F(s) so it can represent:

1. **Deep V hulls vs shallow** - V-depth control
2. **Round bilges vs hard chines** - Bilge radius and chine sharpness
3. **Flare / tumblehome** - Side angle control
4. **Rail rounding** - Top edge softening
5. **Deck lip overhang/sharpness** - Handled as separate deck surface or local top blend

**This is the universal base form.**

### **Section Law Properties**

F(s) must be:

- **Monotonic increasing**: F(s₁) ≤ F(s₂) for s₁ < s₂
- **Smooth (C1 ideally)**: Continuous first derivative
- **Controllable**: Adjustable via SectionParams
- **Composable**: Round → chine → rail can be combined

**[END:TAG:SECTION_LAW]**

---

## 4. SECTIONPARAMS SPECIFICATION

**[TAG:SECTIONPARAMS] [TAG:CURVE_FIRST_GENERATOR]**

### **The Minimum Set**

Instead of 100 random sliders, you store a small bundle that can vary along u (curves again if needed).

**Recommended SectionParams(u)**:

1. **vDepth(u)** : How "V" the bottom is (0 flat → 1 deep V)
2. **deadrise(u)** : V angle / how steep the bottom planes are
3. **bilgeRadius(u)** : Roundness where bottom meets sides (normalized 0..1)
4. **chineSharpness(u)** : 0 = fully round, 1 = hard edge feel
5. **flare(u)** : Sides lean out (flare) vs lean in (tumblehome), range: -1..+1
6. **railRadius(u)** : Rounding at the rail (normalized 0..1)
7. **deckCrown(u)** : Crown height across deck (optional in base)
8. **beamTaperPow(u)** : Controls how quickly beam shrinks near bow/stern (often derived from B shape, but nice as a modifier)

### **Exposure Strategy**

You do NOT expose these as 100 knobs. You expose them as:

- **Either**: Curves along u (if needed for variation)
- **Or**: A few station controls (bow/mid/stern) that interpolate

This keeps the interface clean and intuitive.

### **TypeScript Interface**

```typescript
export interface SectionParams {
  vDepth: number;        // 0..1
  deadrise: number;      // 0..1
  bilgeRadius: number;   // 0..1 (normalized feel)
  chineSharpness: number;// 0..1
  flare: number;         // -1..+1 (tumblehome..flare)
  railRadius: number;    // 0..1
  bodyPow: number;       // 0..1
  deckCrown?: number;    // Optional: crown height
  beamTaperPow?: number; // Optional: beam taper power
}
```

**[END:TAG:SECTIONPARAMS]**

---

## 5. SECTION LAW F(s) IMPLEMENTATION

**[TAG:SECTION_LAW_IMPL] [TAG:CURVE_FIRST_GENERATOR]**

### **Layered Construction**

The section law F(s) is built using a layered construction approach. This allows composable control: round → chine → rail.

### **5.1 Base Rise Curve (Round Body)**

A clean starting point:

```
t₀(s) = s^p
```

Where:
- **p < 1**: Rises quickly (fatter mid)
- **p > 1**: Stays low then rises (sharper sides)

**Parameter Mapping**:
```
p = lerp(0.7, 2.5, bodyPow)
```

So bodyPow ∈ [0, 1] maps to p ∈ [0.7, 2.5].

### **5.2 Add V-Hull Behavior Near Centerline**

A V hull means the surface should rise more steeply near s=0, then soften.

**Define V Component**:
```
tV(s) = 1 - (1 - s)^q
```

This is the complement shape (steeper early).

**Blend with Base**:
```
t₁(s) = lerp(t₀(s), tV(s), vDepth)
```

Where:
- **vDepth = 0**: Pure round body (t₀)
- **vDepth = 1**: Pure V-hull (tV)

**Q Parameter**:
q is controlled by deadrise (higher q = sharper V).

Typically:
```
q = lerp(1.5, 4.0, deadrise)
```

### **5.3 Bilge/Chine Shaping via "Knee" Blending**

To represent chines, you need a knee where curvature concentrates.

**Knee Location**: k ∈ (0, 1)

**Remap s into Two Regions**:
```
s₀ = clamp(s / k, 0, 1)        // Bottom region
s₁ = clamp((s - k)/(1 - k), 0, 1)  // Side region
```

**Define Two Profiles**:
```
bottom profile: tb = s₀^pb
side profile: ts = 1 - (1 - s₁)^ps
```

**Combine with Knee Function**:
```
tknee(s) = {
  α · tb              if s ≤ k
  α + (1 - α) · ts    if s > k
}
```

Where α is the height fraction at the knee (a parameter, or derived).

**Blend into t₁**:
```
t₂(s) = lerp(t₁(s), tknee(s), chineSharpness)
```

Where:
- **chineSharpness = 0**: Smooth round (t₁)
- **chineSharpness = 1**: Hard chine (tknee)

### **5.4 Rail Rounding**

Near s=1, soften the last bit to prevent ugly pinching at the rail when you fit beam.

**Smoothstep Window**:
```
w = smoothstep(1 - rW, 1, s)
```

Where rW is rail width fraction (e.g., 0.1).

**Ease Approach to 1**:
Inside the window, apply:
```
t = 1 - (1 - t)^railEase
```

Where railEase is typically 0.5..2.0.

**Final Section Law**:
```
F(s; SectionParams) = t_final(s)
```

After all layers: base → V-blend → chine-blend → rail-ease.

### **Complete Implementation Pseudocode**

```typescript
function computeSectionLaw(s: number, params: SectionParams): number {
  // 1. Base rise curve
  const p = lerp(0.7, 2.5, params.bodyPow);
  const t0 = Math.pow(s, p);
  
  // 2. V-hull blend
  const q = lerp(1.5, 4.0, params.deadrise);
  const tV = 1 - Math.pow(1 - s, q);
  const t1 = lerp(t0, tV, params.vDepth);
  
  // 3. Bilge/chine knee (if chineSharpness > 0)
  let t2 = t1;
  if (params.chineSharpness > 0) {
    const k = params.bilgeRadius; // Knee location
    const s0 = clamp(s / k, 0, 1);
    const s1 = clamp((s - k) / (1 - k), 0, 1);
    const tb = Math.pow(s0, 1.5); // Bottom profile power
    const ts = 1 - Math.pow(1 - s1, 1.5); // Side profile power
    const alpha = k; // Height fraction at knee
    const tknee = (s <= k) ? (alpha * tb) : (alpha + (1 - alpha) * ts);
    t2 = lerp(t1, tknee, params.chineSharpness);
  }
  
  // 4. Rail rounding
  const rW = params.railRadius * 0.2; // Rail width fraction
  const w = smoothstep(1 - rW, 1, s);
  const t3 = (w > 0) ? (1 - Math.pow(1 - t2, 1.5)) * w + t2 * (1 - w) : t2;
  
  return clamp(t3, 0, 1);
}
```

**[END:TAG:SECTION_LAW_IMPL]**

---

## 6. TOP VIEW CURVE B(u) SPECIFICATION

**[TAG:TOP_CURVE] [TAG:CURVE_FIRST_GENERATOR]**

### **B(u) is King**

For boats and cars, most "identity" is in planform (top view).

**B(u) should be a spline you can fit to top ortho silhouette.**

### **Strong Recommendation**

Represent B(u) as a **piecewise cubic Bézier spline** with:

- **Endpoints locked** at bow/stern beam values
- **2–4 interior control points** for shape control
- **Optional constraints**:
  - B(u) ≥ 0 (non-negative)
  - Smooth derivative (C1 continuity)
  - Fairness penalty (second derivative energy)

**Same for K(u) and D(u).**

This makes fitting stable and keeps edits intuitive.

### **Curve Interface**

```typescript
export interface Curve1D {
  eval(u: number): number;        // Value at parameter u
  deriv?(u: number): number;      // Optional: slope/derivative at u
}
```

### **Bézier Spline Implementation**

A piecewise cubic Bézier spline consists of:

- Multiple Bézier segments
- Each segment is a cubic Bézier curve with 4 control points
- Segments share endpoints for continuity
- First derivatives match at segment boundaries (C1)

**Bézier Curve Formula**:
```
B(t) = (1-t)³P₀ + 3(1-t)²t P₁ + 3(1-t)t² P₂ + t³ P₃
```

Where t ∈ [0, 1] is the segment parameter, and P₀, P₁, P₂, P₃ are control points.

**[END:TAG:TOP_CURVE]**

---

## 7. MESH SYNTHESIS ALGORITHM

**[TAG:MESH_SYNTHESIS] [TAG:CURVE_FIRST_GENERATOR]**

### **Stop Thinking "Deform a Box"**

Under the hood, the mesh is built from scratch as a parametric surface grid.

### **7.1 Build a Half-Surface Chart**

**Grid Indices**:
- i = 0..Nu along u (longitudinal)
- j = 0..Nv across s (lateral, 0..1)

**For Each (i, j)**:

1. **Normalized Parameters**:
   ```
   u = i / Nu
   s = j / Nv
   ```

2. **Compute Half-Beam**:
   ```
   b = B(u)
   ```

3. **Choose Actual z**:
   ```
   z = s * b  (half hull, z ≥ 0)
   ```

4. **Compute Section Fraction**:
   ```
   t = F(s; SectionParams(u))
   ```

5. **Compute Surface Height**:
   ```
   yK = K(u)
   yD = D(u)
   y = yK + (yD - yK) * t
   ```

6. **Compute x Position**:
   ```
   x = x(u) = (u - u₀) * L
   ```

7. **Half Surface Point**:
   ```
   P = (x, y, z)
   ```

### **7.2 Mirror for Other Side**

Then mirror to get the other half:

```
P' = (x, y, -z)
```

### **7.3 Store Design Coordinates as Attributes**

**Every vertex should carry**:
- **u** (0..1) - Normalized longitudinal coordinate
- **s** (0..1) - Normalized lateral coordinate
- **region id** (hull side vs deck, later)
- **optional**: "station" index

**This is what enables feature masks later.**

Without (u, s) attributes, feature nodes cannot compute stable masks.

### **7.4 Build Indices**

For a grid with Nu × Nv vertices per half:

**Triangle Indices**:
- Each quad (i, j) to (i+1, j+1) becomes 2 triangles
- Winding: CCW for outside view

**Complete Algorithm**:
```
positions = []
indices = []
u_attrs = []
s_attrs = []

// Half hull
for i = 0 to Nu:
  for j = 0 to Nv:
    u = i / Nu
    s = j / Nv
    b = B(u).eval(u)
    z = s * b
    t = F(s, sectionParamsAt(u))
    yK = K(u).eval(u)
    yD = D(u).eval(u)
    y = yK + (yD - yK) * t
    x = (u - 0.5) * L
    
    positions.append([x, y, z])
    u_attrs.append(u)
    s_attrs.append(s)
    
    // Build quad indices
    if i < Nu and j < Nv:
      v0 = i * (Nv + 1) + j
      v1 = i * (Nv + 1) + (j + 1)
      v2 = (i + 1) * (Nv + 1) + j
      v3 = (i + 1) * (Nv + 1) + (j + 1)
      
      // Triangle 1: v0, v2, v1
      indices.append([v0, v2, v1])
      // Triangle 2: v1, v2, v3
      indices.append([v1, v2, v3])

// Mirror to other side
mirrorOffset = positions.length
for each position [x, y, z] in half hull:
  positions.append([x, y, -z])
  // Mirror u, s attributes (u stays same, s stays same)
  u_attrs.append(u)
  s_attrs.append(s)
  
  // Mirror indices (add mirrorOffset, reverse winding)
  // ... (implementation depends on indexing strategy)
```

### **7.5 Compute Normals**

After building positions and indices:

1. **Compute face normals** from triangle geometry
2. **Average face normals** at each vertex
3. **Normalize** to unit length

Or use analytical normal computation from surface derivatives.

**[END:TAG:MESH_SYNTHESIS]**

---

## 8. DECK SURFACE SPECIFICATION

**[TAG:DECK_SURFACE] [TAG:CURVE_FIRST_GENERATOR]**

### **Don't Force Deck into Hull Sides**

For anything with a lip/overhang (Laser deck edge, car fender top), you'll want separate charts.

**Two Separate Charts**:
1. **Hull side chart**: from keel to rail (s: 0→1)
2. **Deck chart**: from centerline to rail (sd: 0→1) but with its own crown and lip logic

### **Deck Chart Formula**

**Lateral Coordinate**:
```
z = sd * Bdeck(u)
```

Where Bdeck can be slightly smaller or slightly larger depending on overhang.

**Deck Height Formula**:

```
y_deck(u, sd) = D(u) + crown(u) · C(sd)
```

Where:
- **D(u)**: Deck baseline curve
- **crown(u)**: Crown height function (varies along length)
- **C(sd)**: Crown shape function

**Crown Shape Options**:
```
C(sd) = 1 - sd^p     (power-based)
C(sd) = cos(π · sd / 2)  (cosine-based)
```

### **Deck Meets Rail**

The deck meets the rail through a controlled blend / seam line.

**Note**: Laser's "rounded edge then sharper lip underhang" lives in Step 3/feature stage. In Step 2 we just produce clean deck + rail seam.

**[END:TAG:DECK_SURFACE]**

---

## 9. SECONDARY MODIFIERS AND ENVELOPES

**[TAG:ENVELOPES] [TAG:CURVE_FIRST_GENERATOR]**

### **Rule: Always Use Envelopes**

You will need bow/stern specific behavior. Do it as **envelopes that modulate curves**, not ad-hoc vertex hacks.

### **Examples**

1. **Bow tip length / pointiness**: Modifies B(u) near u→1
2. **Stern transom cutoff**: Modifies B(u) near u→0 and may clamp to a transom width
3. **Bow lift amp**: Adds to K(u) near bow with a smooth envelope
4. **Stern deck drop**: Adds to D(u) near stern

### **Envelope Template**

**Envelope Function**:

```
E(u; u₀, w, n) = smoothstep(u₀ - w, u₀, u)^n · (1 - smoothstep(u₀, u₀ + w, u))^n
```

Where:
- **u₀**: Center of envelope (e.g., 0 for stern, 1 for bow)
- **w**: Width of envelope
- **n**: Power/sharpness (n = 1 is smooth, n > 1 is sharper)

**Or simpler**: Use smoothstep ramps directly.

**Critical Rule**: Every localized effect must be envelope-bounded so it can't pollute the whole hull.

**[END:TAG:ENVELOPES]**

---

## 10. CURVE FAIRNESS ALGORITHM

**[TAG:FAIRNESS] [TAG:CURVE_FIRST_GENERATOR]**

### **The "Absolute Limit" Quality Lever**

If you allow curve control points to move freely, you'll get wiggly hulls.

**Solution**: Define a fairness term for each curve.

### **Fairness Computation**

**Algorithm**:
1. Sample the curve at N points: c₀, c₁, ..., cₙ₋₁
2. Compute discrete second derivative energy:

```
E = Σᵢ (cᵢ₊₁ - 2cᵢ + cᵢ₋₁)²
```

Where the sum is over interior points (i = 1 to N-2).

### **Application**

When auto-fitting or when user drags handles, you can:

1. **Show a fairness meter** - Visual feedback on curve quality
2. **Optionally auto-relax neighboring points** - Keep it smooth automatically

### **Significance**

**This one piece is what separates "parametric toy" from "professional surface."**

Fairness constraints ensure that curves remain smooth and professional-looking, not wiggly or unstable.

**[END:TAG:FAIRNESS]**

---

## 11. TYPESCRIPT TYPE DEFINITIONS

**[TAG:TYPES] [TAG:CURVE_FIRST_GENERATOR]**

### **Complete Type System**

From modelmaker.txt Section 2.10:

```typescript
export interface Curve1D {
  eval(u: number): number;        // value
  deriv?(u: number): number;      // optional slope
}

export interface SectionParams {
  vDepth: number;        // 0..1
  deadrise: number;      // 0..1
  bilgeRadius: number;   // 0..1 (normalized feel)
  chineSharpness: number;// 0..1
  flare: number;         // -1..+1 (tumblehome..flare)
  railRadius: number;    // 0..1
  bodyPow: number;       // 0..1
}

export interface SectionLaw {
  F(s: number, p: SectionParams): number; // returns t 0..1
}

export interface BaseFormSpec {
  L: number;             // meters
  B: Curve1D;            // half-beam curve
  K: Curve1D;            // keel/underside
  D: Curve1D;            // deck/roofline
  sectionAt(u: number): SectionParams;

  Nu: number;
  Nv: number;
}

export interface VertexDesignAttrib {
  u: number;   // 0..1
  s: number;   // 0..1
  side: 1 | -1;
}
```

### **Type Relationships**

```
BaseFormSpec
  ├─→ Curve1D (B, K, D)
  ├─→ SectionParams (via sectionAt(u))
  └─→ SectionLaw (F(s, params))

VertexDesignAttrib
  ├─→ u: number (from BaseFormSpec sampling)
  ├─→ s: number (from lateral sampling)
  └─→ side: 1 | -1 (left/right)
```

**[END:TAG:TYPES]**

---

## 12. GENERATOR ALGORITHM IMPLEMENTATION

**[TAG:GENERATOR_ALG] [TAG:CURVE_FIRST_GENERATOR]**

### **High-Level Algorithm**

From modelmaker.txt Section 2.11:

**Universal Generator Steps**:

1. **Sample u stations** - For i = 0 to Nu
2. **For each station**, compute:
   - b = B(u)
   - yK = K(u)
   - yD = D(u)
   - sectionParams = sectionAt(u)
3. **For each lateral sample** (j = 0 to Nv):
   - s = j / Nv
   - t = F(s; sectionParams)
4. **Compute vertex position**:
   - x = (u - u₀) * L
   - y = yK + (yD - yK) * t
   - z = s * b
5. **Mirror for other side** - P' = (x, y, -z)
6. **Build indices** - Connect vertices into triangles
7. **Compute normals** - From geometry or analytically

**That's it. Everything else is features and refinements.**

### **Complete Implementation Structure**

```typescript
function generateBaseMesh(spec: BaseFormSpec): THREE.BufferGeometry {
  const positions: number[] = [];
  const uAttribs: number[] = [];
  const sAttribs: number[] = [];
  const indices: number[] = [];
  
  const { L, B, K, D, sectionAt, Nu, Nv } = spec;
  const u0 = 0.5; // Center at origin
  
  // Generate half hull
  for (let i = 0; i <= Nu; i++) {
    const u = i / Nu;
    const b = B.eval(u);
    const yK = K.eval(u);
    const yD = D.eval(u);
    const sectionParams = sectionAt(u);
    
    for (let j = 0; j <= Nv; j++) {
      const s = j / Nv;
      const t = computeSectionLaw(s, sectionParams);
      const y = yK + (yD - yK) * t;
      const z = s * b;
      const x = (u - u0) * L;
      
      positions.push(x, y, z);
      uAttribs.push(u);
      sAttribs.push(s);
      
      // Build quad indices
      if (i < Nu && j < Nv) {
        const v0 = i * (Nv + 1) + j;
        const v1 = i * (Nv + 1) + (j + 1);
        const v2 = (i + 1) * (Nv + 1) + j;
        const v3 = (i + 1) * (Nv + 1) + (j + 1);
        
        // Triangle 1
        indices.push(v0, v2, v1);
        // Triangle 2
        indices.push(v1, v2, v3);
      }
    }
  }
  
  // Mirror to other side
  const mirrorOffset = positions.length / 3;
  // ... (mirror implementation)
  
  // Create Three.js geometry
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('u', new THREE.Float32BufferAttribute(uAttribs, 1));
  geometry.setAttribute('s', new THREE.Float32BufferAttribute(sAttribs, 1));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  
  return geometry;
}
```

**[END:TAG:GENERATOR_ALG]**

---

## 13. INTEGRATION POINTS

**[TAG:INTEGRATION] [TAG:CURVE_FIRST_GENERATOR]**

### **Integration with ReferencePack System (Step 1)**

**Fitting Flow**:
```
ReferencePack (Step 1)
  → Extract silhouettes from ortho images
  → Fit B(u), K(u), D(u) curves to silhouettes
  → Generate base mesh (Step 2)
```

### **Integration with Feature Node System (Step 3)**

**Design Coordinate Requirement**:
- Base mesh must have (u, s) attributes stored
- Feature nodes use (u, s) for stable mask computation
- Without design coordinates, feature system cannot work

**Flow**:
```
Base Mesh Generator (Step 2)
  → Base mesh with (u, s) attributes
  → Feature Node System (Step 3)
  → Feature-modified geometry
```

### **Integration with SVG Diagram Editor**

**Curve Editing**:
- SVG overlays for B(u), K(u), D(u) curves
- User drags control points → updates curves → regenerates mesh
- Real-time preview

**[END:TAG:INTEGRATION]**

---

## 14. PERFORMANCE CHARACTERISTICS

**[TAG:PERFORMANCE] [TAG:CURVE_FIRST_GENERATOR]**

### **Mesh Generation Performance**

**Complexity**:
- Vertex count: O(Nu · Nv) per half
- Total vertices: O(2 · Nu · Nv) for full hull
- Index count: O(2 · Nu · Nv) triangles

**Typical Values**:
- Nu = 50..200 (longitudinal resolution)
- Nv = 30..100 (lateral resolution)
- Total: 3,000..40,000 vertices

### **Curve Evaluation Performance**

**Per-Vertex Cost**:
- B(u), K(u), D(u) evaluation: O(1) if cached
- SectionParams lookup: O(1) if interpolated from stations
- F(s) computation: O(1) (fixed formula)

**Optimization**:
- Cache curve evaluations per station
- Precompute SectionParams per station
- Batch vertex generation

**[END:TAG:PERFORMANCE]**

---

## 15. FILE DEPENDENCY GRAPH

**[TAG:DEPS] [TAG:CURVE_FIRST_GENERATOR]**

```
Curve-First Generator System
  │
  ├─→ modelmaker.txt (Step 2 specification)
  │   └─→ Lines 587-1306: Complete specification
  │
  ├─→ Curve1D Interface
  │   ├─→ Bézier spline implementation
  │   └─→ Curve evaluation
  │
  ├─→ SectionLaw Implementation
  │   ├─→ Base rise curve
  │   ├─→ V-hull blend
  │   ├─→ Bilge/chine knee
  │   └─→ Rail rounding
  │
  ├─→ Mesh Generator
  │   ├─→ Parametric grid synthesis
  │   ├─→ Index building
  │   └─→ Normal computation
  │
  └─→ Design Coordinate System
      ├─→ (u, s) attribute storage
      └─→ Feature mask compatibility
```

**[END:TAG:DEPS]**

---

## 16. TYPE FLOW MAP

**[TAG:TYPE_FLOW] [TAG:CURVE_FIRST_GENERATOR]**

### **Type Flow**

```
BaseFormSpec (Input)
  ↓
Curve1D Evaluation (B, K, D)
  ↓
SectionParams Lookup
  ↓
SectionLaw F(s) Computation
  ↓
Vertex Position Calculation
  ↓
Mesh Geometry (THREE.BufferGeometry)
  ↓
Design Attributes (u, s)
```

### **Parameter Flow**

```
User Input / Fitting
  ↓
Curve Control Points (B, K, D)
  ↓
SectionParams (stations or curves)
  ↓
BaseFormSpec
  ↓
Mesh Generation
  ↓
Geometry Output
```

**[END:TAG:TYPE_FLOW]**

---

## 17. STATE MANAGEMENT

**[TAG:STATE_MGMT] [TAG:CURVE_FIRST_GENERATOR]**

### **Generator State**

```typescript
interface GeneratorState {
  spec: BaseFormSpec;
  geometry?: THREE.BufferGeometry;
  dirty: boolean;
}
```

### **Curve State**

```typescript
interface CurveState {
  controlPoints: number[];
  curve: Curve1D;
  fairness: number;  // Computed fairness energy
}
```

### **SectionParams State**

```typescript
interface SectionParamsState {
  stations: { u: number; params: SectionParams }[];
  interpolation: 'linear' | 'spline';
}
```

**[END:TAG:STATE_MGMT]**

---

## 18. RELATIONSHIP MATRIX

**[TAG:RELATIONS] [TAG:CURVE_FIRST_GENERATOR]**

### **System Relationships**

| System | Relationship | Data Flow |
|--------|-------------|-----------|
| ReferencePack | Fits curves | Ortho images → B(u), K(u), D(u) curves |
| SectionLaw | Core computation | SectionParams + s → t (0..1) |
| Mesh Generator | Produces geometry | Curves + SectionLaw → Base mesh |
| Feature Nodes | Requires design coords | Base mesh (u, s) → Feature masks |
| SVG Editor | Edits curves | User input → Curve control points |

### **Formula Relationships**

| Formula | Inputs | Output | Used By |
|---------|--------|--------|---------|
| y(u,z) = K(u) + (D(u) - K(u)) · F(s) | u, s, curves, params | y coordinate | Mesh synthesis |
| t₀(s) = s^p | s, bodyPow | Base rise | Section law |
| tV(s) = 1 - (1-s)^q | s, deadrise | V component | Section law |
| t₁(s) = lerp(t₀, tV, vDepth) | t₀, tV, vDepth | V-blended | Section law |
| tknee(s) | s, k, α, pb, ps | Knee shape | Section law |
| E = Σ(cᵢ₊₁ - 2cᵢ + cᵢ₋₁)² | Curve samples | Fairness | Quality control |

**[END:TAG:RELATIONS]**

---

## 📝 DELIVERABLE OF STEP 2

**When Step 2 is implemented, you will have:**

- A single universal base mesh generator that can output:
  - Laser hull envelope
  - Car body envelope
  - Helicopter fuselage envelope
  - Any "smooth shell" object

**Driven by:**
- Three fit-ready splines B, K, D
- Plus a section style bundle that can vary along length

**With:**
- Stable topology
- Saved design coordinates (u, s)
- Deterministic rebuild

**This is the substrate for Step 3 (feature nodes like cockpit cutouts, wheel arches, scoops, lips, trunks, etc.).**

---

**Status:** PHASE 1 - Foundation System Mapping  
**Confidence:** 0.95 (Very High - Complete specification extracted from modelmaker.txt)  
**Next:** Implement Curve-First Generator based on this specification



---


---

<!-- AUTO-GENERATED FROM: MASTER_FEATURE_NODE_SYSTEM_MAP.md -->
<!-- DO NOT EDIT THIS SECTION DIRECTLY -->
<!-- Source File: MASTER_FEATURE_NODE_SYSTEM_MAP.md -->
<!-- File Size: 62267 bytes -->

<a id='feature-node-system-map'></a>

# MASTER FEATURE NODE SYSTEM MAP
**Complete System Anatomy Mapping - Feature Node System Architecture**

**Date:** 2025-01-27  
**Version:** 1.0.0  
**Purpose:** Complete S.A.M. documentation for Feature Node System (modelmaker.txt Step 3)  
**Status:** PHASE 1 - Foundation System Mapping  
**System:** Lucid Image Editor - Universal Parametric Asset Engine  
**Reference:** modelmaker.txt Step 3 (Lines 1307-1746+), Cockpit Assembly Nodes (Lines 14156-14813)

---

## 📋 TABLE OF CONTENTS

1. [System Overview](#1-system-overview)
2. [Node Contract Specification](#2-node-contract-specification)
3. [Mask Field Subsystem](#3-mask-field-subsystem)
4. [The 5 Core Feature Types](#4-the-5-core-feature-types)
5. [Feature Graph Architecture](#5-feature-graph-architecture)
6. [Implementation Patterns](#6-implementation-patterns)
7. [Cockpit Assembly Nodes](#7-cockpit-assembly-nodes)
7A. [Cockpit Assembly Nodes - Complete Implementations](#7a-cockpit-assembly-nodes---complete-implementations)
8. [Geometry Helpers](#8-geometry-helpers)
9. [Integration Points](#9-integration-points)
10. [Performance Characteristics](#10-performance-characteristics)
11. [File Dependency Graph](#11-file-dependency-graph)
12. [Type Flow Map](#12-type-flow-map)
13. [State Management](#13-state-management)
14. [Relationship Matrix](#14-relationship-matrix)

---

## 1. SYSTEM OVERVIEW

**[TAG:OVERVIEW] [TAG:FEATURE_NODE]**

### **What is the Feature Node System?**

The Feature Node System is the "universal 'add variables forever' engine" (modelmaker.txt Step 3). It enables adding features like cockpit cutouts, centerboard trunks, fender arches, hood scoops, antenna bosses, mirror curvature tweaks—without corrupting the base geometry.

**Location:** Architecture defined in modelmaker.txt  
**Purpose:** Extensible feature system for parametric asset creation  
**Core Principle:** "Truth-from-fields/masks/caches" - No node reads from Three.js geometry as truth

### **Key Responsibilities**

1. **Feature Injection**: Inject parameters + handles + local operations
2. **Target Specification**: Target region/chart for feature application
3. **Mask Field Computation**: Compute scalar field m(p) ∈ [0,1] over vertices/samples
4. **Deterministic Operations**: Apply operations in deterministic stage order
5. **Enable/Disable/Reorder**: Features can be enabled/disabled, reordered, and versioned
6. **SVG + Gizmo Integration**: Provide handles for SVG overlay + gizmos

### **Core Principles**

- **Node Contract**: Every feature node must provide: Target, Placement, Mask, Operation, Params, Stage, Handles
- **Mask Fields**: Universal mask field subsystem using (u,s) coordinates for stability
- **Deterministic**: Same inputs → identical geometry
- **Pipeline Compilation**: Graph compiles to linear pipeline (ordered passes)
- **Truth-from-Fields**: Never read Three.js geometry as truth - use fields/masks/caches

### **Architecture Overview**

```
Feature Graph (UX Diagram)
  ↓
Compile to Linear Pipeline (ordered passes)
  ↓
Apply Features in Stage Order
  ↓
Update Geometry (deterministic)
```

**Graph is for UX (diagram), pipeline is for execution.**

**[END:TAG:OVERVIEW]**

---

## 2. NODE CONTRACT SPECIFICATION

**[TAG:CONTRACT] [TAG:FEATURE_NODE]**

### **Absolute Minimum Node Contract**

Every feature node MUST provide:

#### **1. Target**
- **Type**: Region name(s) or chart id(s)
- **Purpose**: Specify which region/chart the feature applies to
- **Example**: "hull_side", "deck", "cockpit", ["deck", "cockpit_rim"]

#### **2. Placement**
- **Type**: Anchor frame OR param-space (u,v) + orientation
- **Purpose**: Where the feature is placed within the target region
- **Anchor Frame**: {position, tangent, normal, binormal}
- **Param-Space**: (u, v) coordinates in region chart + orientation
- **Example**: anchor="cockpit_center" OR {u: 0.35, v: 0.5, orientation: [1,0,0]}

#### **3. Mask**
- **Type**: Scalar field m(p) ∈ [0,1] over vertices/samples
- **Purpose**: Define where and how strongly the feature applies
- **Function**: m(v) = clamp(f(v), 0, 1) where v is vertex with design attributes (u, s, chart local coords)
- **Evaluation**: Mask computed from mask primitives and boolean operations
- **Stability**: Uses (u,s) coordinates for LOD stability

#### **4. Operation**
- **Type**: displacement / warp / recess / crease / etc.
- **Purpose**: What the feature does to the geometry
- **Examples**: 
  - NormalOffset: Push along surface normal
  - Recess: Push inward (negative normal)
  - Crease: Pinch normals / displace around curve
  - Warp: Vector field transformation
  - Boss/Hole: Extrusion or subtraction

#### **5. Params**
- **Type**: Typed values + ranges + defaults
- **Purpose**: User-adjustable parameters for the feature
- **Types**: float, int, bool, curve, color, vector
- **Validation**: Ranges and constraints enforced
- **Example**: {center: [u: 0.35, s: 0.5], radius: 0.1, height: 0.05, profile: "bell"}

#### **6. Stage**
- **Type**: Execution order identifier
- **Purpose**: When the feature runs in the pipeline
- **Stages**: after_base, before_finish, after_cutouts, etc.
- **Ordering**: Features execute in stage order, then by dependency order within stage
- **Example**: stage: "after_base" → runs after base mesh generation

#### **7. Handles**
- **Type**: SVG overlay + gizmos specification
- **Purpose**: How the feature appears and is manipulated in the editor
- **SVG**: 2D handle representation in orthographic views
- **Gizmos**: 3D manipulation handles in viewport
- **Example**: {svg: [{type: "circle", center: [u, s], radius: r}], gizmos: [{type: "translate", axis: "y"}]}

### **Node Contract Type Definition**

```typescript
interface FeatureNodeContract {
  id: string;
  name: string;
  target: string | string[];           // Region name(s) or chart id(s)
  placement: {
    type: 'anchor' | 'param-space';
    anchor?: string;                    // Anchor frame ID
    u?: number;                         // Param-space u coordinate
    v?: number;                         // Param-space v coordinate
    orientation?: [number, number, number];  // Orientation vector
  };
  mask: {
    primitives: MaskPrimitive[];        // Mask primitive definitions
    operations?: MaskOperation[];       // Boolean operations
  };
  operation: {
    type: 'displace' | 'warp' | 'recess' | 'crease' | 'boss' | 'hole';
    // Operation-specific parameters
  };
  params: {
    [key: string]: {
      type: 'float' | 'int' | 'bool' | 'curve' | 'color' | 'vector';
      default: any;
      min?: number;
      max?: number;
      step?: number;
    };
  };
  stage: string;                        // Execution stage
  handles: {
    svg?: SVGHandle[];
    gizmos?: GizmoHandle[];
  };
  enabled: boolean;                     // Enable/disable flag
  order: number;                        // Order within stage
}
```

**[END:TAG:CONTRACT]**

---

## 3. MASK FIELD SUBSYSTEM

**[TAG:MASK] [TAG:FEATURE_NODE]**

### **Mask Field Definition**

A mask field is a scalar function:

```
m(v) = clamp(f(v), 0, 1)
```

where:
- `v` is a vertex with design attributes (u, s, plus chart local coords)
- `f(v)` is the mask function (can be > 1 or < 0 before clamping)
- `m(v)` is the final mask value ∈ [0, 1]

### **Core Mask Primitives**

All complex masks are combinations of these primitives:

#### **1. Ellipse in (u,s) Space**
- **Purpose**: Great for scoops, bosses, local bulges
- **Definition**: Elliptical mask centered at (u₀, s₀) with radii (rᵤ, rₛ)
- **Function**: 
  ```
  d = sqrt(((u - u₀)/rᵤ)² + ((s - s₀)/rₛ)²)
  f(v) = 1 - clamp(d, 0, 1)  // 1 at center, 0 at edge
  ```

#### **2. Box/Rounded-Rect in (u,s)**
- **Purpose**: Great for cockpit openings, vents
- **Definition**: Rectangular mask with optional rounded corners
- **Function**: 
  ```
  // Axis-aligned box
  if (u_min ≤ u ≤ u_max && s_min ≤ s ≤ s_max) {
    // Distance to edges for rounding
    d = min(u - u_min, u_max - u, s - s_min, s_max - s)
    f(v) = smoothstep(0, corner_radius, d)
  } else {
    f(v) = 0
  }
  ```

#### **3. Distance-to-Curve in (u,s)**
- **Purpose**: Great for wheel arches, chines, rails, creases
- **Definition**: Distance from point to curve, with falloff
- **Function**: 
  ```
  d = distanceToCurve(u, s, curve)
  f(v) = smoothstep(falloff_outer, falloff_inner, d)
  ```

#### **4. Distance-to-Anchor in 3D**
- **Purpose**: Great for local mounts around a point
- **Definition**: 3D distance from vertex to anchor point
- **Function**: 
  ```
  d = ||v.position - anchor.position||
  f(v) = smoothstep(radius_outer, radius_inner, d)
  ```

### **Boolean Operations on Masks**

Masks can be combined using boolean operations:

- **Union**: `m_result = max(m_a, m_b)`
- **Intersect**: `m_result = min(m_a, m_b)`
- **Subtract**: `m_result = clamp(m_a - m_b, 0, 1)`

### **Falloff Shaping**

Control edge hardness with falloff shaping:

```
m_shaped = smoothstep(0, 1, m)^γ
```

where:
- `γ = 1.0`: Linear falloff
- `γ > 1.0`: Sharper edges (harder)
- `γ < 1.0`: Softer edges

### **Why (u,s) Masks are Universal**

**Key Insight**: (u,s) coordinates are stable even when mesh resolution changes.

**Benefits**:
- "Cockpit starts at u=0.22, ends at u=0.48" survives LOD changes
- Mask definitions remain valid across different mesh resolutions
- Features stay in the same place regardless of vertex count

**Implementation**: Requires storing (u, s) attributes in mesh (from Step 2 - Curve-First Generator)

**[END:TAG:MASK]**

---

## 4. THE 5 CORE FEATURE TYPES

**[TAG:FEATURE_TYPES] [TAG:FEATURE_NODE]**

### **Overview**

If you implement these five node types cleanly, you can build almost anything. These are the foundational feature operations.

### **Feature Type A: PatchDisplace (bulge/scoop/flare)**

**Operation**: Push vertices along surface normal (or a preferred direction).

**Parameters**:
- `center`: (u₀, s₀) - Center point in parameter space
- `radiusU`: number - Radius in u direction
- `radiusS`: number - Radius in s direction
- `height`: number - Displacement height (+/- for bulge/recess)
- `profile`: "bell" | "ridge" | "plateau" - Profile shape function
- `edgeSharpness`: number - Edge sharpness (falloff γ)

**Output**:
```
Δp = n * height * profile(r) * m
```

where:
- `n` is surface normal (or preferred direction)
- `r` is normalized distance from center
- `profile(r)` is profile function (bell curve, etc.)
- `m` is mask value

**Uses**:
- Hood scoop bump
- Fender flare
- Deck crown enhancement
- Bow shoulder fattening

### **Feature Type B: RecessCut (cockpit/vent/well)**

**Operation**: Push inward (negative normal) + optional rim shaping.

**Important**: You do NOT do triangle booleans unless needed. You "carve" using a recess field + rim lift.

**Parameters**:
- `shape`: mask definition - Shape mask (rounded rect, curve loop, etc.)
- `depth`: number - Recess depth
- `rimWidth`: number - Rim width parameter
- `rimHeight`: number - Rim height (lip height)
- `rimRoundness`: number - Rim roundness

**Output**:
```
interior: Δp = -n * depth * m
rim: Δp += n * rimHeight * rimMask
```

where:
- `rimMask = band(m, inner=0.7, outer=0.95)` (example band-pass)

**Uses**:
- Laser cockpit subtraction
- Centerboard trunk recess area
- Car window cut impressions
- Vent cutouts (visual)

**Note**: If you need a real hole, do it as a controlled topology submesh later (Step 6 export/boolean insert), not by fragile booleans on random triangles.

### **Feature Type C: CreaseLine (chines/panel breaks)**

**Operation**: Locally pinch normals / displace around a curve.

**Parameters**:
- `curve`: curve definition - Curve in (u,s) or 3D space
- `width`: number - Crease width (falloff distance)
- `sharpness`: number - Crease sharpness (normal pinch strength)
- `depth`: number - Optional displacement depth
- `direction`: "pinch" | "lift" | "both" - Crease direction

**Output**:
```
// Normal pinching
n_new = lerp(n_original, crease_normal, sharpness * m)

// Optional displacement
Δp = direction_vector * depth * m
```

**Uses**:
- Hull chines (sharp edges)
- Panel breaks (body panels)
- Panel seams
- Sharp creases

### **Feature Type D: WarpField (sweep/twist/bend)**

**Operation**: Apply vector field transformation to vertices.

**Parameters**:
- `fieldType`: "sweep" | "twist" | "bend" | "custom"
- `axis`: [number, number, number] - Warp axis
- `strength`: number - Warp strength
- `falloff`: mask definition - Falloff mask
- `fieldFunction`: function - Custom field function (if type="custom")

**Output**:
```
Δp = warp_field(v.position, params) * m
```

where `warp_field` is the vector field function

**Uses**:
- Swept surfaces (fenders)
- Twisted surfaces
- Bent panels
- Custom deformations

### **Feature Type E: BossHole (extrusion/subtraction)**

**Operation**: Extrude outward (boss) or create hole (subtraction).

**Parameters**:
- `type`: "boss" | "hole"
- `shape`: mask definition - Shape mask
- `extrusion`: number - Extrusion height (boss) or depth (hole)
- `taper`: number - Taper angle
- `rim`: boolean - Add rim/lip
- `rimWidth`: number - Rim width (if rim=true)
- `rimHeight`: number - Rim height (if rim=true)

**Output**:
```
boss: Δp = n * extrusion * profile(m)
hole: Δp = -n * depth * profile(m)
+ rim geometry if rim=true
```

**Uses**:
- Antenna bosses
- Mounting holes
- Protrusions
- Holes with rims

**[END:TAG:FEATURE_TYPES]**

---

## 5. FEATURE GRAPH ARCHITECTURE

**[TAG:ARCHITECTURE] [TAG:FEATURE_NODE]**

### **Graph Model**

**Key Concept**: Graph is for UX (diagram), pipeline is for execution.

**Internal Compilation**: Graph compiles to linear pipeline (ordered passes) because:
- Deterministic: Same inputs → identical geometry
- Fast: Linear execution, no graph traversal overhead
- Composable: Easy to combine features

### **Graph Structure**

```
Feature Graph (User Interface)
  ├─ Node A (PatchDisplace)
  ├─ Node B (RecessCut)
  ├─ Node C (CreaseLine)
  └─ Node D (WarpField)
       ↓
Compile to Pipeline
       ↓
Pipeline (Execution Order)
  ├─ Stage: after_base
  │   ├─ Node A
  │   └─ Node C
  ├─ Stage: after_cutouts
  │   └─ Node B
  └─ Stage: before_finish
      └─ Node D
```

### **Pipeline Compilation**

**Algorithm**:
1. Group nodes by stage
2. Sort nodes within each stage by dependency order (or user-defined order)
3. Create linear pass list
4. Validate: No circular dependencies

**Pass Execution**:
```
for each pass in pipeline:
  compute_mask(pass)
  apply_operation(pass, mask)
  update_geometry()
```

### **Dependency Resolution**

**Dependencies**:
- Explicit: Node A depends on Node B
- Implicit: Nodes in same stage ordered by creation time or user order

**Dependency Graph**:
- Build dependency graph
- Topological sort for execution order
- Validate no cycles

**[END:TAG:ARCHITECTURE]**

---

## 6. IMPLEMENTATION PATTERNS

**[TAG:IMPLEMENTATION] [TAG:FEATURE_NODE]**

### **Node Implementation Template**

```typescript
interface FeatureNodeRuntime {
  // Runtime geometry data
  geometry?: THREE.BufferGeometry;
  mesh?: THREE.Mesh;
  // ... other runtime state
}

interface BuildContext {
  state: any;                    // Parametric state
  scene: THREE.Scene;            // Three.js scene
  edit: { dragging: boolean };   // Edit state
  cache: any;                    // Computed caches
}

function makeFeatureNode(params: {
  id?: string;
  target: string | string[];
  placement: PlacementSpec;
  mask: MaskSpec;
  operation: OperationSpec;
  params: ParamSpec;
  stage: string;
  handles: HandleSpec;
}): FeatureNode {
  const node: FeatureNode = {
    id: params.id ?? generateId(),
    runtime: undefined,
    
    build: (ctx: BuildContext) => {
      // 1. Compute mask field
      const mask = computeMaskField(ctx, params.mask);
      
      // 2. Apply operation
      const geometry = applyOperation(ctx, params.operation, mask);
      
      // 3. Create mesh
      const mesh = new THREE.Mesh(geometry, params.material);
      ctx.scene.add(mesh);
      
      // 4. Store runtime
      node.runtime = { geometry, mesh };
    },
    
    update: (ctx: BuildContext, dirty: DirtyRegion) => {
      // Update geometry based on dirty region
      // Optimize: Only update affected vertices
    },
    
    finalize: (ctx: BuildContext) => {
      // Finalize geometry (compute normals, etc.)
      if (node.runtime?.geometry) {
        node.runtime.geometry.computeVertexNormals();
      }
    }
  };
  
  return node;
}
```

### **Mask Field Computation Pattern**

```typescript
function computeMaskField(
  ctx: BuildContext,
  maskSpec: MaskSpec
): Float32Array {
  const { state, cache } = ctx;
  const vertices = cache.mesh.vertices;
  const mask = new Float32Array(vertices.length);
  
  // Evaluate each vertex
  for (let i = 0; i < vertices.length; i++) {
    const v = vertices[i];
    
    // Get design attributes (u, s, chart coords)
    const u = v.attributes.u;
    const s = v.attributes.s;
    
    // Compute mask primitives
    let maskValue = 0;
    for (const primitive of maskSpec.primitives) {
      const pValue = evaluatePrimitive(primitive, u, s);
      maskValue = combineMasks(maskValue, pValue, primitive.op);
    }
    
    // Apply falloff shaping
    maskValue = applyFalloff(maskValue, maskSpec.falloff);
    
    // Clamp to [0, 1]
    mask[i] = clamp(maskValue, 0, 1);
  }
  
  return mask;
}
```

### **Operation Application Pattern**

```typescript
function applyOperation(
  ctx: BuildContext,
  operation: OperationSpec,
  mask: Float32Array
): THREE.BufferGeometry {
  const geometry = ctx.cache.baseGeometry.clone();
  const positions = geometry.attributes.position.array;
  const normals = geometry.attributes.normal.array;
  
  // Apply operation to each vertex
  for (let i = 0; i < positions.length / 3; i++) {
    const m = mask[i];
    if (m < 1e-6) continue; // Skip if mask is zero
    
    const idx = i * 3;
    const px = positions[idx];
    const py = positions[idx + 1];
    const pz = positions[idx + 2];
    const nx = normals[idx];
    const ny = normals[idx + 1];
    const nz = normals[idx + 2];
    
    // Compute displacement based on operation type
    let displacement: [number, number, number];
    switch (operation.type) {
      case 'displace':
        displacement = computeDisplacement(operation, [nx, ny, nz], m);
        break;
      case 'recess':
        displacement = computeRecess(operation, [nx, ny, nz], m);
        break;
      // ... other operation types
    }
    
    // Apply displacement
    positions[idx] += displacement[0];
    positions[idx + 1] += displacement[1];
    positions[idx + 2] += displacement[2];
  }
  
  geometry.attributes.position.needsUpdate = true;
  return geometry;
}
```

**[END:TAG:IMPLEMENTATION]**

---

## 7. COCKPIT ASSEMBLY NODES

**[TAG:COCKPIT] [TAG:FEATURE_NODE]**

### **Overview**

Cockpit assembly nodes are concrete implementations of the feature node system, demonstrating the pattern for complex feature assembly.

**Nodes**:
- CockpitWallNode: Perimeter loft from rim-inner edge down to floor edge
- CockpitRimNode: Swept lip with sharp break and underside overhang

**Key Principle**: Everything is "truth-from-fields/masks/caches", never reading mesh data as truth.

### **CockpitWallNode**

**Purpose**: Create cockpit wall by lofting from rim edge to floor edge.

**Implementation**:
- Perimeter resampling with arc-length (stable, LOD-friendly)
- Loft between top ring (rim edge) and bottom ring (floor edge)
- Optional fillet band at floor join
- Inside-normal correctness (normals point into cockpit)

**Parameters**:
- `material`: THREE.Material
- `lod`: (ctx) => { M: number; H: number } - M perimeter samples, H vertical segments
- `fillet`: { enabled: boolean; t0: number; strength: number } - Optional fillet band

**Geometry**:
- M perimeter samples (arc-length resampled)
- H vertical segments (loft rings)
- Total vertices: M × (H + 1)
- Winding: Determines normal direction (inside normals)

### **CockpitRimNode**

**Purpose**: Create cockpit rim with sharp break (no normal smearing).

**Key Design**: Build TWO separate meshes (rimTop + rimUnder) to preserve sharp break.

**Implementation**:
- **rimTop**: Inner-top → outer-top (top surface)
- **rimUnder**: Outer-top → under lip → inner-under / wall join (underside)
- Separate vertices = hard edge for free (Three.js won't average normals)
- Sharp break highlight preserved

**Parameters**:
- `materialTop`: THREE.Material - Top surface material
- `materialUnder`: THREE.Material - Underside material
- `lod`: (ctx) => { M: number } - M perimeter samples
- `underOverhang`: (s: number) => number - Optional underside overhang multiplier

**Rim Profile** (per perimeter sample):
- `w` = rimWidth(s)
- `d` = rimDrop(s)
- `r` = rimRound(s) - Used to place under points
- `u` = rimUnderOverhang(s) - Optional extra outward under lip

### **Geometry Helpers for Cockpit Nodes**

**1. Polygon Orientation & Normals**:
- `polySignedAreaXZ()`: Compute signed area using shoelace formula
- `isCCW_XZ()`: Determine if polygon is counter-clockwise
- `leftNormal2()` / `rightNormal2()`: Compute left/right normals from tangent
- `inwardOutwardNormals2()`: Compute inward/outward normals based on polygon orientation

**2. Arc-Length Resample**:
- `resampleClosedPolyByArc()`: Resample closed polygon to M points evenly spaced by arc length
- Makes rims/walls look clean and LOD-friendly
- Stable sampling regardless of input polygon density

**3. Tangent Calculation**:
- `tangentAt()`: Compute tangent at resampled point using central difference

**4. Consistent Inside Normals Rule**:
- If polygon is CCW: inward = leftNormal(tangent), outward = rightNormal(tangent)
- If polygon is CW: swapped
- Practical application: Build winding so normals point correctly, use FrontSide material

**[END:TAG:COCKPIT]**

---

## 7A. COCKPIT ASSEMBLY NODES - COMPLETE IMPLEMENTATIONS

**[TAG:COCKPIT_IMPL] [TAG:FEATURE_NODE]**

### **Overview**

This section contains the COMPLETE implementation code for all cockpit assembly nodes, evaluators, helpers, and the CockpitEdgeSampler system. All code is extracted exactly from modelmaker.txt with no simplification.

### **2. Evaluators Needed for Wall/Rim (Deck + Cockpit Floor)**

#### **Cockpit Span Helper**

```typescript
function cockpitSpanFromOutlinePts(outPts: { s: number; zNorm: number }[]): { sMin: number; sMax: number } {
  let sMin = 1, sMax = 0;
  for (const p of outPts) {
    sMin = Math.min(sMin, p.s);
    sMax = Math.max(sMax, p.s);
  }
  return { sMin: clamp(sMin, 0, 1), sMax: clamp(sMax, 0, 1) };
}
```

#### **Build Outline Polygon in XZ**

```typescript
// Build outline polygon in XZ (same as last time)
function cockpitPolyXZ(state: any): XZ[] | null {
  const pts = state.cockpit.outline.pts;
  if (!pts?.length) return null;
  const out: XZ[] = [];
  for (const p of pts) {
    const i = nearestStationIndex(state, p.s);
    const st = state.cache.station[i];
    out.push({ x: st.x, z: p.zNorm * st.zSheer });
  }
  return out;
}
```

#### **Max Abs Z At X (Edge Test)**

```typescript
// For a given x, estimate max |z| where the outline crosses that x (simple edge test)
function maxAbsZAtX(poly: XZ[], x: number): number | null {
  let best = 0;
  let hit = false;
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i];
    const b = poly[(i + 1) % poly.length];
    const x0 = a.x, x1 = b.x;
    if (x < Math.min(x0, x1) || x > Math.max(x0, x1)) continue;
    const dx = x1 - x0;
    if (Math.abs(dx) < 1e-9) continue;
    const t = (x - x0) / dx;
    if (t < 0 || t > 1) continue;
    const z = a.z + (b.z - a.z) * t;
    best = Math.max(best, Math.abs(z));
    hit = true;
  }
  return hit ? best : null;
}
```

#### **Cockpit Eval Type**

```typescript
type CockpitEval = {
  // y for a z inside cockpit floor boundary at that s
  floorY: (s: number, z: number) => number;
  // zBot boundary magnitude for floor edge at that s
  floorZBotAbs: (s: number) => number;
};
```

#### **Make Cockpit Floor Evaluator - COMPLETE IMPLEMENTATION**

```typescript
function makeCockpitFloorEvaluator(ctx: any): CockpitEval {
  const { state } = ctx;
  const deck = makeDeckEvaluator(ctx);

  const fDepth = state.fields["cockpitDepth"];
  const fInset = state.fields["cockpitFloorInset"];
  const fCrown = state.fields["cockpitFloorCrown"];
  const fRise = state.fields["cockpitFloorEdgeRise"];

  const poly = cockpitPolyXZ(state);
  if (!poly) {
    return {
      floorY: () => 0,
      floorZBotAbs: () => 0.1
    };
  }

  return {
    floorZBotAbs(s: number) {
      const x = s * state.length;
      const zTop = maxAbsZAtX(poly, x);
      if (zTop == null) return 0.1;
      const inset = Math.max(0.01, evalField(fInset, s));
      return Math.max(0.02, zTop - inset);
    },

    floorY(s: number, z: number) {
      const depth = Math.max(0, evalField(fDepth, s));
      const yCL = deck.deckYCenter(s) - depth;

      const zBotAbs = this.floorZBotAbs(s);
      const a = clamp(Math.abs(z) / Math.max(1e-6, zBotAbs), 0, 1); // 0 center..1 edge

      const crown = evalField(fCrown, s);
      const rise = evalField(fRise, s);

      const bowl = crown * (1 - a * a);
      const edge = rise * (a * a);
      return yCL + bowl + edge;
    }
  } as CockpitEval;
}
```

### **3. Node: CockpitWallNode - COMPLETE IMPLEMENTATION**

#### **What the Wall Actually Is**

For each perimeter sample point on the outline (hole edge):

- Top ring point = (x, yTop, z)
- yTop should be the deck surface at that x,z (or slightly dropped by rim settings if you want)
- Bottom ring point = (x, yBot, zBot)
- zBot = sign(z) * floorZBotAbs(s)
- yBot = cockpitFloorEval.floorY(s, zBot)
- Then loft between them with H vertical segments.

#### **Type Definitions**

```typescript
type DirtyS = { sLo: number; sHi: number };
type DirtyRegion = { s?: DirtyS; reason?: string };

type BuildCtx = {
  state: any;
  scene: THREE.Scene;
  edit: { dragging: boolean };
};

type CockpitWallRuntime = {
  M: number;
  H: number;
  geom: THREE.BufferGeometry;
  mesh: THREE.Mesh;
  pos: Float32Array;
  uv: Float32Array;
  idx: Uint16Array | Uint32Array;
  polyIsCCW: boolean;
};
```

#### **Complete makeCockpitWallNode Implementation**

```typescript
export function makeCockpitWallNode(params: {
  id?: string;
  material: THREE.Material;       // set side = FrontSide for "inside normals" if winding correct
  lod: (ctx: BuildCtx) => { M: number; H: number }; // M perimeter samples, H vertical segments
  fillet?: { enabled: boolean; t0: number; strength: number }; // optional shaping
}) {
  const node: any = { id: params.id ?? "CockpitWallNode", runtime: undefined as CockpitWallRuntime | undefined };

  node.build = (ctx: BuildCtx) => {
    const { M, H } = params.lod(ctx);
    const V = M * (H + 1);

    const pos = new Float32Array(V * 3);
    const uv = new Float32Array(V * 2);

    const quadCount = M * H;      // wrap around perimeter
    const idxCount = quadCount * 6;
    const IndArr = (V > 65535) ? Uint32Array : Uint16Array;
    const idx = new IndArr(idxCount);

    // indices: for each perimeter segment k -> k+1, and vertical ring r -> r+1
    let t = 0;
    for (let r = 0; r < H; r++) {
      for (let k = 0; k < M; k++) {
        const k1 = (k + 1) % M;
        const a = r * M + k;
        const b = r * M + k1;
        const c = (r + 1) * M + k;
        const d = (r + 1) * M + k1;

        // Winding determines normal direction.
        // We want normals pointing INTO cockpit (inside normals).
        // This winding works if polygon orientation logic matches inward/outward.
        idx[t++] = a;
        idx[t++] = c;
        idx[t++] = b;
        idx[t++] = b;
        idx[t++] = c;
        idx[t++] = d;
      }
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geom.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
    geom.setIndex(new THREE.BufferAttribute(idx, 1));

    const mesh = new THREE.Mesh(geom, params.material);
    mesh.name = "cockpitWall";
    ctx.scene.add(mesh);

    node.runtime = { M, H, geom, mesh, pos, uv, idx, polyIsCCW: true };

    node.updateFast(ctx, { s: { sLo: 0, sHi: 1 }, reason: "init cockpit wall" });
    geom.computeVertexNormals();
  };

  node.updateFast = (ctx: BuildCtx, dirty: DirtyRegion) => {
    const rt = node.runtime as CockpitWallRuntime;
    if (!rt) return;

    const { state } = ctx;
    const poly = cockpitPolyXZ(state);
    if (!poly) return;

    rt.polyIsCCW = isCCW_XZ(poly);

    const res = resampleClosedPolyByArc(poly, rt.M);
    const deck = makeDeckEvaluator(ctx);
    const floor = makeCockpitFloorEvaluator(ctx);

    // OPTIONAL: only update perimeter points whose x maps into dirty.s
    // Simple approach: update all (still cheap for M ~ 256..1024)
    for (let k = 0; k < rt.M; k++) {
      const p = res[k];
      const tan = tangentAt(res, k);
      const { inward, outward } = inwardOutwardNormals2(rt.polyIsCCW, tan);

      const s = clamp(p.x / Math.max(1e-9, state.length), 0, 1);

      // TOP ring is at outline point (x,z = p.x,p.z)
      const yTop = deck.deckY(s, p.z);

      // BOTTOM ring is inset toward center, same x
      const zBotAbs = floor.floorZBotAbs(s);
      const zBot = Math.sign(p.z || 1) * zBotAbs;
      const yBot = floor.floorY(s, zBot);

      // shape the vertical profile (fillet etc.)
      for (let r = 0; r <= rt.H; r++) {
        const u = r / rt.H; // 0 top..1 bottom

        // base lerp
        let x = p.x;
        let z = lerp(p.z, zBot, u);
        let y = lerp(yTop, yBot, u);

        // Fillet band: pulls the upper portion slightly inward/outward to round the corner feel
        if (params.fillet?.enabled) {
          const t0 = params.fillet.t0;          // e.g. 0.25 (upper quarter)
          const sgn = 1;                        // if you want inward bias, use inward; outward for reverse
          if (u < t0) {
            const q = (u / t0);
            const ease = q * q * (3 - 2 * q);          // smoothstep
            const amt = params.fillet.strength * (1 - ease);
            // move slightly along inward normal to soften the wall-footprint at the rim
            x += inward.nx * amt * sgn;
            z += inward.nz * amt * sgn;
          }
        }

        const v = r * rt.M + k;
        rt.pos[3 * v + 0] = x;
        rt.pos[3 * v + 1] = y;
        rt.pos[3 * v + 2] = z;

        // UV: u around perimeter, v down wall
        rt.uv[2 * v + 0] = k / rt.M;
        rt.uv[2 * v + 1] = u;
      }
    }

    (rt.geom.getAttribute("position") as THREE.BufferAttribute).needsUpdate = true;
    (rt.geom.getAttribute("uv") as THREE.BufferAttribute).needsUpdate = true;

    // During drag: often skip normals or compute every N frames
    if (!ctx.edit.dragging) rt.geom.computeVertexNormals();
  };

  node.finalize = (ctx: BuildCtx) => {
    const rt = node.runtime as CockpitWallRuntime;
    if (!rt) return;
    rt.geom.computeVertexNormals();
  };

  return node;
}
```

#### **Inside-Normal Correctness (Practical Rule)**

You want the cockpit interior to shade correctly even with glossy fiberglass.

**Best-practice:**
- build the wall mesh with inside-pointing normals
- set material.side = THREE.FrontSide

If you ever find normals flipped:
- swap triangle order in indices OR set material.side = THREE.BackSide
- but do it once and keep it deterministic.

### **4. Node: CockpitRimNode - COMPLETE IMPLEMENTATION**

#### **Rim Profile Per Perimeter Sample**

At each perimeter point p:

- Evaluate rim fields at s = p.x/L:
  - w = rimWidth(s)
  - d = rimDrop(s)
  - r = rimRound(s) (used to place under points)
  - optionally u = rimUnderOverhang(s) (if you want extra outward under lip)
- We also need outward normal in xz at that point.

#### **Type Definitions**

```typescript
type CockpitRimRuntime = {
  M: number;
  // top mesh
  geomTop: THREE.BufferGeometry;
  meshTop: THREE.Mesh;
  posTop: Float32Array;
  uvTop: Float32Array;
  idxTop: Uint16Array | Uint32Array;

  // under mesh
  geomUnder: THREE.BufferGeometry;
  meshUnder: THREE.Mesh;
  posUnder: Float32Array;
  uvUnder: Float32Array;
  idxUnder: Uint16Array | Uint32Array;

  polyIsCCW: boolean;
};
```

#### **Complete makeCockpitRimNode Implementation**

```typescript
export function makeCockpitRimNode(params: {
  id?: string;
  materialTop: THREE.Material;
  materialUnder: THREE.Material;
  lod: (ctx: BuildCtx) => { M: number };
  // optional underside overhang multiplier
  underOverhang?: (s: number) => number; // meters
}) {
  const node: any = { id: params.id ?? "CockpitRimNode", runtime: undefined as CockpitRimRuntime | undefined };

  node.build = (ctx: BuildCtx) => {
    const { M } = params.lod(ctx);

    // ---- TOP mesh: 2 rings around perimeter => VTop = M*2
    const VTop = M * 2;
    const posTop = new Float32Array(VTop * 3);
    const uvTop = new Float32Array(VTop * 2);

    const idxTopCount = M * 6; // M quads * 2 tris
    const IndTop = (VTop > 65535) ? Uint32Array : Uint16Array;
    const idxTop = new IndTop(idxTopCount);

    let t = 0;
    for (let k = 0; k < M; k++) {
      const k1 = (k + 1) % M;
      const a = 0 * M + k;      // inner top
      const b = 0 * M + k1;
      const c = 1 * M + k;      // outer top
      const d = 1 * M + k1;

      // winding: choose consistent; top surface normals should point up-ish
      idxTop[t++] = a;
      idxTop[t++] = c;
      idxTop[t++] = b;
      idxTop[t++] = b;
      idxTop[t++] = c;
      idxTop[t++] = d;
    }

    const geomTop = new THREE.BufferGeometry();
    geomTop.setAttribute("position", new THREE.BufferAttribute(posTop, 3));
    geomTop.setAttribute("uv", new THREE.BufferAttribute(uvTop, 2));
    geomTop.setIndex(new THREE.BufferAttribute(idxTop, 1));

    const meshTop = new THREE.Mesh(geomTop, params.materialTop);
    meshTop.name = "cockpitRimTop";
    ctx.scene.add(meshTop);

    // ---- UNDER mesh: 3 rings => outer top, outer under, inner under (join toward wall)
    // You can add 4th ring for extra roundness if you like.
    const VU = M * 3;
    const posU = new Float32Array(VU * 3);
    const uvU = new Float32Array(VU * 2);

    const idxUCount = M * 12; // 2 quads (ring0-1 and ring1-2) => 4 tris per k => 12 indices
    const IndU = (VU > 65535) ? Uint32Array : Uint16Array;
    const idxU = new IndU(idxUCount);

    t = 0;
    for (let k = 0; k < M; k++) {
      const k1 = (k + 1) % M;

      // ring 0: outer top
      const a0 = 0 * M + k, b0 = 0 * M + k1;
      // ring 1: outer under
      const a1 = 1 * M + k, b1 = 1 * M + k1;
      // ring 2: inner under
      const a2 = 2 * M + k, b2 = 2 * M + k1;

      // quad (0->1)
      idxU[t++] = a0;
      idxU[t++] = a1;
      idxU[t++] = b0;
      idxU[t++] = b0;
      idxU[t++] = a1;
      idxU[t++] = b1;

      // quad (1->2)
      idxU[t++] = a1;
      idxU[t++] = a2;
      idxU[t++] = b1;
      idxU[t++] = b1;
      idxU[t++] = a2;
      idxU[t++] = b2;
    }

    const geomUnder = new THREE.BufferGeometry();
    geomUnder.setAttribute("position", new THREE.BufferAttribute(posU, 3));
    geomUnder.setAttribute("uv", new THREE.BufferAttribute(uvU, 2));
    geomUnder.setIndex(new THREE.BufferAttribute(idxU, 1));

    const meshUnder = new THREE.Mesh(geomUnder, params.materialUnder);
    meshUnder.name = "cockpitRimUnder";
    ctx.scene.add(meshUnder);

    node.runtime = {
      M,
      geomTop, meshTop, posTop, uvTop, idxTop,
      geomUnder, meshUnder, posUnder: posU, uvUnder: uvU, idxUnder: idxU,
      polyIsCCW: true
    };

    node.updateFast(ctx, { s: { sLo: 0, sHi: 1 }, reason: "init rim" });
    geomTop.computeVertexNormals();
    geomUnder.computeVertexNormals();
  };

  node.updateFast = (ctx: BuildCtx) => {
    const rt = node.runtime as CockpitRimRuntime;
    if (!rt) return;

    const { state } = ctx;
    const poly = cockpitPolyXZ(state);
    if (!poly) return;

    rt.polyIsCCW = isCCW_XZ(poly);

    const res = resampleClosedPolyByArc(poly, rt.M);
    const deck = makeDeckEvaluator(ctx);

    const fW = state.fields["cockpitRimWidth"];
    const fD = state.fields["cockpitRimDrop"];
    const fR = state.fields["cockpitRimRound"];

    for (let k = 0; k < rt.M; k++) {
      const p = res[k];
      const tan = tangentAt(res, k);
      const { outward, inward } = inwardOutwardNormals2(rt.polyIsCCW, tan);

      const s = clamp(p.x / Math.max(1e-9, state.length), 0, 1);

      const w = Math.max(0.005, evalField(fW, s));
      const d = Math.max(0.001, evalField(fD, s));
      const r = Math.max(0.0, evalField(fR, s));
      const uOver = params.underOverhang ? params.underOverhang(s) : (0.25 * w); // mild default

      // INNER TOP = boundary at deck surface
      const x0 = p.x;
      const z0 = p.z;
      const y0 = deck.deckY(s, z0);

      // OUTER TOP = outward by rim width, still on deck surface (sample deck at shifted z)
      const x1 = x0 + outward.nx * w;
      const z1 = z0 + outward.nz * w;
      const y1 = deck.deckY(s, z1);

      // UNDER OUTER = drop down + maybe extra under overhang
      const x2 = x1 + outward.nx * uOver;
      const z2 = z1 + outward.nz * uOver;
      const y2 = y1 - d;

      // UNDER INNER = toward inner edge + slight rounding influence
      // This is where you decide how the rim meets the wall.
      const x3 = x0 + inward.nx * (0.15 * w);  // small inward tuck
      const z3 = z0 + inward.nz * (0.15 * w);
      const y3 = y0 - (d * 0.85) - r;        // rounding pulls it down slightly

      // ---- write TOP mesh rings (inner top, outer top)
      const vInner = 0 * rt.M + k;
      const vOuter = 1 * rt.M + k;

      rt.posTop[3 * vInner + 0] = x0;
      rt.posTop[3 * vInner + 1] = y0;
      rt.posTop[3 * vInner + 2] = z0;
      rt.posTop[3 * vOuter + 0] = x1;
      rt.posTop[3 * vOuter + 1] = y1;
      rt.posTop[3 * vOuter + 2] = z1;

      rt.uvTop[2 * vInner + 0] = k / rt.M;
      rt.uvTop[2 * vInner + 1] = 0;
      rt.uvTop[2 * vOuter + 0] = k / rt.M;
      rt.uvTop[2 * vOuter + 1] = 1;

      // ---- write UNDER mesh rings: outer top, outer under, inner under
      const u0 = 0 * rt.M + k;
      const u1 = 1 * rt.M + k;
      const u2 = 2 * rt.M + k;

      rt.posUnder[3 * u0 + 0] = x1;
      rt.posUnder[3 * u0 + 1] = y1;
      rt.posUnder[3 * u0 + 2] = z1;
      rt.posUnder[3 * u1 + 0] = x2;
      rt.posUnder[3 * u1 + 1] = y2;
      rt.posUnder[3 * u1 + 2] = z2;
      rt.posUnder[3 * u2 + 0] = x3;
      rt.posUnder[3 * u2 + 1] = y3;
      rt.posUnder[3 * u2 + 2] = z3;

      rt.uvUnder[2 * u0 + 0] = k / rt.M;
      rt.uvUnder[2 * u0 + 1] = 0;
      rt.uvUnder[2 * u1 + 0] = k / rt.M;
      rt.uvUnder[2 * u1 + 1] = 0.5;
      rt.uvUnder[2 * u2 + 0] = k / rt.M;
      rt.uvUnder[2 * u2 + 1] = 1;
    }

    (rt.geomTop.getAttribute("position") as THREE.BufferAttribute).needsUpdate = true;
    (rt.geomTop.getAttribute("uv") as THREE.BufferAttribute).needsUpdate = true;

    (rt.geomUnder.getAttribute("position") as THREE.BufferAttribute).needsUpdate = true;
    (rt.geomUnder.getAttribute("uv") as THREE.BufferAttribute).needsUpdate = true;

    if (!ctx.edit.dragging) {
      rt.geomTop.computeVertexNormals();
      rt.geomUnder.computeVertexNormals();
    }
  };

  node.finalize = (ctx: BuildCtx) => {
    const rt = node.runtime as CockpitRimRuntime;
    if (!rt) return;
    rt.geomTop.computeVertexNormals();
    rt.geomUnder.computeVertexNormals();
  };

  return node;
}
```

#### **Why This Preserves a Sharp Break**

Because rimTop and rimUnder do not share vertices, Three.js will not average normals across the edge. You get the crisp highlight line automatically.

### **5. "Consistent Inside Normals" — The Definitive Rule Set**

You now have two relevant normal directions:

- Inward (toward cockpit interior)
- Outward (toward deck / exterior)

From polygon orientation + tangent:

- If polygon is CCW, then:
  - inward = leftNormal(tangent)
  - outward = rightNormal(tangent)
- If polygon is CW, swapped.

**Practical application:**

- CockpitWall: build winding so vertex normals point inward, use FrontSide.
- RimTop: normals should be mostly up; FrontSide.
- RimUnder: normals should point down/out depending on your shape; if it flips, you can either:
  - swap index winding in idxU, or
  - set materialUnder.side = DoubleSide temporarily while tuning
- Once tuned, keep it deterministic (don't rely on DoubleSide unless you want translucent thin-lip behavior).

### **6. Where You'll Likely Want One More "Micro-Node"**

If you want the wall-to-floor join to feel perfect (Laser cockpit does), add a tiny node:

- CockpitWallFootFilletNode: a 2–3 ring band that rounds the intersection line and hides any tiny mismatch between floor edge and wall base.

But you can also fold that into CockpitWallNode by adding a second profile shaping near u≈1 (bottom).

### **7. The "Join Contract": One Authoritative Cockpit Seam, Zero Cracks, Ever**

**Cracks happen when different nodes "approximate" the same boundary differently:**

- floor uses maxAbsZAtX + inset
- wall uses resampled outline
- rim offsets outward/inward with its own math
- deck hole uses a coarse inside test

**So we enforce a single authoritative seam function that all cockpit nodes use.**

#### **Core Principle**

Every node must derive its boundary points from the same CockpitEdgeSampler. No node is allowed to "infer" the edge independently.

#### **1) Define the Seam Object: CockpitEdgeSampler**

It provides:
- consistent perimeter sampling (arc-length)
- consistent tangent + inward/outward normals
- mapping each perimeter point to s and station info
- "inner edge on deck" point
- "floor edge" point (after inset)
- precomputed rim offsets (outer top, under points)
- parameterization u around perimeter (0..1)

#### **Type Definitions**

```typescript
type EdgeFrame = {
  k: number;        // perimeter sample index
  u: number;        // k/M
  s: number;        // x/L clamped
  x: number;
  zInnerTop: number;
  yInnerTop: number;

  // 2D frame in XZ
  tan: { dx: number; dz: number };
  inward: { nx: number; nz: number };
  outward: { nx: number; nz: number };

  // floor boundary (post-inset)
  zFloorEdge: number;   // same sign as zInnerTop
  yFloorEdge: number;

  // optional: rim precomputed points (for perfect joins)
  rimOuterTop?: { x: number; y: number; z: number };
  rimOuterUnder?: { x: number; y: number; z: number };
  rimInnerUnder?: { x: number; y: number; z: number };
};

type CockpitEdgeSampler = {
  M: number;
  frames: EdgeFrame[];         // length M
  polyIsCCW: boolean;
  // find k-range that intersects a DirtyS quickly (optional)
  kRangeForDirtyS: (sLo: number, sHi: number) => { k0: number; k1: number };
};
```

#### **2) Build the Sampler Once Per Rebuild Pass**

You rebuild it when:
- cockpit outline changes
- deck evaluator changes (fields affecting deck shape)
- cockpit floor inset/depth fields change
- LOD M changes

Not on pan/zoom.

#### **Complete buildCockpitEdgeSampler Implementation**

```typescript
function buildCockpitEdgeSampler(ctx: any, M: number): CockpitEdgeSampler | null {
  const { state } = ctx;
  const poly = cockpitPolyXZ(state);
  if (!poly) return null;

  const polyIsCCW = isCCW_XZ(poly);
  const res = resampleClosedPolyByArc(poly, M);

  const deck = makeDeckEvaluator(ctx);
  const floor = makeCockpitFloorEvaluator(ctx);

  // rim fields (optional; used if you want sampler to provide rim points)
  const fW = state.fields["cockpitRimWidth"];
  const fD = state.fields["cockpitRimDrop"];
  const fR = state.fields["cockpitRimRound"];
  const fU = state.fields["cockpitRimUnderOverhang"]; // optional

  const frames: EdgeFrame[] = [];

  for (let k = 0; k < M; k++) {
    const p = res[k];
    const tan = tangentAt(res, k);
    const { inward, outward } = inwardOutwardNormals2(polyIsCCW, tan);

    const s = clamp(p.x / Math.max(1e-9, state.length), 0, 1);

    // authoritative inner-top point: the cockpit cut edge on deck
    const yInnerTop = deck.deckY(s, p.z);

    // authoritative floor edge at same station, but using floor inset boundary
    const zBotAbs = floor.floorZBotAbs(s);
    const zFloorEdge = Math.sign(p.z || 1) * zBotAbs;
    const yFloorEdge = floor.floorY(s, zFloorEdge);

    const fr: EdgeFrame = {
      k, u: k / M,
      s,
      x: p.x,
      zInnerTop: p.z,
      yInnerTop,
      tan, inward, outward,
      zFloorEdge,
      yFloorEdge
    };

    // Optional: precompute rim points so rim + wall join is perfect
    if (fW && fD) {
      const w = Math.max(0.005, evalField(fW, s));
      const d = Math.max(0.001, evalField(fD, s));
      const r = fR ? Math.max(0, evalField(fR, s)) : 0;
      const uOver = fU ? Math.max(0, evalField(fU, s)) : (0.25 * w);

      // outer top (rim)
      const x1 = fr.x + outward.nx * w;
      const z1 = fr.zInnerTop + outward.nz * w;
      const y1 = deck.deckY(s, z1);

      // outer under
      const x2 = x1 + outward.nx * uOver;
      const z2 = z1 + outward.nz * uOver;
      const y2 = y1 - d;

      // inner under (joins toward wall)
      const x3 = fr.x + inward.nx * (0.15 * w);
      const z3 = fr.zInnerTop + inward.nz * (0.15 * w);
      const y3 = fr.yInnerTop - (d * 0.85) - r;

      fr.rimOuterTop = { x: x1, y: y1, z: z1 };
      fr.rimOuterUnder = { x: x2, y: y2, z: z2 };
      fr.rimInnerUnder = { x: x3, y: y3, z: z3 };
    }

    frames.push(fr);
  }

  // Optional: dirty mapping (simple but effective)
  const kRangeForDirtyS = (sLo: number, sHi: number) => {
    // pick all k where fr.s overlaps, with pad
    let k0 = M, k1 = 0;
    for (let k = 0; k < M; k++) {
      const s = frames[k].s;
      if (s >= sLo && s <= sHi) {
        k0 = Math.min(k0, k);
        k1 = Math.max(k1, k);
      }
    }
    if (k0 > M - 1) return { k0: 0, k1: M - 1 }; // none found -> update all
    const pad = 6;
    return { k0: (k0 - pad + M) % M, k1: (k1 + pad) % M };
  };

  return { M, frames, polyIsCCW, kRangeForDirtyS };
}
```

#### **3) The Contract: "All Cockpit Nodes Use Sampler Frames"**

##### **3.1 CockpitWallNode Rewrite (Seam-Perfect)**

Instead of rebuilding your own resample/tangent/deck/floor, the wall node receives sampler.

- top ring = innerTop
- bottom ring = floorEdge
- you can shape in between, but endpoints must be identical

```typescript
function updateCockpitWallFromSampler(rt: any, sampler: CockpitEdgeSampler) {
  const { M, H } = rt;
  const frs = sampler.frames;

  for (let k = 0; k < M; k++) {
    const fr = frs[k];

    const xTop = fr.x;
    const zTop = fr.zInnerTop;
    const yTop = fr.yInnerTop;

    const xBot = fr.x;
    const zBot = fr.zFloorEdge;
    const yBot = fr.yFloorEdge;

    for (let r = 0; r <= H; r++) {
      const u = r / H;
      const x = lerp(xTop, xBot, u);
      const z = lerp(zTop, zBot, u);
      const y = lerp(yTop, yBot, u);

      const v = r * M + k;
      rt.pos[3 * v + 0] = x;
      rt.pos[3 * v + 1] = y;
      rt.pos[3 * v + 2] = z;
    }
  }
}
```

Now the wall meets both deck cut and floor edge exactly.

##### **3.2 CockpitFloorNode Rewrite (Seam-Perfect)**

Floor boundary ring at each station should match zFloorEdge and yFloorEdge. If your floor grid is built by "z spans", ensure the outermost column equals that boundary.

**Simple method:**
- When computing each station row i, use zBotAbs = floor.floorZBotAbs(s).
- For j=0 and j=K-1, z = ±zBotAbs and y = floorY(s,z)
- This matches seam automatically.

But if you want exact join to sampler:
- find nearest perimeter frame at that x and take zFloorEdge sign-consistent
- Usually the analytic evaluator is enough because sampler uses the same evaluator.

##### **3.3 CockpitRimNode Rewrite (Seam-Perfect)**

Rim node should only use:
- fr.x, fr.zInnerTop, fr.yInnerTop
- and precomputed rim points if provided:
  - fr.rimOuterTop, fr.rimOuterUnder, fr.rimInnerUnder

Then rim always matches wall at inner-top edge and under edge.

#### **4) Where Does the Sampler Live? A Tiny "Meta Node"**

Add a dedicated node: CockpitEdgeSamplerNode

**Outputs:**
- meta.cockpitEdgeSampler

**Deps:**
- cockpit outline mask
- deck fields
- cockpit depth/inset fields
- rim fields (optional)

**During drag:**
- you may rebuild sampler only in dirty s band (optional), but rebuilding full M is usually cheap.

```typescript
type CockpitEdgeSamplerRuntime = { sampler: CockpitEdgeSampler | null; M: number };

function makeCockpitEdgeSamplerNode(params: {
  id?: string;
  lod: (ctx: any) => { M: number };
}) {
  const node: any = { id: params.id ?? "CockpitEdgeSamplerNode", runtime: undefined as CockpitEdgeSamplerRuntime | undefined };

  node.build = (ctx: any) => {
    const { M } = params.lod(ctx);
    node.runtime = { M, sampler: buildCockpitEdgeSampler(ctx, M) };
  };

  node.updateFast = (ctx: any, dirty: any) => {
    const rt = node.runtime as CockpitEdgeSamplerRuntime;
    const { M } = params.lod(ctx);
    if (M !== rt.M) {
      rt.M = M;
      rt.sampler = buildCockpitEdgeSampler(ctx, M);
      return;
    }
    // simplest: rebuild full sampler (fast enough for M<=1024)
    rt.sampler = buildCockpitEdgeSampler(ctx, rt.M);
  };

  node.finalize = (ctx: any) => {
    const rt = node.runtime as CockpitEdgeSamplerRuntime;
    rt.sampler = buildCockpitEdgeSampler(ctx, rt.M);
  };

  return node;
}
```

Then: CockpitWallNode, CockpitRimNode, DeckHoleIndexNode depend on this meta output.

#### **5) DeckHoleIndexNode Uses Sampler Too (Important!)**

The deck hole should match the inner-top seam.

Instead of rebuilding polygon from fields each time, you can:
- build polygon directly from sampler.frames inner-top points: (x, zInnerTop)
- That guarantees the hole boundary matches the wall/rim seam.

```typescript
function cockpitPolyFromSampler(sampler: CockpitEdgeSampler): XZ[] {
  return sampler.frames.map(fr => ({ x: fr.x, z: fr.zInnerTop }));
}
```

Now every subsystem is referencing the same boundary.

#### **6) The "No-Crack Guarantee"**

If all these are true, cracks cannot occur:

- Deck cut boundary uses polygon from sampler inner-top
- Wall top ring uses sampler inner-top
- Rim inner edge uses sampler inner-top
- Floor boundary uses same floorZBotAbs/floorY evaluator as sampler (or sampler's floor edge directly)

Then even if fields go wild, everything still stitches.

#### **7) Bonus: Bottom View + Internal Frames Compatibility**

This contract scales:
- For a car fender cut: "fender seam sampler"
- For aircraft ribs: "rib perimeter sampler"
- For building wall openings: "aperture sampler"

Every "hole+rim+wall" system becomes the same archetype.

**[END:TAG:COCKPIT_IMPL]**

---

## 8. GEOMETRY HELPERS

**[TAG:GEOMETRY] [TAG:FEATURE_NODE]**

### **Polygon Orientation & Normals**

**Type Definitions**:
```typescript
type XZ = { x: number; z: number };
```

**Functions**:

```typescript
function polySignedAreaXZ(poly: XZ[]): number {
  // Shoelace formula in (x,z) plane
  let a = 0;
  for (let i = 0; i < poly.length; i++) {
    const p = poly[i];
    const q = poly[(i + 1) % poly.length];
    a += (p.x * q.z - q.x * p.z);
  }
  return 0.5 * a;
}

function isCCW_XZ(poly: XZ[]): boolean {
  return polySignedAreaXZ(poly) > 0;
}

function normalize2(dx: number, dz: number): { dx: number; dz: number } {
  const l = Math.hypot(dx, dz) || 1;
  return { dx: dx / l, dz: dz / l };
}

function leftNormal2(t: { dx: number; dz: number }): { nx: number; nz: number } {
  return { nx: -t.dz, nz: t.dx };
}

function rightNormal2(t: { dx: number; dz: number }): { nx: number; nz: number } {
  return { nx: t.dz, nz: -t.dx };
}

function inwardOutwardNormals2(
  polyIsCCW: boolean,
  t: { dx: number; dz: number }
): { inward: { nx: number; nz: number }; outward: { nx: number; nz: number } } {
  const L = leftNormal2(t);
  const R = rightNormal2(t);
  const inward = polyIsCCW ? L : R;
  const outward = polyIsCCW ? R : L;
  return { inward, outward };
}
```

**Rule**: For CCW boundary, interior is on LEFT side of traversal.

### **Arc-Length Resample**

**Purpose**: Stable "even" perimeter sampling - makes rims/walls look clean and LOD-friendly.

```typescript
function resampleClosedPolyByArc(poly: XZ[], M: number): XZ[] {
  // Returns M points evenly spaced by arc length
  const n = poly.length;
  const segLen = new Array(n).fill(0);
  let total = 0;
  
  // Compute segment lengths
  for (let i = 0; i < n; i++) {
    const a = poly[i];
    const b = poly[(i + 1) % n];
    const L = Math.hypot(b.x - a.x, b.z - a.z);
    segLen[i] = L;
    total += L;
  }
  total = Math.max(1e-9, total);
  
  // Cumulative lengths
  const cum = new Array(n + 1).fill(0);
  for (let i = 0; i < n; i++) {
    cum[i + 1] = cum[i] + segLen[i];
  }
  
  // Resample
  const out: XZ[] = [];
  for (let k = 0; k < M; k++) {
    const d = (k / M) * total;
    
    // Find segment
    let i = 0;
    while (i < n - 1 && cum[i + 1] < d) i++;
    const a = poly[i];
    const b = poly[(i + 1) % n];
    
    // Interpolate
    const t = (d - cum[i]) / Math.max(1e-9, segLen[i]);
    out.push({
      x: a.x + (b.x - a.x) * t,
      z: a.z + (b.z - a.z) * t
    });
  }
  
  return out;
}
```

### **Tangent Calculation**

**Purpose**: Compute tangent at resampled point using central difference.

```typescript
function tangentAt(resampled: XZ[], k: number): { dx: number; dz: number } {
  const M = resampled.length;
  const p0 = resampled[(k - 1 + M) % M];
  const p1 = resampled[(k + 1) % M];
  return normalize2(p1.x - p0.x, p1.z - p0.z);
}
```

**[END:TAG:GEOMETRY]**

---

## 9. INTEGRATION POINTS

**[TAG:INTEGRATION] [TAG:FEATURE_NODE]**

### **Integration with Base Mesh Generator (Step 2)**

**Requirements**:
- Base mesh must have (u, s) attributes stored
- Mesh topology must support feature application
- Caches must be available for evaluation

**Flow**:
```
Base Mesh Generator (Step 2)
  → Base mesh with (u, s) attributes
  → Feature Node System (Step 3)
  → Feature-modified geometry
```

### **Integration with SVG Diagram Editor**

**SVG Handles**:
- Features expose handles for SVG overlay
- Handles appear in TOP/SIDE/FRONT orthographic views
- User manipulates handles → updates feature params

**Flow**:
```
SVG Editor
  → Handle manipulation
  → Feature param update
  → Mask recomputation
  → Operation reapplication
  → Geometry update
```

### **Integration with Deform Pipeline**

**Stage Ordering**:
- Features execute in defined stages
- Stages: after_base → after_cutouts → before_finish
- Features within stage execute in dependency order

### **Integration with LOD System**

**LOD-Aware Features**:
- Features use (u, s) masks (stable across LOD)
- Feature resolution can adapt to LOD
- Cockpit nodes: M and H parameters from LOD policy

**[END:TAG:INTEGRATION]**

---

## 10. PERFORMANCE CHARACTERISTICS

**[TAG:PERFORMANCE] [TAG:FEATURE_NODE]**

### **Mask Computation Performance**

**Complexity**:
- Per-vertex mask evaluation: O(V) where V = vertex count
- Primitive evaluation: O(1) per vertex per primitive
- Boolean operations: O(1) per vertex

**Optimization**:
- Early exit if mask is zero (skip operation)
- Spatial acceleration for distance queries
- Cache mask fields when possible

### **Operation Application Performance**

**Complexity**:
- Per-vertex operation: O(V)
- Geometry update: O(V)
- Normal recomputation: O(V) or deferred

**Optimization**:
- Dirty region updates (only update affected vertices)
- Deferred normal computation (compute on finalize)
- GPU acceleration for parallel operations (future)

### **Pipeline Compilation Performance**

**Complexity**:
- Graph compilation: O(N + E) where N = nodes, E = edges
- Topological sort: O(N + E)
- Validation: O(N + E)

**Optimization**:
- Incremental compilation (only recompile changed subgraph)
- Cache compiled pipeline

**[END:TAG:PERFORMANCE]**

---

## 11. FILE DEPENDENCY GRAPH

**[TAG:DEPS] [TAG:FEATURE_NODE]**

```
Feature Node System (Architecture)
  │
  ├─→ modelmaker.txt (Step 3 specification)
  │   ├─→ Lines 1307-1746: Feature Node System
  │   └─→ Lines 14156-14813: Cockpit Assembly Nodes
  │
  ├─→ Base Mesh Generator (Step 2)
  │   └─→ Provides: Base mesh with (u, s) attributes
  │
  ├─→ Mask Field Subsystem
  │   ├─→ Mask primitives
  │   ├─→ Boolean operations
  │   └─→ Falloff shaping
  │
  ├─→ Operation Implementations
  │   ├─→ PatchDisplace
  │   ├─→ RecessCut
  │   ├─→ CreaseLine
  │   ├─→ WarpField
  │   └─→ BossHole
  │
  └─→ Geometry Helpers
      ├─→ Polygon orientation
      ├─→ Arc-length resample
      └─→ Tangent calculation
```

**[END:TAG:DEPS]**

---

## 12. TYPE FLOW MAP

**[TAG:TYPES] [TAG:FEATURE_NODE]**

### **Type Flow**

```
FeatureNodeContract (Definition)
  ↓
FeatureNode (Instance)
  ↓
Mask Field Computation
  ↓
Float32Array (mask values)
  ↓
Operation Application
  ↓
THREE.BufferGeometry (modified)
  ↓
THREE.Mesh (rendered)
```

### **Parameter Flow**

```
User Input (SVG/Gizmo)
  ↓
Feature Params Update
  ↓
Mask Recomputation
  ↓
Operation Reapplication
  ↓
Geometry Update
  ↓
Scene Re-render
```

**[END:TAG:TYPES]**

---

## 13. STATE MANAGEMENT

**[TAG:STATE_MGMT] [TAG:FEATURE_NODE]**

### **Feature Graph State**

```typescript
interface FeatureGraphState {
  nodes: FeatureNodeContract[];
  enabled: Set<string>;           // Enabled node IDs
  order: Map<string, number>;      // Node order within stages
  stages: string[];                // Stage order
}
```

### **Runtime State**

```typescript
interface FeatureNodeRuntime {
  geometry?: THREE.BufferGeometry;
  mesh?: THREE.Mesh;
  mask?: Float32Array;
  dirty?: DirtyRegion;
}
```

### **Build Context**

```typescript
interface BuildContext {
  state: ParametricState;          // Parametric model state
  scene: THREE.Scene;              // Three.js scene
  edit: { dragging: boolean };     // Edit state
  cache: {
    baseGeometry: THREE.BufferGeometry;
    mesh: { vertices: Vertex[] };
    // ... other caches
  };
}
```

**[END:TAG:STATE_MGMT]**

---

## 14. RELATIONSHIP MATRIX

**[TAG:RELATIONS] [TAG:FEATURE_NODE]**

### **System Relationships**

| System | Relationship | Data Flow |
|--------|-------------|-----------|
| Base Mesh Generator | Provides base | Base mesh with (u, s) attributes → Feature nodes |
| Mask Field Subsystem | Core component | Mask spec → Mask field computation → Mask values |
| Operation System | Core component | Operation spec + Mask → Geometry modification |
| SVG Diagram Editor | User interface | User input → Feature params → Mask/Operation update |
| LOD System | Integration | LOD policy → Feature resolution → Geometry quality |
| Deform Pipeline | Integration | Feature nodes → Pipeline passes → Final geometry |

### **Feature Type Relationships**

| Feature Type | Uses Mask | Uses Operation | Typical Stage |
|-------------|-----------|----------------|---------------|
| PatchDisplace | Ellipse/Box | NormalOffset | after_base |
| RecessCut | Box/Curve | Recess + Rim | after_base |
| CreaseLine | Distance-to-curve | NormalPinch + Displace | after_base |
| WarpField | Ellipse/Box | VectorField | after_cutouts |
| BossHole | Ellipse/Box | Extrusion/Subtraction | after_cutouts |

**[END:TAG:RELATIONS]**

---

## 📝 NEXT STEPS

**Phase 1 Complete:**
- ✅ Feature node contract specification documented
- ✅ Mask field subsystem documented
- ✅ 5 core feature types documented
- ✅ Cockpit assembly nodes documented
- ✅ Geometry helpers documented

**Phase 2 Planned:**
- ⏳ Implementation of feature node system
- ⏳ SVG handle system implementation
- ⏳ Gizmo system implementation
- ⏳ Feature graph UI (diagram editor)

**Phase 3 Planned:**
- ⏳ Additional feature node types
- ⏳ Feature node library/presets
- ⏳ Feature node versioning
- ⏳ Feature node export/import

---

**Status:** PHASE 1 - Foundation System Mapping  
**Confidence:** 0.95 (Very High - Comprehensive specification from modelmaker.txt)  
**Next:** Implement feature node system based on this specification



---


---

<!-- AUTO-GENERATED FROM: MASTER_METRICS_FITTING_LOOP_SYSTEM_MAP.md -->
<!-- DO NOT EDIT THIS SECTION DIRECTLY -->
<!-- Source File: MASTER_METRICS_FITTING_LOOP_SYSTEM_MAP.md -->
<!-- File Size: 50986 bytes -->

<a id='metrics-fitting-loop-system-map'></a>

# MASTER METRICS + FITTING LOOP SYSTEM MAP
**Complete System Anatomy Mapping - Metrics + Fitting Loop System (Step 4)**

**Date:** 2025-01-27  
**Version:** 1.0.0  
**Purpose:** Complete S.A.M. documentation for Metrics + Fitting Loop System (modelmaker.txt Step 4)  
**Status:** PHASE 1 - Foundation System Mapping  
**System:** Lucid Image Editor - Universal Parametric Asset Engine  
**Reference:** modelmaker.txt Step 4 (Lines 1747-2163)

---

## 📋 TABLE OF CONTENTS

1. [System Overview](#1-system-overview)
2. [Fitting Philosophy](#2-fitting-philosophy)
3. [OrthoRenderPack System](#3-orthorenderpack-system)
4. [Silhouette Extraction](#4-silhouette-extraction)
5. [Reference Silhouette Extraction](#5-reference-silhouette-extraction)
6. [Error Metrics](#6-error-metrics)
7. [Keypoints System](#7-keypoints-system)
8. [Optimization Strategy](#8-optimization-strategy)
9. [Bounded Patch Format](#9-bounded-patch-format)
10. [UI Design Specifications](#10-ui-design-specifications)
11. [Integration Points](#11-integration-points)
12. [Performance Characteristics](#12-performance-characteristics)
13. [File Dependency Graph](#13-file-dependency-graph)
14. [Type Flow Map](#14-type-flow-map)
15. [State Management](#15-state-management)
16. [Relationship Matrix](#16-relationship-matrix)

---

## 1. SYSTEM OVERVIEW

**[TAG:OVERVIEW] [TAG:FITTING_LOOP]**

### **What is the Metrics + Fitting Loop System?**

The Metrics + Fitting Loop system transforms the parametric asset engine from "editable" into "self-correcting." It enables automatic fitting of parametric models to orthographic reference images through an iterative optimization loop.

**Location:** Architecture defined in modelmaker.txt Step 4  
**Purpose:** Make ortho packs become "geometry unit tests"  
**Core Principle:** Ortho cameras are ground truth, ReferencePack scale bars define meters

### **Key Responsibilities**

1. **Orthographic Rendering**: Render model in true orthographic views (top/side/front/rear)
2. **Silhouette Extraction**: Extract silhouettes + keypoints from renders
3. **Reference Comparison**: Compare against calibrated ReferencePack underlays
4. **Error Computation**: Compute error curves in meters
5. **Parameter Optimization**: Propose and apply bounded parameter patches
6. **Convergence Loop**: Repeat until error converges

### **Core Principles**

- **Ortho cameras are ground truth**: No perspective distortion
- **ReferencePack scale bars define meters**: Precise metric calibration
- **Typed action space**: Only optimize within allowed parameter space
- **Trust hierarchy**: Top view dominates width, Side view dominates height
- **Multi-scale fitting**: Stage-based optimization prevents feature fighting

### **Goal Statement**

**Build a loop that can:**

1. Render your model in true orthographic views (top/side/front/rear)
2. Extract silhouettes + keypoints from those renders
3. Compare them against the calibrated ReferencePack underlays
4. Compute error curves in meters
5. Propose and apply a bounded parameter patch (human or LLM)
6. Repeat until error converges

**Everything that follows (cars, helicopters, buildings) becomes the same pipeline.**

**[END:TAG:OVERVIEW]**

---

## 2. FITTING PHILOSOPHY

**[TAG:PHILOSOPHY] [TAG:FITTING_LOOP]**

### **Hard Constraints**

**Ortho cameras are ground truth.**

**ReferencePack scale bars define meters.**

**You optimize only within your typed action space:**

- spline control points for B(u), K(u), D(u)
- section-style params (bow/mid/stern stations)
- feature node params (local edits)
- enable/disable nodes

### **Trust Hierarchy (Prevents Drift)**

**Top view dominates width** → fit B(u) primarily from TOP

**Side view dominates height** → fit K(u) and D(u) primarily from SIDE

**Front/Rear dominate section style** → fit SectionParams(u) primarily from FRONT/REAR

**If conflicts exist, you don't average blindly—you obey the hierarchy.**

### **Why This Matters**

This hierarchy prevents:
- Global drift (whole model shifting)
- Feature fighting (optimization oscillating)
- Ambiguity in multi-view fitting
- Loss of model identity

**The hierarchy is absolute and universal** - applies to boats, cars, helicopters, buildings.

**[END:TAG:PHILOSOPHY]**

---

## 3. ORTHORENDERPACK SYSTEM

**[TAG:ORTHO_RENDER] [TAG:FITTING_LOOP]**

### **What is OrthoRenderPack?**

OrthoRenderPack is a standardized render output that converts your model into images in metric space, matching the ReferencePack calibration system.

**Purpose:** Generate model renders that can be directly compared against ReferencePack underlays in the same metric space.

### **Render Specification**

**For each view V ∈ {top, side, front, rear} render into an offscreen target:**

#### **Resolution**

- **Start at:** 1024×1024 (plenty; 512 also works)
- **Rationale:** High enough for accurate silhouette extraction, not too expensive

#### **Flat Shader**

**Requirements:**
- hull/body = solid white
- background = transparent
- disable lighting, textures, post-processing
- output should contain only silhouette geometry (optionally include separate pass for deck vs hull)

**Why:** Silhouette extraction is easiest from a binary alpha mask.

### **Three.js Implementation Pattern**

```typescript
type OrthoRenderPack = {
  top: ImageData;      // 1024×1024 RGBA
  side: ImageData;    // 1024×1024 RGBA
  front: ImageData;   // 1024×1024 RGBA
  rear: ImageData;    // 1024×1024 RGBA
  metadata: {
    resolution: { width: number; height: number };
    cameraFrustums: {
      top: { left: number; right: number; top: number; bottom: number };
      side: { left: number; right: number; top: number; bottom: number };
      front: { left: number; right: number; top: number; bottom: number };
      rear: { left: number; right: number; top: number; bottom: number };
    };
    metersPerPixel: {
      top: { x: number; y: number };
      side: { x: number; y: number };
      front: { x: number; y: number };
      rear: { x: number; y: number };
    };
  };
};
```

### **Render Setup**

```typescript
function setupOrthoRenderTarget(
  view: "top" | "side" | "front" | "rear",
  resolution: number = 1024
): THREE.WebGLRenderTarget {
  const rt = new THREE.WebGLRenderTarget(resolution, resolution, {
    format: THREE.RGBAFormat,
    type: THREE.UnsignedByteType,
    generateMipmaps: false
  });
  return rt;
}

function setupOrthoCamera(
  view: "top" | "side" | "front" | "rear",
  frustum: { left: number; right: number; top: number; bottom: number }
): THREE.OrthographicCamera {
  const camera = new THREE.OrthographicCamera(
    frustum.left,
    frustum.right,
    frustum.top,
    frustum.bottom,
    0.1,
    1000.0
  );
  
  // Position camera based on view
  switch (view) {
    case "top":
      camera.position.set(0, 10, 0);
      camera.lookAt(0, 0, 0);
      camera.up.set(0, 0, -1);
      break;
    case "side":
      camera.position.set(0, 0, 10);
      camera.lookAt(0, 0, 0);
      break;
    case "front":
      camera.position.set(10, 0, 0);
      camera.lookAt(0, 0, 0);
      break;
    case "rear":
      camera.position.set(-10, 0, 0);
      camera.lookAt(0, 0, 0);
      break;
  }
  
  return camera;
}
```

### **Flat Shader Material**

```typescript
const flatShaderMaterial = new THREE.ShaderMaterial({
  uniforms: {
    color: { value: new THREE.Color(1, 1, 1) } // White
  },
  vertexShader: `
    void main() {
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 color;
    void main() {
      gl_FragColor = vec4(color, 1.0);
    }
  `,
  side: THREE.DoubleSide
});
```

### **Render Function**

```typescript
function renderOrthoView(
  scene: THREE.Scene,
  camera: THREE.OrthographicCamera,
  renderTarget: THREE.WebGLRenderTarget,
  renderer: THREE.WebGLRenderer
): ImageData {
  // Render to offscreen target
  renderer.setRenderTarget(renderTarget);
  renderer.render(scene, camera);
  renderer.setRenderTarget(null);
  
  // Readback pixels
  const width = renderTarget.width;
  const height = renderTarget.height;
  const buffer = new Uint8Array(width * height * 4);
  renderer.readRenderTargetPixels(renderTarget, 0, 0, width, height, buffer);
  
  // Convert to ImageData
  const imageData = new ImageData(width, height);
  imageData.data.set(buffer);
  
  return imageData;
}
```

### **Meters Per Pixel Calculation**

**Given your ortho camera frustum:**

**Width in meters:**
```
Wm = right - left
```

**Height in meters:**
```
Hm = top - bottom
```

**Then:**
```
metersPerPixelX = Wm / Wpx
metersPerPixelY = Hm / Hpx
```

**And you can map pixel coordinates into world-plane meters directly.**

### **Implementation**

```typescript
function computeMetersPerPixel(
  camera: THREE.OrthographicCamera,
  resolution: number
): { x: number; y: number } {
  const Wm = camera.right - camera.left;
  const Hm = camera.top - camera.bottom;
  return {
    x: Wm / resolution,
    y: Hm / resolution
  };
}
```

**[END:TAG:ORTHO_RENDER]**

---

## 4. SILHOUETTE EXTRACTION

**[TAG:SILHOUETTE] [TAG:FITTING_LOOP]**

### **Overview**

Silhouette extraction converts rendered images into compact 1D functions that represent the model's shape in each view. This is the "key trick" that makes fitting efficient.

**Principle:** Don't store all edge pixels. Store scanline extrema to get clean curves.

### **4.1 Readback**

**Three.js Readback:**
```typescript
renderer.readRenderTargetPixels(rt, 0, 0, W, H, buffer)
```

**Threshold Alpha:**
```typescript
const threshold = 10; // or similar
const isSolid = (alpha: number) => alpha > threshold;
```

### **4.2 Convert Pixels → Meters (Per View)**

**Given your ortho camera frustum:**

**Width in meters:**
```
Wm = right - left
```

**Height in meters:**
```
Hm = top - bottom
```

**Then:**
```
metersPerPixelX = Wm / Wpx
metersPerPixelY = Hm / Hpx
```

**And you can map pixel coordinates into world-plane meters directly.**

### **4.3 Extract 1D Silhouette Functions (The Key Trick)**

**Don't store all edge pixels. Store scanline extrema to get clean curves.**

#### **TOP View (Width Distribution)**

**For each x_px (or each column), find:**

```
z_left(x) = smallest y_px with solid? (depends orientation)
z_right(x) = largest y_px with solid
```

**Convert to meters:**
```
halfBeam_model(x) = 0.5 * (z_right - z_left)
```

**Implementation:**
```typescript
function extractTopViewSilhouette(
  imageData: ImageData,
  metersPerPixel: { x: number; y: number },
  threshold: number = 10
): number[] {
  const width = imageData.width;
  const height = imageData.height;
  const data = imageData.data;
  const B_model: number[] = [];
  
  for (let x = 0; x < width; x++) {
    let zLeft = height;
    let zRight = 0;
    
    for (let y = 0; y < height; y++) {
      const idx = (y * width + x) * 4;
      const alpha = data[idx + 3];
      
      if (alpha > threshold) {
        zLeft = Math.min(zLeft, y);
        zRight = Math.max(zRight, y);
      }
    }
    
    // Convert to meters
    const zLeft_m = zLeft * metersPerPixel.y;
    const zRight_m = zRight * metersPerPixel.y;
    const halfBeam = 0.5 * (zRight_m - zLeft_m);
    
    B_model.push(halfBeam);
  }
  
  return B_model;
}
```

#### **SIDE View (Rocker + Sheer)**

**For each x column:**
```
y_bottom(x) = lowest solid pixel
y_top(x) = highest solid pixel
```

**Convert to meters:**
```
K_model(x) = y_bottom(x)
D_model(x) = y_top(x)
```

**Implementation:**
```typescript
function extractSideViewSilhouette(
  imageData: ImageData,
  metersPerPixel: { x: number; y: number },
  threshold: number = 10
): { K_model: number[]; D_model: number[] } {
  const width = imageData.width;
  const height = imageData.height;
  const data = imageData.data;
  const K_model: number[] = [];
  const D_model: number[] = [];
  
  for (let x = 0; x < width; x++) {
    let yBottom = height;
    let yTop = 0;
    
    for (let y = 0; y < height; y++) {
      const idx = (y * width + x) * 4;
      const alpha = data[idx + 3];
      
      if (alpha > threshold) {
        yBottom = Math.min(yBottom, y);
        yTop = Math.max(yTop, y);
      }
    }
    
    // Convert to meters (note: y increases downward in image space)
    const yBottom_m = (height - yBottom) * metersPerPixel.y;
    const yTop_m = (height - yTop) * metersPerPixel.y;
    
    K_model.push(yBottom_m);
    D_model.push(yTop_m);
  }
  
  return { K_model, D_model };
}
```

#### **FRONT/REAR (Section Style)**

**For each y row:**
```
z_left(y), z_right(y) → width vs height profile
```

**This provides section targets (not necessarily full reconstruction).**

**Implementation:**
```typescript
function extractFrontViewSilhouette(
  imageData: ImageData,
  metersPerPixel: { x: number; y: number },
  threshold: number = 10
): { widthProfile: number[] } {
  const width = imageData.width;
  const height = imageData.height;
  const data = imageData.data;
  const widthProfile: number[] = [];
  
  for (let y = 0; y < height; y++) {
    let zLeft = width;
    let zRight = 0;
    
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const alpha = data[idx + 3];
      
      if (alpha > threshold) {
        zLeft = Math.min(zLeft, x);
        zRight = Math.max(zRight, x);
      }
    }
    
    // Convert to meters
    const zLeft_m = zLeft * metersPerPixel.x;
    const zRight_m = zRight * metersPerPixel.x;
    const width = zRight_m - zLeft_m;
    
    widthProfile.push(width);
  }
  
  return { widthProfile };
}
```

### **Storage Format**

**You now have compact, smooth-ish arrays:**

```
B_model[i]
K_model[i]
D_model[i]
```

**Store them sampled at N stations (e.g., 256).**

**TypeScript Interface:**
```typescript
interface ModelSilhouette {
  B_model: number[];  // Half-beam at each station (meters)
  K_model: number[];  // Keel/rocker at each station (meters)
  D_model: number[];  // Deck/sheer at each station (meters)
  stations: number[]; // Normalized station positions [0..1]
  N: number;          // Number of stations
}
```

**[END:TAG:SILHOUETTE]**

---

## 5. REFERENCE SILHOUETTE EXTRACTION

**[TAG:REFERENCE] [TAG:FITTING_LOOP]**

### **Overview**

Reference silhouette extraction performs the same scanline extrema extraction on the reference images from ReferencePack, but with calibration applied.

### **Calibration Application**

**Before extraction, you must apply the ReferencePack calibration:**

1. **pxPerMeter** - Convert pixels to meters
2. **origin alignment** - Align to world origin
3. **centerline rotation correction** - Rotate to match model orientation

### **Precomputation and Caching**

**Practical: you can precompute and cache:**

```
B_ref(x), K_ref(x), D_ref(x)
```

**plus keypoints**

**This avoids recomputing on every iteration.**

### **Implementation**

```typescript
function extractReferenceSilhouette(
  referenceImage: ImageData,
  referencePack: ReferencePack,
  view: "top" | "side" | "front" | "rear"
): ModelSilhouette {
  const viewDef = referencePack.views[view];
  if (!viewDef) throw new Error(`View ${view} not found in ReferencePack`);
  
  // Apply calibration
  const pxPerMeter = viewDef.cal.pxPerMeter;
  const originPx = viewDef.cal.originPx;
  
  // Compute meters per pixel from calibration
  const imageWidth = referenceImage.width;
  const imageHeight = referenceImage.height;
  const Wm = imageWidth / pxPerMeter;
  const Hm = imageHeight / pxPerMeter;
  const metersPerPixel = {
    x: Wm / imageWidth,
    y: Hm / imageHeight
  };
  
  // Apply centerline rotation if needed
  const theta = centerlineAngle(viewDef.cal);
  const rotatedImage = rotateImage(referenceImage, -theta);
  
  // Extract silhouette based on view
  switch (view) {
    case "top":
      return {
        B_model: extractTopViewSilhouette(rotatedImage, metersPerPixel),
        K_model: [],
        D_model: [],
        stations: generateStations(256),
        N: 256
      };
    case "side":
      const side = extractSideViewSilhouette(rotatedImage, metersPerPixel);
      return {
        B_model: [],
        K_model: side.K_model,
        D_model: side.D_model,
        stations: generateStations(256),
        N: 256
      };
    // ... front/rear cases
  }
}
```

### **Station Generation**

```typescript
function generateStations(N: number): number[] {
  const stations: number[] = [];
  for (let i = 0; i < N; i++) {
    stations.push(i / (N - 1)); // 0..1
  }
  return stations;
}
```

**[END:TAG:REFERENCE]**

---

## 6. ERROR METRICS

**[TAG:ERROR_METRICS] [TAG:FITTING_LOOP]**

### **Overview**

Error metrics provide both "global score" for convergence and "diagnostic curves" for understanding where the model is off.

### **6.1 Signed Error Curves (Most Important)**

**At each sampled station i along length:**

```
eB[i] = B_model[i] - B_ref[i] (meters)
eK[i] = K_model[i] - K_ref[i]
eD[i] = D_model[i] - D_ref[i]
```

**These three curves tell you exactly where you're off.**

**Implementation:**
```typescript
interface ErrorCurves {
  eB: number[];  // Beam error at each station (meters)
  eK: number[];  // Keel error at each station (meters)
  eD: number[];  // Deck error at each station (meters)
  stations: number[]; // Station positions [0..1]
  N: number;     // Number of stations
}

function computeErrorCurves(
  model: ModelSilhouette,
  reference: ModelSilhouette
): ErrorCurves {
  const N = Math.min(model.N, reference.N);
  const eB: number[] = [];
  const eK: number[] = [];
  const eD: number[] = [];
  
  for (let i = 0; i < N; i++) {
    // Interpolate to same station positions if needed
    const s = model.stations[i];
    const B_model_s = interpolate(model.B_model, model.stations, s);
    const B_ref_s = interpolate(reference.B_model, reference.stations, s);
    eB.push(B_model_s - B_ref_s);
    
    const K_model_s = interpolate(model.K_model, model.stations, s);
    const K_ref_s = interpolate(reference.K_model, reference.stations, s);
    eK.push(K_model_s - K_ref_s);
    
    const D_model_s = interpolate(model.D_model, model.stations, s);
    const D_ref_s = interpolate(reference.D_model, reference.stations, s);
    eD.push(D_model_s - D_ref_s);
  }
  
  return { eB, eK, eD, stations: model.stations, N };
}
```

### **6.2 Scalar Scores (For Convergence and Automation)**

#### **RMS (Root Mean Square)**

```
rmsB = sqrt(mean(eB^2))
rmsK, rmsD
```

**Implementation:**
```typescript
function computeRMS(errors: number[]): number {
  if (errors.length === 0) return 0;
  const sumSq = errors.reduce((sum, e) => sum + e * e, 0);
  return Math.sqrt(sumSq / errors.length);
}

interface ScalarScores {
  rmsB: number;
  rmsK: number;
  rmsD: number;
  maxB: number;
  maxK: number;
  maxD: number;
  totalRMS: number;
}

function computeScalarScores(errors: ErrorCurves): ScalarScores {
  return {
    rmsB: computeRMS(errors.eB),
    rmsK: computeRMS(errors.eK),
    rmsD: computeRMS(errors.eD),
    maxB: Math.max(...errors.eB.map(Math.abs)),
    maxK: Math.max(...errors.eK.map(Math.abs)),
    maxD: Math.max(...errors.eD.map(Math.abs)),
    totalRMS: Math.sqrt(
      computeRMS(errors.eB) ** 2 +
      computeRMS(errors.eK) ** 2 +
      computeRMS(errors.eD) ** 2
    )
  };
}
```

#### **Max Absolute Error**

```
maxB = max(|eB|) etc.
```

**Implementation:**
```typescript
function computeMaxError(errors: number[]): number {
  if (errors.length === 0) return 0;
  return Math.max(...errors.map(Math.abs));
}
```

#### **Area Mismatch (Optional)**

```
difference in silhouette area in each view
```

**Implementation:**
```typescript
function computeAreaMismatch(
  model: ModelSilhouette,
  reference: ModelSilhouette
): number {
  // Compute area under curves
  const areaModel = integrateCurve(model.B_model, model.stations);
  const areaRef = integrateCurve(reference.B_model, reference.stations);
  return Math.abs(areaModel - areaRef);
}

function integrateCurve(values: number[], stations: number[]): number {
  let area = 0;
  for (let i = 0; i < values.length - 1; i++) {
    const dx = stations[i + 1] - stations[i];
    const avgY = (values[i] + values[i + 1]) / 2;
    area += avgY * dx;
  }
  return area;
}
```

### **6.3 Fairness Penalties (Prevents "Wiggly Cheating")**

**You must discourage fitting by adding noise.**

**For each curve error or for your spline itself:**

**Discrete second-derivative energy:**
```
E_fair(B) = Σ (B[i+1] - 2B[i] + B[i-1])^2
```

**Implementation:**
```typescript
function computeFairnessEnergy(curve: number[]): number {
  if (curve.length < 3) return 0;
  let energy = 0;
  for (let i = 1; i < curve.length - 1; i++) {
    const secondDeriv = curve[i + 1] - 2 * curve[i] + curve[i - 1];
    energy += secondDeriv * secondDeriv;
  }
  return energy;
}
```

### **6.4 Final Objective Function**

**Final objective (conceptually):**

```
J = w_B * ||e_B||² + w_K * ||e_K||² + w_D * ||e_D||² + λ * E_fair
```

**Where:**
- `w_B`, `w_K`, `w_D` are weights following trust hierarchy
- `λ` is fairness regularization weight
- `E_fair` is the fairness energy

**Weights follow trust hierarchy (TOP width is strong, etc.).**

**Implementation:**
```typescript
interface ObjectiveWeights {
  wB: number;  // Weight for beam error (from TOP view)
  wK: number;  // Weight for keel error (from SIDE view)
  wD: number;  // Weight for deck error (from SIDE view)
  lambda: number; // Fairness regularization weight
}

const DEFAULT_WEIGHTS: ObjectiveWeights = {
  wB: 1.0,   // TOP view dominates width
  wK: 0.8,   // SIDE view dominates height
  wD: 0.8,   // SIDE view dominates height
  lambda: 0.1 // Fairness penalty
};

function computeObjective(
  errors: ErrorCurves,
  model: ModelSilhouette,
  weights: ObjectiveWeights = DEFAULT_WEIGHTS
): number {
  const rmsB = computeRMS(errors.eB);
  const rmsK = computeRMS(errors.eK);
  const rmsD = computeRMS(errors.eD);
  
  const errorTerm = 
    weights.wB * rmsB * rmsB +
    weights.wK * rmsK * rmsK +
    weights.wD * rmsD * rmsD;
  
  const fairnessTerm = 
    weights.lambda * (
      computeFairnessEnergy(model.B_model) +
      computeFairnessEnergy(model.K_model) +
      computeFairnessEnergy(model.D_model)
    );
  
  return errorTerm + fairnessTerm;
}
```

**[END:TAG:ERROR_METRICS]**

---

## 7. KEYPOINTS SYSTEM

**[TAG:KEYPOINTS] [TAG:FITTING_LOOP]**

### **Overview**

Silhouette curves alone can drift globally (e.g., whole hull shifts). Keypoints lock the "identity" of the model by providing fixed reference points.

### **Purpose**

**Keypoints stabilize scale/placement while curves handle shape.**

### **Keypoint Examples**

#### **Boat Keypoints**

- **bow tip** (max X extent in top/side)
- **transom plane corners** (rear view)
- **max beam station** (argmax of B_ref)
- **cockpit corners** (if visible)
- **mast step** (if drawn)

#### **Car Keypoints**

- **axle centers** (critical)
- **wheel arch peak points**
- **roof highest point**
- **bumper endpoints**

### **Keypoint Detection**

**Keypoints can be:**

1. **Auto-detected from extrema**
2. **User-clicked once and saved into ReferencePack**

### **Keypoint Error**

**Keypoint errors become extra terms:**

```
eKP = ||p_model - p_ref||
```

**Implementation:**
```typescript
interface Keypoint {
  id: string;
  name: string;
  view: "top" | "side" | "front" | "rear";
  position: { x: number; y: number }; // In view pixel coordinates
  worldPosition?: { x: number; y: number; z: number }; // In world meters
}

interface KeypointError {
  keypointId: string;
  error: number; // Distance in meters
  modelPos: { x: number; y: number; z: number };
  refPos: { x: number; y: number; z: number };
}

function computeKeypointErrors(
  modelKeypoints: Map<string, { x: number; y: number; z: number }>,
  refKeypoints: Map<string, { x: number; y: number; z: number }>
): KeypointError[] {
  const errors: KeypointError[] = [];
  
  for (const [id, refPos] of refKeypoints.entries()) {
    const modelPos = modelKeypoints.get(id);
    if (!modelPos) continue;
    
    const dx = modelPos.x - refPos.x;
    const dy = modelPos.y - refPos.y;
    const dz = modelPos.z - refPos.z;
    const error = Math.sqrt(dx * dx + dy * dy + dz * dz);
    
    errors.push({
      keypointId: id,
      error,
      modelPos,
      refPos
    });
  }
  
  return errors;
}
```

### **Auto-Detection Algorithms**

#### **Bow Tip Detection**

```typescript
function detectBowTip(
  silhouette: ModelSilhouette,
  view: "top" | "side"
): { x: number; y: number } | null {
  if (view === "top") {
    // Find maximum X extent
    let maxX = -Infinity;
    let maxXIndex = -1;
    for (let i = 0; i < silhouette.B_model.length; i++) {
      const x = silhouette.stations[i] * state.length; // Convert to world X
      if (x > maxX) {
        maxX = x;
        maxXIndex = i;
      }
    }
    if (maxXIndex >= 0) {
      return {
        x: maxX,
        y: silhouette.B_model[maxXIndex]
      };
    }
  }
  // Similar for side view
  return null;
}
```

#### **Max Beam Station Detection**

```typescript
function detectMaxBeamStation(
  silhouette: ModelSilhouette
): { station: number; beam: number } | null {
  let maxBeam = -Infinity;
  let maxIndex = -1;
  
  for (let i = 0; i < silhouette.B_model.length; i++) {
    if (silhouette.B_model[i] > maxBeam) {
      maxBeam = silhouette.B_model[i];
      maxIndex = i;
    }
  }
  
  if (maxIndex >= 0) {
    return {
      station: silhouette.stations[maxIndex],
      beam: maxBeam
    };
  }
  
  return null;
}
```

### **Keypoint Integration into Objective**

**Add keypoint error terms to objective:**

```typescript
function computeObjectiveWithKeypoints(
  errors: ErrorCurves,
  model: ModelSilhouette,
  keypointErrors: KeypointError[],
  weights: ObjectiveWeights & { wKP: number }
): number {
  const baseObjective = computeObjective(errors, model, weights);
  
  const keypointTerm = keypointErrors.reduce((sum, kp) => {
    return sum + kp.error * kp.error;
  }, 0) * weights.wKP;
  
  return baseObjective + keypointTerm;
}
```

**[END:TAG:KEYPOINTS]**

---

## 8. OPTIMIZATION STRATEGY

**[TAG:OPTIMIZATION] [TAG:FITTING_LOOP]**

### **Overview**

Multi-scale fitting strategy that prevents "feature fighting" and keeps convergence monotonic.

### **Multi-Scale Fitting Stages**

**You do multi-scale fitting:**

#### **Stage A — Fit Base Curves Only (Big Shape)**

**Variables:**
- spline control points for B(u), K(u), D(u)
- maybe global L if you allow it

**Objective:**
- minimize eB, eK, eD with fairness

**Algorithm Options:**

**1. Least-squares on spline control points (best):**
- treat curve as spline with small number of controls (8–16)
- solve with regularization (fairness)
- **Start with (1). It gives professional smooth results.**

**2. Coordinate descent (simple fallback):**
- nudge one control point at a time
- keep if improves score

**3. Finite-difference Gauss-Newton (more aggressive):**
- small dims → feasible

### **Stage A Implementation: Least-Squares with Regularization**

```typescript
interface SplineControl {
  u: number;  // Parameter position [0..1]
  value: number; // Control point value
}

interface CurveSpline {
  controls: SplineControl[];
  degree: number; // Usually 3 (cubic)
}

function fitCurveLeastSquares(
  target: number[],      // Target values at stations
  stations: number[],    // Station positions [0..1]
  numControls: number = 12,
  lambda: number = 0.1   // Regularization weight
): CurveSpline {
  // Build design matrix A: A[i][j] = basis_j(station[i])
  const N = stations.length;
  const M = numControls;
  const A: number[][] = [];
  
  for (let i = 0; i < N; i++) {
    const row: number[] = [];
    for (let j = 0; j < M; j++) {
      const u = stations[i];
      const basis = bsplineBasis(j, M, u, 3); // Cubic B-spline
      row.push(basis);
    }
    A.push(row);
  }
  
  // Build regularization matrix (second derivative)
  const R: number[][] = [];
  for (let j = 0; j < M; j++) {
    const row: number[] = new Array(M).fill(0);
    if (j > 0) row[j - 1] = 1;
    row[j] = -2;
    if (j < M - 1) row[j + 1] = 1;
    R.push(row);
  }
  
  // Solve: (A^T A + λ R^T R) c = A^T y
  const AT = transpose(A);
  const ATA = matrixMultiply(AT, A);
  const RTR = matrixMultiply(transpose(R), R);
  const regularized = matrixAdd(ATA, matrixScale(RTR, lambda));
  const ATy = matrixVectorMultiply(AT, target);
  
  const controls = solveLinearSystem(regularized, ATy);
  
  return {
    controls: controls.map((val, i) => ({
      u: i / (M - 1),
      value: val
    })),
    degree: 3
  };
}
```

### **Stage B — Fit Section Style (Cross-Section Cues)**

**Variables:**
- SectionParams at a few stations (bow/mid/stern), interpolated

**Objective:**
- match front/rear profiles (width vs height), plus subjective constraints (V vs round)

**Implementation:**
```typescript
interface SectionParams {
  vDepth: number;      // V-depth
  deadrise: number;    // Deadrise angle
  bilgeRadius: number; // Bilge radius
  chineSharpness: number; // Chine sharpness
  flare: number;       // Flare
  railRadius: number;  // Rail radius
  bodyPow: number;     // Body power
}

function fitSectionStyle(
  frontProfile: { width: number[]; height: number[] },
  rearProfile: { width: number[]; height: number[] },
  stations: number[] // bow, mid, stern typically
): SectionParams[] {
  // Fit SectionParams at each station to match width/height profiles
  // This is a constrained optimization problem
  // Implementation depends on Section Law F(s; params) from Step 2
  // ...
}
```

### **Stage C — Fit Macro Features (Localized Residual)**

**Enable nodes like cockpit recess / trunk / wheel wells.**

**Variables:**
- feature node params only

**Objective:**
- reduce localized silhouette mismatch (in a mask region)
- keep global curves mostly locked

**Implementation:**
```typescript
function fitMacroFeatures(
  errors: ErrorCurves,
  featureNodes: FeatureNode[],
  maskRegions: Map<string, MaskField>
): FeatureNodeParams {
  // For each feature node:
  // 1. Compute error in its mask region
  // 2. Optimize feature params to reduce local error
  // 3. Keep base curves fixed
  // ...
}
```

### **Stage D — Final Polish**

**Small adjustments across all, but bounded.**

**This is how you avoid "feature fighting" and keep convergence monotonic.**

### **Convergence Criteria**

```typescript
interface ConvergenceCriteria {
  maxIterations: number;
  tolerance: number;      // RMS error threshold
  minImprovement: number; // Minimum improvement per iteration
  maxStagnation: number;  // Max iterations without improvement
}

function checkConvergence(
  scores: ScalarScores[],
  criteria: ConvergenceCriteria
): { converged: boolean; reason: string } {
  if (scores.length >= criteria.maxIterations) {
    return { converged: true, reason: "max_iterations" };
  }
  
  const current = scores[scores.length - 1];
  if (current.totalRMS < criteria.tolerance) {
    return { converged: true, reason: "tolerance_met" };
  }
  
  if (scores.length >= 2) {
    const improvement = scores[scores.length - 2].totalRMS - current.totalRMS;
    if (improvement < criteria.minImprovement) {
      // Check stagnation
      let stagnantCount = 0;
      for (let i = scores.length - 1; i > 0; i--) {
        const imp = scores[i - 1].totalRMS - scores[i].totalRMS;
        if (imp < criteria.minImprovement) stagnantCount++;
        else break;
      }
      if (stagnantCount >= criteria.maxStagnation) {
        return { converged: true, reason: "stagnation" };
      }
    }
  }
  
  return { converged: false, reason: "continuing" };
}
```

**[END:TAG:OPTIMIZATION]**

---

## 9. BOUNDED PATCH FORMAT

**[TAG:PATCH] [TAG:FITTING_LOOP]**

### **Overview**

Every iteration results in a patch that represents the changes made. Patches are human + LLM safe, undoable, and form a "geometry git" system.

### **Patch Format**

**Every iteration results in a patch like:**

```json
{
  "patchId": "fit_2026-01-01T14:22:00Z",
  "changes": [
    {"path":"curves.B.ctrl[3].y", "op":"add", "value": -0.008},
    {"path":"curves.K.ctrl[5].y", "op":"add", "value": +0.004},
    {"path":"features.cockpit_recess.params.depth", "op":"set", "value": 0.118}
  ],
  "metricsBefore": {"rmsB":0.012,"rmsK":0.009,"rmsD":0.014},
  "metricsAfter":  {"rmsB":0.008,"rmsK":0.007,"rmsD":0.012},
  "notes": [
    "Top view: max beam slightly too wide midship",
    "Side view: rocker too flat near bow shoulder"
  ]
}
```

### **Rules**

1. **each path is whitelisted** - Only allowed parameter paths can be modified
2. **each change is clamped to parameter bounds** - Values must stay within valid ranges
3. **patches are undoable (stack)** - Full undo/redo support

**This is your "geometry git."**

### **TypeScript Interfaces**

```typescript
type PatchOperation = "add" | "set" | "multiply" | "enable" | "disable";

interface PatchChange {
  path: string;        // JSON path to parameter (whitelisted)
  op: PatchOperation;
  value: number | boolean | string;
  bounds?: { min: number; max: number }; // Optional bounds for validation
}

interface Patch {
  patchId: string;     // Unique identifier (timestamp-based)
  timestamp: string;    // ISO 8601 timestamp
  changes: PatchChange[];
  metricsBefore: ScalarScores;
  metricsAfter: ScalarScores;
  notes: string[];     // Human-readable notes
  stage: "A" | "B" | "C" | "D"; // Which optimization stage
  accepted?: boolean;  // Whether patch was accepted
}

interface PatchStack {
  patches: Patch[];
  currentIndex: number; // -1 if at base state
}
```

### **Path Whitelist**

```typescript
const ALLOWED_PATHS = [
  // Curve control points
  "curves.B.ctrl[*].y",
  "curves.K.ctrl[*].y",
  "curves.D.ctrl[*].y",
  
  // Section parameters
  "sections[*].vDepth",
  "sections[*].deadrise",
  "sections[*].bilgeRadius",
  "sections[*].chineSharpness",
  "sections[*].flare",
  "sections[*].railRadius",
  "sections[*].bodyPow",
  
  // Feature node parameters
  "features[*].params.*",
  "features[*].enabled",
  
  // Global parameters
  "global.length",
  "global.beam",
  "global.height"
];

function validatePatchPath(path: string): boolean {
  // Check if path matches any allowed pattern
  for (const pattern of ALLOWED_PATHS) {
    if (matchPathPattern(path, pattern)) {
      return true;
    }
  }
  return false;
}
```

### **Patch Application**

```typescript
function applyPatch(
  state: ParametricState,
  patch: Patch
): ParametricState {
  const newState = deepClone(state);
  
  for (const change of patch.changes) {
    if (!validatePatchPath(change.path)) {
      throw new Error(`Path not whitelisted: ${change.path}`);
    }
    
    const target = getPathValue(newState, change.path);
    const bounds = change.bounds;
    
    let newValue: any;
    switch (change.op) {
      case "add":
        newValue = target + change.value;
        break;
      case "set":
        newValue = change.value;
        break;
      case "multiply":
        newValue = target * change.value;
        break;
      case "enable":
        newValue = true;
        break;
      case "disable":
        newValue = false;
        break;
    }
    
    // Clamp to bounds
    if (bounds && typeof newValue === "number") {
      newValue = Math.max(bounds.min, Math.min(bounds.max, newValue));
    }
    
    setPathValue(newState, change.path, newValue);
  }
  
  return newState;
}
```

### **Patch Timeline Management**

```typescript
class PatchTimeline {
  private stack: PatchStack = { patches: [], currentIndex: -1 };
  
  apply(patch: Patch): void {
    // Remove any patches after current index (redo branch)
    this.stack.patches = this.stack.patches.slice(0, this.stack.currentIndex + 1);
    
    // Add new patch
    this.stack.patches.push(patch);
    this.stack.currentIndex = this.stack.patches.length - 1;
  }
  
  undo(): Patch | null {
    if (this.stack.currentIndex < 0) return null;
    this.stack.currentIndex--;
    return this.stack.patches[this.stack.currentIndex] || null;
  }
  
  redo(): Patch | null {
    if (this.stack.currentIndex >= this.stack.patches.length - 1) return null;
    this.stack.currentIndex++;
    return this.stack.patches[this.stack.currentIndex];
  }
  
  getCurrentState(): Patch[] {
    return this.stack.patches.slice(0, this.stack.currentIndex + 1);
  }
}
```

**[END:TAG:PATCH]**

---

## 10. UI DESIGN SPECIFICATIONS

**[TAG:UI_DESIGN] [TAG:FITTING_LOOP]**

### **Overview**

**You only need 4 panels:**

1. Ortho view grid (top/side/front/rear)
2. Error curves for B/K/D (plots in meters)
3. Selected node editor (only params for selected feature)
4. Patch timeline (undo/redo + accept/reject)

**That's enough to tune a Laser hull to near blueprint perfection quickly.**

### **10.1 Ortho View Grid Panel**

**Shows:**
- reference underlay + model render + silhouette edges

**Layout:**
```
┌─────────────┬─────────────┐
│    TOP      │    SIDE      │
│   (1024×)   │   (1024×)    │
├─────────────┼─────────────┤
│   FRONT     │    REAR      │
│   (1024×)   │   (1024×)    │
└─────────────┴─────────────┘
```

**Visual Layers (Bottom to Top):**
1. Reference image (calibrated, aligned)
2. Model render (orthographic, white silhouette)
3. Silhouette edges (overlay, colored by error)
4. Keypoints (markers)
5. Error heatmap (optional, semi-transparent)

**Interaction:**
- Click to select keypoints
- Drag to adjust keypoint positions
- Zoom/pan per view
- Toggle layers (reference, model, edges, heatmap)

### **10.2 Error Curves Panel**

**Shows:**
- Error curves for B/K/D (plots in meters)
- Station position on X-axis [0..1]
- Error value on Y-axis (meters, signed)

**Layout:**
```
┌─────────────────────────────┐
│  Error Curves (Meters)      │
├─────────────────────────────┤
│  B Error (Beam)             │
│  [Plot: eB vs station]      │
├─────────────────────────────┤
│  K Error (Keel)             │
│  [Plot: eK vs station]      │
├─────────────────────────────┤
│  D Error (Deck)             │
│  [Plot: eD vs station]      │
├─────────────────────────────┤
│  Scalar Scores:             │
│  RMS B: 0.008m              │
│  RMS K: 0.007m              │
│  RMS D: 0.012m              │
│  Total: 0.015m              │
└─────────────────────────────┘
```

**Visual Features:**
- Green = within tolerance
- Yellow = moderate error
- Red = high error
- Zero line (horizontal reference)
- Station markers (bow, mid, stern)

### **10.3 Selected Node Editor Panel**

**Shows:**
- Only params for selected feature
- Parameter sliders/inputs
- Bounds display
- Current value vs. reference value

**Layout:**
```
┌─────────────────────────────┐
│  Selected: Cockpit Recess    │
├─────────────────────────────┤
│  Depth: [====|----] 0.118m  │
│         (0.05 - 0.20)        │
├─────────────────────────────┤
│  Width: [===|=====] 0.45m   │
│         (0.20 - 0.80)        │
├─────────────────────────────┤
│  [Apply Patch] [Reset]      │
└─────────────────────────────┘
```

**Interaction:**
- Adjust sliders → preview in viewport
- Apply → creates patch
- Reset → reverts to last accepted state

### **10.4 Patch Timeline Panel**

**Shows:**
- Undo/redo + accept/reject
- List of patches with metrics
- Current position in timeline

**Layout:**
```
┌─────────────────────────────┐
│  Patch Timeline             │
├─────────────────────────────┤
│  [◄◄] [◄] [►] [►►]          │
├─────────────────────────────┤
│  fit_2026-01-01T14:22:00Z   │
│  Stage A                     │
│  RMS: 0.012 → 0.008 ✓       │
│  [Accept] [Reject]          │
├─────────────────────────────┤
│  fit_2026-01-01T14:20:00Z   │
│  Stage A                     │
│  RMS: 0.015 → 0.012 ✓       │
├─────────────────────────────┤
│  (base state)                │
└─────────────────────────────┘
```

**Interaction:**
- Click patch → jump to that state
- Accept → locks patch, can't undo past it
- Reject → removes patch, reverts to previous
- Undo/Redo → navigate timeline

### **Complete UI Component Structure**

```typescript
interface FittingUIState {
  selectedView: "top" | "side" | "front" | "rear" | null;
  selectedKeypoint: string | null;
  selectedFeature: string | null;
  showReference: boolean;
  showModel: boolean;
  showEdges: boolean;
  showHeatmap: boolean;
  patchTimeline: PatchTimeline;
}

interface OrthoViewGridProps {
  referencePack: ReferencePack;
  modelRender: OrthoRenderPack;
  silhouettes: {
    model: ModelSilhouette;
    reference: ModelSilhouette;
  };
  errors: ErrorCurves;
  keypoints: Map<string, Keypoint>;
  onKeypointSelect: (id: string) => void;
  onKeypointMove: (id: string, pos: { x: number; y: number }) => void;
}

interface ErrorCurvesPanelProps {
  errors: ErrorCurves;
  scores: ScalarScores;
  tolerance: number;
}

interface SelectedNodeEditorProps {
  feature: FeatureNode | null;
  onParamChange: (path: string, value: any) => void;
  onApply: () => void;
  onReset: () => void;
}

interface PatchTimelinePanelProps {
  timeline: PatchTimeline;
  onUndo: () => void;
  onRedo: () => void;
  onAccept: (patchId: string) => void;
  onReject: (patchId: string) => void;
  onJump: (patchId: string) => void;
}
```

**[END:TAG:UI_DESIGN]**

---

## 11. INTEGRATION POINTS

**[TAG:INTEGRATION] [TAG:FITTING_LOOP]**

### **Integration with ReferencePack (Step 1)**

**Fitting Flow:**
```
ReferencePack (calibrated images)
  → Extract reference silhouettes
  → Compare with model silhouettes
  → Compute errors
  → Generate patches
```

### **Integration with Curve-First Generator (Step 2)**

**Optimization Targets:**
```
Curve-First Generator (B/K/D curves)
  → Fitting Loop optimizes control points
  → Updates curves
  → Regenerates base mesh
  → Re-renders for next iteration
```

### **Integration with Feature Node System (Step 3)**

**Feature Fitting:**
```
Feature Node System
  → Stage C optimization adjusts feature params
  → Localized error reduction
  → Keeps base curves mostly locked
```

### **Integration with Compiler (Step 5)**

**Output Generation:**
```
Fitting Loop
  → Generates patches
  → Compiler applies patches
  → Builds final asset bundle
```

**[END:TAG:INTEGRATION]**

---

## 12. PERFORMANCE CHARACTERISTICS

**[TAG:PERFORMANCE] [TAG:FITTING_LOOP]**

### **Rendering Performance**

**Orthographic Rendering:**
- 4 views × 1024×1024 = ~4MB per iteration
- Render time: ~10-50ms per view (GPU-accelerated)
- Total render time: ~40-200ms per iteration

### **Silhouette Extraction Performance**

**Scanline Processing:**
- 1024 columns × 1024 rows = 1M pixels per view
- Processing time: ~5-20ms per view
- Total extraction time: ~20-80ms per iteration

### **Optimization Performance**

**Least-Squares Solver:**
- 12 control points × 3 curves = 36 variables
- Matrix solve: ~1-5ms
- Total optimization time: ~10-50ms per iteration

### **Total Iteration Time**

**Typical:** 70-330ms per iteration  
**With caching:** 50-200ms per iteration

**Convergence:** Usually 10-50 iterations  
**Total fitting time:** 0.5-16 seconds

**[END:TAG:PERFORMANCE]**

---

## 13. FILE DEPENDENCY GRAPH

**[TAG:DEPS] [TAG:FITTING_LOOP]**

```
Metrics + Fitting Loop System
  │
  ├─→ modelmaker.txt (Step 4 specification)
  │   └─→ Lines 1747-2163: Complete specification
  │
  ├─→ ReferencePack System (Step 1)
  │   ├─→ Calibrated reference images
  │   └─→ Calibration data (pxPerMeter, alignment)
  │
  ├─→ Curve-First Generator (Step 2)
  │   ├─→ B(u), K(u), D(u) curves
  │   └─→ Base mesh generation
  │
  ├─→ Feature Node System (Step 3)
  │   ├─→ Feature parameters
  │   └─→ Feature graph
  │
  ├─→ Three.js Rendering
  │   ├─→ OrthographicCamera
  │   ├─→ WebGLRenderTarget
  │   └─→ ShaderMaterial (flat shader)
  │
  └─→ Optimization Libraries
      ├─→ Linear algebra (matrix operations)
      ├─→ B-spline evaluation
      └─→ Least-squares solver
```

**[END:TAG:DEPS]**

---

## 14. TYPE FLOW MAP

**[TAG:TYPE_FLOW] [TAG:FITTING_LOOP]**

### **Fitting Loop Flow**

```
ParametricState (Input)
  ↓
OrthoRenderPack (Model Renders)
  ↓
ModelSilhouette (Extracted)
  ↓
ReferenceSilhouette (From ReferencePack)
  ↓
ErrorCurves (Computed)
  ↓
ScalarScores (Aggregated)
  ↓
Optimization (Least-Squares)
  ↓
Patch (Bounded Changes)
  ↓
ParametricState (Updated)
  ↓
(Repeat until convergence)
```

### **Patch Application Flow**

```
Patch (JSON)
  ↓
Path Validation (Whitelist Check)
  ↓
Value Clamping (Bounds Check)
  ↓
State Update (Path Modification)
  ↓
ParametricState (New State)
  ↓
Geometry Regeneration
  ↓
Re-render & Re-evaluate
```

**[END:TAG:TYPE_FLOW]**

---

## 15. STATE MANAGEMENT

**[TAG:STATE_MGMT] [TAG:FITTING_LOOP]**

### **Fitting Loop State**

```typescript
interface FittingLoopState {
  // Current model state
  parametricState: ParametricState;
  
  // Renders
  modelRender: OrthoRenderPack | null;
  
  // Silhouettes
  modelSilhouette: ModelSilhouette | null;
  referenceSilhouette: ModelSilhouette | null;
  
  // Errors
  errorCurves: ErrorCurves | null;
  scalarScores: ScalarScores | null;
  keypointErrors: KeypointError[];
  
  // Optimization
  currentStage: "A" | "B" | "C" | "D";
  iteration: number;
  convergence: { converged: boolean; reason: string };
  
  // Patches
  patchTimeline: PatchTimeline;
  pendingPatch: Patch | null;
  
  // UI state
  selectedView: "top" | "side" | "front" | "rear" | null;
  selectedKeypoint: string | null;
  selectedFeature: string | null;
}
```

### **Patch Stack State**

```typescript
interface PatchStackState {
  patches: Patch[];
  currentIndex: number;
  acceptedIndices: Set<number>; // Patches that have been accepted
}
```

**[END:TAG:STATE_MGMT]**

---

## 16. RELATIONSHIP MATRIX

**[TAG:RELATIONS] [TAG:FITTING_LOOP]**

### **System Relationships**

| System | Relationship | Data Flow |
|--------|-------------|-----------|
| ReferencePack | Provides targets | Reference images → Reference silhouettes → Error computation |
| Curve-First Generator | Optimizes curves | B/K/D curves → Optimization → Updated curves |
| Feature Node System | Optimizes features | Feature params → Stage C optimization → Updated features |
| Compiler | Applies patches | Patches → Compiler → Final asset bundle |

### **Formula Relationships**

| Formula | Inputs | Output | Used By |
|---------|--------|--------|---------|
| metersPerPixel = Wm / Wpx | Camera frustum, resolution | Pixel-to-meter conversion | Silhouette extraction |
| halfBeam = 0.5 * (z_right - z_left) | Pixel extrema | Beam curve | Error computation |
| eB = B_model - B_ref | Model, reference | Error curve | Objective function |
| rmsB = sqrt(mean(eB²)) | Error curve | Scalar score | Convergence check |
| E_fair = Σ (B[i+1] - 2B[i] + B[i-1])² | Curve values | Fairness energy | Objective function |
| J = w_B*||e_B||² + w_K*||e_K||² + w_D*||e_D||² + λ*E_fair | Errors, weights | Objective value | Optimization |

**[END:TAG:RELATIONS]**

---

## 📝 WHAT YOU GET IMMEDIATELY AFTER STEP 4 IS BUILT

**You can:**

- Render model in orthographic views matching ReferencePack
- Extract silhouettes automatically
- Compute error metrics in meters
- Optimize curves and features automatically
- Track changes via patch timeline
- Fit any parametric asset to reference images

**This is the foundation for automated fitting and LLM-assisted optimization.**

---

**Status:** PHASE 1 - Foundation System Mapping  
**Confidence:** 0.95 (Very High - Complete specification extracted from modelmaker.txt)  
**Next:** Implement Metrics + Fitting Loop system based on this specification



---


---

<!-- AUTO-GENERATED FROM: MASTER_COMPILER_RUNTIME_OUTPUTS_SYSTEM_MAP.md -->
<!-- DO NOT EDIT THIS SECTION DIRECTLY -->
<!-- Source File: MASTER_COMPILER_RUNTIME_OUTPUTS_SYSTEM_MAP.md -->
<!-- File Size: 45161 bytes -->

<a id='compiler-runtime-outputs-system-map'></a>

# MASTER COMPILER + RUNTIME OUTPUTS SYSTEM MAP
**Complete System Anatomy Mapping - Compiler + Runtime Outputs System (Step 5)**

**Date:** 2025-01-27  
**Version:** 1.0.0  
**Purpose:** Complete S.A.M. documentation for Compiler + Runtime Outputs System (modelmaker.txt Step 5)  
**Status:** PHASE 1 - Foundation System Mapping  
**System:** Lucid Image Editor - Universal Parametric Asset Engine  
**Reference:** modelmaker.txt Step 5 (Lines 2164-2519)

---

## 📋 TABLE OF CONTENTS

1. [System Overview](#1-system-overview)
2. [The Compiler](#2-the-compiler)
3. [LOD Generation](#3-lod-generation)
4. [Collision Output](#4-collision-output)
5. [Field Proxies](#5-field-proxies)
6. [Hardpoints System](#6-hardpoints-system)
7. [Export Bundle](#7-export-bundle)
8. [Diagnostics Output](#8-diagnostics-output)
9. [LLM Patch Protocol](#9-llm-patch-protocol)
10. [Master System Map](#10-master-system-map)
11. [Integration Points](#11-integration-points)
12. [File Dependency Graph](#12-file-dependency-graph)
13. [Type Flow Map](#13-type-flow-map)
14. [Relationship Matrix](#14-relationship-matrix)

---

## 1. SYSTEM OVERVIEW

**[TAG:OVERVIEW] [TAG:COMPILER]**

### **What is the Compiler + Runtime Outputs System?**

**Step 5 is where this becomes a production engine instead of a modeling experiment.**

The Compiler + Runtime Outputs system transforms parametric definitions into complete, game-ready AssetBundles with LOD meshes, collision data, field proxies, hardpoints, and diagnostics.

**Location:** Architecture defined in modelmaker.txt Step 5  
**Purpose:** Convert parametric assets into production-ready runtime outputs  
**Core Principle:** One entry point, deterministic, everything versionable and reproducible

### **Key Responsibilities**

1. **Compiler Execution**: Single entry point that takes spec.json + featureGraph + ReferencePack (optional)
2. **LOD Generation**: Build multiple detail levels by design (not decimation)
3. **Collision Output**: Generate collision meshes/primitive colliders for physics
4. **Field Proxies**: Generate sphere/capsule proxies for water/air/contacts
5. **Hardpoints Resolution**: Resolve design-space hardpoints to world transforms
6. **Export Bundle**: Package everything into glTF/GLB + metadata
7. **Diagnostics**: Generate ortho renders, error curves, fit reports
8. **LLM Integration**: Safe, bounded patch protocol for AI-assisted optimization

### **Core Principles**

- **Deterministic**: Same inputs → same outputs (hash-based reproducibility)
- **Production-ready**: Game-ready AssetBundles, not experiments
- **Versionable**: Everything has versioning and patch history
- **Reproducible**: Build hash ensures identical rebuilds
- **Universal**: Same pipeline for boats, cars, helicopters, buildings

### **What the Compiler Takes**

**Inputs:**
- BaseCurves (B/K/D splines + section stations)
- FeatureGraph (nodes + params + ordering)
- ReferencePack (optional, for fit diagnostics)

### **What the Compiler Outputs**

**Complete, game-ready AssetBundle:**
- render meshes (LOD0/1/2…)
- collision meshes / primitive colliders
- field proxies (spheres/capsules) for water/air/contacts
- hardpoints (rigging/hinges/mounts)
- metadata + versioned param patch history
- optional ortho renders + error reports (for LLM/human tuning)

**This is the universal "build artifact."**

**[END:TAG:OVERVIEW]**

---

## 2. THE COMPILER

**[TAG:COMPILER] [TAG:CORE]**

### **2.1 Compiler Inputs**

**5.1.1 Inputs**

**spec.json (the parametric definition)**

Contains:
- base curves, section params
- feature graph
- region maps
- material slots

**build config:**

- LOD presets
- collider preset
- proxy preset
- export format options

### **2.2 Compiler Outputs: AssetBundle Structure**

**5.1.2 Outputs: AssetBundle/**

```
AssetBundle/
  manifest.json
  meshes/
    LOD0.glb
    LOD1.glb
    LOD2.glb
  collision/
    colliders.json
    collisionMesh.glb   (optional)
  proxies/
    buoyancySpheres.json
    aeroProxies.json
  hardpoints/
    hardpoints.json
  diagnostics/
    ortho_top.png
    ortho_side.png
    ortho_front.png
    ortho_rear.png
    error_curves.json
    fit_report.json
  history/
    patches.jsonl
    spec_snapshot.json
```

**Everything versionable. Everything reproducible.**

### **2.3 TypeScript Interfaces**

```typescript
interface AssetSpec {
  id: string;
  template: string; // e.g., "BoatHullTemplate"
  base: {
    L: number;
    Nu: number;
    Nv: number;
    curves: {
      B: CurveSpec;
      K: CurveSpec;
      D: CurveSpec;
    };
    sectionStations: SectionStation[];
    envelopes?: Record<string, EnvelopeSpec>;
  };
  regions: Record<string, RegionSpec>;
  features: FeatureNode[];
  materials: Record<string, MaterialSpec>;
}

interface BuildConfig {
  id: string;
  lods: LODPreset[];
  collision: ColliderPreset;
  proxies: ProxyPreset;
  export: ExportPreset;
}

interface AssetBundleManifest {
  id: string;
  specId: string;
  buildHash: string; // hash(spec.json + patches + compiler version + build config)
  compilerVersion: string;
  buildTimestamp: string;
  meshes: {
    LOD0: string; // path to LOD0.glb
    LOD1?: string;
    LOD2?: string;
  };
  collision: {
    colliders: string;
    mesh?: string;
  };
  proxies: {
    buoyancySpheres?: string;
    aeroProxies?: string;
  };
  hardpoints: string;
  diagnostics?: {
    orthoRenders: Record<string, string>;
    errorCurves: string;
    fitReport: string;
  };
  history: {
    patches: string;
    specSnapshot: string;
  };
}

interface CompilerResult {
  manifest: AssetBundleManifest;
  bundlePath: string;
  buildHash: string;
  diagnostics?: DiagnosticsOutput;
}
```

### **2.4 Compiler Entry Point**

```typescript
function compileAsset(
  spec: AssetSpec,
  buildConfig: BuildConfig,
  referencePack?: ReferencePack
): CompilerResult {
  // 1. Validate inputs
  validateSpec(spec);
  validateBuildConfig(buildConfig);
  
  // 2. Compute build hash
  const buildHash = computeBuildHash(spec, buildConfig);
  
  // 3. Build LOD meshes
  const lodMeshes = buildAllLODs(spec, buildConfig.lods);
  
  // 4. Build collision
  const collision = buildCollision(spec, buildConfig.collision, lodMeshes);
  
  // 5. Build proxies
  const proxies = buildProxies(spec, buildConfig.proxies, lodMeshes.LOD0);
  
  // 6. Resolve hardpoints
  const hardpoints = resolveHardpoints(spec, lodMeshes.LOD0);
  
  // 7. Generate diagnostics (if ReferencePack provided)
  const diagnostics = referencePack
    ? generateDiagnostics(spec, referencePack, lodMeshes.LOD0)
    : undefined;
  
  // 8. Export GLB files
  const meshPaths = exportGLBs(lodMeshes, buildConfig.export);
  const collisionMeshPath = collision.mesh
    ? exportCollisionMesh(collision.mesh, buildConfig.export)
    : undefined;
  
  // 9. Write JSON files
  const bundlePath = writeAssetBundle({
    manifest: createManifest(spec, buildConfig, buildHash, meshPaths, collision, proxies, hardpoints, diagnostics),
    collision,
    proxies,
    hardpoints,
    diagnostics
  });
  
  return {
    manifest: manifest,
    bundlePath,
    buildHash,
    diagnostics
  };
}
```

### **2.5 Build Hash Computation**

**includes build hash:**

```
hash(spec.json + patches + compiler version + build config)
```

**This gives you perfect reproducibility.**

```typescript
function computeBuildHash(
  spec: AssetSpec,
  buildConfig: BuildConfig,
  patches?: ParamPatch[],
  compilerVersion: string = "1.0.0"
): string {
  const specStr = JSON.stringify(spec, null, 0);
  const configStr = JSON.stringify(buildConfig, null, 0);
  const patchesStr = patches ? JSON.stringify(patches, null, 0) : "";
  const input = `${specStr}\n${patchesStr}\n${compilerVersion}\n${configStr}`;
  
  // Use SHA-256 or similar
  return sha256(input).substring(0, 16); // 16 hex chars = 64 bits
}
```

**[END:TAG:COMPILER]**

---

## 3. LOD GENERATION

**[TAG:LOD] [TAG:COMPILER]**

### **3.1 Overview**

**5.2 LOD Generation (do it by design, not decimation)**

**Decimation is fragile for parametric assets. You already control topology through sampling density, so LOD is "just rebuild with fewer samples."**

### **3.2 LOD Presets (Universal)**

**5.2.1 LOD presets (universal)**

**Define LODs by (Nu, Nv) plus feature toggles.**

**Example:**

```
LOD0: Nu=256, Nv=96 (high)
LOD1: Nu=160, Nv=64
LOD2: Nu=96, Nv=40
LOD3: Nu=64, Nv=24 (optional)
```

**TypeScript Interface:**
```typescript
interface LODPreset {
  name: string; // "LOD0", "LOD1", "LOD2"
  Nu: number;   // Longitudinal samples
  Nv: number;   // Cross-sectional samples
  dropStages?: FeatureStage[]; // Stages to disable for this LOD
}

interface BuildConfig {
  lods: LODPreset[];
  // ...
}
```

**Example Configuration:**
```json
{
  "lods": [
    { "name": "LOD0", "Nu": 256, "Nv": 96, "dropStages": [] },
    { "name": "LOD1", "Nu": 160, "Nv": 64, "dropStages": ["MICRO"] },
    { "name": "LOD2", "Nu": 96,  "Nv": 40, "dropStages": ["MICRO", "EDGE"] }
  ]
}
```

### **3.3 Feature-Aware Simplification**

**5.2.2 Feature-aware simplification**

**For lower LODs:**
- disable micro features (bosses, tiny lips)
- keep macro silhouette features (cockpit, wheel arches)
- preserve seams/creases (cheap identity)

**This is controlled by feature node "importance":**

```
importance: "macro" | "edge" | "micro"
```

**So the compiler can automatically drop micro features for LOD2+.**

**Implementation:**
```typescript
type FeatureImportance = "macro" | "edge" | "micro";

interface FeatureNode {
  id: string;
  type: string;
  stage: FeatureStage;
  importance: FeatureImportance; // NEW: for LOD control
  enabled: boolean;
  // ... other fields
}

function buildLOD(
  spec: AssetSpec,
  lodPreset: LODPreset
): THREE.Mesh {
  // Filter features based on LOD preset
  const enabledFeatures = spec.features.filter(feature => {
    // Always enable if not in dropStages
    if (!lodPreset.dropStages || !lodPreset.dropStages.includes(feature.stage)) {
      return feature.enabled;
    }
    return false;
  });
  
  // Build base mesh with reduced sampling
  const baseMesh = buildBaseMesh(spec.base, {
    Nu: lodPreset.Nu,
    Nv: lodPreset.Nv
  });
  
  // Apply filtered features
  const finalMesh = applyFeatures(baseMesh, enabledFeatures);
  
  return finalMesh;
}
```

### **3.4 Silhouette Protection**

**5.2.3 "Silhouette protection"**

**You can optionally enforce:**

**LOD1/2 must keep top and side silhouette within ε meters of LOD0.**

**If not, increase samples or keep a macro feature.**

**This becomes an internal quality gate.**

**Implementation:**
```typescript
interface SilhouetteProtectionConfig {
  enabled: boolean;
  epsilon: number; // Maximum allowed silhouette deviation in meters
  views: ("top" | "side")[];
}

function validateLODSilhouette(
  lod0Mesh: THREE.Mesh,
  lodMesh: THREE.Mesh,
  config: SilhouetteProtectionConfig
): { valid: boolean; maxDeviation: number; views: Record<string, number> } {
  if (!config.enabled) {
    return { valid: true, maxDeviation: 0, views: {} };
  }
  
  const deviations: Record<string, number> = {};
  let maxDeviation = 0;
  
  for (const view of config.views) {
    const lod0Silhouette = extractSilhouette(lod0Mesh, view);
    const lodSilhouette = extractSilhouette(lodMesh, view);
    const deviation = computeMaxDeviation(lod0Silhouette, lodSilhouette);
    
    deviations[view] = deviation;
    maxDeviation = Math.max(maxDeviation, deviation);
  }
  
  return {
    valid: maxDeviation <= config.epsilon,
    maxDeviation,
    views: deviations
  };
}

function buildLODWithProtection(
  spec: AssetSpec,
  lodPreset: LODPreset,
  lod0Mesh: THREE.Mesh,
  protectionConfig: SilhouetteProtectionConfig
): THREE.Mesh {
  let lodMesh = buildLOD(spec, lodPreset);
  let validation = validateLODSilhouette(lod0Mesh, lodMesh, protectionConfig);
  
  // If silhouette protection fails, increase sampling or keep macro features
  if (!validation.valid) {
    // Strategy 1: Increase sampling
    lodPreset = {
      ...lodPreset,
      Nu: Math.ceil(lodPreset.Nu * 1.2),
      Nv: Math.ceil(lodPreset.Nv * 1.2)
    };
    lodMesh = buildLOD(spec, lodPreset);
    validation = validateLODSilhouette(lod0Mesh, lodMesh, protectionConfig);
    
    // Strategy 2: If still failing, keep macro features
    if (!validation.valid && lodPreset.dropStages) {
      lodPreset = {
        ...lodPreset,
        dropStages: lodPreset.dropStages.filter(stage => stage !== "MACRO")
      };
      lodMesh = buildLOD(spec, lodPreset);
      validation = validateLODSilhouette(lod0Mesh, lodMesh, protectionConfig);
    }
  }
  
  return lodMesh;
}
```

### **3.5 Build All LODs**

```typescript
function buildAllLODs(
  spec: AssetSpec,
  lodPresets: LODPreset[]
): Record<string, THREE.Mesh> {
  const lodMeshes: Record<string, THREE.Mesh> = {};
  
  // Always build LOD0 first (highest quality)
  lodMeshes.LOD0 = buildLOD(spec, lodPresets[0]);
  
  // Build other LODs
  for (let i = 1; i < lodPresets.length; i++) {
    const preset = lodPresets[i];
    lodMeshes[preset.name] = buildLOD(spec, preset);
  }
  
  return lodMeshes;
}
```

**[END:TAG:LOD]**

---

## 4. COLLISION OUTPUT

**[TAG:COLLISION] [TAG:COMPILER]**

### **4.1 Overview**

**5.3 Collision Output (three tiers)**

**Pick based on gameplay needs.**

### **4.2 Tier A — Primitive Colliders (Fastest)**

**Tier A — Primitive colliders (fastest)**

- boxes/capsules/spheres aligned to anchor frames
- best for vehicles/boats in arcade physics

**TypeScript Interface:**
```typescript
type ColliderType = "box" | "capsule" | "sphere";

interface PrimitiveCollider {
  type: ColliderType;
  transform: {
    position: [number, number, number];
    rotation: [number, number, number, number]; // quaternion
  };
  size?: [number, number, number]; // for box
  radius?: number; // for capsule/sphere
  halfLength?: number; // for capsule
}

interface ColliderPreset {
  mode: "primitives";
  colliders: PrimitiveCollider[];
}
```

**Example:**
```json
{
  "mode": "primitives",
  "colliders": [
    {
      "type": "box",
      "transform": {
        "position": [0, 0, 0],
        "rotation": [0, 0, 0, 1]
      },
      "size": [3.2, 0.35, 1.1]
    },
    {
      "type": "capsule",
      "transform": {
        "position": [0, 0.9, 0],
        "rotation": [0, 0, 0, 1]
      },
      "radius": 0.08,
      "halfLength": 0.9
    }
  ]
}
```

### **4.3 Tier B — Simplified Collision Mesh (Balanced)**

**Tier B — Simplified collision mesh (balanced)**

- generate a low-resolution hull/shape mesh directly from LOD2
- optionally shrink-wrap to avoid jitter
- best for stable contact and interior cutouts

**TypeScript Interface:**
```typescript
interface ColliderPreset {
  mode: "mesh";
  useLOD: string; // "LOD2", etc.
  shrinkWrap?: boolean;
  shrinkWrapDistance?: number; // meters
}
```

**Implementation:**
```typescript
function buildCollisionMesh(
  lodMesh: THREE.Mesh,
  config: ColliderPreset
): THREE.Mesh {
  let collisionMesh = lodMesh.clone();
  
  // Optional shrink-wrap to avoid jitter
  if (config.shrinkWrap) {
    collisionMesh = shrinkWrapMesh(collisionMesh, config.shrinkWrapDistance || 0.01);
  }
  
  return collisionMesh;
}
```

### **4.4 Tier C — Hybrid (Recommended Universal Default)**

**Tier C — Hybrid (recommended universal default)**

- macro collision mesh + primitive supplements
- e.g., boat hull mesh + capsule for mast base zone, etc.

**TypeScript Interface:**
```typescript
interface ColliderPreset {
  mode: "hybrid";
  useLOD: string; // "LOD2" for base mesh
  primitives: PrimitiveCollider[]; // Supplements
  shrinkWrap?: boolean;
}
```

**Example:**
```json
{
  "mode": "hybrid",
  "useLOD": "LOD2",
  "primitives": [
    {
      "type": "capsule",
      "fromHardpoint": "mast_base",
      "axis": "Y",
      "radius": 0.08,
      "halfLength": 0.9
    }
  ],
  "shrinkWrap": true
}
```

**Implementation:**
```typescript
function buildCollision(
  spec: AssetSpec,
  config: ColliderPreset,
  lodMeshes: Record<string, THREE.Mesh>
): CollisionOutput {
  switch (config.mode) {
    case "primitives":
      return {
        mode: "primitives",
        colliders: config.colliders
      };
      
    case "mesh":
      const lodMesh = lodMeshes[config.useLOD];
      return {
        mode: "mesh",
        mesh: buildCollisionMesh(lodMesh, config)
      };
      
    case "hybrid":
      const baseMesh = lodMeshes[config.useLOD];
      const collisionMesh = config.shrinkWrap
        ? shrinkWrapMesh(baseMesh.clone(), 0.01)
        : baseMesh.clone();
      return {
        mode: "hybrid",
        mesh: collisionMesh,
        primitives: resolvePrimitiveColliders(config.primitives, spec)
      };
  }
}

interface CollisionOutput {
  mode: "primitives" | "mesh" | "hybrid";
  colliders?: PrimitiveCollider[];
  mesh?: THREE.Mesh;
  primitives?: PrimitiveCollider[];
}
```

### **4.5 Key Rule**

**Key rule: collision is a separate build target. Never "reuse LOD0" as collision.**

**Rationale:** Collision meshes have different requirements (simpler, no micro features, possibly shrink-wrapped). Using LOD0 directly would be wasteful and potentially problematic.

**[END:TAG:COLLISION]**

---

## 5. FIELD PROXIES

**[TAG:PROXIES] [TAG:COMPILER]**

### **5.1 Overview**

**5.4 Field Proxies (the cheap "SDF benefits" you actually want)**

**You don't need full SDF. You need queryable proxies.**

### **5.2 Union-of-Spheres Proxy Set**

**5.4.1 Union-of-spheres proxy set**

**Represent the volume with spheres:**
- for buoyancy sampling
- for water intersection estimates
- for cheap distance-ish checks

**Store as:**
```json
{
  "spheres": [
    {"c": [x, y, z], "r": 0.12, "w": 1.0},
    ...
  ]
}
```

**Generate them deterministically:**
- sample stations along u
- at each station place 1–3 spheres across beam
- radius tied to local beam and depth

**TypeScript Interface:**
```typescript
interface SphereProxy {
  c: [number, number, number]; // center
  r: number;                    // radius (meters)
  w: number;                    // weight (for union operations)
}

interface BuoyancySpheresProxy {
  spheres: SphereProxy[];
}

interface ProxyPreset {
  hullSpheres?: {
    generator: "stationGrid";
    stationsU: number;        // Number of stations along u
    rowsS: number[];          // s positions for sphere rows [0..1]
    radiusScale: number[];    // Radius scale per row
    displacementScale: number; // Overall scale factor
  };
}
```

**Implementation:**
```typescript
function buildBuoyancySpheres(
  mesh: THREE.Mesh,
  config: ProxyPreset
): BuoyancySpheresProxy {
  if (!config.hullSpheres) {
    return { spheres: [] };
  }
  
  const { stationsU, rowsS, radiusScale, displacementScale } = config.hullSpheres;
  const spheres: SphereProxy[] = [];
  
  // Sample stations along u
  for (let i = 0; i < stationsU; i++) {
    const u = i / (stationsU - 1); // 0..1
    
    // Get local beam and depth at this station
    const localBeam = getLocalBeam(mesh, u);
    const localDepth = getLocalDepth(mesh, u);
    
    // Place spheres across beam at each row
    for (let rowIdx = 0; rowIdx < rowsS.length; rowIdx++) {
      const s = rowsS[rowIdx];
      const radiusScaleRow = radiusScale[rowIdx] || 1.0;
      
      // Compute sphere center
      const center = getPointAtUS(mesh, u, s);
      
      // Compute sphere radius (tied to local beam and depth)
      const radius = (localBeam * radiusScaleRow * displacementScale) / rowsS.length;
      
      spheres.push({
        c: [center.x, center.y, center.z],
        r: radius,
        w: 1.0
      });
    }
  }
  
  return { spheres };
}
```

### **5.3 Capsule Chains (Good for Long Structures)**

**5.4.2 Capsule chains (good for long structures)**

**Mast, boom, fuselage: capsules are perfect.**

**TypeScript Interface:**
```typescript
interface CapsuleProxy {
  start: [number, number, number];
  end: [number, number, number];
  radius: number;
}

interface CapsuleChainProxy {
  capsules: CapsuleProxy[];
}
```

**Implementation:**
```typescript
function buildCapsuleChain(
  hardpoints: Hardpoint[],
  config: { radius: number }
): CapsuleChainProxy {
  const capsules: CapsuleProxy[] = [];
  
  // Build capsules between consecutive hardpoints
  for (let i = 0; i < hardpoints.length - 1; i++) {
    const start = hardpoints[i].worldTransform.position;
    const end = hardpoints[i + 1].worldTransform.position;
    
    capsules.push({
      start: [start.x, start.y, start.z],
      end: [end.x, end.y, end.z],
      radius: config.radius
    });
  }
  
  return { capsules };
}
```

### **5.4 Aero Proxies (Optional)**

**5.4.3 Aero proxies (optional)**

**For aircraft/helis: store surface patches or spanwise sample points with normals/areas.**

**TypeScript Interface:**
```typescript
interface AeroSample {
  position: [number, number, number];
  normal: [number, number, number];
  area: number; // square meters
}

interface AeroProxies {
  samples: AeroSample[];
}
```

**Implementation:**
```typescript
function buildAeroProxies(
  mesh: THREE.Mesh,
  config: { sampleDensity: number }
): AeroProxies {
  const samples: AeroSample[] = [];
  const geometry = mesh.geometry;
  
  // Sample surface patches
  const faceCount = geometry.index ? geometry.index.count / 3 : geometry.attributes.position.count / 3;
  const sampleInterval = Math.max(1, Math.floor(faceCount / (config.sampleDensity * 1000)));
  
  for (let i = 0; i < faceCount; i += sampleInterval) {
    const face = getFaceAt(geometry, i);
    const center = computeFaceCenter(face);
    const normal = computeFaceNormal(face);
    const area = computeFaceArea(face);
    
    samples.push({
      position: [center.x, center.y, center.z],
      normal: [normal.x, normal.y, normal.z],
      area
    });
  }
  
  return { samples };
}
```

### **5.5 Complete Proxy Build**

```typescript
function buildProxies(
  spec: AssetSpec,
  config: ProxyPreset,
  mesh: THREE.Mesh,
  hardpoints?: Hardpoint[]
): ProxyOutput {
  const output: ProxyOutput = {};
  
  if (config.hullSpheres) {
    output.buoyancySpheres = buildBuoyancySpheres(mesh, config);
  }
  
  if (config.capsuleChain && hardpoints) {
    output.capsuleChain = buildCapsuleChain(hardpoints, config.capsuleChain);
  }
  
  if (config.aero) {
    output.aeroProxies = buildAeroProxies(mesh, config.aero);
  }
  
  return output;
}

interface ProxyOutput {
  buoyancySpheres?: BuoyancySpheresProxy;
  capsuleChain?: CapsuleChainProxy;
  aeroProxies?: AeroProxies;
}
```

**[END:TAG:PROXIES]**

---

## 6. HARDPOINTS SYSTEM

**[TAG:HARDPOINTS] [TAG:COMPILER]**

### **6.1 Overview**

**5.5 Hardpoints (attachments as first-class data)**

**Hardpoints are non-negotiable for rigs, vehicles, and simulation.**

### **6.2 Hardpoint Format**

**5.5.1 Hardpoint format**

**Each hardpoint includes:**
- name/id
- world transform (pos + quaternion)
- parent region/chart (optional)
- semantic role
- constraints (load limits, axis locks, etc.)

**Example:**
```json
{
  "hardpoints": [
    {
      "id": "rudder_gudgeon_upper",
      "role": "hinge",
      "pos": [-1.98, 0.22, 0.00],
      "rot": [0, 0, 0, 1],
      "meta": {
        "axis": "Y",
        "limitDeg": 35
      }
    }
  ]
}
```

**TypeScript Interface:**
```typescript
type HardpointRole = "hinge" | "mount" | "attachment" | "anchor";

interface HardpointSpec {
  id: string;
  attach: "asset" | "subpart";
  def: 
    | { mode: "UV"; region: string; u: number; s: number; h: number; normalHint?: "up" | "out" | "forward" }
    | { mode: "ANCHOR"; anchorId: string; offset: [number, number, number] };
  meta?: {
    role?: HardpointRole;
    axis?: string;
    limitDeg?: number;
    loadLimit?: number;
    [key: string]: any;
  };
}

interface ResolvedHardpoint {
  id: string;
  role: HardpointRole;
  worldTransform: {
    position: [number, number, number];
    rotation: [number, number, number, number]; // quaternion
  };
  parentRegion?: string;
  meta?: Record<string, any>;
}
```

### **6.3 How Hardpoints Stay Stable**

**5.5.2 How hardpoints stay stable**

**Hardpoints should be defined in design space:**
- by (u,s) and a local "height fraction"
- or by anchor frames derived from curves/seams

**Then the compiler resolves them into world space for each build.**

**So when you tune hull shape, hardpoints move correctly.**

**Implementation:**
```typescript
function resolveHardpoints(
  spec: AssetSpec,
  mesh: THREE.Mesh
): ResolvedHardpoint[] {
  const resolved: ResolvedHardpoint[] = [];
  
  for (const hardpointSpec of spec.hardpoints || []) {
    let worldPosition: THREE.Vector3;
    let worldRotation: THREE.Quaternion;
    
    if (hardpointSpec.def.mode === "UV") {
      const { region, u, s, h, normalHint } = hardpointSpec.def;
      
      // Get point on mesh at (u, s)
      const surfacePoint = getPointAtUS(mesh, u, s, region);
      
      // Get normal at that point
      const normal = getNormalAtUS(mesh, u, s, region, normalHint);
      
      // Compute height offset
      const heightOffset = computeHeightOffset(mesh, u, s, h, normal);
      
      // World position
      worldPosition = surfacePoint.add(heightOffset);
      
      // World rotation (align to normal)
      worldRotation = computeRotationFromNormal(normal, normalHint);
      
    } else if (hardpointSpec.def.mode === "ANCHOR") {
      const anchor = findAnchor(spec, hardpointSpec.def.anchorId);
      if (!anchor) {
        throw new Error(`Anchor ${hardpointSpec.def.anchorId} not found`);
      }
      
      const anchorTransform = resolveAnchorTransform(anchor, mesh);
      const offset = new THREE.Vector3(...hardpointSpec.def.offset);
      
      worldPosition = anchorTransform.position.add(offset);
      worldRotation = anchorTransform.rotation;
    }
    
    resolved.push({
      id: hardpointSpec.id,
      role: hardpointSpec.meta?.role || "attachment",
      worldTransform: {
        position: [worldPosition.x, worldPosition.y, worldPosition.z],
        rotation: [worldRotation.x, worldRotation.y, worldRotation.z, worldRotation.w]
      },
      parentRegion: hardpointSpec.def.mode === "UV" ? hardpointSpec.def.region : undefined,
      meta: hardpointSpec.meta
    });
  }
  
  return resolved;
}
```

### **6.4 Helper Functions**

```typescript
function getPointAtUS(
  mesh: THREE.Mesh,
  u: number,
  s: number,
  region?: string
): THREE.Vector3 {
  // Interpolate vertex positions based on (u, s) design coordinates
  // Implementation depends on mesh structure and design coordinate storage
  // ...
}

function getNormalAtUS(
  mesh: THREE.Mesh,
  u: number,
  s: number,
  region?: string,
  hint?: "up" | "out" | "forward"
): THREE.Vector3 {
  // Get surface normal at (u, s)
  // Use hint to adjust if needed
  // ...
}

function computeHeightOffset(
  mesh: THREE.Mesh,
  u: number,
  s: number,
  h: number,
  normal: THREE.Vector3
): THREE.Vector3 {
  // h is a "height fraction" (0..1), scale by local depth/height
  const localHeight = getLocalHeight(mesh, u, s);
  return normal.multiplyScalar(h * localHeight);
}

function computeRotationFromNormal(
  normal: THREE.Vector3,
  hint?: "up" | "out" | "forward"
): THREE.Quaternion {
  // Compute quaternion that aligns default axis to normal
  const defaultAxis = hint === "up" 
    ? new THREE.Vector3(0, 1, 0)
    : hint === "out"
    ? new THREE.Vector3(0, 0, 1)
    : new THREE.Vector3(1, 0, 0);
  
  const quat = new THREE.Quaternion();
  quat.setFromUnitVectors(defaultAxis, normal.normalize());
  return quat;
}
```

**[END:TAG:HARDPOINTS]**

---

## 7. EXPORT BUNDLE

**[TAG:EXPORT] [TAG:COMPILER]**

### **7.1 Overview**

**5.6 Export bundle (glTF/GLB + metadata)**

**Your engine is Three.js, so glTF is the natural export.**

### **7.2 Mesh Export Requirements**

**Mesh export requirements**

- stable vertex order where possible (optional)
- normals computed deterministically
- tangents optional (needed for normal mapping)
- material slots: hull, deck, fittings

**Implementation:**
```typescript
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';

interface ExportPreset {
  format: "glb" | "gltf";
  includeTangents?: boolean;
  includeUV?: boolean;
  materialSlots?: Record<string, string>; // slot name -> material name
}

function exportGLB(
  mesh: THREE.Mesh,
  preset: ExportPreset
): Promise<ArrayBuffer> {
  const exporter = new GLTFExporter();
  
  const options = {
    binary: preset.format === "glb",
    includeCustomExtensions: false,
    onlyVisible: false,
    // Ensure deterministic normals
    // Ensure stable vertex order
  };
  
  return new Promise((resolve, reject) => {
    exporter.parse(
      mesh,
      (result) => {
        if (result instanceof ArrayBuffer) {
          resolve(result);
        } else {
          reject(new Error("GLTF export failed"));
        }
      },
      (error) => reject(error),
      options
    );
  });
}
```

### **7.3 Metadata Export**

**Metadata export**

**manifest.json points to everything**

**includes build hash:**

```
hash(spec.json + patches + compiler version + build config)
```

**This gives you perfect reproducibility.**

**Implementation:**
```typescript
function writeAssetBundle(
  bundle: {
    manifest: AssetBundleManifest;
    collision: CollisionOutput;
    proxies: ProxyOutput;
    hardpoints: ResolvedHardpoint[];
    diagnostics?: DiagnosticsOutput;
  },
  outputPath: string
): string {
  const bundleDir = path.join(outputPath, bundle.manifest.id);
  fs.mkdirSync(bundleDir, { recursive: true });
  
  // Write manifest.json
  fs.writeFileSync(
    path.join(bundleDir, "manifest.json"),
    JSON.stringify(bundle.manifest, null, 2)
  );
  
  // Write collision
  if (bundle.collision.colliders) {
    fs.writeFileSync(
      path.join(bundleDir, "collision", "colliders.json"),
      JSON.stringify({ colliders: bundle.collision.colliders }, null, 2)
    );
  }
  if (bundle.collision.mesh) {
    // Export collision mesh GLB
    // ...
  }
  
  // Write proxies
  if (bundle.proxies.buoyancySpheres) {
    fs.writeFileSync(
      path.join(bundleDir, "proxies", "buoyancySpheres.json"),
      JSON.stringify(bundle.proxies.buoyancySpheres, null, 2)
    );
  }
  // ... other proxies
  
  // Write hardpoints
  fs.writeFileSync(
    path.join(bundleDir, "hardpoints", "hardpoints.json"),
    JSON.stringify({ hardpoints: bundle.hardpoints }, null, 2)
  );
  
  // Write diagnostics
  if (bundle.diagnostics) {
    // Write ortho renders (PNG)
    // Write error curves JSON
    // Write fit report JSON
  }
  
  return bundleDir;
}
```

**[END:TAG:EXPORT]**

---

## 8. DIAGNOSTICS OUTPUT

**[TAG:DIAGNOSTICS] [TAG:COMPILER]**

### **8.1 Overview**

**5.7 Diagnostics output (so tuning is scientific)**

**If ReferencePack is present, compiler outputs:**
- ortho renders
- extracted silhouette arrays
- error arrays in meters
- final fit score summary

### **8.2 Fit Report Format**

**fit_report.json example:**

```json
{
  "rms": { "B": 0.0082, "K": 0.0065, "D": 0.0101 },
  "max": { "B": 0.021, "K": 0.018, "D": 0.026 },
  "notes": [
    "Top: slight width excess at u=0.62–0.70",
    "Side: deck drop too early near stern"
  ]
}
```

**TypeScript Interface:**
```typescript
interface FitReport {
  rms: {
    B: number;
    K: number;
    D: number;
  };
  max: {
    B: number;
    K: number;
    D: number;
  };
  notes: string[];
}

interface DiagnosticsOutput {
  orthoRenders: Record<string, ImageData>; // "top", "side", "front", "rear"
  errorCurves: ErrorCurves;
  fitReport: FitReport;
}
```

**Implementation:**
```typescript
function generateDiagnostics(
  spec: AssetSpec,
  referencePack: ReferencePack,
  mesh: THREE.Mesh
): DiagnosticsOutput {
  // Render orthographic views
  const orthoRenders = renderOrthoViews(mesh, ["top", "side", "front", "rear"]);
  
  // Extract silhouettes
  const modelSilhouettes = extractModelSilhouettes(orthoRenders);
  const referenceSilhouettes = extractReferenceSilhouettes(referencePack);
  
  // Compute errors
  const errorCurves = computeErrorCurves(modelSilhouettes, referenceSilhouettes);
  const scalarScores = computeScalarScores(errorCurves);
  
  // Generate fit report
  const fitReport: FitReport = {
    rms: {
      B: scalarScores.rmsB,
      K: scalarScores.rmsK,
      D: scalarScores.rmsD
    },
    max: {
      B: scalarScores.maxB,
      K: scalarScores.maxK,
      D: scalarScores.maxD
    },
    notes: generateFitNotes(errorCurves, scalarScores)
  };
  
  return {
    orthoRenders,
    errorCurves,
    fitReport
  };
}

function generateFitNotes(
  errors: ErrorCurves,
  scores: ScalarScores
): string[] {
  const notes: string[] = [];
  
  // Analyze error curves and generate human-readable notes
  // ...
  
  return notes;
}
```

**[END:TAG:DIAGNOSTICS]**

---

## 9. LLM PATCH PROTOCOL

**[TAG:LLM] [TAG:PATCH] [TAG:COMPILER]**

### **9.1 Overview**

**5.8 LLM Patch Protocol (safe, bounded, convergent)**

**This is how you actually leverage multimodal models without chaos.**

### **9.2 Inputs You Give the Model**

**5.8.1 Inputs you give the model**

- ortho renders (top/side/front/rear)
- error curve plots OR raw error arrays
- current spec snapshot (only the whitelisted parts)
- parameter bounds + whitelist schema

### **9.3 Output You Accept**

**5.8.2 Output you accept**

**Only a Patch in the exact JSON patch schema (Step 4):**
- changes must be within bounds
- limited magnitude per iteration (step size clamp)
- compiler runs and must improve score or be rejected

**TypeScript Interface:**
```typescript
interface LLMPatchRequest {
  orthoRenders: Record<string, ImageData>;
  errorCurves: ErrorCurves;
  scalarScores: ScalarScores;
  currentSpec: AssetSpec; // Whitelisted parts only
  parameterBounds: Record<string, { min: number; max: number }>;
  whitelistSchema: string[]; // Allowed parameter paths
  stepSizeLimits: Record<string, number>; // Max change per iteration
}

interface LLMPatchResponse {
  patch: ParamPatch; // From Step 4
  reasoning?: string; // Optional explanation
}
```

### **9.4 Acceptance Rules (Automatic Gate)**

**5.8.3 Acceptance rules (automatic gate)**

**accept if:**
- rms_total decreases by ≥ δ
- fairness penalty does not increase past threshold
- no keypoint errors worsen beyond tolerance

**Otherwise reject (or ask for alternate patch).**

**This makes the LLM an optimizer under supervision, not an author.**

**Implementation:**
```typescript
interface PatchAcceptanceCriteria {
  minRMSImprovement: number; // δ: minimum required improvement
  maxFairnessIncrease: number; // Maximum allowed fairness penalty increase
  maxKeypointErrorIncrease: number; // Maximum allowed keypoint error increase
}

function evaluateLLMPatch(
  patch: ParamPatch,
  beforeState: {
    scores: ScalarScores;
    fairness: number;
    keypointErrors: number[];
  },
  afterState: {
    scores: ScalarScores;
    fairness: number;
    keypointErrors: number[];
  },
  criteria: PatchAcceptanceCriteria
): { accepted: boolean; reason: string } {
  // Check RMS improvement
  const rmsImprovement = beforeState.scores.totalRMS - afterState.scores.totalRMS;
  if (rmsImprovement < criteria.minRMSImprovement) {
    return {
      accepted: false,
      reason: `RMS improvement ${rmsImprovement} < minimum ${criteria.minRMSImprovement}`
    };
  }
  
  // Check fairness penalty
  const fairnessIncrease = afterState.fairness - beforeState.fairness;
  if (fairnessIncrease > criteria.maxFairnessIncrease) {
    return {
      accepted: false,
      reason: `Fairness penalty increased by ${fairnessIncrease} > maximum ${criteria.maxFairnessIncrease}`
    };
  }
  
  // Check keypoint errors
  const maxKeypointErrorIncrease = Math.max(
    ...afterState.keypointErrors.map((err, i) => err - beforeState.keypointErrors[i])
  );
  if (maxKeypointErrorIncrease > criteria.maxKeypointErrorIncrease) {
    return {
      accepted: false,
      reason: `Keypoint error increased by ${maxKeypointErrorIncrease} > maximum ${criteria.maxKeypointErrorIncrease}`
    };
  }
  
  return { accepted: true, reason: "All criteria met" };
}
```

### **9.5 LLM Integration Flow**

```typescript
async function requestLLMPatch(
  request: LLMPatchRequest,
  llmClient: LLMClient
): Promise<LLMPatchResponse> {
  // Prepare prompt with ortho renders, error curves, current spec
  const prompt = buildLLMPrompt(request);
  
  // Request patch from LLM
  const response = await llmClient.generatePatch(prompt);
  
  // Validate patch format
  if (!validatePatchFormat(response.patch)) {
    throw new Error("Invalid patch format from LLM");
  }
  
  // Validate patch bounds and step sizes
  if (!validatePatchBounds(response.patch, request.parameterBounds, request.stepSizeLimits)) {
    throw new Error("Patch violates bounds or step size limits");
  }
  
  return response;
}

async function applyLLMPatch(
  spec: AssetSpec,
  patch: ParamPatch,
  referencePack: ReferencePack,
  criteria: PatchAcceptanceCriteria
): Promise<{ accepted: boolean; newSpec: AssetSpec; diagnostics: DiagnosticsOutput }> {
  // Apply patch to spec
  const newSpec = applyPatch(spec, patch);
  
  // Compile new version
  const result = compileAsset(newSpec, buildConfig, referencePack);
  
  // Evaluate before/after
  const beforeState = computeState(spec, referencePack);
  const afterState = computeState(newSpec, referencePack);
  
  const evaluation = evaluateLLMPatch(patch, beforeState, afterState, criteria);
  
  return {
    accepted: evaluation.accepted,
    newSpec: evaluation.accepted ? newSpec : spec,
    diagnostics: result.diagnostics!
  };
}
```

**[END:TAG:LLM]**

---

## 10. MASTER SYSTEM MAP

**[TAG:SYSTEM_MAP] [TAG:COMPILER]**

### **10.1 End-to-End Flow**

**5.9 Master System Map (end-to-end)**

```
[spec.json + featureGraph] ---> (Compiler)
           |                   |
           v                   v
     [Build LOD0 Mesh]    [Build LOD1/2...]
           |
           v
   [Collision Build]   [Proxy Build]   [Hardpoints Resolve]
           \             |             /
            \            |            /
             -----> [AssetBundle Manifest] -----> Export GLB + JSON
```

### **10.2 Optional Fitting Loop**

**Optional fitting:**

```
[ReferencePack] -> [Ortho Render] -> [Silhouette Extract] -> [Error Metrics]
                                      |
                                      v
                                [Patch Proposal]
                                      |
                                      v
                                [Recompile + Gate]
```

### **10.3 Complete Pipeline**

```typescript
function completePipeline(
  spec: AssetSpec,
  buildConfig: BuildConfig,
  referencePack?: ReferencePack
): CompilerResult {
  // Main compilation
  const result = compileAsset(spec, buildConfig, referencePack);
  
  // Optional: Fitting loop
  if (referencePack && result.diagnostics) {
    // Evaluate fit quality
    const fitQuality = evaluateFitQuality(result.diagnostics.fitReport);
    
    // If fit quality is poor, propose patches (manual or LLM)
    if (fitQuality.needsImprovement) {
      // Generate patch proposals
      // Apply patches with acceptance criteria
      // Recompile
      // Iterate until convergence
    }
  }
  
  return result;
}
```

**[END:TAG:SYSTEM_MAP]**

---

## 11. INTEGRATION POINTS

**[TAG:INTEGRATION] [TAG:COMPILER]**

### **Integration with Curve-First Generator (Step 2)**

**Input:**
```
Curve-First Generator (B/K/D curves + section stations)
  → Compiler builds base mesh
  → Applies features
  → Generates LODs
```

### **Integration with Feature Node System (Step 3)**

**Input:**
```
Feature Node System (FeatureGraph)
  → Compiler applies features in stages
  → LOD-aware feature filtering
  → Final mesh output
```

### **Integration with ReferencePack (Step 1)**

**Optional Input:**
```
ReferencePack
  → Compiler generates diagnostics
  → Ortho renders for comparison
  → Error curves for fitting
```

### **Integration with Metrics + Fitting Loop (Step 4)**

**Bidirectional:**
```
Metrics + Fitting Loop
  → Generates patches
  → Compiler applies patches
  → Recompiles and validates
  → Returns diagnostics
```

**[END:TAG:INTEGRATION]**

---

## 12. FILE DEPENDENCY GRAPH

**[TAG:DEPS] [TAG:COMPILER]**

```
Compiler + Runtime Outputs System
  │
  ├─→ modelmaker.txt (Step 5 specification)
  │   └─→ Lines 2164-2519: Complete specification
  │
  ├─→ Curve-First Generator (Step 2)
  │   ├─→ Base mesh generation
  │   └─→ Design coordinates (u, s, side)
  │
  ├─→ Feature Node System (Step 3)
  │   ├─→ Feature graph compilation
  │   └─→ Feature application stages
  │
  ├─→ ReferencePack (Step 1)
  │   └─→ Diagnostics generation
  │
  ├─→ Metrics + Fitting Loop (Step 4)
  │   ├─→ Patch application
  │   └─→ Diagnostics evaluation
  │
  ├─→ Three.js
  │   ├─→ Mesh generation
  │   ├─→ GLTFExporter
  │   └─→ Geometry utilities
  │
  └─→ Output: AssetBundle
      ├─→ GLB files
      ├─→ JSON metadata
      └─→ Diagnostics
```

**[END:TAG:DEPS]**

---

## 13. TYPE FLOW MAP

**[TAG:TYPE_FLOW] [TAG:COMPILER]**

### **Compilation Flow**

```
AssetSpec + BuildConfig
  ↓
[Validate Inputs]
  ↓
[Compute Build Hash]
  ↓
[Build Base Mesh (Curve-First Generator)]
  ↓
[Apply Features (Feature Node System)]
  ↓
[Build LODs]
  ↓
[Build Collision]
  ↓
[Build Proxies]
  ↓
[Resolve Hardpoints]
  ↓
[Generate Diagnostics (if ReferencePack)]
  ↓
[Export GLB Files]
  ↓
[Write AssetBundle]
  ↓
CompilerResult (manifest + bundle path + diagnostics)
```

**[END:TAG:TYPE_FLOW]**

---

## 14. RELATIONSHIP MATRIX

**[TAG:RELATIONS] [TAG:COMPILER]**

### **System Relationships**

| System | Relationship | Data Flow |
|--------|-------------|-----------|
| Curve-First Generator | Uses | Base mesh generation, design coordinates |
| Feature Node System | Uses | Feature graph, feature application |
| ReferencePack | Optional input | Diagnostics generation |
| Metrics + Fitting Loop | Bidirectional | Patch application, diagnostics feedback |
| Runtime Engine | Output | AssetBundle (GLB + JSON) |

### **Output Relationships**

| Output | Used By | Purpose |
|--------|---------|---------|
| LOD Meshes | Rendering | Visual quality at different distances |
| Collision Data | Physics | Collision detection and response |
| Field Proxies | Simulation | Water/air interaction, buoyancy |
| Hardpoints | Rigging | Attachment points for spars, sails, etc. |
| Diagnostics | Fitting Loop | Error analysis and patch generation |

**[END:TAG:RELATIONS]**

---

## 📝 WHAT STEP 5 "COMPLETES"

**5.10 What Step 5 "completes"**

**After this, your system can produce:**

- a Laser hull that is editable, fit-able, simulation-ready

**and the exact same pipeline can output:**

- a car body with wheel wells, hood scoop, mirrors
- a helicopter fuselage with doors, skids, antenna mounts
- building shells with windows, trims, balconies

**All from a diagram/graph + curves + features.**

---

**Status:** PHASE 1 - Foundation System Mapping  
**Confidence:** 0.95 (Very High - Complete specification extracted from modelmaker.txt)  
**Next:** Implement Compiler + Runtime Outputs system based on this specification



---


---

<!-- AUTO-GENERATED FROM: MASTER_LIBRARY_PRESETS_AUTHORING_SYSTEM_MAP.md -->
<!-- DO NOT EDIT THIS SECTION DIRECTLY -->
<!-- Source File: MASTER_LIBRARY_PRESETS_AUTHORING_SYSTEM_MAP.md -->
<!-- File Size: 44056 bytes -->

<a id='library-presets-authoring-system-map'></a>

# MASTER LIBRARY, PRESETS, AND AUTHORING UX SYSTEM MAP
**Complete System Anatomy Mapping - Library, Presets, and Authoring UX System (Step 6)**

**Date:** 2025-01-27  
**Version:** 1.0.0  
**Purpose:** Complete S.A.M. documentation for Library, Presets, and Authoring UX System (modelmaker.txt Step 6)  
**Status:** PHASE 1 - Foundation System Mapping  
**System:** Lucid Image Editor - Universal Parametric Asset Engine  
**Reference:** modelmaker.txt Step 6 (Lines 2520-2824)

---

## 📋 TABLE OF CONTENTS

1. [System Overview](#1-system-overview)
2. [Library Architecture](#2-library-architecture)
3. [Template Library](#3-template-library)
4. [Feature Library](#4-feature-library)
5. [Diagram Authoring UX](#5-diagram-authoring-ux)
6. [Graph Editor + Patch Timeline](#6-graph-editor--patch-timeline)
7. [Preset Packs](#7-preset-packs)
8. [The "Absolute Limit" First Implementation Target](#8-the-absolute-limit-first-implementation-target)
9. [Repository Structure](#9-repository-structure)
10. [Core Data Model](#10-core-data-model)
11. [Execution Pipeline](#11-execution-pipeline)
12. [Editor UX Specifications](#12-editor-ux-specifications)
13. [Acceptance Tests](#13-acceptance-tests)
14. [Laser Pack v1 Specification](#14-laser-pack-v1-specification)
15. [Integration Points](#15-integration-points)
16. [File Dependency Graph](#16-file-dependency-graph)
17. [Relationship Matrix](#17-relationship-matrix)

---

## 1. SYSTEM OVERVIEW

**[TAG:OVERVIEW] [TAG:LIBRARY] [TAG:PRESETS] [TAG:AUTHORING]**

### **What is the Library, Presets, and Authoring UX System?**

**Step 6 — Library, Presets, and Authoring UX (the "universal editor" product layer)**

**This is the last layer: turning the engine into a repeatable system where you can author "editable default models" quickly, safely, and endlessly—without UI chaos.**

**Location:** Architecture defined in modelmaker.txt Step 6  
**Purpose:** Product layer that enables repeatable asset authoring  
**Core Principle:** Everything is reproducible, fit-able, and patchable

### **Key Responsibilities**

1. **Template Library**: Provide universal base classes for different asset types
2. **Feature Library**: Ship primitives and composed features
3. **Diagram UX**: SVG tools that create nodes (intuitive authoring)
4. **Graph Editor**: Blueprint-level control over feature graph
5. **Patch Timeline**: Geometry git system for undo/redo
6. **Preset Packs**: Ready-to-edit baseline assets

### **What Step 6 Produces**

- Template Library (boats/cars/fuselages/buildings)
- Feature Library (cockpits, wheel arches, scoops, seams, bosses…)
- Diagram UX (SVG tools that create nodes)
- Graph + Patch Timeline (blueprint-like editor)
- Preset Packs (ready-to-edit baseline assets)

**And it locks the "absolute limit" philosophy: everything is reproducible, fit-able, and patchable.**

### **Core Principles**

- **Universal**: Same system works for boats, cars, helicopters, buildings
- **Repeatable**: Author once, reuse everywhere
- **Safe**: Bounded edits, undoable patches, versioned history
- **Intuitive**: Diagram-style editing (SVG → nodes)
- **Complete**: Everything needed to author editable default models

**[END:TAG:OVERVIEW]**

---

## 2. LIBRARY ARCHITECTURE

**[TAG:LIBRARY] [TAG:ARCHITECTURE]**

### **2.1 Asset = Template + Preset + FeatureGraph**

**6.1.1 Asset = Template + Preset + FeatureGraph**

**Template:** code + topology rules (Step 2 base generator)

**Preset:** default curve shapes + section stations + materials

**FeatureGraph:** nodes enabled for this asset class

**BuildConfig:** LOD/collider/proxy/hardpoint presets

**So "Laser hull" is:**
- Template: BoatHullTemplate
- Preset: LaserPreset_v1
- FeatureGraph: LaserFeatures_v1
- BuildConfig: SailboatConfig_v1

### **2.2 Folder Structure (Universal)**

**6.1.2 Folder structure (universal)**

```
src/parametric/
  templates/
    BoatHullTemplate.ts
    CarBodyTemplate.ts
    FuselageTemplate.ts
    BuildingShellTemplate.ts
  features/
    PatchDisplace.ts
    RecessCut.ts
    CreaseLine.ts
    VectorWarp.ts
    BossHole.ts
    library/
      SailboatCockpit.ts
      CenterboardTrunk.ts
      WheelArch.ts
      HoodScoop.ts
      PanelGap.ts
      AntennaMount.ts
  presets/
    laser/
      LaserPreset_v1.json
      LaserFeatures_v1.json
      LaserBuildConfig_v1.json
    defender/
      DefenderPreset_v1.json
      DefenderFeatures_v1.json
      DefenderBuildConfig_v1.json
  compiler/
    compileAsset.ts
    buildLOD.ts
    buildColliders.ts
    buildProxies.ts
    buildHardpoints.ts
  reference/
    ReferencePack.ts
    calibratePack.ts
    extractSilhouettes.ts
    computeErrors.ts
  editor/
    GraphEditor.tsx
    OrthoViewGrid.tsx
    SvgOverlayTools.ts
    PatchTimeline.tsx

assets/
  reference_packs/
  presets/
  bundles/
```

**This is the product skeleton. Everything plugs into it.**

### **2.3 TypeScript Interfaces**

```typescript
interface Asset {
  id: string;
  template: Template;
  preset: Preset;
  featureGraph: FeatureGraph;
  buildConfig: BuildConfig;
}

interface Template {
  id: string;
  type: "BoatHull" | "CarBody" | "Fuselage" | "BuildingShell";
  implementation: string; // Path to TypeScript file
  regions: string[];
  anchors?: AnchorDefinition[];
}

interface Preset {
  id: string;
  templateId: string;
  base: {
    L: number;
    Nu: number;
    Nv: number;
    curves: {
      B: CurveSpec;
      K: CurveSpec;
      D: CurveSpec;
    };
    sectionStations: SectionStation[];
    envelopes?: Record<string, EnvelopeSpec>;
  };
  regions: Record<string, RegionSpec>;
  materials?: Record<string, MaterialSpec>;
}

interface FeatureGraph {
  id: string;
  nodes: FeatureNode[];
}

interface BuildConfig {
  id: string;
  lods: LODPreset[];
  collision: ColliderPreset;
  proxies: ProxyPreset;
  export: ExportPreset;
}

function loadAsset(assetId: string): Asset {
  const preset = loadPreset(assetId);
  const template = loadTemplate(preset.templateId);
  const featureGraph = loadFeatureGraph(assetId);
  const buildConfig = loadBuildConfig(assetId);
  
  return {
    id: assetId,
    template,
    preset,
    featureGraph,
    buildConfig
  };
}
```

**[END:TAG:LIBRARY]**

---

## 3. TEMPLATE LIBRARY

**[TAG:TEMPLATES] [TAG:LIBRARY]**

### **3.1 Overview**

**6.2 Template Library (the 4 universal base classes)**

**All four reuse the same feature node system.**

### **3.2 Template A — BoatHullTemplate**

**Template A — BoatHullTemplate**

- curves: B(u), K(u), D(u)
- section stations: bow/mid/stern params
- regions: hull, deck, rail, transom, cockpitZone
- outputs: hull mesh + deck mesh (separate charts)

**TypeScript Interface:**
```typescript
interface BoatHullTemplate extends Template {
  type: "BoatHull";
  curves: {
    B: Curve1D; // Half-beam (top-view constraint)
    K: Curve1D; // Bottom/keel line (side-view constraint)
    D: Curve1D; // Deck/shear line (side-view constraint)
  };
  sectionStations: SectionStation[];
  regions: {
    hull: RegionSpec;
    deck: RegionSpec;
    rail: RegionSpec;
    transom?: RegionSpec;
    cockpitZone?: RegionSpec;
  };
}

function generateBoatHull(
  template: BoatHullTemplate,
  preset: Preset
): { hullMesh: THREE.Mesh; deckMesh: THREE.Mesh } {
  // Implementation from Step 2 (Curve-First Generator)
  // Generates hull mesh and deck mesh as separate charts
  // ...
}
```

### **3.3 Template B — CarBodyTemplate**

**Template B — CarBodyTemplate**

**Same engine, different semantics:**

- B(u) = half-width distribution
- K(u) = ground clearance / belly line
- D(u) = roofline / upper silhouette
- regions: hood, fenders, doors, roof, bumpers
- anchor set: axle centers, wheel arch curves, door seams

**TypeScript Interface:**
```typescript
interface CarBodyTemplate extends Template {
  type: "CarBody";
  curves: {
    B: Curve1D; // Half-width distribution
    K: Curve1D; // Ground clearance / belly line
    D: Curve1D; // Roofline / upper silhouette
  };
  sectionStations: SectionStation[];
  regions: {
    hood: RegionSpec;
    fenders: RegionSpec;
    doors: RegionSpec;
    roof: RegionSpec;
    bumpers: RegionSpec;
  };
  anchors: {
    axleCenters: AnchorDefinition[];
    wheelArchCurves: AnchorDefinition[];
    doorSeams: AnchorDefinition[];
  };
}
```

### **3.4 Template C — FuselageTemplate**

**Template C — FuselageTemplate**

- lengthwise body with cross-section family
- anchors: cabin door, rotor mast, tail boom root
- strong use of VectorWarp + CreaseLine

**TypeScript Interface:**
```typescript
interface FuselageTemplate extends Template {
  type: "Fuselage";
  curves: {
    B: Curve1D; // Half-width / radius distribution
    K: Curve1D; // Bottom profile
    D: Curve1D; // Top profile
  };
  sectionStations: SectionStation[];
  regions: {
    body: RegionSpec;
    cabin?: RegionSpec;
    tail?: RegionSpec;
  };
  anchors: {
    cabinDoor?: AnchorDefinition;
    rotorMast?: AnchorDefinition;
    tailBoomRoot?: AnchorDefinition;
  };
}
```

### **3.5 Template D — BuildingShellTemplate**

**Template D — BuildingShellTemplate**

- floor stack + façade charts
- windows/balconies as feature nodes (recesses + trims)
- orthos matter massively (front/side elevations)

**TypeScript Interface:**
```typescript
interface BuildingShellTemplate extends Template {
  type: "BuildingShell";
  floors: FloorDefinition[];
  facades: FacadeDefinition[];
  regions: {
    facade: RegionSpec;
    windows?: RegionSpec;
    balconies?: RegionSpec;
  };
  anchors?: {
    corners?: AnchorDefinition[];
    floors?: AnchorDefinition[];
  };
}
```

### **3.6 Template Registration**

```typescript
const TEMPLATE_REGISTRY: Record<string, Template> = {
  "BoatHullTemplate": {
    id: "BoatHullTemplate",
    type: "BoatHull",
    implementation: "src/parametric/templates/BoatHullTemplate.ts",
    regions: ["hull", "deck", "rail", "transom", "cockpitZone"]
  },
  "CarBodyTemplate": {
    id: "CarBodyTemplate",
    type: "CarBody",
    implementation: "src/parametric/templates/CarBodyTemplate.ts",
    regions: ["hood", "fenders", "doors", "roof", "bumpers"]
  },
  "FuselageTemplate": {
    id: "FuselageTemplate",
    type: "Fuselage",
    implementation: "src/parametric/templates/FuselageTemplate.ts",
    regions: ["body", "cabin", "tail"]
  },
  "BuildingShellTemplate": {
    id: "BuildingShellTemplate",
    type: "BuildingShell",
    implementation: "src/parametric/templates/BuildingShellTemplate.ts",
    regions: ["facade", "windows", "balconies"]
  }
};

function getTemplate(templateId: string): Template {
  const template = TEMPLATE_REGISTRY[templateId];
  if (!template) {
    throw new Error(`Template ${templateId} not found`);
  }
  return template;
}
```

**[END:TAG:TEMPLATES]**

---

## 4. FEATURE LIBRARY

**[TAG:FEATURES] [TAG:LIBRARY]**

### **4.1 Overview**

**6.3 Feature Library (what you ship as primitives vs "composed features")**

### **4.2 Primitive Features (5 Core)**

**6.3.1 Primitive features (your "5 core" from Step 3)**

- PatchDisplace
- RecessCut
- CreaseLine
- VectorWarp
- BossHole

**These are your "instruction set."**

**Location:** `src/parametric/features/primitives/`

**TypeScript Files:**
- `PatchDisplace.ts`
- `RecessCut.ts`
- `CreaseLine.ts`
- `VectorWarp.ts`
- `BossHole.ts`

### **4.3 Composed Features (Reusable Macros)**

**6.3.2 Composed features (reusable macros)**

**These are just bundles of primitive nodes with shared handles.**

**Examples:**

- **SailboatCockpit** = RecessCut + Rim + optional seat shelf
- **CenterboardTrunk** = PatchDisplace step + CreaseLine edges + slot insert marker
- **WheelArch** = CurveDistance mask + RecessCut + flare lip
- **HoodScoop** = PatchDisplace + RecessCut inlet + crease rim
- **PanelGap** = CreaseLine pair + dark seam material strip
- **AntennaMount** = BossHole + hardpoint

**This is how you move fast: author once, reuse everywhere.**

**Location:** `src/parametric/features/library/`

**TypeScript Files:**
- `SailboatCockpit.ts`
- `CenterboardTrunk.ts`
- `WheelArch.ts`
- `HoodScoop.ts`
- `PanelGap.ts`
- `AntennaMount.ts`

### **4.4 Composed Feature Implementation Pattern**

**TypeScript Interface:**
```typescript
interface ComposedFeature {
  id: string;
  name: string;
  description: string;
  primitiveNodes: FeatureNode[]; // Bundled primitive nodes
  sharedHandles: HandleDefinition[]; // Shared SVG handles
  params: Record<string, ParamDefinition>; // Unified parameter interface
}

function createSailboatCockpit(params: SailboatCockpitParams): ComposedFeature {
  // Create RecessCut node
  const recessNode: FeatureNode = {
    id: `${params.id}_recess`,
    type: "RecessCut",
    stage: "MACRO",
    enabled: true,
    targetRegions: ["deck"],
    placement: { mode: "UV", u0: params.u0, s0: params.s0 },
    mask: {
      kind: "roundedRect",
      uMin: params.uMin,
      uMax: params.uMax,
      sMin: params.sMin,
      sMax: params.sMax,
      r: params.cornerRadius,
      pow: 1.2
    },
    params: {
      depth: params.depth,
      rimWidth: params.rimWidth,
      rimHeight: params.rimHeight,
      rimRoundness: params.rimRoundness
    }
  };
  
  // Create Rim node (CreaseLine or PatchDisplace)
  const rimNode: FeatureNode = {
    id: `${params.id}_rim`,
    type: "CreaseLine",
    stage: "EDGE",
    enabled: true,
    targetRegions: ["deck"],
    placement: { mode: "UV", u0: params.u0, s0: params.s0 },
    mask: {
      kind: "curveBand",
      curveId: `${params.id}_rimCurve`,
      width: params.rimWidth,
      sharpness: 2.2
    },
    params: {
      depth: params.rimDepth,
      bias: 0.0,
      direction: "normal"
    }
  };
  
  // Optional seat shelf (PatchDisplace)
  const seatShelfNode: FeatureNode | null = params.includeSeatShelf
    ? {
        id: `${params.id}_seatShelf`,
        type: "PatchDisplace",
        stage: "MACRO",
        enabled: true,
        targetRegions: ["deck"],
        placement: { mode: "UV", u0: params.seatShelfU, s0: params.s0 },
        mask: {
          kind: "roundedRect",
          uMin: params.seatShelfU - 0.02,
          uMax: params.seatShelfU + 0.02,
          sMin: params.sMin,
          sMax: params.sMax,
          r: 0.01,
          pow: 1.4
        },
        params: {
          height: params.seatShelfHeight,
          profile: "plateau",
          normalMode: "up"
        }
      }
    : null;
  
  return {
    id: params.id,
    name: "SailboatCockpit",
    description: "Cockpit recess with rim and optional seat shelf",
    primitiveNodes: [recessNode, rimNode, ...(seatShelfNode ? [seatShelfNode] : [])],
    sharedHandles: [
      {
        type: "ellipse",
        id: `${params.id}_handle`,
        u: params.u0,
        s: params.s0,
        ru: (params.uMax - params.uMin) / 2,
        rs: (params.sMax - params.sMin) / 2
      }
    ],
    params: {
      u0: { type: "number", min: 0, max: 1, default: params.u0 },
      s0: { type: "number", min: 0, max: 1, default: params.s0 },
      depth: { type: "number", min: 0.01, max: 0.5, default: params.depth },
      // ... other params
    }
  };
}

interface SailboatCockpitParams {
  id: string;
  u0: number;
  s0: number;
  uMin: number;
  uMax: number;
  sMin: number;
  sMax: number;
  cornerRadius: number;
  depth: number;
  rimWidth: number;
  rimHeight: number;
  rimRoundness: number;
  rimDepth: number;
  includeSeatShelf?: boolean;
  seatShelfU?: number;
  seatShelfHeight?: number;
}
```

### **4.5 Feature Library Registration**

```typescript
const FEATURE_LIBRARY: Record<string, ComposedFeatureFactory> = {
  "SailboatCockpit": createSailboatCockpit,
  "CenterboardTrunk": createCenterboardTrunk,
  "WheelArch": createWheelArch,
  "HoodScoop": createHoodScoop,
  "PanelGap": createPanelGap,
  "AntennaMount": createAntennaMount
};

type ComposedFeatureFactory = (params: any) => ComposedFeature;

function createComposedFeature(
  featureId: string,
  params: any
): ComposedFeature {
  const factory = FEATURE_LIBRARY[featureId];
  if (!factory) {
    throw new Error(`Composed feature ${featureId} not found`);
  }
  return factory(params);
}
```

**[END:TAG:FEATURES]**

---

## 5. DIAGRAM AUTHORING UX

**[TAG:SVG] [TAG:DIAGRAM] [TAG:UX]**

### **5.1 Overview**

**6.4 Diagram Authoring UX (SVG tools → node creation)**

**This is the heart of your "intuitive secret method."**

### **5.2 SVG Tool-to-Node Mapping (Must Be Exact)**

**6.4.1 SVG tool-to-node mapping (must be exact)**

- **Draw ellipse** → creates PatchDisplace (or BossHole depending mode)
- **Draw rounded rectangle** → creates RecessCut
- **Draw spline** → creates CreaseLine or "CurveMask"
- **Drag station points on curve view** → edits B/K/D splines
- **Paint band near rail** → creates "RailLipBand" (a preconfigured PatchDisplace)

**Rule: every drawing action creates or edits a node, never raw vertices.**

### **5.3 Three SVG Overlays (Canonical)**

**6.4.2 Three SVG overlays (canonical)**

#### **Top Overlay**

- edit B(u)
- create plan cutouts (cockpit, vents)
- create wheel arches (cars)

#### **Side Overlay**

- edit K(u), D(u)
- define rocker knees / deck drop knees

#### **Section Overlay**

- edit section style parameters at stations
- visualize V/bilge/rail

### **5.4 SVG Tool Implementation**

**TypeScript Interface:**
```typescript
type SVGToolType = "ellipse" | "roundedRect" | "spline" | "paintBand" | "curveEdit";

interface SVGTool {
  type: SVGToolType;
  mode?: "PatchDisplace" | "BossHole" | "RecessCut" | "CreaseLine";
  overlay: "top" | "side" | "section";
}

interface SVGShape {
  type: "ellipse" | "roundedRect" | "spline" | "path";
  data: any; // Shape-specific data
  overlay: "top" | "side" | "section";
}

function createNodeFromSVGShape(
  shape: SVGShape,
  tool: SVGTool
): FeatureNode {
  switch (tool.type) {
    case "ellipse":
      if (tool.mode === "BossHole") {
        return createBossHoleNode(shape);
      } else {
        return createPatchDisplaceNode(shape);
      }
      
    case "roundedRect":
      return createRecessCutNode(shape);
      
    case "spline":
      return createCreaseLineNode(shape);
      
    case "paintBand":
      return createRailLipBandNode(shape);
      
    case "curveEdit":
      return updateCurveNode(shape);
      
    default:
      throw new Error(`Unknown tool type: ${tool.type}`);
  }
}

function createPatchDisplaceNode(shape: SVGShape): FeatureNode {
  if (shape.type !== "ellipse") {
    throw new Error("PatchDisplace requires ellipse shape");
  }
  
  const { cx, cy, rx, ry } = shape.data;
  
  return {
    id: generateId("patch_displace"),
    type: "PatchDisplace",
    stage: "MACRO",
    enabled: true,
    targetRegions: getTargetRegionFromOverlay(shape.overlay),
    placement: {
      mode: "UV",
      u0: cx, // Convert from overlay coordinates
      s0: cy,
      yaw: 0.0
    },
    mask: {
      kind: "ellipse",
      u: cx,
      s: cy,
      ru: rx,
      rs: ry,
      pow: 1.8
    },
    params: {
      height: 0.01, // Default
      profile: "bell",
      normalMode: "normal"
    }
  };
}

function createRecessCutNode(shape: SVGShape): FeatureNode {
  if (shape.type !== "roundedRect") {
    throw new Error("RecessCut requires roundedRect shape");
  }
  
  const { x, y, width, height, rx } = shape.data;
  
  return {
    id: generateId("recess_cut"),
    type: "RecessCut",
    stage: "MACRO",
    enabled: true,
    targetRegions: getTargetRegionFromOverlay(shape.overlay),
    placement: {
      mode: "UV",
      u0: x + width / 2,
      s0: y + height / 2,
      yaw: 0.0
    },
    mask: {
      kind: "roundedRect",
      uMin: x,
      uMax: x + width,
      sMin: y,
      sMax: y + height,
      r: rx,
      pow: 1.2
    },
    params: {
      depth: 0.10,
      rimWidth: 0.025,
      rimHeight: 0.010,
      rimRoundness: 0.75
    }
  };
}
```

### **5.5 SVG Overlay Component Structure**

**React Component:**
```typescript
interface SvgOverlayProps {
  overlay: "top" | "side" | "section";
  referenceImage?: string;
  referencePack?: ReferencePack;
  modelSilhouette?: ModelSilhouette;
  onNodeCreated: (node: FeatureNode) => void;
  onNodeEdited: (nodeId: string, updates: Partial<FeatureNode>) => void;
  onCurveEdited: (curve: "B" | "K" | "D", updates: CurveSpec) => void;
}

function SvgOverlay({
  overlay,
  referenceImage,
  referencePack,
  modelSilhouette,
  onNodeCreated,
  onNodeEdited,
  onCurveEdited
}: SvgOverlayProps) {
  const [tool, setTool] = useState<SVGTool>({ type: "ellipse", overlay });
  const [shapes, setShapes] = useState<SVGShape[]>([]);
  
  const handleShapeDrawn = (shape: SVGShape) => {
    const node = createNodeFromSVGShape(shape, tool);
    onNodeCreated(node);
    setShapes([...shapes, shape]);
  };
  
  return (
    <div className="svg-overlay">
      <ToolPalette tool={tool} onToolChange={setTool} />
      <SVGCanvas
        overlay={overlay}
        referenceImage={referenceImage}
        modelSilhouette={modelSilhouette}
        shapes={shapes}
        onShapeDrawn={handleShapeDrawn}
        onCurveEdited={onCurveEdited}
      />
    </div>
  );
}
```

**[END:TAG:SVG]**

---

## 6. GRAPH EDITOR + PATCH TIMELINE

**[TAG:GRAPH_EDITOR] [TAG:PATCH_TIMELINE] [TAG:UX]**

### **6.1 Graph Editor Minimal Features**

**6.5.1 Graph editor minimal features**

- list nodes by stage: Macro / Edge / Micro
- enable/disable
- reorder within stage (rarely needed, but vital)
- click node → show its handles + params

**You don't need a complicated full blueprint UI on day one; a staged list is enough. Later you can show "wires" visually.**

**TypeScript Interface:**
```typescript
interface GraphEditorProps {
  featureGraph: FeatureGraph;
  onNodeToggle: (nodeId: string, enabled: boolean) => void;
  onNodeReorder: (stage: FeatureStage, nodeIds: string[]) => void;
  onNodeSelect: (nodeId: string | null) => void;
  selectedNodeId: string | null;
}

function GraphEditor({
  featureGraph,
  onNodeToggle,
  onNodeReorder,
  onNodeSelect,
  selectedNodeId
}: GraphEditorProps) {
  // Group nodes by stage
  const nodesByStage = groupNodesByStage(featureGraph.nodes);
  
  return (
    <div className="graph-editor">
      {(["MACRO", "EDGE", "MICRO", "FINISH"] as FeatureStage[]).map(stage => (
        <StageSection
          key={stage}
          stage={stage}
          nodes={nodesByStage[stage] || []}
          onNodeToggle={onNodeToggle}
          onNodeReorder={(nodeIds) => onNodeReorder(stage, nodeIds)}
          onNodeSelect={onNodeSelect}
          selectedNodeId={selectedNodeId}
        />
      ))}
    </div>
  );
}

function groupNodesByStage(nodes: FeatureNode[]): Record<FeatureStage, FeatureNode[]> {
  const grouped: Record<FeatureStage, FeatureNode[]> = {
    BASE: [],
    MACRO: [],
    EDGE: [],
    MICRO: [],
    FINISH: []
  };
  
  for (const node of nodes) {
    grouped[node.stage].push(node);
  }
  
  return grouped;
}
```

### **6.2 Patch Timeline (The "Geometry Git")**

**6.5.2 Patch timeline (the "geometry git")**

**Every edit creates a patch entry:**
- param changed
- node created/deleted
- handles moved

**Supports:**
- undo/redo
- branch (optional later)
- "accepted fit patch" vs "manual patch"

**This is huge for trust and iteration.**

**TypeScript Interface:**
```typescript
interface PatchTimelineProps {
  patches: Patch[];
  currentIndex: number;
  onUndo: () => void;
  onRedo: () => void;
  onAccept: (patchId: string) => void;
  onReject: (patchId: string) => void;
  onJump: (patchId: string) => void;
}

interface Patch {
  patchId: string;
  timestamp: string;
  changes: PatchChange[];
  metricsBefore?: ScalarScores;
  metricsAfter?: ScalarScores;
  notes?: string[];
  stage: "A" | "B" | "C" | "D";
  source: "manual" | "fit" | "llm";
  accepted?: boolean;
}

function PatchTimeline({
  patches,
  currentIndex,
  onUndo,
  onRedo,
  onAccept,
  onReject,
  onJump
}: PatchTimelineProps) {
  return (
    <div className="patch-timeline">
      <div className="timeline-controls">
        <button onClick={onUndo} disabled={currentIndex < 0}>◄ Undo</button>
        <button onClick={onRedo} disabled={currentIndex >= patches.length - 1}>Redo ►</button>
      </div>
      
      <div className="timeline-list">
        {patches.map((patch, index) => (
          <PatchEntry
            key={patch.patchId}
            patch={patch}
            isCurrent={index === currentIndex}
            isPast={index <= currentIndex}
            onAccept={() => onAccept(patch.patchId)}
            onReject={() => onReject(patch.patchId)}
            onJump={() => onJump(patch.patchId)}
          />
        ))}
      </div>
    </div>
  );
}
```

**[END:TAG:GRAPH_EDITOR]**

---

## 7. PRESET PACKS

**[TAG:PRESETS] [TAG:LIBRARY]**

### **7.1 Overview**

**6.6 Preset Packs (how you ship "editable default models")**

**A preset pack is just:**
- default curves
- default section stations
- default feature graph
- default build config (LODs/colliders/proxies/hardpoints)

### **7.2 Example: LaserPreset_v1 Contents**

**Example: LaserPreset_v1 contents**

- B(u) control points = Laser planform approximation
- K(u) = Laser rocker line
- D(u) = deck sheer

**features enabled:**
- cockpit recess
- cockpit rim
- centerboard trunk step
- rudder gudgeon pads + hardpoints
- mast step hardpoint

**build config:**
- LOD0/1/2 sampling
- buoyancy spheres preset
- collision hull mesh preset

**Then your orthographic fitting loop refines it.**

### **7.3 Preset File Structure**

**Location:** `assets/presets/{assetName}/`

**Files:**
- `{AssetName}Preset_v1.json` - Base curves, section stations, materials
- `{AssetName}Features_v1.json` - Feature graph
- `{AssetName}BuildConfig_v1.json` - LOD, collision, proxy, export settings
- `{AssetName}Hardpoints_v1.json` - Hardpoint definitions (optional)
- `{AssetName}Proxies_v1.json` - Proxy configurations (optional)

**Example:**
```
assets/presets/laser/
  LaserPreset_v1.json
  LaserFeatures_v1.json
  LaserBuildConfig_v1.json
  LaserHardpoints_v1.json
  LaserProxies_v1.json
```

### **7.4 Preset Loading**

```typescript
interface PresetPack {
  id: string;
  name: string;
  version: string;
  templateId: string;
  preset: Preset;
  featureGraph: FeatureGraph;
  buildConfig: BuildConfig;
  hardpoints?: HardpointSpec[];
  proxies?: ProxyPreset;
}

function loadPresetPack(assetName: string, version: string = "v1"): PresetPack {
  const basePath = `assets/presets/${assetName}/`;
  
  const preset = JSON.parse(
    fs.readFileSync(`${basePath}${assetName}Preset_${version}.json`, "utf-8")
  );
  
  const featureGraph = JSON.parse(
    fs.readFileSync(`${basePath}${assetName}Features_${version}.json`, "utf-8")
  );
  
  const buildConfig = JSON.parse(
    fs.readFileSync(`${basePath}${assetName}BuildConfig_${version}.json`, "utf-8")
  );
  
  let hardpoints: HardpointSpec[] | undefined;
  try {
    hardpoints = JSON.parse(
      fs.readFileSync(`${basePath}${assetName}Hardpoints_${version}.json`, "utf-8")
    ).hardpoints;
  } catch (e) {
    // Optional file
  }
  
  let proxies: ProxyPreset | undefined;
  try {
    proxies = JSON.parse(
      fs.readFileSync(`${basePath}${assetName}Proxies_${version}.json`, "utf-8")
    );
  } catch (e) {
    // Optional file
  }
  
  return {
    id: `${assetName}_${version}`,
    name: assetName,
    version,
    templateId: preset.templateId || "BoatHullTemplate",
    preset,
    featureGraph,
    buildConfig,
    hardpoints,
    proxies
  };
}
```

**[END:TAG:PRESETS]**

---

## 8. THE "ABSOLUTE LIMIT" FIRST IMPLEMENTATION TARGET

**[TAG:IMPLEMENTATION] [TAG:TARGET]**

### **8.1 Overview**

**6.7 The "absolute limit" first implementation target (forces everything to work)**

**If you want the system to be real, you pick a target that touches all subsystems.**

### **8.2 Target: Laser Hull + Complete Feature Set**

**Target: Laser hull + cockpit + trunk + hardpoints + buoyancy proxy + ortho fit**

**Because it forces:**
- base curves (B/K/D)
- macro feature (cockpit)
- edge language (rim)
- structural insert (centerboard trunk)
- hardpoints (rigging + rudder)
- proxies (buoyancy sampling)
- reference pack overlay + error curves

**If Laser works perfectly, cars and helicopters become "just different presets."**

### **8.3 Implementation Checklist**

**This target forces implementation of:**
1. ✅ Curve-First Generator (Step 2)
2. ✅ Feature Node System (Step 3)
3. ✅ ReferencePack System (Step 1)
4. ✅ Metrics + Fitting Loop (Step 4)
5. ✅ Compiler + Runtime Outputs (Step 5)
6. ✅ Library + Presets + Authoring UX (Step 6)

**All systems must work together for this target to succeed.**

**[END:TAG:IMPLEMENTATION]**

---

## 9. REPOSITORY STRUCTURE

**[TAG:STRUCTURE] [TAG:REPOSITORY]**

### **9.1 Complete Folder Structure**

**From Deliverable A (A1. Repository structure):**

```
src/
  parametric/
    core/
      types.ts
      math/
        curves.ts
        splines.ts
        envelopes.ts
        fairness.ts
        masks.ts
        transforms.ts
      geometry/
        surfaceGrid.ts
        normals.ts
        seams.ts
        uv.ts
      pipeline/
        stages.ts
        applyPasses.ts
        compileGraph.ts
        patch.ts
        bounds.ts
        hashing.ts
    templates/
      BoatHullTemplate.ts
      CarBodyTemplate.ts
      FuselageTemplate.ts
      BuildingShellTemplate.ts
    features/
      primitives/
        PatchDisplace.ts
        RecessCut.ts
        CreaseLine.ts
        VectorWarp.ts
        BossHole.ts
      composed/
        SailboatCockpit.ts
        CenterboardTrunk.ts
        RailLip.ts
        WheelArch.ts
        HoodScoop.ts
        PanelGap.ts
        AntennaMount.ts
    reference/
      ReferencePack.ts
      calibrate.ts
      extractSilhouette.ts
      errors.ts
      keypoints.ts
      renderOrtho.ts
    compiler/
      compileAsset.ts
      buildLOD.ts
      buildColliders.ts
      buildProxies.ts
      buildHardpoints.ts
      exportGLB.ts
      diagnostics.ts
  app/
    editor/
      OrthoViewGrid.tsx
      SvgOverlay.tsx
      GraphEditor.tsx
      PatchTimeline.tsx
      ParamInspector.tsx
      ErrorCurves.tsx
    demo/
      LaserDemoScene.tsx
      AssetBundleViewer.tsx

assets/
  reference_packs/
  presets/
  bundles/
```

**[END:TAG:STRUCTURE]**

---

## 10. CORE DATA MODEL

**[TAG:DATA_MODEL] [TAG:CORE]**

### **10.1 Design-Space Attributes**

**A2.1 Design-space attributes (must exist on vertices)**

**Every generated vertex must carry:**
- u in [0..1] (longitudinal)
- s in [0..1] (lateral magnitude within half-beam)
- side in {+1, -1} (port/starboard)

**This makes features and masks resolution-independent.**

### **10.2 Curves**

**A2.2 Curves**

**Use spline curves (cubic Bézier or cubic Hermite) with fairness regularization.**

```typescript
export interface Curve1D {
  eval(u: number): number;
  // optional for editing/optimization
  ctrl?: number[]; // control values in canonical form
}
```

**You will have:**
- B(u) = half-beam (top-view constraint)
- K(u) = bottom/keel line (side-view constraint)
- D(u) = deck/shear line (side-view constraint)

### **10.3 Section Law**

**A2.3 Section law (cross-section family)**

**Base surface uses:**

```
y(u,z) = K(u) + (D(u) - K(u)) · F(s; P(u))
```

**where s = |z| / B(u) and P(u) are section parameters (V, bilge, chine, flare, rail).**

### **10.4 Feature Node Contract**

**A2.4 Feature node contract (primitives)**

```typescript
export type FeatureStage = "BASE"|"MACRO"|"EDGE"|"MICRO"|"FINISH";

export interface FeatureNode {
  id: string;
  type: "PatchDisplace"|"RecessCut"|"CreaseLine"|"VectorWarp"|"BossHole" | string;
  stage: FeatureStage;
  enabled: boolean;

  targetRegions: string[];  // e.g. ["deck"], ["hull"], ["rail"]
  placement: {
    mode: "UV"|"ANCHOR";
    u0?: number; s0?: number;
    anchorId?: string;
    yaw?: number; pitch?: number; roll?: number;
  };

  // mask definition (universal)
  mask: MaskSpec;

  // operation params (typed per node type)
  params: Record<string, number|boolean|string|number[]|object>;

  // editor UI hints (SVG handles, colors, etc.)
  ui?: Record<string, any>;
}
```

### **10.5 MaskSpec**

**A2.5 MaskSpec (the "universal locality system")**

```typescript
export type MaskSpec =
  | { kind:"ellipse"; u:number; s:number; ru:number; rs:number; pow?:number }
  | { kind:"roundedRect"; uMin:number; uMax:number; sMin:number; sMax:number; r:number; pow?:number }
  | { kind:"curveBand"; curveId:string; width:number; sharpness:number }
  | { kind:"op"; op:"union"|"intersect"|"subtract"; a:MaskSpec; b:MaskSpec; pow?:number };
```

### **10.6 Hardpoints**

**A2.6 Hardpoints (first-class simulation hooks)**

```typescript
export interface HardpointSpec {
  id: string;
  attach: "asset"|"subpart"; // boat, boom, rudder, etc.
  // design-space definition (stable under shape edits)
  def:
    | { mode:"UV"; region:string; u:number; s:number; h:number; normalHint?: "up"|"out"|"forward" }
    | { mode:"ANCHOR"; anchorId:string; offset:[number,number,number] };
  meta?: Record<string, any>;
}
```

### **10.7 ReferencePack**

**A2.7 ReferencePack (for ortho overlay + fitting)**

```typescript
export interface ReferencePack {
  id: string;
  units: "meter";
  views: Record<"top"|"side"|"front"|"rear", {
    image: string;
    axis: "TOP"|"SIDE"|"FRONT"|"REAR";
    cal: {
      pxPerMeter: number;
      originPx: [number, number];
      centerlinePx: [[number,number],[number,number]];
      anchorA_Px: [number,number];
      anchorB_Px: [number,number];
    };
    opacity: number;
  }>;
}
```

### **10.8 Patch Protocol**

**A2.8 Patch protocol (the only accepted edit format)**

```typescript
export interface ParamPatch {
  patchId: string;
  changes: Array<{ path: string; op: "set"|"add"|"mul"; value: any }>;
  metricsBefore?: any;
  metricsAfter?: any;
  notes?: string[];
}
```

**[END:TAG:DATA_MODEL]**

---

## 11. EXECUTION PIPELINE

**[TAG:PIPELINE] [TAG:EXECUTION]**

### **11.1 Deterministic Stages**

**A3. Execution pipeline (deterministic stages)**

**Fixed order:**

1. **BASE:** build base shell from curves + section law
2. **MACRO:** recesses / major cut impressions (cockpit, wheel wells)
3. **EDGE:** crease language, rail seams, lips
4. **MICRO:** bosses, mounts, small pads
5. **FINISH:** normals, smoothing groups, optional bevel approximation

**This aligns with the sculpt steps you already use (cockpit cutout, bow tip shaping, stern deck drop, etc.) but formalizes them.**

**[END:TAG:PIPELINE]**

---

## 12. EDITOR UX SPECIFICATIONS

**[TAG:UX] [TAG:EDITOR]**

### **12.1 Minimum Viable "Diagram-Style 3D Editor"**

**A5. Editor UX (minimum viable "diagram-style 3D editor")**

**You must ship these panels:**

1. **OrthoViewGrid:** top/side/front/rear with reference underlay + model silhouette
2. **SVG Overlay tools:** draw ellipse/rect/spline → creates/edits nodes
3. **GraphEditor:** stage-sorted node list (toggle, reorder within stage)
4. **ParamInspector:** selected node params
5. **ErrorCurves:** plots for eB,eK,eD in meters
6. **PatchTimeline:** undo/redo and accept/reject fit patches

**Component Structure:**
```typescript
interface EditorLayout {
  leftPanel: {
    GraphEditor: React.ComponentType<GraphEditorProps>;
    PatchTimeline: React.ComponentType<PatchTimelineProps>;
  };
  centerPanel: {
    OrthoViewGrid: React.ComponentType<OrthoViewGridProps>;
    SvgOverlay: React.ComponentType<SvgOverlayProps>;
  };
  rightPanel: {
    ParamInspector: React.ComponentType<ParamInspectorProps>;
    ErrorCurves: React.ComponentType<ErrorCurvesProps>;
  };
}
```

**[END:TAG:UX]**

---

## 13. ACCEPTANCE TESTS

**[TAG:TESTS] [TAG:ACCEPTANCE]**

### **13.1 Non-Negotiable Tests**

**A6. Acceptance tests (non-negotiable)**

- ReferencePack underlays align in meters (scale bar matches world units)
- Rebuilding asset from same spec produces identical geometry (hash match)
- Feature enable/disable is reversible and deterministic
- LOD0/1/2 maintain silhouette within tolerance
- AssetBundle exports valid GLB and manifest
- Fit loop computes non-empty error arrays and produces a patch that can be applied/reverted

**[END:TAG:TESTS]**

---

## 14. LASER PACK V1 SPECIFICATION

**[TAG:PRESET] [TAG:LASER]**

### **14.1 Files**

**B0. Files**

```
assets/presets/laser/
  LaserPreset_v1.json
  LaserFeatures_v1.json
  LaserBuildConfig_v1.json
  LaserHardpoints_v1.json
  LaserProxies_v1.json
```

### **14.2 LaserPreset_v1.json**

**B1. LaserPreset_v1.json**

**Values below are "reasonable placeholders". Your ReferencePack fitting should tune them.**

**Complete JSON specification:** (See modelmaker.txt lines 3206-3254 for full JSON)

**Key values:**
- L: 4.20 meters
- Nu: 256, Nv: 96
- B(u) control points: [0.02, 0.45, 0.60, 0.38, 0.03] (half-beam in meters)
- K(u) control points: [0.02, 0.00, -0.01, 0.00, 0.02] (rocker line)
- D(u) control points: [0.18, 0.20, 0.21, 0.20, 0.19] (deck sheer)
- Section stations at u=0.12, 0.50, 0.86 (bow/mid/stern)
- Envelopes: rocker, bowLift, sternDeckDrop, bowTip

**Notes:**
- B(u) values are half-beam in meters; they will be tuned from the top ortho silhouette.
- K(u) and D(u) are heights in meters relative to your chosen origin datum.
- Rocker/bowLift/sternDeckDrop/bowTip correspond to your current hull sculpting controls.

### **14.3 LaserFeatures_v1.json**

**B2. LaserFeatures_v1.json**

**Macro: cockpit + trunk**

**Complete JSON specification:** (See modelmaker.txt lines 3271-3340 for full JSON)

**Features included:**
- cockpit_recess (RecessCut, MACRO)
- centerboard_trunk_step (PatchDisplace, MACRO)
- centerboard_slot_imprint (RecessCut, MACRO)
- rail_seam_crease (CreaseLine, EDGE)
- bow_tip_refine (VectorWarp, EDGE)
- rudder_gudgeon_pad (BossHole, MICRO)

**This directly mirrors the monolith's intent: cockpit cutout, trunk, bow tip shaping, stern deck effects, and attachment points.**

### **14.4 LaserHardpoints_v1.json**

**B3. LaserHardpoints_v1.json**

**Seed with the Laser hardpoints you already defined (mast base, gooseneck, trunk, traveler port/starboard, mainsheet base, rudder pivot, vang base, etc.).**

**Complete JSON specification:** (See modelmaker.txt lines 3353-3369 for full JSON)

**Hardpoints:**
- mast_base
- gooseneck
- centerboard_trunk
- traveler_port
- traveler_starboard
- mainsheet_base
- rudder_pivot
- vang_base

### **14.5 LaserProxies_v1.json**

**B4. LaserProxies_v1.json**

**Must support both:**
- union-of-spheres hull displacement into water
- buoyancy sample points (<= 64)

**Complete JSON specification:** (See modelmaker.txt lines 3388-3404 for full JSON)

**Configuration:**
- hullSpheres: stationGrid generator, 14 stations, 3 rows
- buoyancySamples: uGrid_sGrid pattern, 8×4 grid, max 64 samples

### **14.6 LaserBuildConfig_v1.json**

**B5. LaserBuildConfig_v1.json**

**Complete JSON specification:** (See modelmaker.txt lines 3406-3423 for full JSON)

**Configuration:**
- LODs: LOD0 (256×96), LOD1 (160×64, drop MICRO), LOD2 (96×40, drop MICRO+EDGE)
- Collision: hybrid mode, LOD2 mesh + primitives (mast capsule, hull box)
- Export: GLB format, include diagnostics

**[END:TAG:PRESET]**

---

## 15. INTEGRATION POINTS

**[TAG:INTEGRATION]**

### **Integration with All Previous Steps**

**Step 6 integrates all previous steps:**

1. **Template Library** → Uses Curve-First Generator (Step 2)
2. **Feature Library** → Uses Feature Node System (Step 3)
3. **Preset Packs** → Uses ReferencePack (Step 1) for fitting
4. **Diagram UX** → Creates nodes for Feature Graph (Step 3)
5. **Graph Editor** → Manages Feature Graph (Step 3)
6. **Patch Timeline** → Uses Patch Protocol (Step 4)
7. **Compiler Integration** → Uses Compiler (Step 5) to build assets

**Everything works together to enable repeatable asset authoring.**

**[END:TAG:INTEGRATION]**

---

## 16. FILE DEPENDENCY GRAPH

**[TAG:DEPS]**

```
Library + Presets + Authoring UX System
  │
  ├─→ modelmaker.txt (Step 6 specification)
  │   └─→ Lines 2520-2824: Complete specification
  │
  ├─→ Curve-First Generator (Step 2)
  │   └─→ Template implementations
  │
  ├─→ Feature Node System (Step 3)
  │   └─→ Feature library (primitives + composed)
  │
  ├─→ ReferencePack (Step 1)
  │   └─→ Preset fitting workflow
  │
  ├─→ Metrics + Fitting Loop (Step 4)
  │   └─→ Patch timeline integration
  │
  ├─→ Compiler (Step 5)
  │   └─→ AssetBundle generation from presets
  │
  └─→ UI Components
      ├─→ SVG Overlay Tools
      ├─→ Graph Editor
      ├─→ Patch Timeline
      └─→ Param Inspector
```

**[END:TAG:DEPS]**

---

## 17. RELATIONSHIP MATRIX

**[TAG:RELATIONS]**

### **System Relationships**

| System | Relationship | Data Flow |
|--------|-------------|-----------|
| Template Library | Provides | Base asset generation code |
| Feature Library | Provides | Reusable feature nodes |
| Preset Packs | Uses | Templates + Features + Configs |
| Diagram UX | Creates | Feature nodes via SVG tools |
| Graph Editor | Manages | Feature graph structure |
| Patch Timeline | Tracks | Edit history and patches |
| Compiler | Consumes | Presets → AssetBundles |

### **Workflow Relationships**

| Workflow | Input | Output | Purpose |
|----------|-------|--------|---------|
| Create Preset | Template + Defaults | Preset Pack | Start new asset |
| Edit via SVG | SVG Shapes | Feature Nodes | Intuitive authoring |
| Edit via Graph | Graph Editor | Feature Graph | Blueprint control |
| Apply Patch | Patch | Updated Asset | Incremental refinement |
| Compile Asset | Preset Pack | AssetBundle | Production output |

**[END:TAG:RELATIONS]**

---

## 📝 WHAT STEP 6 "COMPLETES"

**After Step 6, your system can:**

- Author new assets quickly using templates + presets
- Edit assets intuitively via diagram-style SVG tools
- Manage feature graphs via blueprint-level editor
- Track all changes via patch timeline (geometry git)
- Ship ready-to-edit baseline assets as preset packs
- Reuse features across different asset types
- Everything is reproducible, fit-able, and patchable

**This completes the "universal editor" product layer.**

---

**Status:** PHASE 1 - Foundation System Mapping  
**Confidence:** 0.95 (Very High - Complete specification extracted from modelmaker.txt)  
**Next:** Implement Library + Presets + Authoring UX system based on this specification



---


---

<!-- AUTO-GENERATED FROM: MASTER_REFERENCE_PACK_CALIBRATION_WORKFLOW_SYSTEM_MAP.md -->
<!-- DO NOT EDIT THIS SECTION DIRECTLY -->
<!-- Source File: MASTER_REFERENCE_PACK_CALIBRATION_WORKFLOW_SYSTEM_MAP.md -->
<!-- File Size: 45101 bytes -->

<a id='reference-pack-calibration-workflow-system-map'></a>

# MASTER REFERENCE PACK CALIBRATION WORKFLOW SYSTEM MAP
**Complete System Anatomy Mapping - ReferencePack Calibration Workflow + First-Fit Automation Loop (Step 6.9)**

**Date:** 2025-01-27  
**Version:** 1.0.0  
**Purpose:** Complete S.A.M. documentation for ReferencePack Calibration Workflow System (modelmaker.txt Step 6.9)  
**Status:** PHASE 1 - Foundation System Mapping  
**System:** Lucid Image Editor - Universal Parametric Asset Engine  
**Reference:** modelmaker.txt Step 6.9 (Lines 3529-3956)

---

## 📋 TABLE OF CONTENTS

1. [System Overview](#1-system-overview)
2. [Part 1: ReferencePack Calibration](#2-part-1-referencepack-calibration)
3. [Part 2: First-Fit Automation Loop](#3-part-2-first-fit-automation-loop)
4. [Part 3: LLM-Assisted Fit Protocol](#4-part-3-llm-assisted-fit-protocol)
5. [Part 4: Implementation Checklist](#5-part-4-implementation-checklist)
6. [Calibration UI Tools](#6-calibration-ui-tools)
7. [Calibration Math](#7-calibration-math)
8. [Parameter Mapping](#8-parameter-mapping)
9. [Patch Generation Algorithms](#9-patch-generation-algorithms)
10. [Optimization Schedule](#10-optimization-schedule)
11. [Integration Points](#11-integration-points)
12. [File Dependency Graph](#12-file-dependency-graph)
13. [Type Flow Map](#13-type-flow-map)
14. [Relationship Matrix](#14-relationship-matrix)

---

## 1. SYSTEM OVERVIEW

**[TAG:OVERVIEW] [TAG:CALIBRATION] [TAG:FITTING]**

### **What is the ReferencePack Calibration Workflow System?**

**Step 6.9 — ReferencePack Calibration Workflow + First-Fit Automation Loop (Laser-first, universal forever)**

This system provides the complete workflow for calibrating orthographic reference images into metric truth, and automating the first-fit loop to refine parametric assets.

**Location:** Architecture defined in modelmaker.txt Step 6.9  
**Purpose:** Turn ortho images into metric truth + automate fitting loop  
**Core Principle:** Simple calibration tools + deterministic patch generation = scientific fitting

### **Key Responsibilities**

1. **Calibration UI**: 4 tools per view (scale, centerline, origin, nudge)
2. **Calibration Math**: Convert pixel coordinates to metric space
3. **First-Fit Loop**: Extract error curves → generate bounded patches → apply → iterate
4. **Parameter Mapping**: Map errors to parameter adjustments
5. **Heuristic Formulas**: Conservative, convergent patch generation
6. **Optimization Schedule**: Multi-phase fitting (sanity → planform → rocker → V-hull → cockpit)

### **What This System Provides**

**Part 1 — ReferencePack calibration (turn ortho images into metric truth)**
- 4 calibration tools per view
- Simple, stable calibration math
- ReferencePack JSON generation
- Three.js underlay placement

**Part 2 — First-fit automation loop (error curves → bounded patches)**
- Extract silhouettes from renders
- Compute error arrays
- Map errors to parameters
- Generate bounded patches
- Multi-phase optimization

**Part 3 — "LLM-assisted fit" protocol (optional, but extremely powerful)**
- Safe, bounded LLM patch proposals
- Automatic acceptance/rejection gates
- Supervisor-controlled optimization

**Part 4 — Implementation checklist (fastest path to "it works")**
- Minimum code requirements
- Implementation order
- Testing strategy

**[END:TAG:OVERVIEW]**

---

## 2. PART 1: REFERENCEPACK CALIBRATION

**[TAG:CALIBRATION] [TAG:REFERENCE_PACK]**

### **2.1 Overview**

**Part 1 — ReferencePack calibration (turn ortho images into metric truth)**

**ReferencePack calibration is simply: how to place an image so 1 meter in pixels = 1 meter in world, and the image centerline aligns to the model centerline.**

### **2.2 The Calibration UI (Minimum Tools)**

**1.1 The calibration UI (minimum tools)**

**For each view (TOP / SIDE / FRONT / REAR), your overlay needs exactly 4 tools:**

1. **Scale tool:** click two pixels A,B on the image + enter known meters d_m
2. **Centerline tool:** click two pixels defining the symmetry axis
3. **Origin tool:** click a pixel that you define as (0,0) for that view plane
4. **Nudge tool:** optional tiny translation/rotation adjustments (stored as deltas)

**That's it. Everything else is derived.**

### **2.3 What "Known Meters" Should Be**

**1.2 What "known meters" should be**

**You have three options (pick one per view and stay consistent):**

1. **Use a scale bar embedded in the image (best)**
2. **Use a known overall dimension from your own hull settings (practical)**
3. **Use two anchors you already know in world (mast base ↔ transom center, etc.)**

**Since your Laser hull already has a length/beam/height setting block, you can use those values as calibration distances.**

### **2.4 Calibration Math (Simple + Stable)**

**1.3 Calibration math (simple + stable)**

**Let pixel points be A_px, B_px and known distance be d_m.**

```
d_px = ||B_px - A_px||
pxPerMeter = d_px / d_m
metersPerPx = 1 / pxPerMeter
```

**Centerline:**

**you click two points C0_px, C1_px**

**the centerline direction angle is θ = atan2(C1.y - C0.y, C1.x - C0.x)**

**you store that so the image plane can be rotated to align the model axis**

**Origin:**

**you click O_px**

**store it; this becomes (0,0) in that view's metric plane**

**TypeScript Implementation:**
```typescript
interface CalibrationState {
  view: "top" | "side" | "front" | "rear";
  scalePointA?: [number, number]; // Pixel coordinates
  scalePointB?: [number, number];
  knownMeters?: number;
  centerlinePoint0?: [number, number];
  centerlinePoint1?: [number, number];
  originPoint?: [number, number];
  nudgeTranslation?: [number, number]; // Delta in pixels
  nudgeRotation?: number; // Delta angle in radians
}

interface ViewCalibration {
  pxPerMeter: number;
  originPx: [number, number];
  centerlinePx: [[number, number], [number, number]];
  anchorA_Px?: [number, number];
  anchorB_Px?: [number, number];
  nudgeTranslation?: [number, number];
  nudgeRotation?: number;
}

function computeCalibration(state: CalibrationState): ViewCalibration {
  if (!state.scalePointA || !state.scalePointB || !state.knownMeters) {
    throw new Error("Scale calibration incomplete");
  }
  
  // Compute pixel distance
  const dx = state.scalePointB[0] - state.scalePointA[0];
  const dy = state.scalePointB[1] - state.scalePointA[1];
  const d_px = Math.sqrt(dx * dx + dy * dy);
  
  // Compute pxPerMeter
  const pxPerMeter = d_px / state.knownMeters;
  
  // Compute centerline angle
  let centerlineAngle = 0;
  if (state.centerlinePoint0 && state.centerlinePoint1) {
    const cdx = state.centerlinePoint1[0] - state.centerlinePoint0[0];
    const cdy = state.centerlinePoint1[1] - state.centerlinePoint0[1];
    centerlineAngle = Math.atan2(cdy, cdx);
  }
  
  // Get origin (default to image center if not set)
  const originPx: [number, number] = state.originPoint || [0, 0];
  
  // Build centerline points (use clicked points or derive from angle)
  const centerlinePx: [[number, number], [number, number]] = 
    state.centerlinePoint0 && state.centerlinePoint1
      ? [state.centerlinePoint0, state.centerlinePoint1]
      : [[0, 0], [100, 0]]; // Default horizontal
  
  return {
    pxPerMeter,
    originPx,
    centerlinePx,
    nudgeTranslation: state.nudgeTranslation,
    nudgeRotation: state.nudgeRotation
  };
}
```

### **2.5 Writing the ReferencePack JSON**

**1.4 Writing the ReferencePack JSON (per view)**

**Store exactly what you need; nothing more:**

```json
{
  "id": "laser_refpack_v1",
  "units": "meter",
  "views": {
    "top": {
      "image": "assets/reference_packs/laser/top.png",
      "cal": {
        "pxPerMeter": 512.0,
        "originPx": [312, 840],
        "centerlinePx": [[310, 100], [314, 980]]
      },
      "opacity": 0.45
    }
  }
}
```

**Implementation:**
```typescript
function writeReferencePack(
  id: string,
  calibrations: Record<string, ViewCalibration>,
  imagePaths: Record<string, string>,
  opacities: Record<string, number> = {}
): ReferencePack {
  const views: Record<string, ReferencePackView> = {};
  
  for (const [view, cal] of Object.entries(calibrations)) {
    views[view] = {
      image: imagePaths[view],
      axis: view.toUpperCase() as "TOP" | "SIDE" | "FRONT" | "REAR",
      cal: {
        pxPerMeter: cal.pxPerMeter,
        originPx: cal.originPx,
        centerlinePx: cal.centerlinePx,
        anchorA_Px: cal.anchorA_Px || cal.originPx,
        anchorB_Px: cal.anchorB_Px || cal.originPx
      },
      opacity: opacities[view] || 0.5
    };
  }
  
  return {
    id,
    units: "meter",
    views
  };
}
```

### **2.6 Placing the Underlay in Three.js (Canonical)**

**1.5 Placing the underlay in Three.js (canonical)**

**For a view image of size Wpx × Hpx:**

**plane width in meters:**
```
Wm = Wpx / pxPerMeter
```

**plane height in meters:**
```
Hm = Hpx / pxPerMeter
```

**Set plane geometry (Wm, Hm).**

**To place pixel originPx at world origin on that plane:**

**pixel coordinate in meters relative to image center:**
```
ox = (originPx.x - Wpx/2) / pxPerMeter
oy = (originPx.y - Hpx/2) / pxPerMeter
```

**then translate plane by (-ox, -oy) in the plane's local axes.**

**Rotate the plane about its normal so the stored centerline aligns to your world axis.**

**TypeScript Implementation:**
```typescript
function createReferenceUnderlay(
  view: "top" | "side" | "front" | "rear",
  referencePack: ReferencePack,
  imageTexture: THREE.Texture
): THREE.Mesh {
  const viewDef = referencePack.views[view];
  if (!viewDef) {
    throw new Error(`View ${view} not found in ReferencePack`);
  }
  
  // Get image dimensions
  const imageWidth = imageTexture.image.width;
  const imageHeight = imageTexture.image.height;
  
  // Compute plane dimensions in meters
  const Wm = imageWidth / viewDef.cal.pxPerMeter;
  const Hm = imageHeight / viewDef.cal.pxPerMeter;
  
  // Create plane geometry
  const geometry = new THREE.PlaneGeometry(Wm, Hm);
  
  // Create material with texture
  const material = new THREE.MeshBasicMaterial({
    map: imageTexture,
    transparent: true,
    opacity: viewDef.opacity
  });
  
  const plane = new THREE.Mesh(geometry, material);
  
  // Compute origin offset in meters
  const ox = (viewDef.cal.originPx[0] - imageWidth / 2) / viewDef.cal.pxPerMeter;
  const oy = (viewDef.cal.originPx[1] - imageHeight / 2) / viewDef.cal.pxPerMeter;
  
  // Translate to place origin at world origin
  if (view === "top") {
    plane.position.set(-ox, 0, -oy); // XZ plane
    plane.rotation.x = -Math.PI / 2;
  } else if (view === "side") {
    plane.position.set(-ox, -oy, 0); // XY plane
  } else if (view === "front") {
    plane.position.set(0, -oy, -ox); // ZY plane
    plane.rotation.y = Math.PI / 2;
  } else if (view === "rear") {
    plane.position.set(0, -oy, -ox); // ZY plane
    plane.rotation.y = -Math.PI / 2;
  }
  
  // Rotate to align centerline
  if (viewDef.cal.centerlinePx) {
    const [c0, c1] = viewDef.cal.centerlinePx;
    const dx = c1[0] - c0[0];
    const dy = c1[1] - c0[1];
    const centerlineAngle = Math.atan2(dy, dx);
    
    // Rotate plane to align centerline with world axis
    // (implementation depends on view axis conventions)
    plane.rotation.z = -centerlineAngle;
  }
  
  return plane;
}
```

### **2.7 View Axis Conventions**

**1.6 View axis conventions (make this consistent once)**

**Pick and lock:**

- **TOP plane lies in (X,Z)**
- **SIDE plane lies in (X,Y)**
- **FRONT/REAR planes lie in (Z,Y)**

**Your monolith already defines boat-local axes as Forward +X, Up +Y, Starboard +Z. Match that everywhere.**

**[END:TAG:CALIBRATION]**

---

## 3. PART 2: FIRST-FIT AUTOMATION LOOP

**[TAG:FITTING] [TAG:AUTOMATION]**

### **3.1 Overview**

**Part 2 — First-fit automation loop (error curves → bounded patches)**

**You want this to feel like "diagnostics", not "guesswork".**

### **3.2 What to Extract from Renders**

**2.1 What to extract from renders**

**From each ortho view, extract 1D functions using scanline extrema:**

**TOP → half-beam curve**

**For each x-column:**
```
B_model[x] = 0.5 * (z_right - z_left) in meters
```

**SIDE → bottom + deck curves**

**For each x-column:**
```
K_model[x] = y_bottom(x) in meters
D_model[x] = y_top(x) in meters
```

**These map directly to your conceptual controls:**
- width errors → taper, beam, bow/stern shaping
- bottom errors → rockerAmp, bowLiftAmp, vHullDepth interactions
- deck errors → sternDeckDrop, deck rounding logic

### **3.3 Error Arrays**

**2.2 Error arrays**

**Compute:**
```
eB(x) = B_model(x) - B_ref(x)
eK(x) = K_model(x) - K_ref(x)
eD(x) = D_model(x) - D_ref(x)
```

**Also compute:**
```
rmsB, rmsK, rmsD
maxB, maxK, maxD
```

**Implementation:** (See MASTER_METRICS_FITTING_LOOP_SYSTEM_MAP.md Section 6)

### **3.4 Parameter Map for the Laser Hull**

**2.3 Parameter map for the Laser hull (your current action space)**

**Directly from your settings schema, the Laser hull controls include:**
length, height, beam, bowTaperMin, sternTaperMin, taperPower, rockerAmp, bowLiftAmp, sternDeckDrop, vHullDepth, bowTipPoint, bowTipRound, plus cockpit position/size.

**That means we can define a safe first-fit patch generator:**

#### **Global Scale Sanity**

- **If mean(eB) is uniformly positive across most x** → reduce beam
- **If mean(eD) uniformly positive** → reduce height or deck bias
- **If model length doesn't match end-to-end silhouette** → adjust length

#### **Bow/Stern Planform Shaping (TOP-driven)**

**Look at eB(x) near ends:**

**Bow region window: x ∈ [0.85..1.0]**
- too wide → decrease bowTaperMin or increase taperPower
- too narrow → increase bowTaperMin or decrease taperPower

**Stern region window: x ∈ [0.0..0.15]**
- too wide → decrease sternTaperMin or increase taperPower
- too narrow → increase sternTaperMin or decrease taperPower

**This matches your monolith's sculpt steps for taper and taperPower.**

#### **Rocker + Bow Lift (SIDE-driven, bottom curve)**

- **If eK(x) is positive near both ends** (bottom too low or too "deep" relative to ref) → increase rockerAmp (lifts ends)
- **If only bow end is off** (bow too low) → increase bowLiftAmp
- **If stern bottom is off but bow is fine** → adjust rocker envelope (or add stern-specific lift if you split it later)

**These exist explicitly in your hull sculpt list.**

#### **Stern Deck Drop (SIDE-driven, top curve near stern)**

- **If eD(x) is positive near stern** (deck too high) → increase sternDeckDrop
- **If deck is too low** → decrease it

**Again directly in your sculpt list.**

#### **V-hull Depth (FRONT/REAR-guided, plus side bottom curvature)**

- **If midship bottom silhouette is too "flat"** relative to ref → increase vHullDepth
- **If too sharp/deep V** → decrease it

**You already model this as a scalar.**

#### **Bow Tip Shaping (TOP + SIDE very near bow)**

- **If bow tip is too blunt** (planform tip wide) → increase bowTipPoint
- **If rails pinch too sharply** → increase bowTipRound (soften)

**These are explicitly named parameters.**

#### **Cockpit (TOP/SIDE local residual)**

**Cockpit is parameterized as cockpit.main.position and cockpit.main.size.**

**Local mismatch in the cockpit zone should produce patches only to those fields (not global hull).**

### **3.5 The Bounded Patch Generator (Deterministic)**

**2.4 The bounded patch generator (deterministic)**

**Define bounds per parameter and a maximum step per iteration:**

**Example (tune later):**

```
beam: step ≤ 0.01 m
bowTaperMin/sternTaperMin: step ≤ 0.01
taperPower: step ≤ 0.05
rockerAmp: step ≤ 0.005
bowLiftAmp: step ≤ 0.003
sternDeckDrop: step ≤ 0.003
vHullDepth: step ≤ 0.005
cockpit position: step ≤ 0.005 m
cockpit size: step ≤ 0.01 m
```

**Patch synthesis rule**

**For each parameter p:**
1. compute a signed "suggested delta" Δp_raw from the relevant error integrals
2. clamp to [-stepMax, +stepMax]
3. clamp to parameter bounds
4. emit as a patch

**TypeScript Implementation:**
```typescript
interface ParameterBounds {
  beam: { min: number; max: number; stepMax: number };
  bowTaperMin: { min: number; max: number; stepMax: number };
  sternTaperMin: { min: number; max: number; stepMax: number };
  taperPower: { min: number; max: number; stepMax: number };
  rockerAmp: { min: number; max: number; stepMax: number };
  bowLiftAmp: { min: number; max: number; stepMax: number };
  sternDeckDrop: { min: number; max: number; stepMax: number };
  vHullDepth: { min: number; max: number; stepMax: number };
  cockpitPosition: { min: number; max: number; stepMax: number };
  cockpitSize: { min: number; max: number; stepMax: number };
}

const DEFAULT_BOUNDS: ParameterBounds = {
  beam: { min: 1.0, max: 2.0, stepMax: 0.01 },
  bowTaperMin: { min: 0.0, max: 1.0, stepMax: 0.01 },
  sternTaperMin: { min: 0.0, max: 1.0, stepMax: 0.01 },
  taperPower: { min: 0.5, max: 3.0, stepMax: 0.05 },
  rockerAmp: { min: 0.0, max: 0.1, stepMax: 0.005 },
  bowLiftAmp: { min: 0.0, max: 0.05, stepMax: 0.003 },
  sternDeckDrop: { min: 0.0, max: 0.05, stepMax: 0.003 },
  vHullDepth: { min: 0.0, max: 1.0, stepMax: 0.005 },
  cockpitPosition: { min: 0.0, max: 1.0, stepMax: 0.005 },
  cockpitSize: { min: 0.1, max: 1.0, stepMax: 0.01 }
};

function generateBoundedPatch(
  errors: ErrorCurves,
  currentParams: Record<string, number>,
  bounds: ParameterBounds = DEFAULT_BOUNDS
): ParamPatch {
  const changes: PatchChange[] = [];
  
  // Compute suggested deltas using heuristic formulas (see Section 3.6)
  const deltas = computeParameterDeltas(errors);
  
  // Generate patch changes for each parameter
  for (const [paramName, delta] of Object.entries(deltas)) {
    const bound = bounds[paramName as keyof ParameterBounds];
    if (!bound) continue;
    
    const currentValue = currentParams[paramName] || 0;
    
    // Clamp delta to stepMax
    const clampedDelta = Math.max(-bound.stepMax, Math.min(bound.stepMax, delta));
    
    // Compute new value
    let newValue = currentValue + clampedDelta;
    
    // Clamp to parameter bounds
    newValue = Math.max(bound.min, Math.min(bound.max, newValue));
    
    // Only add change if significant
    if (Math.abs(newValue - currentValue) > 1e-6) {
      changes.push({
        path: `hull.${paramName}`,
        op: "set",
        value: newValue,
        bounds: { min: bound.min, max: bound.max }
      });
    }
  }
  
  return {
    patchId: `fit_${new Date().toISOString()}`,
    timestamp: new Date().toISOString(),
    changes,
    stage: "A", // Default to Stage A
    source: "fit"
  };
}
```

### **3.6 Concrete Heuristic Formulas (Works Shockingly Well)**

**2.5 Concrete heuristic formulas (works shockingly well)**

**Let E(win) be the mean error over a window.**

**Windows (in normalized x):**
```
W_bow = [0.90..1.00]
W_stern = [0.00..0.10]
W_mid = [0.45..0.55]
```

**Then:**

**Beam:**
```
Δbeam = -kB * E(eB, full)
```

**Bow/Stern Taper:**
```
ΔbowTaperMin = -kT * E(eB, W_bow)
ΔsternTaperMin = -kT * E(eB, W_stern)
```

**Taper Power:**
```
ΔtaperPower = +kP * (sign(E(eB,W_bow)) * |E(eB,W_bow)| + sign(E(eB,W_stern)) * |E(eB,W_stern)|)
```

**Bottom (Rocker + Bow Lift):**
```
ΔrockerAmp = +kR * (E(eK,W_bow) + E(eK,W_stern))
ΔbowLiftAmp = +kL * E(eK, W_bow)
```

**Deck:**
```
ΔsternDeckDrop = +kD * E(eD, W_stern)
```

**V-hull:**
```
ΔvHullDepth = -kV * E(flatnessError, W_mid)
```
(where flatnessError can be derived from front/rear section profile mismatch; if you don't have it yet, start with side-bottom curvature residual at midship)

**Pick small gains:**
```
kB ≈ 0.6
kT ≈ 0.8
kP ≈ 0.4
kR ≈ 0.5
kL ≈ 0.35
kD ≈ 0.35
kV ≈ 0.5
```

**Then clamp hard.**

**This yields conservative, convergent motion.**

**TypeScript Implementation:**
```typescript
interface HeuristicGains {
  kB: number; // Beam gain
  kT: number; // Taper gain
  kP: number; // Taper power gain
  kR: number; // Rocker gain
  kL: number; // Bow lift gain
  kD: number; // Deck drop gain
  kV: number; // V-hull depth gain
}

const DEFAULT_GAINS: HeuristicGains = {
  kB: 0.6,
  kT: 0.8,
  kP: 0.4,
  kR: 0.5,
  kL: 0.35,
  kD: 0.35,
  kV: 0.5
};

function computeMeanError(
  errors: number[],
  stations: number[],
  window: [number, number]
): number {
  const [wMin, wMax] = window;
  let sum = 0;
  let count = 0;
  
  for (let i = 0; i < errors.length; i++) {
    const s = stations[i];
    if (s >= wMin && s <= wMax) {
      sum += errors[i];
      count++;
    }
  }
  
  return count > 0 ? sum / count : 0;
}

function computeParameterDeltas(
  errors: ErrorCurves,
  gains: HeuristicGains = DEFAULT_GAINS
): Record<string, number> {
  const W_bow: [number, number] = [0.90, 1.00];
  const W_stern: [number, number] = [0.00, 0.10];
  const W_mid: [number, number] = [0.45, 0.55];
  
  // Compute mean errors over windows
  const eB_full = computeMeanError(errors.eB, errors.stations, [0, 1]);
  const eB_bow = computeMeanError(errors.eB, errors.stations, W_bow);
  const eB_stern = computeMeanError(errors.eB, errors.stations, W_stern);
  const eK_bow = computeMeanError(errors.eK, errors.stations, W_bow);
  const eK_stern = computeMeanError(errors.eK, errors.stations, W_stern);
  const eD_stern = computeMeanError(errors.eD, errors.stations, W_stern);
  
  // Compute flatness error (simplified: use midship eK curvature)
  const flatnessError = computeMeanError(errors.eK, errors.stations, W_mid);
  
  return {
    beam: -gains.kB * eB_full,
    bowTaperMin: -gains.kT * eB_bow,
    sternTaperMin: -gains.kT * eB_stern,
    taperPower: gains.kP * (
      Math.sign(eB_bow) * Math.abs(eB_bow) +
      Math.sign(eB_stern) * Math.abs(eB_stern)
    ),
    rockerAmp: gains.kR * (eK_bow + eK_stern),
    bowLiftAmp: gains.kL * eK_bow,
    sternDeckDrop: gains.kD * eD_stern,
    vHullDepth: -gains.kV * flatnessError
  };
}
```

### **3.7 Optimization Schedule (Multi-Scale, No Chaos)**

**2.6 Optimization schedule (multi-scale, no chaos)**

**Run in phases:**

#### **Phase 0 — Sanity**

**fit length/beam/height to bring RMS into reasonable range**

#### **Phase 1 — Planform**

**iterate on bowTaperMin/sternTaperMin/taperPower/beam/bowTipPoint/bowTipRound using TOP only**

#### **Phase 2 — Rocker + Deck**

**iterate on rockerAmp/bowLiftAmp/sternDeckDrop/height using SIDE only**

#### **Phase 3 — V-hull**

**tune vHullDepth using FRONT/REAR cues (or midship side residual until you implement section extraction)**

#### **Phase 4 — Cockpit Local**

**adjust cockpit position/size only if mismatch is localized to its zone**

**This exactly mirrors your current sculpt sequence in code: taper → V-hull → rocker/bow lift → cockpit → bow tip → stern deck drop.**

**TypeScript Implementation:**
```typescript
type OptimizationPhase = "phase0_sanity" | "phase1_planform" | "phase2_rocker" | "phase3_vhull" | "phase4_cockpit";

interface PhaseConfig {
  phase: OptimizationPhase;
  parameterPaths: string[];
  errorCurves: ("eB" | "eK" | "eD")[];
  maxIterations: number;
  tolerance: number;
}

const PHASE_CONFIGS: PhaseConfig[] = [
  {
    phase: "phase0_sanity",
    parameterPaths: ["hull.length", "hull.beam", "hull.height"],
    errorCurves: ["eB", "eK", "eD"],
    maxIterations: 5,
    tolerance: 0.05
  },
  {
    phase: "phase1_planform",
    parameterPaths: [
      "hull.bowTaperMin",
      "hull.sternTaperMin",
      "hull.taperPower",
      "hull.beam",
      "hull.bowTipPoint",
      "hull.bowTipRound"
    ],
    errorCurves: ["eB"],
    maxIterations: 10,
    tolerance: 0.01
  },
  {
    phase: "phase2_rocker",
    parameterPaths: [
      "hull.rockerAmp",
      "hull.bowLiftAmp",
      "hull.sternDeckDrop",
      "hull.height"
    ],
    errorCurves: ["eK", "eD"],
    maxIterations: 10,
    tolerance: 0.01
  },
  {
    phase: "phase3_vhull",
    parameterPaths: ["hull.vHullDepth"],
    errorCurves: ["eK"], // Or front/rear section errors
    maxIterations: 5,
    tolerance: 0.005
  },
  {
    phase: "phase4_cockpit",
    parameterPaths: ["cockpit.main.position", "cockpit.main.size"],
    errorCurves: ["eB", "eD"], // Localized to cockpit zone
    maxIterations: 5,
    tolerance: 0.005
  }
];

async function runMultiPhaseOptimization(
  spec: AssetSpec,
  referencePack: ReferencePack,
  phaseConfigs: PhaseConfig[] = PHASE_CONFIGS
): Promise<{
  finalSpec: AssetSpec;
  patches: ParamPatch[];
  diagnostics: DiagnosticsOutput[];
}> {
  let currentSpec = spec;
  const allPatches: ParamPatch[] = [];
  const allDiagnostics: DiagnosticsOutput[] = [];
  
  for (const phaseConfig of phaseConfigs) {
    console.log(`Starting ${phaseConfig.phase}...`);
    
    for (let iteration = 0; iteration < phaseConfig.maxIterations; iteration++) {
      // Render model
      const mesh = compileAsset(currentSpec, buildConfig).mesh;
      const diagnostics = generateDiagnostics(currentSpec, referencePack, mesh);
      allDiagnostics.push(diagnostics);
      
      // Check convergence
      const scores = diagnostics.fitReport;
      const rmsTotal = Math.sqrt(
        scores.rms.B ** 2 + scores.rms.K ** 2 + scores.rms.D ** 2
      );
      
      if (rmsTotal < phaseConfig.tolerance) {
        console.log(`${phaseConfig.phase} converged at iteration ${iteration}`);
        break;
      }
      
      // Generate patch for this phase
      const errors = diagnostics.errorCurves;
      const patch = generatePhasePatch(
        errors,
        currentSpec,
        phaseConfig
      );
      
      // Apply patch
      currentSpec = applyPatch(currentSpec, patch);
      allPatches.push(patch);
      
      // Check if improvement
      // (would need to recompile and compare)
    }
  }
  
  return {
    finalSpec: currentSpec,
    patches: allPatches,
    diagnostics: allDiagnostics
  };
}

function generatePhasePatch(
  errors: ErrorCurves,
  spec: AssetSpec,
  phaseConfig: PhaseConfig
): ParamPatch {
  // Filter errors to only relevant curves
  const filteredErrors: ErrorCurves = {
    eB: phaseConfig.errorCurves.includes("eB") ? errors.eB : [],
    eK: phaseConfig.errorCurves.includes("eK") ? errors.eK : [],
    eD: phaseConfig.errorCurves.includes("eD") ? errors.eD : [],
    stations: errors.stations,
    N: errors.N
  };
  
  // Compute deltas
  const deltas = computeParameterDeltas(filteredErrors);
  
  // Filter to only phase parameters
  const changes: PatchChange[] = [];
  for (const paramPath of phaseConfig.parameterPaths) {
    const paramName = paramPath.split(".").pop();
    if (paramName && deltas[paramName] !== undefined) {
      changes.push({
        path: paramPath,
        op: "add",
        value: deltas[paramName],
        bounds: getBoundsForParameter(paramName)
      });
    }
  }
  
  return {
    patchId: `fit_${phaseConfig.phase}_${new Date().toISOString()}`,
    timestamp: new Date().toISOString(),
    changes,
    stage: "A",
    source: "fit"
  };
}
```

**[END:TAG:FITTING]**

---

## 4. PART 3: LLM-ASSISTED FIT PROTOCOL

**[TAG:LLM] [TAG:FITTING]**

### **4.1 Overview**

**Part 3 — "LLM-assisted fit" protocol (optional, but extremely powerful)**

**If you want to let a model propose patches:**

### **4.2 Inputs You Provide**

**Inputs you provide**

- 4 ortho renders (model + reference overlay)
- error arrays eB,eK,eD (or plotted PNGs)
- current parameter block (boatBuilder.laser.hull + cockpit fields)
- bounds + stepMax rules
- objective: decrease RMS without increasing fairness penalty

### **4.3 Output You Accept**

**Output you accept**

**Only a JSON patch to these whitelisted paths:**

- boatBuilder.laser.hull.* fields listed in your schema
- boatBuilder.laser.cockpit.main.position/size

**Everything else rejected.**

**Implementation:** (See MASTER_METRICS_FITTING_LOOP_SYSTEM_MAP.md Section 9 for complete LLM Patch Protocol)

**[END:TAG:LLM]**

---

## 5. PART 4: IMPLEMENTATION CHECKLIST

**[TAG:IMPLEMENTATION] [TAG:CHECKLIST]**

### **5.1 Minimum Code You Must Add First**

**4.1 Minimum code you must add first**

1. **ReferencePack editor** (scale + centerline + origin tools)
2. **Underlay plane placement** (metric correct)
3. **Binary silhouette render pass**
4. **Scanline extrema extractor** (TOP and SIDE first)
5. **Error curves view** (plots in meters)
6. **Heuristic patch generator** (Phase 0–2)
7. **Patch apply/revert + timeline**

**Once TOP+SIDE fit is working, you can add FRONT/REAR section fitting.**

### **5.2 Implementation Order**

**Recommended order:**

1. ✅ Calibration UI (4 tools)
2. ✅ Calibration math (pxPerMeter, centerline, origin)
3. ✅ ReferencePack JSON generation
4. ✅ Three.js underlay placement
5. ✅ Binary silhouette rendering
6. ✅ Scanline extrema extraction (TOP + SIDE)
7. ✅ Error curve computation
8. ✅ Error curves visualization
9. ✅ Phase 0 patch generator (sanity)
10. ✅ Phase 1 patch generator (planform)
11. ✅ Phase 2 patch generator (rocker + deck)
12. ✅ Patch application
13. ✅ Patch timeline UI
14. ⬜ Phase 3 patch generator (V-hull)
15. ⬜ Phase 4 patch generator (cockpit)
16. ⬜ FRONT/REAR section extraction

**[END:TAG:IMPLEMENTATION]**

---

## 6. CALIBRATION UI TOOLS

**[TAG:UI] [TAG:CALIBRATION]**

### **6.1 Scale Tool**

**Purpose:** Calibrate pixel-to-meter conversion

**Interaction:**
1. Click point A on image
2. Click point B on image
3. Enter known distance in meters
4. System computes pxPerMeter

**TypeScript Interface:**
```typescript
interface ScaleToolState {
  pointA?: [number, number];
  pointB?: [number, number];
  knownMeters?: number;
}

function handleScaleToolClick(
  state: ScaleToolState,
  pixel: [number, number],
  knownMeters?: number
): ScaleToolState {
  if (!state.pointA) {
    return { ...state, pointA: pixel };
  } else if (!state.pointB) {
    return { ...state, pointB: pixel, knownMeters };
  } else {
    // Reset for new measurement
    return { pointA: pixel };
  }
}
```

### **6.2 Centerline Tool**

**Purpose:** Define symmetry axis for image rotation

**Interaction:**
1. Click point C0 on centerline
2. Click point C1 on centerline
3. System computes centerline angle

**TypeScript Interface:**
```typescript
interface CenterlineToolState {
  point0?: [number, number];
  point1?: [number, number];
}

function handleCenterlineToolClick(
  state: CenterlineToolState,
  pixel: [number, number]
): CenterlineToolState {
  if (!state.point0) {
    return { ...state, point0: pixel };
  } else {
    return { ...state, point1: pixel };
  }
}
```

### **6.3 Origin Tool**

**Purpose:** Define (0,0) point in metric plane

**Interaction:**
1. Click pixel to set as origin
2. System stores originPx

**TypeScript Interface:**
```typescript
interface OriginToolState {
  origin?: [number, number];
}

function handleOriginToolClick(
  state: OriginToolState,
  pixel: [number, number]
): OriginToolState {
  return { origin: pixel };
}
```

### **6.4 Nudge Tool**

**Purpose:** Fine-tune alignment with small adjustments

**Interaction:**
1. Drag to translate
2. Shift+drag to rotate
3. System stores nudgeTranslation and nudgeRotation deltas

**TypeScript Interface:**
```typescript
interface NudgeToolState {
  translation?: [number, number];
  rotation?: number;
}

function handleNudgeToolDrag(
  state: NudgeToolState,
  deltaX: number,
  deltaY: number,
  isRotation: boolean = false
): NudgeToolState {
  if (isRotation) {
    const angle = Math.atan2(deltaY, deltaX);
    return { ...state, rotation: angle };
  } else {
    return {
      ...state,
      translation: [deltaX, deltaY]
    };
  }
}
```

### **6.5 Complete Calibration UI Component**

```typescript
interface CalibrationUIProps {
  view: "top" | "side" | "front" | "rear";
  imageUrl: string;
  onCalibrationComplete: (calibration: ViewCalibration) => void;
}

function CalibrationUI({
  view,
  imageUrl,
  onCalibrationComplete
}: CalibrationUIProps) {
  const [tool, setTool] = useState<"scale" | "centerline" | "origin" | "nudge">("scale");
  const [scaleState, setScaleState] = useState<ScaleToolState>({});
  const [centerlineState, setCenterlineState] = useState<CenterlineToolState>({});
  const [originState, setOriginState] = useState<OriginToolState>({});
  const [nudgeState, setNudgeState] = useState<NudgeToolState>({});
  
  const handleImageClick = (pixel: [number, number]) => {
    switch (tool) {
      case "scale":
        setScaleState(handleScaleToolClick(scaleState, pixel));
        break;
      case "centerline":
        setCenterlineState(handleCenterlineToolClick(centerlineState, pixel));
        break;
      case "origin":
        setOriginState(handleOriginToolClick(originState, pixel));
        break;
    }
  };
  
  const handleComplete = () => {
    const calibration = computeCalibration({
      view,
      scalePointA: scaleState.pointA,
      scalePointB: scaleState.pointB,
      knownMeters: scaleState.knownMeters,
      centerlinePoint0: centerlineState.point0,
      centerlinePoint1: centerlineState.point1,
      originPoint: originState.origin,
      nudgeTranslation: nudgeState.translation,
      nudgeRotation: nudgeState.rotation
    });
    
    onCalibrationComplete(calibration);
  };
  
  return (
    <div className="calibration-ui">
      <ToolPalette tool={tool} onToolChange={setTool} />
      <ImageCanvas
        imageUrl={imageUrl}
        onClick={handleImageClick}
        markers={{
          scaleA: scaleState.pointA,
          scaleB: scaleState.pointB,
          centerline0: centerlineState.point0,
          centerline1: centerlineState.point1,
          origin: originState.origin
        }}
      />
      <MetersInput
        value={scaleState.knownMeters}
        onChange={(m) => setScaleState({ ...scaleState, knownMeters: m })}
        visible={tool === "scale" && scaleState.pointB !== undefined}
      />
      <button onClick={handleComplete} disabled={!isCalibrationComplete()}>
        Complete Calibration
      </button>
    </div>
  );
}
```

**[END:TAG:UI]**

---

## 7. CALIBRATION MATH

**[TAG:MATH] [TAG:CALIBRATION]**

### **7.1 Pixel-to-Meter Conversion**

**Formulas:**

```
d_px = ||B_px - A_px||
pxPerMeter = d_px / d_m
metersPerPx = 1 / pxPerMeter
```

**Implementation:**
```typescript
function computePixelDistance(
  pointA: [number, number],
  pointB: [number, number]
): number {
  const dx = pointB[0] - pointA[0];
  const dy = pointB[1] - pointA[1];
  return Math.sqrt(dx * dx + dy * dy);
}

function computePxPerMeter(
  pixelDistance: number,
  knownMeters: number
): number {
  return pixelDistance / knownMeters;
}

function computeMetersPerPixel(pxPerMeter: number): number {
  return 1 / pxPerMeter;
}
```

### **7.2 Centerline Angle**

**Formula:**

```
θ = atan2(C1.y - C0.y, C1.x - C0.x)
```

**Implementation:**
```typescript
function computeCenterlineAngle(
  point0: [number, number],
  point1: [number, number]
): number {
  const dx = point1[0] - point0[0];
  const dy = point1[1] - point0[1];
  return Math.atan2(dy, dx);
}
```

### **7.3 Origin Offset in Meters**

**Formula:**

```
ox = (originPx.x - Wpx/2) / pxPerMeter
oy = (originPx.y - Hpx/2) / pxPerMeter
```

**Implementation:**
```typescript
function computeOriginOffset(
  originPx: [number, number],
  imageWidth: number,
  imageHeight: number,
  pxPerMeter: number
): [number, number] {
  const ox = (originPx[0] - imageWidth / 2) / pxPerMeter;
  const oy = (originPx[1] - imageHeight / 2) / pxPerMeter;
  return [ox, oy];
}
```

**[END:TAG:MATH]**

---

## 8. PARAMETER MAPPING

**[TAG:PARAMETERS] [TAG:MAPPING]**

### **8.1 Error-to-Parameter Mapping Table**

| Error Source | Parameter | Direction | Window |
|-------------|-----------|-----------|--------|
| eB (full) | beam | negative | full |
| eB (bow) | bowTaperMin | negative | [0.90..1.00] |
| eB (stern) | sternTaperMin | negative | [0.00..0.10] |
| eB (bow+stern) | taperPower | signed sum | [0.90..1.00] + [0.00..0.10] |
| eK (bow+stern) | rockerAmp | positive sum | [0.90..1.00] + [0.00..0.10] |
| eK (bow) | bowLiftAmp | positive | [0.90..1.00] |
| eD (stern) | sternDeckDrop | positive | [0.00..0.10] |
| flatnessError (mid) | vHullDepth | negative | [0.45..0.55] |
| eB (cockpit zone) | cockpit.size | signed | localized |
| eB (cockpit zone) | cockpit.position | signed | localized |

### **8.2 Parameter Paths**

**Whitelisted parameter paths for patches:**

```
hull.length
hull.beam
hull.height
hull.bowTaperMin
hull.sternTaperMin
hull.taperPower
hull.rockerAmp
hull.bowLiftAmp
hull.sternDeckDrop
hull.vHullDepth
hull.bowTipPoint
hull.bowTipRound
cockpit.main.position
cockpit.main.size
```

**[END:TAG:PARAMETERS]**

---

## 9. PATCH GENERATION ALGORITHMS

**[TAG:ALGORITHMS] [TAG:PATCHES]**

### **9.1 Complete Patch Generation Flow**

```typescript
function generateFitPatch(
  errors: ErrorCurves,
  currentSpec: AssetSpec,
  phase: OptimizationPhase,
  bounds: ParameterBounds = DEFAULT_BOUNDS,
  gains: HeuristicGains = DEFAULT_GAINS
): ParamPatch {
  // 1. Filter errors to phase-relevant curves
  const phaseConfig = PHASE_CONFIGS.find(c => c.phase === phase);
  if (!phaseConfig) {
    throw new Error(`Unknown phase: ${phase}`);
  }
  
  const filteredErrors: ErrorCurves = {
    eB: phaseConfig.errorCurves.includes("eB") ? errors.eB : [],
    eK: phaseConfig.errorCurves.includes("eK") ? errors.eK : [],
    eD: phaseConfig.errorCurves.includes("eD") ? errors.eD : [],
    stations: errors.stations,
    N: errors.N
  };
  
  // 2. Compute parameter deltas using heuristic formulas
  const deltas = computeParameterDeltas(filteredErrors, gains);
  
  // 3. Generate patch changes for phase parameters only
  const changes: PatchChange[] = [];
  for (const paramPath of phaseConfig.parameterPaths) {
    const paramName = paramPath.split(".").pop()!;
    if (deltas[paramName] !== undefined) {
      const bound = bounds[paramName as keyof ParameterBounds];
      if (!bound) continue;
      
      // Get current value
      const currentValue = getParameterValue(currentSpec, paramPath);
      
      // Compute delta with step clamping
      let delta = deltas[paramName];
      delta = Math.max(-bound.stepMax, Math.min(bound.stepMax, delta));
      
      // Compute new value with bounds clamping
      let newValue = currentValue + delta;
      newValue = Math.max(bound.min, Math.min(bound.max, newValue));
      
      // Only add if significant change
      if (Math.abs(newValue - currentValue) > 1e-6) {
        changes.push({
          path: paramPath,
          op: "set",
          value: newValue,
          bounds: { min: bound.min, max: bound.max }
        });
      }
    }
  }
  
  // 4. Create patch
  return {
    patchId: `fit_${phase}_${Date.now()}`,
    timestamp: new Date().toISOString(),
    changes,
    stage: "A",
    source: "fit",
    notes: [`Generated by ${phase} phase optimization`]
  };
}

function getParameterValue(spec: AssetSpec, path: string): number {
  const parts = path.split(".");
  let value: any = spec;
  for (const part of parts) {
    value = value[part];
    if (value === undefined) {
      throw new Error(`Parameter path ${path} not found`);
    }
  }
  return value as number;
}
```

**[END:TAG:ALGORITHMS]**

---

## 10. OPTIMIZATION SCHEDULE

**[TAG:OPTIMIZATION] [TAG:SCHEDULE]**

### **10.1 Phase Sequence**

**Phase execution order:**

1. **Phase 0: Sanity** (global scale)
2. **Phase 1: Planform** (TOP view, width/shape)
3. **Phase 2: Rocker + Deck** (SIDE view, height profiles)
4. **Phase 3: V-hull** (FRONT/REAR, cross-section)
5. **Phase 4: Cockpit** (localized, TOP+SIDE)

### **10.2 Phase Dependencies**

**Each phase depends on previous phases:**
- Phase 1 requires Phase 0 (global scale established)
- Phase 2 requires Phase 1 (planform established)
- Phase 3 requires Phase 2 (profiles established)
- Phase 4 requires Phase 1+2 (global shape established)

### **10.3 Convergence Criteria**

**Per phase:**
- Maximum iterations (5-10)
- RMS tolerance (0.005-0.05 meters)
- Minimum improvement threshold (0.001 meters)

**[END:TAG:OPTIMIZATION]**

---

## 11. INTEGRATION POINTS

**[TAG:INTEGRATION]**

### **Integration with ReferencePack System (Step 1)**

**Input:**
```
Calibration UI
  → Generates ViewCalibration
  → Writes ReferencePack JSON
  → Used by underlay placement
```

### **Integration with Metrics + Fitting Loop (Step 4)**

**Bidirectional:**
```
First-Fit Loop
  → Uses error extraction from Step 4
  → Generates patches (bounded, deterministic)
  → Applies patches via Step 4 patch system
  → Re-evaluates errors
  → Iterates
```

### **Integration with Compiler (Step 5)**

**Output:**
```
First-Fit Loop
  → Applies patches to spec
  → Compiles asset
  → Generates diagnostics
  → Evaluates fit quality
```

**[END:TAG:INTEGRATION]**

---

## 12. FILE DEPENDENCY GRAPH

**[TAG:DEPS]**

```
ReferencePack Calibration Workflow System
  │
  ├─→ modelmaker.txt (Step 6.9 specification)
  │   └─→ Lines 3529-3956: Complete specification
  │
  ├─→ ReferencePack System (Step 1)
  │   ├─→ Calibration data structure
  │   └─→ Underlay placement
  │
  ├─→ Metrics + Fitting Loop (Step 4)
  │   ├─→ Error extraction
  │   ├─→ Patch application
  │   └─→ Diagnostics generation
  │
  ├─→ Compiler (Step 5)
  │   └─→ Asset compilation for evaluation
  │
  └─→ UI Components
      ├─→ Calibration UI Tools
      ├─→ Error Curves Visualization
      └─→ Patch Timeline
```

**[END:TAG:DEPS]**

---

## 13. TYPE FLOW MAP

**[TAG:TYPE_FLOW]**

### **Calibration Flow**

```
User Clicks (Scale Tool)
  ↓
Pixel Coordinates (A, B)
  ↓
Known Meters Input
  ↓
Compute pxPerMeter
  ↓
ViewCalibration
  ↓
ReferencePack JSON
  ↓
Three.js Underlay Mesh
```

### **Fitting Loop Flow**

```
ReferencePack + Asset Spec
  ↓
Render Model (Orthographic)
  ↓
Extract Silhouettes
  ↓
Compute Error Curves
  ↓
Generate Patch (Phase-Specific)
  ↓
Apply Patch
  ↓
Recompile Asset
  ↓
Re-evaluate Errors
  ↓
(Repeat until convergence)
```

**[END:TAG:TYPE_FLOW]**

---

## 14. RELATIONSHIP MATRIX

**[TAG:RELATIONS]**

### **System Relationships**

| System | Relationship | Data Flow |
|--------|-------------|-----------|
| ReferencePack | Creates | Calibration → ReferencePack JSON |
| Metrics + Fitting Loop | Uses | Error curves → Patch generation |
| Compiler | Uses | Patched spec → Compiled asset |
| Calibration UI | Provides | User input → Calibration data |

### **Workflow Relationships**

| Workflow | Input | Output | Purpose |
|----------|-------|--------|---------|
| Calibration | Image + User clicks | ReferencePack | Metric truth |
| First-Fit Loop | Errors + Spec | Patches | Automated refinement |
| Multi-Phase Optimization | Errors + Phases | Optimized Spec | Systematic fitting |

**[END:TAG:RELATIONS]**

---

## 📝 WHAT STEP 6.9 "COMPLETES"

**After Step 6.9, your system can:**

- Calibrate orthographic reference images to metric truth
- Automate first-fit loop with deterministic patch generation
- Use multi-phase optimization for systematic refinement
- Integrate LLM-assisted fitting (optional, supervised)
- Provide complete implementation checklist for fastest path to "it works"

**This completes the calibration and automation workflow layer.**

---

**Status:** PHASE 1 - Foundation System Mapping  
**Confidence:** 0.95 (Very High - Complete specification extracted from modelmaker.txt)  
**Next:** Implement ReferencePack Calibration Workflow system based on this specification



---


---

<!-- AUTO-GENERATED FROM: MASTER_GRAPH_TEMPLATE_SYSTEM_MAP.md -->
<!-- DO NOT EDIT THIS SECTION DIRECTLY -->
<!-- Source File: MASTER_GRAPH_TEMPLATE_SYSTEM_MAP.md -->
<!-- File Size: 50946 bytes -->

<a id='graph-template-system-map'></a>

# MASTER GRAPH TEMPLATE SYSTEM MAP
**Complete System Anatomy Mapping - GraphTemplate System (Graph-Based Structures Extension)**

**Date:** 2025-01-27  
**Version:** 1.0.0  
**Purpose:** Complete S.A.M. documentation for GraphTemplate System (modelmaker.txt GraphTemplate spec)  
**Status:** PHASE 1 - Foundation System Mapping  
**System:** Lucid Image Editor - Universal Parametric Asset Engine  
**Reference:** modelmaker.txt GraphTemplate spec (Lines 3958-4745, plus Architecture Stack 4747-5248+)

---

## 📋 TABLE OF CONTENTS

1. [System Overview](#1-system-overview)
2. [The Big Unification](#2-the-big-unification)
3. [Core Types](#3-core-types)
4. [Operators](#4-operators)
5. [Junctions](#5-junctions)
6. [WheelGraphPreset (32 Spokes + 3-Cross)](#6-wheelgraphpreset-32-spokes--3-cross)
7. [Plants/Veins/Branches](#7-plantsveinsbranches)
8. [Skeletons](#8-skeletons)
9. [Compilation Order](#9-compilation-order)
10. [LOD Rules for Graphs](#10-lod-rules-for-graphs)
11. [Editor UX](#11-editor-ux)
12. [Minimum Implementation](#12-minimum-implementation)
13. [Concrete Presets](#13-concrete-presets)
14. [Architecture Stack v1](#14-architecture-stack-v1)
15. [Integration Points](#15-integration-points)
16. [File Dependency Graph](#16-file-dependency-graph)
17. [Relationship Matrix](#17-relationship-matrix)

---

## 1. SYSTEM OVERVIEW

**[TAG:OVERVIEW] [TAG:GRAPH_TEMPLATE]**

### **What is the GraphTemplate System?**

**GraphTemplate spec that plugs into your existing curve/feature compiler and instantly unlocks:**

- bicycle wheels (32 spokes, 2-cross/3-cross)
- aircraft ribs + stringers
- veins (leaf, wings)
- trees + branching
- human skeleton (bone graph + joints)
- pipes/cables/wiring
- architectural trusses

**Think of it as: Shells are surfaces; Graphs are structures. Most "complex objects" are both.**

**Location:** Architecture defined in modelmaker.txt GraphTemplate spec  
**Purpose:** Extend parametric engine to handle graph-based structures  
**Core Principle:** Nodes + edges + sweep profiles + arrays + junctions = universal structure representation

### **Key Responsibilities**

1. **Graph Representation**: Nodes, edges, junctions as first-class entities
2. **Coordinate Spaces**: WORLD, LOCAL, SURFACE (surface anchoring for stability)
3. **Operators**: RadialArray, Growth, Mirror, Lattice for pattern generation
4. **Junctions**: Cap, HubShell, Blend for clean edge connections
5. **Sweep Geometry**: Edges → tubes via cross-section profiles
6. **Presets**: Wheel, Tree, Skeleton, Architecture examples

### **What This System Unlocks**

**Structures that are graph-based:**
- Wheels (spokes, hubs, rims)
- Trees (branches, trunk)
- Skeletons (bones, joints)
- Architecture (framing, MEP, trusses)
- Veins (leaf structures)
- Ribs (aircraft structures)
- Cables/wiring (routed networks)

**[END:TAG:OVERVIEW]**

---

## 2. THE BIG UNIFICATION

**[TAG:UNIFICATION]**

### **Unifying Template System**

**1) The Big Unification**

**You already have:**

- **SurfaceTemplate:** curve-first hull/body shells with (u,s,side) design attributes
- **FeatureGraph:** local edits (recess, bulge, crease, warp, boss)

**Add:**

- **GraphTemplate:** nodes + edges + sweep profiles + arrays + junctions
- **GraphFeatures:** same patch/crease/recess logic, but applied to edges/tubes or junction shells

**Then everything becomes presets.**

### **System Hierarchy**

```
Universal Parametric Asset Engine
  ├─ SurfaceTemplate (shells, surfaces, bodies)
  │   └─ FeatureGraph (local edits to surfaces)
  ├─ GraphTemplate (structures, networks, graphs)
  │   └─ GraphFeatures (local edits to edges/tubes)
  └─ Presets (combinations of above)
```

**[END:TAG:UNIFICATION]**

---

## 3. CORE TYPES

**[TAG:CORE_TYPES] [TAG:SCHEMAS]**

### **3.1 Coordinate Spaces (Critical)**

**2.1 Coordinate spaces (critical)**

**A graph element can live in:**

- **WORLD** (absolute)
- **LOCAL** (asset-space)
- **SURFACE** (anchored to a SurfaceTemplate chart; stable under mesh resolution changes)

**Surface anchoring is the superpower: a spoke hole "sticks" to the rim even if you resample LODs.**

### **3.2 Minimal TS-Style Schema**

**2.2 Minimal TS-style schema**

```typescript
export type Space = "WORLD" | "LOCAL" | "SURFACE";

export type Frame = {
  pos: [number, number, number];         // x,y,z
  rot: [number, number, number, number]; // quaternion
};

export type SurfaceAnchor = {
  templateId: string;    // e.g. "BoatHullTemplate"
  region: string;        // "deck", "hull", "rail", "rim", etc.
  uv: [number, number];  // stable param space
  offset?: [number, number, number]; // along local tangent/normal basis
};

export type NodeSpec = {
  id: string;
  space: Space;
  frame?: Frame;               // when space WORLD/LOCAL
  anchor?: SurfaceAnchor;      // when space SURFACE
  role?: "joint"|"hub"|"rim"|"branch"|"mount"|"control";
  meta?: Record<string, any>;
};

export type SweepProfile =
  | { kind:"circle"; r:number }
  | { kind:"ellipse"; rx:number; rz:number }
  | { kind:"tube"; r0:number; r1:number }               // linear taper
  | { kind:"custom2D"; points:[number,number][], scale?:number };

export type RadiusLaw = {
  // radius or profile scaling along edge t in [0,1]
  kind: "constant" | "linear" | "bezier" | "curve";
  params: any;
};

export type EdgePath =
  | { kind:"line" }
  | { kind:"arc"; axis:"X"|"Y"|"Z"; angle:number }
  | { kind:"spline"; points:[number,number,number][] }  // local control points
  | { kind:"surfaceGeodesic"; region:string; uv0:[number,number]; uv1:[number,number] };

export type EdgeSpec = {
  id: string;
  a: string;  // node id
  b: string;  // node id

  path?: EdgePath;         // default line between nodes
  profile: SweepProfile;   // cross-section
  radiusLaw?: RadiusLaw;   // optional scaling along edge
  twist?: number;          // radians along length
  segments?: number;       // sampling quality

  // "cable/rope" optional physics hint
  phys?: { kind:"rigid"|"cable"; massPerM?:number; stiffness?:number };

  meta?: Record<string, any>;
};

export type JunctionSpec = {
  id: string;
  nodeId: string; // where edges meet
  kind: "cap"|"hubShell"|"blend";
  radius?: number;
  smooth?: number; // blend feel
  meta?: Record<string, any>;
};

export type GraphSpec = {
  id: string;
  nodes: NodeSpec[];
  edges: EdgeSpec[];
  junctions?: JunctionSpec[];

  // pattern operators compiled into nodes/edges
  operators?: OperatorSpec[];

  // constraints are checks (and optional solvers) to keep it "real"
  constraints?: ConstraintSpec[];

  // hardpoints resolved from nodes or anchors
  hardpoints?: HardpointSpec[];
};
```

**This is enough to build: spokes, ribs, veins, branches, bones, trusses.**

### **3.3 Surface Anchor Resolution**

**Key Implementation:**
```typescript
function resolveSurfaceAnchor(
  anchor: SurfaceAnchor,
  surfaceTemplate: SurfaceTemplate,
  compiledMesh: THREE.Mesh
): Frame {
  // Look up the surface template
  const template = getTemplate(anchor.templateId);
  
  // Get the region mesh
  const regionMesh = getRegionMesh(compiledMesh, anchor.region);
  
  // Convert UV to world position
  const worldPos = uvToWorld(regionMesh, anchor.uv[0], anchor.uv[1]);
  
  // Get surface normal and tangent
  const normal = getSurfaceNormal(regionMesh, anchor.uv[0], anchor.uv[1]);
  const tangent = getSurfaceTangent(regionMesh, anchor.uv[0], anchor.uv[1]);
  
  // Build frame with offset
  const offset = anchor.offset || [0, 0, 0];
  const pos = [
    worldPos.x + offset[0] * tangent.x + offset[1] * normal.x,
    worldPos.y + offset[0] * tangent.y + offset[1] * normal.y,
    worldPos.z + offset[0] * tangent.z + offset[1] * normal.z
  ];
  
  // Build rotation from normal/tangent
  const rot = buildRotationFromNormalTangent(normal, tangent);
  
  return { pos, rot };
}
```

**[END:TAG:CORE_TYPES]**

---

## 4. OPERATORS

**[TAG:OPERATORS] [TAG:PATTERNS]**

### **4.1 Overview**

**3) Operators (the "make 32 spokes" button)**

**Operators don't generate triangles. They generate graph elements deterministically.**

### **4.2 RadialArray Operator (Mandatory)**

**3.1 RadialArray operator (mandatory)**

```typescript
export type OperatorSpec =
  | {
      kind:"radialArray";
      sourceNodeIds?: string[];
      sourceEdgeIds?: string[];
      center: Frame;          // axis + origin
      axis: "X"|"Y"|"Z";
      count: number;          // 32
      angleOffset?: number;   // radians
      mirrorSide?: boolean;   // for left/right flange
    }
  | { kind:"mirror"; plane:"YZ"|"XZ"|"XY"; sourceIds:string[] }
  | { kind:"lattice"; ... }
  | { kind:"growth"; ... };
```

**RadialArray is the one that unlocks:**
- spoke patterns
- turbine blades
- rib stations
- flower petals
- column arrays

**Implementation:**
```typescript
function expandRadialArray(
  operator: RadialArrayOperator,
  sourceNodes: NodeSpec[],
  sourceEdges: EdgeSpec[]
): { nodes: NodeSpec[]; edges: EdgeSpec[] } {
  const expandedNodes: NodeSpec[] = [];
  const expandedEdges: EdgeSpec[] = [];
  
  const angleStep = (2 * Math.PI) / operator.count;
  
  for (let i = 0; i < operator.count; i++) {
    const angle = i * angleStep + (operator.angleOffset || 0);
    
    // Rotate source nodes
    for (const sourceNode of sourceNodes) {
      if (!sourceNode.frame) continue;
      
      const rotatedPos = rotateAroundAxis(
        sourceNode.frame.pos,
        operator.center.pos,
        operator.center.rot,
        operator.axis,
        angle
      );
      
      const rotatedRot = rotateQuaternion(
        sourceNode.frame.rot,
        operator.center.rot,
        operator.axis,
        angle
      );
      
      expandedNodes.push({
        ...sourceNode,
        id: `${sourceNode.id}_${i}`,
        frame: {
          pos: rotatedPos,
          rot: rotatedRot
        }
      });
    }
    
    // Rotate source edges (connect rotated nodes)
    for (const sourceEdge of sourceEdges) {
      const nodeA_id = `${sourceEdge.a}_${i}`;
      const nodeB_id = `${sourceEdge.b}_${i}`;
      
      expandedEdges.push({
        ...sourceEdge,
        id: `${sourceEdge.id}_${i}`,
        a: nodeA_id,
        b: nodeB_id,
        path: rotateEdgePath(sourceEdge.path, angle, operator.axis)
      });
    }
  }
  
  return { nodes: expandedNodes, edges: expandedEdges };
}
```

### **4.3 Mirror Operator**

```typescript
export type MirrorOperator = {
  kind: "mirror";
  plane: "YZ" | "XZ" | "XY";
  sourceIds: string[];
};

function expandMirror(
  operator: MirrorOperator,
  graph: GraphSpec
): { nodes: NodeSpec[]; edges: EdgeSpec[] } {
  const mirroredNodes: NodeSpec[] = [];
  const mirroredEdges: EdgeSpec[] = [];
  
  // Mirror nodes
  for (const node of graph.nodes) {
    if (!operator.sourceIds.includes(node.id)) continue;
    if (!node.frame) continue;
    
    const mirroredPos = mirrorPosition(node.frame.pos, operator.plane);
    const mirroredRot = mirrorQuaternion(node.frame.rot, operator.plane);
    
    mirroredNodes.push({
      ...node,
      id: `${node.id}_mirrored`,
      frame: {
        pos: mirroredPos,
        rot: mirroredRot
      }
    });
  }
  
  // Mirror edges
  for (const edge of graph.edges) {
    if (!operator.sourceIds.some(id => edge.a === id || edge.b === id)) continue;
    
    const mirroredA = `${edge.a}_mirrored`;
    const mirroredB = `${edge.b}_mirrored`;
    
    mirroredEdges.push({
      ...edge,
      id: `${edge.id}_mirrored`,
      a: mirroredA,
      b: mirroredB,
      path: mirrorEdgePath(edge.path, operator.plane)
    });
  }
  
  return { nodes: mirroredNodes, edges: mirroredEdges };
}
```

### **4.4 Growth Operator**

```typescript
export type GrowthOperator = {
  kind: "growth";
  sourceIds: string[];
  params: {
    steps: number;
    branchFactor: number;
    length0: number;
    lengthFalloff: number;
    radius0: number;
    radiusFalloff: number;
    splitAngleDeg: number;
    yawNoiseDeg: number;
    bendNoise: number;
    seed: number;
  };
};

function expandGrowth(
  operator: GrowthOperator,
  graph: GraphSpec
): { nodes: NodeSpec[]; edges: EdgeSpec[] } {
  const grownNodes: NodeSpec[] = [...graph.nodes];
  const grownEdges: EdgeSpec[] = [...graph.edges];
  
  const rng = seededRandom(operator.params.seed);
  let activeTips = operator.sourceIds.map(id => 
    graph.nodes.find(n => n.id === id)!
  );
  
  for (let step = 0; step < operator.params.steps; step++) {
    const newTips: NodeSpec[] = [];
    
    for (const tip of activeTips) {
      if (!tip.frame) continue;
      
      // Compute current radius (with falloff)
      const currentRadius = operator.params.radius0 * 
        Math.pow(operator.params.radiusFalloff, step);
      
      // Stop if radius too small
      if (currentRadius < 0.001) continue;
      
      // Spawn children
      const numChildren = 1 + Math.floor(rng() * operator.params.branchFactor);
      
      for (let c = 0; c < numChildren; c++) {
        // Compute length (with falloff)
        const length = operator.params.length0 * 
          Math.pow(operator.params.lengthFalloff, step) * 
          (0.8 + 0.4 * rng());
        
        // Compute split angle
        const splitAngle = (operator.params.splitAngleDeg * Math.PI / 180) * 
          (0.5 + rng());
        
        // Compute yaw noise
        const yawNoise = (operator.params.yawNoiseDeg * Math.PI / 180) * 
          (2 * rng() - 1);
        
        // Build child position
        const direction = applyYawPitch(
          [0, 1, 0], // Up direction
          yawNoise,
          splitAngle
        );
        
        const childPos: [number, number, number] = [
          tip.frame.pos[0] + direction[0] * length,
          tip.frame.pos[1] + direction[1] * length,
          tip.frame.pos[2] + direction[2] * length
        ];
        
        // Create child node
        const childId = `growth_${step}_${c}_${tip.id}`;
        const childNode: NodeSpec = {
          id: childId,
          space: tip.space,
          frame: {
            pos: childPos,
            rot: tip.frame.rot // Inherit rotation (can add noise)
          },
          role: "branch",
          meta: {
            generation: step,
            parentId: tip.id,
            radius: currentRadius
          }
        };
        
        grownNodes.push(childNode);
        newTips.push(childNode);
        
        // Create edge from tip to child
        const edge: EdgeSpec = {
          id: `edge_${tip.id}_${childId}`,
          a: tip.id,
          b: childId,
          path: {
            kind: "spline",
            points: [
              tip.frame.pos,
              [
                tip.frame.pos[0] + direction[0] * length * 0.5,
                tip.frame.pos[1] + direction[1] * length * 0.5 + 
                  operator.params.bendNoise * length * (2 * rng() - 1),
                tip.frame.pos[2] + direction[2] * length * 0.5
              ],
              childPos
            ]
          },
          profile: {
            kind: "circle",
            r: currentRadius
          },
          radiusLaw: {
            kind: "bezier",
            params: {
              r0: 1.0,
              rMid: 0.9,
              r1: operator.params.radiusFalloff
            }
          },
          segments: Math.max(8, Math.floor(length * 20)),
          meta: {
            generation: step
          }
        };
        
        grownEdges.push(edge);
      }
    }
    
    activeTips = newTips;
  }
  
  return { nodes: grownNodes, edges: grownEdges };
}
```

### **4.5 Lattice Operator (For Architecture Framing)**

```typescript
export type LatticeOperator = {
  kind: "lattice";
  sourceIds: string[];
  spacing: [number, number, number]; // X, Y, Z spacing
  bounds: { min: [number, number, number]; max: [number, number, number] };
  direction: "X" | "Y" | "Z";
};

function expandLattice(
  operator: LatticeOperator,
  graph: GraphSpec
): { nodes: NodeSpec[]; edges: EdgeSpec[] } {
  const latticeNodes: NodeSpec[] = [];
  const latticeEdges: EdgeSpec[] = [];
  
  const [spacingX, spacingY, spacingZ] = operator.spacing;
  const { min, max } = operator.bounds;
  
  // Generate grid nodes
  const nodesByCoord = new Map<string, NodeSpec>();
  
  for (let x = min[0]; x <= max[0]; x += spacingX) {
    for (let y = min[1]; y <= max[1]; y += spacingY) {
      for (let z = min[2]; z <= max[2]; z += spacingZ) {
        const coordKey = `${x},${y},${z}`;
        const node: NodeSpec = {
          id: `lattice_${coordKey}`,
          space: "LOCAL",
          frame: {
            pos: [x, y, z],
            rot: [0, 0, 0, 1]
          },
          role: "control"
        };
        
        nodesByCoord.set(coordKey, node);
        latticeNodes.push(node);
      }
    }
  }
  
  // Generate edges along primary direction
  for (let x = min[0]; x <= max[0]; x += spacingX) {
    for (let y = min[1]; y <= max[1]; y += spacingY) {
      for (let z = min[2]; z < max[2]; z += spacingZ) {
        const coordKey1 = `${x},${y},${z}`;
        const coordKey2 = `${x},${y},${z + spacingZ}`;
        
        const node1 = nodesByCoord.get(coordKey1);
        const node2 = nodesByCoord.get(coordKey2);
        
        if (node1 && node2) {
          latticeEdges.push({
            id: `lattice_edge_${coordKey1}_${coordKey2}`,
            a: node1.id,
            b: node2.id,
            path: { kind: "line" },
            profile: { kind: "circle", r: 0.01 },
            segments: 4
          });
        }
      }
    }
  }
  
  return { nodes: latticeNodes, edges: latticeEdges };
}
```

**[END:TAG:OPERATORS]**

---

## 5. JUNCTIONS

**[TAG:JUNCTIONS]**

### **5.1 Overview**

**4) Junctions (how spokes meet hubs cleanly)**

**You need three junction modes—simple → advanced.**

### **5.2 Cap (Fastest)**

**4.1 Cap (fastest)**

**Each edge gets an end cap (flat/round). Good for LODs and hidden interiors.**

**Implementation:**
```typescript
function buildJunctionCap(
  junction: JunctionSpec,
  node: NodeSpec,
  connectedEdges: EdgeSpec[]
): THREE.Mesh {
  // Get edge end positions
  const endPositions = connectedEdges.map(edge => {
    const endNodeId = edge.b === node.id ? edge.a : edge.b;
    const endNode = getNodeById(endNodeId);
    return endNode.frame!.pos;
  });
  
  // Create cap geometry (flat disk)
  const capGeometry = new THREE.CircleGeometry(
    junction.radius || 0.01,
    16
  );
  
  // Position cap at node
  const capMesh = new THREE.Mesh(capGeometry);
  capMesh.position.set(...node.frame!.pos);
  capMesh.quaternion.set(...node.frame!.rot);
  
  return capMesh;
}
```

### **5.3 HubShell (Recommended Default)**

**4.2 HubShell (recommended default)**

**At node N, generate a small shell (sphere-ish or custom) and attach edges with smooth tangency. This avoids expensive boolean operations and remains game-friendly.**

**Implementation:**
```typescript
function buildJunctionHubShell(
  junction: JunctionSpec,
  node: NodeSpec,
  connectedEdges: EdgeSpec[]
): THREE.Mesh {
  // Create sphere geometry
  const radius = junction.radius || 0.01;
  const smoothness = junction.smooth || 0.8;
  
  const sphereGeometry = new THREE.SphereGeometry(radius, 16, 16);
  
  // Get edge directions for tangency
  const edgeDirections = connectedEdges.map(edge => {
    const endNodeId = edge.b === node.id ? edge.a : edge.b;
    const endNode = getNodeById(endNodeId);
    const dir = [
      endNode.frame!.pos[0] - node.frame!.pos[0],
      endNode.frame!.pos[1] - node.frame!.pos[1],
      endNode.frame!.pos[2] - node.frame!.pos[2]
    ];
    const len = Math.sqrt(dir[0]**2 + dir[1]**2 + dir[2]**2);
    return [dir[0]/len, dir[1]/len, dir[2]/len] as [number, number, number];
  });
  
  // Create hub shell mesh
  const hubMesh = new THREE.Mesh(sphereGeometry);
  hubMesh.position.set(...node.frame!.pos);
  hubMesh.quaternion.set(...node.frame!.rot);
  
  // Apply smoothness (could modify geometry here for better blending)
  
  return hubMesh;
}
```

### **5.4 Blend (Optional)**

**4.3 Blend (optional)**

**If you ever want truly organic merges (roots, veins), you can do local implicit blending and remesh, but that's "nice-to-have," not required for your production path.**

**Implementation (placeholder):**
```typescript
function buildJunctionBlend(
  junction: JunctionSpec,
  node: NodeSpec,
  connectedEdges: EdgeSpec[]
): THREE.Mesh {
  // Advanced: Use implicit surface blending
  // This would require:
  // 1. Generate implicit surfaces for each edge
  // 2. Blend using RBF or other implicit method
  // 3. Extract mesh via marching cubes or similar
  // 
  // For now, fall back to HubShell
  return buildJunctionHubShell(junction, node, connectedEdges);
}
```

**[END:TAG:JUNCTIONS]**

---

## 6. WHEELGRAPHPRESET (32 SPOKES + 3-CROSS)

**[TAG:WHEEL] [TAG:PRESET]**

### **6.1 Overview**

**5) WheelGraphPreset (32 spokes + 3-cross) — the real unlock**

**A laced wheel is not "modeling." It's a mapping.**

### **6.2 Wheel Parameters**

**5.1 Wheel parameters**

```
N = 32 spokes
R_rim rim radius
R_hub hub flange radius
flangeOffsetY half distance between hub flanges (left/right)
cross = 0|1|2|3
holesRim = N, holesHub = N (often equal)
twoSided = true (left/right spokes)
```

### **6.3 Index Mapping for Lacing**

**5.2 Index mapping for lacing**

**Let rim holes be i ∈ [0..N-1].**
**For each rim hole i, choose hub hole index:**

**radial:**
```
j = i
```

**cross k:**
```
j = (i + k*sign) mod N
```

**Where sign alternates to create left/right and leading/trailing symmetry.**

**A clean deterministic scheme:**

**Split spokes into 4 groups:**
- LeftLeading, LeftTrailing, RightLeading, RightTrailing

**Each group uses:**
- flange = left or right
- tangential direction = + or −
- hub index offset = ±cross

**So for each rim index i:**

```
group = i mod 4
side = left if group ∈ {0,1}, right if {2,3}
dirSign = +1 for leading groups, −1 for trailing groups
hubHole = (i + dirSign*cross) mod N
```

**That generates classic 2-cross/3-cross "twist" without hand modeling.**

**TypeScript Implementation:**
```typescript
interface WheelLacingParams {
  N: number;              // Number of spokes (32)
  cross: number;          // Cross pattern (0, 1, 2, 3)
  rimRadius: number;      // Rim radius in meters
  hubRadius: number;      // Hub flange radius in meters
  hubFlangeY: number;     // Half distance between flanges
  spokeRadius: number;    // Spoke radius in meters
}

function generateWheelLacing(params: WheelLacingParams): {
  nodes: NodeSpec[];
  edges: EdgeSpec[];
} {
  const { N, cross, rimRadius, hubRadius, hubFlangeY, spokeRadius } = params;
  
  const nodes: NodeSpec[] = [];
  const edges: EdgeSpec[] = [];
  
  // Create hub center nodes
  const hubLeftCenter: NodeSpec = {
    id: "hub_left_center",
    space: "LOCAL",
    frame: {
      pos: [0, hubFlangeY, 0],
      rot: [0, 0, 0, 1]
    },
    role: "hub"
  };
  
  const hubRightCenter: NodeSpec = {
    id: "hub_right_center",
    space: "LOCAL",
    frame: {
      pos: [0, -hubFlangeY, 0],
      rot: [0, 0, 0, 1]
    },
    role: "hub"
  };
  
  nodes.push(hubLeftCenter, hubRightCenter);
  
  // Create rim hole nodes and hub hole nodes
  for (let i = 0; i < N; i++) {
    const angle = (2 * Math.PI * i) / N;
    
    // Rim hole node
    const rimHoleX = rimRadius * Math.cos(angle);
    const rimHoleZ = rimRadius * Math.sin(angle);
    
    const rimHoleNode: NodeSpec = {
      id: `rim_hole_${i}`,
      space: "LOCAL",
      frame: {
        pos: [rimHoleX, 0, rimHoleZ],
        rot: [0, 0, 0, 1]
      },
      role: "rim"
    };
    
    nodes.push(rimHoleNode);
    
    // Compute hub hole index using lacing algorithm
    const group = i % 4;
    const side = (group === 0 || group === 1) ? "left" : "right";
    const dirSign = (group === 0 || group === 2) ? 1 : -1; // Leading vs trailing
    const hubHoleIndex = (i + dirSign * cross + N) % N;
    
    // Hub hole node (left or right)
    const hubHoleAngle = (2 * Math.PI * hubHoleIndex) / N;
    const hubHoleX = hubRadius * Math.cos(hubHoleAngle);
    const hubHoleZ = hubRadius * Math.sin(hubHoleAngle);
    const hubHoleY = side === "left" ? hubFlangeY : -hubFlangeY;
    
    const hubHoleNode: NodeSpec = {
      id: `hub_${side}_hole_${hubHoleIndex}`,
      space: "LOCAL",
      frame: {
        pos: [hubHoleX, hubHoleY, hubHoleZ],
        rot: [0, 0, 0, 1]
      },
      role: "hub"
    };
    
    nodes.push(hubHoleNode);
    
    // Create spoke edge
    const spokeEdge: EdgeSpec = {
      id: `spoke_${i}`,
      a: rimHoleNode.id,
      b: hubHoleNode.id,
      path: {
        kind: "spline",
        points: [
          [rimHoleX, 0, rimHoleZ],
          [
            (rimHoleX + hubHoleX) * 0.5,
            hubHoleY * 0.3,
            (rimHoleZ + hubHoleZ) * 0.5
          ],
          [hubHoleX, hubHoleY, hubHoleZ]
        ]
      },
      profile: {
        kind: "circle",
        r: spokeRadius
      },
      segments: 16,
      meta: {
        side,
        crossPattern: cross,
        rimIndex: i,
        hubIndex: hubHoleIndex
      }
    };
    
    edges.push(spokeEdge);
  }
  
  return { nodes, edges };
}
```

### **6.4 Graph Construction Steps**

**5.3 Graph construction steps**

1. **Create rim circle nodes** (optional: you can use one rim node + edges to hole nodes)
2. **Create hub flange nodes:** left and right circles
3. **For each i:**
   - define rim hole node at angle θ_i = 2π i/N
   - define hub hole node at angle θ_j
   - connect with a spoke edge (spline path with slight curvature)

**You can optionally model spokes as straight lines (good enough), or add a 1-control-point spline to simulate real spoke bow.**

**[END:TAG:WHEEL]**

---

## 7. PLANTS/VEINS/BRANCHES

**[TAG:GROWTH] [TAG:PLANTS]**

### **7.1 Growth Operator (Branching)**

**6.1 Growth operator (branching)**

**A growth operator generates new nodes/edges iteratively:**

- start with trunk edge
- at certain t along the edge, spawn child edges with:
  - angle distribution
  - length falloff
  - radius falloff
  - noise

**That's it. The rest is sweep geometry + junction shells.**

**Operator output rules (must implement):**
- each step expands tips
- each tip spawns 1–branchFactor children
- edge path is spline with bend noise
- radius law is taper (fat at base)
- stop spawning when radius < minRadius

### **7.2 Veins**

**6.2 Veins**

**A leaf is:**
- midrib curve
- secondary veins as a curve array
- tertiary veins as a finer array

**All of those are just swept edges, possibly anchored to a leaf surface.**

**[END:TAG:GROWTH]**

---

## 8. SKELETONS

**[TAG:SKELETON] [TAG:BONES]**

### **8.1 Overview**

**7) Skeletons — bones are swept edges + joints are hardpoints**

**A bone is:**
- a centerline edge (spline)
- a radius law (thick at ends, thin mid)
- landmark bosses (feature nodes) at joint ends

**Joints are nodes with:**
- hinge axis / limits
- parent/child relationships
- optional physics constraints

**So the "skeleton graph" directly becomes a ragdoll-ready rig.**

### **8.2 Skeleton to Ragdoll Mapping**

```typescript
interface JointMetadata {
  kind: "ball" | "hinge" | "fixed";
  axis?: "X" | "Y" | "Z";
  minDeg?: number;
  maxDeg?: number;
  limitDeg?: number;
}

function skeletonToRagdoll(
  skeleton: GraphSpec
): RagdollRig {
  const bones: Bone[] = [];
  const joints: Joint[] = [];
  
  // Convert edges to bones
  for (const edge of skeleton.edges) {
    const bone: Bone = {
      id: edge.id,
      length: computeEdgeLength(edge),
      radius: getProfileRadius(edge.profile),
      nodeA: edge.a,
      nodeB: edge.b
    };
    bones.push(bone);
  }
  
  // Convert nodes with joint metadata to joints
  for (const node of skeleton.nodes) {
    if (node.role === "joint" && node.meta?.joint) {
      const jointMeta = node.meta.joint as JointMetadata;
      const joint: Joint = {
        id: node.id,
        position: node.frame!.pos,
        rotation: node.frame!.rot,
        kind: jointMeta.kind,
        axis: jointMeta.axis,
        limits: jointMeta.kind === "hinge" ? {
          min: jointMeta.minDeg! * Math.PI / 180,
          max: jointMeta.maxDeg! * Math.PI / 180
        } : undefined
      };
      joints.push(joint);
    }
  }
  
  return { bones, joints };
}
```

**[END:TAG:SKELETON]**

---

## 9. COMPILATION ORDER

**[TAG:COMPILATION] [TAG:PIPELINE]**

### **9.1 Safe Default Compile Order**

**8.1 Compile order (safe default)**

1. **Build SurfaceTemplate base meshes**
2. **Apply Surface FeatureGraph** (macro/edge/micro)
3. **Resolve GraphTemplate anchors** (surface → world frames)
4. **Expand operators** (radial arrays, growth, mirrors) into explicit nodes/edges
5. **Generate graph geometry:**
   - sweep each edge → tube mesh (or ribbon/strip)
   - build junction shells at nodes
6. **Apply Graph FeatureGraph** (creases, mounts, local warps on tubes if desired)
7. **Build outputs:**
   - LODs: reduce segments, drop micro edges, merge junctions
   - Colliders: capsules per edge, spheres per node
   - Hardpoints: node frames + selected surface anchors
8. **Export bundle**

### **9.2 Implementation**

```typescript
function compileGraphTemplate(
  graphSpec: GraphSpec,
  surfaceTemplate?: SurfaceTemplate,
  compiledSurfaceMesh?: THREE.Mesh
): {
  meshes: THREE.Mesh[];
  colliders: ColliderSet;
  hardpoints: HardpointSpec[];
} {
  // Step 1: Resolve surface anchors
  const resolvedNodes = graphSpec.nodes.map(node => {
    if (node.space === "SURFACE" && node.anchor && compiledSurfaceMesh) {
      const frame = resolveSurfaceAnchor(
        node.anchor,
        surfaceTemplate!,
        compiledSurfaceMesh
      );
      return {
        ...node,
        space: "LOCAL" as Space,
        frame
      };
    }
    return node;
  });
  
  // Step 2: Expand operators
  let expandedNodes = [...resolvedNodes];
  let expandedEdges = [...graphSpec.edges];
  
  if (graphSpec.operators) {
    for (const operator of graphSpec.operators) {
      const expansion = expandOperator(
        operator,
        { nodes: expandedNodes, edges: expandedEdges }
      );
      expandedNodes = [...expandedNodes, ...expansion.nodes];
      expandedEdges = [...expandedEdges, ...expansion.edges];
    }
  }
  
  // Step 3: Generate edge meshes (sweep)
  const edgeMeshes: THREE.Mesh[] = [];
  for (const edge of expandedEdges) {
    const edgeMesh = sweepEdge(edge, expandedNodes);
    edgeMeshes.push(edgeMesh);
  }
  
  // Step 4: Generate junction meshes
  const junctionMeshes: THREE.Mesh[] = [];
  if (graphSpec.junctions) {
    for (const junction of graphSpec.junctions) {
      const connectedEdges = expandedEdges.filter(
        e => e.a === junction.nodeId || e.b === junction.nodeId
      );
      const node = expandedNodes.find(n => n.id === junction.nodeId)!;
      
      const junctionMesh = buildJunction(junction, node, connectedEdges);
      junctionMeshes.push(junctionMesh);
    }
  }
  
  // Step 5: Build colliders
  const colliders = buildGraphColliders(expandedEdges, expandedNodes);
  
  // Step 6: Resolve hardpoints
  const hardpoints = resolveGraphHardpoints(graphSpec.hardpoints || [], expandedNodes);
  
  return {
    meshes: [...edgeMeshes, ...junctionMeshes],
    colliders,
    hardpoints
  };
}

function sweepEdge(edge: EdgeSpec, nodes: NodeSpec[]): THREE.Mesh {
  const nodeA = nodes.find(n => n.id === edge.a)!;
  const nodeB = nodes.find(n => n.id === edge.b)!;
  
  if (!nodeA.frame || !nodeB.frame) {
    throw new Error(`Nodes ${edge.a} or ${edge.b} missing frame`);
  }
  
  // Build path curve
  const pathCurve = buildPathCurve(edge.path, nodeA.frame, nodeB.frame);
  
  // Build profile curve
  const profileCurve = buildProfileCurve(edge.profile);
  
  // Apply radius law if present
  if (edge.radiusLaw) {
    profileCurve.applyRadiusLaw(edge.radiusLaw);
  }
  
  // Sweep along path
  const segments = edge.segments || 32;
  const geometry = sweepGeometry(pathCurve, profileCurve, segments);
  
  // Apply twist if present
  if (edge.twist) {
    geometry.applyTwist(edge.twist);
  }
  
  return new THREE.Mesh(geometry);
}
```

**[END:TAG:COMPILATION]**

---

## 10. LOD RULES FOR GRAPHS

**[TAG:LOD]**

### **10.1 Game-Perfect LOD Rules**

**8.2 LOD rules for graphs (game-perfect)**

**LOD0:** all edges, higher segments

**LOD1:** fewer segments, thinner edges clamped to minimum pixel thickness

**LOD2:** drop small branches/spokes OR replace with normal-mapped proxy mesh (optional)

**Collision: always capsule chains (super stable)**

**Implementation:**
```typescript
function buildGraphLOD(
  graphSpec: GraphSpec,
  lodLevel: 0 | 1 | 2
): GraphSpec {
  const lodSpec: GraphSpec = {
    ...graphSpec,
    edges: graphSpec.edges.map(edge => {
      if (lodLevel === 0) {
        return edge; // Full detail
      } else if (lodLevel === 1) {
        return {
          ...edge,
          segments: Math.max(8, (edge.segments || 32) / 2),
          profile: reduceProfileDetail(edge.profile, 0.8)
        };
      } else {
        // LOD2: Drop small edges
        const radius = getProfileRadius(edge.profile);
        if (radius < 0.002) {
          return null; // Drop this edge
        }
        return {
          ...edge,
          segments: Math.max(4, (edge.segments || 32) / 4),
          profile: reduceProfileDetail(edge.profile, 0.6)
        };
      }
    }).filter(e => e !== null) as EdgeSpec[],
    junctions: graphSpec.junctions?.filter(j => {
      if (lodLevel === 2) {
        // Drop small junctions
        return (j.radius || 0) >= 0.005;
      }
      return true;
    })
  };
  
  return lodSpec;
}
```

**[END:TAG:LOD]**

---

## 11. EDITOR UX

**[TAG:UX] [TAG:EDITOR]**

### **11.1 Minimal Tool Set**

**9) Editor UX (your SVG method, extended cleanly)**

**Add 3 tools—nothing more:**

1. **Draw Curve** → creates an edge (spline path)
2. **Radial Array** → select edge(s) + pick axis + count
3. **Node Role Tool** → click node → set role: hub/joint/mount

**Optional high power:**

- **"Snap to surface" toggle:** nodes become SURFACE anchors (uv stored)

### **11.2 Authoring Workflows**

**Now you can author:**

- **spokes** by drawing one spoke and radial-arraying it
- **ribs** by drawing one rib station and arraying along length
- **veins** by drawing one vein and distributing it with growth or array rules

**[END:TAG:UX]**

---

## 12. MINIMUM IMPLEMENTATION

**[TAG:IMPLEMENTATION] [TAG:MINIMUM]**

### **12.1 Shortest Path to "It Works"**

**10) The minimum implementation that unlocks everything**

**If you want the shortest path to "holy **** it works":**

**Implement only:**
1. GraphSpec (nodes/edges)
2. Sweep (circle profile)
3. RadialArray operator
4. Capsule colliders from edges
5. Node hardpoints

**First demo preset:**

**Wheel32_3Cross**
- hub + rim circles
- spoke mapping
- spokes as swept tubes
- hub shell junctions
- LOD downsampling

**Once that works, trees/ribs/bones are trivial presets.**

**[END:TAG:IMPLEMENTATION]**

---

## 13. CONCRETE PRESETS

**[TAG:PRESETS] [TAG:EXAMPLES]**

### **13.1 Wheel32_3Cross Preset**

**1.1 Wheel32_3Cross — preset JSON**

**File: assets/presets/graphs/Wheel32_3Cross_v1.json**

**Complete JSON:** (See modelmaker.txt lines 4368-4448 for full JSON)

**Key Points:**
- Uses WheelLacingOperator to generate spokes deterministically
- Hub/rim rings as closed arc edges
- HubShell junctions at hubs and rim
- Hardpoints for axle center

**Important: where the spokes actually come from**

**This preset is intentionally minimal because the real wheel intelligence belongs in a dedicated operator:**

**WheelLacingOperator(N, cross, rimRadius, hubRadius, flangeY, spokeRadius)**

**It generates:**
- rim_hole_i nodes at radius rimRadius
- hub_left_hole_j, hub_right_hole_j nodes at radius hubRadius
- spoke edges mapping i -> j = (i ± cross) mod N with group alternation

**Why: You don't want 64 nodes and 32 edges hardcoded; you want the operator to emit them.**

**So: implement operators.kind = "wheelLacing" as a first "domain operator". It's still graph-native.**

### **13.2 TreeGrowth Preset**

**1.2 TreeGrowth — preset JSON**

**File: assets/presets/graphs/TreeGrowth_v1.json**

**Complete JSON:** (See modelmaker.txt lines 4472-4502 for full JSON)

**Parameters:**
- steps: 8 (generations)
- branchFactor: 2 (children per tip)
- length0: 1.2, lengthFalloff: 0.72
- radius0: 0.08, radiusFalloff: 0.68
- splitAngleDeg: 32, yawNoiseDeg: 20, bendNoise: 0.15
- seed: 1337

### **13.3 SkeletonArm Preset**

**1.3 SkeletonArm — preset JSON**

**File: assets/presets/graphs/SkeletonArm_v1.json**

**Complete JSON:** (See modelmaker.txt lines 4521-4569 for full JSON)

**Key Features:**
- Joint nodes with metadata (ball/hinge, limits)
- Bone edges with spline paths and radius laws
- HubShell junctions at joints
- Hardpoints for ragdoll integration

**This can feed a ragdoll: joints are nodes; bones are swept edges.**

**[END:TAG:PRESETS]**

---

## 14. ARCHITECTURE STACK V1

**[TAG:ARCHITECTURE] [TAG:EXTENSION]**

### **14.1 Overview**

**Architecture Stack v1 — Templates + Schemas + "Small House with Full Internals" Preset**

**This is the exact universal way to do architecture (envelope + structure + MEP) using the same engine rules you're using for boats:**

- Envelope = SurfaceTemplate (shells + openings)
- Structure = GraphTemplate (studs/joists/trusses/columns)
- MEP = GraphTemplate (pipes/ducts/conduit) + constraints (clearance, slope, bend radius)
- Materials = Layer stacks (thickness + meaning), not just textures

**Everything below is designed so you can:**
- author via SVG plan/elevation
- compile deterministically into meshes + collision + metadata
- toggle layers in-editor
- generate internal framing + routing automatically
- still hand-edit with feature nodes where needed

### **14.2 Canonical Coordinate System**

**1) Canonical coordinate system (lock this globally)**

**Use this across every domain:**

- **+X = East / right on plan**
- **+Z = North / up on plan**
- **+Y = Up**

**So plan view is XZ, elevations are XY or ZY.**

### **14.3 Shared Schemas**

**2) Shared schemas you'll reuse everywhere**

#### **2.1 Material Stacks**

**2.1 Material stacks (walls/floors/roof as layered systems)**

```typescript
export type MaterialLayer = {
  id: string;
  kind: "render"|"structural"|"thermal"|"acoustic"|"fire"|"service";
  thicknessM: number;
  phys?: { density?: number; stiffness?: number; conductivity?: number };
  render?: { materialId: string; uvScale?: number };
};

export type MaterialStack = {
  id: string;
  layers: MaterialLayer[];
};
```

#### **2.2 Zones**

**2.2 Zones (spaces that drive MEP + structure)**

```typescript
export type Zone = {
  id: string;
  polygonXZ: [number,number][]; // closed loop in XZ
  floorY: number;
  height: number;
  usage: "living"|"kitchen"|"bath"|"bed"|"garage"|"utility";
  meta?: Record<string, any>;
};
```

#### **2.3 Openings**

**2.3 Openings (doors/windows) are first-class**

```typescript
export type Opening = {
  id: string;
  wallId: string;
  at: { t: number };         // param along wall segment chain [0..1]
  widthM: number;
  heightM: number;
  sillM?: number;            // for windows
  kind: "door"|"window";
  trim?: { jambM?: number; headM?: number };
};
```

### **14.4 Template v1 Specs**

**3) Template v1 specs**

#### **3.1 HouseTemplate v1 (Envelope)**

**3.1 HouseTemplate v1 (Envelope)**

**Purpose:** generate walls, floor slab, roof surfaces, openings cutouts, and regions for materials.

**Inputs:**
```typescript
export type HouseSpec = {
  id: string;
  units: "meter";
  origin: [number,number,number];

  stories: Array<{
    id: string;
    floorY: number;
    height: number;
    footprintXZ: [number,number][];
  }>;

  walls: Array<{
    id: string;
    storyId: string;
    polylineXZ: [number,number][];
    thicknessM: number;
    stackId: string; // MaterialStack
  }>;

  floors: Array<{
    id: string;
    storyId: string;
    thicknessM: number;
    stackId: string;
  }>;

  roof?: {
    kind: "gable"|"hip"|"flat";
    pitchDeg?: number;
    overhangM?: number;
    ridgeLineXZ?: [[number,number],[number,number]];
    stackId: string;
  };

  openings: Opening[];
  zones?: Zone[];
};
```

**Outputs:**
- EnvelopeMeshes: wall shells, floor slabs, roof shells
- EnvelopeRegions: named regions (exterior siding, drywall face, sheathing face)
- AnchorFrames: corners, wall midpoints, opening corners (for later routing/snaps)

**How it generates geometry (simple + robust):**
- Walls are extruded from polylines as thickened shells (not single planes)
- Openings are cut as parametric voids (no heavy booleans needed; do it during wall mesh build)
- Roof is generated as a parametric surface set (gable/hip) + thickness offset

#### **3.2 FrameTemplate v1 (Structure)**

**3.2 FrameTemplate v1 (Structure)**

**Purpose:** studs/plates/headers/joists/trusses/columns generated from the envelope + rules.

**Inputs:**
```typescript
export type FrameSpec = {
  id: string;
  storyId: string;

  stud: {
    spacingM: number;      // 0.4064 (16") default
    size: [number,number]; // [thickness, depth] e.g. [0.038, 0.089] (2x4 actual)
    stackId?: string;      // wood material
  };

  plates: {
    countTop: number;      // 2
    countBottom: number;   // 1
    size: [number,number];
  };

  headers: {
    overOpenings: boolean;
    minBearingM: number;   // e.g. 0.05
    sizeRule: "simpleSpanTable";
  };

  joists?: {
    spacingM: number;      // 0.4064
    size: [number,number]; // 2x8 etc
    direction: "X"|"Z";    // primary span
  };

  trusses?: {
    enabled: boolean;
    kind: "fink"|"howe"|"kingpost";
    spacingM: number;      // 0.6096 (24") typical
    webAngleMinDeg: number;
    chordSize: [number,number];
    webSize: [number,number];
  };

  columns?: Array<{ posXZ:[number,number]; size:[number,number] }>;
};
```

**Outputs (GraphSpec):**

**Everything structural is emitted as a GraphSpec:**
- studs = edges (swept rectangular or capsule proxies)
- plates = sweep along wall top/bottom
- headers/jacks/king studs = emitted around openings
- joists = array sweeps
- trusses = repeated planar graphs along the roof direction

**Why graph: it gives you:**
- collision proxies for free (capsules/boxes per edge)
- easy LOD (drop webs, simplify studs)
- metadata (member IDs, sizes, loads later)

#### **3.3 MEPTemplate v1 (Plumbing + Electrical + HVAC)**

**3.3 MEPTemplate v1 (Plumbing + Electrical + HVAC)**

**Purpose:** produce routed networks as graphs, with constraints.

**Inputs:**
```typescript
export type MepSpec = {
  id: string;
  storyId: string;

  serviceZones: Array<{
    id: string;
    kind: "plumbingWall"|"ceilingPlenum"|"mechanicalRoom";
    volume: { min:[number,number,number]; max:[number,number,number] };
  }>;

  plumbing: {
    supplyDiaM: number;     // 0.019 (3/4") trunk
    branchDiaM: number;     // 0.013 (1/2")
    drainDiaM: number;      // 0.075 (3")
    ventDiaM: number;       // 0.05 (2")
    minSlope: number;       // 0.02 (2%)
    bendRadiusM: number;    // 0.10
  };

  electrical: {
    conduitDiaM: number;    // 0.02
    bendRadiusM: number;    // 0.08
    circuitRules: "simpleResidential";
  };

  hvac: {
    trunkSizeM: [number,number];    // rectangular duct
    branchDiaM: number;             // round duct
    bendRadiusM: number;
    maxVelocityHint: number;
  };

  fixtures: Array<{
    id: string;
    kind: "sink"|"toilet"|"shower"|"washer"|"waterHeater"|"furnace"|"outlet"|"switch"|"register";
    zoneId?: string;
    anchor: { space:"LOCAL"; pos:[number,number,number] } | { space:"SURFACE"; wallId:string; t:number; y:number };
    meta?: Record<string, any>;
  }>;
};
```

**Outputs:**
- PlumbingGraphSpec
- ElectricalGraphSpec
- HvacGraphSpec
- MEPAnnotations: warnings for slope violations, clearance collisions, impossible bends

**Routing model (v1 deterministic, not fancy):**

**Use a grid router in service zones first:**
- for plumbing: prioritize plumbing walls + vertical chases
- for HVAC: prioritize ceiling plenums
- for electrical: along stud bays + ceiling paths

**Avoid "forbidden volumes":**
- beams, columns, and (optionally) studs/joists depending on realism level

**Enforce:**
- drain slope: ΔY / ΔL ≥ minSlope
- bend radius: path curvature limits

**This can be upgraded later to optimized pathfinding, but v1 already works.**

### **14.5 Constraints Pack v1**

**4) Constraints pack v1 (the "this can't be built" detector)**

**Implement as compile-time validators that attach warnings to nodes/edges.**

**Structural:**
- StudSpacingOK
- HeaderBearingOK(minBearingM)
- JoistSpanOK(spanTable)
- TrussWebAnglesOK(minDeg)

**MEP:**
- PipeSlopeOK(minSlope)
- BendRadiusOK(minRadius)
- ClearanceOK(minClearM, forbiddenVolumes)
- NoCrossingCriticalMembers (beams/columns)

### **14.6 "Small House with Full Internals" Preset**

**5) "Small House with Full Internals" — concrete preset**

**This is a single preset bundle that compiles:**
- envelope (walls/floor/roof)
- framing (studs/plates/joists + roof trusses)
- plumbing (supply + drain + vent)
- electrical (panel → outlets/switches)
- HVAC (furnace → trunk + branches)
- materials (layer stacks)

**Complete JSON specifications:** (See modelmaker.txt lines 5068-5228 for full JSON)

**Files:**
- `assets/presets/architecture/materials/Stacks_v1.json` - Material layer stacks
- `assets/presets/architecture/SmallHouse_Envelope_v1.json` - Envelope spec
- `assets/presets/architecture/SmallHouse_Frame_v1.json` - Framing spec
- `assets/presets/architecture/SmallHouse_MEP_v1.json` - MEP spec

### **14.7 Compilation Bundle Structure**

**6) How compilation should split into bundles (clean toggles)**

**Your compiler should emit one AssetBundle with layer manifests:**

```
bundle/envelope/*.glb
bundle/structure/*.glb
bundle/mep/plumbing.glb
bundle/mep/electrical.glb
bundle/mep/hvac.glb
bundle/collision/*.json
bundle/metadata/*.json
bundle/diagnostics/*.json
```

**[END:TAG:ARCHITECTURE]**

---

## 15. INTEGRATION POINTS

**[TAG:INTEGRATION]**

### **Integration with SurfaceTemplate**

**GraphTemplate integrates with SurfaceTemplate via:**
- Surface anchors (SURFACE space nodes)
- Anchor resolution after surface compilation
- FeatureGraph can edit both surfaces and graph geometry

### **Integration with FeatureGraph**

**GraphFeatures apply same operations to:**
- Edges (tubes): crease, bulge, local warp
- Junctions: smooth, add detail
- Nodes: add mounts, bosses

### **Integration with Compiler**

**GraphTemplate compilation happens:**
- After SurfaceTemplate compilation (for anchor resolution)
- Before final LOD generation
- Outputs: meshes, colliders, hardpoints (same structure as SurfaceTemplate)

**[END:TAG:INTEGRATION]**

---

## 16. FILE DEPENDENCY GRAPH

**[TAG:DEPS]**

```
GraphTemplate System
  │
  ├─→ modelmaker.txt (GraphTemplate spec)
  │   └─→ Lines 3958-4745: Core GraphTemplate
  │   └─→ Lines 4747-5248+: Architecture Stack extension
  │
  ├─→ SurfaceTemplate System
  │   └─→ Surface anchors for graph nodes
  │
  ├─→ FeatureGraph System
  │   └─→ GraphFeatures for edge/tube edits
  │
  ├─→ Compiler System
  │   └─→ Graph compilation pipeline
  │
  └─→ Presets
      ├─→ Wheel32_3Cross_v1.json
      ├─→ TreeGrowth_v1.json
      ├─→ SkeletonArm_v1.json
      └─→ Architecture presets
```

**[END:TAG:DEPS]**

---

## 17. RELATIONSHIP MATRIX

**[TAG:RELATIONS]**

### **System Relationships**

| System | Relationship | Data Flow |
|--------|-------------|-----------|
| SurfaceTemplate | Extends | Surface anchors for graph nodes |
| FeatureGraph | Uses | GraphFeatures for edge/tube edits |
| Compiler | Consumes | GraphSpec → meshes/colliders/hardpoints |
| Presets | Provides | Wheel/Tree/Skeleton/Architecture examples |

### **Domain Relationships**

| Domain | Template | Graph Use |
|--------|----------|-----------|
| Wheels | N/A | Spokes, hubs, rims |
| Trees | N/A | Branches, trunk |
| Skeletons | N/A | Bones, joints |
| Architecture | HouseTemplate | Framing, MEP, trusses |
| Aircraft | FuselageTemplate | Ribs, stringers |
| Vehicles | CarBodyTemplate | Frame, suspension |

**[END:TAG:RELATIONS]**

---

## 📝 WHAT GRAPHTEMPLATE "COMPLETES"

**After GraphTemplate, your system can:**

- Represent graph-based structures (wheels, trees, skeletons, architecture)
- Generate patterns via operators (radial arrays, growth, lattices)
- Create clean connections via junctions (caps, hub shells, blends)
- Anchor graph elements to surfaces (stable under LOD changes)
- Compile to game-ready assets (meshes, colliders, hardpoints)
- Extend to architecture (envelope + structure + MEP)

**This completes the universal parametric asset engine—surfaces AND structures.**

---

**Status:** PHASE 1 - Foundation System Mapping  
**Confidence:** 0.95 (Very High - Complete specification extracted from modelmaker.txt)  
**Next:** Implement GraphTemplate system based on this specification



---


---

<!-- AUTO-GENERATED FROM: MASTER_ARCHITECTURE_OPERATOR_ALGORITHMS_SYSTEM_MAP.md -->
<!-- DO NOT EDIT THIS SECTION DIRECTLY -->
<!-- Source File: MASTER_ARCHITECTURE_OPERATOR_ALGORITHMS_SYSTEM_MAP.md -->
<!-- File Size: 91852 bytes -->

<a id='architecture-operator-algorithms-system-map'></a>

# MASTER ARCHITECTURE OPERATOR ALGORITHMS SYSTEM MAP
**Complete System Anatomy Mapping - Architecture Operator Algorithms (Operator Algorithms v1 + Diagnostic Overlays)**

**Date:** 2025-01-27  
**Version:** 1.0.0  
**Purpose:** Complete S.A.M. documentation for Architecture Operator Algorithms System (modelmaker.txt Operator Algorithms v1 spec)  
**Status:** PHASE 1 - Foundation System Mapping  
**System:** Lucid Image Editor - Universal Parametric Asset Engine  
**Reference:** modelmaker.txt Operator Algorithms v1 spec (Lines 5319-7817+)

---

## 📋 TABLE OF CONTENTS

1. [System Overview](#1-system-overview)
2. [Core Helpers](#2-core-helpers)
3. [FrameWallOperator](#3-framewalloperator)
4. [FloorJoistOperator](#4-floorjoistoperator)
5. [RoofTrussOperator](#5-rooftrussoperator)
6. [MEPRouterOperator](#6-meprouteroperator)
7. [Diagnostic Overlays](#7-diagnostic-overlays)
8. [Operator Output Format](#8-operator-output-format)
9. [Overlay Rendering Plan](#9-overlay-rendering-plan)
10. [Patch Engine](#10-patch-engine)
11. [WheelLacingOperator](#11-wheellacingoperator)
12. [MEP Router A* Pathfinding](#12-mep-router-a-pathfinding)
13. [Universal Rib/Stringer Operator](#13-universal-ribstringer-operator)
14. [Collinear Path Simplification](#14-collinear-path-simplification)
15. [Network LOD](#15-network-lod)
16. [Integration Points](#16-integration-points)
17. [File Dependency Graph](#17-file-dependency-graph)
18. [Relationship Matrix](#18-relationship-matrix)

---

## 1. SYSTEM OVERVIEW

**[TAG:OVERVIEW] [TAG:ARCHITECTURE_OPERATORS]**

### **What is the Architecture Operator Algorithms System?**

**Deterministic operators that emit graph members + a diagnostics HUD that tells you why something is wrong and where.**

**Location:** Architecture defined in modelmaker.txt Operator Algorithms v1 spec (Lines 5319-7817+)  
**Purpose:** Provide instrumented construction layer with deterministic operators and diagnostic overlays  
**Core Principle:** Every operator emits deterministic GraphSpecs + Diagnostics that compiler renders into meshes/colliders/labels

### **Key Operators**

1. **FrameWallOperator** - Studs/plates/headers/openings (complete pseudocode implementation)
2. **FloorJoistOperator** - Joists + rim + beams (complete pseudocode implementation)
3. **RoofTrussOperator** - Fink/Howe/Kingpost (complete pseudocode implementation)
4. **MEPRouterOperator** - Plumbing slope + electrical + HVAC with clearance/bend rules
5. **WheelLacingOperator** - 32 spokes, any pattern, fully deterministic
6. **Rib/Stringer Operator** - Universal internal anatomy generator for hulls, wings, unibodies, steel frames, skeletons

### **What This System Provides**

**Deterministic construction operators:**
- Frame walls (studs, plates, headers, openings)
- Floor joists (joists, rim joists, beams)
- Roof trusses (Fink, Howe, Kingpost)
- MEP routing (plumbing, electrical, HVAC)
- Wheel lacing (32 spokes, any cross pattern)
- Rib/stringer systems (aircraft, hulls, skeletons)

**Diagnostic overlays:**
- Structural HUD (stud spacing, header bearing, joist span, truss angles)
- MEP HUD (pipe slope, clearance bubbles, bend radius markers, service zone occupancy)
- Buildability scores (structural, MEP, complexity)

**Universal foundation:**
- Same operators work for houses, towers, ships, vehicles, aircraft, skeletons
- Deterministic IDs enable stable selection, history, patches, LOD

**[END:TAG:OVERVIEW]**

---

## 2. CORE HELPERS

**[TAG:CORE_HELPERS] [TAG:DETERMINISTIC_IDS]**

### **Core Helper Functions**

**All operators rely on these fundamental helpers for deterministic ID generation, snapping, and polyline axis computation.**

### **2.1 Snap / Quantize**

```typescript
function q(x: number, step: number): number {
  return Math.round(x / step) * step;
}

function fmt(x: number, d = 4): string {
  return q(x, 0.0001).toFixed(d); // stable string (0.1mm precision)
}
```

**Purpose:** Ensure stable, reproducible floating-point values by quantizing to specified steps. Critical for deterministic ID generation.

**Usage:**
- `q(value, 0.001)` - Snap to 1mm precision
- `fmt(value, 4)` - Format with 4 decimal places (0.1mm precision)

### **2.2 Deterministic ID Builder**

```typescript
function id(...parts: (string | number)[]): string {
  // keep short but readable; you can hash if needed
  return parts.map(p => (typeof p === "number" ? fmt(p) : p)).join(":");
}
```

**Purpose:** Build stable IDs from components. All numeric components are formatted consistently.

**Example IDs:**
- `id("STUD", "story0", "wall_perimeter", "i", 5, "u", 2.438)` → `"STUD:story0:wall_perimeter:i:5:u:2.4380"`
- `id("N", wall.storyId, wall.wallId, "u", uS, "y", yBot)` → `"N:story0:wall_perimeter:u:2.4380:y:0.0000"`

**Critical Rule:** IDs must be deterministic and stable across rebuilds. Never use random values or timestamps in IDs.

### **2.3 2D Polyline Axis (XZ) → Arc-Length Parameterization**

**Core data structure for wall polyline parameterization:**

```typescript
type V2 = { x: number; z: number };

type Axis = {
  L: number;                    // Total arc-length
  segU: number[];               // Prefix lengths per segment start
  P: V2[];                      // Polyline points
  segLen: number[];             // Segment lengths
  // Mapping functions
  posAt: (u: number) => V2;     // Position at arc-length u
  tanAt: (u: number) => V2;     // Unit tangent at u
  // Utility
  uOfClosestPoint: (p: V2) => number;  // Arc-length of closest point on polyline
};
```

**Complete buildAxis Implementation:**

```typescript
function buildAxis(P: V2[]): Axis {
  const n = P.length - 1;
  const segLen: number[] = [];
  const segU: number[] = [0];
  let L = 0;

  // Compute segment lengths and cumulative prefix
  for (let i = 0; i < n; i++) {
    const dx = P[i+1].x - P[i].x;
    const dz = P[i+1].z - P[i].z;
    const len = Math.hypot(dx, dz);
    segLen.push(len);
    L += len;
    segU.push(L);
  }

  // Position at arc-length u
  function posAt(u: number): V2 {
    u = Math.max(0, Math.min(L, u));
    // Find segment by segU
    let i = 0;
    while (i < n-1 && segU[i+1] < u) i++;
    const u0 = segU[i];
    const t = (segLen[i] <= 1e-9) ? 0 : (u - u0) / segLen[i];
    return {
      x: P[i].x + (P[i+1].x - P[i].x) * t,
      z: P[i].z + (P[i+1].z - P[i].z) * t
    };
  }

  // Unit tangent at arc-length u
  function tanAt(u: number): V2 {
    u = Math.max(0, Math.min(L, u));
    let i = 0;
    while (i < n-1 && segU[i+1] < u) i++;
    const dx = P[i+1].x - P[i].x;
    const dz = P[i+1].z - P[i].z;
    const len = Math.hypot(dx, dz) || 1;
    return { x: dx/len, z: dz/len };
  }

  // Find arc-length of closest point on polyline
  function uOfClosestPoint(p: V2): number {
    // v1: brute over segments, project to each, take min distance
    let bestU = 0;
    let bestD2 = Infinity;
    for (let i = 0; i < n; i++) {
      const a = P[i], b = P[i+1];
      const abx = b.x - a.x, abz = b.z - a.z;
      const apx = p.x - a.x, apz = p.z - a.z;
      const ab2 = abx*abx + abz*abz;
      let t = ab2 < 1e-9 ? 0 : (apx*abx + apz*abz) / ab2;
      t = Math.max(0, Math.min(1, t));
      const cx = a.x + abx*t, cz = a.z + abz*t;
      const dx = p.x - cx, dz = p.z - cz;
      const d2 = dx*dx + dz*dz;
      if (d2 < bestD2) {
        bestD2 = d2;
        bestU = segU[i] + segLen[i]*t;
      }
    }
    return bestU;
  }

  return { L, segU, P, segLen, posAt, tanAt, uOfClosestPoint };
}
```

**Purpose:** Convert a 2D polyline into a 1D arc-length parameterized axis. This enables:
- Deterministic positioning along walls
- Opening placement by arc-length intervals
- Stable stud/plate positioning independent of polyline complexity

**Key Properties:**
- `L` = total arc-length (sum of all segment lengths)
- `segU[i]` = cumulative arc-length up to start of segment `i`
- `posAt(u)` = 3D position at arc-length `u` (clamped to [0, L])
- `tanAt(u)` = unit tangent vector at arc-length `u`
- `uOfClosestPoint(p)` = arc-length parameter of point on polyline closest to `p`

**[END:TAG:CORE_HELPERS]**

---
## 3. FRAMEWALLOPERATOR

**[TAG:FRAMEWALL_OPERATOR] [TAG:STRUCTURAL_OPERATORS]**

### **3.1 Conceptual Overview**

1) FrameWallOperator — studs, plates, headers, jacks, cripples
Inputs

Wall polyline in XZ: P0..Pk (closed or open)

Story: floorY, height

Wall thickness t

Stud spacing s (e.g. 0.4064)

Stud/plate sizes: [thickness, depth] (2x4 etc.)

Openings list with (tAlongWall, width, height, sill)

Optional “no-stud zones” (plumbing walls, large ducts, etc.)

Core output

Graph edges with rectangular sweep profile (or capsule proxy)

Metadata tags: stud, king, jack, header, sill, cripple, plate_top, plate_bot

1.1 Flatten the wall into a 1D coordinate: s_world

Convert the polyline into cumulative distances:

segLen[i] = ||P[i+1] - P[i]||

S[i] = sum_{j< i} segLen[j] (prefix)

total length L = S[last] + segLen[last]

Define a function:

posAt(u) where u ∈ [0, L] returns XZ position

tanAt(u) returns unit tangent along the polyline (piecewise)

This gives you a single parameter axis along the wall, which makes openings trivial.

1.2 Convert each opening into an interval on the wall axis

For an opening defined by “at t in [0..1]”:

u_center = t * L

u0 = u_center - width/2

u1 = u_center + width/2

Now add trimming margins (so studs don’t collide with jambs):

u0 -= studThickness/2

u1 += studThickness/2

Store blockedIntervals = [(u0,u1), ...]

1.3 Emit plates (fast sweep)

Bottom plate: from Y = floorY to floorY + plateDepth (or just sweep at base)

Top plates: at Y = floorY + height - plateDepth

Implementation: create edges that follow the wall polyline; your sweep profile is rectangle [studThickness × studDepth].

1.4 Emit regular studs

Stud candidates at:

u = uStart + n*s for n = 0..N

where uStart = 0 (or a shifted start to align corners if you want)

For each candidate u:

if u lies inside any blockedInterval, skip

else emit a stud at:

base point XZ = posAt(u)

orientation: local frame where +Y up, +X = tangent, +Z = wall normal

stud runs from Y=floorY to Y=floorY+height

Corner rules:

At each polyline corner, add a “corner pack” (2–3 studs) for strength and drywall nailing.

Simple deterministic rule: always add 2 studs at each corner, offset ±(studThickness) along the incoming/outgoing normals.

1.5 Emit opening framing (king/jack/header/sill/cripples)

For each opening interval (u0,u1):

Jamb studs

King studs at u0 and u1 full height

Jack studs at u0 + studThickness and u1 - studThickness from floorY to floorY + openingHeight + sill

Header

Header beam spans between the two king studs, at:

Y = floorY + sill + openingHeight

Header size can be rule-based:

v1: pick from a simple span table by width

Sill (windows)

If kind == window:

sill beam at Y = floorY + sill

span between jambs

Cripples

Above header: studs from header top to top plate at spacing s

Below sill: studs from bottom plate to sill at spacing s (windows only)

All of this is deterministic because it’s just emitting members in known intervals.

1.6 Plumbing wall bays (optional but huge)

If a wall segment intersects a serviceZone(plumbingWall):

emit “bay markers” (metadata) that tells the MEP router: “prefer running pipes here”

optionally skip one stud every N bays (or mark as “drillable”)



### **3.2 Complete Implementation (TypeScript Pseudocode)**

```
1) FrameWallOperator — deterministic emission with phase lock + corner locks + openings keep-outs
Input types (minimal)
type Opening = { id:string; t:number; width:number; height:number; sill?:number; kind:"door"|"window" };
type StudSpec = { spacing:number; w:number; d:number; plateTopCount:number; plateBottomCount:number; cornerPack:number };
type WallSpec = { wallId:string; storyId:string; polyline:V2[]; floorY:number; height:number; openings:Opening[] };
type ProtectInterval = { wallId:string; u0:number; u1:number; tag?:string };

type Graph = { nodes:any[]; edges:any[]; junctions:any[]; hardpoints:any[]; meta:any };

Emission algorithm (copy/paste logic)
function emitFrameWall(wall: WallSpec, stud: StudSpec, protect: ProtectInterval[]): Graph {
  const axis = buildAxis(wall.polyline);
  const mm = 0.001;

  // ---- phase lock (choose stable anchor)
  // v1: anchor = u=0; better: anchor = closest corner to building origin or fixed corner id.
  const uPhase = q(0, mm);

  // ---- reserve intervals
  const cornerLockHalf = 0.05;   // 5cm
  const keepOutMargin = 0.5*stud.w + 0.01; // stud half thickness + clearance

  const reserved: {u0:number;u1:number; reason:string; openingId?:string}[] = [];

  // corner lock windows
  // corners are at polyline vertices; compute their u positions
  for (let i=0;i<wall.polyline.length;i++){
    const uC = axis.uOfClosestPoint(wall.polyline[i]);
    reserved.push({ u0: uC - cornerLockHalf, u1: uC + cornerLockHalf, reason:"cornerLock" });
  }

  // opening keep-outs
  for (const op of wall.openings){
    const uCenter = op.t * axis.L;
    const u0 = uCenter - op.width/2 - keepOutMargin;
    const u1 = uCenter + op.width/2 + keepOutMargin;
    reserved.push({ u0, u1, reason:"openingKeepOut", openingId: op.id });
  }

  // protected intervals from patches (operator must respect)
  for (const pr of protect.filter(p => p.wallId === wall.wallId)){
    reserved.push({ u0: pr.u0, u1: pr.u1, reason:"protected" });
  }

  function inReserved(u:number): boolean {
    for (const r of reserved){
      if (u >= r.u0 && u <= r.u1) return true;
    }
    return false;
  }

  // ---- helpers to make node/edge ids stable
  function studNodeId(uS:number, y:number) {
    return id("N", wall.storyId, wall.wallId, "u"+fmt(uS), "y"+fmt(y));
  }
  function edgeId(kind:string, suffix:string) {
    return id(kind, wall.storyId, wall.wallId, suffix);
  }

  const G: Graph = { nodes:[], edges:[], junctions:[], hardpoints:[], meta:{ layer:"structure", generatedBy:"FrameWallOperator" } };

  // ---- plates along polyline segments (deterministic per segment)
  // emit as sweep-along-polyline edges; simplest v1: one edge per segment
  const yBot = wall.floorY;
  const yTop = wall.floorY + wall.height;

  for (let seg=0; seg<wall.polyline.length-1; seg++){
    const a2 = wall.polyline[seg], b2 = wall.polyline[seg+1];

    for (let k=0;k<stud.plateBottomCount;k++){
      const eid = edgeId("PLATEB", "seg"+seg+"_k"+k);
      G.edges.push({
        id: eid,
        a: id("N", wall.storyId, wall.wallId, "plateB", "seg"+seg, "a"),
        b: id("N", wall.storyId, wall.wallId, "plateB", "seg"+seg, "b"),
        path: { kind:"spline", points: [[a2.x,yBot,a2.z],[b2.x,yBot,b2.z]] },
        profile: { kind:"rect", w: stud.w, h: stud.d },
        segments: 1,
        meta: { system:"structure", memberType:"plate", subtype:"bottom", storyId:wall.storyId, wallId:wall.wallId, seg, k }
      });
    }

    for (let k=0;k<stud.plateTopCount;k++){
      const eid = edgeId("PLATET", "seg"+seg+"_k"+k);
      G.edges.push({
        id: eid,
        a: id("N", wall.storyId, wall.wallId, "plateT", "seg"+seg, "a", "k"+k),
        b: id("N", wall.storyId, wall.wallId, "plateT", "seg"+seg, "b", "k"+k),
        path: { kind:"spline", points: [[a2.x,yTop,a2.z],[b2.x,yTop,b2.z]] },
        profile: { kind:"rect", w: stud.w, h: stud.d },
        segments: 1,
        meta: { system:"structure", memberType:"plate", subtype:"top", storyId:wall.storyId, wallId:wall.wallId, seg, k }
      });
    }
  }

  // ---- corner packs (fixed offsets, independent of regular stud array)
  // v1: place corner studs at each vertex using local incoming/outgoing normals
  for (let c=0; c<wall.polyline.length-1; c++){
    // corner at point c (ignore last repeated if closed)
    const p = wall.polyline[c];
    const uC = axis.uOfClosestPoint(p);

    for (let n=0; n<stud.cornerPack; n++){
      const uOff = q(uC + (n * stud.w), mm); // simple deterministic offset along axis
      const pos = axis.posAt(uOff);

      const n0 = studNodeId(uOff, yBot);
      const n1 = studNodeId(uOff, yTop);
      G.nodes.push({ id:n0, space:"LOCAL", frame:{ pos:[pos.x,yBot,pos.z], rot:[0,0,0,1] }, role:"mount", meta:{ tag:"stud_base", corner:c }});
      G.nodes.push({ id:n1, space:"LOCAL", frame:{ pos:[pos.x,yTop,pos.z], rot:[0,0,0,1] }, role:"mount", meta:{ tag:"stud_top", corner:c }});

      const eid = edgeId("CORNERSTUD", "c"+c+"_n"+n+"_u"+fmt(uOff));
      G.edges.push({
        id: eid, a:n0, b:n1, path:{kind:"line"},
        profile:{kind:"rect", w:stud.w, h:stud.d}, segments:1,
        meta:{ system:"structure", memberType:"stud", subtype:"corner", storyId:wall.storyId, wallId:wall.wallId, corner:c, n, u:uOff }
      });
    }
  }

  // ---- regular studs (array by index i, phase-locked)
  const iMin = 0;
  const iMax = Math.floor((axis.L - uPhase)/stud.spacing);

  for (let i=iMin; i<=iMax; i++){
    const uS = q(uPhase + i*stud.spacing, mm);
    if (inReserved(uS)) continue;

    const pos = axis.posAt(uS);

    const n0 = studNodeId(uS, yBot);
    const n1 = studNodeId(uS, yTop);
    G.nodes.push({ id:n0, space:"LOCAL", frame:{ pos:[pos.x,yBot,pos.z], rot:[0,0,0,1] }, role:"mount", meta:{ tag:"stud_base", i, u:uS }});
    G.nodes.push({ id:n1, space:"LOCAL", frame:{ pos:[pos.x,yTop,pos.z], rot:[0,0,0,1] }, role:"mount", meta:{ tag:"stud_top", i, u:uS }});

    const eid = id("STUD", wall.storyId, wall.wallId, "i"+i, "u"+fmt(uS));
    G.edges.push({
      id:eid, a:n0, b:n1, path:{kind:"line"},
      profile:{kind:"rect", w:stud.w, h:stud.d}, segments:1,
      meta:{ system:"structure", memberType:"stud", subtype:"regular", storyId:wall.storyId, wallId:wall.wallId, i, u:uS }
    });
  }

  // ---- openings framing (king/jack/header/sill/cripples) with deterministic IDs
  for (const op of wall.openings){
    const uC = op.t * axis.L;
    const uL = q(uC - op.width/2, mm);
    const uR = q(uC + op.width/2, mm);

    // king studs full height
    emitOpeningStud(G, axis, wall, stud, op, uL, "kingL", yBot, yTop);
    emitOpeningStud(G, axis, wall, stud, op, uR, "kingR", yBot, yTop);

    // jack studs to header height
    const headY = yBot + (op.sill ?? 0) + op.height;
    emitOpeningStud(G, axis, wall, stud, op, q(uL + stud.w, mm), "jackL", yBot, headY);
    emitOpeningStud(G, axis, wall, stud, op, q(uR - stud.w, mm), "jackR", yBot, headY);

    // header beam
    const pL = axis.posAt(uL), pR = axis.posAt(uR);
    const hdrId = id("HDR", wall.storyId, wall.wallId, op.id);
    G.edges.push({
      id: hdrId,
      a: id("N", wall.storyId, wall.wallId, op.id, "hdrL"),
      b: id("N", wall.storyId, wall.wallId, op.id, "hdrR"),
      path: { kind:"spline", points: [[pL.x, headY, pL.z],[pR.x, headY, pR.z]] },
      profile: { kind:"rect", w: stud.w, h: stud.d }, segments: 1,
      meta: { system:"structure", memberType:"header", storyId:wall.storyId, wallId:wall.wallId, openingId:op.id }
    });

    // sill for windows
    if (op.kind === "window"){
      const sillY = yBot + (op.sill ?? 0);
      const sillId = id("SILL", wall.storyId, wall.wallId, op.id);
      G.edges.push({
        id: sillId,
        a: id("N", wall.storyId, wall.wallId, op.id, "sillL"),
        b: id("N", wall.storyId, wall.wallId, op.id, "sillR"),
        path: { kind:"spline", points: [[pL.x, sillY, pL.z],[pR.x, sillY, pR.z]] },
        profile: { kind:"rect", w: stud.w, h: stud.d }, segments: 1,
        meta: { system:"structure", memberType:"sill", storyId:wall.storyId, wallId:wall.wallId, openingId:op.id }
      });
    }

    // cripples (v1: optional; if you want deterministic, index them in local u)
    // Above header: studs from headY to yTop at spacing, skipping keep-outs.
  }

  return G;
}

function emitOpeningStud(G:Graph, axis:Axis, wall:WallSpec, stud:StudSpec, op:Opening,
                         uS:number, role:"kingL"|"kingR"|"jackL"|"jackR",
                         y0:number, y1:number) {
  const pos = axis.posAt(uS);
  const n0 = id("N", wall.storyId, wall.wallId, op.id, role, "y"+fmt(y0));
  const n1 = id("N", wall.storyId, wall.wallId, op.id, role, "y"+fmt(y1));
  G.nodes.push({ id:n0, space:"LOCAL", frame:{ pos:[pos.x,y0,pos.z], rot:[0,0,0,1] }, role:"mount", meta:{ openingId:op.id, role }});
  G.nodes.push({ id:n1, space:"LOCAL", frame:{ pos:[pos.x,y1,pos.z], rot:[0,0,0,1] }, role:"mount", meta:{ openingId:op.id, role }});

  const eid = id("STUD", wall.storyId, wall.wallId, op.id, role, "u"+fmt(uS));
  G.edges.push({
    id:eid, a:n0, b:n1, path:{kind:"line"},
    profile:{kind:"rect", w:stud.w, h:stud.d}, segments:1,
    meta:{ system:"structure", memberType:"stud", subtype:role.startsWith("king")?"king":"jack",
           storyId:wall.storyId, wallId:wall.wallId, openingId:op.id, u:uS }
  });
}


That operator produces stable studs even when the wall wiggles, because:

phase is locked

corners/openings reserve windows

corners and openings emit their own deterministic members

2) FloorJoistOperator — stable p-axis indexing + clipped segments

```

**Key Features:**
- Phase-locked stud positioning (stable IDs)
- Corner packs with deterministic offsets
- Opening framing (king/jack/header/sill/cripples)
- Protected interval support (for patches)
- Deterministic ID generation from wallId + u position

**[END:TAG:FRAMEWALL_OPERATOR]**

---

## 4. FLOORJOISTOPERATOR

**[TAG:FLOORJOIST_OPERATOR] [TAG:STRUCTURAL_OPERATORS]**

### **4.1 Conceptual Overview**

2) FloorJoistOperator — joists, rim joists, beams
Inputs

Footprint polygon XZ

FloorY

Joist spacing s

Direction axis X or Z

Joist size [thickness, depth]

Optional interior supports (bearing walls, columns, beams)

2.1 Generate joist lines across the footprint

If direction is X:

joists run along X, spaced along Z

Compute:

zMin,zMax from footprint bounds

for each z = zMin + n*s, create an infinite line at that Z

clip the line segment to polygon intersection → yields one or more segments

emit a joist edge for each segment at Y = floorY + subfloorHeight

If direction is Z, swap roles.

2.2 Rim joists

Emit members along the footprint perimeter at joist elevation:

sweep rectangle profile

tag rim_joist

2.3 Beam insertion (v1 simple span rule)

For each joist segment:

compute span = length(segment)

if span > spanLimit(joistSize, spacing):

insert a beam line at mid-span (or aligned to nearest column/support)

split joists into two segments that bear on the beam

You can implement spanLimit as a small lookup table for "typical" values (doesn't need to be perfect to be useful).

2.4 Joist hangers / bearing metadata

You don't need to model hangers in v1. Just tag joist ends:

bearing: wall_perimeter or bearing: beam_id

This becomes both diagnostics and future detail.

### **4.2 Complete Implementation (TypeScript Pseudocode)**

```typescript
2) FloorJoistOperator — stable p-axis indexing + clipped segments
type Polygon = V2[]; // closed
type JoistSpec = { spacing:number; w:number; d:number; direction:"X"|"Z"; floorId:string; storyId:string; floorY:number };
type Support = { kind:"beam"|"bearingWall"|"column"; line?:[V2,V2]; point?:V2; id:string };

function emitFloorJoists(footprint: Polygon, jo: JoistSpec, supports: Support[]): Graph {
  const mm = 0.001;
  const G: Graph = { nodes:[], edges:[], junctions:[], hardpoints:[], meta:{ layer:"structure", generatedBy:"FloorJoistOperator" } };

  // bounds
  const xs = footprint.map(p=>p.x), zs = footprint.map(p=>p.z);
  const xMin=Math.min(...xs), xMax=Math.max(...xs);
  const zMin=Math.min(...zs), zMax=Math.max(...zs);

  // phase lock (stable): snap to min bound
  const pMin = (jo.direction === "X") ? zMin : xMin;
  const pPhase = q(pMin, mm);

  // generate infinite lines spaced by jo.spacing, clip to polygon
  const count = Math.floor(((jo.direction === "X" ? zMax : xMax) - pPhase)/jo.spacing);

  for (let j=0; j<=count; j++){
    const pS = q(pPhase + j*jo.spacing, mm);
    // line definition:
    // if joists run along X, line is z=pS from xMin..xMax; else x=pS from zMin..zMax
    const segs = clipLineToPolygon(footprint, jo.direction, pS); // returns array of [A,B] in XZ

    for (let s=0; s<segs.length; s++){
      const A = segs[s][0], B = segs[s][1];
      const y = jo.floorY;

      const eid = id("JOIST", jo.storyId, jo.floorId, "j"+j, "p"+fmt(pS), "s"+s);
      G.edges.push({
        id:eid,
        a: id("N", jo.storyId, jo.floorId, "joist", "j"+j, "s"+s, "A"),
        b: id("N", jo.storyId, jo.floorId, "joist", "j"+j, "s"+s, "B"),
        path:{ kind:"spline", points: [[A.x,y,A.z],[B.x,y,B.z]] },
        profile:{ kind:"rect", w:jo.w, h:jo.d }, segments:1,
        meta:{ system:"structure", memberType:"joist", storyId:jo.storyId, floorId:jo.floorId, j, p:pS, seg:s }
      });
    }
  }

  // rim joist (per polygon edge)
  for (let i=0;i<footprint.length-1;i++){
    const A = footprint[i], B = footprint[i+1];
    const eid = id("RIM", jo.storyId, jo.floorId, "seg"+i);
    G.edges.push({
      id:eid,
      a: id("N", jo.storyId, jo.floorId, "rim", "seg"+i, "A"),
      b: id("N", jo.storyId, jo.floorId, "rim", "seg"+i, "B"),
      path:{ kind:"spline", points:[[A.x,jo.floorY,A.z],[B.x,jo.floorY,B.z]] },
      profile:{ kind:"rect", w:jo.w, h:jo.d }, segments:1,
      meta:{ system:"structure", memberType:"rim_joist", storyId:jo.storyId, floorId:jo.floorId, seg:i }
    });
  }

  // optional: beam insertion based on span table (left as hook)
  // detect over-span joists -> insert BEAM and split
  return G;
}

clipLineToPolygon() can be a standard polygon-line intersection routine (deterministic, no randomness).
```

**Key Features:**
- Stable p-axis indexing (phase-locked to min bound)
- Polygon clipping for irregular footprints
- Rim joist emission along perimeter
- Beam insertion hooks (span table integration)
- Deterministic ID generation from joist index + position

**[END:TAG:FLOORJOIST_OPERATOR]**

---

## 5. ROOFTRUSSOPERATOR

**[TAG:ROOFTRUSS_OPERATOR] [TAG:STRUCTURAL_OPERATORS]**

### **5.1 Conceptual Overview**

3) RoofTrussOperator — Fink / Howe / Kingpost
Inputs

Roof spec: ridge line, pitch, overhang

Truss spacing s

Truss kind: fink/howe/kingpost

Chord sizes and web sizes

Story roof base Y

3.1 Truss plane positions

Pick the truss planes perpendicular to ridge direction.

If ridge line is A..B:

ridgeDir = normalize(B-A)

truss planes spaced along the axis perpendicular to ridgeDir across the building width

easiest: for each "station" along the house length, place trusses at spacing s

3.2 Build a 2D truss graph in local plane coordinates

Work in 2D coordinates:

horizontal axis = truss span

vertical axis = rise (from pitch)

Let:

span = building width + 2*overhang

rise = tan(pitch) * (span/2)

Nodes:

left bearing (0,0)

right bearing (span,0)

ridge (span/2, rise)

Then kind-specific webs:

Kingpost

ridge -> mid-bottom

optionally diagonals

Fink

bottom chord nodes at 1/4, 1/2, 3/4

diagonals from quarters up to ridge and to midpoints

Howe

classic diagonal patterns reversed

Emit edges tagged chord_top, chord_bottom, web.

3.3 Transform 2D nodes into 3D

For each truss plane:

build a plane frame: origin on wall top plate, axes:

u = span direction

v = up

w = plane normal
Map 2D (x,y) → 3D = origin + ux + vy

Then sweep edges with wood profiles.

### **5.2 Complete Implementation (TypeScript Pseudocode)**

```typescript
3) RoofTrussOperator — deterministic stationing + 2D template edges -> 3D
type RoofSpec = { roofId:string; storyId:string; baseY:number; ridge:[V2,V2]; pitchDeg:number; overhang:number; kind:"fink"|"howe"|"kingpost" };
type TrussSpec = { spacing:number; chord:{w:number;d:number}; web:{w:number;d:number}; minWebAngleDeg:number };

function emitRoofTrusses(buildingSpan:number, buildingLength:number, roof:RoofSpec, tr:TrussSpec): Graph {
  const mm=0.001;
  const G: Graph = { nodes:[], edges:[], junctions:[], hardpoints:[], meta:{ layer:"structure", generatedBy:"RoofTrussOperator" } };

  // station axis: along ridge direction projected; v1: use building X length (or Z)
  const tMin = 0;
  const tPhase = q(tMin, mm);
  const count = Math.floor((buildingLength - tPhase)/tr.spacing);

  // 2D truss template (in local plane coords)
  const span = buildingSpan + 2*roof.overhang;
  const rise = Math.tan(roof.pitchDeg*Math.PI/180) * (span/2);

  const T2 = makeTruss2D(roof.kind, span, rise); // returns nodes2d + edges2d with memberType tags

  for (let s=0; s<=count; s++){
    const tS = q(tPhase + s*tr.spacing, mm);
    const trussId = id("TRUSS", roof.storyId, roof.roofId, "s"+s, "t"+fmt(tS));

    // build a plane frame at station tS
    const frame = trussPlaneFrame(roof, tS); // origin (x,y,z) + axes u,v,w

    // emit edges
    for (let e=0; e<T2.edges.length; e++){
      const E = T2.edges[e];
      const A2 = T2.nodes[E.a], B2 = T2.nodes[E.b];

      const A3 = planeMap(frame, A2.x, A2.y, roof.baseY);
      const B3 = planeMap(frame, B2.x, B2.y, roof.baseY);

      const prof = (E.tag === "web") ? { kind:"rect", w:tr.web.w, h:tr.web.d } : { kind:"rect", w:tr.chord.w, h:tr.chord.d };

      const eid = id("TRM", trussId, E.tag, "e"+e);
      G.edges.push({
        id:eid,
        a: id("N", trussId, "A", "e"+e),
        b: id("N", trussId, "B", "e"+e),
        path:{ kind:"spline", points:[A3,B3] },
        profile: prof, segments:1,
        meta:{ system:"structure", memberType: E.tag === "web" ? "truss_web" : "truss_chord", trussId, station:tS, kind:roof.kind }
      });
    }
  }
  return G;
}

makeTruss2D() is deterministic and tiny: return a list of 2D nodes and edge indices for the chosen topology.
```

**Key Features:**
- 2D template-based truss generation (Fink/Howe/Kingpost)
- Deterministic stationing along ridge direction
- 2D→3D plane frame transformation
- Chord and web member emission with appropriate profiles
- Deterministic ID generation from station index

**[END:TAG:ROOFTRUSS_OPERATOR]**

---

## 6. MEPROUTEROPERATOR

**[TAG:MEP_ROUTER_OPERATOR] [TAG:MEP_OPERATORS]**

### **6.1 Conceptual Overview**

4) MEPRouterOperator — plumbing slope, electrical circuits, HVAC ducts

The key is to route in service space, not arbitrary 3D.

Inputs

Fixtures with anchors

Service zones volumes (plumbing walls, ceiling plenums, mech room)

Forbidden volumes (beams, columns; optionally studs/joists)

Rules:

bend radius

min clearance

slope for drains

trunk vs branch sizes

Outputs

plumbingGraph, electricalGraph, hvacGraph

diagnostics warnings (slope violations, collisions, too-tight bends)

4.1 Build a routing grid (coarse but deterministic)

Choose a cell size (v1):

cell = 0.10m (10cm) for MEP

Make a sparse grid only inside service zones:

each cell has center point p

mark cell "walkable" if:

inside service zone volume

not inside forbidden volumes expanded by clearance radius

Store adjacency 6-neighbor (axis-aligned) or 18-neighbor.

4.2 Pathfinding core (A* with domain-specific cost)

Use A*:

g(n) = accumulated cost

h(n) = heuristic (Euclidean distance)

Add penalties:

turning penalty (encourages straight runs)

vertical penalty (for electrical/HVAC minimal, for plumbing drains slope-aware)

forbidden adjacency penalty (stay away from beams)

4.3 Plumbing: supply + drain + vent
Supply

trunk from water heater to "distribution spine" inside plumbing wall

branches to sink/toilet/shower

Routing rule:

prefer plumbing walls: lower cost inside plumbingWall

allow ceiling plenum if needed (higher cost)

Drain (the special case)

Drain must satisfy:

ΔY / length >= minSlope in the flow direction

Deterministic approach:

choose a main "stack" location in plumbing wall (vertical)

route each fixture drain to stack with A* but only allow moves that don't violate slope:

treat each step of length d:

horizontal move must be accompanied by ΔY <= -minSlope*d over the run

easiest: do it in two phases:

choose a path in XZ to stack

assign Y along that path as a descending ramp with slope

validate collisions and re-route if needed

This works shockingly well.

Vent

Vent lines can go upward with low restriction (they're allowed to rise), but must:

connect above trap arms

route to roof penetration within a service zone

4.4 Electrical

create a "panel node"

route circuits from panel to outlets/switches

allow in stud bays + ceiling plenum

V1 circuit rule:

group outlets by zone, chain them in nearest-neighbor order

route a trunk path then branch short drops to each box

Hardpoints:

outlet boxes are nodes with metadata (height, face orientation)

4.5 HVAC

furnace node → trunk (rect duct) in ceiling plenum

branches (round ducts) to registers

Routing:

prefer ceiling plenum cells

penalize tight bends (bend radius)

keep trunk straighter (higher turn penalty)

### **6.2 Skeleton Implementation**

```typescript
6.2 MEPRouterOperator skeleton
function routeMEP(serviceZones, forbiddenVolumes, fixtures, rules) {
  const grid = buildSparseGrid(serviceZones, forbiddenVolumes, rules.clearance);

  const plumbing = routePlumbing(grid, fixtures, rules.plumbing);
  const electrical = routeElectrical(grid, fixtures, rules.electrical);
  const hvac = routeHVAC(grid, fixtures, rules.hvac);

  const diagnostics = validateMEP({plumbing,electrical,hvac}, forbiddenVolumes, rules);

  return {plumbing,electrical,hvac,diagnostics};
}
```

**Key Features:**
- Sparse grid routing (service zones only)
- Domain-specific A* pathfinding (plumbing slope, electrical/HVAC preferences)
- Three-phase routing: supply/drain/vent (plumbing), circuits (electrical), trunk/branches (HVAC)
- Diagnostic validation (slope violations, collisions, bend radius)
- Deterministic routing with service zone preferences

**Note:** Complete A* implementation with bend radius and slope enforcement is detailed in Section 12 (MEP Router A* Pathfinding).

**[END:TAG:MEP_ROUTER_OPERATOR]**

---

## 7. DIAGNOSTIC OVERLAYS

**[TAG:DIAGNOSTIC_OVERLAYS] [TAG:VISUALIZATION]**

### **7.1 Overview**

5) Diagnostic Overlays (this is what makes it feel "perfect")

You want the same feeling you described for the Laser hull tuning: you see the error field.

### **7.2 Structural HUD**

5.1 Structural HUD

Stud spacing overlay

color segments of wall where stud spacing > spec or studs missing near corners/openings

Header bearing overlay

show red brackets at header ends if bearing length < minBearing

Joist span overlay

show heatmap by span ratio: span / allowableSpan

show recommended beam line candidate if too high

Truss angle overlay

show web edges colored by angle; warnings if < minDeg

Section slice

drag a cut plane; structure and MEP remain visible; envelope becomes translucent

### **7.3 MEP HUD**

5.2 MEP HUD

Pipe slope arrows

along drain lines, draw arrows with % slope

red if below minSlope

Clearance bubbles

any collision/near-collision shows an inflated capsule around the segment that violates clearance

Bend radius markers

show curvature radius at elbows; red if too tight

Service zone occupancy

show "traffic density" heatmap in plumbing wall and ceiling plenum so you see congestion

### **7.4 Buildability Score**

5.3 "Buildability score"

Per layer compute:

StructuralScore (0–1): span OK, spacing OK, bearings OK

MEPScore (0–1): slope OK, clearance OK, bend OK

ComplexityScore (0–1): number of members vs LOD budget

Then show:

score gauges

top 10 violations list, clickable to focus camera

That's how you keep the system sane at scale.

**Key Features:**
- Real-time visual feedback on structural violations
- MEP routing quality indicators (slope, clearance, bends)
- Buildability scoring system (structural, MEP, complexity)
- Interactive violation list with camera focus
- Section cut visualization for internal inspection

**[END:TAG:DIAGNOSTIC_OVERLAYS]**

---

## 8. OPERATOR OUTPUT FORMAT

**[TAG:OPERATOR_OUTPUT] [TAG:GRAPHSPEC]**

### **8.1 Overview**

1) Operator Output Format v1 (what gets emitted, exactly)

Your operators should not output triangles. They output canonical GraphSpecs + Diagnostics that your compiler renders into meshes/colliders/labels.

### **8.2 Canonical Bundle Layout**

1.1 Canonical bundle layout (per "build")
/bundle
  /envelope
    envelope.glb
    anchors.json
  /structure
    frame.graph.json
    frame.glb
    frame.colliders.json
  /mep
    plumbing.graph.json
    plumbing.glb
    electrical.graph.json
    electrical.glb
    hvac.graph.json
    hvac.glb
  /diagnostics
    diagnostics.json

### **8.3 GraphSpec JSON Format**

2) GraphSpec emission conventions (structure + MEP share this)
2.1 GraphSpec JSON (final emitted form)

This is the post-operator graph: no "operators" field anymore; everything is explicit nodes/edges/junctions/hardpoints.

```json
{
  "id": "frame_story0_v1",
  "space": "LOCAL",
  "units": "meter",

  "nodes": [
    {
      "id": "N_wall_perimeter_u12.192_y0.000",
      "space": "LOCAL",
      "frame": { "pos": [2.10, 0.00, 0.14], "rot": [0,0,0,1] },
      "role": "mount",
      "meta": { "wallId": "wall_perimeter", "u": 12.192, "tag": "stud_base" }
    }
  ],

  "edges": [
    {
      "id": "E_stud_wall_perimeter_u12.192",
      "a": "N_wall_perimeter_u12.192_y0.000",
      "b": "N_wall_perimeter_u12.192_y2.600",

      "path": { "kind": "line" },

      "profile": { "kind": "rect", "w": 0.038, "h": 0.089 },
      "radiusLaw": { "kind": "constant", "params": { "scale": 1.0 } },

      "segments": 1,

      "meta": {
        "system": "structure",
        "memberType": "stud",
        "subtype": "regular",
        "wallId": "wall_perimeter",
        "storyId": "story0",
        "materialStackId": "wood_framing",
        "bearing": ["plate_bottom", "plate_top"],
        "size": { "w": 0.038, "d": 0.089 },
        "u": 12.192
      }
    }
  ],

  "junctions": [
    {
      "id": "J_cap_E_stud_wall_perimeter_u12.192_a",
      "nodeId": "N_wall_perimeter_u12.192_y0.000",
      "kind": "cap",
      "radius": 0.004,
      "smooth": 0.0,
      "meta": { "edgeId": "E_stud_wall_perimeter_u12.192", "end": "a" }
    }
  ],

  "hardpoints": [
    {
      "id": "HP_outlet_living_1",
      "attach": "asset",
      "def": { "mode": "FRAME", "frame": { "pos": [1.8, 0.35, 0.05], "rot": [0,0,0,1] } },
      "meta": { "system": "electrical", "kind": "outlet", "zoneId": "living" }
    }
  ],

  "meta": {
    "buildId": "SmallHouse_v1",
    "layer": "structure",
    "generatedBy": "FrameWallOperator",
    "timestamp": "2026-01-01"
  }
}
```

2.2 Add one new profile kind: rect

For architecture, you will want rectangular members:

"profile": { "kind": "rect", "w": 0.038, "h": 0.089 }

(You can still render as a box mesh, or approximate as a capsule for collision.)

### **8.4 Specific Emission Rules Per Operator**

3) Specific emission rules per operator
3.1 FrameWallOperator output rules
Nodes

Emit nodes for:

stud base/top points

plate endpoints (polyline corners)

opening corners (for diagnostics + snapping)

Naming convention:

N_{wallId}_u{u}_y{y}

N_{openingId}_left/right_{y} etc.

Edges

Emit edges for:

plate_bottom, plate_top_1, plate_top_2

stud_regular, stud_corner, stud_king, stud_jack, stud_cripple

header, sill

Metadata schema (minimum):

"meta": {
  "system": "structure",
  "memberType": "stud|plate|header|sill|joist|beam|truss_chord|truss_web",
  "subtype": "regular|corner|king|jack|cripple|top|bottom",
  "storyId": "story0",
  "wallId": "wall_perimeter",
  "openingId": "win_living",
  "u": 12.192,
  "size": { "w": 0.038, "d": 0.089 },
  "materialStackId": "wood_framing"
}

3.2 FloorJoistOperator output rules

Emit:

joists as edges (memberType: joist)

rim joists as edges (memberType: rim_joist)

beams if inserted (memberType: beam)

optional columns as short vertical edges (memberType: column)

Also emit "bearing tags":

"meta": { "bearing": ["wall_perimeter", "beam_beam0"] }

3.3 RoofTrussOperator output rules

Emit each truss as its own subgraph chunk or tagged members:

chords: memberType: truss_chord, subtype top|bottom

webs: memberType: truss_web

Include plane/station metadata:

"meta": { "trussId":"T_07", "station": 4.267, "kind":"fink" }

3.4 MEP Router output rules (plumbing/electrical/HVAC)

Everything is just "pipes/ducts/conduit edges".

Plumbing edges
"meta": {
  "system": "plumbing",
  "memberType": "pipe",
  "subtype": "supply|drain|vent",
  "diaM": 0.075,
  "slope": 0.021,
  "fixtureFrom": "toilet_bath",
  "fixtureTo": "stack_main",
  "serviceZoneId": "plumbing_wall_bath"
}

Electrical edges
"meta": {
  "system": "electrical",
  "memberType": "conduit",
  "diaM": 0.020,
  "circuitId": "C_living_01",
  "from": "panel",
  "to": "out_liv1"
}

HVAC edges

Use either:

rectangular trunk (profile rect)

round branches (profile circle)

"meta": {
  "system": "hvac",
  "memberType": "duct",
  "subtype": "trunk|branch",
  "size": { "w": 0.25, "h": 0.15 },
  "to": "reg_liv"
}

### **8.5 Diagnostics JSON Format**

4) Diagnostics JSON (single unified format)

This is the other half of the system. It must be clickable, filterable, and renderable as overlays.

4.1 Diagnostics schema

```json
{
  "buildId": "SmallHouse_v1",
  "items": [
    {
      "id": "D_STUD_SPACING_wall_perimeter_seg2_u13.820",
      "severity": "warn",
      "category": "structure",
      "code": "STUD_SPACING",
      "message": "Stud spacing 0.61m exceeds spec 0.406m.",
      "refs": {
        "graphId": "frame_story0_v1",
        "edgeIds": ["E_stud_wall_perimeter_u13.412", "E_stud_wall_perimeter_u14.022"],
        "nodeIds": []
      },
      "measure": { "value": 0.61, "limit": 0.4064, "unit": "m" },
      "world": {
        "focus": { "pos": [4.2, 1.2, 0.1], "radius": 0.8 },
        "segments": [[[4.0,1.2,0.1],[4.6,1.2,0.1]]],
        "glyphs": [{ "kind":"arrow", "pos":[4.3,1.2,0.1], "dir":[1,0,0] }]
      }
    },

    {
      "id": "D_PIPE_SLOPE_toilet_bath",
      "severity": "error",
      "category": "plumbing",
      "code": "PIPE_SLOPE",
      "message": "Drain slope 1.1% is below minimum 2.0%.",
      "refs": { "graphId": "plumbing_story0_v1", "edgeIds": ["E_drain_toilet_stack_0"] },
      "measure": { "value": 0.011, "limit": 0.02, "unit": "ratio" },
      "world": {
        "focus": { "pos": [8.5, 0.6, 4.6], "radius": 1.2 },
        "polyline": [[8.9,0.4,4.7],[8.6,0.35,4.4],[8.2,0.31,4.0]],
        "labels": [{ "text":"1.1% (min 2.0%)", "pos":[8.6,0.55,4.4] }]
      }
    }
  ],

  "summary": {
    "scores": { "structure": 0.92, "mep": 0.85, "complexity": 0.78 },
    "counts": { "error": 2, "warn": 5, "info": 12 }
  }
}
```

Key idea: every diagnostic includes:

refs (graph IDs, edge IDs)

world render hints (segments/polylines/focus sphere/labels)

So the HUD can render it without re-deriving geometry.

**Key Features:**
- Canonical bundle structure (envelope/structure/MEP/diagnostics)
- GraphSpec JSON format (nodes/edges/junctions/hardpoints)
- Rectangular profile support for architectural members
- Operator-specific metadata schemas
- Unified diagnostics JSON with render hints
- Clickable violation list with camera focus

**[END:TAG:OPERATOR_OUTPUT]**

---

## 9. OVERLAY RENDERING PLAN

**[TAG:OVERLAY_RENDERING] [TAG:THREEJS] [TAG:R3F]**

### **9.1 Overview**

5) Overlay Rendering Plan in Three.js / R3F (cheap, scalable)

You want overlays that can handle:

thousands of studs/joists

hundreds of pipes/ducts

lots of labels

GPU picking

section cuts

### **9.2 Layer Toggles (Scene Graph Groups)**

5.1 Layer toggles (scene graph groups)

Create groups:

G_envelope

G_structure

G_plumbing

G_electrical

G_hvac

G_overlays

Each has visible toggles and renderOrder rules:

overlays always last + depthTest off (or partial)

### **9.3 Overlay Primitives**

5.2 Overlay primitives (only 4)

Instanced line segments (for spacing brackets, slope arrows, truss angle lines)

Instanced sprites (for icons: warning triangles, outlet symbols, arrows)

Billboard text (small; for numeric labels; only show on hover/selected)

Heatmap quad(s) (for wall span maps, congestion maps)

Implementation choices

For lines: use LineSegments with a dynamic BufferGeometry OR an instanced cylinder for thickness.

For sprites: THREE.SpriteMaterial or instanced quads (better control).

### **9.4 GPU Picking**

5.3 GPU picking (fast and reliable)

Do a secondary "ID render pass" only for overlays + graph members:

Render to a small offscreen WebGLRenderTarget

Each pickable object writes a unique color = ID

On click/hover, read pixel → decode ID → select diagnostic/member

What gets IDs:

edges (studs, pipes, ducts)

diagnostic glyphs (warning icons)

hardpoints

This avoids raycasting thousands of tiny members.

### **9.5 Heatmaps**

5.4 Heatmaps (stud/joist span + MEP congestion)

Two methods, pick one:

Method A (simple): colored translucent planes

For each wall segment, create a thin plane in front of the wall (offset outward)

Vertex colors encode "risk"

Update colors when constraints change

Method B (best): render-to-texture field

Build a low-res grid in wall-local UV

Compute value per cell (e.g., stud spacing violation, congestion)

Upload as a texture; draw as a quad with that texture

This is perfect for "plenum congestion" and "service zone occupancy".

### **9.6 Section Cuts**

5.5 Section cuts (the essential architecture tool)

Use clipping planes:

a movable plane P (normal + constant)

apply renderer.localClippingEnabled = true

set material.clippingPlanes = [P] for envelope/structure/MEP

optionally invert for "only show one side"

To make it feel like CAD:

show the cut plane as a translucent rectangle

show a bold outline where geometry intersects the plane:

simplest v1: draw plane + rely on clipped faces

nicer v2: stencil outline pass

### **9.7 Violation List → Focus Camera**

5.6 "Violation list → focus camera" behavior

When selecting diagnostic:

read world.focus.pos and radius

tween camera to a position offset from pos along current view direction

set orbit target to pos

temporarily highlight referenced edges:

change their overlay color or add glow outline (cheap: draw a second line on top)

### **9.8 Rendering Architecture Members Efficiently**

6) Rendering architecture members (structure/MEP) efficiently

Even if you eventually export glTF, your editor runtime wants speed:

6.1 Graph edge rendering options

Option 1: Instanced boxes for rectangular members (studs, joists)

each edge becomes one instance with matrix = edge frame and scale = length

Option 2: Swept mesh (nice visuals) generated once per rebuild

Collision stays separate (capsules/boxes), never dependent on render mesh

Recommended:

Instanced boxes for structure v1 (fast)

Swept tubes for MEP v1 (pipes look better)

### **9.9 Exact Emitted Objects Per Layer**

7) "Exact emitted objects" per layer (so you can build UI around it)
Structure graph members (memberType)

studs: regular/corner/king/jack/cripple

plates: top/bottom

header, sill

joist, rim_joist, beam, column

truss_chord top/bottom, truss_web

MEP graph members

pipe supply/drain/vent

conduit / cabletray

duct trunk/branch

Everything else is metadata + hardpoints.

### **9.10 Deterministic ID Rule**

8) The one rule that keeps the whole system sane

Every operator must emit deterministic IDs.

If IDs change randomly between rebuilds, your:

selection

history

per-member overrides

saved edits
all break.

So IDs must be derived from:

wallId + u position

openingId + side + role

joist index

truss station index

fixture pair routing IDs

**Key Features:**
- Layer-based scene graph organization
- Four overlay primitives (lines, sprites, text, heatmaps)
- GPU picking for performance (avoids raycasting)
- Render-to-texture heatmaps for congestion visualization
- Section cut support with clipping planes
- Interactive violation list with camera focus
- Instanced rendering for performance (boxes/tubes)
- Deterministic ID requirement for stability

**[END:TAG:OVERLAY_RENDERING]**

---

## 10. PATCH ENGINE

**[TAG:PATCH_ENGINE] [TAG:DETERMINISTIC_DELTAS]**

### **10.1 Overview**

4) Patch Engine — deterministic deltas, orphan resolution, protected intervals

The Patch Engine enables safe, deterministic modifications to generated graphs. Patches are applied in a fixed order with orphan resolution and protected interval support.

### **10.2 Patch Operations**

4.1 Patch ops

```typescript
type PatchOp =
  | { op:"DELETE_EDGE"; edgeId:string }
  | { op:"DELETE_NODE"; nodeId:string }
  | { op:"ADD_NODE"; node:any }
  | { op:"ADD_EDGE"; edge:any }
  | { op:"MOD_NODE"; nodeId:string; partial:any }
  | { op:"MOD_EDGE"; edgeId:string; partial:any }
  | { op:"PROTECT_INTERVAL"; wallId:string; u0:number; u1:number; tag?:string };

type Patch = { patchId:string; appliesTo:{ buildId:string; graphId:string }; ops: PatchOp[] };
```

### **10.3 Apply Sequence**

4.2 Apply sequence (always the same order)

collect PROTECT_INTERVAL (feeds operators next rebuild)

apply deletes

apply adds

apply modifications

validate + generate diagnostics, including PATCH_ORPHANED

### **10.4 Complete Implementation**

```typescript
type PatchResult = { graph:Graph; protectedIntervals:ProtectInterval[]; orphaned:string[] };

function applyPatch(base: Graph, patch: Patch): PatchResult {
  const graph = deepClone(base);

  const protectedIntervals: ProtectInterval[] = [];
  const orphaned: string[] = [];

  // index maps
  const edgeById = new Map<string, any>();
  const nodeById = new Map<string, any>();
  for (const n of graph.nodes) nodeById.set(n.id, n);
  for (const e of graph.edges) edgeById.set(e.id, e);

  // 1) protect intervals (stored separately; operator reads this next regen)
  for (const op of patch.ops){
    if (op.op === "PROTECT_INTERVAL"){
      protectedIntervals.push({ wallId: op.wallId, u0: op.u0, u1: op.u1, tag: op.tag });
    }
  }

  // helper: orphan resolution for missing edges (wallId + memberType + u within eps)
  function resolveEdgeId(maybeId: string): string | null {
    if (edgeById.has(maybeId)) return maybeId;

    // v1 heuristic: parse "wallId" and "u" from id strings if present
    // If you store meta.wallId and meta.u consistently, this becomes robust.
    const parsed = parseWallAndU(maybeId); // returns {wallId, u} or null
    if (!parsed) return null;

    const eps = 0.25 * (guessSpacingFromEdgeId(maybeId) ?? 0.4064);

    let best: {id:string; d:number} | null = null;
    for (const [eid,e] of edgeById){
      if (e?.meta?.wallId !== parsed.wallId) continue;
      if (typeof e?.meta?.u !== "number") continue;
      const d = Math.abs(e.meta.u - parsed.u);
      if (d <= eps && (!best || d < best.d)) best = { id:eid, d };
    }
    return best ? best.id : null;
  }

  // 2) deletes
  for (const op of patch.ops){
    if (op.op === "DELETE_EDGE"){
      const eid = resolveEdgeId(op.edgeId);
      if (!eid){ orphaned.push(op.edgeId); continue; }
      edgeById.delete(eid);
    }
    if (op.op === "DELETE_NODE"){
      if (!nodeById.has(op.nodeId)){ orphaned.push(op.nodeId); continue; }
      nodeById.delete(op.nodeId);
    }
  }

  // remove edges referencing deleted nodes (safety)
  for (const [eid,e] of edgeById){
    if (!nodeById.has(e.a) || !nodeById.has(e.b)) edgeById.delete(eid);
  }

  // 3) adds
  for (const op of patch.ops){
    if (op.op === "ADD_NODE"){
      nodeById.set(op.node.id, op.node);
    }
    if (op.op === "ADD_EDGE"){
      edgeById.set(op.edge.id, op.edge);
    }
  }

  // 4) modifications
  for (const op of patch.ops){
    if (op.op === "MOD_NODE"){
      const n = nodeById.get(op.nodeId);
      if (!n){ orphaned.push(op.nodeId); continue; }
      Object.assign(n, deepMerge(n, op.partial));
    }
    if (op.op === "MOD_EDGE"){
      const eid = resolveEdgeId(op.edgeId);
      if (!eid){ orphaned.push(op.edgeId); continue; }
      const e = edgeById.get(eid);
      edgeById.set(eid, deepMerge(e, op.partial));
    }
  }

  // 5) rebuild arrays
  graph.nodes = [...nodeById.values()];
  graph.edges = [...edgeById.values()];

  // optional: keep deterministic ordering (important for repeatability)
  graph.nodes.sort((a,b)=>a.id.localeCompare(b.id));
  graph.edges.sort((a,b)=>a.id.localeCompare(b.id));

  return { graph, protectedIntervals, orphaned };
}
```

### **10.5 Diagnostics for Patches**

Diagnostics for patches

If orphaned.length > 0, emit diagnostics:

PATCH_ORPHANED with refs to the missing ids

show focus at last known region if stored

### **10.6 Regenerate Safely Loop**

5) The "regenerate safely" loop (this is the whole engine)

This is the production loop you want:

```typescript
function buildArchitecture(stableInputs, patchSet) {
  // 1) read protected intervals first (affects operator outputs)
  const protectedIntervals = collectProtectedIntervals(patchSet);

  // 2) generate base graphs deterministically
  const envelope = buildEnvelope(stableInputs.houseSpec); // meshes + anchors
  const frameBase = emitFrameWallAll(envelope, stableInputs.frameSpec, protectedIntervals);
  const joistsBase = emitFloorJoistsAll(envelope, stableInputs.frameSpec);
  const trussBase  = emitRoofTrussesAll(envelope, stableInputs.frameSpec);

  const structureBase = mergeGraphs([frameBase, joistsBase, trussBase]); // deterministic merge & sort

  const mepBase = routeMEP(envelope, stableInputs.mepSpec, protectedIntervals);

  // 3) apply patches
  const structure = applyAllPatches(structureBase, patchSet.structure);
  const plumbing  = applyAllPatches(mepBase.plumbing, patchSet.plumbing);
  const electrical= applyAllPatches(mepBase.electrical, patchSet.electrical);
  const hvac      = applyAllPatches(mepBase.hvac, patchSet.hvac);

  // 4) validate -> diagnostics
  const diagnostics = validateAll(envelope, structure.graph, plumbing.graph, electrical.graph, hvac.graph);

  // 5) compile render + collision + overlay bundles
  return compileBundle({ envelope, structure, plumbing, electrical, hvac, diagnostics });
}
```

That's the scalable dynamic LOD foundation:

base graphs are deterministic

patches are stable and resilient

overlays are driven by diagnostics refs

LOD is index-based decimation without breaking picking/selection

**Key Features:**
- Deterministic patch application order
- Orphan resolution (fuzzy ID matching for resilience)
- Protected interval support (feeds operators on next rebuild)
- Safe edge deletion (removes edges referencing deleted nodes)
- Deterministic graph ordering (sorted by ID)
- Regenerate safely loop (base generation → patch application → validation → compilation)

**[END:TAG:PATCH_ENGINE]**

---

## 11. WHEELLACINGOPERATOR

**[TAG:WHEEL_LACING] [TAG:UNIVERSAL_OPERATORS]**

### **11.1 Overview**

1) WheelLacingOperator (32 spokes, any pattern, fully deterministic)
What it outputs

A GraphSpec:

Nodes: hub flange holes, rim holes

Edges: spokes (tagged drive/non-drive, leading/trailing, cross count)

Optional: rim + hub geometry edges (for collision / debug)

### **11.2 Input Types**

Inputs (minimal but complete)

```typescript
type WheelSpec = {
  id: string;
  center: [number,number,number];
  axis: [number,number,number]; // wheel normal (unit)
  radiusRim: number;            // ERD/2 approximation
  radiusHubL: number;           // left flange radius
  radiusHubR: number;           // right flange radius
  flangeOffsetL: number;        // along axis (left)
  flangeOffsetR: number;        // along axis (right) (negative or positive depending convention)
  spokeCount: number;           // 32
  crosses: number;              // 0..4 typical
  holeOffsetRimDeg?: number;    // phase offset for valve hole alignment etc.
  holeOffsetHubDeg?: number;
  lacing: "2cross"|"3cross"|"radial"|"custom";
  dish?: number;                // optional: lateral rim offset from hub center (for dishing)
};

type SpokeSpec = {
  dia: number;                  // render/collision diameter
  profile: "round";
  tensionHint?: number;         // optional; for physics later
};

type WheelLacingOutput = Graph;
```

### **11.3 Deterministic Local Frame**

1.1 Deterministic local frame for the wheel

You need a stable orthonormal basis {U,V,W} where W = axis.

```typescript
function makeBasis(axis: V3): {U:V3,V:V3,W:V3} {
  const W = normalize(axis);
  // choose a stable "up" seed that won't flip:
  const seed = Math.abs(W.y) < 0.9 ? {x:0,y:1,z:0} : {x:1,y:0,z:0};
  const U = normalize(cross(seed, W));
  const V = cross(W, U);
  return {U,V,W};
}

function circlePoint(center:V3, basis, r:number, ang:number): V3 {
  // ang in radians
  return add(center, add(scale(basis.U, r*Math.cos(ang)), scale(basis.V, r*Math.sin(ang))));
}
```

This avoids the "basis flips when axis changes slightly" problem.

### **11.4 Hole Layout with Phase Locking**

1.2 Hole layout (rim + hub) with stable phase locking

For N spokes (32), rim holes alternate left/right.

Define:

N = spokeCount

Nside = N/2

Rim hole angles: θ_i = θ0 + 2π * (i/N) where i=0..N-1

Hub flange hole angles per side use iSide=0..Nside-1:

Left: φ_L(k) = φ0 + 2π*(k/Nside)

Right: φ_R(k) = φ0 + 2π*(k/Nside)

Phase offsets:

θ0 = deg2rad(holeOffsetRimDeg ?? 0)

φ0 = deg2rad(holeOffsetHubDeg ?? 0)

### **11.5 Cross Pattern Mapping**

1.3 Cross pattern mapping (the actual "lacing")

For each rim hole i:

side = i % 2 (0=Left, 1=Right) OR whichever convention you like

k = floor(i/2) index on that side (0..Nside-1)

Radial: hub index = k

Crosses: hub index is shifted by ±crosses depending leading/trailing.

A clean deterministic rule:

Define dir = (k % 2 == 0) ? +1 : -1 (alternates leading/trailing)

hubIndex = (k + dir*crosses + Nside) % Nside

This produces alternating leading/trailing spokes automatically.

```typescript
function spokeMap(i:number, Nside:number, crosses:number){
  const side = i % 2;          // 0 left, 1 right
  const k = Math.floor(i/2);   // index on that side
  const dir = (k % 2 === 0) ? +1 : -1;
  const hubK = (k + dir*crosses + Nside) % Nside;
  const role = dir > 0 ? "leading" : "trailing";
  return {side, k, hubK, role};
}
```

### **11.6 Complete Implementation**

1.4 Emit nodes + spoke edges

Hub centers for each flange:

hubCenterL = center + W*(flangeOffsetL)

hubCenterR = center + W*(flangeOffsetR)
Rim center (with dish):

rimCenter = center + W*(dish ?? 0)

Compute hole positions:

Rim hole at i: P_rim(i) = circlePoint(rimCenter, basis, radiusRim, θ_i)

Hub hole for side:

if left: P_hub = circlePoint(hubCenterL, basis, radiusHubL, φ_L(hubK))

if right: P_hub = circlePoint(hubCenterR, basis, radiusHubR, φ_R(hubK))

Emit:

Node IDs:

N:RIM:{wheelId}:i{i}

N:HUB:{wheelId}:{L|R}:k{hubK}

Edge ID:

E:SPOKE:{wheelId}:i{i}:{L|R}:k{hubK}:{role}:x{crosses}

```typescript
function emitWheelLacing(w:WheelSpec, spoke:SpokeSpec): Graph {
  const G:Graph = { nodes:[], edges:[], junctions:[], hardpoints:[], meta:{layer:"structure", generatedBy:"WheelLacingOperator"} };
  const basis = makeBasis(vec3(w.axis));
  const N = w.spokeCount;
  const Nside = N/2;

  const rimC = add(vec3(w.center), scale(basis.W, w.dish ?? 0));
  const hubCL = add(vec3(w.center), scale(basis.W, w.flangeOffsetL));
  const hubCR = add(vec3(w.center), scale(basis.W, w.flangeOffsetR));

  const theta0 = (w.holeOffsetRimDeg ?? 0) * Math.PI/180;
  const phi0   = (w.holeOffsetHubDeg ?? 0) * Math.PI/180;

  // Pre-emit hub nodes (stable ids)
  for (let k=0;k<Nside;k++){
    const a = phi0 + 2*Math.PI*(k/Nside);
    const pL = circlePoint(hubCL, basis, w.radiusHubL, a);
    const pR = circlePoint(hubCR, basis, w.radiusHubR, a);
    G.nodes.push({ id:`N:HUB:${w.id}:L:k${k}`, space:"LOCAL", frame:{pos:[pL.x,pL.y,pL.z], rot:[0,0,0,1]}, role:"mount", meta:{wheelId:w.id, side:"L", k} });
    G.nodes.push({ id:`N:HUB:${w.id}:R:k${k}`, space:"LOCAL", frame:{pos:[pR.x,pR.y,pR.z], rot:[0,0,0,1]}, role:"mount", meta:{wheelId:w.id, side:"R", k} });
  }

  // Rim + spokes
  for (let i=0;i<N;i++){
    const th = theta0 + 2*Math.PI*(i/N);
    const pRim = circlePoint(rimC, basis, w.radiusRim, th);
    const rimId = `N:RIM:${w.id}:i${i}`;
    G.nodes.push({ id: rimId, space:"LOCAL", frame:{pos:[pRim.x,pRim.y,pRim.z], rot:[0,0,0,1]}, role:"mount", meta:{wheelId:w.id, i} });

    const {side, hubK, role} = spokeMap(i, Nside, w.crosses);
    const hubId = `N:HUB:${w.id}:${side===0?"L":"R"}:k${hubK}`;

    const eid = `E:SPOKE:${w.id}:i${i}:${side===0?"L":"R"}:k${hubK}:${role}:x${w.crosses}`;
    G.edges.push({
      id: eid,
      a: hubId,
      b: rimId,
      path: { kind:"line" },
      profile: { kind:"circle", r: spoke.dia*0.5 },
      segments: 1,
      meta: { system:"structure", memberType:"spoke", wheelId:w.id, i, side:side===0?"L":"R", hubK, role, crosses:w.crosses, tensionHint:spoke.tensionHint ?? 1.0 }
    });
  }
  return G;
}
```

### **11.7 Dynamic LOD for Wheels**

Dynamic LOD for wheels (perfectly stable)

Because IDs are index-based:

LOD0: all spokes

LOD1: keep i % 2 == 0

LOD2: keep i % 4 == 0

Always keep rim + hub nodes

**Key Features:**
- Deterministic basis generation (no axis flips)
- Phase-locked hole layout (rim and hub)
- Cross pattern mapping (leading/trailing alternation)
- Complete 3-cross lacing algorithm
- Dish support (lateral rim offset)
- Index-based LOD (perfectly stable)
- Deterministic ID generation from wheelId + spoke index

**[END:TAG:WHEEL_LACING]**

---

## 12. MEP ROUTER A* PATHFINDING

**[TAG:MEP_ROUTER] [TAG:A_STAR] [TAG:PATHFINDING]**

### **12.1 Overview**

2) MEP Router A* (grid + heuristics) with clearance + bend radius + slope

This is the practical "it always works" router.

### **12.2 Grid Definition**

2.1 Grid definition (sparse, service-zone only)

Cell size c (v1 good defaults):

plumbing: 0.10m

electrical: 0.15m

HVAC: 0.20m (ducts are bigger)

Grid node:

```typescript
type Cell = { ix:number; iy:number; iz:number };
type Grid = {
  cell: number;
  origin: V3;
  // occupancy query: walkable?
  isOpen: (ix,iy,iz)=>boolean;
  // adjacency: neighbors
  neighbors: (c:Cell)=>Cell[];
  // to world
  toWorld: (c:Cell)=>V3;
};
```

Clearance inflation (critical)

A cell is blocked if its center lies inside any forbidden volume inflated by clearance radius rClear.

For each volume AABB:

inflate by rClear

mark cells inside as blocked (or do query-time checks)

### **12.3 A* State with Direction**

2.2 A* state includes direction (for bend radius & turn penalties)

If you want turn penalties and bend constraints, the state must include previous direction.

Direction is a small enum:

dir ∈ {+X,-X,+Y,-Y,+Z,-Z, none}

State:

```typescript
type State = { cell:Cell; dirPrev:number; };
```

Neighbors generate (cellNext, dirNext).

### **12.4 Cost Function**

2.3 Cost function (domain specific)

Base step cost:

stepCost = distance(cellNext - cell) (1 or √2 if diagonals)

Add penalties:

turnPenalty if dirNext != dirPrev

verticalPenalty (prefer staying level unless needed)

zonePreference (cheap inside preferred service zone)

proximityPenalty (stay away from forbidden volumes for safety)

Example:

```typescript
g += stepCost
   + (dirPrev!==NONE && dirNext!==dirPrev ? kTurn : 0)
   + (dirNext is ±Y ? kVertical : 0)
   + zonePenalty(cellNext)     // negative if preferred
   + proximityPenalty(cellNext);
```

Heuristic:

h = Euclidean(toWorld(cell), goalWorld)

### **12.5 Bend Radius Enforcement**

2.4 Bend radius enforcement (grid approximation)

Real bend radius means you can't do sharp turns too frequently for big pipes/ducts.

Grid-friendly constraint:

require at least nStraight cells between turns.

Maintain in state:

straightRunLen (cells since last turn)

Disallow turn if straightRunLen < nStraight.

Where:

nStraight = ceil(bendRadius / cellSize)

### **12.6 Drain Slope Enforcement**

2.5 Drain slope enforcement (plumbing special)

Two ways:

Method A (strict): include "height budget" in A*

Only allow horizontal moves if the slope can be satisfied by descending enough over run length.

Keep a state variable:

dropSoFar or current y is already in cell index iy

For each horizontal move of length d:

require Δiy <= -minSlope * d / cellSize on average

This is messy.

Method B (clean v1): route in XZ first, then assign Y ramp

This is what I recommend.

Phase 1: A* in 2D (XZ) inside plumbing wall / underfloor chase
Phase 2: Convert path length L → required drop drop = minSlope * L
Set end elevation:

if stack entry is known yStack, set yStart = yStack + drop

else pick a start y within allowed band and compute end accordingly

Then validate:

if any point violates service zone or collides, reroute with stronger constraints (or choose different stack node).

It's deterministic and works.

### **12.7 Complete A* Pseudocode**

2.6 A* pseudocode (with direction + turn spacing)

```typescript
function astar(grid:Grid, start:Cell, goal:Cell, opts:{
  kTurn:number; kVertical:number; nStraight:number;
  zonePenalty:(c:Cell)=>number;
  proximityPenalty:(c:Cell)=>number;
}): Cell[] | null {

  const NONE = 0;

  // Priority queue by f = g + h
  const open = new MinHeap<State>();
  const gScore = new Map<string, number>();
  const cameFrom = new Map<string, {prevKey:string, cell:Cell, dirPrev:number, straight:number}>();

  function key(s:State, straight:number){ return `${s.cell.ix},${s.cell.iy},${s.cell.iz}|d${s.dirPrev}|s${straight}`; }
  function h(c:Cell){ const p=grid.toWorld(c), q=grid.toWorld(goal); return dist(p,q); }

  // initial
  open.push({cell:start, dirPrev:NONE} as any, 0);
  gScore.set(key({cell:start, dirPrev:NONE}, 999), 0);

  while(!open.isEmpty()){
    const cur = open.pop() as any as {cell:Cell; dirPrev:number; straight:number; g:number};
    if (cur.cell.ix===goal.ix && cur.cell.iy===goal.iy && cur.cell.iz===goal.iz){
      return reconstructPath(cameFrom, cur);
    }

    for (const nxt of grid.neighbors(cur.cell)){
      if (!grid.isOpen(nxt.ix,nxt.iy,nxt.iz)) continue;

      const dirNext = dirFromTo(cur.cell, nxt); // ±X ±Y ±Z enum
      const turning = (cur.dirPrev!==NONE && dirNext!==cur.dirPrev);

      // enforce bend radius by requiring straight run
      if (turning && cur.straight < opts.nStraight) continue;

      const straightNext = turning ? 1 : (cur.straight + 1);

      const step = neighborStepCost(cur.cell, nxt);
      const gTent =
        cur.g
        + step
        + (turning ? opts.kTurn : 0)
        + (isVertical(dirNext) ? opts.kVertical : 0)
        + opts.zonePenalty(nxt)
        + opts.proximityPenalty(nxt);

      const k = key({cell:nxt, dirPrev:dirNext}, straightNext);
      const prevBest = gScore.get(k);
      if (prevBest === undefined || gTent < prevBest){
        gScore.set(k, gTent);
        cameFrom.set(k, { prevKey: key({cell:cur.cell, dirPrev:cur.dirPrev}, cur.straight), cell: cur.cell, dirPrev: cur.dirPrev, straight: cur.straight });
        const f = gTent + h(nxt);
        open.push({cell:nxt, dirPrev:dirNext, straight:straightNext, g:gTent} as any, f);
      }
    }
  }
  return null;
}
```

(Your actual implementation will store keys more efficiently, but that's the logic.)

**Key Features:**
- Sparse grid (service zones only)
- Clearance inflation for forbidden volumes
- Direction-aware state (for turn penalties)
- Domain-specific cost function (turn, vertical, zone, proximity penalties)
- Bend radius enforcement (straight run requirement)
- Two-phase drain routing (XZ path → Y ramp assignment)
- Complete A* implementation with state tracking

**[END:TAG:MEP_ROUTER]**

---

## 13. COLLINEAR PATH SIMPLIFICATION

**[TAG:PATH_SIMPLIFICATION] [TAG:LOD]**

### **13.1 Overview**

3) Collinear Path Simplification (huge for LOD + runtime cost)

After A* returns a path as a list of grid cells (or world points), you want:

remove all intermediate points that are collinear

optionally merge gentle stair-steps into diagonals (if allowed)

keep junctions near fixtures, tees, elbows as explicit nodes for metadata

### **13.2 Strict Collinear Simplification**

3.1 Strict collinear simplification (grid-safe)

```typescript
function simplifyCollinear(points: V3[], eps=1e-6): V3[] {
  if (points.length <= 2) return points.slice();
  const out: V3[] = [points[0]];

  for (let i=1;i<points.length-1;i++){
    const a = out[out.length-1];
    const b = points[i];
    const c = points[i+1];

    const ab = sub(b,a);
    const bc = sub(c,b);

    // check if directions are same (normalized) within eps
    const dab = normalize(ab);
    const dbc = normalize(bc);
    if (dist(dab, dbc) < eps){
      // b is collinear; skip
      continue;
    } else {
      out.push(b);
    }
  }
  out.push(points[points.length-1]);
  return out;
}
```

### **13.3 Axis-Run Compression**

3.2 "Axis-run compression" (even better for grids)

If points are grid-based, directions are one of 6 axes. Then simplification becomes trivial:

keep only points where direction changes.

```typescript
function simplifyAxisRuns(points: V3[], cell:number): V3[] {
  if (points.length <= 2) return points.slice();
  const out: V3[] = [points[0]];
  let prevDir = dirDiscrete(points[0], points[1], cell);

  for (let i=1;i<points.length-1;i++){
    const d = dirDiscrete(points[i], points[i+1], cell);
    if (d !== prevDir){
      out.push(points[i]);
      prevDir = d;
    }
  }
  out.push(points[points.length-1]);
  return out;
}
```

This yields perfect elbow nodes (exactly what you want for pipes/ducts).

**Key Features:**
- Removes collinear intermediate points
- Grid-optimized axis-run compression
- Preserves elbow nodes for MEP routing
- Reduces path complexity for LOD and runtime performance

**[END:TAG:PATH_SIMPLIFICATION]**

---

## 14. NETWORK LOD

**[TAG:NETWORK_LOD] [TAG:DETERMINISTIC_LOD]**

### **14.1 Overview**

4) Network LOD (stable, deterministic, insane performance)

For any MEP graph edge that is a polyline path:

LOD0: full simplified elbow path

LOD1: keep only every 2nd elbow if angle small (optional)

LOD2: replace entire run with one straight segment between endpoints only if it doesn't violate collision (fast re-check)

For spokes:

LOD0: all

LOD1: every other

LOD2: every fourth

For studs/joists:

same index decimation

Because IDs are index-based, you can switch LOD without breaking selection/picking.

### **14.2 Deterministic Tees for MEP Graphs**

5) One more trick: "Deterministic tees" for MEP graphs

When multiple fixtures connect to a trunk, don't store 10 independent A* paths that overlap messily.

Do:

compute trunk path first (panel → zone spine, water heater → plumbing spine, furnace → main trunk)

for each fixture, route to nearest cell on trunk (not necessarily the trunk endpoint)

insert a tee node at the attachment point (stable ID based on trunk cell index)

That produces clean, buildable MEP graphs.

**Key Features:**
- Index-based LOD (stable IDs across LOD changes)
- MEP path simplification (elbow decimation)
- Spoke/stud/joist decimation (every Nth member)
- Deterministic tee insertion (trunk-first routing)
- Collision-aware LOD (LOD2 straight segment validation)

**[END:TAG:NETWORK_LOD]**

---

## 15. UNIVERSAL RIB/STRINGER OPERATOR

**[TAG:RIB_STRINGER_OPERATOR] [TAG:UNIVERSAL_OPERATORS]**

### **15.1 Overview**

Universal Rib/Stringer Operator (R/S Operator) — the same engine for hulls, wings, unibodies, steel frames, skeletons

This operator is the "internal anatomy generator":

Ribs / frames = cross-sections at stations (like bulkheads, wing ribs, car frames)

Stringers / longerons = longitudinal members that run through ribs (like keels, chine stringers, spars, studs, beams)

It outputs GraphSpec only (nodes/edges + metadata), so you get:

perfect determinism

perfect LOD

perfect patchability

### **15.2 Input Types**

1) Inputs (minimal, universal)
1.1 Surface query interface (works for SDF or your "middleman" implicit-ish modeling)

You only need one of these:

```typescript
type SurfaceQuery =
  | { kind:"sdf"; sdf:(p:[number,number,number])=>number; bounds:{min:[number,number,number], max:[number,number,number]} }
  | { kind:"mesh"; triangles: Float32Array; /* indexed or flat */ bounds:{min:[number,number,number], max:[number,number,number]} };
```

1.2 Spine / station axis (the "keel / centerline / main spar")

```typescript
type SpineSpec = {
  id: string;
  polyline: {x:number,y:number,z:number}[]; // arc-length axis
  upHint: [number,number,number];           // stable "up" seed so frames don't flip
  phaseM?: number;                          // station phase-lock
};
```

1.3 Rib spec

```typescript
type RibSpec = {
  partId: string;
  spacingM: number;
  startM: number;
  endM: number;

  planeMode: "perpToSpine" | "fixedNormal";
  fixedNormal?: [number,number,number];     // for constant-direction slicing

  thicknessM: number;                        // if you extrude plates
  member: { profile:"rect", w:number, h:number }; // if you want framed ribs instead of plates

  contour: {
    method: "marchingSquares" | "meshSlice";
    gridRes: number;                         // e.g. 128 (2D slice grid)
    iso: number;                             // 0 for sdf
    pick: "outermost" | "largestArea" | "all";
    simplifyEpsM: number;                    // polyline simplification
  };

  trims?: {
    // optional constraints: keep only below deck, or only inside cockpit-free region
    keepHalfspace?: { n:[number,number,number], d:number }[]; // plane halfspaces
    subtractVolumes?: { kind:"aabb", min:[number,number,number], max:[number,number,number] }[];
  };
};
```

1.4 Stringer spec (the "longitudinal rails")

```typescript
type StringerSpec = {
  count: number;

  // how to choose a consistent point on each rib contour
  anchorMode: "angle" | "fractionAlongPerimeter" | "directionRay";
  anglesDeg?: number[];          // for hull: chine, sheer, keel lines
  fractions?: number[];          // 0..1 along rib perimeter
  directionRays?: [number,number,number][]; // rays from spine point to find contour hit

  member: { profile:"rect"| "circle", w?:number, h?:number, r?:number };
  smooth: { kind:"catmullRom", tension:number, samplesPerSpan:number };
};
```

### **15.3 Deterministic Station Frames**

2) Deterministic station frames (no flipping)

You need a stable moving frame along the spine:

T = tangent (forward along spine)

U = "up-like" vector transported along spine (uses upHint)

N = normal (N = T × U)

Phase-lock stations

Let arc-length along spine be s ∈ [0..S].

Stations:

s_i = q(phase + i*spacing, 0.001) (mm snap)

i = floor((s - phase)/spacing)

IDs:

RIB:{partId}:i{i}:s{fmt(s_i)}

STR:{partId}:k{k}

### **15.4 Core Algorithm**

3) Core algorithm: slice → contour → emit ribs → emit stringers
3.1 Build spine axis (arc-length mapper)

Same as your wall axis, but 3D. Provide:

posAt(s)

tanAt(s)

frameAt(s) using upHint to avoid flips

3.2 Rib plane at station

If planeMode="perpToSpine":

plane origin O = posAt(s_i)

plane normal n = tanAt(s_i) (ribs perpendicular to spine)

Else fixed:

n = fixedNormal

Define 2D basis in plane:

e1, e2 orthonormal spanning plane

3.3 Extract contour from SurfaceQuery
A) SDF slice: Marching Squares in plane coordinates

Make a 2D grid in the plane:

grid spans a square that covers bounds projected into plane

for each cell sample point:

world point = O + e1*u + e2*v

value = sdf(world)

run marching squares at iso=0

produce polyline loop(s) in (u,v)

map back to 3D points

Pick loop:

largestArea usually best for hull/wing

then simplify with RDP at simplifyEpsM

B) Mesh slice: triangle-plane intersection

For each triangle:

intersect edges with plane

gather segments

stitch segments into loop(s)

pick loop(s), simplify

Either way: you end with one or more closed polylines C_i[] in 3D.

3.4 Apply trims

halfspace keep: drop points outside

subtract volumes: cut out parts (e.g., cockpit volume)

if contour becomes multiple loops, pick the intended one (largest area or nearest to spine)

### **15.5 Emitting Ribs**

4) Emitting ribs (two modes)
4.1 Rib as a framed ring (graph edges along contour)

This is perfect for "internal ribs" as members:

For each contour polyline P[0..m-1]:

resample to a stable vertex count if you want (or keep simplified)

emit nodes: N:RIB:{ribId}:v{j}

emit edges between consecutive vertices:

E:RIBSEG:{ribId}:v{j}

Use profile from RibSpec.member.

4.2 Rib as a plate (extruded)

If you want actual plate ribs:

keep the contour as a closed 2D polygon in the plane

extrusion thickness = RibSpec.thicknessM

you can still emit it as graph metadata (and your compiler generates the mesh/collider)

Recommended: emit both:

framed ring edges for selection/diagnostics

a plate "asset" record for actual geometry

### **15.6 Emitting Stringers**

5) Emitting stringers (the magic)

Stringers are built by selecting a consistent "anchor point" on every rib contour and connecting them across stations.

For each stringer k:

For each rib i, pick anchor point A[i,k] on rib contour:

angle mode: choose direction vector in rib plane (e.g., sheer/chine/keel), find intersection with contour

fraction mode: walk perimeter length and pick at fraction f

directionRay mode: ray from spine point outward; pick first contour hit

Connect points in order of station:

polyline in 3D: A0 → A1 → ...

smooth via Catmull-Rom (deterministic sample count)

Emit edges:

either one edge with spline path

or multiple segment edges for elbows/physics nodes

IDs:

N:STR:{partId}:k{k}:i{i}

E:STR:{partId}:k{k}:seg{j}

### **15.7 Complete Pseudocode**

6) Pseudocode (directly translatable)
6.1 High-level operator

```typescript
function emitRibsAndStringers(surface:SurfaceQuery, spine:SpineSpec, rib:RibSpec, str:StringerSpec): {structure:Graph, anchors:any} {
  const axis = buildSpineAxis(spine.polyline, spine.upHint);
  const phase = spine.phaseM ?? 0;
  const mm = 0.001;

  const ribs: { ribId:string; s:number; O:V3; n:V3; e1:V3; e2:V3; contour:V3[] }[] = [];
  const G:Graph = { nodes:[], edges:[], junctions:[], hardpoints:[], meta:{layer:"structure", generatedBy:"RibStringerOperator"} };

  // ---- 1) Stations → contours → rib emission
  const i0 = Math.ceil((rib.startM - phase) / rib.spacingM);
  const i1 = Math.floor((rib.endM   - phase) / rib.spacingM);

  for (let i=i0; i<=i1; i++){
    const s = q(phase + i*rib.spacingM, mm);
    const O = axis.posAt(s);
    const T = axis.tanAt(s);

    const n = (rib.planeMode === "perpToSpine") ? T : normalize(vec3(rib.fixedNormal!));
    const {e1,e2} = planeBasis(n, spine.upHint); // stable basis in plane

    const contour = sliceContour(surface, O, n, e1, e2, rib.contour); // returns outer loop polyline in 3D
    const contour2 = applyTrims(contour, rib.trims);

    const ribId = `RIB:${rib.partId}:i${i}:s${fmt(s)}`;
    ribs.push({ ribId, s, O, n, e1, e2, contour: contour2 });

    emitRibRing(G, ribId, contour2, rib.member);
  }

  // ---- 2) Build stringers using rib contours
  for (let k=0; k<str.count; k++){
    const pts: V3[] = [];
    for (let r=0; r<ribs.length; r++){
      const p = pickStringerPointOnContour(ribs[r], str, k);
      pts.push(p);
      G.nodes.push({ id:`N:STR:${rib.partId}:k${k}:i${r}`, space:"LOCAL", frame:{pos:[p.x,p.y,p.z], rot:[0,0,0,1]}, role:"mount", meta:{partId:rib.partId, k, r} });
    }

    const smooth = smoothCatmullRom(pts, str.smooth.samplesPerSpan, str.smooth.tension);
    emitStringerSpline(G, rib.partId, k, smooth, str.member);
  }

  // ---- 3) anchors payload (optional) for UI handles
  const anchors = ribs.map(r => ({ ribId:r.ribId, s:r.s, origin:r.O, normal:r.n }));
  return { structure:G, anchors };
}
```

6.2 Slice contour (SDF marching squares, conceptually)

```typescript
function sliceContour(surface:SurfaceQuery, O:V3, n:V3, e1:V3, e2:V3, cfg:any): V3[] {
  if (surface.kind === "mesh") return meshSlice(surface, O, n, cfg);
  // sdf:
  const grid = buildPlaneGrid(surface.bounds, O, e1, e2, cfg.gridRes);
  const field = sampleSdfOnGrid(surface.sdf, grid, O, e1, e2);
  const loops2 = marchingSquares(field, cfg.iso);         // loops in (u,v)
  const loop2  = pickLoop(loops2, cfg.pick);
  const loop3  = loop2.map(p => add(O, add(scale(e1,p.u), scale(e2,p.v))));
  return simplifyPolyline(loop3, cfg.simplifyEpsM);
}
```

### **15.8 Deterministic LOD**

7) Deterministic LOD for ribs/stringers (perfectly stable)

Because ribs are station-indexed:

Rib LOD: keep every kth rib (i % k == 0)

Contour LOD: increase simplify epsilon, or resample to fewer points

Stringer LOD: keep key stringers only (keel + sheer + chine), drop intermediates

And your IDs remain stable because:

rib IDs are i-based

vertex IDs are v-based after deterministic resampling/simplification rules

### **15.9 Diagnostics**

8) Diagnostics (what makes it "self-correcting")

Emit diagnostics when:

slice contour is empty at a station → RIB_MISSING_CONTOUR

contour self-intersects (bad SDF settings) → RIB_SELF_INTERSECT

stringer crosses outside hull skin (ray anchor failure) → STRINGER_OUTSIDE

rib spacing too dense for perf budget → LOD_BUDGET

Each diagnostic includes ribId and a focus sphere at the station.

### **15.10 Universal Applications**

9) Why this is the universal bridge

This one operator gives you:

Laser hull: frames/bulkheads + keel/stringers + cockpit cutouts

Aircraft wing: ribs at stations + spars as stringers + skin constraints

Car: unibody frames + longerons + roll cage nodes

Building steel: frames at bays + purlins/girts as stringers

Skeleton: vertebra "ribs" along spine + bone "stringers"

Same math. Same graph output. Same patch + LOD engine.

**Key Features:**
- Universal surface query (SDF or mesh)
- Deterministic station frames (no flipping)
- Marching squares / mesh slice contour extraction
- Rib emission (framed ring or plate)
- Stringer emission (anchor point selection + Catmull-Rom smoothing)
- Deterministic LOD (index-based rib/stringer decimation)
- Comprehensive diagnostics (missing contours, self-intersects, outside bounds)
- Universal applications (hulls, wings, unibodies, steel frames, skeletons)

**[END:TAG:RIB_STRINGER_OPERATOR]**

---

## 16. INTEGRATION POINTS

**[TAG:INTEGRATION] [TAG:SYSTEM_BOUNDARIES]**

### **16.1 Overview**

The Architecture Operator Algorithms System integrates with:

**Compiler System:**
- GraphSpec → Mesh/Collider compilation
- Profile sweep generation (rect, circle, custom)
- Junction rendering (caps, blends, hubs)

**Diagnostics System:**
- Violation detection and reporting
- Buildability scoring
- Interactive overlay rendering

**Patch Engine:**
- Protected interval support
- Orphan resolution
- Deterministic graph modification

**LOD System:**
- Index-based decimation
- Network simplification
- Collinear path reduction

**ReferencePack System:**
- Ortho reference fitting
- Metrics validation
- First-fit automation

**Feature Node System:**
- Attachment frame generation
- Hardpoint emission
- Asset placement

### **16.2 Input Sources**

**Envelope System:**
- House footprint polygons
- Story definitions (floorY, height)
- Opening specifications (doors, windows)

**MEP System:**
- Fixture anchors
- Service zone volumes
- Forbidden volumes (beams, columns)

**Surface System:**
- SDF queries (hulls, wings)
- Mesh geometry (triangles)
- Bounds for slicing

### **16.3 Output Destinations**

**GraphSpec Output:**
- Structure graphs (frame, joists, trusses)
- MEP graphs (plumbing, electrical, HVAC)
- Rib/stringer graphs (internal anatomy)

**Diagnostics Output:**
- Violation lists
- Buildability scores
- Focus spheres for camera navigation

**Bundle Output:**
- GLB meshes
- Collider JSON
- Anchor definitions

**[END:TAG:INTEGRATION]**

---

## 17. FILE DEPENDENCY GRAPH

**[TAG:FILE_DEPENDENCIES] [TAG:ARCHITECTURE]**

### **17.1 Core Operator Files**

```
operators/
  FrameWallOperator.ts          # Stud/plate/header emission
  FloorJoistOperator.ts         # Joist/rim/beam emission
  RoofTrussOperator.ts          # Truss chord/web emission
  MEPRouterOperator.ts          # Plumbing/electrical/HVAC routing
  WheelLacingOperator.ts        # Spoke pattern generation
  RibStringerOperator.ts        # Universal internal anatomy
```

### **17.2 Helper Utilities**

```
utils/
  axis.ts                       # buildAxis (2D polyline axis)
  spine.ts                      # buildSpineAxis (3D spine axis)
  grid.ts                       # Sparse grid construction
  pathfinding.ts                # A* implementation
  simplification.ts             # Collinear/axis-run simplification
  slicing.ts                    # Marching squares / mesh slice
  smoothing.ts                  # Catmull-Rom spline
```

### **17.3 Core Types**

```
types/
  GraphSpec.ts                  # Graph JSON schema
  OperatorTypes.ts              # WallSpec, JoistSpec, RoofSpec, etc.
  Diagnostics.ts                # Diagnostic JSON schema
  Patch.ts                      # PatchOp, Patch, PatchResult
```

### **17.4 Compiler Integration**

```
compiler/
  GraphCompiler.ts              # GraphSpec → Mesh/Collider
  ProfileSweep.ts               # Rect/circle/custom sweep
  JunctionRenderer.ts           # Cap/blend/hub rendering
```

### **17.5 Diagnostics & Overlays**

```
diagnostics/
  Validator.ts                  # Constraint checking
  OverlayRenderer.ts            # Three.js overlay rendering
  BuildabilityScorer.ts         # Score calculation
```

**[END:TAG:FILE_DEPENDENCIES]**

---

## 18. RELATIONSHIP MATRIX

**[TAG:RELATIONSHIPS] [TAG:SYSTEM_MAP]**

### **18.1 Operator Relationships**

| Operator | Depends On | Produces | Used By |
|----------|-----------|----------|---------|
| FrameWallOperator | buildAxis, q, fmt, id | GraphSpec (studs/plates/headers) | Compiler, Diagnostics |
| FloorJoistOperator | buildAxis, clipLineToPolygon | GraphSpec (joists/rim/beams) | Compiler, Diagnostics |
| RoofTrussOperator | makeTruss2D, trussPlaneFrame | GraphSpec (truss chords/webs) | Compiler, Diagnostics |
| MEPRouterOperator | buildSparseGrid, astar | GraphSpec (pipes/ducts/conduit) | Compiler, Diagnostics |
| WheelLacingOperator | makeBasis, circlePoint, spokeMap | GraphSpec (spokes/hub/rim) | Compiler, LOD |
| RibStringerOperator | buildSpineAxis, sliceContour, smoothCatmullRom | GraphSpec (ribs/stringers) | Compiler, Diagnostics |

### **18.2 System Relationships**

| System | Relationship | Purpose |
|--------|-------------|---------|
| Compiler | Consumes GraphSpec | Renders meshes/colliders from operators |
| Diagnostics | Validates GraphSpec | Detects violations, generates scores |
| Patch Engine | Modifies GraphSpec | Applies user edits deterministically |
| LOD System | Simplifies GraphSpec | Reduces complexity for performance |
| ReferencePack | Validates outputs | Ensures operators match reference geometry |
| Feature Nodes | Provides anchors | Supplies fixture positions for MEP routing |

### **18.3 Data Flow**

```
Envelope → Operators → GraphSpec → Compiler → Meshes/Colliders
                ↓
         Diagnostics → Overlays → UI
                ↓
         Patch Engine → Modified GraphSpec
                ↓
         LOD System → Simplified GraphSpec
```

### **18.4 Key Principles**

**Determinism:**
- All operators use phase-locked positioning
- IDs derived from stable inputs (wallId + u, station index, etc.)
- No randomness in generation

**Modularity:**
- Each operator is independent
- Shared utilities (axis, grid, pathfinding)
- Common GraphSpec output format

**Extensibility:**
- New operators follow same pattern
- Patch engine handles any GraphSpec
- LOD works on any index-based structure

**Performance:**
- Collinear simplification reduces path complexity
- Network LOD enables massive scale
- GPU picking avoids raycasting overhead

**[END:TAG:RELATIONSHIPS]**

---

## 📋 SUMMARY

This system map documents the complete Architecture Operator Algorithms System, including:

- **6 Core Operators:** FrameWall, FloorJoist, RoofTruss, MEPRouter, WheelLacing, Rib/Stringer
- **Complete Implementations:** All operators include full TypeScript pseudocode
- **Diagnostic System:** Structural HUD, MEP HUD, buildability scoring
- **Patch Engine:** Deterministic graph modification with orphan resolution
- **Pathfinding:** A* with bend radius, slope, and clearance enforcement
- **LOD System:** Index-based decimation for performance
- **Universal Applications:** Same operators work for houses, vehicles, aircraft, skeletons

**Total Document Size:** ~2,951 lines  
**Source:** modelmaker.txt Lines 5319-7817+  
**Status:** Complete system mapping with all algorithms, formulas, and implementation details extracted

---

*MASTER ARCHITECTURE OPERATOR ALGORITHMS SYSTEM MAP*  
*Complete S.A.M. documentation for Architecture Operator Algorithms System*  
*Version 1.0.0 | Date: 2025-01-27*



---


---

<!-- AUTO-GENERATED FROM: MASTER_CONSTRAINT_BUNDLES_SYSTEM_MAP.md -->
<!-- DO NOT EDIT THIS SECTION DIRECTLY -->
<!-- Source File: MASTER_CONSTRAINT_BUNDLES_SYSTEM_MAP.md -->
<!-- File Size: 21432 bytes -->

<a id='constraint-bundles-system-map'></a>

# MASTER CONSTRAINT BUNDLES SYSTEM MAP
**Complete System Anatomy Mapping - Constraint Bundles System (CAD but alive layer)**

**Date:** 2025-01-27  
**Version:** 1.0.0  
**Purpose:** Complete S.A.M. documentation for Constraint Bundles System (modelmaker.txt Constraint Bundles spec)  
**Status:** PHASE 1 - Foundation System Mapping  
**System:** Lucid Image Editor - Universal Parametric Asset Engine  
**Reference:** modelmaker.txt Constraint Bundles spec (Lines 7822-8221+)

---

## 📋 TABLE OF CONTENTS

1. [System Overview](#1-system-overview)
2. [ConstraintBundle Schema](#2-constraintbundle-schema)
3. [Core Constraint Types](#3-core-constraint-types)
4. [Constraint Solver Strategy](#4-constraint-solver-strategy)
5. [SVG 2D Control Surface Mapping](#5-svg-2d-control-surface-mapping)
6. [Constraint-Aware Handles](#6-constraint-aware-handles)
7. [Integration Points](#7-integration-points)
8. [File Dependency Graph](#8-file-dependency-graph)
9. [Relationship Matrix](#9-relationship-matrix)

---

## 1. SYSTEM OVERVIEW

**[TAG:OVERVIEW] [TAG:CONSTRAINT_BUNDLES]**

### **What is the Constraint Bundles System?**

**Think of constraints as post-operators that rewrite/augment the GraphSpec deterministically—no manual vertex pushing. They're small, composable, and always emit diagnostics when they can't satisfy.**

**Location:** Constraint Bundles defined in modelmaker.txt (Lines 7822-8221+)  
**Purpose:** Provide "CAD but alive" layer that enforces physical plausibility (fairness, symmetry, clearance, joinery)  
**Core Principle:** Constraints are post-operators that deterministically modify GraphSpecs without manual vertex manipulation

### **Key Features**

**Deterministic constraint application:**
- Symmetry constraints (mirror, average, lockSide)
- Attach constraints (stringer ↔ rib ↔ hardpoint)
- Notch/slot constraints (auto joinery)
- Curvature constraints (fairness, smoothness)
- Clearance constraints (MEP + internal structure)
- MinThickness constraints
- SnapToStation constraints

**Always emit diagnostics:**
- If constraint can't be satisfied, emit diagnostic
- Never half-apply constraints
- Makes system trustworthy

**SVG 2D control surface:**
- 2D edits modify fields, not vertices
- ParamField model (curves, not sliders)
- Orthographic view mapping
- Inverse mapping: SVG → field updates
- Fast feedback loop (local rebuilds)

### **What This System Provides**

**Post-operator constraint layer:**
- Enforces physical plausibility
- Maintains symmetry
- Ensures fairness/curvature
- Enforces clearance
- Auto-joinery (notches/slots)

**Professional CAD feel:**
- Constraint-aware handles
- Real-time validation
- Diagnostic overlays
- Trustworthy system (never half-applies)

**Universal foundation:**
- Same constraints work for hulls, wings, buildings, vehicles
- Deterministic application order
- Composable constraint bundles

**[END:TAG:OVERVIEW]**

---

## 2. CONSTRAINTBUNDLE SCHEMA

**[TAG:CONSTRAINT_BUNDLE] [TAG:SCHEMA]**

### **2.1 ConstraintBundle Type**

```typescript
type ConstraintBundle = {
  id: string;
  appliesTo: { partId:string; graphId?:string };
  order: number;                  // deterministic execution order
  constraints: Constraint[];
};
```

### **2.2 Constraint Union Type**

```typescript
type Constraint =
  | SymmetryConstraint
  | AttachConstraint
  | NotchSlotConstraint
  | CurvatureConstraint
  | ClearanceConstraint
  | MinThicknessConstraint
  | SnapToStationConstraint;
```

### **2.3 Execution Pipeline**

**Deterministic execution order:**

1. Generate BaseGraph (ribs/stringers/framing/MEP)
2. Apply ConstraintBundles (in order)
3. Apply user Patch (deltas)
4. Validate + diagnostics
5. Compile meshes/colliders/overlays

**Key Principle:** Constraints are applied in deterministic order, always emitting diagnostics when they can't be satisfied.

**[END:TAG:CONSTRAINT_BUNDLE]**

---

## 3. CORE CONSTRAINT TYPES

**[TAG:CONSTRAINT_TYPES] [TAG:SYMMETRY] [TAG:ATTACH] [TAG:NOTCH] [TAG:CURVATURE] [TAG:CLEARANCE]**

### **3.1 SymmetryConstraint**

**Purpose:** Enforce symmetry for hulls, wings, many buildings.

**Type Definition:**

```typescript
type SymmetryConstraint = {
  kind: "symmetry";
  plane: { n:[number,number,number], d:number }; // plane equation n·x = d
  scope: { memberTypes?: string[]; stringerKs?: number[]; ribIs?: number[] };
  mode: "mirror" | "average" | "lockSide";
  toleranceM: number;
};
```

**Modes:**

- **mirror:** Reflect across plane (e.g., X=0)
- **average:** Enforce bilateral smoothing by averaging paired points
- **lockSide:** Treat one side as authoritative, derive the other

**Implementation Idea:**

For each rib contour vertex p, compute mirror p'

Find paired vertex by "same station + same angle/fraction key"

Apply mode:
- **mirror:** Replace opposite side
- **average:** Set both to midpoint
- **lockSide:** Only update the non-authoritative side

Emit diagnostic if pairing fails above tolerance.

### **3.2 AttachConstraint**

**Purpose:** Make internal anatomy "real" - stringer ↔ rib ↔ hardpoint connections.

**Examples:**
- Stringer must pass through rib at a notch position
- Mast step hardpoint must sit on a reinforced rib
- Centerboard trunk walls must attach to cockpit rim

**Type Definition:**

```typescript
type AttachConstraint = {
  kind: "attach";
  a: { type:"node"|"edge"; id:string };
  b: { type:"node"|"edge"; id:string };
  mode: "coincident" | "project" | "offsetAlongNormal";
  offsetM?: number;
  stiffness?: number;             // if you later run relaxation (optional)
  toleranceM: number;
};
```

**Deterministic Implementation:**

- **project:** Move a onto closest point of b (or onto b's plane)
- Update only the minimal degrees of freedom (usually along rib plane normal or along stringer direction)
- If beyond tolerance, emit a diagnostic rather than silently deforming

### **3.3 NotchSlotConstraint**

**Purpose:** Auto joinery - the killer feature for ribs/stringers, boat frames, wing ribs, house framing, etc.

**Goal:** Where a stringer crosses a rib, cut a notch in the rib and optionally flatten/seat the stringer.

**Type Definition:**

```typescript
type NotchSlotConstraint = {
  kind: "notchSlot";
  ribId: string;                  // rib ring / rib plate asset id
  stringerId: string;             // stringer edge id
  notch: {
    widthM: number;               // usually stringer member width + clearance
    depthM: number;               // how far into rib
    clearanceM: number;           // tolerance
    shoulderM?: number;           // optional fillet/rounding
    orientation: "alongStringer" | "alongRibNormal";
  };
  mode: "cutRibOnly" | "cutBoth" | "cutRibAndSeatStringer";
};
```

**How It Works (Deterministic):**

1. Compute intersection point X between stringer spline and rib plane
2. Build notch frame:
   - t = stringer tangent at X
   - n = rib plane normal
   - b = t × n
3. In rib local 2D plane coordinates, carve out a rectangle (or rounded rect) centered at X with width = notch.width, depth = notch.depth
4. Emit:
   - A "boolean subtract" record in rib plate asset metadata, OR
   - Remove/adjust rib ring segments if you're using member edges

**Best Practice:**

- Keep "cut geometry" in a separate assets layer so the structural graph stays clean
- Always emit a notch diagnostic overlay line (rectangle outline) for visibility

### **3.4 CurvatureConstraint**

**Purpose:** Avoid kinks, control fairness for hull sheer lines, chines, wings, ducts, cables—any spline.

**Type Definition:**

```typescript
type CurvatureConstraint = {
  kind: "curvature";
  targetEdgeIds: string[];
  maxCurvature?: number;          // 1/m
  minRadius?: number;             // m
  maxTurnPerMeterDeg?: number;
  smoothing: {
    method: "laplacian" | "fairing";
    iterations: number;
    strength: number;             // 0..1
    lockEndpoints: boolean;
    lockStations?: boolean;       // don't move station anchors
  };
};
```

**Deterministic Smoothing:**

1. Resample spline to fixed param count
2. Apply fairing iterations (same count every time)
3. Re-fit spline or update control points
4. Never "free drift": lock endpoints / locked ribs

### **3.5 ClearanceConstraint**

**Purpose:** Keep pipes away from stringers, keep rudder fittings clear, etc. Used for MEP + internal structure.

**Type Definition:**

```typescript
type ClearanceConstraint = {
  kind: "clearance";
  moverEdgeIds: string[];         // edges allowed to shift
  obstacleVolumes: { kind:"aabb"|"sdfProxy"; id:string; inflateM:number }[];
  minClearM: number;
  mode: "reroute" | "nudge" | "error";
};
```

**Mode Behavior:**

- **For MEP:** mode typically reroute
- **For a stringer:** mode often error (you want to adjust design knobs instead)

### **3.6 MinThicknessConstraint**

**Purpose:** Ensure minimum material thickness for structural integrity.

**Type Definition:**

```typescript
type MinThicknessConstraint = {
  kind: "minThickness";
  targetEdgeIds: string[];
  minThicknessM: number;
  mode: "error" | "inflate";
};
```

### **3.7 SnapToStationConstraint**

**Purpose:** Snap elements to specific station positions for alignment.

**Type Definition:**

```typescript
type SnapToStationConstraint = {
  kind: "snapToStation";
  targetIds: string[];
  stationS: number;               // station position (0..1 or meters)
  toleranceM: number;
};
```

**[END:TAG:CONSTRAINT_TYPES]**

---

## 4. CONSTRAINT SOLVER STRATEGY

**[TAG:CONSTRAINT_SOLVER] [TAG:DETERMINISTIC]**

### **4.1 Ordered Deterministic Passes**

**You don't need a full nonlinear solver at first. Use ordered deterministic passes:**

**Pass A: Snap + Attach**
- Project nodes/anchors onto targets

**Pass B: Joinery**
- Cut notches/slots

**Pass C: Fairing**
- Curvature smoothing (stringers first, then ribs)

**Pass D: Validate**
- Collisions, thickness, symmetry mismatch, clearance

### **4.2 Constraint Failure Handling**

**If a constraint can't be satisfied:**

- Do not half-apply
- Emit a diagnostic and stop that constraint
- This makes the system trustworthy

**Diagnostic Format:**

```typescript
{
  id: "D_CONSTRAINT_FAILURE_symmetry_hull_rib_12",
  severity: "error",
  category: "constraint",
  code: "CONSTRAINT_FAILURE",
  message: "Symmetry constraint failed: pairing tolerance exceeded at rib 12",
  refs: {
    graphId: "hull_structure_v1",
    constraintId: "symmetry_hull",
    affectedIds: ["RIB:hull:i12", "RIB:hull:i12_mirror"]
  },
  measure: {
    tolerance: 0.005,
    actual: 0.012,
    unit: "m"
  }
}
```

### **4.3 Deterministic Execution Order**

**Constraint bundles are applied in order:**

1. Sort bundles by `order` field
2. For each bundle:
   - Sort constraints by type (Snap → Attach → Notch → Curvature → Clearance)
   - Apply each constraint deterministically
   - Collect diagnostics
3. If any constraint fails, continue with remaining constraints but mark bundle as partially applied

**[END:TAG:CONSTRAINT_SOLVER]**

---

## 5. SVG 2D CONTROL SURFACE MAPPING

**[TAG:SVG_CONTROL] [TAG:PARAMFIELDS] [TAG:2D_EDITING]**

### **5.1 Key Concept: 2D Edits Modify Fields, Not Vertices**

**You never drag a mesh vertex. You drag:**

- A station curve
- A profile curve
- An anchor handle (keel point, chine, sheer)
- A "mask" region for additions/subtractions (cockpit cutout)

**These edits update a ParamField, then you regenerate ribs/stringers deterministically.**

### **5.2 Minimal ParamField Model**

**Use fields indexed by station s (0..1 or meters):**

```typescript
type Field1D = { 
  knots:number[]; 
  values:number[]; 
  interp:"cubic"|"linear"; 
  clamp?:[number,number] 
};

type HullFields = {
  beam: Field1D;          // width
  depth: Field1D;         // V depth / hull depth
  rocker: Field1D;        // keel line vertical offset
  bowTaper: Field1D;      // taper power/strength
  sternTaper: Field1D;

  chineSharpness: Field1D;
  sheerDrop: Field1D;     // deck line
  bowLift: Field1D;
  sternDeckDrop: Field1D;

  // etc—your 100 "adjustments" are just fields + derived formulas
};
```

**Then define derived geometry for a rib station:**

- Rib contour is generated from these fields (or used to bias SDF slice)
- **This is the secret: the "100 sliders" become a handful of editable curves**

### **5.3 Orthographic View Mapping**

**Coordinate Spaces:**

- **World:** 3D
- **View plane:** 2D (SVG space)

**Each ortho view has a fixed projection:**

**Top view:**
- u = x, v = z

**Side view:**
- u = x, v = y

**Front view:**
- u = z, v = y (or x,y depending convention)

**You render:**
- Spine curve
- Station lines
- Key stringers (keel/chine/sheer)
- Rib silhouettes (optional)

### **5.4 Handle Types (Few, Powerful)**

**Station handle:** Drag a point on a curve at station s

**Curve segment handle:** Edit tangent/Bezier control for smoothness

**Region handle:** Move/scale a cockpit cutout rectangle/rounded shape

**Angle handles:** Set chine/shear directions as rays

### **5.5 Inverse Mapping: From Dragged 2D Point to Field Updates**

**When user drags a handle in a view:**

1. Convert SVG point → world plane coordinates (inverse of projection)
2. Determine what it controls:
   - If it's a "keel point at station s": update rocker(s)
   - If it's "beam at station s": update beam(s) from half-width
   - If it's "sheer line": update sheerDrop(s) etc.

**Example: Editing beam in top view**

Handle represents half-beam at station s:

- Spine point at station: C(s) in XZ
- User drags to point P in XZ
- beam(s) = 2 * distance_perp_to_spine(P, C(s), tangentXZ(s))
- Clamp to > 0

**Example: Rocker in side view**

Handle is keel height at station:

- User drags y
- rocker(s) = y - baseline(s) (or absolute y)

**Example: Bow taper power**

Instead of a slider, you edit the shape of a bow profile curve:

- Handle is a Bezier control that controls bowTaper(s) function
- Constraints enforce monotonicity near bow

### **5.6 Fast Feedback Loop**

**On drag:**

1. Update Field knot(s) (local, not global)
2. Rebuild only affected stations:
   - Ribs near station s (plus neighbors for smoothing)
   - Stringer spline segments crossing those ribs
3. Recompute constraints only locally:
   - Notch updates at those ribs
   - Curvature check on stringers
4. Update overlays + diagnostics

**This gives you real-time "grab hull and lift" behavior without recomputing the entire world.**

**[END:TAG:SVG_CONTROL]**

---

## 6. CONSTRAINT-AWARE HANDLES

**[TAG:CONSTRAINT_AWARE] [TAG:CAD_UX]**

### **6.1 Professional CAD Tool Feel**

**The one addition that makes it feel like a professional CAD tool:**

**Constraint-aware handles:** When a handle is dragged into an invalid region, you don't block it—you show:

- Visual feedback (red outline, warning icon)
- Diagnostic message
- Suggested valid range
- Option to override (with diagnostic)

**This makes the system feel responsive while maintaining correctness.**

### **6.2 Constraint-Aware Handle Behavior**

**When a handle is dragged into an invalid region, you don't block it—you show:**

- A ghost preview
- The diagnostics that would result
- Optionally "snap to nearest valid" if the user holds a modifier

**That's how you keep creativity fluid and maintain correctness.**

### **6.3 Handle Validation**

**During drag:**

1. Compute proposed field update
2. Validate against constraints:
   - Symmetry (if applicable)
   - Curvature limits
   - Clearance requirements
   - MinThickness
3. If invalid:
   - Show visual feedback (ghost preview)
   - Show diagnostics that would result
   - Allow drag but mark as invalid
4. On release:
   - If invalid, snap to nearest valid position OR
   - Keep invalid position but emit persistent diagnostic

**[END:TAG:CONSTRAINT_AWARE]**

---

## 7. INTEGRATION POINTS

**[TAG:INTEGRATION] [TAG:SYSTEM_BOUNDARIES]**

### **7.1 Workflow**

**How constraints and SVG authoring connect cleanly:**

**Workflow:**

1. SVG edits update ParamFields
2. Operators use ParamFields to generate ribs/stringers + cutouts
3. ConstraintBundles enforce physical plausibility (fairness, symmetry, clearance, joinery)
4. Patch system stores any manual exceptions (rare)

### **7.2 What You Store (Tiny, Stable)**

- ParamFields (curves)
- ConstraintBundles
- PatchOps (exceptions)

**Everything else is generated.**

### **7.3 Integration with Other Systems**

**Operators:**
- Operators generate base GraphSpec
- Constraints modify GraphSpec deterministically
- Patch system applies user edits

**Diagnostics:**
- Constraints emit diagnostics when they fail
- Diagnostic overlays show constraint violations
- Buildability scores include constraint satisfaction

**Compiler:**
- Constraints applied before compilation
- Compiler receives constraint-satisfied GraphSpec
- Diagnostics included in output bundle

**[END:TAG:INTEGRATION]**

---

## 8. FILE DEPENDENCY GRAPH

**[TAG:FILE_DEPENDENCIES] [TAG:ARCHITECTURE]**

### **8.1 Core Constraint Files**

```
constraints/
  ConstraintBundle.ts           # ConstraintBundle schema
  SymmetryConstraint.ts         # Symmetry constraint implementation
  AttachConstraint.ts           # Attach constraint implementation
  NotchSlotConstraint.ts        # Notch/slot constraint implementation
  CurvatureConstraint.ts        # Curvature constraint implementation
  ClearanceConstraint.ts        # Clearance constraint implementation
  MinThicknessConstraint.ts     # MinThickness constraint implementation
  SnapToStationConstraint.ts    # SnapToStation constraint implementation
  ConstraintSolver.ts           # Ordered pass solver
```

### **8.2 ParamField System**

```
fields/
  ParamField.ts                 # Field1D type and evaluation
  HullFields.ts                  # HullFields type
  FieldEvaluator.ts              # Field evaluation contract
  FieldUpdater.ts                # Inverse mapping: SVG → fields
```

### **8.3 SVG Control Surface**

```
svg/
  SVGControlSurface.ts          # SVG 2D editing interface
  ViewMapping.ts                # Orthographic view mapping
  HandleSystem.ts               # Handle types and validation
  InverseMapping.ts             # SVG → field updates
```

**[END:TAG:FILE_DEPENDENCIES]**

---

## 9. RELATIONSHIP MATRIX

**[TAG:RELATIONSHIPS] [TAG:SYSTEM_MAP]**

### **9.1 System Relationships**

| System | Relationship | Purpose |
|--------|-------------|---------|
| Operators | Consumes base GraphSpec | Generates initial structure |
| ConstraintBundles | Modifies GraphSpec | Enforces physical plausibility |
| Patch Engine | Applies user edits | Stores manual exceptions |
| Diagnostics | Validates constraints | Reports constraint failures |
| Compiler | Receives final GraphSpec | Compiles to meshes/colliders |
| ParamFields | Drives operators | Provides field-based editing |
| SVG Control | Updates ParamFields | 2D editing interface |

### **9.2 Data Flow**

```
ParamFields → Operators → BaseGraph → ConstraintBundles → ConstrainedGraph → Patch → FinalGraph → Compiler → Outputs
                ↓                                                                    ↓
         SVG Control Surface                                                  Diagnostics
```

### **9.3 Key Principles**

**Determinism:**
- Constraints applied in fixed order
- Same inputs → same constraint results
- No randomness in constraint application

**Trustworthiness:**
- Never half-apply constraints
- Always emit diagnostics on failure
- System remains predictable

**Composability:**
- Constraints are small, composable units
- ConstraintBundles group related constraints
- Order matters for deterministic results

**Performance:**
- Local constraint updates (only affected regions)
- Fast feedback loop (real-time editing)
- Incremental validation

**[END:TAG:RELATIONSHIPS]**

---

## 📋 SUMMARY

This system map documents the complete Constraint Bundles System, including:

- **7 Core Constraint Types:** Symmetry, Attach, NotchSlot, Curvature, Clearance, MinThickness, SnapToStation
- **Constraint Solver Strategy:** Ordered deterministic passes (Snap → Joinery → Fairing → Validate)
- **SVG 2D Control Surface:** ParamField model, orthographic view mapping, inverse mapping
- **Constraint-Aware Handles:** Professional CAD tool feel with real-time validation
- **Integration:** Clean workflow from SVG edits → ParamFields → Operators → Constraints → Compiler

**Total Document Size:** ~1,200+ lines  
**Source:** modelmaker.txt Lines 7822-8221+  
**Status:** Complete system mapping with all constraint types, algorithms, and integration details extracted

---

*MASTER CONSTRAINT BUNDLES SYSTEM MAP*  
*Complete S.A.M. documentation for Constraint Bundles System*  
*Version 1.0.0 | Date: 2025-01-27*



---


---

<!-- AUTO-GENERATED FROM: MASTER_PARAMFIELDS_SYSTEM_MAP.md -->
<!-- DO NOT EDIT THIS SECTION DIRECTLY -->
<!-- Source File: MASTER_PARAMFIELDS_SYSTEM_MAP.md -->
<!-- File Size: 25725 bytes -->

<a id='paramfields-system-map'></a>

# MASTER PARAMFIELDS SYSTEM MAP
**Complete System Anatomy Mapping - ParamFields System (Replaces "slider hell" with field-based editing)**

**Date:** 2025-01-27  
**Version:** 1.0.0  
**Purpose:** Complete S.A.M. documentation for ParamFields System (modelmaker.txt ParamFields spec)  
**Status:** PHASE 1 - Foundation System Mapping  
**System:** Lucid Image Editor - Universal Parametric Asset Engine  
**Reference:** modelmaker.txt ParamFields System spec (Lines 8203-8948+)

---

## 📋 TABLE OF CONTENTS

1. [System Overview](#1-system-overview)
2. [Canonical Station Axis](#2-canonical-station-axis)
3. [Minimal HullFields Set](#3-minimal-hullfields-set)
4. [Shape Function: Fields → Station Contour](#4-shape-function-fields--station-contour)
5. [Cockpit & Trunk Integration](#5-cockpit--trunk-integration)
6. [SVG Authoring: Handle System](#6-svg-authoring-handle-system)
7. [Station Scrubber](#7-station-scrubber)
8. [Deterministic Local Field Updates](#8-deterministic-local-field-updates)
9. [Integration with Ribs/Stringers + Constraints](#9-integration-with-ribsstringers--constraints)
10. [Laser Hull Template Example](#10-laser-hull-template-example)
11. [Integration Points](#11-integration-points)
12. [File Dependency Graph](#12-file-dependency-graph)
13. [Relationship Matrix](#13-relationship-matrix)

---

## 1. SYSTEM OVERVIEW

**[TAG:OVERVIEW] [TAG:PARAMFIELDS]**

### **What is the ParamFields System?**

**The secret: the "100 sliders" become a handful of editable curves. This replaces "slider hell" with field-based editing.**

**Location:** ParamFields System defined in modelmaker.txt (Lines 8203-8948+)  
**Purpose:** Provide field-based parametric control system using 1D curves (Field1D) indexed by station parameter s  
**Core Principle:** 2D edits modify fields, not vertices. Fields generate geometry deterministically.

### **Key Features**

**Minimal field set:**
- 15-20 fields (curves) replace 100+ sliders
- 2-3 region masks for subtractions/additions
- Handful of scalars
- Everything else is derived

**Canonical station axis:**
- Parameter s ∈ [0,1] (bow→stern)
- Physical length L (meters)
- Deterministic station positions
- Stable station IDs

**Shape function:**
- Fields → station contour generation
- Universal cross-section generation
- Deterministic geometry from fields

**SVG 2D control surface:**
- Top view (planform, beam/tapers)
- Side view (rocker, deck sheer)
- Front view (V shape, chine, deck crown)
- Station scrubber for surgical editing

**Deterministic updates:**
- Handle drags update field knots locally
- No ambiguity in field → geometry mapping
- Fast feedback loop (local rebuilds only)

### **What This System Provides**

**Field-based editing:**
- ParamFields (curves) stored as stable data
- SVG handles edit curves, not vertices
- Real-time geometry regeneration

**Professional workflow:**
- Station-based editing (surgical control)
- Multi-view editing (Top/Side/Front)
- Constraint-aware handles

**Universal foundation:**
- Same field model works for hulls, wings, buildings, vehicles
- Extensible field sets
- Composable with operators and constraints

**[END:TAG:OVERVIEW]**

---

## 2. CANONICAL STATION AXIS

**[TAG:STATION_AXIS] [TAG:DETERMINISTIC]**

### **2.1 Station Parameter Definition**

**Define a hull axis parameter s ∈ [0,1] where:**
- s=0: bow tip
- s=1: stern transom

**Physical length L (meters):**
- Laser LOA ~4.23m, but keep it adjustable
- World coordinates:
  - x = s * L
  - z = 0 on centerline
  - y vertical

### **2.2 Spine Curve (Centerline in XZ)**

**Simplest:** Straight line along X

**Later:** Allow slight planform curvature if desired

### **2.3 Station Positions**

**Use an integer index i for deterministic ribs:**
- s_i = i/(N-1)
- OR x_i = phase + i*dx

**Recommended: Nonuniform density (more near bow + cockpit edges) but still deterministic:**

Use a remap function s = f(t) where t is uniform, f is a fixed curve you can edit.

**Example "bow dense" remap:**
- s = t^p near bow with p<1 (e.g., 0.6), then blend back to linear

### **2.4 Station IDs**

**Stable station IDs:**
```
RIB:laserHull:i{i}:s{fmt(s_i)}
```

**This is stable across rebuilds if N and remap are stable.**

**Key:** Deterministic station positions ensure stable IDs for selection, history, and overrides.

**[END:TAG:STATION_AXIS]**

---

## 3. MINIMAL HULLFIELDS SET

**[TAG:HULLFIELDS] [TAG:FIELD1D] [TAG:MINIMAL_SET]**

### **3.1 Field1D Type Definition**

```typescript
type Field1D = { 
  knots:number[]; 
  values:number[]; 
  interp:"cubic"|"linear"; 
  clamp?:[number,number] 
};
```

**Key Properties:**
- **knots:** Station parameter values (s ∈ [0,1])
- **values:** Field values at each knot
- **interp:** Interpolation method (cubic or linear)
- **clamp:** Optional value bounds

### **3.2 HullFields Type Definition**

```typescript
type HullFields = {
  // Primary shape fields (top-level)
  beam: Field1D;          // overall width at deck edge / sheer reference
  depth: Field1D;         // vertical depth from deck reference to keel reference
  rocker: Field1D;        // keel baseline vertical offset along the hull (controls "banana")
  
  // Bow/stern taper & tip shaping
  bowTaper: Field1D;      // how quickly beam collapses near bow
  sternTaper: Field1D;    // how quickly beam collapses near stern
  tipRound: Field1D;      // controls bow tip rounding & front-V edge becoming rounded into the bow cap
  
  // V-hull / bottom shape controls
  vDepth: Field1D;        // how deep the V is (keel ridge depth)
  vSharp: Field1D;        // how sharp the V crease is (keel/chine sharpness)
  chinePos: Field1D;      // where the chine sits laterally as fraction of half-beam (0..1)
  chineSoft: Field1D;     // how rounded the chine is (hard to soft transition)
  
  // Deck / lip / sheer edge behavior
  deckCrown: Field1D;     // how domed the deck is across centerline
  deckEdgeRadius: Field1D; // rounded deck edge radius
  deckLipOverhang: Field1D; // bottom lip overhang amount
  deckLipSharp: Field1D;  // sharpness of the underside edge where lip meets hull side
  
  // Cockpit + trunk (subtractions/additions)
  cockpitRimRadius: Field1D; // rounding where subtraction meets deck
};
```

### **3.3 Primary Shape Fields (Top-Level)**

**These three give you 80% of hull feel:**

- **beam(s):** Overall width at deck edge / sheer reference
- **depth(s):** Vertical depth from deck reference to keel reference
- **rocker(s):** Keel baseline vertical offset along the hull (controls "banana")

### **3.4 Bow/Stern Taper & Tip Shaping**

- **bowTaper(s):** How quickly beam collapses near bow
- **sternTaper(s):** How quickly beam collapses near stern
- **tipRound(s):** Controls bow tip rounding & front-V edge becoming rounded into the bow cap
- **tipLength:** Controls "point length" (how long the very sharp part persists) - scalar

### **3.5 V-Hull / Bottom Shape Controls**

- **vDepth(s):** How deep the V is (keel ridge depth)
- **vSharp(s):** How sharp the V crease is (keel/chine sharpness)
- **chinePos(s):** Where the chine sits laterally as fraction of half-beam (0..1)
- **chineSoft(s):** How rounded the chine is (hard to soft transition)

### **3.6 Deck / Lip / Sheer Edge Behavior**

- **deckCrown(s):** How domed the deck is across centerline
- **deckEdgeRadius(s):** Rounded deck edge radius
- **deckLipOverhang(s):** Bottom lip overhang amount
- **deckLipSharp(s):** Sharpness of the underside edge where lip meets hull side

### **3.7 Cockpit + Trunk (Subtractions/Additions)**

**These are best handled as 2D region shapes along s rather than a bunch of fields:**

- **cockpitMask:** A 2D function in (s, lateral) describing where to subtract
- **cockpitRimRadius(s):** Rounding where subtraction meets deck
- **trunkMask:** Region for centerboard trunk cut (and the "step" support)
- **trunkStepAngle + trunkStepHeight:** Few scalars

### **3.8 Local Feature Anchors (Hardpoints)**

**hardpoints array:** Rudder gudgeons, hiking strap points, traveler eyes, block anchors, etc.

### **3.9 Summary: Your "100 Adjustments" Become:**

- **15-20 fields (curves)**
- **2-3 region masks**
- **A handful of scalars**

**And the rest are derived.**

**[END:TAG:HULLFIELDS]**

---

## 4. SHAPE FUNCTION: FIELDS → STATION CONTOUR

**[TAG:SHAPE_FUNCTION] [TAG:CONTOUR_GENERATION]**

### **4.1 Overview**

**At each station s you want a cross-section contour in the local rib plane (YZ plane if spine is X).**

**We'll define a half-section z ≥ 0 and mirror.**

### **4.2 Basic Definitions**

**Let:**
- half-beam B = 0.5*beam(s) * taperFactor(s)
- total depth D = depth(s)
- keel baseline Yk = rocker(s) (more negative = deeper)

### **4.3 Taper Factor**

**Use a blend:**

- **bow factor Tb(s):** Strong near 0
- **stern factor Ts(s):** Strong near 1

**Example:**
```
Tb = smoothstep(0, sbow, s) ^ bowTaperPower
Ts = smoothstep(1, 1-sstern, s) ^ sternTaperPower
```

**Then:**
```
taperFactor = min(Tb, Ts) or multiply them depending how you want
```

### **4.4 Bottom V and Chine**

**Define a lateral coordinate u ∈ [0,1] where:**
- z = u*B

**Keel ridge height (bottom center) at that station:**
- yKeel = Yk - vDepth(s)

**Chine location:**
- uC = clamp(chinePos(s), 0.1, 0.95)

**Define bottom shape as a blend between:**
- V ridge near center
- Flatter (or round) near chine
- Then sidewall to deck

**A clean universal approach:**

Piecewise curve in u with smooth blending (no hard kinks unless you want them)

**Bottom profile function yBottom(u):**

- **near center:** V-like: y = yKeel + (u/uC)^p * (D*bottomRise) where p from vSharp(s)
- **near chine:** Blend to a softer curve using chineSoft(s)

### **4.5 Sidewall and Deck Crown**

**Define deck reference height:**
- yDeck = Yk + (D) (or you choose a global deck datum and compute depth accordingly)

**Sidewall curve from chine to sheer:**
- Controlled by deckLipOverhang and edge radius

**Deck crown across center:**
- yDeckCenter = yDeck + deckCrown(s)
- Use a gentle dome to meet deck edge radius

### **4.6 Bow Tip Rounding**

**Near bow, the V ridge and chine crease should soften and transition into a rounded nose cap:**

- Increase deckEdgeRadius and chineSoft
- Reduce vSharp
- Increase tipRound effect

**This is where your tipRound(s) and tipLength control the "front V edge becomes rounded as it connects to top hull rounded bow."**

**[END:TAG:SHAPE_FUNCTION]**

---

## 5. COCKPIT & TRUNK INTEGRATION

**[TAG:COCKPIT_TRUNK] [TAG:BOOLEAN]**

### **5.1 Approach: Boolean, But Friendly**

**You do not want cockpit as 50 fields. You want:**

- Cockpit region mask in top view (s vs z)
- Depth profile for cockpit floor and rim radius

### **5.2 CockpitMask in (s,z)**

**Define an editable 2D shape in SVG top view:**

- A rounded rectangle / spline polygon
- With param edges anchored to stations

**Then cockpit subtraction is:**

- Subtract volume under deck where (s,z) is inside mask
- Rim radius uses cockpitRimRadius(s) to round the subtraction boundary

### **5.3 TrunkMask + Step Support**

**Trunk is basically:**

- Subtract a narrow slot through hull
- Add a stepped wedge volume in the cockpit front

**This is perfect for your "middleman" approach:**

- trunk slot = subtract prism with rounded corners
- step support = add wedge with angle + height, blended with radius

**IDs:**
- CUT:cockpit
- CUT:trunkSlot
- ADD:trunkStep

**[END:TAG:COCKPIT_TRUNK]**

---

## 6. SVG AUTHORING: HANDLE SYSTEM

**[TAG:SVG_AUTHORING] [TAG:HANDLES] [TAG:MULTI_VIEW]**

### **6.1 Top View SVG (x vs z)**

**This controls planform and beam/tapers.**

**Show:**
- Centerline
- Sheer outline (deck edge)
- Chine outline (optional)
- Cockpit mask outline
- Trunk mask outline
- Station tick marks

**Handles:**
- **Sheer curve (half outline):** Edits beam(s) + bowTaper(s) + sternTaper(s)
  - Drag at station → sets beam(s) locally
- **Chine curve:** Edits chinePos(s) (optional but powerful)
- **Bow tip handle:** Edits tipLength + tipRound influence zone
- **Cockpit outline handles:** Shape the cockpit mask directly
- **Trunk slot outline:** Edits trunk mask width/position

**Top view alone gives you the majority of "it looks like a Laser."**

### **6.2 Side View SVG (x vs y)**

**This controls rocker, deck sheer drop, cockpit depth profile.**

**Show:**
- Keel line
- Deck sheer line
- Cockpit floor profile (optional)
- Bow lift, stern deck drop (implicitly)

**Handles:**
- **Keel curve:** Edits rocker(s) (primary)
- **Deck line curve:** Edits depth(s) and/or sheerDrop (if separate)
- **Bow lift handle:** Edits bowLift influence (often just a local edit of rocker + depth)
- **Cockpit floor curve:** Edits cockpit subtraction depth over s
- **Transom corner:** Stern deck drop / transom shaping

### **6.3 Front View SVG (z vs y)**

**This controls V shape, chine sharpness, deck crown.**

**Show:**
- Cross-section at currently selected station (scrub station slider or click station)
- Keel ridge / V
- Chine point
- Deck crown arc
- Deck lip/overhang indicator

**Handles:**
- **V depth:** Drag keel point down/up → vDepth(s) at that station
- **V sharpness:** Tangent handle on V curve → vSharp(s)
- **Chine position:** Drag chine point out/in → chinePos(s)
- **Chine softness:** Radius handle near chine → chineSoft(s)
- **Deck crown:** Drag crown apex → deckCrown(s)
- **Deck edge radius / lip:** Small handles near sheer edge

**This view is where you "dial" the hydrodynamics and the Laser's distinctive bottom feel.**

**[END:TAG:SVG_AUTHORING]**

---

## 7. STATION SCRUBBER

**[TAG:STATION_SCRUBBER] [TAG:UI]**

### **7.1 Station Scrub Control**

**You need a "station scrub" control:**

- Click any station on top/side view
- It highlights that station
- Front view shows that cross-section
- Edits in front view write to field values at that station (local knot update)

**This makes the workflow intuitive and surgical.**

### **7.2 Workflow**

**Multi-view editing workflow:**

1. **Top/Side view:** Select station by clicking
2. **Station highlights:** Visual feedback of selected station
3. **Front view updates:** Shows cross-section at selected station
4. **Edit in front view:** Drag handles to modify fields at that station
5. **Local updates:** Only field knots at that station are modified
6. **Real-time feedback:** Geometry updates immediately

**[END:TAG:STATION_SCRUBBER]**

---

## 8. DETERMINISTIC LOCAL FIELD UPDATES

**[TAG:FIELD_UPDATES] [TAG:DETERMINISTIC] [TAG:INVERSE_MAPPING]**

### **8.1 Update Algorithm**

**When you drag a handle at station s*:**

1. Find nearest knot or insert a knot at s*
2. Update that knot value
3. Optionally apply a local smoothing kernel to neighboring knots (user-controlled)

### **8.2 Example: Update beam(s) from top-view drag**

**User drags sheer point to zNew:**
```
beam(s*) = 2*|zNew|
clamp + smooth
```

### **8.3 Example: Update rocker(s) from side-view drag**

**User drags keel point to yNew:**
```
rocker(s*) = yNew
```

### **8.4 Example: Update chinePos(s) from front view**

**User drags chine point to zNew:**
```
chinePos(s*) = zNew / B(s*)
```

**All deterministic. No ambiguity.**

### **8.5 Fast Feedback Loop**

**On drag:**

1. Update Field knot(s) (local, not global)
2. Rebuild only affected stations:
   - Ribs near station s (plus neighbors for smoothing)
   - Stringer spline segments crossing those ribs
3. Recompute constraints only locally:
   - Notch updates at those ribs
   - Curvature check on stringers
4. Update overlays + diagnostics

**This gives you real-time "grab hull and lift" behavior without recomputing the entire world.**

**[END:TAG:FIELD_UPDATES]**

---

## 9. INTEGRATION WITH RIBS/STRINGERS + CONSTRAINTS

**[TAG:INTEGRATION] [TAG:RIBS_STRINGERS] [TAG:CONSTRAINTS]**

### **9.1 Suggested Ribs/Stringers for Laser Hull**

**Ribs:** Bulkheads/stations every ~0.08–0.12m, denser near bow/cockpit

**Stringers (minimum):**
- Keel stringer
- Chine stringer (port/starboard)
- Sheer stringer (deck edge)
- Optional intermediate stringers for stiffness/LOD

### **9.2 Constraint Bundles (Laser)**

- **symmetry:** Across z=0
- **curvature fairness:** On keel + sheer
- **notch/slot:** Where stringers cross ribs (if you build internal structure)
- **clearance:** Trunk slot must not collide with keel ridge
- **min thickness:** Deck lip + hull skin thickness

### **9.3 Workflow**

**How ParamFields integrate with operators and constraints:**

1. **SVG edits update ParamFields**
2. **Operators use ParamFields to generate ribs/stringers + cutouts**
3. **ConstraintBundles enforce physical plausibility (fairness, symmetry, clearance, joinery)**
4. **Patch system stores any manual exceptions (rare)**

### **9.4 What You Store (Tiny, Stable)**

- ParamFields (curves)
- ConstraintBundles
- PatchOps (exceptions)

**Everything else is generated.**

**[END:TAG:INTEGRATION]**

---

## 10. LASER HULL TEMPLATE EXAMPLE

**[TAG:EXAMPLE] [TAG:TEMPLATE] [TAG:CONCRETE]**

### **10.1 Overview**

**Below is a paste-ready first-pass Laser hull template: fields + masks + a couple scalars. It's intentionally "close but tunable" and, more importantly, it's shaped so your SVG handles feel right (no weird coupling/jitter). Numbers are reasonable starting points, not a claim of exact class-legal geometry.**

### **10.2 Conventions Used**

- **Hull axis:** s ∈ [0,1], bow→stern
- **Length L:** In meters
- **Coordinate:** x = s*L, z is half-breadth (starboard is +z), y vertical (up is +y)
- **beam(s):** Full width (meters)
- **depth(s):** Deck-at-sheer to keel (meters, positive)
- **rocker(s):** Keel Y (meters, negative down), relative to y=0 at sheer line reference (you can rebase if you prefer)

### **10.3 Template Structure**

```json
{
  "partId": "laserHull_v0",
  "units": "m",
  "length": 4.23,
  
  "stationing": {
    "mode": "count_with_remap",
    "count": 81,
    "remap": { "kind": "power_blend", "bowPower": 0.60, "sternPower": 0.85, "blend": 0.45 },
    "phaseM": 0.0,
    "snapM": 0.001
  },
  
  "fields": {
    "beam": {
      "interp": "cubic",
      "clamp": [0.05, 1.60],
      "knots":  [0.00, 0.06, 0.14, 0.30, 0.55, 0.78, 0.92, 1.00],
      "values": [0.00, 0.22, 0.70, 1.18, 1.39, 1.18, 0.62, 0.00]
    },
    
    "depth": {
      "interp": "cubic",
      "clamp": [0.05, 0.80],
      "knots":  [0.00, 0.08, 0.20, 0.45, 0.70, 0.88, 1.00],
      "values": [0.10, 0.24, 0.42, 0.50, 0.46, 0.34, 0.20]
    },
    
    "rocker": {
      "interp": "cubic",
      "clamp": [-1.50, 0.20],
      "knots":  [0.00, 0.10, 0.30, 0.55, 0.78, 0.92, 1.00],
      "values": [-0.10, -0.14, -0.22, -0.26, -0.22, -0.16, -0.12]
    },
    
    // ... (additional fields: bowTaper, sternTaper, tipRound, vDepth, vSharp, chinePos, chineSoft, deckCrown, deckEdgeRadius, deckLipOverhang, deckLipSharp, cockpitRimRadius)
  },
  
  "scalars": {
    "tipLengthM": 0.26,
    "bowLiftAmp": 0.00,
    "sternDeckDropAmp": 0.00
  },
  
  "masks": {
    "cockpitMask": {
      "space": "topView_norm",
      "meaning": "region in (s,zNorm) to subtract downward from deck",
      "zNormRef": "halfBeamAtS",
      "shape": {
        "kind": "roundedPolygon",
        "cornerRadiusNorm": 0.10,
        // ... (cockpit mask shape definition)
      }
    },
    
    "trunkMask": {
      // ... (trunk mask definition)
    }
  }
}
```

### **10.4 Key Features of Template**

**Stationing:**
- 81 stations total
- Nonuniform density (bow/stern dense)
- Power blend remapping
- Deterministic station positions

**Fields:**
- All fields use cubic interpolation
- Clamp bounds for each field
- Realistic knot distributions
- Values tuned for Laser hull feel

**Masks:**
- Cockpit mask in top view normalized space
- Trunk mask for centerboard slot
- Rounded polygon shapes
- Anchored to stations

**[END:TAG:EXAMPLE]**

---

## 11. INTEGRATION POINTS

**[TAG:INTEGRATION_POINTS] [TAG:SYSTEM_BOUNDARIES]**

### **11.1 Operators**

**Operators use ParamFields to generate ribs/stringers + cutouts:**
- Rib/Stringer Operator reads ParamFields
- Generates station contours from fields
- Creates ribs and stringers deterministically

### **11.2 ConstraintBundles**

**ConstraintBundles enforce physical plausibility:**
- Constraints operate on geometry generated from fields
- Field edits → geometry updates → constraints validate
- Symmetry, fairness, clearance constraints

### **11.3 SVG Control Surface**

**SVG edits update ParamFields:**
- Top/Side/Front views provide handles
- Handle drags update field knots
- Station scrubber for surgical editing

### **11.4 Compiler**

**Compiler receives final GraphSpec:**
- Fields → Operators → GraphSpec
- Constraints applied
- Compiler generates meshes/colliders

### **11.5 Diagnostics**

**Diagnostics validate field → geometry mapping:**
- Field value diagnostics
- Geometry quality diagnostics
- Constraint violation diagnostics

**[END:TAG:INTEGRATION_POINTS]**

---

## 12. FILE DEPENDENCY GRAPH

**[TAG:FILE_DEPENDENCIES] [TAG:ARCHITECTURE]**

### **12.1 Core ParamFields Files**

```
fields/
  ParamField.ts                 # Field1D type and evaluation
  HullFields.ts                  # HullFields type definition
  FieldEvaluator.ts              # Field evaluation contract
  FieldUpdater.ts                # Inverse mapping: SVG → fields
  StationAxis.ts                 # Station axis and remapping
  ShapeFunction.ts               # Fields → station contour generation
```

### **12.2 SVG Control Surface**

```
svg/
  SVGControlSurface.ts          # SVG 2D editing interface
  TopViewEditor.ts              # Top view (planform)
  SideViewEditor.ts             # Side view (rocker, sheer)
  FrontViewEditor.ts            # Front view (cross-section)
  StationScrubber.ts            # Station selection and highlighting
  HandleSystem.ts               # Handle types and drag handling
```

### **12.3 Integration Files**

```
operators/
  RibStringerOperator.ts        # Uses ParamFields to generate ribs/stringers
  
constraints/
  ConstraintBundles.ts          # Constraints operate on geometry from fields
  
compiler/
  GeometryCompiler.ts           # Compiles final GraphSpec to meshes
```

**[END:TAG:FILE_DEPENDENCIES]**

---

## 13. RELATIONSHIP MATRIX

**[TAG:RELATIONSHIPS] [TAG:SYSTEM_MAP]**

### **13.1 System Relationships**

| System | Relationship | Purpose |
|--------|-------------|---------|
| SVG Control | Updates ParamFields | 2D editing interface |
| ParamFields | Drives Operators | Provides field-based control |
| Operators | Generate Geometry | Create ribs/stringers from fields |
| ConstraintBundles | Validate Geometry | Enforce physical plausibility |
| Compiler | Receives GraphSpec | Compiles to meshes/colliders |
| Diagnostics | Validate System | Report errors/warnings |

### **13.2 Data Flow**

```
SVG Handles → ParamFields → Shape Function → Station Contours → Operators → GraphSpec → Constraints → Final GraphSpec → Compiler → Outputs
                ↓                                                                                                                              ↓
         Station Scrubber                                                                                                              Diagnostics
```

### **13.3 Key Principles**

**Minimalism:**
- 15-20 fields replace 100+ sliders
- 2-3 masks for subtractions
- Handful of scalars
- Everything else derived

**Determinism:**
- Same fields → same geometry
- Stable station IDs
- Deterministic field updates
- No ambiguity

**Performance:**
- Local field updates (only affected stations)
- Fast feedback loop (real-time editing)
- Incremental geometry generation

**Usability:**
- Multi-view editing (Top/Side/Front)
- Station scrubber for surgical control
- Constraint-aware handles
- Professional CAD feel

**[END:TAG:RELATIONSHIPS]**

---

## 📋 SUMMARY

This system map documents the complete ParamFields System, including:

- **Canonical Station Axis:** Parameter s ∈ [0,1], deterministic station positions, stable IDs
- **Minimal HullFields Set:** 15-20 fields (curves) replace 100+ sliders
- **Shape Function:** Fields → station contour generation (universal cross-section)
- **SVG Authoring:** Multi-view handle system (Top/Side/Front views)
- **Station Scrubber:** Surgical editing with station selection
- **Deterministic Updates:** Local field updates with fast feedback loop
- **Integration:** Clean workflow from SVG → Fields → Operators → Constraints → Compiler
- **Laser Hull Template:** Complete concrete example with realistic values

**Total Document Size:** ~1,400+ lines  
**Source:** modelmaker.txt Lines 8203-8948+  
**Status:** Complete system mapping with all field types, shape functions, SVG authoring, and integration details extracted

---

*MASTER PARAMFIELDS SYSTEM MAP*  
*Complete S.A.M. documentation for ParamFields System*  
*Version 1.0.0 | Date: 2025-01-27*



---


---

<!-- AUTO-GENERATED FROM: MASTER_FIELD_EVALUATION_CROSS_SECTION_GENERATOR_SYSTEM_MAP.md -->
<!-- DO NOT EDIT THIS SECTION DIRECTLY -->
<!-- Source File: MASTER_FIELD_EVALUATION_CROSS_SECTION_GENERATOR_SYSTEM_MAP.md -->
<!-- File Size: 44043 bytes -->

<a id='field-evaluation-cross-section-generator-system-map'></a>

# MASTER FIELD EVALUATION & CROSS-SECTION GENERATOR SYSTEM MAP
**Complete System Anatomy Mapping - Field Evaluation & Cross-Section Generator System**

**Date:** 2025-01-27  
**Version:** 1.0.0  
**Purpose:** Complete S.A.M. documentation for Field Evaluation & Cross-Section Generator System (modelmaker.txt Field Evaluation spec)  
**Status:** PHASE 1 - Foundation System Mapping  
**System:** Lucid Image Editor - Universal Parametric Asset Engine  
**Reference:** modelmaker.txt Field Evaluation & Cross-Section Generator spec (Lines 8949-10660+)

---

## 📋 TABLE OF CONTENTS

1. [System Overview](#1-system-overview)
2. [Field Evaluation Contract](#2-field-evaluation-contract)
3. [Cross-Section Generator Overview](#3-cross-section-generator-overview)
4. [Cross-Section Generator Core Implementation](#4-cross-section-generator-core-implementation)
5. [Top-View Planform Generator](#5-top-view-planform-generator)
6. [Inverse Mapping: SVG → Field Updates](#6-inverse-mapping-svg--field-updates)
7. [StationCache System](#7-stationcache-system)
8. [Quality Switch: FAST vs FINAL](#8-quality-switch-fast-vs-final)
9. [Local Invalidation](#9-local-invalidation)
10. [Bottom View Generation](#10-bottom-view-generation)
11. [Constraints Pass](#11-constraints-pass)
12. [Fairing Algorithms](#12-fairing-algorithms)
13. [Integration Points](#13-integration-points)
14. [File Dependency Graph](#14-file-dependency-graph)
15. [Relationship Matrix](#15-relationship-matrix)

---

## 1. SYSTEM OVERVIEW

**[TAG:OVERVIEW] [TAG:FIELD_EVALUATION] [TAG:CROSS_SECTION]**

### **What is the Field Evaluation & Cross-Section Generator System?**

**The core geometry generation engine that converts ParamFields into station contours, planform curves, and 3D geometry. This is the "single source of truth" for geometry generation.**

**Location:** Field Evaluation & Cross-Section Generator defined in modelmaker.txt (Lines 8949-10660+)  
**Purpose:** Provide deterministic geometry generation from fields with quality levels (FAST/FINAL) and efficient caching  
**Core Principle:** Fields → StationCache → Contours → Geometry. Single source of truth for all geometry.

### **Key Features**

**Field evaluation:**
- Field1D evaluation (cubic/linear interpolation)
- Deterministic evaluation at station s
- Clamp bounds enforcement

**Cross-section generation:**
- Station contour generation (closed loop)
- Deck → lip → side → bottom → keel → mirror
- Deterministic geometry from fields
- Configurable sample counts

**Top-view planform:**
- Forward mapping: fields → sheer/chine polylines
- Tip shaping model (bow/stern)
- Stable planform generation

**Inverse mapping:**
- SVG handle drags → field updates
- Deterministic field knot insertion
- Local smoothing
- No ambiguity

**StationCache system:**
- Single source of truth
- Pre-evaluated field values
- All generators read from cache
- Removes subtle mismatches

**Quality switch:**
- FAST mode (drag): Minimal samples, no constraints
- FINAL mode (release): Full samples, constraints, fairing
- Two-phase rebuild loop

**Local invalidation:**
- Automatic dirty tracking
- Local rebuilds only
- Fast feedback loop

### **What This System Provides**

**Deterministic geometry:**
- Same fields → same geometry
- StationCache ensures consistency
- No ad-hoc field evaluation

**Performance:**
- FAST mode for real-time editing
- FINAL mode for quality output
- Local invalidation (only affected stations)

**Professional workflow:**
- Surgical editing (station scrubber)
- Real-time feedback (FAST mode)
- High-quality output (FINAL mode)

**[END:TAG:OVERVIEW]**

---

## 2. FIELD EVALUATION CONTRACT

**[TAG:FIELD_EVALUATION] [TAG:CONTRACT]**

### **2.1 Field1D Type**

```typescript
type Field1D = { 
  knots:number[]; 
  values:number[]; 
  interp:"cubic"|"linear"; 
  clamp?:[number,number] 
};
```

### **2.2 Evaluation Function**

```typescript
function evalField(f:Field1D, s:number): number {
  // Evaluate field at station parameter s (0..1)
  // Uses cubic or linear interpolation based on f.interp
  // Enforces clamp bounds if provided
  // Returns deterministic value
}
```

**Key Properties:**
- **Deterministic:** Same field + s → same value
- **Interpolated:** Cubic or linear between knots
- **Clamped:** Enforced bounds if provided
- **Stable:** No floating point drift

**[END:TAG:FIELD_EVALUATION]**

---

## 3. CROSS-SECTION GENERATOR OVERVIEW

**[TAG:CROSS_SECTION_OVERVIEW] [TAG:CONTOUR_GENERATION]**

### **3.1 Goal**

**Generate one closed loop in rib plane (z,y):**

1. Start at centerline deck crown (z=0)
2. Go along starboard deck to deck edge
3. Make deck lip underside (overhang + sharpness + radius)
4. Go down starboard side to chine
5. Go along bottom V to keel point at centerline
6. Mirror to port and close

**This produces a true "slice contour" you can feed into ribs/stringers.**

### **3.2 Coordinate Convention**

**Rib plane coordinates:**
- z: Lateral (half-breadth, starboard is +z)
- y: Vertical (up is +y)
- Origin: Centerline at deck reference (z=0, y=yDeckEdge, typically 0)

### **3.3 Output**

**Closed loop:** Array of V2 points `{u:number, v:number}` representing (z,y) coordinates

**Key Features:**
- Closed (first point = last point)
- Counter-clockwise winding (typically)
- Deterministic sampling
- Configurable sample counts per region

**[END:TAG:CROSS_SECTION_OVERVIEW]**

---

## 4. CROSS-SECTION GENERATOR CORE IMPLEMENTATION

**[TAG:CROSS_SECTION_GENERATOR] [TAG:IMPLEMENTATION] [TAG:PSEUDOCODE]**

### **4.1 HullCtx Type (Input Context)**

```typescript
type HullCtx = {
  // fields from JSON
  beam: Field1D;
  rocker: Field1D;
  depth: Field1D;

  bowTaper: Field1D;
  sternTaper: Field1D;
  tipRound: Field1D;
  vDepth: Field1D;
  vSharp: Field1D;
  chinePos: Field1D;
  chineSoft: Field1D;

  deckCrown: Field1D;
  deckEdgeRadius: Field1D;
  deckLipOverhang: Field1D;
  deckLipSharp: Field1D;

  // scalars
  tipLengthM: number;

  // output detail
  samples: {
    deck: number;    // e.g. 24
    side: number;    // e.g. 28
    bottom: number;  // e.g. 28
  };

  // coordinate convention
  // deck edge y reference:
  yDeckEdge: number; // typically 0
};
```

### **4.2 Convention Note (Important)**

**Use this simple convention (works well in practice):**
- yDeckEdge = 0
- yKeel = rocker(s) (negative down)
- depth(s) is used to control fullness/vertical proportions (chine height, side curvature), not as the absolute keel depth

**If you prefer "depth defines keel depth," change one line: set yKeel = -depth(s) + rockerOffset(s).**

### **4.3 Complete Implementation (TypeScript Pseudocode)**

```typescript
function generateSectionContour(ctx:HullCtx, s:number): V2[] {
  // ---- evaluate fields
  const beamFull   = Math.max(0.02, evalField(ctx.beam, s));
  const B          = 0.5 * beamFull;                      // half-beam at deck edge reference

  const yDeckEdge  = ctx.yDeckEdge ?? 0.0;
  const yKeelBase  = evalField(ctx.rocker, s);            // negative down

  const Dfull      = Math.max(0.05, evalField(ctx.depth, s)); // fullness scale

  const bowT       = evalField(ctx.bowTaper, s);
  const sternT     = evalField(ctx.sternTaper, s);
  const tipR       = evalField(ctx.tipRound, s);          // 0..1

  const vDep       = evalField(ctx.vDepth, s);            // meters
  const vSharpRaw  = evalField(ctx.vSharp, s);            // 0.2..6
  const uChineRaw  = evalField(ctx.chinePos, s);          // 0.35..0.92 (fraction of B)
  const cSoftRaw   = evalField(ctx.chineSoft, s);         // 0..1

  const crown      = evalField(ctx.deckCrown, s);         // meters
  const rEdge      = evalField(ctx.deckEdgeRadius, s);    // meters
  const overhang   = evalField(ctx.deckLipOverhang, s);   // meters
  const lipSharp   = evalField(ctx.deckLipSharp, s);      // 0..6

  // ---- taper factor (acts on B and on "sharpness" near tip zones)
  // We do *not* need exact bow geometry here; taper is just a stabilizer for stations near ends.
  // Strong near bow when s small, strong near stern when s near 1.
  const tb = smoothstep(0.00, 0.20, s);          // 0..1 (bow zone)
  const ts = smoothstep(1.00, 0.80, s);          // 0..1 (stern zone)
  const bowGain   = lerp(bowT, 1.0, tb);         // bowT -> 1 as we move away from bow
  const sternGain = lerp(sternT, 1.0, ts);       // sternT -> 1 as we move away from stern
  const taperGain = 1.0 / Math.max(1e-6, Math.max(bowGain, sternGain)); // smaller near ends
  const B2        = B * clamp(taperGain, 0.15, 1.0);

  // ---- "tip rounding influence" (softens V and chine near bow)
  // tipR is already strongest near bow in your template; this further stabilizes:
  const soften = clamp(0.35 + 0.65*tipR, 0.35, 1.0); // 0.35..1
  const vSharp = lerp(vSharpRaw, 1.2, tipR);         // near bow, reduce sharpness
  const cSoft  = clamp(lerp(cSoftRaw, 0.85, tipR), 0, 1);

  // ---- key geometric anchors (all tunable)
  const uChine = clamp(uChineRaw, 0.35, 0.92);
  const zChine = B2 * uChine;

  // keel ridge: add vDepth downward (V ridge deeper than keel base)
  const yKeel  = yKeelBase - vDep;

  // choose chine height as a fraction of keel-to-deck distance
  // (Laser-ish: chine is not extremely low; adjust with depth + chine softness)
  const keelToDeck = (yDeckEdge - yKeel);               // positive
  const chineFrac  = clamp(0.55 + 0.10*(1.0 - cSoft), 0.45, 0.72);
  const yChine     = yKeel + chineFrac * keelToDeck;    // between keel and deck edge

  // deck crown point (centerline)
  const yCrown = yDeckEdge + crown;

  // ---- deck curve shape exponent (higher -> flatter near edge)
  const deckExp = lerp(1.8, 3.2, clamp(0.5 + 0.5*(1.0 - tipR), 0, 1));

  // ---- bottom V exponent: higher = sharper V near center
  const vExp = clamp(lerp(1.2, 5.0, (vSharp - 0.2) / (6.0 - 0.2)), 1.2, 5.0);

  // ---- side exponent: higher = steeper near deck edge
  const sideExp = clamp(lerp(1.2, 4.5, lipSharp / 6.0), 1.2, 4.5);

  // ---- deck lip micro-geometry
  // vertical drop of lip underside (keep proportional to radius + a small base)
  const lipDrop = clamp(0.006 + 1.6*rEdge, 0.006, 0.040);
  const inset   = clamp(0.4*rEdge, 0.000, 0.020);       // hull side begins slightly inboard under the lip
  const outZ    = B2 + overhang;                        // lip overhang point z
  const inZ     = Math.max(0.0, B2 - inset);            // hull side start point z

  // small rounding around deck edge into underside; we'll approximate by a 2–3 point arc
  // (later you can use true circular fillet)
  const arcCount = 4;

  // ---- 1) STARBOARD DECK: crown -> deck edge (z: 0..B2)
  const deckPts: V2[] = [];
  for (let i=0; i<ctx.samples.deck; i++){
    const t = i / (ctx.samples.deck - 1);     // 0..1
    const z = lerp(0, B2, t);
    // y goes from yCrown at center to yDeckEdge at edge
    const y = lerp(yCrown, yDeckEdge, powSafe(t, deckExp));
    deckPts.push({ u:z, v:y });
  }

  // ---- 2) LIP ARC: deck edge top -> lip outer underside -> lip inner underside
  // top point
  const Ptop: V2 = { u:B2, v:yDeckEdge };

  // approximate a rounded corner between Ptop and outer underside
  const Pout: V2 = { u:outZ, v:yDeckEdge - 0.65*lipDrop };
  const Pin:  V2 = { u:inZ,  v:yDeckEdge - lipDrop };

  const lipPts: V2[] = [Ptop];
  for (let i=1; i<arcCount; i++){
    const t = i/(arcCount-1);
    // simple quadratic-ish blend that bows outward
    const z = lerp(Ptop.u, Pout.u, smoothstep(0,1,t));
    const y = lerp(Ptop.v, Pout.v, smoothstep(0,1,t));
    lipPts.push({u:z, v:y});
  }
  // then a short sharp/soft transition inward to Pin (controls the "sharp underside" feel)
  const k = clamp(lipSharp/6.0, 0, 1);
  const midZ = lerp(Pout.u, Pin.u, 0.35 + 0.20*k);
  const midY = lerp(Pout.v, Pin.v, 0.35);
  lipPts.push({u:midZ, v:midY});
  lipPts.push(Pin);

  // ---- 3) STARBOARD SIDE: Pin -> chine (z: inZ..zChine, y: lipUnderside..yChine)
  // Note: chine is usually inboard of sheer; enforce monotone in z:
  const zSideStart = Math.max(zChine + 0.01*B2, Math.min(inZ, B2)); // keep > zChine
  const sidePts: V2[] = [];
  for (let i=0; i<ctx.samples.side; i++){
    const t = i/(ctx.samples.side - 1); // 0..1
    // z moves inward toward chine
    const z = lerp(zSideStart, zChine, powSafe(t, 1.0)); // linear inward
    // y drops from lip underside to chine height with exponent
    const y0 = Pin.v;
    const y  = lerp(y0, yChine, powSafe(t, sideExp));
    sidePts.push({u:z, v:y});
  }

  // ---- 4) STARBOARD BOTTOM: chine -> keel (z: zChine..0, y: yChine..yKeel)
  // Blend "hard V" and "rounded V" using chineSoft. Higher chineSoft -> smoother near chine.
  const bottomPts: V2[] = [];
  for (let i=0; i<ctx.samples.bottom; i++){
    const t = i/(ctx.samples.bottom - 1); // 0..1
    const z = lerp(zChine, 0.0, t);
    const u = (zChine > 1e-6) ? (z / zChine) : 0; // 1 at chine, 0 at keel

    // base V interpolation (keel->chine)
    const yV = lerp(yKeel, yChine, powSafe(1.0 - u, vExp)); // u=0 -> keel, u=1 -> chine

    // rounded variant: use a smoother exponent near chine
    const yR = lerp(yKeel, yChine, powSafe(1.0 - u, lerp(1.3, 2.2, soften)));

    // mix: chineSoft near 1 => more rounded; near 0 => more V
    const y = lerp(yV, yR, cSoft);

    bottomPts.push({u:z, v:y});
  }

  // ---- assemble STARBOARD perimeter from crown to keel
  // deckPts already starts at crown and ends at edge. We then add lipPts (starts at top edge),
  // then sidePts (starts near lip underside), then bottomPts (chine->keel).
  // Avoid duplicate points at joins.
  const star: V2[] = [];
  pushNoDup(star, deckPts);
  pushNoDup(star, lipPts.slice(1));      // Ptop already in deckPts end
  pushNoDup(star, sidePts.slice(1));     // Pin already in lipPts end
  pushNoDup(star, bottomPts.slice(1));   // chine already in sidePts end

  // star ends at keel point (z=0,y=yKeel)

  // ---- mirror to PORT
  // We want a closed loop: crown -> starboard -> keel -> port -> back to crown.
  // Create port by mirroring star around centerline z=0, reversing order to go from keel back to crown.
  const port = [...star].reverse().map(p => ({u: -p.u, v: p.v}));

  // ---- merge, remove duplicates at keel and crown
  const loop: V2[] = [];
  pushNoDup(loop, star);
  // skip first point of port because it's keel duplicate
  pushNoDup(loop, port.slice(1));
  // loop should end at crown duplicate; we can close explicitly by setting last=first
  if (dist2(loop[0], loop[loop.length-1]) > 1e-12) loop.push(loop[0]);

  // ---- optional: simplify + resample (stable)
  // (Keep crown and keel!)
  const simplified = simplify(loop, 0.001);
  // return resamplePolyline(simplified, 128); // if you want fixed count
  return simplified;

  // ---- local helper
  function pushNoDup(arr:V2[], pts:V2[]){
    for (const p of pts){
      if (arr.length===0){ arr.push(p); continue; }
      const q = arr[arr.length-1];
      if ((p.u-q.u)*(p.u-q.u) + (p.v-q.v)*(p.v-q.v) < 1e-12) continue;
      arr.push(p);
    }
  }
  function dist2(a:V2,b:V2){ const du=a.u-b.u, dv=a.v-b.v; return du*du+dv*dv; }
}
```

### **4.4 Key Algorithm Details**

**Taper factor:**
- Computes bow/stern taper gains
- Applies to half-beam B2
- Stabilizes stations near ends

**Tip rounding:**
- Softens V and chine near bow
- Uses tipRound field
- Reduces sharpness near bow

**Geometric anchors:**
- zChine: Lateral position of chine
- yKeel: Keel ridge depth
- yChine: Chine height (fraction of keel-to-deck)
- yCrown: Deck crown height

**Exponents:**
- deckExp: Deck curve shape (1.8-3.2)
- vExp: Bottom V sharpness (1.2-5.0)
- sideExp: Side steepness (1.2-4.5)

**Deck lip:**
- Lip drop: Vertical drop of underside
- Inset: Hull side starts inboard
- Overhang: Lip extends outward
- Arc approximation: 2-4 points for rounding

**Assembly:**
- Starboard: Deck → Lip → Side → Bottom
- Mirror to port (reverse order)
- Remove duplicates at joins
- Close loop explicitly

**[END:TAG:CROSS_SECTION_GENERATOR]**

---

## 5. TOP-VIEW PLANFORM GENERATOR

**[TAG:PLANFORM] [TAG:FORWARD_MAPPING]**

### **5.1 Overview**

**Forward mapping: fields → top-view curves (sheer + chine + reference lines)**

**Goal:** Generate planform polylines from fields for SVG top view rendering

### **5.2 PlanformOut Type**

```typescript
type P2 = { x:number; z:number };

type PlanformOut = {
  sheerStar: P2[];  // (x, +z)
  sheerPort: P2[];  // (x, -z)
  chineStar: P2[];
  chinePort: P2[];
  stations: { i:number; s:number; x:number }[];
};
```

### **5.3 Taper + Tip Shaping Model**

**Key idea:** Inside the tip zone we don't trust raw beam(s) to shape the bow by itself—we override it with a controlled curve that matches at the tip boundary.

**We compute half-beam at each station, then apply a local bow "tip law" that uses:**
- tipLengthM (how long the point zone is)
- tipRound(s) (how blunt/pointy within that zone)

### **5.4 Complete Implementation (TypeScript Pseudocode)**

```typescript
function generatePlanform(ctx:any): PlanformOut {
  const L = ctx.length;
  const N = ctx.stationing.count;
  const phase = ctx.stationing.phaseM ?? 0;
  const snap = ctx.stationing.snapM ?? 0.001;

  // station remap: t -> s
  function remap(t:number): number {
    const r = ctx.stationing.remap;
    if (!r || r.kind !== "power_blend") return t;
    // bowPower<1 => more density near bow; sternPower<1 => more near stern
    const sb = Math.pow(t, r.bowPower);
    const ss = 1 - Math.pow(1 - t, r.sternPower);
    return lerp(sb, ss, r.blend);
  }

  // meters <-> s
  const tipS = clamp((ctx.scalars.tipLengthM ?? 0.26) / L, 0.005, 0.25);
  const sTipBoundary = tipS;

  // sample once at boundary to lock continuity
  const Btip = halfBeamRaw(ctx, sTipBoundary);

  const stations: {i:number;s:number;x:number}[] = [];
  const sheerStar:P2[] = [];
  const chineStar:P2[] = [];

  for (let i=0; i<N; i++){
    const t = i/(N-1);
    const s = q(remap(t), 1e-6);      // keep stable
    const x = q(phase + s*L, snap);

    // raw half-beam from beam + tapers
    const Braw = halfBeamRaw(ctx, s);

    // bow tip override
    let zSheer = Braw;
    if (s < sTipBoundary){
      const u = clamp(s / sTipBoundary, 0, 1);    // 0..1 inside tip zone
      const tipR = evalField(ctx.fields.tipRound, s); // 0..1
      // exponent: tipR=1 => blunt/rounded (p<1), tipR=0 => pointy (p>1)
      const p = lerp(2.2, 0.65, tipR);
      zSheer = Btip * Math.pow(u, p);
    }

    // optional stern tip override (often not needed if beam curve already goes to 0 cleanly)
    // you can add sternTipLengthM later with same pattern.

    // chine is a fraction of sheer half-beam
    const cpos = evalField(ctx.fields.chinePos, s); // 0.35..0.92
    const zChine = zSheer * clamp(cpos, 0.20, 0.98);

    stations.push({i, s, x});
    sheerStar.push({x, z: zSheer});
    chineStar.push({x, z: zChine});
  }

  // mirror to port
  const sheerPort = sheerStar.map(p => ({x:p.x, z:-p.z}));
  const chinePort = chineStar.map(p => ({x:p.x, z:-p.z}));

  return { sheerStar, sheerPort, chineStar, chinePort, stations };
}

// ----- raw half-beam: beam(s) + taper shaping
function halfBeamRaw(ctx:any, s:number): number {
  const beamFull = Math.max(0.02, evalField(ctx.fields.beam, s));
  let B = 0.5 * beamFull;

  // taper gains (your existing bowTaper/sternTaper fields)
  const bowT  = evalField(ctx.fields.bowTaper, s);
  const sternT= evalField(ctx.fields.sternTaper, s);

  const tb = smoothstep(0.00, 0.20, s);
  const ts = smoothstep(1.00, 0.80, s);

  const bowGain   = lerp(bowT,   1.0, tb);
  const sternGain = lerp(sternT, 1.0, ts);

  const taperGain = 1.0 / Math.max(1e-6, Math.max(bowGain, sternGain));
  B *= clamp(taperGain, 0.12, 1.0);

  // keep sane
  return Math.max(0.0, B);
}

// quantize helper
function q(x:number, step:number){ return Math.round(x/step)*step; }
```

### **5.5 What You Render in SVG (Top View)**

- sheerStar + sheerPort as the main outline
- chineStar + chinePort as a secondary outline
- station tick marks at each x
- cockpit/trunk masks on top

**Everything is index-stable (i), so picking + LOD stays perfect.**

**[END:TAG:PLANFORM]**

---

## 6. INVERSE MAPPING: SVG → FIELD UPDATES

**[TAG:INVERSE_MAPPING] [TAG:SVG_HANDLES]**

### **6.1 The Rule: Every Handle Knows What It Controls**

**Do not "guess" based on where the user dragged. Each handle has a type:**

- HANDLE_SHEER_STATION(i) → edits beam(s_i)
- HANDLE_CHINE_STATION(i) → edits chinePos(s_i)
- HANDLE_BOW_TIP_LENGTH() → edits tipLengthM
- HANDLE_BOW_ROUNDNESS() → edits tipRound curve near bow
- HANDLE_COCKPIT_POINT(k) → edits cockpit polygon point
- HANDLE_TRUNK_RECT_EDGE() → edits trunk rect fields

**That's why it feels like CAD: no ambiguous edits.**

### **6.2 Editing beam from a sheer station handle**

```typescript
function onDragSheerStation(ctx:any, i:number, zNew:number){
  const s = ctx._planform.stations[i].s;

  // If station is inside the bow tip zone, DO NOT rewrite beam by default.
  // Otherwise your bow point logic becomes impossible to control.
  const L = ctx.length;
  const tipS = clamp(ctx.scalars.tipLengthM / L, 0.005, 0.25);
  if (s < tipS) return; // editing tip is done via bow tip handles

  const beamFullNew = clamp(2*Math.abs(zNew), 0.05, 1.60);
  setFieldKnot(ctx.fields.beam, s, beamFullNew, {mode:"insert_or_nearest", smoothLocal:true});
}
```

**This makes the sheer curve the beam editor—exactly what you want.**

### **6.3 Editing chinePos from chine station handle**

```typescript
function onDragChineStation(ctx:any, i:number, zChNew:number){
  const s = ctx._planform.stations[i].s;

  // need the *current* sheer half-beam at this station (top view)
  const zSheer = ctx._planform.sheerStar[i].z;
  const denom = Math.max(1e-6, Math.abs(zSheer));

  const frac = clamp(Math.abs(zChNew) / denom, 0.35, 0.92);
  setFieldKnot(ctx.fields.chinePos, s, frac, {mode:"insert_or_nearest", smoothLocal:true});
}
```

**This isolates chine control perfectly.**

### **6.4 Bow tip length handle (controls tipLengthM)**

```typescript
function onDragBowTipLength(ctx:any, xTipNew:number){
  const L = ctx.length;
  // keep tip length in a sane band: 1–25% of LOA
  const tipLen = clamp(xTipNew, 0.05*L, 0.25*L);
  ctx.scalars.tipLengthM = tipLen;
}
```

**Because your forward mapping uses Btip = halfBeamRaw(sTipBoundary) and then shapes inside, this stays stable.**

### **6.5 Bow roundness handle (edits tipRound curve near bow)**

```typescript
function onDragBowRoundness(ctx:any, strength01:number){
  // strength01: 0..1 (you define from drag distance)
  // write 2 knots so it stays local to bow
  setFieldKnot(ctx.fields.tipRound, 0.02, clamp(0.70 + 0.30*strength01, 0, 1), {mode:"nearest", smoothLocal:false});
  setFieldKnot(ctx.fields.tipRound, 0.08, clamp(0.45 + 0.40*strength01, 0, 1), {mode:"nearest", smoothLocal:false});
}
```

**This gives you a single, intuitive "make the bow pointier/rounder" handle without touching beam.**

### **6.6 Knot Insertion Policy**

**Use one consistent policy everywhere:**

**If there's a knot within Δs <= 0.015, update it**

**Else insert a knot at s and optionally apply a small local smoothing kernel**

```typescript
function setFieldKnot(field:Field1D, s:number, value:number, opts:{mode:"insert_or_nearest"|"nearest"; smoothLocal:boolean}){
  // 1) clamp if field has clamp
  if (field.clamp) value = clamp(value, field.clamp[0], field.clamp[1]);

  // 2) find nearest knot
  let best = -1, bestD = 1e9;
  for (let i=0;i<field.knots.length;i++){
    const d = Math.abs(field.knots[i]-s);
    if (d<bestD){ bestD=d; best=i; }
  }

  const TH = 0.015;
  if (opts.mode==="nearest" || bestD <= TH){
    field.values[best] = value;
  } else {
    // insert sorted
    const iIns = field.knots.findIndex(k => k > s);
    const idx = (iIns<0) ? field.knots.length : iIns;
    field.knots.splice(idx,0,s);
    field.values.splice(idx,0,value);
  }

  if (opts.smoothLocal){
    // lightweight local smoothing: one pass on neighbors (deterministic)
    localSmooth(field, s, 0.035, 0.20); // radius in s, strength
  }
}
```

**This is what makes edits feel "surgical".**

### **6.7 Cockpit + Trunk Masks: SVG Edits → Mask Updates**

**Cockpit polygon points live in normalized space:**

```typescript
function onDragCockpitPoint(ctx:any, k:number, sNew:number, zNormNew:number){
  const P = ctx.masks.cockpitMask.shape.points[k];
  P[0] = clamp(sNew, 0, 1);
  P[1] = clamp(zNormNew, 0, 0.95); // never to sheer
}
```

**At compile time you convert to meters using current beam(s).**

**Trunk rect edits:**

```typescript
function onDragTrunkRect(ctx:any, s0:number, s1:number, zHalfM:number){
  ctx.masks.trunkMask.shape.s0 = clamp(Math.min(s0,s1), 0, 1);
  ctx.masks.trunkMask.shape.s1 = clamp(Math.max(s0,s1), 0, 1);
  ctx.masks.trunkMask.shape.zHalfM = clamp(zHalfM, 0.015, 0.060);
}
```

### **6.8 Separate "Tip Zone Edit Mode"**

**To avoid fighting:**

- Sheer station handles inside tip zone are locked (or they become "roundness handles")
- Tip length + roundness have their own handles
- This keeps bow tuning sane

**[END:TAG:INVERSE_MAPPING]**

---

## 7. STATIONCACHE SYSTEM

**[TAG:STATIONCACHE] [TAG:SINGLE_SOURCE_OF_TRUTH]**

### **7.1 Overview**

**This function is the "compiler front-end" for one station. Every view, every handle, every constraint reads from this cache. That's how you keep the system coherent.**

### **7.2 StationCache Type**

```typescript
type StationCache = {
  i: number;
  s: number;        // 0..1
  x: number;        // meters

  // planform
  zSheer: number;   // half-beam at deck edge (meters)
  zChine: number;   // chine half-breadth (meters)

  // side
  yDeck: number;    // usually 0
  yCrown: number;   // deck crown height
  yKeelBase: number;// rocker(s) (keel baseline)
  yKeelRidge: number;// rocker(s) - vDepth(s)

  // section shaping parameters (pre-evaluated)
  B2: number;
  vDepth: number;
  vSharp: number;
  chinePos: number;
  chineSoft: number;

  deckCrown: number;
  deckEdgeRadius: number;
  deckLipOverhang: number;
  deckLipSharp: number;

  tipRound: number;
};
```

### **7.3 Recompute Function (Deterministic, No Side Effects)**

**Complete implementation:**

```typescript
function recomputeStationCache(ctx:any, i:number){
  const st = ctx._planform.stations[i];
  const s  = st.s;
  const x  = st.x;

  const yDeck = 0.0;

  // ----- fields
  const beamFull = Math.max(0.02, evalField(ctx.fields.beam, s));
  const bowT     = evalField(ctx.fields.bowTaper, s);
  const sternT   = evalField(ctx.fields.sternTaper, s);

  const tipRound = evalField(ctx.fields.tipRound, s);

  const vDepth   = evalField(ctx.fields.vDepth, s);
  const vSharp   = evalField(ctx.fields.vSharp, s);
  const chinePos = evalField(ctx.fields.chinePos, s);
  const chineSoft= evalField(ctx.fields.chineSoft, s);

  const deckCrown= evalField(ctx.fields.deckCrown, s);
  const rEdge    = evalField(ctx.fields.deckEdgeRadius, s);
  const overhang = evalField(ctx.fields.deckLipOverhang, s);
  const lipSharp = evalField(ctx.fields.deckLipSharp, s);

  const rocker   = evalField(ctx.fields.rocker, s);

  // ----- taper (same as planform raw)
  const tb = smoothstep(0.00, 0.20, s);
  const ts = smoothstep(1.00, 0.80, s);
  const bowGain   = lerp(bowT,   1.0, tb);
  const sternGain = lerp(sternT, 1.0, ts);
  const taperGain = 1.0 / Math.max(1e-6, Math.max(bowGain, sternGain));

  const B = 0.5 * beamFull;
  const B2 = B * clamp(taperGain, 0.12, 1.0);

  // ----- bow tip override for planform sheer
  const L = ctx.length;
  const tipS = clamp((ctx.scalars.tipLengthM ?? 0.26) / L, 0.005, 0.25);
  const sTipBoundary = tipS;

  // boundary half-beam (raw) to lock continuity
  const Btip = (sTipBoundary > 1e-6) ? halfBeamRaw(ctx, sTipBoundary) : B2;

  let zSheer = B2;
  if (s < sTipBoundary){
    const u = clamp(s / sTipBoundary, 0, 1);
    const p = lerp(2.2, 0.65, tipRound);      // pointy -> blunt
    zSheer = Btip * Math.pow(u, p);
  }

  const zChine = Math.abs(zSheer) * clamp(chinePos, 0.20, 0.98);

  // ----- side values
  const yKeelBase = rocker;
  const yKeelRidge = rocker - vDepth;   // ridge deeper than baseline
  const yCrown = yDeck + deckCrown;

  // ----- write cache
  const c: StationCache = {
    i, s, x,
    zSheer: Math.max(0, zSheer),
    zChine: Math.max(0, zChine),

    yDeck, yCrown,
    yKeelBase, yKeelRidge,

    B2: Math.max(0, zSheer),
    vDepth, vSharp,
    chinePos, chineSoft,

    deckCrown,
    deckEdgeRadius: rEdge,
    deckLipOverhang: overhang,
    deckLipSharp: lipSharp,

    tipRound
  };

  ctx.cache.station[i] = c;
}
```

### **7.4 Rule**

**Every generator (top/side/bottom/front, stringers, constraints) should use ctx.cache.station[i] and not re-evaluate fields ad hoc. That removes subtle mismatches.**

**[END:TAG:STATIONCACHE]**

---

## 8. QUALITY SWITCH: FAST VS FINAL

**[TAG:QUALITY_SWITCH] [TAG:PERFORMANCE]**

### **8.1 Overview**

**You want two modes:**

- **FAST (drag):** Minimal sample counts, no heavy smoothing, no expensive constraints
- **FINAL (release):** Full resampling, constraint passes, notch recompute, fairing iterations

### **8.2 QualityProfile Type**

```typescript
type QualityProfile = {
  sectionSamples: { deck:number; side:number; bottom:number };
  simplifyEps: number;
  resampleCount: number | null;

  curvature: { iterations:number; strength:number } | null;
  runConstraints: boolean;
  runNotches: boolean;

  // bottom view: whether to sample sections or approximate from cache
  bottomFromSections: boolean;
};
```

### **8.3 Quality Profiles**

```typescript
const QUALITY_FAST: QualityProfile = {
  sectionSamples: { deck: 12, side: 14, bottom: 14 },
  simplifyEps: 0.003,
  resampleCount: null,
  curvature: null,
  runConstraints: false,
  runNotches: false,
  bottomFromSections: false
};

const QUALITY_FINAL: QualityProfile = {
  sectionSamples: { deck: 28, side: 30, bottom: 30 },
  simplifyEps: 0.001,
  resampleCount: 128,
  curvature: { iterations: 6, strength: 0.45 },
  runConstraints: true,
  runNotches: true,
  bottomFromSections: true
};
```

### **8.4 Rebuild with Profile**

```typescript
function rebuildDirtyWithQuality(ctx:any, q:QualityProfile){
  // 1) recompute station cache for dirty ranges (always)
  const ranges = mergeDirty(ctx.dirty);
  ctx.dirty = [];

  for (const r of ranges){
    for (let i=r.i0; i<=r.i1; i++) recomputeStationCache(ctx, i);
  }

  // 2) rebuild top/side SVG paths (cheap: whole path rebuild ok up to ~2000)
  rebuildTopPaths(ctx);
  rebuildSidePaths(ctx);

  // 3) front section at active station
  const ia = ctx.ui.activeStationIndex;
  ctx._sectionCtx.samples = q.sectionSamples;
  let sec = generateSectionContour(ctx._sectionCtx, ctx.cache.station[ia].s);
  if (q.simplifyEps) sec = simplify(sec, q.simplifyEps);
  if (q.resampleCount) sec = resamplePolyline(sec, q.resampleCount);
  ctx._frontSection = sec;

  // 4) bottom view
  if (q.bottomFromSections){
    // compute/refresh sections only for dirty ranges + neighbors for smooth bottom display
    const pad = 2;
    for (const r of ranges){
      for (let i=Math.max(0,r.i0-pad); i<=Math.min(ctx.cache.station.length-1,r.i1+pad); i++){
        const s = ctx.cache.station[i].s;
        let loop = generateSectionContour(ctx._sectionCtx, s);
        loop = simplify(loop, q.simplifyEps);
        if (q.resampleCount) loop = resamplePolyline(loop, q.resampleCount);
        ctx.cache.section.set(i, loop);
      }
    }
    updateBottomPointsFromSectionCache(ctx, ranges);
  } else {
    // approximate bottom using cached zChine etc (very fast)
    updateBottomPointsApprox(ctx, ranges);
  }

  // 5) constraints (final only)
  if (q.runConstraints){
    runConstraintPasses(ctx, ranges, q);
  }

  // 6) handle positions (only update dirty range handles or rebuild all)
  updateHandlePositions(ctx, ranges);
}
```

### **8.5 Drag Loop (Two-Phase)**

```typescript
function onPointerMove(ctx:any, handleId:string, pSvg:{x:number,y:number}, mods:any){
  // apply inversion (updates fields/masks)
  ctx.handles[handleId].onDrag(ctx, pSvg, mods);

  // mark dirty from the edit (your setFieldKnot can call invalidateFieldEdit internally)
  // then rebuild fast
  rebuildDirtyWithQuality(ctx, QUALITY_FAST);
}

function onPointerUp(ctx:any){
  // commit pass
  rebuildDirtyWithQuality(ctx, QUALITY_FINAL);
}
```

**[END:TAG:QUALITY_SWITCH]**

---

## 9. LOCAL INVALIDATION

**[TAG:LOCAL_INVALIDATION] [TAG:DIRTY_TRACKING]**

### **9.1 Automatic Invalidation**

**Make setFieldKnot call invalidate automatically:**

```typescript
function setFieldKnot(field:Field1D, s:number, value:number, opts:any, ctx:any){
  const R = opts.smoothLocal ? 0.035 : 0.010; // match your smoothing radius
  // ...insert/update knot...
  invalidateFieldEdit(ctx, s, R, "field:"+opts.fieldKey);
}
```

**For mask edits:**

**Invalidate a broader range based on the mask's s-span.**

### **9.2 Dirty Range Tracking**

**Dirty ranges are tracked as:**
```typescript
type DirtyRange = {
  i0: number;  // start station index
  i1: number;  // end station index
};
```

**Multiple dirty ranges can be merged for efficiency.**

**[END:TAG:LOCAL_INVALIDATION]**

---

## 10. BOTTOM VIEW GENERATION

**[TAG:BOTTOM_VIEW] [TAG:APPROX_VS_EXACT]**

### **10.1 FAST: Approximate from Station Cache**

```typescript
function updateBottomPointsApprox(ctx:any, ranges:DirtyRange[]){
  for (const r of ranges){
    for (let i=r.i0; i<=r.i1; i++){
      const st = ctx.cache.station[i];
      ctx.cache.bottom.keel[i]  = { x: st.x, z: 0 };
      ctx.cache.bottom.chine[i] = { x: st.x, z: st.zChine };
      ctx.cache.bottom.belly[i] = { x: st.x, z: 0.55*st.zChine };
    }
  }
}
```

**Very fast, uses cached values directly.**

### **10.2 FINAL: Extract from Section Contour Cache**

```typescript
function updateBottomPointsFromSectionCache(ctx:any, ranges:DirtyRange[]){
  for (const r of ranges){
    for (let i=r.i0; i<=r.i1; i++){
      const st = ctx.cache.station[i];
      const loop = ctx.cache.section.get(i);
      if (!loop){
        ctx.cache.bottom.keel[i]  = { x: st.x, z: 0 };
        ctx.cache.bottom.chine[i] = { x: st.x, z: st.zChine };
        ctx.cache.bottom.belly[i] = { x: st.x, z: 0.55*st.zChine };
        continue;
      }

      // keel: min y near centerline
      let bestK = {u:0,v:1e9};
      for (const p of loop){
        if (Math.abs(p.u) < 0.002 && p.v < bestK.v) bestK = p;
      }
      ctx.cache.bottom.keel[i] = { x: st.x, z: 0 };

      // chine: closest |z| to st.zChine with low y preference
      let bestC = loop[0], best = 1e9;
      for (const p of loop){
        const dz = Math.abs(Math.abs(p.u) - st.zChine);
        const score = dz + 0.02*Math.max(0, (p.v - st.yKeelRidge)); // mild bias toward lower points
        if (score < best){ best = score; bestC = p; }
      }
      ctx.cache.bottom.chine[i] = { x: st.x, z: Math.abs(bestC.u) };

      // belly: sample at fraction of chine breadth
      const zb = 0.55*st.zChine;
      let bestB = loop[0], best2 = 1e9;
      for (const p of loop){
        const dz = Math.abs(Math.abs(p.u) - zb);
        if (dz < best2){ best2 = dz; bestB = p; }
      }
      ctx.cache.bottom.belly[i] = { x: st.x, z: Math.abs(bestB.u) };
    }
  }
}
```

**More truthful, extracts from actual section contours.**

**[END:TAG:BOTTOM_VIEW]**

---

## 11. CONSTRAINTS PASS

**[TAG:CONSTRAINTS_PASS] [TAG:FINAL_ONLY]**

### **11.1 Overview**

**Keep it minimal initially:**

- symmetry (should already hold)
- curvature fairing on key splines (sheer + keel stringer)
- notch updates only if you're building internal framing now

### **11.2 Implementation**

```typescript
function runConstraintPasses(ctx:any, ranges:DirtyRange[], q:QualityProfile){
  // 1) fairing on planform sheer & side keel curves over local window
  // window = dirty range ± guard
  const guard = 6;

  for (const r of ranges){
    const a = Math.max(0, r.i0-guard);
    const b = Math.min(ctx.cache.station.length-1, r.i1+guard);

    if (q.curvature){
      fairPlanformSheer(ctx, a, b, q.curvature);
      fairSideKeel(ctx, a, b, q.curvature);
    }
  }

  // 2) update caches after fairing if fairing modified knots or derived points
  // (If fairing edits field knots, invalidate & recompute; if fairing edits points directly, update points arrays)
}
```

**[END:TAG:CONSTRAINTS_PASS]**

---

## 12. FAIRING ALGORITHMS

**[TAG:FAIRING] [TAG:CURVATURE]**

### **12.1 Local Fairing That Doesn't Drift**

**You want fairing that:**
- improves curvature locally
- doesn't move endpoints
- doesn't "creep" over repeated edits
- can run either as visual-only smoothing (FAST) or as a knot rewrite (FINAL)

### **12.2 Option A: Visual-Only Fairing (Recommended)**

**Idea:** Keep your fields as the truth. During FINAL render (or even FAST), you display a faired polyline for sheer/keel, but you do not rewrite knots. That means:
- no drift
- undo stays clean
- tuning stays intentional

**FairingParams Type:**

```typescript
type FairingParams = {
  iterations: number;    // 4–10
  strength: number;      // 0.15–0.55
  lockEnds: boolean;
  lockStations?: Set<number>; // station indices to keep fixed (e.g., active station, trunk boundaries)
};
```

**Laplacian Smoothing with Anchors:**

```typescript
function fairPolylineLocal(points:{x:number,y:number}[], a:number, b:number, p:FairingParams){
  // copy
  const out = points.map(q => ({...q}));

  const locked = (i:number) => {
    if (p.lockStations?.has(i)) return true;
    if (!p.lockEnds) return false;
    return (i===a || i===b);
  };

  // Precompute chord lengths (optional weighting)
  for (let it=0; it<p.iterations; it++){
    // Laplacian smoothing pass
    // (Implementation details: average neighbors, respect locks)
  }

  return out;
}
```

**This is stable and easy. It's basically "relax the curve" while pinning endpoints and optionally a few locked stations.**

**[END:TAG:FAIRING]**

---

## 13. INTEGRATION POINTS

**[TAG:INTEGRATION_POINTS] [TAG:SYSTEM_BOUNDARIES]**

### **13.1 ParamFields**

**Fields drive all generation:**
- StationCache reads from fields
- Cross-section generator uses StationCache
- Planform generator uses fields + StationCache

### **13.2 SVG Control Surface**

**SVG handles update fields:**
- Handle drags call setFieldKnot
- Local invalidation triggers rebuild
- Two-phase loop (FAST → FINAL)

### **13.3 Operators**

**Operators use contours:**
- Rib/Stringer Operator reads section contours
- Station contours from cross-section generator
- Deterministic geometry generation

### **13.4 ConstraintBundles**

**Constraints operate on geometry:**
- Constraint passes run in FINAL mode
- Fairing improves curvature
- Constraints validate geometry

### **13.5 Compiler**

**Compiler receives final geometry:**
- StationCache → Contours → GraphSpec
- Constraints applied
- Compiler generates meshes/colliders

**[END:TAG:INTEGRATION_POINTS]**

---

## 14. FILE DEPENDENCY GRAPH

**[TAG:FILE_DEPENDENCIES] [TAG:ARCHITECTURE]**

### **14.1 Core Field Evaluation Files**

```
fields/
  FieldEvaluator.ts              # Field1D evaluation contract
  StationCache.ts                # StationCache type and recompute
  CrossSectionGenerator.ts       # generateSectionContour implementation
  PlanformGenerator.ts           # generatePlanform implementation
  InverseMapping.ts              # SVG handle → field updates
```

### **14.2 Quality & Performance**

```
quality/
  QualityProfile.ts              # FAST/FINAL profiles
  RebuildEngine.ts               # rebuildDirtyWithQuality
  DirtyTracking.ts               # Local invalidation
```

### **14.3 Fairing & Constraints**

```
fairing/
  FairingAlgorithm.ts            # Visual-only fairing
  CurvatureSmoothing.ts          # Laplacian smoothing
  
constraints/
  ConstraintPasses.ts            # Run constraints in FINAL mode
```

**[END:TAG:FILE_DEPENDENCIES]**

---

## 15. RELATIONSHIP MATRIX

**[TAG:RELATIONSHIPS] [TAG:SYSTEM_MAP]**

### **15.1 System Relationships**

| System | Relationship | Purpose |
|--------|-------------|---------|
| ParamFields | Drives generation | Provides field values |
| StationCache | Single source of truth | Pre-evaluated values |
| Cross-Section Generator | Generates contours | Creates station slices |
| Planform Generator | Generates planform | Creates top-view curves |
| SVG Control | Updates fields | Handles field edits |
| Quality Switch | Controls detail | FAST vs FINAL modes |
| Constraints | Validates geometry | Fairing + validation |

### **15.2 Data Flow**

```
Fields → StationCache → Cross-Section Contours → Operators → GraphSpec → Compiler → Outputs
           ↓                    ↓
    Planform Curves      Bottom View Points
           ↓                    ↓
       SVG Top View        SVG Bottom View
```

### **15.3 Key Principles**

**Single Source of Truth:**
- StationCache is the only place to read field values
- All generators use cache
- No ad-hoc field evaluation

**Performance:**
- FAST mode for real-time editing
- FINAL mode for quality output
- Local invalidation (only affected stations)

**Determinism:**
- Same fields → same StationCache → same contours
- No randomness
- Stable across rebuilds

**Quality Levels:**
- FAST: Minimal samples, no constraints
- FINAL: Full samples, constraints, fairing
- Two-phase rebuild loop

**[END:TAG:RELATIONSHIPS]**

---

## 📋 SUMMARY

This system map documents the complete Field Evaluation & Cross-Section Generator System, including:

- **Field Evaluation Contract:** Field1D type and evaluation function
- **Cross-Section Generator:** Complete implementation (400+ lines pseudocode) for station contour generation
- **Top-View Planform Generator:** Forward mapping from fields to sheer/chine polylines
- **Inverse Mapping:** SVG handle drags → field updates with deterministic knot insertion
- **StationCache System:** Single source of truth for pre-evaluated field values
- **Quality Switch:** FAST vs FINAL modes for performance optimization
- **Local Invalidation:** Automatic dirty tracking and local rebuilds
- **Bottom View Generation:** FAST approximation vs FINAL extraction
- **Constraints Pass:** FINAL-only constraint validation and fairing
- **Fairing Algorithms:** Visual-only fairing that doesn't drift

**Total Document Size:** ~1,800+ lines  
**Source:** modelmaker.txt Lines 8949-10660+  
**Status:** Complete system mapping with all algorithms, pseudocode, and integration details extracted

---

*MASTER FIELD EVALUATION & CROSS-SECTION GENERATOR SYSTEM MAP*  
*Complete S.A.M. documentation for Field Evaluation & Cross-Section Generator System*  
*Version 1.0.0 | Date: 2025-01-27*



---


---

<!-- AUTO-GENERATED FROM: MASTER_POLYGON_2D_GEOMETRY_ALGORITHMS_SYSTEM_MAP.md -->
<!-- DO NOT EDIT THIS SECTION DIRECTLY -->
<!-- Source File: MASTER_POLYGON_2D_GEOMETRY_ALGORITHMS_SYSTEM_MAP.md -->
<!-- File Size: 46134 bytes -->

<a id='polygon-2d-geometry-algorithms-system-map'></a>

# MASTER POLYGON & 2D GEOMETRY ALGORITHMS SYSTEM MAP
**Complete System Anatomy Mapping - Polygon & 2D Geometry Algorithms Library**

**Date:** 2025-01-27  
**Version:** 1.0.0  
**Purpose:** Complete S.A.M. documentation for Polygon & 2D Geometry Algorithms Library (modelmaker.txt algorithms)  
**Status:** PHASE 1 - Foundation System Mapping  
**System:** Lucid Image Editor - Universal Parametric Asset Engine  
**Reference:** modelmaker.txt Polygon & 2D Geometry Algorithms (Lines 25462-27824+)

---

## 📋 TABLE OF CONTENTS

1. [System Overview](#1-system-overview)
2. [Sdf2D - Signed Distance Fields](#2-sdf2d---signed-distance-fields)
3. [SvgPathSampler - SVG Path to Polyline](#3-svgpathsampler---svg-path-to-polyline)
4. [Symmetry2D - Symmetry Operations](#4-symmetry2d---symmetry-operations)
5. [PolylineResample - Resampling and Normalization](#5-polylineresample---resampling-and-normalization)
6. [PolygonOffset - Constant-Thickness Offset](#6-polygonoffset---constant-thickness-offset)
7. [DistanceGrid2D - Cached Distance Grids](#7-distancegrid2d---cached-distance-grids)
8. [PolygonSelfIntersection - Self-Intersection Detection](#8-polygonselfintersection---self-intersection-detection)
9. [OffsetRelaxation - Automatic Relaxation](#9-offsetrelaxation---automatic-relaxation)
10. [CockpitPolygonVoidSdf - 3D Cockpit SDF](#10-cockpitpolygonvoidsdf---3d-cockpit-sdf)
11. [SlotPolygonVoidSdf - Slot SDF](#11-slotpolygonvoidsdf---slot-sdf)
12. [Integration Pipeline](#12-integration-pipeline)
13. [File Dependency Graph](#13-file-dependency-graph)
14. [Relationship Matrix](#14-relationship-matrix)

---

## 1. SYSTEM OVERVIEW

**[TAG:OVERVIEW] [TAG:POLYGON_ALGORITHMS] [TAG:2D_GEOMETRY]**

### **What is the Polygon & 2D Geometry Algorithms Library?**

**A complete library of production-ready TypeScript algorithms for 2D polygon manipulation, signed distance fields, SVG path processing, and 3D SDF generation from 2D polygons. This is the foundation for cockpit rim editing, slot generation, and void SDF creation.**

**Location:** Polygon & 2D Geometry Algorithms defined in modelmaker.txt (Lines 25462-27824+)  
**Purpose:** Provide robust, production-ready algorithms for 2D/3D geometry operations  
**Core Principle:** SVG → Polyline → Normalized Polygon → Offset → SDF → 3D Void

### **Key Features**

**2D Polygon Operations:**
- Signed distance fields (SDF) for polygons
- Polygon offsetting with rounded corners
- Self-intersection detection
- Automatic relaxation for offset failures
- Symmetry operations (mirror, enforce)
- Polyline resampling and normalization

**SVG Processing:**
- SVG path to polyline conversion
- Supports M/L/H/V/C/Q/Z commands
- Absolute and relative coordinates
- Curve sampling (quadratic, cubic)

**Performance Optimization:**
- Cached distance grids (O(1) lookups)
- Bilinear interpolation for fast queries
- Grid-based SDF caching

**3D SDF Generation:**
- Cockpit void SDF from 2D polygon
- Slot void SDF from 2D polygon
- Taper, floor shaping, rim fillets
- Depth profiles and wall tapering

### **What This System Provides**

**Production-ready algorithms:**
- Complete TypeScript implementations
- Well-tested, robust code
- Clear integration points
- Performance optimizations

**Editor integration:**
- SVG editor → polygon → SDF pipeline
- Symmetry enforcement
- Real-time offset visualization
- Automatic self-intersection handling

**Professional workflow:**
- Normalized polygons for stable editing
- Automatic relaxation for offset failures
- Cached grids for performance
- Clean separation of concerns

**[END:TAG:OVERVIEW]**

---

## 2. SDF2D - SIGNED DISTANCE FIELDS

**[TAG:SDF2D] [TAG:SIGNED_DISTANCE] [TAG:IMPLEMENTATION]**

### **2.1 Overview**

**Fast 2D signed distance for polygons with rounded offset support. Works great for cockpit rim outlines + slot outlines from your SVG editor.**

**Convention:** We use Vec2 = {x,z} mapped to (x,y) in 2D.

### **2.2 Complete Implementation**

```typescript
// Sdf2D.ts
// =====================================================================================
// 2D polygon signed distance (fast), plus rounded-offset and smoothing.
// Works great for cockpit rim outlines + slot outlines from your SVG editor.
// Convention: we use Vec2 = {x,z} mapped to (x,y) in 2D.
// =====================================================================================

export type Vec2 = { x: number; y: number };

const EPS = 1e-9;
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

export function dot(a: Vec2, b: Vec2) { return a.x * b.x + a.y * b.y; }
export function sub(a: Vec2, b: Vec2): Vec2 { return { x: a.x - b.x, y: a.y - b.y }; }
export function add(a: Vec2, b: Vec2): Vec2 { return { x: a.x + b.x, y: a.y + b.y }; }
export function mul(a: Vec2, s: number): Vec2 { return { x: a.x * s, y: a.y * s }; }
export function len2(a: Vec2) { return a.x * a.x + a.y * a.y; }
export function len(a: Vec2) { return Math.sqrt(len2(a)); }

export function distPointToSegment(p: Vec2, a: Vec2, b: Vec2): number {
  const ab = sub(b, a);
  const ap = sub(p, a);
  const denom = Math.max(EPS, len2(ab));
  const t = clamp(dot(ap, ab) / denom, 0, 1);
  const q = add(a, mul(ab, t));
  return len(sub(p, q));
}

// Even-odd winding test (robust enough for editor polylines)
export function pointInPolygon(p: Vec2, poly: Vec2[]): boolean {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const a = poly[i], b = poly[j];
    const intersect =
      ((a.y > p.y) !== (b.y > p.y)) &&
      (p.x < (b.x - a.x) * (p.y - a.y) / Math.max(EPS, (b.y - a.y)) + a.x);
    if (intersect) inside = !inside;
  }
  return inside;
}

// Signed distance to polygon boundary; negative inside.
export function sdPolygon(p: Vec2, poly: Vec2[]): number {
  let d = Infinity;
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i];
    const b = poly[(i + 1) % poly.length];
    d = Math.min(d, distPointToSegment(p, a, b));
  }
  const inside = pointInPolygon(p, poly);
  return inside ? -d : d;
}

// Rounded offset: sdOffset = sdPolygon - r (positive expands, negative shrinks)
export function sdRoundedPolygon(p: Vec2, poly: Vec2[], radius: number): number {
  return sdPolygon(p, poly) - radius;
}

// Optional smoothing helper (useful when blending shapes)
export function smin(a: number, b: number, k: number): number {
  // polynomial smooth min
  const h = clamp(0.5 + 0.5 * (b - a) / Math.max(EPS, k), 0, 1);
  return (a * h + b * (1 - h)) - k * h * (1 - h);
}
```

### **2.3 Key Functions**

**distPointToSegment:**
- Computes distance from point to line segment
- Uses parameter clamping for robustness

**pointInPolygon:**
- Even-odd winding rule
- Robust for editor polylines

**sdPolygon:**
- Signed distance to polygon boundary
- Negative inside, positive outside
- Computes minimum distance to all edges

**sdRoundedPolygon:**
- Rounded offset SDF
- Positive radius expands, negative shrinks

**smin:**
- Polynomial smooth minimum
- Useful for blending shapes

**[END:TAG:SDF2D]**

---

## 3. SVGPATHSAMPLER - SVG PATH TO POLYLINE

**[TAG:SVG_PATH] [TAG:SAMPLER] [TAG:IMPLEMENTATION]**

### **3.1 Overview**

**Minimal SVG path sampler → polyline. Supports: M/m, L/l, H/h, V/v, C/c, Q/q, Z/z. This is enough for cockpit rim curves and slot outlines. You can bypass this entirely if your editor already outputs points.**

### **3.2 Complete Implementation**

```typescript
// SvgPathSampler.ts
// =====================================================================================
// Minimal SVG path sampler -> polyline.
// Supports: M/m, L/l, H/h, V/v, C/c, Q/q, Z/z.
// This is enough for cockpit rim curves and slot outlines.
// You can bypass this entirely if your editor already outputs points.
// =====================================================================================

export type Vec2 = { x: number; y: number };

const EPS = 1e-9;

function isCmd(ch: string) {
  return /[a-zA-Z]/.test(ch);
}

function tokenizePath(d: string): string[] {
  // Split commands + numbers
  const tokens: string[] = [];
  let cur = "";
  for (let i = 0; i < d.length; i++) {
    const c = d[i];
    if (isCmd(c)) {
      if (cur.trim()) tokens.push(cur.trim());
      tokens.push(c);
      cur = "";
    } else {
      cur += c;
    }
  }
  if (cur.trim()) tokens.push(cur.trim());

  // Further split numeric groups by separators
  const out: string[] = [];
  for (const t of tokens) {
    if (t.length === 1 && isCmd(t)) out.push(t);
    else {
      const nums = t
        .replace(/-/g, " -")
        .replace(/,/g, " ")
        .trim()
        .split(/\s+/)
        .filter(Boolean);
      out.push(...nums);
    }
  }
  return out;
}

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

function sampleQuadratic(p0: Vec2, p1: Vec2, p2: Vec2, steps: number): Vec2[] {
  const out: Vec2[] = [];
  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    const a = { x: lerp(p0.x, p1.x, t), y: lerp(p0.y, p1.y, t) };
    const b = { x: lerp(p1.x, p2.x, t), y: lerp(p1.y, p2.y, t) };
    out.push({ x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t) });
  }
  return out;
}

function sampleCubic(p0: Vec2, p1: Vec2, p2: Vec2, p3: Vec2, steps: number): Vec2[] {
  const out: Vec2[] = [];
  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    const a = { x: lerp(p0.x, p1.x, t), y: lerp(p0.y, p1.y, t) };
    const b = { x: lerp(p1.x, p2.x, t), y: lerp(p1.y, p2.y, t) };
    const c = { x: lerp(p2.x, p3.x, t), y: lerp(p2.y, p3.y, t) };
    const d = { x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t) };
    const e = { x: lerp(b.x, c.x, t), y: lerp(b.y, c.y, t) };
    out.push({ x: lerp(d.x, e.x, t), y: lerp(d.y, e.y, t) });
  }
  return out;
}

export function sampleSvgPathToPolyline(d: string, opts?: { curveSteps?: number; }): Vec2[] {
  const steps = Math.max(4, opts?.curveSteps ?? 24);

  const tokens = tokenizePath(d);
  let i = 0;

  let cmd = "M";
  let cur: Vec2 = { x: 0, y: 0 };
  let start: Vec2 = { x: 0, y: 0 };

  const poly: Vec2[] = [];

  function readNum() {
    const v = parseFloat(tokens[i++]);
    return Number.isFinite(v) ? v : 0;
  }

  while (i < tokens.length) {
    if (isCmd(tokens[i])) cmd = tokens[i++];

    const rel = cmd === cmd.toLowerCase();
    const C = cmd.toUpperCase();

    if (C === "M") {
      const x = readNum(), y = readNum();
      cur = rel ? { x: cur.x + x, y: cur.y + y } : { x, y };
      start = { ...cur };
      poly.push({ ...cur });

      // Subsequent pairs are treated as implicit "L"
      while (i < tokens.length && !isCmd(tokens[i])) {
        const x2 = readNum(), y2 = readNum();
        cur = rel ? { x: cur.x + x2, y: cur.y + y2 } : { x: x2, y: y2 };
        poly.push({ ...cur });
      }
    }
    else if (C === "L") {
      while (i < tokens.length && !isCmd(tokens[i])) {
        const x = readNum(), y = readNum();
        cur = rel ? { x: cur.x + x, y: cur.y + y } : { x, y };
        poly.push({ ...cur });
      }
    }
    else if (C === "H") {
      while (i < tokens.length && !isCmd(tokens[i])) {
        const x = readNum();
        cur = rel ? { x: cur.x + x, y: cur.y } : { x, y: cur.y };
        poly.push({ ...cur });
      }
    }
    else if (C === "V") {
      while (i < tokens.length && !isCmd(tokens[i])) {
        const y = readNum();
        cur = rel ? { x: cur.x, y: cur.y + y } : { x: cur.x, y };
        poly.push({ ...cur });
      }
    }
    else if (C === "Q") {
      while (i < tokens.length && !isCmd(tokens[i])) {
        const x1 = readNum(), y1 = readNum();
        const x = readNum(), y = readNum();
        const p1 = rel ? { x: cur.x + x1, y: cur.y + y1 } : { x: x1, y: y1 };
        const p2 = rel ? { x: cur.x + x,  y: cur.y + y  } : { x, y };
        const seg = sampleQuadratic(cur, p1, p2, steps);
        poly.push(...seg);
        cur = p2;
      }
    }
    else if (C === "C") {
      while (i < tokens.length && !isCmd(tokens[i])) {
        const x1 = readNum(), y1 = readNum();
        const x2 = readNum(), y2 = readNum();
        const x = readNum(),  y = readNum();
        const p1 = rel ? { x: cur.x + x1, y: cur.y + y1 } : { x: x1, y: y1 };
        const p2 = rel ? { x: cur.x + x2, y: cur.y + y2 } : { x: x2, y: y2 };
        const p3 = rel ? { x: cur.x + x,  y: cur.y + y  } : { x, y };
        const seg = sampleCubic(cur, p1, p2, p3, steps);
        poly.push(...seg);
        cur = p3;
      }
    }
    else if (C === "Z") {
      // close
      if (Math.hypot(cur.x - start.x, cur.y - start.y) > EPS) poly.push({ ...start });
      cur = { ...start };
    }
    else {
      // skip unknown command tokens safely
      i++;
    }
  }

  return poly;
}
```

### **3.3 Supported Commands**

**M/m:** Move to (absolute/relative)  
**L/l:** Line to (absolute/relative)  
**H/h:** Horizontal line (absolute/relative)  
**V/v:** Vertical line (absolute/relative)  
**Q/q:** Quadratic Bezier (absolute/relative)  
**C/c:** Cubic Bezier (absolute/relative)  
**Z/z:** Close path

**[END:TAG:SVG_PATH]**

---

## 4. SYMMETRY2D - SYMMETRY OPERATIONS

**[TAG:SYMMETRY] [TAG:2D] [TAG:IMPLEMENTATION]**

### **4.1 Overview**

**Build symmetric rim/slot from half-curve (z>=0) or enforce symmetry on full curve. Supports optional asymmetry "delta" layer that can be toggled on/off. This is the "Laser mode" switch: perfectly symmetric until you intentionally break it.**

### **4.2 Complete Implementation**

```typescript
// Symmetry2D.ts
// =====================================================================================
// Build symmetric rim/slot from half-curve (z>=0) or enforce symmetry on full curve.
// Supports optional asymmetry "delta" layer that can be toggled on/off.
// =====================================================================================

import type { Vec2 } from "./Sdf2D";

export type SymMode = "half_mirror" | "full_enforce" | "free";

export function mirrorAboutCenterlineXZ(polyHalf: Vec2[]): Vec2[] {
  // assumes polyHalf runs around starboard side and includes centerline endpoints
  // returns full closed poly: starboard + reversed mirrored port (excluding duplicated endpoints)
  const star = polyHalf.slice();
  const port = polyHalf
    .slice(0, -1)
    .reverse()
    .map(p => ({ x: p.x, y: -p.y }));
  return [...star, ...port];
}

export function enforceSymmetryOnFull(poly: Vec2[]): Vec2[] {
  // average each point with its mirrored partner assuming consistent indexing
  // For editor usage: you typically keep a known vertex count; if not, use resampling first.
  const n = poly.length;
  const out: Vec2[] = new Array(n);
  for (let i = 0; i < n; i++) {
    const a = poly[i];
    const b = poly[(n - i) % n];
    const az = a.y;
    const bz = -b.y;
    const zAvg = 0.5 * (az + bz);
    out[i] = { x: a.x, y: zAvg };
  }
  return out;
}

export function applyAsymDelta(base: Vec2[], delta?: Vec2[], strength = 1): Vec2[] {
  if (!delta || delta.length !== base.length) return base;
  const s = strength;
  return base.map((p, i) => ({
    x: p.x + delta[i].x * s,
    y: p.y + delta[i].y * s
  }));
}
```

### **4.3 Recommended Workflow**

**Keep cockpit rim in half_mirror mode for Laser correctness.**

**If you want "damage / modification / custom boat", enable asym layer.**

**[END:TAG:SYMMETRY]**

---

## 5. POLYLINERESAMPLE - RESAMPLING AND NORMALIZATION

**[TAG:RESAMPLE] [TAG:NORMALIZATION] [TAG:IMPLEMENTATION]**

### **5.1 Overview**

**Arc-length resampling for polylines/polygons. This is the key to:**
- stable vertex count for symmetry pairing
- stable edits (dragging a point doesn't scramble point distribution)
- predictable SDF behavior

**Why this matters:** symmetry enforcement needs point i to correspond to point (N−i). Without this, enforcing symmetry causes "wobble" and drift.

### **5.2 Complete Implementation**

```typescript
// PolylineResample.ts
// =====================================================================================
// Arc-length resampling for polylines/polygons.
// This is the key to:
// - stable vertex count for symmetry pairing
// - stable edits (dragging a point doesn't scramble point distribution)
// - predictable SDF behavior
// =====================================================================================

export type Vec2 = { x: number; y: number };

const EPS = 1e-9;
const lerp = (a:number,b:number,t:number)=>a+(b-a)*t;

function dist(a:Vec2,b:Vec2){
  const dx=a.x-b.x, dy=a.y-b.y;
  return Math.sqrt(dx*dx+dy*dy);
}
function add(a:Vec2,b:Vec2):Vec2{ return {x:a.x+b.x,y:a.y+b.y}; }
function sub(a:Vec2,b:Vec2):Vec2{ return {x:a.x-b.x,y:a.y-b.y}; }
function mul(a:Vec2,s:number):Vec2{ return {x:a.x*s,y:a.y*s}; }

export function isClosed(poly: Vec2[]): boolean {
  if (poly.length < 3) return false;
  return dist(poly[0], poly[poly.length - 1]) < 1e-6;
}

export function closePolyline(poly: Vec2[]): Vec2[] {
  if (poly.length < 3) return poly.slice();
  if (isClosed(poly)) return poly.slice();
  return [...poly, { ...poly[0] }];
}

export function computeArcLengths(poly: Vec2[]): { s: number[]; total: number } {
  const p = poly;
  const s: number[] = [0];
  let acc = 0;
  for (let i = 1; i < p.length; i++) {
    acc += dist(p[i - 1], p[i]);
    s.push(acc);
  }
  return { s, total: acc };
}

export function sampleAtArc(poly: Vec2[], sArr: number[], targetS: number): Vec2 {
  // assumes sArr is monotonic and aligned with poly
  const n = poly.length;
  if (targetS <= 0) return { ...poly[0] };
  if (targetS >= sArr[n - 1]) return { ...poly[n - 1] };

  // binary search
  let lo = 0, hi = n - 1;
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (sArr[mid] < targetS) lo = mid;
    else hi = mid;
  }

  const s0 = sArr[lo], s1 = sArr[hi];
  const t = (targetS - s0) / Math.max(EPS, (s1 - s0));
  const a = poly[lo], b = poly[hi];
  return { x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t) };
}

/**
 * Resample to N points evenly spaced by arc-length.
 * If closed polygon, returns N points CLOSED (last duplicates first) optionally.
 */
export function resamplePolylineEven(polyIn: Vec2[], N: number, opts?: { closed?: boolean; includeLast?: boolean }): Vec2[] {
  const closed = opts?.closed ?? isClosed(polyIn);
  const includeLast = opts?.includeLast ?? closed; // for polygons, include closure by default

  let poly = polyIn.slice();
  if (closed) poly = closePolyline(poly);

  const { s, total } = computeArcLengths(poly);
  const out: Vec2[] = [];

  const count = Math.max(3, N);
  const denom = includeLast ? (count - 1) : count;

  for (let i = 0; i < count; i++) {
    const t = i / denom;
    const ss = t * total;
    out.push(sampleAtArc(poly, s, ss));
  }

  // enforce closure precisely if desired
  if (closed && includeLast) out[out.length - 1] = { ...out[0] };

  return out;
}

/**
 * Rotate polygon so its first point is the "best anchor":
 * - choose vertex with smallest x (forward-most) then smallest |y| (near centerline)
 * This makes symmetry pairing stable even if user edits reorder.
 */
export function rotatePolygonToAnchor(polyIn: Vec2[]): Vec2[] {
  const poly = polyIn.slice();
  const closed = isClosed(poly);
  const p = closed ? poly.slice(0, -1) : poly.slice();

  let best = 0;
  for (let i = 1; i < p.length; i++) {
    const a = p[i], b = p[best];
    if (a.x < b.x - 1e-9) best = i;
    else if (Math.abs(a.x - b.x) < 1e-9 && Math.abs(a.y) < Math.abs(b.y)) best = i;
  }

  const rotated = [...p.slice(best), ...p.slice(0, best)];
  if (closed) rotated.push({ ...rotated[0] });
  return rotated;
}

/**
 * Make a polygon "nice" for symmetry enforcement:
 * - close it
 * - resample to fixed N
 * - rotate to anchor
 */
export function normalizeClosedPolygon(poly: Vec2[], N: number): Vec2[] {
  const closed = closePolyline(poly);
  const res = resamplePolylineEven(closed, N, { closed: true, includeLast: true });
  return rotatePolygonToAnchor(res);
}
```

### **5.3 Key Functions**

**isClosed:** Check if polyline is closed  
**closePolyline:** Ensure polyline is closed  
**computeArcLengths:** Compute cumulative arc lengths  
**sampleAtArc:** Sample point at specific arc length (binary search)  
**resamplePolylineEven:** Resample to N evenly-spaced points  
**rotatePolygonToAnchor:** Rotate to stable anchor point  
**normalizeClosedPolygon:** Complete normalization pipeline

**[END:TAG:RESAMPLE]**

---

## 6. POLYGONOFFSET - CONSTANT-THICKNESS OFFSET

**[TAG:POLYGON_OFFSET] [TAG:OFFSET] [TAG:IMPLEMENTATION]**

### **6.1 Overview**

**Practical polygon offset (constant thickness) for closed polygons. Produces an offset polyline with optional rounded corners.**

**This is ideal for:**
- deck lip overhang outline
- cockpit coaming outline
- window trim, fender flare, etc.

**Assumes polygon is reasonably simple (non-self-intersecting). Use normalizeClosedPolygon() first.**

### **6.2 Complete Implementation**

```typescript
// PolygonOffset.ts
// =====================================================================================
// Practical polygon offset (constant thickness) for closed polygons.
// Produces an offset polyline with optional rounded corners.
//
// This is ideal for:
// - deck lip overhang outline
// - cockpit coaming outline
// - window trim, fender flare, etc.
//
// Assumes polygon is reasonably simple (non-self-intersecting).
// Use normalizeClosedPolygon() first.
// =====================================================================================

import type { Vec2 } from "./PolylineResample";

const EPS = 1e-9;

function sub(a:Vec2,b:Vec2):Vec2{ return {x:a.x-b.x,y:a.y-b.y}; }
function add(a:Vec2,b:Vec2):Vec2{ return {x:a.x+b.x,y:a.y+b.y}; }
function mul(a:Vec2,s:number):Vec2{ return {x:a.x*s,y:a.y*s}; }
function dot(a:Vec2,b:Vec2){ return a.x*b.x+a.y*b.y; }
function len(a:Vec2){ return Math.sqrt(a.x*a.x+a.y*a.y); }
function norm(a:Vec2):Vec2{ const L=Math.max(EPS,len(a)); return {x:a.x/L,y:a.y/L}; }
function perp(a:Vec2):Vec2{ return {x:-a.y,y:a.x}; } // left perpendicular
function cross(a:Vec2,b:Vec2){ return a.x*b.y - a.y*b.x; }

function lineIntersection(p:Vec2, r:Vec2, q:Vec2, s:Vec2): Vec2 | null {
  // p + t r intersects q + u s
  const rxs = cross(r, s);
  if (Math.abs(rxs) < 1e-9) return null;
  const t = cross(sub(q, p), s) / rxs;
  return add(p, mul(r, t));
}

function polygonArea(poly:Vec2[]): number {
  // poly closed or not; uses first N-1 if closed
  const n = poly.length;
  const m = (n>2 && poly[0].x===poly[n-1].x && poly[0].y===poly[n-1].y) ? n-1 : n;
  let A = 0;
  for (let i=0;i<m;i++){
    const a=poly[i], b=poly[(i+1)%m];
    A += a.x*b.y - a.y*b.x;
  }
  return 0.5*A;
}

export type OffsetOptions = {
  rounded?: boolean;
  cornerSteps?: number;  // arc steps per corner
};

export function offsetPolygon(polyClosed: Vec2[], offset: number, opts?: OffsetOptions): Vec2[] {
  const rounded = opts?.rounded ?? false;
  const steps = Math.max(2, opts?.cornerSteps ?? 6);

  // Ensure we work on non-duplicated endpoint
  const n = polyClosed.length;
  const isClosed = n>2 && polyClosed[0].x===polyClosed[n-1].x && polyClosed[0].y===polyClosed[n-1].y;
  const poly = isClosed ? polyClosed.slice(0,-1) : polyClosed.slice();

  const CCW = polygonArea(poly) > 0;
  // For CCW polygon, outward normal is "right" of edge direction; for CW it's left.
  // We'll compute edge dir and choose outward accordingly.
  const out: Vec2[] = [];

  for (let i=0;i<poly.length;i++){
    const prev = poly[(i-1+poly.length)%poly.length];
    const cur  = poly[i];
    const next = poly[(i+1)%poly.length];

    const e0 = norm(sub(cur, prev));
    const e1 = norm(sub(next, cur));

    // outward normals for each edge
    const n0 = CCW ? mul(perp(e0), -1) : perp(e0);
    const n1 = CCW ? mul(perp(e1), -1) : perp(e1);

    // Shifted lines: through cur with direction e0 and normal n0; and through cur with direction e1 and normal n1
    const p0 = add(cur, mul(n0, offset));
    const p1 = add(cur, mul(n1, offset));

    if (!rounded) {
      // Intersect the two shifted lines:
      // line0: p0 + t e0
      // line1: p1 + u e1
      const I = lineIntersection(p0, e0, p1, e1);
      out.push(I ?? add(cur, mul(norm(add(n0,n1)), offset)));
    } else {
      // Rounded corner: add arc between the two offset directions around the corner
      // We'll generate points on a circle centered at cur, radius=|offset|, sweeping from n0 to n1.
      const r = Math.abs(offset);
      // angle between normals
      const a0 = Math.atan2(n0.y, n0.x);
      const a1 = Math.atan2(n1.y, n1.x);

      // choose shortest sweep consistent with polygon exterior
      let da = a1 - a0;
      while (da <= -Math.PI) da += 2*Math.PI;
      while (da >  Math.PI) da -= 2*Math.PI;

      // For outward sweep, we might need to flip depending on sign of offset and winding.
      // Empirically: if offset>0, sweep should follow da; if offset<0, reverse.
      if (offset < 0) da = -da;

      for (let k=0;k<=steps;k++){
        const t = k/steps;
        const a = a0 + da*t;
        out.push({ x: cur.x + r*Math.cos(a), y: cur.y + r*Math.sin(a) });
      }
    }
  }

  // close
  out.push({ ...out[0] });
  return out;
}
```

### **6.3 How You Use It**

**Start with rim polygon from SVG (normalized & symmetric).**

**Make `rimOuter = offsetPolygon(rim, +lipOverhang, {rounded:true})`**

**Make `rimInner = offsetPolygon(rim, -lipThickness, {rounded:true})`**

**Use those as boundaries for "lip solid" SDFs or for deck overhang cutouts.**

**That gives you the "sharp where it should be sharp" but smooth where it should be smooth.**

**[END:TAG:POLYGON_OFFSET]**

---

## 7. DISTANCEGRID2D - CACHED DISTANCE GRIDS

**[TAG:DISTANCE_GRID] [TAG:PERFORMANCE] [TAG:IMPLEMENTATION]**

### **7.1 Overview**

**This is the performance unlock: instead of computing `sdPolygon()` (loop edges) for every query, you build a tiny grid (say 128×128) once per shape change and then distance queries are:**
- map (x,z) to UV
- bilinear sample distance

**This speeds up:**
- sample voxelization (cockpit samples)
- collision queries
- editor overlays

### **7.2 Complete Implementation**

```typescript
// DistanceGrid2D.ts
// =====================================================================================
// Build a small 2D signed distance grid for a polygon.
// Runtime queries become O(1) bilinear lookup.
// =====================================================================================

import type { Vec2 } from "./Sdf2D";
import { sdPolygon } from "./Sdf2D";

const EPS = 1e-9;
const clamp = (v:number,a:number,b:number)=>Math.max(a,Math.min(b,v));

export type Bounds2D = { min: Vec2; max: Vec2 };

export type DistanceGrid2D = {
  w: number;
  h: number;
  bounds: Bounds2D;
  data: Float32Array; // row-major, size w*h
};

export function computeBounds(poly: Vec2[], pad = 0): Bounds2D {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const p of poly) {
    minX = Math.min(minX, p.x);
    minY = Math.min(minY, p.y);
    maxX = Math.max(maxX, p.x);
    maxY = Math.max(maxY, p.y);
  }
  return { min: { x: minX - pad, y: minY - pad }, max: { x: maxX + pad, y: maxY + pad } };
}

export function buildDistanceGrid(poly: Vec2[], size: { w: number; h: number }, pad = 0.05): DistanceGrid2D {
  const w = Math.max(8, size.w);
  const h = Math.max(8, size.h);
  const bounds = computeBounds(poly, pad);

  const data = new Float32Array(w * h);

  const dx = (bounds.max.x - bounds.min.x) / Math.max(1, w - 1);
  const dy = (bounds.max.y - bounds.min.y) / Math.max(1, h - 1);

  for (let j = 0; j < h; j++) {
    const y = bounds.min.y + j * dy;
    for (let i = 0; i < w; i++) {
      const x = bounds.min.x + i * dx;
      data[j * w + i] = sdPolygon({ x, y }, poly);
    }
  }

  return { w, h, bounds, data };
}

export function sampleDistanceGrid(grid: DistanceGrid2D, p: Vec2): number {
  const { w, h, bounds, data } = grid;

  const u = (p.x - bounds.min.x) / Math.max(EPS, (bounds.max.x - bounds.min.x));
  const v = (p.y - bounds.min.y) / Math.max(EPS, (bounds.max.y - bounds.min.y));

  const x = clamp(u, 0, 1) * (w - 1);
  const y = clamp(v, 0, 1) * (h - 1);

  const x0 = Math.floor(x), y0 = Math.floor(y);
  const x1 = Math.min(w - 1, x0 + 1);
  const y1 = Math.min(h - 1, y0 + 1);

  const tx = x - x0;
  const ty = y - y0;

  const d00 = data[y0 * w + x0];
  const d10 = data[y0 * w + x1];
  const d01 = data[y1 * w + x0];
  const d11 = data[y1 * w + x1];

  const a = d00 * (1 - tx) + d10 * tx;
  const b = d01 * (1 - tx) + d11 * tx;
  return a * (1 - ty) + b * ty;
}
```

### **7.3 Key Functions**

**computeBounds:** Compute bounding box with optional padding  
**buildDistanceGrid:** Build distance grid from polygon  
**sampleDistanceGrid:** O(1) bilinear lookup

**[END:TAG:DISTANCE_GRID]**

---

## 8. POLYGONSELFINTERSECTION - SELF-INTERSECTION DETECTION

**[TAG:SELF_INTERSECTION] [TAG:DETECTION] [TAG:IMPLEMENTATION]**

### **8.1 Overview**

**Segment intersection for simple polygon (closed). Used to detect offset failures (lip/overhang).**

**When an offset polygon self-intersects, it's always because local curvature is too tight for the offset distance.**

### **8.2 Complete Implementation**

```typescript
// PolygonSelfIntersection.ts
// =====================================================================================
// Segment intersection for simple polygon (closed).
// Used to detect offset failures (lip/overhang).
// =====================================================================================

export type Vec2 = { x:number; y:number };

const EPS=1e-9;

function sub(a:Vec2,b:Vec2):Vec2{ return {x:a.x-b.x,y:a.y-b.y}; }
function cross(a:Vec2,b:Vec2){ return a.x*b.y - a.y*b.x; }

function segIntersect(a:Vec2,b:Vec2,c:Vec2,d:Vec2): boolean {
  // Proper intersection excluding shared endpoints
  const r = sub(b,a);
  const s = sub(d,c);
  const denom = cross(r,s);
  if (Math.abs(denom) < EPS) return false;

  const t = cross(sub(c,a), s) / denom;
  const u = cross(sub(c,a), r) / denom;

  if (t <= EPS || t >= 1-EPS) return false;
  if (u <= EPS || u >= 1-EPS) return false;
  return true;
}

export type IntersectionPair = { i:number; j:number }; // segments (i,i+1) and (j,j+1)

export function findSelfIntersections(polyClosed: Vec2[]): IntersectionPair[] {
  const n = polyClosed.length - 1;
  const hits: IntersectionPair[] = [];

  for (let i=0;i<n;i++){
    const a=polyClosed[i], b=polyClosed[i+1];
    for (let j=i+2;j<n;j++){
      // skip adjacent segments & wrap adjacency
      if (j === i) continue;
      if (j === i+1) continue;
      if (i === 0 && j === n-1) continue;

      const c=polyClosed[j], d=polyClosed[j+1];
      if (segIntersect(a,b,c,d)) hits.push({ i, j });
    }
  }
  return hits;
}
```

### **8.3 Key Functions**

**segIntersect:** Check if two line segments intersect (excluding endpoints)  
**findSelfIntersections:** Find all self-intersections in closed polygon

**[END:TAG:SELF_INTERSECTION]**

---

## 9. OFFSETRELAXATION - AUTOMATIC RELAXATION

**[TAG:OFFSET_RELAXATION] [TAG:AUTOMATIC] [TAG:IMPLEMENTATION]**

### **9.1 Overview**

**When offset polygon self-intersects, locally relax curvature around the involved segments. This runs *automatically* after offset computation.**

**Process:**
1. detect self-intersections
2. map the intersection back to nearby vertices
3. locally increase curvature radius by nudging vertices toward chord midpoints (same trick as earlier)

### **9.2 Complete Implementation**

```typescript
// OffsetRelaxation.ts
// =====================================================================================
// When offset polygon self-intersects, locally relax curvature around the involved segments.
// This runs *automatically* after offset computation.
// =====================================================================================

import type { Vec2 } from "./PolygonSelfIntersection";
import { findSelfIntersections } from "./PolygonSelfIntersection";

const EPS=1e-9;
const add=(a:Vec2,b:Vec2):Vec2=>({x:a.x+b.x,y:a.y+b.y});
const sub=(a:Vec2,b:Vec2):Vec2=>({x:a.x-b.x,y:a.y-b.y});
const mul=(a:Vec2,s:number):Vec2=>({x:a.x*s,y:a.y*s});

function localChordRelax(poly: Vec2[], idx:number, strength:number): void {
  const n = poly.length - 1;
  const i = ((idx % n) + n) % n;
  const prev = poly[(i-1+n)%n];
  const cur  = poly[i];
  const next = poly[(i+1)%n];
  const mid = mul(add(prev,next),0.5);
  poly[i] = add(cur, mul(sub(mid,cur), strength));
}

export function relaxIfSelfIntersect(polyClosed: Vec2[], passes=6, strength=0.35): Vec2[] {
  let poly = polyClosed.map(p=>({ ...p }));
  const n = poly.length - 1;

  for (let k=0;k<passes;k++){
    const hits = findSelfIntersections(poly);
    if (hits.length === 0) break;

    for (const h of hits){
      // relax around the two segments
      localChordRelax(poly, h.i, strength);
      localChordRelax(poly, h.i+1, strength*0.6);
      localChordRelax(poly, h.j, strength);
      localChordRelax(poly, h.j+1, strength*0.6);
    }
    poly[n] = { ...poly[0] };
  }

  poly[n] = { ...poly[0] };
  return poly;
}
```

### **9.3 Where This Slots In**

**Right after `offsetPolygon()`:**

```typescript
const lipOuter = relaxIfSelfIntersect(offsetPolygon(rim, +overhang, {rounded:true}), 6, 0.35);
const lipInner = relaxIfSelfIntersect(offsetPolygon(rim, -thickness, {rounded:true}), 6, 0.35);
```

**If it still intersects after relaxation, that's a signal your `minRadius` is too low for the chosen offset distance — so you can auto-raise `minRadius` or auto-strengthen curvature limiting.**

**[END:TAG:OFFSET_RELAXATION]**

---

## 10. COCKPITPOLYGONVOIDSDF - 3D COCKPIT SDF

**[TAG:COCKPIT_SDF] [TAG:3D_SDF] [TAG:IMPLEMENTATION]**

### **10.1 Overview**

**Turn your cockpit rim polygon (2D XZ) into a real 3D SDF cockpit void with:**
- mouth plane at mouthY
- depth = wellDepth (downwards)
- wall taper with depth
- floor rounding

**All driven by editor curves rather than sliders.**

**This is the core: a cockpit is not just "extruded down"; it has **taper**, **floor shaping**, **rim fillet**, etc.**

### **10.2 SDF Model**

**Take 2D rim polygon in XZ.**
**Signed distance `d2 = sdRoundedPolygon((x,z), poly, rimRadius)`**
**Then create a "well" by combining:**
- **vertical bound** (between mouth plane and floor)
- **taper** (rim shrinks with depth)
- **floor rounding**

### **10.3 Complete Implementation**

```typescript
// CockpitPolygonVoidSdf.ts
// =====================================================================================
// Turn your cockpit rim polygon (2D XZ) into a real 3D SDF cockpit void with:
// - mouth plane at mouthY
// - depth = wellDepth (downwards)
// - wall taper with depth
// - floor rounding
//
// All driven by editor curves rather than sliders.
// =====================================================================================

import * as THREE from "three";
import { sdRoundedPolygon, smin, Vec2 } from "./Sdf2D";

const EPS = 1e-9;
const clamp = (v:number,a:number,b:number)=>Math.max(a,Math.min(b,v));
const sat = (v:number)=>clamp(v,0,1);

export type CockpitPolyParams = {
  // polygon in local XZ plane, CLOSED polyline expected
  rimPolyXZ: Vec2[];
  center: {x:number;y:number;z:number};
  mouthY: number;        // local Y of mouth plane
  wellDepth: number;     // depth downward from mouth
  rimRadius: number;     // rounded offset radius for rim
  wallTaper: number;     // 0..1, how much rim shrinks with depth (0=vertical, 1=cone)
  floorRound: number;    // floor rounding radius
  floorDepthAtX?: (x:number)=>number; // optional: floor depth varies with X
};

export function makeCockpitPolygonVoidSdf(P: CockpitPolyParams){
  const c = new THREE.Vector3(P.center.x, P.center.y, P.center.z);
  
  return (pL:THREE.Vector3)=>{
    const q = pL.clone().sub(c);
    
    // 2D distance in XZ
    const dXZ = sdRoundedPolygon({x:q.x, y:q.z}, P.rimPolyXZ, P.rimRadius);
    
    // Apply taper: rim shrinks with depth
    const yRel = (q.y - P.mouthY) / Math.max(EPS, -P.wellDepth); // 0 at mouth, 1 at floor
    const taper = 1.0 - P.wallTaper * sat(yRel);
    const dXZTapered = dXZ / Math.max(EPS, taper);
    
    // Vertical bounds: mouth plane and floor
    const floorY = P.mouthY - P.wellDepth;
    const floorYActual = P.floorDepthAtX ? (P.mouthY - P.floorDepthAtX(q.x)) : floorY;
    
    const dTop = q.y - P.mouthY;      // above mouth
    const dBot = floorYActual - q.y;   // below floor
    
    // Combine: max of XZ distance and vertical bounds
    const dY = Math.max(dTop, dBot);
    let d = Math.max(dXZTapered, dY);
    
    // Floor rounding
    if (P.floorRound > EPS && q.y < floorYActual + P.floorRound){
      const dFloor = Math.max(0, floorYActual - q.y);
      const dRound = dFloor - P.floorRound;
      d = smin(d, dRound, P.floorRound * 0.5);
    }
    
    return d;
  };
}
```

**[END:TAG:COCKPIT_SDF]**

---

## 11. SLOTPOLYGONVOIDSDF - SLOT SDF

**[TAG:SLOT_SDF] [TAG:3D_SDF] [TAG:IMPLEMENTATION]**

### **11.1 Overview**

**Same pattern: slot outline from editor, extruded through hull thickness.**

### **11.2 Complete Implementation**

```typescript
// SlotPolygonVoidSdf.ts
import * as THREE from "three";
import { sdRoundedPolygon, Vec2 } from "./Sdf2D";

const EPS=1e-9;

export type SlotPolyParams = {
  polyXZ: Vec2[];           // closed
  center: {x:number;y:number;z:number};
  radius: number;           // rounded offset
  yMin: number;             // local Y lower bound
  yMax: number;             // local Y upper bound
};

export function makeSlotPolygonVoidSdf(P: SlotPolyParams){
  const c = new THREE.Vector3(P.center.x,P.center.y,P.center.z);
  return (pL:THREE.Vector3)=>{
    const q = pL.clone().sub(c);
    const dXZ = sdRoundedPolygon({x:q.x,y:q.z}, P.polyXZ, P.radius);

    // y slab
    const dTop = q.y - P.yMax;
    const dBot = P.yMin - q.y;
    const dY = Math.max(dTop, dBot);

    return Math.max(dXZ, dY);
  };
}
```

**[END:TAG:SLOT_SDF]**

---

## 12. INTEGRATION PIPELINE

**[TAG:INTEGRATION] [TAG:PIPELINE]**

### **12.1 Complete Cockpit Pipeline**

**Step A: from SVG to stable symmetric polygon**

```typescript
import { sampleSvgPathToPolyline } from "./SvgPathSampler";
import { normalizeClosedPolygon } from "./PolylineResample";
import { mirrorAboutCenterlineXZ } from "./Symmetry2D";

// 1) sample
const rimRaw = sampleSvgPathToPolyline(rimPathD, { curveSteps: 24 });

// 2) (optional) if rimPathD is half curve: mirror first
const rimHalf = rimRaw; // if half
const rimFull = mirrorAboutCenterlineXZ(rimHalf);

// 3) normalize (fixed N, stable anchor)
const rim = normalizeClosedPolygon(rimFull, 256);
```

**Step B: build constant-thickness outlines (lip/coaming)**

```typescript
import { offsetPolygon } from "./PolygonOffset";
import { relaxIfSelfIntersect } from "./OffsetRelaxation";

const lipOuter = relaxIfSelfIntersect(offsetPolygon(rim, +lipOverhang, {rounded:true}), 6, 0.35);
const lipInner = relaxIfSelfIntersect(offsetPolygon(rim, -lipThickness, {rounded:true}), 6, 0.35);
```

**Step C: build 3D SDF**

```typescript
import { makeCockpitPolygonVoidSdf } from "./CockpitPolygonVoidSdf";
import { makeSlotPolygonVoidSdf } from "./SlotPolygonVoidSdf";

this.cockpitSdf = makeCockpitPolygonVoidSdf({
  rimPolyXZ: rimFull,
  center: { x: P.cockpit.center.x, y: P.cockpit.center.y, z: P.cockpit.center.z },
  mouthY: P.cockpit.mouthY,
  wellDepth: P.cockpit.wellDepth,
  rimRadius: P.cockpit.rimRadius,
  wallTaper: P.cockpit.wallTaper,
  floorRound: P.cockpit.floorRound,
  floorDepthAtX: (x)=> floorCurveEval(P.cockpit.floorCurve, x), // optional
});

const slotPoly = sampleSvgPathToPolyline(P.trunk.slotPathD, { curveSteps: 16 });

this.slotSdf = makeSlotPolygonVoidSdf({
  polyXZ: slotPoly,
  center: { x: P.trunk.slotCenter.x, y: 0, z: P.trunk.slotCenter.z },
  radius: P.trunk.slotRadius,
  yMin: P.trunk.slotYMin,
  yMax: P.trunk.slotYMax,
});
```

### **12.2 Performance Optimization**

**Use DistanceGrid2D for frequent queries:**

```typescript
import { buildDistanceGrid, sampleDistanceGrid } from "./DistanceGrid2D";

const grid = buildDistanceGrid(rim, { w: 128, h: 128 }, 0.05);
const d = sampleDistanceGrid(grid, { x, y }); // O(1) lookup
```

**[END:TAG:INTEGRATION]**

---

## 13. FILE DEPENDENCY GRAPH

**[TAG:FILE_DEPENDENCIES] [TAG:ARCHITECTURE]**

### **13.1 Core Algorithm Files**

```
algorithms/
  Sdf2D.ts                    # Signed distance fields
  SvgPathSampler.ts           # SVG path to polyline
  Symmetry2D.ts               # Symmetry operations
  PolylineResample.ts         # Resampling and normalization
  PolygonOffset.ts            # Constant-thickness offset
  DistanceGrid2D.ts           # Cached distance grids
  PolygonSelfIntersection.ts  # Self-intersection detection
  OffsetRelaxation.ts         # Automatic relaxation
  CockpitPolygonVoidSdf.ts    # 3D cockpit SDF
  SlotPolygonVoidSdf.ts       # Slot SDF
```

### **13.2 Dependency Graph**

```
SvgPathSampler → PolylineResample → Symmetry2D
                                      ↓
                              normalizeClosedPolygon
                                      ↓
                              PolygonOffset → OffsetRelaxation
                                      ↓
                              DistanceGrid2D (optional)
                                      ↓
                              CockpitPolygonVoidSdf / SlotPolygonVoidSdf
```

**[END:TAG:FILE_DEPENDENCIES]**

---

## 14. RELATIONSHIP MATRIX

**[TAG:RELATIONSHIPS] [TAG:SYSTEM_MAP]**

### **14.1 System Relationships**

| System | Relationship | Purpose |
|--------|-------------|---------|
| SVG Editor | Provides input | SVG path strings |
| SvgPathSampler | Converts SVG | SVG → Polyline |
| PolylineResample | Normalizes | Stable vertex count |
| Symmetry2D | Enforces symmetry | Perfect symmetry |
| PolygonOffset | Creates offsets | Lip/coaming outlines |
| OffsetRelaxation | Fixes failures | Automatic correction |
| DistanceGrid2D | Optimizes queries | O(1) lookups |
| CockpitPolygonVoidSdf | Creates 3D void | Cockpit SDF |
| SlotPolygonVoidSdf | Creates 3D void | Slot SDF |

### **14.2 Data Flow**

```
SVG Path → SvgPathSampler → Polyline → normalizeClosedPolygon → Symmetry2D
                                                                      ↓
                                                              PolygonOffset
                                                                      ↓
                                                              OffsetRelaxation (if needed)
                                                                      ↓
                                                              DistanceGrid2D (optional)
                                                                      ↓
                                                              CockpitPolygonVoidSdf / SlotPolygonVoidSdf
                                                                      ↓
                                                              LaserVoidKernel
```

### **14.3 Key Principles**

**Production-Ready:**
- Complete TypeScript implementations
- Well-tested, robust code
- Clear integration points

**Performance:**
- Cached grids for O(1) lookups
- Efficient algorithms
- Minimal allocations

**Stability:**
- Normalized polygons for stable editing
- Automatic relaxation for failures
- Symmetry enforcement

**Integration:**
- Clean separation of concerns
- Modular design
- Easy to test

**[END:TAG:RELATIONSHIPS]**

---

## 📋 SUMMARY

This system map documents the complete Polygon & 2D Geometry Algorithms Library, including:

- **Sdf2D:** Signed distance fields for polygons with rounded offset support
- **SvgPathSampler:** SVG path to polyline conversion (M/L/H/V/C/Q/Z)
- **Symmetry2D:** Symmetry operations (mirror, enforce, asymmetry layer)
- **PolylineResample:** Arc-length resampling and normalization
- **PolygonOffset:** Constant-thickness offset with rounded corners
- **DistanceGrid2D:** Cached distance grids for O(1) lookups
- **PolygonSelfIntersection:** Self-intersection detection
- **OffsetRelaxation:** Automatic relaxation for offset failures
- **CockpitPolygonVoidSdf:** 3D cockpit SDF from 2D polygon
- **SlotPolygonVoidSdf:** Slot SDF from 2D polygon
- **Integration Pipeline:** Complete workflow from SVG to 3D SDF

**Total Document Size:** ~2,200+ lines  
**Source:** modelmaker.txt Lines 25462-27824+  
**Status:** Complete system mapping with all algorithms, implementations, and integration details extracted

---

*MASTER POLYGON & 2D GEOMETRY ALGORITHMS SYSTEM MAP*  
*Complete S.A.M. documentation for Polygon & 2D Geometry Algorithms Library*  
*Version 1.0.0 | Date: 2025-01-27*



---


---

<!-- AUTO-GENERATED FROM: MASTER_CROSS_SECTION_GENERATOR_REFINEMENTS_SYSTEM_MAP.md -->
<!-- DO NOT EDIT THIS SECTION DIRECTLY -->
<!-- Source File: MASTER_CROSS_SECTION_GENERATOR_REFINEMENTS_SYSTEM_MAP.md -->
<!-- File Size: 21502 bytes -->

<a id='cross-section-generator-refinements-system-map'></a>

# MASTER CROSS-SECTION GENERATOR REFINEMENTS SYSTEM MAP
**Complete System Anatomy Mapping - Cross-Section Generator Refinements**

**Date:** 2025-01-27  
**Version:** 1.0.0  
**Purpose:** Complete S.A.M. documentation for Cross-Section Generator Refinements (modelmaker.txt Step A-E + extensions)  
**Status:** PHASE 1 - Foundation System Mapping  
**System:** Lucid Image Editor - Universal Parametric Asset Engine  
**Reference:** modelmaker.txt Cross-Section Generator Refinements (Lines 15761-16274+)

---

## 📋 TABLE OF CONTENTS

1. [System Overview](#1-system-overview)
2. [Step A: Normalized Coordinate](#2-step-a-normalized-coordinate)
3. [Step B: Centerline Depth Profile (V / Deadrise)](#3-step-b-centerline-depth-profile-v--deadrise)
4. [Step C: Bilge Rounding (Blend to "Side Curve")](#4-step-c-bilge-rounding-blend-to-side-curve)
5. [Step D: Flare (Horizontal Remap Near Top)](#5-step-d-flare-horizontal-remap-near-top)
6. [Step E: Meet Deck Edge Cleanly](#6-step-e-meet-deck-edge-cleanly)
7. [Bow Collapse Algorithm](#7-bow-collapse-algorithm)
8. [Outputs and Evaluators](#8-outputs-and-evaluators)
9. [DeckSurfaceNode (Two-Surface Deck Lip)](#9-decksurfacenode-two-surface-deck-lip)
10. [Colliders and Simulation-Ready Outputs](#10-colliders-and-simulation-ready-outputs)
11. [Orthographic Fitting Loop](#11-orthographic-fitting-loop)
12. [Integration Points](#12-integration-points)
13. [File Dependency Graph](#13-file-dependency-graph)
14. [Relationship Matrix](#14-relationship-matrix)

---

## 1. SYSTEM OVERVIEW

**[TAG:OVERVIEW] [TAG:CROSS_SECTION_REFINEMENTS] [TAG:ALGORITHMS]**

### **What are the Cross-Section Generator Refinements?**

**Advanced algorithmic refinements that extend the core cross-section generator with normalized coordinates, bilge rounding, flare, deck edge matching, bow collapse handling, deck surface generation, collider optimization, and orthographic fitting. These refinements ensure production-quality geometry with proper edge matching, realistic hull shapes, and simulation-ready outputs.**

**Location:** Cross-Section Generator Refinements defined in modelmaker.txt (Lines 15761-16274+)  
**Purpose:** Provide advanced refinements for production-quality cross-section generation  
**Core Principle:** Extend core generator with normalized coordinates, blending algorithms, edge matching, and optimization techniques

### **Key Features**

**Normalized Coordinate System:**
- Normalized coordinate t = |z|/zSheer(s) clamped to [0,1]
- Enables parameterization independent of absolute beam
- Simplifies blending and remapping operations

**Bilge Rounding:**
- Blend between V-hull and side curve
- Smooth transition using smoothstep weighting
- Controls hull shape near chine

**Flare:**
- Horizontal remap near top of hull
- Applied as t remap, not raw y offset
- Controls how much sides lean out/in

**Deck Edge Matching:**
- Force section to pass exactly through deck edge
- Prevents "deck mismatch seams"
- Correction ramp for clean connection

**Bow Collapse:**
- Smooth section shrinking to point at bow
- Prevents pinching and geometric artifacts
- Scales beam and depth with bowAlpha parameter

**Deck Surface Generation:**
- Two-surface deck lip (top + underside)
- Sharp break between surfaces
- Controlled by field curves

**Collider Optimization:**
- Simplified collider meshes (fewer stations/samples)
- Rebuild on release or progressive update
- Triangle mesh or convex decomposition

**Orthographic Fitting:**
- Distance transform error computation
- Station-binned error mapping
- Automated parameter suggestion

### **What This System Provides**

**Production-quality geometry:**
- Clean edge matching (no seams)
- Realistic hull shapes (bilge, flare)
- Proper bow collapse (no artifacts)

**Simulation-ready outputs:**
- Optimized colliders
- Attachment frames
- Evaluator functions

**Automated fitting:**
- Orthographic reference matching
- Error diagnostics
- Parameter suggestions

**[END:TAG:OVERVIEW]**

---

## 2. STEP A: NORMALIZED COORDINATE

**[TAG:NORMALIZED_COORDINATE] [TAG:STEP_A] [TAG:ALGORITHM]**

### **2.1 Overview**

**Normalized coordinate system that parameterizes cross-section by lateral position relative to sheer half-beam.**

### **2.2 Formula**

```
t = |z| / zSheer(s)  clamped to [0,1]
```

Where:
- `t`: Normalized coordinate (0 = centerline, 1 = sheer edge)
- `z`: Lateral position (half-breadth)
- `zSheer(s)`: Sheer half-beam at station s

### **2.3 Purpose**

**Enables parameterization independent of absolute beam:**
- Same formulas work for different beam values
- Simplifies blending operations
- Makes remapping operations straightforward

**Key Benefit:** Parameterization by fraction of beam rather than absolute meters

**[END:TAG:NORMALIZED_COORDINATE]**

---

## 3. STEP B: CENTERLINE DEPTH PROFILE (V / DEADRISE)

**[TAG:CENTERLINE_DEPTH] [TAG:STEP_B] [TAG:V_HULL]**

### **3.1 Overview**

**V-hull depth profile along centerline from keel to chine. This defines the V-shape of the bottom.**

### **3.2 Formula**

```
y_V(t) = y_Keel(s) + vDepth(s) · t^vExp(s)
```

Where:
- `y_V(t)`: Vertical position at normalized coordinate t
- `y_Keel(s)`: Keel baseline height at station s
- `vDepth(s)`: V-depth (meters) at station s
- `vExp(s)`: V-shape exponent at station s (higher = sharper V)
- `t`: Normalized coordinate (0 = keel/centerline, 1 = chine)

### **3.3 Interpretation**

**V-shape profile:**
- `t=0`: At keel (centerline), `y_V = y_Keel` (lowest point)
- `t=1`: At chine, `y_V = y_Keel + vDepth` (higher than keel)
- `vExp`: Controls sharpness (higher exponent = sharper V near centerline)

**This defines the basic V-hull shape before bilge rounding and flare are applied.**

**[END:TAG:CENTERLINE_DEPTH]**

---

## 4. STEP C: BILGE ROUNDING (BLEND TO "SIDE CURVE")

**[TAG:BILGE_ROUNDING] [TAG:STEP_C] [TAG:BLENDING]**

### **4.1 Overview**

**Blend between V-hull profile and side curve to create rounded bilge. Keeps sides from staying too deep near the top.**

### **4.2 Side Target Curve**

**Define a "side target" curve:**

```
y_S(t) = y_Keel(s) + vDepth(s) · (1 - (1-t)^pSide)
```

Where:
- `y_S(t)`: Side target vertical position
- `pSide`: Side exponent (controls side curvature)
- `t`: Normalized coordinate (0 = keel, 1 = chine)

**This curve keeps sides from staying too deep near the top (at higher t values).**

### **4.3 Bilge Blending**

**Blend V-hull and side curve using bilge parameter b (0..1):**

```
w(t) = smoothstep(t_b - ε, t_b + ε, t)
```

Where:
- `t_b`: Bilge transition point from bilgeRound(s)
- `ε`: Transition width (small smoothing region)
- `w(t)`: Blend weight (0 = V-hull, 1 = side curve)

**Final blended profile:**

```
y_raw(t) = lerp(y_V(t), y_S(t), w(t))
```

### **4.4 Interpretation**

**Bilge rounding:**
- `b=0`: Pure V-hull (sharp, no rounding)
- `b=1`: Rounded bilge (smooth transition to sides)
- `t_b`: Where rounding begins (lower = more rounding)

**This creates smooth, realistic hull shapes with proper bilge rounding.**

**[END:TAG:BILGE_ROUNDING]**

---

## 5. STEP D: FLARE (HORIZONTAL REMAP NEAR TOP)

**[TAG:FLARE] [TAG:STEP_D] [TAG:REMAP]**

### **5.1 Overview**

**Flare is best applied as a remap of t, not as a raw y offset. This controls how much the sides lean out (flare) or lean in (tumblehome) near the top.**

### **5.2 Formula**

```
t' = t^(1/(1+flare(s)))
```

Where:
- `t'`: Remapped normalized coordinate
- `t`: Original normalized coordinate
- `flare(s)`: Flare parameter at station s (positive = flare out, negative = tumblehome)

### **5.3 Interpretation**

**Flare remapping:**
- `flare > 0`: Sides flare outward (t' < t near top, pushes area outward)
- `flare = 0`: No flare (t' = t, vertical sides)
- `flare < 0`: Tumblehome (sides lean inward)

**Use t' in the side portion or in the blend instead of t.**

### **5.4 Key Principle**

**Flare is a horizontal remap, not a vertical offset. This ensures:**
- Area distribution changes correctly
- Volume changes are predictable
- No vertical distortion

**[END:TAG:FLARE]**

---

## 6. STEP E: MEET DECK EDGE CLEANLY

**[TAG:DECK_EDGE] [TAG:STEP_E] [TAG:EDGE_MATCHING]**

### **6.1 Overview**

**Force the section to pass exactly through the deck edge to prevent "deck mismatch seams".**

### **6.2 Deck Edge Height**

**Compute deck edge height at the sheer point:**

```
y_deckEdge(s) = deckY(s, zSheer(s))
```

Where:
- `y_deckEdge(s)`: Deck edge height at station s
- `deckY(s, z)`: Deck surface height at station s and lateral position z
- `zSheer(s)`: Sheer half-beam at station s

### **6.3 Correction Ramp**

**Force the section to pass exactly through that point:**

**Let `y_edge = y_raw(1)` (current value at t=1)**

**Add a correction ramp:**

```
y(t) = y_raw(t) + (y_deckEdge - y_edge) · t^pMatch
```

Where:
- `y(t)`: Final vertical position
- `y_raw(t)`: Raw profile from previous steps
- `y_deckEdge`: Target deck edge height
- `y_edge`: Current edge height from raw profile
- `pMatch`: Match exponent (controls ramp shape)

### **6.4 Purpose**

**This prevents "deck mismatch seams" by ensuring:**
- Section passes exactly through deck edge
- Clean connection between hull and deck
- No gaps or overlaps

**Key Benefit:** Perfect geometric continuity between hull and deck surfaces

**[END:TAG:DECK_EDGE]**

---

## 7. BOW COLLAPSE ALGORITHM

**[TAG:BOW_COLLAPSE] [TAG:ALGORITHM]**

### **7.1 Overview**

**Near bow, you must shrink the entire section smoothly to a point without pinching. This is "the thing that usually breaks" if not handled properly.**

### **7.2 Bow Alpha Parameter**

**Let `bowAlpha(s) = 0` (normal hull) → `1` (full collapse at tip)**

**Use it to scale:**

**Beam scaling:**
```
zSheer(s) *= (1 - bowAlpha)^pShrink
```

**Depth scaling:**
```
vDepth(s) *= (1 - bowAlpha)^pDepth
```

Where:
- `pShrink`: Beam shrink exponent
- `pDepth`: Depth shrink exponent

### **7.3 Bow Round-to-Top Blend**

**Optionally raise keel with a bow "round-to-top" blend:**

```
yKeel(s) += bowAlpha · bowRoundGain(s)
```

This raises the keel as bow collapses to create a rounded bow shape.

### **7.4 Nose Round Falloff**

**Introduce a "nose round falloff" that rounds the keel ridge into the bow dome:**

**Blend `vExp(s)` toward 2-4 as `bowAlpha → 1` so the ridge softens:**

```
vExp(s) = lerp(vExp_base(s), 3.0, bowAlpha)
```

This softens the V-shape near the bow tip.

### **7.5 Purpose**

**Ensures:**
- Smooth section shrinking to point
- No pinching or geometric artifacts
- Realistic bow shape

**Key Benefit:** Proper bow collapse without geometric failures

**[END:TAG:BOW_COLLAPSE]**

---

## 8. OUTPUTS AND EVALUATORS

**[TAG:OUTPUTS] [TAG:EVALUATORS]**

### **8.1 Mesh Outputs**

**Primary output:**
- `mesh.hullOuter`: Hull outer surface mesh

### **8.2 Evaluator Functions**

**These evaluators are "gold" - used by deck lip, cockpit, attachments, and colliders:**

**Hull height evaluator:**
```
hullY(s, z) → y
```

Returns vertical position y at station s and lateral position z.

**Hull normal evaluator:**
```
hullNormal(s, z) → normal
```

Returns surface normal at station s and lateral position z (computed via finite differences).

**Keel curve evaluator:**
```
keelY(s) → y
```

Returns keel baseline height at station s.

**Sheer curve evaluator:**
```
sheerZ(s) → z
```

Returns sheer half-beam at station s.

### **8.3 Usage**

**These evaluators enable:**
- Deck lip generation (uses hullY and hullNormal)
- Cockpit cutout (uses hullY to define void)
- Attachment frames (uses hullY and hullNormal for positioning)
- Collider generation (uses hullY for simplified mesh)
- Hardpoint placement (uses evaluators for precise positioning)

**Key Benefit:** All downstream systems can query hull geometry without regenerating full mesh

**[END:TAG:OUTPUTS]**

---

## 9. DECKSURFACENODE (TWO-SURFACE DECK LIP)

**[TAG:DECK_SURFACE] [TAG:DECKSURFACENODE]**

### **9.1 Overview**

**Two-surface deck lip with sharp break. If you want a crisp lower break, you do separate surfaces:**

- **deckTop:** Centerline crown → edge rounding → meets sheer
- **deckUnderLip:** Outer edge → underside drop/overhang → blends into hull side

### **9.2 Surface Structure**

**deckTop:**
- Starts at centerline with crown
- Curves to edge with rounding
- Meets hull at `zSheer(s)` with same y

**deckUnderLip:**
- Starts at outer edge (sheer)
- Drops down with overhang
- Blends into hull side at `zJoin(s)`

### **9.3 Contract Edges**

**deckTop outermost ring must meet hull at `zSheer(s)` with same y**

**deckUnderLip inner ring must meet hull side at a specific `zJoin(s)` with chosen blend**

### **9.4 Fields Controlling Deck**

**deck.sheerCL(s):** Baseline height at centerline  
**deck.crown(s):** Crown height (if used)  
**deck.edgeRadius(s):** Edge rounding radius  
**deck.lipOverhang(s):** Lip overhang distance  
**deck.lipDrop(s):** Lip vertical drop  
**deck.breakSharpness(s):** Break sharpness between surfaces

### **9.5 Update Strategy**

**During drag:** Update only the deck vertices in dirty station range (positions only)

**On release:** Compute normals, rebuild collider seams if needed

### **9.6 Purpose**

**Enables:**
- Crisp deck lip with sharp break
- Realistic deck overhang
- Clean connection to hull

**Key Benefit:** Professional deck geometry with proper lip detail

**[END:TAG:DECK_SURFACE]**

---

## 10. COLLIDERS AND SIMULATION-READY OUTPUTS

**[TAG:COLLIDERS] [TAG:SIMULATION]**

### **10.1 Hull Collider Strategy (Fast + Stable)**

**Don't feed full render mesh into physics.**

**Build a simplified hull collider as:**
- Fewer stations (NsC)
- Fewer section samples (KC)
- Optionally no deck, only below sheer

**Rebuild collider only on release or every ~200 ms if you want progressive.**

### **10.2 Outputs**

**Triangle mesh collider or a convex decomposition proxy if you prefer.**

### **10.3 Attachment Frames**

**Frames are sampled from evaluators:**

**Mast step:**
- At `(s_M, z=0)` on deck surface
- Uses `hullY(s_M, 0)` and `hullNormal(s_M, 0)`

**Gudgeons:**
- Near stern on transom plane
- Uses stern station evaluators

**Traveler blocks:**
- Deck edge frames at specified s positions
- Uses `hullY(s, zSheer(s))` and `hullNormal(s, zSheer(s))`

**This makes rigging "auto-follow" hull edits.**

### **10.4 Purpose**

**Provides:**
- Fast, stable physics simulation
- Simplified colliders (better performance)
- Automatic attachment positioning

**Key Benefit:** Simulation-ready outputs that automatically update with hull edits

**[END:TAG:COLLIDERS]**

---

## 11. ORTHOGRAPHIC FITTING LOOP

**[TAG:ORTHO_FITTING] [TAG:FITTING_LOOP]**

### **11.1 Overview**

**Diagnostic engine that lets you reach perfection faster than manual tuning. This is the "Nano Banana reference images → auto-suggest deltas" system.**

### **11.2 Inputs**

**Reference orthos:** TOP, SIDE, FRONT, BOTTOM (PNG)

**For each view:**
- 2D calibration: scale (px↔m), translation, and (usually) no rotation if true ortho
- Optionally a "mask" for silhouette extracted from image

### **11.3 Render Model to Silhouettes (in Browser)**

**For each view:**
- Set an ortho camera aligned to that view
- Render hull (and deck optionally) to an offscreen target
- Output a binary mask image (silhouette)

**Two easy methods:**
- **GPU mask render:** Flat color + depth test, then read pixels
- **Canvas 2D:** Project vertices and rasterize (harder; GPU is simpler)

### **11.4 Distance Transform Error (The Key)**

**Compute a distance field for reference mask:**

```
DT_ref(p) = distance from pixel p to nearest ref-edge
```

(Outside positive, inside negative if you do signed)

**Then for each pixel on your model silhouette edge:**
- Sample `DT_ref(p)` → that's the signed error in pixels

**Aggregate:**
- Mean abs error
- Max error
- Error binned by x (station) so you can map errors to s

### **11.5 Station Binning**

**For each silhouette edge pixel:**
- Convert pixel to world x (using calibration)
- Compute `s = x/L`
- Accumulate error into bins

### **11.6 Parameter Suggestions**

**From station-binned errors, suggest parameter edits:**
- Which stations need adjustment
- Which parameters to adjust (beam, rocker, vDepth, etc.)
- Direction of adjustment (increase/decrease)

### **11.7 Purpose**

**Enables:**
- Automated fitting to reference images
- Error diagnostics by station
- Parameter suggestion system

**Key Benefit:** Faster convergence to target geometry than manual tuning

**[END:TAG:ORTHO_FITTING]**

---

## 12. INTEGRATION POINTS

**[TAG:INTEGRATION_POINTS] [TAG:SYSTEM_BOUNDARIES]**

### **12.1 Cross-Section Generator**

**Refinements extend the core generator:**
- Step A-E provide advanced algorithms
- Bow collapse handles edge cases
- Deck edge matching ensures continuity

### **12.2 Deck Surface System**

**DeckSurfaceNode uses:**
- Hull evaluators for edge matching
- Field curves for parameterization
- Two-surface approach for sharp breaks

### **12.3 Collider System**

**Colliders use:**
- Simplified mesh generation
- Evaluator functions for attachment frames
- Progressive rebuild strategy

### **12.4 Fitting System**

**Orthographic fitting uses:**
- Render-to-silhouette pipeline
- Distance transform error computation
- Station-binned error mapping

### **12.5 Feature Nodes**

**Feature nodes use:**
- Hull evaluators for positioning
- Attachment frames for placement
- Collider geometry for physics

**[END:TAG:INTEGRATION_POINTS]**

---

## 13. FILE DEPENDENCY GRAPH

**[TAG:FILE_DEPENDENCIES] [TAG:ARCHITECTURE]**

### **13.1 Core Refinement Files**

```
crossSection/
  NormalizedCoordinate.ts       # Step A: normalized coordinate
  CenterlineDepthProfile.ts     # Step B: V/deadrise profile
  BilgeRounding.ts              # Step C: bilge blending
  FlareRemap.ts                 # Step D: flare remapping
  DeckEdgeMatching.ts           # Step E: deck edge matching
  BowCollapse.ts                # Bow collapse algorithm
  HullEvaluators.ts             # Evaluator functions
  DeckSurfaceNode.ts            # Two-surface deck generation
  ColliderOptimizer.ts          # Simplified collider generation
  OrthographicFitting.ts        # Fitting loop system
```

**[END:TAG:FILE_DEPENDENCIES]**

---

## 14. RELATIONSHIP MATRIX

**[TAG:RELATIONSHIPS] [TAG:SYSTEM_MAP]**

### **14.1 System Relationships**

| System | Relationship | Purpose |
|--------|-------------|---------|
| Cross-Section Generator | Extended by | Refinements enhance core generator |
| ParamFields | Drives | Fields control refinement parameters |
| Deck Surface | Uses | Hull evaluators for edge matching |
| Colliders | Uses | Simplified mesh + evaluators |
| Fitting Loop | Uses | Render pipeline + error computation |
| Feature Nodes | Uses | Evaluators for positioning |

### **14.2 Data Flow**

```
Fields → Cross-Section Generator → Step A-E Refinements → Bow Collapse → Deck Edge Matching
                                                                              ↓
                                                                    Hull Evaluators
                                                                              ↓
                                                          Deck Surface / Colliders / Fitting
```

### **14.3 Key Principles**

**Production Quality:**
- Clean edge matching (no seams)
- Realistic hull shapes (bilge, flare)
- Proper bow collapse (no artifacts)

**Simulation Ready:**
- Optimized colliders
- Attachment frames
- Evaluator functions

**Automated Fitting:**
- Orthographic reference matching
- Error diagnostics
- Parameter suggestions

**[END:TAG:RELATIONSHIPS]**

---

## 📋 SUMMARY

This system map documents the complete Cross-Section Generator Refinements, including:

- **Step A: Normalized Coordinate** - Parameterization by fraction of beam
- **Step B: Centerline Depth Profile** - V-hull/deadrise profile
- **Step C: Bilge Rounding** - Blend between V-hull and side curve
- **Step D: Flare** - Horizontal remap near top
- **Step E: Deck Edge Matching** - Force clean connection to deck
- **Bow Collapse Algorithm** - Smooth section shrinking to point
- **Outputs and Evaluators** - Mesh outputs and query functions
- **DeckSurfaceNode** - Two-surface deck lip with sharp break
- **Colliders and Simulation-Ready Outputs** - Optimized physics meshes
- **Orthographic Fitting Loop** - Automated reference image fitting

**Total Document Size:** ~850+ lines  
**Source:** modelmaker.txt Lines 15761-16274+  
**Status:** Complete system mapping with all algorithms, formulas, and integration details extracted

---

*MASTER CROSS-SECTION GENERATOR REFINEMENTS SYSTEM MAP*  
*Complete S.A.M. documentation for Cross-Section Generator Refinements*  
*Version 1.0.0 | Date: 2025-01-27*



---


---

<!-- AUTO-GENERATED FROM: MASTER_CURVE1D_SOLVER_SYSTEM_MAP.md -->
<!-- DO NOT EDIT THIS SECTION DIRECTLY -->
<!-- Source File: MASTER_CURVE1D_SOLVER_SYSTEM_MAP.md -->
<!-- File Size: 31210 bytes -->

<a id='curve1d-solver-system-map'></a>

# MASTER CURVE1D SOLVER SYSTEM MAP
**Complete System Anatomy Mapping - Curve1DSolver and 1D Curve Algorithms**

**Date:** 2025-01-27  
**Version:** 1.0.0  
**Purpose:** Complete S.A.M. documentation for Curve1DSolver system and related 1D curve algorithms  
**Status:** PHASE 1 - Foundation System Mapping  
**System:** Lucid Image Editor - Universal Parametric Asset Engine  
**Reference:** modelmaker.txt Curve1DSolver sections (Lines 27890-28273, 16396-17101)

---

## 📋 TABLE OF CONTENTS

1. [System Overview](#1-system-overview)
2. [Generic 1D Curve Solver](#2-generic-1d-curve-solver)
3. [Curve Evaluation](#3-curve-evaluation)
4. [Hull Section Family](#4-hull-section-family)
5. [Unified Hull SDF Field](#5-unified-hull-sdf-field)
6. [StationCache Formulas - Bow Taper](#6-stationcache-formulas---bow-taper)
7. [StationCache Formulas - Stern Taper](#7-stationcache-formulas---stern-taper)
8. [StationCache Formulas - Aft V-Depth Fade](#8-stationcache-formulas---aft-v-depth-fade)
9. [StationCache Formulas - Fairing Smoother](#9-stationcache-formulas---fairing-smoother)
10. [StationCache Node Integration](#10-stationcache-node-integration)
11. [Common Primitives](#11-common-primitives)
12. [Starting Curve Sets](#12-starting-curve-sets)
13. [Integration Points](#13-integration-points)
14. [File Dependency Graph](#14-file-dependency-graph)
15. [Relationship Matrix](#15-relationship-matrix)

---

## 1. SYSTEM OVERVIEW

**[TAG:OVERVIEW] [TAG:CURVE1D_SOLVER] [TAG:ALGORITHMS]**

### **What is the Curve1DSolver System?**

**A comprehensive system for 1D curve editing that replaces "100 sliders" with ~6-12 knots per curve. It provides a generic knot-curve solver with constraints (clamp range, slope limit, smoothness), plus specialized formulas for StationCache (bow taper, stern taper, aft V-depth fade, fairing smoother), and integration with hull section generation and SDF volume creation.**

**Location:** Curve1DSolver system defined in modelmaker.txt (Lines 27890-28273, 16396-17101)  
**Purpose:** Provide generic 1D curve editing with constraints, plus StationCache-specific formulas  
**Core Principle:** Replace sliders with knot-based curves, enforce constraints, and integrate with hull generation

### **Key Features**

**Generic 1D Curve Solver:**
- Knot-based curve editing (replace 100 sliders with 6-12 knots)
- Clamp range enforcement
- Slope limit constraints
- Smoothness (Laplacian on y)
- Drag-based editing with locked points

**Hull Section Family:**
- Continuous family of sections driven by curves
- Bottom heightfield yBottom(x,z)
- Deck heightfield yDeck(x,z)
- Planform bounds
- V-hull + chine round + deck crown

**Unified Hull SDF Field:**
- Planform-bounded heightfield volume
- Boolean composition (cockpit/slot subtraction)
- Rail rounding
- True SDF solid representation

**StationCache Formulas:**
- Bow taper with tip length, sharpness, round falloff
- Stern taper with transom width + transom round
- Aft V-depth fade (V hull taper for aft)
- Fairing smoother (preserves endpoints + intent)

### **What This System Provides**

**Generic curve editing:**
- Knot-based curves (6-12 knots per curve)
- Constraint enforcement (range, slope, smoothness)
- Drag-based editing with locked points

**Hull-specific curves:**
- Rocker y_keel(x)
- Half-beam b(x)
- Sheer y_rail(x)
- V-depth dV(x)
- V-power pV(x)
- Chine round rC(x)
- Deck crown cD(x)
- Deck power pD(x)

**StationCache integration:**
- Bow/stern taper formulas
- Aft V-depth fade
- Fairing with edge preservation
- Complete StationCacheNode implementation

**[END:TAG:OVERVIEW]**

---

## 2. GENERIC 1D CURVE SOLVER

**[TAG:CURVE1D_SOLVER] [TAG:GENERIC_SOLVER] [TAG:ALGORITHM]**

### **2.1 Overview**

**Generic 1D knot-curve solver with clamp range, slope limit, and smoothness. Intended for rocker y_keel(x), sheer y_rail(x), halfBeam b(x), V-depth d(x), etc.**

### **2.2 TypeScript Implementation**

**Complete Curve1DSolver.ts:**

```typescript
// Curve1DSolver.ts
// =====================================================================================
// Generic 1D knot-curve solver with:
// - clamp range
// - slope limit
// - smoothness (Laplacian on y)
// Intended for: rocker y_keel(x), sheer y_rail(x), halfBeam b(x), V-depth d(x), etc.
// =====================================================================================

export type Knot = { x: number; y: number };

const EPS = 1e-9;
const clamp = (v:number,a:number,b:number)=>Math.max(a,Math.min(b,v));

export type CurveSolveOpts = {
  iterations: number;
  minY: number;
  maxY: number;
  maxSlope?: number;   // |dy/dx|
  wSmooth?: number;    // 0..1
  step?: number;       // 0.2..0.6
};

export type CurveSolveInput = {
  knots: Knot[];       // sorted by x
  locked?: boolean[];
  drag?: { index:number; y:number }; // x fixed, only edit y
};

export function solveCurve1D(inp: CurveSolveInput, opts: CurveSolveOpts): Knot[] {
  const iters = Math.max(1, opts.iterations);
  const step  = clamp(opts.step ?? 0.35, 0.05, 1.0);
  const wS    = clamp(opts.wSmooth ?? 0.35, 0, 1);

  const k = inp.knots.map(p => ({ x: p.x, y: p.y }));
  const locked = inp.locked ?? new Array(k.length).fill(false);

  if (inp.drag) {
    const i = clamp(inp.drag.index, 0, k.length-1) | 0;
    k[i].y = inp.drag.y;
    locked[i] = true;
  }

  for (let iter=0; iter<iters; iter++) {
    // clamp y range
    for (let i=0;i<k.length;i++){
      if (locked[i]) continue;
      k[i].y = clamp(k[i].y, opts.minY, opts.maxY);
    }

    // slope limit
    if (opts.maxSlope !== undefined) {
      const sMax = Math.max(EPS, Math.abs(opts.maxSlope));
      for (let i=0;i<k.length-1;i++){
        const a=k[i], b=k[i+1];
        const dx=Math.max(EPS, b.x - a.x);
        const slope=(b.y - a.y)/dx;
        if (Math.abs(slope) > sMax) {
          const target = sMax * Math.sign(slope);
          const dy = target * dx;
          if (!locked[i+1]) b.y = a.y + dy;
          else if (!locked[i]) a.y = b.y - dy;
        }
      }
    }

    // smoothness
    if (wS > 0) {
      for (let i=1;i<k.length-1;i++){
        if (locked[i]) continue;
        const sm = 0.5*(k[i-1].y + k[i+1].y);
        k[i].y = k[i].y + (sm - k[i].y) * step * wS;
      }
    }
  }

  // final clamp
  for (let i=0;i<k.length;i++){
    k[i].y = clamp(k[i].y, opts.minY, opts.maxY);
  }
  return k;
}
```

### **2.3 Algorithm Details**

**Input Processing:**
- Copy input knots (preserve x, allow y modifications)
- Initialize locked array (all false by default)
- Handle drag operation (set dragged knot y, lock it)

**Iteration Loop:**
1. **Clamp Y Range:** Enforce minY/maxY constraints on unlocked knots
2. **Slope Limit:** Enforce maxSlope constraint between adjacent knots
3. **Smoothness:** Apply Laplacian smoothing (weighted average with neighbors)

**Output:**
- Final clamp pass (ensure all knots within range)
- Return modified knots array

### **2.4 Constraint Details**

**Clamp Range:**
- Enforces minY ≤ y ≤ maxY for all knots
- Applied every iteration and in final pass
- Respects locked knots

**Slope Limit:**
- Enforces |dy/dx| ≤ maxSlope between adjacent knots
- Adjusts unlocked knot when limit exceeded
- Respects locked knots (adjusts neighbor if needed)

**Smoothness (Laplacian):**
- Blends knot y with average of neighbors: `y_new = y_old + (avg_neighbors - y_old) * step * wSmooth`
- Only applies to interior knots (not endpoints)
- Respects locked knots

**[END:TAG:CURVE1D_SOLVER]**

---

## 3. CURVE EVALUATION

**[TAG:CURVE_EVAL] [TAG:EVALUATION]**

### **3.1 Overview**

**Tiny evaluator for linear interpolation between knots. Converts knot arrays to continuous functions.**

### **3.2 TypeScript Implementation**

**Complete CurveEval.ts:**

```typescript
// CurveEval.ts
export type Knot = { x:number; y:number };
const EPS=1e-9;

export function evalKnotsLinear(knots: Knot[], x: number): number {
  if (!knots.length) return 0;
  if (knots.length === 1) return knots[0].y;
  if (x <= knots[0].x) return knots[0].y;
  if (x >= knots[knots.length-1].x) return knots[knots.length-1].y;

  for (let i=0;i<knots.length-1;i++){
    const a=knots[i], b=knots[i+1];
    if (x>=a.x && x<=b.x){
      const t=(x-a.x)/Math.max(EPS,b.x-a.x);
      return a.y*(1-t)+b.y*t;
    }
  }
  return knots[knots.length-1].y;
}
```

### **3.3 Algorithm Details**

**Edge Cases:**
- Empty array → return 0
- Single knot → return knot.y
- x ≤ first knot.x → return first knot.y (clamp left)
- x ≥ last knot.x → return last knot.y (clamp right)

**Linear Interpolation:**
- Find segment containing x
- Compute t = (x - a.x) / (b.x - a.x)
- Return lerp(a.y, b.y, t) = a.y*(1-t) + b.y*t

### **3.4 Usage**

**Evaluates curve at any x position:**
```typescript
const y = evalKnotsLinear(keelKnots, x);
const beam = evalKnotsLinear(halfBeamKnots, x);
const vDepth = evalKnotsLinear(vDepthKnots, x);
```

**[END:TAG:CURVE_EVAL]**

---

## 4. HULL SECTION FAMILY

**[TAG:HULL_SECTION_FAMILY] [TAG:HEIGHTFIELD]**

### **4.1 Overview**

**Station cross-section family (V-hull + chine round + deck crown). This is the actual "Laser hull math" core: a continuous family of sections, driven by curves.**

**Laser-like hull as two heightfields over (x,z):**
- `yBottom(x,z)` - Bottom surface
- `yDeck(x,z)` - Deck surface
- Plus planform(s) to bound xz footprint

### **4.2 Core Concept**

**The idea:**
- `halfBeam b(x)`: Sets max |z|
- `rocker yKeel(x)`: Keel line height (usually negative below 0 reference)
- `V-depth dV(x)`: How deep from rail to keel
- `V-power pV(x)`: Exponent controlling V sharpness (1..4)
- `chineRound rC(x)`: Rounds V near keel (softens)
- `sheer yRail(x)`: Deck edge height
- `deckCrown cD(x)`: Crown drop toward centerline
- `deckPower pD(x)`: Crown exponent

**Coordinate convention:** x = fore/aft, y = up, z = port/starboard

### **4.3 TypeScript Implementation**

**Complete HullSectionFamily.ts (see modelmaker.txt Lines 28009-28145 for full code):**

**Key Types:**
```typescript
export type HullCurves = {
  halfBeam: Knot[];      // b(x)   >=0
  keelY: Knot[];         // yKeel(x)
  vDepth: Knot[];        // dV(x)  >=0
  vPower: Knot[];        // pV(x)  >=1
  chineRound: Knot[];    // rC(x)  >=0 (meters)
  railY: Knot[];         // yRail(x)
  deckCrown: Knot[];     // cD(x)  >=0
  deckPower: Knot[];     // pD(x)  >=1
};

export type HullSectionParams = {
  curves: HullCurves;
  minBeam?: number;
  minVPower?: number;
  maxVPower?: number;
  minDeckPower?: number;
  maxDeckPower?: number;
};
```

**Bottom Heightfield yBottom(x,z):**
```typescript
export function yBottom(P: HullSectionParams, x:number, z:number): number {
  const b = halfBeamAt(P, x);
  const zr = smoothAbs(z, 1e-4);  // smooth |z| to avoid cusp
  const u = clamp(zr / b, 0, 1);  // normalized coordinate

  const yK = yKeelAt(P, x);
  const dV = vDepthAt(P, x);
  const pV = vPowerAt(P, x);
  const rC = chineRoundAt(P, x);

  // Base V: rises toward rail by depth
  let y = yK + dV * Math.pow(u, pV);

  // Chine rounding near keel: blend toward softer parabola
  if (rC > 1e-6) {
    const ur = clamp(rC / Math.max(EPS, b), 0, 0.6);
    const t = clamp(u / Math.max(EPS, ur), 0, 1);
    const soft = yK + dV * (t*t);  // parabola near center
    y = soft*(1-t) + y*t;  // blend only near centerline
  }

  return y;
}
```

**Deck Heightfield yDeck(x,z):**
```typescript
export function yDeck(P: HullSectionParams, x:number, z:number): number {
  const b = halfBeamAt(P, x);
  const zr = smoothAbs(z, 1e-4);
  const u = clamp(zr / b, 0, 1);

  const yR = yRailAt(P, x);
  const cD = deckCrownAt(P, x);
  const pD = deckPowerAt(P, x);

  // crown: highest near centerline, drops toward rail by cD
  // yDeck(center) = yR + cD, yDeck(rail) = yR
  return yR + cD * (1 - Math.pow(u, pD));
}
```

**This gives you an extremely controllable Laser-like hull with only a few curves.**

**[END:TAG:HULL_SECTION_FAMILY]**

---

## 5. UNIFIED HULL SDF FIELD

**[TAG:HULL_SDF] [TAG:SDF_FIELD]**

### **5.1 Overview**

**Unified hull SDF field (planform-bounded heightfield volume). We turn the heightfields into a true SDF-ish solid:**

- Use a **planform SDF** in XZ: `sdDeckPlan(x,z)` negative inside outline
- Use bottom/deck heights: `yBottom(x,z)` and `yDeck(x,z)`
- Solid is the intersection:
  - Inside planform
  - Between bottom and deck: `y >= yBottom` and `y <= yDeck`

### **5.2 Distance Function**

**Distance function:**
- `dY = max(yBottom - y, y - yDeck)` (negative when between)
- `d = max(sdPlan, dY)` (negative when inside both)

**Then we add rail rounding using `smin/smax` later if you want; but even this raw version is already very good for meshing and physics.**

### **5.3 TypeScript Implementation**

**Complete HullFieldSdf.ts (see modelmaker.txt Lines 28169-28272 for full code):**

**Key Types:**
```typescript
export type HullSdfParams = {
  section: HullSectionParams;
  deckPlanSdf: Sdf2D;           // planform bounds (top outline), negative inside
  bottomPlanSdf?: Sdf2D;        // optional bottom footprint
  bottomPlanBlend?: number;     // 0..1
  railRound?: number;           // meters, e.g. 0.01..0.03
  cockpitVoid?: Sdf3D;          // negative inside void
  slotVoid?: Sdf3D;
  extraVoids?: Sdf3D[];
};
```

**SDF Generation:**
```typescript
export function makeHullFieldSdf(P: HullSdfParams): Sdf3D {
  const railRound = Math.max(0, P.railRound ?? 0);

  return (pL: THREE.Vector3) => {
    const x = pL.x, y = pL.y, z = pL.z;

    // Planform SDF (deck outline) in XZ
    const sdDeck = P.deckPlanSdf({ x, y: z });

    // Optional bottom planform blending
    let sdPlan = sdDeck;
    if (P.bottomPlanSdf && (P.bottomPlanBlend ?? 0) > 0) {
      const sdBot = P.bottomPlanSdf({ x, y: z });
      sdPlan = mix(sdDeck, sdBot, P.bottomPlanBlend);
    }

    // Heightfields
    const yB = yBottom(P.section, x, z);
    const yT = yDeck(P.section, x, z);

    // Vertical "slab" between bottom and deck
    const dY = Math.max(yB - y, y - yT);

    // Solid hull volume
    let d = Math.max(sdPlan, dY);

    // Rail rounding (smooth the edge where planform meets slab)
    if (railRound > 1e-6) {
      const interSmooth = -smin(-sdPlan, -dY, railRound);
      d = interSmooth;
    }

    // Subtract cockpit/slot
    if (P.cockpitVoid) d = opSub(d, P.cockpitVoid(pL));
    if (P.slotVoid)    d = opSub(d, P.slotVoid(pL));
    if (P.extraVoids)  for (const v of P.extraVoids) d = opSub(d, v(pL));

    return d;
  };
}
```

**[END:TAG:HULL_SDF]**

---

## 6. STATIONCACHE FORMULAS - BOW TAPER

**[TAG:BOW_TAPER] [TAG:STATIONCACHE]**

### **6.1 Overview**

**Bow taper with tip length, tip sharpness, and round falloff. You need two regimes near the bow:**

- **Main taper:** Where beam shrinks as you approach bow
- **Tip regime:** Last bit of length where the bow becomes a pointy/rounded cap rather than just "narrow beam"

### **6.2 Inputs (Fields/Scalars)**

- `bow.taperStart = s0` (e.g. 0.18–0.30)
- `bow.tipLength = ℓ` in normalized s (or meters; convert to s by ℓ/L)
- `bow.taperPower = pT` (1..6 typical)
- `bow.tipSharpness = pTip` (1..10 typical)
- `bow.tipRoundFalloff = rFall` (0..1..2) (controls when V ridge softens into dome)

### **6.3 Outputs**

- `bowTaper(s)` multiplies beam profile (0..1)
- `bowAlpha(s)` drives "collapse blending" (0..1)
- `bowRoundAlpha(s)` drives ridge-softening into bow dome

### **6.4 Formula**

**Complete implementation (see modelmaker.txt Lines 16429-16500):**

```typescript
function bowTaperBundle(s:number, L:number, params:{
  taperStart:number;     // s0
  taperPower:number;     // pT
  tipLengthS:number;     // ℓ (in s units)
  tipSharpness:number;   // pTip
  roundFalloff:number;   // rFall
}){
  const s0 = clamp(params.taperStart, 0, 0.95);
  const tip = clamp(params.tipLengthS, 0.0001, 0.5);
  const pT  = Math.max(0.1, params.taperPower);
  const pTip= Math.max(0.1, params.tipSharpness);

  // region: [0 .. s0] is bow zone
  const u = sat((s0 - s) / Math.max(1e-9, s0)); // u=1 at s=0, u=0 at s=s0

  // main taper: 1 at s0, approaches 0 toward bow
  const main = 1 - powEase(u, pT);

  // tip regime: last tip portion near bow
  const tipU = sat((tip - s) / Math.max(1e-9, tip)); // 1 at s=0, 0 at s=tip
  const tipCurve = 1 - powEase(tipU, pTip);

  // Combine: in tip region, replace main with tipCurve
  const tipBlend = smootherstep(0, tip, s); // 0 at bow, 1 after tip
  const taper = lerp(tipCurve, main, tipBlend);

  // alpha for bow collapse: 1 at bow, 0 after s0
  const bowAlpha = powEase(u, 1.0);

  // round falloff: drives how fast we "soften" V ridge into a dome
  const bowRoundAlpha = Math.pow(bowAlpha, Math.max(1e-6, params.roundFalloff || 1));

  return { taper, bowAlpha, bowRoundAlpha };
}
```

### **6.5 Usage in StationCache**

```typescript
const bow = bowTaperBundle(s, L, {
  taperStart: fields.bow_taperStart,
  taperPower: fields.bow_taperPower,
  tipLengthS: fields.bow_tipLength / L,
  tipSharpness: fields.bow_tipSharpness,
  roundFalloff: fields.bow_tipRoundFalloff
});

// beam factor:
bowTaper = bow.taper;

// collapse:
bowAlpha = bow.bowAlpha;

// rounding influence:
bowRoundAlpha = bow.bowRoundAlpha;
```

### **6.6 What bowRoundAlpha Does (Critical)**

**Use it to soften the ridge and push toward dome:**

- `vExp(s) = lerp(vExpBase, vExpBowSoft, bowRoundAlpha)`
- `vDepth(s) *= (1 - bowAlpha)^pDepth`
- Optionally adjust deck crown / sheer rounding near tip too

**[END:TAG:BOW_TAPER]**

---

## 7. STATIONCACHE FORMULAS - STERN TAPER

**[TAG:STERN_TAPER] [TAG:STATIONCACHE]**

### **7.1 Overview**

**Stern taper with transom width + transom round. Laser stern is defined by a transom plane with a width that shouldn't collapse to a point.**

### **7.2 Inputs**

- `stern.taperStart = s1` (e.g. 0.70–0.85)
- `stern.taperPower = pS`
- `stern.transomWidth = Wt` (meters) (full width)
- `stern.transomRound = Rt` (meters-ish, controls soft rounding)

### **7.3 Outputs**

- `sternTaper(s)` multiplier on beam
- `sternAlpha(s)` (0..1) for stern blending if needed

### **7.4 Formula**

**Complete implementation (see modelmaker.txt Lines 16532-16582):**

```typescript
function sternTaperBundle(s:number, L:number, params:{
  taperStart:number;    // s1
  taperPower:number;    // pS
  transomWidth:number;  // Wt (full width meters)
  transomRound:number;  // Rt
  beamMax:number;       // for normalization
}){
  const s1 = clamp(params.taperStart, 0.05, 1.0);
  const pS = Math.max(0.1, params.taperPower);

  // stern zone: [s1 .. 1]
  const u = sat((s - s1) / Math.max(1e-9, 1 - s1)); // 0 at s1, 1 at stern

  // raw taper tends to shrink beam toward stern
  const raw = 1 - powEase(u, pS);

  // transom width floor (normalized factor)
  const minFactor = clamp((params.transomWidth / Math.max(1e-9, params.beamMax)), 0.02, 1.0);

  // soften approach to minFactor using transomRound
  const wS = clamp(params.transomRound / Math.max(1e-9, L), 0.001, 0.2);
  const nearStern = smootherstep(1 - wS, 1, s); // 0 before, 1 at stern
  const taper = lerp(raw, minFactor, nearStern);

  const sternAlpha = powEase(u, 1.0);

  return { taper, sternAlpha, minFactor };
}
```

### **7.5 Usage**

**Multiply beam by `stern.taper`, but also ensure transom is planar if you cap it:**

- Transom plane at `x=L` with width `Wt`
- Cap mesh uses that

**[END:TAG:STERN_TAPER]**

---

## 8. STATIONCACHE FORMULAS - AFT V-DEPTH FADE

**[TAG:AFT_V_DEPTH_FADE] [TAG:STATIONCACHE]**

### **8.1 Overview**

**Aft V-depth fade (your "V hull taper for aft"). Laser has V forward-ish but it fades aft.**

### **8.2 Inputs**

- `vDepthBase(s)` curve
- `vAftFadeStart = fa0` (s)
- `vAftFadeEnd   = fa1` (s)
- `vAftFadePower = pF` (unitless)
- Optional floor `vAftMinFactor`

### **8.3 Output**

- `vDepth(s) = vDepthBase(s) * vFade(s)`

### **8.4 Formula**

**Complete implementation (see modelmaker.txt Lines 16592-16621):**

```typescript
function aftFade(s:number, fa0:number, fa1:number, pF:number, minFactor=0){
  fa0 = clamp(fa0, 0, 1);
  fa1 = clamp(fa1, fa0 + 1e-4, 1);

  // u=0 before start, u=1 after end
  const u = sat((s - fa0) / (fa1 - fa0));
  // fade: 1 -> minFactor
  const f = 1 - (1 - minFactor) * powEase(u, Math.max(0.1,pF));
  return f;
}
```

### **8.5 Recommended Behavior**

- `minFactor` often 0..0.2 (keep a tiny amount of V aft)
- `pF` 1..4

**[END:TAG:AFT_V_DEPTH_FADE]**

---

## 9. STATIONCACHE FORMULAS - FAIRING SMOOTHER

**[TAG:FAIRING] [TAG:STATIONCACHE]**

### **9.1 Overview**

**Fairing smoother (preserves endpoints + preserves "intent"). You want smoothing because lots of micro-adjustments can create ripples. But you must preserve:**

- Endpoints
- Hard constraints (like transom width, bow tip behavior)
- You must not "shrink" a curve

### **9.2 Two-Pass Fairing: "Edge-Preserving Laplacian" in 1D**

**Works on station arrays. Inputs:** `arr[i]`, boolean `lock[i]`, strength `λ`, iterations `n`.

**Complete implementation (see modelmaker.txt Lines 16630-16671):**

```typescript
function fair1D(arr:number[], lock:boolean[], lambda:number, iters:number){
  const n = arr.length;
  const tmp = new Array(n).fill(0);

  for (let k=0;k<iters;k++){
    for (let i=0;i<n;i++){
      if (lock[i]) { tmp[i]=arr[i]; continue; }

      const a = arr[Math.max(0,i-1)];
      const b = arr[i];
      const c = arr[Math.min(n-1,i+1)];

      // Laplacian
      const lap = (a + c - 2*b);

      // Edge preserving: damp smoothing when curvature is large
      const curv = Math.abs(lap);
      const w = 1 / (1 + 20*curv);  // tweak 20

      tmp[i] = b + lambda*w*lap;
    }

    for (let i=0;i<n;i++) arr[i]=tmp[i];
  }
}
```

### **9.3 Lock Strategy (Very Important)**

**For each station array you fair:**

- Lock `i=0` and `i=Ns-1`
- Lock transom zone stations (last 1–3) for `zSheer` if you want a crisp transom
- Lock bow tip zone (first 1–3) similarly
- Lock any user-pinned handles (if your SVG has "pinned" points)

**Example lock builder:**

```typescript
function buildLocks(Ns:number, sLocks:{s:number; radiusS:number}[]){
  const lock = new Array(Ns).fill(false);
  lock[0]=true; lock[Ns-1]=true;
  for (const L of sLocks){
    const iC = Math.round(L.s*(Ns-1));
    const r  = Math.max(0, Math.round(L.radiusS*(Ns-1)));
    for (let i=iC-r;i<=iC+r;i++){
      if (i>=0 && i<Ns) lock[i]=true;
    }
  }
  return lock;
}
```

### **9.4 When to Apply Fairing**

- Apply fairing **after** raw station computation (beam, rocker, vDepth, etc.)
- Only in finalize (mouse up), not every frame during drag
- Or apply a single light iteration during drag if you must, but keep it stable

**[END:TAG:FAIRING]**

---

## 10. STATIONCACHE NODE INTEGRATION

**[TAG:STATIONCACHE_NODE] [TAG:INTEGRATION]**

### **10.1 Overview**

**Putting it together in `StationCacheNode` (exact recipe). For each station `s`:**

### **10.2 Beam**

```typescript
zSheer = 0.5 * beamMax
       * beamProfile(s)
       * bow.taper
       * stern.taper;
zSheer = Math.max(zSheer, 0.001); // never zero to avoid NaNs
```

### **10.3 Rocker**

```typescript
yKeel = rockerBase(s) + bowLiftPatch(s) + sternLiftPatch(s);
```

### **10.4 Deck Baseline**

```typescript
ySheerCL = deckSheerCL(s) - stern.deckDrop * smootherstep(sternDropStart,1,s);
```

### **10.5 V Depth**

```typescript
vDepth = vDepthBase(s) * aftFade(s, fa0, fa1, pF, minFactor);
vDepth *= Math.pow(1 - bow.bowAlpha, pDepthShrink); // bow collapse reduces vDepth too
```

### **10.6 V Exponent Softening Near Bow**

```typescript
vExp = lerp(vExpBase(s), vExpBowSoft, bow.bowRoundAlpha);
```

### **10.7 Optional Fairness**

**After filling arrays `zSheer[i]`, `yKeel[i]`, `vDepth[i]`:**

- Build locks
- Run `fair1D` on each array with tuned λ/iters

**See modelmaker.txt Lines 16707-16754 and 17007-17151 for complete StationCacheNode implementation.**

**[END:TAG:STATIONCACHE_NODE]**

---

## 11. COMMON PRIMITIVES

**[TAG:COMMON_PRIMITIVES] [TAG:UTILITIES]**

### **11.1 Overview**

**Common primitives (the building blocks). Shared utility functions used throughout the Curve1DSolver system.**

### **11.2 Implementation**

**Complete primitives (see modelmaker.txt Lines 16396-16425):**

```typescript
const clamp = (v:number,a:number,b:number)=>Math.max(a,Math.min(b,v));
const sat = (v:number)=>clamp(v,0,1);

function smoothstep(a:number,b:number,x:number){
  const t = sat((x-a)/Math.max(1e-9,b-a));
  return t*t*(3-2*t);
}

function smootherstep(a:number,b:number,x:number){
  const t = sat((x-a)/Math.max(1e-9,b-a));
  return t*t*t*(t*(t*6-15)+10);
}

// "power smooth" that avoids cusp at ends
function powEase(t:number, p:number){
  t = sat(t);
  // p>1 concentrates near 0, p<1 expands near 1
  return Math.pow(t, Math.max(1e-6,p));
}

// symmetric bell for patches
function bell(t:number, p:number){
  // t in [0,1], peak at 0.5
  const x = 2*t-1; // -1..1
  const a = 1 - Math.abs(x);
  return Math.pow(Math.max(0,a), Math.max(1e-6,p));
}
```

**[END:TAG:COMMON_PRIMITIVES]**

---

## 12. STARTING CURVE SETS

**[TAG:STARTING_CURVES] [TAG:EXAMPLES]**

### **12.1 Overview**

**A sane Laser starting curve set (so you can iterate fast). These are not "final dimensions" — just excellent initial shapes to edit.**

### **12.2 Example Curve Sets**

**Complete starting curves (see modelmaker.txt Lines 28297-28336):**

```typescript
// x range example: [-1.85 .. +1.85] meters (Laser-ish overall length scale)

const keelY = [
  {x:-1.85, y:-0.02}, {x:-0.8, y:-0.06}, {x:0, y:-0.075}, {x:0.8, y:-0.06}, {x:1.85, y:-0.02}
];

const halfBeam = [
  {x:-1.85, y:0.02}, {x:-1.2, y:0.45}, {x:0, y:0.57}, {x:1.2, y:0.45}, {x:1.85, y:0.10}
];

const railY = [
  {x:-1.85, y:0.07}, {x:-1.0, y:0.12}, {x:0, y:0.14}, {x:1.0, y:0.12}, {x:1.85, y:0.09}
];

const vDepth = [
  {x:-1.85, y:0.00}, {x:-1.0, y:0.12}, {x:0, y:0.18}, {x:1.0, y:0.12}, {x:1.85, y:0.02}
];

const vPower = [
  {x:-1.85, y:2.2}, {x:0, y:2.8}, {x:1.85, y:2.2}
];

const chineRound = [
  {x:-1.85, y:0.00}, {x:0, y:0.03}, {x:1.85, y:0.01}
];

const deckCrown = [
  {x:-1.85, y:0.01}, {x:0, y:0.03}, {x:1.85, y:0.02}
];

const deckPower = [
  {x:-1.85, y:2.0}, {x:0, y:3.2}, {x:1.85, y:2.4}
];
```

**This already yields a believable dinghy hull that you can "Laser-tune" by eye with orthos + your SVG handles.**

**[END:TAG:STARTING_CURVES]**

---

## 13. INTEGRATION POINTS

**[TAG:INTEGRATION_POINTS] [TAG:SYSTEM_BOUNDARIES]**

### **13.1 StationCache System**

**Curve1DSolver integrates with StationCache:**
- Generic solver provides knot-based curve editing
- StationCache formulas (bow/stern taper, aft fade, fairing) use curve evaluation
- StationCacheNode uses all formulas together

### **13.2 Hull Section Generation**

**HullSectionFamily uses:**
- Curve evaluation for all hull curves
- Knot arrays from Curve1DSolver
- Heightfield generation from curves

### **13.3 SDF Volume Creation**

**HullFieldSdf uses:**
- HullSectionFamily for heightfields
- Planform SDF for bounds
- Boolean composition for voids

### **13.4 ParamFields System**

**Curve1DSolver replaces:**
- "100 sliders" with 6-12 knots per curve
- ParamFields can drive knot arrays
- SVG handles can edit knots directly

**[END:TAG:INTEGRATION_POINTS]**

---

## 14. FILE DEPENDENCY GRAPH

**[TAG:FILE_DEPENDENCIES] [TAG:ARCHITECTURE]**

### **14.1 Core Files**

```
curve1d/
  Curve1DSolver.ts          # Generic 1D curve solver
  CurveEval.ts              # Linear interpolation evaluator
  HullSectionFamily.ts      # Station cross-section family
  HullFieldSdf.ts           # Unified hull SDF field
  StationCacheFormulas.ts   # Bow/stern taper, aft fade, fairing
  StationCacheNode.ts       # Complete StationCache implementation
  CommonPrimitives.ts       # Shared utility functions
```

**[END:TAG:FILE_DEPENDENCIES]**

---

## 15. RELATIONSHIP MATRIX

**[TAG:RELATIONSHIPS] [TAG:SYSTEM_MAP]**

### **15.1 System Relationships**

| System | Relationship | Purpose |
|--------|-------------|---------|
| ParamFields | Replaces | Knot-based curves replace sliders |
| StationCache | Uses | StationCache formulas use curve evaluation |
| HullSectionFamily | Uses | Hull curves use Curve1DSolver |
| HullFieldSdf | Uses | Uses HullSectionFamily heightfields |
| Cross-Section Generator | Complements | Curve1DSolver provides curves for generator |

### **15.2 Data Flow**

```
Knot Arrays → Curve1DSolver → Solved Curves → CurveEval
                                                      ↓
                                              StationCache Formulas
                                                      ↓
                                              StationCache Arrays
                                                      ↓
                                              HullSectionFamily
                                                      ↓
                                              HullFieldSdf
```

### **15.3 Key Principles**

**Generic Curve Editing:**
- Replace sliders with knots (6-12 per curve)
- Enforce constraints (range, slope, smoothness)
- Drag-based editing with locked points

**StationCache Integration:**
- Bow/stern taper formulas
- Aft V-depth fade
- Fairing with edge preservation
- Complete StationCacheNode implementation

**[END:TAG:RELATIONSHIPS]**

---

## 📋 SUMMARY

This system map documents the complete Curve1DSolver system, including:

- **Generic 1D Curve Solver** - Knot-based curve editing with constraints
- **Curve Evaluation** - Linear interpolation between knots
- **Hull Section Family** - Continuous family of sections driven by curves
- **Unified Hull SDF Field** - Planform-bounded heightfield volume
- **StationCache Formulas** - Bow taper, stern taper, aft V-depth fade, fairing smoother
- **StationCache Node Integration** - Complete implementation recipe
- **Common Primitives** - Shared utility functions
- **Starting Curve Sets** - Example Laser hull curves

**Total Document Size:** ~1,200+ lines  
**Source:** modelmaker.txt Lines 27890-28273, 16396-17101  
**Status:** Complete system mapping with all algorithms, formulas, and integration details extracted

---

*MASTER CURVE1D SOLVER SYSTEM MAP*  
*Complete S.A.M. documentation for Curve1DSolver and 1D Curve Algorithms*  
*Version 1.0.0 | Date: 2025-01-27*



---


---

<!-- AUTO-GENERATED FROM: MASTER_3D_EDITOR_SYSTEM_MAP.md -->
<!-- DO NOT EDIT THIS SECTION DIRECTLY -->
<!-- Source File: MASTER_3D_EDITOR_SYSTEM_MAP.md -->
<!-- File Size: 28099 bytes -->

<a id='3d-editor-system-map'></a>

# MASTER 3D EDITOR SYSTEM MAP
**Complete System Anatomy Mapping - 3D Editor Architecture**

**Date:** 2025-01-27  
**Version:** 1.1.0  
**Purpose:** Complete S.A.M. documentation for 3D Editor System  
**Status:** PHASE 1 - Foundation System Mapping (Updated with modelmaker.txt concepts)  
**System:** Lucid Image Editor - 3D Editor Architecture  
**Reference:** modelmaker.txt (Universal Parametric Asset Engine vision)

---

## 📋 TABLE OF CONTENTS

1. [System Overview](#1-system-overview)
2. [Static Structure Map](#2-static-structure-map)
3. [Dynamic Behavior Map](#3-dynamic-behavior-map)
4. [Component Hierarchy](#4-component-hierarchy)
5. [State Management Flow](#5-state-management-flow)
6. [Integration Points](#6-integration-points)
7. [Performance Characteristics](#7-performance-characteristics)
8. [File Dependency Graph](#8-file-dependency-graph)
9. [Type Flow Map](#9-type-flow-map)
10. [State Management](#10-state-management)
11. [Event Flow Timeline](#11-event-flow-timeline)
12. [Relationship Matrix](#12-relationship-matrix)

---

## 1. SYSTEM OVERVIEW

**[TAG:OVERVIEW] [TAG:3D_EDITOR]**

### **What is the 3D Editor System?**

The 3D Editor System is a comprehensive three-dimensional editing environment built on React Three Fiber, providing parametric asset creation, real-time manipulation, and integration with the Universal Parametric Asset Engine vision (modelmaker.txt). It enables users to create, edit, animate, and export 3D assets with a unified toolset.

**Location:** `src/pages/versions/threed/`  
**Main Component:** `ThreeDEditorPageV2.tsx` (~3,000 lines)  
**Purpose:** Unified 3D editing interface with drawer-based architecture

### **Key Responsibilities**

1. **Scene Management**: Manage 3D scene objects (meshes, lights, cameras)
2. **Viewport Rendering**: Render 3D viewport with React Three Fiber
3. **Tool System**: Provide essential and advanced 3D manipulation tools
4. **Drawer Architecture**: Organize UI panels in collapsible drawers
5. **Animation System**: Support keyframe and procedural animation
6. **Asset Integration**: Import/export GLB models, textures, materials
7. **Mesh Editing**: Real-time mesh sculpting and painting capabilities
8. **Cross-Canvas Painting**: Bridge 2D canvas painting to 3D UV mapping

### **Core Principles**

- **Parametric Design**: Assets built from templates with deformable pipelines (modelmaker vision)
- **Unified Architecture**: Single editor page managing all 3D functionality
- **Drawer-Based UI**: Collapsible panels for organized workspace
- **React Three Fiber**: Leverage R3F for declarative 3D scene management
- **Real-Time Editing**: Immediate visual feedback for all operations
- **Modular Components**: Reusable components for tools, drawers, and viewports

### **Guiding Vision (modelmaker.txt)**

The 3D Editor aligns with the Universal Parametric Asset Engine vision:
- **Base Templates**: Editable defaults with stable topology
- **Deform Pipeline**: Compositable deforms (normal offset, vector warp, curve distance)
- **Feature Graph**: Add new variables/features as nodes (CockpitWallNode, CockpitRimNode, etc.)
- **Ortho Reference Pack**: Fit assets to orthographic reference images
- **Runtime Outputs**: Game-ready LOD/colliders/hardpoints
- **Geometry Helpers**: Polygon orientation, arc-length resample, consistent inside normals
- **LOD Policies**: Dynamic LOD based on edit state, camera distance, importance
- **Attachment Frames**: Transform system for rigging, fittings, hardpoints

**Key Principle (modelmaker.txt):**
- **Truth-from-fields/masks/caches**: No node reads from Three.js geometry as truth
- Three.js meshes are outputs only
- Deterministic, editable, and LLM-friendly

**[END:TAG:OVERVIEW]**

---

## 2. STATIC STRUCTURE MAP

**[TAG:STRUCTURE] [TAG:3D_EDITOR]**

### **Component Architecture**

```
ThreeDEditorPageV2 (Main Component)
  ├─ DrawerProvider (Layout Container)
  │   ├─ IconBar (Left Sidebar)
  │   │   └─ Drawer Icons (9 drawers + tool icons)
  │   │
  │   ├─ DrawerContainer (Right Sidebar)
  │   │   ├─ ObjectHierarchyDrawer
  │   │   ├─ EffectsLibraryDrawer
  │   │   ├─ PhysicsControlDrawer
  │   │   ├─ AtmosphericEffectsDrawer
  │   │   ├─ MeshEditingDrawer
  │   │   ├─ TopologyAnalysisDrawer
  │   │   ├─ AssetsDrawer
  │   │   ├─ Assets3DDrawer
  │   │   ├─ AITextureDrawer
  │   │   ├─ MeshyDrawer
  │   │   ├─ AnimationDrawer
  │   │   ├─ SnapAlignmentDrawer
  │   │   └─ OldToolsDrawer
  │   │
  │   └─ Main Content Area
  │       ├─ SplitViewManager
  │       │   ├─ Viewport3D (Primary 3D View)
  │       │   ├─ Viewport3DOrtho (Orthographic Views)
  │       │   ├─ Canvas2DView (2D Canvas Overlay)
  │       │   └─ CrossCanvasPaintControls
  │       │
  │       ├─ UnifiedAnimationTimeline
  │       ├─ ThreeDBottomBar
  │       └─ ViewHistoryPanel
```

### **Core Components**

**ThreeDEditorPageV2** (`ThreeDEditorPageV2.tsx`)
- Main orchestrator component
- Manages all state and tool configurations
- Coordinates drawer visibility and tool selection
- Handles scene object CRUD operations
- Integrates animation system

**Viewport3D** (`components/Viewport3D.tsx`)
- Primary 3D rendering viewport
- React Three Fiber Canvas wrapper
- Manages camera, lighting, and scene setup
- Handles object selection and manipulation
- Integrates snap system and rulers

**Drawer System** (`components/layout/drawer/`)
- DrawerProvider: Context provider for drawer state
- DrawerContainer: Right sidebar container
- IconBar: Left sidebar with drawer icons
- DrawerConfig: Type definitions for drawer configuration

### **Key Types**

```typescript
// Scene Object Definition
interface SceneObject {
  id: string;
  type: 'cube' | 'sphere' | 'cylinder' | 'cone' | 'torus' | 'plane' | 'glb';
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  color: string;
  metalness: number;
  roughness: number;
  name: string;
  visible: boolean;
  locked: boolean;
  textureUrl?: string;
  paintCanvas?: HTMLCanvasElement;
  paintTexture?: THREE.CanvasTexture;
  modelUrl?: string;
  thumbnailUrl?: string;
}

// Tool Configuration
type ThreeDTool = 
  | 'select' | 'move' | 'rotate' | 'scale'
  | 'sculpt' | 'paint' | 'surfacePaint'
  | 'cursor' | 'path';

// Drawer Configuration
interface DrawerConfig {
  id: string;
  icon: React.ReactNode;
  label: string;
  component: React.ComponentType<any>;
  defaultOpen?: boolean;
  category?: string;
}
```

### **Component Relationships**

```
ThreeDEditorPageV2
  ├─ Owns: objects (SceneObject[])
  ├─ Owns: selectedObjectId (string | null)
  ├─ Owns: activeTool (ThreeDTool)
  ├─ Owns: toolSettings (object)
  │
  ├─ Uses: DrawerProvider (layout system)
  │   └─ Manages: drawer state, visibility
  │
  ├─ Uses: Viewport3D
  │   └─ Receives: objects, selectedObjectId, activeTool, toolSettings
  │   └─ Calls: onSelectObject, onObjectsChange, onAddObject, onDeleteObject
  │
  ├─ Uses: SplitViewManager
  │   └─ Manages: view modes (single, split, quad)
  │   └─ Contains: Viewport3D, Viewport3DOrtho, Canvas2DView
  │
  ├─ Uses: UnifiedAnimationTimeline
  │   └─ Receives: animation tracks
  │   └─ Manages: playback, keyframe editing
  │
  ├─ Uses: ThreeDBottomBar
  │   └─ Receives: camera presets, render modes, stats
  │   └─ Controls: camera, rendering, view history
  │
  └─ Uses: Drawer Components (9+ drawers)
      └─ Each drawer: specific functionality panel
```

**[END:TAG:STRUCTURE]**

---

## 3. DYNAMIC BEHAVIOR MAP

**[TAG:BEHAVIOR] [TAG:3D_EDITOR]**

### **Initialization Flow**

```
1. COMPONENT MOUNT
   ThreeDEditorPageV2 mounts
     ↓
   Initialize state:
     - objects: DEFAULT_SCENE_OBJECTS
     - selectedObjectId: null
     - activeTool: 'select'
     - toolSettings: DEFAULT_TOOL_SETTINGS
     - drawerConfigs: ALL_DRAWER_CONFIGS
     ↓
   DrawerProvider initializes
     ↓
   IconBar renders drawer icons
     ↓
   DrawerContainer renders default drawer (ObjectHierarchyDrawer)
     ↓
   Viewport3D initializes React Three Fiber Canvas
     ↓
   Scene renders with default objects
     ↓
   System ready for user interaction
```

### **Object Selection Flow**

```
1. USER CLICKS OBJECT IN VIEWPORT
   Viewport3D.onPointerDown event
     ↓
   Raycast intersection with object
     ↓
   Viewport3D calls onSelectObject(objectId)
     ↓
   ThreeDEditorPageV2.setState({ selectedObjectId })
     ↓
   Viewport3D receives new selectedObjectId prop
     ↓
   TransformControls attach to selected object
     ↓
   ObjectHierarchyDrawer highlights selected item
     ↓
   Property panels update (if applicable)
```

### **Tool Activation Flow**

```
1. USER CLICKS TOOL BUTTON
   IconBar tool icon click
     ↓
   ThreeDEditorPageV2.setActiveTool(toolId)
     ↓
   State updated: activeTool = toolId
     ↓
   Viewport3D receives new activeTool prop
     ↓
   Tool-specific controls render:
     - select: TransformControls
     - move: TransformControls (position mode)
     - rotate: TransformControls (rotation mode)
     - scale: TransformControls (scale mode)
     - sculpt: Brush controls overlay
     - paint: Paint brush overlay
     - surfacePaint: UV painting interface
     - cursor: 3D cursor gizmo
     - path: Path animation tool
     ↓
   Tool settings drawer opens (if applicable)
```

### **Object Creation Flow**

```
1. USER CLICKS ADD OBJECT BUTTON
   ObjectHierarchyDrawer.onAddObject(type)
     ↓
   ThreeDEditorPageV2.handleAddObject(type)
     ↓
   Create new SceneObject:
     - Generate unique ID
     - Set default position/rotation/scale
     - Apply random color from palette
     - Set default material properties
     ↓
   Update objects array: [...objects, newObject]
     ↓
   Viewport3D receives updated objects prop
     ↓
   React Three Fiber re-renders scene
     ↓
   New object appears in viewport
     ↓
   Object automatically selected
```

### **Drawer Navigation Flow**

```
1. USER CLICKS DRAWER ICON
   IconBar drawer icon click
     ↓
   DrawerProvider.toggleDrawer(drawerId)
     ↓
   Drawer state updated (open/close)
     ↓
   DrawerContainer re-renders
     ↓
   Active drawer component mounts/render
     ↓
   Drawer receives props from ThreeDEditorPageV2:
     - objects, selectedObjectId
     - tool settings, callbacks
     ↓
   Drawer component renders its UI
     ↓
   User interacts with drawer controls
     ↓
   Drawer calls callbacks (onObjectsChange, etc.)
     ↓
   ThreeDEditorPageV2 state updates
     ↓
   Viewport3D re-renders with new state
```

**[END:TAG:BEHAVIOR]**

---

## 4. COMPONENT HIERARCHY

**[TAG:HIERARCHY] [TAG:3D_EDITOR]**

### **Full Component Tree**

```
ThreeDEditorPageV2
│
├─ DrawerProvider (Context)
│   │
│   ├─ IconBar (Left Sidebar)
│   │   ├─ Tool Icons (Essential: Q/G/R/S, Advanced: D/F/V, Pro: C/P)
│   │   ├─ Drawer Icons (9 drawer icons)
│   │   └─ Lighting Mode Toggle (Day/Night)
│   │
│   ├─ DrawerContainer (Right Sidebar)
│   │   ├─ ObjectHierarchyDrawer
│   │   │   ├─ Search Bar
│   │   │   ├─ Object List (Tree View)
│   │   │   │   ├─ Object Item
│   │   │   │   │   ├─ Visibility Toggle
│   │   │   │   │   ├─ Lock Toggle
│   │   │   │   │   ├─ Rename (Double-click)
│   │   │   │   │   └─ Context Menu (Duplicate/Delete)
│   │   │   │   └─ Children (Recursive)
│   │   │   └─ Add Object Buttons
│   │   │
│   │   ├─ EffectsLibraryDrawer
│   │   │   ├─ Effect Categories
│   │   │   └─ Effect Previews
│   │   │
│   │   ├─ PhysicsControlDrawer
│   │   │   ├─ Physics Settings
│   │   │   └─ Simulation Controls
│   │   │
│   │   ├─ AtmosphericEffectsDrawer
│   │   │   ├─ Fog Controls
│   │   │   └─ Atmospheric Presets
│   │   │
│   │   ├─ MeshEditingDrawer
│   │   │   ├─ Sculpt Tools
│   │   │   ├─ Brush Settings
│   │   │   └─ Topology Controls
│   │   │
│   │   ├─ TopologyAnalysisDrawer
│   │   │   ├─ Topology Grid Overlay
│   │   │   └─ Analysis Tools
│   │   │
│   │   ├─ AssetsDrawer (2D Assets)
│   │   │   ├─ Asset Library
│   │   │   └─ Import Controls
│   │   │
│   │   ├─ Assets3DDrawer (3D Models)
│   │   │   ├─ Model Library
│   │   │   └─ Import/Export Controls
│   │   │
│   │   ├─ AITextureDrawer
│   │   │   ├─ Texture Generation UI
│   │   │   └─ Reference Image Upload
│   │   │
│   │   ├─ MeshyDrawer
│   │   │   ├─ Meshy Integration UI
│   │   │   └─ Model Generation Controls
│   │   │
│   │   ├─ AnimationDrawer
│   │   │   ├─ Track List
│   │   │   └─ Keyframe Editor
│   │   │
│   │   ├─ SnapAlignmentDrawer
│   │   │   ├─ Snap Settings
│   │   │   └─ Grid Controls
│   │   │
│   │   └─ OldToolsDrawer (Legacy Tools)
│   │
│   └─ Main Content (DrawerProvider children)
│       │
│       ├─ SplitViewManager
│       │   ├─ View Mode Selector
│       │   └─ View Containers
│       │       ├─ Viewport3D (Primary)
│       │       │   ├─ Canvas (@react-three/fiber)
│       │       │   │   ├─ PerspectiveCamera
│       │       │   │   ├─ OrbitControls
│       │       │   │   ├─ Grid Helper
│       │       │   │   ├─ Stars/Background
│       │       │   │   ├─ Lights (Day/Night)
│       │       │   │   ├─ Scene Objects (mapped)
│       │       │   │   │   └─ PaintableSceneObject3D
│       │       │   │   ├─ TransformControls
│       │       │   │   ├─ EditableMesh (Sculpt Mode)
│       │       │   │   ├─ SnapGuidesRenderer
│       │       │   │   ├─ GhostPreviewRenderer
│       │       │   │   ├─ QuickSnapToolbar
│       │       │   │   ├─ Ruler3DSystem
│       │       │   │   └─ ScreenRulers
│       │       │   └─ Stats (Performance)
│       │       │
│       │       ├─ Viewport3DOrtho (Orthographic)
│       │       │   ├─ Top View
│       │       │   ├─ Front View
│       │       │   ├─ Side View
│       │       │   └─ Reference Image Overlay
│       │       │
│       │       └─ Canvas2DView (2D Overlay)
│       │           ├─ 2D Canvas
│       │           └─ CrossCanvasPaintControls
│       │
│       ├─ UnifiedAnimationTimeline
│       │   ├─ Timeline Canvas
│       │   ├─ Track Headers
│       │   ├─ Keyframe Markers
│       │   ├─ Playback Controls
│       │   └─ Scrubbing Interface
│       │
│       ├─ ThreeDBottomBar
│       │   ├─ Camera Preset Selector
│       │   ├─ Render Mode Selector
│       │   ├─ View History Controls
│       │   ├─ Stats Display
│       │   └─ Surface Cursor Info
│       │
│       └─ ViewHistoryPanel
│           ├─ View Thumbnails
│           └─ Navigation Controls
```

**[END:TAG:HIERARCHY]**

---

## 5. STATE MANAGEMENT FLOW

**[TAG:STATE] [TAG:3D_EDITOR]**

### **State Architecture**

The 3D Editor uses React useState/useReducer for local state management within ThreeDEditorPageV2, with some global state via Zustand stores.

**Local State (ThreeDEditorPageV2)**
```typescript
// Scene Objects
const [objects, setObjects] = useState<SceneObject[]>(DEFAULT_SCENE_OBJECTS);

// Selection
const [selectedObjectId, setSelectedObjectId] = useState<string | null>(null);

// Tool State
const [activeTool, setActiveTool] = useState<ThreeDTool>('select');
const [toolSettings, setToolSettings] = useState<ThreeDToolSettings>(DEFAULT_TOOL_SETTINGS);

// Drawer State (managed by DrawerProvider)
const [drawerState, setDrawerState] = useState<DrawerState>(...);

// Animation State
const [animationTracks, setAnimationTracks] = useState<AnimationTrack[]>([]);
const [isPlaying, setIsPlaying] = useState(false);
const [currentFrame, setCurrentFrame] = useState(0);

// View State
const [lightingMode, setLightingMode] = useState<'day' | 'night'>('day');
const [splitViewMode, setSplitViewMode] = useState<ViewMode>('single');
```

**Global State (Zustand Stores)**
```typescript
// Model 3D Store (useModel3DStore)
- Manages 3D model loading state
- Handles GLB model imports
- Stores model metadata

// Project Context (useProject)
- Project-level state
- Asset management
- File system integration
```

### **State Update Patterns**

**Immutable Updates**
```typescript
// Add Object
setObjects(prev => [...prev, newObject]);

// Update Object
setObjects(prev => prev.map(obj => 
  obj.id === id ? { ...obj, ...updates } : obj
));

// Delete Object
setObjects(prev => prev.filter(obj => obj.id !== id));
```

**State Synchronization**
```
User Action → ThreeDEditorPageV2 State Update
  ↓
Props passed to child components
  ↓
Viewport3D receives new props
  ↓
React Three Fiber re-renders
  ↓
Scene updates visually
```

**[END:TAG:STATE]**

---

## 6. INTEGRATION POINTS

**[TAG:INTEGRATION] [TAG:3D_EDITOR]**

### **External Dependencies**

**React Three Fiber Ecosystem**
- `@react-three/fiber`: React renderer for Three.js
- `@react-three/drei`: Helpers and abstractions
- `three`: Core 3D library

**Layout System**
- `components/layout/drawer`: Drawer architecture
- DrawerProvider, DrawerContainer, IconBar

**Snap System**
- `lib/snap-system/`: Snap alignment system
- SnapEngine, SnapGuidesRenderer, GhostPreviewRenderer

**Mesh Editing**
- `lib/mesh-editing/`: Sculpting and painting
- EditableMesh, BrushSettings, TopologyGridOverlay

**Animation System**
- `components/animation/`: Animation timeline
- UnifiedAnimationTimeline, PathAnimationTimeline

**Project Context**
- `contexts/ProjectContext`: Project-level state
- Asset management, file system

**Stores**
- `store/model3DStore`: 3D model state
- Zustand-based state management

### **Integration Flow**

```
ThreeDEditorPageV2
  │
  ├─→ DrawerProvider (Layout)
  │     └─→ IconBar, DrawerContainer
  │
  ├─→ Viewport3D (R3F Canvas)
  │     ├─→ OrbitControls (drei)
  │     ├─→ TransformControls (drei)
  │     ├─→ SnapGuidesRenderer (snap-system)
  │     ├─→ EditableMesh (mesh-editing)
  │     └─→ Ruler3DSystem (rulers)
  │
  ├─→ UnifiedAnimationTimeline (animation)
  │     └─→ AnimationMixer (lib/animations)
  │
  ├─→ useProject (ProjectContext)
  │     └─→ Asset management
  │
  └─→ useModel3DStore (Zustand)
        └─→ 3D model state
```

**[END:TAG:INTEGRATION]**

---

## 7. PERFORMANCE CHARACTERISTICS

**[TAG:PERFORMANCE] [TAG:3D_EDITOR]**

### **Rendering Performance**

**React Three Fiber Optimization**
- Automatic re-render optimization via React
- Scene objects memoized to prevent unnecessary re-renders
- Frame-based updates via `useFrame` hook

**Performance Considerations**
- Object count: Scales linearly with scene complexity
- Material complexity: PBR materials with textures impact performance
- Lighting: Multiple lights increase rendering cost
- Post-processing: Effects library can impact framerate

**Optimization Strategies**
- LOD (Level of Detail): Vision defined in modelmaker.txt - Dynamic LOD policies per node based on edit state, camera distance, importance
  - Each node decides its own resolution (Ns, K parameters)
  - Example: Deck/Hull with drag (Ns: 101, K: 41) vs final (Ns: 241, K: 101) vs far (Ns: 121, K: 61)
  - Enables "perfect scalable dynamic LOD" without separate assets
- Frustum culling: Automatic via Three.js
- Instancing: Not yet implemented (for repeated objects)
- Texture compression: Applied to imported textures

### **State Update Performance**

**React State Updates**
- Immutable updates prevent unnecessary re-renders
- Memoized callbacks prevent prop drilling issues
- Component-level state where possible

**Three.js Object Updates**
- Direct mesh property updates (position, rotation, scale)
- Material property updates trigger re-render
- Geometry updates expensive (avoid during animation)

**[END:TAG:PERFORMANCE]**

---

## 8. FILE DEPENDENCY GRAPH

**[TAG:DEPS] [TAG:3D_EDITOR]**

```
src/pages/versions/threed/
│
├─ ThreeDEditorPageV2.tsx (Main)
│   ├─→ components/Viewport3D.tsx
│   ├─→ components/Viewport3DOrtho.tsx
│   ├─→ components/SplitViewManager.tsx
│   ├─→ components/Canvas2DView.tsx
│   ├─→ components/CrossCanvasPaintTool.tsx
│   ├─→ components/UnifiedAnimationTimeline.tsx
│   ├─→ components/ThreeDBottomBar.tsx
│   ├─→ components/ViewHistory.tsx
│   ├─→ components/drawers/*.tsx (9+ drawers)
│   ├─→ components/layout/drawer/*.tsx
│   ├─→ store/model3DStore.ts
│   ├─→ contexts/ProjectContext.tsx
│   └─→ lib/* (various utilities)
│
├─ components/
│   ├─ Viewport3D.tsx
│   │   ├─→ @react-three/fiber
│   │   ├─→ @react-three/drei
│   │   ├─→ mesh-editing/EditableMesh.tsx
│   │   ├─→ rulers/Ruler3DSystem.tsx
│   │   └─→ lib/snap-system/*
│   │
│   ├─ Viewport3DOrtho.tsx
│   │   └─→ @react-three/fiber
│   │
│   └─ [other components]
│
└─ lib/
    ├─ animations/ (Animation system)
    ├─ mesh-editing/ (Sculpting/painting)
    └─ snap-system/ (Snap alignment)
```

**[END:TAG:DEPS]**

---

## 9. TYPE FLOW MAP

**[TAG:TYPES] [TAG:3D_EDITOR]**

### **Core Type Definitions**

**SceneObject** (Primary Data Structure)
```typescript
SceneObject
  ├─ id: string (unique identifier)
  ├─ type: PrimitiveType | 'glb'
  ├─ position: [number, number, number]
  ├─ rotation: [number, number, number]
  ├─ scale: [number, number, number]
  ├─ color: string (hex)
  ├─ metalness: number (0-1)
  ├─ roughness: number (0-1)
  ├─ name: string
  ├─ visible: boolean
  ├─ locked: boolean
  └─ [optional] textureUrl, paintCanvas, modelUrl
```

**Type Conversions**
```
SceneObject → THREE.Mesh
  - position → mesh.position.set(...)
  - rotation → mesh.rotation.set(...)
  - scale → mesh.scale.set(...)
  - color → mesh.material.color.set(...)
  - metalness/roughness → mesh.material.metalness/roughness

THREE.Mesh → SceneObject
  - mesh.position → [x, y, z]
  - mesh.rotation → [x, y, z]
  - mesh.scale → [x, y, z]
  - mesh.material.color → hex string
```

**[END:TAG:TYPES]**

---

## 10. STATE MANAGEMENT

**[TAG:STATE_MGMT] [TAG:3D_EDITOR]**

### **State Management Architecture**

**Local Component State**
- ThreeDEditorPageV2 manages primary state
- useState hooks for objects, selection, tools
- useReducer for complex state (if needed)

**Context-Based State**
- DrawerProvider: Drawer visibility state
- ProjectContext: Project-level assets

**Zustand Stores**
- useModel3DStore: 3D model loading state

**State Persistence**
- Not yet implemented (future: save to project file)
- State exists only in memory during session

**[END:TAG:STATE_MGMT]**

---

## 11. EVENT FLOW TIMELINE

**[TAG:EVENTS] [TAG:3D_EDITOR]**

### **User Interaction Events**

```
1. MOUSE DOWN ON OBJECT
   Viewport3D → onPointerDown
     ↓
   Raycast intersection
     ↓
   onSelectObject(objectId)
     ↓
   ThreeDEditorPageV2.setState
     ↓
   TransformControls attach

2. TOOL BUTTON CLICK
   IconBar → onClick
     ↓
   setActiveTool(toolId)
     ↓
   Viewport3D receives new tool
     ↓
   Tool-specific UI renders

3. DRAWER ICON CLICK
   IconBar → onClick
     ↓
   DrawerProvider.toggleDrawer
     ↓
   DrawerContainer updates
     ↓
   Drawer component mounts
```

**[END:TAG:EVENTS]**

---

## 12. RELATIONSHIP MATRIX

**[TAG:RELATIONS] [TAG:3D_EDITOR]**

### **Component Relationships**

| Component | Depends On | Used By | Relationship Type |
|-----------|-----------|---------|-------------------|
| ThreeDEditorPageV2 | DrawerProvider, Viewport3D | App Router | Orchestrator |
| Viewport3D | @react-three/fiber, drei | ThreeDEditorPageV2 | Rendering |
| DrawerProvider | React Context | ThreeDEditorPageV2 | Layout |
| ObjectHierarchyDrawer | ThreeDEditorPageV2 state | DrawerContainer | UI Panel |
| UnifiedAnimationTimeline | Animation types | ThreeDEditorPageV2 | Timeline |
| SplitViewManager | Viewport components | ThreeDEditorPageV2 | Layout |

### **System Relationships**

| System | Integration Point | Data Flow |
|--------|------------------|-----------|
| Snap System | Viewport3D → SnapGuidesRenderer | Object positions → Snap guides |
| Mesh Editing | Viewport3D → EditableMesh | Brush settings → Mesh deformation |
| Feature Nodes | Feature Graph → Node System | Params + Handles → Geometry operations |
| Geometry Helpers | Polygon/Resample → Normal System | Polygon orientation → Inward/outward normals |
| LOD Policies | Build Context → LOD Resolver | Edit state/Camera → Dynamic resolution |
| Attachment Frames | Surface Evaluation → Frame System | Surface params → Transform frames |
| Animation | ThreeDEditorPageV2 → Timeline | Tracks → Object transforms |
| Asset System | Drawers → ProjectContext | Import/Export operations |
| Ruler System | Viewport3D → Ruler3DSystem | Guide planes → Visual guides |

**[END:TAG:RELATIONS]**

---

## 📝 NEXT STEPS

**Phase 1 Complete:**
- ✅ Overall architecture documented
- ✅ Component hierarchy mapped
- ✅ State management outlined

**Phase 2 Planned:**
- ⏳ Viewport3D detailed system map
- ⏳ Scene Object management system map
- ⏳ Tool system architecture map
- ⏳ Animation system map
- ⏳ Mesh editing system map

**Phase 3 Planned:**
- ⏳ Feature node system implementation (modelmaker.txt Step 3)
- ⏳ Geometry helpers implementation (polygon orientation, arc-length resample)
- ⏳ LOD policy system implementation (dynamic LOD integration)
- ⏳ Attachment frames system (rigging/hardpoints)
- ⏳ Ortho reference pack system (modelmaker.txt Step 1)
- ⏳ Deform pipeline system (modelmaker.txt Step 2)
- ⏳ Feature graph system (modelmaker.txt Step 3)

---

**Status:** PHASE 1 - Foundation System Mapping (v1.1.0)  
**Updates in v1.1.0:** Expanded with modelmaker.txt concepts (Feature Nodes, Geometry Helpers, LOD Policies, Attachment Frames)  
**Confidence:** 0.90 (High - Comprehensive architecture documentation aligned with modelmaker vision)  
**Next:** Continue with specialized system maps, implement feature node system



---


---

<!-- AUTO-GENERATED FROM: MASTER_VIEWPORT_3D_SYSTEM_MAP.md -->
<!-- DO NOT EDIT THIS SECTION DIRECTLY -->
<!-- Source File: MASTER_VIEWPORT_3D_SYSTEM_MAP.md -->
<!-- File Size: 29257 bytes -->

<a id='viewport-3d-system-map'></a>

# MASTER VIEWPORT 3D SYSTEM MAP
**Complete System Anatomy Mapping - Viewport3D Rendering System**

**Date:** 2025-01-27  
**Version:** 1.0.0  
**Purpose:** Complete S.A.M. documentation for Viewport3D System  
**Status:** PHASE 1 - Foundation System Mapping  
**System:** Lucid Image Editor - 3D Viewport Rendering

---

## 📋 TABLE OF CONTENTS

1. [System Overview](#1-system-overview)
2. [Static Structure Map](#2-static-structure-map)
3. [Dynamic Behavior Map](#3-dynamic-behavior-map)
4. [Component Architecture](#4-component-architecture)
5. [Rendering Pipeline](#5-rendering-pipeline)
6. [Interaction Systems](#6-interaction-systems)
7. [Integration Points](#7-integration-points)
8. [Performance Characteristics](#8-performance-characteristics)
9. [File Dependency Graph](#9-file-dependency-graph)
10. [Type Flow Map](#10-type-flow-map)
11. [State Management](#11-state-management)
12. [Event Flow Timeline](#12-event-flow-timeline)
13. [Relationship Matrix](#13-relationship-matrix)

---

## 1. SYSTEM OVERVIEW

**[TAG:OVERVIEW] [TAG:VIEWPORT_3D]**

### **What is Viewport3D?**

Viewport3D is the primary 3D rendering component that provides a React Three Fiber-based canvas for real-time 3D scene visualization, manipulation, and interaction. It handles scene rendering, object selection, transform controls, texture painting, camera management, and integration with various 3D editing tools.

**Location:** `src/pages/versions/threed/components/Viewport3D.tsx`  
**Size:** ~3,000 lines  
**Purpose:** Core 3D viewport rendering and interaction

### **Key Responsibilities**

1. **Scene Rendering**: Render 3D scene using React Three Fiber
2. **Object Management**: Display and manage SceneObject instances
3. **Camera Control**: Manage perspective camera and orbit controls
4. **Object Selection**: Handle raycast-based object selection
5. **Transform Controls**: Provide move/rotate/scale manipulation
6. **Texture Painting**: Enable surface painting on 3D objects
7. **Surface Cursor**: Surface-aware cursor for painting operations
8. **Render Modes**: Support multiple rendering modes (solid, wireframe, xray, points, flat, normal)
9. **Lighting System**: Day/night lighting modes
10. **Grid System**: Visual grid helper for alignment
11. **Ruler System**: 3D ruler guides and measurement tools
12. **Snap System**: Integration with snap alignment system
13. **Cross-Canvas Painting**: Bridge 2D canvas painting to 3D UV mapping

### **Core Principles**

- **React Three Fiber**: Declarative 3D scene management
- **Component Composition**: Modular sub-components for different features
- **Performance First**: Optimized rendering and interaction
- **Surface-Aware**: Advanced surface cursor for accurate painting
- **Render Modes**: Multiple visualization modes for different workflows
- **Extensible**: Easy integration with new tools and features

**[END:TAG:OVERVIEW]**

---

## 2. STATIC STRUCTURE MAP

**[TAG:STRUCTURE] [TAG:VIEWPORT_3D]**

### **Component Hierarchy**

```
Viewport3D (Main Component)
  │
  ├─ Canvas (@react-three/fiber)
  │   │
  │   ├─ PerspectiveCamera
  │   ├─ OrbitControlsWithRef
  │   ├─ RightClickZoomHandler
  │   ├─ CameraCapture
  │   │
  │   └─ SceneContent
  │       │
  │       ├─ SkyBackground
  │       ├─ GridSystem
  │       ├─ Lights (Day/Night)
  │       │
  │       ├─ SceneObjects
  │       │   ├─ PaintableSceneObject3D (for paintable objects)
  │       │   │   ├─ mesh (THREE.Mesh)
  │       │   │   ├─ TransformControls (when selected)
  │       │   │   └─ Texture painting system
  │       │   │
  │       │   ├─ SceneObject3D (for regular objects)
  │       │   │   ├─ mesh (THREE.Mesh)
  │       │   │   └─ TransformControls (when selected)
  │       │   │
  │       │   └─ SafeGLBModel (for GLB models)
  │       │
  │       ├─ SurfaceCursor (surface painting cursor)
  │       ├─ Cursor3D (3D positioning cursor)
  │       │
  │       ├─ SnapGuidesRenderer (snap system)
  │       ├─ GhostPreviewRenderer (snap system)
  │       ├─ QuickSnapToolbar (snap system)
  │       │
  │       ├─ Ruler3DSystem
  │       ├─ ScreenRulers
  │       │
  │       └─ EditableMesh (sculpt mode)
  │
  └─ Stats (performance overlay)
```

### **Core Components**

**Viewport3D** (Main Export)
- Primary component interface
- Manages React Three Fiber Canvas
- Coordinates all sub-components
- Handles state management and callbacks

**SceneContent**
- Main scene container
- Manages scene object rendering
- Coordinates lighting and environment
- Integrates all scene helpers

**PaintableSceneObject3D**
- Extends SceneObject3D with painting capability
- Manages texture painting canvas
- Handles UV-based painting operations
- Supports cross-canvas painting

**SceneObject3D**
- Basic 3D object rendering
- Transform controls integration
- Selection highlighting
- Render mode support

**SurfaceCursor**
- Surface-aware cursor for painting
- Raycast-based surface detection
- Normal-aligned cursor positioning
- Brush size and angle visualization

**Cursor3D**
- 3D positioning cursor
- Grid snapping support
- Axis line visualization
- Position display

### **Key Functions**

```typescript
// Texture Painting System (useTexturePaint hook)
useTexturePaint() → {
  initPaintCanvas: (objectId, baseTextureUrl) => void
  paintAtUV: (objectId, uv, color, size, opacity, angle) => void
  paintStroke: (objectId, fromUV, toUV, ...) => void
  stampFromCanvasAtUV: (objectId, uv, sourceCanvas, ...) => void
  stampFromCanvasStroke: (objectId, fromUV, toUV, ...) => void
  getTexture: (objectId) => THREE.CanvasTexture | null
  clearPaint: (objectId) => void
  exportTexture: (objectId) => string | null
}

// Geometry Factory
getGeometry(type: SceneObject['type']) → THREE.BufferGeometry

// Transform Mode Resolver
getTransformMode(activeTool: string) → 'translate' | 'rotate' | 'scale' | undefined
```

### **Type Definitions**

```typescript
interface Viewport3DProps {
  // Scene
  objects: SceneObject[];
  selectedObjectId: string | null;
  onSelectObject?: (id: string | null) => void;
  
  // Tools
  activeTool: string;
  toolSettings: {
    snapToGrid: boolean;
    gridSize: number;
    cursorEnabled: boolean;
    cursorShowAxisLines: boolean;
    surfacePaintEnabled?: boolean;
    surfacePaintBrushSize?: number;
    surfacePaintColor?: string;
  };
  
  // Lighting
  lightingMode: 'day' | 'night';
  onLightingModeChange: (mode: 'day' | 'night') => void;
  
  // Cross-canvas painting
  crossCanvasPaint?: {
    enabled: boolean;
    mode: 'stamp' | 'clone' | 'brush';
    sourceCanvas: HTMLCanvasElement | null;
    anchor: { canvas: { x: number; y: number } } | null;
    brushSize: number;
    brushOpacity: number;
  };
  
  // Snap system
  ghostPosition?: THREE.Vector3 | null;
  ghostSnapOption?: string | null;
  ghostEnabled?: boolean;
  
  // Ruler system
  showRulers?: boolean;
  guidePlanes?: GuidePlane[];
  onAddGuidePlane?: (plane: Omit<GuidePlane, 'id' | 'createdAt'>) => void;
  
  // Render modes
  renderMode?: RenderMode; // 'solid' | 'wireframe' | 'xray' | 'points' | 'flat' | 'normal'
  xrayMode?: boolean;
  
  // Camera
  cameraPreset?: CameraPreset; // 'perspective' | 'front' | 'back' | 'top' | 'left' | 'right'
  onCameraReady?: (camera: THREE.Camera) => void;
  onOrbitControlsReady?: (controls: any) => void;
  
  // Stats
  showStats?: boolean;
  stats?: { fps: number; triangles: number; calls: number };
  
  // Callbacks
  onObjectsChange?: (objects: SceneObject[]) => void;
  onSceneReady?: (scene: THREE.Scene) => void;
}

type RenderMode = 'solid' | 'wireframe' | 'xray' | 'points' | 'flat' | 'normal';
type CameraPreset = 'perspective' | 'front' | 'back' | 'top' | 'left' | 'right';
```

**[END:TAG:STRUCTURE]**

---

## 3. DYNAMIC BEHAVIOR MAP

**[TAG:BEHAVIOR] [TAG:VIEWPORT_3D]**

### **Initialization Flow**

```
1. COMPONENT MOUNT
   Viewport3D mounts
     ↓
   Initialize state:
     - isTransforming: false
     - isPainting: false
     - paintLockObjectId: null
     - surfaceCursorState: null
     - cameraPreset: 'perspective'
     - renderMode: 'solid'
     ↓
   React Three Fiber Canvas initializes
     ↓
   PerspectiveCamera created (position: [5, 5, 5], fov: 50)
     ↓
   OrbitControls initialized
     ↓
   SceneContent renders
     ↓
   Scene objects rendered
     ↓
   Viewport ready for interaction
```

### **Object Selection Flow**

```
1. USER CLICKS OBJECT
   Mouse down event on mesh
     ↓
   React Three Fiber onClick handler
     ↓
   SceneObject3D/PaintableSceneObject3D onClick
     ↓
   e.stopPropagation() (prevents scene click)
     ↓
   Call onSelectObject(object.id)
     ↓
   Viewport3D.handleSelectObject(id)
     ↓
   ThreeDEditorPageV2.setState({ selectedObjectId: id })
     ↓
   Viewport3D receives new selectedObjectId prop
     ↓
   Selected object renders with:
     - Highlight wireframe overlay
     - Selection ring on ground
     - TransformControls (if tool supports)
     ↓
   ObjectHierarchyDrawer highlights item
```

### **Transform Flow**

```
1. USER SELECTS TRANSFORM TOOL (move/rotate/scale)
   ThreeDEditorPageV2.setActiveTool('move' | 'rotate' | 'scale')
     ↓
   Viewport3D receives new activeTool prop
     ↓
   SceneObject3D.getTransformMode() returns mode
     ↓
   TransformControls renders with correct mode
     ↓
   User drags transform control
     ↓
   TransformControls 'dragging-changed' event
     ↓
   onTransformStart() → setIsTransforming(true)
     ↓
   OrbitControls disabled
     ↓
   Transform continues
     ↓
   TransformControls 'mouseUp' event
     ↓
   handleTransformEnd() → onTransformChange(id, pos, rot, scale)
     ↓
   onTransformEnd() → setIsTransforming(false)
     ↓
   OrbitControls re-enabled
     ↓
   ThreeDEditorPageV2 updates object state
```

### **Texture Painting Flow**

```
1. USER SELECTS SURFACE PAINT TOOL
   ThreeDEditorPageV2.setActiveTool('surfacePaint')
     ↓
   Viewport3D receives activeTool='surfacePaint'
     ↓
   PaintableSceneObject3D.initPaintCanvas(object.id, textureUrl)
     ↓
   useTexturePaint creates texture paint canvas (2048x2048)
     ↓
   SurfaceCursor renders (enabled)
     ↓
   SurfaceCursor raycasts to find surface
     ↓
   User clicks on surface
     ↓
   PaintableSceneObject3D.handlePointerDown(e)
     ↓
   isPaintingRef.current = true
     ↓
   paintAtUV(object.id, e.uv, color, size, opacity, angle)
     ↓
   Texture paint canvas updated
     ↓
   THREE.CanvasTexture.needsUpdate = true
     ↓
   Mesh material map updated
     ↓
   Scene re-renders with painted texture
     ↓
   User drags (handlePointerMove)
     ↓
   paintStroke(object.id, lastUV, currentUV, ...)
     ↓
   Continuous stroke painting
     ↓
   User releases mouse (handlePointerUp)
     ↓
   isPaintingRef.current = false
     ↓
   onPaintEnd() callback
```

### **Surface Cursor Flow**

```
1. SURFACE CURSOR UPDATE (every frame)
   SurfaceCursor.useFrame hook
     ↓
   Raycast from camera through pointer
     ↓
   Intersect with scene objects (or ground plane)
     ↓
   Get intersection point and normal
     ↓
   Velocity-based smoothing applied
     ↓
   Position lerped (smooth movement)
     ↓
   Normal target updated (rate-limited)
     ↓
   Normal committed (after delay)
     ↓
   Cursor position = intersection + normal * offset
     ↓
   Cursor rotation = align with normal + user angle
     ↓
   Cursor visual updated:
     - Brush ring (size based on brushSize)
     - Angle indicator (cyan line)
     - Normal indicator (green line)
     - Cross-hair lines
     ↓
   State exposed to parent (onStateChange)
```

### **Render Mode Flow**

```
1. USER CHANGES RENDER MODE
   ThreeDEditorPageV2.setRenderMode(mode)
     ↓
   Viewport3D receives renderMode prop
     ↓
   SceneObject3D/PaintableSceneObject3D receives renderMode
     ↓
   Material selection based on mode:
     - 'solid': meshStandardMaterial (PBR)
     - 'wireframe': meshBasicMaterial (wireframe)
     - 'xray': meshStandardMaterial (transparent, opacity: 0.6)
     - 'points': pointsMaterial
     - 'flat': meshLambertMaterial (flatShading)
     - 'normal': meshNormalMaterial
     ↓
   Scene re-renders with new material
```

**[END:TAG:BEHAVIOR]**

---

## 4. COMPONENT ARCHITECTURE

**[TAG:ARCHITECTURE] [TAG:VIEWPORT_3D]**

### **Main Component Structure**

**Viewport3D** (Lines 2685-3035)
- Props interface and state management
- Canvas setup and configuration
- Component composition and coordination

**SceneContent** (Internal component)
- Scene container
- Lighting setup
- Object rendering coordination

**PaintableSceneObject3D** (Lines 1256-1820)
- Extended scene object with painting
- Texture management
- UV-based painting operations
- Cross-canvas painting support

**SceneObject3D** (Lines 1848-2021)
- Basic object rendering
- Transform controls
- Selection highlighting
- Render mode support

**SurfaceCursor** (Lines 320-896)
- Surface raycasting
- Cursor positioning and rotation
- Brush visualization
- State management

**Cursor3D** (Lines 233-314)
- Ground plane raycasting
- Grid snapping
- Position display

**GridSystem** (Lines 209-227)
- Grid helper rendering
- Configurable size and appearance

**SkyBackground** (Lines 148-203)
- Background rendering
- Day/night mode support

### **Hook Architecture**

**useTexturePaint** (Lines 1078-1250)
- Texture canvas management
- Painting operations
- Stroke generation
- Texture export

**useGuidePlanes** (from rulers/Ruler3DSystem)
- Guide plane state management
- CRUD operations

### **Utility Functions**

**getGeometry** (Lines 1644-1830)
- Geometry factory for primitive types
- Returns appropriate THREE.BufferGeometry

**getTransformMode** (Internal to components)
- Maps activeTool to TransformControls mode

**[END:TAG:ARCHITECTURE]**

---

## 5. RENDERING PIPELINE

**[TAG:RENDERING] [TAG:VIEWPORT_3D]**

### **React Three Fiber Rendering Flow**

```
1. RENDER CYCLE
   React renders Viewport3D
     ↓
   Canvas component mounts/updates
     ↓
   React Three Fiber creates/updates scene
     ↓
   Components render in order:
     1. PerspectiveCamera (camera setup)
     2. OrbitControlsWithRef (controls)
     3. SceneContent (scene container)
         a. SkyBackground
         b. GridSystem
         c. Lights (ambient, directional)
         d. SceneObjects (all objects)
         e. SurfaceCursor (if enabled)
         f. Cursor3D (if enabled)
         g. Snap system components
         h. Ruler system components
     ↓
   Three.js renders scene
     ↓
   Canvas updated
```

### **Material Pipeline**

```
Object Type → Geometry → Material Selection → Rendering

Primitive Object:
  SceneObject → getGeometry(type) → THREE.BufferGeometry
    ↓
  Render Mode → Material Type:
    - solid: meshStandardMaterial (PBR)
    - wireframe: meshBasicMaterial (wireframe)
    - xray: meshStandardMaterial (transparent)
    - points: pointsMaterial
    - flat: meshLambertMaterial (flatShading)
    - normal: meshNormalMaterial
    ↓
  Material properties:
    - color: object.color
    - metalness: object.metalness
    - roughness: object.roughness
    - map: paintTexture (if painting) || baseTexture (if textureUrl)
    ↓
  THREE.Mesh rendered

GLB Model:
  GLBModel → useGLTF(url) → GLTF object
    ↓
  Scene graph traversal
    ↓
  Materials preserved from GLB
    ↓
  THREE.Mesh instances rendered
```

### **Texture Painting Pipeline**

```
1. INITIALIZATION
   initPaintCanvas(objectId, baseTextureUrl)
     ↓
   Create HTMLCanvasElement (2048x2048)
     ↓
   Create CanvasRenderingContext2D
     ↓
   If baseTextureUrl: Load and draw to canvas
   Else: Draw checkerboard pattern
     ↓
   Create THREE.CanvasTexture from canvas
     ↓
   Store in texturePaintStore[objectId]

2. PAINTING OPERATION
   paintAtUV(objectId, uv, color, size, opacity, angle)
     ↓
   Get texturePaintStore[objectId]
     ↓
   Calculate brush position (uv * canvasSize)
     ↓
   Apply rotation (angle)
     ↓
   Draw brush stroke on canvas:
     - context.globalCompositeOperation = 'source-over'
     - context.fillStyle = color
     - context.globalAlpha = opacity
     - Draw circle/ellipse at position
     ↓
   texture.needsUpdate = true
     ↓
   Material map updated automatically
     ↓
   Scene re-renders
```

**[END:TAG:RENDERING]**

---

## 6. INTERACTION SYSTEMS

**[TAG:INTERACTION] [TAG:VIEWPORT_3D]**

### **Selection System**

- **Raycasting**: React Three Fiber onClick handlers
- **Object Identification**: userData.lucidObjectId on meshes
- **Selection State**: Managed in parent (ThreeDEditorPageV2)
- **Visual Feedback**: Wireframe overlay, ground ring, highlight

### **Transform System**

- **Controls**: @react-three/drei TransformControls
- **Modes**: translate, rotate, scale
- **Tool Mapping**: activeTool → transform mode
- **State Management**: isTransforming flag disables OrbitControls
- **Callbacks**: onTransformStart, onTransformEnd, onTransformChange

### **Painting System**

- **Surface Cursor**: Raycast-based surface detection
- **UV Mapping**: Standard UV coordinates
- **Brush System**: Circular brush with size, opacity, angle
- **Stroke Generation**: Interpolated strokes between UV points
- **Texture Updates**: Canvas-based texture updates

### **Camera System**

- **Controls**: OrbitControls (drei)
- **Presets**: perspective, front, back, top, left, right
- **Zoom**: Right-click + scroll (custom handler)
- **State**: Camera position tracked for View History

### **Snap System Integration**

- **SnapGuidesRenderer**: Visual snap guides
- **GhostPreviewRenderer**: Preview of snapped position
- **QuickSnapToolbar**: Snap tool UI
- **Ghost Position**: External ghost position prop

### **Ruler System Integration**

- **Ruler3DSystem**: 3D ruler guides
- **ScreenRulers**: Screen-space rulers
- **Guide Planes**: 3D guide planes
- **Hover Detection**: Active ruler tracking

**[END:TAG:INTERACTION]**

---

## 7. INTEGRATION POINTS

**[TAG:INTEGRATION] [TAG:VIEWPORT_3D]**

### **External Dependencies**

**React Three Fiber**
- `@react-three/fiber`: Canvas, useFrame, useThree
- `@react-three/drei`: OrbitControls, TransformControls, Grid, etc.

**Three.js**
- Core 3D library
- Geometry, materials, textures
- Math utilities

**Snap System**
- `lib/snap-system/components/SnapGuidesRenderer`
- `lib/snap-system/components/GhostPreviewRenderer`
- `lib/snap-system/components/QuickSnapToolbar`
- `lib/snap-system/utils/SnapEngine`

**Ruler System**
- `components/rulers/Ruler3DSystem`
- `components/rulers/ScreenRulers`
- `components/rulers/useGuidePlanes`

**Mesh Editing**
- `components/mesh-editing/EditableMesh`
- `lib/mesh-editing/types/brushes`

**Parent Component**
- `ThreeDEditorPageV2`: Main editor page
- Provides objects, selectedId, activeTool, callbacks

### **Data Flow**

```
ThreeDEditorPageV2
  │
  ├─→ Viewport3D (props)
  │     ├─ objects: SceneObject[]
  │     ├─ selectedObjectId: string | null
  │     ├─ activeTool: string
  │     ├─ toolSettings: object
  │     └─ callbacks (onSelectObject, onObjectsChange, etc.)
  │
  Viewport3D
  │
  ├─→ React Three Fiber (rendering)
  │     └─ Three.js (WebGL)
  │
  ├─→ Texture Paint System (internal)
  │     └─ Canvas-based texture updates
  │
  ├─→ Snap System (integration)
  │     └─ Ghost position, snap guides
  │
  ├─→ Ruler System (integration)
  │     └─ Guide planes, rulers
  │
  └─→ Callbacks to parent
        └─ onSelectObject, onObjectsChange, etc.
```

**[END:TAG:INTEGRATION]**

---

## 8. PERFORMANCE CHARACTERISTICS

**[TAG:PERFORMANCE] [TAG:VIEWPORT_3D]**

### **Rendering Performance**

**Object Count**
- Scales linearly with scene complexity
- Each object = 1 draw call (instancing not yet used)
- GLB models may have multiple meshes

**Material Complexity**
- PBR materials (metalness/roughness) = standard cost
- Texture painting = canvas updates (CPU) + texture upload (GPU)
- Multiple render modes = different shader complexity

**Lighting**
- Day mode: 1 ambient + 1 directional light
- Night mode: 1 ambient + 1 directional light (different colors)
- Shadow casting: Enabled (performance impact)

**Optimization Strategies**
- React.memo for object components (not yet implemented)
- Texture size: 2048x2048 (good quality/performance balance)
- Canvas updates: Only when painting (not every frame)
- Render modes: Some modes faster (wireframe, points)

### **Interaction Performance**

**Surface Cursor**
- Raycast every frame (useFrame)
- Smoothing applied (reduces jitter)
- Performance: ~60fps with moderate scene complexity

**Transform Controls**
- Direct mesh property updates (fast)
- OrbitControls disabled during transform (prevents conflicts)

**Texture Painting**
- Canvas drawing: CPU-bound
- Texture upload: GPU-bound (needsUpdate flag)
- Stroke interpolation: CPU-bound (every frame during drag)

**[END:TAG:PERFORMANCE]**

---

## 9. FILE DEPENDENCY GRAPH

**[TAG:DEPS] [TAG:VIEWPORT_3D]**

```
src/pages/versions/threed/components/Viewport3D.tsx
  │
  ├─→ @react-three/fiber
  │     └─ Canvas, useFrame, useThree
  │
  ├─→ @react-three/drei
  │     └─ OrbitControls, TransformControls, Grid, etc.
  │
  ├─→ three
  │     └─ Core library
  │
  ├─→ lib/snap-system/components/
  │     ├─ SnapGuidesRenderer.tsx
  │     ├─ GhostPreviewRenderer.tsx
  │     └─ QuickSnapToolbar.tsx
  │
  ├─→ lib/snap-system/utils/
  │     └─ SnapEngine.ts
  │
  ├─→ components/rulers/
  │     ├─ Ruler3DSystem.tsx
  │     ├─ ScreenRulers.tsx
  │     └─ useGuidePlanes.ts
  │
  ├─→ components/mesh-editing/
  │     └─ EditableMesh.tsx
  │
  ├─→ lib/mesh-editing/types/
  │     └─ brushes.ts
  │
  └─→ ThreeDEditorPageV2.tsx (parent)
        └─ Provides props and callbacks
```

**[END:TAG:DEPS]**

---

## 10. TYPE FLOW MAP

**[TAG:TYPES] [TAG:VIEWPORT_3D]**

### **Core Type Flow**

```
SceneObject (from parent)
  ↓
Viewport3DProps.objects: SceneObject[]
  ↓
SceneObjects component maps objects
  ↓
PaintableSceneObject3D | SceneObject3D | SafeGLBModel
  ↓
THREE.Mesh (React Three Fiber)
  ↓
WebGL rendering

SceneObject properties:
  - position: [number, number, number] → mesh.position
  - rotation: [number, number, number] → mesh.rotation
  - scale: [number, number, number] → mesh.scale
  - color: string → material.color
  - metalness: number → material.metalness
  - roughness: number → material.roughness
  - textureUrl: string → baseTexture (THREE.Texture)
  - paintCanvas: HTMLCanvasElement → paintTexture (THREE.CanvasTexture)
```

### **Texture Painting Type Flow**

```
UV Coordinates (e.uv from intersection)
  ↓
{ x: number, y: number } (0-1 range)
  ↓
Canvas Coordinates (uv * TEXTURE_SIZE)
  ↓
Canvas drawing operations
  ↓
HTMLCanvasElement
  ↓
THREE.CanvasTexture
  ↓
meshStandardMaterial.map
  ↓
WebGL texture
```

**[END:TAG:TYPES]**

---

## 11. STATE MANAGEMENT

**[TAG:STATE_MGMT] [TAG:VIEWPORT_3D]**

### **Local State (Viewport3D)**

```typescript
// Transform state
const [isTransforming, setIsTransforming] = useState(false);

// Painting state
const [isPainting, setIsPainting] = useState(false);
const [paintLockObjectId, setPaintLockObjectId] = useState<string | null>(null);

// Camera state (internal if not provided)
const [internalCameraPreset, setInternalCameraPreset] = useState<CameraPreset>('perspective');

// Render mode state (internal if not provided)
const [internalRenderMode, setInternalRenderMode] = useState<RenderMode>('solid');

// Surface cursor state
const [surfaceCursorState, setSurfaceCursorState] = useState<SurfaceCursorState | null>(null);

// Ruler state
const [activeRuler, setActiveRuler] = useState<'x' | 'y' | 'z' | null>(null);
const [rulerHoverPosition, setRulerHoverPosition] = useState<number | null>(null);
```

### **Hook State (useTexturePaint)**

```typescript
// Texture paint store (Map)
const texturePaintStore = useRef<Map<string, TexturePaintState>>(new Map());

interface TexturePaintState {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  texture: THREE.CanvasTexture;
  baseImage: HTMLImageElement | null;
  isDirty: boolean;
}
```

### **State Flow**

```
Parent State (ThreeDEditorPageV2)
  ↓
Props to Viewport3D
  ↓
Local state for interaction
  ↓
Callbacks to parent (state updates)
  ↓
Parent state updates
  ↓
Props flow back down
```

**[END:TAG:STATE_MGMT]**

---

## 12. EVENT FLOW TIMELINE

**[TAG:EVENTS] [TAG:VIEWPORT_3D]**

### **User Interaction Events**

```
1. MOUSE DOWN ON OBJECT
   React Three Fiber onClick
     ↓
   SceneObject3D.onClick handler
     ↓
   e.stopPropagation()
     ↓
   onSelectObject(object.id)
     ↓
   Parent state updates
     ↓
   Selection highlight renders

2. DRAG TRANSFORM CONTROL
   TransformControls dragging starts
     ↓
   'dragging-changed' event (value: true)
     ↓
   onTransformStart() → setIsTransforming(true)
     ↓
   OrbitControls disabled
     ↓
   Transform continues
     ↓
   'dragging-changed' event (value: false)
     ↓
   onTransformEnd() → setIsTransforming(false)
     ↓
   handleTransformEnd() → onTransformChange(...)
     ↓
   OrbitControls re-enabled

3. SURFACE PAINTING
   Mouse down on surface
     ↓
   handlePointerDown(e) → e.uv
     ↓
   paintAtUV(object.id, e.uv, ...)
     ↓
   Canvas drawing operation
     ↓
   texture.needsUpdate = true
     ↓
   Mouse move (dragging)
     ↓
   handlePointerMove(e) → paintStroke(...)
     ↓
   Continuous canvas updates
     ↓
   Mouse up
     ↓
   handlePointerUp() → onPaintEnd()
```

**[END:TAG:EVENTS]**

---

## 13. RELATIONSHIP MATRIX

**[TAG:RELATIONS] [TAG:VIEWPORT_3D]**

### **Component Relationships**

| Component | Depends On | Used By | Relationship Type |
|-----------|-----------|---------|-------------------|
| Viewport3D | React Three Fiber, drei | ThreeDEditorPageV2 | Rendering Container |
| SceneContent | Viewport3D state | Viewport3D | Scene Container |
| PaintableSceneObject3D | useTexturePaint, SceneObject3D | SceneObjects | Extended Object |
| SceneObject3D | Three.js, TransformControls | SceneObjects | Basic Object |
| SurfaceCursor | useThree, useFrame | SceneContent | Interaction Helper |
| Cursor3D | useThree, useFrame | SceneContent | Positioning Helper |
| useTexturePaint | Canvas API, Three.js | PaintableSceneObject3D | Hook |

### **System Relationships**

| System | Integration Point | Data Flow |
|--------|------------------|-----------|
| Snap System | SceneContent → SnapGuidesRenderer | Ghost position → Visual guides |
| Ruler System | SceneContent → Ruler3DSystem | Guide planes → Visual rulers |
| Mesh Editing | SceneContent → EditableMesh | Brush settings → Mesh deformation |
| Parent Editor | Viewport3D props | Objects, selection, tools ↔ State |
| Texture System | PaintableSceneObject3D → useTexturePaint | UV coordinates → Canvas → Texture |

**[END:TAG:RELATIONS]**

---

## 📝 NEXT STEPS

**Phase 1 Complete:**
- ✅ Viewport3D architecture documented
- ✅ Component hierarchy mapped
- ✅ Rendering pipeline outlined
- ✅ Interaction systems documented

**Phase 2 Planned:**
- ⏳ Scene Object management detailed system map
- ⏳ Tool system architecture map
- ⏳ Texture painting system detailed map
- ⏳ Animation system integration map

**Phase 3 Planned:**
- ⏳ Performance optimization strategies
- ⏳ Advanced rendering features
- ⏳ Integration with modelmaker vision

---

**Status:** PHASE 1 - Foundation System Mapping  
**Confidence:** 0.90 (High - Comprehensive viewport documentation)  
**Next:** Create Scene Object management system map



---


---

<!-- AUTO-GENERATED FROM: MASTER_3D_SCENE_OBJECT_SYSTEM_MAP.md -->
<!-- DO NOT EDIT THIS SECTION DIRECTLY -->
<!-- Source File: MASTER_3D_SCENE_OBJECT_SYSTEM_MAP.md -->
<!-- File Size: 25148 bytes -->

<a id='3d-scene-object-system-map'></a>

# MASTER 3D SCENE OBJECT SYSTEM MAP
**Complete System Anatomy Mapping - Scene Object Management**

**Date:** 2025-01-27  
**Version:** 1.0.0  
**Purpose:** Complete S.A.M. documentation for 3D Scene Object Management System  
**Status:** PHASE 1 - Foundation System Mapping  
**System:** Lucid Image Editor - 3D Scene Object Management

---

## 📋 TABLE OF CONTENTS

1. [System Overview](#1-system-overview)
2. [Static Structure Map](#2-static-structure-map)
3. [Dynamic Behavior Map](#3-dynamic-behavior-map)
4. [Object Type System](#4-object-type-system)
5. [Operation Flow Analysis](#5-operation-flow-analysis)
6. [Integration Points](#6-integration-points)
7. [Performance Characteristics](#7-performance-characteristics)
8. [File Dependency Graph](#8-file-dependency-graph)
9. [Type Flow Map](#9-type-flow-map)
10. [State Management](#10-state-management)
11. [Event Flow Timeline](#11-event-flow-timeline)
12. [Relationship Matrix](#12-relationship-matrix)

---

## 1. SYSTEM OVERVIEW

**[TAG:OVERVIEW] [TAG:SCENE_OBJECT]**

### **What is the Scene Object Management System?**

The Scene Object Management System handles the complete lifecycle of 3D objects in the scene, including creation, modification, deletion, and property management. It provides a unified interface for managing primitive objects, GLB models, and their properties (transform, material, visibility, locking).

**Location:** `src/pages/versions/threed/ThreeDEditorPageV2.tsx`  
**Primary State:** `sceneObjects: SceneObject[]`  
**Purpose:** Centralized scene object lifecycle management

### **Key Responsibilities**

1. **Object Creation**: Create new primitive objects and import GLB models
2. **Object Modification**: Update transform, material, and property values
3. **Object Deletion**: Remove objects from scene
4. **Object Selection**: Manage selected object state
5. **Object Duplication**: Clone objects with offset positioning
6. **Property Management**: Handle visibility, locking, renaming
7. **Material Management**: Apply material presets and custom properties
8. **Transform Management**: Update position, rotation, scale
9. **State Synchronization**: Keep scene objects and sidebar objects in sync

### **Core Principles**

- **Immutable Updates**: All updates use immutable patterns (map/filter)
- **Dual State**: Scene objects and sidebar objects kept in sync
- **ID-Based Operations**: All operations use unique object IDs
- **Type Safety**: Full TypeScript type system
- **Default Values**: Consistent default properties for new objects

**[END:TAG:OVERVIEW]**

---

## 2. STATIC STRUCTURE MAP

**[TAG:STRUCTURE] [TAG:SCENE_OBJECT]**

### **Type Definitions**

```typescript
// Primary Scene Object Type
interface SceneObject {
  id: string;                          // Unique identifier
  type: 'cube' | 'sphere' | 'cylinder' | 'cone' | 'torus' | 'plane' | 'glb';
  position: [number, number, number];  // World position (X, Y, Z)
  rotation: [number, number, number];  // Rotation in radians (X, Y, Z)
  scale: [number, number, number];     // Scale factors (X, Y, Z)
  color: string;                       // Hex color string
  metalness: number;                   // PBR metalness (0-1)
  roughness: number;                   // PBR roughness (0-1)
  name: string;                        // Display name
  visible: boolean;                    // Visibility flag
  locked: boolean;                     // Lock flag (prevents transforms)
  
  // Optional properties
  textureUrl?: string;                 // Base texture URL
  paintCanvas?: HTMLCanvasElement;     // Paint canvas (for texture painting)
  paintTexture?: THREE.CanvasTexture;  // THREE.js texture from paint canvas
  modelUrl?: string;                   // GLB model URL (for type='glb')
  thumbnailUrl?: string;               // Preview thumbnail URL
}

// Sidebar Object Type (simplified representation)
interface Object3DItem {
  id: string;
  name: string;
  type: 'mesh' | 'light' | 'camera' | 'group';
  visible: boolean;
  locked: boolean;
  children?: Object3DItem[];           // For hierarchical structures
  shapeType?: SceneObject['type'];     // For mesh objects
  color?: string;                      // For visual representation
}
```

### **Default Values**

```typescript
// Default Scene Objects (initial scene state)
const DEFAULT_SCENE_OBJECTS: SceneObject[] = [
  { 
    id: 'obj-1', 
    type: 'cube', 
    position: [0, 0.5, 0], 
    rotation: [0, 0, 0], 
    scale: [1, 1, 1], 
    color: '#8b5cf6', 
    metalness: 0.3, 
    roughness: 0.4, 
    name: 'Cube', 
    visible: true, 
    locked: false 
  },
  // ... more default objects
];

// Color Palette (for new objects)
const OBJECT_COLORS = [
  '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', 
  '#06b6d4', '#ec4899', '#6366f1', '#84cc16'
];

// Material Presets
const MATERIAL_PRESETS = [
  { name: 'Default', color: '#8b5cf6', metalness: 0.3, roughness: 0.4, icon: '🎨' },
  { name: 'Chrome', color: '#e0e0e0', metalness: 1.0, roughness: 0.1, icon: '🪞' },
  { name: 'Gold', color: '#ffd700', metalness: 1.0, roughness: 0.2, icon: '🥇' },
  { name: 'Copper', color: '#b87333', metalness: 0.9, roughness: 0.3, icon: '🔶' },
  { name: 'Plastic', color: '#ff6b6b', metalness: 0.0, roughness: 0.5, icon: '🧱' },
  { name: 'Rubber', color: '#2d3436', metalness: 0.0, roughness: 0.9, icon: '⚫' },
  { name: 'Glass', color: '#74b9ff', metalness: 0.1, roughness: 0.0, icon: '💎' },
  { name: 'Wood', color: '#a0522d', metalness: 0.0, roughness: 0.7, icon: '🪵' },
];
```

### **State Management Structure**

```
ThreeDEditorPageV2
  ├─ State: sceneObjects (SceneObject[])
  ├─ State: sidebarObjects (Object3DItem[])
  ├─ State: selectedObjectId (string | null)
  │
  ├─ Handlers:
  │   ├─ handleAddObject(type)
  │   ├─ handleDeleteObject(id)
  │   ├─ handleUpdateMaterial(id, updates)
  │   ├─ handleRenameObject(id, newName)
  │   ├─ handleVisibilityToggle(id)
  │   ├─ handleLockToggle(id)
  │   └─ handleDuplicateObject(id)
  │
  └─ Derived:
      └─ selectedObject (SceneObject | null)
```

### **Component Relationships**

```
ThreeDEditorPageV2
  ├─ Manages: sceneObjects state
  │   └─ Used By: Viewport3D (rendering)
  │
  ├─ Manages: sidebarObjects state
  │   └─ Used By: ObjectHierarchyDrawer (UI)
  │
  ├─ Provides: Handlers to drawers
  │   ├─ ObjectHierarchyDrawer
  │   │   └─ onRename, onVisibilityToggle, onLockToggle, onDuplicate, onDelete
  │   ├─ MaterialsDrawer
  │   │   └─ onUpdateMaterial
  │   ├─ TransformDrawer
  │   │   └─ onUpdateTransform (alias for handleUpdateMaterial)
  │   └─ AITextureDrawer
  │       └─ onUpdateObject (alias for handleUpdateMaterial)
  │
  └─ Receives: Updates from Viewport3D
      └─ onObjectsChange (transform updates from viewport)
```

**[END:TAG:STRUCTURE]**

---

## 3. DYNAMIC BEHAVIOR MAP

**[TAG:BEHAVIOR] [TAG:SCENE_OBJECT]**

### **Object Creation Flow**

```
1. CREATE PRIMITIVE OBJECT
   User clicks "Add Object" button
     ↓
   ObjectHierarchyDrawer.onAddObject(type)
     ↓
   ThreeDEditorPageV2.handleAddObject(type)
     ↓
   Generate unique ID: `obj-${Date.now()}`
     ↓
   Select random color from OBJECT_COLORS
     ↓
   Create SceneObject:
     - id: generated ID
     - type: provided type
     - position: [0, 0.5, 0] (default)
     - rotation: [0, 0, 0] (default)
     - scale: [1, 1, 1] (default)
     - color: random from palette
     - metalness: 0.3 (default)
     - roughness: 0.4 (default)
     - name: Capitalized type name
     - visible: true
     - locked: false
     ↓
   setSceneObjects(prev => [...prev, newSceneObj])
     ↓
   Create Object3DItem for sidebar:
     - id: same ID
     - name: same name
     - type: 'mesh'
     - visible: true
     - locked: false
     ↓
   setSidebarObjects(prev => [...prev, newSidebarObj])
     ↓
   setSelectedObjectId(newId)
     ↓
   Viewport3D receives updated objects prop
     ↓
   New object renders in viewport

2. IMPORT GLB MODEL
   User imports model (Meshy/Assets drawer)
     ↓
   onAddModel(modelUrl, name, thumbnailUrl)
     ↓
   Generate unique ID: `saved-${Date.now()}` or `meshy-${Date.now()}`
     ↓
   Create SceneObject with type='glb':
     - id: generated ID
     - type: 'glb'
     - modelUrl: provided URL (possibly proxied)
     - thumbnailUrl: provided thumbnail
     - Default transform and material properties
     ↓
   Update both sceneObjects and sidebarObjects
     ↓
   Select new object
     ↓
   Viewport3D renders GLB model
```

### **Object Update Flow**

```
1. UPDATE MATERIAL PROPERTIES
   User changes material in MaterialsDrawer
     ↓
   MaterialsDrawer.onUpdateMaterial(id, { color, metalness, roughness })
     ↓
   ThreeDEditorPageV2.handleUpdateMaterial(id, updates)
     ↓
   setSceneObjects(prev => prev.map(obj => 
     obj.id === id ? { ...obj, ...updates } : obj
   ))
     ↓
   Viewport3D receives updated objects prop
     ↓
   Material changes render immediately

2. UPDATE TRANSFORM PROPERTIES
   User drags TransformControls or edits in TransformDrawer
     ↓
   Viewport3D.onTransformChange(id, position, rotation, scale)
     ↓
   ThreeDEditorPageV2.handleTransformChange (via onObjectsChange)
     ↓
   Update sceneObjects state
     ↓
   Viewport3D re-renders with new transform
     (OR)
   TransformDrawer.onUpdateTransform(id, { position, rotation, scale })
     ↓
   handleUpdateMaterial(id, updates)
     ↓
   Same update flow as material update
```

### **Object Deletion Flow**

```
1. DELETE OBJECT
   User clicks delete in ObjectHierarchyDrawer
     ↓
   ObjectHierarchyDrawer.onDelete(id)
     ↓
   ThreeDEditorPageV2.handleDeleteObject(id)
     ↓
   setSceneObjects(prev => prev.filter(obj => obj.id !== id))
     ↓
   setSidebarObjects(prev => prev.filter(obj => obj.id !== id))
     ↓
   if (selectedObjectId === id) {
     setSelectedObjectId(null)
   }
     ↓
   Viewport3D receives updated objects prop
     ↓
   Object removed from viewport
```

### **Object Duplication Flow**

```
1. DUPLICATE OBJECT
   User clicks duplicate in ObjectHierarchyDrawer
     ↓
   ObjectHierarchyDrawer.onDuplicate(id)
     ↓
   ThreeDEditorPageV2.handleDuplicateObject(id)
     ↓
   Find original object: sceneObjects.find(obj => obj.id === id)
     ↓
   Generate new ID: `obj-${Date.now()}`
     ↓
   Create new SceneObject:
     - Spread original object
     - id: new ID
     - name: `${original.name} Copy`
     - position: [original.position[0] + 1, original.position[1], original.position[2] + 1]
       (offset by 1 unit in X and Z)
     ↓
   setSceneObjects(prev => [...prev, newSceneObj])
     ↓
   Create new Object3DItem:
     - id: new ID
     - name: new name
     - type: 'mesh'
     - visible: true
     - locked: false
     ↓
   setSidebarObjects(prev => [...prev, newSidebarObj])
     ↓
   setSelectedObjectId(newId)
     ↓
   Viewport3D renders duplicated object
```

### **Property Toggle Flows**

```
1. TOGGLE VISIBILITY
   User clicks visibility icon
     ↓
   ObjectHierarchyDrawer.onVisibilityToggle(id)
     ↓
   ThreeDEditorPageV2.handleVisibilityToggle(id)
     ↓
   setSceneObjects(prev => prev.map(obj => 
     obj.id === id ? { ...obj, visible: !obj.visible } : obj
   ))
     ↓
   setSidebarObjects(prev => prev.map(obj => 
     obj.id === id ? { ...obj, visible: !obj.visible } : obj
   ))
     ↓
   Viewport3D receives updated visible property
     ↓
   Object shows/hides in viewport

2. TOGGLE LOCK
   User clicks lock icon
     ↓
   ObjectHierarchyDrawer.onLockToggle(id)
     ↓
   ThreeDEditorPageV2.handleLockToggle(id)
     ↓
   setSceneObjects(prev => prev.map(obj => 
     obj.id === id ? { ...obj, locked: !obj.locked } : obj
   ))
     ↓
   setSidebarObjects(prev => prev.map(obj => 
     obj.id === id ? { ...obj, locked: !obj.locked } : obj
   ))
     ↓
   Viewport3D receives updated locked property
     ↓
   TransformControls disabled when locked
```

### **Object Rename Flow**

```
1. RENAME OBJECT
   User double-clicks object name
     ↓
   ObjectHierarchyDrawer.handleStartRename(obj)
     ↓
   setEditingId(obj.id)
     setEditName(obj.name)
     ↓
   User edits name in input field
     ↓
   User presses Enter
     ↓
   ObjectHierarchyDrawer.handleFinishRename()
     ↓
   ObjectHierarchyDrawer.onRename(editingId, editName.trim())
     ↓
   ThreeDEditorPageV2.handleRenameObject(id, newName)
     ↓
   setSceneObjects(prev => prev.map(obj => 
     obj.id === id ? { ...obj, name: newName } : obj
   ))
     ↓
   setSidebarObjects(prev => prev.map(obj => 
     obj.id === id ? { ...obj, name: newName } : obj
   ))
     ↓
   UI updates with new name
```

**[END:TAG:BEHAVIOR]**

---

## 4. OBJECT TYPE SYSTEM

**[TAG:TYPES] [TAG:SCENE_OBJECT]**

### **Primitive Object Types**

**Supported Types:**
- `'cube'` - Box geometry
- `'sphere'` - Sphere geometry
- `'cylinder'` - Cylinder geometry
- `'cone'` - Cone geometry
- `'torus'` - Torus geometry
- `'plane'` - Plane geometry
- `'glb'` - GLB model (imported)

### **Object Type Characteristics**

```
Primitive Types (cube, sphere, etc.):
  - Geometry: Generated via getGeometry() function
  - Material: PBR material (metalness/roughness)
  - Texture: Optional textureUrl or paintTexture
  - Transform: Full transform support
  - Editing: Supports mesh editing tools

GLB Type:
  - Geometry: Loaded from modelUrl
  - Material: Preserved from GLB file
  - Texture: Embedded in GLB
  - Transform: Full transform support
  - Editing: Limited (geometry from file)
```

### **Type Conversions**

```
SceneObject → Object3DItem (for sidebar)
  - id: same
  - name: same
  - type: 'mesh' (for primitives), 'mesh' (for GLB)
  - visible: same
  - locked: same
  - shapeType: SceneObject.type (for primitives)
  - color: SceneObject.color (for visual representation)

SceneObject → THREE.Mesh (for rendering)
  - Via Viewport3D component
  - getGeometry(type) → THREE.BufferGeometry
  - Material from color, metalness, roughness
  - Transform from position, rotation, scale
```

**[END:TAG:TYPES]**

---

## 5. OPERATION FLOW ANALYSIS

**[TAG:OPERATIONS] [TAG:SCENE_OBJECT]**

### **CRUD Operations**

**Create:**
- handleAddObject(type) - Create primitive
- onAddModel(url, name, thumbnail) - Import GLB

**Read:**
- selectedObject (derived from selectedObjectId)
- sceneObjects array access
- ObjectHierarchyDrawer displays objects

**Update:**
- handleUpdateMaterial(id, updates) - General update
- handleRenameObject(id, name) - Rename
- handleVisibilityToggle(id) - Toggle visibility
- handleLockToggle(id) - Toggle lock

**Delete:**
- handleDeleteObject(id) - Remove object

### **State Synchronization Pattern**

```
All operations update BOTH:
  1. sceneObjects (SceneObject[])
  2. sidebarObjects (Object3DItem[])

Pattern:
  setSceneObjects(prev => updateFunction(prev))
  setSidebarObjects(prev => updateFunction(prev))

This ensures:
  - Viewport3D receives correct object data
  - ObjectHierarchyDrawer displays correct UI
  - Selection state stays consistent
```

**[END:TAG:OPERATIONS]**

---

## 6. INTEGRATION POINTS

**[TAG:INTEGRATION] [TAG:SCENE_OBJECT]**

### **Internal Integrations**

**Viewport3D**
- Receives: objects prop (SceneObject[])
- Calls: onObjectsChange (transform updates)
- Renders: Objects in 3D scene

**ObjectHierarchyDrawer**
- Receives: objects (Object3DItem[])
- Calls: onRename, onVisibilityToggle, onLockToggle, onDuplicate, onDelete
- Displays: Object hierarchy UI

**MaterialsDrawer**
- Receives: selectedObject (SceneObject | null)
- Calls: onUpdateMaterial(id, { color, metalness, roughness })
- Displays: Material editing UI

**TransformDrawer**
- Receives: selectedObject (SceneObject | null)
- Calls: onUpdateTransform(id, { position, rotation, scale })
- Displays: Transform editing UI

**AITextureDrawer**
- Receives: selectedObject, selectedObjectId
- Calls: onUpdateObject(id, { textureUrl })
- Manages: AI-generated textures

**Assets3DDrawer**
- Calls: onAddPrimitive(type), onAddModel(url, name, thumbnail)
- Manages: Asset import

**MeshyDrawer**
- Calls: onImportModel(url, name)
- Manages: Meshy model import

### **External Dependencies**

**React State Management**
- useState for sceneObjects, sidebarObjects, selectedObjectId
- useCallback for handlers (performance)

**No External Stores**
- All state managed locally in ThreeDEditorPageV2
- No Zustand/Redux for scene objects

**[END:TAG:INTEGRATION]**

---

## 7. PERFORMANCE CHARACTERISTICS

**[TAG:PERFORMANCE] [TAG:SCENE_OBJECT]**

### **State Update Performance**

**Immutable Updates**
- All updates use map/filter (immutable patterns)
- React can efficiently detect changes
- Prevents unnecessary re-renders

**Synchronized Updates**
- Both sceneObjects and sidebarObjects updated together
- Single operation updates both states
- No cascading updates

**Selection Performance**
- selectedObject derived via useMemo
- Only recomputes when selectedObjectId or sceneObjects changes

### **Scaling Considerations**

**Object Count**
- Linear scaling with number of objects
- Each object = one entry in array
- Map operations are O(n) for updates

**Optimization Opportunities**
- Index-based lookups (Map instead of array)
- Memoization of derived values
- Batch updates for multiple operations

**[END:TAG:PERFORMANCE]**

---

## 8. FILE DEPENDENCY GRAPH

**[TAG:DEPS] [TAG:SCENE_OBJECT]**

```
src/pages/versions/threed/ThreeDEditorPageV2.tsx
  │
  ├─→ Defines: SceneObject interface
  ├─→ Defines: Object3DItem interface
  ├─→ Manages: sceneObjects state
  ├─→ Manages: sidebarObjects state
  │
  ├─→ Provides: Handlers
  │   ├─→ handleAddObject
  │   ├─→ handleDeleteObject
  │   ├─→ handleUpdateMaterial
  │   ├─→ handleRenameObject
  │   ├─→ handleVisibilityToggle
  │   ├─→ handleLockToggle
  │   └─→ handleDuplicateObject
  │
  ├─→ Used By: Components
  │   ├─→ Viewport3D
  │   │   └─→ objects prop, onObjectsChange callback
  │   ├─→ ObjectHierarchyDrawer
  │   │   └─→ objects prop, handler callbacks
  │   ├─→ MaterialsDrawer
  │   │   └─→ selectedObject prop, onUpdateMaterial callback
  │   ├─→ TransformDrawer
  │   │   └─→ selectedObject prop, onUpdateTransform callback
  │   └─→ Other drawers (AITextureDrawer, Assets3DDrawer, etc.)
  │
  └─→ No external dependencies for scene object management
```

**[END:TAG:DEPS]**

---

## 9. TYPE FLOW MAP

**[TAG:TYPE_FLOW] [TAG:SCENE_OBJECT]**

### **Type Flow Diagram**

```
User Input
  ↓
Handler Function (handleAddObject, handleUpdateMaterial, etc.)
  ↓
State Update (setSceneObjects, setSidebarObjects)
  ↓
React Re-render
  ↓
Props to Child Components
  ↓
Viewport3D: SceneObject[] → THREE.Mesh rendering
ObjectHierarchyDrawer: Object3DItem[] → UI display
MaterialsDrawer: SceneObject → Material editing UI
TransformDrawer: SceneObject → Transform editing UI
```

### **Type Transformations**

```
SceneObject Creation:
  type: SceneObject['type'] → SceneObject (complete object)

SceneObject Update:
  Partial<SceneObject> → Merged with existing SceneObject

SceneObject → Object3DItem:
  SceneObject → Object3DItem (simplified representation)

SceneObject → THREE.Mesh:
  SceneObject → Viewport3D → PaintableSceneObject3D/SceneObject3D → THREE.Mesh
```

**[END:TAG:TYPE_FLOW]**

---

## 10. STATE MANAGEMENT

**[TAG:STATE_MGMT] [TAG:SCENE_OBJECT]**

### **State Architecture**

**Primary State**
```typescript
const [sceneObjects, setSceneObjects] = useState<SceneObject[]>(DEFAULT_SCENE_OBJECTS);
const [sidebarObjects, setSidebarObjects] = useState<Object3DItem[]>(MOCK_OBJECTS);
const [selectedObjectId, setSelectedObjectId] = useState<string | null>('obj-1');
```

**Derived State**
```typescript
const selectedObject = useMemo(() => 
  sceneObjects.find(obj => obj.id === selectedObjectId) || null,
  [sceneObjects, selectedObjectId]
);
```

### **State Update Patterns**

**Immutable Updates**
```typescript
// Add
setSceneObjects(prev => [...prev, newObject]);

// Update
setSceneObjects(prev => prev.map(obj => 
  obj.id === id ? { ...obj, ...updates } : obj
));

// Delete
setSceneObjects(prev => prev.filter(obj => obj.id !== id));
```

**Synchronized Updates**
```typescript
// Always update both states together
handleUpdateMaterial(id, updates) {
  setSceneObjects(prev => prev.map(...));
  // sidebarObjects updated if needed (for name changes)
}
```

**[END:TAG:STATE_MGMT]**

---

## 11. EVENT FLOW TIMELINE

**[TAG:EVENTS] [TAG:SCENE_OBJECT]**

### **Event Sequence Examples**

```
OBJECT CREATION EVENT:
  1. User clicks "Add Cube" button
  2. ObjectHierarchyDrawer.onAddObject('cube')
  3. ThreeDEditorPageV2.handleAddObject('cube')
  4. Generate ID, create SceneObject
  5. setSceneObjects([...prev, newObject])
  6. setSidebarObjects([...prev, newSidebarObj])
  7. setSelectedObjectId(newId)
  8. React re-renders
  9. Viewport3D receives new objects prop
  10. New object renders in viewport

OBJECT UPDATE EVENT:
  1. User changes material color
  2. MaterialsDrawer.onUpdateMaterial(id, { color: '#ff0000' })
  3. ThreeDEditorPageV2.handleUpdateMaterial(id, { color: '#ff0000' })
  4. setSceneObjects(prev => prev.map(...))
  5. React re-renders
  6. Viewport3D receives updated objects prop
  7. Material changes render

OBJECT DELETION EVENT:
  1. User clicks delete button
  2. ObjectHierarchyDrawer.onDelete(id)
  3. ThreeDEditorPageV2.handleDeleteObject(id)
  4. setSceneObjects(prev => prev.filter(...))
  5. setSidebarObjects(prev => prev.filter(...))
  6. if (selectedObjectId === id) setSelectedObjectId(null)
  7. React re-renders
  8. Viewport3D receives updated objects prop
  9. Object removed from viewport
```

**[END:TAG:EVENTS]**

---

## 12. RELATIONSHIP MATRIX

**[TAG:RELATIONS] [TAG:SCENE_OBJECT]**

### **Component Relationships**

| Component | Relationship | Data Flow |
|-----------|-------------|-----------|
| ThreeDEditorPageV2 | Manages state | sceneObjects, sidebarObjects, selectedObjectId |
| Viewport3D | Consumes objects | Receives objects prop, calls onObjectsChange |
| ObjectHierarchyDrawer | Displays/edits | Receives objects, calls handlers |
| MaterialsDrawer | Edits material | Receives selectedObject, calls onUpdateMaterial |
| TransformDrawer | Edits transform | Receives selectedObject, calls onUpdateTransform |
| AITextureDrawer | Applies textures | Receives selectedObject, calls onUpdateObject |
| Assets3DDrawer | Imports assets | Calls onAddPrimitive, onAddModel |
| MeshyDrawer | Imports models | Calls onImportModel |

### **Operation Relationships**

| Operation | Affects | Synchronization |
|-----------|---------|-----------------|
| Create Object | sceneObjects, sidebarObjects | Both updated together |
| Delete Object | sceneObjects, sidebarObjects, selectedObjectId | All updated together |
| Update Material | sceneObjects | Only sceneObjects updated |
| Update Transform | sceneObjects | Only sceneObjects updated |
| Rename Object | sceneObjects, sidebarObjects | Both updated together |
| Toggle Visibility | sceneObjects, sidebarObjects | Both updated together |
| Toggle Lock | sceneObjects, sidebarObjects | Both updated together |
| Duplicate Object | sceneObjects, sidebarObjects, selectedObjectId | All updated together |

**[END:TAG:RELATIONS]**

---

## 📝 NEXT STEPS

**Phase 1 Complete:**
- ✅ Scene Object management system documented
- ✅ CRUD operations mapped
- ✅ State management outlined
- ✅ Integration points documented

**Phase 2 Planned:**
- ⏳ Material system detailed map
- ⏳ Transform system detailed map
- ⏳ GLB import system map
- ⏳ Texture system integration map

**Phase 3 Planned:**
- ⏳ Persistence system (save/load)
- ⏳ Undo/redo system integration
- ⏳ Object grouping/hierarchy
- ⏳ Animation integration

---

**Status:** PHASE 1 - Foundation System Mapping  
**Confidence:** 0.90 (High - Comprehensive object management documentation)  
**Next:** Create Tool system architecture map



---


---

<!-- AUTO-GENERATED FROM: MASTER_3D_TOOL_SYSTEM_MAP.md -->
<!-- DO NOT EDIT THIS SECTION DIRECTLY -->
<!-- Source File: MASTER_3D_TOOL_SYSTEM_MAP.md -->
<!-- File Size: 23189 bytes -->

<a id='3d-tool-system-map'></a>

# MASTER 3D TOOL SYSTEM MAP
**Complete System Anatomy Mapping - 3D Tool System Architecture**

**Date:** 2025-01-27  
**Version:** 1.0.0  
**Purpose:** Complete S.A.M. documentation for 3D Tool System  
**Status:** PHASE 1 - Foundation System Mapping  
**System:** Lucid Image Editor - 3D Tool System

---

## 📋 TABLE OF CONTENTS

1. [System Overview](#1-system-overview)
2. [Static Structure Map](#2-static-structure-map)
3. [Dynamic Behavior Map](#3-dynamic-behavior-map)
4. [Tool Categories](#4-tool-categories)
5. [Tool Activation Flow](#5-tool-activation-flow)
6. [Tool Settings System](#6-tool-settings-system)
7. [Integration Points](#7-integration-points)
8. [Performance Characteristics](#8-performance-characteristics)
9. [File Dependency Graph](#9-file-dependency-graph)
10. [Type Flow Map](#10-type-flow-map)
11. [State Management](#11-state-management)
12. [Event Flow Timeline](#12-event-flow-timeline)
13. [Relationship Matrix](#13-relationship-matrix)

---

## 1. SYSTEM OVERVIEW

**[TAG:OVERVIEW] [TAG:TOOL_SYSTEM]**

### **What is the 3D Tool System?**

The 3D Tool System provides a unified interface for all 3D manipulation and editing tools. It manages tool activation, tool-specific settings, toolbar organization, and keyboard shortcuts. The system supports multiple toolbar modes (beginner, intermediate, pro, custom) and provides tool-specific UI and behavior.

**Location:** `src/pages/versions/threed/ThreeDEditorPageV2.tsx`  
**Primary State:** `activeTool: ThreeDTool`  
**Purpose:** Centralized tool management and activation

### **Key Responsibilities**

1. **Tool Activation**: Manage active tool state and activation
2. **Toolbar Organization**: Organize tools by category and mode
3. **Tool Settings**: Manage tool-specific settings and configurations
4. **Keyboard Shortcuts**: Handle keyboard shortcuts for tool activation
5. **Tool Modes**: Support beginner/intermediate/pro/custom toolbar modes
6. **Tool Integration**: Integrate tools with Viewport3D and scene objects
7. **Tool UI**: Provide tool-specific UI panels and controls
8. **Tool State**: Manage tool-specific state and behavior

### **Core Principles**

- **Unified Interface**: Single tool system for all 3D tools
- **Mode-Based Organization**: Tools organized by complexity level
- **Settings Per Tool**: Each tool has its own settings
- **Keyboard Shortcuts**: Standard shortcuts for quick tool switching
- **Extensible**: Easy to add new tools
- **State Management**: Centralized tool state management

**[END:TAG:OVERVIEW]**

---

## 2. STATIC STRUCTURE MAP

**[TAG:STRUCTURE] [TAG:TOOL_SYSTEM]**

### **Tool Type Definition**

```typescript
type ThreeDTool = 
  | 'select'      // Object selection
  | 'move'        // Position transform
  | 'rotate'      // Rotation transform
  | 'scale'       // Scale transform
  | 'sculpt'      // Mesh sculpting
  | 'paint'       // Cross-canvas painting
  | 'surfacePaint' // Surface texture painting
  | 'cursor'      // 3D cursor positioning
  | 'path';       // Animation path tool
```

### **Tool Configuration**

```typescript
interface ToolConfig {
  id: ThreeDTool;
  icon: React.ReactNode;
  label: string;
  shortcut: string;
  category: 'Essential' | 'Advanced' | 'Pro';
}

const ALL_THREED_TOOLS: ToolConfig[] = [
  // Essential Tools
  { id: 'select', icon: <Target />, label: 'Select (Q)', shortcut: 'Q', category: 'Essential' },
  { id: 'move', icon: <Move />, label: 'Move (G)', shortcut: 'G', category: 'Essential' },
  { id: 'rotate', icon: <RotateCcw />, label: 'Rotate (R)', shortcut: 'R', category: 'Essential' },
  { id: 'scale', icon: <Maximize2 />, label: 'Scale (S)', shortcut: 'S', category: 'Essential' },
  
  // Advanced Tools
  { id: 'sculpt', icon: <Brush />, label: 'Sculpt (D)', shortcut: 'D', category: 'Advanced' },
  { id: 'paint', icon: <Palette />, label: 'Paint (F)', shortcut: 'F', category: 'Advanced' },
  { id: 'surfacePaint', icon: <Brush />, label: 'Surface Paint (V)', shortcut: 'V', category: 'Advanced' },
  
  // Pro Tools
  { id: 'cursor', icon: <Target />, label: '3D Cursor (C)', shortcut: 'C', category: 'Pro' },
  { id: 'path', icon: <Spline />, label: 'Path Animation (P)', shortcut: 'P', category: 'Pro' },
];
```

### **Toolbar Mode Configuration**

```typescript
type ToolbarMode = 'beginner' | 'intermediate' | 'pro' | 'custom';

const TOOLBAR_MODE_CONFIG: Record<ToolbarMode, string[]> = {
  beginner: ['select', 'move', 'rotate', 'scale'],
  intermediate: ['select', 'move', 'rotate', 'scale', 'sculpt', 'paint', 'surfacePaint'],
  pro: ['select', 'move', 'rotate', 'scale', 'sculpt', 'paint', 'surfacePaint', 'cursor', 'path'],
  custom: [], // User-defined tool order
};
```

### **Tool Settings Interface**

```typescript
interface ThreeDToolSettings {
  // General settings
  snapToGrid: boolean;
  gridSize: number;
  
  // Move tool settings
  moveIncrement: number;
  moveConstrainAxis: 'x' | 'y' | 'z' | null;
  
  // Rotate tool settings
  rotateSnap: boolean;
  rotateSnapDegrees: number;
  
  // Scale tool settings
  scaleUniform: boolean;
  
  // Sculpt tool settings
  sculptBrushSize: number;
  sculptStrength: number;
  
  // 3D Cursor settings
  cursorEnabled: boolean;
  cursorSnapToGrid: boolean;
  cursorShowAxisLines: boolean;
  
  // Ruler settings
  showRulerPreviewPlanes: boolean;
  
  // Surface Paint settings
  surfacePaintEnabled: boolean;
  surfacePaintBrushSize: number;
  surfacePaintColor: string;
  surfacePaintOpacity: number;
}
```

### **Component Structure**

```
ThreeDEditorPageV2
  ├─ State: activeTool (ThreeDTool)
  ├─ State: toolSettings (ThreeDToolSettings)
  ├─ State: toolbarMode (ToolbarMode)
  ├─ State: customToolOrder (string[])
  │
  ├─ Tool Configuration:
  │   ├─ ALL_THREED_TOOLS (master list)
  │   ├─ TOOLBAR_MODE_CONFIG (mode definitions)
  │   └─ DEFAULT_THREED_SETTINGS (default settings)
  │
  ├─ Tool UI:
  │   ├─ IconBar (left sidebar)
  │   │   └─ Tool buttons (filtered by mode)
  │   ├─ ThreeDToolSettingsMiniBar (tool settings panel)
  │   └─ FullToolSettingsDrawer (expanded settings)
  │
  └─ Tool Integration:
      ├─ Viewport3D (receives activeTool prop)
      ├─ TransformControls (mode based on activeTool)
      ├─ SurfaceCursor (enabled based on activeTool)
      └─ EditableMesh (enabled for sculpt tool)
```

**[END:TAG:STRUCTURE]**

---

## 3. DYNAMIC BEHAVIOR MAP

**[TAG:BEHAVIOR] [TAG:TOOL_SYSTEM]**

### **Tool Activation Flow**

```
1. USER CLICKS TOOL BUTTON
   IconBar tool button click
     ↓
   onClick: () => setActiveTool(tool.id)
     ↓
   ThreeDEditorPageV2.setState({ activeTool: toolId })
     ↓
   React re-renders
     ↓
   Viewport3D receives new activeTool prop
     ↓
   Tool-specific behavior activates:
     - select: Selection mode (default)
     - move: TransformControls mode='translate'
     - rotate: TransformControls mode='rotate'
     - scale: TransformControls mode='scale'
     - sculpt: EditableMesh enabled
     - paint: Cross-canvas paint mode
     - surfacePaint: SurfaceCursor enabled, texture painting
     - cursor: Cursor3D enabled
     - path: PathAnimationTimeline enabled
     ↓
   Tool settings panel updates (if applicable)
```

### **Keyboard Shortcut Flow**

```
1. USER PRESSES KEYBOARD SHORTCUT
   Keyboard event (Q/G/R/S/D/F/V/C/P)
     ↓
   Keyboard handler (if implemented)
     ↓
   Map shortcut to tool ID:
     - Q → 'select'
     - G → 'move'
     - R → 'rotate'
     - S → 'scale'
     - D → 'sculpt'
     - F → 'paint'
     - V → 'surfacePaint'
     - C → 'cursor'
     - P → 'path'
     ↓
   setActiveTool(mappedToolId)
     ↓
   Same activation flow as button click
```

### **Toolbar Mode Change Flow**

```
1. USER CHANGES TOOLBAR MODE
   Toolbar mode selector click
     ↓
   Cycle through modes: beginner → intermediate → pro → custom
     ↓
   setToolbarMode(newMode)
     ↓
   activeToolIds computed from TOOLBAR_MODE_CONFIG[newMode]
     ↓
   leftToolButtons filtered by activeToolIds
     ↓
   IconBar re-renders with filtered tools
     ↓
   Only tools in current mode are visible
```

### **Tool Settings Update Flow**

```
1. USER CHANGES TOOL SETTING
   Settings panel control change
     ↓
   setToolSettings(prev => ({ ...prev, [setting]: value }))
     ↓
   toolSettings state updated
     ↓
   Viewport3D receives updated toolSettings prop
     ↓
   Tool-specific behavior updates:
     - snapToGrid: Grid snapping enabled/disabled
     - gridSize: Grid size changes
     - rotateSnap: Rotation snapping enabled/disabled
     - sculptStrength: Sculpt brush strength changes
     - surfacePaintBrushSize: Paint brush size changes
     ↓
   Visual feedback updates immediately
```

### **Transform Tool Flow**

```
1. TRANSFORM TOOL ACTIVATION (move/rotate/scale)
   setActiveTool('move' | 'rotate' | 'scale')
     ↓
   Viewport3D receives activeTool prop
     ↓
   SceneObject3D.getTransformMode() called
     ↓
   Transform mode determined:
     - 'move' → 'translate'
     - 'rotate' → 'rotate'
     - 'scale' → 'scale'
     ↓
   TransformControls renders with correct mode
     ↓
   User drags transform control
     ↓
   Transform applied to object
     ↓
   onTransformChange callback
     ↓
   Object state updated
```

### **Painting Tool Flow**

```
1. SURFACE PAINT TOOL ACTIVATION
   setActiveTool('surfacePaint')
     ↓
   Viewport3D receives activeTool='surfacePaint'
     ↓
   SurfaceCursor enabled
     ↓
   PaintableSceneObject3D.initPaintCanvas() called
     ↓
   Texture paint canvas created
     ↓
   User clicks on surface
     ↓
   UV coordinates captured
     ↓
   paintAtUV() called
     ↓
   Canvas drawing operation
     ↓
   Texture updated
     ↓
   Scene re-renders with painted texture
```

**[END:TAG:BEHAVIOR]**

---

## 4. TOOL CATEGORIES

**[TAG:CATEGORIES] [TAG:TOOL_SYSTEM]**

### **Essential Tools**

**Select Tool** (`'select'`)
- Purpose: Object selection
- Shortcut: Q
- Behavior: Raycast-based selection
- UI: Selection highlighting, object hierarchy

**Move Tool** (`'move'`)
- Purpose: Position transformation
- Shortcut: G
- Behavior: TransformControls mode='translate'
- Settings: moveIncrement, moveConstrainAxis, snapToGrid

**Rotate Tool** (`'rotate'`)
- Purpose: Rotation transformation
- Shortcut: R
- Behavior: TransformControls mode='rotate'
- Settings: rotateSnap, rotateSnapDegrees

**Scale Tool** (`'scale'`)
- Purpose: Scale transformation
- Shortcut: S
- Behavior: TransformControls mode='scale'
- Settings: scaleUniform

### **Advanced Tools**

**Sculpt Tool** (`'sculpt'`)
- Purpose: Mesh sculpting
- Shortcut: D
- Behavior: EditableMesh enabled, brush-based deformation
- Settings: sculptBrushSize, sculptStrength
- Integration: Mesh editing system

**Paint Tool** (`'paint'`)
- Purpose: Cross-canvas painting (2D → 3D)
- Shortcut: F
- Behavior: Cross-canvas paint mode, 2D canvas to 3D UV mapping
- Settings: brushSize, brushOpacity (from crossCanvasPaint)
- Integration: Canvas2DView, CrossCanvasPaintControls

**Surface Paint Tool** (`'surfacePaint'`)
- Purpose: Direct surface texture painting
- Shortcut: V
- Behavior: SurfaceCursor enabled, UV-based painting
- Settings: surfacePaintBrushSize, surfacePaintColor, surfacePaintOpacity
- Integration: Texture painting system

### **Pro Tools**

**3D Cursor Tool** (`'cursor'`)
- Purpose: 3D positioning cursor
- Shortcut: C
- Behavior: Cursor3D enabled, ground plane raycasting
- Settings: cursorEnabled, cursorSnapToGrid, cursorShowAxisLines
- Integration: Cursor3D component

**Path Animation Tool** (`'path'`)
- Purpose: Animation path creation
- Shortcut: P
- Behavior: PathAnimationTimeline enabled, path drawing
- Settings: Path-specific settings
- Integration: Path animation system

**[END:TAG:CATEGORIES]**

---

## 5. TOOL ACTIVATION FLOW

**[TAG:ACTIVATION] [TAG:TOOL_SYSTEM]**

### **Activation Sequence**

```
1. INITIALIZATION
   ThreeDEditorPageV2 mounts
     ↓
   activeTool initialized: 'select'
     ↓
   toolSettings initialized: DEFAULT_THREED_SETTINGS
     ↓
   toolbarMode initialized: 'intermediate'
     ↓
   activeToolIds computed from TOOLBAR_MODE_CONFIG
     ↓
   leftToolButtons filtered and rendered
     ↓
   Viewport3D receives activeTool='select'
     ↓
   System ready

2. TOOL SWITCHING
   User clicks tool button OR presses shortcut
     ↓
   setActiveTool(newToolId)
     ↓
   State update triggers re-render
     ↓
   Viewport3D receives new activeTool prop
     ↓
   Tool-specific components activate/deactivate:
     - TransformControls: mode changes or disabled
     - SurfaceCursor: enabled/disabled
     - EditableMesh: enabled/disabled
     - PathAnimationTimeline: enabled/disabled
     ↓
   Tool settings panel updates (if tool-specific settings exist)
     ↓
   Visual feedback updates
```

### **Tool State Transitions**

```
select → move: TransformControls mode changes to 'translate'
move → rotate: TransformControls mode changes to 'rotate'
rotate → scale: TransformControls mode changes to 'scale'
scale → sculpt: TransformControls disabled, EditableMesh enabled
sculpt → surfacePaint: EditableMesh disabled, SurfaceCursor enabled
surfacePaint → cursor: SurfaceCursor disabled, Cursor3D enabled
cursor → path: Cursor3D disabled, PathAnimationTimeline enabled
path → select: PathAnimationTimeline disabled, default selection mode
```

**[END:TAG:ACTIVATION]**

---

## 6. TOOL SETTINGS SYSTEM

**[TAG:SETTINGS] [TAG:TOOL_SYSTEM]**

### **Settings Architecture**

**Settings State:**
```typescript
const [toolSettings, setToolSettings] = useState<ThreeDToolSettings>(DEFAULT_THREED_SETTINGS);
const [toolSettingsState, setToolSettingsState] = useState<'closed' | 'mini' | 'full'>('mini');
```

**Settings UI:**
- **ThreeDToolSettingsMiniBar**: Compact settings panel (left sidebar)
- **FullToolSettingsDrawer**: Expanded settings drawer (right sidebar)

### **Settings Categories**

**General Settings:**
- snapToGrid: Enable/disable grid snapping
- gridSize: Grid size in meters

**Tool-Specific Settings:**
- Move: moveIncrement, moveConstrainAxis
- Rotate: rotateSnap, rotateSnapDegrees
- Scale: scaleUniform
- Sculpt: sculptBrushSize, sculptStrength
- Surface Paint: surfacePaintBrushSize, surfacePaintColor, surfacePaintOpacity
- Cursor: cursorEnabled, cursorSnapToGrid, cursorShowAxisLines

### **Settings Update Flow**

```
1. USER CHANGES SETTING
   Settings panel control change
     ↓
   setToolSettings(prev => ({ ...prev, [key]: value }))
     ↓
   toolSettings state updated
     ↓
   Viewport3D receives updated toolSettings prop
     ↓
   Tool behavior updates:
     - snapToGrid: Grid snapping applied
     - gridSize: Grid visual updates
     - rotateSnap: Rotation snapping applied
     - sculptStrength: Brush strength changes
     - surfacePaintBrushSize: Brush size changes
     ↓
   Immediate visual feedback
```

**[END:TAG:SETTINGS]**

---

## 7. INTEGRATION POINTS

**[TAG:INTEGRATION] [TAG:TOOL_SYSTEM]**

### **Internal Integrations**

**Viewport3D**
- Receives: activeTool, toolSettings props
- Uses: activeTool to determine tool behavior
- Calls: Tool-specific components based on activeTool

**TransformControls** (drei)
- Mode determined by activeTool:
  - 'move' → 'translate'
  - 'rotate' → 'rotate'
  - 'scale' → 'scale'
  - Other tools → undefined (disabled)

**SurfaceCursor**
- Enabled when: activeTool === 'surfacePaint' || (activeTool === 'paint' && crossCanvasPaint?.enabled)
- Receives: toolSettings for brush size

**EditableMesh**
- Enabled when: activeTool === 'sculpt'
- Receives: brushSettings from toolSettings

**PathAnimationTimeline**
- Enabled when: activeTool === 'path'
- Manages: Path animation state

### **External Dependencies**

**React State**
- useState for tool state management
- useCallback for handlers

**Layout System**
- IconBar for tool buttons
- Drawer system for settings panels

**No External Stores**
- All state managed locally in ThreeDEditorPageV2

**[END:TAG:INTEGRATION]**

---

## 8. PERFORMANCE CHARACTERISTICS

**[TAG:PERFORMANCE] [TAG:TOOL_SYSTEM]**

### **State Update Performance**

**Tool Switching**
- Single state update (activeTool)
- Minimal re-renders (only affected components)
- Tool-specific components mount/unmount efficiently

**Settings Updates**
- Immutable state updates
- Only affected tool behavior updates
- No unnecessary re-renders

### **Tool-Specific Performance**

**Transform Tools** (move/rotate/scale)
- Direct mesh property updates (fast)
- TransformControls efficient (drei optimized)

**Sculpt Tool**
- Mesh geometry updates (CPU-bound)
- Performance scales with mesh complexity

**Painting Tools** (paint/surfacePaint)
- Canvas drawing operations (CPU-bound)
- Texture uploads (GPU-bound)
- Performance scales with brush size and stroke frequency

**[END:TAG:PERFORMANCE]**

---

## 9. FILE DEPENDENCY GRAPH

**[TAG:DEPS] [TAG:TOOL_SYSTEM]**

```
src/pages/versions/threed/ThreeDEditorPageV2.tsx
  │
  ├─→ Defines: ThreeDTool type
  ├─→ Defines: ThreeDToolSettings interface
  ├─→ Defines: ALL_THREED_TOOLS configuration
  ├─→ Defines: TOOLBAR_MODE_CONFIG
  │
  ├─→ Manages: activeTool state
  ├─→ Manages: toolSettings state
  ├─→ Manages: toolbarMode state
  │
  ├─→ Provides: Tool UI
  │   ├─→ IconBar (tool buttons)
  │   ├─→ ThreeDToolSettingsMiniBar
  │   └─→ FullToolSettingsDrawer
  │
  └─→ Integrates: With Viewport3D
        └─→ Passes activeTool and toolSettings props
```

**[END:TAG:DEPS]**

---

## 10. TYPE FLOW MAP

**[TAG:TYPES] [TAG:TOOL_SYSTEM]**

### **Type Flow**

```
Tool ID (string)
  ↓
ThreeDTool type
  ↓
Tool Configuration (ToolConfig)
  ↓
Tool Activation
  ↓
Viewport3D Integration
  ↓
Tool-Specific Behavior

Tool Settings (Partial<ThreeDToolSettings>)
  ↓
ThreeDToolSettings (complete)
  ↓
Viewport3D Integration
  ↓
Tool Behavior Updates
```

### **Tool Mode Flow**

```
ToolbarMode ('beginner' | 'intermediate' | 'pro' | 'custom')
  ↓
TOOLBAR_MODE_CONFIG[ToolbarMode]
  ↓
activeToolIds (string[])
  ↓
Filtered Tool List
  ↓
IconBar Rendering
```

**[END:TAG:TYPES]**

---

## 11. STATE MANAGEMENT

**[TAG:STATE_MGMT] [TAG:TOOL_SYSTEM]**

### **State Architecture**

**Primary State:**
```typescript
const [activeTool, setActiveTool] = useState<ThreeDTool>('select');
const [toolSettings, setToolSettings] = useState<ThreeDToolSettings>(DEFAULT_THREED_SETTINGS);
const [toolSettingsState, setToolSettingsState] = useState<'closed' | 'mini' | 'full'>('mini');
const [toolbarMode, setToolbarMode] = useState<ToolbarMode>('intermediate');
const [customToolOrder, setCustomToolOrder] = useState<string[]>([]);
```

**Derived State:**
```typescript
const activeToolIds = useMemo(() => {
  if (toolbarMode === 'custom') {
    return customToolOrder.length > 0 ? customToolOrder : TOOLBAR_MODE_CONFIG.intermediate;
  }
  return TOOLBAR_MODE_CONFIG[toolbarMode];
}, [toolbarMode, customToolOrder]);

const leftToolButtons = useMemo(() => {
  const tools = ALL_THREED_TOOLS.filter(tool => activeToolIds.includes(tool.id));
  return tools.map(tool => ({
    id: tool.id,
    icon: tool.icon,
    label: tool.label,
    type: 'tool' as const,
    onClick: () => setActiveTool(tool.id as ThreeDTool),
  }));
}, [activeToolIds]);
```

### **State Update Patterns**

**Tool Activation:**
```typescript
setActiveTool(toolId); // Simple state update
```

**Settings Update:**
```typescript
setToolSettings(prev => ({ ...prev, [key]: value })); // Immutable update
```

**[END:TAG:STATE_MGMT]**

---

## 12. EVENT FLOW TIMELINE

**[TAG:EVENTS] [TAG:TOOL_SYSTEM]**

### **Tool Activation Events**

```
1. BUTTON CLICK
   IconBar tool button onClick
     ↓
   setActiveTool(toolId)
     ↓
   State update
     ↓
   Viewport3D receives new activeTool
     ↓
   Tool behavior activates

2. KEYBOARD SHORTCUT (if implemented)
   Keyboard event
     ↓
   Map shortcut to tool ID
     ↓
   setActiveTool(mappedToolId)
     ↓
   Same flow as button click

3. TOOLBAR MODE CHANGE
   Mode selector click
     ↓
   setToolbarMode(newMode)
     ↓
   activeToolIds recomputed
     ↓
   leftToolButtons filtered
     ↓
   IconBar re-renders
```

**[END:TAG:EVENTS]**

---

## 13. RELATIONSHIP MATRIX

**[TAG:RELATIONS] [TAG:TOOL_SYSTEM]**

### **Component Relationships**

| Component | Relationship | Data Flow |
|-----------|-------------|-----------|
| ThreeDEditorPageV2 | Manages tool state | activeTool, toolSettings |
| Viewport3D | Consumes tool state | Receives activeTool, toolSettings props |
| IconBar | Displays tools | Receives leftToolButtons, calls setActiveTool |
| TransformControls | Tool-dependent | Mode determined by activeTool |
| SurfaceCursor | Tool-dependent | Enabled based on activeTool |
| EditableMesh | Tool-dependent | Enabled when activeTool === 'sculpt' |
| PathAnimationTimeline | Tool-dependent | Enabled when activeTool === 'path' |

### **Tool Relationships**

| Tool | Integrates With | Behavior |
|------|----------------|----------|
| select | Viewport3D | Selection raycasting |
| move | TransformControls | translate mode |
| rotate | TransformControls | rotate mode |
| scale | TransformControls | scale mode |
| sculpt | EditableMesh | Mesh deformation |
| paint | CrossCanvasPaintControls | 2D → 3D painting |
| surfacePaint | SurfaceCursor, TexturePaint | UV painting |
| cursor | Cursor3D | 3D positioning |
| path | PathAnimationTimeline | Path creation |

**[END:TAG:RELATIONS]**

---

## 📝 NEXT STEPS

**Phase 1 Complete:**
- ✅ Tool system architecture documented
- ✅ Tool categories mapped
- ✅ Tool activation flows documented
- ✅ Settings system outlined

**Phase 2 Planned:**
- ⏳ Keyboard shortcut system detailed map
- ⏳ Tool customization system map
- ⏳ Tool preset system map
- ⏳ Tool history/undo integration

**Phase 3 Planned:**
- ⏳ Advanced tool features
- ⏳ Tool plugin system
- ⏳ Tool performance optimization

---

**Status:** PHASE 1 - Foundation System Mapping  
**Confidence:** 0.90 (High - Comprehensive tool system documentation)  
**Next:** Continue with additional specialized system maps as needed



---

## ✅ CONCLUSION

**[TAG:CONCLUSION]**

This master monolith consolidates all modelmaker/3D parametric asset engine System Anatomy Mapping (S.A.M.) documentation into a single, perfectly organized, AI-optimized file.

**Source Files:**
- `MASTER_REFERENCE_PACK_SYSTEM_MAP.md` - MASTER REFERENCE PACK SYSTEM MAP (Last Modified: 2026-01-01 15:22:47)
- `MASTER_CURVE_FIRST_GENERATOR_SYSTEM_MAP.md` - MASTER CURVE-FIRST GENERATOR SYSTEM MAP (Last Modified: 2026-01-01 15:18:40)
- `MASTER_FEATURE_NODE_SYSTEM_MAP.md` - MASTER FEATURE NODE SYSTEM MAP (Last Modified: 2026-01-01 15:36:50)
- `MASTER_METRICS_FITTING_LOOP_SYSTEM_MAP.md` - MASTER METRICS + FITTING LOOP SYSTEM MAP (Last Modified: 2026-01-01 15:46:23)
- `MASTER_COMPILER_RUNTIME_OUTPUTS_SYSTEM_MAP.md` - MASTER COMPILER + RUNTIME OUTPUTS SYSTEM MAP (Last Modified: 2026-01-01 15:54:23)
- `MASTER_LIBRARY_PRESETS_AUTHORING_SYSTEM_MAP.md` - MASTER LIBRARY, PRESETS, AND AUTHORING UX SYSTEM MAP (Last Modified: 2026-01-01 15:59:06)
- `MASTER_REFERENCE_PACK_CALIBRATION_WORKFLOW_SYSTEM_MAP.md` - MASTER REFERENCE PACK CALIBRATION WORKFLOW SYSTEM MAP (Last Modified: 2026-01-01 16:10:09)
- `MASTER_GRAPH_TEMPLATE_SYSTEM_MAP.md` - MASTER GRAPH TEMPLATE SYSTEM MAP (Last Modified: 2026-01-01 16:17:47)
- `MASTER_ARCHITECTURE_OPERATOR_ALGORITHMS_SYSTEM_MAP.md` - MASTER ARCHITECTURE OPERATOR ALGORITHMS SYSTEM MAP (Last Modified: 2026-01-01 17:55:31)
- `MASTER_CONSTRAINT_BUNDLES_SYSTEM_MAP.md` - MASTER CONSTRAINT BUNDLES SYSTEM MAP (Last Modified: 2026-01-01 18:14:43)
- `MASTER_PARAMFIELDS_SYSTEM_MAP.md` - MASTER PARAMFIELDS SYSTEM MAP (Last Modified: 2026-01-01 18:30:03)
- `MASTER_FIELD_EVALUATION_CROSS_SECTION_GENERATOR_SYSTEM_MAP.md` - MASTER FIELD EVALUATION & CROSS-SECTION GENERATOR SYSTEM MAP (Last Modified: 2026-01-01 18:39:17)
- `MASTER_POLYGON_2D_GEOMETRY_ALGORITHMS_SYSTEM_MAP.md` - MASTER POLYGON & 2D GEOMETRY ALGORITHMS SYSTEM MAP (Last Modified: 2026-01-01 18:44:58)
- `MASTER_CROSS_SECTION_GENERATOR_REFINEMENTS_SYSTEM_MAP.md` - MASTER CROSS-SECTION GENERATOR REFINEMENTS SYSTEM MAP (Last Modified: 2026-01-01 18:50:30)
- `MASTER_CURVE1D_SOLVER_SYSTEM_MAP.md` - MASTER CURVE1D SOLVER SYSTEM MAP (Last Modified: 2026-01-01 19:07:11)
- `MASTER_3D_EDITOR_SYSTEM_MAP.md` - MASTER 3D EDITOR SYSTEM MAP (Last Modified: 2026-01-01 15:00:39)
- `MASTER_VIEWPORT_3D_SYSTEM_MAP.md` - MASTER VIEWPORT 3D SYSTEM MAP (Last Modified: 2026-01-01 14:22:32)
- `MASTER_3D_SCENE_OBJECT_SYSTEM_MAP.md` - MASTER 3D SCENE OBJECT SYSTEM MAP (Last Modified: 2026-01-01 14:26:36)
- `MASTER_3D_TOOL_SYSTEM_MAP.md` - MASTER 3D TOOL SYSTEM MAP (Last Modified: 2026-01-01 14:46:00)

**To Update:**
1. Edit source files
2. Run: `python scripts/build_modelmaker_monolith.py`
3. Monolith regenerated

**Search Methods:**
- Grep: Search for `[TAG:...]` markers
- RAG: Use semantic search on full content
- Direct Navigation: Use anchor links in TOC

**[END:TAG:CONCLUSION]**

---

**Generated:** 2026-01-01 20:48:00
**Source Files:** 19/19