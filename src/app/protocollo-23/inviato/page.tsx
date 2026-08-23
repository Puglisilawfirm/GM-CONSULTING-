import type { Metadata } from "next"
import { CTAButton } from "@/components/ui/CTAButton"

export const metadata: Metadata = {
  title: "Richiesta ricevuta — Protocollo 23",
  // Pagina di conferma: utile a chi ha appena inviato il form, inutile in
  // ricerca. Indicizzata competeva con `/protocollo-23` su query informative.
  robots: { index: false, follow: true },
  alternates: { canonical: "https://www.gmconsulting.one/protocollo-23" },
}

export default function Protocollo23InviatoPage() {
  return (
    <section className="bg-white py-32 lg:py-40">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12 text-center">
        <h1 className="text-h1 text-ink">Richiesta ricevuta</h1>
        <p className="text-body text-graphite mt-6 max-w-2xl mx-auto">
          La Sua richiesta di Diagnostico AML è stata correttamente trasmessa.
          Ti ricontatteremo entro 5 giorni lavorativi all&apos;indirizzo email
          indicato con una proposta operativa personalizzata.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <CTAButton variant="secondary" href="/protocollo-23">
            Torna a Protocollo 23
          </CTAButton>
          <CTAButton variant="secondary" href="/">
            Vai alla Home
          </CTAButton>
        </div>
      </div>
    </section>
  )
}
