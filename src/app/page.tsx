import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "GM Consulting S.r.l. — Architettura di rischio per imprese complesse",
  description: "Società di consulenza italiana specializzata in compliance strategica, governance, finanza-controllo, legal tech, automazione di processo e healthcare/emergency management. Sei aree integrate, otto standard presidiati, prodotti verticali in continua evoluzione. Catania, dal 2002.",
  alternates: { canonical: "https://www.gmconsulting.one/" },
  openGraph: {
    title: "GM Consulting — Architettura di rischio. Tecnicamente abilitata.",
    description: "Sei aree di intervento integrate, otto standard di compliance presidiati. Consulenza professionale per imprese e organizzazioni complesse, in convenzione con Studio Legale Avv. Maria Puglisi.",
    type: "website",
    locale: "it_IT",
    siteName: "GM Consulting",
    images: [{ url: "/logo-gmconsulting-512.png", width: 512, height: 512, alt: "GM Consulting S.r.l." }],
  },
}

const areas = [
  {
    number: "01",
    total: "06",
    title: "Compliance Strategica & Business Planning",
    description: "Modelli di organizzazione, gestione e controllo ex D.Lgs. 231/2001 integrati con la pianificazione strategica e il business planning quinquennale.",
    href: "/aree-di-intervento#compliance-strategica",
  },
  {
    number: "02",
    total: "06",
    title: "Automazione & Ottimizzazione Processi",
    description: "Mappatura, reingegnerizzazione e automazione di processi amministrativi e operativi, con metriche di efficienza misurabili e indicatori di performance verificabili.",
    href: "/aree-di-intervento#automazione-processi",
  },
  {
    number: "03",
    total: "06",
    title: "Finanza Controllo & Modellazione Predittiva",
    description: "Sistemi di controllo di gestione, modelli previsionali, stress test e scenario analysis per la sostenibilità economico-finanziaria.",
    href: "/aree-di-intervento#finanza-controllo",
  },
  {
    number: "04",
    total: "06",
    title: "Governance & Architettura Organizzativa",
    description: "Disegno e revisione di assetti organizzativi adeguati ex art. 2086 c.c., funzioni di controllo interno, deleghe e procure.",
    href: "/aree-di-intervento#governance-organizzativa",
  },
  {
    number: "05",
    total: "06",
    title: "Legal Tech & Trasformazione Digitale",
    description: "Soluzioni applicative per la gestione del rischio legale, protocolli digitali, workflow di compliance integrati con i sistemi gestionali aziendali.",
    href: "/aree-di-intervento#trasformazione-digitale",
  },
  {
    number: "06",
    total: "06",
    title: "Healthcare & Emergency Management",
    description: "Business Impact Analysis, Business Continuity Management e piani di emergenza per strutture sanitarie e organizzazioni complesse a continuità critica.",
    href: "/aree-di-intervento#healthcare-emergency",
  },
]

const phases = [
  {
    numeral: "I",
    title: "Discovery & Assessment",
    description: "Rilevazione documentale, interviste strutturate, gap analysis rispetto agli standard di riferimento.",
  },
  {
    numeral: "II",
    title: "Design & Engineering",
    description: "Progettazione del modello, drafting dei protocolli, taratura degli indicatori di presidio.",
  },
  {
    numeral: "III",
    title: "Implementation & Training",
    description: "Rilascio operativo, formazione del personale, integrazione con i sistemi gestionali esistenti.",
  },
  {
    numeral: "IV",
    title: "Continuous Assurance",
    description: "Monitoraggio periodico, audit interni, revisione del modello in risposta a eventi normativi e di processo.",
  },
]

const stats = [
  {
    value: "2002",
    label: "ANNO DI COSTITUZIONE",
    caption: "Oltre vent’anni di operatività continuativa sul mercato della consulenza professionale.",
  },
  {
    value: "6",
    label: "AREE DI INTERVENTO",
    caption: "Capabilities integrate dalla compliance strategica all’emergency management.",
  },
  {
    value: "8",
    label: "STANDARD PRESIDIATI",
    caption: "Da ISO 27001 a UNI 11871:2022, sino al D.Lgs. 231/2001 e a NIS2.",
  },
  {
    value: "2",
    label: "PRODOTTI VERTICALI",
    caption: "Protocollo 23 attivo; Suite GDPR-NIS2 in rilascio.",
  },
]

const standards = [
  { sigla: "ISO 27001", description: "Sicurezza delle informazioni" },
  { sigla: "ISO 37001", description: "Sistema di gestione anti-corruzione" },
  { sigla: "ISO 9001", description: "Sistema di gestione per la qualità" },
  { sigla: "ISO 14001", description: "Sistema di gestione ambientale" },
  { sigla: "UNI 11871:2022", description: "Requisiti per sistemi di gestione degli studi professionali" },
  { sigla: "D.Lgs. 231/2001", description: "Modelli di organizzazione gestione e controllo" },
  { sigla: "GDPR", description: "Reg. UE 2016/679 — Protezione dei dati personali" },
  { sigla: "NIS2", description: "Dir. UE 2022/2555 — Sicurezza reti e sistemi informativi" },
]

const articles = [
  {
    title: "L'integrazione fra ISO 37001:2025, ISO 37301 e D.Lgs. 231/2001",
    date: "20 MAGGIO 2026",
    category: "COMPLIANCE INTEGRATA",
    href: "/insights/iso-37001-37301-dlgs-231-architettura-integrata",
    excerpt: "Architettura unica per tre sistemi sovrapposti: compliance anticorruzione, conformità normativa e responsabilità amministrativa degli enti.",
  },
  {
    title: "Certificazione UNI/PdR 125:2022 e premialità PNRR",
    date: "20 MAGGIO 2026",
    category: "PARITÀ DI GENERE",
    href: "/insights/uni-pdr-125-2022-premialita-pnrr",
    excerpt: "Guida tecnica all’accesso agli sgravi contributivi e ai bandi pubblici attraverso la certificazione della parità di genere.",
  },
  {
    title: "Compliance by design nei processi automatizzati",
    date: "20 MAGGIO 2026",
    category: "GDPR & NIS2",
    href: "/insights/compliance-by-design-workflow-python-gdpr-nis2",
    excerpt: "Come progettare workflow Python conformi al GDPR e alla Direttiva NIS2, con minimizzazione, audit trail e controlli automatizzati.",
  },
]

export default function HomePage() {
  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: "GM Consulting S.r.l.",
            alternateName: "GM Consulting",
            url: "https://www.gmconsulting.one/",
            logo: "https://www.gmconsulting.one/logo-gmconsulting-512.png",
            image: "https://www.gmconsulting.one/logo-gmconsulting-512.png",
            description: "Società di consulenza italiana specializzata in compliance strategica, governance, finanza-controllo, legal tech, automazione di processo e healthcare/emergency management.",
            foundingDate: "2002-10-30",
            vatID: "IT04006730875",
            taxID: "04006730875",
            address: { "@type": "PostalAddress", streetAddress: "Via Nuovalucello 81/C", addressLocality: "Catania", addressRegion: "CT", postalCode: "95126", addressCountry: "IT" },
            email: "info@gmconsulting.one",
            areaServed: "IT",
            knowsAbout: ["Compliance Strategica", "Modello 231", "GDPR", "NIS2", "ISO 27001", "ISO 37001", "UNI 11871:2022", "Governance", "Business Continuity", "Healthcare Emergency Management"],
          }),
        }}
      />

      {/* 6.1 — HERO */}
      <section
        className="relative bg-navy-900 min-h-[88vh] flex flex-col justify-end pt-32 pb-24 overflow-hidden"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent 0, transparent 2px, rgba(15,30,54,0.6) 2px, rgba(15,30,54,0.6) 3px)",
        }}
      >
        {/* Decorative year */}
        <span
          className="absolute bottom-0 right-0 font-display font-black text-[clamp(220px,30vw,380px)] text-gold-500/[0.05] leading-none select-none pointer-events-none"
          aria-hidden="true"
        >
          2002
        </span>

        <div className="relative max-w-7xl mx-auto px-6 md:px-10 lg:px-14 w-full">
          <p className="font-mono text-mono-label uppercase tracking-[0.22em] text-gold-400">
            GM Consulting S.r.l. &middot; Catania &middot; dal 2002
          </p>

          <h1 className="mt-6 font-display font-bold text-display-xl text-paper-50">
            <span className="block">Architettura di rischio.</span>
            <span className="block italic text-gold-400">Tecnicamente abilitata.</span>
            <span className="block italic text-gold-400">Continuamente verificabile.</span>
          </h1>

          <p className="mt-8 max-w-2xl text-body-lg text-paper-200">
            Sei aree di intervento integrate, otto standard di compliance presidiati, prodotti verticali in continua evoluzione. Una società di consulenza che progetta architetture di rischio per imprese e organizzazioni complesse.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/aree-di-intervento"
              className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold px-6 py-3 rounded-md transition-colors"
            >
              Esplora le aree di intervento
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/assessment"
              className="inline-flex items-center gap-2 border border-paper-200 text-paper-100 hover:bg-paper-50/10 font-semibold px-6 py-3 rounded-md transition-colors"
            >
              Richiedi un primo contatto
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Badge vertical */}
        <span
          className="hidden lg:block absolute right-10 bottom-32 font-mono text-mono-label uppercase tracking-[0.18em] text-gold-400/60"
          style={{ writingMode: "vertical-rl" }}
          aria-hidden="true"
        >
          Costituita 2002 — 23 anni di operatività continuativa
        </span>
      </section>

      {/* 6.3 — Sei aree */}
      <section className="bg-paper-50 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14">
          <p className="font-mono text-mono-label uppercase tracking-[0.22em] text-gold-600">
            CAPABILITIES
          </p>
          <h2 className="mt-4 font-display font-bold text-display-md text-navy-950">
            Sei aree integrate, un solo metodo.
          </h2>
          <p className="mt-6 max-w-3xl text-body-lg text-ink-scale-700">
            Ogni area opera autonomamente e in continuità con le altre. Le consegne sono modulari, gli incarichi si compongono per progetto, le metriche di assurance restano condivise.
          </p>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {areas.map((area) => (
              <Link
                key={area.number}
                href={area.href}
                className="group border border-border rounded-md p-8 bg-surface hover:shadow-lg hover:-translate-y-1 hover:border-gold-500 transition-all"
              >
                <span className="font-mono text-mono-label text-gold-600">
                  {area.number} / {area.total}
                </span>
                <h3 className="mt-4 font-display font-semibold text-h3 text-navy-950">
                  {area.title}
                </h3>
                <p className="mt-3 text-body text-ink-scale-700">
                  {area.description}
                </p>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-gold-700 group-hover:text-gold-600 transition-colors">
                  Approfondisci
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6.4 — Metodo */}
      <section className="bg-navy-900 text-paper-100 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14">
          <p className="font-mono text-mono-label uppercase tracking-[0.22em] text-gold-400">
            METODO
          </p>
          <h2 className="mt-4 font-display font-bold text-display-md text-paper-50">
            Quattro fasi. Una sola logica di assurance.
          </h2>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {phases.map((phase) => (
              <div
                key={phase.numeral}
                className="p-8 border-l-2 border-gold-500/30 hover:border-gold-500 transition-colors"
              >
                <span className="block font-display font-black text-[120px] leading-[0.9] text-gold-500" aria-hidden="true">
                  {phase.numeral}
                </span>
                <h3 className="mt-6 font-display font-semibold text-h3 text-paper-50">
                  {phase.title}
                </h3>
                <p className="mt-3 text-body text-paper-200">
                  {phase.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14">
            <Link
              href="/metodo"
              className="inline-flex items-center gap-2 text-gold-400 font-semibold hover:text-gold-300 transition-colors"
            >
              Vedi il metodo in dettaglio
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6.5 — Identità in numeri */}
      <section className="bg-paper-100 py-20 md:py-24 border-y border-gold-500/30">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14">
          <p className="font-mono text-mono-label uppercase tracking-[0.22em] text-gold-600">
            GM CONSULTING IN NUMERI
          </p>

          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-12">
            {stats.map((stat) => (
              <div key={stat.label}>
                <span className="block font-display font-bold text-[clamp(56px,5vw,72px)] text-navy-950 leading-none">
                  {stat.value}
                </span>
                <span className="mt-3 block font-mono text-mono-label uppercase text-gold-700">
                  {stat.label}
                </span>
                <p className="mt-2 text-sm text-ink-scale-700">
                  {stat.caption}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6.6 — Standard */}
      <section className="bg-paper-50 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14">
          <p className="font-mono text-mono-label uppercase tracking-[0.22em] text-gold-600">
            COMPLIANCE FRAMEWORK
          </p>
          <h2 className="mt-4 font-display font-bold text-display-md text-navy-950">
            Otto standard. Un solo presidio integrato.
          </h2>

          <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {standards.map((std) => (
              <div
                key={std.sigla}
                className="p-6 bg-surface border border-border rounded-md hover:border-gold-500 transition-colors"
              >
                <span className="block font-mono text-[18px] text-navy-950 font-semibold">
                  {std.sigla}
                </span>
                <p className="mt-2 text-[13px] text-ink-scale-700">
                  {std.description}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-10 text-sm text-ink-scale-500 max-w-3xl">
            Le sigle elencate identificano gli standard di riferimento utilizzati nelle metodologie di lavoro. Eventuali certificazioni sono rilasciate da organismi terzi accreditati.
          </p>
        </div>
      </section>

      {/* 6.7 — Insights */}
      <section className="bg-paper-50 py-24 md:py-32 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="font-mono text-mono-label uppercase tracking-[0.22em] text-gold-600">
                INSIGHTS
              </p>
              <h2 className="mt-4 font-display font-bold text-display-md text-navy-950">
                Analisi e prese di posizione.
              </h2>
            </div>
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 text-gold-700 font-semibold hover:text-gold-600 transition-colors shrink-0"
            >
              Tutti gli articoli
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <article key={article.href} className="group">
                {/* Dark cover */}
                <div className="relative h-[200px] bg-navy-900 rounded-t-md overflow-hidden flex items-end p-6">
                  <span
                    className="absolute top-4 right-4 font-display font-black text-[80px] leading-none text-gold-500/[0.08] select-none pointer-events-none"
                    aria-hidden="true"
                  >
                    GM
                  </span>
                </div>
                {/* Body */}
                <div className="p-6 bg-surface border border-border border-t-0 rounded-b-md">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-mono-label text-ink-scale-500">
                      {article.date}
                    </span>
                    <span className="font-mono text-mono-label text-gold-700">
                      {article.category}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display font-semibold text-h3 text-navy-950">
                    <Link href={article.href} className="hover:text-gold-700 transition-colors">
                      {article.title}
                    </Link>
                  </h3>
                  <p className="mt-3 text-sm text-ink-scale-700">
                    {article.excerpt}
                  </p>
                  <Link
                    href={article.href}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold-700 hover:text-gold-600 transition-colors"
                  >
                    Leggi
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6.8 — CTA finale */}
      <section className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6 md:px-10 lg:px-14 text-center">
          <p className="font-mono text-mono-label uppercase tracking-[0.22em] text-gold-400">
            PRIMO CONTATTO
          </p>
          <h2 className="mt-6 font-display font-bold text-display-lg text-paper-50">
            Iniziamo con un <span className="italic text-gold-400">assessment</span>. Senza impegno, senza retorica.
          </h2>
          <p className="mt-8 text-body-lg text-paper-200">
            Trenta minuti in videoconferenza per inquadrare il perimetro di rischio della Sua organizzazione e indicarLe se e dove può esserLe utile il nostro intervento.
          </p>
          <div className="mt-10">
            <Link
              href="/assessment"
              className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold px-8 py-4 rounded-md transition-colors text-lg"
            >
              Richiedi l&apos;assessment
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
