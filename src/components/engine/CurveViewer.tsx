import { useMemo } from "react";
import { HullParams } from "@/lib/parametric/types";
import { evalBeamCurve, evalKeelCurve, evalDeckCurve } from "@/lib/parametric/curves";

interface CurveViewerProps {
  params: HullParams;
  curveType: "beam" | "keel" | "deck";
  width?: number;
  height?: number;
}

export function CurveViewer({ params, curveType, width = 300, height = 100 }: CurveViewerProps) {
  const samples = 100;
  
  const { path, label, color, yRange } = useMemo(() => {
    const points: { x: number; y: number }[] = [];
    let minY = Infinity;
    let maxY = -Infinity;
    
    for (let i = 0; i <= samples; i++) {
      const u = i / samples;
      let y: number;
      
      switch (curveType) {
        case "beam":
          y = evalBeamCurve(u, params);
          break;
        case "keel":
          y = evalKeelCurve(u, params);
          break;
        case "deck":
          y = evalDeckCurve(u, params);
          break;
      }
      
      points.push({ x: u, y });
      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);
    }
    
    // Add padding
    const padding = (maxY - minY) * 0.1 || 0.1;
    minY -= padding;
    maxY += padding;
    
    // Create SVG path
    const pathData = points.map((p, i) => {
      const x = (p.x * (width - 40)) + 20;
      const y = height - 20 - ((p.y - minY) / (maxY - minY)) * (height - 40);
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    }).join(" ");
    
    const colors = {
      beam: "#0ea5e9",
      keel: "#10b981",
      deck: "#f59e0b",
    };
    
    const labels = {
      beam: "B(u) - Half Beam",
      keel: "K(u) - Keel/Rocker",
      deck: "D(u) - Deck Height",
    };
    
    return {
      path: pathData,
      label: labels[curveType],
      color: colors[curveType],
      yRange: { min: minY, max: maxY },
    };
  }, [params, curveType, width, height]);

  return (
    <div className="bg-card border border-border rounded-lg p-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-mono text-muted-foreground">{label}</span>
        <span className="text-xs font-mono" style={{ color }}>
          [{yRange.min.toFixed(2)}, {yRange.max.toFixed(2)}]
        </span>
      </div>
      <svg 
        width={width} 
        height={height} 
        className="bg-background rounded"
        viewBox={`0 0 ${width} ${height}`}
      >
        {/* Grid lines */}
        {[0.25, 0.5, 0.75].map((t) => (
          <line
            key={t}
            x1={20 + t * (width - 40)}
            y1={10}
            x2={20 + t * (width - 40)}
            y2={height - 10}
            stroke="hsl(var(--border))"
            strokeDasharray="2 2"
          />
        ))}
        
        {/* Axis labels */}
        <text x={20} y={height - 5} className="text-[10px] fill-muted-foreground">0</text>
        <text x={width - 25} y={height - 5} className="text-[10px] fill-muted-foreground">1</text>
        
        {/* Curve */}
        <path
          d={path}
          fill="none"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

interface CurvePanelProps {
  params: HullParams;
}

export function CurvePanel({ params }: CurvePanelProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-foreground">Profile Curves</h3>
      <CurveViewer params={params} curveType="beam" />
      <CurveViewer params={params} curveType="keel" />
      <CurveViewer params={params} curveType="deck" />
    </div>
  );
}
