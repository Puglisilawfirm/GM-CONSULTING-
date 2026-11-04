import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"

const baseUrl = "https://www.gmconsulting.one"
const url = `${baseUrl}/nis2`

export const metadata: Metadata = {
  title: "Rientri nel perimetro NIS2? Soglie, gruppi e calcolo",
  description:
    "Come verificare se un'impresa è soggetto NIS2: le soglie dimensionali nella lettura ACN, il calcolo con le imprese collegate e associate, l'art. 3 c. 10, la clausola di salvaguardia e il calcolatore.",
  alternates: { canonical: url },
  openGraph: {
    type: "article",
    url,
    title: "Rientri nel perimetro NIS2?",
    description:
      "Soglie dimensionali, gruppi di imprese, clausola di salvaguardia e un calcolatore per la valutazione preliminare.",
    images: [{ url: `${baseUrl}/og/nis2.jpg`, width: 1200, height: 630, alt: "Rientri nel perimetro NIS2? — GM Consulting" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rientri nel perimetro NIS2?",
    description:
      "Soglie dimensionali, gruppi di imprese, clausola di salvaguardia e un calcolatore per la valutazione preliminare.",
    images: [`${baseUrl}/og/nis2.jpg`],
  },
}

const passi = [
  {
    numero: "01",
    titolo: "Giurisdizione",
    testo:
      "Il decreto si applica alle singole persone giuridiche stabilite in Italia, non ai gruppi: ogni società si valuta da sola. Eccezioni per le comunicazioni elettroniche e per i servizi digitali transfrontalieri, dove conta lo stabilimento principale.",
  },
  {
    numero: "02",
    titolo: "Dimensione",
    testo:
      "Si verifica se l'impresa, con i dati aggregati del gruppo, supera i massimali della piccola impresa. Chi resta micro o piccola è fuori ambito, salvo le inclusioni che prescindono dalla dimensione.",
  },
  {
    numero: "03",
    titolo: "Tipologia",
    testo:
      "Si confrontano le attività effettivamente svolte con le tipologie degli Allegati I e II. Basta una sola attività, anche residuale, salvo acqua potabile, acque reflue e gestione dei rifiuti, dove conta l'attività principale.",
  },
]

const soglie = [
  ["Microimpresa", "meno di 10", "fino a 2 mln", "oppure fino a 2 mln"],
  ["Piccola impresa", "meno di 50", "fino a 10 mln", "oppure fino a 10 mln"],
  ["Media impresa", "meno di 250", "fino a 50 mln", "oppure fino a 43 mln"],
  ["Grande impresa", "250 o più", "oltre 50 mln", "e oltre 43 mln"],
]

const esempi = [
  ["meno di 50", "tra 2 e 10 mln", "oltre 43 mln", "Piccola"],
  ["meno di 10", "tra 10 e 43 mln", "tra 10 e 43 mln", "Media"],
  ["meno di 10", "oltre 50 mln", "tra 10 e 43 mln", "Media"],
  ["meno di 10", "50 mln o più", "43 mln o più", "Grande"],
  ["tra 50 e 249", "fino a 10 mln", "fino a 10 mln", "Media"],
  ["250 o più", "fino a 10 mln", "fino a 10 mln", "Grande"],
]

const provvedimenti = [
  {
    titolo: "FAQ ACN — Ambito di applicazione (AMB.GE, AMB.DI)",
    href: "https://www.acn.gov.it/portale/faq/nis/ambito",
    data: "aggiornate nel 2025",
    rilievo: "Regola di lettura delle soglie, esempi numerici, aggregazione di gruppo, clausola di salvaguardia, art. 3 c. 10",
    stato: "Vigente",
  },
  {
    titolo: "FAQ ACN — Dettaglio degli ambiti di applicazione (FAQ 1-5)",
    href: "https://www.acn.gov.it/portale/documents/d/guest/faq-1-5_dettaglio-ambiti-di-applicazione",
    data: "2025",
    rilievo: "Lettura settoriale delle tipologie degli Allegati I e II",
    stato: "Vigente",
  },
  {
    titolo: "Determinazione n. 38565/2024 — piattaforma digitale e registrazione",
    href: "https://www.dirittobancario.it/wp-content/uploads/2024/12/Determinazione-del-Direttore-generale-dellAgenzia-per-la-cybersicurezza-nazionale-26-novembre-2024-n.-38565.pdf",
    data: "26/11/2024",
    rilievo: "Definizioni di impresa autonoma, collegata e gruppo; prima disciplina dei dati dimensionali da dichiarare",
    stato: "Sostituita",
  },
  {
    titolo: "Determinazione n. 379887/2025 — piattaforma NIS e registrazione 2026",
    href: "https://www.acn.gov.it/portale/documents/d/guest/detacn_piattaformanis_251218-v9_signed",
    data: "19/12/2025",
    rilievo: "Registrazione annuale; dichiarazione precompilata per i soggetti già in elenco",
    stato: "Sostituita",
  },
  {
    titolo: "Determinazione n. 379907/2025 — obblighi di base",
    href: "https://www.acn.gov.it/portale/documents/d/guest/detacn_obblighi_2511-v3_signed",
    data: "18/12/2025",
    rilievo: "Misure di sicurezza e incidenti significativi: l'allegato applicabile dipende dalla qualifica di soggetto essenziale o importante",
    stato: "Vigente dal 15/01/2026",
  },
  {
    titolo: "Determinazione n. 127434/2026 — termini per i soggetti inseriti nel 2026",
    href: "https://www.acn.gov.it/portale/documents/d/guest/detacn_misuresicurezza-v4_post",
    data: "13/04/2026",
    rilievo: "Decorrenza degli obblighi per la coorte 2026; nessun criterio dimensionale",
    stato: "Vigente dal 30/04/2026",
  },
  {
    titolo: "Determinazione n. 127437/2026 — piattaforma NIS, fornitori rilevanti e categorizzazione",
    href: "https://www.acn.gov.it/portale/w/acn-convoca-il-tavolo-per-l-attuazione-della-disciplina-nis",
    data: "13/04/2026",
    rilievo: "Aggiornamento annuale delle informazioni; conferma dei dati dimensionali",
    stato: "Sostituita",
  },
  {
    titolo: "Determinazione sulla categorizzazione delle attività e dei servizi (art. 30, c. 2)",
    href: "https://www.acn.gov.it/portale/documents/d/guest/detacn_categorizzazione_260409-v8_signed",
    data: "aprile 2026",
    rilievo: "Categorie di rilevanza delle attività; non incide sulla dimensione",
    stato: "Vigente dal 01/05/2026",
  },
  {
    titolo: "Determinazione n. 314287/2026 — piattaforma NIS e registrazione 2027",
    href: "https://www.acn.gov.it/portale/documents/d/guest/detacn_piattaforma_314287-2026_signeddg",
    data: "20/10/2026",
    rilievo: "Dichiarazione del soggetto (art. 11): dati dimensionali con aggregazione, capogruppo, collegate ex art. 3 c. 10; clausola di salvaguardia (art. 12); esonero per chi è già in elenco senza modifiche",
    stato: "Vigente dal 25/10/2026",
  },
]

const faq = [
  {
    question: "Un'impresa con 50 dipendenti è sempre soggetta alla NIS2?",
    answer:
      "No. La dimensione è una delle tre condizioni: l'impresa deve anche svolgere un'attività riconducibile agli Allegati I o II ed essere soggetta alla giurisdizione italiana. Un'impresa grande che non opera in quei settori resta fuori, salvo individuazione da parte dell'Autorità.",
  },
  {
    question: "Con 40 dipendenti e 12 milioni di fatturato sono fuori?",
    answer:
      "Dipende dal totale di bilancio. Nella lettura ACN la piccola impresa ha meno di 50 occupati e almeno uno dei due parametri contabili entro 10 milioni: con 12 milioni di fatturato ma 8 di bilancio si resta piccoli; con 12 e 11 si diventa medi.",
  },
  {
    question: "La mia società è piccola ma appartiene a un grande gruppo: che cosa succede?",
    answer:
      "I dati delle imprese collegate si sommano per intero, quelli delle associate in proporzione alla quota: una piccola società di un grande gruppo è, ai fini NIS, una grande impresa. Se i suoi sistemi e i suoi servizi NIS sono totalmente indipendenti dal gruppo, può chiedere in registrazione la clausola di salvaguardia.",
  },
  {
    question: "Gestisco l'IT di una società del gruppo che è soggetto NIS: rientro anche io?",
    answer:
      "Sì, indipendentemente dalla dimensione: l'art. 3, c. 10 attrae l'impresa collegata che decide le misure di sicurezza, gestisce i sistemi da cui dipendono i servizi, svolge le operazioni di sicurezza o fornisce servizi TIC a un soggetto NIS del gruppo. In questo caso la clausola di salvaguardia non è disponibile.",
  },
  {
    question: "Quando e dove si dichiara la dimensione?",
    answer:
      "In sede di registrazione o aggiornamento annuale sulla piattaforma ACN, fra il 1° gennaio e il 28 febbraio, dichiarando occupati, fatturato e bilancio calcolati con l'aggregazione di gruppo; la piattaforma restituisce una valutazione preliminare e l'Autorità comunica l'esito entro aprile.",
  },
]

export default function Nis2PerimetroPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: faq.map((voce) => ({
          "@type": "Question",
          name: voce.question,
          acceptedAnswer: { "@type": "Answer", text: voce.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/` },
          { "@type": "ListItem", position: 2, name: "Rientri nel perimetro NIS2?", item: url },
        ],
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section
        className="relative bg-navy-900 pt-28 pb-20 md:pt-32 md:pb-24 overflow-hidden"
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
            Rientri nel perimetro <span className="italic text-gold-400">NIS2</span>?
          </h1>
          <p className="mt-8 max-w-2xl text-body-lg text-paper-200">
            La risposta dipende da tre condizioni che vanno verificate insieme: giurisdizione,
            dimensione e tipologia di attività. La dimensione si calcola con i criteri della
            raccomandazione europea sulle PMI, nella lettura data dall&apos;Agenzia per la
            cybersicurezza nazionale, e nei gruppi si misura sui dati aggregati. Qui il metodo, le
            soglie e un calcolatore per la valutazione preliminare.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/nis2/calcolatore"
              className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold px-6 py-3 rounded-md transition-colors"
            >
              Verifica con il calcolatore
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/soluzioni/cybersecurity-nis2"
              className="inline-flex items-center gap-2 border border-paper-200 text-paper-100 hover:bg-paper-50/10 font-semibold px-6 py-3 rounded-md transition-colors"
            >
              Gli adempimenti NIS2
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-paper-100 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14">
          <h2 className="font-display font-bold text-display-md text-navy-950 mb-6 max-w-3xl">Il test in tre passi</h2>
          <p className="text-body text-ink-scale-700 max-w-3xl mb-10">
            È l&apos;ordine indicato dall&apos;Agenzia nel processo di autovalutazione: si verifica per
            singola persona giuridica, anche all&apos;interno di un gruppo, e la dimensione è il secondo
            passo, non il primo.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {passi.map((passo) => (
              <div key={passo.numero} className="rounded-md border border-border bg-surface p-6 hover:border-gold-500 transition-colors">
                <span className="font-mono text-mono-label text-gold-600">{passo.numero}</span>
                <h3 className="font-display font-semibold text-h3 text-navy-950 mt-3 mb-3">{passo.titolo}</h3>
                <p className="text-body text-ink-scale-700">{passo.testo}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14">
          <h2 className="font-display font-bold text-display-md text-navy-950 mb-6 max-w-3xl">Le soglie dimensionali</h2>
          <p className="text-body text-ink-scale-700 max-w-3xl mb-4">
            Il decreto si applica ai soggetti degli Allegati I e II che superano i massimali della
            piccola impresa (art. 3, c. 2). Nella lettura ACN la classe si determina quando sono
            soddisfatti insieme il criterio degli occupati e almeno uno dei due parametri contabili;
            si sale di classe se si superano entrambi i parametri contabili oppure il solo criterio
            degli occupati.
          </p>
          <p className="text-body text-ink-scale-700 max-w-3xl mb-8">
            In pratica: si entra nel perimetro con almeno 50 occupati, oppure con meno di 50 occupati
            ma più di 10 milioni sia di fatturato sia di totale di bilancio. Si è soggetto essenziale,
            nei settori dell&apos;Allegato I, con almeno 250 occupati oppure con più di 50 milioni di
            fatturato e più di 43 milioni di bilancio.
          </p>
          <div className="overflow-x-auto rounded-md border border-border bg-surface">
            <table className="w-full text-left text-body">
              <thead className="bg-navy-900 text-white text-caption uppercase tracking-wide">
                <tr>
                  <th className="px-4 py-3">Classe</th>
                  <th className="px-4 py-3">Occupati (ULA)</th>
                  <th className="px-4 py-3">Fatturato annuo</th>
                  <th className="px-4 py-3">Totale di bilancio</th>
                </tr>
              </thead>
              <tbody>
                {soglie.map((riga) => (
                  <tr key={riga[0]} className="border-t border-border">
                    {riga.map((cella, i) => (
                      <td key={i} className={`px-4 py-3 ${i === 0 ? "font-semibold text-navy-950" : "text-ink-scale-700"}`}>
                        {cella}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="font-display font-semibold text-h3 text-navy-950 mt-12 mb-4">Gli esempi dell&apos;Agenzia</h3>
          <p className="text-body text-ink-scale-700 max-w-3xl mb-6">
            Sono i sei casi riportati nella FAQ AMB.DI.1 (già 2.3) della sezione «Ambito»: mostrano
            che un&apos;impresa con pochi occupati può essere media o grande per i soli parametri
            contabili, e che un&apos;impresa con molti occupati lo è anche con conti contenuti.
          </p>
          <div className="overflow-x-auto rounded-md border border-border bg-surface">
            <table className="w-full text-left text-body">
              <thead className="bg-navy-900 text-white text-caption uppercase tracking-wide">
                <tr>
                  <th className="px-4 py-3">Occupati</th>
                  <th className="px-4 py-3">Fatturato</th>
                  <th className="px-4 py-3">Bilancio</th>
                  <th className="px-4 py-3">Classe</th>
                </tr>
              </thead>
              <tbody>
                {esempi.map((riga, r) => (
                  <tr key={r} className="border-t border-border">
                    {riga.map((cella, i) => (
                      <td key={i} className={`px-4 py-3 ${i === 3 ? "font-semibold text-navy-950" : "text-ink-scale-700"}`}>
                        {cella}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-ink-scale-500 mt-4 max-w-3xl">
            Il cambio di classe produce effetto solo se il superamento o la discesa sotto soglia si
            ripete per due esercizi consecutivi (raccomandazione 2003/361/CE, allegato, art. 4, par. 2).
          </p>
        </div>
      </section>

      <section className="bg-paper-100 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14">
          <h2 className="font-display font-bold text-display-md text-navy-950 mb-6 max-w-3xl">Gruppi di imprese: il calcolo cambia</h2>
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h3 className="font-display font-semibold text-h3 text-navy-950 mb-3">L&apos;aggregazione dei dati</h3>
              <p className="text-body text-ink-scale-700 mb-4">
                Per stabilire la classe si applica l&apos;art. 6, par. 2, dell&apos;allegato alla
                raccomandazione: i dati delle imprese collegate si sommano per intero, quelli delle
                associate in proporzione alla quota. Una piccola società di un grande gruppo è, ai fini
                NIS, una grande impresa.
              </p>
              <ul className="space-y-3">
                {[
                  "Impresa autonoma: nessuna partecipazione pari o superiore al 25%, in entrata o in uscita. Si considerano solo i dati propri.",
                  "Impresa associata: partecipazione dal 25% in su senza controllo. Dati sommati pro quota.",
                  "Impresa collegata: maggioranza dei voti, potere di nomina dell'organo amministrativo, influenza dominante, anche per il tramite di persone fisiche che agiscono di concerto. Dati sommati al 100%.",
                  "Il collegamento per il tramite di enti pubblici (art. 3, par. 4 dell'allegato) non si applica ai fini NIS (D.Lgs. 138/2024, art. 3, c. 3).",
                ].map((voce) => (
                  <li key={voce} className="flex gap-3 text-body text-ink-scale-700">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-gold-600" aria-hidden />
                    <span>{voce}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-display font-semibold text-h3 text-navy-950 mb-3">Art. 3, c. 10: dentro a prescindere dalla dimensione</h3>
              <p className="text-body text-ink-scale-700 mb-4">
                L&apos;impresa associata o collegata a un soggetto essenziale o importante rientra nel
                perimetro, qualunque sia la sua dimensione, se ricorre anche uno solo di questi criteri:
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "adotta o influenza in modo dominante le decisioni sulle misure di gestione del rischio informatico del soggetto NIS;",
                  "detiene o gestisce sistemi informativi e di rete da cui dipende la fornitura dei suoi servizi;",
                  "ne effettua le operazioni di sicurezza informatica;",
                  "gli fornisce servizi TIC o di sicurezza, anche gestiti, anche in forma residuale.",
                ].map((voce) => (
                  <li key={voce} className="flex gap-3 text-body text-ink-scale-700">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-gold-600" aria-hidden />
                    <span>{voce}</span>
                  </li>
                ))}
              </ul>
              <h3 className="font-display font-semibold text-h3 text-navy-950 mb-3">La clausola di salvaguardia</h3>
              <p className="text-body text-ink-scale-700">
                Consente di disapplicare l&apos;aggregazione quando i sistemi informativi e i servizi NIS
                del soggetto sono totalmente indipendenti da quelli delle imprese collegate (DPCM 9
                dicembre 2024, n. 221). Si chiede in registrazione, dichiarando i dati con e senza
                aggregazione; non spetta alle imprese autonome, ai soggetti attratti ex art. 3, c. 10 e
                a chi dipende dal gruppo anche solo in forma residuale.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper-50 py-16 md:py-24 border-t border-gold-500/30" aria-labelledby="tandem-studio">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7">
            <p className="font-mono text-mono-label uppercase tracking-[0.22em] text-gold-600">
              CONSULENZA E DIRITTO
            </p>
            <h2 id="tandem-studio" className="mt-4 font-display font-bold text-display-md text-navy-950">
              Consulenza e diritto, <span className="italic text-gold-600">in tandem</span>.
            </h2>
            <p className="mt-6 text-body-lg text-ink-scale-700 max-w-2xl">
              La qualificazione NIS2 è una valutazione giuridica prima che tecnica: la lettura
              delle soglie, i rapporti di gruppo, l&apos;art. 3 c. 10 e la clausola di salvaguardia si
              decidono su norme, atti dell&apos;Autorità e documenti societari. Per questo GM Consulting
              lavora in tandem con lo Studio Legale Avv. Maria Puglisi, con cui opera in convenzione:
              la verifica dell&apos;ambito nasce già con il presidio giuridico, e la nota motivata che ne
              risulta è utilizzabile anche in sede di vigilanza.
            </p>
            <p className="mt-4 text-body text-ink-scale-700 max-w-2xl">
              Gli aspetti che richiedono patrocinio o parere legale sono resi dallo Studio su autonomo
              mandato del cliente, con preventivazione, fatturazione e copertura assicurativa
              separate.
            </p>
          </div>
          <aside className="lg:col-span-5 rounded-md border border-border bg-surface p-8 hover:border-gold-500 transition-colors">
            <p className="font-mono text-mono-label uppercase tracking-[0.22em] text-gold-600">
              IN CONVENZIONE
            </p>
            <p className="mt-4 font-display font-semibold text-h3 text-navy-950">
              Studio Legale Avv. Maria Carmen Puglisi
            </p>
            <p className="mt-2 text-body text-ink-scale-700">
              Foro di Catania &middot; diritto ambientale, compliance d&apos;impresa, governance e
              regolazione tecnologica.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <a
                href="https://www.puglisilawfirm.it"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-navy-900 hover:bg-navy-800 text-paper-50 font-semibold px-6 py-3 rounded-md transition-colors"
              >
                puglisilawfirm.it
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <Link
                href="/convenzione-studio"
                className="inline-flex items-center justify-center gap-2 border border-navy-900 text-navy-900 hover:bg-navy-900/5 font-semibold px-6 py-3 rounded-md transition-colors"
              >
                Come opera la convenzione
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6 md:px-10 lg:px-14 text-center">
          <p className="font-mono text-mono-label uppercase tracking-[0.22em] text-gold-400">CALCOLATORE</p>
          <h2 className="mt-6 font-display font-bold text-display-md text-paper-50">
            Verifica la tua posizione in <span className="italic text-gold-400">tre minuti</span>.
          </h2>
          <p className="mt-8 text-body-lg text-paper-200">
            Inserisci occupati, fatturato e totale attivo, aggiungi le imprese del gruppo e la
            tipologia di attività: il calcolatore applica la lettura ACN e restituisce la classe
            dimensionale e l&apos;esito preliminare. Nessun dato viene trasmesso o conservato.
          </p>
          <div className="mt-10">
            <Link
              href="/nis2/calcolatore"
              className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold px-8 py-4 rounded-md transition-colors text-lg"
            >
              Apri il calcolatore
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-paper-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14">
          <h2 className="font-display font-bold text-display-md text-navy-950 mb-6 max-w-3xl">Dichiarazione e registrazione</h2>
          <p className="text-body text-ink-scale-700 max-w-3xl mb-4">
            La qualificazione non è un accertamento una tantum: si rinnova ogni anno con la
            registrazione o l&apos;aggiornamento sulla piattaforma ACN, dal 1° gennaio al 28 febbraio,
            secondo le modalità della determinazione del Direttore Generale in vigore. Il Punto di
            contatto dichiara, ai sensi del d.P.R. 445/2000, occupati, fatturato e bilancio calcolati
            con l&apos;aggregazione di gruppo, l&apos;eventuale capogruppo, le imprese collegate rilevanti
            ai fini dell&apos;art. 3, c. 10, i codici ATECO e le tipologie di soggetto.
          </p>
          <p className="text-body text-ink-scale-700 max-w-3xl mb-8">
            La piattaforma restituisce una valutazione preliminare automatica; l&apos;Autorità aggiorna
            l&apos;elenco entro il 31 marzo e comunica inserimento, permanenza o espunzione. Dai termini
            di quella comunicazione decorrono gli obblighi: nove mesi per le notifiche di incidente,
            diciotto per le misure di sicurezza di base.
          </p>
          <ul className="flex flex-wrap gap-4">
            {[
              { href: "/soluzioni/cybersecurity-nis2", label: "Adempimenti, termini e sanzioni NIS2" },
              { href: "/insights/sentiero-resilienza-nis2-dlgs-138-2024", label: "NIS2 e il Sentiero della Resilienza" },
              { href: "/compliance#iso-27001", label: "ISO/IEC 27001" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-4 py-3 text-body font-semibold text-navy-900 hover:border-gold-500 transition-colors"
                >
                  {link.label}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-paper-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14">
          <h2 className="font-display font-bold text-display-md text-navy-950 mb-6 max-w-3xl">I provvedimenti ACN sul perimetro</h2>
          <p className="text-body text-ink-scale-700 max-w-3xl mb-8">
            Le determinazioni del Direttore Generale non fissano soglie proprie: rinviano alla
            raccomandazione 2003/361/CE e disciplinano come la dimensione si dichiara. Il testo
            vigente sulla registrazione è, dal 25 ottobre 2026, la determinazione n. 314287/2026.
          </p>
          <div className="overflow-x-auto rounded-md border border-border bg-surface">
            <table className="w-full text-left text-body">
              <thead className="bg-navy-900 text-white text-caption uppercase tracking-wide">
                <tr>
                  <th className="px-4 py-3">Provvedimento</th>
                  <th className="px-4 py-3">Data</th>
                  <th className="px-4 py-3">Rilievo per la dimensione</th>
                  <th className="px-4 py-3">Stato</th>
                </tr>
              </thead>
              <tbody>
                {provvedimenti.map((riga) => (
                  <tr key={riga.titolo} className="border-t border-border align-top">
                    <td className="px-4 py-3 font-semibold text-navy-950">
                      {riga.href ? (
                        <a href={riga.href} className="text-gold-700 underline underline-offset-4" rel="noopener noreferrer" target="_blank">
                          {riga.titolo}
                        </a>
                      ) : (
                        riga.titolo
                      )}
                    </td>
                    <td className="px-4 py-3 text-ink-scale-700 whitespace-nowrap">{riga.data}</td>
                    <td className="px-4 py-3 text-ink-scale-700">{riga.rilievo}</td>
                    <td className="px-4 py-3 text-ink-scale-700 whitespace-nowrap">{riga.stato}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-ink-scale-500 mt-4 max-w-3xl">
            Le determinazioni sostituite restano consultabili per ricostruire la posizione dei soggetti
            iscritti negli anni precedenti; i termini decorrono dalla comunicazione individuale di
            inserimento in elenco.
          </p>
        </div>
      </section>

      <section className="bg-paper-100 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14">
          <h2 className="font-display font-bold text-display-md text-navy-950 mb-8">Domande frequenti</h2>
          <div className="grid gap-6 lg:grid-cols-2">
            {faq.map((voce) => (
              <div key={voce.question} className="rounded-md border border-border bg-surface p-6 hover:border-gold-500 transition-colors">
                <h3 className="font-display font-semibold text-h3 text-navy-950 mb-3">{voce.question}</h3>
                <p className="text-body text-ink-scale-700">{voce.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper-100 py-12 md:py-16 border-t border-gold-500/30">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14">
          <h2 className="font-display font-semibold text-h3 text-navy-950 mb-4">Fonti</h2>
          <ul className="space-y-2 text-sm text-ink-scale-500">
            <li>
              <a href="https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:2024-09-04;138" className="text-gold-700 underline underline-offset-4" rel="noopener noreferrer" target="_blank">
                D.Lgs. 4 settembre 2024, n. 138
              </a>
              , art. 3 (ambito di applicazione) e art. 6 (soggetti essenziali e importanti).
            </li>
            <li>
              <a href="https://www.normattiva.it/eli/id/2025/02/10/25G00017/ORIGINAL" className="text-gold-700 underline underline-offset-4" rel="noopener noreferrer" target="_blank">
                DPCM 9 dicembre 2024, n. 221
              </a>
              , criteri per l&apos;applicazione della clausola di salvaguardia.
            </li>
            <li>
              <a href="https://www.acn.gov.it/portale/faq/nis/ambito" className="text-gold-700 underline underline-offset-4" rel="noopener noreferrer" target="_blank">
                ACN, FAQ sull&apos;ambito di applicazione
              </a>
              (AMB.GE e AMB.DI), e determinazioni del Direttore Generale sulla piattaforma NIS.
            </li>
            <li>Raccomandazione 2003/361/CE della Commissione, allegato, artt. 2-6, e Guida dell&apos;utente alla definizione di PMI (2020).</li>
          </ul>
          <p className="text-sm text-ink-scale-500 mt-6 max-w-3xl">
            Contenuto informativo aggiornato a novembre 2026; non costituisce parere professionale. La
            qualificazione di un soggetto dipende dalla sua situazione concreta e va verificata sui
            testi ufficiali e sulla piattaforma ACN.
          </p>
        </div>
      </section>
    </>
  )
}
