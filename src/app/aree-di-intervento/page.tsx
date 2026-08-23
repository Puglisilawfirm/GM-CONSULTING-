import type { Metadata } from "next"
import { Hero } from "@/components/ui/Hero"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { CTAButton } from "@/components/ui/CTAButton"
import {
  ShieldAlert,
  FileCheck,
  Package,
  ArrowRight,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Aree di intervento — Sei aree, una logica",
  description:
    "Compliance strategica, automazione, finanza predittiva, governance, trasformazione digitale, healthcare. Le aree operative di GM Consulting.",
  alternates: { canonical: "https://www.gmconsulting.one/aree-di-intervento" },
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface AreaData {
  id: string
  number: number
  title: string
  rischio: string
  protocollo: string
  deliverable: string
  tags: string[]
}

const areas: AreaData[] = [
  {
    id: "compliance-strategica",
    number: 1,
    title: "Compliance Strategica & Business Planning",
    rischio:
      "Business plan costruiti senza stress-test normativo. Piani finanziari che ignorano i vincoli amministrativi applicabili. Strategie che generano contenzioso anziché valore.",
    protocollo:
      "Modellazione finanziaria a vincolo normativo: ogni modello è costruito a partire dai requisiti regolatori applicabili. Audit giuridico preventivo integrato in ogni fase di pianificazione, in convenzione con Studio Legale Avv. Maria Puglisi sulla base di autonomo mandato del cliente.",
    deliverable:
      "Business plan con allegato compliance kit, stress-test su scenari di contenzioso amministrativo, API di monitoraggio dei KPI concordati.",
    tags: ["Modellazione finanziaria", "Audit giuridico", "Python automation"],
  },
  {
    id: "automazione-processi",
    number: 2,
    title: "Automazione & Ottimizzazione dei Processi",
    rischio:
      "Processi manuali su operazioni ad alto impatto normativo. Colli di bottiglia che generano ritardi negli adempimenti. Errore umano nei punti critici della catena decisionale.",
    protocollo:
      "Process mining quantitativo e automated remediation: mappatura dei flussi operativi, identificazione dei single point of failure, automazione mediante scripting Python e workflow orchestration con validazione documentale integrata.",
    deliverable:
      "Mappa dei processi con bottleneck analysis, script di automazione delle operazioni ripetitive, dashboard di performance operativa con alert automatici.",
    tags: ["Process mining", "Python scripting", "Workflow automation"],
  },
  {
    id: "finanza-controllo",
    number: 3,
    title: "Finanza, Controllo & Modellazione Predittiva",
    rischio:
      "Decisioni finanziarie fondate su dati storici senza modellistica predittiva. Controllo di gestione statico che fotografa il passato anziché anticipare il futuro. Cash flow management reattivo.",
    protocollo:
      "Controllo finanziario algoritmico: modelli predittivi costruiti sui dati reali dell'impresa, scenari Monte Carlo e stress-test automatizzati, integrazione con i sistemi contabili esistenti.",
    deliverable:
      "Dashboard di controllo di gestione con forecast algoritmico, modelli Monte Carlo per scenario analysis, alert su deviazioni da budget e covenant.",
    tags: ["Monte Carlo", "Cloud computing", "Predictive analytics"],
  },
  {
    id: "governance-organizzativa",
    number: 4,
    title: "Governance & Architettura Organizzativa",
    rischio:
      "Strutture organizzative che generano zone grigie di responsabilità. Deleghe non formalizzate che producono esposizione amministrativa. Assenza di trail documentale nelle decisioni critiche.",
    protocollo:
      "Framework di accountability procedurale: mappatura delle responsabilità con matrice vincolante, formalizzazione delle deleghe con efficacia giuridica, audit trail automatico per ciascuna decisione di rilievo. Validazione in convenzione con Studio Legale Avv. Maria Puglisi sulla base di autonomo mandato del cliente.",
    deliverable:
      "Organigramma con authority matrix vincolante, sistema di deleghe formalizzate, piattaforma di audit trail per tracciabilità decisionale.",
    tags: ["Authority matrix", "Audit trail", "Governance"],
  },
  {
    id: "trasformazione-digitale",
    number: 5,
    title: "Trasformazione Digitale & Compliance by Design",
    rischio:
      "Digitalizzazione che replica in digitale le inefficienze analogiche. Adozione di tecnologie senza compliance by design. Sistemi che non dialogano con il framework normativo di riferimento.",
    protocollo:
      "Architettura digitale compliance-native: i sistemi nascono già conformi, con integrazione AI per document analysis e predictive compliance. Architettura cloud progettata su standard di sicurezza ISO/IEC 27001.",
    deliverable:
      "Architettura digitale compliance-native, pipeline di document analysis assistita da AI, sistema di predictive compliance con alert automatici, documentazione tecnica completa.",
    tags: ["AI integration", "Cloud architecture", "Compliance by design"],
  },
  {
    id: "healthcare-emergency",
    number: 6,
    title: "Healthcare & Emergency Management",
    rischio:
      "Protocolli di emergenza su carta che nessuno consulta. Compliance sanitaria frammentata tra uffici. Tempi di risposta non misurati né misurabili. Assenza di integrazione con i sistemi ministeriali.",
    protocollo:
      "Architettura HSE digitale ed emergency response: digitalizzazione completa dei protocolli, integrazione con API ministeriali, sistema di alert multicanale con escalation automatica.",
    deliverable:
      "Piattaforma HSE digitale, protocolli di emergency response automatizzati, dashboard real-time con tempi di risposta misurati, report di compliance periodici.",
    tags: ["HSE digitale", "API ministeriali", "Emergency automation"],
  },
]

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function TriplexCard({
  type,
  text,
}: {
  type: "rischio" | "protocollo" | "deliverable"
  text: string
}) {
  const config = {
    rischio: {
      bar: "bg-danger",
      label: "Rischio",
      icon: <ShieldAlert className="h-4 w-4 text-danger" />,
    },
    protocollo: {
      bar: "bg-brand",
      label: "Protocollo",
      icon: <FileCheck className="h-4 w-4 text-brand" />,
    },
    deliverable: {
      bar: "bg-success",
      label: "Deliverable",
      icon: <Package className="h-4 w-4 text-success" />,
    },
  }

  const c = config[type]

  return (
    <div className="rounded-lg border border-mist bg-white overflow-hidden">
      <div className={`h-1 ${c.bar}`} />
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          {c.icon}
          <p className="text-eyebrow uppercase tracking-[0.12em] text-steel">
            {c.label}
          </p>
        </div>
        <p className="text-body text-steel">{text}</p>
      </div>
    </div>
  )
}

function TagRow({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2 mt-8">
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-block font-mono text-caption bg-paper text-steel border border-mist px-3 py-1 rounded"
        >
          {tag}
        </span>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function AreeDiInterventoPage() {
  return (
    <>
      {/* Hero */}
      <Hero
        variant="compact"
        eyebrow="Aree di intervento"
        title="Sei aree, un'unica logica di architettura"
        lead="Ciascuna area integra le tre dimensioni del metodo — direzione, compliance, automazione — e produce deliverable misurabili."
      />

      {/* Area sections */}
      {areas.map((area, i) => (
        <section
          key={area.id}
          id={area.id}
          className={i % 2 === 0 ? "bg-white py-16 lg:py-24" : "bg-paper py-16 lg:py-24"}
        >
          <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
            <SectionHeader
              eyebrow={`Area ${area.number}/6`}
              title={area.title}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12">
              <TriplexCard type="rischio" text={area.rischio} />
              <TriplexCard type="protocollo" text={area.protocollo} />
              <TriplexCard type="deliverable" text={area.deliverable} />
            </div>

            <TagRow tags={area.tags} />
          </div>
        </section>
      ))}

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
