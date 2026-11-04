/**
 * Valutazione preliminare dell'appartenenza al perimetro NIS2 (D.Lgs. 138/2024).
 *
 * La logica riproduce la lettura dell'Agenzia per la cybersicurezza nazionale
 * (FAQ AMB.DI.1 sull'ambito, già 2.3) della raccomandazione 2003/361/CE:
 * la classe dimensionale si determina quando sono soddisfatti insieme il
 * criterio degli occupati e almeno uno dei due parametri contabili; si sale di
 * classe se si superano entrambi i parametri contabili oppure il solo criterio
 * degli occupati. I dati delle imprese collegate si sommano per intero, quelli
 * delle associate in proporzione alla quota (art. 6, par. 2, dell'allegato).
 *
 * Il modulo è puro e privo di dipendenze: gira nel browser, nei test e, se
 * servisse, lato server. Non è un parere: ogni esito va riscontrato sulla
 * piattaforma ACN e, nei casi dubbi, con una verifica professionale.
 */

export type ClasseDimensionale = "micro" | "piccola" | "media" | "grande"

export type Tipologia = "allegato-i" | "allegato-ii" | "nessuna"

export type Esito = "fuori-ambito" | "importante" | "essenziale" | "in-ambito"

export interface DatiImpresa {
  /** Occupati in unità lavorative annue. */
  ula: number
  /** Fatturato annuo in milioni di euro, al netto dell'IVA. */
  fatturato: number
  /** Totale di bilancio annuo in milioni di euro (totale dell'attivo). */
  bilancio: number
}

export interface ImpresaCollegata extends DatiImpresa {
  nome?: string
}

export interface ImpresaAssociata extends DatiImpresa {
  nome?: string
  /** Quota di partecipazione in percentuale (25-50). */
  quota: number
}

export interface InputPerimetro {
  /** Dati dell'ultimo esercizio chiuso. */
  attuale: DatiImpresa
  /** Dati dell'esercizio precedente, se noti (regola dei due esercizi). */
  precedente?: DatiImpresa
  collegate: ImpresaCollegata[]
  associate: ImpresaAssociata[]
  tipologia: Tipologia
  /** Tipologie dell'art. 3, c. 5: in ambito indipendentemente dalla dimensione. */
  art3c5: boolean
  /** Almeno un criterio dell'art. 3, c. 10 verso un soggetto NIS del gruppo. */
  art3c10: boolean
}

export interface RisultatoPerimetro {
  aggregato: DatiImpresa
  classePropria: ClasseDimensionale
  classeAggregata: ClasseDimensionale
  /** Classe dell'esercizio precedente, aggregata con lo stesso perimetro. */
  classePrecedente?: ClasseDimensionale
  classeConsolidata: boolean
  esito: Esito
  clausolaSalvaguardia: "non-pertinente" | "preclusa" | "valutabile"
  note: string[]
}

const SOGLIE = {
  micro: { ula: 10, fatturato: 2, bilancio: 2 },
  piccola: { ula: 50, fatturato: 10, bilancio: 10 },
  media: { ula: 250, fatturato: 50, bilancio: 43 },
} as const

export const ETICHETTE_CLASSE: Record<ClasseDimensionale, string> = {
  micro: "Microimpresa",
  piccola: "Piccola impresa",
  media: "Media impresa",
  grande: "Grande impresa",
}

export const ETICHETTE_ESITO: Record<Esito, string> = {
  "fuori-ambito": "Fuori dall'ambito di applicazione",
  importante: "Soggetto importante",
  essenziale: "Soggetto essenziale",
  "in-ambito": "In ambito indipendentemente dalla dimensione",
}

function entroSoglia(dati: DatiImpresa, soglia: { ula: number; fatturato: number; bilancio: number }): boolean {
  return dati.ula < soglia.ula && (dati.fatturato <= soglia.fatturato || dati.bilancio <= soglia.bilancio)
}

/** Classe dimensionale secondo l'art. 2 dell'allegato alla raccomandazione, nella lettura ACN. */
export function classifica(dati: DatiImpresa): ClasseDimensionale {
  if (entroSoglia(dati, SOGLIE.micro)) return "micro"
  if (entroSoglia(dati, SOGLIE.piccola)) return "piccola"
  if (entroSoglia(dati, SOGLIE.media)) return "media"
  return "grande"
}

function arrotonda(valore: number): number {
  return Math.round(valore * 1000) / 1000
}

/** Aggregazione ex art. 6, par. 2: collegate al 100%, associate pro quota. */
export function aggrega(
  propri: DatiImpresa,
  collegate: ImpresaCollegata[],
  associate: ImpresaAssociata[],
): DatiImpresa {
  const somma = { ...propri }
  for (const impresa of collegate) {
    somma.ula += impresa.ula
    somma.fatturato += impresa.fatturato
    somma.bilancio += impresa.bilancio
  }
  for (const impresa of associate) {
    const quota = Math.min(Math.max(impresa.quota, 0), 100) / 100
    somma.ula += impresa.ula * quota
    somma.fatturato += impresa.fatturato * quota
    somma.bilancio += impresa.bilancio * quota
  }
  return {
    ula: arrotonda(somma.ula),
    fatturato: arrotonda(somma.fatturato),
    bilancio: arrotonda(somma.bilancio),
  }
}

const ORDINE: ClasseDimensionale[] = ["micro", "piccola", "media", "grande"]

function supera(a: ClasseDimensionale, b: ClasseDimensionale): boolean {
  return ORDINE.indexOf(a) > ORDINE.indexOf(b)
}

export function valutaPerimetro(input: InputPerimetro): RisultatoPerimetro {
  const note: string[] = []
  const aggregato = aggrega(input.attuale, input.collegate, input.associate)
  const classePropria = classifica(input.attuale)
  const classeAggregata = classifica(aggregato)

  let classePrecedente: ClasseDimensionale | undefined
  let classeConsolidata = true
  if (input.precedente) {
    classePrecedente = classifica(aggrega(input.precedente, input.collegate, input.associate))
    classeConsolidata = classePrecedente === classeAggregata
    if (!classeConsolidata) {
      note.push(
        "La classe dell'ultimo esercizio differisce da quella dell'esercizio precedente: il cambio di classe produce effetto solo se il superamento o la discesa sotto soglia si ripete per due esercizi consecutivi (allegato alla raccomandazione 2003/361/CE, art. 4, par. 2). Conservare entrambi i bilanci a giustificazione della classe dichiarata.",
      )
    }
  }

  const sopraPiccola = classeAggregata === "media" || classeAggregata === "grande"

  let esito: Esito
  if (input.art3c10) {
    esito = "in-ambito"
    note.push(
      "Il soggetto è attratto nell'ambito ai sensi dell'art. 3, c. 10, del D.Lgs. 138/2024, qualunque sia la sua dimensione; in registrazione va dichiarato verso quali soggetti NIS del gruppo ricorrono i criteri.",
    )
  } else if (input.art3c5) {
    esito = "in-ambito"
    note.push(
      "Le tipologie dell'art. 3, c. 5 (reti e servizi di comunicazione elettronica, servizi fiduciari, registri di nomi di dominio di primo livello, servizi DNS, registrazione dei nomi di dominio) rientrano a prescindere dalla dimensione; la qualifica segue l'art. 6.",
    )
  } else if (input.tipologia === "nessuna") {
    esito = "fuori-ambito"
    note.push(
      "Nessuna attività riconducibile alle tipologie degli Allegati I e II: resta ferma la facoltà dell'Autorità di individuare il soggetto ai sensi dell'art. 3, cc. 9 e 13, con notifica al domicilio digitale.",
    )
  } else if (!sopraPiccola) {
    esito = "fuori-ambito"
    note.push(
      "I dati aggregati non superano i massimali della piccola impresa (meno di 50 occupati e fatturato o bilancio non superiore a 10 milioni): il soggetto non è tenuto alla registrazione, salvo i casi di inclusione indipendenti dalla dimensione.",
    )
  } else if (input.tipologia === "allegato-i" && classeAggregata === "grande") {
    esito = "essenziale"
  } else {
    esito = "importante"
  }

  let clausolaSalvaguardia: RisultatoPerimetro["clausolaSalvaguardia"] = "non-pertinente"
  const haGruppo = input.collegate.length > 0 || input.associate.length > 0
  if (haGruppo && supera(classeAggregata, classePropria)) {
    if (input.art3c10) {
      clausolaSalvaguardia = "preclusa"
      note.push(
        "La clausola di salvaguardia non è disponibile per i soggetti attratti ai sensi dell'art. 3, c. 10 (DPCM 221/2024, art. 3, c. 2).",
      )
    } else {
      clausolaSalvaguardia = "valutabile"
      note.push(
        `Da soli i dati dell'impresa darebbero la classe «${ETICHETTE_CLASSE[classePropria].toLowerCase()}»: l'aggregazione di gruppo alza la classe. Se i sistemi informativi e i servizi NIS sono totalmente indipendenti da quelli delle imprese collegate, in registrazione può essere richiesta la clausola di salvaguardia (DPCM 221/2024), con dichiarazione dei dati senza aggregazione; fino alla notifica dell'esito vale la classe aggregata.`,
      )
    }
  }

  if (esito === "importante" && input.tipologia === "allegato-i") {
    note.push(
      "Soggetto dell'Allegato I che non supera i massimali della media impresa: soggetto importante ai sensi dell'art. 6, c. 3.",
    )
  }

  return {
    aggregato,
    classePropria,
    classeAggregata,
    classePrecedente,
    classeConsolidata,
    esito,
    clausolaSalvaguardia,
    note,
  }
}
