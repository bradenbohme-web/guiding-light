// SVG-based 2D Orthographic View with curve editing and heatmaps
import { useMemo, useState, useCallback } from "react";
import { HullParams } from "@/lib/parametric/types";
import { evalBeamCurve, evalKeelCurve, evalDeckCurve } from "@/lib/parametric/curves";
import { cn } from "@/lib/utils";

interface OrthoViewProps {
  params: HullParams;
  viewType: "top" | "side" | "front";
  width?: number;
  height?: number;
  showHeatmap?: boolean;
  showGrid?: boolean;
  showCurveHandles?: boolean;
  onCurveEdit?: (curve: string, index: number, value: number) => void;
}

// Generate SVG path for hull outline in different views
function generateTopViewPath(params: HullParams, samples: number = 100): string {
  const points: { x: number; z: number }[] = [];
  
  // Starboard side (positive z)
  for (let i = 0; i <= samples; i++) {
    const u = i / samples;
    const x = (u - 0.5) * params.length;
    const z = evalBeamCurve(u, params);
    points.push({ x, z });
  }
  
  // Port side (negative z) - reverse order for closed path
  for (let i = samples; i >= 0; i--) {
    const u = i / samples;
    const x = (u - 0.5) * params.length;
    const z = -evalBeamCurve(u, params);
    points.push({ x, z });
  }
  
  return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.z}`).join(' ') + ' Z';
}

function generateSideViewPath(params: HullParams, samples: number = 100): { deck: string; keel: string } {
  const deckPoints: { x: number; y: number }[] = [];
  const keelPoints: { x: number; y: number }[] = [];
  
  for (let i = 0; i <= samples; i++) {
    const u = i / samples;
    const x = (u - 0.5) * params.length;
    const yDeck = evalDeckCurve(u, params);
    const yKeel = evalKeelCurve(u, params);
    deckPoints.push({ x, y: yDeck });
    keelPoints.push({ x, y: yKeel });
  }
  
  const deckPath = deckPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${-p.y}`).join(' ');
  const keelPath = keelPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${-p.y}`).join(' ');
  
  return { deck: deckPath, keel: keelPath };
}

function generateFrontViewPath(params: HullParams, u: number = 0.5): string {
  const b = evalBeamCurve(u, params);
  const yK = evalKeelCurve(u, params);
  const yD = evalDeckCurve(u, params);
  
  const points: { y: number; z: number }[] = [];
  const samples = 50;
  
  // Generate section profile
  for (let j = 0; j <= samples; j++) {
    const s = j / samples;
    const z = s * b;
    
    // Simple section approximation
    const t = Math.pow(s, 1.5);
    const y = yK + (yD - yK) * t;
    points.push({ y: -y, z });
  }
  
  // Mirror for other side
  for (let j = samples; j >= 0; j--) {
    const s = j / samples;
    const z = -s * b;
    const t = Math.pow(s, 1.5);
    const y = yK + (yD - yK) * t;
    points.push({ y: -y, z });
  }
  
  return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.z} ${p.y}`).join(' ') + ' Z';
}

// Generate heatmap gradient based on error values
function generateHeatmapGradient(errorValues: number[], maxError: number = 0.05): string[] {
  return errorValues.map(err => {
    const normalized = Math.min(Math.abs(err) / maxError, 1);
    if (normalized < 0.33) return `rgba(34, 197, 94, ${0.3 + normalized})`; // Green
    if (normalized < 0.66) return `rgba(234, 179, 8, ${0.3 + normalized})`; // Yellow
    return `rgba(239, 68, 68, ${0.3 + normalized})`; // Red
  });
}

export function OrthoView({
  params,
  viewType,
  width = 400,
  height = 300,
  showHeatmap = false,
  showGrid = true,
  showCurveHandles = false,
  onCurveEdit
}: OrthoViewProps) {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  // Calculate view bounds based on hull params
  const viewBounds = useMemo(() => {
    const padding = 0.2;
    switch (viewType) {
      case "top":
        return {
          minX: -params.length / 2 - padding,
          maxX: params.length / 2 + padding,
          minY: -params.beam - padding,
          maxY: params.beam + padding
        };
      case "side":
        return {
          minX: -params.length / 2 - padding,
          maxX: params.length / 2 + padding,
          minY: -params.height - 0.1,
          maxY: 0.15
        };
      case "front":
        return {
          minX: -params.beam - padding,
          maxX: params.beam + padding,
          minY: -params.height - 0.1,
          maxY: 0.1
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
        return { main: generateTopViewPath(params), secondary: null };
      case "side":
        const sidePaths = generateSideViewPath(params);
        return { main: sidePaths.keel, secondary: sidePaths.deck };
      case "front":
        return { main: generateFrontViewPath(params), secondary: null };
    }
  }, [params, viewType]);

  // Generate control points for curve editing
  const controlPoints = useMemo(() => {
    if (!showCurveHandles) return [];
    
    const points: { x: number; y: number; u: number; curve: string }[] = [];
    const numPoints = 7;
    
    for (let i = 0; i <= numPoints; i++) {
      const u = i / numPoints;
      const x = (u - 0.5) * params.length;
      
      switch (viewType) {
        case "top":
          points.push({ x, y: evalBeamCurve(u, params), u, curve: "beam" });
          break;
        case "side":
          points.push({ x, y: -evalDeckCurve(u, params), u, curve: "deck" });
          points.push({ x, y: -evalKeelCurve(u, params), u, curve: "keel" });
          break;
      }
    }
    
    return points;
  }, [params, viewType, showCurveHandles]);

  // Generate grid lines
  const gridLines = useMemo(() => {
    if (!showGrid) return { vertical: [], horizontal: [] };
    
    const vertical: number[] = [];
    const horizontal: number[] = [];
    const step = 0.5; // 0.5m grid
    
    for (let x = Math.ceil(viewBounds.minX / step) * step; x <= viewBounds.maxX; x += step) {
      vertical.push(x);
    }
    for (let y = Math.ceil(viewBounds.minY / step) * step; y <= viewBounds.maxY; y += step) {
      horizontal.push(y);
    }
    
    return { vertical, horizontal };
  }, [viewBounds, showGrid]);

  // Generate heatmap cells (simulated error data)
  const heatmapCells = useMemo(() => {
    if (!showHeatmap) return [];
    
    const cells: { x: number; y: number; w: number; h: number; color: string }[] = [];
    const cellSize = 0.2;
    
    for (let x = viewBounds.minX; x < viewBounds.maxX; x += cellSize) {
      for (let y = viewBounds.minY; y < viewBounds.maxY; y += cellSize) {
        // Simulate error (would come from fitting loop in real implementation)
        const error = Math.random() * 0.03;
        const normalized = Math.min(error / 0.03, 1);
        
        let color: string;
        if (normalized < 0.33) color = `rgba(34, 197, 94, 0.3)`;
        else if (normalized < 0.66) color = `rgba(234, 179, 8, 0.4)`;
        else color = `rgba(239, 68, 68, 0.5)`;
        
        cells.push({ x, y, w: cellSize, h: cellSize, color });
      }
    }
    
    return cells;
  }, [viewBounds, showHeatmap]);

  const viewLabels: Record<typeof viewType, string> = {
    top: "TOP VIEW (Plan)",
    side: "SIDE VIEW (Profile)",
    front: "FRONT VIEW (Section)"
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="px-3 py-2 border-b border-border bg-secondary/30">
        <span className="text-xs font-mono text-muted-foreground">{viewLabels[viewType]}</span>
      </div>
      <svg 
        width={width} 
        height={height}
        className="bg-[#0a0f1a]"
        viewBox={`0 0 ${width} ${height}`}
      >
        <defs>
          {/* Gradient for hull fill */}
          <linearGradient id={`hull-gradient-${viewType}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
          </linearGradient>
          
          {/* Reference line pattern */}
          <pattern id="ref-lines" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.3"/>
          </pattern>
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
          
          {/* Heatmap overlay */}
          {showHeatmap && (
            <g className="heatmap">
              {heatmapCells.map((cell, i) => (
                <rect
                  key={i}
                  x={cell.x}
                  y={cell.y}
                  width={cell.w}
                  height={cell.h}
                  fill={cell.color}
                />
              ))}
            </g>
          )}
          
          {/* Hull outline */}
          <path
            d={hullPath.main}
            fill={`url(#hull-gradient-${viewType})`}
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
          
          {/* Curve control points */}
          {showCurveHandles && controlPoints.map((point, i) => (
            <g key={i}>
              <circle
                cx={point.x}
                cy={point.y}
                r={6 / scale}
                fill={hoveredPoint === i ? "hsl(var(--primary))" : "hsl(var(--background))"}
                stroke={point.curve === "beam" ? "#0ea5e9" : point.curve === "deck" ? "#f59e0b" : "#10b981"}
                strokeWidth={2 / scale}
                className="cursor-move"
                onMouseEnter={() => setHoveredPoint(i)}
                onMouseLeave={() => setHoveredPoint(null)}
              />
              {hoveredPoint === i && (
                <text
                  x={point.x}
                  y={point.y - 10 / scale}
                  textAnchor="middle"
                  fill="hsl(var(--foreground))"
                  fontSize={10 / scale}
                  className="font-mono"
                >
                  u={point.u.toFixed(2)}
                </text>
              )}
            </g>
          ))}
          
          {/* Station markers */}
          {viewType !== "front" && (
            <g className="station-markers">
              {[0, 0.25, 0.5, 0.75, 1].map((u, i) => {
                const x = (u - 0.5) * params.length;
                return (
                  <g key={i}>
                    <line
                      x1={x}
                      y1={viewBounds.minY}
                      x2={x}
                      y2={viewBounds.minY + 0.08}
                      stroke="hsl(var(--accent))"
                      strokeWidth={1 / scale}
                    />
                  </g>
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

// Panel showing all three ortho views
interface OrthoPanelProps {
  params: HullParams;
  showHeatmap?: boolean;
  showCurveHandles?: boolean;
}

export function OrthoPanel({ params, showHeatmap = false, showCurveHandles = false }: OrthoPanelProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-primary" />
        Orthographic Views
      </h3>
      <div className="grid grid-cols-1 gap-3">
        <OrthoView 
          params={params} 
          viewType="top" 
          width={380} 
          height={200} 
          showHeatmap={showHeatmap}
          showCurveHandles={showCurveHandles}
        />
        <OrthoView 
          params={params} 
          viewType="side" 
          width={380} 
          height={150} 
          showHeatmap={showHeatmap}
          showCurveHandles={showCurveHandles}
        />
        <OrthoView 
          params={params} 
          viewType="front" 
          width={380} 
          height={150} 
          showHeatmap={showHeatmap}
          showCurveHandles={showCurveHandles}
        />
      </div>
    </div>
  );
}
