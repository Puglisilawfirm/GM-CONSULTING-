import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Hero } from "@/components/ui/Hero"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { CTAButton } from "@/components/ui/CTAButton"

export const metadata: Metadata = {
  title: "Azienda — Chi siamo, visione e valori",
  description:
    "GM Consulting S.r.l., Catania, dal 2002: visione, valori e impegni di una società che progetta architetture di rischio per imprese e organizzazioni.",
  alternates: { canonical: "https://www.gmconsulting.one/azienda" },
}

const numeri = [
  {
    valore: "2002",
    etichetta: "anno di costituzione",
    dettaglio: "operatività continuativa da oltre vent'anni",
  },
  {
    valore: "6",
    etichetta: "aree di intervento",
    dettaglio: "integrate in un'unica architettura di rischio",
  },
  {
    valore: "8",
    etichetta: "standard presidiati",
    dettaglio: "ISO, D.Lgs. 231/2001, UNI/PdR 125",
  },
  {
    valore: "4",
    etichetta: "fasi del metodo",
    dettaglio: "ogni fase produce un artefatto verificabile",
  },
]

const valori = [
  {
    titolo: "Generiamo impatto",
    testo:
      "Ogni intervento deve lasciare l'impresa più solida di come l'abbiamo trovata: rischi ridotti, processi documentati, decisioni misurabili.",
  },
  {
    titolo: "Siamo autentici",
    testo:
      "Costruiamo relazioni di fiducia attraverso trasparenza, integrità e rispetto. Diciamo cosa funziona e cosa no, prima di firmare.",
  },
  {
    titolo: "Riusciamo insieme",
    testo:
      "Lavoriamo come un unico gruppo con il committente, i suoi consulenti e i partner tecnici. Il risultato è collegiale o non è.",
  },
  {
    titolo: "Ci assumiamo la responsabilità",
    testo:
      "SLA contrattuali su KPI quantitativi, copertura assicurativa professionale, rendicontazione periodica: rispondiamo di ciò che consegniamo.",
  },
  {
    titolo: "Guidiamo con l'innovazione",
    testo:
      "Modelli predittivi, automazioni e monitoraggio algoritmico entrano nei progetti solo dopo essere stati testati in sandbox e sottoposti a stress-test giuridico.",
  },
]

const impegni = [
  {
    id: "responsabilita",
    eyebrow: "Responsabilità d'impresa",
    titolo: "Il rischio governato è un bene comune",
    testo:
      "Un'impresa conforme e continuativa protegge lavoratori, fornitori, clienti e territorio. Per questo trattiamo la compliance non come un costo da minimizzare ma come infrastruttura: adeguati assetti ex art. 2086 c.c., business continuity, prevenzione della corruzione e sicurezza delle informazioni sono presidi che tutelano l'intera filiera.",
  },
  {
    id: "inclusione",
    eyebrow: "Accesso e appartenenza",
    titolo: "Parità e diversità come sistema, non come dichiarazione",
    testo:
      "Accompagniamo le organizzazioni verso la certificazione UNI/PdR 125 per la parità di genere e progettiamo procedure che rendano l'inclusione misurabile. Anche il nostro sito è costruito per essere accessibile: la dichiarazione è pubblica e verificabile.",
    link: { href: "/accessibilita", label: "Dichiarazione di accessibilità" },
  },
  {
    id: "conoscenza",
    eyebrow: "Cultura e formazione",
    titolo: "Diffondiamo metodo, non solo servizi",
    testo:
      "Pubblichiamo analisi tecniche sulla regolazione, curiamo una rassegna bigiornaliera di ciò che accade e formiamo il personale delle imprese sui processi che adottano. La conoscenza condivisa riduce il rischio di tutti.",
    link: { href: "/insights", label: "Leggi gli Insights" },
  },
]

export default function AziendaPage() {
  return (
    <>
      <Hero
        variant="compact"
        eyebrow="Azienda"
        title="Le decisioni hanno bisogno di dati. Noi ai dati diamo un metodo."
        lead="Decidere meglio, affinare le operazioni, migliorare i KPI, ridurre l'esposizione. GM Consulting S.r.l. riunisce informazioni normative, economiche e operative, le rende verificabili e le mette al lavoro in analisi, automazioni e monitoraggio continuo. Ovunque risieda il dato, qualunque tecnologia scelga l'impresa, trasformiamo dati migliori in decisioni migliori."
      >
        <div className="flex flex-wrap gap-4">
          <CTAButton variant="primary" href="/metodo">
            Scopri il metodo
          </CTAButton>
          <CTAButton variant="secondary" href="/aree-di-intervento">
            Le aree di intervento
          </CTAButton>
        </div>
      </Hero>

      {/* Numeri */}
      <section className="bg-navy-950 py-16 lg:py-20" aria-labelledby="numeri">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <h2 id="numeri" className="sr-only">
            GM Consulting in numeri
          </h2>
          <dl className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {numeri.map((n) => (
              <div key={n.etichetta} className="border-l border-gold-500/40 pl-6">
                <dd className="font-display font-bold text-display-md text-gold-400 leading-none">
                  {n.valore}
                </dd>
                <dt className="mt-3 font-mono text-mono-label uppercase tracking-[0.18em] text-paper-100">
                  {n.etichetta}
                </dt>
                <p className="mt-2 text-sm text-paper-200">{n.dettaglio}</p>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Visione */}
      <section className="bg-white py-section-mobile lg:py-section" aria-labelledby="visione">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12 grid gap-12 lg:grid-cols-[1fr_2fr] items-start">
          <div>
            <p className="text-eyebrow uppercase tracking-[0.12em] text-brand mb-4">
              Ossessionati dal dato, come te
            </p>
            <h2 id="visione" className="text-h2 text-ink">
              La nostra visione
            </h2>
          </div>
          <div className="space-y-6 max-w-2xl">
            <p className="text-body-lg text-ink">
              Aiutiamo ogni organizzazione a far lavorare i propri dati per le
              decisioni che contano, trasformando informazioni complesse —
              norme, bilanci, processi, incidenti — in esiti rilevanti per
              l&apos;impresa, per i suoi clienti e per il territorio in cui
              opera.
            </p>
            <p className="text-body text-graphite">
              Dal 2002 progettiamo architetture di rischio per imprese e
              organizzazioni complesse: sei aree di intervento integrate,
              otto standard di compliance presidiati, prodotti verticali in
              continua evoluzione. Il tutto reso con un metodo in quattro
              fasi che produce, a ogni passaggio, documentazione verificabile.
            </p>
          </div>
        </div>
      </section>

      {/* Valori */}
      <section className="bg-paper py-section-mobile lg:py-section" aria-labelledby="valori">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <SectionHeader
            eyebrow="I nostri valori"
            title="Cinque principi guidano il modo in cui affrontiamo i problemi dei clienti"
            lead="Non sono uno slogan: sono i criteri con cui accettiamo un incarico, componiamo un team e misuriamo il risultato."
          />
          <ol className="mt-16 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
            {valori.map((v, i) => (
              <li key={v.titolo} className="bg-white p-8 lg:p-10">
                <span className="font-mono text-mono-label text-gold-600">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold text-ink">
                  {v.titolo}
                </h3>
                <p className="mt-3 text-body text-graphite">{v.testo}</p>
              </li>
            ))}
            <li className="bg-navy-900 p-8 lg:p-10 flex flex-col justify-between">
              <p className="font-display text-xl font-semibold text-paper-50">
                Vuoi vedere i valori all&apos;opera?
              </p>
              <Link
                href="/metodo"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-gold-400 hover:text-gold-300 transition-colors"
              >
                Il metodo in quattro fasi
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </li>
          </ol>
        </div>
      </section>

      {/* Impegni */}
      <section className="bg-white py-section-mobile lg:py-section" aria-labelledby="impegni">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <SectionHeader
            eyebrow="Oltre il dato"
            title="Ci impegniamo per molto più che la conformità"
          />
          <nav
            aria-label="Sezioni degli impegni"
            className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-b border-border pb-6"
          >
            {impegni.map((imp) => (
              <a
                key={imp.id}
                href={`#${imp.id}`}
                className="text-sm font-medium text-ink underline-offset-8 decoration-2 decoration-gold-500 hover:underline"
              >
                {imp.eyebrow}
              </a>
            ))}
          </nav>
          <div className="mt-16 space-y-20">
            {impegni.map((imp) => (
              <article
                key={imp.id}
                id={imp.id}
                className="grid gap-8 lg:grid-cols-[1fr_2fr] items-start scroll-mt-32"
              >
                <p className="text-eyebrow uppercase tracking-[0.12em] text-brand">
                  {imp.eyebrow}
                </p>
                <div className="max-w-2xl">
                  <h3 className="text-h3 text-ink">{imp.titolo}</h3>
                  <p className="mt-4 text-body text-graphite">{imp.testo}</p>
                  {imp.link && (
                    <Link
                      href={imp.link.href}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-brand hover:text-navy-700 transition-colors"
                    >
                      {imp.link.label}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Fiducia */}
      <section className="bg-paper py-section-mobile lg:py-section" aria-labelledby="fiducia">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12 grid gap-12 lg:grid-cols-2 items-start">
          <div>
            <p className="text-eyebrow uppercase tracking-[0.12em] text-brand mb-4">
              Una rete di competenze
            </p>
            <h2 id="fiducia" className="text-h2 text-ink">
              Lavoriamo in convenzione con chi presidia il profilo giuridico
            </h2>
          </div>
          <div className="max-w-2xl">
            <p className="text-body text-graphite">
              L&apos;audit giuridico preliminare e lo stress-test legale degli
              scenari sono resi in convenzione con Studio Legale Avv. Maria
              Puglisi, su autonomo mandato del cliente. Il progetto tecnico e
              quello giuridico avanzano in parallelo e si verificano a
              vicenda.
            </p>
            <Link
              href="/convenzione-studio"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-brand hover:text-navy-700 transition-colors"
            >
              La convenzione con lo Studio
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Sede */}
      <section className="bg-white py-16" aria-labelledby="sede">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <h2 id="sede" className="sr-only">
            Sede e riferimenti
          </h2>
          <dl className="grid gap-8 sm:grid-cols-3 text-sm">
            <div>
              <dt className="font-mono text-mono-label uppercase tracking-[0.18em] text-steel">
                Ragione sociale
              </dt>
              <dd className="mt-2 text-ink">GM Consulting S.r.l.</dd>
            </div>
            <div>
              <dt className="font-mono text-mono-label uppercase tracking-[0.18em] text-steel">
                Sede
              </dt>
              <dd className="mt-2 text-ink">
                Via Nuovalucello 81/C, 95126 Catania (CT)
              </dd>
            </div>
            <div>
              <dt className="font-mono text-mono-label uppercase tracking-[0.18em] text-steel">
                Contatti
              </dt>
              <dd className="mt-2 text-ink">
                <a href="mailto:info@gmconsulting.one" className="hover:text-brand">
                  info@gmconsulting.one
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* CTA finale */}
      <section className="bg-brand py-20">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12 text-center">
          <h2 className="text-h2 text-white mb-4">Parliamo della tua impresa</h2>
          <p className="text-body-lg text-blue-200 max-w-2xl mx-auto">
            Compila l&apos;assessment: riceverai entro 72 ore lavorative
            un&apos;analisi sintetica dei principali profili di rischio
            rilevati.
          </p>
          <div className="mt-8">
            <CTAButton
              variant="primary"
              href="/assessment"
              className="bg-white text-brand hover:bg-paper"
            >
              Richiedi assessment
            </CTAButton>
          </div>
        </div>
      </section>
    </>
  )
}
