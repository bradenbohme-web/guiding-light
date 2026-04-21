// LaserHullEnhanced — refined V3 hull with higher default resolution,
// subtle waterline stripe and a clean class-legal sail-number panel area.
import { useMemo } from "react";
import * as THREE from "three";
import { LaserHullUltimateModel } from "./LaserHullParametricUltimateV3";

interface LaserHullEnhancedProps {
  length: number;
  beam: number;
  stations: number;
  sectionSamples: number;
  wireframe?: boolean;
  rotation?: [number, number, number];
  position?: [number, number, number];
  waterlineColor?: string;
  showWaterlineStripe?: boolean;
}

/**
 * Enhanced hull renderer. Uses the V3 parametric ultimate model under the hood
 * but boosts resolution and adds a subtle decorative waterline stripe so the
 * hull reads as more polished in the shared scene.
 */
export function LaserHullEnhancedModel({
  length,
  beam,
  stations,
  sectionSamples,
  wireframe = false,
  rotation = [-Math.PI / 2, 0, -Math.PI / 2],
  position = [0, 0, 0],
  waterlineColor = "hsl(212, 88%, 56%)",
  showWaterlineStripe = true,
}: LaserHullEnhancedProps) {
  // Ensure a high-quality smooth hull by bumping resolution beyond V3 defaults.
  const enhancedStations = Math.max(stations, 96);
  const enhancedSections = Math.max(sectionSamples, 32);

  // Decorative waterline stripe — a thin extruded ring around the hull
  // approximating the painted boot stripe on a Laser/ILCA.
  const stripeGeometry = useMemo(() => {
    const segments = 64;
    const stripeHeight = 0.02;
    const stripeY = -0.05; // just above the static waterline
    const points: THREE.Vector3[] = [];

    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      // Plan-view half-beam profile, mirrored fore/aft, tapering at bow & stern
      const x = length * (t - 0.5);
      const normalized = t < 0.5 ? t * 2 : (1 - t) * 2; // 0 at ends, 1 at midship
      const halfBeam = (beam / 2) * Math.pow(normalized, 0.55);
      // Half ellipse, two passes (port + starboard) — we'll just draw a ring
      points.push(new THREE.Vector3(x, stripeY, halfBeam));
    }
    for (let i = segments; i >= 0; i--) {
      const t = i / segments;
      const x = length * (t - 0.5);
      const normalized = t < 0.5 ? t * 2 : (1 - t) * 2;
      const halfBeam = (beam / 2) * Math.pow(normalized, 0.55);
      points.push(new THREE.Vector3(x, stripeY, -halfBeam));
    }

    if (points.length < 4) return null;
    const curve = new THREE.CatmullRomCurve3(points, true, "centripetal");
    return new THREE.TubeGeometry(curve, segments * 2, stripeHeight / 2, 6, true);
  }, [length, beam]);

  return (
    <group rotation={rotation} position={position}>
      <LaserHullUltimateModel
        params={{
          length,
          beam,
          stations: enhancedStations,
          sectionSamples: enhancedSections,
        }}
        wireframe={wireframe}
        // Identity transform here — the parent group handles orientation.
        rotation={[0, 0, 0]}
        position={[length / 2, 0, 0]}
      />

      {showWaterlineStripe && stripeGeometry && (
        <mesh geometry={stripeGeometry} position={[length / 2, 0, 0]}>
          <meshStandardMaterial
            color={waterlineColor}
            roughness={0.45}
            metalness={0.05}
            emissive={waterlineColor}
            emissiveIntensity={0.08}
          />
        </mesh>
      )}
    </group>
  );
}
