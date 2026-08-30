import Link from "next/link"
import {
  nis2Aggravating,
  nis2AnnualWindows,
  nis2BoardDocuments,
  nis2Categories,
  nis2Comma13Example,
  nis2Deadlines,
  nis2EventDeadlines,
  nis2SanctionScale,
  nis2SanctionsMinor,
  nis2SanctionsSevere,
  nis2Sources,
} from "@/lib/landings/nis2-dossier"
import { Nis2Gantt } from "./Nis2Gantt"
import { Nis2Table } from "./Nis2Table"
import { Nis2Term } from "./Nis2Term"

/**
 * Dossier tecnico della pagina NIS2: il testo introduce i concetti e ogni
 * parola evidenziata apre la scheda che li spiega, con la fonte.
 */
export function Nis2Dossier() {
  return (
    <section className="bg-white py-16" aria-labelledby="dossier-nis2">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <p className="text-eyebrow mb-4 uppercase tracking-[0.12em] text-brand">
          Dossier tecnico — aggiornato ad agosto 2026
        </p>
        <h2 id="dossier-nis2" className="text-h2 text-ink mb-4 max-w-3xl">
          Il calendario degli adempimenti e l&apos;architettura sanzionatoria
        </h2>
        <p className="text-body-lg text-steel mb-10 max-w-3xl">
          Le parole evidenziate aprono la scheda del concetto, con il riferimento normativo. Il
          cronoprogramma e le tabelle riportano i termini così come risultano dal D.Lgs. 138/2024 e
          dalle determinazioni dell&apos;Agenzia per la cybersicurezza nazionale.
        </p>

        <h3 className="text-h3 text-ink mb-4">1. Le fonti applicabili</h3>
        <p className="text-body text-steel mb-4 max-w-3xl">
          L&apos;ordinamento italiano ha recepito la direttiva (UE) 2022/2555 con il D.Lgs. 4
          settembre 2024, n. 138, pubblicato in Gazzetta Ufficiale n. 230 del 1° ottobre 2024 ed
          entrato in vigore il 16 ottobre 2024. La disciplina di dettaglio si è poi stratificata per
          determinazioni del Direttore Generale dell&apos;Agenzia, ed è lì che stanno le
          <Nis2Term id="misure-di-base"> misure di base</Nis2Term> e le fattispecie di
          <Nis2Term id="incidente-significativo"> incidente significativo</Nis2Term>.
        </p>
        <Nis2Table table={nis2Sources} />
        <p className="text-body text-steel mb-10 max-w-3xl">
          Sul piano metodologico il riferimento operativo resta la «Guida alla lettura delle
          specifiche di base» di ACN, aggiornata a dicembre 2025, la cui appendice C individua gli
          <Nis2Term id="atti-organo"> atti riservati all&apos;organo di amministrazione</Nis2Term>.
          Vanno inoltre considerate le FAQ dell&apos;Agenzia: la serie ODA.8–ODA.12 del 14 luglio
          2026 sugli obblighi degli organi e la serie MVE.1–MVE.5 dell&apos;11 agosto 2026 su
          <Nis2Term id="onere-della-prova"> monitoraggio, vigilanza ed esecuzione</Nis2Term>.
        </p>

        <h3 className="text-h3 text-ink mb-4">2. Perimetro soggettivo</h3>
        <p className="text-body text-steel mb-4 max-w-3xl">
          L&apos;Allegato I individua dieci settori ad alta criticità — energia, trasporti, settore
          bancario, infrastrutture dei mercati finanziari, sanità, acqua potabile, acque reflue,
          infrastrutture digitali, servizi TIC business-to-business, spazio — e l&apos;Allegato II
          sette altri settori critici, fra cui la
          <Nis2Term id="gestione-rifiuti"> gestione dei rifiuti</Nis2Term>. Le pubbliche
          amministrazioni in perimetro stanno nell&apos;Allegato III, mentre l&apos;Allegato IV
          individua ulteriori tipologie per identificazione governativa.
        </p>
        <p className="text-body text-steel mb-4 max-w-3xl">
          Oltre al settore conta il <Nis2Term id="criterio-dimensionale">criterio
          dimensionale</Nis2Term>, con l&apos;aggregazione dei dati delle imprese collegate e
          associate; e conta sapere quando la dimensione è irrilevante, perché opera una
          <Nis2Term id="deroga-dimensionale"> deroga dimensionale</Nis2Term>. L&apos;esito di questa
          verifica assegna la qualifica di
          <Nis2Term id="soggetto-essenziale"> soggetto essenziale</Nis2Term> o di
          <Nis2Term id="soggetto-importante"> soggetto importante</Nis2Term>, e con essa misure,
          poteri di vigilanza e massimali sanzionatori.
        </p>
        <Nis2Table table={nis2Categories} />

        <h3 className="text-h3 text-ink mb-4">3. Il meccanismo dei termini</h3>
        <p className="text-body text-steel mb-4 max-w-3xl">
          È il punto che genera il maggior numero di equivoci: non esiste una scadenza generale
          fissata dalla legge. I termini sostanziali decorrono dalla
          <Nis2Term id="comunicazione-individuale"> comunicazione individuale</Nis2Term> di
          inserimento in elenco. Poiché le comunicazioni alla prima coorte furono trasmesse dal 12 e
          13 aprile 2025, i nove mesi sono maturati a metà gennaio 2026 e i diciotto maturano nel
          corso di ottobre 2026, con il 31 ottobre quale limite esterno della prima ondata.
        </p>
        <p className="text-body text-steel mb-8 max-w-3xl">
          Per la coorte successiva la determinazione ha abbandonato il criterio mobile e fissato date
          certe; e va tenuto presente che la
          <Nis2Term id="conferma-permanenza"> conferma di permanenza in elenco</Nis2Term> non
          riapre i termini.
        </p>
        <Nis2Gantt />
        <Nis2Table table={nis2Deadlines} />

        <h3 className="text-h3 text-ink mb-4">4. Il calendario degli adempimenti</h3>
        <p className="text-body text-steel mb-4 max-w-3xl">
          Quattro finestre annuali sulla piattaforma, fra cui la comunicazione dei
          <Nis2Term id="fornitori-rilevanti"> fornitori rilevanti</Nis2Term>, e una serie di termini
          che si attivano a evento. I tre obblighi informativi — aggiornamento continuo entro
          quattordici giorni, registrazione o rinnovo annuale, aggiornamento informativo annuale —
          operano su piani autonomi e cumulativi.
        </p>
        <Nis2Table table={nis2AnnualWindows} />
        <Nis2Table table={nis2EventDeadlines} />

        <h3 className="text-h3 text-ink mb-4">5. Gli atti che l&apos;organo non può delegare</h3>
        <p className="text-body text-steel mb-4 max-w-3xl">
          Le specifiche di base sono organizzate nelle sei funzioni del Framework nazionale:
          Governance, Identificazione, Protezione, Rilevamento, Risposta, Ripristino. Undici
          documenti hanno però una particolarità: la loro approvazione è competenza propria
          dell&apos;organo di amministrazione.
        </p>
        <Nis2Table table={nis2BoardDocuments} />

        <h3 className="text-h3 text-ink mb-4">6. L&apos;architettura sanzionatoria</h3>
        <p className="text-body text-steel mb-4 max-w-3xl">
          Due fasce, un sistema di aggravanti e due
          <Nis2Term id="strumenti-deflattivi"> strumenti deflattivi</Nis2Term>. La disposizione
          tecnicamente più insidiosa è il
          <Nis2Term id="comma-13"> comma 13</Nis2Term>: chi non compare in elenco è esposto più del
          soggetto iscritto che non abbia adottato le misure.
        </p>
        <Nis2Table table={nis2SanctionsSevere} />
        <Nis2Table table={nis2SanctionsMinor} />
        <Nis2Table table={nis2Aggravating} />
        <p className="text-body text-steel mb-4 max-w-3xl">
          Sui numeri conta la
          <Nis2Term id="soglia-indifferenza"> soglia di indifferenza</Nis2Term>: fino a 500 milioni
          di fatturato la percentuale è irrilevante, oltre prevale sul massimale fisso.
        </p>
        <Nis2Table table={nis2SanctionScale} />
        <Nis2Table table={nis2Comma13Example} />

        <h3 className="text-h3 text-ink mb-4">7. Vigilanza ed esecuzione</h3>
        <p className="text-body text-steel mb-4 max-w-3xl">
          Superato il termine per l&apos;adozione delle misure l&apos;Agenzia può avviare le
          verifiche: controlli anche preventivi e sistematici per i soggetti essenziali, verifiche
          prevalentemente successive per gli importanti. Le modalità ricalcano quelle sperimentate in
          ambito GDPR: richieste documentali, valutazione delle misure tecniche e organizzative,
          audit in loco.
        </p>
        <p className="text-body text-steel mb-4 max-w-3xl">
          La conformità va quindi costruita come filiera e non come catalogo: la governance abilita
          l&apos;analisi del rischio, l&apos;analisi orienta le misure, le misure sono testate, i
          test producono evidenze, le evidenze alimentano le azioni correttive. È la coerenza
          verticale della catena, non il singolo controllo, l&apos;oggetto della verifica.
        </p>
        <p className="text-body text-steel max-w-3xl">
          Per la narrazione degli stessi obblighi in forma discorsiva si può leggere l&apos;insight{" "}
          <Link href="/insights/sentiero-resilienza-nis2-dlgs-138-2024" className="text-brand underline">
            «Le porte socchiuse: NIS2 e il Sentiero della Resilienza»
          </Link>
          .
        </p>
      </div>
    </section>
  )
}
