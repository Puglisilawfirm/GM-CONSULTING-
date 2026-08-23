import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import path from "node:path"
import { describe, it } from "node:test"
import {
  buildDigest,
  canonicalUrl,
  cleanText,
  dedupeItems,
  filterByWindow,
  parseFeedItems,
  slotForDate,
  truncate,
  type NewsItem,
} from "../src/lib/news/digest"
import { newsCategories, newsSources } from "../src/lib/news/sources"

const source = {
  id: "test",
  name: "Fonte di prova",
  homepage: "https://example.com/",
  feed: "https://example.com/feed",
  category: "strategia" as const,
}

const rss = (items: string) =>
  `<?xml version="1.0"?><rss version="2.0"><channel>${items}</channel></rss>`

const item = (title: string, link: string, date: string) =>
  `<item><title>${title}</title><link>${link}</link><description><![CDATA[<p>Sommario &amp; dettagli</p>]]></description><pubDate>${date}</pubDate></item>`

const newsItem = (over: Partial<NewsItem> = {}): NewsItem => ({
  id: "a",
  title: "Titolo",
  url: "https://example.com/a",
  summary: "",
  publishedAt: null,
  sourceId: "test",
  sourceName: "Fonte di prova",
  category: "strategia",
  ...over,
})

describe("parsing dei feed", () => {
  it("estrae titolo, link, sommario e data da un RSS", () => {
    const parsed = parseFeedItems(
      rss(
        item("Piano industriale", "https://example.com/a", "Tue, 12 Aug 2026 07:00:00 GMT"),
      ),
    )

    assert.equal(parsed.length, 1)
    assert.equal(parsed[0].title, "Piano industriale")
    assert.equal(parsed[0].link, "https://example.com/a")
    assert.equal(parsed[0].description, "Sommario & dettagli")
    assert.equal(parsed[0].pubDate, "Tue, 12 Aug 2026 07:00:00 GMT")
  })

  it("legge le voci Atom con link in attributo", () => {
    const atom = `<feed xmlns="http://www.w3.org/2005/Atom"><entry><title>Nota</title><link rel="alternate" href="https://example.com/b"/><summary>Testo</summary><updated>2026-08-12T07:00:00Z</updated></entry></feed>`
    const parsed = parseFeedItems(atom)

    assert.equal(parsed.length, 1)
    assert.equal(parsed[0].link, "https://example.com/b")
  })

  it("scarta le voci senza titolo o senza link", () => {
    assert.equal(parseFeedItems(rss("<item><title>Solo titolo</title></item>")).length, 0)
  })

  it("ripulisce entità e markup", () => {
    assert.equal(cleanText("<b>Bilancio &egrave; qui</b>"), "Bilancio è qui")
  })

  it("tronca sull'ultima parola intera", () => {
    assert.equal(truncate("alfa beta gamma delta", 12), "alfa beta…")
  })
})

describe("identità e deduplicazione", () => {
  it("rimuove i parametri di tracciamento dall'URL", () => {
    assert.equal(
      canonicalUrl("https://Example.com/News/?utm_source=rss&id=3#top"),
      "https://example.com/News?id=3",
    )
  })

  it("scarta i doppioni per URL e per titolo equivalente", () => {
    const items = [
      newsItem({ id: "1", title: "Nuovo bando per gli investimenti", url: "https://a.it/x" }),
      newsItem({ id: "2", title: "Nuovo bando per gli investimenti", url: "https://b.it/y" }),
      newsItem({ id: "3", title: "Altro titolo diverso e lungo", url: "https://a.it/x" }),
    ]

    assert.deepEqual(
      dedupeItems(items).map((entry) => entry.id),
      ["1"],
    )
  })
})

describe("finestra temporale e fasce", () => {
  const now = new Date("2026-08-12T10:00:00Z")

  it("tiene le voci nella finestra e scarta le più vecchie", () => {
    const kept = filterByWindow(
      [
        newsItem({ id: "recente", publishedAt: "2026-08-11T10:00:00Z" }),
        newsItem({ id: "vecchia", publishedAt: "2026-08-01T10:00:00Z" }),
      ],
      now,
      72,
    )

    assert.deepEqual(
      kept.map((entry) => entry.id),
      ["recente"],
    )
  })

  it("conserva le voci senza data, che molte fonti istituzionali non dichiarano", () => {
    assert.equal(filterByWindow([newsItem({ publishedAt: null })], now, 72).length, 1)
  })

  it("assegna la fascia editoriale sull'ora italiana", () => {
    assert.equal(slotForDate(new Date("2026-08-12T06:10:00Z")), "morning")
    assert.equal(slotForDate(new Date("2026-08-12T18:10:00Z")), "evening")
  })
})

describe("costruzione del digest", () => {
  const now = new Date("2026-08-12T10:00:00Z")

  it("classifica ogni fonte e limita le voci per testata", () => {
    const digest = buildDigest(
      [
        {
          source,
          xml: rss(
            [
              item("Uno", "https://example.com/1", "Tue, 12 Aug 2026 09:00:00 GMT"),
              item("Due", "https://example.com/2", "Tue, 12 Aug 2026 08:00:00 GMT"),
              item("Tre", "https://example.com/3", "Tue, 12 Aug 2026 07:00:00 GMT"),
            ].join(""),
          ),
        },
        { source: { ...source, id: "vuota", name: "Vuota" }, xml: rss("") },
        { source: { ...source, id: "rotta", name: "Rotta" }, error: "HTTP 500" },
        {
          source: { ...source, id: "manuale", name: "Manuale", feed: null },
        },
      ],
      { now, maxPerSource: 2 },
    )

    assert.equal(digest.items.length, 2)
    assert.equal(digest.slot, "morning")
    assert.deepEqual(
      digest.sources.map((entry) => [entry.sourceId, entry.status]),
      [
        ["test", "ok"],
        ["manuale", "manual"],
        ["rotta", "error"],
        ["vuota", "empty"],
      ],
    )
  })

  it("ordina dalla notizia più recente", () => {
    const digest = buildDigest(
      [
        {
          source,
          xml: rss(
            [
              item("Vecchia", "https://example.com/old", "Mon, 11 Aug 2026 09:00:00 GMT"),
              item("Nuova", "https://example.com/new", "Tue, 12 Aug 2026 09:00:00 GMT"),
            ].join(""),
          ),
        },
      ],
      { now },
    )

    assert.deepEqual(
      digest.items.map((entry) => entry.title),
      ["Nuova", "Vecchia"],
    )
  })
})

describe("registro delle fonti", () => {
  it("non contiene identificativi duplicati", () => {
    const ids = newsSources.map((entry) => entry.id)
    assert.equal(new Set(ids).size, ids.length)
  })

  it("dichiara solo URL https validi", () => {
    for (const entry of newsSources) {
      assert.doesNotThrow(() => new URL(entry.homepage), `${entry.id}: homepage`)
      assert.match(entry.homepage, /^https:\/\//, `${entry.id}: homepage`)
      if (entry.feed !== null) {
        assert.doesNotThrow(() => new URL(entry.feed as string), `${entry.id}: feed`)
      }
    }
  })

  it("usa solo categorie dichiarate", () => {
    const known = new Set(newsCategories.map((entry) => entry.id))
    for (const entry of newsSources) {
      assert.equal(known.has(entry.category), true, `${entry.id}: ${entry.category}`)
    }
  })

  it("copre le materie richieste dalla rassegna", () => {
    const covered = new Set(newsSources.map((entry) => entry.category))
    for (const required of [
      "strategia",
      "bi",
      "cyber",
      "finanziamenti",
      "compliance",
      "fiscale",
    ] as const) {
      assert.equal(covered.has(required), true, `manca la materia ${required}`)
    }
  })
})

describe("pubblicazione della rassegna", () => {
  const read = (relative: string) =>
    readFileSync(path.join(process.cwd(), relative), "utf8")

  it("espone la pagina nella sitemap", () => {
    assert.match(read("src/app/sitemap.ts"), /\/rassegna/)
  })

  it("collega la pagina da header e footer", () => {
    assert.match(read("src/components/site-header.tsx"), /href: "\/rassegna"/)
    assert.match(read("src/components/site-footer.tsx"), /href: "\/rassegna"/)
  })

  it("pianifica la raccolta due volte al giorno sull'ora italiana", () => {
    const workflow = read(".github/workflows/news-digest.yml")
    assert.match(workflow, /cron: "5 6,18 \* \* \*"/)
    assert.match(workflow, /cron: "5 7,19 \* \* \*"/)
    assert.match(workflow, /TZ=Europe\/Rome/)
  })

  it("dichiara una copertina social propria, presente nel repository", () => {
    const page = read("src/app/rassegna/page.tsx")
    assert.match(page, /images\/rassegna-og\.jpg/)
    // Assoluto: senza `metadataBase` un percorso relativo finirebbe su localhost.
    assert.match(
      page,
      /"https:\/\/www\.gmconsulting\.one\/images\/rassegna-og\.jpg"/,
    )
    assert.doesNotThrow(() => read("public/images/rassegna-og.jpg"))
    assert.doesNotThrow(() => read("public/images/rassegna-og.svg"))
  })

  it("pubblica un digest leggibile con voci e fonti", () => {
    const digest = JSON.parse(read("public/data/news-digest.json"))
    assert.equal(Array.isArray(digest.items), true)
    assert.equal(digest.items.length > 0, true)
    assert.equal(digest.sources.length, newsSources.length)
    for (const entry of digest.items) {
      assert.match(entry.url, /^https?:\/\//)
      assert.equal(entry.title.length > 0, true)
    }
  })
})
