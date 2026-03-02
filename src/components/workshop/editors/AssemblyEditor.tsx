// Full assembly view - all subsystems together
import { HullV2Params } from "@/lib/parametric/v2/types";
import { LaserRiggingParams } from "@/lib/parametric/laserRigging";
import { OceanSettings } from "@/lib/ocean/types";
import { Viewport3DV2 } from "@/components/engine/Viewport3DV2";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

interface AssemblyEditorProps {
  hullParams: HullV2Params;
  rigging: LaserRiggingParams;
  oceanSettings: OceanSettings;
  boomAngle: number;
  rudderAngle: number;
  onBoomAngleChange: (a: number) => void;
  onRudderAngleChange: (a: number) => void;
}

export function AssemblyEditor({
  hullParams, rigging, oceanSettings, boomAngle, rudderAngle,
  onBoomAngleChange, onRudderAngleChange
}: AssemblyEditorProps) {
  const [showWireframe, setShowWireframe] = useState(false);
  const [showRigging, setShowRigging] = useState(true);
  const [showOcean, setShowOcean] = useState(true);
  const [windAngle, setWindAngle] = useState(0);
  const [windStrength, setWindStrength] = useState(0.5);
  const [boatSpeed, setBoatSpeed] = useState(0);
  const [viewMode, setViewMode] = useState<"perspective" | "top" | "side" | "front">("perspective");

  return (
    <div className="flex h-full">
      <div className="w-80 border-r border-border overflow-y-auto scrollbar-hide bg-card p-4 space-y-4">
        <h3 className="text-sm font-bold">Full Assembly</h3>
        <p className="text-[10px] text-muted-foreground">All subsystems combined</p>

        {/* View controls */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Switch checked={showWireframe} onCheckedChange={setShowWireframe} className="scale-75" />
            <Label className="text-xs">Wireframe</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch checked={showRigging} onCheckedChange={setShowRigging} className="scale-75" />
            <Label className="text-xs">Rigging</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch checked={showOcean} onCheckedChange={setShowOcean} className="scale-75" />
            <Label className="text-xs">Ocean</Label>
          </div>
        </div>

        <Separator />

        {/* Sailing controls */}
        <div className="space-y-3">
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <Label className="text-xs text-muted-foreground">Boom Angle</Label>
              <span className="text-xs font-mono text-primary">{boomAngle}°</span>
            </div>
            <Slider value={[boomAngle]} min={-90} max={90} step={1} onValueChange={([v]) => onBoomAngleChange(v)} />
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <Label className="text-xs text-muted-foreground">Rudder Angle</Label>
              <span className="text-xs font-mono text-primary">{rudderAngle}°</span>
            </div>
            <Slider value={[rudderAngle]} min={-35} max={35} step={1} onValueChange={([v]) => onRudderAngleChange(v)} />
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <Label className="text-xs text-muted-foreground">Wind Angle</Label>
              <span className="text-xs font-mono text-primary">{(windAngle * 180 / Math.PI).toFixed(0)}°</span>
            </div>
            <Slider value={[windAngle]} min={-Math.PI} max={Math.PI} step={0.05} onValueChange={([v]) => setWindAngle(v)} />
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <Label className="text-xs text-muted-foreground">Wind Strength</Label>
              <span className="text-xs font-mono text-primary">{windStrength.toFixed(2)}</span>
            </div>
            <Slider value={[windStrength]} min={0} max={1} step={0.01} onValueChange={([v]) => setWindStrength(v)} />
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <Label className="text-xs text-muted-foreground">Boat Speed</Label>
              <span className="text-xs font-mono text-primary">{boatSpeed.toFixed(1)} m/s</span>
            </div>
            <Slider value={[boatSpeed]} min={0} max={8} step={0.1} onValueChange={([v]) => setBoatSpeed(v)} />
          </div>
        </div>

        <Separator />

        {/* View mode */}
        <div className="flex gap-1 flex-wrap">
          {(["perspective", "top", "side", "front"] as const).map(mode => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-2 py-1 rounded text-[10px] ${
                viewMode === mode ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1">
        <Viewport3DV2
          params={hullParams}
          resolution="medium"
          showWireframe={showWireframe}
          showGrid={!showOcean}
          showRigging={showRigging}
          showOcean={showOcean}
          viewMode={viewMode}
          rigging={rigging}
          boomAngle={(boomAngle / 180) * Math.PI}
          rudderAngle={rudderAngle}
          windAngle={windAngle}
          windStrength={windStrength}
          boatSpeed={boatSpeed}
          highlightTarget={null}
          oceanSettings={oceanSettings}
        />
      </div>
    </div>
  );
}
