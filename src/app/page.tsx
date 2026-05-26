import type { Metadata } from "next"
import Link from "next/link"
import { Shield, Cog, TrendingUp, Network, Monitor, HeartPulse } from "lucide-react"
import { Hero } from "@/components/ui/Hero"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { CTAButton } from "@/components/ui/CTAButton"

export const metadata: Metadata = {
  title: "GM Consulting S.r.l. — Consulenza direzionale, compliance, automazione",
  description:
    "Consulenza direzionale, architettura di compliance e automazione dei processi. Interventi strutturati con artefatti verificabili e misurabili.",
  alternates: { canonical: "https://www.gmconsulting.one" },
}

const areas = [
  {
    icon: Shield,
    title: "Compliance Strategica & Business Planning",
    description:
      "Architettura di compliance integrata nella pianificazione strategica. Business plan costruiti per resistere a ispezioni e contenziosi.",
    anchor: "compliance-strategica",
  },
  {
    icon: Cog,
    title: "Automazione & Ottimizzazione dei Processi",
    description:
      "Automazione dei processi ricorrenti con validazione giuridica integrata. Riduzione dei tempi operativi e degli errori umani.",
    anchor: "automazione-processi",
  },
  {
    icon: TrendingUp,
    title: "Finanza, Controllo & Modellazione Predittiva",
    description:
      "Modelli predittivi sui driver finanziari critici. Scenari Monte Carlo per la quantificazione dell'incertezza decisionale.",
    anchor: "finanza-controllo",
  },
  {
    icon: Network,
    title: "Governance & Architettura Organizzativa",
    description:
      "Progettazione di strutture organizzative coerenti con il quadro normativo. Modelli 231, organigrammi funzionali, deleghe e procure.",
    anchor: "governance-organizzativa",
  },
  {
    icon: Monitor,
    title: "Trasformazione Digitale & Compliance by Design",
    description:
      "Integrazione della compliance nei processi digitali fin dalla progettazione. Legal tech, document automation, workflow normativi.",
    anchor: "trasformazione-digitale",
  },
  {
    icon: HeartPulse,
    title: "Healthcare & Emergency Management",
    description:
      "Compliance sanitaria, accreditamento, gestione delle emergenze portuali e industriali. Protocolli operativi e formazione certificata.",
    anchor: "healthcare-emergency",
  },
]

const phases = [
  {
    number: "01",
    title: "Due Diligence Strategica",
    description:
      "Audit giuridico, risk assessment quantitativo, priority matrix delle criticità.",
  },
  {
    number: "02",
    title: "Prototyping & Scenario Analysis",
    description:
      "Modelli predittivi, simulazioni Monte Carlo, proof of concept in sandbox.",
  },
  {
    number: "03",
    title: "Implementation",
    description:
      "Deploy con SLA contrattuali, formazione certificata, piano di rollback.",
  },
  {
    number: "04",
    title: "Algorithmic Monitoring",
    description:
      "Dashboard real-time, alert automatici, report periodici di conformità.",
  },
]

const complianceBadges = [
  { code: "ISO 37001:2025", name: "Sistemi di gestione anticorruzione" },
  { code: "ISO 37301", name: "Sistemi di gestione della compliance" },
  { code: "ISO 31000", name: "Gestione del rischio" },
  { code: "D.Lgs. 231/2001", name: "Responsabilità amministrativa degli enti" },
  { code: "ISO/IEC 27001", name: "Sicurezza delle informazioni" },
  { code: "ISO 45001", name: "Salute e sicurezza sul lavoro" },
  { code: "UNI/PdR 125:2022", name: "Parità di genere" },
  { code: "ISO 22301", name: "Continuità operativa" },
]

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <Hero
        variant="full"
        eyebrow="Consulenza direzionale e architettura di compliance"
        title="La distanza tra strategia approvata e strategia eseguibile è un problema tecnico. Lo affrontiamo come tale."
        lead="GM Consulting opera nell'intersezione fra direzione aziendale, architettura di compliance e automazione dei processi. Ogni intervento è strutturato per produrre artefatti verificabili e misurabili nel tempo."
      >
        <div className="flex flex-wrap gap-4">
          <CTAButton variant="primary" href="/assessment">
            Richiedi assessment
          </CTAButton>
          <CTAButton variant="secondary" href="/metodo">
            Esplora il metodo
          </CTAButton>
        </div>
      </Hero>

      {/* Il quadro */}
      <section className="bg-paper py-section-mobile lg:py-section">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <SectionHeader
            eyebrow="Il quadro"
            title="La compliance preventiva costa meno della remediation. Sempre."
          />
          <div className="mt-10 max-w-3xl space-y-6 text-body text-graphite">
            <p>
              Le imprese italiane affrontano un quadro normativo stratificato —
              diritto amministrativo, anticorruzione, protezione dei dati, salute
              e sicurezza sul lavoro, responsabilità amministrativa degli enti —
              che esige coerenza fra strategia, struttura organizzativa e
              processi operativi. La distanza fra la dichiarazione di compliance
              e la sua verificabilità documentale è, di norma, il principale
              fattore di vulnerabilità delle imprese in fase di gara, ispezione o
              contenzioso.
            </p>
            <p>
              GM Consulting interviene su quella distanza. Non eroga consulenza
              descrittiva: progetta architetture documentali, automatizza i
              processi ricorrenti, integra la validazione giuridica nel ciclo
              decisionale. L&apos;esito non è un dossier su carta, ma un sistema
              operativo verificabile.
            </p>
          </div>
        </div>
      </section>

      {/* Aree di intervento */}
      <section className="bg-white py-section-mobile lg:py-section">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <SectionHeader
            eyebrow="Aree di intervento"
            title="Sei aree, un'unica logica di architettura"
            lead="Ciascuna area integra le tre dimensioni del metodo — direzione, compliance, automazione — e produce deliverable misurabili."
          />
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {areas.map((area) => {
              const Icon = area.icon
              return (
                <Link
                  key={area.anchor}
                  href={`/aree-di-intervento#${area.anchor}`}
                  className="group rounded-lg border border-mist bg-white p-8 transition-colors hover:border-brand hover:shadow-sm"
                >
                  <Icon className="h-8 w-8 text-brand mb-4" strokeWidth={1.5} />
                  <h3 className="text-h4 text-ink mb-2">{area.title}</h3>
                  <p className="text-body text-steel">{area.description}</p>
                </Link>
              )
            })}
          </div>
          <div className="mt-12">
            <CTAButton variant="secondary" href="/aree-di-intervento">
              Esplora tutte le aree
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Metodo GM */}
      <section className="bg-paper py-section-mobile lg:py-section">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <SectionHeader
            eyebrow="Metodo GM"
            title="Quattro fasi, ciascuna con un artefatto verificabile"
            lead="Il metodo non è lineare: ogni fase produce un output che alimenta la successiva e attiva un feedback loop di validazione."
          />
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {phases.map((phase) => (
              <div key={phase.number}>
                <span className="text-display text-brand">{phase.number}</span>
                <h3 className="text-h4 text-ink mt-2">{phase.title}</h3>
                <p className="text-body text-steel mt-2">{phase.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <CTAButton variant="secondary" href="/metodo">
              Approfondisci il metodo
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Suite Compliance */}
      <section className="bg-white py-section-mobile lg:py-section">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <SectionHeader
            eyebrow="Suite Compliance"
            title="Otto framework, un'architettura integrata"
            lead="I sistemi di gestione condividono struttura comune: li progettiamo come architettura integrata, riducendo duplicazioni di processi e di controlli."
          />
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {complianceBadges.map((badge) => (
              <div
                key={badge.code}
                className="rounded-lg border border-mist bg-paper p-5 text-center"
              >
                <span className="text-brand font-mono text-caption font-semibold">
                  {badge.code}
                </span>
                <p className="text-caption text-steel mt-1">{badge.name}</p>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <CTAButton variant="secondary" href="/compliance">
              Esplora la suite Compliance
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Convenzione */}
      <section className="bg-paper py-section-mobile lg:py-section">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <div className="border-l-4 border-brand pl-8 py-2">
            <SectionHeader
              eyebrow="Trasparenza professionale"
              title="La consulenza giuridica è resa in convenzione con Studio Legale Avv. Maria Puglisi"
            />
            <p className="mt-6 max-w-3xl text-body text-graphite">
              Ogni intervento che richieda attività legale — pareri, validazione
              contrattuale, assistenza precontenziosa e contenziosa, redazione e
              aggiornamento di Modelli 231 — è erogato da Studio Legale Avv.
              Maria Puglisi sulla base di autonomo mandato professionale del
              cliente. La convenzione fra le due strutture garantisce continuità
              del servizio e separazione formale dei perimetri.
            </p>
            <div className="mt-8">
              <CTAButton variant="ghost" href="/convenzione-studio">
                Leggi i termini della convenzione
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      {/* CTA finale */}
      <section className="bg-brand py-20">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12 text-center">
          <h2 className="text-h2 text-white mb-4">
            Vuoi una valutazione preliminare?
          </h2>
          <p className="text-body-lg text-blue-200 max-w-2xl mx-auto">
            Compila l&apos;assessment: riceverai entro 72 ore lavorative
            un&apos;analisi sintetica dei principali profili di rischio rilevati
            sulla base delle informazioni fornite.
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
