import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import path from "node:path"
import { describe, it } from "node:test"
import matter from "gray-matter"

/**
 * Il titolo dichiarato nelle pagine viene completato dal template del layout:
 * il limite utile nello snippet vale sulla stringa finale, non su quella
 * scritta nel file.
 */
const TITLE_SUFFIX = " — GM Consulting"
const MAX_TITLE = 65
const MAX_DESCRIPTION = 160

function read(relative: string): string {
  return readFileSync(path.join(process.cwd(), relative), "utf8")
}

function metadataBlock(source: string): string {
  const start = source.indexOf("export const metadata")
  assert.notEqual(start, -1, "la pagina non dichiara metadata")
  const end = source.indexOf("\n}", start)
  return source.slice(start, end)
}

/**
 * Estrae il valore di un campo stringa dichiarato nel blocco metadata: la
 * citazione di apertura fissa il delimitatore, altrimenti un apostrofo
 * italiano dentro una stringa fra doppi apici troncherebbe la misura.
 */
function literal(block: string, field: string): string | null {
  const match = block.match(
    new RegExp(`${field}:[\\s\\n]*(?:\\{\\s*absolute:\\s*)?(["'])((?:\\\\.|(?!\\1).)+)\\1`),
  )
  return match ? match[2] : null
}

/** Le pagine indicizzabili con metadata letterali in `src/app`. */
const pages = [
  "src/app/page.tsx",
  "src/app/aree-di-intervento/page.tsx",
  "src/app/compliance/page.tsx",
  "src/app/metodo/page.tsx",
  "src/app/protocollo-23/page.tsx",
  "src/app/rassegna/page.tsx",
  "src/app/insights/page.tsx",
  "src/app/convenzione-studio/page.tsx",
  "src/app/note-legali/page.tsx",
  "src/app/accessibilita/page.tsx",
  "src/app/assessment/layout.tsx",
]

describe("metadata delle pagine", () => {
  it("mantiene i titoli entro lo snippet utile", () => {
    for (const page of pages) {
      const block = metadataBlock(read(page))
      const title = literal(block, "title")
      assert.ok(title, `${page}: titolo non trovato`)
      const absolute = /title:\s*\{\s*absolute:/.test(block)
      const rendered = absolute ? title : title + TITLE_SUFFIX
      assert.ok(
        rendered.length <= MAX_TITLE,
        `${page}: titolo di ${rendered.length} caratteri (${rendered})`,
      )
    }
  })

  it("mantiene le description entro lo snippet utile", () => {
    for (const page of pages) {
      const block = metadataBlock(read(page))
      const description = literal(block, "description")
      assert.ok(description, `${page}: description non trovata`)
      assert.ok(
        description.length <= MAX_DESCRIPTION,
        `${page}: description di ${description.length} caratteri`,
      )
    }
  })
})

describe("insights", () => {
  const slugs = [
    "iso-37001-37301-dlgs-231-architettura-integrata",
    "uni-pdr-125-2022-premialita-pnrr",
    "compliance-by-design-workflow-python-gdpr-nis2",
  ]

  it("espone titoli e description indicizzabili", () => {
    for (const slug of slugs) {
      const { data } = matter(read(path.join("content", "insights", `${slug}.mdx`)))
      const rendered = (data.metaTitle || data.title) + TITLE_SUFFIX
      assert.ok(
        rendered.length <= MAX_TITLE,
        `${slug}: titolo di ${rendered.length} caratteri (${rendered})`,
      )
      assert.ok(
        String(data.description).length <= MAX_DESCRIPTION,
        `${slug}: description di ${String(data.description).length} caratteri`,
      )
      assert.match(String(data.datePublished), /^\d{4}-\d{2}-\d{2}$/)
    }
  })

  it("dichiara dati strutturati d'articolo", () => {
    const source = read("src/app/insights/[slug]/page.tsx")
    assert.match(source, /"@type": "BlogPosting"/)
    assert.match(source, /datePublished: frontmatter\.datePublished/)
    assert.match(source, /author:/)
  })
})

describe("pagine di conferma", () => {
  const confirmations = [
    "src/app/protocollo-23/inviato/page.tsx",
    "src/app/assessment/inviato/page.tsx",
  ]

  it("sono escluse dall'indice e dalla sitemap", () => {
    const sitemap = read("src/app/sitemap.ts")
    for (const page of confirmations) {
      assert.match(read(page), /robots:\s*\{\s*index:\s*false/)
      const route = page.replace("src/app", "").replace("/page.tsx", "")
      assert.equal(
        sitemap.includes(`${route}\``),
        false,
        `${route} non deve comparire in sitemap`,
      )
    }
  })
})

describe("anteprime social", () => {
  it("dichiarano un'immagine su ogni pagina con card large", () => {
    for (const page of pages) {
      const block = metadataBlock(read(page))
      if (!block.includes("summary_large_image")) continue
      assert.ok(
        block.includes("images:"),
        `${page}: card large senza immagine dichiarata`,
      )
    }
  })
})
