import type { Metadata } from "next"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import Image from "next/image"
import Link from "next/link"
import { MDXRemote } from "next-mdx-remote/rsc"
import { notFound } from "next/navigation"
import { Hero } from "@/components/ui/Hero"
import { CTAButton } from "@/components/ui/CTAButton"
import { insightSlugs } from "@/lib/insights"

const insightsDir = path.join(process.cwd(), "content", "insights")

interface Frontmatter {
  title: string
  /** Titolo per la SERP quando quello editoriale eccede lo snippet utile. */
  metaTitle?: string
  description: string
  /** Sommario mostrato sotto il titolo, quando l'articolo ne ha uno. */
  lead?: string
  datePublished: string
  dateModified?: string
  readingTime: string
  slug: string
  /** Anteprima social propria: senza, la condivisione ricade su quella istituzionale. */
  ogImage?: string
  ogImageAlt?: string
}

const SITE_URL = "https://www.gmconsulting.one"
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.png`

function getArticle(slug: string): { frontmatter: Frontmatter; content: string } | null {
  const filePath = path.join(insightsDir, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(raw)
  return { frontmatter: data as Frontmatter, content }
}

export function generateStaticParams() {
  return insightSlugs.map((slug) => ({ slug }))
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
  const image = frontmatter.ogImage || DEFAULT_OG_IMAGE

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
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: frontmatter.ogImageAlt || frontmatter.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: frontmatter.title,
      description: frontmatter.description,
      images: [image],
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
    image: frontmatter.ogImage || DEFAULT_OG_IMAGE,
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

/**
 * Il corpo MDX non era reso: la pagina serviva solo titolo e description,
 * quindi l'articolo era illeggibile e per i motori una pagina sottile.
 */
const articleComponents = {
  h2: (props: React.ComponentProps<"h2">) => (
    <h2 className="font-display text-h3 text-ink mt-12 mb-4" {...props} />
  ),
  h3: (props: React.ComponentProps<"h3">) => (
    <h3 className="font-display text-h4 text-ink mt-10 mb-3" {...props} />
  ),
  p: (props: React.ComponentProps<"p">) => (
    <p className="text-body text-steel mb-6 leading-relaxed" {...props} />
  ),
  ul: (props: React.ComponentProps<"ul">) => (
    <ul className="mb-6 list-disc space-y-2 pl-6 text-body text-steel" {...props} />
  ),
  ol: (props: React.ComponentProps<"ol">) => (
    <ol
      className="mb-6 list-decimal space-y-2 pl-6 text-body text-steel"
      {...props}
    />
  ),
  strong: (props: React.ComponentProps<"strong">) => (
    <strong className="font-semibold text-ink" {...props} />
  ),
  /**
   * Markdown avvolge l'immagine in un paragrafo: `figure` dentro `p` è
   * annidamento non valido, quindi la didascalia usa elementi inline resi a
   * blocco.
   */
  img: ({ src = "", alt = "" }: React.ComponentProps<"img">) => (
    <span className="mb-8 block">
      <Image
        src={typeof src === "string" ? src : ""}
        alt={alt}
        width={1100}
        height={614}
        className="h-auto w-full rounded-lg"
      />
      <span className="text-caption text-fog mt-2 block">{alt}</span>
    </span>
  ),
  blockquote: (props: React.ComponentProps<"blockquote">) => (
    <blockquote
      className="mb-6 border-l-2 border-brand pl-5 text-body text-ink"
      {...props}
    />
  ),
  a: ({ href = "", ...props }: React.ComponentProps<"a">) => {
    if (href.startsWith("/")) {
      return (
        <Link
          href={href}
          className="text-brand underline underline-offset-2 hover:text-navy-700"
          {...props}
        />
      )
    }

    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-brand underline underline-offset-2 hover:text-navy-700"
        {...props}
      />
    )
  },
}

export default function InsightArticlePage({
  params,
}: {
  params: { slug: string }
}) {
  const article = getArticle(params.slug)
  if (!article) notFound()

  const { frontmatter, content } = article

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
        lead={frontmatter.lead || ""}
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

          <article>
            <MDXRemote source={content} components={articleComponents} />
          </article>

          <div className="pt-10 mt-4 border-t border-mist">
            <CTAButton variant="secondary" href="/insights">
              Torna agli Insights
            </CTAButton>
          </div>
        </div>
      </section>
    </>
  )
}
