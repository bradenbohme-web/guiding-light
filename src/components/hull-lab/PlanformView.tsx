import { Button } from "@/components/ui/button";
import { HullV2Params } from "@/lib/parametric/v2/types";

interface BeamSample {
  u: number;
  halfBeam: number;
}

interface PlanformViewProps {
  samples: BeamSample[];
  halfBeamMax: number;
  params: HullV2Params;
  onReset: () => void;
}

export function PlanformView({ samples, halfBeamMax, params, onReset }: PlanformViewProps) {
  const viewWidth = 1080;
  const viewHeight = 520;
  const pad = 36;
  const centerY = viewHeight / 2;
  const halfShapeHeight = (viewHeight - pad * 2) * 0.45;

  const topPoints = samples.map((s) => {
    const x = pad + s.u * (viewWidth - pad * 2);
    const y = centerY - (s.halfBeam / halfBeamMax) * halfShapeHeight;
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  });

  const bottomPoints = [...samples].reverse().map((s) => {
    const x = pad + s.u * (viewWidth - pad * 2);
    const y = centerY + (s.halfBeam / halfBeamMax) * halfShapeHeight;
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  });

  const outlinePath = `M ${topPoints.join(" L ")} L ${bottomPoints.join(" L ")} Z`;

  return (
    <article className="rounded-2xl border border-border bg-card p-4 shadow-sm">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Hull Lab</p>
          <h2 className="text-xl font-semibold text-foreground">Planform Studio</h2>
        </div>
        <Button variant="outline" size="sm" onClick={onReset}>
          Reset Defaults
        </Button>
      </div>

      <div className="rounded-xl border border-border bg-background p-3">
        <svg viewBox={`0 0 ${viewWidth} ${viewHeight}`} className="h-auto w-full">
          {[0, 0.25, 0.5, 0.75, 1].map((marker) => {
            const x = pad + marker * (viewWidth - pad * 2);
            return (
              <line
                key={marker}
                x1={x}
                y1={pad}
                x2={x}
                y2={viewHeight - pad}
                className="stroke-muted"
                strokeDasharray={marker === 0.5 ? "0" : "4 7"}
                strokeWidth={marker === 0.5 ? 1.6 : 1}
              />
            );
          })}
          <line
            x1={pad}
            y1={centerY}
            x2={viewWidth - pad}
            y2={centerY}
            className="stroke-muted"
            strokeDasharray="6 6"
          />
          <path d={outlinePath} className="fill-primary/20 stroke-primary" strokeWidth={3} />
        </svg>
      </div>

      <div className="mt-4 grid gap-2 text-xs text-muted-foreground sm:grid-cols-2 lg:grid-cols-4">
        <p className="rounded-md border border-border/60 bg-background/60 px-3 py-2">maxBeamPos: {params.beam.maxBeamPos.toFixed(2)}</p>
        <p className="rounded-md border border-border/60 bg-background/60 px-3 py-2">sternWidth: {params.beam.sternWidth.toFixed(2)}</p>
        <p className="rounded-md border border-border/60 bg-background/60 px-3 py-2">taperPower: {params.bow.taperPower.toFixed(2)}</p>
        <p className="rounded-md border border-border/60 bg-background/60 px-3 py-2">noseBluntness: {params.bow.noseBluntness.toFixed(2)}</p>
      </div>
    </article>
  );
}
