import assert from "node:assert/strict"
import { existsSync, readFileSync } from "node:fs"
import path from "node:path"
import { describe, it } from "node:test"

const linkSources = [
  "src/app/page.tsx",
  "src/components/banner-prodotti-animato.tsx",
]

function extractInternalDataLinks(sourcePath: string): string[] {
  const source = readFileSync(path.join(process.cwd(), sourcePath), "utf8")
  return Array.from(
    source.matchAll(/\bhref:\s*"(\/[^"?]*)"/g),
    (match) => match[1],
  )
}

function targetFileFor(href: string): string {
  const pathname = href.split("#", 1)[0]
  const insightPrefix = "/insights/"

  if (pathname.startsWith(insightPrefix)) {
    return path.join(
      process.cwd(),
      "content",
      "insights",
      `${pathname.slice(insightPrefix.length)}.mdx`,
    )
  }

  return path.join(
    process.cwd(),
    "src",
    "app",
    pathname === "/" ? "" : pathname,
    "page.tsx",
  )
}

describe("homepage and product banner links", () => {
  it("resolve every literal internal destination", () => {
    for (const sourcePath of linkSources) {
      for (const href of extractInternalDataLinks(sourcePath)) {
        const targetFile = targetFileFor(href)
        assert.equal(
          existsSync(targetFile),
          true,
          `${sourcePath}: ${href} does not resolve to published content`,
        )
      }
    }
  })

  it("resolve fragment links to declared section identifiers", () => {
    for (const sourcePath of linkSources) {
      for (const href of extractInternalDataLinks(sourcePath)) {
        const fragment = href.split("#", 2)[1]
        if (!fragment) continue

        const targetSource = readFileSync(targetFileFor(href), "utf8")
        const escapedFragment = fragment.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
        assert.match(
          targetSource,
          new RegExp(`\\bid(?:\\s*[:=]\\s*)["']${escapedFragment}["']`),
          `${sourcePath}: ${href} does not resolve to a declared section`,
        )
      }
    }
  })
})
