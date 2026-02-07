// HeightfieldLayer — R3F component that runs the SWE solver each frame
// Generates object mask from boat position and passes heightfield to ocean surface

import { useRef, useEffect, useCallback } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { SWESolver, SWEConfig } from "@/lib/ocean/swe/SWESolver";

interface HeightfieldLayerProps {
  enabled?: boolean;
  boatPosition?: THREE.Vector3;
  boatVelocity?: THREE.Vector2; // XZ velocity
  boatLength?: number;
  boatBeam?: number;
  config?: Partial<SWEConfig>;
  onHeightfield?: (texture: THREE.Texture, worldSize: number) => void;
}

export function HeightfieldLayer({
  enabled = true,
  boatPosition,
  boatVelocity,
  boatLength = 4.2,
  boatBeam = 1.4,
  config,
  onHeightfield,
}: HeightfieldLayerProps) {
  const { gl } = useThree();
  const solverRef = useRef<SWESolver | null>(null);
  const objectMaskRef = useRef<THREE.DataTexture | null>(null);
  const objectMaskData = useRef<Float32Array | null>(null);

  // Initialize solver
  useEffect(() => {
    if (!enabled) return;

    const solver = new SWESolver(gl, config);
    solverRef.current = solver;

    // Create object mask texture
    const res = solver.resolution;
    const data = new Float32Array(res * res * 4);
    objectMaskData.current = data;
    objectMaskRef.current = new THREE.DataTexture(
      data as unknown as BufferSource,
      res,
      res,
      THREE.RGBAFormat,
      THREE.FloatType
    );

    return () => {
      solver.dispose();
      solverRef.current = null;
      objectMaskRef.current?.dispose();
    };
  }, [enabled, gl, config]);

  // Update object mask from boat position
  const updateObjectMask = useCallback(() => {
    const solver = solverRef.current;
    const data = objectMaskData.current;
    const mask = objectMaskRef.current;
    if (!solver || !data || !mask || !boatPosition) return;

    const res = solver.resolution;
    const worldSize = solver.worldSize;
    const half = worldSize / 2;

    // Clear mask
    data.fill(0);

    // Boat footprint in grid space
    const cx = ((boatPosition.x + half) / worldSize) * res;
    const cz = ((boatPosition.z + half) / worldSize) * res;
    const halfLenGrid = (boatLength / 2 / worldSize) * res;
    const halfBeamGrid = (boatBeam / 2 / worldSize) * res;

    const vx = boatVelocity?.x ?? 0;
    const vz = boatVelocity?.y ?? 0;

    const iMin = Math.max(0, Math.floor(cx - halfLenGrid));
    const iMax = Math.min(res - 1, Math.ceil(cx + halfLenGrid));
    const jMin = Math.max(0, Math.floor(cz - halfBeamGrid));
    const jMax = Math.min(res - 1, Math.ceil(cz + halfBeamGrid));

    for (let j = jMin; j <= jMax; j++) {
      for (let i = iMin; i <= iMax; i++) {
        // Elliptical hull shape
        const dx = (i - cx) / halfLenGrid;
        const dz = (j - cz) / halfBeamGrid;
        const dist2 = dx * dx + dz * dz;
        if (dist2 > 1) continue;

        const depth = (1 - dist2) * 0.15; // Max draft 15cm
        const idx = (j * res + i) * 4;
        data[idx + 0] = depth;     // Object depth
        data[idx + 1] = vx;        // Object velocity X
        data[idx + 2] = vz;        // Object velocity Z
        data[idx + 3] = 1;         // Object present flag
      }
    }

    mask.needsUpdate = true;
  }, [boatPosition, boatVelocity, boatLength, boatBeam]);

  // Step simulation each frame
  useFrame((_, delta) => {
    const solver = solverRef.current;
    if (!solver || !enabled) return;

    updateObjectMask();
    solver.step(delta, objectMaskRef.current ?? undefined);

    // Notify parent of heightfield texture
    onHeightfield?.(solver.heightfieldTexture, solver.worldSize);
  });

  return null; // Pure compute, no visual output
}
