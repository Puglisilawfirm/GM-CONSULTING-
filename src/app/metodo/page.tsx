import type { Metadata } from "next"
import { Hero } from "@/components/ui/Hero"
import { CTAButton } from "@/components/ui/CTAButton"

export const metadata: Metadata = {
  title: "Il metodo GM — Quattro fasi con artefatti verificabili",
  description:
    "Due diligence strategica, prototyping, implementazione con SLA e monitoraggio algoritmico. Il metodo operativo di GM Consulting.",
  alternates: { canonical: "https://www.gmconsulting.one/metodo" },
}

const phases = [
  {
    number: "01",
    title: "Due Diligence Strategica",
    subtitle: "Analisi del contesto e audit giuridico preliminare",
    paragraphs: [
      "Mappiamo il contesto normativo applicabile, conduciamo un risk assessment quantitativo sulle aree operative critiche, identifichiamo i failure mode prioritari e produciamo un report che ordina le criticità per impatto economico e per esposizione giuridica.",
      "L'audit giuridico preliminare è reso in convenzione con Studio Legale Avv. Maria Puglisi, sulla base di autonomo mandato del cliente, ed entra nel ciclo del progetto come componente parallela e coordinata.",
    ],
    output: "Due Diligence Report con risk scoring e priority matrix",
    feedback: "Validazione collegiale con il committente",
  },
  {
    number: "02",
    title: "Prototyping & Scenario Analysis",
    subtitle:
      "Simulazione su piccola scala, modelli predittivi, proof of concept",
    paragraphs: [
      "Costruiamo modelli predittivi sui driver critici dell'impresa, integrando scenari Monte Carlo per la quantificazione dell'incertezza. Le automazioni proposte vengono testate in ambiente sandbox prima del deployment. Ogni scenario è sottoposto a stress-test giuridico.",
    ],
    output: "Scenario Book con modelli predittivi e proof of concept funzionanti",
    feedback: "Test su sottoinsieme operativo reale",
  },
  {
    number: "03",
    title: "Implementation",
    subtitle:
      "Deploy con SLA contrattuali e copertura assicurativa professionale",
    paragraphs: [
      "Le automazioni vengono deployate con piano di rollback, le procedure documentate e formalmente adottate, il personale formato e certificato sui nuovi processi. Gli SLA contrattuali sono definiti su KPI quantitativi e supportati da idonea copertura assicurativa professionale.",
    ],
    output: "Sistemi operativi attivi, procedure adottate, personale formato",
    feedback: "Metriche di performance osservate sui primi 90 giorni",
  },
  {
    number: "04",
    title: "Algorithmic Monitoring",
    subtitle: "Dashboard di compliance, alert automatici, report periodici",
    paragraphs: [
      "Il monitoraggio post-implementazione è automatizzato: dashboard real-time con KPI concordati, alert su deviazioni dai parametri target, report periodici di conformità generati automaticamente. I dati osservati alimentano il successivo ciclo di due diligence.",
    ],
    output: "Sistema di monitoring continuo e report automatici di compliance",
    feedback: "Ciclo ricorsivo verso nuova due diligence",
  },
]

export default function MetodoPage() {
  return (
    <>
      {/* Hero compact */}
      <Hero
        variant="compact"
        eyebrow="Metodo GM"
        title="Quattro fasi, feedback loop integrato, artefatti verificabili"
        lead="Il metodo struttura ciascun intervento secondo un protocollo ricorsivo che integra analisi, prototipazione, implementazione e monitoraggio. Ogni fase produce documentazione verificabile e attiva la successiva."
      />

      {/* Phase sections */}
      {phases.map((phase, index) => {
        const isOdd = index % 2 === 0 // 0-indexed: phases 01,03 are even index
        return (
          <section
            key={phase.number}
            className={`${isOdd ? "bg-white" : "bg-paper"} py-section-mobile lg:py-section`}
          >
            <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
              <div
                className={`grid gap-12 lg:grid-cols-[200px_1fr] items-start ${
                  !isOdd ? "lg:grid-cols-[1fr_200px]" : ""
                }`}
              >
                {/* Number — left on odd phases, right on even phases */}
                <div
                  className={`${!isOdd ? "order-last" : ""}`}
                >
                  <span className="text-display text-brand leading-none">
                    {phase.number}
                  </span>
                </div>

                {/* Content */}
                <div>
                  <h2 className="text-h2 text-ink">{phase.title}</h2>
                  <p className="text-body-lg text-brand mt-2 font-medium">
                    {phase.subtitle}
                  </p>

                  <div className="mt-8 space-y-4 max-w-2xl">
                    {phase.paragraphs.map((paragraph, pIndex) => (
                      <p key={pIndex} className="text-body text-graphite">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Output box */}
                  <div className="mt-8 bg-brand-soft border-l-4 border-brand px-6 py-4 max-w-2xl">
                    <p className="text-caption text-steel uppercase tracking-wide mb-1">
                      Output
                    </p>
                    <p className="text-body text-ink font-medium">
                      {phase.output}
                    </p>
                  </div>

                  {/* Feedback line */}
                  <p className="mt-4 text-caption text-steel italic">
                    Feedback: {phase.feedback}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )
      })}

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
