import assert from "node:assert/strict"
import { describe, it } from "node:test"
import {
  isAllowedSiteAnalyticsPath,
  normalizeSiteAnalyticsPath,
  normalizeSiteAnalyticsTarget,
} from "../supabase/functions/_shared/siteAnalyticsContract"
import { parseSiteAnalyticsPayload } from "../supabase/functions/site-analytics/siteAnalyticsPayload"
import {
  COOKIE_CONSENT_VERSION,
  parseCookieConsentValue,
} from "../src/lib/cookie-consent"

const validPayload = {
  eventName: "page_view",
  pagePath: "/assessment",
  language: "it",
  sessionId: "5b2de614-aab4-4f9f-a8d3-cf3e88e57af2",
  target: null,
}

describe("site analytics route and payload contract", () => {
  it("allows only published, non-sensitive paths", () => {
    assert.equal(isAllowedSiteAnalyticsPath("/assessment"), true)
    assert.equal(
      normalizeSiteAnalyticsPath("assessment?source=mail#form"),
      "/assessment",
    )
    assert.equal(normalizeSiteAnalyticsPath("/john@example.invalid"), undefined)
    assert.equal(normalizeSiteAnalyticsPath("/assessment/inviato"), undefined)
    assert.equal(normalizeSiteAnalyticsPath("/_debug/logo"), undefined)
  })

  it("allows only fixed target labels", () => {
    assert.equal(normalizeSiteAnalyticsTarget(" Assessment "), "assessment")
    assert.equal(normalizeSiteAnalyticsTarget("contact Maria"), undefined)
  })

  it("accepts the minimized event contract", () => {
    assert.deepEqual(parseSiteAnalyticsPayload(validPayload), validPayload)
    assert.notEqual(
      parseSiteAnalyticsPayload({
        ...validPayload,
        eventName: "lead_submit",
        target: "assessment",
      }),
      null,
    )
  })

  it("rejects personal, unexpected or unbounded fields", () => {
    assert.equal(
      parseSiteAnalyticsPayload({
        ...validPayload,
        email: "user@example.invalid",
      }),
      null,
    )
    assert.equal(
      parseSiteAnalyticsPayload({
        ...validPayload,
        referrer: "https://example.com/private",
      }),
      null,
    )
    assert.equal(
      parseSiteAnalyticsPayload({
        ...validPayload,
        pagePath: "/assessment?email=x",
      }),
      null,
    )
    assert.equal(
      parseSiteAnalyticsPayload({ ...validPayload, target: "assessment" }),
      null,
    )
    assert.equal(
      parseSiteAnalyticsPayload({
        ...validPayload,
        eventName: "lead_submit",
        target: "insights",
      }),
      null,
    )
    assert.equal(
      parseSiteAnalyticsPayload({
        ...validPayload,
        eventName: "lead_submit",
        pagePath: "/protocollo-23",
        target: "assessment",
      }),
      null,
    )
  })
})

describe("cookie consent parser", () => {
  const now = Date.UTC(2026, 7, 1, 12)

  it("accepts a current, versioned and explicit preference", () => {
    const raw = JSON.stringify({
      technical: true,
      analytics: true,
      profiling: false,
      timestamp: now - 1_000,
      version: COOKIE_CONSENT_VERSION,
    })
    assert.equal(parseCookieConsentValue(raw, now)?.analytics, true)
  })

  it("rejects expired, future, malformed and old-version preferences", () => {
    const base = {
      technical: true,
      analytics: false,
      profiling: false,
      timestamp: now,
      version: COOKIE_CONSENT_VERSION,
    }
    const sixMonths = 15_778_800 * 1_000

    assert.equal(
      parseCookieConsentValue(
        JSON.stringify({ ...base, timestamp: now - sixMonths }),
        now,
      ),
      null,
    )
    assert.equal(
      parseCookieConsentValue(
        JSON.stringify({ ...base, timestamp: now + 1 }),
        now,
      ),
      null,
    )
    assert.equal(
      parseCookieConsentValue(
        JSON.stringify({ ...base, analytics: "yes" }),
        now,
      ),
      null,
    )
    assert.equal(
      parseCookieConsentValue(
        JSON.stringify({ ...base, version: "1.0" }),
        now,
      ),
      null,
    )
  })
})
