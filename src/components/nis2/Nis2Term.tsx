"use client"

import { useEffect, useRef, useState } from "react"
import { nis2Glossary, type Nis2GlossaryKey } from "@/lib/landings/nis2-dossier"

/**
 * Parola del testo che apre la scheda del concetto. La scheda è sempre nel
 * markup e viene solo nascosta: chi legge senza JavaScript, e i motori di
 * ricerca, trovano comunque il contenuto.
 */
export function Nis2Term({
  id,
  children,
}: {
  id: Nis2GlossaryKey
  children: React.ReactNode
}) {
  const entry = nis2Glossary[id]
  const [open, setOpen] = useState(false)
  const container = useRef<HTMLSpanElement>(null)
  const panelId = `nis2-glossario-${id}`

  useEffect(() => {
    if (!open) return

    const chiudiConTasto = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    const chiudiFuori = (event: MouseEvent) => {
      if (container.current && !container.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener("keydown", chiudiConTasto)
    document.addEventListener("mousedown", chiudiFuori)
    return () => {
      document.removeEventListener("keydown", chiudiConTasto)
      document.removeEventListener("mousedown", chiudiFuori)
    }
  }, [open])

  return (
    <span ref={container} className="relative inline-block">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((precedente) => !precedente)}
        className="cursor-help rounded-sm bg-brand-soft/70 px-1 font-medium text-brand underline decoration-brand/40 decoration-dotted underline-offset-4 transition-colors hover:bg-brand-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
      >
        {children}
        <span aria-hidden className="ml-0.5 align-super text-[0.65em]">
          ⓘ
        </span>
      </button>
      <span
        id={panelId}
        role="dialog"
        aria-label={entry.title}
        aria-hidden={!open}
        className={
          open
            ? "absolute left-0 top-full z-30 mt-2 block w-[min(88vw,28rem)] rounded-lg border border-gold-500 bg-white p-5 text-left shadow-xl"
            : "sr-only"
        }
      >
        <span className="mb-2 block font-display text-h4 text-ink">{entry.title}</span>
        {entry.body.map((paragrafo) => (
          <span key={paragrafo} className="mb-3 block text-body-sm text-steel">
            {paragrafo}
          </span>
        ))}
        <span className="block border-t border-mist pt-3 text-caption uppercase tracking-wide text-brand">
          {entry.source}
        </span>
        {open && (
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute right-3 top-3 text-caption text-fog hover:text-ink"
            aria-label="Chiudi la scheda"
          >
            ✕
          </button>
        )}
      </span>
    </span>
  )
}
