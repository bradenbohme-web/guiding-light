// BoatGroupV2 - Contains V2 hull, transom/cockpit, rigging with wave bobbing and spray
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { HullMeshV2 } from "./HullMeshV2";
import { RiggingMesh } from "./RiggingMesh";
import { BoatSpray } from "./BoatSpray";
import { HullV2Params } from "@/lib/parametric/v2/types";
import { LaserRiggingParams } from "@/lib/parametric/laserRigging";

interface BoatGroupV2Props {
  params: HullV2Params;
  resolution: "low" | "medium" | "high";
  showWireframe: boolean;
  showRigging: boolean;
  rigging: LaserRiggingParams;
  boomAngle: number;
  rudderAngle: number;
  windAngle: number;
  windStrength: number;
  boatSpeed: number;
  showOcean: boolean;
  highlightTarget: string | null;
}

export function BoatGroupV2({
  params,
  resolution,
  showWireframe,
  showRigging,
  rigging,
  boomAngle,
  rudderAngle,
  windAngle,
  windStrength,
  boatSpeed,
  showOcean,
  highlightTarget,
}: BoatGroupV2Props) {
  const groupRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);

  // Wave parameters for bobbing
  const waveParams = useMemo(() => ({
    amplitude: 0.12,
    frequency: 0.4,
    rollAmplitude: 0.03,
    pitchAmplitude: 0.015,
  }), []);

  // Animate hull bobbing when ocean is enabled
  useFrame((_, delta) => {
    if (!groupRef.current || !showOcean) return;

    timeRef.current += delta;
    const t = timeRef.current;

    // Heave (up/down)
    const heave = Math.sin(t * waveParams.frequency * Math.PI * 2) * waveParams.amplitude;
    // Roll (side-to-side rotation)
    const roll = Math.sin(t * waveParams.frequency * Math.PI * 2 * 0.7 + 0.5) * waveParams.rollAmplitude;
    // Pitch (front-to-back rotation)
    const pitch = Math.sin(t * waveParams.frequency * Math.PI * 2 * 1.1 + 1.2) * waveParams.pitchAmplitude;

    // Boat speed affects wave response - faster boat = less bobbing (planing)
    const speedFactor = Math.max(0.3, 1 - boatSpeed * 0.08);

    groupRef.current.position.y = heave * speedFactor;
    groupRef.current.rotation.z = roll * speedFactor;
    groupRef.current.rotation.x = pitch * speedFactor;
  });

  // Bow spray emitter position - at the BOW (front/positive X)
  const bowEmitter = useMemo(() => {
    return new THREE.Vector3(params.dimensions.length / 2 - 0.1, 0, 0);
  }, [params.dimensions.length]);

  return (
    <group ref={groupRef}>
      {/* V2 Hull (5-piece construction) */}
      <HullMeshV2
        params={params}
        resolution={resolution}
        showWireframe={showWireframe}
        highlightTarget={highlightTarget}
      />

      {/* Rigging */}
      {showRigging && (
        <RiggingMesh
          rigging={rigging}
          showWireframe={showWireframe}
          boomAngle={boomAngle}
          rudderAngle={rudderAngle}
          windAngle={windAngle}
          windStrength={windStrength}
          highlightTarget={highlightTarget}
        />
      )}

      {/* Bow spray particles */}
      {showOcean && (
        <BoatSpray
          emitter={bowEmitter}
          speed={boatSpeed}
          waterY={-0.35}
          enabled={boatSpeed > 1}
        />
      )}
    </group>
  );
}
