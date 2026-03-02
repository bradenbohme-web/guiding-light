// Rope / Lines editor
import { LaserRiggingParams } from "@/lib/parametric/laserRigging";
import { RopeLines } from "@/components/engine/RopeLines";
import { SubsystemViewport } from "../SubsystemViewport";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface RopeEditorProps {
  rigging: LaserRiggingParams;
  onChange: (rigging: LaserRiggingParams) => void;
  boomAngle: number;
  onBoomAngleChange: (a: number) => void;
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

export function RopeEditor({ rigging, onChange, boomAngle, onBoomAngleChange }: RopeEditorProps) {
  const boomRad = (boomAngle / 180) * Math.PI;

  return (
    <div className="flex h-full">
      <div className="w-80 border-r border-border overflow-y-auto scrollbar-hide bg-card p-4 space-y-4">
        <h3 className="text-sm font-bold">Lines & Ropes</h3>
        <p className="text-[10px] text-muted-foreground">{rigging.ropes.length} lines configured</p>

        <div className="p-3 bg-primary/5 rounded-lg border border-primary/20 space-y-3">
          <S label="Boom Angle" value={boomAngle} min={-90} max={90} step={1} unit="°" onChange={onBoomAngleChange} />
        </div>

        <Separator />

        {/* Tension controls */}
        <div>
          <h4 className="text-xs font-semibold mb-3">Tension Controls</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-1.5 rounded bg-white" />
              <span className="text-[10px]">Mainsheet</span>
            </div>
            <S label="Mainsheet Tension" value={rigging.mainsheetTension} min={0} max={1} step={0.01} onChange={v => onChange({ ...rigging, mainsheetTension: v })} />

            <div className="flex items-center gap-2 mb-1 mt-3">
              <div className="w-3 h-1.5 rounded" style={{ backgroundColor: "#2563eb" }} />
              <span className="text-[10px]">Vang</span>
            </div>
            <S label="Vang Tension" value={rigging.vangTension} min={0} max={1} step={0.01} onChange={v => onChange({ ...rigging, vangTension: v })} />

            <div className="flex items-center gap-2 mb-1 mt-3">
              <div className="w-3 h-1.5 rounded" style={{ backgroundColor: "#dc2626" }} />
              <span className="text-[10px]">Cunningham</span>
            </div>
            <S label="Cunningham Tension" value={rigging.cunninghamTension} min={0} max={1} step={0.01} onChange={v => onChange({ ...rigging, cunninghamTension: v })} />

            <div className="flex items-center gap-2 mb-1 mt-3">
              <div className="w-3 h-1.5 rounded" style={{ backgroundColor: "#16a34a" }} />
              <span className="text-[10px]">Outhaul</span>
            </div>
            <S label="Outhaul Tension" value={rigging.outhaulTension} min={0} max={1} step={0.01} onChange={v => onChange({ ...rigging, outhaulTension: v })} />
          </div>
        </div>

        <Separator />

        {/* Line list */}
        <div>
          <h4 className="text-xs font-semibold mb-2">Line Details</h4>
          {rigging.ropes.map((rope, i) => (
            <div key={rope.id} className="p-2 bg-secondary/30 rounded mb-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium">{rope.name}</span>
                <Badge variant="outline" className="text-[9px] h-4">{rope.diameter * 1000}mm</Badge>
              </div>
              <div className="text-[9px] text-muted-foreground mt-0.5">
                {rope.segments.length} segment{rope.segments.length > 1 ? "s" : ""} • 
                Tension: {rope.tension.toFixed(2)} • 
                Elasticity: {rope.elasticity.toFixed(3)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1">
        <SubsystemViewport title="Lines & Ropes" cameraDistance={5} cameraTarget={[0, 0.5, 0]}>
          {/* Reference mast/boom structure */}
          <mesh position={[rigging.mast.position.x, rigging.mast.height / 2, 0]}>
            <cylinderGeometry args={[0.01, 0.02, rigging.mast.height, 8]} />
            <meshStandardMaterial color="hsl(0, 0%, 60%)" transparent opacity={0.3} />
          </mesh>
          {/* Boom ref */}
          <group position={[rigging.mast.position.x, rigging.boom.gooseneckHeight, 0]} rotation={[0, boomRad, 0]}>
            <mesh position={[-rigging.boom.length / 2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.01, 0.01, rigging.boom.length, 8]} />
              <meshStandardMaterial color="hsl(0, 0%, 60%)" transparent opacity={0.3} />
            </mesh>
          </group>

          <RopeLines rigging={rigging} boomAngle={boomRad} highlight={false} />
        </SubsystemViewport>
      </div>
    </div>
  );
}
