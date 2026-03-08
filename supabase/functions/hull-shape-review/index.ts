import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const GATEWAY_URL = "https://ai.gateway.lovable.dev/v1/chat/completions";
const ANALYSIS_MODEL = "google/gemini-3.1-pro-preview";
const PREPROCESS_MODEL = "google/gemini-2.5-flash-image";

class GatewayError extends Error {
  status: number;
  body: string;

  constructor(status: number, body: string) {
    super(`Gateway request failed (${status})`);
    this.status = status;
    this.body = body;
  }
}

type MessageContentPart =
  | { type: "text"; text: string }
  | { type: "image_url"; image_url: { url: string } };

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string | MessageContentPart[];
}

async function callGateway(apiKey: string, model: string, messages: ChatMessage[]) {
  const response = await fetch(GATEWAY_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.2,
    }),
  });

  const raw = await response.text();
  if (!response.ok) {
    throw new GatewayError(response.status, raw);
  }

  return JSON.parse(raw);
}

function extractMessageText(payload: any): string {
  const content = payload?.choices?.[0]?.message?.content;

  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content
      .map((part) => (typeof part?.text === "string" ? part.text : ""))
      .join("\n")
      .trim();
  }

  return "";
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const body = await req.json();
    const { params, screenshotDataUrl, notes, reference } = body ?? {};

    if (!params) {
      return new Response(JSON.stringify({ error: "Missing hull params" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let visualSummary = "No screenshot provided.";

    if (typeof screenshotDataUrl === "string" && screenshotDataUrl.startsWith("data:image")) {
      try {
        const preprocessPayload = await callGateway(LOVABLE_API_KEY, PREPROCESS_MODEL, [
          {
            role: "user",
            content: [
              {
                type: "text",
                text:
                  "You are reviewing a dinghy top-view screenshot. Describe only observable geometric issues in 6 bullets max: bow pointiness, shoulder bulges, neck pinch, asymmetry, fairing continuity.",
              },
              { type: "image_url", image_url: { url: screenshotDataUrl } },
            ],
          },
        ]);

        const extracted = extractMessageText(preprocessPayload);
        if (extracted) {
          visualSummary = extracted;
        }
      } catch (error) {
        visualSummary = `Screenshot pre-pass unavailable: ${error instanceof Error ? error.message : "unknown error"}`;
      }
    }

    const analysisPrompt = [
      "You are a naval-hull geometry reviewer.",
      "Goal: diagnose why bow silhouette fails and propose strict, minimal code-level geometry corrections.",
      "",
      "Return plain text with these sections:",
      "1) Visual diagnosis",
      "2) Math diagnosis",
      "3) Concrete code edits (equation-level)",
      "4) Parameter constraints",
      "5) Fast validation checklist",
      "",
      "Rules:",
      "- Be direct and technical.",
      "- Do NOT suggest generic slider tweaking without equation changes.",
      "- Focus on top-view silhouette only.",
      "- Assume target class is Laser-like with rounded, fair bow entry.",
      "",
      "Current screenshot diagnosis:",
      visualSummary,
      "",
      "Code reference summary:",
      JSON.stringify(reference ?? {}, null, 2),
      "",
      "Current hull params:",
      JSON.stringify(params, null, 2),
      "",
      `User notes: ${typeof notes === "string" ? notes : "(none)"}`,
    ].join("\n");

    const analysisPayload = await callGateway(LOVABLE_API_KEY, ANALYSIS_MODEL, [
      {
        role: "system",
        content: "You are a precise geometry debugger for hull planform equations.",
      },
      {
        role: "user",
        content: analysisPrompt,
      },
    ]);

    const analysis = extractMessageText(analysisPayload);

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
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    if (error instanceof GatewayError) {
      const status = error.status;
      const passThroughStatus = status === 402 || status === 429 ? status : 500;
      return new Response(
        JSON.stringify({
          error:
            passThroughStatus === 429
              ? "Rate limits exceeded, please retry shortly."
              : passThroughStatus === 402
                ? "AI usage credits are required to continue."
                : `AI gateway error: ${error.body}`,
        }),
        {
          status: passThroughStatus,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown server error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
