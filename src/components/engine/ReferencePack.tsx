// ReferencePack Calibration System - Upload ortho images, set scale bars, centerlines, anchor points
import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { 
  Upload, 
  Crosshair, 
  Ruler, 
  Target, 
  Trash2, 
  Eye, 
  EyeOff,
  Move,
  RotateCw
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface ScaleBar {
  id: string;
  p1: { x: number; y: number };
  p2: { x: number; y: number };
  lengthMeters: number;
}

export interface CenterLine {
  id: string;
  axis: "X" | "Y";
  position: number;
  rotation: number;
}

export interface AnchorPoint {
  id: string;
  label: string;
  position: { x: number; y: number };
  u: number;
  s: number;
}

export interface ReferenceImage {
  id: string;
  name: string;
  view: "top" | "side" | "front" | "perspective";
  dataUrl: string;
  opacity: number;
  visible: boolean;
  transform: {
    x: number;
    y: number;
    scale: number;
    rotation: number;
  };
  scaleBars: ScaleBar[];
  centerLines: CenterLine[];
  anchors: AnchorPoint[];
}

export interface ReferencePackState {
  images: ReferenceImage[];
  activeImageId: string | null;
  activeTool: "select" | "scaleBar" | "centerLine" | "anchor" | "pan";
}

interface ReferencePackProps {
  state: ReferencePackState;
  onChange: (state: ReferencePackState) => void;
}

export function ReferencePack({ state, onChange }: ReferencePackProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedView, setSelectedView] = useState<ReferenceImage["view"]>("top");

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        const newImage: ReferenceImage = {
          id: `ref-${Date.now()}-${Math.random().toString(36).slice(2)}`,
          name: file.name,
          view: selectedView,
          dataUrl: reader.result as string,
          opacity: 0.5,
          visible: true,
          transform: { x: 0, y: 0, scale: 1, rotation: 0 },
          scaleBars: [],
          centerLines: [],
          anchors: []
        };
        onChange({
          ...state,
          images: [...state.images, newImage],
          activeImageId: newImage.id
        });
      };
      reader.readAsDataURL(file);
    });
  }, [state, onChange, selectedView]);

  const activeImage = state.images.find(img => img.id === state.activeImageId);

  const updateActiveImage = (updates: Partial<ReferenceImage>) => {
    if (!state.activeImageId) return;
    onChange({
      ...state,
      images: state.images.map(img => 
        img.id === state.activeImageId ? { ...img, ...updates } : img
      )
    });
  };

  const deleteImage = (id: string) => {
    onChange({
      ...state,
      images: state.images.filter(img => img.id !== id),
      activeImageId: state.activeImageId === id ? null : state.activeImageId
    });
  };

  const addScaleBar = () => {
    if (!activeImage) return;
    const newBar: ScaleBar = {
      id: `sb-${Date.now()}`,
      p1: { x: 50, y: 100 },
      p2: { x: 200, y: 100 },
      lengthMeters: 1.0
    };
    updateActiveImage({ scaleBars: [...activeImage.scaleBars, newBar] });
  };

  const addCenterLine = (axis: "X" | "Y") => {
    if (!activeImage) return;
    const newLine: CenterLine = {
      id: `cl-${Date.now()}`,
      axis,
      position: 200,
      rotation: 0
    };
    updateActiveImage({ centerLines: [...activeImage.centerLines, newLine] });
  };

  const addAnchor = () => {
    if (!activeImage) return;
    const newAnchor: AnchorPoint = {
      id: `ap-${Date.now()}`,
      label: `Anchor ${activeImage.anchors.length + 1}`,
      position: { x: 200, y: 200 },
      u: 0.5,
      s: 0.5
    };
    updateActiveImage({ anchors: [...activeImage.anchors, newAnchor] });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent" />
          Reference Pack
        </h3>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFileUpload}
        />
      </div>

      {/* View selector for new uploads */}
      <div className="grid grid-cols-4 gap-1">
        {(["top", "side", "front", "perspective"] as const).map(view => (
          <Button
            key={view}
            variant={selectedView === view ? "secondary" : "ghost"}
            size="sm"
            className="text-xs capitalize"
            onClick={() => setSelectedView(view)}
          >
            {view}
          </Button>
        ))}
      </div>

      {/* Upload button */}
      <Button
        variant="outline"
        className="w-full gap-2"
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload className="w-4 h-4" />
        Upload {selectedView} Reference
      </Button>

      {/* Image list */}
      {state.images.length > 0 && (
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Loaded References</Label>
          <div className="space-y-1">
            {state.images.map(img => (
              <div
                key={img.id}
                className={cn(
                  "flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-colors",
                  state.activeImageId === img.id 
                    ? "border-primary bg-primary/10" 
                    : "border-border hover:bg-secondary/50"
                )}
                onClick={() => onChange({ ...state, activeImageId: img.id })}
              >
                <img 
                  src={img.dataUrl} 
                  alt={img.name}
                  className="w-10 h-10 object-cover rounded"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium truncate">{img.name}</div>
                  <div className="text-[10px] text-muted-foreground uppercase">{img.view}</div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={(e) => {
                    e.stopPropagation();
                    updateActiveImage({ visible: !img.visible });
                  }}
                >
                  {img.visible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteImage(img.id);
                  }}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Active image controls */}
      {activeImage && (
        <div className="space-y-4 pt-2 border-t border-border">
          <Label className="text-xs text-muted-foreground">Image Transform</Label>
          
          <div className="space-y-3">
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Opacity</span>
                <span className="text-muted-foreground">{(activeImage.opacity * 100).toFixed(0)}%</span>
              </div>
              <Slider
                value={[activeImage.opacity]}
                min={0}
                max={1}
                step={0.05}
                onValueChange={([v]) => updateActiveImage({ opacity: v })}
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Scale</span>
                <span className="text-muted-foreground">{activeImage.transform.scale.toFixed(2)}x</span>
              </div>
              <Slider
                value={[activeImage.transform.scale]}
                min={0.1}
                max={5}
                step={0.05}
                onValueChange={([v]) => updateActiveImage({ 
                  transform: { ...activeImage.transform, scale: v } 
                })}
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Rotation</span>
                <span className="text-muted-foreground">{activeImage.transform.rotation.toFixed(0)}°</span>
              </div>
              <Slider
                value={[activeImage.transform.rotation]}
                min={-180}
                max={180}
                step={1}
                onValueChange={([v]) => updateActiveImage({ 
                  transform: { ...activeImage.transform, rotation: v } 
                })}
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label className="text-[10px]">X Offset</Label>
                <Input
                  type="number"
                  value={activeImage.transform.x}
                  onChange={(e) => updateActiveImage({
                    transform: { ...activeImage.transform, x: parseFloat(e.target.value) || 0 }
                  })}
                  className="h-7 text-xs"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-[10px]">Y Offset</Label>
                <Input
                  type="number"
                  value={activeImage.transform.y}
                  onChange={(e) => updateActiveImage({
                    transform: { ...activeImage.transform, y: parseFloat(e.target.value) || 0 }
                  })}
                  className="h-7 text-xs"
                />
              </div>
            </div>
          </div>

          {/* Calibration tools */}
          <div className="space-y-2 pt-2 border-t border-border">
            <Label className="text-xs text-muted-foreground">Calibration Tools</Label>
            
            <div className="grid grid-cols-3 gap-1">
              <Button
                variant={state.activeTool === "scaleBar" ? "secondary" : "ghost"}
                size="sm"
                className="text-xs gap-1"
                onClick={() => {
                  onChange({ ...state, activeTool: "scaleBar" });
                  addScaleBar();
                }}
              >
                <Ruler className="w-3 h-3" />
                Scale
              </Button>
              <Button
                variant={state.activeTool === "centerLine" ? "secondary" : "ghost"}
                size="sm"
                className="text-xs gap-1"
                onClick={() => {
                  onChange({ ...state, activeTool: "centerLine" });
                  addCenterLine("Y");
                }}
              >
                <Crosshair className="w-3 h-3" />
                Center
              </Button>
              <Button
                variant={state.activeTool === "anchor" ? "secondary" : "ghost"}
                size="sm"
                className="text-xs gap-1"
                onClick={() => {
                  onChange({ ...state, activeTool: "anchor" });
                  addAnchor();
                }}
              >
                <Target className="w-3 h-3" />
                Anchor
              </Button>
            </div>
          </div>

          {/* Scale bars list */}
          {activeImage.scaleBars.length > 0 && (
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Scale Bars</Label>
              {activeImage.scaleBars.map((bar, idx) => (
                <div key={bar.id} className="flex items-center gap-2 text-xs">
                  <span className="text-muted-foreground w-8">#{idx + 1}</span>
                  <Input
                    type="number"
                    value={bar.lengthMeters}
                    step={0.1}
                    className="h-6 text-xs flex-1"
                    onChange={(e) => {
                      const newBars = activeImage.scaleBars.map(b =>
                        b.id === bar.id ? { ...b, lengthMeters: parseFloat(e.target.value) || 1 } : b
                      );
                      updateActiveImage({ scaleBars: newBars });
                    }}
                  />
                  <span className="text-muted-foreground">m</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-destructive"
                    onClick={() => updateActiveImage({
                      scaleBars: activeImage.scaleBars.filter(b => b.id !== bar.id)
                    })}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Anchor points list */}
          {activeImage.anchors.length > 0 && (
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Anchor Points</Label>
              {activeImage.anchors.map((anchor) => (
                <div key={anchor.id} className="flex items-center gap-2 text-xs bg-secondary/30 p-2 rounded">
                  <Target className="w-3 h-3 text-accent" />
                  <Input
                    value={anchor.label}
                    className="h-6 text-xs flex-1"
                    onChange={(e) => {
                      const newAnchors = activeImage.anchors.map(a =>
                        a.id === anchor.id ? { ...a, label: e.target.value } : a
                      );
                      updateActiveImage({ anchors: newAnchors });
                    }}
                  />
                  <span className="text-muted-foreground">u={anchor.u.toFixed(2)}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-destructive"
                    onClick={() => updateActiveImage({
                      anchors: activeImage.anchors.filter(a => a.id !== anchor.id)
                    })}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Default empty state
export const DEFAULT_REFERENCE_PACK: ReferencePackState = {
  images: [],
  activeImageId: null,
  activeTool: "select"
};
