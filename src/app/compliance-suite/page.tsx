import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, ShieldCheck, Network, Scale, Building2, Landmark } from "lucide-react"
import { Hero } from "@/components/ui/Hero"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { CTAButton } from "@/components/ui/CTAButton"
import { FormComplianceSuite } from "@/components/compliance-suite/FormComplianceSuite"

export const metadata: Metadata = {
  title: "Compliance Suite — Programma di compliance per le PMI",
  description:
    "GDPR, NIS2, D.Lgs. 231/2001, adeguati assetti e antiriciclaggio su un'unica architettura di registri, controlli e scadenze, gestita da GM Consulting. Richiedi una demo.",
  alternates: { canonical: "https://www.gmconsulting.one/compliance-suite" },
  openGraph: {
    title: "Compliance Suite — Programma di compliance per le PMI",
    description:
      "GDPR, NIS2, D.Lgs. 231/2001, adeguati assetti e antiriciclaggio su un'unica architettura di registri, controlli e scadenze, gestita da GM Consulting in collaborazione con Puglisi Law Firm.",
    url: "https://www.gmconsulting.one/compliance-suite",
    siteName: "GM Consulting S.r.l.",
    locale: "it_IT",
    type: "website",
    images: [
      {
        url: "https://www.gmconsulting.one/og-default.png",
        width: 1200,
        height: 630,
        alt: "GM Consulting S.r.l. — Compliance Suite, programma di compliance per le PMI",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Compliance Suite — Programma di compliance multi-ambito per le PMI",
  serviceType: "Compliance Consulting",
  category: "Regulatory Compliance Program",
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
    audienceType: "PMI e organizzazioni di media complessità",
  },
  description:
    "Programma di compliance gestito da GM Consulting che riconduce GDPR, NIS2, D.Lgs. 231/2001, adeguati assetti ex art. 2086 c.c. e antiriciclaggio a un'unica architettura di registri, controlli e scadenze.",
}

const ambitiFondamentali = [
  {
    icon: ShieldCheck,
    title: "GDPR",
    sub: "Protezione dei dati personali — Reg. UE 2016/679",
    text: "Registro dei trattamenti, basi giuridiche, informative, accordi con i responsabili, diritti degli interessati, violazioni, DPIA, videosorveglianza, sito e strumenti di marketing.",
  },
  {
    icon: Network,
    title: "NIS2",
    sub: "Sicurezza delle reti e dei sistemi informativi — Dir. (UE) 2022/2555, D.Lgs. 138/2024",
    text: "Qualificazione del soggetto (essenziale o importante), registrazione, misure di gestione del rischio, gestione e notifica degli incidenti, continuità operativa; raccordo con l'ambito ISO/IEC 27001.",
  },
  {
    icon: Scale,
    title: "D.Lgs. 231/2001",
    sub: "Responsabilità amministrativa dell'ente",
    text: "Mappatura delle attività sensibili, catalogo dei reati presupposto, protocolli, canale di segnalazione interna, Organismo di Vigilanza e flussi informativi.",
  },
  {
    icon: Building2,
    title: "Adeguati assetti",
    sub: "Art. 2086 c.c. e Codice della crisi d'impresa e dell'insolvenza (D.Lgs. 14/2019)",
    text: "Assetto organizzativo, amministrativo e contabile, segnali di allerta, fascicolo della crisi e riesame periodico.",
  },
  {
    icon: Landmark,
    title: "Antiriciclaggio",
    sub: "D.Lgs. 231/2007",
    text: "Profilo del soggetto (obbligato o non obbligato), titolare effettivo, adeguata verifica, limiti al contante, presidi sui reati presupposto. Per gli studi professionali il tema è trattato dal prodotto dedicato Protocollo 23.",
    link: { href: "/protocollo-23", label: "Vai a Protocollo 23" },
  },
]

const ambitiIntegrativi = [
  {
    title: "Sistemi di gestione ISO/IEC 27001, ISO 37001 e ISO 22301",
    text: "Struttura di controlli raccordata agli ambiti normativi: sicurezza delle informazioni, anticorruzione, continuità operativa.",
  },
  {
    title: "Salute e sicurezza sul lavoro — DVR e DUVRI (D.Lgs. 81/2008)",
    text: "Bozze, verifiche e mantenimento; la valutazione dei rischi resta atto del datore di lavoro.",
  },
  {
    title: "Risanamento organizzativo e self-cleaning negli appalti pubblici",
    text: "Ricostruzione dei fatti, misure organizzative e dossier per la stazione appaltante.",
  },
  {
    title: "Voucher Cloud & Cybersecurity (MIMIT / Invitalia)",
    text: "Finanziamento delle misure tecniche emerse dagli ambiti NIS2 e GDPR, con GM Consulting quale consulente indipendente dell'impresa.",
    link: { href: "/insights/voucher-cloud-cybersecurity-mimit-2026", label: "Leggi la scheda della misura" },
  },
]

const fasi = [
  {
    title: "Qualificazione",
    text: "Un questionario iniziale e la lettura della documentazione esistente (visure, organigramma, contratti, policy) determinano il profilo dell'impresa e gli ambiti pertinenti. Nulla si presume: ogni dato è rilevato o dichiarato mancante.",
  },
  {
    title: "Scheda della società",
    text: "Tutti gli ambiti attingono alla medesima scheda: forma giuridica, attività, sedi, sistemi, fornitori, ruoli. È la base che evita duplicazioni fra regimi normativi.",
  },
  {
    title: "Attivazione dei pacchetti",
    text: "Gli ambiti pertinenti sono attivati sull'impresa; i controlli e le scadenze diventano il piano di lavoro, con responsabili e termini.",
  },
  {
    title: "Onboarding documentale",
    text: "I documenti dell'impresa sono acquisiti e ricondotti ai registri; l'impresa riceve l'elenco puntuale di ciò che manca e di ciò che va chiesto a terzi.",
  },
  {
    title: "Registri e controlli",
    text: "Registri dei trattamenti, dei sistemi, dei fornitori, delle deleghe, degli incidenti e delle segnalazioni, tenuti su un'unica architettura e aggiornati al variare della normativa.",
  },
  {
    title: "Presidio continuo",
    text: "Riesame periodico, verifica delle scadenze, report direzionale: una fotografia dello stato di conformità che l'organo amministrativo può produrre a richiesta.",
  },
]

const consegne = [
  "Scheda della società e mappa dei processi che attraversano più funzioni.",
  "Registri aggiornati per ciascun ambito attivato.",
  "Piano di adeguamento con responsabili e termini.",
  "Report direzionale periodico sullo stato di conformità.",
  "Elenco di ciò che manca e di ciò che va richiesto a terzi, sempre aggiornato.",
]

export default function ComplianceSuitePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <Hero
        variant="compact"
        eyebrow="Compliance Suite — Programma di compliance per le PMI"
        title="La compliance come occasione per mettere ordine in azienda."
        lead="Compliance Suite è il programma con cui GM Consulting prende in carico, per l'impresa, gli obblighi che si sovrappongono — protezione dei dati, sicurezza delle reti, responsabilità dell'ente, adeguati assetti, antiriciclaggio — e li riconduce a un'unica architettura di registri, controlli e scadenze. Il cliente non installa nulla e non impara uno strumento: riceve una fotografia ordinata della propria organizzazione, un piano di adeguamento e un presidio continuo."
      >
        <p className="text-h3 text-ink max-w-3xl">
          Decine di obblighi sembrano altrettanti ostacoli. Non lo sono: sono
          l&apos;occasione per mettere ordine nell&apos;impresa che già esiste.
          Noi la accompagniamo.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <CTAButton variant="primary" href="#demo">
            Richiedi una demo
          </CTAButton>
          <CTAButton variant="secondary" href="#come-funziona">
            Scopri come funziona
          </CTAButton>
        </div>
        <p className="mt-6 text-caption text-graphite">
          Sviluppata in collaborazione con{" "}
          <a
            href="https://www.puglisilawfirm.it"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand font-medium hover:underline"
          >
            Puglisi Law Firm
          </a>{" "}
          — perché la compliance non è soltanto una questione giuridica.
        </p>
      </Hero>

      {/* Il quadro */}
      <section className="bg-paper py-20 lg:py-28">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <SectionHeader
            eyebrow="Il quadro"
            title="Gli obblighi si sovrappongono. L'organizzazione, di solito, no."
          />
          <div className="mt-10 space-y-6 max-w-4xl">
            <p className="text-body text-graphite">
              Nella maggior parte delle imprese di media dimensione la
              compliance è distribuita fra consulenti diversi, fascicoli
              diversi e scadenze tenute a memoria. Il registro dei trattamenti
              sta in uno studio, il Modello 231 in un altro, la valutazione dei
              rischi informatici in un terzo; l&apos;organigramma, le deleghe e
              le procedure vivono in versioni non coincidenti. Il costo non è
              soltanto il rischio sanzionatorio: è il tempo speso a cercare
              documenti, le decisioni prese senza dati, gli investimenti in
              sistemi e consulenze che nessuno riconduce a un disegno.
            </p>
            <p className="text-body text-graphite">
              Compliance Suite nasce da questa osservazione. Gli obblighi
              normativi condividono gran parte dei loro presupposti — chi fa
              che cosa, con quali strumenti, su quali dati, con quali fornitori
              — e possono essere gestiti su un&apos;architettura unica. Mettere
              ordine per adempiere significa, nello stesso tempo, mettere
              ordine per governare.
            </p>
          </div>
        </div>
      </section>

      {/* Destinatari */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <SectionHeader
            eyebrow="Destinatari"
            title="Per imprese che vogliono il controllo dei processi, non un altro adempimento."
          />
          <div className="mt-10 space-y-6 max-w-4xl">
            <p className="text-body text-graphite">
              Compliance Suite è pensata per PMI e organizzazioni di media
              complessità — industria, servizi, sanità privata, imprese
              familiari in crescita — che devono rispondere a più regimi
              normativi contemporaneamente e non dispongono di una funzione
              compliance interna. L&apos;imprenditore conserva la direzione
              dell&apos;impresa; GM Consulting gli restituisce la visibilità sui
              processi che attraversano più funzioni e che, per loro natura,
              sfuggono alla verifica diretta: dati, sistemi informativi,
              fornitori, deleghe, flussi finanziari.
            </p>
            <p className="text-body text-graphite">
              Ne traggono beneficio anche i gruppi con più società, che possono
              adottare un&apos;unica architettura di controlli con una scheda
              per ciascuna entità.
            </p>
          </div>
        </div>
      </section>

      {/* Ambiti */}
      <section id="ambiti" className="bg-paper py-20 lg:py-28">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <SectionHeader
            eyebrow="Gli ambiti del programma"
            title="Un'architettura, più ambiti attivabili."
            lead="Ogni ambito è un pacchetto del programma: requisiti riscontrati sul testo normativo vigente, controlli, guide operative, questionari di qualificazione, rischi, policy, attività e scadenze. I pacchetti si attivano sulla singola impresa in funzione del profilo che emerge dalla qualificazione iniziale e condividono la medesima scheda della società: ciò che è stato rilevato per un ambito non si chiede una seconda volta per l'altro."
          />

          <h3 className="mt-12 text-h3 text-ink">Ambiti fondamentali</h3>
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ambitiFondamentali.map((a) => {
              const Icon = a.icon
              return (
                <div key={a.title} className="rounded-lg border border-mist bg-white p-8 flex flex-col">
                  <Icon className="h-8 w-8 text-brand mb-4" aria-hidden="true" />
                  <h4 className="text-h3 text-ink">{a.title}</h4>
                  <p className="text-caption text-steel mt-1">{a.sub}</p>
                  <p className="text-body text-graphite mt-4">{a.text}</p>
                  {"link" in a && a.link && (
                    <Link
                      href={a.link.href}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-brand hover:underline"
                    >
                      {a.link.label}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  )}
                </div>
              )
            })}
          </div>

          <h3 className="mt-14 text-h3 text-ink">Ambiti integrativi</h3>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {ambitiIntegrativi.map((a) => (
              <div key={a.title} className="rounded-lg border border-mist bg-white p-8">
                <h4 className="text-h3 text-ink">{a.title}</h4>
                <p className="text-body text-graphite mt-3">{a.text}</p>
                {"link" in a && a.link && (
                  <Link
                    href={a.link.href}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-brand hover:underline"
                  >
                    {a.link.label}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                )}
              </div>
            ))}
          </div>

          <p className="mt-10 text-caption text-steel max-w-3xl">
            Il catalogo degli ambiti si estende con la disponibilità dei
            contenuti; la demo illustra gli ambiti attivabili alla data e le
            modalità di attivazione sulla singola impresa.
          </p>
        </div>
      </section>

      {/* Come funziona */}
      <section id="come-funziona" className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <SectionHeader
            eyebrow="Come funziona"
            title="Dalla qualificazione al presidio continuo."
          />
          <ol className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {fasi.map((f, i) => (
              <li key={f.title} className="rounded-lg border border-mist p-8">
                <p className="text-eyebrow text-brand mb-2">Fase {i + 1}</p>
                <h3 className="text-h3 text-ink mb-3">{f.title}</h3>
                <p className="text-body text-graphite">{f.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Che cosa riceve l'impresa */}
      <section className="bg-paper py-20 lg:py-28">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <SectionHeader
            eyebrow="Che cosa riceve l'impresa"
            title="Documenti, registri e un report direzionale. Senza software da gestire."
          />
          <div className="mt-10 grid gap-10 lg:grid-cols-12 items-start">
            <p className="text-body text-graphite lg:col-span-7">
              Compliance Suite è gestita interamente da GM Consulting.
              L&apos;impresa non installa applicativi e non forma il personale
              a uno strumento: riceve i documenti del programma (policy,
              procedure, registri, informative, nomine), il piano di
              adeguamento con le scadenze e un report periodico sullo stato di
              conformità, leggibile dall&apos;organo amministrativo e
              utilizzabile verso banche, clienti e stazioni appaltanti.
            </p>
            <ul className="lg:col-span-5 space-y-3 rounded-lg border border-mist bg-white p-8">
              {consegne.map((c) => (
                <li key={c} className="flex gap-3 text-body text-graphite">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Convenzione con lo Studio */}
      <section className="bg-white border-l-4 border-brand py-20 lg:py-28">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12 grid gap-10 lg:grid-cols-12 items-start">
          <div className="lg:col-span-7">
            <SectionHeader
              eyebrow="Convenzione con lo Studio"
              title="Dove serve la firma di un legale, interviene lo Studio."
            />
            <p className="text-body text-graphite mt-8">
              GM Consulting cura la parte organizzativa, documentale e di
              presidio del programma. Le attività che richiedono una
              valutazione giuridica o una sottoscrizione professionale — fra le
              altre, la validazione del Modello 231 e del Codice Etico, i
              pareri sulle deleghe e sulle responsabilità dell&apos;organo
              amministrativo, il dossier di self-cleaning per la stazione
              appaltante — sono svolte in convenzione con lo Studio Legale Avv.
              Maria Puglisi, su autonomo mandato professionale del cliente,
              con autonoma preventivazione, fatturazione e copertura
              assicurativa.
            </p>
            <div className="mt-8">
              <CTAButton variant="ghost" href="/convenzione-studio">
                Leggi i termini della convenzione
              </CTAButton>
            </div>
          </div>
          <aside className="lg:col-span-5 rounded-lg border border-mist bg-paper p-8">
            <p className="text-eyebrow uppercase tracking-[0.12em] text-brand">
              Sviluppata in collaborazione con Puglisi Law Firm
            </p>
            <p className="text-body text-graphite mt-4">
              La compliance non è soltanto una questione giuridica: è
              organizzazione, dati, processi e persone. Per questo Compliance
              Suite è sviluppata in collaborazione con lo Studio Legale Avv.
              Maria Puglisi, che ne presidia la parte giuridica — lettura delle
              norme, validazione degli atti, pareri — mentre GM Consulting ne
              cura l&apos;architettura organizzativa e il presidio continuo. Due
              competenze, un solo programma.
            </p>
            <a
              href="https://www.puglisilawfirm.it"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-brand hover:underline"
            >
              Scopri lo Studio — puglisilawfirm.it
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </aside>
        </div>
      </section>

      {/* Demo */}
      <section id="demo" className="bg-paper py-20 lg:py-28">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <SectionHeader
            eyebrow="Richiedi una demo"
            title="Una demo di quarantacinque minuti sull'impresa, non sul prodotto."
          />
          <p className="text-body text-graphite mt-6 max-w-3xl">
            La demo si svolge in videoconferenza sul profilo della Sua impresa:
            individuiamo gli ambiti pertinenti, mostriamo come il programma li
            gestisce e Le restituiamo, entro cinque giorni lavorativi, una
            proposta con perimetro, attività e condizioni economiche.
          </p>
          <div className="mt-10">
            <FormComplianceSuite />
          </div>
        </div>
      </section>
    </>
  )
}
