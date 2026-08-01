# Analytics e insight privacy-first

Questa directory contiene il collector Edge, una migrazione versionata e i
test SQL rollback-only del sistema analytics di GM Consulting.

## Contratto minimizzato

Il browser invia eventi solo quando sono contemporaneamente presenti:

1. `NEXT_PUBLIC_SITE_ANALYTICS_ENABLED=true`;
2. URL e chiave pubblica Supabase;
3. consenso esplicito alla categoria analitica.

Gli unici eventi ammessi sono `page_view`, `cta_click` e `lead_submit`. Il
payload contiene pathname da allowlist, lingua `it`, UUID casuale limitato alla
sessione del tab e, quando necessario, un target enumerato. Non accetta né
salva IP, referrer, query string, contatti, testo dei moduli o user ID.

Le infrastrutture Vercel e Supabase trattano comunque i normali metadati di
rete necessari a ricevere le richieste; tali metadati non vengono copiati nelle
tabelle applicative.

## Dati e retention

- `analytics_events`: eventi grezzi pseudonimi, 90 giorni;
- `analytics_daily_metrics`: conteggi UTC giornalieri, 400 giorni;
- `site_insights`: confronti deterministici, 365 giorni.

Il job `gm-site-insights-daily` viene eseguito alle 03:37 UTC. La funzione
`refresh_site_insights()` ricostruisce in modo idempotente gli ultimi 14 giorni
completi, produce soltanto insight sopra le soglie documentate ed esegue le
retention.

Lo staff può leggere i dati solo con un JWT autenticato il cui
`app_metadata.role` sia `staff` o `admin`. Non viene creato alcun pannello finché
non esisteranno autenticazione e destinazione autorizzate.

## Soglie

- variazione traffico: almeno 20 page view in ciascuna settimana e variazione
  assoluta almeno del 30%;
- calo conversione: almeno 100 page view in ciascuna settimana, almeno 3 invii
  nella settimana di confronto e calo relativo almeno del 30%.

Gli insight dichiarano sempre che l'associazione osservata non prova causalità.

## Dry-run obbligatorio

La migrazione non deve essere applicata da Vercel o automaticamente dalla PR.
Sul progetto attivo va eseguita una singola transazione composta da:

```sql
begin;
-- contenuto di migrations/20260801143000_add_privacy_first_site_insights.sql
-- contenuto di tests/20260801143000_add_privacy_first_site_insights.sql
rollback;
```

Al termine, una nuova sessione indipendente deve eseguire
`tests/verify_rollback_clean.sql`. Il risultato atteso è `rollback-clean` e
nessuna tabella, funzione, job o riga sintetica persistente.

## Cutover protetto

Prima del merge e di qualsiasi configurazione permanente sono richiesti:

1. CI e Preview Vercel verdi con feature flag disabilitata;
2. dry-run e verifica indipendente dell'annullamento;
3. autorizzazione esplicita dell'utente.

Dopo l'autorizzazione si applicherà esattamente la migrazione versionata, si
distribuirà la Edge Function con allowlist delle sole origini autorizzate, si
verificheranno RLS, grant, funzione e cron e solo allora verrà abilitata la
feature flag.
