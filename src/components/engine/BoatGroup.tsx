// BoatGroup - Thin wrapper delegating to the shared BoatSceneShared (V1 hull path).
import { BoatSceneShared } from "./BoatSceneShared";
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
  return (
    <BoatSceneShared
      hullVersion="v1"
      paramsV1={params}
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
