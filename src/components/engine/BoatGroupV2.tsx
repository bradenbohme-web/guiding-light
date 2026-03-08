// BoatGroupV2 - Contains hull (switchable versions), rigging with wave bobbing and spray
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { LaserHullUltimateModel } from "./LaserHullParametricUltimate";
import { LaserHullUltimateModel as LaserHullV3Model } from "./LaserHullParametricUltimateV3";
import { LaserHullBRepModel } from "./LaserHullBRep";
import { HullMeshV2 } from "./HullMeshV2";
import { RiggingMesh } from "./RiggingMesh";
import { BoatSpray } from "./BoatSpray";
import { HullV2Params } from "@/lib/parametric/v2/types";
import { LaserRiggingParams } from "@/lib/parametric/laserRigging";

export type HullVersion = "parametric" | "v3" | "brep" | "legacy";

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
  hullVersion?: HullVersion;
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
  hullVersion = "parametric",
}: BoatGroupV2Props) {
  const groupRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);

  const waveParams = useMemo(() => ({
    amplitude: 0.12,
    frequency: 0.4,
    rollAmplitude: 0.03,
    pitchAmplitude: 0.015,
  }), []);

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

  const bowEmitter = useMemo(() => {
    return new THREE.Vector3(params.dimensions.length / 2 - 0.1, 0, 0);
  }, [params.dimensions.length]);

  const resStations = resolution === "high" ? 128 : resolution === "medium" ? 64 : 32;
  const resSections = resolution === "high" ? 40 : resolution === "medium" ? 24 : 16;

  return (
    <group ref={groupRef}>
      {/* Hull - switchable versions */}
      {hullVersion === "parametric" && (
        <LaserHullUltimateModel
          params={{
            length: params.dimensions.length,
            beam: params.dimensions.beam,
            stations: resStations,
            sectionSamples: resSections,
          }}
          wireframe={showWireframe}
          rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          position={[-params.dimensions.length / 2, 0, 0]}
        />
      )}

      {hullVersion === "v3" && (
        <LaserHullV3Model
          params={{
            length: params.dimensions.length,
            beam: params.dimensions.beam,
            stations: resStations,
            sectionSamples: resSections,
          }}
          wireframe={showWireframe}
          rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          position={[-params.dimensions.length / 2, 0, 0]}
        />
      )}

      {hullVersion === "brep" && (
        <LaserHullBRepModel
          params={{
            nx: resStations,
            nb: 15,
            nt: 15,
            nd: 20,
          }}
          wireframe={showWireframe}
          rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          position={[-params.dimensions.length / 2, 0, 0]}
        />
      )}

      {hullVersion === "legacy" && (
        <HullMeshV2
          params={params}
          resolution={resolution}
          showWireframe={showWireframe}
          highlightTarget={highlightTarget}
        />
      )}

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
