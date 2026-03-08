import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const GATEWAY_URL = "https://ai.gateway.lovable.dev/v1/chat/completions";
const ANALYSIS_MODEL = "google/gemini-3.1-pro-preview";
const PREPROCESS_MODEL = "google/gemini-2.5-flash";

type ContentPart =
  | { type: "text"; text: string }
  | { type: "image_url"; image_url: { url: string } };

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string | ContentPart[];
}

async function callGateway(apiKey: string, model: string, messages: ChatMessage[]) {
  const response = await fetch(GATEWAY_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ model, messages, temperature: 0.15 }),
  });

  const raw = await response.text();
  if (!response.ok) {
    const status = response.status;
    throw { status, body: raw };
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

// ── The actual evalBeamV2 source code sent as reference ──
const EVAL_BEAM_V2_SOURCE = `
// u=0 is STERN, u=1 is BOW
function evalBeamV2(u, params) {
  const { beam } = params.dimensions;
  const { sternWidth, maxBeamPos, sternBlend, interpolation } = params.beam;
  const { knifeWidth, taperPower, noseBluntness = 0.45 } = params.bow;

  const halfBeam = beam / 2;
  const uClamped = clamp(u, 0, 1);
  const stemHalf = clamp(knifeWidth / 2, 0.005, halfBeam * 0.25);

  if (uClamped <= maxBeamPos) {
    // Stern to max-beam region
    const t = clamp(uClamped / Math.max(1e-6, maxBeamPos), 0, 1);
    const blendNorm = clamp((sternBlend - 0.05) / 0.25, 0, 1);
    const sternShape = lerp(0.8, 2.4, blendNorm);
    const base = Math.pow(smootherstep(t), sternShape);
    const shaped = applyInterpolationStyle(base, interpolation);
    const factor = lerp(sternWidth, 1.0, shaped);
    return halfBeam * clamp(factor, sternWidth, 1.0);
  }

  // BOW region: Superellipse approach
  // t goes from 0 (at max-beam) to 1 (at bow tip)
  const bowSpan = Math.max(1e-6, 1 - maxBeamPos);
  const t = clamp((uClamped - maxBeamPos) / bowSpan, 0, 1);

  // Superellipse exponent
  const baseExp = lerp(1.6, 3.5, clamp(taperPower / 3, 0, 1));
  const n = lerp(baseExp, baseExp + 1.5, clamp(noseBluntness, 0, 1));

  // width fraction = (1 - t^n)^(1/n)
  const tPow = Math.pow(t, n);
  const ellipseFraction = Math.pow(Math.max(0, 1 - tPow), 1 / n);

  const width = stemHalf + (halfBeam - stemHalf) * ellipseFraction;
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

    if (!params) {
      return new Response(JSON.stringify({ error: "Missing hull params" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // ── Stage 1: Visual pre-pass (only if screenshot provided) ──
    let visualSummary = "No screenshot provided.";

    if (typeof screenshotDataUrl === "string" && screenshotDataUrl.startsWith("data:image")) {
      try {
        const prepResult = await callGateway(LOVABLE_API_KEY, PREPROCESS_MODEL, [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: [
                  "You are a sailing dinghy hull geometry inspector reviewing a TOP-DOWN planform screenshot.",
                  "Describe ONLY geometric issues you can see, in ≤6 bullets:",
                  "- Bow pointiness: too sharp, too blunt, asymmetric?",
                  "- Shoulder region: any shelf/bulge/flat-spot where the curve should be smooth?",
                  "- Neck pinch: does the hull narrow unnaturally before the bow tip?",
                  "- Overall outline: smooth egg-like curve or has kinks/inflection points?",
                  "- Width distribution: does max-beam position look correct?",
                  "- Stern shape: reasonable taper or too abrupt?",
                  "Be precise about WHERE on the outline each issue occurs (fore/aft, how far from bow tip).",
                ].join("\n"),
              },
              { type: "image_url", image_url: { url: screenshotDataUrl } },
            ],
          },
        ]);

        const extracted = extractText(prepResult);
        if (extracted) visualSummary = extracted;
      } catch (err: any) {
        visualSummary = `Screenshot pre-pass failed: ${err?.body || err?.message || "unknown"}`;
      }
    }

    // ── Stage 2: Deep math + visual analysis ──
    const analysisPrompt = [
      "You are a naval hull geometry debugger specializing in parametric dinghy hulls.",
      "",
      "## YOUR TASK",
      "Diagnose why the bow planform (top-view silhouette) deviates from a Laser-class dinghy reference,",
      "and provide EXACT code-level fixes to the evalBeamV2 function or its parameters.",
      "",
      "## REFERENCE: What a correct Laser top-view looks like",
      "- Smooth, continuous egg-shaped outline with no shelves, neck pinches, or flat spots",
      "- Max beam around 50% of length from transom",
      "- Bow tapers in a single fair curve from max-beam to a 6cm-wide stem",
      "- The curve is slightly fuller (rounder) than a pure ellipse — more like a superellipse with n≈2.5",
      "- No inflection points between max-beam and bow tip",
      "- The transition from stern-width to max-beam is gentle and smooth",
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
      "## SAMPLED BEAM STATIONS (21 samples, u=0 stern to u=1 bow)",
      "```json",
      JSON.stringify(reference?.beamStationSample ?? [], null, 2),
      "```",
      "",
      "## SCREENSHOT ANALYSIS (from visual pre-pass)",
      visualSummary,
      "",
      `## USER NOTES: ${typeof notes === "string" && notes ? notes : "(none)"}`,
      "",
      "## REQUIRED OUTPUT FORMAT",
      "Return plain text with these exact sections:",
      "",
      "### 1. VISUAL DIAGNOSIS",
      "What's wrong with the shape based on the screenshot and station data.",
      "",
      "### 2. MATHEMATICAL DIAGNOSIS",
      "Trace through the evalBeamV2 code with the current params to find where the math produces the defect.",
      "Show actual computed values at key stations.",
      "",
      "### 3. CODE FIX",
      "Provide the EXACT modified evalBeamV2 function or parameter values that fix the issue.",
      "If the equation structure is wrong, provide the corrected equation.",
      "If parameters are wrong, provide exact new values with reasoning.",
      "",
      "### 4. VALIDATION",
      "List 5 station values (u, expected halfBeam) that the fix should produce.",
      "",
      "RULES:",
      "- Be surgically precise. No vague suggestions.",
      "- Every code change must be copy-paste ready.",
      "- If the superellipse approach is fundamentally wrong, say so and provide an alternative equation.",
      "- Focus ONLY on top-view planform (beam curve). Ignore side/front views.",
    ].join("\n");

    const analysisResult = await callGateway(LOVABLE_API_KEY, ANALYSIS_MODEL, [
      {
        role: "system",
        content:
          "You are an expert computational geometry debugger. You trace through code with actual numeric values to find bugs. You never give vague advice — only precise equations and parameter values.",
      },
      { role: "user", content: analysisPrompt },
    ]);

    const analysis = extractText(analysisResult);

    if (!analysis) {
      return new Response(JSON.stringify({ error: "No analysis generated" }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({
        analysis,
        visualSummary,
        model: ANALYSIS_MODEL,
        preprocessorModel: PREPROCESS_MODEL,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    const status = err?.status;
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
