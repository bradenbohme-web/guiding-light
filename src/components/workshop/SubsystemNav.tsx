// Sidebar navigation for workshop subsystems
import { cn } from "@/lib/utils";
import { 
  Ship, Sailboat, Anchor, Navigation, Grip, Wrench, 
  Waves, Eye, LayoutGrid, Save, FolderOpen, RotateCcw,
  ChevronRight, Compass, Cable, CircleDot
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export type SubsystemId = 
  | "hull" 
  | "sail" 
  | "mast-boom" 
  | "rudder-tiller" 
  | "pulleys" 
  | "ropes" 
  | "cockpit-transom" 
  | "centerboard"
  | "traveler"
  | "ocean"
  | "assembly";

export interface SubsystemDef {
  id: SubsystemId;
  label: string;
  icon: React.ElementType;
  description: string;
  category: "structure" | "rigging" | "controls" | "environment";
}

export const SUBSYSTEMS: SubsystemDef[] = [
  // Structure
  { id: "hull", label: "Hull", icon: Ship, description: "Hull shape & panels", category: "structure" },
  { id: "cockpit-transom", label: "Cockpit & Transom", icon: LayoutGrid, description: "Deck, seats, drain", category: "structure" },
  { id: "centerboard", label: "Centerboard", icon: Anchor, description: "Daggerboard foil", category: "structure" },
  // Rigging
  { id: "mast-boom", label: "Mast & Boom", icon: Navigation, description: "Spars & gooseneck", category: "rigging" },
  { id: "sail", label: "Sail", icon: Sailboat, description: "Cloth, battens, window", category: "rigging" },
  { id: "ropes", label: "Lines & Ropes", icon: Cable, description: "Mainsheet, vang, etc.", category: "rigging" },
  { id: "pulleys", label: "Blocks & Pulleys", icon: CircleDot, description: "Purchase systems", category: "rigging" },
  // Controls
  { id: "rudder-tiller", label: "Rudder & Tiller", icon: Compass, description: "Steering system", category: "controls" },
  { id: "traveler", label: "Traveler", icon: Grip, description: "Track & car system", category: "controls" },
  // Environment
  { id: "ocean", label: "Ocean & Weather", icon: Waves, description: "Waves, wind, sky", category: "environment" },
  // Assembly
  { id: "assembly", label: "Full Assembly", icon: Eye, description: "Complete boat view", category: "environment" },
];

const CATEGORIES = [
  { id: "structure", label: "Structure" },
  { id: "rigging", label: "Rigging" },
  { id: "controls", label: "Controls" },
  { id: "environment", label: "Environment" },
] as const;

interface SubsystemNavProps {
  active: SubsystemId;
  onSelect: (id: SubsystemId) => void;
  onSave: () => void;
  onLoad: () => void;
  onReset: () => void;
  hasUnsaved?: boolean;
}

export function SubsystemNav({ active, onSelect, onSave, onLoad, onReset, hasUnsaved }: SubsystemNavProps) {
  return (
    <div className="w-56 border-r border-border bg-card flex flex-col h-full">
      {/* Header */}
      <div className="p-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Wrench className="w-4 h-4 text-primary" />
          <span className="text-sm font-bold font-mono">Workshop</span>
        </div>
        <p className="text-[10px] text-muted-foreground mt-0.5">Perfect each subsystem</p>
      </div>

      {/* Subsystem list */}
      <div className="flex-1 overflow-y-auto p-2 space-y-3">
        {CATEGORIES.map(cat => {
          const items = SUBSYSTEMS.filter(s => s.category === cat.id);
          return (
            <div key={cat.id}>
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider px-2">
                {cat.label}
              </span>
              <div className="mt-1 space-y-0.5">
                {items.map(sub => {
                  const Icon = sub.icon;
                  const isActive = active === sub.id;
                  return (
                    <button
                      key={sub.id}
                      onClick={() => onSelect(sub.id)}
                      className={cn(
                        "w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-left transition-colors text-xs",
                        isActive
                          ? "bg-primary/15 text-primary border border-primary/30"
                          : "hover:bg-accent/50 text-foreground"
                      )}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{sub.label}</div>
                        <div className="text-[9px] text-muted-foreground truncate">{sub.description}</div>
                      </div>
                      {isActive && <ChevronRight className="w-3 h-3 text-primary shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="p-2 border-t border-border space-y-1.5">
        {hasUnsaved && (
          <Badge variant="outline" className="w-full justify-center text-[10px] text-amber-500 border-amber-500/30 mb-1">
            Unsaved changes
          </Badge>
        )}
        <div className="flex gap-1.5">
          <Button size="sm" variant="outline" className="flex-1 h-7 text-[10px]" onClick={onSave}>
            <Save className="w-3 h-3 mr-1" /> Save
          </Button>
          <Button size="sm" variant="outline" className="flex-1 h-7 text-[10px]" onClick={onLoad}>
            <FolderOpen className="w-3 h-3 mr-1" /> Load
          </Button>
        </div>
        <Button size="sm" variant="ghost" className="w-full h-7 text-[10px] text-muted-foreground" onClick={onReset}>
          <RotateCcw className="w-3 h-3 mr-1" /> Reset All
        </Button>
      </div>
    </div>
  );
}
