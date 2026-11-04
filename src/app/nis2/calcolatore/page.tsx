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
    images: [{ url: `${baseUrl}/og/nis2-calcolatore.jpg`, width: 1200, height: 630, alt: "Calcolatore NIS2 — GM Consulting" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Calcolatore NIS2 — valutazione preliminare del perimetro",
    description:
      "Inserisci occupati, fatturato e bilancio, le imprese del gruppo e la tipologia di attività: l'esito applica la lettura ACN del D.Lgs. 138/2024.",
    images: [`${baseUrl}/og/nis2-calcolatore.jpg`],
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

      <section
        className="relative bg-navy-900 pt-28 pb-16 md:pt-32 md:pb-20 overflow-hidden"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent 0, transparent 2px, rgba(15,30,54,0.6) 2px, rgba(15,30,54,0.6) 3px)",
        }}
      >
        <span
          className="absolute bottom-0 right-0 font-display font-black text-[clamp(180px,24vw,320px)] text-gold-500/[0.05] leading-none select-none pointer-events-none"
          aria-hidden="true"
        >
          NIS2
        </span>
        <div className="relative max-w-7xl mx-auto px-6 md:px-10 lg:px-14">
          <p className="font-mono text-mono-label uppercase tracking-[0.22em] text-gold-400">
            NIS2 &middot; D.Lgs. 138/2024
          </p>
          <h1 className="mt-6 font-display font-bold text-display-lg text-paper-50">
            Calcolatore del <span className="italic text-gold-400">perimetro NIS2</span>
          </h1>
          <p className="mt-8 max-w-2xl text-body-lg text-paper-200">
            Valutazione preliminare in tre passaggi: dati dell&apos;impresa, gruppo, tipologia di
            attività. Il calcolo applica la raccomandazione 2003/361/CE nella lettura
            dell&apos;Agenzia per la cybersicurezza nazionale e l&apos;art. 3 del decreto NIS. Tutto
            avviene nel browser: nessun dato viene trasmesso o conservato.
          </p>
          <Link
            href="/nis2"
            className="mt-8 inline-flex items-center gap-2 text-gold-400 font-semibold hover:text-gold-300 transition-colors"
          >
            Come funziona il calcolo
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="bg-paper-50 py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14">
          <CalcolatorePerimetro />
        </div>
      </section>
    </>
  )
}
