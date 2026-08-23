/**
 * Pagine di atterraggio verticali: un URL per ciascuna domanda di ricerca
 * presidiata. Il contenuto vive qui, in un'unica fonte, perché la stessa
 * struttura alimenta metadata, dati strutturati, indice `/soluzioni` e sitemap:
 * duplicarlo significherebbe vederli divergere senza che nulla si rompa.
 */

export interface SolutionSection {
  heading: string
  paragraphs?: string[]
  bullets?: string[]
}

export interface SolutionFaq {
  question: string
  answer: string
}

export interface SolutionLanding {
  slug: string
  metaTitle: string
  metaDescription: string
  eyebrow: string
  h1: string
  intro: string
  cardSummary: string
  serviceType: string
  targetQueries: string[]
  sections: SolutionSection[]
  faq: SolutionFaq[]
  related: { href: string; label: string }[]
}

export const solutionLandings: SolutionLanding[] = [
  {
    slug: "finanziamenti-pubblici-investimenti",
    metaTitle: "Finanziamenti pubblici per investimenti",
    metaDescription:
      "Bandi, incentivi e crediti d'imposta per gli investimenti d'impresa: analisi di ammissibilità, business plan, istruttoria e rendicontazione. Sede a Catania.",
    eyebrow: "Finanza agevolata",
    h1: "Finanziamenti pubblici per gli investimenti d'impresa",
    intro:
      "Un incentivo si perde più spesso in istruttoria e in rendicontazione che in graduatoria. Selezioniamo le misure realmente compatibili con il piano d'investimento, costruiamo la documentazione economica che regge la valutazione e presidiamo gli obblighi che restano dopo l'erogazione.",
    cardSummary:
      "Selezione delle misure, business plan, istruttoria e rendicontazione degli investimenti agevolati.",
    serviceType: "Consulenza in materia di finanza agevolata e incentivi pubblici agli investimenti",
    targetQueries: [
      "finanziamenti pubblici per investimenti aziendali",
      "consulenza bandi e incentivi imprese",
      "credito d'imposta investimenti consulenza",
      "rendicontazione contributo pubblico impresa",
      "consulenza finanza agevolata Catania",
    ],
    sections: [
      {
        heading: "Il lavoro utile si fa prima della domanda",
        paragraphs: [
          "La maggior parte delle domande respinte non è respinta per il merito del progetto: è respinta per requisiti soggettivi non verificati, per spese non ammissibili inserite nel piano, per date di avvio anteriori alla presentazione o per documentazione economica incoerente con i bilanci depositati.",
          "Il primo passo è quindi una verifica di ammissibilità sulla singola impresa e sul singolo investimento: dimensione e classificazione dell'impresa, regolarità contributiva, aiuti già ricevuti e limiti di cumulo, codice di attività, localizzazione dell'unità produttiva, natura e tempistica delle spese previste.",
        ],
      },
      {
        heading: "Le famiglie di misure che consideriamo",
        paragraphs: [
          "Il quadro degli strumenti cambia di continuo: sportelli che aprono e chiudono, dotazioni che si esauriscono, regole di cumulo che si modificano. Per questo lavoriamo per categoria di intervento e verifichiamo le misure aperte al momento dell'analisi, invece di partire da un elenco fisso.",
        ],
        bullets: [
          "Agevolazioni per beni strumentali e digitalizzazione, nelle forme del credito d'imposta o del contributo in conto impianti.",
          "Strumenti per l'efficienza energetica e l'autoproduzione da fonti rinnovabili, dove il beneficio è legato al risultato misurato.",
          "Misure territoriali per il Mezzogiorno e per la Sicilia, comprese le agevolazioni collegate alla Zona economica speciale unica e i bandi regionali su innovazione, internazionalizzazione e reti d'impresa.",
          "Finanziamenti agevolati e contributi in conto interessi per l'acquisto di macchinari, con garanzia pubblica sul credito.",
          "Programmi nazionali per investimenti di dimensione rilevante e per la ricerca industriale, con negoziazione del contratto di sviluppo.",
          "Strumenti per l'export e l'internazionalizzazione, fra finanziamenti a tasso agevolato, cofinanziamenti a fondo perduto e garanzie.",
          "Formazione finanziata attraverso i fondi interprofessionali, spesso l'unica leva disponibile quando l'investimento è sulle competenze.",
        ],
      },
      {
        heading: "Che cosa produciamo",
        bullets: [
          "Nota di ammissibilità con le misure percorribili, le scadenze, l'intensità di aiuto attesa e i vincoli di cumulo.",
          "Piano d'investimento e piano finanziario coerenti con i bilanci e con le regole della misura, non con un modello generico.",
          "Business plan con analisi di scenario, indicatori richiesti dal bando e prospetto delle fonti di copertura.",
          "Dossier di domanda completo, con la documentazione tecnica e le dichiarazioni sostitutive redatte nei termini richiesti.",
          "Cronoprogramma delle spese, per evitare l'errore più costoso: iniziare prima di quando la misura lo consente.",
          "Piano di rendicontazione con la struttura documentale e contabile da tenere dal primo giorno, non ricostruita al momento del controllo.",
        ],
      },
      {
        heading: "Dopo l'erogazione: gli obblighi che restano",
        paragraphs: [
          "L'agevolazione non si chiude con l'accredito. Restano il vincolo di destinazione dei beni, i termini di ultimazione del progetto, gli obblighi di conservazione documentale, gli adempimenti sul Registro nazionale degli aiuti di Stato e, in molte misure, il mantenimento di parametri occupazionali o di risultato.",
          "Presidiamo questa fase perché è dove si concentrano le revoche: un bene alienato prima del termine, una spesa priva della tracciabilità richiesta o una relazione finale incompleta possono comportare la restituzione del contributo con interessi.",
        ],
      },
      {
        heading: "Come ci raccordiamo con il resto del piano",
        paragraphs: [
          "Un investimento agevolato incide su bilancio, fiscalità, contratti e — quando ci sono fondi pubblici in gioco — sull'esposizione al rischio amministrativo e penale dell'impresa. Colleghiamo l'operazione al controllo di gestione, ai presidi di compliance e alla pianificazione strategica, così che la richiesta di contributo non resti un adempimento isolato.",
          "Gli aspetti che richiedono valutazione legale sono trattati in convenzione con lo Studio Legale Avv. Maria Puglisi, sulla base di autonomo mandato professionale del cliente.",
        ],
      },
    ],
    faq: [
      {
        question: "Si può chiedere un incentivo per un investimento già avviato?",
        answer:
          "Di regola no: quasi tutte le misure richiedono che il progetto non sia avviato alla data di presentazione della domanda, e l'avvio comprende ordini e acconti. La verifica delle date è il primo controllo che facciamo, prima di impostare il dossier.",
      },
      {
        question: "Più agevolazioni possono coprire lo stesso investimento?",
        answer:
          "Il cumulo è ammesso solo entro i limiti previsti dalle singole misure e dalla disciplina europea sugli aiuti di Stato, con soglie che variano per tipologia e territorio. Va calcolato prima, perché un cumulo irregolare emerge in controllo e comporta la revoca.",
      },
      {
        question: "Che cosa cambia per un'impresa siciliana?",
        answer:
          "Alle misure nazionali si aggiungono i bandi della Regione Siciliana e le agevolazioni collegate alla Zona economica speciale unica per il Mezzogiorno, che nella pratica alzano l'intensità di aiuto disponibile per gli investimenti localizzati nell'isola.",
      },
      {
        question: "Il compenso è legato all'ottenimento del contributo?",
        answer:
          "Concordiamo la struttura del corrispettivo prima dell'incarico, distinguendo l'attività di analisi e progettazione da quella eventuale di rendicontazione. Nessuna misura consente di garantire l'esito: la selezione è dell'amministrazione procedente.",
      },
    ],
    related: [
      { href: "/soluzioni/pianificazione-strategica", label: "Pianificazione strategica e controllo" },
      { href: "/soluzioni/business-intelligence-dati", label: "Business intelligence e dati" },
      { href: "/aree-di-intervento", label: "Aree di intervento" },
    ],
  },
  {
    slug: "pianificazione-strategica",
    metaTitle: "Pianificazione strategica e assetti",
    metaDescription:
      "Business plan, controllo di gestione e adeguati assetti ex art. 2086 c.c.: indicatori di allerta, scenari e decisioni documentate per l'organo amministrativo.",
    eyebrow: "Direzione e controllo",
    h1: "Pianificazione strategica e adeguati assetti",
    intro:
      "Dal 2019 la pianificazione non è più una buona pratica: l'organo amministrativo deve dotare l'impresa di assetti adeguati a rilevare tempestivamente la crisi. Costruiamo il piano, gli indicatori che lo monitorano e la documentazione che dimostra come le decisioni sono state prese.",
    cardSummary:
      "Business plan, budget, indicatori di allerta e assetti organizzativi verificabili.",
    serviceType: "Consulenza direzionale in pianificazione strategica, controllo di gestione e adeguati assetti",
    targetQueries: [
      "consulenza pianificazione strategica impresa",
      "adeguati assetti art. 2086 c.c. consulenza",
      "business plan per banche e finanziatori",
      "controllo di gestione per PMI",
      "consulenza direzionale Catania",
    ],
    sections: [
      {
        heading: "Che cosa chiede oggi la legge all'organo amministrativo",
        paragraphs: [
          "L'art. 2086 del codice civile impone all'imprenditore che opera in forma societaria o collettiva di istituire un assetto organizzativo, amministrativo e contabile adeguato alla natura e alle dimensioni dell'impresa, anche in funzione della rilevazione tempestiva della crisi e della perdita della continuità aziendale.",
          "Il codice della crisi d'impresa e dell'insolvenza dà contenuto a quel dovere: rilevazione degli squilibri patrimoniali ed economico-finanziari, verifica della sostenibilità dei debiti nei dodici mesi successivi, individuazione dei percorsi di risanamento e attivazione tempestiva degli strumenti previsti, fra cui la composizione negoziata.",
          "La conseguenza pratica riguarda la responsabilità: un assetto inadeguato è valutabile a carico degli amministratori indipendentemente dall'esito dell'impresa. Documentare il processo decisionale non è formalismo, è la prova di aver adempiuto.",
        ],
      },
      {
        heading: "Gli indicatori che vanno monitorati, e perché",
        paragraphs: [
          "Alcuni segnali sono tipizzati dalla legge e vanno tenuti sotto controllo continuo, perché superata la soglia scattano obblighi di attivazione e, per i creditori pubblici qualificati, obblighi di segnalazione all'impresa.",
        ],
        bullets: [
          "Debiti verso i dipendenti scaduti, in rapporto al monte retributivo.",
          "Debiti verso fornitori scaduti, in rapporto al totale dei debiti verso fornitori.",
          "Esposizioni verso banche e intermediari scadute o sconfinanti, in rapporto al totale delle esposizioni.",
          "Debiti tributari e contributivi scaduti oltre le soglie che attivano la segnalazione dell'ente creditore.",
          "Sostenibilità del servizio del debito nei dodici mesi, misurata sui flussi di cassa attesi e non sull'utile di bilancio.",
          "Indicatori settoriali specifici dell'impresa: margine di contribuzione per linea, rotazione del magazzino, concentrazione della clientela, tempi medi di incasso.",
        ],
      },
      {
        heading: "Il piano: come lo costruiamo",
        bullets: [
          "Diagnosi economico-finanziaria sui dati reali, con riclassificazione di bilancio e analisi dei flussi.",
          "Definizione degli obiettivi e delle iniziative, ciascuna con responsabile, tempi, risorse e indicatore di verifica.",
          "Modello economico-finanziario pluriennale con conto economico, stato patrimoniale e cash flow collegati fra loro.",
          "Analisi di scenario e stress-test sulle variabili che contano davvero: prezzi, volumi, costo del denaro, tempi di incasso.",
          "Budget annuale e articolazione mensile, con procedura di scostamento e riesame periodico.",
          "Verbalizzazione delle decisioni e delle verifiche, perché l'adeguatezza degli assetti si dimostra con i documenti.",
        ],
      },
      {
        heading: "Quando serve un piano che convince un terzo",
        paragraphs: [
          "Un piano ha destinatari esterni in molti passaggi della vita dell'impresa: istruttoria bancaria e rinnovo delle linee di credito, domanda di finanziamento agevolato, ingresso di un socio o cessione di quote, trattativa con i creditori, accesso a uno strumento di regolazione della crisi, gara che richiede solidità economico-finanziaria.",
          "In quei casi la differenza la fanno la coerenza fra numeri e documenti contabili, la tracciabilità delle assunzioni e la sobrietà delle previsioni: un piano ottimistico che non regge il primo trimestre pregiudica il rapporto con il finanziatore più di un piano prudente.",
        ],
      },
      {
        heading: "Assetti organizzativi: dalla struttura alle deleghe",
        paragraphs: [
          "La parte organizzativa dell'obbligo si traduce in scelte concrete: organigramma con responsabilità individuate, deleghe formalizzate con limiti di spesa, separazione fra chi decide, chi esegue e chi controlla, sistema informativo che produce dati tempestivi e attendibili.",
          "Interveniamo su questi elementi insieme alla parte contabile, perché un piano costruito su una contabilità che chiude con tre mesi di ritardo non può assolvere alla funzione di rilevazione tempestiva. Le valutazioni di natura legale su deleghe e responsabilità sono svolte in convenzione con lo Studio Legale Avv. Maria Puglisi, su autonomo mandato del cliente.",
        ],
      },
    ],
    faq: [
      {
        question: "L'obbligo di adeguati assetti riguarda anche le piccole imprese?",
        answer:
          "Riguarda l'imprenditore che opera in forma societaria o collettiva, con contenuto proporzionato alla natura e alle dimensioni dell'attività. In una piccola impresa l'adeguatezza si ottiene con pochi strumenti tenuti aggiornati, non con una struttura di controllo articolata.",
      },
      {
        question: "Che differenza c'è fra budget e piano strategico?",
        answer:
          "Il piano definisce dove l'impresa vuole arrivare e con quali iniziative, su un orizzonte pluriennale; il budget traduce il primo anno in numeri assegnati alle funzioni. Senza il secondo il piano non è verificabile, senza il primo il budget è una proiezione dell'esistente.",
      },
      {
        question: "Ogni quanto va aggiornato il piano?",
        answer:
          "Il monitoraggio degli indicatori è continuo, il riesame del piano è di regola trimestrale e comunque immediato al verificarsi di eventi rilevanti: perdita di un cliente principale, variazione del costo del denaro, investimento straordinario, segnalazione di un creditore pubblico qualificato.",
      },
      {
        question: "Il consulente sostituisce il commercialista dell'impresa?",
        answer:
          "No. Lavoriamo sui dati prodotti dalla contabilità e con il professionista che la cura: il nostro intervento riguarda la costruzione del piano, il sistema di controllo e la documentazione delle decisioni, non gli adempimenti dichiarativi.",
      },
    ],
    related: [
      { href: "/soluzioni/business-intelligence-dati", label: "Business intelligence e dati" },
      { href: "/soluzioni/finanziamenti-pubblici-investimenti", label: "Finanziamenti pubblici per investimenti" },
      { href: "/metodo", label: "Il metodo" },
    ],
  },
  {
    slug: "business-intelligence-dati",
    metaTitle: "Business intelligence e governo dei dati",
    metaDescription:
      "Dashboard, indicatori e previsioni costruiti sui dati gestionali dell'impresa: qualità del dato, automazione dei report e decisioni misurabili.",
    eyebrow: "Dati e decisioni",
    h1: "Business intelligence e governo dei dati",
    intro:
      "Il problema di quasi tutte le imprese non è la mancanza di dati: è che i dati stanno in sistemi che non si parlano e arrivano quando la decisione è già stata presa. Colleghiamo le fonti, definiamo gli indicatori che contano e automatizziamo i report, con controlli sulla qualità del dato.",
    cardSummary:
      "Indicatori, dashboard automatizzate e previsioni sui dati gestionali dell'impresa.",
    serviceType: "Consulenza in business intelligence, reportistica e analisi predittiva",
    targetQueries: [
      "business intelligence per PMI",
      "dashboard KPI aziendali consulenza",
      "consulenza analisi dati aziendali",
      "reportistica automatica controllo di gestione",
      "data governance impresa",
    ],
    sections: [
      {
        heading: "Partire dalle domande, non dagli strumenti",
        paragraphs: [
          "Un progetto di business intelligence fallisce quando comincia dalla piattaforma. La sequenza che funziona è opposta: individuare le decisioni ricorrenti che l'impresa deve prendere, definire quali indicatori le informano, verificare se i dati necessari esistono e sono attendibili, e solo allora scegliere lo strumento.",
          "Il criterio di successo non è il numero di grafici prodotti: è il numero di decisioni che vengono prese guardando la dashboard invece di chiedere un file all'amministrazione.",
        ],
      },
      {
        heading: "Che cosa comprende l'intervento",
        bullets: [
          "Inventario delle fonti: gestionale, contabilità, CRM, magazzino, produzione, presenze, fogli di calcolo ancora in uso.",
          "Definizione condivisa degli indicatori, con formula, perimetro, frequenza di aggiornamento e responsabile del dato.",
          "Integrazione e trasformazione dei dati, con procedure automatiche di caricamento e storicizzazione.",
          "Controlli di qualità: quadrature con la contabilità, valori anomali, dati mancanti, allineamento delle anagrafiche duplicate.",
          "Dashboard per destinatario — direzione, commerciale, produzione, amministrazione — con lo stesso dato alla base.",
          "Automazione della reportistica periodica e degli avvisi sulle soglie, che sostituiscono l'estrazione manuale.",
        ],
      },
      {
        heading: "Analisi predittiva: dove è utile e dove non lo è",
        paragraphs: [
          "Sui fenomeni con storia sufficiente e regolarità — domanda per linea di prodotto, stagionalità, incassi, consumi energetici — modelli statistici e di simulazione producono previsioni utili, con un intervallo di confidenza dichiarato. Su fenomeni rari o dipendenti da decisioni esterne, una previsione puntuale è un numero che dà falsa sicurezza.",
          "Distinguiamo i due casi in fase di analisi, e dichiariamo il margine di errore: un forecast usato per impegnare capitale deve dire anche quanto può sbagliare, altrimenti sposta il rischio invece di ridurlo.",
        ],
      },
      {
        heading: "Governo del dato e conformità",
        paragraphs: [
          "Aggregare dati d'impresa significa spesso trattare dati personali di dipendenti, clienti e fornitori: il progetto tiene conto delle basi giuridiche del trattamento, della minimizzazione, dei tempi di conservazione e dei profili di accesso, e per i soggetti destinatari delle regole sulla sicurezza informatica si coordina con i presidi tecnici e organizzativi già adottati.",
          "Definiamo perciò, insieme alla dashboard, chi vede che cosa e con quale livello di dettaglio: è un requisito di conformità e, allo stesso tempo, la condizione perché i dati sensibili dell'impresa non circolino via file allegati.",
        ],
      },
      {
        heading: "Come si integra con il controllo di gestione",
        paragraphs: [
          "Gli indicatori hanno valore quando alimentano un ciclo: budget, misurazione, analisi degli scostamenti, azione correttiva, riesame. Costruiamo la parte informativa dentro quel ciclo, così che le stesse grandezze usate nel piano siano quelle misurate a consuntivo.",
        ],
      },
    ],
    faq: [
      {
        question: "Serve cambiare il gestionale per avere una business intelligence?",
        answer:
          "Nella maggior parte dei casi no: si estraggono i dati dal sistema esistente e si costruisce il livello di analisi a monte della sostituzione. Cambiare gestionale è una decisione a sé, che va valutata sui processi e non sulla reportistica.",
      },
      {
        question: "Quanto tempo prima si vedono risultati?",
        answer:
          "Le prime dashboard su un ambito circoscritto — per esempio margine per cliente o scaduto — sono di norma operative in poche settimane. Il lavoro lungo è la qualità del dato e l'allineamento delle anagrafiche, che conviene affrontare progressivamente.",
      },
      {
        question: "Chi mantiene il sistema dopo la messa in esercizio?",
        answer:
          "Consegniamo documentazione, logiche di calcolo e procedure di caricamento, con formazione a chi resterà a presidiare il dato. Dove l'impresa non ha una funzione dedicata, il presidio può essere svolto in continuità da noi con un perimetro definito.",
      },
      {
        question: "Le previsioni sono affidabili?",
        answer:
          "Sono utili se accompagnate dal loro margine di errore e ricalcolate sui dati nuovi. Una previsione senza intervallo di confidenza non è un'informazione: dichiariamo sempre l'orizzonte, i limiti del modello e i casi in cui non è applicabile.",
      },
    ],
    related: [
      { href: "/soluzioni/pianificazione-strategica", label: "Pianificazione strategica e controllo" },
      { href: "/soluzioni/cybersecurity-nis2", label: "Cybersecurity e NIS2" },
      { href: "/aree-di-intervento", label: "Aree di intervento" },
    ],
  },
  {
    slug: "cybersecurity-nis2",
    metaTitle: "Cybersecurity e adempimenti NIS2",
    metaDescription:
      "Direttiva NIS2 e D.Lgs. 138/2024: verifica dell'ambito, registrazione, misure di gestione del rischio, notifica degli incidenti e raccordo con ISO 27001.",
    eyebrow: "Sicurezza e continuità",
    h1: "Cybersecurity e adempimenti NIS2",
    intro:
      "La NIS2 ha spostato la sicurezza informatica dal reparto tecnico al tavolo dell'organo amministrativo: gli obblighi riguardano la governance, la gestione del rischio nella catena di fornitura e la notifica degli incidenti in tempi stretti. Verifichiamo se l'impresa è nell'ambito e costruiamo i presidi che servono.",
    cardSummary:
      "Ambito NIS2, registrazione, misure di gestione del rischio, notifica incidenti e ISO 27001.",
    serviceType: "Consulenza sugli adempimenti in materia di sicurezza informatica e resilienza operativa",
    targetQueries: [
      "adempimenti NIS2 imprese",
      "D.Lgs. 138/2024 consulenza",
      "soggetto essenziale o importante NIS2 verifica",
      "notifica incidente informatico ACN",
      "consulenza cybersecurity aziendale Sicilia",
    ],
    sections: [
      {
        heading: "Chi rientra nell'ambito, e come si verifica",
        paragraphs: [
          "Il D.Lgs. 138/2024 ha recepito in Italia la direttiva NIS2, ampliando in modo consistente il perimetro rispetto alla disciplina precedente: settori ad alta criticità e altri settori critici, con qualificazione dei soggetti come essenziali o importanti in funzione dell'attività svolta e della dimensione dell'impresa.",
          "La verifica non è una lettura dell'elenco: richiede di esaminare le attività effettivamente esercitate, la posizione dell'impresa nella catena di fornitura di un soggetto in ambito, le soglie dimensionali e le ipotesi in cui la qualificazione prescinde dalla dimensione. L'esito determina obblighi, poteri di vigilanza applicabili e sanzioni, che nella disciplina europea sono commisurate al fatturato.",
          "Per i soggetti in ambito il primo adempimento è la registrazione sulla piattaforma dell'Agenzia per la cybersicurezza nazionale, con aggiornamento annuale nella finestra stabilita e comunicazione delle variazioni rilevanti.",
        ],
      },
      {
        heading: "Gli obblighi, in ordine di impatto organizzativo",
        bullets: [
          "Responsabilità dell'organo di amministrazione, che approva le misure di gestione del rischio, ne sorveglia l'attuazione e riceve formazione specifica.",
          "Analisi del rischio e politica di sicurezza dei sistemi informativi, con misure proporzionate e documentate.",
          "Gestione degli incidenti, con procedure di rilevazione, classificazione, risposta e ripristino.",
          "Continuità operativa e gestione delle crisi: backup verificati, piani di ripristino, prove periodiche.",
          "Sicurezza della catena di fornitura: requisiti contrattuali verso fornitori e prestatori di servizi, valutazione dei rischi che introducono.",
          "Igiene informatica di base, formazione del personale, autenticazione a più fattori e gestione degli accessi.",
          "Notifica degli incidenti significativi secondo la sequenza prevista: prima comunicazione entro le ventiquattro ore, notifica entro settantadue ore, relazione finale nei termini indicati dalla normativa.",
        ],
      },
      {
        heading: "Il divario tipico fra quanto è in essere e quanto è richiesto",
        paragraphs: [
          "Nelle imprese che incontriamo la tecnologia è spesso adeguata e la documentazione non lo è. Le lacune ricorrenti sono organizzative: nessuna delibera che approvi le misure, ruoli non assegnati, procedura di notifica assente o non provata, contratti con i fornitori privi di clausole sulla sicurezza e sugli obblighi di informazione tempestiva.",
          "Il rischio pratico è duplice: subire un incidente senza sapere chi fa che cosa nelle prime ore, e non essere in grado di dimostrare la conformità in caso di vigilanza. Entrambi si affrontano con lo stesso lavoro di formalizzazione.",
        ],
      },
      {
        heading: "Raccordo con ISO 27001 e con gli altri presidi",
        paragraphs: [
          "Un sistema di gestione della sicurezza delle informazioni conforme alla ISO/IEC 27001 copre buona parte dei requisiti tecnici e organizzativi richiesti, ma non li esaurisce: la NIS2 aggiunge la registrazione, gli obblighi di notifica verso l'autorità e la responsabilità dell'organo amministrativo.",
          "Impostiamo un'architettura unica in cui il sistema di gestione, gli adempimenti in materia di protezione dei dati personali, la continuità operativa e — per i soggetti interessati — gli obblighi settoriali condividono analisi del rischio, controlli e audit interno, invece di procedere in parallelo con documentazioni separate.",
        ],
      },
      {
        heading: "Come procediamo",
        bullets: [
          "Verifica dell'ambito di applicazione e qualificazione del soggetto, con nota motivata utilizzabile in sede di vigilanza.",
          "Registrazione e adempimenti informativi verso l'autorità competente.",
          "Gap analysis rispetto alle misure richieste, con piano di adeguamento per priorità e costi.",
          "Redazione delle politiche, delle procedure di incidente e del piano di continuità, con prova pratica delle procedure di notifica.",
          "Revisione dei contratti di fornitura sui profili di sicurezza, in convenzione con lo Studio Legale Avv. Maria Puglisi su autonomo mandato del cliente.",
          "Formazione differenziata per organo amministrativo, referenti tecnici e personale.",
        ],
      },
    ],
    faq: [
      {
        question: "Come si capisce se l'impresa è soggetta alla NIS2?",
        answer:
          "Si esaminano attività effettivamente svolte, settore di appartenenza, soglie dimensionali e casi in cui la qualificazione prescinde dalla dimensione, compresa la posizione nella catena di fornitura di un soggetto in ambito. L'esito va documentato: anche la conclusione di non applicabilità va motivata.",
      },
      {
        question: "Che cosa rischia concretamente un soggetto non conforme?",
        answer:
          "Poteri di vigilanza e ispezione dell'autorità, ordini di adeguamento e sanzioni amministrative pecuniarie di importo rilevante, commisurate al fatturato e differenziate fra soggetti essenziali e importanti, oltre alle conseguenze sulla responsabilità degli amministratori.",
      },
      {
        question: "La ISO 27001 basta per essere conformi?",
        answer:
          "È la base più solida, ma non è sufficiente: restano la registrazione presso l'autorità, le procedure di notifica degli incidenti nei termini previsti e gli obblighi che ricadono direttamente sull'organo amministrativo.",
      },
      {
        question: "Quanto tempo richiede un adeguamento?",
        answer:
          "Dipende dal punto di partenza. La verifica dell'ambito e la registrazione si chiudono in tempi brevi; le misure organizzative e la catena di fornitura richiedono di norma alcuni mesi, e conviene affrontarle per priorità di rischio anziché in un unico blocco.",
      },
    ],
    related: [
      { href: "/compliance#iso-27001", label: "ISO/IEC 27001" },
      { href: "/soluzioni/business-intelligence-dati", label: "Business intelligence e dati" },
      { href: "/aree-di-intervento", label: "Aree di intervento" },
    ],
  },
]

export const solutionSlugs = solutionLandings.map((landing) => landing.slug)

export function getSolutionLanding(slug: string): SolutionLanding | undefined {
  return solutionLandings.find((landing) => landing.slug === slug)
}
