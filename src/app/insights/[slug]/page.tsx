import type { Metadata } from "next"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { notFound } from "next/navigation"
import { Hero } from "@/components/ui/Hero"
import { CTAButton } from "@/components/ui/CTAButton"

const insightsDir = path.join(process.cwd(), "content", "insights")

interface Frontmatter {
  title: string
  description: string
  datePublished: string
  readingTime: string
  slug: string
}

function getArticle(slug: string): { frontmatter: Frontmatter; content: string } | null {
  const filePath = path.join(insightsDir, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(raw)
  return { frontmatter: data as Frontmatter, content }
}

const slugs = [
  "iso-37001-37301-dlgs-231-architettura-integrata",
  "uni-pdr-125-2022-premialita-pnrr",
  "compliance-by-design-workflow-python-gdpr-nis2",
]

export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }))
}

export function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Metadata {
  const article = getArticle(params.slug)
  if (!article) return { title: "Articolo non trovato" }

  return {
    title: article.frontmatter.title,
    description: article.frontmatter.description,
    alternates: {
      canonical: `https://www.gmconsulting.one/insights/${params.slug}`,
    },
  }
}

export default function InsightArticlePage({
  params,
}: {
  params: { slug: string }
}) {
  const article = getArticle(params.slug)
  if (!article) notFound()

  const { frontmatter } = article

  return (
    <>
      <Hero
        variant="compact"
        eyebrow="Insights"
        title={frontmatter.title}
        lead=""
      />

      <section className="bg-paper py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-10">
            <span className="text-caption text-fog">
              {frontmatter.datePublished}
            </span>
            <span className="inline-block text-caption text-brand bg-brand-soft px-2.5 py-1 rounded">
              {frontmatter.readingTime}
            </span>
          </div>

          <div className="bg-accent-soft border border-accent/20 rounded-md p-6 mb-10">
            <p className="text-body text-accent">
              Articolo in fase di redazione finale.
            </p>
          </div>

          {frontmatter.description && (
            <p className="text-body-lg text-steel mb-10">
              {frontmatter.description}
            </p>
          )}

          <div className="pt-10 border-t border-mist">
            <CTAButton variant="secondary" href="/insights">
              Torna agli Insights
            </CTAButton>
          </div>
        </div>
      </section>
    </>
  )
}
