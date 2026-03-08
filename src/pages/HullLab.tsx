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
import { SliderControl } from "@/components/hull-lab/SliderControl";
import { PlanformView } from "@/components/hull-lab/PlanformView";

interface HullShapeReviewResponse {
  analysis: string;
  model: string;
}

const cloneDefaults = (): HullV2Params =>
  JSON.parse(JSON.stringify(DEFAULT_HULL_V2_PARAMS)) as HullV2Params;

const controlConfig = [
  { scope: "beam", prop: "sternWidth", label: "Stern Width", min: 0.45, max: 0.95, step: 0.01 },
  { scope: "beam", prop: "maxBeamPos", label: "Max Beam Position", min: 0.35, max: 0.65, step: 0.01 },
  { scope: "bow", prop: "taperPower", label: "Bow Taper Power", min: 0.5, max: 3.0, step: 0.05 },
  { scope: "bow", prop: "noseBluntness", label: "Nose Bluntness", min: 0, max: 1, step: 0.01 },
  { scope: "bow", prop: "knifeWidth", label: "Knife Width", min: 0.02, max: 0.1, step: 0.001 },
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

  const setNestedValue = (scope: "beam" | "bow", prop: string, value: number) => {
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
      <header className="border-b border-border bg-card/80 backdrop-blur">
        <div className="mx-auto flex max-w-[1500px] flex-wrap items-center justify-between gap-3 px-4 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Laser / ILCA</p>
            <h1 className="text-xl font-semibold">Hull Lab — Deterministic Planform Editor</h1>
          </div>
          <div className="flex items-center gap-2">
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

      <section className="mx-auto max-w-[1500px] px-4 py-6">
        <div className="grid gap-5 xl:grid-cols-[340px_minmax(0,1fr)]">
          <aside className="space-y-4">
            <div className="rounded-2xl border border-border bg-card p-4">
              <p className="mb-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">Shape Controls</p>
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
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">AI Shape Diagnosis</p>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Describe what still looks wrong in the planform..."
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
              <div className="space-y-2 rounded-2xl border border-border bg-card p-4">
                <Badge variant="secondary" className="text-[10px]">
                  {analysis.model}
                </Badge>
                <pre className="max-h-64 overflow-auto whitespace-pre-wrap text-xs leading-relaxed">
                  {analysis.analysis}
                </pre>
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
