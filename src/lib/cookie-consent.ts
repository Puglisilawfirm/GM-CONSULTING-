// Cookie consent utilities — GDPR / Provv. Garante 231/2021

export interface CookieConsent {
  technical: true
  analytics: boolean
  profiling: boolean
  timestamp: number
  version: string
}

const COOKIE_NAME = "GM_COOKIE_CONSENT"
const MAX_AGE = 15778800 // 6 months in seconds
const MAX_AGE_MS = MAX_AGE * 1000

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
    const parsed: CookieConsent = JSON.parse(value)
    return parsed
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
    version: "1.0",
  }

  const value = encodeURIComponent(JSON.stringify(consent))
  document.cookie = `${COOKIE_NAME}=${value}; max-age=${MAX_AGE}; path=/; SameSite=Lax`
}

/**
 * Returns true if consent was given more than 6 months ago.
 */
export function hasConsentExpired(consent: CookieConsent): boolean {
  return Date.now() - consent.timestamp > MAX_AGE_MS
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
