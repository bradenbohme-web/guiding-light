// BoatSceneShared — single source of truth for the full boat scene.
// Used by Index (via BoatGroup / BoatGroupV2) and the Sail Rig page so they
// can never drift apart again.
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { HullMesh } from "./HullMesh";
import { HullMeshV2 } from "./HullMeshV2";
import { TransomCockpit } from "./TransomCockpit";
import { LaserHullUltimateModel as LaserHullParametricModel } from "./LaserHullParametricUltimate";
import { LaserHullUltimateModel as LaserHullV3Model } from "./LaserHullParametricUltimateV3";
import { LaserHullBRepModel } from "./LaserHullBRep";
import { LaserHullEnhancedModel } from "./LaserHullEnhanced";
import { RiggingMesh } from "./RiggingMesh";
import { BoatSpray } from "./BoatSpray";

import { HullParams } from "@/lib/parametric/types";
import { HullV2Params } from "@/lib/parametric/v2/types";
import { LaserRiggingParams } from "@/lib/parametric/laserRigging";

export type SharedHullVersion =
  | "parametric"
  | "v3"
  | "brep"
  | "legacy"
  | "enhanced"
  | "v1";

export interface BoatSceneSharedProps {
  /** Which hull renderer to use. */
  hullVersion: SharedHullVersion;

  /** V1 hull params (used when hullVersion === "v1"). */
  paramsV1?: HullParams;

  /** V2 hull params (used by parametric / v3 / brep / legacy / enhanced). */
  paramsV2?: HullV2Params;

  rigging: LaserRiggingParams;

  resolution: "low" | "medium" | "high";
  showWireframe: boolean;
  showRigging: boolean;
  showOcean: boolean;

  boomAngle: number;
  rudderAngle: number;
  windAngle: number;
  windStrength: number;
  boatSpeed: number;

  highlightTarget: string | null;

  /** When true, the scene bobs on the simulated waves. */
  enableBobbing?: boolean;

  onObjectClick?: (target: { type: string; index?: number }) => void;
}

export function BoatSceneShared({
  hullVersion,
  paramsV1,
  paramsV2,
  rigging,
  resolution,
  showWireframe,
  showRigging,
  showOcean,
  boomAngle,
  rudderAngle: _rudderAngle,
  windAngle,
  windStrength,
  boatSpeed,
  highlightTarget,
  enableBobbing = true,
  onObjectClick,
}: BoatSceneSharedProps) {
  const groupRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);

  const waveParams = useMemo(
    () => ({
      amplitude: 0.12,
      frequency: 0.4,
      rollAmplitude: 0.03,
      pitchAmplitude: 0.015,
    }),
    [],
  );

  useFrame((_, delta) => {
    if (!groupRef.current || !enableBobbing || !showOcean) return;
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

  // Resolve effective dimensions (used to position rigging-relative spray, etc.)
  const dims = useMemo(() => {
    if (paramsV2) {
      return {
        length: paramsV2.dimensions.length,
        beam: paramsV2.dimensions.beam,
      };
    }
    if (paramsV1) {
      return { length: paramsV1.length, beam: paramsV1.beam };
    }
    return { length: 4.23, beam: 1.39 };
  }, [paramsV1, paramsV2]);

  const resStations = resolution === "high" ? 128 : resolution === "medium" ? 64 : 32;
  const resSections = resolution === "high" ? 40 : resolution === "medium" ? 24 : 16;

  const bowEmitter = useMemo(
    () => new THREE.Vector3(dims.length / 2 - 0.1, 0, 0),
    [dims.length],
  );

  const renderHull = () => {
    // V1 explicit case
    if (hullVersion === "v1" && paramsV1) {
      return (
        <>
          <HullMesh
            params={paramsV1}
            resolution={resolution}
            showWireframe={showWireframe}
            highlight={highlightTarget === "hull"}
          />
          <TransomCockpit
            params={paramsV1}
            showWireframe={showWireframe}
            highlight={highlightTarget}
          />
        </>
      );
    }

    if (!paramsV2) return null;

    const commonHull = {
      length: paramsV2.dimensions.length,
      beam: paramsV2.dimensions.beam,
      stations: resStations,
      sectionSamples: resSections,
    };

    switch (hullVersion) {
      case "parametric":
        return (
          <LaserHullParametricModel
            params={commonHull}
            wireframe={showWireframe}
            rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
            position={[-paramsV2.dimensions.length / 2, 0, 0]}
          />
        );

      case "v3":
        return (
          <LaserHullV3Model
            params={commonHull}
            wireframe={showWireframe}
            rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
            position={[-paramsV2.dimensions.length / 2, 0, 0]}
          />
        );

      case "brep":
        return (
          <LaserHullBRepModel
            params={{ nx: resStations, nb: 15, nt: 15, nd: 20 }}
            wireframe={showWireframe}
            rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
            position={[-paramsV2.dimensions.length / 2, 0, 0]}
          />
        );

      case "enhanced":
        return (
          <LaserHullEnhancedModel
            length={commonHull.length}
            beam={commonHull.beam}
            stations={commonHull.stations}
            sectionSamples={commonHull.sectionSamples}
            wireframe={showWireframe}
            rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
            position={[-paramsV2.dimensions.length / 2, 0, 0]}
          />
        );

      case "legacy":
      default:
        return (
          <HullMeshV2
            params={paramsV2}
            resolution={resolution}
            showWireframe={showWireframe}
            highlightTarget={highlightTarget}
          />
        );
    }
  };

  return (
    <group ref={groupRef}>
      {renderHull()}

      {showRigging && (
        <RiggingMesh
          rigging={rigging}
          showWireframe={showWireframe}
          boomAngle={boomAngle}
          windAngle={windAngle}
          windStrength={windStrength}
          highlightTarget={highlightTarget}
          onObjectClick={onObjectClick}
        />
      )}

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
