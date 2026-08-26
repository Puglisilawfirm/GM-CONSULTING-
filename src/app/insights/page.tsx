import type { Metadata } from "next"
import Link from "next/link"
import { Hero } from "@/components/ui/Hero"
import { insights } from "@/lib/insights"

export const metadata: Metadata = {
  title: "Insights — Analisi e position paper",
  description:
    "Note metodologiche e analisi normative su compliance, governance e automazione dei processi.",
  alternates: { canonical: "https://www.gmconsulting.one/insights" },
}

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
            {insights.map((article) => (
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
