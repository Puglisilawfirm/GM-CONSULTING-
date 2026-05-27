import type { Metadata } from "next"
import { Hero } from "@/components/ui/Hero"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { CTAButton } from "@/components/ui/CTAButton"
import { Scale, Gavel, Calculator } from "lucide-react"
import { FormProtocollo23 } from "@/components/protocollo23/FormProtocollo23"

export const metadata: Metadata = {
  title:
    "Protocollo 23 — Adeguata Verifica AML per Professionisti — GM Consulting S.r.l.",
  description:
    "Metodo operativo di adeguata verifica del titolare effettivo per notai, avvocati e commercialisti. Implementazione, formazione e validazione giuridica in convenzione con Studio Legale Avv. Maria Puglisi.",
  alternates: { canonical: "https://www.gmconsulting.one/protocollo-23" },
  openGraph: {
    title: "Protocollo 23 — Adeguata Verifica AML per Professionisti",
    description:
      "Metodo operativo di adeguata verifica del titolare effettivo per notai, avvocati e commercialisti.",
    url: "https://www.gmconsulting.one/protocollo-23",
    siteName: "GM Consulting S.r.l.",
    locale: "it_IT",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Protocollo 23 — Adeguata Verifica AML per Professionisti",
  serviceType: "Compliance Consulting",
  category: "Anti-Money Laundering Compliance",
  provider: {
    "@type": "ProfessionalService",
    name: "GM Consulting S.r.l.",
    url: "https://www.gmconsulting.one",
    vatID: "IT04006730875",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Via Nuovalucello 81/C",
      addressLocality: "Catania",
      addressRegion: "CT",
      postalCode: "95126",
      addressCountry: "IT",
    },
  },
  areaServed: "IT",
  audience: {
    "@type": "Audience",
    audienceType: "Notai, Avvocati, Dottori Commercialisti",
  },
  description:
    "Metodo operativo di adeguata verifica del titolare effettivo ai sensi degli artt. 17-22 D.Lgs. 231/2007 per professionisti soggetti agli obblighi antiriciclaggio.",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Tier di servizio Protocollo 23",
    itemListElement: [
      {
        "@type": "Offer",
        name: "Diagnostico AML",
        description:
          "Esame puntuale dello stato corrente di compliance AML dello studio cliente.",
      },
      {
        "@type": "Offer",
        name: "Metodo AML",
        description:
          "Implementazione del Protocollo presso lo studio cliente con Manuale personalizzato e formazione del team.",
      },
      {
        "@type": "Offer",
        name: "Suite AML Continua",
        description:
          "Metodo esteso a piattaforma di esercizio continuo con integrazione tecnologica e audit annuale.",
      },
      {
        "@type": "Offer",
        name: "Premium Notai",
        description:
          "Programma dedicato al notariato calibrato sulla Regola Tecnica n. 1/2025 del CNN.",
      },
    ],
  },
}

export default function Protocollo23Page() {
  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* A.1 — Hero */}
      <Hero
        variant="compact"
        eyebrow="Protocollo 23 — Soluzione AML per Professionisti"
        title="Adeguata verifica del titolare effettivo. Un sistema automatizzato che lavora con te, non un semplice manuale d'uso."
        lead="Protocollo 23 è il metodo con cui GM Consulting trasforma l'obbligo di adeguata verifica del cliente — incombente su notai, avvocati e commercialisti — da adempimento documentale a procedura operativa verificabile. Il metodo è stato sviluppato e collaudato in produzione presso Studio Legale Avv. Maria Puglisi e codificato come trattamento autonomo nel registro delle attività di trattamento dello Studio. La sua trasposizione presso altri studi avviene per implementazione, formazione e — facoltativamente — validazione giuridica in convenzione professionale."
      >
        <div className="flex flex-wrap gap-4">
          <CTAButton variant="primary" href="#diagnostico-aml">
            Richiedi il Diagnostico AML
          </CTAButton>
          <CTAButton variant="secondary" href="#metodo">
            Esplora il metodo
          </CTAButton>
        </div>
      </Hero>

      {/* A.2 — Il quadro */}
      <section className="bg-paper py-20 lg:py-28">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <SectionHeader
            eyebrow="Il quadro"
            title="L'adempimento formale non protegge. Il sistema operativo sì."
          />
          <div className="mt-10 space-y-6">
            <p className="text-body text-graphite">
              Gli obblighi di adeguata verifica della clientela imposti dagli{" "}
              <strong>
                artt. 17-22 del D.Lgs. 21 novembre 2007, n. 231
              </strong>{" "}
              (come modificato dal D.Lgs. 90/2017 e dal D.Lgs. 125/2019) e
              specificati nelle Regole Tecniche emanate dagli organismi
              professionali —{" "}
              <strong>Regola Tecnica n. 1/2025 del CNN</strong> per il
              notariato, <strong>delibera CNF n. 16/2020</strong> per
              l&apos;avvocatura,{" "}
              <strong>linee guida CNDCEC</strong> per i dottori commercialisti —
              sono, nella prassi della maggior parte degli studi italiani,
              presidiati in forma documentale: un manuale archiviato, una
              check-list compilata in fase di onboarding, una scheda di
              valutazione del rischio inserita nel fascicolo. Questo livello di
              adempimento sopravvive a un&apos;ispezione cartolare, ma non a una
              verifica operativa: l&apos;UIF, in sede di analisi, valuta la{" "}
              <strong>tracciabilità della catena di controllo</strong> e la{" "}
              <strong>riusabilità dei dati ex art. 22</strong>, non la semplice
              presenza della modulistica.
            </p>
            <p className="text-body text-graphite">
              Protocollo 23 affronta l&apos;obbligo come architettura
              procedurale, non come scartoffia. Costruisce nello studio cliente
              la stessa convenzione cartellare tripartita, il medesimo metodo
              ricorsivo di risalita della catena di controllo e la medesima
              conservazione decennale già operativi in produzione presso lo
              Studio che ha sviluppato il metodo. L&apos;esito non è un manuale
              in archivio, ma una procedura che — sottoposta a audit — espone la
              propria stessa esecuzione.
            </p>
          </div>
        </div>
      </section>

      {/* A.3 — Destinatari */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <SectionHeader
            eyebrow="Destinatari"
            title="Tre segmenti professionali, una sola architettura"
            lead="Il metodo è unico, ma la sua applicazione presso ciascuna categoria professionale recepisce la disciplina di settore e il rispettivo organismo di controllo."
          />
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {/* Notai */}
            <div className="rounded-lg border border-mist p-8">
              <Scale className="h-8 w-8 text-brand mb-4" />
              <h3 className="text-h3 text-ink mb-4">Notai</h3>
              <p className="text-body text-graphite">
                Disciplina di riferimento:{" "}
                <strong>
                  Regola Tecnica n. 1/2025 del Consiglio Nazionale del Notariato
                </strong>
                , che ha rafforzato gli obblighi in materia di valutazione del
                rischio, conservazione documentale e segnalazione UIF.
                Protocollo 23 nella sua articolazione{" "}
                <strong>Premium Notai</strong> è calibrato sulla Regola Tecnica
                vigente, sull&apos;integrazione con il Registro Generale
                Cronologico e su un programma di stress-test pre-ispezione
                annuale.
              </p>
            </div>

            {/* Avvocati */}
            <div className="rounded-lg border border-mist p-8">
              <Gavel className="h-8 w-8 text-brand mb-4" />
              <h3 className="text-h3 text-ink mb-4">Avvocati e Studi Legali</h3>
              <p className="text-body text-graphite">
                Disciplina di riferimento:{" "}
                <strong>
                  Regole Tecniche del CNF — delibera n. 16/2020
                </strong>{" "}
                (e successivi aggiornamenti), che declinano l&apos;art. 35 c. 1
                lett. f) del Codice Deontologico Forense in obblighi operativi.
                Protocollo 23 affronta le specifiche prassi del settore —
                onboarding intermittente, mandati a oggetto specifico, frequente
                intervento di terzi — con una procedura ricorsiva ad attivazione
                automatica sui tre trigger canonici (onboarding di persona
                giuridica, acquisizione di visura, conoscenza sopravvenuta).
              </p>
            </div>

            {/* Commercialisti */}
            <div className="rounded-lg border border-mist p-8">
              <Calculator className="h-8 w-8 text-brand mb-4" />
              <h3 className="text-h3 text-ink mb-4">Dottori Commercialisti</h3>
              <p className="text-body text-graphite">
                Disciplina di riferimento:{" "}
                <strong>Linee Guida del CNDCEC</strong> in materia di
                antiriciclaggio, con i loro periodici aggiornamenti.
                Protocollo 23 affronta in particolare la duplice esposizione del
                commercialista — sulle operazioni straordinarie e
                sull&apos;ordinaria tenuta della contabilità — con un modulo di
                formazione dedicato al riconoscimento degli indicatori di
                anomalia UIF nei flussi finanziari ricorrenti.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* A.4 — Tier */}
      <section id="metodo" className="bg-paper py-20 lg:py-28">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <SectionHeader
            eyebrow="Tier di servizio"
            title="Quattro componenti, ciascuna con un esito misurabile"
            lead="Il prodotto è modulare. Si entra dal Diagnostico — un esame puntuale dello stato corrente — e si prosegue, in funzione delle scelte dello studio, verso il Metodo, la Suite Continua o il programma Premium Notai."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {/* Tier 1 */}
            <div
              id="diagnostico-aml"
              className="rounded-lg border border-mist p-8 bg-white"
            >
              <p className="text-eyebrow text-brand mb-2">Tier 1</p>
              <h3 className="text-h3 text-ink mb-4">Diagnostico AML</h3>
              <p className="text-body text-graphite mb-6">
                Esame puntuale dello stato corrente di compliance AML dello
                studio cliente. Mappatura delle procedure esistenti, valutazione
                del livello di formalizzazione, gap analysis rispetto ai
                requisiti normativi e di categoria, scoring del rischio
                operativo.
              </p>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="font-semibold text-ink">Durata</dt>
                  <dd className="text-graphite">10-15 giorni lavorativi</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">Deliverable</dt>
                  <dd className="text-graphite">
                    Diagnostic Report con risk scoring, mappa dei gap
                    prioritizzata, roadmap di adeguamento, quotation
                    personalizzata per i tier successivi
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">Tariffa</dt>
                  <dd className="text-graphite">
                    da &euro;1.800 + IVA, indipendentemente dalla dimensione
                    dello studio
                  </dd>
                </div>
              </dl>
            </div>

            {/* Tier 2 */}
            <div
              id="metodo-aml"
              className="rounded-lg border border-mist p-8 bg-white"
            >
              <p className="text-eyebrow text-brand mb-2">Tier 2</p>
              <h3 className="text-h3 text-ink mb-4">Metodo AML</h3>
              <p className="text-body text-graphite mb-6">
                Implementazione del Protocollo presso lo studio cliente.
                Redazione del Manuale AML personalizzato, installazione della
                convenzione cartellare tripartita, pacchetto di template
                documentali pronti all&apos;uso, formazione iniziale del team di
                studio.
              </p>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="font-semibold text-ink">Durata</dt>
                  <dd className="text-graphite">30-45 giorni lavorativi</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">Include</dt>
                  <dd className="text-graphite">
                    Manuale AML personalizzato &middot; Convenzione cartellare
                    01_KYC_AML/ &middot; Template (Scheda TE, lettere di
                    richiesta, registro dei controlli, modulo segnalazione UIF)
                    &middot; Sessione di formazione di 4 ore (in sede o
                    videoconferenza)
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">Opzionale</dt>
                  <dd className="text-graphite">
                    validazione giuridica del Manuale AML in convenzione con
                    Studio Legale Avv. Maria Puglisi, su autonomo mandato del
                    cliente
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">Tariffa</dt>
                  <dd className="text-graphite">
                    su preventivo, modulata su dimensione e segmento
                  </dd>
                </div>
              </dl>
            </div>

            {/* Tier 3 */}
            <div
              id="suite-continua"
              className="rounded-lg border border-mist p-8 bg-white"
            >
              <p className="text-eyebrow text-brand mb-2">Tier 3</p>
              <h3 className="text-h3 text-ink mb-4">Suite AML Continua</h3>
              <p className="text-body text-graphite mb-6">
                Il Metodo AML, esteso a una piattaforma di esercizio continuo.
                Integrazione tecnologica per la conservazione dei metadati di
                Scheda TE, acquisizione automatizzata delle visure camerali
                tramite Openapi SpA, aggiornamento documentale ricorrente al
                variare della normativa, audit annuale del rispetto della
                procedura.
              </p>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="font-semibold text-ink">Durata</dt>
                  <dd className="text-graphite">
                    setup 30-45 giorni &middot; esercizio continuo
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">Include</dt>
                  <dd className="text-graphite">
                    tutto il Tier 2 e in aggiunta: integrazione Notion (o
                    equivalente) per la Scheda TE &middot; integrazione Openapi
                    SpA con margine di rivendita &middot; aggiornamento normativo
                    automatico &middot; audit annuale &middot; canale di
                    supporto dedicato
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">Tariffa</dt>
                  <dd className="text-graphite">
                    setup su preventivo + canone annuale
                  </dd>
                </div>
              </dl>
            </div>

            {/* Tier 4 */}
            <div
              id="premium-notai"
              className="rounded-lg border border-brand p-8 bg-white"
            >
              <p className="text-eyebrow text-brand mb-2">Tier 4</p>
              <h3 className="text-h3 text-ink mb-4">Premium Notai</h3>
              <p className="text-body text-graphite mb-6">
                Programma dedicato al notariato. Bundle integrale dei tier
                precedenti calibrato sulla Regola Tecnica n. 1/2025 del CNN, con
                integrazione del Registro Generale Cronologico, aggiornamento
                puntuale al variare delle Regole Tecniche, stress-test annuale
                pre-ispezione, single point of contact dedicato in convenzione
                con lo Studio.
              </p>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="font-semibold text-ink">Durata</dt>
                  <dd className="text-graphite">
                    setup 45-60 giorni &middot; esercizio continuo con revisione
                    semestrale
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">Include</dt>
                  <dd className="text-graphite">
                    tutto il Tier 3 e in aggiunta: calibrazione su Regola
                    Tecnica CNN 1/2025 &middot; integrazione con Registro
                    Generale Cronologico notarile &middot; aggiornamento
                    automatico al variare delle Regole Tecniche CNN &middot;
                    stress-test annuale di simulazione ispettiva &middot; single
                    point of contact dedicato in convenzione con Studio Legale
                    Avv. Maria Puglisi &middot; validazione giuridica del
                    Manuale inclusa nel pacchetto
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">Tariffa</dt>
                  <dd className="text-graphite">su preventivo dedicato</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* A.5 — Come opera */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <SectionHeader
            eyebrow="L'architettura procedurale"
            title="Tre trigger, una catena, dieci anni di tracciabilità"
            lead="Il metodo non è ad attivazione manuale. Si innesca ricorsivamente al verificarsi di uno qualsiasi dei tre eventi canonici e prosegue, di risalita in risalita, fino alle persone fisiche ultime."
          />
          <div className="mt-12 space-y-12">
            {/* Subsection 1 */}
            <div>
              <h3 className="text-h3 text-ink mb-4">
                I tre trigger di attivazione automatica
              </h3>
              <p className="text-body text-graphite">
                Protocollo 23 si attiva in tre circostanze, indipendentemente
                dal ruolo del soggetto coinvolto nel mandato:{" "}
                <strong>
                  (i) onboarding di un cliente persona giuridica
                </strong>
                ,{" "}
                <strong>
                  (ii) acquisizione o caricamento, in qualsiasi pratica, di una
                  visura camerale di una persona giuridica
                </strong>{" "}
                — sia essa cliente, controparte o terzo strumentale — e{" "}
                <strong>
                  (iii) conoscenza sopravvenuta di un soggetto in catena di
                  controllo non ancora documentato
                </strong>
                . Quest&apos;ultimo trigger è il fondamento della ricorsività:
                ogni risalita può aprirne un&apos;altra.
              </p>
            </div>

            {/* Subsection 2 */}
            <div>
              <h3 className="text-h3 text-ink mb-4">
                La convenzione cartellare tripartita
              </h3>
              <p className="text-body text-graphite">
                A ciascun soggetto persona giuridica oggetto di verifica
                corrisponde, nella pratica pertinente, la cartella{" "}
                <code className="text-sm bg-brand-soft px-1.5 py-0.5 rounded font-mono">
                  01_KYC_AML/
                </code>{" "}
                (oppure{" "}
                <code className="text-sm bg-brand-soft px-1.5 py-0.5 rounded font-mono">
                  01_KYC_AML_CONTROPARTE/
                </code>{" "}
                per i soggetti in posizione antagonista), articolata in tre
                sotto-cartelle a contenuto rigorosamente partizionato:{" "}
                <code className="text-sm bg-brand-soft px-1.5 py-0.5 rounded font-mono">
                  01_VISURE/
                </code>{" "}
                per la documentazione camerale,{" "}
                <code className="text-sm bg-brand-soft px-1.5 py-0.5 rounded font-mono">
                  02_DOC_IDENTITA/
                </code>{" "}
                per le copie integrali dei documenti d&apos;identità del legale
                rappresentante e di ciascun titolare effettivo,{" "}
                <code className="text-sm bg-brand-soft px-1.5 py-0.5 rounded font-mono">
                  03_SCHEDA_TITOLARE_EFFETTIVO/
                </code>{" "}
                per la Scheda TE.
              </p>
            </div>

            {/* Subsection 3 */}
            <div>
              <h3 className="text-h3 text-ink mb-4">
                La risalita e i tre criteri ex art. 20
              </h3>
              <p className="text-body text-graphite">
                La risalita procede fino alle persone fisiche ultime, applicando
                in modo strettamente ordinato i tre criteri dell&apos;
                <strong>art. 20 c. 2 D.Lgs. 231/2007</strong>: il criterio
                principale del possesso o controllo di una quota superiore al
                25% del capitale (lett. a); il criterio subordinato del
                controllo sulla gestione esercitato in via diversa, ad esempio
                per patti parasociali o accordi atipici (lett. b); il criterio
                residuale del senior manager — amministratore unico, presidente
                del consiglio di amministrazione, direttore generale — quando
                nessuno dei precedenti sia integrato (lett. c). La Scheda TE dà
                conto, per ciascun titolare effettivo, di identità, criterio di
                individuazione, quote partecipative effettive anche indirette,
                poteri di amministrazione, eventuale qualifica PEP, eventuale
                presenza in liste sanzionatorie.
              </p>
            </div>

            {/* Subsection 4 */}
            <div>
              <h3 className="text-h3 text-ink mb-4">
                Conservazione decennale e riutilizzo dei dati
              </h3>
              <p className="text-body text-graphite">
                I documenti integrali (visure, copie d&apos;identità, Schede TE
                firmate) vengono conservati per{" "}
                <strong>dieci anni dalla cessazione del rapporto</strong>, in
                conformità all&apos;
                <strong>art. 31 c. 3 D.Lgs. 231/2007</strong>, in ambiente a
                accesso esclusivo del titolare dello studio. I metadati della
                Scheda TE — e solo i metadati — popolano l&apos;eventuale
                ambiente di gestione documentale, in deroga consapevole alle
                ordinarie limitazioni di cross-reference inter-pratica per
                consentire il regime di{" "}
                <strong>
                  riutilizzo dei dati AML imposto dall&apos;art. 22 D.Lgs.
                  231/2007
                </strong>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* A.6 — Convenzione */}
      <section className="bg-paper border-l-4 border-brand py-20 lg:py-28">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <SectionHeader
            eyebrow="Trasparenza professionale"
            title="Il Manuale AML può essere validato giuridicamente in convenzione con Studio Legale Avv. Maria Puglisi"
          />
          <p className="text-body text-graphite mt-8 max-w-4xl">
            Tutti i tier di Protocollo 23 consentono — facoltativamente per
            Diagnostico, Metodo e Suite Continua, inclusa nel Premium Notai —
            l&apos;attivazione della validazione giuridica del Manuale AML
            personalizzato da parte di Studio Legale Avv. Maria Puglisi, sulla
            base di autonomo mandato professionale del cliente. La convenzione
            fra le due strutture garantisce continuità operativa nei limiti
            della rispettiva legittimazione professionale: GM Consulting eroga
            l&apos;implementazione tecnica e procedurale, lo Studio Legale eroga
            la validazione giuridica in forma di parere scritto sottoscritto, con
            autonoma preventivazione, autonoma fatturazione e autonoma copertura
            assicurativa professionale.
          </p>
          <div className="mt-8">
            <CTAButton variant="ghost" href="/convenzione-studio">
              Leggi i termini della convenzione
            </CTAButton>
          </div>
        </div>
      </section>

      {/* A.7 — Form CTA */}
      <section id="diagnostico-aml-form" className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <SectionHeader
            eyebrow="Diagnostico AML"
            title="Il punto di partenza è il Diagnostico. Si attiva in 10 giorni."
          />
          <p className="text-body text-graphite mt-6 max-w-3xl">
            Compili il modulo dedicato. Riceverà entro 5 giorni lavorativi una
            proposta operativa per il Diagnostico AML del Suo studio, articolata
            su tempi, attività ricomprese e tariffa.
          </p>
          <div className="mt-10">
            <FormProtocollo23 />
          </div>
        </div>
      </section>
    </>
  )
}
