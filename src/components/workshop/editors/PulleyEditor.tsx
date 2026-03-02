// Pulleys & Blocks subsystem editor
import { LaserRiggingParams, PulleyParams } from "@/lib/parametric/laserRigging";
import { SubsystemViewport } from "../SubsystemViewport";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useState, useMemo } from "react";
import * as THREE from "three";

interface PulleyEditorProps {
  rigging: LaserRiggingParams;
  onChange: (rigging: LaserRiggingParams) => void;
}

function PulleyBlock3D({ pulley, selected }: { pulley: PulleyParams; selected: boolean }) {
  const sheaveCount = pulley.type === "single" ? 1 : pulley.type === "double" ? 2 : pulley.type === "triple" ? 3 : pulley.type === "fiddle" ? 2 : 1;

  return (
    <group position={[pulley.position.x, pulley.position.y, pulley.position.z]}>
      {/* Block shell */}
      <mesh>
        <boxGeometry args={[pulley.radius * 3, pulley.radius * 4 * sheaveCount, pulley.radius * 2]} />
        <meshStandardMaterial 
          color={selected ? "hsl(45, 90%, 55%)" : pulley.color} 
          roughness={0.4} 
          metalness={0.5}
          emissive={selected ? new THREE.Color("hsl(45, 90%, 55%)") : new THREE.Color(0)}
          emissiveIntensity={selected ? 0.3 : 0}
        />
      </mesh>
      {/* Sheaves */}
      {Array.from({ length: sheaveCount }).map((_, i) => (
        <mesh key={i} position={[0, (i - (sheaveCount - 1) / 2) * pulley.radius * 3, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[pulley.radius, pulley.radius * 0.25, 8, 16]} />
          <meshStandardMaterial color="hsl(0, 0%, 40%)" roughness={0.3} metalness={0.7} />
        </mesh>
      ))}
      {/* Shackle */}
      <mesh position={[0, pulley.radius * 2 * sheaveCount + 0.01, 0]}>
        <torusGeometry args={[0.008, 0.002, 8, 12, Math.PI]} />
        <meshStandardMaterial color="hsl(0, 0%, 50%)" roughness={0.3} metalness={0.8} />
      </mesh>
      {/* Label */}
      {selected && (
        <mesh position={[0, -pulley.radius * 3, 0]}>
          <sphereGeometry args={[0.005, 6, 6]} />
          <meshBasicMaterial color="hsl(45, 90%, 55%)" />
        </mesh>
      )}
    </group>
  );
}

export function PulleyEditor({ rigging, onChange }: PulleyEditorProps) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const selected = rigging.pulleys[selectedIdx];

  const updatePulley = (idx: number, key: keyof PulleyParams, value: any) => {
    const newPulleys = [...rigging.pulleys];
    newPulleys[idx] = { ...newPulleys[idx], [key]: value };
    onChange({ ...rigging, pulleys: newPulleys });
  };

  return (
    <div className="flex h-full">
      <div className="w-80 border-r border-border overflow-y-auto scrollbar-hide bg-card p-4 space-y-4">
        <h3 className="text-sm font-bold">Blocks & Pulleys</h3>
        <p className="text-[10px] text-muted-foreground">{rigging.pulleys.length} blocks in system</p>

        {/* Block selector */}
        <div className="space-y-1.5">
          {rigging.pulleys.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setSelectedIdx(i)}
              className={`w-full text-left px-2 py-1.5 rounded text-xs transition-colors ${
                i === selectedIdx ? "bg-primary/15 text-primary border border-primary/30" : "hover:bg-accent/50"
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-mono">{p.id}</span>
                <Badge variant="secondary" className="text-[9px] h-4">{p.type}</Badge>
              </div>
              <div className="text-[9px] text-muted-foreground mt-0.5">
                {p.attach} • r={p.radius.toFixed(3)}m
              </div>
            </button>
          ))}
        </div>

        {selected && (
          <>
            <Separator />
            <h4 className="text-xs font-semibold">Edit: {selected.id}</h4>
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Type</Label>
                <Select
                  value={selected.type}
                  onValueChange={(v) => updatePulley(selectedIdx, "type", v)}
                >
                  <SelectTrigger className="h-7 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="double">Double</SelectItem>
                    <SelectItem value="triple">Triple</SelectItem>
                    <SelectItem value="fiddle">Fiddle</SelectItem>
                    <SelectItem value="ratchet">Ratchet</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <Label className="text-xs text-muted-foreground">Radius</Label>
                  <span className="text-xs font-mono text-primary">{selected.radius.toFixed(3)}m</span>
                </div>
                <Slider
                  value={[selected.radius]}
                  min={0.005}
                  max={0.04}
                  step={0.001}
                  onValueChange={([v]) => updatePulley(selectedIdx, "radius", v)}
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Attach</Label>
                <Select
                  value={selected.attach}
                  onValueChange={(v) => updatePulley(selectedIdx, "attach", v as any)}
                >
                  <SelectTrigger className="h-7 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hull">Hull</SelectItem>
                    <SelectItem value="boom">Boom</SelectItem>
                    <SelectItem value="mast">Mast</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Position */}
              <div className="space-y-2">
                <Label className="text-xs font-medium">Position</Label>
                {(["x", "y", "z"] as const).map(axis => (
                  <div key={axis} className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-[10px] text-muted-foreground">{axis.toUpperCase()}</span>
                      <span className="text-[10px] font-mono">{selected.position[axis].toFixed(3)}</span>
                    </div>
                    <Slider
                      value={[selected.position[axis]]}
                      min={-3}
                      max={3}
                      step={0.01}
                      onValueChange={([v]) => {
                        const newPos = selected.position.clone();
                        newPos[axis] = v;
                        updatePulley(selectedIdx, "position", newPos);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <div className="flex-1">
        <SubsystemViewport title="Pulleys" cameraDistance={3} cameraTarget={[0, 0.1, 0]}>
          {rigging.pulleys.map((p, i) => (
            <PulleyBlock3D key={p.id} pulley={p} selected={i === selectedIdx} />
          ))}
        </SubsystemViewport>
      </div>
    </div>
  );
}
