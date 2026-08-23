"use client"

import { useMemo, useState } from "react"
import { ExternalLink } from "lucide-react"
import { newsCategories, type NewsCategoryId } from "@/lib/news/sources"
import type { NewsDigest, NewsItem } from "@/lib/news/digest"

const CATEGORY_LABELS: Record<string, string> = Object.fromEntries(
  newsCategories.map((category) => [category.id, category.label]),
)

const timeFormatter = new Intl.DateTimeFormat("it-IT", {
  day: "2-digit",
  month: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Europe/Rome",
})

/** Il riquadro ha altezza fissa: il sommario si taglia sull'ultima parola intera. */
function cardSummary(summary: string, maxLength = 170): string {
  if (summary.length <= maxLength) return summary
  const cut = summary.slice(0, maxLength)
  const lastSpace = cut.lastIndexOf(" ")
  return `${(lastSpace > maxLength * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:.]+$/, "")}…`
}

function formatMoment(iso: string): string {
  const date = new Date(iso)
  return Number.isNaN(date.getTime()) ? "" : timeFormatter.format(date)
}

export function NewsBoard({ digest }: { digest: NewsDigest }) {
  const [category, setCategory] = useState<NewsCategoryId | "tutte">("tutte")

  const counters = useMemo(() => {
    const map = new Map<string, number>()
    for (const item of digest.items) {
      map.set(item.category, (map.get(item.category) ?? 0) + 1)
    }
    return map
  }, [digest.items])

  const visible: NewsItem[] =
    category === "tutte"
      ? digest.items
      : digest.items.filter((item) => item.category === category)

  const available = newsCategories.filter(
    (entry) => (counters.get(entry.id) ?? 0) > 0,
  )

  return (
    <>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filtra per materia">
        <button
          type="button"
          onClick={() => setCategory("tutte")}
          aria-pressed={category === "tutte"}
          className={`text-caption rounded-md border px-3 py-1.5 transition-colors ${
            category === "tutte"
              ? "border-navy-700 bg-navy-900 text-paper-50"
              : "border-border bg-white text-steel hover:border-navy-700 hover:text-ink"
          }`}
        >
          Tutte ({digest.items.length})
        </button>
        {available.map((entry) => (
          <button
            key={entry.id}
            type="button"
            onClick={() => setCategory(entry.id)}
            aria-pressed={category === entry.id}
            className={`text-caption rounded-md border px-3 py-1.5 transition-colors ${
              category === entry.id
                ? "border-navy-700 bg-navy-900 text-paper-50"
                : "border-border bg-white text-steel hover:border-navy-700 hover:text-ink"
            }`}
          >
            {entry.label} ({counters.get(entry.id)})
          </button>
        ))}
      </div>

      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((item) => (
          <li key={item.id}>
            <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-white p-6 transition-colors hover:border-navy-700 focus-within:border-navy-700 sm:aspect-square">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="font-mono text-mono-label uppercase text-navy-700 bg-brand-soft rounded px-2 py-1">
                  {CATEGORY_LABELS[item.category] ?? item.category}
                </span>
                {item.publishedAt && (
                  <time
                    dateTime={item.publishedAt}
                    className="font-mono text-mono-label text-fog"
                  >
                    {formatMoment(item.publishedAt)}
                  </time>
                )}
              </div>
              <h3 className="font-display text-h4 text-ink">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="rounded transition-colors hover:text-navy-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-700"
                >
                  {item.title}
                </a>
              </h3>
              {item.summary && (
                <p className="mt-3 overflow-hidden text-sm text-steel">
                  {cardSummary(item.summary)}
                </p>
              )}
              <p className="mt-auto flex items-center gap-1.5 pt-4 font-mono text-mono-label uppercase text-ink-scale-400">
                <ExternalLink size={12} strokeWidth={1.5} aria-hidden="true" />
                <span className="truncate">{item.sourceName}</span>
              </p>
            </article>
          </li>
        ))}
      </ul>

      {visible.length === 0 && (
        <p className="text-body mt-10 text-steel">
          Nessuna notizia in questa materia nell&apos;edizione corrente.
        </p>
      )}
    </>
  )
}
