import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { withSupabase } from "npm:@supabase/server@1.4.1"
import { parseSiteAnalyticsPayload } from "./siteAnalyticsPayload.ts"

const allowedOrigins = new Set(
  (Deno.env.get("SITE_ANALYTICS_ALLOWED_ORIGINS") ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean),
)

const corsHeaders = (origin: string) => ({
  "Access-Control-Allow-Origin": origin,
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json",
  Vary: "Origin",
})

const json = (
  origin: string,
  status: number,
  body: Record<string, unknown>,
) => new Response(JSON.stringify(body), { status, headers: corsHeaders(origin) })

export default {
  fetch: withSupabase({ auth: "publishable" }, async (request, context) => {
    const origin = request.headers.get("Origin") ?? ""
    if (!origin || !allowedOrigins.has(origin)) {
      return new Response(
        JSON.stringify({ error: "Request origin is not allowed." }),
        {
          status: 403,
          headers: { "Content-Type": "application/json", Vary: "Origin" },
        },
      )
    }

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(origin) })
    }
    if (request.method !== "POST") {
      return json(origin, 405, { error: "Method not allowed." })
    }

    let input: Record<string, unknown>
    try {
      const rawBody = await request.text()
      if (new TextEncoder().encode(rawBody).byteLength > 2_048) {
        return json(origin, 413, { error: "Request too large." })
      }
      input = JSON.parse(rawBody)
      if (!input || Array.isArray(input) || typeof input !== "object") {
        throw new Error("Invalid body")
      }
    } catch {
      return json(origin, 400, { error: "Invalid request." })
    }

    const payload = parseSiteAnalyticsPayload(input)
    if (!payload) return json(origin, 400, { error: "Invalid request." })

    const { error } = await context.supabaseAdmin.rpc("record_site_event", {
      p_event_name: payload.eventName,
      p_page_path: payload.pagePath,
      p_language: payload.language,
      p_session_id: payload.sessionId,
      p_target: payload.target,
    })

    if (error) {
      console.error("site-analytics request failed", {
        code: error.code ?? "unknown",
      })
      return json(origin, error.code === "P0001" ? 429 : 400, {
        error: "Unable to record event.",
      })
    }

    return json(origin, 202, { accepted: true })
  }),
}
