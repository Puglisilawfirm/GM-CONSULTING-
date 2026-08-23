import type { Metadata } from "next"
import { Hero } from "@/components/ui/Hero"

export const metadata: Metadata = {
  title: "Convenzione con Studio Legale Puglisi",
  description:
    "Separazione strutturale fra attività consulenziale e legale. Termini della convenzione fra GM Consulting e Studio Legale Avv. Maria Puglisi.",
  alternates: { canonical: "https://www.gmconsulting.one/convenzione-studio" },
}

const sections = [
  {
    title: "Il perimetro delle due strutture",
    paragraphs: [
      "GM Consulting S.r.l. eroga servizi di consulenza direzionale, di architettura di compliance e di automazione dei processi, ai sensi del proprio oggetto sociale e in coerenza con il codice ATECO 70.20.09. Studio Legale Avv. Maria Puglisi, con sede in Catania, eroga in via esclusiva i servizi di consulenza legale, assistenza stragiudiziale e giudiziale, validazione contrattuale e parere giuridico, in conformità alla L. 31 dicembre 2012, n. 247 e al Codice Deontologico Forense.",
      "Le due strutture sono distinte sotto il profilo giuridico, patrimoniale e organizzativo. La condivisione della sede operativa non comporta confusione dei perimetri professionali.",
    ],
  },
  {
    title: "Come opera la convenzione",
    paragraphs: [
      "Per ciascun intervento che richieda contestualmente competenze consulenziali e attività legale in senso proprio, GM Consulting segnala al cliente l'opportunità di conferire autonomo mandato professionale allo Studio Legale Avv. Maria Puglisi. Il mandato è formalizzato in atto separato, con autonoma preventivazione, autonoma fatturazione e autonoma copertura assicurativa professionale dello Studio.",
      "L'attività legale così resa entra nel ciclo operativo del progetto come componente parallela e coordinata, ma resta giuridicamente imputabile esclusivamente allo Studio Legale.",
    ],
  },
  {
    title: "Tutela della riservatezza",
    paragraphs: [
      "Le informazioni trasmesse a GM Consulting sono trattate ai sensi del Regolamento (UE) 2016/679 e tutelate da vincolo contrattuale di riservatezza, con accesso limitato al personale incaricato. Le informazioni trasmesse direttamente allo Studio Legale Avv. Maria Puglisi nell'esercizio del mandato professionale sono ulteriormente tutelate dal segreto professionale ex art. 622 c.p. e dalle prerogative di cui agli artt. 200 c.p.p. e 249 c.p.c., nonché dall'art. 13 del Codice Deontologico Forense.",
    ],
  },
  {
    title: "Polizza di responsabilità civile professionale",
    paragraphs: [
      "Entrambe le strutture dispongono di idonea polizza di responsabilità civile professionale. I dettagli di copertura sono disponibili su richiesta.",
    ],
  },
]

export default function ConvenzioneStudioPage() {
  return (
    <>
      <Hero
        variant="compact"
        eyebrow="Trasparenza professionale"
        title="Convenzione professionale con Studio Legale Avv. Maria Puglisi"
        lead="La separazione fra attività consulenziale e attività legale è strutturale, non formale. Questa pagina espone i termini operativi della convenzione."
      />

      <section className="bg-paper py-20 lg:py-28">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <div className="max-w-3xl space-y-16">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="text-h2 text-ink mb-6">{section.title}</h2>
                {section.paragraphs.map((p, i) => (
                  <p key={i} className="text-body text-graphite mb-4 last:mb-0">
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
