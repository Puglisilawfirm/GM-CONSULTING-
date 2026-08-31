import assert from "node:assert/strict"
import { describe, it } from "node:test"
import robots from "../src/app/robots"
import sitemap from "../src/app/sitemap"
import { siteAnalyticsAllowedPaths } from "../supabase/functions/_shared/siteAnalyticsContract"
import { cn } from "../src/lib/utils"

const baseUrl = "https://www.gmconsulting.one"

describe("robots", () => {
  it("allows all crawlers and points to the sitemap", () => {
    const result = robots()
    assert.deepEqual(result.rules, { userAgent: "*", allow: "/" })
    assert.equal(result.sitemap, `${baseUrl}/sitemap.xml`)
  })
})

describe("sitemap", () => {
  const entries = sitemap()
  const urls = entries.map((entry) => entry.url)

  it("lists only absolute URLs under the production domain, without duplicates", () => {
    assert.ok(entries.length > 0)
    for (const url of urls) {
      assert.ok(url === baseUrl || url.startsWith(`${baseUrl}/`), url)
    }
    assert.equal(new Set(urls).size, urls.length)
  })

  it("gives the homepage the highest priority", () => {
    const home = entries.find((entry) => entry.url === baseUrl)
    assert.equal(home?.priority, 1)
  })

  it("includes an entry for every insight article", () => {
    const insightUrls = urls.filter((url) =>
      url.startsWith(`${baseUrl}/insights/`),
    )
    assert.equal(insightUrls.length, 3)
  })

  it("covers every path allowed by the analytics contract", () => {
    for (const path of siteAnalyticsAllowedPaths) {
      const url = path === "/" ? baseUrl : `${baseUrl}${path}`
      assert.ok(urls.includes(url), `missing sitemap entry for ${path}`)
    }
  })
})

describe("cn", () => {
  it("merges conditional classes and resolves Tailwind conflicts", () => {
    assert.equal(cn("px-2", "py-1"), "px-2 py-1")
    assert.equal(cn("px-2", "px-4"), "px-4")
    assert.equal(cn("base", { active: true, hidden: false }), "base active")
    assert.equal(cn("a", undefined, null, false, "b"), "a b")
  })
})
