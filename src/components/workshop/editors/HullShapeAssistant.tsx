import { useMemo, useState, useCallback } from "react";
import { Sparkles, Loader2, Camera } from "lucide-react";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";
import { HullV2Params } from "@/lib/parametric/v2/types";
import { evalBeamV2 } from "@/lib/parametric/v2/curves";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

interface HullShapeAssistantProps {
  params: HullV2Params;
}

interface HullShapeReviewResponse {
  analysis: string;
  model: string;
}

function sampleBeamStations(params: HullV2Params) {
  return Array.from({ length: 21 }, (_, index) => {
    const u = index / 20;
    return {
      u: Number(u.toFixed(3)),
      halfBeam: Number(evalBeamV2(u, params).toFixed(4)),
    };
  });
}

/** Capture the first visible WebGL canvas as a data URL */
function captureViewportScreenshot(): string | null {
  const canvases = document.querySelectorAll("canvas");
  for (const canvas of canvases) {
    if (canvas.width > 100 && canvas.height > 100) {
      try {
        return canvas.toDataURL("image/png");
      } catch {
        // tainted canvas, skip
      }
    }
  }
  return null;
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

export function HullShapeAssistant({ params }: HullShapeAssistantProps) {
  const [notes, setNotes] = useState("");
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<HullShapeReviewResponse | null>(null);
  const [capturedPreview, setCapturedPreview] = useState<string | null>(null);

  const stationSample = useMemo(() => sampleBeamStations(params), [params]);

  const handleCapture = useCallback(() => {
    const dataUrl = captureViewportScreenshot();
    if (dataUrl) {
      setCapturedPreview(dataUrl);
      setScreenshotFile(null);
      toast.success("Viewport captured");
    } else {
      toast.error("No canvas found to capture");
    }
  }, []);

  const handleAnalyze = async () => {
    try {
      setIsAnalyzing(true);

      let screenshotDataUrl: string | undefined;

      // Priority: uploaded file > captured viewport
      if (screenshotFile) {
        if (screenshotFile.size > 20 * 1024 * 1024) {
          throw new Error("Screenshot is larger than 20MB.");
        }
        screenshotDataUrl = await fileToDataUrl(screenshotFile);
      } else if (capturedPreview) {
        screenshotDataUrl = capturedPreview;
      }

      const { data, error } = await supabase.functions.invoke("hull-shape-review", {
        body: {
          params,
          screenshotDataUrl,
          notes: notes.trim() || null,
          reference: {
            bowModelSummary:
              "evalBeamV2(u) produces half-beam at station u. u=0 stern, u=1 bow. Bow region uses superellipse: width = stemHalf + (halfBeam-stemHalf) * (1-t^n)^(1/n). Target is a Laser-class dinghy with smooth egg-shaped planform.",
            beamStationSample: stationSample,
          },
        },
      });

      if (error) throw new Error(error.message || "AI analysis failed");
      if (!data?.analysis) throw new Error("No analysis returned");

      setResult(data as HullShapeReviewResponse);
      toast.success("Hull shape analysis ready");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown analysis error";
      toast.error(message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Card className="border-border/80 bg-card/95">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          AI Shape Reviewer
        </CardTitle>
        <CardDescription className="text-xs">
          Captures viewport + sends beam code to Gemini 3.1 Pro for geometry diagnosis.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Capture / Upload */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={handleCapture}
          >
            <Camera className="mr-1.5 h-3.5 w-3.5" />
            Capture Viewport
          </Button>
        </div>

        {capturedPreview && !screenshotFile && (
          <div className="relative rounded border border-border overflow-hidden">
            <img
              src={capturedPreview}
              alt="Captured viewport"
              className="w-full h-auto max-h-32 object-contain bg-background"
            />
            <button
              onClick={() => setCapturedPreview(null)}
              className="absolute top-1 right-1 bg-background/80 rounded px-1.5 py-0.5 text-[10px] text-muted-foreground hover:text-foreground"
            >
              ✕
            </button>
          </div>
        )}

        <p className="text-[10px] text-muted-foreground">
          Or upload a screenshot manually:
        </p>
        <input
          type="file"
          accept="image/*"
          className="text-xs w-full"
          onChange={(e) => {
            setScreenshotFile(e.target.files?.[0] ?? null);
            if (e.target.files?.[0]) setCapturedPreview(null);
          }}
        />

        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="What looks wrong? (e.g. neck pinch near bow, shoulder bulge, etc.)"
          className="min-h-16 text-xs"
        />

        <Button
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          className="w-full"
          size="sm"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing…
            </>
          ) : (
            "Analyze with Gemini 3.1 Pro"
          )}
        </Button>

        {/* Station data preview */}
        <details className="text-[10px]">
          <summary className="text-muted-foreground cursor-pointer">
            Beam stations ({stationSample.length} samples)
          </summary>
          <pre className="mt-1 text-[9px] text-muted-foreground max-h-24 overflow-auto">
            {stationSample.map((s) => `u=${s.u.toFixed(2)} → ${s.halfBeam.toFixed(4)}`).join("\n")}
          </pre>
        </details>

        {/* Results */}
        {result && (
          <div className="space-y-2 rounded-md border border-border bg-background/40 p-3">
            <Badge variant="secondary" className="text-[10px]">{result.model}</Badge>
            <pre className="text-xs whitespace-pre-wrap text-foreground font-sans leading-relaxed max-h-[500px] overflow-auto">
              {result.analysis}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
