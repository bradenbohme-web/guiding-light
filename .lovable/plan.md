

## Plan: Focused Sail Rig with Detail Drawer and Cloth Collision

### Overview

Strip the Sail Rig page down to the core sail system (mast, boom, sail, battens, pulleys, ropes, traveler). Replace the left sidebar object list with a **right-side drawer** that opens when you click any object in 3D, showing rich nautical descriptions, relationships, and editable coordinates. Add cloth self-collision and sail quality controls.

---

### 1. Remove Centerboard, Rudder, Hiking Strap from Sail Rig

**Files:** `src/components/engine/RiggingMesh.tsx`, `src/pages/SailRig.tsx`

- Delete `CenterboardMesh`, `RudderMesh`, `HikingStrap` components from `RiggingMesh.tsx`
- Remove their renders from the `RiggingMesh` assembly
- Remove centerboard/rudder hardpoints from the sidebar object list
- Filter out rudder-related hardpoints (`rudder_pivot`, `tiller_attach`, `extension_hinge`, `hiking_strap_bow`, `hiking_strap_stern`, `centerboard_trunk`) from the displayed list

---

### 2. Object Info Database

**New file:** `src/lib/parametric/riggingInfo.ts`

A lookup table keyed by object type/ID containing for each rigging component:
- **name**: Proper sailing term (e.g. "Boom Vang Block", "Cunningham Fairlead")
- **description**: What it does in plain English (e.g. "Controls leech tension and prevents the boom from rising under load")
- **relationships**: Which other objects it connects to (e.g. "Connects vang rope from mast base to boom")
- **defaultPosition**: The correct real-world position for reference
- **category**: "block", "line", "spar", "fitting", "sail"

Covers all pulleys (`mainsheet_boom`, `mainsheet_traveler`, `vang_boom_block`, `vang_base_block`, `cunningham_block`, `outhaul_block`), all relevant hardpoints, mast, boom, traveler, and sail.

---

### 3. Right Drawer System

**New file:** `src/components/engine/ObjectDetailDrawer.tsx`

A sheet/drawer that slides in from the right when an object is clicked in the 3D scene.

Contents:
- **Header**: Object name + category badge
- **Description section**: What it is, what it does, proper sailing terminology
- **Relationships**: List of connected objects (clickable to select them)
- **Position section**: World XYZ coordinate inputs (the existing `CoordinateInput` component)
- **Reference position**: Shows default/correct position for comparison
- **Attach point selector** (for pulleys/hardpoints)

For the **Sail** specifically, an expanded section with:
- Cloth resolution (segmentsWidth, segmentsHeight)
- Opacity, color
- Luff length, foot length
- Leech curve (roach)
- Per-batten position, length, stiffness sliders
- Window toggle + position/size
- **Collision section** (see below)

**Integration:** Replace the left sidebar "Objects" section. Keep Wind/Tensions/Display in the left sidebar. The drawer opens/closes based on `selectedObj` state.

---

### 4. Click-to-Select for All Objects

**Files:** `src/components/engine/RiggingMesh.tsx`, `src/components/engine/ClothSail.tsx`

- Add `onClick` to the sail mesh in `ClothSail` so clicking the sail opens its detail drawer
- Add `onClick` to rope meshes in `RopeLines.tsx` for each rope
- Add `onClick` to the traveler system
- Clicking any object sets `selectedObj` which opens the right drawer with that object's info
- Clicking the same object or clicking empty space closes the drawer

---

### 5. Cloth Self-Collision

**File:** `src/components/engine/ClothSail.tsx`

Add a spatial-hash based self-collision pass after the constraint solver in `useFrame`:

- Divide the sail's bounding volume into a uniform grid (cell size = 2x cloth spacing)
- For each free particle, check neighboring cells for particles that are too close
- If two non-adjacent particles are closer than a threshold (e.g. 0.01m), push them apart along their connecting vector
- This prevents the sail from passing through itself during wind simulation
- Add a `collisionEnabled` boolean and `collisionThreshold` parameter to the sail params
- Expose these in the sail's detail drawer

---

### 6. Sail Quality Controls in Drawer

Editable parameters exposed in the sail detail drawer:

| Parameter | What it controls |
|-----------|-----------------|
| `clothSegmentsWidth` | Horizontal mesh resolution |
| `clothSegmentsHeight` | Vertical mesh resolution |
| `opacity` | Sail transparency |
| `color` | Sail cloth color |
| `luffLength` | Height of sail along mast |
| `footLength` | Width of sail along boom |
| `leechCurve` | Roach amount on trailing edge |
| `damping` | How quickly oscillations settle (new param) |
| `gravity` | Gravity strength affecting drape (new param) |
| `collisionEnabled` | Toggle self-collision |
| `collisionThreshold` | Minimum particle separation |
| `constraintIterations` | Solver quality (currently hardcoded 5) |

---

### 7. Persistent Coordinates

**File:** `src/pages/SailRig.tsx`

- On every rigging state change, serialize the full `LaserRiggingParams` to `localStorage` (converting Vector3 objects to `{x,y,z}`)
- On page load, check localStorage for saved state and restore it
- The "Reset" button clears localStorage and restores defaults
- This gives immediate persistence without needing database round-trips

---

### Files Summary

| File | Action |
|------|--------|
| `src/lib/parametric/riggingInfo.ts` | Create — object info database |
| `src/components/engine/ObjectDetailDrawer.tsx` | Create — right drawer component |
| `src/components/engine/RiggingMesh.tsx` | Edit — remove centerboard/rudder/hiking, keep sail system only |
| `src/components/engine/ClothSail.tsx` | Edit — add self-collision, expose quality params, add onClick |
| `src/components/engine/RopeLines.tsx` | Edit — add onClick per rope |
| `src/components/engine/TravelerSystem.tsx` | Edit — add onClick |
| `src/pages/SailRig.tsx` | Edit — integrate drawer, remove left sidebar objects section, add localStorage persistence, filter hardpoints |
| `src/lib/parametric/laserRigging.ts` | Edit — add sail physics params (damping, gravity, collisionEnabled, collisionThreshold, constraintIterations) |

