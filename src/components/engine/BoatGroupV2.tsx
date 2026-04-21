// BoatGroupV2 - Thin wrapper delegating to the shared BoatSceneShared.
import { BoatSceneShared, SharedHullVersion } from "./BoatSceneShared";
import { HullV2Params } from "@/lib/parametric/v2/types";
import { LaserRiggingParams } from "@/lib/parametric/laserRigging";

export type HullVersion = "parametric" | "v3" | "brep" | "legacy" | "enhanced";

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
  return (
    <BoatSceneShared
      hullVersion={hullVersion as SharedHullVersion}
      paramsV2={params}
      rigging={rigging}
      resolution={resolution}
      showWireframe={showWireframe}
      showRigging={showRigging}
      showOcean={showOcean}
      boomAngle={boomAngle}
      rudderAngle={rudderAngle}
      windAngle={windAngle}
      windStrength={windStrength}
      boatSpeed={boatSpeed}
      highlightTarget={highlightTarget}
    />
  );
}
