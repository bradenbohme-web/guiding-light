// Right-side detail drawer — opens when an object is clicked in the 3D scene
import { useCallback } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { CoordinateInput } from "./CoordinateInput";
import { getRiggingInfo, CATEGORY_LABELS, type RiggingCategory } from "@/lib/parametric/riggingInfo";
import type { LaserRiggingParams } from "@/lib/parametric/laserRigging";
import type { ObjectSelection } from "@/pages/SailRig";

interface ObjectDetailDrawerProps {
  selection: ObjectSelection;
  rigging: LaserRiggingParams;
  boomRad: number;
  onClose: () => void;
  onSelectRelated: (id: string) => void;
  // Position editing
  onUpdatePosition: (x: number, y: number, z: number) => void;
  worldPosition: [number, number, number] | null;
  // Sail editing
  onUpdateSail: (patch: Partial<LaserRiggingParams["sail"]>) => void;
  onUpdateRigging: (patch: Partial<LaserRiggingParams>) => void;
}

function SliderRow({ label, value, min, max, step, unit, onChange }: {
  label: string; value: number; min: number; max: number; step: number; unit?: string;
  onChange: (v: number) => void;
}) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between">
        <Label className="text-xs text-muted-foreground">{label}</Label>
        <span className="text-xs font-mono text-primary">{value.toFixed(step < 0.1 ? 2 : 1)}{unit ?? ""}</span>
      </div>
      <Slider value={[value]} min={min} max={max} step={step} onValueChange={([v]) => onChange(v)} />
    </div>
  );
}

const CATEGORY_BADGE_CLASSES: Record<RiggingCategory, string> = {
  spar: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  sail: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  block: "bg-zinc-500/20 text-zinc-300 border-zinc-500/30",
  line: "bg-green-500/20 text-green-300 border-green-500/30",
  fitting: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  system: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
};

function getSelectionId(selection: ObjectSelection, rigging: LaserRiggingParams): string {
  if (!selection) return "";
  switch (selection.type) {
    case "mast": return "mast";
    case "boom": return "boom";
    case "sail": return "sail";
    case "traveler": return "traveler";
    case "rope": return rigging.ropes[selection.index]?.id ?? "";
    case "pulley": return rigging.pulleys[selection.index]?.id ?? "";
    case "hardpoint": return rigging.hardpoints[selection.index]?.id ?? "";
    default: return "";
  }
}

export function ObjectDetailDrawer({
  selection,
  rigging,
  boomRad,
  onClose,
  onSelectRelated,
  onUpdatePosition,
  worldPosition,
  onUpdateSail,
  onUpdateRigging,
}: ObjectDetailDrawerProps) {
  const open = selection !== null;
  const id = getSelectionId(selection, rigging);
  const info = getRiggingInfo(id);

  const handleOpenChange = useCallback((o: boolean) => { if (!o) onClose(); }, [onClose]);

  const isSail = selection?.type === "sail";

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent side="right" className="w-[380px] sm:w-[420px] overflow-y-auto bg-card border-l border-border p-0">
        {selection && (
          <div className="p-4 space-y-4">
            <SheetHeader className="space-y-1 p-0">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={`text-[10px] ${CATEGORY_BADGE_CLASSES[info.category]}`}>
                  {CATEGORY_LABELS[info.category]}
                </Badge>
              </div>
              <SheetTitle className="text-base font-bold">{info.name}</SheetTitle>
            </SheetHeader>

            {/* Description */}
            <p className="text-xs text-muted-foreground leading-relaxed">{info.description}</p>

            {info.tips && (
              <div className="bg-primary/5 border border-primary/20 rounded-md p-2.5">
                <p className="text-[11px] text-primary/80 leading-relaxed">
                  <span className="font-semibold">💡 Tip:</span> {info.tips}
                </p>
              </div>
            )}

            {/* Relationships */}
            {info.relationships.length > 0 && (
              <>
                <Separator />
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Connected Components</Label>
                  <div className="flex flex-wrap gap-1">
                    {info.relationships.map((relId) => {
                      const relInfo = getRiggingInfo(relId);
                      return (
                        <button
                          key={relId}
                          onClick={() => onSelectRelated(relId)}
                          className="text-[10px] px-2 py-0.5 rounded-full bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-colors cursor-pointer"
                        >
                          {relInfo.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}

            {/* Position */}
            {worldPosition && !isSail && (
              <>
                <Separator />
                <div className="space-y-2">
                  <Label className="text-xs font-semibold">World Position (meters)</Label>
                  <CoordinateInput
                    label={info.name}
                    x={worldPosition[0]}
                    y={worldPosition[1]}
                    z={worldPosition[2]}
                    onChange={onUpdatePosition}
                  />
                </div>
              </>
            )}

            {/* Attach point info for pulleys */}
            {selection?.type === "pulley" && (
              <div className="text-[11px] text-muted-foreground">
                <span className="font-semibold">Attach:</span> {rigging.pulleys[selection.index]?.attach} &nbsp;|&nbsp;
                <span className="font-semibold">Type:</span> {rigging.pulleys[selection.index]?.type}
              </div>
            )}

            {/* ── Sail Controls ── */}
            {isSail && (
              <>
                <Separator />
                <div className="space-y-3">
                  <Label className="text-xs font-semibold uppercase tracking-wide">Sail Geometry</Label>
                  <SliderRow label="Luff Length" value={rigging.sail.luffLength} min={3} max={7} step={0.01} unit=" m" onChange={(v) => onUpdateSail({ luffLength: v })} />
                  <SliderRow label="Foot Length" value={rigging.sail.footLength} min={1.5} max={4} step={0.01} unit=" m" onChange={(v) => onUpdateSail({ footLength: v })} />
                  <SliderRow label="Leech Curve (Roach)" value={rigging.sail.leechCurve} min={0} max={0.15} step={0.001} onChange={(v) => onUpdateSail({ leechCurve: v })} />
                  <SliderRow label="Head Width" value={rigging.sail.headWidth} min={0.02} max={0.5} step={0.01} unit=" m" onChange={(v) => onUpdateSail({ headWidth: v })} />
                  <SliderRow label="Opacity" value={rigging.sail.opacity} min={0.1} max={1} step={0.01} onChange={(v) => onUpdateSail({ opacity: v })} />
                </div>

                <Separator />
                <div className="space-y-3">
                  <Label className="text-xs font-semibold uppercase tracking-wide">Cloth Resolution</Label>
                  <SliderRow label="Width Segments" value={rigging.sail.clothSegmentsWidth} min={6} max={40} step={1} onChange={(v) => onUpdateSail({ clothSegmentsWidth: v })} />
                  <SliderRow label="Height Segments" value={rigging.sail.clothSegmentsHeight} min={8} max={50} step={1} onChange={(v) => onUpdateSail({ clothSegmentsHeight: v })} />
                </div>

                <Separator />
                <div className="space-y-3">
                  <Label className="text-xs font-semibold uppercase tracking-wide">Physics</Label>
                  <SliderRow label="Damping" value={rigging.sail.damping} min={0.85} max={1} step={0.005} onChange={(v) => onUpdateSail({ damping: v })} />
                  <SliderRow label="Gravity" value={rigging.sail.gravity} min={0} max={2} step={0.05} onChange={(v) => onUpdateSail({ gravity: v })} />
                  <SliderRow label="Constraint Iterations" value={rigging.sail.constraintIterations} min={1} max={20} step={1} onChange={(v) => onUpdateSail({ constraintIterations: v })} />
                </div>

                <Separator />
                <div className="space-y-3">
                  <Label className="text-xs font-semibold uppercase tracking-wide">Self-Collision</Label>
                  <div className="flex items-center gap-2">
                    <Switch checked={rigging.sail.collisionEnabled} onCheckedChange={(v) => onUpdateSail({ collisionEnabled: v })} className="scale-75" />
                    <Label className="text-xs">Enable Self-Collision</Label>
                  </div>
                  {rigging.sail.collisionEnabled && (
                    <SliderRow label="Collision Threshold" value={rigging.sail.collisionThreshold} min={0.005} max={0.05} step={0.001} unit=" m" onChange={(v) => onUpdateSail({ collisionThreshold: v })} />
                  )}
                </div>

                <Separator />
                <div className="space-y-3">
                  <Label className="text-xs font-semibold uppercase tracking-wide">Battens</Label>
                  <div className="flex items-center gap-2">
                    <Switch checked={rigging.sail.battens.enabled} onCheckedChange={(v) => onUpdateSail({ battens: { ...rigging.sail.battens, enabled: v } })} className="scale-75" />
                    <Label className="text-xs">Show Battens</Label>
                  </div>
                  {rigging.sail.battens.enabled && rigging.sail.battens.positions.map((pos, bi) => (
                    <div key={bi} className="space-y-1 pl-2 border-l-2 border-border">
                      <Label className="text-[10px] text-muted-foreground">Batten {bi + 1}</Label>
                      <SliderRow label="Position (v)" value={pos} min={0.1} max={0.95} step={0.01}
                        onChange={(v) => {
                          const newPos = [...rigging.sail.battens.positions];
                          newPos[bi] = v;
                          onUpdateSail({ battens: { ...rigging.sail.battens, positions: newPos } });
                        }}
                      />
                      <SliderRow label="Length" value={rigging.sail.battens.lengths[bi]} min={0.1} max={1.5} step={0.01} unit=" m"
                        onChange={(v) => {
                          const newLen = [...rigging.sail.battens.lengths];
                          newLen[bi] = v;
                          onUpdateSail({ battens: { ...rigging.sail.battens, lengths: newLen } });
                        }}
                      />
                      <SliderRow label="Stiffness" value={rigging.sail.battens.stiffnesses[bi]} min={0.1} max={1} step={0.01}
                        onChange={(v) => {
                          const newStiff = [...rigging.sail.battens.stiffnesses];
                          newStiff[bi] = v;
                          onUpdateSail({ battens: { ...rigging.sail.battens, stiffnesses: newStiff } });
                        }}
                      />
                    </div>
                  ))}
                </div>

                <Separator />
                <div className="space-y-3">
                  <Label className="text-xs font-semibold uppercase tracking-wide">Sail Window</Label>
                  <div className="flex items-center gap-2">
                    <Switch checked={rigging.sail.window.enabled} onCheckedChange={(v) => onUpdateSail({ window: { ...rigging.sail.window, enabled: v } })} className="scale-75" />
                    <Label className="text-xs">Show Window</Label>
                  </div>
                  {rigging.sail.window.enabled && (
                    <>
                      <SliderRow label="Position U" value={rigging.sail.window.position.u} min={0.1} max={0.9} step={0.01}
                        onChange={(v) => onUpdateSail({ window: { ...rigging.sail.window, position: { ...rigging.sail.window.position, u: v } } })}
                      />
                      <SliderRow label="Position V" value={rigging.sail.window.position.v} min={0.1} max={0.9} step={0.01}
                        onChange={(v) => onUpdateSail({ window: { ...rigging.sail.window, position: { ...rigging.sail.window.position, v: v } } })}
                      />
                      <SliderRow label="Width" value={rigging.sail.window.size.width} min={0.1} max={1} step={0.01} unit=" m"
                        onChange={(v) => onUpdateSail({ window: { ...rigging.sail.window, size: { ...rigging.sail.window.size, width: v } } })}
                      />
                      <SliderRow label="Height" value={rigging.sail.window.size.height} min={0.1} max={1} step={0.01} unit=" m"
                        onChange={(v) => onUpdateSail({ window: { ...rigging.sail.window, size: { ...rigging.sail.window.size, height: v } } })}
                      />
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
