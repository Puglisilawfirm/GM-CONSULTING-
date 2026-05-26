import type { Metadata } from "next"
import { Hero } from "@/components/ui/Hero"

export const metadata: Metadata = {
  title: 'Accessibilità — GM Consulting S.r.l.',
  description: 'Dichiarazione di conformità sostanziale alle WCAG 2.1 AA del sito GM Consulting S.r.l. e modalità di segnalazione delle problematiche di accessibilità.',
  alternates: { canonical: 'https://www.gmconsulting.one/accessibilita' },
}

export default function AccessibilitaPage() {
  return (
    <>
      <Hero
        variant="compact"
        eyebrow="Accessibilità"
        title="Dichiarazione di accessibilità"
        lead="Conformità sostanziale alle WCAG 2.1 AA e modalità di segnalazione."
      />

      <section className="bg-paper py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-12 space-y-16">

          {/* Stato di conformità */}
          <div>
            <h2 className="text-h2 text-ink mb-4">Stato di conformità</h2>
            <p className="text-body text-graphite">
              Il sito www.gmconsulting.one è progettato e mantenuto in conformità sostanziale alle Web Content Accessibility Guidelines (WCAG) 2.1 di livello AA, pubblicate dal World Wide Web Consortium (W3C) e recepite dalle Linee Guida AgID sull&apos;accessibilità degli strumenti informatici. Pur non rientrando GM Consulting S.r.l. fra i soggetti obbligati dall&apos;art. 3 del D.Lgs. 10 agosto 2022, n. 82, in attuazione della Direttiva (UE) 2019/882 (European Accessibility Act), la Società ha scelto di aderire volontariamente agli standard internazionali di accessibilità, in coerenza con il proprio posizionamento di operatore di consulenza al servizio di una clientela professionale che include soggetti con esigenze di accesso differenziate.
            </p>
          </div>

          {/* Profili tecnici verificati */}
          <div>
            <h2 className="text-h2 text-ink mb-4">Profili tecnici verificati</h2>
            <p className="text-body text-graphite">
              Il sito è stato sottoposto a verifica interna sui principali criteri delle WCAG 2.1 AA: contrasto cromatico testo/sfondo, alternative testuali alle immagini, struttura semantica delle pagine, navigabilità da tastiera, visibilità del focus, etichettatura dei moduli, gestione degli errori di compilazione, lingua delle pagine, rispetto delle preferenze utente di riduzione del movimento.
            </p>
          </div>

          {/* Profili non ancora coperti */}
          <div>
            <h2 className="text-h2 text-ink mb-4">Profili non ancora coperti</h2>
            <p className="text-body text-graphite">
              La presente dichiarazione di conformità è di natura sostanziale, non formale. La Società non ha sottoposto il sito a verifica indipendente di organismo terzo accreditato AgID, e non ha attestato la conformità ai sensi dell&apos;art. 3 L. 4/2004. Eventuali profili residui di non conformità — segnalati dagli utenti o emersi nelle verifiche periodiche — sono trattati come priorità di intervento secondo le tempistiche indicate al paragrafo successivo.
            </p>
          </div>

          {/* Modalità di segnalazione */}
          <div>
            <h2 className="text-h2 text-ink mb-4">Modalità di segnalazione</h2>
            <p className="text-body text-graphite">
              Gli utenti che incontrino difficoltà di accesso ai contenuti del sito sono invitati a segnalare la problematica all&apos;indirizzo info@gmconsulting.one, indicando: la pagina specifica, la natura della difficoltà incontrata, lo strumento di accesso utilizzato (browser, screen reader, dispositivo). La Società si impegna a fornire riscontro entro 30 giorni dalla ricezione della segnalazione, con indicazione dei tempi di intervento ovvero della motivazione tecnica di impossibilità di adeguamento.
            </p>
          </div>

          {/* Aggiornamento della dichiarazione */}
          <div>
            <h2 className="text-h2 text-ink mb-4">Aggiornamento della dichiarazione</h2>
            <p className="text-body text-graphite">
              La presente dichiarazione è aggiornata alla data di pubblicazione indicata in calce ed è soggetta a revisione almeno annuale, ovvero a fronte di modifiche sostanziali del sito o del quadro normativo di riferimento.
            </p>
          </div>

          {/* Riferimenti normativi */}
          <div>
            <h2 className="text-h2 text-ink mb-4">Riferimenti normativi</h2>
            <p className="text-body text-graphite">
              Legge 9 gennaio 2004, n. 4 (Legge Stanca). Decreto Legislativo 10 agosto 2022, n. 82 (recepimento Direttiva UE 2019/882 — European Accessibility Act). Linee Guida AgID sull&apos;accessibilità degli strumenti informatici (versione vigente). Web Content Accessibility Guidelines (WCAG) 2.1, livello AA, W3C Recommendation 5 giugno 2018.
            </p>
          </div>

          {/* Footer della dichiarazione */}
          <div>
            <p className="text-caption text-steel">
              Pubblicata il 26 maggio 2026. Ultimo aggiornamento: 26 maggio 2026.
            </p>
          </div>

        </div>
      </section>
    </>
  )
}
