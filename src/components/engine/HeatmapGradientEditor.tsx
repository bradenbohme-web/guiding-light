// Heatmap Gradient Editor - Adjust depth/height values with visual gradient
import { useState, useMemo, useCallback } from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RotateCcw, Plus, Trash2 } from "lucide-react";

export interface GradientStop {
  id: string;
  position: number; // 0-1
  depth: number;    // Actual depth value in meters
  color: string;    // Display color
}

interface HeatmapGradientEditorProps {
  stops: GradientStop[];
  onChange: (stops: GradientStop[]) => void;
  minDepth?: number;
  maxDepth?: number;
}

const DEFAULT_GRADIENT_STOPS: GradientStop[] = [
  { id: "stop-0", position: 0, depth: 0, color: "#ffffff" },
  { id: "stop-1", position: 0.25, depth: 0.08, color: "#a5d8ff" },
  { id: "stop-2", position: 0.5, depth: 0.18, color: "#4dabf7" },
  { id: "stop-3", position: 0.75, depth: 0.28, color: "#1971c2" },
  { id: "stop-4", position: 1, depth: 0.35, color: "#1864ab" }
];

export function HeatmapGradientEditor({
  stops,
  onChange,
  minDepth = 0,
  maxDepth = 0.5
}: HeatmapGradientEditorProps) {
  const [selectedStop, setSelectedStop] = useState<string | null>(null);

  const sortedStops = useMemo(() => 
    [...stops].sort((a, b) => a.position - b.position),
    [stops]
  );

  const gradientCSS = useMemo(() => {
    const colorStops = sortedStops
      .map(s => `${s.color} ${s.position * 100}%`)
      .join(", ");
    return `linear-gradient(to right, ${colorStops})`;
  }, [sortedStops]);

  const updateStop = (id: string, updates: Partial<GradientStop>) => {
    onChange(stops.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const addStop = () => {
    const midPos = 0.5;
    const midDepth = (maxDepth - minDepth) / 2;
    const newStop: GradientStop = {
      id: `stop-${Date.now()}`,
      position: midPos,
      depth: midDepth,
      color: "#74c0fc"
    };
    onChange([...stops, newStop]);
    setSelectedStop(newStop.id);
  };

  const removeStop = (id: string) => {
    if (stops.length <= 2) return;
    onChange(stops.filter(s => s.id !== id));
    if (selectedStop === id) setSelectedStop(null);
  };

  const resetToDefault = () => {
    onChange([...DEFAULT_GRADIENT_STOPS]);
    setSelectedStop(null);
  };

  const selected = stops.find(s => s.id === selectedStop);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-xs text-muted-foreground">Depth Gradient</Label>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={addStop}>
            <Plus className="w-3 h-3" />
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={resetToDefault}>
            <RotateCcw className="w-3 h-3" />
          </Button>
        </div>
      </div>

      {/* Gradient preview bar */}
      <div className="relative h-8 rounded-lg overflow-hidden border border-border">
        <div 
          className="absolute inset-0" 
          style={{ background: gradientCSS }}
        />
        {/* Stop markers */}
        {sortedStops.map(stop => (
          <button
            key={stop.id}
            className={`absolute top-1 bottom-1 w-3 -translate-x-1/2 rounded-sm border-2 transition-all ${
              selectedStop === stop.id 
                ? "border-white ring-2 ring-primary z-10" 
                : "border-white/50 hover:border-white"
            }`}
            style={{ 
              left: `${stop.position * 100}%`,
              background: stop.color
            }}
            onClick={() => setSelectedStop(stop.id)}
          />
        ))}
      </div>

      {/* Depth scale labels */}
      <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
        <span>{minDepth.toFixed(2)}m</span>
        <span>{((maxDepth + minDepth) / 2).toFixed(2)}m</span>
        <span>{maxDepth.toFixed(2)}m</span>
      </div>

      {/* Selected stop editor */}
      {selected && (
        <div className="space-y-3 p-3 bg-secondary/30 rounded-lg border border-border">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium">Edit Stop</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-destructive"
              onClick={() => removeStop(selected.id)}
              disabled={stops.length <= 2}
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span>Position</span>
              <span className="text-muted-foreground">{(selected.position * 100).toFixed(0)}%</span>
            </div>
            <Slider
              value={[selected.position]}
              min={0}
              max={1}
              step={0.01}
              onValueChange={([v]) => updateStop(selected.id, { position: v })}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span>Depth</span>
              <span className="text-muted-foreground">{selected.depth.toFixed(3)}m</span>
            </div>
            <Slider
              value={[selected.depth]}
              min={minDepth}
              max={maxDepth}
              step={0.005}
              onValueChange={([v]) => updateStop(selected.id, { depth: v })}
            />
          </div>

          <div className="flex items-center gap-2">
            <Label className="text-xs">Color</Label>
            <input
              type="color"
              value={selected.color}
              onChange={(e) => updateStop(selected.id, { color: e.target.value })}
              className="w-8 h-6 rounded border border-border cursor-pointer"
            />
            <Input
              value={selected.color}
              onChange={(e) => updateStop(selected.id, { color: e.target.value })}
              className="h-6 text-xs flex-1 font-mono"
            />
          </div>
        </div>
      )}

      {/* Stop list */}
      <div className="space-y-1">
        {sortedStops.map((stop, idx) => (
          <div
            key={stop.id}
            className={`flex items-center gap-2 p-1.5 rounded text-xs cursor-pointer transition-colors ${
              selectedStop === stop.id ? "bg-secondary" : "hover:bg-secondary/50"
            }`}
            onClick={() => setSelectedStop(stop.id)}
          >
            <div 
              className="w-4 h-4 rounded border border-border"
              style={{ background: stop.color }}
            />
            <span className="flex-1 font-mono text-muted-foreground">
              {(stop.position * 100).toFixed(0)}%
            </span>
            <span className="font-mono">
              {stop.depth.toFixed(3)}m
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export { DEFAULT_GRADIENT_STOPS };
