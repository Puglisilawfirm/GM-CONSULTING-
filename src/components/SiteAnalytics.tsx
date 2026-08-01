"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import {
  COOKIE_CONSENT_CHANGED_EVENT,
  getCookieConsent,
} from "@/lib/cookie-consent"
import {
  clearSiteAnalyticsSession,
  trackSiteEvent,
} from "@/lib/site-analytics"
import { normalizeSiteAnalyticsTarget } from "../../supabase/functions/_shared/siteAnalyticsContract"

export function SiteAnalytics() {
  const pathname = usePathname()
  const lastPageView = useRef<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function recordPageView() {
      if (lastPageView.current === pathname) return
      const recorded = await trackSiteEvent({
        eventName: "page_view",
        pagePath: pathname,
      })
      if (!cancelled && recorded) lastPageView.current = pathname
    }

    void recordPageView()
    return () => {
      cancelled = true
    }
  }, [pathname])

  useEffect(() => {
    function handleConsentChange() {
      const consent = getCookieConsent()
      if (!consent?.analytics) {
        clearSiteAnalyticsSession()
        lastPageView.current = null
        return
      }
      void trackSiteEvent({ eventName: "page_view", pagePath: pathname }).then(
        (recorded) => {
          if (recorded) lastPageView.current = pathname
        },
      )
    }

    function handleClick(event: MouseEvent) {
      const element = (event.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-analytics-target]",
      )
      const target = normalizeSiteAnalyticsTarget(
        element?.dataset.analyticsTarget,
      )
      if (!target) return
      void trackSiteEvent({ eventName: "cta_click", target })
    }

    window.addEventListener(COOKIE_CONSENT_CHANGED_EVENT, handleConsentChange)
    document.addEventListener("click", handleClick)
    return () => {
      window.removeEventListener(
        COOKIE_CONSENT_CHANGED_EVENT,
        handleConsentChange,
      )
      document.removeEventListener("click", handleClick)
    }
  }, [pathname])

  return null
}
