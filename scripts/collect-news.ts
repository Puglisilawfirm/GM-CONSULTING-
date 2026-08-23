#!/usr/bin/env tsx
/**
 * Raccolta della Rassegna.
 *
 * Scarica i feed dichiarati in `src/lib/news/sources.ts`, costruisce il digest
 * con `src/lib/news/digest.ts` e lo scrive in `public/data/news-digest.json`,
 * che è il file letto dalla pagina pubblica `/rassegna`.
 *
 * Uso:
 *   pnpm collect:news              # raccolta e scrittura
 *   pnpm collect:news -- --dry-run # solo diagnostica per fonte
 *
 * Le fonti irraggiungibili non interrompono la raccolta: finiscono nel digest
 * con stato `error`, così la pagina può dichiarare la copertura effettiva.
 */

import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { buildDigest, type FeedResult } from "../src/lib/news/digest"
import { newsSources } from "../src/lib/news/sources"

const REQUEST_TIMEOUT_MS = 15_000
const CONCURRENCY = 8
const USER_AGENT =
  "GMConsultingNewsBot/1.0 (+https://www.gmconsulting.one/rassegna; info@gmconsulting.one)"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const outputPath = join(root, "public", "data", "news-digest.json")

async function fetchFeed(
  url: string,
): Promise<{ xml?: string; error?: string }> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)
  try {
    const response = await fetch(url, {
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "User-Agent": USER_AGENT,
        Accept:
          "application/rss+xml, application/atom+xml, application/xml, text/xml, */*",
      },
    })
    if (!response.ok) return { error: `HTTP ${response.status}` }
    const body = await response.text()
    if (!/<(rss|feed|rdf:RDF)[\s>]/i.test(body))
      return { error: "risposta non è un feed XML" }
    return { xml: body }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    return {
      error: controller.signal.aborted
        ? `timeout dopo ${REQUEST_TIMEOUT_MS} ms`
        : message,
    }
  } finally {
    clearTimeout(timer)
  }
}

async function collect(): Promise<FeedResult[]> {
  const results: FeedResult[] = []
  const queue = [...newsSources]

  const workers = Array.from(
    { length: Math.min(CONCURRENCY, queue.length) },
    async () => {
      for (;;) {
        const source = queue.shift()
        if (!source) return
        if (!source.feed) {
          results.push({ source })
          continue
        }
        const outcome = await fetchFeed(source.feed)
        results.push({ source, ...outcome })
      }
    },
  )

  await Promise.all(workers)
  return results
}

async function main(): Promise<void> {
  const dryRun = process.argv.includes("--dry-run")
  const results = await collect()
  const digest = buildDigest(results)

  for (const status of digest.sources) {
    const detail =
      status.status === "error"
        ? ` — ${status.error}`
        : ` — ${status.itemCount} voci`
    console.log(`[${status.status.padEnd(6)}] ${status.name}${detail}`)
  }

  const ok = digest.sources.filter((s) => s.status === "ok").length
  const errored = digest.sources.filter((s) => s.status === "error").length
  const manual = digest.sources.filter((s) => s.status === "manual").length
  console.log(
    `\n${digest.items.length} notizie · fonti con esito positivo ${ok} · errori ${errored} · presidio manuale ${manual}`,
  )

  if (dryRun) {
    console.log("\n--dry-run: nessun file scritto.")
    return
  }

  mkdirSync(dirname(outputPath), { recursive: true })
  writeFileSync(outputPath, `${JSON.stringify(digest, null, 2)}\n`, "utf-8")
  console.log(`\nScritto ${outputPath}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
