import assert from "node:assert/strict"
import { afterEach, beforeEach, describe, it } from "node:test"
import {
  COOKIE_CONSENT_CHANGED_EVENT,
  COOKIE_CONSENT_VERSION,
  getCookieConsent,
  hasConsentExpired,
  setCookieConsent,
  shouldShowBanner,
  type CookieConsent,
} from "../src/lib/cookie-consent"

const SIX_MONTHS_MS = 15_778_800 * 1_000

interface DispatchedEvent {
  type: string
  detail: unknown
}

interface FakeBrowser {
  cookie: string
  protocol: string
  dispatched: DispatchedEvent[]
}

interface MinimalDocument {
  cookie: string
}

interface MinimalWindow {
  location: { readonly protocol: string }
  dispatchEvent(event: DispatchedEvent): boolean
}

const globalRef = globalThis as unknown as {
  document?: MinimalDocument
  window?: MinimalWindow
  CustomEvent?: new (
    type: string,
    init?: { detail?: unknown },
  ) => DispatchedEvent
}

const installBrowser = (): FakeBrowser => {
  const state: FakeBrowser = { cookie: "", protocol: "https:", dispatched: [] }

  globalRef.document = {
    get cookie() {
      return state.cookie
    },
    set cookie(value: string) {
      state.cookie = value
    },
  }
  globalRef.CustomEvent = class {
    type: string
    detail: unknown
    constructor(type: string, init?: { detail?: unknown }) {
      this.type = type
      this.detail = init?.detail
    }
  }
  globalRef.window = {
    location: {
      get protocol() {
        return state.protocol
      },
    },
    dispatchEvent(event: DispatchedEvent) {
      state.dispatched.push({ type: event.type, detail: event.detail })
      return true
    },
  }

  return state
}

const removeBrowser = () => {
  delete globalRef.document
  delete globalRef.window
  delete globalRef.CustomEvent
}

const validConsentValue = (
  overrides: Partial<CookieConsent> = {},
): string => {
  const consent: CookieConsent = {
    technical: true,
    analytics: true,
    profiling: false,
    timestamp: Date.now() - 1_000,
    version: COOKIE_CONSENT_VERSION,
    ...overrides,
  }
  return encodeURIComponent(JSON.stringify(consent))
}

describe("cookie consent browser helpers", () => {
  let browser: FakeBrowser

  beforeEach(() => {
    browser = installBrowser()
  })

  afterEach(() => {
    removeBrowser()
  })

  describe("getCookieConsent", () => {
    it("reads and decodes the consent cookie among other cookies", () => {
      browser.cookie = `other=1; GM_COOKIE_CONSENT=${validConsentValue()}; last=x`
      const consent = getCookieConsent()
      assert.equal(consent?.analytics, true)
      assert.equal(consent?.profiling, false)
      assert.equal(consent?.version, COOKIE_CONSENT_VERSION)
    })

    it("returns null when the cookie is missing", () => {
      browser.cookie = "other=1"
      assert.equal(getCookieConsent(), null)
    })

    it("returns null when the cookie value cannot be decoded", () => {
      browser.cookie = "GM_COOKIE_CONSENT=%E0%A4%A"
      assert.equal(getCookieConsent(), null)
    })

    it("returns null when the cookie holds invalid JSON", () => {
      browser.cookie = "GM_COOKIE_CONSENT=not-json"
      assert.equal(getCookieConsent(), null)
    })

    it("keeps values containing an equals sign intact", () => {
      const value = validConsentValue()
      browser.cookie = `GM_COOKIE_CONSENT=${value}`
      assert.notEqual(getCookieConsent(), null)
    })
  })

  describe("setCookieConsent", () => {
    it("writes a versioned cookie with Secure on https and emits the change event", () => {
      setCookieConsent({ analytics: true, profiling: false })

      assert.match(browser.cookie, /^GM_COOKIE_CONSENT=/)
      assert.match(browser.cookie, /max-age=15778800/)
      assert.match(browser.cookie, /path=\//)
      assert.match(browser.cookie, /SameSite=Lax/)
      assert.match(browser.cookie, /; Secure/)

      assert.equal(browser.dispatched.length, 1)
      assert.equal(browser.dispatched[0].type, COOKIE_CONSENT_CHANGED_EVENT)
      const detail = browser.dispatched[0].detail as CookieConsent
      assert.equal(detail.technical, true)
      assert.equal(detail.analytics, true)
      assert.equal(detail.profiling, false)
      assert.equal(detail.version, COOKIE_CONSENT_VERSION)
    })

    it("omits the Secure attribute on http", () => {
      browser.protocol = "http:"
      setCookieConsent({ analytics: false, profiling: true })
      assert.doesNotMatch(browser.cookie, /Secure/)
    })

    it("round-trips through getCookieConsent", () => {
      setCookieConsent({ analytics: false, profiling: false })
      const raw = browser.cookie.split(";")[0]
      browser.cookie = raw
      const consent = getCookieConsent()
      assert.equal(consent?.analytics, false)
      assert.equal(consent?.technical, true)
    })
  })

  describe("hasConsentExpired", () => {
    it("returns false for a recent consent and true after six months", () => {
      const recent: CookieConsent = {
        technical: true,
        analytics: true,
        profiling: false,
        timestamp: Date.now() - 1_000,
        version: COOKIE_CONSENT_VERSION,
      }
      assert.equal(hasConsentExpired(recent), false)
      assert.equal(
        hasConsentExpired({
          ...recent,
          timestamp: Date.now() - SIX_MONTHS_MS,
        }),
        true,
      )
    })
  })

  describe("shouldShowBanner", () => {
    it("shows the banner when no cookie is present", () => {
      browser.cookie = ""
      assert.equal(shouldShowBanner(), true)
    })

    it("shows the banner when the stored consent is stale", () => {
      browser.cookie = `GM_COOKIE_CONSENT=${validConsentValue({
        timestamp: Date.now() - SIX_MONTHS_MS - 1,
      })}`
      assert.equal(shouldShowBanner(), true)
    })

    it("hides the banner for a valid, recent consent", () => {
      browser.cookie = `GM_COOKIE_CONSENT=${validConsentValue()}`
      assert.equal(shouldShowBanner(), false)
    })
  })
})

describe("getCookieConsent without a DOM", () => {
  it("returns null when document is undefined", () => {
    removeBrowser()
    assert.equal(getCookieConsent(), null)
  })
})
