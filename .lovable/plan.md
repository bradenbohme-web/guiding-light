

## Fix Battens: Remove Visual Batten Meshes, Keep as Hidden Cloth Stiffeners Only

### Problem
The `BattenMesh` component renders visible tube geometry by sampling cloth point positions each frame. Because batten `pointIndices` collect grid points that don't form a clean horizontal line (the sail is triangular, so grid rows at different `v` positions have different widths), the sampled points zigzag across the sail instead of forming a straight horizontal line. The visual mesh connects these zigzagging points, creating the ugly zigzag battens.

### Solution
Battens should be **invisible structural stiffeners only** — they affect the cloth simulation through constraints (which already works correctly via the batten constraint system in `useMemo`), but no visible batten mesh is rendered.

### Changes in `src/components/engine/ClothSail.tsx`

1. **Remove the `BattenMesh` component entirely** (lines 538-593) — the inner component that creates `TubeGeometry` from cloth points each frame.

2. **Remove the `battenMeshes` useMemo** (lines 519-535) — the calculation of batten visual positions/lengths/pointIndices for rendering.

3. **Remove the batten rendering JSX** (lines 632-635) — the `{battenMeshes.map(...)}` block.

4. **Keep all existing batten constraint logic unchanged** — the `battenPtIndices`, `battenStiffness`, explicit batten constraints (lines 241-273), and bending resistance all remain. These correctly stiffen the cloth at batten locations with medium rigidity.

5. **Adjust default stiffness to medium** — change the batten constraint stiffness factor from `0.6 + stiffness * 0.35` to `0.45 + stiffness * 0.3` for a more moderate default feel.

This is a deletion-focused change. The cloth simulation already handles batten stiffening correctly through constraints — the only problem was the broken visual rendering on top.

