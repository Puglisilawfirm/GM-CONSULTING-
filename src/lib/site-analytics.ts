import {
  normalizeSiteAnalyticsPath,
  normalizeSiteAnalyticsTarget,
  type SiteAnalyticsEventName,
  type SiteAnalyticsTarget,
} from "../../supabase/functions/_shared/siteAnalyticsContract"
import { getCookieConsent } from "@/lib/cookie-consent"

export interface SiteAnalyticsEvent {
  eventName: SiteAnalyticsEventName
  pagePath?: string
  target?: SiteAnalyticsTarget
}

const SESSION_KEY = "gm_site_analytics_session"
const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

const isEnabled =
  process.env.NEXT_PUBLIC_SITE_ANALYTICS_ENABLED?.toLowerCase() === "true"
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "")
const supabasePublishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

export const hasSiteAnalyticsPermission = (): boolean =>
  Boolean(
    isEnabled &&
      supabaseUrl &&
      supabasePublishableKey &&
      getCookieConsent()?.analytics === true,
  )

const getSessionId = (): string => {
  const existing = window.sessionStorage.getItem(SESSION_KEY)
  if (existing && UUID_PATTERN.test(existing)) return existing

  const sessionId = crypto.randomUUID()
  window.sessionStorage.setItem(SESSION_KEY, sessionId)
  return sessionId
}

export const clearSiteAnalyticsSession = (): void => {
  if (typeof window === "undefined") return
  window.sessionStorage.removeItem(SESSION_KEY)
}

export const trackSiteEvent = async (
  event: SiteAnalyticsEvent,
): Promise<boolean> => {
  if (typeof window === "undefined" || !hasSiteAnalyticsPermission()) {
    return false
  }

  const pagePath = normalizeSiteAnalyticsPath(
    event.pagePath ?? window.location.pathname,
  )
  if (!pagePath) return false

  const target = event.target
    ? normalizeSiteAnalyticsTarget(event.target)
    : undefined
  if (event.target && !target) return false
  if (event.eventName === "page_view" && target) return false
  if (event.eventName !== "page_view" && !target) return false

  try {
    const response = await fetch(`${supabaseUrl}/functions/v1/site-analytics`, {
      method: "POST",
      headers: {
        apikey: supabasePublishableKey!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventName: event.eventName,
        pagePath,
        language: "it",
        sessionId: getSessionId(),
        target: target ?? null,
      }),
      keepalive: true,
    })

    return response.ok
  } catch {
    // Measurement must never interrupt navigation or form delivery.
    return false
  }
}
