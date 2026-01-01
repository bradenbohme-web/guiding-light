import { 
  Eye, 
  EyeOff, 
  Grid3X3, 
  Box, 
  RotateCcw,
  Download,
  Settings,
  Layers
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";
import { HullParams, DEFAULT_HULL_PARAMS } from "@/lib/parametric/types";

interface ToolbarProps {
  resolution: "low" | "medium" | "high";
  setResolution: (r: "low" | "medium" | "high") => void;
  showWireframe: boolean;
  setShowWireframe: (v: boolean) => void;
  showGrid: boolean;
  setShowGrid: (v: boolean) => void;
  viewMode: "perspective" | "top" | "side" | "front";
  setViewMode: (v: "perspective" | "top" | "side" | "front") => void;
  onReset: () => void;
  vertexCount: number;
  triangleCount: number;
}

export function Toolbar({
  resolution,
  setResolution,
  showWireframe,
  setShowWireframe,
  showGrid,
  setShowGrid,
  viewMode,
  setViewMode,
  onReset,
  vertexCount,
  triangleCount,
}: ToolbarProps) {
  return (
    <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-card">
      <div className="flex items-center gap-2">
        {/* View Mode */}
        <Select value={viewMode} onValueChange={(v) => setViewMode(v as any)}>
          <SelectTrigger className="w-[120px] h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="perspective">Perspective</SelectItem>
            <SelectItem value="top">Top</SelectItem>
            <SelectItem value="side">Side</SelectItem>
            <SelectItem value="front">Front</SelectItem>
          </SelectContent>
        </Select>

        <Separator orientation="vertical" className="h-6" />

        {/* Resolution */}
        <Select value={resolution} onValueChange={(v) => setResolution(v as any)}>
          <SelectTrigger className="w-[100px] h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>

        <Separator orientation="vertical" className="h-6" />

        {/* Toggles */}
        <Toggle
          pressed={showWireframe}
          onPressedChange={setShowWireframe}
          size="sm"
          aria-label="Toggle wireframe"
        >
          <Layers className="w-4 h-4" />
        </Toggle>

        <Toggle
          pressed={showGrid}
          onPressedChange={setShowGrid}
          size="sm"
          aria-label="Toggle grid"
        >
          <Grid3X3 className="w-4 h-4" />
        </Toggle>

        <Separator orientation="vertical" className="h-6" />

        {/* Reset */}
        <Button variant="ghost" size="sm" onClick={onReset}>
          <RotateCcw className="w-4 h-4 mr-1" />
          Reset
        </Button>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground font-mono">
        <span>Verts: {vertexCount.toLocaleString()}</span>
        <span>Tris: {triangleCount.toLocaleString()}</span>
      </div>
    </div>
  );
}
