// Mast & Boom subsystem editor
import { LaserRiggingParams } from "@/lib/parametric/laserRigging";
import { SubsystemViewport } from "../SubsystemViewport";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useMemo } from "react";
import * as THREE from "three";

interface MastBoomEditorProps {
  rigging: LaserRiggingParams;
  onChange: (rigging: LaserRiggingParams) => void;
  boomAngle: number;
  onBoomAngleChange: (angle: number) => void;
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

function MastBoom3D({ rigging, boomAngle }: { rigging: LaserRiggingParams; boomAngle: number }) {
  const mast = rigging.mast;
  const boom = rigging.boom;
  const boomRad = (boomAngle / 180) * Math.PI;

  const mastGeo = useMemo(() => {
    return new THREE.CylinderGeometry(mast.tipRadius, mast.baseRadius, mast.height, 16);
  }, [mast]);

  const boomGeo = useMemo(() => {
    return new THREE.CylinderGeometry(boom.radius * 0.8, boom.radius, boom.length, 12);
  }, [boom]);

  return (
    <group>
      {/* Mast */}
      <mesh geometry={mastGeo} position={[0, mast.height / 2, 0]}>
        <meshStandardMaterial color={mast.color} roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Masthead fitting */}
      <mesh position={[0, mast.height, 0]}>
        <sphereGeometry args={[mast.tipRadius * 1.5, 8, 8]} />
        <meshStandardMaterial color="hsl(0, 0%, 15%)" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Gooseneck fitting */}
      <mesh position={[0, boom.gooseneckHeight, 0]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial color="hsl(0, 0%, 20%)" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Boom - rotates around gooseneck */}
      <group position={[0, boom.gooseneckHeight, 0]} rotation={[0, boomRad, 0]}>
        <mesh position={[-boom.length / 2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[boom.radius * 0.8, boom.radius, boom.length, 12]} />
          <meshStandardMaterial color={boom.color} roughness={0.4} metalness={0.6} />
        </mesh>
        {/* Boom end cap */}
        <mesh position={[-boom.length, 0, 0]}>
          <sphereGeometry args={[boom.radius, 8, 8]} />
          <meshStandardMaterial color="hsl(0, 0%, 15%)" roughness={0.3} metalness={0.7} />
        </mesh>
      </group>

      {/* Height reference lines */}
      {[0, 1, 2, 3, 4, 5, 6].map(h => (
        <mesh key={h} position={[0.05, h, 0]}>
          <boxGeometry args={[0.02, 0.001, 0.02]} />
          <meshBasicMaterial color="hsl(215, 60%, 50%)" transparent opacity={0.4} />
        </mesh>
      ))}
    </group>
  );
}

export function MastBoomEditor({ rigging, onChange, boomAngle, onBoomAngleChange }: MastBoomEditorProps) {
  const updateMast = (key: string, value: number) => {
    onChange({ ...rigging, mast: { ...rigging.mast, [key]: value } });
  };
  const updateBoom = (key: string, value: number) => {
    onChange({ ...rigging, boom: { ...rigging.boom, [key]: value } });
  };

  return (
    <div className="flex h-full">
      <div className="w-80 border-r border-border overflow-y-auto scrollbar-hide bg-card p-4 space-y-4">
        <h3 className="text-sm font-bold">Mast & Boom</h3>

        <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
          <S label="Boom Angle" value={boomAngle} min={-90} max={90} step={1} unit="°" onChange={onBoomAngleChange} />
        </div>

        <Separator />

        <div>
          <h4 className="text-xs font-semibold mb-3">Mast</h4>
          <div className="space-y-3">
            <S label="Height" value={rigging.mast.height} min={4} max={9} step={0.1} unit="m" onChange={v => updateMast("height", v)} />
            <S label="Base Radius" value={rigging.mast.baseRadius} min={0.01} max={0.05} step={0.001} unit="m" onChange={v => updateMast("baseRadius", v)} />
            <S label="Tip Radius" value={rigging.mast.tipRadius} min={0.005} max={0.03} step={0.001} unit="m" onChange={v => updateMast("tipRadius", v)} />
            <S label="Taper" value={rigging.mast.taper} min={0} max={1} step={0.01} onChange={v => updateMast("taper", v)} />
            <S label="Pre-bend" value={rigging.mast.bend} min={0} max={0.15} step={0.005} unit="m" onChange={v => updateMast("bend", v)} />
          </div>
        </div>

        <Separator />

        <div>
          <h4 className="text-xs font-semibold mb-3">Boom</h4>
          <div className="space-y-3">
            <S label="Length" value={rigging.boom.length} min={1.5} max={4} step={0.05} unit="m" onChange={v => updateBoom("length", v)} />
            <S label="Radius" value={rigging.boom.radius} min={0.008} max={0.035} step={0.001} unit="m" onChange={v => updateBoom("radius", v)} />
            <S label="Gooseneck Height" value={rigging.boom.gooseneckHeight} min={0.5} max={1.5} step={0.01} unit="m" onChange={v => updateBoom("gooseneckHeight", v)} />
            <S label="Vang Attach" value={rigging.boom.vanAttach} min={0.05} max={0.5} step={0.01} onChange={v => updateBoom("vanAttach", v)} />
            <S label="Outhaul" value={rigging.boom.outhaul} min={0} max={1} step={0.01} onChange={v => updateBoom("outhaul", v)} />
          </div>
        </div>
      </div>

      <div className="flex-1">
        <SubsystemViewport title="Mast & Boom" cameraDistance={8} cameraTarget={[0, 3, 0]}>
          <MastBoom3D rigging={rigging} boomAngle={boomAngle} />
        </SubsystemViewport>
      </div>
    </div>
  );
}
