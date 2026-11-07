import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  Bell,
  Building2,
  CalendarClock,
  CircleCheck,
  Download,
  FileText,
  Landmark,
  LayoutDashboard,
  Lock,
  Network,
  Radar,
  Scale,
  Server,
  ShieldCheck,
  UserRound,
  Users,
} from "lucide-react"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { CTAButton } from "@/components/ui/CTAButton"
import { FormComplianceSuite } from "@/components/compliance-suite/FormComplianceSuite"

const PAGE_URL = "https://www.gmconsulting.one/compliance-suite"
const BROCHURE_URL = "/downloads/compliance-suite-gm-consulting.pdf"
const OG_IMAGE = "https://www.gmconsulting.one/images/compliance-suite-og.png"
const OG_TITLE = "La tua compliance, presa in carico — Compliance Suite di GM Consulting"
const OG_DESCRIPTION =
  "Privacy, NIS2 e cybersecurity, 231, adeguati assetti, antiriciclaggio: un unico servizio, un Compliance Manager dedicato, una dashboard sempre aggiornata. I tuoi dati restano da noi. Scarica la brochure."

export const metadata: Metadata = {
  title: "Compliance Suite — La tua compliance, presa in carico",
  description: OG_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    url: PAGE_URL,
    siteName: "GM Consulting S.r.l.",
    locale: "it_IT",
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Compliance Suite di GM Consulting — La tua compliance, presa in carico",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    images: [OG_IMAGE],
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Compliance Suite — Programma di compliance multi-ambito per le PMI",
  serviceType: "Compliance Consulting",
  category: "Regulatory Compliance Program",
  url: PAGE_URL,
  image: OG_IMAGE,
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
    "Servizio di compliance gestito da GM Consulting che prende in carico GDPR, NIS2 e cybersecurity, D.Lgs. 231/2001, adeguati assetti ex art. 2086 c.c. e antiriciclaggio su un'unica architettura di registri, controlli e scadenze.",
}

const valori = [
  { title: "Una persona di riferimento", text: "Il tuo Compliance Manager, per tutti gli ambiti." },
  { title: "Tutto in una vista", text: "Il tuo stato di conformità, sempre aggiornato." },
  { title: "Nessun software da imparare", text: "Il servizio lo gestiamo noi." },
  { title: "I tuoi dati restano da noi", text: "Non escono mai dalla nostra struttura." },
]

const consegne = [
  "Una fotografia ordinata della tua organizzazione",
  "Un piano di adeguamento chiaro, con owner e deadline",
  "Policy, procedure, registri, informative e nomine pronti",
  "La tua area cliente con stato, task e scadenze",
  "Un report periodico da portare in consiglio",
]

const fasi = [
  {
    title: "Qualificazione",
    text: "Un questionario e la lettura dei tuoi documenti (visura, organigramma, contratti, policy) ci dicono il profilo della tua impresa e gli ambiti che ti riguardano. Nulla si presume: ogni dato è rilevato o segnalato come mancante.",
  },
  {
    title: "Scheda della società",
    text: "Tutti gli ambiti attingono alla stessa scheda: forma giuridica, attività, sedi, sistemi, fornitori, ruoli. Quello che ci racconti una volta non te lo chiediamo di nuovo.",
  },
  {
    title: "Attivazione",
    text: "Attiviamo gli ambiti pertinenti: controlli e scadenze diventano il tuo piano di lavoro, con owner e termini.",
  },
  {
    title: "Onboarding documentale",
    text: "Acquisiamo i tuoi documenti e li riconduciamo ai registri; ricevi l'elenco puntuale di ciò che manca e di ciò che va chiesto a terzi.",
  },
  {
    title: "Registri e controlli",
    text: "Registri dei trattamenti, dei sistemi, dei fornitori, delle deleghe, degli incidenti e delle segnalazioni, tenuti su un'unica architettura e aggiornati quando cambia la normativa.",
  },
  {
    title: "Presidio continuo",
    text: "Riesame periodico, controllo delle scadenze, report alla Direzione: una fotografia dello stato di conformità che puoi esibire quando serve.",
  },
]

const ambitiFondamentali = [
  {
    icon: ShieldCheck,
    title: "GDPR",
    sub: "Protezione dei dati personali — Reg. UE 2016/679",
    text: "Registro dei trattamenti, basi giuridiche, informative, accordi con i responsabili, diritti degli interessati, violazioni, DPIA, videosorveglianza, sito e strumenti di marketing.",
  },
  {
    icon: Network,
    title: "NIS2 e cybersecurity",
    sub: "Sicurezza delle reti e dei sistemi informativi — Dir. UE 2022/2555, D.Lgs. 138/2024",
    text: "Qualificazione del soggetto (essenziale o importante), registrazione, misure di gestione del rischio, gestione e notifica degli incidenti, continuità operativa, monitoraggio dei sistemi; raccordo con ISO/IEC 27001.",
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
    text: "Profilo del soggetto (obbligato o non obbligato), titolare effettivo, adeguata verifica, limiti al contante, presidi sui reati presupposto. Per gli studi professionali c'è il prodotto dedicato Protocollo 23.",
    link: { href: "/protocollo-23", label: "Vai a Protocollo 23" },
  },
]

const ambitiIntegrativi = [
  {
    title: "ISO/IEC 27001, ISO 37001 e ISO 22301",
    text: "Sistemi di gestione raccordati agli ambiti normativi: sicurezza delle informazioni, anticorruzione, continuità operativa.",
  },
  {
    title: "Salute e sicurezza — DVR e DUVRI (D.Lgs. 81/2008)",
    text: "Bozze, verifiche e mantenimento; la valutazione dei rischi resta atto del datore di lavoro.",
  },
  {
    title: "Risanamento organizzativo e self-cleaning",
    text: "Ricostruzione dei fatti, misure organizzative e dossier per la stazione appaltante.",
  },
  {
    title: "Voucher Cloud & Cybersecurity (MIMIT / Invitalia)",
    text: "Finanziamento delle misure tecniche emerse da NIS2 e GDPR, con GM Consulting consulente indipendente della tua impresa.",
    link: { href: "/insights/voucher-cloud-cybersecurity-mimit-2026", label: "Leggi la scheda della misura" },
  },
]

const areaCliente = [
  { icon: LayoutDashboard, title: "Dashboard", text: "Conformità per ambito, scadenze a 30 e 90 giorni, avanzamento della roadmap." },
  { icon: CircleCheck, title: "Task ed evidenze", text: "Assegnati ai tuoi owner, caricati direttamente sul controllo giusto." },
  { icon: FileText, title: "Documenti", text: "Sempre nella versione vigente, con lo storico delle versioni." },
  { icon: Bell, title: "Richieste", text: "I tuoi quesiti, tracciati fino alla risposta." },
  { icon: Download, title: "Report e Board Pack", text: "Pronti da consultare ed esportare." },
]

const ritmo = [
  { when: "Ogni mese", what: "Verifichiamo scadenze e task aperti." },
  { when: "Ogni trimestre", what: "Ci sediamo al tavolo per la Quarterly Business Review." },
  { when: "Ogni semestre", what: "Ricevi il Board Pack per il tuo organo amministrativo." },
  { when: "Ogni anno", what: "Riesaminiamo gli ambiti e aggiorniamo la roadmap." },
  { when: "Quando serve", what: "Ti avvisiamo delle novità normative che ti riguardano." },
]

const team = [
  { icon: Users, title: "Il tuo organo amministrativo", text: "Decide e riceve il Board Pack." },
  { icon: UserRound, title: "I tuoi owner", text: "Eseguono i task e forniscono le evidenze." },
  { icon: CalendarClock, title: "Il tuo Compliance Manager", text: "Pianifica, coordina, risponde." },
  { icon: Scale, title: "L'Avvocato", text: "Interviene su mandato autonomo, quando serve." },
]

const datiGaranzie = [
  "I tuoi contratti e i dati di dipendenti, clienti e fornitori non passano per le mani di nessun altro.",
  "Nessuno li usa per addestrare un'intelligenza artificiale.",
  "Se una banca, un cliente o un'autorità ti chiede dove sono i tuoi dati, la risposta è una sola: da noi.",
  "Ogni accesso è registrato: sai sempre chi ha visto che cosa.",
]

function BrochureDownload({ dark = false }: { dark?: boolean }) {
  return (
    <a
      href={BROCHURE_URL}
      download
      data-analytics-target="compliance_suite_brochure"
      className={
        dark
          ? "inline-flex items-center justify-center gap-2 px-6 py-3 font-medium rounded-md text-sm border border-white/40 text-white hover:bg-white/10 transition-colors"
          : "inline-flex items-center justify-center gap-2 px-6 py-3 font-medium rounded-md text-sm border border-brand text-brand hover:bg-brand-soft transition-colors"
      }
    >
      <Download className="h-4 w-4" aria-hidden="true" />
      Scarica la brochure (PDF)
    </a>
  )
}

export default function ComplianceSuitePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="bg-[#011333] text-white py-20 lg:py-28 overflow-hidden">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12 grid gap-12 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7">
            <p className="text-eyebrow uppercase tracking-[0.18em] text-[#EA9A25] mb-6">Compliance Suite</p>
            <h1 className="text-h1 lg:text-display text-white">La tua compliance, presa in carico.</h1>
            <p className="text-body-lg text-[#C9D3E6] max-w-2xl mt-6">
              Privacy, NIS2 e cybersecurity, 231, adeguati assetti, antiriciclaggio. Tu guidi l&apos;impresa: a
              tutto il resto pensiamo noi, insieme a te.
            </p>
            <p className="mt-8 max-w-2xl border-l-4 border-[#EA9A25] pl-5 text-body-lg text-white">
              Decine di obblighi sembrano altrettanti ostacoli. Non lo sono: sono l&apos;occasione per mettere
              ordine nell&apos;impresa che già esiste. Noi la accompagniamo.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="#demo"
                className="inline-flex items-center justify-center px-6 py-3 font-medium rounded-md text-sm bg-[#EA9A25] text-[#011333] hover:bg-[#f0ac46] transition-colors"
              >
                Richiedi una demo
              </Link>
              <BrochureDownload dark />
            </div>
          </div>
          <div className="lg:col-span-5">
            <a href={BROCHURE_URL} download className="block group" aria-label="Scarica la brochure Compliance Suite in PDF">
              <Image
                src="/images/compliance-suite-brochure-copertina.webp"
                alt="Copertina della brochure Compliance Suite di GM Consulting"
                width={662}
                height={936}
                priority
                className="w-full max-w-sm mx-auto rounded-lg shadow-2xl ring-1 ring-white/10 transition-transform group-hover:-translate-y-1"
              />
            </a>
          </div>
        </div>
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12 mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {valori.map((v) => (
            <div key={v.title} className="border-t border-white/20 pt-4">
              <p className="font-semibold text-[#EA9A25]">{v.title}</p>
              <p className="text-sm text-[#C9D3E6] mt-1">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Il servizio */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12 grid gap-12 lg:grid-cols-12 items-start">
          <div className="lg:col-span-7">
            <SectionHeader eyebrow="Il servizio" title="Meno consulenti da rincorrere. Più tempo per la tua impresa." />
            <div className="mt-8 space-y-5">
              <p className="text-body-lg text-graphite">
                Il registro dei trattamenti in uno studio, il Modello 231 in un altro, la sicurezza informatica in un
                terzo. Scadenze tenute a memoria, documenti da cercare ogni volta che qualcuno li chiede. Se ti
                riconosci, non sei il solo: è così nella maggior parte delle PMI.
              </p>
              <p className="text-body text-graphite">
                Gli obblighi però poggiano sugli stessi presupposti: chi fa che cosa, con quali strumenti, su quali
                dati, con quali fornitori. Per questo li prendiamo in carico tutti insieme, su un&apos;unica
                architettura.
              </p>
            </div>
          </div>
          <div className="lg:col-span-5 rounded-xl bg-[#011333] text-white p-8">
            <p className="font-semibold text-[#EA9A25] text-lg">Che cosa trovi con noi</p>
            <ul className="mt-5 space-y-3">
              {consegne.map((c) => (
                <li key={c} className="flex gap-3 text-[#E3E8F2]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#EA9A25]" aria-hidden="true" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Come funziona */}
      <section id="come-funziona" className="bg-paper py-20 lg:py-28">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <SectionHeader eyebrow="Come funziona" title="Sei passi, dalla qualificazione al presidio continuo." />
          <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {fasi.map((f, i) => (
              <li
                key={f.title}
                className={`rounded-lg bg-white p-8 border-t-4 ${i === fasi.length - 1 ? "border-[#EA9A25]" : "border-[#011333]"}`}
              >
                <p className="text-3xl font-bold text-[#EA9A25]">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="text-h3 text-ink mt-2 mb-3">{f.title}</h3>
                <p className="text-body text-graphite">{f.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-lg bg-white border border-mist p-8">
              <h3 className="text-h3 text-ink">Human-led</h3>
              <p className="text-body text-graphite mt-3">
                Dietro ogni analisi e ogni documento c&apos;è un professionista che conosce la tua impresa. Il tuo
                Compliance Manager è sempre la stessa persona, e risponde per tutti gli ambiti.
              </p>
            </div>
            <div className="rounded-lg bg-white border border-mist p-8">
              <h3 className="text-h3 text-ink">AI-powered</h3>
              <p className="text-body text-graphite mt-3">
                L&apos;intelligenza artificiale lavora dietro le quinte, sui nostri server: legge i documenti che
                carichi, prepara i registri, segnala incoerenze e novità normative. Nulla ti arriva senza la
                revisione di un professionista.
              </p>
            </div>
          </div>
          <div className="mt-6 rounded-xl bg-[#011333] text-white p-8 lg:p-10 grid gap-6 lg:grid-cols-12 items-center">
            <p className="lg:col-span-7 text-h3 text-white">
              Non devi sapere che cosa chiedere: siamo noi a dirti che cosa serve, a chi e entro quando.
            </p>
            <p className="lg:col-span-5 text-[#C9D3E6]">
              I task arrivano ai tuoi collaboratori direttamente dall&apos;area cliente, con istruzioni e scadenze.
              Il follow-up è nostro.
            </p>
          </div>
        </div>
      </section>

      {/* Ambiti */}
      <section id="ambiti" className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <SectionHeader
            eyebrow="Che cosa copriamo"
            title="Un'unica architettura, solo gli ambiti che ti servono."
            lead="Attiviamo gli ambiti in base al profilo della tua impresa, e tutti attingono alla stessa scheda della società. Se guidi un gruppo, ogni società ha la sua scheda e tu una vista d'insieme."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ambitiFondamentali.map((a) => {
              const Icon = a.icon
              return (
                <div key={a.title} className="rounded-lg border border-mist bg-paper p-8 flex flex-col">
                  <Icon className="h-8 w-8 text-[#EA9A25] mb-4" aria-hidden="true" />
                  <h3 className="text-h3 text-ink">{a.title}</h3>
                  <p className="text-caption text-steel mt-1">{a.sub}</p>
                  <p className="text-body text-graphite mt-4">{a.text}</p>
                  {"link" in a && a.link && (
                    <Link href={a.link.href} className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-brand hover:underline">
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
              <div key={a.title} className="rounded-lg border border-mist p-8">
                <h4 className="text-h3 text-ink">{a.title}</h4>
                <p className="text-body text-graphite mt-3">{a.text}</p>
                {"link" in a && a.link && (
                  <Link href={a.link.href} className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-brand hover:underline">
                    {a.link.label}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                )}
              </div>
            ))}
          </div>
          <p className="mt-10 text-caption text-steel max-w-3xl">
            In demo ti mostriamo gli ambiti attivabili alla data e come si attivano sulla tua impresa.
          </p>
        </div>
      </section>

      {/* NIS2 e cybersecurity */}
      <section id="nis2" className="bg-[#011333] text-white py-20 lg:py-28">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <p className="text-eyebrow uppercase tracking-[0.18em] text-[#EA9A25]">NIS2 e cybersecurity</p>
          <h2 className="text-h2 text-white mt-4 max-w-3xl">Non solo carte, ma sistemi sotto controllo.</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-lg bg-white/5 ring-1 ring-white/10 p-8">
              <ShieldCheck className="h-8 w-8 text-[#EA9A25]" aria-hidden="true" />
              <h3 className="text-h3 text-white mt-4">Gli adempimenti</h3>
              <p className="text-[#C9D3E6] mt-3">
                Capiamo se la tua impresa è soggetto essenziale o importante, curiamo la registrazione, le misure di
                gestione del rischio, la continuità operativa e le procedure per gli incidenti.
              </p>
            </div>
            <div className="rounded-lg bg-white/5 ring-1 ring-white/10 p-8">
              <Radar className="h-8 w-8 text-[#EA9A25]" aria-hidden="true" />
              <h3 className="text-h3 text-white mt-4">Il monitoraggio</h3>
              <p className="text-[#C9D3E6] mt-3">
                Censiamo i tuoi sistemi, raccogliamo i segnali di sicurezza (come gli accessi anomali), ti avvisiamo
                degli alert e delle vulnerabilità da correggere.
              </p>
            </div>
          </div>
          <p className="mt-8 max-w-4xl text-[#E3E8F2]">
            Se un alert può diventare un incidente da notificare, lo sai subito e prepariamo insieme la notifica nei
            termini: la decisione resta sempre tua. Lo stesso percorso vale per una violazione di dati o
            un&apos;ispezione, con l&apos;Avvocato al tuo fianco quando servono valutazioni giuridiche. E le misure
            tecniche da realizzare possono essere finanziate con il Voucher Cloud &amp; Cybersecurity.
          </p>
        </div>
      </section>

      {/* Area cliente e ritmo */}
      <section className="bg-paper py-20 lg:py-28">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <SectionHeader eyebrow="Lavoriamo insieme" title="La tua area cliente e il ritmo del servizio." />
          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            <div className="rounded-lg bg-white p-8">
              <h3 className="text-h3 text-ink">La tua area cliente</h3>
              <ul className="mt-6 space-y-5">
                {areaCliente.map((a) => {
                  const Icon = a.icon
                  return (
                    <li key={a.title} className="flex gap-4">
                      <Icon className="h-6 w-6 shrink-0 text-[#EA9A25]" aria-hidden="true" />
                      <div>
                        <p className="font-semibold text-ink">{a.title}</p>
                        <p className="text-body text-graphite">{a.text}</p>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
            <div className="rounded-lg bg-white p-8">
              <h3 className="text-h3 text-ink">Il ritmo con cui lavoriamo insieme</h3>
              <ol className="mt-6 relative border-l-2 border-mist ml-2 space-y-6">
                {ritmo.map((r) => (
                  <li key={r.when} className="pl-6 relative">
                    <span className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-[#EA9A25]" aria-hidden="true" />
                    <p className="font-semibold text-ink">{r.when}</p>
                    <p className="text-body text-graphite">{r.what}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((t, i) => {
              const Icon = t.icon
              return (
                <div key={t.title} className={`rounded-lg p-6 ${i === team.length - 1 ? "bg-[#FFF4E3]" : "bg-white"}`}>
                  <Icon className="h-6 w-6 text-[#011333]" aria-hidden="true" />
                  <p className="font-semibold text-ink mt-3">{t.title}</p>
                  <p className="text-sm text-graphite mt-1">{t.text}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* I tuoi dati */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12 grid gap-12 lg:grid-cols-12 items-center">
          <div className="lg:col-span-5">
            <Server className="h-10 w-10 text-[#EA9A25]" aria-hidden="true" />
            <h2 className="text-h2 text-ink mt-4">I tuoi dati non escono mai dalla nostra struttura.</h2>
            <p className="text-body-lg text-graphite mt-6">
              Quando si usa l&apos;intelligenza artificiale, di solito i documenti partono verso i server di altre
              aziende, anche fuori dall&apos;Italia. Con noi no: l&apos;intelligenza artificiale lavora sui nostri
              server.
            </p>
          </div>
          <ul className="lg:col-span-7 grid gap-4 sm:grid-cols-2">
            {datiGaranzie.map((d) => (
              <li key={d} className="rounded-lg bg-[#011333] text-white p-6 flex gap-3">
                <Lock className="h-5 w-5 shrink-0 text-[#EA9A25] mt-0.5" aria-hidden="true" />
                <span className="text-[#E3E8F2]">{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Convenzione con lo Studio */}
      <section className="bg-paper py-20 lg:py-28">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12 grid gap-10 lg:grid-cols-12 items-start">
          <div className="lg:col-span-7">
            <SectionHeader
              eyebrow="Con chi lavori"
              title="La compliance non è solo una questione giuridica. Quando lo è, c'è l'Avvocato."
            />
            <p className="text-body-lg text-graphite mt-8">
              Sviluppiamo la Compliance Suite in collaborazione con{" "}
              <a
                href="https://www.puglisilawfirm.it"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-brand hover:underline"
              >
                Puglisi Law Firm
              </a>
              . Noi di GM Consulting ci
              occupiamo di organizzazione, processi, documenti e presidio continuo; lo Studio interviene quando ti
              serve una valutazione giuridica o una firma professionale.
            </p>
            <p className="text-body text-graphite mt-5">
              Validazione del Modello 231 e del Codice Etico, pareri su deleghe e responsabilità degli
              amministratori, dossier di self-cleaning, assistenza in un&apos;ispezione: l&apos;Avvocato lavora su un
              fascicolo già ordinato, su tuo mandato autonomo, con preventivo e fattura propri.
            </p>
            <div className="mt-8">
              <CTAButton variant="ghost" href="/convenzione-studio">
                Leggi i termini della convenzione
              </CTAButton>
            </div>
          </div>
          <aside className="lg:col-span-5 rounded-lg border border-mist bg-white p-8">
            <p className="text-eyebrow uppercase tracking-[0.12em] text-brand">È pensata per te se</p>
            <p className="text-body text-graphite mt-4">
              Guidi una PMI o un&apos;organizzazione di media complessità — industria, servizi, sanità privata,
              impresa familiare in crescita — devi rispondere a più normative contemporaneamente e non hai una
              funzione compliance interna. Tu continui a guidare l&apos;impresa; noi ti restituiamo la visibilità sui
              processi che attraversano più funzioni: dati, sistemi, fornitori, deleghe, flussi finanziari.
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

      {/* Brochure */}
      <section id="brochure" className="bg-[#011333] text-white py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12 grid gap-10 lg:grid-cols-12 items-center">
          <div className="lg:col-span-3">
            <a href={BROCHURE_URL} download aria-label="Scarica la brochure Compliance Suite in PDF">
              <Image
                src="/images/compliance-suite-brochure-copertina.webp"
                alt="Copertina della brochure Compliance Suite"
                width={662}
                height={936}
                className="w-40 lg:w-full rounded-md shadow-xl ring-1 ring-white/10"
              />
            </a>
          </div>
          <div className="lg:col-span-9">
            <p className="text-eyebrow uppercase tracking-[0.18em] text-[#EA9A25]">Brochure</p>
            <h2 className="text-h2 text-white mt-3">Tutta la Compliance Suite in quattro pagine.</h2>
            <p className="text-[#C9D3E6] mt-4 max-w-2xl">
              Scaricala, leggila con calma e condividila con chi in azienda segue amministrazione, sistemi e
              personale.
            </p>
            <div className="mt-8">
              <BrochureDownload dark />
            </div>
          </div>
        </div>
      </section>

      {/* Demo */}
      <section id="demo" className="bg-paper py-20 lg:py-28">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <SectionHeader eyebrow="Iniziamo insieme" title="Una demo sulla tua impresa, non sul prodotto." />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { n: "1", t: "Ci conosciamo", d: "Quarantacinque minuti in videoconferenza: guardiamo insieme gli ambiti che ti riguardano." },
              { n: "2", t: "Ti proponiamo", d: "Perimetro, attività e condizioni economiche entro cinque giorni lavorativi." },
              { n: "3", t: "Partiamo", d: "Kick-off con te e il tuo team, apertura dell'area cliente e della data room." },
            ].map((s) => (
              <div key={s.n} className="border-t-4 border-[#EA9A25] bg-white rounded-lg p-6">
                <p className="font-semibold text-ink">
                  {s.n} · {s.t}
                </p>
                <p className="text-body text-graphite mt-2">{s.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <FormComplianceSuite />
          </div>
        </div>
      </section>
    </>
  )
}
