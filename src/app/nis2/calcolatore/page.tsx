import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { CalcolatorePerimetro } from "@/components/nis2/CalcolatorePerimetro"

const baseUrl = "https://www.gmconsulting.one"
const url = `${baseUrl}/nis2/calcolatore`

export const metadata: Metadata = {
  title: "Calcolatore NIS2: sei soggetto essenziale, importante o fuori ambito?",
  description:
    "Strumento gratuito per la valutazione preliminare del perimetro NIS2: classe dimensionale con aggregazione di gruppo, tipologia di attività, art. 3 c. 10 e clausola di salvaguardia. Nessun dato trasmesso.",
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    title: "Calcolatore NIS2 — valutazione preliminare del perimetro",
    description:
      "Inserisci occupati, fatturato e bilancio, le imprese del gruppo e la tipologia di attività: l'esito applica la lettura ACN del D.Lgs. 138/2024.",
  },
}

export default function CalcolatoreNis2Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${url}#app`,
    name: "Calcolatore perimetro NIS2",
    url,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    provider: { "@type": "ProfessionalService", name: "GM Consulting S.r.l.", url: baseUrl },
    inLanguage: "it",
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <p className="text-eyebrow uppercase tracking-[0.12em] text-brand mb-6">
            NIS2 — D.Lgs. 138/2024
          </p>
          <h1 className="text-h1 text-ink">Calcolatore del perimetro NIS2</h1>
          <p className="text-body-lg text-steel max-w-3xl mt-6">
            Valutazione preliminare in tre passaggi: dati dell&apos;impresa, gruppo, tipologia di
            attività. Il calcolo applica la raccomandazione 2003/361/CE nella lettura
            dell&apos;Agenzia per la cybersicurezza nazionale e l&apos;art. 3 del decreto NIS. Tutto
            avviene nel browser: nessun dato viene trasmesso o conservato.
          </p>
          <Link
            href="/nis2"
            className="mt-6 inline-flex items-center gap-2 text-body text-brand hover:underline"
          >
            Come funziona il calcolo
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </section>

      <section className="bg-paper py-12 lg:py-16">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <CalcolatorePerimetro />
        </div>
      </section>
    </>
  )
}
