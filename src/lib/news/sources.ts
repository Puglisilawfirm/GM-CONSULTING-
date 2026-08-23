/**
 * Registro delle fonti della Rassegna GM Consulting.
 *
 * `feed` è l'unico campo usato dalla raccolta automatica: se è `null` la fonte
 * resta elencata in pagina come presidio da consultare a mano, senza tentare
 * alcuna richiesta (tipicamente perché il sito non pubblica un feed o risponde
 * 403 ai client automatici). `homepage` serve al lettore, non allo script.
 */

export type NewsCategoryId =
  | "strategia"
  | "metodo"
  | "aigovernance"
  | "iapredittiva"
  | "bi"
  | "digitale"
  | "cyber"
  | "finanziamenti"
  | "compliance"
  | "fiscale"
  | "economia"

export interface NewsCategory {
  id: NewsCategoryId
  label: string
  description: string
}

export interface NewsSource {
  id: string
  name: string
  homepage: string
  feed: string | null
  category: NewsCategoryId
  /**
   * Fonti di ricerca e consulenza (McKinsey, MIT, NIST): entrano in rassegna
   * solo le voci di metodo generale — framework, modelli di governo, principi —
   * mentre i casi aziendali e le notizie d'impresa restano fuori.
   */
  methodOnly?: boolean
}

export const newsCategories: NewsCategory[] = [
  {
    id: "finanziamenti",
    label: "Finanziamenti e incentivi",
    description:
      "Bandi, agevolazioni e finanza pubblica per gli investimenti d'impresa.",
  },
  {
    id: "strategia",
    label: "Pianificazione strategica",
    description:
      "Strategia d'impresa, organizzazione, management e scenari di lungo periodo.",
  },
  {
    id: "metodo",
    label: "Metodo e framework",
    description:
      "Modelli di gestione, framework e principi organizzativi di valore generale.",
  },
  {
    id: "aigovernance",
    label: "AI e governance",
    description:
      "Metodo e framework per governare l'intelligenza artificiale in impresa.",
  },
  {
    id: "iapredittiva",
    label: "IA predittiva",
    description:
      "Modelli previsivi, analisi degli scenari e uso decisionale dei dati.",
  },
  {
    id: "bi",
    label: "Business intelligence e dati",
    description:
      "Analytics, data governance, intelligenza artificiale applicata alle decisioni.",
  },
  {
    id: "cyber",
    label: "Cybersecurity e NIS2",
    description:
      "Sicurezza delle informazioni, incidenti, obblighi NIS2 e ISO/IEC 27001.",
  },
  {
    id: "digitale",
    label: "Innovazione e industria 4.0",
    description:
      "Trasformazione digitale, transizione 5.0, tecnologie per la produzione.",
  },
  {
    id: "compliance",
    label: "Compliance, 231 ed ESG",
    description:
      "Modelli 231, sistemi di gestione certificati, anticorruzione, sostenibilità.",
  },
  {
    id: "fiscale",
    label: "Fisco e norme d'impresa",
    description:
      "Novità tributarie, societarie e adempimenti che incidono sui bilanci.",
  },
  {
    id: "economia",
    label: "Economia e mercati",
    description: "Congiuntura, imprese, mercati finanziari, politica economica.",
  },
]

export const newsSources: NewsSource[] = [
  // ── Metodo, AI e governance ───────────────────────────────────────────────
  // Fonti ammesse solo per le voci di metodo generale (`methodOnly`).
  {
    id: "mckinsey",
    name: "McKinsey Insights",
    homepage: "https://www.mckinsey.com/featured-insights",
    feed: "https://www.mckinsey.com/insights/rss",
    category: "metodo",
    methodOnly: true,
  },
  {
    id: "mit-smr",
    name: "MIT Sloan Management Review",
    homepage: "https://sloanreview.mit.edu/",
    feed: "https://sloanreview.mit.edu/feed/",
    category: "metodo",
    methodOnly: true,
  },
  {
    id: "mit-tech-review",
    name: "MIT Technology Review",
    homepage: "https://www.technologyreview.com/",
    feed: "https://www.technologyreview.com/feed/",
    category: "metodo",
    methodOnly: true,
  },
  {
    id: "nist-news",
    name: "NIST — News (AI Risk Management Framework)",
    homepage: "https://www.nist.gov/artificial-intelligence",
    feed: "https://www.nist.gov/news-events/news/rss.xml",
    category: "metodo",
    methodOnly: true,
  },
  {
    id: "bcg-insights",
    name: "BCG — Publications",
    homepage: "https://www.bcg.com/publications",
    // Nessun feed raggiungibile dai client automatici: presidio manuale.
    feed: null,
    category: "metodo",
    methodOnly: true,
  },

  // ── Pianificazione strategica ──────────────────────────────────────────────
  {
    id: "sole24ore-management",
    name: "Il Sole 24 Ore — Management",
    homepage: "https://www.ilsole24ore.com/sez/management",
    feed: "https://www.ilsole24ore.com/rss/management.xml",
    category: "strategia",
  },
  {
    id: "economyup",
    name: "EconomyUp",
    homepage: "https://www.economyup.it/",
    feed: "https://www.economyup.it/feed/",
    category: "strategia",
  },
  {
    id: "digital4-executive",
    name: "Digital4 Executive",
    homepage: "https://www.digital4.biz/executive/",
    feed: "https://www.digital4.biz/executive/feed/",
    category: "strategia",
  },
  {
    id: "forbes-italia",
    name: "Forbes Italia",
    homepage: "https://www.forbes.it/",
    feed: "https://www.forbes.it/feed/",
    category: "strategia",
  },
  {
    id: "bruegel",
    name: "Bruegel",
    homepage: "https://www.bruegel.org/",
    feed: "https://www.bruegel.org/rss.xml",
    category: "strategia",
  },
  {
    id: "startupbusiness",
    name: "Startupbusiness",
    homepage: "https://www.startupbusiness.it/",
    feed: "https://www.startupbusiness.it/feed",
    category: "strategia",
  },
  {
    id: "hbr-italia",
    name: "Harvard Business Review Italia",
    homepage: "https://www.hbritalia.it/",
    feed: null,
    category: "metodo",
    methodOnly: true,
  },
  {
    id: "gartner",
    name: "Gartner — Newsroom",
    homepage: "https://www.gartner.com/en/newsroom",
    feed: null,
    category: "strategia",
  },
  {
    id: "weforum",
    name: "World Economic Forum — Agenda",
    homepage: "https://www.weforum.org/agenda/",
    feed: null,
    category: "strategia",
  },
  {
    id: "oecd",
    name: "OECD — Newsroom",
    homepage: "https://www.oecd.org/newsroom/",
    feed: null,
    category: "strategia",
  },

  // ── Business intelligence e dati ──────────────────────────────────────────
  {
    id: "bigdata4innovation",
    name: "BigData4Innovation",
    homepage: "https://www.bigdata4innovation.it/",
    feed: "https://www.bigdata4innovation.it/feed/",
    category: "bi",
  },
  {
    id: "ai4business",
    name: "AI4Business",
    homepage: "https://www.ai4business.it/",
    feed: "https://www.ai4business.it/feed/",
    category: "bi",
  },
  {
    id: "kdnuggets",
    name: "KDnuggets",
    homepage: "https://www.kdnuggets.com/",
    feed: "https://www.kdnuggets.com/feed",
    category: "bi",
  },
  {
    id: "data-manager",
    name: "Data Manager",
    homepage: "https://www.datamanager.it/",
    feed: "https://www.datamanager.it/feed/",
    category: "bi",
  },
  {
    id: "zerouno",
    name: "ZeroUno",
    homepage: "https://www.zerounoweb.it/",
    feed: "https://www.zerounoweb.it/feed/",
    category: "bi",
  },
  {
    id: "agenda-digitale",
    name: "Agenda Digitale",
    homepage: "https://www.agendadigitale.eu/",
    feed: "https://www.agendadigitale.eu/feed/",
    category: "bi",
  },

  // ── Innovazione e industria 4.0 ───────────────────────────────────────────
  {
    id: "industry4business",
    name: "Industry4Business",
    homepage: "https://www.industry4business.it/",
    feed: "https://www.industry4business.it/feed/",
    category: "digitale",
  },
  {
    id: "industria-italiana",
    name: "Industria Italiana",
    homepage: "https://www.industriaitaliana.it/",
    feed: "https://www.industriaitaliana.it/feed/",
    category: "digitale",
  },
  {
    id: "corcom",
    name: "CorCom",
    homepage: "https://www.corrierecomunicazioni.it/",
    feed: "https://www.corrierecomunicazioni.it/feed/",
    category: "digitale",
  },
  {
    id: "key4biz",
    name: "Key4biz",
    homepage: "https://www.key4biz.it/",
    feed: "https://www.key4biz.it/feed/",
    category: "digitale",
  },
  {
    id: "01net",
    name: "01net",
    homepage: "https://www.01net.it/",
    feed: "https://www.01net.it/feed/",
    category: "digitale",
  },
  {
    id: "wired-italia",
    name: "Wired Italia",
    homepage: "https://www.wired.it/",
    feed: "https://www.wired.it/feed/rss",
    category: "digitale",
  },

  // ── Cybersecurity e NIS2 ──────────────────────────────────────────────────
  {
    id: "cybersecurity360",
    name: "Cybersecurity360",
    homepage: "https://www.cybersecurity360.it/",
    feed: "https://www.cybersecurity360.it/feed/",
    category: "cyber",
  },
  {
    id: "cybersecitalia",
    name: "Cybersec Italia",
    homepage: "https://www.cybersecitalia.it/",
    feed: "https://www.cybersecitalia.it/feed/",
    category: "cyber",
  },
  {
    id: "securityinfo",
    name: "Security Info",
    homepage: "https://www.securityinfo.it/",
    feed: "https://www.securityinfo.it/feed/",
    category: "cyber",
  },
  {
    id: "hacker-news",
    name: "The Hacker News",
    homepage: "https://thehackernews.com/",
    feed: "https://feeds.feedburner.com/TheHackersNews",
    category: "cyber",
  },
  {
    id: "bleeping-computer",
    name: "BleepingComputer",
    homepage: "https://www.bleepingcomputer.com/",
    feed: "https://www.bleepingcomputer.com/feed/",
    category: "cyber",
  },
  {
    id: "help-net-security",
    name: "Help Net Security",
    homepage: "https://www.helpnetsecurity.com/",
    feed: "https://www.helpnetsecurity.com/feed/",
    category: "cyber",
  },
  {
    id: "dark-reading",
    name: "Dark Reading",
    homepage: "https://www.darkreading.com/",
    feed: "https://www.darkreading.com/rss.xml",
    category: "cyber",
  },
  {
    id: "schneier",
    name: "Schneier on Security",
    homepage: "https://www.schneier.com/",
    feed: "https://www.schneier.com/feed/atom/",
    category: "cyber",
  },
  {
    id: "acn",
    name: "ACN — Agenzia per la Cybersicurezza Nazionale",
    homepage: "https://www.acn.gov.it/portale/notizie",
    feed: null,
    category: "cyber",
  },
  {
    id: "csirt-italia",
    name: "CSIRT Italia",
    homepage: "https://www.csirt.gov.it/",
    feed: null,
    category: "cyber",
  },
  {
    id: "enisa",
    name: "ENISA",
    homepage: "https://www.enisa.europa.eu/news",
    feed: null,
    category: "cyber",
  },

  // ── Finanziamenti e incentivi ─────────────────────────────────────────────
  {
    id: "mimit-incentivi",
    name: "MIMIT — Incentivi",
    homepage: "https://www.mimit.gov.it/it/incentivi",
    feed: "https://www.mimit.gov.it/it/incentivi?format=feed&type=rss",
    category: "finanziamenti",
  },
  {
    id: "mimit-notizie",
    name: "MIMIT — Notizie e stampa",
    homepage: "https://www.mimit.gov.it/it/notizie-stampa",
    feed: "https://www.mimit.gov.it/it/notizie-stampa?format=feed&type=rss",
    category: "finanziamenti",
  },
  {
    id: "pmi-finanziamenti",
    name: "PMI.it — Finanziamenti",
    homepage: "https://www.pmi.it/economia/finanziamenti",
    feed: "https://www.pmi.it/economia/finanziamenti/feed",
    category: "finanziamenti",
  },
  {
    id: "pmi-it",
    name: "PMI.it",
    homepage: "https://www.pmi.it/",
    feed: "https://www.pmi.it/feed",
    category: "finanziamenti",
  },
  {
    id: "regione-sicilia",
    name: "Regione Siciliana",
    homepage: "https://www.regione.sicilia.it/",
    feed: "https://www.regione.sicilia.it/feed",
    category: "finanziamenti",
  },
  {
    id: "commissione-ue",
    name: "Commissione europea — Press corner",
    homepage: "https://ec.europa.eu/commission/presscorner/",
    feed: "https://ec.europa.eu/commission/presscorner/api/rss",
    category: "finanziamenti",
  },
  {
    id: "invitalia",
    name: "Invitalia",
    homepage: "https://www.invitalia.it/",
    feed: null,
    category: "finanziamenti",
  },
  {
    id: "italia-domani",
    name: "Italia Domani — PNRR",
    homepage: "https://www.italiadomani.gov.it/",
    feed: null,
    category: "finanziamenti",
  },
  {
    id: "agenzia-coesione",
    name: "Agenzia per la Coesione territoriale",
    homepage: "https://www.agenziacoesione.gov.it/",
    feed: null,
    category: "finanziamenti",
  },
  {
    id: "fasi",
    name: "Fasi.eu — Finanza agevolata",
    homepage: "https://www.fasi.eu/",
    feed: null,
    category: "finanziamenti",
  },
  {
    id: "simest",
    name: "SIMEST",
    homepage: "https://www.simest.it/",
    feed: null,
    category: "finanziamenti",
  },
  {
    id: "sace",
    name: "SACE",
    homepage: "https://www.sace.it/",
    feed: null,
    category: "finanziamenti",
  },

  // ── Compliance, 231 ed ESG ────────────────────────────────────────────────
  {
    id: "esg360",
    name: "ESG360",
    homepage: "https://www.esg360.it/",
    feed: "https://www.esg360.it/feed/",
    category: "compliance",
  },
  {
    id: "esgnews",
    name: "ESG News",
    homepage: "https://www.esgnews.it/",
    feed: "https://www.esgnews.it/feed/",
    category: "compliance",
  },
  {
    id: "uni",
    name: "UNI — Ente Italiano di Normazione",
    homepage: "https://www.uni.com/",
    feed: "https://www.uni.com/feed/",
    category: "compliance",
  },
  {
    id: "diritto-it",
    name: "Diritto.it",
    homepage: "https://www.diritto.it/",
    feed: "https://www.diritto.it/feed/",
    category: "compliance",
  },
  {
    id: "governo",
    name: "Governo italiano",
    homepage: "https://www.governo.it/",
    feed: "https://www.governo.it/it/rss.xml",
    category: "compliance",
  },
  {
    id: "accredia",
    name: "Accredia",
    homepage: "https://www.accredia.it/",
    feed: null,
    category: "compliance",
  },
  {
    id: "anac",
    name: "ANAC",
    homepage: "https://www.anticorruzione.it/",
    feed: null,
    category: "compliance",
  },
  {
    id: "aodv231",
    name: "AODV231",
    homepage: "https://www.aodv231.it/",
    feed: null,
    category: "compliance",
  },
  {
    id: "confindustria",
    name: "Confindustria",
    homepage: "https://www.confindustria.it/",
    feed: null,
    category: "compliance",
  },
  {
    id: "garante-privacy",
    name: "Garante per la protezione dei dati personali",
    homepage: "https://www.garanteprivacy.it/",
    feed: null,
    category: "compliance",
  },

  // ── Fisco e norme d'impresa ───────────────────────────────────────────────
  {
    id: "sole24ore-norme",
    name: "Il Sole 24 Ore — Norme e Tributi",
    homepage: "https://www.ilsole24ore.com/sez/norme-e-tributi",
    feed: "https://www.ilsole24ore.com/rss/norme-e-tributi.xml",
    category: "fiscale",
  },
  {
    id: "commercialista-telematico",
    name: "Commercialista Telematico",
    homepage: "https://www.commercialistatelematico.com/",
    feed: "https://www.commercialistatelematico.com/feed",
    category: "fiscale",
  },
  {
    id: "fiscooggi",
    name: "FiscoOggi — Agenzia delle Entrate",
    homepage: "https://www.fiscooggi.it/",
    feed: null,
    category: "fiscale",
  },
  {
    id: "mef",
    name: "MEF — Comunicati",
    homepage: "https://www.mef.gov.it/ufficio-stampa/comunicati/",
    feed: null,
    category: "fiscale",
  },
  {
    id: "agenzia-entrate",
    name: "Agenzia delle Entrate",
    homepage: "https://www.agenziaentrate.gov.it/",
    feed: null,
    category: "fiscale",
  },

  // ── Economia e mercati ────────────────────────────────────────────────────
  {
    id: "sole24ore-economia",
    name: "Il Sole 24 Ore — Economia",
    homepage: "https://www.ilsole24ore.com/sez/economia",
    feed: "https://www.ilsole24ore.com/rss/economia.xml",
    category: "economia",
  },
  {
    id: "ansa-pmi",
    name: "ANSA — PMI",
    homepage: "https://www.ansa.it/sito/notizie/economia/pmi/pmi.html",
    feed: "https://www.ansa.it/sito/notizie/economia/pmi/pmi_rss.xml",
    category: "economia",
  },
  {
    id: "firstonline",
    name: "FIRSTonline",
    homepage: "https://www.firstonline.info/",
    feed: "https://www.firstonline.info/feed/",
    category: "economia",
  },
  {
    id: "wall-street-italia",
    name: "Wall Street Italia",
    homepage: "https://www.wallstreetitalia.com/",
    feed: "https://www.wallstreetitalia.com/feed/",
    category: "economia",
  },
  {
    id: "finanza-operativa",
    name: "Finanza Operativa",
    homepage: "https://www.finanzaoperativa.com/",
    feed: "https://www.finanzaoperativa.com/feed/",
    category: "economia",
  },
  {
    id: "agi-economia",
    name: "AGI — Economia",
    homepage: "https://www.agi.it/economia/",
    feed: "https://www.agi.it/economia/rss",
    category: "economia",
  },
  {
    id: "esma",
    name: "ESMA",
    homepage: "https://www.esma.europa.eu/",
    feed: "https://www.esma.europa.eu/rss.xml",
    category: "economia",
  },
  {
    id: "banca-italia",
    name: "Banca d'Italia",
    homepage: "https://www.bancaditalia.it/media/comunicati/",
    feed: null,
    category: "economia",
  },
  {
    id: "istat",
    name: "Istat",
    homepage: "https://www.istat.it/comunicati-stampa/",
    feed: null,
    category: "economia",
  },
]
