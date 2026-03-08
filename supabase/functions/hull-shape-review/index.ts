import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const GATEWAY_URL = "https://ai.gateway.lovable.dev/v1/chat/completions";
const ANALYSIS_MODEL = "google/gemini-3-flash-preview";

type ContentPart =
  | { type: "text"; text: string }
  | { type: "image_url"; image_url: { url: string } };

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string | ContentPart[];
}

async function callGateway(apiKey: string, model: string, messages: ChatMessage[]) {
  console.log(`[hull-review] calling ${model}...`);
  const start = Date.now();
  const response = await fetch(GATEWAY_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ model, messages, temperature: 0.15 }),
  });

  const raw = await response.text();
  console.log(`[hull-review] ${model} responded in ${Date.now() - start}ms, status=${response.status}`);
  if (!response.ok) {
    console.error(`[hull-review] ${model} error body:`, raw.slice(0, 500));
    throw { status: response.status, body: raw };
  }
  return JSON.parse(raw);
}

function extractText(payload: any): string {
  const c = payload?.choices?.[0]?.message?.content;
  if (typeof c === "string") return c;
  if (Array.isArray(c))
    return c.map((p: any) => (typeof p?.text === "string" ? p.text : "")).join("\n").trim();
  return "";
}

const EVAL_BEAM_V2_SOURCE = `
// u=0 is STERN, u=1 is BOW
function evalBeamV2(u, params) {
  const { beam } = params.dimensions;
  const { sternWidth, maxBeamPos, sternBlend, interpolation } = params.beam;
  const { knifeWidth, taperPower, noseBluntness = 0.25 } = params.bow;

  const halfBeam = beam / 2;
  const uClamped = clamp(u, 0, 1);
  const stemHalf = clamp(knifeWidth / 2, 0.005, halfBeam * 0.25);

  if (uClamped <= maxBeamPos) {
    const t = clamp(uClamped / Math.max(1e-6, maxBeamPos), 0, 1);
    const blendNorm = clamp((sternBlend - 0.05) / 0.25, 0, 1);
    const sternShape = lerp(0.8, 2.4, blendNorm);
    const base = Math.pow(smootherstep(t), sternShape);
    const shaped = applyInterpolationStyle(base, interpolation);
    const factor = lerp(sternWidth, 1.0, shaped);
    return halfBeam * clamp(factor, sternWidth, 1.0);
  }

  // BOW region: Laser-class superellipse
  const bowSpan = Math.max(1e-6, 1 - maxBeamPos);
  const t = clamp((uClamped - maxBeamPos) / bowSpan, 0, 1);
  const n = lerp(2.0, 2.6, clamp(taperPower / 3, 0, 1));
  const ellipseFraction = Math.pow(Math.max(0, 1 - Math.pow(t, n)), 1 / n);
  const smoothT = lerp(ellipseFraction, 1 - t, clamp(noseBluntness, 0, 1) * 0.5);
  const width = stemHalf + (halfBeam - stemHalf) * smoothT;
  return Math.max(stemHalf, width);
}
`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const body = await req.json();
    const { params, screenshotDataUrl, notes, reference } = body ?? {};
    console.log(`[hull-review] request received. hasScreenshot=${!!screenshotDataUrl}, hasNotes=${!!notes}`);

    if (!params) {
      return new Response(JSON.stringify({ error: "Missing hull params" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // ── Single-stage analysis with optional image inline ──
    const userContent: ContentPart[] = [];

    // Add screenshot if provided
    let hasImage = false;
    if (typeof screenshotDataUrl === "string" && screenshotDataUrl.startsWith("data:image")) {
      userContent.push({ type: "image_url", image_url: { url: screenshotDataUrl } });
      hasImage = true;
    }

    const analysisPrompt = [
      "You are a naval hull geometry debugger specializing in parametric dinghy hulls.",
      "",
      hasImage
        ? "## SCREENSHOT\nA top-down planform screenshot is attached. Analyze the visual shape for defects."
        : "## NO SCREENSHOT PROVIDED\nAnalyze the beam station data and code only.",
      "",
      "## YOUR TASK",
      "Diagnose why the bow planform deviates from a Laser-class dinghy reference,",
      "and provide EXACT code-level fixes.",
      "",
      "## REFERENCE: Correct Laser top-view",
      "- Smooth egg-shaped outline, no shelves/neck pinches/flat spots",
      "- Max beam ~50% from transom, bow tapers in single fair curve to 6cm stem",
      "- Slightly fuller than pure ellipse (~superellipse n≈2.5)",
      "- No inflection points between max-beam and bow tip",
      "",
      "## SOURCE CODE: evalBeamV2",
      "```javascript",
      EVAL_BEAM_V2_SOURCE,
      "```",
      "",
      "## CURRENT PARAMETERS",
      "```json",
      JSON.stringify(params, null, 2),
      "```",
      "",
      "## BEAM STATIONS (u=0 stern, u=1 bow)",
      "```json",
      JSON.stringify(reference?.beamStationSample ?? [], null, 2),
      "```",
      "",
      `## USER NOTES: ${typeof notes === "string" && notes ? notes : "(none)"}`,
      "",
      "## OUTPUT (plain text, these exact sections):",
      "### 1. VISUAL DIAGNOSIS - What's wrong with the shape",
      "### 2. MATHEMATICAL DIAGNOSIS - Trace evalBeamV2 with current params, show computed values at key stations",
      "### 3. CODE FIX - EXACT modified code or parameter values (copy-paste ready)",
      "### 4. VALIDATION - 5 station values the fix should produce",
      "",
      "RULES: Be surgically precise. Every code change must be copy-paste ready.",
    ].join("\n");

    userContent.push({ type: "text", text: analysisPrompt });

    const analysisResult = await callGateway(LOVABLE_API_KEY, ANALYSIS_MODEL, [
      {
        role: "system",
        content:
          "You are an expert computational geometry debugger. You trace through code with actual numeric values to find bugs. You never give vague advice — only precise equations and parameter values.",
      },
      { role: "user", content: userContent },
    ]);

    const analysis = extractText(analysisResult);
    console.log(`[hull-review] analysis length: ${analysis.length} chars`);

    if (!analysis) {
      return new Response(JSON.stringify({ error: "No analysis generated" }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({
        analysis,
        model: ANALYSIS_MODEL,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    const status = err?.status;
    console.error(`[hull-review] error:`, err?.message || err?.body?.slice?.(0, 300) || err);
    if (status === 429 || status === 402) {
      return new Response(
        JSON.stringify({
          error: status === 429
            ? "Rate limits exceeded, please retry shortly."
            : "AI usage credits are required to continue.",
        }),
        { status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        error: err instanceof Error ? err.message : err?.body || "Unknown server error",
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
