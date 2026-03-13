// Right-side detail panel — no overlay/dimming. Icon nav bar for all objects. Minimizable.
import { useState, type ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CoordinateInput } from "./CoordinateInput";
import { getRiggingInfo, CATEGORY_LABELS, type RiggingCategory } from "@/lib/parametric/riggingInfo";
import type { LaserRiggingParams } from "@/lib/parametric/laserRigging";
import type { ObjectSelection } from "@/pages/SailRig";
import {
  ChevronRight,
  ChevronLeft,
  Minus,
  Columns3,
  Ruler,
  Wind,
  Cable,
  CircleDot,
  Navigation,
} from "lucide-react";

interface ObjectDetailDrawerProps {
  selection: ObjectSelection;
  rigging: LaserRiggingParams;
  boomRad: number;
  onClose: () => void;
  onSelectRelated: (id: string) => void;
  onSelectObject: (sel: ObjectSelection) => void;
  onUpdatePosition: (x: number, y: number, z: number) => void;
  worldPosition: [number, number, number] | null;
  onUpdateSail: (patch: Partial<LaserRiggingParams["sail"]>) => void;
  onUpdateRigging: (patch: Partial<LaserRiggingParams>) => void;
}

function SliderRow({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  onChange: (v: number) => void;
}) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between">
        <Label className="text-xs text-muted-foreground">{label}</Label>
        <span className="text-xs font-mono text-primary">
          {value.toFixed(step < 0.1 ? 2 : 1)}
          {unit ?? ""}
        </span>
      </div>
      <Slider value={[value]} min={min} max={max} step={step} onValueChange={([v]) => onChange(v)} />
    </div>
  );
}

const CATEGORY_BADGE_CLASSES: Record<RiggingCategory, string> = {
  spar: "bg-secondary text-secondary-foreground border-border",
  sail: "bg-secondary text-secondary-foreground border-border",
  block: "bg-secondary text-secondary-foreground border-border",
  line: "bg-secondary text-secondary-foreground border-border",
  fitting: "bg-secondary text-secondary-foreground border-border",
  system: "bg-secondary text-secondary-foreground border-border",
};

function getSelectionId(selection: ObjectSelection, rigging: LaserRiggingParams): string {
  if (!selection) return "";

  switch (selection.type) {
    case "mast":
      return "mast";
    case "boom":
      return "boom";
    case "sail":
      return "sail";
    case "traveler":
      return "traveler";
    case "rope":
      return rigging.ropes[selection.index]?.id ?? "";
    case "pulley":
      return rigging.pulleys[selection.index]?.id ?? "";
    case "hardpoint":
      return rigging.hardpoints[selection.index]?.id ?? "";
    default:
      return "";
  }
}

interface NavItem {
  id: string;
  label: string;
  icon: ReactNode;
  selection: ObjectSelection;
}

function buildNavItems(rigging: LaserRiggingParams): NavItem[] {
  const items: NavItem[] = [
    { id: "mast", label: "Mast", icon: <Columns3 className="w-3.5 h-3.5" />, selection: { type: "mast" } },
    { id: "boom", label: "Boom", icon: <Ruler className="w-3.5 h-3.5" />, selection: { type: "boom" } },
    { id: "sail", label: "Sail", icon: <Wind className="w-3.5 h-3.5" />, selection: { type: "sail" } },
    { id: "traveler", label: "Traveler", icon: <Navigation className="w-3.5 h-3.5" />, selection: { type: "traveler" } },
  ];

  rigging.ropes.forEach((rope, i) => {
    items.push({ id: rope.id, label: rope.name, icon: <Cable className="w-3.5 h-3.5" />, selection: { type: "rope", index: i } });
  });

  rigging.pulleys.forEach((pulley, i) => {
    const info = getRiggingInfo(pulley.id);
    items.push({ id: pulley.id, label: info.name, icon: <CircleDot className="w-3.5 h-3.5" />, selection: { type: "pulley", index: i } });
  });

  return items;
}

export function ObjectDetailDrawer({
  selection,
  rigging,
  boomRad,
  onClose,
  onSelectRelated,
  onSelectObject,
  onUpdatePosition,
  worldPosition,
  onUpdateSail,
  onUpdateRigging,
}: ObjectDetailDrawerProps) {
  const [minimized, setMinimized] = useState(false);

  const id = getSelectionId(selection, rigging);
  const info = getRiggingInfo(id);
  const isSail = selection?.type === "sail";
  const navItems = buildNavItems(rigging);
  const selectedRope = selection?.type === "rope" ? rigging.ropes[selection.index] : null;

  const showPanel = selection !== null && !minimized;

  const updateRope = (index: number, patch: Partial<LaserRiggingParams["ropes"][number]>) => {
    onUpdateRigging({
      ropes: rigging.ropes.map((rope, i) => (i === index ? { ...rope, ...patch } : rope)),
    });
  };

  void boomRad;

  return (
    <div className="flex flex-shrink-0 h-full">
      <div className="w-10 border-l border-border bg-card flex flex-col items-center py-2 gap-0.5 overflow-y-auto scrollbar-hide">
        <TooltipProvider delayDuration={200}>
          {navItems.map((item) => {
            const isActive = id === item.id;
            return (
              <Tooltip key={item.id}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => {
                      if (isActive) {
                        onClose();
                      } else {
                        onSelectObject(item.selection);
                        setMinimized(false);
                      }
                    }}
                    className={`w-8 h-8 rounded flex items-center justify-center transition-colors ${
                      isActive ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    {item.icon}
                  </button>
                </TooltipTrigger>
                <TooltipContent side="left" className="text-xs">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </TooltipProvider>
      </div>

      {showPanel && (
        <div className="w-[340px] border-l border-border bg-card flex flex-col overflow-hidden animate-in slide-in-from-right-5 duration-200">
          <div className="flex items-center justify-between px-3 py-2 border-b border-border">
            <div className="flex items-center gap-2 min-w-0">
              <Badge variant="outline" className={`text-[10px] shrink-0 ${CATEGORY_BADGE_CLASSES[info.category]}`}>
                {CATEGORY_LABELS[info.category]}
              </Badge>
              <span className="text-sm font-bold truncate">{info.name}</span>
            </div>
            <div className="flex items-center gap-0.5">
              <Button variant="ghost" size="icon" className="w-6 h-6" onClick={() => setMinimized(true)}>
                <Minus className="w-3 h-3" />
              </Button>
              <Button variant="ghost" size="icon" className="w-6 h-6" onClick={onClose}>
                <ChevronRight className="w-3 h-3" />
              </Button>
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-3 space-y-3">
              <p className="text-xs text-muted-foreground leading-relaxed">{info.description}</p>

              {info.tips && (
                <div className="bg-secondary border border-border rounded-md p-2">
                  <p className="text-[11px] text-foreground/80 leading-relaxed">
                    <span className="font-semibold">Tip:</span> {info.tips}
                  </p>
                </div>
              )}

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

              {worldPosition && !isSail && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold">World Position (meters)</Label>
                    <CoordinateInput label={info.name} x={worldPosition[0]} y={worldPosition[1]} z={worldPosition[2]} onChange={onUpdatePosition} />
                  </div>
                </>
              )}

              {selection?.type === "pulley" && (
                <div className="text-[11px] text-muted-foreground">
                  <span className="font-semibold">Attach:</span> {rigging.pulleys[selection.index]?.attach} &nbsp;|&nbsp;
                  <span className="font-semibold">Type:</span> {rigging.pulleys[selection.index]?.type}
                </div>
              )}

              {selection?.type === "rope" && selectedRope && (
                <>
                  <Separator />
                  <div className="space-y-3">
                    <Label className="text-xs font-semibold uppercase tracking-wide">Line Controls</Label>
                    <SliderRow
                      label="Tension"
                      value={selectedRope.tension}
                      min={0}
                      max={1}
                      step={0.01}
                      onChange={(v) => updateRope(selection.index, { tension: v })}
                    />
                    <SliderRow
                      label="Elasticity"
                      value={selectedRope.elasticity}
                      min={0}
                      max={0.1}
                      step={0.001}
                      onChange={(v) => updateRope(selection.index, { elasticity: v })}
                    />
                    <SliderRow
                      label="Diameter"
                      value={selectedRope.diameter}
                      min={0.003}
                      max={0.012}
                      step={0.0005}
                      unit=" m"
                      onChange={(v) => updateRope(selection.index, { diameter: v })}
                    />
                    {selectedRope.id === "vang" && (
                      <SliderRow
                        label="Boom Rope Length"
                        value={rigging.boomRopeLength}
                        min={0.6}
                        max={1.8}
                        step={0.01}
                        unit=" m"
                        onChange={(v) => onUpdateRigging({ boomRopeLength: v })}
                      />
                    )}
                  </div>
                </>
              )}

              {isSail && (
                <>
                  <Separator />
                  <div className="space-y-3">
                    <Label className="text-xs font-semibold uppercase tracking-wide">Sail Geometry</Label>
                    <SliderRow label="Luff Length" value={rigging.sail.luffLength} min={3} max={7} step={0.01} unit=" m" onChange={(v) => onUpdateSail({ luffLength: v })} />
                    <SliderRow label="Foot Length" value={rigging.sail.footLength} min={1.5} max={4} step={0.01} unit=" m" onChange={(v) => onUpdateSail({ footLength: v })} />
                    <SliderRow label="Leech Curve (Roach)" value={rigging.sail.leechCurve} min={0} max={0.15} step={0.001} onChange={(v) => onUpdateSail({ leechCurve: v })} />
                    <SliderRow label="Head Width" value={rigging.sail.headWidth} min={0} max={0.5} step={0.01} unit=" m" onChange={(v) => onUpdateSail({ headWidth: v })} />
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
                    <Label className="text-xs font-semibold uppercase tracking-wide">Collision</Label>
                    <div className="flex items-center gap-2">
                      <Switch checked={rigging.sail.collisionEnabled} onCheckedChange={(v) => onUpdateSail({ collisionEnabled: v })} className="scale-75" />
                      <Label className="text-xs">Enable Collision (Self + Mast + Boom)</Label>
                    </div>
                    {rigging.sail.collisionEnabled && (
                      <SliderRow
                        label="Collision Threshold"
                        value={rigging.sail.collisionThreshold}
                        min={0.005}
                        max={0.05}
                        step={0.001}
                        unit=" m"
                        onChange={(v) => onUpdateSail({ collisionThreshold: v })}
                      />
                    )}
                  </div>
                </>
              )}
            </div>
          </ScrollArea>
        </div>
      )}

      {minimized && selection && (
        <button
          onClick={() => setMinimized(false)}
          className="w-6 border-l border-border bg-card flex items-center justify-center hover:bg-secondary transition-colors"
        >
          <ChevronLeft className="w-3 h-3 text-muted-foreground" />
        </button>
      )}
    </div>
  );
}
