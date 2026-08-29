/**
 * Registro degli Insight pubblicati. Elenco, pagina di dettaglio e sitemap
 * leggevano tre elenchi di slug separati: un articolo aggiunto in uno solo
 * restava fuori dall'indice o fuori dalla generazione statica.
 */
export interface InsightEntry {
  slug: string
  title: string
  subtitle: string
  readingTime: string
  /** Etichetta mostrata nell'elenco. */
  date: string
  /** Data ISO usata da sitemap e dati strutturati. */
  datePublished: string
}

export const insights: InsightEntry[] = [
  {
    slug: "sentiero-resilienza-nis2-dlgs-138-2024",
    title: "Il Sentiero della Resilienza: NIS2 in dodici tavole",
    subtitle:
      "Perimetro, registrazione, governance, notifica 24-72 ore e sanzioni del D.Lgs. 138/2024",
    readingTime: "11 min",
    date: "29 agosto 2026",
    datePublished: "2026-08-29",
  },
  {
    slug: "voucher-cloud-cybersecurity-mimit-2026",
    title: "Voucher Cloud & Cybersecurity: 150 milioni per PMI e professionisti",
    subtitle:
      "Precompilazione dal 20 ottobre, invio dal 10 novembre: chi arriva pronto invia in pochi minuti",
    readingTime: "9 min",
    date: "26 agosto 2026",
    datePublished: "2026-08-26",
  },
  {
    slug: "iso-37001-37301-dlgs-231-architettura-integrata",
    title: "L'integrazione fra ISO 37001:2025, ISO 37301 e D.Lgs. 231/2001",
    subtitle: "Architettura unica per tre sistemi sovrapposti",
    readingTime: "12 min",
    date: "20 maggio 2026",
    datePublished: "2026-05-20",
  },
  {
    slug: "uni-pdr-125-2022-premialita-pnrr",
    title: "Certificazione UNI/PdR 125:2022 e premialità PNRR",
    subtitle:
      "Guida tecnica all'accesso agli sgravi contributivi e ai bandi pubblici",
    readingTime: "8 min",
    date: "20 maggio 2026",
    datePublished: "2026-05-20",
  },
  {
    slug: "compliance-by-design-workflow-python-gdpr-nis2",
    title: "Compliance by design nei processi automatizzati",
    subtitle: "Come progettare workflow Python conformi al GDPR e a NIS2",
    readingTime: "10 min",
    date: "20 maggio 2026",
    datePublished: "2026-05-20",
  },
]

export const insightSlugs = insights.map((insight) => insight.slug)
