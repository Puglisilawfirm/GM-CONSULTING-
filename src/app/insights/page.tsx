import type { Metadata } from "next"
import Link from "next/link"
import { Hero } from "@/components/ui/Hero"

export const metadata: Metadata = {
  title: "Insights — Analisi e position paper",
  description:
    "Note metodologiche e analisi normative su compliance, governance e automazione dei processi.",
  alternates: { canonical: "https://www.gmconsulting.one/insights" },
}

const articles = [
  {
    slug: "iso-37001-37301-dlgs-231-architettura-integrata",
    title:
      "L'integrazione fra ISO 37001:2025, ISO 37301 e D.Lgs. 231/2001",
    subtitle:
      "Architettura unica per tre sistemi sovrapposti",
    readingTime: "12 min",
    date: "20 maggio 2026",
  },
  {
    slug: "uni-pdr-125-2022-premialita-pnrr",
    title: "Certificazione UNI/PdR 125:2022 e premialità PNRR",
    subtitle:
      "Guida tecnica all'accesso agli sgravi contributivi e ai bandi pubblici",
    readingTime: "8 min",
    date: "20 maggio 2026",
  },
  {
    slug: "compliance-by-design-workflow-python-gdpr-nis2",
    title: "Compliance by design nei processi automatizzati",
    subtitle:
      "Come progettare workflow Python conformi al GDPR e a NIS2",
    readingTime: "10 min",
    date: "20 maggio 2026",
  },
]

export default function InsightsPage() {
  return (
    <>
      <Hero
        variant="compact"
        eyebrow="Insights"
        title="Analisi e position paper su compliance, governance, automazione"
        lead="Pubblichiamo periodicamente note metodologiche e analisi normative sui temi al centro della nostra pratica professionale."
      />

      <section className="bg-paper py-20 lg:py-28">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <div className="grid gap-8 lg:grid-cols-3">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/insights/${article.slug}`}
                className="group block border border-mist rounded-lg p-6 bg-white hover:shadow-md transition-shadow"
              >
                <p className="text-caption text-fog mb-3">{article.date}</p>
                <h3 className="text-h4 text-ink mb-2 group-hover:text-brand transition-colors">
                  {article.title}
                </h3>
                <p className="text-body-lg text-steel mb-4">
                  {article.subtitle}
                </p>
                <span className="inline-block text-caption text-brand bg-brand-soft px-2.5 py-1 rounded">
                  {article.readingTime}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
