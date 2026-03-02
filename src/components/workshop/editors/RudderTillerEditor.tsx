// Rudder & Tiller subsystem editor
import { LaserRiggingParams } from "@/lib/parametric/laserRigging";
import { SubsystemViewport } from "../SubsystemViewport";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useMemo } from "react";
import * as THREE from "three";

interface RudderTillerEditorProps {
  rigging: LaserRiggingParams;
  onChange: (rigging: LaserRiggingParams) => void;
  rudderAngle: number;
  onRudderAngleChange: (angle: number) => void;
}

function Slider2({ label, value, min, max, step, unit, onChange }: {
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

// Isolated rudder/tiller 3D component
function RudderTiller3D({ rigging, rudderAngle }: { rigging: LaserRiggingParams; rudderAngle: number }) {
  const blade = rigging.rudder.blade;
  const tiller = rigging.rudder.tiller;
  const ext = rigging.rudder.extension;
  const angleRad = (rudderAngle / 180) * Math.PI;
  const hingeRad = (ext.hingeAngle / 180) * Math.PI;

  const bladeGeo = useMemo(() => {
    // NACA foil cross-section approximation
    const shape = new THREE.Shape();
    const c = blade.chord;
    const t = blade.thickness;
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

    const extrudeSettings = { steps: 1, depth: blade.span, bevelEnabled: false };
    const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geo.rotateX(-Math.PI / 2);
    return geo;
  }, [blade]);

  return (
    <group>
      {/* Pivot point marker */}
      <mesh>
        <sphereGeometry args={[0.015, 12, 12]} />
        <meshStandardMaterial color="hsl(0, 80%, 50%)" />
      </mesh>

      {/* Rudder assembly - rotates with rudder angle */}
      <group rotation={[0, angleRad, 0]}>
        {/* Blade */}
        <mesh geometry={bladeGeo} position={[0, -blade.span / 2, 0]}>
          <meshStandardMaterial color={blade.color} roughness={0.5} metalness={0.2} />
        </mesh>

        {/* Tiller bar */}
        <mesh position={[tiller.length / 2, tiller.offset.y, 0]}>
          <boxGeometry args={[tiller.length, tiller.thickness, tiller.width]} />
          <meshStandardMaterial color={tiller.color} roughness={0.7} metalness={0.1} />
        </mesh>

        {/* Tiller extension (hinged) */}
        <group position={[tiller.length, tiller.offset.y, 0]} rotation={[0, hingeRad, 0]}>
          <mesh position={[ext.length / 2, 0, 0]}>
            <cylinderGeometry args={[ext.radius, ext.radius, ext.length, 8]} />
            <meshStandardMaterial color={ext.color} roughness={0.5} metalness={0.3} />
          </mesh>
          {/* Grip */}
          <mesh position={[ext.length, 0, 0]}>
            <sphereGeometry args={[ext.radius * 1.5, 8, 8]} />
            <meshStandardMaterial color="hsl(0, 0%, 20%)" roughness={0.8} />
          </mesh>
        </group>
      </group>

      {/* Reference axis */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.002, 0.002, 1, 4]} />
        <meshBasicMaterial color="hsl(215, 60%, 50%)" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

export function RudderTillerEditor({ rigging, onChange, rudderAngle, onRudderAngleChange }: RudderTillerEditorProps) {
  const updateBlade = (key: string, value: number) => {
    onChange({ ...rigging, rudder: { ...rigging.rudder, blade: { ...rigging.rudder.blade, [key]: value } } });
  };
  const updateTiller = (key: string, value: number) => {
    onChange({ ...rigging, rudder: { ...rigging.rudder, tiller: { ...rigging.rudder.tiller, [key]: value } } });
  };
  const updateExtension = (key: string, value: number) => {
    onChange({ ...rigging, rudder: { ...rigging.rudder, extension: { ...rigging.rudder.extension, [key]: value } } });
  };

  return (
    <div className="flex h-full">
      <div className="w-80 border-r border-border overflow-y-auto scrollbar-hide bg-card p-4 space-y-4">
        <h3 className="text-sm font-bold">Rudder & Tiller</h3>

        {/* Active Control */}
        <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
          <Slider2 label="Rudder Angle" value={rudderAngle} min={-35} max={35} step={0.5} unit="°" onChange={onRudderAngleChange} />
        </div>

        <Separator />

        {/* Blade */}
        <div>
          <h4 className="text-xs font-semibold mb-3">Rudder Blade</h4>
          <div className="space-y-3">
            <Slider2 label="Chord" value={rigging.rudder.blade.chord} min={0.1} max={0.4} step={0.005} unit="m" onChange={v => updateBlade("chord", v)} />
            <Slider2 label="Span" value={rigging.rudder.blade.span} min={0.3} max={1} step={0.01} unit="m" onChange={v => updateBlade("span", v)} />
            <Slider2 label="Thickness" value={rigging.rudder.blade.thickness} min={0.005} max={0.04} step={0.001} unit="m" onChange={v => updateBlade("thickness", v)} />
            <Slider2 label="Tip Taper" value={rigging.rudder.blade.tipChordScale} min={0.3} max={1} step={0.01} onChange={v => updateBlade("tipChordScale", v)} />
          </div>
        </div>

        <Separator />

        {/* Tiller */}
        <div>
          <h4 className="text-xs font-semibold mb-3">Tiller</h4>
          <div className="space-y-3">
            <Slider2 label="Length" value={rigging.rudder.tiller.length} min={0.4} max={1.5} step={0.01} unit="m" onChange={v => updateTiller("length", v)} />
            <Slider2 label="Width" value={rigging.rudder.tiller.width} min={0.02} max={0.08} step={0.002} unit="m" onChange={v => updateTiller("width", v)} />
            <Slider2 label="Thickness" value={rigging.rudder.tiller.thickness} min={0.01} max={0.04} step={0.002} unit="m" onChange={v => updateTiller("thickness", v)} />
          </div>
        </div>

        <Separator />

        {/* Extension */}
        <div>
          <h4 className="text-xs font-semibold mb-3">Tiller Extension</h4>
          <div className="space-y-3">
            <Slider2 label="Length" value={rigging.rudder.extension.length} min={0.3} max={1.2} step={0.01} unit="m" onChange={v => updateExtension("length", v)} />
            <Slider2 label="Radius" value={rigging.rudder.extension.radius} min={0.005} max={0.02} step={0.001} unit="m" onChange={v => updateExtension("radius", v)} />
            <Slider2 label="Hinge Angle" value={rigging.rudder.extension.hingeAngle} min={0} max={90} step={1} unit="°" onChange={v => updateExtension("hingeAngle", v)} />
          </div>
        </div>

        <Separator />

        <div>
          <h4 className="text-xs font-semibold mb-3">System</h4>
          <Slider2 label="Max Deflection" value={rigging.rudder.maxAngle} min={20} max={45} step={1} unit="°" onChange={v => onChange({ ...rigging, rudder: { ...rigging.rudder, maxAngle: v } })} />
        </div>
      </div>

      <div className="flex-1">
        <SubsystemViewport title="Rudder & Tiller" cameraDistance={2} cameraTarget={[0.3, -0.2, 0]}>
          <RudderTiller3D rigging={rigging} rudderAngle={rudderAngle} />
        </SubsystemViewport>
      </div>
    </div>
  );
}
