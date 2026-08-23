import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Hero } from "@/components/ui/Hero"
import { solutionLandings } from "@/lib/landings/solutions"

export const metadata: Metadata = {
  title: "Soluzioni: quattro linee di intervento",
  description:
    "Le quattro linee di intervento di GM Consulting: finanza agevolata per gli investimenti, pianificazione strategica, business intelligence e adempimenti NIS2.",
  alternates: { canonical: "https://www.gmconsulting.one/soluzioni" },
}

export default function SoluzioniPage() {
  return (
    <>
      <Hero
        variant="compact"
        eyebrow="Soluzioni"
        title="Quattro linee di intervento, un unico impianto"
        lead="Ogni linea risponde a una domanda che l'impresa si pone in un momento preciso: come finanziare un investimento, come pianificare e dimostrare di averlo fatto, come misurare ciò che accade, come reggere un incidente informatico e i suoi obblighi."
      />

      <section className="bg-paper py-16 lg:py-24">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <div className="grid gap-8 lg:grid-cols-2">
            {solutionLandings.map((landing) => (
              <article key={landing.slug} className="rounded-lg border border-mist bg-white p-8">
                <p className="text-eyebrow uppercase tracking-[0.12em] text-brand mb-3">{landing.eyebrow}</p>
                <h2 className="text-h3 text-ink mb-3">{landing.h1}</h2>
                <p className="text-body text-steel mb-6">{landing.cardSummary}</p>
                <Link
                  href={`/soluzioni/${landing.slug}`}
                  className="inline-flex items-center gap-2 text-body text-brand hover:underline"
                >
                  Apri la pagina
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
