import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HullParams } from "@/lib/parametric/types";

interface ParameterPanelProps {
  params: HullParams;
  onChange: (params: HullParams) => void;
}

interface ParamSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  onChange: (value: number) => void;
}

function ParamSlider({ label, value, min, max, step, unit, onChange }: ParamSliderProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Label className="text-sm text-muted-foreground">{label}</Label>
        <span className="text-sm font-mono text-primary">
          {value.toFixed(2)}{unit && ` ${unit}`}
        </span>
      </div>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={([v]) => onChange(v)}
        className="w-full"
      />
    </div>
  );
}

export function ParameterPanel({ params, onChange }: ParameterPanelProps) {
  const updateParam = (key: keyof HullParams, value: number) => {
    onChange({ ...params, [key]: value });
  };

  return (
    <div className="h-full overflow-y-auto scrollbar-hide">
      <div className="p-4 space-y-6">
        {/* Dimensions */}
        <div>
          <h3 className="text-sm font-semibold mb-4 text-foreground">Dimensions</h3>
          <div className="space-y-4">
            <ParamSlider
              label="Length"
              value={params.length}
              min={2}
              max={8}
              step={0.1}
              unit="m"
              onChange={(v) => updateParam("length", v)}
            />
            <ParamSlider
              label="Beam"
              value={params.beam}
              min={0.5}
              max={3}
              step={0.05}
              unit="m"
              onChange={(v) => updateParam("beam", v)}
            />
            <ParamSlider
              label="Height"
              value={params.height}
              min={0.1}
              max={1}
              step={0.01}
              unit="m"
              onChange={(v) => updateParam("height", v)}
            />
          </div>
        </div>

        <Separator />

        {/* Section Shape */}
        <div>
          <h3 className="text-sm font-semibold mb-4 text-foreground">Section Shape</h3>
          <div className="space-y-4">
            <ParamSlider
              label="V-Hull Depth"
              value={params.vDepth}
              min={0}
              max={1}
              step={0.01}
              onChange={(v) => updateParam("vDepth", v)}
            />
            <ParamSlider
              label="Deadrise"
              value={params.deadrise}
              min={0}
              max={1}
              step={0.01}
              onChange={(v) => updateParam("deadrise", v)}
            />
            <ParamSlider
              label="Bilge Radius"
              value={params.bilgeRadius}
              min={0}
              max={1}
              step={0.01}
              onChange={(v) => updateParam("bilgeRadius", v)}
            />
            <ParamSlider
              label="Chine Sharpness"
              value={params.chineSharpness}
              min={0}
              max={1}
              step={0.01}
              onChange={(v) => updateParam("chineSharpness", v)}
            />
            <ParamSlider
              label="Flare"
              value={params.flare}
              min={-0.5}
              max={0.5}
              step={0.01}
              onChange={(v) => updateParam("flare", v)}
            />
            <ParamSlider
              label="Rail Radius"
              value={params.railRadius}
              min={0}
              max={1}
              step={0.01}
              onChange={(v) => updateParam("railRadius", v)}
            />
          </div>
        </div>

        <Separator />

        {/* Rocker & Lift */}
        <div>
          <h3 className="text-sm font-semibold mb-4 text-foreground">Rocker & Lift</h3>
          <div className="space-y-4">
            <ParamSlider
              label="Rocker Amplitude"
              value={params.rockerAmp}
              min={0}
              max={0.2}
              step={0.005}
              unit="m"
              onChange={(v) => updateParam("rockerAmp", v)}
            />
            <ParamSlider
              label="Bow Lift"
              value={params.bowLiftAmp}
              min={0}
              max={0.1}
              step={0.005}
              unit="m"
              onChange={(v) => updateParam("bowLiftAmp", v)}
            />
            <ParamSlider
              label="Stern Deck Drop"
              value={params.sternDeckDrop}
              min={0}
              max={0.1}
              step={0.005}
              unit="m"
              onChange={(v) => updateParam("sternDeckDrop", v)}
            />
          </div>
        </div>

        <Separator />

        {/* Taper */}
        <div>
          <h3 className="text-sm font-semibold mb-4 text-foreground">Taper</h3>
          <div className="space-y-4">
            <ParamSlider
              label="Bow Taper Min"
              value={params.bowTaperMin}
              min={0}
              max={0.3}
              step={0.01}
              onChange={(v) => updateParam("bowTaperMin", v)}
            />
            <ParamSlider
              label="Stern Taper Min"
              value={params.sternTaperMin}
              min={0.3}
              max={1}
              step={0.01}
              onChange={(v) => updateParam("sternTaperMin", v)}
            />
            <ParamSlider
              label="Taper Power"
              value={params.taperPower}
              min={1}
              max={3}
              step={0.1}
              onChange={(v) => updateParam("taperPower", v)}
            />
          </div>
        </div>

        <Separator />

        {/* Bow Tip */}
        <div>
          <h3 className="text-sm font-semibold mb-4 text-foreground">Bow Tip</h3>
          <div className="space-y-4">
            <ParamSlider
              label="Tip Pointiness"
              value={params.bowTipPoint}
              min={0}
              max={1}
              step={0.01}
              onChange={(v) => updateParam("bowTipPoint", v)}
            />
            <ParamSlider
              label="Tip Roundness"
              value={params.bowTipRound}
              min={0}
              max={1}
              step={0.01}
              onChange={(v) => updateParam("bowTipRound", v)}
            />
          </div>
        </div>

        <Separator />

        {/* Stern / Transom */}
        <div>
          <h3 className="text-sm font-semibold mb-4 text-foreground">Stern / Transom</h3>
          <p className="text-xs text-muted-foreground mb-4">
            Laser dinghies have a wide, flat transom (not pointed like the bow)
          </p>
          <div className="space-y-4">
            <ParamSlider
              label="Stern Flat Width"
              value={params.sternFlatWidth}
              min={0.3}
              max={1}
              step={0.01}
              onChange={(v) => updateParam("sternFlatWidth", v)}
            />
            <ParamSlider
              label="Stern Blend Region"
              value={params.sternFlatBlend}
              min={0.05}
              max={0.4}
              step={0.01}
              onChange={(v) => updateParam("sternFlatBlend", v)}
            />
            <ParamSlider
              label="Transom Height"
              value={params.transomHeight}
              min={0.5}
              max={1}
              step={0.01}
              onChange={(v) => updateParam("transomHeight", v)}
            />
            <ParamSlider
              label="Transom Rake"
              value={params.transomRake}
              min={0}
              max={15}
              step={0.5}
              unit="°"
              onChange={(v) => updateParam("transomRake", v)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
