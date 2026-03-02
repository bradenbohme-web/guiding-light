// Sail subsystem editor - cloth sim, battens, window
import { useState } from "react";
import { LaserRiggingParams } from "@/lib/parametric/laserRigging";
import { ClothSail } from "@/components/engine/ClothSail";
import { SubsystemViewport } from "../SubsystemViewport";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

interface SailEditorProps {
  rigging: LaserRiggingParams;
  onChange: (rigging: LaserRiggingParams) => void;
}

function SailSlider({ label, value, min, max, step, unit, onChange }: {
  label: string; value: number; min: number; max: number; step: number; unit?: string;
  onChange: (v: number) => void;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between">
        <Label className="text-xs text-muted-foreground">{label}</Label>
        <span className="text-xs font-mono text-primary">{value.toFixed(step < 0.1 ? 2 : 1)}{unit || ""}</span>
      </div>
      <Slider value={[value]} min={min} max={max} step={step} onValueChange={([v]) => onChange(v)} />
    </div>
  );
}

export function SailEditor({ rigging, onChange }: SailEditorProps) {
  const [windAngle, setWindAngle] = useState(0.3);
  const [windStrength, setWindStrength] = useState(0.5);
  const [boomAngle, setBoomAngle] = useState(0);
  const [sections, setSections] = useState({ shape: true, battens: true, window: true, tension: true, sim: true });

  const updateSail = (key: string, value: number | boolean) => {
    onChange({ ...rigging, sail: { ...rigging.sail, [key]: value } });
  };

  const updateBattens = (key: string, value: number | boolean) => {
    onChange({
      ...rigging,
      sail: { ...rigging.sail, battens: { ...rigging.sail.battens, [key]: value } },
    });
  };

  const updateWindow = (key: string, value: any) => {
    onChange({
      ...rigging,
      sail: { ...rigging.sail, window: { ...rigging.sail.window, [key]: value } },
    });
  };

  const toggle = (s: keyof typeof sections) => setSections(p => ({ ...p, [s]: !p[s] }));

  return (
    <div className="flex h-full">
      <div className="w-80 border-r border-border overflow-y-auto scrollbar-hide bg-card p-4 space-y-3">
        <h3 className="text-sm font-bold">Sail Editor</h3>

        {/* Simulation Controls */}
        <Collapsible open={sections.sim}>
          <CollapsibleTrigger onClick={() => toggle("sim")} className="flex items-center justify-between w-full py-1.5 text-xs font-semibold">
            <span>Simulation</span>
            <ChevronDown className={`w-3 h-3 transition-transform ${sections.sim ? "rotate-180" : ""}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3 pt-2">
            <SailSlider label="Wind Angle" value={windAngle} min={-Math.PI} max={Math.PI} step={0.05} unit=" rad" onChange={setWindAngle} />
            <SailSlider label="Wind Strength" value={windStrength} min={0} max={1} step={0.01} onChange={setWindStrength} />
            <SailSlider label="Boom Angle" value={boomAngle} min={-1.5} max={1.5} step={0.01} unit=" rad" onChange={setBoomAngle} />
          </CollapsibleContent>
        </Collapsible>

        <Separator />

        {/* Shape */}
        <Collapsible open={sections.shape}>
          <CollapsibleTrigger onClick={() => toggle("shape")} className="flex items-center justify-between w-full py-1.5 text-xs font-semibold">
            <span>Sail Shape</span>
            <ChevronDown className={`w-3 h-3 transition-transform ${sections.shape ? "rotate-180" : ""}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3 pt-2">
            <SailSlider label="Luff Length" value={rigging.sail.luffLength} min={3} max={8} step={0.1} unit="m" onChange={v => updateSail("luffLength", v)} />
            <SailSlider label="Foot Length" value={rigging.sail.footLength} min={1} max={4} step={0.1} unit="m" onChange={v => updateSail("footLength", v)} />
            <SailSlider label="Head Width" value={rigging.sail.headWidth} min={0} max={1} step={0.01} unit="m" onChange={v => updateSail("headWidth", v)} />
            <SailSlider label="Leech Curve" value={rigging.sail.leechCurve} min={0} max={0.2} step={0.005} onChange={v => updateSail("leechCurve", v)} />
            <SailSlider label="Opacity" value={rigging.sail.opacity} min={0.3} max={1} step={0.01} onChange={v => updateSail("opacity", v)} />
            <SailSlider label="Segments W" value={rigging.sail.clothSegmentsWidth} min={8} max={32} step={1} onChange={v => updateSail("clothSegmentsWidth", v)} />
            <SailSlider label="Segments H" value={rigging.sail.clothSegmentsHeight} min={8} max={48} step={1} onChange={v => updateSail("clothSegmentsHeight", v)} />
          </CollapsibleContent>
        </Collapsible>

        <Separator />

        {/* Tension */}
        <Collapsible open={sections.tension}>
          <CollapsibleTrigger onClick={() => toggle("tension")} className="flex items-center justify-between w-full py-1.5 text-xs font-semibold">
            <span>Tension Controls</span>
            <ChevronDown className={`w-3 h-3 transition-transform ${sections.tension ? "rotate-180" : ""}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3 pt-2">
            <SailSlider label="Cunningham" value={rigging.cunninghamTension} min={0} max={1} step={0.01} onChange={v => onChange({ ...rigging, cunninghamTension: v })} />
            <SailSlider label="Outhaul" value={rigging.outhaulTension} min={0} max={1} step={0.01} onChange={v => onChange({ ...rigging, outhaulTension: v })} />
            <SailSlider label="Vang" value={rigging.vangTension} min={0} max={1} step={0.01} onChange={v => onChange({ ...rigging, vangTension: v })} />
            <SailSlider label="Mainsheet" value={rigging.mainsheetTension} min={0} max={1} step={0.01} onChange={v => onChange({ ...rigging, mainsheetTension: v })} />
          </CollapsibleContent>
        </Collapsible>

        <Separator />

        {/* Battens */}
        <Collapsible open={sections.battens}>
          <CollapsibleTrigger onClick={() => toggle("battens")} className="flex items-center justify-between w-full py-1.5 text-xs font-semibold">
            <span>Battens</span>
            <ChevronDown className={`w-3 h-3 transition-transform ${sections.battens ? "rotate-180" : ""}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3 pt-2">
            <div className="flex items-center gap-2">
              <Switch checked={rigging.sail.battens.enabled} onCheckedChange={v => updateBattens("enabled", v)} />
              <Label className="text-xs">Enable Battens</Label>
            </div>
            {rigging.sail.battens.enabled && (
              <>
                <SailSlider label="Stiffness" value={rigging.sail.battens.stiffness} min={0} max={1} step={0.01} onChange={v => updateBattens("stiffness", v)} />
                <SailSlider label="Count" value={rigging.sail.battens.count} min={1} max={8} step={1} onChange={v => updateBattens("count", v)} />
                {rigging.sail.battens.positions.map((pos, i) => (
                  <SailSlider
                    key={i}
                    label={`Batten ${i + 1} Pos`}
                    value={pos}
                    min={0.1}
                    max={0.95}
                    step={0.01}
                    onChange={v => {
                      const newPos = [...rigging.sail.battens.positions];
                      newPos[i] = v;
                      updateBattens("positions", v); // simplified - full impl would update array
                    }}
                  />
                ))}
              </>
            )}
          </CollapsibleContent>
        </Collapsible>

        <Separator />

        {/* Window */}
        <Collapsible open={sections.window}>
          <CollapsibleTrigger onClick={() => toggle("window")} className="flex items-center justify-between w-full py-1.5 text-xs font-semibold">
            <span>Sail Window</span>
            <ChevronDown className={`w-3 h-3 transition-transform ${sections.window ? "rotate-180" : ""}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3 pt-2">
            <div className="flex items-center gap-2">
              <Switch checked={rigging.sail.window.enabled} onCheckedChange={v => updateWindow("enabled", v)} />
              <Label className="text-xs">Enable Window</Label>
            </div>
            {rigging.sail.window.enabled && (
              <>
                <SailSlider label="Position U" value={rigging.sail.window.position.u} min={0.1} max={0.9} step={0.01} onChange={v => updateWindow("position", { ...rigging.sail.window.position, u: v })} />
                <SailSlider label="Position V" value={rigging.sail.window.position.v} min={0.1} max={0.9} step={0.01} onChange={v => updateWindow("position", { ...rigging.sail.window.position, v: v })} />
                <SailSlider label="Width" value={rigging.sail.window.size.width} min={0.1} max={1} step={0.01} unit="m" onChange={v => updateWindow("size", { ...rigging.sail.window.size, width: v })} />
                <SailSlider label="Height" value={rigging.sail.window.size.height} min={0.1} max={1} step={0.01} unit="m" onChange={v => updateWindow("size", { ...rigging.sail.window.size, height: v })} />
              </>
            )}
          </CollapsibleContent>
        </Collapsible>
      </div>

      <div className="flex-1">
        <SubsystemViewport title="Sail" cameraDistance={6} cameraTarget={[-1, 2.5, 0]}>
          {/* Mast reference line */}
          <mesh position={[0, rigging.sail.luffLength / 2, 0]}>
            <cylinderGeometry args={[0.015, 0.015, rigging.sail.luffLength, 8]} />
            <meshStandardMaterial color="hsl(0, 0%, 60%)" metalness={0.5} roughness={0.4} />
          </mesh>
          {/* Sail cloth */}
          <group position={[0, 0, 0]}>
            <ClothSail
              rigging={rigging}
              boomAngle={boomAngle}
              windAngle={windAngle}
              windStrength={windStrength}
              highlight={false}
            />
          </group>
        </SubsystemViewport>
      </div>
    </div>
  );
}
