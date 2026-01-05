// BoatGroup - Contains hull, transom/cockpit, rigging with wave bobbing and spray
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { HullMesh } from "./HullMesh";
import { RiggingMesh } from "./RiggingMesh";
import { TransomCockpit } from "./TransomCockpit";
import { BoatSpray } from "./BoatSpray";
import { HullParams } from "@/lib/parametric/types";
import { LaserRiggingParams } from "@/lib/parametric/laserRigging";

interface BoatGroupProps {
  params: HullParams;
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

export function BoatGroup({
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
}: BoatGroupProps) {
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
    return new THREE.Vector3(params.length / 2 - 0.1, 0, 0);
  }, [params.length]);

  return (
    <group ref={groupRef}>
      {/* Hull */}
      <HullMesh
        params={params}
        resolution={resolution}
        showWireframe={showWireframe}
        highlight={highlightTarget === "hull"}
      />

      {/* Transom and Cockpit */}
      <TransomCockpit
        params={params}
        showWireframe={showWireframe}
        highlight={highlightTarget}
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
