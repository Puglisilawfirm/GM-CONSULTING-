/**
 * Dossier tecnico NIS2 mostrato sulla pagina /soluzioni/cybersecurity-nis2:
 * glossario dei popup, barre del cronoprogramma e tabelle. I dati stanno qui
 * perché il testo della pagina li richiama per chiave: il termine cliccabile e
 * la voce del glossario non possono divergere senza che il tipo lo segnali.
 */

export type Nis2Tone = "brand" | "gold" | "danger" | "warning" | "success"

export interface Nis2GlossaryEntry {
  /** Titolo del riquadro. */
  title: string
  body: string[]
  source: string
}

export const nis2Glossary = {
  "soggetto-essenziale": {
    title: "Soggetto essenziale",
    body: [
      "Soggetto dell'Allegato I che supera i massimali della media impresa (250 occupati, 50 milioni di fatturato o 43 milioni di totale di bilancio), più le categorie che lo sono a prescindere dalla dimensione: soggetti critici CER, prestatori di servizi fiduciari qualificati, gestori di registri TLD, pubbliche amministrazioni centrali.",
      "Conseguenze: 43 misure di base declinate in 116 requisiti, vigilanza anche preventiva e sistematica, massimale sanzionatorio di 10 milioni di euro o 2% del fatturato mondiale.",
    ],
    source: "Art. 6 D.Lgs. 138/2024; Allegato 2 Det. ACN 379907/2025",
  },
  "soggetto-importante": {
    title: "Soggetto importante",
    body: [
      "Tutti gli altri soggetti nell'ambito di applicazione, compresi quelli dei settori ad alta criticità che non superano i massimali della media impresa.",
      "Conseguenze: 37 misure di base e 87 requisiti, vigilanza prevalentemente successiva (solo in presenza di elementi che suggeriscano violazioni), massimale di 7 milioni di euro o 1,4% del fatturato.",
    ],
    source: "Art. 6 e art. 36, comma 2, D.Lgs. 138/2024; Allegato 1 Det. ACN 379907/2025",
  },
  "criterio-dimensionale": {
    title: "Criterio dimensionale",
    body: [
      "Si entra in perimetro superando i massimali della piccola impresa: cinquanta occupati, ovvero dieci milioni di euro di fatturato o di totale di bilancio.",
      "I dati delle imprese collegate e associate si aggregano, salva la clausola di proporzionalità che tiene conto dell'indipendenza del soggetto quanto ai sistemi informativi usati per fornire i servizi. La qualifica si acquista o si perde solo se il superamento si verifica in due esercizi consecutivi.",
    ],
    source: "Art. 3, commi 2 e 4, D.Lgs. 138/2024; Raccomandazione 2003/361/CE, artt. 4 e 6 dell'allegato",
  },
  "deroga-dimensionale": {
    title: "Deroghe alla dimensione",
    body: [
      "Rientrano a prescindere dalla dimensione, fra gli altri: fornitori di reti pubbliche di comunicazione elettronica, prestatori di servizi fiduciari, gestori di registri dei nomi di dominio di primo livello e fornitori di servizi DNS, soggetti critici ai sensi della direttiva CER.",
      "Vi rientra anche l'unico fornitore nazionale di un servizio essenziale o il soggetto critico a livello regionale, e l'impresa collegata a un soggetto essenziale o importante che decida sulla gestione del rischio informatico, gestisca i sistemi da cui dipende il servizio, ne curi la sicurezza o le fornisca servizi TIC.",
    ],
    source: "Art. 3, commi 9 e 10, D.Lgs. 138/2024",
  },
  "gestione-rifiuti": {
    title: "Gestione dei rifiuti: l'errore ricorrente",
    body: [
      "Il settore attrae le sole imprese per cui la gestione dei rifiuti costituisce la principale attività economica: il criterio non è l'iscrizione all'Albo gestori né la titolarità di un impianto, ma il peso della linea di attività sul fatturato.",
      "Chi tratta anche acque reflue guardi l'Allegato I: quelle stanno fra i settori ad alta criticità, con il regime più severo. La «fabbricazione» dell'Allegato II è invece circoscritta a sei categorie NACE tassative.",
    ],
    source: "Allegati I e II D.Lgs. 138/2024",
  },
  "comunicazione-individuale": {
    title: "Comunicazione individuale di inserimento",
    body: [
      "Non esiste una scadenza generale fissata dalla legge: i termini sostanziali decorrono dalla comunicazione individuale di inserimento in elenco, notificata al domicilio digitale.",
      "Nove mesi dalla comunicazione per l'avvio dell'obbligo di notifica degli incidenti; diciotto mesi per l'adozione delle misure di sicurezza di base. Ciascun soggetto deve reperire e conservare la data della propria comunicazione: chi l'ha ricevuta il 12 aprile 2025 non dispone dell'intero mese di ottobre 2026.",
    ],
    source: "Art. 7, comma 3, D.Lgs. 138/2024; art. 3 Det. ACN 379907/2025",
  },
  "conferma-permanenza": {
    title: "La conferma di permanenza non riapre i termini",
    body: [
      "Chi era iscritto nel 2025 e resta in elenco nel 2026 rimane ancorato alla propria comunicazione del 2025: il termine per le misure di base cade nell'ottobre 2026, non diciotto mesi dopo la conferma.",
      "Per la coorte 2026 la determinazione ha invece abbandonato il criterio mobile e fissato date certe. La data fissa del 31 luglio 2027 è più severa del criterio mobile: per comunicazioni della primavera 2026 i diciotto mesi sarebbero caduti nell'autunno.",
    ],
    source: "Det. ACN 127434/2026",
  },
  "misure-di-base": {
    title: "Misure di sicurezza di base",
    body: [
      "Sono organizzate nelle sei funzioni del Framework nazionale: Governance (GV), Identificazione (ID), Protezione (PR), Rilevamento (DE), Risposta (RS), Ripristino (RC).",
      "L'analisi del rischio non è criterio di selezione delle misure minime — obbligatorie per tutti — ma di modulazione della loro profondità: non si può invocare una bassa esposizione per disapplicare una misura di base, si deve dimostrare di averla implementata coerentemente con il proprio contesto.",
    ],
    source: "Allegati 1 e 2 Det. ACN 379907/2025; Guida alla lettura delle specifiche di base, dicembre 2025",
  },
  "atti-organo": {
    title: "Atti riservati all'organo di amministrazione",
    body: [
      "Undici documenti la cui approvazione è competenza propria dell'organo e non è delegabile. Il criterio discretivo non è il titolo del documento ma la sua funzione: è di indirizzo l'atto che fissa obiettivi, priorità, risorse, ruoli, criteri di accettazione del rischio e tempistiche.",
      "L'architettura documentale è libera e l'aggiornamento dei documenti tecnici non impone la riapprovazione di quelli strategici, salvo che muti la soglia di rischio accettabile o venga abbandonato un presidio previsto.",
    ],
    source: "Art. 23 D.Lgs. 138/2024; appendice C della Guida alla lettura; FAQ ACN ODA.8–ODA.12",
  },
  "incidente-significativo": {
    title: "Incidente significativo",
    body: [
      "Le fattispecie di base sono negli Allegati 3 (soggetti importanti) e 4 (essenziali) della Det. 379907/2025: quattro tipologie complessive, tre comuni e una riservata agli essenziali.",
      "Il termine decorre dalla conoscenza dell'incidente, non dalla sua comprensione: la notifica tardiva è sanzionata anche quando l'incidente sia stato gestito bene. La rappresentazione tecnica dell'evento deve essere coerente con la Tassonomia Cyber ACN 2.0 di novembre 2025.",
    ],
    source: "Art. 25 D.Lgs. 138/2024; Allegati 3 e 4 Det. ACN 379907/2025",
  },
  "fornitori-rilevanti": {
    title: "Fornitori rilevanti",
    body: [
      "La sicurezza della catena di approvvigionamento, compresi i rapporti con i fornitori diretti, è misura a carico del soggetto NIS, non del suo fornitore.",
      "L'elenco dei fornitori rilevanti si comunica sulla piattaforma secondo il criterio della non fungibilità, e serve a individuare fra essi chi debba a sua volta entrare in perimetro. Fuori dal perimetro non significa fuori dalla catena: l'onere arriva per contratto, capitolato o qualifica di fornitura.",
    ],
    source: "Art. 24, commi 2, lett. d), e 3, D.Lgs. 138/2024; art. 18 Det. ACN 127437/2026",
  },
  "comma-13": {
    title: "Art. 38, comma 13: il cumulo da omessa registrazione",
    body: [
      "Al soggetto che non compare nell'elenco vengono contestate tutte le violazioni dei commi 8 e 10 — anche relative a misure il cui termine non sarebbe ancora scaduto — e la sanzione per la più grave è aumentata fino al triplo.",
      "Ne discende che l'omessa registrazione produce un'esposizione superiore a quella del soggetto regolarmente iscritto che non abbia adottato le misure. In chiave difensiva: il comma 10, lett. a), sanziona la registrazione «mancata», mentre il comma 13 discorre di registrazione «mancata o tardiva».",
    ],
    source: "Art. 38, commi 10, 12 e 13, D.Lgs. 138/2024",
  },
  "soglia-indifferenza": {
    title: "Soglia di indifferenza: 500 milioni",
    body: [
      "Fino a 500 milioni di euro di fatturato mondiale opera il massimale fisso e la percentuale è irrilevante; oltre quella soglia prevale la percentuale.",
      "Conseguenza pratica per la media impresa: il minimo edittale di 500.000 euro, come soggetto essenziale, può eccedere il 2% del fatturato di diversi ordini di grandezza.",
    ],
    source: "Art. 38, commi 8 e 9, D.Lgs. 138/2024",
  },
  "strumenti-deflattivi": {
    title: "Invito a conformarsi e pagamento ridotto",
    body: [
      "L'invito a conformarsi estingue il procedimento se il trasgressore vi ottempera nel termine perentorio assegnato; non si applica a chi sia già destinatario della diffida ex art. 37, comma 6, né nei casi del comma 14.",
      "Il pagamento in misura ridotta entro sessanta giorni dalla contestazione è pari a un terzo del massimo ovvero, se più favorevole e ove stabilito, al doppio del minimo edittale.",
    ],
    source: "Art. 38, comma 15, D.Lgs. 138/2024",
  },
  "onere-della-prova": {
    title: "Che cosa guarda la vigilanza",
    body: [
      "Il baricentro del controllo si è spostato dall'esistenza della misura alla possibilità di dimostrarne l'adozione, la data, l'autore, l'attuazione concreta e la verifica di efficacia.",
      "Il disallineamento fra documentazione formale e prassi operativa è evidenza in sé problematica: una misura formalmente adottata ma sistematicamente elusa non soddisfa il requisito di adeguatezza e proporzionalità dell'art. 24.",
    ],
    source: "FAQ ACN MVE.1–MVE.5, 11 agosto 2026; artt. 32 e seguenti D.Lgs. 138/2024",
  },
} satisfies Record<string, Nis2GlossaryEntry>

export type Nis2GlossaryKey = keyof typeof nis2Glossary

/** Il cronoprogramma copre i tre anni in cui maturano tutti i termini. */
export const nis2TimelineYears = [2025, 2026, 2027] as const
export const nis2TimelineMonths = nis2TimelineYears.length * 12

export interface Nis2TimelineBar {
  label: string
  detail: string
  /** Mese di inizio, 1 = gennaio 2025. */
  start: number
  /** Durata in mesi (1 = evento puntuale). */
  span: number
  tone: Nis2Tone
  group: string
}

export const nis2Timeline: Nis2TimelineBar[] = [
  {
    group: "Prima coorte (in elenco dal 2025)",
    label: "Comunicazioni di inserimento",
    detail: "Trasmesse ai domicili digitali dal 12-13 aprile 2025 e nelle settimane successive: da qui decorrono i nove e i diciotto mesi.",
    start: 4,
    span: 3,
    tone: "brand",
  },
  {
    group: "Prima coorte (in elenco dal 2025)",
    label: "Nove mesi → notifica incidenti",
    detail: "Obbligo di notifica pienamente esigibile da metà gennaio 2026, con l'applicazione delle specifiche di base dal 15 gennaio 2026.",
    start: 4,
    span: 10,
    tone: "warning",
  },
  {
    group: "Prima coorte (in elenco dal 2025)",
    label: "Diciotto mesi → misure di base",
    detail: "Maturano nel corso di ottobre 2026, con il 31 ottobre quale limite esterno della prima ondata: la data esatta dipende dalla propria comunicazione.",
    start: 4,
    span: 19,
    tone: "danger",
  },
  {
    group: "Coorte 2026 (primo inserimento)",
    label: "Referente CSIRT",
    detail: "Designazione entro la fine del 2026, secondo le modalità stabilite dall'Agenzia.",
    start: 17,
    span: 8,
    tone: "brand",
  },
  {
    group: "Coorte 2026 (primo inserimento)",
    label: "Notifica incidenti dal 1° gennaio 2027",
    detail: "Data fissa, non più ancorata alla comunicazione individuale.",
    start: 25,
    span: 1,
    tone: "warning",
  },
  {
    group: "Coorte 2026 (primo inserimento)",
    label: "Misure di base entro il 31 luglio 2027",
    detail: "Data fissa più severa del criterio mobile: per comunicazioni della primavera 2026 i diciotto mesi sarebbero caduti nell'autunno 2027.",
    start: 25,
    span: 7,
    tone: "danger",
  },
  {
    group: "Ogni anno, per tutti",
    label: "Registrazione o rinnovo",
    detail: "Finestra 1° gennaio – 28 febbraio; entro il 31 marzo ACN e Autorità di settore consolidano l'elenco.",
    start: 13,
    span: 2,
    tone: "gold",
  },
  {
    group: "Ogni anno, per tutti",
    label: "Aggiornamento informativo e fornitori rilevanti",
    detail: "Finestra 15 aprile – 31 maggio: organi di amministrazione, indirizzi IP pubblici, nomi a dominio, sostituto del punto di contatto, elenco dei fornitori rilevanti.",
    start: 16,
    span: 2,
    tone: "gold",
  },
  {
    group: "Ogni anno, per tutti",
    label: "Attività e servizi ex art. 30",
    detail: "Finestra 1° maggio – 30 giugno: categorizzazione in dieci macro-aree e quattro categorie di rilevanza.",
    start: 17,
    span: 2,
    tone: "success",
  },
  {
    group: "Ogni anno, per tutti",
    label: "Fase di verifica dell'Agenzia",
    detail: "Superato il termine per le misure, l'Agenzia può avviare richieste documentali, valutazione delle misure e audit in loco.",
    start: 23,
    span: 14,
    tone: "danger",
  },
]

export interface Nis2Table {
  id: string
  caption: string
  note?: string
  columns: string[]
  /** La prima cella di ogni riga è l'intestazione di riga. */
  rows: { cells: string[]; tone?: Nis2Tone }[]
}

export const nis2Sources: Nis2Table = {
  id: "fonti",
  caption: "Le fonti applicabili e la loro decorrenza",
  columns: ["Fonte", "Oggetto", "Applicabilità"],
  rows: [
    { cells: ["D.Lgs. 138/2024", "Recepimento della direttiva NIS2", "16 ottobre 2024"], tone: "brand" },
    { cells: ["Reg. di esecuzione (UE) 2024/2690", "Requisiti tecnici per categorie di fornitori digitali", "18 ottobre 2024"], tone: "brand" },
    { cells: ["Det. ACN 379887/2025 del 19 dicembre 2025", "Piattaforma NIS, registrazioni, designazioni", "31 dicembre 2025"], tone: "gold" },
    { cells: ["Det. ACN 379907/2025 del 19 dicembre 2025", "Misure di sicurezza e incidenti significativi di base; abroga la Det. 164179/2025", "15 gennaio 2026"], tone: "danger" },
    { cells: ["Det. ACN 127434/2026 del 13 aprile 2026", "Termini per i soggetti inseriti nell'elenco nel 2026", "30 aprile 2026"], tone: "warning" },
    { cells: ["Det. ACN 127437/2026 del 13 aprile 2026", "Elenco dei fornitori rilevanti", "30 aprile 2026"], tone: "warning" },
    { cells: ["Det. ACN 155238/2026 del 20 aprile 2026", "Categorizzazione di attività e servizi ex art. 30", "maggio 2026"], tone: "success" },
  ],
}

export const nis2Categories: Nis2Table = {
  id: "categorie",
  caption: "Essenziali e importanti: che cosa cambia davvero",
  columns: ["Profilo", "Soggetti essenziali", "Soggetti importanti"],
  rows: [
    {
      cells: [
        "Criterio",
        "Allegato I oltre i massimali della media impresa; soggetti critici CER; prestatori di servizi fiduciari qualificati; gestori di registri TLD; PA centrali",
        "Tutti gli altri soggetti nell'ambito di applicazione",
      ],
      tone: "brand",
    },
    { cells: ["Misure di base", "43 misure, 116 requisiti (Allegato 2)", "37 misure, 87 requisiti (Allegato 1)"], tone: "gold" },
    { cells: ["Incidenti di base", "Allegato 4", "Allegato 3"], tone: "success" },
    { cells: ["Vigilanza", "Anche ex ante e sistematica", "Prevalentemente ex post"], tone: "warning" },
    {
      cells: [
        "Massimale, fascia grave",
        "10.000.000 € ovvero 2% del fatturato mondiale",
        "7.000.000 € ovvero 1,4%",
      ],
      tone: "danger",
    },
  ],
}

export const nis2Deadlines: Nis2Table = {
  id: "termini",
  caption: "Da quando decorrono i termini, per posizione del soggetto",
  columns: ["Posizione del soggetto", "Notifica incidenti", "Misure di sicurezza di base"],
  rows: [
    {
      cells: [
        "In elenco dal 2025, permanente nel 2026 (art. 7, c. 3, lett. b)",
        "Operativa dal 15 gennaio 2026",
        "Diciotto mesi dalla comunicazione 2025 → ottobre 2026",
      ],
      tone: "danger",
    },
    {
      cells: [
        "Primo inserimento nel 2026 (art. 7, c. 3, lett. a)",
        "1° gennaio 2027",
        "31 luglio 2027",
      ],
      tone: "warning",
    },
    {
      cells: [
        "Gestori di registri e fornitori di servizi di registrazione dei nomi di dominio",
        "—",
        "Art. 29 e relative politiche, entro il medesimo termine di diciotto mesi",
      ],
      tone: "brand",
    },
    {
      cells: ["Soggetti PSNC, limitatamente ai beni ICT", "Regime dell'art. 33, c. 1", "Regime dell'art. 33, c. 1"],
      tone: "gold",
    },
    {
      cells: [
        "OSE ex D.Lgs. 65/2018 e operatori telco",
        "Regime transitorio artt. 5 e 6 Det. 379907/2025",
        "Mantenimento delle misure già adottate, fermo il termine dell'art. 3",
      ],
      tone: "success",
    },
  ],
}

export const nis2AnnualWindows: Nis2Table = {
  id: "finestre",
  caption: "Le quattro finestre annuali sulla piattaforma",
  columns: ["Finestra", "Adempimento", "Riferimento"],
  rows: [
    {
      cells: [
        "1° gennaio – 28 febbraio",
        "Registrazione o rinnovo; entro il 31 marzo ACN e le Autorità di settore consolidano l'elenco",
        "Art. 7 D.Lgs. 138/2024; art. 11 Det. 379887/2025",
      ],
      tone: "gold",
    },
    {
      cells: [
        "15 aprile – 31 maggio",
        "Aggiornamento informativo annuale: organi di amministrazione e direzione, indirizzi IP pubblici e statici, nomi a dominio, sostituto del punto di contatto",
        "Art. 7, cc. 4 e 5",
      ],
      tone: "brand",
    },
    {
      cells: [
        "15 aprile – 31 maggio",
        "Elenco dei fornitori rilevanti, secondo il criterio della non fungibilità",
        "Det. 127437/2026",
      ],
      tone: "warning",
    },
    {
      cells: [
        "1° maggio – 30 giugno",
        "Elenco delle attività e dei servizi, con categorizzazione in dieci macro-aree e quattro categorie di rilevanza",
        "Art. 30, c. 1; Det. 155238/2026",
      ],
      tone: "success",
    },
  ],
}

export const nis2EventDeadlines: Nis2Table = {
  id: "eventi",
  caption: "Adempimenti a evento: il cronometro parte dalla conoscenza",
  columns: ["Evento", "Termine", "Riferimento"],
  rows: [
    { cells: ["Variazione rilevante dei dati comunicati", "14 giorni", "Art. 7, c. 7"], tone: "gold" },
    { cells: ["Conoscenza di un incidente significativo — pre-notifica", "24 ore", "Art. 25, c. 5"], tone: "danger" },
    {
      cells: [
        "Notifica con valutazione di gravità, impatto e indicatori di compromissione",
        "72 ore",
        "Art. 25, c. 5",
      ],
      tone: "danger",
    },
    { cells: ["Relazioni intermedie", "Su richiesta del CSIRT Italia", "Art. 25, c. 5"], tone: "warning" },
    {
      cells: [
        "Relazione finale, ovvero sui progressi se l'incidente è in corso",
        "1 mese dalla notifica; relazione finale entro 1 mese dalla chiusura",
        "Art. 25, c. 5",
      ],
      tone: "warning",
    },
    { cells: ["Notifica per i prestatori di servizi fiduciari", "24 ore", "Art. 25, c. 7"], tone: "brand" },
  ],
}

export const nis2BoardDocuments: Nis2Table = {
  id: "atti-organo",
  caption: "Gli undici atti che l'organo di amministrazione deve approvare",
  note: "Appendice C della Guida alla lettura ACN: la competenza è propria dell'organo e non è delegabile.",
  columns: ["Documento", "Requisito"],
  rows: [
    { cells: ["Organizzazione per la sicurezza informatica", "GV.RR-02 p. 1"], tone: "brand" },
    { cells: ["Politiche di sicurezza informatica", "GV.PO-01 p. 3"], tone: "brand" },
    { cells: ["Valutazione del rischio sui sistemi informativi e di rete", "ID.RA-05 p. 3"], tone: "gold" },
    { cells: ["Piano di trattamento del rischio", "ID.RA-06 p. 3"], tone: "gold" },
    { cells: ["Piano di gestione delle vulnerabilità", "ID.RA-08 p. 4"], tone: "gold" },
    { cells: ["Piano di adeguamento", "ID.IM-01 p. 1"], tone: "success" },
    { cells: ["Piano di continuità operativa", "ID.IM-04 p. 4"], tone: "success" },
    { cells: ["Piano di ripristino in caso di disastro", "ID.IM-04 p. 4"], tone: "success" },
    { cells: ["Piano di gestione delle crisi", "ID.IM-04 p. 4"], tone: "success" },
    { cells: ["Piano di formazione", "PR.AT-01 p. 2"], tone: "warning" },
    { cells: ["Piano per la gestione degli incidenti di sicurezza informatica", "RS.MA-01 p. 2"], tone: "warning" },
  ],
}

export const nis2SanctionsSevere: Nis2Table = {
  id: "sanzioni-gravi",
  caption: "Fascia grave (art. 38, commi 8 e 9)",
  note: "Obblighi degli organi (art. 23), gestione del rischio e notifica (artt. 24 e 25), inottemperanza a disposizioni e diffide dell'Autorità.",
  columns: ["Soggetto", "Massimo edittale", "Minimo edittale"],
  rows: [
    {
      cells: [
        "Essenziale, escluse le PA",
        "10.000.000 € ovvero 2% del fatturato mondiale annuo dell'esercizio precedente, se superiore",
        "Un ventesimo del massimo",
      ],
      tone: "danger",
    },
    {
      cells: ["Importante, escluse le PA", "7.000.000 € ovvero 1,4% del fatturato, se superiore", "Un trentesimo del massimo"],
      tone: "warning",
    },
    { cells: ["PA essenziali (All. III)", "125.000 €", "25.000 €"], tone: "brand" },
    { cells: ["PA importanti", "Importi ridotti di un terzo", "Importi ridotti di un terzo"], tone: "gold" },
  ],
}

export const nis2SanctionsMinor: Nis2Table = {
  id: "sanzioni-minori",
  caption: "Fascia meno grave (art. 38, commi 10 e 11)",
  note: "Registrazione, comunicazioni e aggiornamenti ex art. 7, elenco attività e servizi ex art. 30, obblighi settoriali degli artt. 27, 29 e 32, mancata collaborazione con Autorità e CSIRT.",
  columns: ["Soggetto", "Massimo edittale", "Minimo edittale"],
  rows: [
    { cells: ["Essenziale, escluse le PA", "0,1% del fatturato mondiale annuo", "Un ventesimo del massimo, pari allo 0,005%"], tone: "warning" },
    { cells: ["Importante, escluse le PA", "0,07% del fatturato", "Un trentesimo del massimo, pari allo 0,00233%"], tone: "gold" },
    { cells: ["PA essenziali", "50.000 €", "10.000 €"], tone: "brand" },
    { cells: ["PA importanti", "Importi ridotti di un terzo", "Importi ridotti di un terzo"], tone: "success" },
  ],
}

export const nis2Aggravating: Nis2Table = {
  id: "aggravanti",
  caption: "Le aggravanti, e perché la registrazione viene prima di tutto",
  columns: ["Ipotesi", "Effetto", "Riferimento"],
  rows: [
    { cells: ["Reiterazione specifica", "Sanzione aumentata fino al doppio", "Art. 38, c. 12"], tone: "warning" },
    {
      cells: [
        "Reiterazione non specifica",
        "Contestazione di tutte le violazioni; sanzione per la più grave aumentata fino al triplo",
        "Art. 38, c. 12",
      ],
      tone: "danger",
    },
    {
      cells: [
        "Mancata o tardiva registrazione",
        "Contestazione di tutte le violazioni dei commi 8 e 10; sanzione per la più grave aumentata fino al triplo",
        "Art. 38, c. 13",
      ],
      tone: "danger",
    },
  ],
}

export const nis2SanctionScale: Nis2Table = {
  id: "scaglioni",
  caption: "Fascia grave per scaglioni di fatturato, in euro",
  note: "Soggetti diversi dalle pubbliche amministrazioni. La soglia di indifferenza si colloca a 500 milioni di fatturato: sotto opera il massimale fisso, sopra prevale la percentuale.",
  columns: [
    "Fatturato mondiale",
    "Essenziale — max",
    "Essenziale — min",
    "Importante — max",
    "Importante — min",
  ],
  rows: [
    { cells: ["10.000.000", "10.000.000", "500.000", "7.000.000", "233.333"], tone: "brand" },
    { cells: ["30.000.000", "10.000.000", "500.000", "7.000.000", "233.333"], tone: "brand" },
    { cells: ["100.000.000", "10.000.000", "500.000", "7.000.000", "233.333"], tone: "gold" },
    { cells: ["500.000.000", "10.000.000", "500.000", "7.000.000", "233.333"], tone: "warning" },
    { cells: ["1.000.000.000", "20.000.000", "1.000.000", "14.000.000", "466.667"], tone: "danger" },
  ],
}

export const nis2Comma13Example: Nis2Table = {
  id: "esempio-comma-13",
  caption: "Impresa con 30 milioni di fatturato che non si è registrata",
  note: "Applicazione dell'art. 38, comma 13: importi in euro.",
  columns: ["Voce", "Essenziale", "Importante"],
  rows: [
    { cells: ["Violazione più grave, massimo edittale", "10.000.000", "7.000.000"], tone: "warning" },
    { cells: ["Aumento sino al triplo", "30.000.000", "21.000.000"], tone: "danger" },
    { cells: ["Pagamento ridotto — un terzo del massimo base", "3.333.333", "2.333.333"], tone: "gold" },
    { cells: ["Pagamento ridotto — doppio del minimo", "1.000.000", "466.667"], tone: "success" },
  ],
}
