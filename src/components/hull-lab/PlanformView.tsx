import { useMemo } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { evalBeamV2 } from "@/lib/parametric/v2/curves";
import { DEFAULT_HULL_V2_PARAMS, HullV2Params } from "@/lib/parametric/v2/types";

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

const STATION_MARKERS = [0, 0.25, 0.5, 0.75, 1];

const buildOutlinePath = (samples: BeamSample[], width: number, height: number, pad: number, maxHalfBeam: number) => {
  const centerY = height / 2;
  const halfShapeHeight = (height - pad * 2) * 0.46;

  const topPoints = samples.map((s) => {
    const x = pad + s.u * (width - pad * 2);
    const y = centerY - (s.halfBeam / maxHalfBeam) * halfShapeHeight;
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  });

  const bottomPoints = [...samples].reverse().map((s) => {
    const x = pad + s.u * (width - pad * 2);
    const y = centerY + (s.halfBeam / maxHalfBeam) * halfShapeHeight;
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  });

  return `M ${topPoints.join(" L ")} L ${bottomPoints.join(" L ")} Z`;
};

export function PlanformView({ samples, halfBeamMax, params, onReset }: PlanformViewProps) {
  const viewWidth = 1240;
  const viewHeight = 620;
  const pad = 46;

  const targetSamples = useMemo(
    () =>
      samples.map((sample) => ({
        u: sample.u,
        halfBeam: evalBeamV2(sample.u, DEFAULT_HULL_V2_PARAMS),
      })),
    [samples]
  );

  const activeOutlinePath = useMemo(
    () => buildOutlinePath(samples, viewWidth, viewHeight, pad, halfBeamMax),
    [samples, viewWidth, viewHeight, pad, halfBeamMax]
  );

  const targetOutlinePath = useMemo(
    () => buildOutlinePath(targetSamples, viewWidth, viewHeight, pad, halfBeamMax),
    [targetSamples, viewWidth, viewHeight, pad, halfBeamMax]
  );

  const stationErrors = useMemo(
    () =>
      STATION_MARKERS.map((u) => {
        const current = evalBeamV2(u, params);
        const target = evalBeamV2(u, DEFAULT_HULL_V2_PARAMS);
        return { u, delta: current - target };
      }),
    [params]
  );

  const rmsError = useMemo(() => {
    const sq = stationErrors.reduce((sum, station) => sum + station.delta * station.delta, 0);
    return Math.sqrt(sq / stationErrors.length);
  }, [stationErrors]);

  const maxAbsError = useMemo(
    () => Math.max(...stationErrors.map((station) => Math.abs(station.delta))),
    [stationErrors]
  );

  const maxBeamStation = useMemo(
    () => samples.reduce((best, s) => (s.halfBeam > best.halfBeam ? s : best), samples[0]),
    [samples]
  );

  const centerY = viewHeight / 2;

  return (
    <article className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card via-background to-muted/30 p-5 shadow-sm">
      <div className="pointer-events-none absolute -left-16 -top-16 h-52 w-52 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-16 h-56 w-56 rounded-full bg-accent/25 blur-3xl" />

      <div className="relative mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">Laser class geometry board</p>
          <h2 className="text-2xl font-semibold text-foreground">Planform Comparison Matrix</h2>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">RMS error: {rmsError.toFixed(4)} m</Badge>
          <Badge variant="outline">Max error: {maxAbsError.toFixed(4)} m</Badge>
          <Button variant="outline" size="sm" onClick={onReset}>
            Reset to Laser Baseline
          </Button>
        </div>
      </div>

      <div className="relative rounded-2xl border border-border bg-card/70 p-4">
        <svg viewBox={`0 0 ${viewWidth} ${viewHeight}`} className="h-auto w-full">
          {STATION_MARKERS.map((marker) => {
            const x = pad + marker * (viewWidth - pad * 2);
            return (
              <line
                key={marker}
                x1={x}
                y1={pad}
                x2={x}
                y2={viewHeight - pad}
                className="stroke-border"
                strokeDasharray={marker === 0.5 ? "0" : "7 8"}
                strokeWidth={marker === 0.5 ? 1.8 : 1}
              />
            );
          })}

          <line x1={pad} y1={centerY} x2={viewWidth - pad} y2={centerY} className="stroke-border" strokeDasharray="6 7" />

          <path d={targetOutlinePath} className="fill-muted/35 stroke-muted-foreground/80" strokeWidth={2} strokeDasharray="8 8" />
          <path d={activeOutlinePath} className="fill-primary/20 stroke-primary" strokeWidth={3} />
        </svg>
      </div>

      <div className="mt-4 grid gap-2 text-xs text-muted-foreground sm:grid-cols-2 xl:grid-cols-5">
        <p className="rounded-md border border-border bg-background/70 px-3 py-2">Max beam station: u={maxBeamStation.u.toFixed(3)}</p>
        <p className="rounded-md border border-border bg-background/70 px-3 py-2">maxBeamPos param: {params.beam.maxBeamPos.toFixed(3)}</p>
        <p className="rounded-md border border-border bg-background/70 px-3 py-2">Stern width ratio: {params.beam.sternWidth.toFixed(3)}</p>
        <p className="rounded-md border border-border bg-background/70 px-3 py-2">Bow taper: {params.bow.taperPower.toFixed(3)}</p>
        <p className="rounded-md border border-border bg-background/70 px-3 py-2">Nose bluntness: {params.bow.noseBluntness.toFixed(3)}</p>
      </div>
    </article>
  );
}
