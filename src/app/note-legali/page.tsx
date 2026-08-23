import type { Metadata } from "next"
import { Hero } from "@/components/ui/Hero"

export const metadata: Metadata = {
  title: "Note legali, privacy e cookie policy",
  description:
    "Informativa privacy, cookie policy, note legali e condizioni d'uso del sito di GM Consulting S.r.l.",
  alternates: { canonical: "https://www.gmconsulting.one/note-legali" },
}

const navItems = [
  { href: "#privacy", label: "Informativa privacy" },
  { href: "#cookie", label: "Cookie policy" },
  { href: "#note-legali", label: "Note legali" },
  { href: "#crediti", label: "Crediti" },
]

export default function NoteLegaliPage() {
  return (
    <>
      <Hero
        variant="compact"
        eyebrow="Note legali"
        title="Note legali, privacy e cookie"
        lead="Informativa sulla protezione dei dati personali, cookie policy e condizioni d'uso."
      />

      <section className="bg-paper py-20 lg:py-28">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <div className="lg:flex lg:gap-16">
            {/* Sidebar nav */}
            <nav className="hidden lg:block lg:w-64 shrink-0">
              <div className="sticky top-32 space-y-1">
                <p className="text-eyebrow uppercase tracking-[0.12em] text-brand mb-4">
                  Indice
                </p>
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="block text-caption text-steel hover:text-brand transition-colors py-2 border-l-2 border-mist pl-4 hover:border-brand"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </nav>

            {/* Mobile nav */}
            <nav className="lg:hidden mb-12 flex flex-wrap gap-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-caption text-brand border border-brand-soft rounded-md px-3 py-1.5 hover:bg-brand-soft transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Content */}
            <div className="flex-1 max-w-3xl space-y-20">
              {/* Privacy */}
              <article id="privacy" className="scroll-mt-32">
                <h2 className="text-h2 text-ink mb-6">
                  Informativa sulla protezione dei dati personali
                </h2>
                <p className="text-caption text-steel mb-6">
                  Informativa ai sensi degli artt. 13 e 14 del Regolamento (UE)
                  2016/679 (&quot;GDPR&quot;)
                </p>

                <div className="space-y-8 text-body text-graphite">
                  <div>
                    <h3 className="text-h4 text-ink mb-3">
                      Titolare del trattamento
                    </h3>
                    <p>
                      GM Consulting S.r.l., con sede legale in Via Nuovalucello
                      81/C, 95126 Catania (CT), P.IVA 04006730875, in persona
                      del legale rappresentante pro tempore.
                    </p>
                    <p className="mt-2">
                      Contatti:{" "}
                      <a
                        href="mailto:info@gmconsulting.one"
                        className="text-brand hover:underline"
                      >
                        info@gmconsulting.one
                      </a>
                    </p>
                  </div>

                  <div>
                    <h3 className="text-h4 text-ink mb-3">
                      Finalità e basi giuridiche del trattamento
                    </h3>
                    <p className="mb-3">
                      I dati personali raccolti attraverso il presente sito sono
                      trattati per le seguenti finalità:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        <strong>
                          Gestione della richiesta di assessment preliminare
                        </strong>{" "}
                        — base giuridica: esecuzione di misure precontrattuali
                        adottate su richiesta dell&apos;interessato (art. 6,
                        par. 1, lett. b) GDPR).
                      </li>
                      <li>
                        <strong>
                          Comunicazioni commerciali e materiale editoriale
                        </strong>{" "}
                        — base giuridica: consenso dell&apos;interessato (art.
                        6, par. 1, lett. a) GDPR). Il consenso è facoltativo e
                        revocabile in qualsiasi momento.
                      </li>
                      <li>
                        <strong>
                          Adempimento di obblighi di legge o regolamentari
                        </strong>{" "}
                        — base giuridica: obbligo legale al quale è soggetto il
                        titolare (art. 6, par. 1, lett. c) GDPR).
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-h4 text-ink mb-3">
                      Periodo di conservazione
                    </h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        Richieste di assessment non convertite in incarico: 24
                        mesi dalla ricezione.
                      </li>
                      <li>
                        Documentazione fiscale e contabile: 10 anni ai sensi
                        dell&apos;art. 2220 c.c.
                      </li>
                      <li>
                        Dati trattati sulla base del consenso: fino alla revoca
                        del medesimo.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-h4 text-ink mb-3">
                      Categorie di destinatari
                    </h3>
                    <p>
                      I dati personali possono essere comunicati alle seguenti
                      categorie di soggetti:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-3">
                      <li>
                        Personale autorizzato di GM Consulting S.r.l., limitato
                        alle funzioni strettamente necessarie.
                      </li>
                      <li>
                        Responsabili esterni del trattamento: Vercel Inc.
                        (hosting), Resend Inc. (servizio email transazionale) e
                        Supabase Inc. (raccolta e aggregazione analytics
                        first-party, esclusivamente previo consenso).
                      </li>
                      <li>
                        Pubbliche autorità, ove previsto dalla legge.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-h4 text-ink mb-3">
                      Trasferimenti extra-UE
                    </h3>
                    <p>
                      Ove il trattamento comporti il trasferimento di dati
                      personali verso paesi terzi, il trasferimento è effettuato
                      sulla base delle Clausole Contrattuali Standard approvate
                      con Decisione di esecuzione (UE) 2021/914 della
                      Commissione.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-h4 text-ink mb-3">
                      Diritti dell&apos;interessato
                    </h3>
                    <p className="mb-3">
                      L&apos;interessato ha diritto di esercitare i diritti di
                      cui agli artt. 15-22 del GDPR, fra cui:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        diritto di accesso (art. 15), rettifica (art. 16),
                        cancellazione (art. 17);
                      </li>
                      <li>
                        diritto di limitazione del trattamento (art. 18) e di
                        portabilità dei dati (art. 20);
                      </li>
                      <li>
                        diritto di opposizione al trattamento (art. 21);
                      </li>
                      <li>
                        diritto di revocare il consenso in qualsiasi momento,
                        senza pregiudizio per la liceità del trattamento
                        effettuato prima della revoca.
                      </li>
                    </ul>
                    <p className="mt-3">
                      Le richieste possono essere inviate a{" "}
                      <a
                        href="mailto:info@gmconsulting.one"
                        className="text-brand hover:underline"
                      >
                        info@gmconsulting.one
                      </a>
                      . L&apos;interessato ha altresì il diritto di proporre
                      reclamo al Garante per la Protezione dei Dati Personali (
                      <a
                        href="https://www.garanteprivacy.it"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand hover:underline"
                      >
                        www.garanteprivacy.it
                      </a>
                      ).
                    </p>
                  </div>
                </div>
              </article>

              {/* Cookie */}
              <article id="cookie" className="scroll-mt-32">
                <h2 className="text-h2 text-ink mb-6">Cookie policy</h2>
                <p className="text-caption text-steel mb-6">
                  Informativa ai sensi del Provvedimento del Garante per la
                  Protezione dei Dati Personali n.&nbsp;231 del 10 giugno 2021
                </p>

                <div className="space-y-8 text-body text-graphite">
                  <div>
                    <h3 className="text-h4 text-ink mb-3">
                      Cookie tecnici (sempre attivi)
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="border-b border-mist text-left">
                            <th className="py-3 pr-4 font-semibold text-ink">
                              Cookie
                            </th>
                            <th className="py-3 pr-4 font-semibold text-ink">
                              Tipo
                            </th>
                            <th className="py-3 pr-4 font-semibold text-ink">
                              Durata
                            </th>
                            <th className="py-3 font-semibold text-ink">
                              Finalit&agrave;
                            </th>
                          </tr>
                        </thead>
                        <tbody className="text-graphite">
                          <tr className="border-b border-mist">
                            <td className="py-3 pr-4">
                              <code className="text-caption bg-mist px-1.5 py-0.5 rounded">
                                GM_COOKIE_CONSENT
                              </code>
                            </td>
                            <td className="py-3 pr-4">Tecnico</td>
                            <td className="py-3 pr-4">6 mesi</td>
                            <td className="py-3">
                              Memorizzazione delle preferenze di consenso cookie
                              espresse dall&apos;utente
                            </td>
                          </tr>
                          <tr className="border-b border-mist">
                            <td className="py-3 pr-4">
                              <code className="text-caption bg-mist px-1.5 py-0.5 rounded">
                                __next_*
                              </code>
                            </td>
                            <td className="py-3 pr-4">Tecnico</td>
                            <td className="py-3 pr-4">Sessione</td>
                            <td className="py-3">
                              Cookie tecnici di Next.js necessari al
                              funzionamento dell&apos;applicazione
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-h4 text-ink mb-3">Cookie analitici</h3>
                    <p>
                      Previo consenso esplicito, il sito utilizza una
                      misurazione first-party limitata a visualizzazioni di
                      pagine pubbliche, click su CTA e invii riusciti dei
                      moduli. Sono registrati solo pathname da una lista
                      chiusa, lingua, un target predefinito e un identificatore
                      casuale limitato alla sessione del tab. Non sono raccolti
                      IP nell&apos;archivio applicativo, referrer, query string,
                      contatti o contenuti inseriti nei moduli. Gli eventi
                      grezzi sono conservati per 90 giorni; le metriche
                      aggregate per 400 giorni e gli insight deterministici
                      per 365 giorni.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-h4 text-ink mb-3">
                      Cookie di profilazione
                    </h3>
                    <p>
                      Il sito non installa cookie di profilazione propri
                      n&eacute; di terze parti e non presenta una categoria di
                      profilazione nel pannello delle preferenze.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-h4 text-ink mb-3">
                      Gestione delle preferenze e revoca del consenso
                    </h3>
                    <p>
                      L&apos;utente pu&ograve; modificare le proprie preferenze
                      in qualsiasi momento attraverso il pannello cookie
                      accessibile dal link &laquo;Cookie preferences&raquo; nel
                      footer del sito. In alternativa, l&apos;utente pu&ograve;
                      configurare le impostazioni del proprio browser per
                      rifiutare l&apos;installazione dei cookie. La revoca del
                      consenso non pregiudica la liceit&agrave; del trattamento
                      effettuato prima della revoca.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-h4 text-ink mb-3">Base giuridica</h3>
                    <p>
                      Il trattamento dei dati tramite cookie tecnici &egrave;
                      fondato sull&apos;art.&nbsp;122, comma 1, del
                      D.Lgs.&nbsp;196/2003 (Codice Privacy) come modificato dal
                      D.Lgs.&nbsp;101/2018. Il trattamento tramite misurazione
                      analitica &egrave;
                      fondato sul consenso dell&apos;interessato (art.&nbsp;6,
                      par.&nbsp;1, lett.&nbsp;a) GDPR), espresso in
                      conformit&agrave; al Provvedimento del Garante
                      n.&nbsp;231/2021.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-h4 text-ink mb-3">
                      Diritti dell&apos;interessato
                    </h3>
                    <p>
                      Si rinvia alla sezione Informativa Privacy di questa
                      pagina per l&apos;elenco completo dei diritti esercitabili
                      dall&apos;interessato ai sensi degli artt.&nbsp;15-22 del
                      GDPR.
                    </p>
                  </div>
                </div>
              </article>

              {/* Note legali */}
              <article id="note-legali" className="scroll-mt-32">
                <h2 className="text-h2 text-ink mb-6">Note legali</h2>

                <div className="space-y-8 text-body text-graphite">
                  <div>
                    <h3 className="text-h4 text-ink mb-3">
                      Dati identificativi
                    </h3>
                    <ul className="space-y-1">
                      <li>
                        <strong>Denominazione:</strong> GM Consulting S.r.l.
                      </li>
                      <li>
                        <strong>Sede legale:</strong> Via Nuovalucello 81/C,
                        95126 Catania (CT)
                      </li>
                      <li>
                        <strong>P.IVA:</strong> 04006730875
                      </li>
                      <li>
                        <strong>REA:</strong> CT-268069
                      </li>
                      <li>
                        <strong>Oggetto sociale:</strong> consulenza
                        imprenditoriale e altra consulenza amministrativo-gestionale
                        (ATECO 70.20.09)
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-h4 text-ink mb-3">
                      Natura dei contenuti
                    </h3>
                    <p>
                      I contenuti pubblicati nella sezione Insights hanno natura
                      informativa e metodologica. Non costituiscono consulenza
                      professionale, legale, fiscale o finanziaria, né possono
                      essere utilizzati in sostituzione della stessa.
                      L&apos;applicazione a casi concreti richiede
                      necessariamente un&apos;analisi specifica.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-h4 text-ink mb-3">
                      Legge applicabile e foro competente
                    </h3>
                    <p>
                      Il presente sito e i relativi contenuti sono disciplinati
                      dalla legge italiana. Per qualsiasi controversia derivante
                      dall&apos;utilizzo del sito è competente in via esclusiva
                      il Foro di Catania.
                    </p>
                  </div>
                </div>
              </article>

              {/* Crediti */}
              <article id="crediti" className="scroll-mt-32">
                <h2 className="text-h2 text-ink mb-6">Crediti</h2>
                <p className="text-body text-graphite">
                  Il sito è progettato e gestito internamente da GM Consulting
                  S.r.l.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
