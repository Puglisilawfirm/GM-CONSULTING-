"use client"

import { useEffect, useState } from "react"
import { Analytics } from "@vercel/analytics/react"
import {
  COOKIE_CONSENT_CHANGED_EVENT,
  getCookieConsent,
} from "@/lib/cookie-consent"

/**
 * Vercel Web Analytics resta subordinato allo stesso consenso della misurazione
 * interna: senza scelta espressa lo script non viene nemmeno caricato.
 */
export function VercelWebAnalytics() {
  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    function sync() {
      setAllowed(getCookieConsent()?.analytics === true)
    }

    sync()
    window.addEventListener(COOKIE_CONSENT_CHANGED_EVENT, sync)
    return () => window.removeEventListener(COOKIE_CONSENT_CHANGED_EVENT, sync)
  }, [])

  return allowed ? <Analytics /> : null
}
