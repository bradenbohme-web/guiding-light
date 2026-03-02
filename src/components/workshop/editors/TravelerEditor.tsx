// Traveler system editor
import { LaserRiggingParams } from "@/lib/parametric/laserRigging";
import { TravelerSystem } from "@/components/engine/TravelerSystem";
import { SubsystemViewport } from "../SubsystemViewport";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface TravelerEditorProps {
  rigging: LaserRiggingParams;
  onChange: (rigging: LaserRiggingParams) => void;
}

function S({ label, value, min, max, step, unit, onChange }: {
  label: string; value: number; min: number; max: number; step: number; unit?: string;
  onChange: (v: number) => void;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between">
        <Label className="text-xs text-muted-foreground">{label}</Label>
        <span className="text-xs font-mono text-primary">{value.toFixed(step < 0.1 ? 3 : 2)}{unit || ""}</span>
      </div>
      <Slider value={[value]} min={min} max={max} step={step} onValueChange={([v]) => onChange(v)} />
    </div>
  );
}

export function TravelerEditor({ rigging, onChange }: TravelerEditorProps) {
  const updateTraveler = (key: string, value: number) => {
    onChange({ ...rigging, traveler: { ...rigging.traveler, [key]: value } });
  };

  return (
    <div className="flex h-full">
      <div className="w-80 border-r border-border overflow-y-auto scrollbar-hide bg-card p-4 space-y-4">
        <h3 className="text-sm font-bold">Traveler System</h3>

        <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
          <S label="Car Position" value={rigging.traveler.carZ} min={-rigging.traveler.trackHalfSpan} max={rigging.traveler.trackHalfSpan} step={0.005} unit="m" onChange={v => updateTraveler("carZ", v)} />
          <p className="text-[9px] text-muted-foreground mt-1">Negative = starboard, Positive = port</p>
        </div>

        <Separator />

        <div className="space-y-3">
          <S label="Track Position X" value={rigging.traveler.x} min={-2} max={0} step={0.01} unit="m" onChange={v => updateTraveler("x", v)} />
          <S label="Track Height Y" value={rigging.traveler.y} min={0} max={0.2} step={0.005} unit="m" onChange={v => updateTraveler("y", v)} />
          <S label="Track Half-Span" value={rigging.traveler.trackHalfSpan} min={0.15} max={0.6} step={0.005} unit="m" onChange={v => updateTraveler("trackHalfSpan", v)} />
        </div>
      </div>

      <div className="flex-1">
        <SubsystemViewport title="Traveler" cameraDistance={1.5} cameraTarget={[rigging.traveler.x, rigging.traveler.y, 0]}>
          <TravelerSystem traveler={rigging.traveler} highlight={false} />
        </SubsystemViewport>
      </div>
    </div>
  );
}
