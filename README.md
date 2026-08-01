# GM Consulting S.r.l. — Sito istituzionale

Sito istituzionale di **GM Consulting S.r.l.**, società di consulenza direzionale, architettura di compliance e automazione dei processi.

## Stack

| Componente | Versione |
|---|---|
| Next.js | 14.2 (App Router) |
| TypeScript | 5.x (`strict: true`) |
| Tailwind CSS | 3.4 |
| React | 18.x |
| lucide-react | Iconografia vettoriale |
| react-hook-form + Zod | Validazione form |
| Resend | Email transazionale |
| next-mdx-remote + gray-matter | Articoli Insights |

## Prerequisiti

- Node.js ≥ 20
- pnpm

## Setup locale

```bash
pnpm install
cp .env.example .env.local
# Compilare le variabili in .env.local (vedi sezione successiva)
pnpm dev
```

Il sito sarà disponibile su `http://localhost:3000`.

## Variabili d'ambiente

Consultare `.env.example` per l'elenco completo.

| Variabile | Descrizione | Obbligatoria |
|---|---|---|
| `RESEND_API_KEY` | API key di Resend per l'invio email dal form Assessment | Sì (produzione) |
| `ASSESSMENT_NOTIFY_EMAIL` | Indirizzo di destinazione delle notifiche assessment (default: info@gmconsulting.one) | No |
| `PROTOCOLLO23_NOTIFY_EMAIL` | Indirizzo per notifiche del form Protocollo 23 (fallback su `ASSESSMENT_NOTIFY_EMAIL`) | No |
| `NEXT_PUBLIC_SITE_ANALYTICS_ENABLED` | Feature flag del collector; mantenere `false` fino al cutover autorizzato | No |
| `NEXT_PUBLIC_SUPABASE_URL` | URL pubblico del progetto Supabase dedicato | Solo con analytics attivo |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Chiave pubblicabile del progetto; non è una chiave privilegiata | Solo con analytics attivo |

### Configurazione Resend

1. Creare un account su [resend.com](https://resend.com)
2. Verificare il dominio `gmconsulting.one` (DNS records MX/SPF/DKIM)
3. Generare una API key e inserirla in `RESEND_API_KEY`
4. Il mittente configurato è `assessment@gmconsulting.one`

## Comandi

```bash
pnpm dev        # Server di sviluppo
pnpm build      # Build di produzione
pnpm start      # Avvia build di produzione
pnpm lint       # ESLint
pnpm typecheck  # Verifica tipi TypeScript
pnpm test       # Test unitari privacy e contratto eventi
pnpm check      # Typecheck, test, lint e build
pnpm format     # Formattazione (richiede prettier)
```

## Deploy su Vercel

1. Collegare il repository GitHub a Vercel
2. Impostare le variabili d'ambiente nel pannello Vercel
3. Il deploy di produzione segue il branch configurato in Vercel; le PR generano anteprime isolate

Dominio di produzione: `www.gmconsulting.one`

## Struttura del progetto

```
src/
├── app/
│   ├── layout.tsx              # Root layout (font, metadata, JSON-LD, Header, Footer)
│   ├── page.tsx                # Homepage
│   ├── metodo/page.tsx         # Il metodo GM (4 fasi)
│   ├── aree-di-intervento/     # Capabilities (6 aree)
│   ├── compliance/             # Suite Compliance (8 standard)
│   ├── insights/               # Lista articoli + [slug] dinamico
│   ├── assessment/             # Form assessment + pagina conferma
│   ├── protocollo-23/         # Pagina Protocollo 23 (AML per professionisti)
│   │   └── inviato/           # Conferma invio form
│   ├── convenzione-studio/     # Convenzione Studio Legale
│   ├── note-legali/            # Privacy, Cookie, Note legali
│   ├── api/assessment/         # API route per invio form assessment
│   ├── api/protocollo-23/      # API route per il form di Diagnostico AML
│   ├── sitemap.ts              # Sitemap dinamica
│   └── robots.ts               # robots.txt
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── CookieBanner.tsx
│   └── ui/                     # Componenti riutilizzabili
└── lib/
    └── utils.ts                # Utility (cn)
content/
└── insights/*.mdx              # Articoli in formato MDX
```

## Note di follow-up

- **Numero di telefono**: il numero di telefono operativo di GM Consulting non è ancora attivato. Quando disponibile, aggiungerlo in: (a) Footer.tsx colonna contatti, (b) schema.org Organization in layout.tsx, (c) pagina Note legali sezione contatti del titolare del trattamento.
- **Analytics**: il collector first-party è disabilitato di default e non crea sessioni né richieste senza feature flag, configurazione e consenso analitico esplicito. Migrazione, test e rollout sono descritti in `supabase/README.md`.
- **Logo**: il sito utilizza un logotipo testuale. Un logo grafico può essere aggiunto in `public/` e referenziato nel componente Header.
- **Articoli Insights**: i tre articoli iniziali contengono struttura e headings completi con segnaposto editoriale (`<!-- editoriale in fase di redazione finale -->`). Completare il corpo degli articoli.

## Deviazioni dal brief

| Deviazione | Motivazione tecnica |
|---|---|
| shadcn/ui non installato via CLI | La CLI shadcn richiede interazione terminale interattiva incompatibile con l'ambiente di build automatizzato. Le dipendenze base (class-variance-authority, clsx, tailwind-merge, tailwindcss-animate) sono installate manualmente e i componenti UI sono costruiti con le stesse convenzioni architetturali. |
| Protezione moduli pubblici | I moduli esistenti usano validazione e honeypot. Rate limiting persistente e Turnstile restano un intervento separato dal sistema analytics. |
