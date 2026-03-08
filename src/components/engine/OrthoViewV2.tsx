// OrthoViewV2 - Interactive SVG orthographic views for V2 hull editing
// Draggable control points directly edit hull parameters

import { useMemo, useState, useCallback, useRef, useEffect } from "react";
import { HullV2Params } from "@/lib/parametric/v2/types";
import { evalBeamV2, evalKeelV2, evalDeckV2, sectionLawV2 } from "@/lib/parametric/v2/curves";
import { cn } from "@/lib/utils";

interface OrthoViewV2Props {
  params: HullV2Params;
  viewType: "top" | "side" | "front";
  width?: number;
  height?: number;
  showGrid?: boolean;
  stationU?: number; // For front view - which station to show
  onParamChange?: (key: string, value: number) => void;
  onHoverPart?: (partId: string | null) => void;
}

// ============================================
// PATH GENERATION FOR V2 HULL
// ============================================

function generateTopViewPathV2(params: HullV2Params, samples: number = 100): string {
  const points: { x: number; z: number }[] = [];
  
  // Starboard side
  for (let i = 0; i <= samples; i++) {
    const u = i / samples;
    const x = (u - 0.5) * params.dimensions.length;
    const z = evalBeamV2(u, params);
    points.push({ x, z });
  }
  
  // Port side (reverse)
  for (let i = samples; i >= 0; i--) {
    const u = i / samples;
    const x = (u - 0.5) * params.dimensions.length;
    const z = -evalBeamV2(u, params);
    points.push({ x, z });
  }
  
  return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.z}`).join(' ') + ' Z';
}

function generateSideViewPathV2(params: HullV2Params, samples: number = 100): { deck: string; keel: string } {
  const deckPoints: { x: number; y: number }[] = [];
  const keelPoints: { x: number; y: number }[] = [];
  
  for (let i = 0; i <= samples; i++) {
    const u = i / samples;
    const x = (u - 0.5) * params.dimensions.length;
    const yDeck = evalDeckV2(u, params);
    const yKeel = evalKeelV2(u, params);
    deckPoints.push({ x, y: yDeck });
    keelPoints.push({ x, y: yKeel });
  }
  
  const deckPath = deckPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${-p.y}`).join(' ');
  const keelPath = keelPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${-p.y}`).join(' ');
  
  return { deck: deckPath, keel: keelPath };
}

function generateFrontViewPathV2(params: HullV2Params, u: number = 0.5): string {
  const halfBeam = evalBeamV2(u, params);
  const yKeel = evalKeelV2(u, params);
  const yDeck = evalDeckV2(u, params);
  
  const points: { y: number; z: number }[] = [];
  const samples = 50;
  
  // Generate section profile (starboard)
  for (let j = 0; j <= samples; j++) {
    const s = j / samples;
    const z = s * halfBeam;
    const t = sectionLawV2(s, u, params);
    const y = yKeel + (yDeck - yKeel) * t;
    points.push({ y: -y, z });
  }
  
  // Mirror (port)
  for (let j = samples; j >= 0; j--) {
    const s = j / samples;
    const z = -s * halfBeam;
    const t = sectionLawV2(s, u, params);
    const y = yKeel + (yDeck - yKeel) * t;
    points.push({ y: -y, z });
  }
  
  return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.z} ${p.y}`).join(' ') + ' Z';
}

// ============================================
// CONTROL POINT TYPES
// ============================================

interface ControlPoint {
  id: string;
  x: number;
  y: number;
  paramKey: string;
  label: string;
  color: string;
  direction: 'x' | 'y' | 'both';
  scale: number; // How much param changes per pixel
}

function clampParam(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function constrainHullParam(key: string, value: number, params: HullV2Params): number {
  if (key === 'beam.maxBeamPos') {
    return clampParam(value, 0.3, 0.6);
  }

  if (key === 'bow.taperStart') {
    const minTaperStart = Math.max(params.beam.maxBeamPos + 0.05, 0.45);
    return clampParam(value, minTaperStart, 0.82);
  }

  if (key === 'bow.entryLength') {
    const maxEntryLength = Math.min(
      0.2,
      Math.max(0.04, 1 - Math.max(params.bow.taperStart, params.beam.maxBeamPos + 0.05) - 0.04)
    );
    return clampParam(value, 0.04, maxEntryLength);
  }

  if (key === 'bow.knifeWidth') {
    return clampParam(value, 0.01, 0.08);
  }

  return value;
}

function getControlPointsForView(
  viewType: "top" | "side" | "front",
  params: HullV2Params,
  stationU: number
): ControlPoint[] {
  const { length, beam, heightDeck, heightKeel } = params.dimensions;
  const points: ControlPoint[] = [];
  
  if (viewType === "top") {
    const clampedMaxBeamPos = clampParam(params.beam.maxBeamPos, 0.3, 0.6);
    const clampedTaperStart = clampParam(params.bow.taperStart, Math.max(clampedMaxBeamPos + 0.05, 0.45), 0.82);
    const clampedEntryLength = clampParam(params.bow.entryLength ?? 0.16, 0.04, 0.2);
    const bowEntryU = Math.min(0.98, Math.max(clampedTaperStart + 0.04, 1 - clampedEntryLength));

    const topControls: Array<{
      id: string;
      u: number;
      paramKey: string;
      label: string;
      direction: 'x' | 'y';
      scale: number;
    }> = [
      { id: 'beam-stern', u: 0, paramKey: 'beam.sternWidth', label: 'Stern', direction: 'y', scale: 0.01 },
      { id: 'beam-max', u: clampedMaxBeamPos, paramKey: 'beam.maxBeamPos', label: 'Max Beam', direction: 'x', scale: 0.01 / length },
      { id: 'bow-taper-start', u: clampedTaperStart, paramKey: 'bow.taperStart', label: 'Taper Start', direction: 'x', scale: 0.01 / length },
      { id: 'bow-entry', u: bowEntryU, paramKey: 'bow.entryLength', label: 'Entry Length', direction: 'x', scale: -0.01 / length },
      { id: 'bow-edge', u: 1, paramKey: 'bow.knifeWidth', label: 'Stem Width', direction: 'y', scale: 0.01 },
    ];

    topControls.forEach((ctrl) => {
      const x = (ctrl.u - 0.5) * length;
      const z = evalBeamV2(ctrl.u, params);

      points.push({
        id: ctrl.id,
        x,
        y: z,
        paramKey: ctrl.paramKey,
        label: ctrl.label,
        color: '#0ea5e9',
        direction: ctrl.direction,
        scale: ctrl.scale,
      });
    });
  }
  
  if (viewType === "side") {
    // Keel control points
    const keelPositions = [0, 0.5, 0.85, 1];
    keelPositions.forEach((u, i) => {
      const x = (u - 0.5) * length;
      const y = -evalKeelV2(u, params);
      
      let paramKey = '';
      let label = '';
      if (u === 0.5) { paramKey = 'bottom.rockerAmp'; label = 'Rocker'; }
      else if (u === 0.85) { paramKey = 'bottom.forefoot'; label = 'Forefoot'; }
      else if (u === 1) { paramKey = 'bow.edgeRake'; label = 'Bow Rake'; }
      else return;
      
      points.push({
        id: `keel-${i}`,
        x,
        y,
        paramKey,
        label,
        color: '#10b981',
        direction: 'y',
        scale: 0.01,
      });
    });
    
    // Deck control points
    const deckY = -evalDeckV2(0, params);
    points.push({
      id: 'deck-height',
      x: 0,
      y: deckY,
      paramKey: 'dimensions.heightDeck',
      label: 'Deck Height',
      color: '#f59e0b',
      direction: 'y',
      scale: 0.01,
    });
  }
  
  if (viewType === "front") {
    // V-depth control at keel
    const yKeel = evalKeelV2(stationU, params);
    points.push({
      id: 'v-depth',
      x: 0,
      y: -yKeel,
      paramKey: 'bottom.vDepth',
      label: 'V-Depth',
      color: '#8b5cf6',
      direction: 'y',
      scale: 0.02,
    });
    
    // Chine position
    const halfBeam = evalBeamV2(stationU, params);
    const chineZ = params.bottom.chinePos * halfBeam;
    const chineT = sectionLawV2(params.bottom.chinePos, stationU, params);
    const chineY = yKeel + (params.dimensions.heightDeck - yKeel) * chineT;
    
    points.push({
      id: 'chine',
      x: chineZ,
      y: -chineY,
      paramKey: 'bottom.chinePos',
      label: 'Chine',
      color: '#ec4899',
      direction: 'x',
      scale: 0.01 / halfBeam,
    });
  }
  
  return points;
}

// ============================================
// MAIN COMPONENT
// ============================================

export function OrthoViewV2({
  params,
  viewType,
  width = 400,
  height = 300,
  showGrid = true,
  stationU = 0.5,
  onParamChange,
  onHoverPart,
}: OrthoViewV2Props) {
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);
  const [draggingPoint, setDraggingPoint] = useState<string | null>(null);
  const [dragStart, setDragStart] = useState<{ x: number; y: number; value: number } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Calculate view bounds
  const viewBounds = useMemo(() => {
    const padding = 0.3;
    const { length, beam, heightDeck, heightKeel } = params.dimensions;
    
    switch (viewType) {
      case "top":
        return {
          minX: -length / 2 - padding,
          maxX: length / 2 + padding,
          minY: -beam - padding,
          maxY: beam + padding
        };
      case "side":
        return {
          minX: -length / 2 - padding,
          maxX: length / 2 + padding,
          minY: -heightDeck - 0.15,
          maxY: heightKeel + 0.15
        };
      case "front":
        return {
          minX: -beam - padding,
          maxX: beam + padding,
          minY: -heightDeck - 0.1,
          maxY: heightKeel + 0.1
        };
    }
  }, [params, viewType]);

  // Calculate SVG transform
  const { scale, translateX, translateY } = useMemo(() => {
    const rangeX = viewBounds.maxX - viewBounds.minX;
    const rangeY = viewBounds.maxY - viewBounds.minY;
    const scaleX = (width - 60) / rangeX;
    const scaleY = (height - 40) / rangeY;
    const scale = Math.min(scaleX, scaleY);
    
    const translateX = width / 2 - ((viewBounds.minX + viewBounds.maxX) / 2) * scale;
    const translateY = height / 2 - ((viewBounds.minY + viewBounds.maxY) / 2) * scale;
    
    return { scale, translateX, translateY };
  }, [viewBounds, width, height]);

  // Generate hull path
  const hullPath = useMemo(() => {
    switch (viewType) {
      case "top":
        return { main: generateTopViewPathV2(params), secondary: null };
      case "side":
        const sidePaths = generateSideViewPathV2(params);
        return { main: sidePaths.keel, secondary: sidePaths.deck };
      case "front":
        return { main: generateFrontViewPathV2(params, stationU), secondary: null };
    }
  }, [params, viewType, stationU]);

  // Control points
  const controlPoints = useMemo(() => {
    return getControlPointsForView(viewType, params, stationU);
  }, [viewType, params, stationU]);

  // Generate grid lines
  const gridLines = useMemo(() => {
    if (!showGrid) return { vertical: [], horizontal: [] };
    
    const vertical: number[] = [];
    const horizontal: number[] = [];
    const step = 0.5;
    
    for (let x = Math.ceil(viewBounds.minX / step) * step; x <= viewBounds.maxX; x += step) {
      vertical.push(x);
    }
    for (let y = Math.ceil(viewBounds.minY / step) * step; y <= viewBounds.maxY; y += step) {
      horizontal.push(y);
    }
    
    return { vertical, horizontal };
  }, [viewBounds, showGrid]);

  // Drag handling
  const handleMouseDown = useCallback((e: React.MouseEvent, pointId: string) => {
    e.preventDefault();
    const point = controlPoints.find(p => p.id === pointId);
    if (!point || !onParamChange) return;
    
    // Get current param value
    const keys = point.paramKey.split('.');
    let value = params as any;
    for (const key of keys) {
      value = value[key];
    }
    
    setDraggingPoint(pointId);
    setDragStart({ x: e.clientX, y: e.clientY, value });
  }, [controlPoints, params, onParamChange]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!draggingPoint || !dragStart || !onParamChange) return;
    
    const point = controlPoints.find(p => p.id === draggingPoint);
    if (!point) return;
    
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    
    let delta = 0;
    if (point.direction === 'x') {
      delta = deltaX * point.scale;
    } else if (point.direction === 'y') {
      delta = -deltaY * point.scale; // Invert Y
    } else {
      delta = (deltaX - deltaY) * point.scale;
    }
    
    const newValue = dragStart.value + delta;
    onParamChange(point.paramKey, newValue);
  }, [draggingPoint, dragStart, controlPoints, onParamChange]);

  const handleMouseUp = useCallback(() => {
    setDraggingPoint(null);
    setDragStart(null);
  }, []);

  useEffect(() => {
    if (draggingPoint) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [draggingPoint, handleMouseMove, handleMouseUp]);

  const viewLabels: Record<typeof viewType, string> = {
    top: "TOP VIEW (Plan) - Edit beam outline",
    side: "SIDE VIEW (Profile) - Edit rocker, deck height",
    front: `FRONT VIEW (Section @ u=${stationU.toFixed(2)}) - Edit V-shape`
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="px-3 py-2 border-b border-border bg-secondary/30 flex items-center justify-between">
        <span className="text-xs font-mono text-muted-foreground">{viewLabels[viewType]}</span>
        {onParamChange && (
          <span className="text-xs text-primary">Drag points to edit</span>
        )}
      </div>
      <svg 
        ref={svgRef}
        width={width} 
        height={height}
        className={cn("bg-[#0a0f1a]", draggingPoint && "cursor-grabbing")}
        viewBox={`0 0 ${width} ${height}`}
      >
        <defs>
          <linearGradient id={`hull-gradient-v2-${viewType}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        
        <g transform={`translate(${translateX}, ${translateY}) scale(${scale}, ${scale})`}>
          {/* Grid */}
          {showGrid && (
            <g className="grid-lines">
              {gridLines.vertical.map((x, i) => (
                <line
                  key={`v-${i}`}
                  x1={x}
                  y1={viewBounds.minY}
                  x2={x}
                  y2={viewBounds.maxY}
                  stroke="hsl(var(--border))"
                  strokeWidth={0.5 / scale}
                  opacity={x === 0 ? 0.6 : 0.2}
                  strokeDasharray={x === 0 ? "none" : `${4/scale} ${4/scale}`}
                />
              ))}
              {gridLines.horizontal.map((y, i) => (
                <line
                  key={`h-${i}`}
                  x1={viewBounds.minX}
                  y1={y}
                  x2={viewBounds.maxX}
                  y2={y}
                  stroke="hsl(var(--border))"
                  strokeWidth={0.5 / scale}
                  opacity={y === 0 ? 0.6 : 0.2}
                  strokeDasharray={y === 0 ? "none" : `${4/scale} ${4/scale}`}
                />
              ))}
            </g>
          )}
          
          {/* Hull outline */}
          <path
            d={hullPath.main}
            fill={`url(#hull-gradient-v2-${viewType})`}
            stroke="hsl(var(--primary))"
            strokeWidth={2 / scale}
            strokeLinejoin="round"
          />
          
          {/* Secondary path (deck line for side view) */}
          {hullPath.secondary && (
            <path
              d={hullPath.secondary}
              fill="none"
              stroke="hsl(var(--accent))"
              strokeWidth={1.5 / scale}
              strokeDasharray={`${4/scale} ${2/scale}`}
            />
          )}
          
          {/* Control points */}
          {onParamChange && controlPoints.map((point) => (
            <g key={point.id}>
              {/* Connection line to hull */}
              <line
                x1={point.x}
                y1={point.y}
                x2={point.x + (point.direction === 'x' ? 0.15 : 0)}
                y2={point.y + (point.direction === 'y' ? -0.15 : 0)}
                stroke={point.color}
                strokeWidth={1 / scale}
                opacity={0.5}
              />
              
              {/* Control handle */}
              <circle
                cx={point.x}
                cy={point.y}
                r={hoveredPoint === point.id || draggingPoint === point.id ? 8 / scale : 6 / scale}
                fill={draggingPoint === point.id ? point.color : "hsl(var(--background))"}
                stroke={point.color}
                strokeWidth={2 / scale}
                className="cursor-grab"
                onMouseEnter={() => {
                  setHoveredPoint(point.id);
                  onHoverPart?.(point.paramKey.split('.')[0] === 'bow' ? 'bow_edge' : 
                    point.paramKey.split('.')[0] === 'beam' ? 'beam_curve' :
                    point.paramKey.split('.')[0] === 'bottom' ? 'section_shape' :
                    point.paramKey.split('.')[0] === 'dimensions' ? 'deck_sheet' : 'bottom_hull');
                }}
                onMouseLeave={() => {
                  setHoveredPoint(null);
                  onHoverPart?.(null);
                }}
                onMouseDown={(e) => handleMouseDown(e, point.id)}
              />
              
              {/* Label */}
              {(hoveredPoint === point.id || draggingPoint === point.id) && (
                <text
                  x={point.x}
                  y={point.y - 12 / scale}
                  textAnchor="middle"
                  fill={point.color}
                  fontSize={10 / scale}
                  className="font-mono pointer-events-none"
                >
                  {point.label}
                </text>
              )}
            </g>
          ))}
          
          {/* Station markers */}
          {viewType !== "front" && (
            <g className="station-markers">
              {[0, 0.25, 0.5, 0.75, 1].map((u, i) => {
                const x = (u - 0.5) * params.dimensions.length;
                return (
                  <line
                    key={i}
                    x1={x}
                    y1={viewBounds.minY}
                    x2={x}
                    y2={viewBounds.minY + 0.08}
                    stroke="hsl(var(--accent))"
                    strokeWidth={1 / scale}
                  />
                );
              })}
            </g>
          )}
        </g>
        
        {/* Scale bar */}
        <g transform={`translate(${width - 80}, ${height - 20})`}>
          <line x1="0" y1="0" x2="50" y2="0" stroke="hsl(var(--foreground))" strokeWidth="1" />
          <line x1="0" y1="-3" x2="0" y2="3" stroke="hsl(var(--foreground))" strokeWidth="1" />
          <line x1="50" y1="-3" x2="50" y2="3" stroke="hsl(var(--foreground))" strokeWidth="1" />
          <text x="25" y="12" textAnchor="middle" className="text-[10px] fill-muted-foreground font-mono">
            {(50 / scale).toFixed(2)}m
          </text>
        </g>
        
        {/* Axis labels */}
        <text x="15" y="15" className="text-[10px] fill-muted-foreground font-mono">
          {viewType === "top" ? "Z" : viewType === "side" ? "Y" : "Z"}
        </text>
        <text x={width - 15} y={height - 25} className="text-[10px] fill-muted-foreground font-mono">
          {viewType === "front" ? "Z" : "X"}
        </text>
      </svg>
    </div>
  );
}

// ============================================
// ORTHO PANEL - All three views together
// ============================================

interface OrthoPanelV2Props {
  params: HullV2Params;
  stationU?: number;
  onParamChange?: (key: string, value: number) => void;
  onHoverPart?: (partId: string | null) => void;
  onStationChange?: (u: number) => void;
}

export function OrthoPanelV2({ 
  params, 
  stationU = 0.5, 
  onParamChange,
  onHoverPart,
  onStationChange,
}: OrthoPanelV2Props) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary" />
          Ortho Views
        </h3>
        {onStationChange && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Station:</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={stationU}
              onChange={(e) => onStationChange(parseFloat(e.target.value))}
              className="w-20"
            />
            <span className="text-xs font-mono text-muted-foreground w-8">
              {stationU.toFixed(2)}
            </span>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 gap-3">
        <OrthoViewV2 
          params={params} 
          viewType="top" 
          width={380} 
          height={200} 
          onParamChange={onParamChange}
          onHoverPart={onHoverPart}
        />
        <OrthoViewV2 
          params={params} 
          viewType="side" 
          width={380} 
          height={150}
          onParamChange={onParamChange}
          onHoverPart={onHoverPart}
        />
        <OrthoViewV2 
          params={params} 
          viewType="front" 
          width={380} 
          height={150}
          stationU={stationU}
          onParamChange={onParamChange}
          onHoverPart={onHoverPart}
        />
      </div>
    </div>
  );
}
