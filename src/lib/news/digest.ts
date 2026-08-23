/**
 * Motore della Rassegna.
 *
 * Tutte le funzioni sono pure: la lettura della rete resta nello script di
 * raccolta (`scripts/collect-news.ts`), qui c'è soltanto il trattamento dei
 * feed già scaricati. Il formato prodotto (`NewsDigest`) è lo stesso file JSON
 * che la pagina pubblica legge, così raccolta e rendering non possono
 * divergere.
 */

import type { NewsCategoryId, NewsSource } from "./sources"

export interface NewsItem {
  id: string
  title: string
  url: string
  summary: string
  publishedAt: string | null
  sourceId: string
  sourceName: string
  category: NewsCategoryId
}

export type SourceStatusKind = "ok" | "empty" | "error" | "manual"

export interface SourceStatus {
  sourceId: string
  name: string
  homepage: string
  category: NewsCategoryId
  status: SourceStatusKind
  itemCount: number
  error?: string
}

export type DigestSlot = "morning" | "evening"

export interface NewsDigest {
  /** Istante di generazione, ISO 8601 UTC. */
  generatedAt: string
  /** Fascia editoriale di riferimento (08:00 o 20:00 Europe/Rome). */
  slot: DigestSlot
  /**
   * Ampiezza della finestra temporale considerata, in ore. Resta più larga
   * dell'intervallo fra due edizioni: le fonti istituzionali e i portali di
   * finanza agevolata pubblicano a giorni alterni e non pubblicano nel fine
   * settimana, quindi una finestra di 12 ore lascerebbe la rassegna vuota il
   * lunedì mattina.
   */
  windowHours: number
  items: NewsItem[]
  sources: SourceStatus[]
}

export interface RawFeedItem {
  title: string
  link: string
  description: string
  pubDate: string | null
}

const ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  laquo: "«",
  raquo: "»",
  eacute: "é",
  egrave: "è",
  agrave: "à",
  ograve: "ò",
  igrave: "ì",
  ugrave: "ù",
  rsquo: "’",
  lsquo: "‘",
  ldquo: "“",
  rdquo: "”",
  hellip: "…",
  ndash: "–",
  mdash: "—",
  euro: "€",
}

export function decodeEntities(input: string): string {
  return input.replace(
    /&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g,
    (match, entity: string) => {
      if (entity.startsWith("#x") || entity.startsWith("#X")) {
        const code = Number.parseInt(entity.slice(2), 16)
        return Number.isFinite(code) ? String.fromCodePoint(code) : match
      }
      if (entity.startsWith("#")) {
        const code = Number.parseInt(entity.slice(1), 10)
        return Number.isFinite(code) ? String.fromCodePoint(code) : match
      }
      const replacement = ENTITIES[entity.toLowerCase()]
      return replacement === undefined ? match : replacement
    },
  )
}

function unwrapCdata(input: string): string {
  return input.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
}

export function cleanText(input: string): string {
  return decodeEntities(unwrapCdata(input))
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

export function truncate(input: string, maxLength: number): string {
  if (input.length <= maxLength) return input
  const cut = input.slice(0, maxLength)
  const lastSpace = cut.lastIndexOf(" ")
  return `${(lastSpace > maxLength * 0.6 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`
}

function firstTag(block: string, tags: string[]): string | null {
  for (const tag of tags) {
    const match = block.match(
      new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, "i"),
    )
    if (match) return match[1]
  }
  return null
}

function atomLink(block: string): string | null {
  const alternate = block.match(
    /<link[^>]*rel=["']alternate["'][^>]*href=["']([^"']+)["'][^>]*\/?>/i,
  )
  if (alternate) return alternate[1]
  const plain = block.match(/<link[^>]*href=["']([^"']+)["'][^>]*\/?>/i)
  return plain ? plain[1] : null
}

/**
 * Estrae le voci di un feed RSS 2.0, RDF o Atom. Il parsing è volutamente
 * testuale: i feed pubblici sono spesso mal formati e un parser XML stretto
 * fallirebbe l'intera fonte per un singolo carattere illegale.
 */
export function parseFeedItems(xml: string): RawFeedItem[] {
  const blocks = xml.match(/<(item|entry)(?:\s[^>]*)?>[\s\S]*?<\/\1>/gi) ?? []
  const items: RawFeedItem[] = []

  for (const block of blocks) {
    const rawTitle = firstTag(block, ["title"])
    const rawLink = firstTag(block, ["link"]) ?? atomLink(block)
    const rawDescription = firstTag(block, [
      "description",
      "summary",
      "content:encoded",
      "content",
    ])
    const rawDate = firstTag(block, [
      "pubDate",
      "published",
      "updated",
      "dc:date",
      "date",
    ])

    const title = rawTitle ? cleanText(rawTitle) : ""
    const link = rawLink ? cleanText(rawLink) : ""
    if (!title || !link) continue

    items.push({
      title,
      link,
      description: rawDescription ? cleanText(rawDescription) : "",
      pubDate: rawDate ? cleanText(rawDate) : null,
    })
  }

  return items
}

export function parseDate(value: string | null): string | null {
  if (!value) return null
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return null
  return parsed.toISOString()
}

function hash(input: string): string {
  let value = 5381
  for (let i = 0; i < input.length; i += 1) {
    value = ((value << 5) + value + input.charCodeAt(i)) | 0
  }
  return (value >>> 0).toString(36)
}

/** Chiave di identità di una notizia: URL senza parametri di tracciamento. */
export function canonicalUrl(url: string): string {
  try {
    const parsed = new URL(url)
    const keys: string[] = []
    parsed.searchParams.forEach((_value, key) => keys.push(key))
    for (const key of keys) {
      if (/^(utm_|fbclid|gclid|ref|source)/i.test(key))
        parsed.searchParams.delete(key)
    }
    parsed.hash = ""
    const path = parsed.pathname.replace(/\/+$/, "")
    return `${parsed.protocol}//${parsed.host.toLowerCase()}${path}${parsed.search}`
  } catch {
    return url.trim()
  }
}

function titleKey(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
}

export function normalizeItems(
  raw: RawFeedItem[],
  source: NewsSource,
): NewsItem[] {
  return raw
    .filter((item) => /^https?:\/\//i.test(item.link))
    .map((item) => {
      const url = canonicalUrl(item.link)
      return {
        id: `${source.id}-${hash(url)}`,
        title: truncate(item.title, 180),
        url,
        summary: truncate(item.description, 320),
        publishedAt: parseDate(item.pubDate),
        sourceId: source.id,
        sourceName: source.name,
        category: source.category,
      }
    })
}

/** Scarta i doppioni per URL canonico e, in seconda battuta, per titolo. */
export function dedupeItems(items: NewsItem[]): NewsItem[] {
  const seenUrls = new Set<string>()
  const seenTitles = new Set<string>()
  const result: NewsItem[] = []

  for (const item of items) {
    const key = titleKey(item.title)
    if (seenUrls.has(item.url) || (key.length > 20 && seenTitles.has(key)))
      continue
    seenUrls.add(item.url)
    if (key.length > 20) seenTitles.add(key)
    result.push(item)
  }

  return result
}

/**
 * Tiene le notizie della finestra corrente. Le voci senza data restano: molti
 * feed istituzionali non la dichiarano e scartarle svuoterebbe la rassegna.
 */
export function filterByWindow(
  items: NewsItem[],
  now: Date,
  windowHours: number,
): NewsItem[] {
  const floor = now.getTime() - windowHours * 3600 * 1000
  const ceiling = now.getTime() + 6 * 3600 * 1000
  return items.filter((item) => {
    if (!item.publishedAt) return true
    const time = new Date(item.publishedAt).getTime()
    return time >= floor && time <= ceiling
  })
}

export function sortItems(items: NewsItem[]): NewsItem[] {
  return [...items].sort((a, b) => {
    if (a.publishedAt && b.publishedAt)
      return b.publishedAt.localeCompare(a.publishedAt)
    if (a.publishedAt) return -1
    if (b.publishedAt) return 1
    return a.sourceName.localeCompare(b.sourceName)
  })
}

/** Distribuisce un tetto per fonte, così una testata prolifica non copre le altre. */
export function capPerSource(
  items: NewsItem[],
  maxPerSource: number,
): NewsItem[] {
  const counters = new Map<string, number>()
  const result: NewsItem[] = []
  for (const item of items) {
    const used = counters.get(item.sourceId) ?? 0
    if (used >= maxPerSource) continue
    counters.set(item.sourceId, used + 1)
    result.push(item)
  }
  return result
}

export function slotForDate(date: Date, timeZone = "Europe/Rome"): DigestSlot {
  const hour = Number.parseInt(
    new Intl.DateTimeFormat("en-GB", {
      timeZone,
      hour: "2-digit",
      hour12: false,
    }).format(date),
    10,
  )
  return hour >= 8 && hour < 20 ? "morning" : "evening"
}

export interface FeedResult {
  source: NewsSource
  xml?: string
  error?: string
}

export interface BuildDigestOptions {
  now?: Date
  windowHours?: number
  maxPerSource?: number
  maxItems?: number
}

export function buildDigest(
  results: FeedResult[],
  options: BuildDigestOptions = {},
): NewsDigest {
  const now = options.now ?? new Date()
  const windowHours = options.windowHours ?? 72
  const maxPerSource = options.maxPerSource ?? 4
  const maxItems = options.maxItems ?? 120

  const sources: SourceStatus[] = []
  let collected: NewsItem[] = []

  for (const result of results) {
    const { source } = result
    const base = {
      sourceId: source.id,
      name: source.name,
      homepage: source.homepage,
      category: source.category,
    }

    if (!source.feed) {
      sources.push({ ...base, status: "manual", itemCount: 0 })
      continue
    }
    if (result.error || result.xml === undefined) {
      sources.push({
        ...base,
        status: "error",
        itemCount: 0,
        error: result.error ?? "nessuna risposta",
      })
      continue
    }

    const items = filterByWindow(
      normalizeItems(parseFeedItems(result.xml), source),
      now,
      windowHours,
    )
    collected = collected.concat(items)
    sources.push({
      ...base,
      status: items.length > 0 ? "ok" : "empty",
      itemCount: items.length,
    })
  }

  const items = capPerSource(
    sortItems(dedupeItems(collected)),
    maxPerSource,
  ).slice(0, maxItems)

  return {
    generatedAt: now.toISOString(),
    slot: slotForDate(now),
    windowHours,
    items,
    sources: sources.sort((a, b) => a.name.localeCompare(b.name)),
  }
}

export function countByCategory(items: NewsItem[]): Record<string, number> {
  const counters: Record<string, number> = {}
  for (const item of items) {
    counters[item.category] = (counters[item.category] ?? 0) + 1
  }
  return counters
}
