import type { Metadata } from "next"
import { Hero } from "@/components/ui/Hero"
import { CTAButton } from "@/components/ui/CTAButton"

export const metadata: Metadata = {
  title: "Richiesta ricevuta",
}

export default function InviatoPage() {
  return (
    <>
      <Hero
        variant="compact"
        eyebrow="Assessment preliminare"
        title="Richiesta ricevuta"
        lead=""
      />

      <section className="bg-paper py-20 lg:py-28">
        <div className="mx-auto max-w-2xl px-6 lg:px-12 text-center">
          <p className="text-body-lg text-graphite mb-10">
            La tua richiesta è stata correttamente trasmessa. Ti ricontatteremo
            entro 72 ore lavorative all&apos;indirizzo email indicato. Nel
            frattempo, puoi esplorare la sezione Insights per approfondimenti
            sui temi trattati.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton variant="secondary" href="/">
              Torna alla home
            </CTAButton>
            <CTAButton variant="secondary" href="/insights">
              Vai agli Insights
            </CTAButton>
          </div>
        </div>
      </section>
    </>
  )
}
