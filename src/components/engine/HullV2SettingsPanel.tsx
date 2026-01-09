// HullV2SettingsPanel - Collapsible parameter groups with hover-to-glow and tooltips
import { useState, useCallback } from "react";
import { 
  HullV2Params, 
  PARAM_V2_GROUPS, 
  ParamGroupDef,
  ParamSliderDef,
  HULL_V2_PARTS,
} from "@/lib/parametric/v2/types";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  ChevronDown, 
  Ruler, 
  MoveHorizontal, 
  Square, 
  Anchor, 
  CornerDownRight, 
  Navigation, 
  TrendingUp,
  Info
} from "lucide-react";
import { cn } from "@/lib/utils";

interface HullV2SettingsPanelProps {
  params: HullV2Params;
  onChange: (params: HullV2Params) => void;
  onHoverPart: (partId: string | null) => void;
}

// Icon mapping
const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Ruler,
  MoveHorizontal,
  Square,
  Anchor,
  CornerDownRight,
  Navigation,
  TrendingUp,
};

// Helper to get/set nested values
function getNestedValue(obj: any, path: string): number {
  return path.split('.').reduce((acc, key) => acc?.[key], obj) ?? 0;
}

function setNestedValue(obj: any, path: string, value: number): any {
  const keys = path.split('.');
  const result = JSON.parse(JSON.stringify(obj)); // Deep clone
  let current = result;
  
  for (let i = 0; i < keys.length - 1; i++) {
    current = current[keys[i]];
  }
  
  current[keys[keys.length - 1]] = value;
  return result;
}

// Parameter Slider Component
function ParamSlider({
  def,
  value,
  onChange,
}: {
  def: ParamSliderDef;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Label className="text-xs font-medium">{def.label}</Label>
          <TooltipProvider>
            <Tooltip delayDuration={200}>
              <TooltipTrigger asChild>
                <Info className="w-3 h-3 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent side="right" className="max-w-[200px]">
                <p className="text-xs">{def.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <span className="text-xs font-mono text-muted-foreground">
          {value.toFixed(def.step < 0.01 ? 3 : def.step < 0.1 ? 2 : 1)}{def.unit}
        </span>
      </div>
      <Slider
        min={def.min}
        max={def.max}
        step={def.step}
        value={[value]}
        onValueChange={([v]) => onChange(v)}
        className="w-full"
      />
    </div>
  );
}

// Parameter Group Component
function ParamGroup({
  group,
  params,
  onChange,
  onHoverPart,
  isOpen,
  onToggle,
}: {
  group: ParamGroupDef;
  params: HullV2Params;
  onChange: (params: HullV2Params) => void;
  onHoverPart: (partId: string | null) => void;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const Icon = ICONS[group.icon] || Square;
  const linkedPart = group.linkedPart 
    ? HULL_V2_PARTS.find(p => p.id === group.linkedPart)
    : null;

  const handleMouseEnter = useCallback(() => {
    if (group.linkedPart) {
      onHoverPart(group.linkedPart);
    }
  }, [group.linkedPart, onHoverPart]);

  const handleMouseLeave = useCallback(() => {
    onHoverPart(null);
  }, [onHoverPart]);

  const handleParamChange = useCallback((key: string, value: number) => {
    onChange(setNestedValue(params, key, value));
  }, [params, onChange]);

  return (
    <Collapsible open={isOpen} onOpenChange={onToggle}>
      <CollapsibleTrigger 
        className={cn(
          "w-full flex items-center gap-2 p-3 rounded-lg transition-colors",
          "hover:bg-accent/50 border border-transparent",
          isOpen && "bg-accent/30 border-border",
          linkedPart && "cursor-pointer"
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Icon className="w-4 h-4 text-primary" />
        <div className="flex-1 text-left">
          <div className="text-sm font-medium">{group.name}</div>
          <div className="text-xs text-muted-foreground">{group.description}</div>
        </div>
        {linkedPart && (
          <div 
            className="w-3 h-3 rounded-full border border-border"
            style={{ backgroundColor: linkedPart.color }}
          />
        )}
        <ChevronDown className={cn(
          "w-4 h-4 text-muted-foreground transition-transform",
          isOpen && "rotate-180"
        )} />
      </CollapsibleTrigger>
      
      <CollapsibleContent className="pt-2 pb-3 px-3 space-y-3">
        {group.params.map((paramDef) => (
          <ParamSlider
            key={paramDef.key}
            def={paramDef}
            value={getNestedValue(params, paramDef.key)}
            onChange={(v) => handleParamChange(paramDef.key, v)}
          />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}

export function HullV2SettingsPanel({ 
  params, 
  onChange,
  onHoverPart,
}: HullV2SettingsPanelProps) {
  const [openGroups, setOpenGroups] = useState<Set<string>>(
    new Set(["dimensions", "hull"])
  );

  const toggleGroup = useCallback((groupId: string) => {
    setOpenGroups(prev => {
      const next = new Set(prev);
      if (next.has(groupId)) {
        next.delete(groupId);
      } else {
        next.add(groupId);
      }
      return next;
    });
  }, []);

  return (
    <div className="p-4 space-y-2">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary" />
          Hull V2 Parameters
        </h3>
        <span className="text-xs text-muted-foreground font-mono">
          {PARAM_V2_GROUPS.reduce((acc, g) => acc + g.params.length, 0)} params
        </span>
      </div>
      
      <div className="space-y-1">
        {PARAM_V2_GROUPS.map((group) => (
          <ParamGroup
            key={group.id}
            group={group}
            params={params}
            onChange={onChange}
            onHoverPart={onHoverPart}
            isOpen={openGroups.has(group.id)}
            onToggle={() => toggleGroup(group.id)}
          />
        ))}
      </div>
      
      {/* Parts Legend */}
      <div className="pt-4 border-t border-border mt-4">
        <h4 className="text-xs font-medium text-muted-foreground mb-2">Hull Parts</h4>
        <div className="grid grid-cols-2 gap-2">
          {HULL_V2_PARTS.map((part) => (
            <div 
              key={part.id}
              className="flex items-center gap-2 p-1.5 rounded text-xs cursor-pointer hover:bg-accent/30 transition-colors"
              onMouseEnter={() => onHoverPart(part.id)}
              onMouseLeave={() => onHoverPart(null)}
            >
              <div 
                className="w-3 h-3 rounded border border-border"
                style={{ backgroundColor: part.color }}
              />
              <span>{part.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
