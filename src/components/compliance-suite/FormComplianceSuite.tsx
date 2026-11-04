"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { useState } from "react"

const dipendentiOptions = ["1-9", "10-49", "50-249", "oltre 249"] as const

const ambitiOptions = [
  "GDPR",
  "NIS2",
  "D.Lgs. 231/2001",
  "Adeguati assetti",
  "Antiriciclaggio",
  "ISO/IEC 27001",
  "ISO 37001",
  "ISO 22301",
  "Salute e sicurezza (DVR / DUVRI)",
  "Appalti e self-cleaning",
  "Voucher Cloud & Cybersecurity",
  "Da individuare in sede di demo",
] as const

const statoComplianceOptions = [
  "Nessun presidio strutturato",
  "Adempimenti distribuiti fra più consulenti",
  "Funzione interna da integrare",
  "Da valutare",
] as const

const complianceSuiteSchema = z.object({
  nome: z.string().min(1, "Campo obbligatorio"),
  email: z.string().email("Indicare un indirizzo email valido"),
  telefono: z.string().optional(),
  ragioneSociale: z.string().min(1, "Campo obbligatorio"),
  settore: z.string().min(1, "Campo obbligatorio"),
  dipendenti: z.string().min(1, "Selezionare il numero di dipendenti"),
  ambiti: z.array(z.string()).optional(),
  statoCompliance: z.string().min(1, "Selezionare lo stato attuale"),
  note: z.string().max(1000).optional(),
  consensoGdpr: z.literal(true, {
    message: "Il consenso è obbligatorio per procedere",
  }),
  consensoMarketing: z.boolean().optional(),
  website: z.string().max(0).optional(),
})

type ComplianceSuiteForm = z.infer<typeof complianceSuiteSchema>

const inputClass =
  "w-full border border-mist rounded-md px-4 py-3 text-body text-ink bg-white focus:ring-2 focus:ring-brand-light focus:border-brand outline-none transition-colors"

export function FormComplianceSuite() {
  const router = useRouter()
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ComplianceSuiteForm>({
    resolver: zodResolver(complianceSuiteSchema),
    defaultValues: {
      ambiti: [],
      consensoGdpr: undefined,
      consensoMarketing: false,
      website: "",
    },
  })

  async function onSubmit(data: ComplianceSuiteForm) {
    setServerError(null)
    try {
      const res = await fetch("/api/compliance-suite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      const result = await res.json()
      if (res.ok && result.success) {
        // Tracciamento lead non attivo: lo schema analytics (Supabase) ammette
        // solo i target e i percorsi censiti; l'estensione a /compliance-suite
        // richiede una migrazione dedicata.
        router.push("/compliance-suite/inviato")
      } else {
        setServerError(
          result.error || "Si è verificato un errore. Riprovare più tardi."
        )
      }
    } catch {
      setServerError("Errore di rete: verificare la connessione e riprovare.")
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-8">
        {/* Honeypot */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="cs-website">Website</label>
          <input
            type="text"
            id="cs-website"
            autoComplete="off"
            tabIndex={-1}
            {...register("website")}
          />
        </div>

        {/* Nome e cognome */}
        <div>
          <label htmlFor="cs-nome" className="block text-caption text-graphite font-medium mb-2">
            Nome e cognome <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            id="cs-nome"
            autoComplete="name"
            aria-required="true"
            aria-describedby={errors.nome ? "cs-nome-error" : undefined}
            className={inputClass}
            {...register("nome")}
          />
          {errors.nome && (
            <p id="cs-nome-error" role="alert" className="text-danger text-caption mt-1">
              {errors.nome.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="cs-email" className="block text-caption text-graphite font-medium mb-2">
            Email <span className="text-danger">*</span>
          </label>
          <input
            type="email"
            id="cs-email"
            autoComplete="email"
            aria-required="true"
            aria-describedby={errors.email ? "cs-email-error" : undefined}
            className={inputClass}
            {...register("email")}
          />
          {errors.email && (
            <p id="cs-email-error" role="alert" className="text-danger text-caption mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Telefono */}
        <div>
          <label htmlFor="cs-telefono" className="block text-caption text-graphite font-medium mb-2">
            Telefono
          </label>
          <input
            type="tel"
            id="cs-telefono"
            autoComplete="tel"
            className={inputClass}
            {...register("telefono")}
          />
        </div>

        {/* Ragione sociale */}
        <div>
          <label htmlFor="cs-ragione" className="block text-caption text-graphite font-medium mb-2">
            Ragione sociale <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            id="cs-ragione"
            autoComplete="organization"
            aria-required="true"
            aria-describedby={errors.ragioneSociale ? "cs-ragione-error" : undefined}
            className={inputClass}
            {...register("ragioneSociale")}
          />
          {errors.ragioneSociale && (
            <p id="cs-ragione-error" role="alert" className="text-danger text-caption mt-1">
              {errors.ragioneSociale.message}
            </p>
          )}
        </div>

        {/* Settore */}
        <div>
          <label htmlFor="cs-settore" className="block text-caption text-graphite font-medium mb-2">
            Settore di attività <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            id="cs-settore"
            aria-required="true"
            aria-describedby={errors.settore ? "cs-settore-error" : undefined}
            className={inputClass}
            {...register("settore")}
          />
          {errors.settore && (
            <p id="cs-settore-error" role="alert" className="text-danger text-caption mt-1">
              {errors.settore.message}
            </p>
          )}
        </div>

        {/* Numero di dipendenti */}
        <div>
          <label htmlFor="cs-dipendenti" className="block text-caption text-graphite font-medium mb-2">
            Numero di dipendenti <span className="text-danger">*</span>
          </label>
          <select
            id="cs-dipendenti"
            aria-required="true"
            aria-describedby={errors.dipendenti ? "cs-dipendenti-error" : undefined}
            className={inputClass}
            defaultValue=""
            {...register("dipendenti")}
          >
            <option value="" disabled>
              Selezionare
            </option>
            {dipendentiOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {errors.dipendenti && (
            <p id="cs-dipendenti-error" role="alert" className="text-danger text-caption mt-1">
              {errors.dipendenti.message}
            </p>
          )}
        </div>

        {/* Ambiti di interesse */}
        <fieldset>
          <legend className="block text-caption text-graphite font-medium mb-3">
            Ambiti di interesse (scelta multipla)
          </legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {ambitiOptions.map((ambito) => (
              <label key={ambito} className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  value={ambito}
                  className="mt-1 h-4 w-4 rounded border-mist text-brand focus:ring-brand-light"
                  {...register("ambiti")}
                />
                <span className="text-body text-graphite">{ambito}</span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* Stato attuale della compliance */}
        <div>
          <label htmlFor="cs-stato" className="block text-caption text-graphite font-medium mb-2">
            Stato attuale della compliance <span className="text-danger">*</span>
          </label>
          <select
            id="cs-stato"
            aria-required="true"
            aria-describedby={errors.statoCompliance ? "cs-stato-error" : undefined}
            className={inputClass}
            defaultValue=""
            {...register("statoCompliance")}
          >
            <option value="" disabled>
              Selezionare
            </option>
            {statoComplianceOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {errors.statoCompliance && (
            <p id="cs-stato-error" role="alert" className="text-danger text-caption mt-1">
              {errors.statoCompliance.message}
            </p>
          )}
        </div>

        {/* Note */}
        <div>
          <label htmlFor="cs-note" className="block text-caption text-graphite font-medium mb-2">
            Note aggiuntive
          </label>
          <textarea
            id="cs-note"
            rows={5}
            className={`${inputClass} resize-y`}
            {...register("note")}
          />
          {errors.note && (
            <p id="cs-note-error" role="alert" className="text-danger text-caption mt-1">
              {errors.note.message}
            </p>
          )}
        </div>

        {/* Consenso GDPR */}
        <div>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 rounded border-mist text-brand focus:ring-brand-light"
              {...register("consensoGdpr")}
            />
            <span className="text-caption text-graphite">
              Acconsento al trattamento dei dati personali per la finalità di
              gestione della richiesta, ai sensi del Reg. UE 2016/679.
              Informativa completa nella pagina{" "}
              <a
                href="/note-legali#privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand hover:underline"
              >
                Note legali
              </a>
              . <span className="text-danger">*</span>
            </span>
          </label>
          {errors.consensoGdpr && (
            <p id="cs-consensoGdpr-error" role="alert" className="text-danger text-caption mt-1">
              {errors.consensoGdpr.message}
            </p>
          )}
        </div>

        {/* Consenso marketing */}
        <div>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 rounded border-mist text-brand focus:ring-brand-light"
              {...register("consensoMarketing")}
            />
            <span className="text-caption text-graphite">
              Acconsento a ricevere comunicazioni commerciali e materiale
              editoriale di GM Consulting S.r.l. ai sensi dell&apos;art. 130
              D.Lgs. 196/2003.
            </span>
          </label>
        </div>

        {/* Server error */}
        {serverError && (
          <div role="alert" className="bg-danger/5 border border-danger/20 rounded-md p-4">
            <p className="text-danger text-caption">{serverError}</p>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-brand text-white py-3 font-medium rounded-md hover:bg-brand-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-brand-light focus-visible:ring-offset-2"
        >
          {isSubmitting ? "Invio in corso…" : "Richiedi una demo"}
        </button>
      </form>
    </div>
  )
}
