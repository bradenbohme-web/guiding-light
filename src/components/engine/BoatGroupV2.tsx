// BoatGroupV2 - Contains ultimate Laser hull, rigging with wave bobbing and spray
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { LaserHullUltimateModel } from "./LaserHullParametricUltimate";
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

    const heave = Math.sin(t * waveParams.frequency * Math.PI * 2) * waveParams.amplitude;
    const roll = Math.sin(t * waveParams.frequency * Math.PI * 2 * 0.7 + 0.5) * waveParams.rollAmplitude;
    const pitch = Math.sin(t * waveParams.frequency * Math.PI * 2 * 1.1 + 1.2) * waveParams.pitchAmplitude;

    const speedFactor = Math.max(0.3, 1 - boatSpeed * 0.08);

    groupRef.current.position.y = heave * speedFactor;
    groupRef.current.rotation.z = roll * speedFactor;
    groupRef.current.rotation.x = pitch * speedFactor;
  });

  // Bow spray emitter position
  const bowEmitter = useMemo(() => {
    return new THREE.Vector3(params.dimensions.length / 2 - 0.1, 0, 0);
  }, [params.dimensions.length]);

  return (
    <group ref={groupRef}>
      {/* Ultimate Laser Hull - proper cubic Bézier sections, real offset data */}
      <LaserHullUltimateModel
        params={{
          length: params.dimensions.length,
          beam: params.dimensions.beam,
          stations: resolution === "high" ? 128 : resolution === "medium" ? 64 : 32,
          sectionSamples: resolution === "high" ? 40 : resolution === "medium" ? 24 : 16,
        }}
        wireframe={showWireframe}
        rotation={[0, -Math.PI / 2, 0]}
        position={[0, 0, -0.15]}
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
