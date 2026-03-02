// Centerboard subsystem editor
import { LaserRiggingParams } from "@/lib/parametric/laserRigging";
import { SubsystemViewport } from "../SubsystemViewport";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMemo } from "react";
import * as THREE from "three";

interface CenterboardEditorProps {
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

function Centerboard3D({ rigging }: { rigging: LaserRiggingParams }) {
  const cb = rigging.centerboard;

  const bladeGeo = useMemo(() => {
    const shape = new THREE.Shape();
    const c = cb.chord;
    const t = cb.thickness;
    const steps = 20;

    for (let i = 0; i <= steps; i++) {
      const x = (i / steps) * c;
      const xn = x / c;
      const yt = (t / 0.2) * c * (0.2969 * Math.sqrt(xn) - 0.126 * xn - 0.3516 * xn ** 2 + 0.2843 * xn ** 3 - 0.1036 * xn ** 4);
      if (i === 0) shape.moveTo(x - c / 2, yt);
      else shape.lineTo(x - c / 2, yt);
    }
    for (let i = steps; i >= 0; i--) {
      const x = (i / steps) * c;
      const xn = x / c;
      const yt = (t / 0.2) * c * (0.2969 * Math.sqrt(xn) - 0.126 * xn - 0.3516 * xn ** 2 + 0.2843 * xn ** 3 - 0.1036 * xn ** 4);
      shape.lineTo(x - c / 2, -yt);
    }
    shape.closePath();

    const geo = new THREE.ExtrudeGeometry(shape, { steps: 1, depth: cb.span, bevelEnabled: false });
    geo.rotateX(-Math.PI / 2);
    return geo;
  }, [cb]);

  const deployedY = -cb.span * cb.deployment;

  return (
    <group>
      {/* Trunk (slot the board goes through) */}
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[cb.chord + 0.02, 0.1, 0.01]} />
        <meshStandardMaterial color="hsl(0, 0%, 90%)" roughness={0.7} transparent opacity={0.5} />
      </mesh>

      {/* Board */}
      <mesh geometry={bladeGeo} position={[0, deployedY, 0]}>
        <meshStandardMaterial color={cb.color} roughness={0.4} metalness={0.2} />
      </mesh>

      {/* Pivot point */}
      <mesh position={[0, -cb.pivotOffset, 0]}>
        <sphereGeometry args={[0.01, 8, 8]} />
        <meshStandardMaterial color="hsl(0, 80%, 50%)" />
      </mesh>

      {/* Waterline reference */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.5, 0.001, 0.5]} />
        <meshBasicMaterial color="hsl(200, 80%, 50%)" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

export function CenterboardEditor({ rigging, onChange }: CenterboardEditorProps) {
  const updateCB = (key: string, value: number | string) => {
    onChange({ ...rigging, centerboard: { ...rigging.centerboard, [key]: value } });
  };

  return (
    <div className="flex h-full">
      <div className="w-80 border-r border-border overflow-y-auto scrollbar-hide bg-card p-4 space-y-4">
        <h3 className="text-sm font-bold">Centerboard</h3>

        <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
          <S label="Deployment" value={rigging.centerboard.deployment} min={0} max={1} step={0.01} onChange={v => updateCB("deployment", v)} />
          <p className="text-[9px] text-muted-foreground mt-1">0 = fully retracted, 1 = fully down</p>
        </div>

        <Separator />

        <div className="space-y-3">
          <S label="Chord" value={rigging.centerboard.chord} min={0.1} max={0.5} step={0.005} unit="m" onChange={v => updateCB("chord", v)} />
          <S label="Span" value={rigging.centerboard.span} min={0.4} max={1.5} step={0.01} unit="m" onChange={v => updateCB("span", v)} />
          <S label="Thickness" value={rigging.centerboard.thickness} min={0.005} max={0.04} step={0.001} unit="m" onChange={v => updateCB("thickness", v)} />
          <S label="Tip Taper" value={rigging.centerboard.tipChordScale} min={0.3} max={1} step={0.01} onChange={v => updateCB("tipChordScale", v)} />
          <S label="Pivot Offset" value={rigging.centerboard.pivotOffset} min={0} max={0.15} step={0.005} unit="m" onChange={v => updateCB("pivotOffset", v)} />

          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Foil Profile</Label>
            <Select value={rigging.centerboard.profile} onValueChange={v => updateCB("profile", v)}>
              <SelectTrigger className="h-7 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="NACA0012">NACA 0012</SelectItem>
                <SelectItem value="NACA0009">NACA 0009</SelectItem>
                <SelectItem value="flat">Flat</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <SubsystemViewport title="Centerboard" cameraDistance={1.5} cameraTarget={[0, -0.3, 0]}>
          <Centerboard3D rigging={rigging} />
        </SubsystemViewport>
      </div>
    </div>
  );
}
