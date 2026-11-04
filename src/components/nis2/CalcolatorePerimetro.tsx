"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { ArrowRight, Minus, Plus } from "lucide-react"
import {
  ETICHETTE_CLASSE,
  ETICHETTE_ESITO,
  valutaPerimetro,
  type DatiImpresa,
  type Esito,
  type Tipologia,
} from "@/lib/nis2/perimetro"

/**
 * Calcolatore del perimetro NIS2. Tutto il calcolo avviene nel browser: nessun
 * dato lascia il dispositivo e nulla viene conservato. L'esito è una
 * valutazione preliminare da riscontrare sulla piattaforma ACN.
 */

interface RigaImpresa {
  id: number
  nome: string
  ula: string
  fatturato: string
  bilancio: string
  quota: string
}

const rigaVuota = (id: number, quota = ""): RigaImpresa => ({
  id,
  nome: "",
  ula: "",
  fatturato: "",
  bilancio: "",
  quota,
})

function numero(valore: string): number {
  const n = Number.parseFloat(valore.replace(",", "."))
  return Number.isFinite(n) && n >= 0 ? n : 0
}

function datiDa(ula: string, fatturato: string, bilancio: string): DatiImpresa {
  return { ula: numero(ula), fatturato: numero(fatturato), bilancio: numero(bilancio) }
}

const toneEsito: Record<Esito, string> = {
  "fuori-ambito": "border-success/40 bg-success/5 text-success",
  importante: "border-warning/40 bg-warning/5 text-warning",
  essenziale: "border-danger/40 bg-danger/5 text-danger",
  "in-ambito": "border-brand/40 bg-brand-soft text-brand",
}

const campo =
  "w-full rounded-md border border-mist bg-white px-3 py-2 text-body text-ink focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand-light"

function Etichetta({ children, htmlFor }: { children: React.ReactNode; htmlFor?: string }) {
  return (
    <label htmlFor={htmlFor} className="block text-caption text-steel mb-1">
      {children}
    </label>
  )
}

function CampiImpresa({
  prefisso,
  ula,
  fatturato,
  bilancio,
  onChange,
}: {
  prefisso: string
  ula: string
  fatturato: string
  bilancio: string
  onChange: (campo: "ula" | "fatturato" | "bilancio", valore: string) => void
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <div>
        <Etichetta htmlFor={`${prefisso}-ula`}>Occupati (ULA)</Etichetta>
        <input
          id={`${prefisso}-ula`}
          inputMode="decimal"
          className={campo}
          value={ula}
          onChange={(e) => onChange("ula", e.target.value)}
          placeholder="es. 45"
        />
      </div>
      <div>
        <Etichetta htmlFor={`${prefisso}-fatturato`}>Fatturato annuo (mln €)</Etichetta>
        <input
          id={`${prefisso}-fatturato`}
          inputMode="decimal"
          className={campo}
          value={fatturato}
          onChange={(e) => onChange("fatturato", e.target.value)}
          placeholder="es. 12,5"
        />
      </div>
      <div>
        <Etichetta htmlFor={`${prefisso}-bilancio`}>Totale di bilancio (mln €)</Etichetta>
        <input
          id={`${prefisso}-bilancio`}
          inputMode="decimal"
          className={campo}
          value={bilancio}
          onChange={(e) => onChange("bilancio", e.target.value)}
          placeholder="es. 9"
        />
      </div>
    </div>
  )
}

function RigheGruppo({
  lista,
  righe,
  aggiorna,
  rimuovi,
}: {
  lista: "collegate" | "associate"
  righe: RigaImpresa[]
  aggiorna: (lista: "collegate" | "associate", id: number, campoRiga: keyof Omit<RigaImpresa, "id">, valore: string) => void
  rimuovi: (lista: "collegate" | "associate", id: number) => void
}) {
  return (
    <div className="space-y-4">
      {righe.map((riga, indice) => (
        <div key={riga.id} className="rounded-md border border-mist bg-paper p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <input
              aria-label={`Denominazione ${lista === "collegate" ? "collegata" : "associata"} ${indice + 1}`}
              className={`${campo} max-w-xs`}
              value={riga.nome}
              onChange={(e) => aggiorna(lista, riga.id, "nome", e.target.value)}
              placeholder={lista === "collegate" ? `Collegata ${indice + 1}` : `Associata ${indice + 1}`}
            />
            <button
              type="button"
              onClick={() => rimuovi(lista, riga.id)}
              className="inline-flex items-center gap-1 text-caption text-steel hover:text-danger"
            >
              <Minus className="h-4 w-4" aria-hidden /> Rimuovi
            </button>
          </div>
          <CampiImpresa
            prefisso={`${lista}-${riga.id}`}
            ula={riga.ula}
            fatturato={riga.fatturato}
            bilancio={riga.bilancio}
            onChange={(c, v) => aggiorna(lista, riga.id, c, v)}
          />
          {lista === "associate" && (
            <div className="mt-4 max-w-xs">
              <Etichetta htmlFor={`associate-${riga.id}-quota`}>Quota di partecipazione (%)</Etichetta>
              <input
                id={`associate-${riga.id}-quota`}
                inputMode="decimal"
                className={campo}
                value={riga.quota}
                onChange={(e) => aggiorna(lista, riga.id, "quota", e.target.value)}
                placeholder="25-50"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export function CalcolatorePerimetro() {
  const [attuale, setAttuale] = useState({ ula: "", fatturato: "", bilancio: "" })
  const [usaPrecedente, setUsaPrecedente] = useState(false)
  const [precedente, setPrecedente] = useState({ ula: "", fatturato: "", bilancio: "" })
  const [collegate, setCollegate] = useState<RigaImpresa[]>([])
  const [associate, setAssociate] = useState<RigaImpresa[]>([])
  const [tipologia, setTipologia] = useState<Tipologia>("allegato-ii")
  const [art3c5, setArt3c5] = useState(false)
  const [art3c10, setArt3c10] = useState(false)
  const [prossimoId, setProssimoId] = useState(1)
  const [mostraEsito, setMostraEsito] = useState(false)

  const datiInseriti = attuale.ula !== "" || attuale.fatturato !== "" || attuale.bilancio !== ""

  const risultato = useMemo(() => {
    if (!mostraEsito) return null
    return valutaPerimetro({
      attuale: datiDa(attuale.ula, attuale.fatturato, attuale.bilancio),
      precedente: usaPrecedente ? datiDa(precedente.ula, precedente.fatturato, precedente.bilancio) : undefined,
      collegate: collegate.map((r) => ({ nome: r.nome, ...datiDa(r.ula, r.fatturato, r.bilancio) })),
      associate: associate.map((r) => ({
        nome: r.nome,
        quota: numero(r.quota),
        ...datiDa(r.ula, r.fatturato, r.bilancio),
      })),
      tipologia,
      art3c5,
      art3c10,
    })
  }, [mostraEsito, attuale, usaPrecedente, precedente, collegate, associate, tipologia, art3c5, art3c10])

  function aggiungi(lista: "collegate" | "associate") {
    const riga = rigaVuota(prossimoId, lista === "associate" ? "25" : "")
    setProssimoId((n) => n + 1)
    if (lista === "collegate") setCollegate((r) => [...r, riga])
    else setAssociate((r) => [...r, riga])
  }

  function aggiorna(
    lista: "collegate" | "associate",
    id: number,
    campoRiga: keyof Omit<RigaImpresa, "id">,
    valore: string,
  ) {
    const setter = lista === "collegate" ? setCollegate : setAssociate
    setter((righe) => righe.map((r) => (r.id === id ? { ...r, [campoRiga]: valore } : r)))
  }

  function rimuovi(lista: "collegate" | "associate", id: number) {
    const setter = lista === "collegate" ? setCollegate : setAssociate
    setter((righe) => righe.filter((r) => r.id !== id))
  }

  return (
    <div className="space-y-10">
      <section className="rounded-lg border border-mist bg-white p-6 lg:p-8">
        <h2 className="text-h3 text-ink mb-1">1. Dati dell&apos;impresa — ultimo esercizio chiuso</h2>
        <p className="text-caption text-steel mb-6">
          Occupati in unità lavorative annue; fatturato al netto dell&apos;IVA; totale dell&apos;attivo
          dello stato patrimoniale. Importi in milioni di euro.
        </p>
        <CampiImpresa
          prefisso="attuale"
          ula={attuale.ula}
          fatturato={attuale.fatturato}
          bilancio={attuale.bilancio}
          onChange={(c, v) => setAttuale((d) => ({ ...d, [c]: v }))}
        />
        <label className="mt-6 flex items-start gap-3 text-body text-steel">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 accent-brand"
            checked={usaPrecedente}
            onChange={(e) => setUsaPrecedente(e.target.checked)}
          />
          <span>Inserisco anche i dati dell&apos;esercizio precedente (regola dei due esercizi)</span>
        </label>
        {usaPrecedente && (
          <div className="mt-4">
            <CampiImpresa
              prefisso="precedente"
              ula={precedente.ula}
              fatturato={precedente.fatturato}
              bilancio={precedente.bilancio}
              onChange={(c, v) => setPrecedente((d) => ({ ...d, [c]: v }))}
            />
          </div>
        )}
      </section>

      <section className="rounded-lg border border-mist bg-white p-6 lg:p-8">
        <h2 className="text-h3 text-ink mb-1">2. Gruppo di imprese</h2>
        <p className="text-caption text-steel mb-6">
          Collegate: controllo o influenza dominante, dati sommati al 100%. Associate: partecipazione
          dal 25% in su senza controllo, dati sommati in proporzione alla quota. Se l&apos;impresa è
          autonoma, lasciare vuoto.
        </p>
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-h4 text-ink">Imprese collegate</h3>
              <button
                type="button"
                onClick={() => aggiungi("collegate")}
                className="inline-flex items-center gap-1 text-caption font-medium text-brand hover:underline"
              >
                <Plus className="h-4 w-4" aria-hidden /> Aggiungi
              </button>
            </div>
            <RigheGruppo lista="collegate" righe={collegate} aggiorna={aggiorna} rimuovi={rimuovi} />
          </div>
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-h4 text-ink">Imprese associate</h3>
              <button
                type="button"
                onClick={() => aggiungi("associate")}
                className="inline-flex items-center gap-1 text-caption font-medium text-brand hover:underline"
              >
                <Plus className="h-4 w-4" aria-hidden /> Aggiungi
              </button>
            </div>
            <RigheGruppo lista="associate" righe={associate} aggiorna={aggiorna} rimuovi={rimuovi} />
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-mist bg-white p-6 lg:p-8">
        <h2 className="text-h3 text-ink mb-1">3. Tipologia di attività</h2>
        <p className="text-caption text-steel mb-6">
          Basta una sola attività riconducibile agli allegati, anche svolta in forma residuale (salvo
          i settori acqua potabile, acque reflue e gestione dei rifiuti, per i quali conta
          l&apos;attività principale).
        </p>
        <fieldset className="space-y-3">
          <legend className="sr-only">Tipologia di soggetto</legend>
          {(
            [
              ["allegato-i", "Settore ad alta criticità (Allegato I): energia, trasporti, banche, mercati finanziari, sanità, acqua potabile, acque reflue, infrastrutture digitali, servizi TIC B2B, pubblica amministrazione, spazio"],
              ["allegato-ii", "Altro settore critico (Allegato II): servizi postali, gestione dei rifiuti, chimica, alimentare, fabbricazione, fornitori di servizi digitali, ricerca"],
              ["nessuna", "Nessuna attività riconducibile agli Allegati I e II"],
            ] as [Tipologia, string][]
          ).map(([valore, testo]) => (
            <label key={valore} className="flex items-start gap-3 text-body text-steel">
              <input
                type="radio"
                name="tipologia"
                className="mt-1 h-4 w-4 accent-brand"
                checked={tipologia === valore}
                onChange={() => setTipologia(valore)}
              />
              <span>{testo}</span>
            </label>
          ))}
        </fieldset>
        <div className="mt-6 space-y-3 border-t border-mist pt-6">
          <label className="flex items-start gap-3 text-body text-steel">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 accent-brand"
              checked={art3c5}
              onChange={(e) => setArt3c5(e.target.checked)}
            />
            <span>
              L&apos;impresa fornisce reti o servizi di comunicazione elettronica, servizi fiduciari,
              gestione di registri di nomi di dominio di primo livello, servizi DNS o registrazione
              di nomi di dominio (art. 3, c. 5)
            </span>
          </label>
          <label className="flex items-start gap-3 text-body text-steel">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 accent-brand"
              checked={art3c10}
              onChange={(e) => setArt3c10(e.target.checked)}
            />
            <span>
              L&apos;impresa, verso un soggetto NIS del proprio gruppo, decide o influenza in modo
              dominante le misure di sicurezza, gestisce i sistemi da cui dipendono i suoi servizi,
              ne svolge le operazioni di sicurezza o gli fornisce servizi TIC o di sicurezza (art. 3,
              c. 10)
            </span>
          </label>
        </div>
      </section>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="button"
          disabled={!datiInseriti}
          onClick={() => setMostraEsito(true)}
          className="inline-flex items-center gap-2 rounded-md bg-brand px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50"
        >
          Calcola l&apos;esito
          <ArrowRight className="h-4 w-4" aria-hidden />
        </button>
        <p className="text-caption text-steel">
          Il calcolo avviene nel browser: nessun dato viene trasmesso o conservato.
        </p>
      </div>

      {risultato && (
        <section
          aria-live="polite"
          className={`rounded-lg border p-6 lg:p-8 ${toneEsito[risultato.esito]}`}
        >
          <p className="text-eyebrow uppercase tracking-[0.12em] mb-2">Esito preliminare</p>
          <h2 className="text-h2 mb-4">{ETICHETTE_ESITO[risultato.esito]}</h2>
          <dl className="grid gap-4 sm:grid-cols-3 text-ink">
            <div className="rounded-md bg-white/70 p-4">
              <dt className="text-caption text-steel">Classe sui dati propri</dt>
              <dd className="text-h4">{ETICHETTE_CLASSE[risultato.classePropria]}</dd>
            </div>
            <div className="rounded-md bg-white/70 p-4">
              <dt className="text-caption text-steel">Classe aggregata (gruppo)</dt>
              <dd className="text-h4">{ETICHETTE_CLASSE[risultato.classeAggregata]}</dd>
              <dd className="text-caption text-steel mt-1">
                {risultato.aggregato.ula} ULA · {risultato.aggregato.fatturato} mln fatturato ·{" "}
                {risultato.aggregato.bilancio} mln bilancio
              </dd>
            </div>
            <div className="rounded-md bg-white/70 p-4">
              <dt className="text-caption text-steel">Esercizio precedente</dt>
              <dd className="text-h4">
                {risultato.classePrecedente
                  ? ETICHETTE_CLASSE[risultato.classePrecedente]
                  : "Non inserito"}
              </dd>
              {risultato.classePrecedente && (
                <dd className="text-caption text-steel mt-1">
                  {risultato.classeConsolidata ? "Classe consolidata" : "Classe in transizione"}
                </dd>
              )}
            </div>
          </dl>
          {risultato.note.length > 0 && (
            <ul className="mt-6 space-y-3 text-body text-ink">
              {risultato.note.map((nota) => (
                <li key={nota} className="flex gap-3">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-current" />
                  <span>{nota}</span>
                </li>
              ))}
            </ul>
          )}
          <p className="mt-6 text-caption text-steel">
            Valutazione preliminare e non vincolante, costruita sulla lettura dell&apos;Agenzia per la
            cybersicurezza nazionale (FAQ AMB.DI.1) e sull&apos;art. 3 del D.Lgs. 138/2024. La
            qualificazione definitiva risulta dalla registrazione sulla piattaforma ACN e dalla
            comunicazione dell&apos;Autorità; nei casi dubbi, in particolare nei gruppi, è opportuna
            una verifica professionale.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/assessment"
              className="inline-flex items-center gap-2 rounded-md bg-brand px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-dark"
            >
              Richiedi una verifica dell&apos;ambito
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/nis2"
              className="inline-flex items-center gap-2 rounded-md border border-brand px-5 py-2.5 text-sm font-medium text-brand hover:bg-brand-soft"
            >
              Come funziona il calcolo
            </Link>
          </div>
        </section>
      )}
    </div>
  )
}
