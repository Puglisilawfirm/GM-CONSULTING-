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
  /** Titolo per la SERP quando quello editoriale eccede lo snippet utile. */
  metaTitle?: string
  description: string
  datePublished: string
  dateModified?: string
  readingTime: string
  slug: string
}

const SITE_URL = "https://www.gmconsulting.one"
const OG_IMAGE = `${SITE_URL}/og-default.png`

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

  const { frontmatter } = article
  const url = `${SITE_URL}/insights/${params.slug}`

  return {
    title: frontmatter.metaTitle || frontmatter.title,
    description: frontmatter.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: "it_IT",
      siteName: "GM Consulting S.r.l.",
      title: frontmatter.title,
      description: frontmatter.description,
      url,
      publishedTime: frontmatter.datePublished,
      modifiedTime: frontmatter.dateModified || frontmatter.datePublished,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: frontmatter.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: frontmatter.title,
      description: frontmatter.description,
      images: [OG_IMAGE],
    },
  }
}

/**
 * Senza dati strutturati d'articolo la pagina esponeva solo il
 * `ProfessionalService` del layout: per i motori era una pagina di servizio,
 * non un contenuto editoriale con autore e data.
 */
function articleJsonLd(frontmatter: Frontmatter, slug: string) {
  const url = `${SITE_URL}/insights/${slug}`

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: frontmatter.title,
    description: frontmatter.description,
    datePublished: frontmatter.datePublished,
    dateModified: frontmatter.dateModified || frontmatter.datePublished,
    inLanguage: "it-IT",
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: OG_IMAGE,
    author: {
      "@type": "Organization",
      name: "GM Consulting S.r.l.",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "GM Consulting S.r.l.",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo-gmconsulting-512.png`,
      },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd(frontmatter, params.slug)),
        }}
      />
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
