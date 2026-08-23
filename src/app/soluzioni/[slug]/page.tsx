import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, Check } from "lucide-react"
import { Hero } from "@/components/ui/Hero"
import { CTAButton } from "@/components/ui/CTAButton"
import { getSolutionLanding, solutionLandings } from "@/lib/landings/solutions"

const baseUrl = "https://www.gmconsulting.one"

/** Nessuno slug fuori elenco: un URL inventato risponde 404, non una pagina vuota. */
export const dynamicParams = false

export function generateStaticParams() {
  return solutionLandings.map((landing) => ({ slug: landing.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const landing = getSolutionLanding(params.slug)
  if (!landing) return {}

  const url = `${baseUrl}/soluzioni/${landing.slug}`
  return {
    title: landing.metaTitle,
    description: landing.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: landing.metaTitle,
      description: landing.metaDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: landing.metaTitle,
      description: landing.metaDescription,
    },
  }
}

export default function SolutionLandingPage({ params }: { params: { slug: string } }) {
  const landing = getSolutionLanding(params.slug)
  if (!landing) notFound()

  const url = `${baseUrl}/soluzioni/${landing.slug}`
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: landing.h1,
        serviceType: landing.serviceType,
        description: landing.metaDescription,
        url,
        provider: {
          "@type": "ProfessionalService",
          name: "GM Consulting S.r.l.",
          url: baseUrl,
        },
        areaServed: [
          { "@type": "Country", name: "Italia" },
          { "@type": "AdministrativeArea", name: "Sicilia" },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: landing.faq.map((voce) => ({
          "@type": "Question",
          name: voce.question,
          acceptedAnswer: { "@type": "Answer", text: voce.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/` },
          { "@type": "ListItem", position: 2, name: "Soluzioni", item: `${baseUrl}/soluzioni` },
          { "@type": "ListItem", position: 3, name: landing.h1, item: url },
        ],
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Hero variant="compact" eyebrow={landing.eyebrow} title={landing.h1} lead={landing.intro}>
        <CTAButton variant="primary" href="/assessment">
          Richiedi un assessment
          <ArrowRight className="ml-2 h-4 w-4" />
        </CTAButton>
      </Hero>

      {landing.sections.map((section, index) => (
        <section key={section.heading} className={index % 2 === 0 ? "bg-paper py-16" : "bg-white py-16"}>
          <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
            <h2 className="text-h2 text-ink mb-6 max-w-3xl">{section.heading}</h2>
            {section.paragraphs?.map((paragrafo) => (
              <p key={paragrafo} className="text-body text-steel max-w-3xl mb-4">
                {paragrafo}
              </p>
            ))}
            {section.bullets && (
              <ul className="mt-4 grid gap-3 md:grid-cols-2">
                {section.bullets.map((voce) => (
                  <li key={voce} className="flex gap-3 text-body text-steel">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-brand" aria-hidden />
                    <span>{voce}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      ))}

      <section className="bg-white py-16">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <h2 className="text-h2 text-ink mb-8">Domande frequenti</h2>
          <div className="grid gap-6 lg:grid-cols-2">
            {landing.faq.map((voce) => (
              <div key={voce.question} className="rounded-lg border border-mist bg-paper p-6">
                <h3 className="text-h3 text-ink mb-3">{voce.question}</h3>
                <p className="text-body text-steel">{voce.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-16">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <h2 className="text-h2 text-ink mb-6">Approfondimenti collegati</h2>
          <ul className="flex flex-wrap gap-4">
            {landing.related.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex items-center gap-2 rounded-md border border-mist bg-white px-4 py-3 text-body text-brand hover:bg-brand-soft"
                >
                  {link.label}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-brand py-16 lg:py-24">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12 text-center">
          <h2 className="text-h2 text-white mb-4">Vuoi una valutazione preliminare?</h2>
          <p className="text-body-lg text-brand-soft max-w-2xl mx-auto mb-8">
            Analizziamo la situazione dell&apos;impresa e restituiamo un documento con le priorità di
            intervento, i tempi e i costi stimati.
          </p>
          <CTAButton
            variant="secondary"
            href="/assessment"
            className="border-white text-white hover:bg-white hover:text-brand"
          >
            Richiedi assessment
            <ArrowRight className="ml-2 h-4 w-4" />
          </CTAButton>
        </div>
      </section>
    </>
  )
}
