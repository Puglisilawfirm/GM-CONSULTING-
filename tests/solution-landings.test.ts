import assert from "node:assert/strict"
import { existsSync, readFileSync } from "node:fs"
import path from "node:path"
import { describe, it } from "node:test"
import { solutionLandings, solutionSlugs, getSolutionLanding } from "../src/lib/landings/solutions"
import sitemap from "../src/app/sitemap"

const footerSource = readFileSync(path.join(process.cwd(), "src/components/site-footer.tsx"), "utf8")
const headerSource = readFileSync(path.join(process.cwd(), "src/components/site-header.tsx"), "utf8")

describe("pagine verticali /soluzioni", () => {
  it("copre le quattro linee di intervento richieste", () => {
    assert.deepEqual(solutionSlugs, [
      "finanziamenti-pubblici-investimenti",
      "pianificazione-strategica",
      "business-intelligence-dati",
      "cybersecurity-nis2",
    ])
  })

  it("espone metadata compatibili con lo snippet di ricerca", () => {
    for (const landing of solutionLandings) {
      const title = `${landing.metaTitle} — GM Consulting S.r.l.`
      assert.ok(
        title.length <= 70,
        `${landing.slug}: titolo con template troppo lungo (${title.length})`,
      )
      assert.ok(
        landing.metaDescription.length >= 80 && landing.metaDescription.length <= 160,
        `${landing.slug}: description di ${landing.metaDescription.length} caratteri`,
      )
    }
  })

  it("ha contenuto proprio e non duplicato fra le pagine", () => {
    const h1 = new Set(solutionLandings.map((landing) => landing.h1))
    const intro = new Set(solutionLandings.map((landing) => landing.intro))
    assert.equal(h1.size, solutionLandings.length)
    assert.equal(intro.size, solutionLandings.length)

    for (const landing of solutionLandings) {
      assert.ok(landing.intro.length >= 180, `${landing.slug}: introduzione troppo breve`)
      assert.ok(landing.sections.length >= 4, `${landing.slug}: meno di quattro sezioni`)
      assert.ok(landing.faq.length >= 3, `${landing.slug}: meno di tre domande frequenti`)
      assert.ok(landing.targetQueries.length >= 3, `${landing.slug}: query presidiate non documentate`)
    }
  })

  it("risolve i collegamenti interni verso pagine pubblicate", () => {
    for (const landing of solutionLandings) {
      for (const link of landing.related) {
        const pathname = link.href.split("#", 1)[0]
        const target = path.join(process.cwd(), "src", "app", pathname, "page.tsx")
        assert.ok(
          existsSync(target) || pathname.startsWith("/soluzioni/"),
          `${landing.slug}: ${link.href} non risolve a una pagina pubblicata`,
        )
      }
    }
  })

  it("compare in sitemap con l'indice e le singole pagine", () => {
    const urls = sitemap().map((entry) => entry.url)
    assert.ok(urls.includes("https://www.gmconsulting.one/soluzioni"))
    for (const slug of solutionSlugs) {
      assert.ok(
        urls.includes(`https://www.gmconsulting.one/soluzioni/${slug}`),
        `${slug} assente dalla sitemap`,
      )
    }
  })

  it("è raggiungibile da header e footer", () => {
    assert.match(headerSource, /href: "\/soluzioni"/)
    assert.match(footerSource, /href: "\/soluzioni"/)
    for (const slug of solutionSlugs) {
      assert.ok(
        footerSource.includes(`/soluzioni/${slug}`),
        `${slug} non collegato dal footer`,
      )
    }
  })

  it("restituisce undefined per uno slug fuori elenco", () => {
    assert.equal(getSolutionLanding("slug-inesistente"), undefined)
  })

  it("non serve slug arbitrari dalla route dinamica", () => {
    const routeSource = readFileSync(
      path.join(process.cwd(), "src/app/soluzioni/[slug]/page.tsx"),
      "utf8",
    )
    assert.match(routeSource, /export const dynamicParams = false/)
    assert.match(routeSource, /generateStaticParams/)
    assert.match(routeSource, /alternates: \{ canonical: url \}/)
    assert.match(routeSource, /"@type": "FAQPage"/)
    assert.match(routeSource, /"@type": "BreadcrumbList"/)
  })
})
