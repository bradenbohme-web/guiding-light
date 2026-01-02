// Interactive Curve Editor - Drag control points to modify B(u), K(u), D(u) curves
import { useState, useCallback, useRef, useMemo, useEffect } from "react";
import { HullParams } from "@/lib/parametric/types";
import { evalBeamCurve, evalKeelCurve, evalDeckCurve } from "@/lib/parametric/curves";
import { cn } from "@/lib/utils";

interface CurveControlPoint {
  id: string;
  u: number;
  value: number;
  curve: "beam" | "keel" | "deck";
}

interface InteractiveCurveEditorProps {
  params: HullParams;
  onParamsChange: (params: HullParams) => void;
  viewType: "top" | "side";
  width?: number;
  height?: number;
  showHeatmap?: boolean;
  heatmapDepths?: number[][];
  onHeatmapChange?: (depths: number[][]) => void;
}

const CURVE_COLORS = {
  beam: "#0ea5e9",
  keel: "#10b981",
  deck: "#f59e0b"
};

export function InteractiveCurveEditor({
  params,
  onParamsChange,
  viewType,
  width = 400,
  height = 300,
  showHeatmap = false,
  heatmapDepths,
  onHeatmapChange
}: InteractiveCurveEditorProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [draggingPoint, setDraggingPoint] = useState<string | null>(null);
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);

  // Generate control points for editing
  const controlPoints = useMemo(() => {
    const points: CurveControlPoint[] = [];
    const numPoints = 9;

    for (let i = 0; i <= numPoints; i++) {
      const u = i / numPoints;

      if (viewType === "top") {
        points.push({
          id: `beam-${i}`,
          u,
          value: evalBeamCurve(u, params),
          curve: "beam"
        });
      } else {
        points.push({
          id: `deck-${i}`,
          u,
          value: evalDeckCurve(u, params),
          curve: "deck"
        });
        points.push({
          id: `keel-${i}`,
          u,
          value: evalKeelCurve(u, params),
          curve: "keel"
        });
      }
    }

    return points;
  }, [params, viewType]);

  // View bounds
  const viewBounds = useMemo(() => {
    const padding = 0.3;
    if (viewType === "top") {
      return {
        minX: -params.length / 2 - padding,
        maxX: params.length / 2 + padding,
        minY: -params.beam - padding,
        maxY: params.beam + padding
      };
    } else {
      return {
        minX: -params.length / 2 - padding,
        maxX: params.length / 2 + padding,
        minY: -params.height - 0.15,
        maxY: 0.2
      };
    }
  }, [params, viewType]);

  // Scale calculation
  const { scale, translateX, translateY } = useMemo(() => {
    const rangeX = viewBounds.maxX - viewBounds.minX;
    const rangeY = viewBounds.maxY - viewBounds.minY;
    const scaleX = (width - 80) / rangeX;
    const scaleY = (height - 60) / rangeY;
    const scale = Math.min(scaleX, scaleY);

    const translateX = width / 2 - ((viewBounds.minX + viewBounds.maxX) / 2) * scale;
    const translateY = height / 2 - ((viewBounds.minY + viewBounds.maxY) / 2) * scale;

    return { scale, translateX, translateY };
  }, [viewBounds, width, height]);

  // Convert screen coords to model coords
  const screenToModel = useCallback((screenX: number, screenY: number) => {
    const modelX = (screenX - translateX) / scale;
    const modelY = (screenY - translateY) / scale;
    return { x: modelX, y: modelY };
  }, [scale, translateX, translateY]);

  // Handle drag
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!draggingPoint || !svgRef.current) return;

    const rect = svgRef.current.getBoundingClientRect();
    const screenX = e.clientX - rect.left;
    const screenY = e.clientY - rect.top;
    const { x, y } = screenToModel(screenX, screenY);

    const point = controlPoints.find(p => p.id === draggingPoint);
    if (!point) return;

    // Update params based on which curve is being edited
    const newParams = { ...params };

    if (point.curve === "beam") {
      // Adjust beam-related params
      const normalizedY = Math.abs(y);
      const targetBeam = Math.max(0.5, Math.min(3, normalizedY * 2));
      newParams.beam = targetBeam;

      // Adjust taper based on U position
      if (point.u < 0.3) {
        newParams.bowTaperMin = Math.max(0.01, Math.min(0.5, normalizedY / params.beam));
      } else if (point.u > 0.7) {
        newParams.sternTaperMin = Math.max(0.01, Math.min(0.5, normalizedY / params.beam));
      }
    } else if (point.curve === "keel") {
      // Adjust keel/rocker params
      const keelDepth = -y;
      if (point.u < 0.3) {
        newParams.bowLiftAmp = Math.max(0, Math.min(0.2, keelDepth - params.rockerAmp));
      } else if (point.u > 0.7) {
        newParams.rockerAmp = Math.max(0, Math.min(0.2, keelDepth * 0.5));
      }
    } else if (point.curve === "deck") {
      // Adjust deck params
      if (point.u > 0.7) {
        newParams.sternDeckDrop = Math.max(0, Math.min(0.1, -y - 0.05));
      }
    }

    onParamsChange(newParams);
  }, [draggingPoint, controlPoints, params, onParamsChange, screenToModel]);

  const handleMouseUp = useCallback(() => {
    setDraggingPoint(null);
  }, []);

  useEffect(() => {
    if (draggingPoint) {
      window.addEventListener('mouseup', handleMouseUp);
      return () => window.removeEventListener('mouseup', handleMouseUp);
    }
  }, [draggingPoint, handleMouseUp]);

  // Generate curve paths
  const curvePaths = useMemo(() => {
    const samples = 100;
    const paths: { id: string; d: string; color: string }[] = [];

    if (viewType === "top") {
      // Beam curve (hull outline from top)
      let topPath = "";
      let bottomPath = "";
      for (let i = 0; i <= samples; i++) {
        const u = i / samples;
        const x = (u - 0.5) * params.length;
        const z = evalBeamCurve(u, params);
        topPath += `${i === 0 ? 'M' : 'L'} ${x} ${z}`;
        bottomPath = `L ${x} ${-z}` + (i === 0 ? '' : bottomPath);
      }
      bottomPath = bottomPath.replace('L', 'L');
      paths.push({ id: "hull-top", d: topPath + bottomPath + " Z", color: CURVE_COLORS.beam });
    } else {
      // Side view - deck and keel curves
      let deckPath = "";
      let keelPath = "";
      for (let i = 0; i <= samples; i++) {
        const u = i / samples;
        const x = (u - 0.5) * params.length;
        const yDeck = -evalDeckCurve(u, params);
        const yKeel = -evalKeelCurve(u, params);
        deckPath += `${i === 0 ? 'M' : 'L'} ${x} ${yDeck}`;
        keelPath += `${i === 0 ? 'M' : 'L'} ${x} ${yKeel}`;
      }
      paths.push({ id: "deck", d: deckPath, color: CURVE_COLORS.deck });
      paths.push({ id: "keel", d: keelPath, color: CURVE_COLORS.keel });

      // Filled hull shape
      let hullFill = "";
      for (let i = 0; i <= samples; i++) {
        const u = i / samples;
        const x = (u - 0.5) * params.length;
        const yDeck = -evalDeckCurve(u, params);
        hullFill += `${i === 0 ? 'M' : 'L'} ${x} ${yDeck}`;
      }
      for (let i = samples; i >= 0; i--) {
        const u = i / samples;
        const x = (u - 0.5) * params.length;
        const yKeel = -evalKeelCurve(u, params);
        hullFill += ` L ${x} ${yKeel}`;
      }
      hullFill += " Z";
      paths.unshift({ id: "hull-fill", d: hullFill, color: "fill" });
    }

    return paths;
  }, [params, viewType]);

  // Generate heatmap cells
  const heatmapCells = useMemo(() => {
    if (!showHeatmap) return [];

    const cells: { x: number; y: number; w: number; h: number; color: string; depth: number }[] = [];
    const gridX = 20;
    const gridY = 15;
    const cellW = (viewBounds.maxX - viewBounds.minX) / gridX;
    const cellH = (viewBounds.maxY - viewBounds.minY) / gridY;

    for (let i = 0; i < gridX; i++) {
      for (let j = 0; j < gridY; j++) {
        const x = viewBounds.minX + i * cellW;
        const y = viewBounds.minY + j * cellH;

        // Get depth from heatmapDepths if available, otherwise generate based on position
        let depth = 0;
        if (heatmapDepths && heatmapDepths[i] && heatmapDepths[i][j] !== undefined) {
          depth = heatmapDepths[i][j];
        } else {
          // Generate realistic depth based on hull shape
          const u = (x / params.length) + 0.5;
          const s = Math.abs(y) / params.beam;
          if (u >= 0 && u <= 1 && s <= 1) {
            const keelDepth = evalKeelCurve(u, params);
            const sectionDepth = Math.pow(1 - s, 1.5) * Math.abs(keelDepth);
            depth = sectionDepth;
          }
        }

        // Color based on depth (blue = deep, white = shallow)
        const normalized = Math.min(depth / 0.35, 1);
        const r = Math.round(255 * (1 - normalized * 0.8));
        const g = Math.round(255 * (1 - normalized * 0.5));
        const b = 255;

        cells.push({
          x,
          y,
          w: cellW,
          h: cellH,
          color: `rgb(${r}, ${g}, ${b})`,
          depth
        });
      }
    }

    return cells;
  }, [showHeatmap, viewBounds, params, heatmapDepths]);

  // Grid lines
  const gridLines = useMemo(() => {
    const step = 0.5;
    const vertical: number[] = [];
    const horizontal: number[] = [];

    for (let x = Math.ceil(viewBounds.minX / step) * step; x <= viewBounds.maxX; x += step) {
      vertical.push(x);
    }
    for (let y = Math.ceil(viewBounds.minY / step) * step; y <= viewBounds.maxY; y += step) {
      horizontal.push(y);
    }

    return { vertical, horizontal };
  }, [viewBounds]);

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="px-3 py-2 border-b border-border bg-secondary/30 flex items-center justify-between">
        <span className="text-xs font-mono text-muted-foreground uppercase">
          {viewType === "top" ? "Top View - B(u) Curve" : "Side View - K(u) / D(u) Curves"}
        </span>
        <div className="flex items-center gap-3 text-[10px]">
          {viewType === "side" && (
            <>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full" style={{ background: CURVE_COLORS.deck }} />
                Deck
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full" style={{ background: CURVE_COLORS.keel }} />
                Keel
              </span>
            </>
          )}
          {viewType === "top" && (
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full" style={{ background: CURVE_COLORS.beam }} />
              Beam
            </span>
          )}
        </div>
      </div>
      <svg
        ref={svgRef}
        width={width}
        height={height}
        className="bg-[#0a0f1a] cursor-crosshair"
        viewBox={`0 0 ${width} ${height}`}
        onMouseMove={handleMouseMove}
      >
        <defs>
          <linearGradient id={`curve-hull-gradient-${viewType}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        <g transform={`translate(${translateX}, ${translateY}) scale(${scale}, ${scale})`}>
          {/* Grid */}
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
                opacity={x === 0 ? 0.6 : 0.15}
                strokeDasharray={x === 0 ? "none" : `${3/scale} ${3/scale}`}
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
                opacity={y === 0 ? 0.6 : 0.15}
                strokeDasharray={y === 0 ? "none" : `${3/scale} ${3/scale}`}
              />
            ))}
          </g>

          {/* Heatmap */}
          {showHeatmap && heatmapCells.map((cell, i) => (
            <rect
              key={i}
              x={cell.x}
              y={cell.y}
              width={cell.w}
              height={cell.h}
              fill={cell.color}
              opacity={0.6}
            />
          ))}

          {/* Hull paths */}
          {curvePaths.map(path => (
            <path
              key={path.id}
              d={path.d}
              fill={path.color === "fill" ? `url(#curve-hull-gradient-${viewType})` : "none"}
              stroke={path.color === "fill" ? "none" : path.color}
              strokeWidth={path.color === "fill" ? 0 : 2.5 / scale}
              strokeLinecap="round"
            />
          ))}

          {/* Control points */}
          {controlPoints.map((point) => {
            const x = (point.u - 0.5) * params.length;
            const y = viewType === "top"
              ? point.value
              : -point.value;
            const isActive = draggingPoint === point.id || hoveredPoint === point.id;

            return (
              <g key={point.id}>
                {/* Connection line to curve */}
                <line
                  x1={x}
                  y1={0}
                  x2={x}
                  y2={y}
                  stroke={CURVE_COLORS[point.curve]}
                  strokeWidth={1 / scale}
                  strokeDasharray={`${2/scale} ${2/scale}`}
                  opacity={0.4}
                />
                {/* Control handle */}
                <circle
                  cx={x}
                  cy={y}
                  r={isActive ? 9 / scale : 7 / scale}
                  fill={isActive ? CURVE_COLORS[point.curve] : "hsl(var(--background))"}
                  stroke={CURVE_COLORS[point.curve]}
                  strokeWidth={2.5 / scale}
                  className="cursor-grab active:cursor-grabbing"
                  onMouseDown={() => setDraggingPoint(point.id)}
                  onMouseEnter={() => setHoveredPoint(point.id)}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
                {/* Label on hover */}
                {isActive && (
                  <text
                    x={x}
                    y={y - 14 / scale}
                    textAnchor="middle"
                    fill="hsl(var(--foreground))"
                    fontSize={11 / scale}
                    className="font-mono pointer-events-none"
                  >
                    u={point.u.toFixed(2)} v={Math.abs(point.value).toFixed(3)}
                  </text>
                )}
              </g>
            );
          })}
        </g>

        {/* Scale bar */}
        <g transform={`translate(${width - 100}, ${height - 25})`}>
          <line x1="0" y1="0" x2="60" y2="0" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
          <line x1="0" y1="-4" x2="0" y2="4" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
          <line x1="60" y1="-4" x2="60" y2="4" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
          <text x="30" y="14" textAnchor="middle" className="text-[10px] fill-muted-foreground font-mono">
            {(60 / scale).toFixed(2)}m
          </text>
        </g>

        {/* Axis labels */}
        <text x="15" y="20" className="text-[11px] fill-muted-foreground font-mono">
          {viewType === "top" ? "Z (beam)" : "Y (height)"}
        </text>
        <text x={width - 15} y={height - 8} textAnchor="end" className="text-[11px] fill-muted-foreground font-mono">
          X (length)
        </text>
      </svg>
    </div>
  );
}
