// Cockpit & Transom subsystem editor
import { useState } from "react";
import { HullParams, DEFAULT_HULL_PARAMS } from "@/lib/parametric/types";
import { 
  TransomParams, CockpitParams, 
  DEFAULT_TRANSOM_PARAMS, DEFAULT_COCKPIT_PARAMS,
  TransomCockpit 
} from "@/components/engine/TransomCockpit";
import { SubsystemViewport } from "../SubsystemViewport";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface CockpitTransomEditorProps {
  hullParams: HullParams;
  transomParams: TransomParams;
  cockpitParams: CockpitParams;
  onTransomChange: (p: TransomParams) => void;
  onCockpitChange: (p: CockpitParams) => void;
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

export function CockpitTransomEditor({ 
  hullParams, transomParams, cockpitParams, onTransomChange, onCockpitChange 
}: CockpitTransomEditorProps) {
  return (
    <div className="flex h-full">
      <div className="w-80 border-r border-border overflow-y-auto scrollbar-hide bg-card p-4 space-y-4">
        <h3 className="text-sm font-bold">Cockpit & Transom</h3>

        {/* Transom */}
        <div>
          <h4 className="text-xs font-semibold mb-3">Transom</h4>
          <div className="space-y-3">
            <S label="Rake Angle" value={transomParams.transomAngle} min={0} max={15} step={0.5} unit="°" onChange={v => onTransomChange({ ...transomParams, transomAngle: v })} />
            <S label="Corner Radius" value={transomParams.transomRadius} min={0} max={0.1} step={0.005} unit="m" onChange={v => onTransomChange({ ...transomParams, transomRadius: v })} />
            <S label="Drain Diameter" value={transomParams.drainHoleDiameter} min={0.01} max={0.05} step={0.002} unit="m" onChange={v => onTransomChange({ ...transomParams, drainHoleDiameter: v })} />
            <S label="Drain Position" value={transomParams.drainHolePosition} min={0} max={1} step={0.01} onChange={v => onTransomChange({ ...transomParams, drainHolePosition: v })} />
            <S label="Rudder Mount Spacing" value={transomParams.rudderMountSpacing} min={0.08} max={0.25} step={0.005} unit="m" onChange={v => onTransomChange({ ...transomParams, rudderMountSpacing: v })} />
          </div>
        </div>

        <Separator />

        {/* Cockpit */}
        <div>
          <h4 className="text-xs font-semibold mb-3">Cockpit</h4>
          <div className="space-y-3">
            <S label="Length" value={cockpitParams.length} min={1} max={3} step={0.05} unit="m" onChange={v => onCockpitChange({ ...cockpitParams, length: v })} />
            <S label="Width" value={cockpitParams.width} min={0.4} max={1.2} step={0.02} unit="m" onChange={v => onCockpitChange({ ...cockpitParams, width: v })} />
            <S label="Depth" value={cockpitParams.depth} min={0.05} max={0.3} step={0.005} unit="m" onChange={v => onCockpitChange({ ...cockpitParams, depth: v })} />
            <S label="Seat Height" value={cockpitParams.seatHeight} min={0.04} max={0.25} step={0.005} unit="m" onChange={v => onCockpitChange({ ...cockpitParams, seatHeight: v })} />
            <S label="Seat Width" value={cockpitParams.seatWidth} min={0.08} max={0.35} step={0.005} unit="m" onChange={v => onCockpitChange({ ...cockpitParams, seatWidth: v })} />
            <S label="Floor Camber" value={cockpitParams.floorCamber} min={0} max={0.05} step={0.002} unit="m" onChange={v => onCockpitChange({ ...cockpitParams, floorCamber: v })} />
            <S label="CB Trunk Width" value={cockpitParams.centerboardTrunkWidth} min={0.02} max={0.08} step={0.002} unit="m" onChange={v => onCockpitChange({ ...cockpitParams, centerboardTrunkWidth: v })} />
            <S label="CB Trunk Length" value={cockpitParams.centerboardTrunkLength} min={0.15} max={0.5} step={0.01} unit="m" onChange={v => onCockpitChange({ ...cockpitParams, centerboardTrunkLength: v })} />
            <S label="Mast Partner" value={cockpitParams.mastPartnerSize} min={0.04} max={0.12} step={0.005} unit="m" onChange={v => onCockpitChange({ ...cockpitParams, mastPartnerSize: v })} />
          </div>
        </div>
      </div>

      <div className="flex-1">
        <SubsystemViewport title="Cockpit & Transom" cameraDistance={4} cameraTarget={[-0.5, 0.1, 0]}>
          <TransomCockpit params={hullParams} showWireframe={false} highlight={null} />
        </SubsystemViewport>
      </div>
    </div>
  );
}
