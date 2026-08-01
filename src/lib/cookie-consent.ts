// Cookie consent utilities — GDPR / Provv. Garante 231/2021

export interface CookieConsent {
  technical: true
  analytics: boolean
  profiling: boolean
  timestamp: number
  version: string
}

const COOKIE_NAME = "GM_COOKIE_CONSENT"
export const COOKIE_CONSENT_VERSION = "2.0"
export const COOKIE_CONSENT_CHANGED_EVENT = "gm:cookie-consent-changed"
const MAX_AGE = 15778800 // 6 months in seconds
const MAX_AGE_MS = MAX_AGE * 1000

const isBoolean = (value: unknown): value is boolean =>
  typeof value === "boolean"

export function parseCookieConsentValue(
  rawValue: string,
  now = Date.now(),
): CookieConsent | null {
  try {
    const parsed = JSON.parse(rawValue) as Partial<CookieConsent>
    if (
      parsed.technical !== true ||
      !isBoolean(parsed.analytics) ||
      !isBoolean(parsed.profiling) ||
      typeof parsed.timestamp !== "number" ||
      !Number.isFinite(parsed.timestamp) ||
      parsed.timestamp > now ||
      now - parsed.timestamp >= MAX_AGE_MS ||
      parsed.version !== COOKIE_CONSENT_VERSION
    ) {
      return null
    }

    return parsed as CookieConsent
  } catch {
    return null
  }
}

/**
 * Read and parse the consent cookie from document.cookie.
 * Returns null when the cookie is missing or cannot be parsed.
 */
export function getCookieConsent(): CookieConsent | null {
  if (typeof document === "undefined") return null

  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${COOKIE_NAME}=`))

  if (!match) return null

  try {
    const value = decodeURIComponent(match.split("=").slice(1).join("="))
    return parseCookieConsentValue(value)
  } catch {
    return null
  }
}

/**
 * Write the consent cookie. `technical` is always true.
 */
export function setCookieConsent(
  prefs: Pick<CookieConsent, "analytics" | "profiling">,
): void {
  const consent: CookieConsent = {
    technical: true,
    analytics: prefs.analytics,
    profiling: prefs.profiling,
    timestamp: Date.now(),
    version: COOKIE_CONSENT_VERSION,
  }

  const value = encodeURIComponent(JSON.stringify(consent))
  const secure = window.location.protocol === "https:" ? "; Secure" : ""
  document.cookie = `${COOKIE_NAME}=${value}; max-age=${MAX_AGE}; path=/; SameSite=Lax${secure}`
  window.dispatchEvent(
    new CustomEvent(COOKIE_CONSENT_CHANGED_EVENT, { detail: consent }),
  )
}

/**
 * Returns true if consent was given more than 6 months ago.
 */
export function hasConsentExpired(consent: CookieConsent): boolean {
  return Date.now() - consent.timestamp >= MAX_AGE_MS
}

/**
 * Returns true when the cookie banner should be displayed:
 * cookie is absent or consent has expired.
 */
export function shouldShowBanner(): boolean {
  const consent = getCookieConsent()
  if (!consent) return true
  return hasConsentExpired(consent)
}
