import { useMemo, useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";
import { HullV2Params } from "@/lib/parametric/v2/types";
import { evalBeamV2 } from "@/lib/parametric/v2/curves";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface HullShapeAssistantProps {
  params: HullV2Params;
}

interface HullShapeReviewResponse {
  analysis: string;
  visualSummary?: string;
  model: string;
  preprocessorModel?: string;
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

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Failed to read screenshot file"));
    reader.readAsDataURL(file);
  });
}

export function HullShapeAssistant({ params }: HullShapeAssistantProps) {
  const [notes, setNotes] = useState("");
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<HullShapeReviewResponse | null>(null);

  const stationSample = useMemo(() => sampleBeamStations(params), [params]);

  const handleAnalyze = async () => {
    try {
      setIsAnalyzing(true);

      let screenshotDataUrl: string | undefined;
      if (screenshotFile) {
        if (screenshotFile.size > 20 * 1024 * 1024) {
          throw new Error("Screenshot is larger than 20MB.");
        }
        screenshotDataUrl = await fileToDataUrl(screenshotFile);
      }

      const { data, error } = await supabase.functions.invoke("hull-shape-review", {
        body: {
          params,
          screenshotDataUrl,
          notes: notes.trim() || null,
          reference: {
            bowModelSummary:
              "Top-view beam is produced by evalBeamV2(u). Stern-to-max-beam follows interpolation, bow should remain a single fair curve without shoulder shelves or neck pinch.",
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
          Sends screenshot + bow code context to a multimodal review pass.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-1.5">
          <p className="text-xs text-muted-foreground">Hull screenshot (optional)</p>
          <Input
            type="file"
            accept="image/*"
            onChange={(event) => setScreenshotFile(event.target.files?.[0] ?? null)}
          />
        </div>

        <Textarea
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          placeholder="What looks wrong? (e.g. neck pinch near bow, shoulder bulge, etc.)"
          className="min-h-20 text-xs"
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
              Analyzing...
            </>
          ) : (
            "Analyze with Gemini 3.1 Pro"
          )}
        </Button>

        {result && (
          <div className="space-y-2 rounded-md border border-border bg-background/40 p-3">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="text-[10px]">{result.model}</Badge>
              {result.preprocessorModel && (
                <Badge variant="outline" className="text-[10px]">prep: {result.preprocessorModel}</Badge>
              )}
            </div>
            {result.visualSummary && (
              <p className="text-xs text-muted-foreground whitespace-pre-wrap">{result.visualSummary}</p>
            )}
            <pre className="text-xs whitespace-pre-wrap text-foreground font-sans leading-relaxed">
              {result.analysis}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
