"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import {
  getCookieConsent,
  setCookieConsent,
  shouldShowBanner,
} from "@/lib/cookie-consent"

/* ------------------------------------------------------------------ */
/*  Toggle                                                             */
/* ------------------------------------------------------------------ */

function Toggle({
  checked,
  disabled,
  onChange,
  id,
}: {
  checked: boolean
  disabled?: boolean
  onChange?: (v: boolean) => void
  id: string
}) {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={cn(
        "relative inline-flex h-6 w-10 shrink-0 cursor-pointer items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2",
        checked ? "bg-brand" : "bg-fog",
        disabled && "cursor-not-allowed opacity-70",
      )}
    >
      <span
        className={cn(
          "pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform",
          checked ? "translate-x-5" : "translate-x-1",
        )}
      />
    </button>
  )
}

/* ------------------------------------------------------------------ */
/*  CookieBanner                                                       */
/* ------------------------------------------------------------------ */

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const [analyticsToggle, setAnalyticsToggle] = useState(false)

  const dialogRef = useRef<HTMLDivElement>(null)

  /* ---- mount: decide whether to show banner ---- */
  useEffect(() => {
    if (shouldShowBanner()) {
      setShowBanner(true)
    }
  }, [])

  /* ---- listen for external "open-preferences" triggers ---- */
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = (e.target as HTMLElement).closest<HTMLElement>(
        '[data-action="open-preferences"]',
      )
      if (!target) return

      // pre-populate from existing consent
      const consent = getCookieConsent()
      if (consent) {
        setAnalyticsToggle(consent.analytics)
      } else {
        setAnalyticsToggle(false)
      }

      setShowPreferences(true)
    }

    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [])

  /* ---- focus trap for preferences dialog ---- */
  useEffect(() => {
    if (!showPreferences) return

    const dialog = dialogRef.current
    if (!dialog) return

    function getFocusable() {
      return dialog!.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setShowPreferences(false)
        return
      }
      if (e.key !== "Tab") return

      const focusable = getFocusable()
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    // move focus into dialog
    const focusable = getFocusable()
    if (focusable.length > 0) focusable[0].focus()

    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [showPreferences])

  /* ---- actions ---- */
  const acceptAll = useCallback(() => {
    setCookieConsent({ analytics: true, profiling: false })
    setShowBanner(false)
    setShowPreferences(false)
  }, [])

  const rejectAll = useCallback(() => {
    setCookieConsent({ analytics: false, profiling: false })
    setShowBanner(false)
    setShowPreferences(false)
  }, [])

  const savePreferences = useCallback(() => {
    setCookieConsent({ analytics: analyticsToggle, profiling: false })
    setShowBanner(false)
    setShowPreferences(false)
  }, [analyticsToggle])

  const openPreferences = useCallback(() => {
    const consent = getCookieConsent()
    if (consent) {
      setAnalyticsToggle(consent.analytics)
    }
    setShowPreferences(true)
  }, [])

  /* ---- render ---- */
  if (!showBanner && !showPreferences) return null

  return (
    <>
      {/* ---- Banner ---- */}
      {showBanner && !showPreferences && (
        <div
          className="fixed bottom-0 inset-x-0 z-50 border-t border-mist bg-white shadow-lg"
          role="region"
          aria-label="Cookie consent"
        >
          <div className="mx-auto max-w-[1200px] px-6 py-6 lg:px-12">
            <p className="text-body text-graphite mb-5">
              Questo sito utilizza esclusivamente cookie tecnici strettamente
              necessari al funzionamento. La misurazione analitica
              privacy-first richiede il Suo consenso esplicito. Pu&ograve;
              accettarli tutti, rifiutarli tutti o personalizzare le Sue
              preferenze in conformit&agrave; al{" "}
              <em>
                Provvedimento del Garante Privacy n.&nbsp;231/2021
              </em>
              .
            </p>

            <p className="mb-5">
              <a
                href="/note-legali#cookie"
                className="text-brand text-sm underline hover:text-brand-dark"
              >
                Cookie Policy completa
              </a>
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={acceptAll}
                className="bg-brand text-white px-6 py-3 rounded-md font-medium text-sm hover:bg-brand-dark transition-colors"
              >
                Accetta tutti
              </button>
              <button
                type="button"
                onClick={rejectAll}
                className="bg-graphite text-white px-6 py-3 rounded-md font-medium text-sm hover:opacity-90 transition-colors"
              >
                Rifiuta tutti
              </button>
              <button
                type="button"
                onClick={openPreferences}
                className="text-brand underline text-sm font-medium hover:text-brand-dark transition-colors"
              >
                Personalizza
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---- Preferences dialog ---- */}
      {showPreferences && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowPreferences(false)
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Gestione preferenze cookie"
            className="relative mx-4 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg bg-white p-8 shadow-xl"
          >
            <h2 className="text-h4 text-ink mb-6">
              Gestione preferenze cookie
            </h2>

            <div className="space-y-6">
              {/* Technical */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <label
                    htmlFor="toggle-technical"
                    className="text-sm font-semibold text-ink"
                  >
                    Cookie tecnici
                  </label>
                  <p className="text-sm text-steel mt-1">
                    Cookie strettamente necessari al funzionamento del sito (es.
                    memorizzazione delle preferenze di consenso, sicurezza). Non
                    possono essere disattivati.
                  </p>
                </div>
                <Toggle id="toggle-technical" checked disabled />
              </div>

              {/* Analytics */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <label
                    htmlFor="toggle-analytics"
                    className="text-sm font-semibold text-ink"
                  >
                    Cookie analitici
                  </label>
                  <p className="text-sm text-steel mt-1">
                    Misurazione first-party con eventi minimizzati e statistiche
                    aggregate. Non raccoglie IP, contatti, query string,
                    referrer o contenuti inseriti nei moduli.
                  </p>
                </div>
                <Toggle
                  id="toggle-analytics"
                  checked={analyticsToggle}
                  onChange={setAnalyticsToggle}
                />
              </div>

            </div>

            {/* Footer */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={savePreferences}
                className="bg-brand text-white px-6 py-3 rounded-md font-medium text-sm hover:bg-brand-dark transition-colors"
              >
                Salva preferenze
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="bg-graphite text-white px-6 py-3 rounded-md font-medium text-sm hover:opacity-90 transition-colors"
              >
                Accetta tutti
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
