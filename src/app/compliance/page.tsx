import type { Metadata } from "next"
import { Hero } from "@/components/ui/Hero"
import { CTAButton } from "@/components/ui/CTAButton"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Suite Compliance — Otto standard, un'architettura integrata",
  description:
    "ISO 37001, ISO 37301, ISO 31000, D.Lgs. 231/2001, ISO 27001, ISO 45001, UNI/PdR 125, ISO 22301. Sistemi di gestione integrati.",
  alternates: { canonical: "https://www.gmconsulting.one/compliance" },
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface ComplianceStandard {
  id: string
  code: string
  title: string
  badge?: { label: string; variant: "success" | "accent" | "brand" }
  description: string
  ambito: string[]
  integration: string[]
}

const standards: ComplianceStandard[] = [
  {
    id: "iso-37001",
    code: "ISO 37001:2025",
    title: "Anti-Bribery Management System",
    badge: { label: "Aggiornata 2025", variant: "success" },
    description:
      "Sistema di gestione anticorruzione secondo la revisione di febbraio 2025, che rafforza i requisiti su due diligence di terze parti, cultura anti-bribery e gestione dei conflitti di interesse. Periodo di transizione dalle certificazioni 2016 fino al 28 febbraio 2027.",
    ambito: [
      "risk assessment anticorruzione",
      "due diligence su terzi",
      "policy e codice di condotta",
      "sistema di whistleblowing ex D.Lgs. 24/2023",
      "formazione",
      "audit interno",
    ],
    integration: ["D.Lgs. 231/2001", "ISO 37301", "ANAC Guidelines"],
  },
  {
    id: "iso-37301",
    code: "ISO 37301",
    title: "Compliance Management System",
    description:
      "Framework per identificare, valutare e gestire gli obblighi di conformità. Trasforma il quadro normativo applicabile in processi operativi misurabili.",
    ambito: [
      "mappatura obblighi",
      "compliance risk assessment",
      "Compliance Function",
      "gestione non conformità",
      "dashboard KPI",
      "audit interno",
    ],
    integration: ["ISO 37001", "D.Lgs. 231/2001", "GDPR"],
  },
  {
    id: "iso-31000",
    code: "ISO 31000",
    title: "Risk Management",
    description:
      "Framework per la gestione sistematica del rischio. Modelli predittivi algoritmici applicati ai rischi operativi, finanziari e di compliance.",
    ambito: [
      "risk assessment quantitativo con simulazione Monte Carlo",
      "prioritizzazione",
      "risk appetite",
      "piani di trattamento",
      "sistema di early warning",
    ],
    integration: ["Monte Carlo", "Predictive analytics", "Cloud"],
  },
  {
    id: "dlgs-231",
    code: "D.Lgs. 231/2001",
    title: "Modelli di Organizzazione e Gestione",
    badge: { label: "Normativa italiana", variant: "accent" },
    description:
      "Costruzione e aggiornamento dei Modelli Organizzativi per la prevenzione dei reati-presupposto. Sistema operativo di prevenzione con protocolli verificabili e audit trail completo. Redazione e validazione giuridica in convenzione con Studio Legale Avv. Maria Puglisi, sulla base di autonomo mandato professionale del cliente.",
    ambito: [
      "mappatura aree sensibili",
      "gap analysis",
      "redazione del Modello e del Codice Etico",
      "supporto all'Organismo di Vigilanza",
      "whistleblowing D.Lgs. 24/2023",
    ],
    integration: ["ISO 37001", "ISO 37301", "Whistleblowing"],
  },
  {
    id: "iso-27001",
    code: "ISO/IEC 27001",
    title: "Information Security Management",
    description:
      "Sistema di gestione della sicurezza delle informazioni con architettura cloud-native, conforme al GDPR e — per i soggetti destinatari — alla Direttiva NIS2.",
    ambito: [
      "asset inventory",
      "risk assessment",
      "Statement of Applicability",
      "policy di sicurezza",
      "awareness",
      "incident management e business continuity",
    ],
    integration: ["GDPR", "NIS2", "Cloud security"],
  },
  {
    id: "iso-45001",
    code: "ISO 45001",
    title: "Salute e Sicurezza sul Lavoro",
    description:
      "Sistema di gestione HSE digitalizzato con protocolli di emergency response automatizzati. Dalla carta ai processi verificabili: tempi di risposta misurati, conformità continua.",
    ambito: [
      "valutazione dei rischi ex D.Lgs. 81/2008",
      "digitalizzazione dei protocolli HSE",
      "escalation automatica",
      "dashboard real-time",
      "formazione con verifica",
    ],
    integration: ["D.Lgs. 81/2008", "HSE digitale", "Emergency automation"],
  },
  {
    id: "uni-pdr-125",
    code: "UNI/PdR 125:2022",
    title: "Parità di Genere",
    badge: { label: "Premialità PNRR", variant: "brand" },
    description:
      "Certificazione sulla parità di genere con accesso a sgravi contributivi (Legge 30 dicembre 2021, n. 234, art. 1, comma 137) e premialità nei bandi pubblici (D.Lgs. 36/2023). Sistema che misura, monitora e migliora l'equità di genere nell'organizzazione.",
    ambito: [
      "assessment dei KPI su sei aree",
      "piano strategico",
      "policy su recruitment, carriera e retribuzione",
      "dashboard di reporting",
      "supporto alla certificazione",
    ],
    integration: ["PNRR", "Codice dei Contratti", "Sgravi contributivi"],
  },
  {
    id: "iso-22301",
    code: "ISO 22301",
    title: "Business Continuity Management",
    description:
      "Sistema per la continuità delle operazioni critiche in caso di eventi disruptive. Business Impact Analysis con modelli predittivi e piani di recovery automatizzati.",
    ambito: [
      "Business Impact Analysis",
      "risk assessment",
      "Business Continuity Plan e Disaster Recovery Plan",
      "test e simulazioni periodiche",
    ],
    integration: ["ISO 27001", "Cloud architecture", "DR automation"],
  },
]

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

const badgeColors = {
  success: "bg-green-50 text-success border-green-200",
  accent: "bg-accent-soft text-accent border-amber-200",
  brand: "bg-brand-soft text-brand border-blue-200",
}

function ComplianceCard({ s }: { s: ComplianceStandard }) {
  return (
    <div
      id={s.id}
      className="rounded-lg border border-mist bg-white p-8 flex flex-col gap-5"
    >
      {/* Header row: code + optional badge */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-brand font-mono text-caption bg-brand-soft px-3 py-1 rounded">
          {s.code}
        </span>
        {s.badge && (
          <span
            className={`text-caption px-3 py-1 rounded border ${badgeColors[s.badge.variant]}`}
          >
            {s.badge.label}
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="text-h3 text-ink">{s.title}</h3>

      {/* Subtitle (code repeated for clarity) */}
      <p className="text-caption text-steel -mt-2">{s.code}</p>

      {/* Description */}
      <p className="text-body text-steel">{s.description}</p>

      {/* Ambito */}
      <div>
        <p className="text-eyebrow uppercase tracking-[0.12em] text-ink mb-2">
          Ambito:
        </p>
        <ul className="list-disc list-inside space-y-1">
          {s.ambito.map((item) => (
            <li key={item} className="text-body text-steel">
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Integration tags */}
      <div>
        <p className="text-eyebrow uppercase tracking-[0.12em] text-ink mb-2">
          Integrazione:
        </p>
        <div className="flex flex-wrap gap-2">
          {s.integration.map((tag) => (
            <span
              key={tag}
              className="inline-block font-mono text-caption bg-paper text-steel border border-mist px-3 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function CompliancePage() {
  return (
    <>
      {/* Hero */}
      <Hero
        variant="compact"
        eyebrow="Suite Compliance"
        title="Otto standard, un'architettura integrata"
        lead="Implementiamo i principali sistemi di gestione con approccio integrato: una sola architettura documentale, controlli condivisi, audit interno coordinato. Le certificazioni che si sovrappongono per requisiti vengono progettate come un unico sistema, riducendo duplicazioni e costo totale di esercizio."
      />

      {/* Il principio metodologico */}
      <section className="bg-paper py-16">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-eyebrow uppercase tracking-[0.12em] text-brand mb-4">
              Il principio metodologico
            </p>
            <p className="text-body-lg text-steel">
              La sovrapposizione fra le norme dei sistemi di gestione — in
              particolare ISO 37001:2025, ISO 37301 e D.Lgs. 231/2001 — non è
              casuale. La struttura HLS (High Level Structure) adottata
              dall&apos;ISO consente di costruire un&apos;architettura unitaria in cui
              rischio, controlli, procedure e audit interno coprono
              simultaneamente più framework. Il nostro approccio sfrutta
              sistematicamente questa convergenza: il cliente ottiene più
              certificazioni con minor onere documentale e minore impatto
              operativo sul personale.
            </p>
          </div>
        </div>
      </section>

      {/* Standards grid */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {standards.map((s) => (
              <ComplianceCard key={s.id} s={s} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand py-16 lg:py-24">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12 text-center">
          <h2 className="text-h2 text-white mb-4">
            Vuoi una valutazione preliminare?
          </h2>
          <p className="text-body-lg text-brand-soft max-w-2xl mx-auto mb-8">
            Richiedi un assessment iniziale riservato. Analizziamo la tua
            esposizione al rischio operativo e ti restituiamo un report con
            le priorità di intervento.
          </p>
          <CTAButton
            variant="secondary"
            href="/#assessment"
            className="border-white text-white hover:bg-white hover:text-brand"
          >
            Richiedi assessment
            <ArrowRight className="ml-2 h-4 w-4" />
          </CTAButton>
        </div>
      </section>
    </>
  )
}
