

## Plan: Full Coordinate Control for All Rigging Objects on Sail Rig Page

### Problem
The Sail Rig page (`/sail-rig`) uses limited sliders with hardcoded min/max ranges for positioning rigging objects. The user needs direct, unrestricted coordinate control to position every object precisely.

### What Changes

**1. Create a reusable `CoordinateInput` component** (`src/components/engine/CoordinateInput.tsx`)
- Three numeric input fields (X, Y, Z) with no min/max limits
- Accepts a `THREE.Vector3`, emits updated vector on change
- Compact layout: label + three inline inputs with axis labels
- Step configurable (default 0.01)

**2. Create a `TransformGizmo` wrapper** (`src/components/engine/TransformGizmo.tsx`)
- Wraps `@react-three/drei`'s `TransformControls` around a selected object
- Provides translate mode for dragging objects in 3D
- Reports position changes back to the sidebar state
- Selected object ID tracked in SailRig state

**3. Build a new "Objects" section in the Sail Rig sidebar**
Replaces the limited slider-based controls with a selectable object list. Each object gets full XYZ coordinate inputs:

| Object | What's editable |
|--------|----------------|
| Mast | position (x, y, z) |
| Boom | position (x, y, z) |
| Traveler | x, y, trackHalfSpan, carZ (all as free inputs) |
| Each Pulley (6) | position (x, y, z), attach point |
| Each Hardpoint (20) | position (x, y, z) |
| Rope endpoints | Start/end positions via hardpoint references |

**4. Wire the 3D gizmo to the selected object**
- When user clicks an object in the sidebar list, a `TransformControls` gizmo appears on that object in the 3D viewport
- Dragging the gizmo updates the numeric inputs in real-time
- Typing in the numeric inputs moves the gizmo and object

**5. Fix the camera reset bug**
- Memoize the `OrbitControls` target with `useMemo` so it doesn't recreate on every render (line 153 currently creates `new THREE.Vector3(0, 2.5, 0)` inline)

### Technical Approach

- Use `@react-three/drei` `TransformControls` (already available in the project's drei dependency)
- `TransformControls` will be placed inside `SailRigScene` and attached to a dummy mesh at the selected object's world position
- On drag end, compute the new local position from the world position and update rigging state
- The `CoordinateInput` component uses raw `<input type="number">` with no `min`/`max` attributes, allowing any value
- Object selection state: `selectedObject: { type: 'pulley' | 'hardpoint' | 'traveler' | 'mast' | 'boom', index?: number } | null`

### Files Modified
- `src/components/engine/CoordinateInput.tsx` -- new
- `src/components/engine/TransformGizmo.tsx` -- new
- `src/pages/SailRig.tsx` -- replace limited sliders with object list + coordinate inputs + gizmo integration, fix camera reset

