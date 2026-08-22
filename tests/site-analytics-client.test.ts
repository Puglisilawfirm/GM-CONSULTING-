import assert from "node:assert/strict"
import { afterEach, before, beforeEach, describe, it } from "node:test"
import { COOKIE_CONSENT_VERSION } from "../src/lib/cookie-consent"

// The module reads its env configuration at load time, so the variables
// must be in place before the (lazy) import below runs.
process.env.NEXT_PUBLIC_SITE_ANALYTICS_ENABLED = "true"
process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co/"
process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = "publishable-key"

let siteAnalytics: typeof import("../src/lib/site-analytics")

const SESSION_KEY = "gm_site_analytics_session"
const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

interface FetchCall {
  url: string
  init: RequestInit
}

interface MinimalDocument {
  cookie: string
}

interface MinimalWindow {
  location: { pathname: string }
  sessionStorage: {
    getItem(key: string): string | null
    setItem(key: string, value: string): void
    removeItem(key: string): void
  }
}

const globalRef = globalThis as unknown as {
  document?: MinimalDocument
  window?: MinimalWindow
}

const consentCookie = (analytics: boolean): string => {
  const value = encodeURIComponent(
    JSON.stringify({
      technical: true,
      analytics,
      profiling: false,
      timestamp: Date.now() - 1_000,
      version: COOKIE_CONSENT_VERSION,
    }),
  )
  return `GM_COOKIE_CONSENT=${value}`
}

const installBrowser = (options: { analyticsConsent: boolean }) => {
  const storage = new Map<string, string>()

  globalRef.document = { cookie: consentCookie(options.analyticsConsent) }
  globalRef.window = {
    location: { pathname: "/assessment" },
    sessionStorage: {
      getItem: (key: string) => storage.get(key) ?? null,
      setItem: (key: string, value: string) => {
        storage.set(key, value)
      },
      removeItem: (key: string) => {
        storage.delete(key)
      },
    },
  }

  return storage
}

const removeBrowser = () => {
  delete globalRef.document
  delete globalRef.window
}

const stubFetch = (
  impl: () => Promise<Response>,
): FetchCall[] => {
  const calls: FetchCall[] = []
  globalThis.fetch = ((url: string, init: RequestInit) => {
    calls.push({ url, init })
    return impl()
  }) as typeof fetch
  return calls
}

const originalFetch = globalThis.fetch

describe("site analytics client", () => {
  before(async () => {
    siteAnalytics = await import("../src/lib/site-analytics")
  })

  afterEach(() => {
    removeBrowser()
    globalThis.fetch = originalFetch
  })

  describe("hasSiteAnalyticsPermission", () => {
    it("is true only with analytics consent", () => {
      installBrowser({ analyticsConsent: true })
      assert.equal(siteAnalytics.hasSiteAnalyticsPermission(), true)
    })

    it("is false when the visitor refused analytics", () => {
      installBrowser({ analyticsConsent: false })
      assert.equal(siteAnalytics.hasSiteAnalyticsPermission(), false)
    })

    it("is false without any consent cookie", () => {
      installBrowser({ analyticsConsent: true })
      globalRef.document = { cookie: "" }
      assert.equal(siteAnalytics.hasSiteAnalyticsPermission(), false)
    })
  })

  describe("trackSiteEvent", () => {
    let storage: Map<string, string>

    beforeEach(() => {
      storage = installBrowser({ analyticsConsent: true })
    })

    it("sends a page_view with a generated session id and no trailing slash in URL", async () => {
      const calls = stubFetch(async () => new Response(null, { status: 202 }))

      const ok = await siteAnalytics.trackSiteEvent({ eventName: "page_view" })

      assert.equal(ok, true)
      assert.equal(calls.length, 1)
      assert.equal(
        calls[0].url,
        "https://example.supabase.co/functions/v1/site-analytics",
      )
      const body = JSON.parse(String(calls[0].init.body))
      assert.equal(body.eventName, "page_view")
      assert.equal(body.pagePath, "/assessment")
      assert.equal(body.language, "it")
      assert.equal(body.target, null)
      assert.match(body.sessionId, UUID_PATTERN)
      assert.equal(storage.get(SESSION_KEY), body.sessionId)

      const headers = calls[0].init.headers as Record<string, string>
      assert.equal(headers.apikey, "publishable-key")
    })

    it("reuses a valid stored session id", async () => {
      const existing = "5b2de614-aab4-4f9f-a8d3-cf3e88e57af2"
      storage.set(SESSION_KEY, existing)
      const calls = stubFetch(async () => new Response(null, { status: 202 }))

      await siteAnalytics.trackSiteEvent({ eventName: "page_view" })

      const body = JSON.parse(String(calls[0].init.body))
      assert.equal(body.sessionId, existing)
    })

    it("replaces a malformed stored session id", async () => {
      storage.set(SESSION_KEY, "not-a-uuid")
      const calls = stubFetch(async () => new Response(null, { status: 202 }))

      await siteAnalytics.trackSiteEvent({ eventName: "page_view" })

      const body = JSON.parse(String(calls[0].init.body))
      assert.notEqual(body.sessionId, "not-a-uuid")
      assert.match(body.sessionId, UUID_PATTERN)
    })

    it("normalizes explicit page paths with query and fragment", async () => {
      const calls = stubFetch(async () => new Response(null, { status: 202 }))

      await siteAnalytics.trackSiteEvent({
        eventName: "page_view",
        pagePath: "/metodo?utm_source=mail#sezione",
      })

      const body = JSON.parse(String(calls[0].init.body))
      assert.equal(body.pagePath, "/metodo")
    })

    it("does not send events without analytics consent", async () => {
      globalRef.document = { cookie: consentCookie(false) }
      const calls = stubFetch(async () => new Response(null, { status: 202 }))

      assert.equal(await siteAnalytics.trackSiteEvent({ eventName: "page_view" }), false)
      assert.equal(calls.length, 0)
    })

    it("does not send events for unpublished paths", async () => {
      const calls = stubFetch(async () => new Response(null, { status: 202 }))

      assert.equal(
        await siteAnalytics.trackSiteEvent({
          eventName: "page_view",
          pagePath: "/assessment/inviato",
        }),
        false,
      )
      assert.equal(calls.length, 0)
    })

    it("rejects a page_view carrying a target", async () => {
      const calls = stubFetch(async () => new Response(null, { status: 202 }))

      assert.equal(
        await siteAnalytics.trackSiteEvent({ eventName: "page_view", target: "assessment" }),
        false,
      )
      assert.equal(calls.length, 0)
    })

    it("rejects a cta_click without target", async () => {
      const calls = stubFetch(async () => new Response(null, { status: 202 }))

      assert.equal(await siteAnalytics.trackSiteEvent({ eventName: "cta_click" }), false)
      assert.equal(calls.length, 0)
    })

    it("sends a cta_click with a valid target", async () => {
      const calls = stubFetch(async () => new Response(null, { status: 202 }))

      assert.equal(
        await siteAnalytics.trackSiteEvent({ eventName: "cta_click", target: "assessment" }),
        true,
      )
      const body = JSON.parse(String(calls[0].init.body))
      assert.equal(body.target, "assessment")
    })

    it("returns false on a non-ok response", async () => {
      stubFetch(async () => new Response(null, { status: 429 }))
      assert.equal(await siteAnalytics.trackSiteEvent({ eventName: "page_view" }), false)
    })

    it("returns false when fetch throws and never propagates the error", async () => {
      stubFetch(async () => {
        throw new Error("network down")
      })
      assert.equal(await siteAnalytics.trackSiteEvent({ eventName: "page_view" }), false)
    })
  })

  describe("clearSiteAnalyticsSession", () => {
    it("removes the stored session id", () => {
      const storage = installBrowser({ analyticsConsent: true })
      storage.set(SESSION_KEY, "5b2de614-aab4-4f9f-a8d3-cf3e88e57af2")
      siteAnalytics.clearSiteAnalyticsSession()
      assert.equal(storage.has(SESSION_KEY), false)
    })

    it("is a no-op without a window", () => {
      removeBrowser()
      assert.doesNotThrow(() => siteAnalytics.clearSiteAnalyticsSession())
    })
  })
})
