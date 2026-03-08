import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";
import { evalBeamV2 } from "@/lib/parametric/v2/curves";
import { DEFAULT_HULL_V2_PARAMS, HullV2Params } from "@/lib/parametric/v2/types";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

interface HullShapeReviewResponse {
  analysis: string;
  model: string;
}

const cloneDefaults = (): HullV2Params =>
  JSON.parse(JSON.stringify(DEFAULT_HULL_V2_PARAMS)) as HullV2Params;

const controlConfig = [
  { key: "beam.sternWidth", label: "Stern Width", min: 0.45, max: 0.95, step: 0.01 },
  { key: "beam.maxBeamPos", label: "Max Beam Position", min: 0.35, max: 0.65, step: 0.01 },
  { key: "bow.taperPower", label: "Bow Taper Power", min: 0.5, max: 3.0, step: 0.05 },
  { key: "bow.noseBluntness", label: "Nose Bluntness", min: 0, max: 1, step: 0.01 },
  { key: "bow.knifeWidth", label: "Knife Width", min: 0.02, max: 0.1, step: 0.001 },
] as const;

export default function HullLab() {
  const [params, setParams] = useState<HullV2Params>(cloneDefaults);
  const [notes, setNotes] = useState("");
  const [analysis, setAnalysis] = useState<HullShapeReviewResponse | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const samples = useMemo(
    () =>
      Array.from({ length: 201 }, (_, i) => {
        const u = i / 200;
        return { u, halfBeam: evalBeamV2(u, params) };
      }),
    [params]
  );

  const stationSample = useMemo(
    () =>
      Array.from({ length: 21 }, (_, i) => {
        const u = i / 20;
        return { u: Number(u.toFixed(3)), halfBeam: Number(evalBeamV2(u, params).toFixed(4)) };
      }),
    [params]
  );

  const halfBeamMax = params.dimensions.beam / 2;
  const viewWidth = 980;
  const viewHeight = 460;
  const pad = 28;
  const centerY = viewHeight / 2;
  const halfShapeHeight = (viewHeight - pad * 2) * 0.44;

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

  const setNestedValue = (path: string, value: number) => {
    const [scope, prop] = path.split(".") as ["beam" | "bow", string];
    setParams((prev) => ({
      ...prev,
      [scope]: {
        ...prev[scope],
        [prop]: value,
      },
    }));
  };

  const handleAnalyze = async () => {
    try {
      setIsAnalyzing(true);
      const { data, error } = await supabase.functions.invoke("hull-shape-review", {
        body: {
          params,
          notes: notes.trim() || null,
          reference: {
            beamStationSample: stationSample,
          },
        },
      });

      if (error) throw new Error(error.message || "Analysis failed");
      if (!data?.analysis) throw new Error("No analysis returned");

      setAnalysis(data as HullShapeReviewResponse);
      toast.success("Analysis ready");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown analysis error";
      toast.error(message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-3">
          <div>
            <h1 className="text-lg font-semibold">Laser Hull Lab — Scratch Build</h1>
            <p className="text-xs text-muted-foreground">Clean page for deterministic top-view tuning and AI diagnosis.</p>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-1.5">
                <ArrowLeft className="h-4 w-4" />
                Main
              </Button>
            </Link>
            <Link to="/workshop">
              <Button variant="outline" size="sm">Workshop</Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-[1440px] gap-4 px-4 py-4 lg:grid-cols-[360px_1fr]">
        <aside className="space-y-4 rounded-lg border border-border bg-card p-4">
          <div className="space-y-3">
            {controlConfig.map((cfg) => {
              const [scope, prop] = cfg.key.split(".") as ["beam" | "bow", keyof HullV2Params["beam"] & keyof HullV2Params["bow"]];
              const value = Number(params[scope][prop as never]);
              return (
                <label key={cfg.key} className="block space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-foreground">{cfg.label}</span>
                    <span className="text-muted-foreground">{value.toFixed(cfg.step < 0.01 ? 3 : 2)}</span>
                  </div>
                  <input
                    type="range"
                    min={cfg.min}
                    max={cfg.max}
                    step={cfg.step}
                    value={value}
                    onChange={(e) => setNestedValue(cfg.key, Number(e.target.value))}
                    className="w-full accent-primary"
                  />
                </label>
              );
            })}
          </div>

          <div className="space-y-2 border-t border-border pt-3">
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Describe the geometry issue you see..."
              className="min-h-24 text-xs"
            />
            <Button onClick={handleAnalyze} disabled={isAnalyzing} className="w-full" size="sm">
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Analyze Shape
                </>
              )}
            </Button>
          </div>

          {analysis && (
            <div className="space-y-2 rounded-md border border-border bg-background/60 p-3">
              <Badge variant="secondary" className="text-[10px]">{analysis.model}</Badge>
              <pre className="max-h-64 overflow-auto whitespace-pre-wrap text-xs leading-relaxed">
                {analysis.analysis}
              </pre>
            </div>
          )}
        </aside>

        <article className="rounded-lg border border-border bg-card p-3">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-medium">Top-View Planform (SVG)</p>
            <Button variant="outline" size="sm" onClick={() => setParams(cloneDefaults())}>Reset Defaults</Button>
          </div>
          <svg viewBox={`0 0 ${viewWidth} ${viewHeight}`} className="h-auto w-full rounded-md border border-border bg-background">
            <line x1={pad} y1={centerY} x2={viewWidth - pad} y2={centerY} className="stroke-muted" strokeDasharray="5 6" />
            <path d={outlinePath} className="fill-primary/20 stroke-primary" strokeWidth={2.5} />
          </svg>
          <div className="mt-2 grid grid-cols-2 gap-2 text-[11px] text-muted-foreground sm:grid-cols-4">
            <p>maxBeamPos: {params.beam.maxBeamPos.toFixed(2)}</p>
            <p>sternWidth: {params.beam.sternWidth.toFixed(2)}</p>
            <p>taperPower: {params.bow.taperPower.toFixed(2)}</p>
            <p>noseBluntness: {params.bow.noseBluntness.toFixed(2)}</p>
          </div>
        </article>
      </section>
    </main>
  );
}
