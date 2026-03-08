import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";
import { evalBeamV2 } from "@/lib/parametric/v2/curves";
import { DEFAULT_HULL_V2_PARAMS, HullV2Params, InterpolationStyle } from "@/lib/parametric/v2/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SliderControl } from "@/components/hull-lab/SliderControl";
import { PlanformView } from "@/components/hull-lab/PlanformView";

interface HullShapeReviewResponse {
  analysis: string;
  model: string;
}

const cloneDefaults = (): HullV2Params =>
  JSON.parse(JSON.stringify(DEFAULT_HULL_V2_PARAMS)) as HullV2Params;

type ControlScope = "beam" | "bow" | "deck";

const controlConfig = [
  { scope: "beam", prop: "sternWidth", label: "Stern Width Ratio", min: 0.45, max: 0.95, step: 0.01 },
  { scope: "beam", prop: "maxBeamPos", label: "Max Beam Station", min: 0.35, max: 0.65, step: 0.005 },
  { scope: "beam", prop: "sternBlend", label: "Stern Hold Zone", min: 0.05, max: 0.35, step: 0.01 },
  { scope: "bow", prop: "taperPower", label: "Bow Taper Power", min: 0.5, max: 3.0, step: 0.05 },
  { scope: "bow", prop: "noseBluntness", label: "Nose Bluntness", min: 0, max: 1, step: 0.01 },
  { scope: "bow", prop: "knifeWidth", label: "Knife Width (m)", min: 0.02, max: 0.1, step: 0.001 },
  { scope: "deck", prop: "sternRise", label: "Stern Rise (m)", min: 0, max: 0.05, step: 0.001 },
  { scope: "deck", prop: "sternRiseStart", label: "Stern Rise Start", min: 0.05, max: 0.45, step: 0.01 },
] as const;

const interpolationOptions: InterpolationStyle[] = ["balloon", "straight", "vacuum"];

export default function HullLab() {
  const [params, setParams] = useState<HullV2Params>(cloneDefaults);
  const [notes, setNotes] = useState("");
  const [analysis, setAnalysis] = useState<HullShapeReviewResponse | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const samples = useMemo(
    () =>
      Array.from({ length: 241 }, (_, i) => {
        const u = i / 240;
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

  const laserDriftScore = useMemo(() => {
    const deltas = [
      Math.abs(params.beam.maxBeamPos - DEFAULT_HULL_V2_PARAMS.beam.maxBeamPos) * 3.2,
      Math.abs(params.beam.sternWidth - DEFAULT_HULL_V2_PARAMS.beam.sternWidth) * 2.6,
      Math.abs(params.beam.sternBlend - DEFAULT_HULL_V2_PARAMS.beam.sternBlend) * 2.3,
      Math.abs(params.bow.taperPower - DEFAULT_HULL_V2_PARAMS.bow.taperPower) * 0.7,
      Math.abs(params.bow.noseBluntness - DEFAULT_HULL_V2_PARAMS.bow.noseBluntness) * 1.4,
      Math.abs(params.deck.sternRise - DEFAULT_HULL_V2_PARAMS.deck.sternRise) * 25,
      Math.abs(params.deck.sternRiseStart - DEFAULT_HULL_V2_PARAMS.deck.sternRiseStart) * 2,
    ];

    const total = deltas.reduce((sum, d) => sum + d, 0);
    return Math.max(0, Math.min(100, Math.round(100 - total * 15)));
  }, [params]);

  const setNestedValue = (scope: ControlScope, prop: string, value: number) => {
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
      toast.success("Laser diagnosis ready");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown analysis error";
      toast.error(message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20 text-foreground">
      <header className="border-b border-border bg-card/75 backdrop-blur">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-3 px-4 py-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">Laser / ILCA class toolchain</p>
            <h1 className="text-2xl font-semibold">Hull Lab — Class-Faithful Shape Bench</h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">Laser lock: {laserDriftScore}%</Badge>
            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-1.5">
                <ArrowLeft className="h-4 w-4" />
                Main
              </Button>
            </Link>
            <Link to="/workshop">
              <Button variant="outline" size="sm">
                Workshop
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-[1600px] px-4 py-6">
        <div className="grid gap-5 xl:grid-cols-[380px_minmax(0,1fr)]">
          <aside className="space-y-4">
            <div className="rounded-2xl border border-border bg-card p-4">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">Laser geometry controls</p>

              <div className="mb-3 flex flex-wrap gap-2">
                {interpolationOptions.map((style) => (
                  <Button
                    key={style}
                    variant={params.beam.interpolation === style ? "default" : "outline"}
                    size="sm"
                    onClick={() =>
                      setParams((prev) => ({
                        ...prev,
                        beam: {
                          ...prev.beam,
                          interpolation: style,
                        },
                      }))
                    }
                  >
                    {style}
                  </Button>
                ))}
              </div>

              <div className="space-y-2">
                {controlConfig.map((cfg) => {
                  const value = Number((params[cfg.scope] as unknown as Record<string, number>)[cfg.prop]);
                  return (
                    <SliderControl
                      key={`${cfg.scope}.${cfg.prop}`}
                      label={cfg.label}
                      value={value}
                      min={cfg.min}
                      max={cfg.max}
                      step={cfg.step}
                      onChange={(next) => setNestedValue(cfg.scope, cfg.prop, next)}
                    />
                  );
                })}
              </div>
            </div>

            <div className="space-y-3 rounded-2xl border border-border bg-card p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">AI shape diagnosis</p>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Describe what still looks wrong (shoulder hump, stem pinch, stern too blunt...)"
                className="min-h-24 text-xs"
              />
              <Button onClick={handleAnalyze} disabled={isAnalyzing} className="w-full" size="sm">
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing shape...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Diagnose against Laser baseline
                  </>
                )}
              </Button>
            </div>

            {analysis && (
              <div className="space-y-2 rounded-2xl border border-border bg-card p-4">
                <Badge variant="secondary" className="text-[10px]">
                  {analysis.model}
                </Badge>
                <pre className="max-h-64 overflow-auto whitespace-pre-wrap text-xs leading-relaxed">{analysis.analysis}</pre>
              </div>
            )}
          </aside>

          <PlanformView
            samples={samples}
            halfBeamMax={halfBeamMax}
            params={params}
            onReset={() => setParams(cloneDefaults())}
          />
        </div>
      </section>
    </main>
  );
}
