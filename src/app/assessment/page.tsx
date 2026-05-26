"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Hero } from "@/components/ui/Hero"

const settori = [
  "Sanità",
  "Operazioni portuali",
  "Manifattura",
  "Costruzioni",
  "Servizi professionali",
  "ICT",
  "Pubblica amministrazione",
  "Terzo settore",
  "Altro",
] as const

const dipendenti = [
  "1-10",
  "11-50",
  "51-250",
  "251-1000",
  "oltre 1000",
] as const

const areeOptions = [
  "Compliance Strategica & Business Planning",
  "Automazione & Ottimizzazione dei Processi",
  "Finanza Controllo & Modellazione Predittiva",
  "Governance & Architettura Organizzativa",
  "Trasformazione Digitale & Compliance by Design",
  "Healthcare & Emergency Management",
  "Suite Compliance ISO/UNI",
] as const

const urgenzaOptions = [
  "Critica",
  "Alta",
  "Media",
  "Esplorativa",
] as const

const assessmentSchema = z.object({
  nome: z.string().min(1, "Campo obbligatorio"),
  email: z.string().email("Inserisci un indirizzo email valido"),
  ruolo: z.string().optional(),
  organizzazione: z.string().min(1, "Campo obbligatorio"),
  settore: z.string().min(1, "Seleziona un settore"),
  dipendenti: z.string().optional(),
  aree: z.array(z.string()).min(1, "Seleziona almeno un'area di interesse"),
  urgenza: z.string().min(1, "Seleziona il livello di urgenza"),
  descrizione: z
    .string()
    .min(200, "Minimo 200 caratteri")
    .max(2000, "Massimo 2000 caratteri"),
  consensoGdpr: z.literal(true, {
    message: "Il consenso è obbligatorio per procedere",
  }),
  consensoMarketing: z.boolean().optional(),
  website: z.string().max(0).optional(),
})

type AssessmentForm = z.infer<typeof assessmentSchema>

export default function AssessmentPage() {
  const router = useRouter()
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<AssessmentForm>({
    resolver: zodResolver(assessmentSchema),
    defaultValues: {
      aree: [],
      consensoGdpr: undefined,
      consensoMarketing: false,
      website: "",
    },
  })

  const descrizione = watch("descrizione") || ""

  async function onSubmit(data: AssessmentForm) {
    setServerError(null)
    try {
      const res = await fetch("/api/assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      const result = await res.json()
      if (res.ok && result.success) {
        router.push("/assessment/inviato")
      } else {
        setServerError(
          result.error || "Si è verificato un errore. Riprova più tardi."
        )
      }
    } catch {
      setServerError("Errore di rete. Verifica la connessione e riprova.")
    }
  }

  return (
    <>
      <Hero
        variant="compact"
        eyebrow="Assessment preliminare"
        title="Descrivi la situazione. Restituiamo entro 72 ore un'analisi sintetica dei profili di rischio."
        lead="Non un modulo di contatto generico, ma un questionario strutturato per consentire una restituzione tecnica già al primo contatto."
      />

      <section className="bg-paper py-20 lg:py-28">
        <div className="mx-auto max-w-2xl px-6 lg:px-12">
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-8"
          >
            {/* Honeypot */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input
                type="text"
                id="website"
                autoComplete="off"
                tabIndex={-1}
                {...register("website")}
              />
            </div>

            {/* Nome e cognome */}
            <div>
              <label
                htmlFor="nome"
                className="block text-caption text-graphite font-medium mb-2"
              >
                Nome e cognome <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="nome"
                autoComplete="name"
                aria-required="true"
                aria-describedby={errors.nome ? "nome-error" : undefined}
                className="w-full border border-mist rounded-md px-4 py-3 text-body text-ink bg-white focus:ring-2 focus:ring-brand-light focus:border-brand outline-none transition-shadow"
                {...register("nome")}
              />
              {errors.nome && (
                <p id="nome-error" role="alert" className="text-danger text-caption mt-1">
                  {errors.nome.message}
                </p>
              )}
            </div>

            {/* Email aziendale */}
            <div>
              <label
                htmlFor="email"
                className="block text-caption text-graphite font-medium mb-2"
              >
                Email aziendale <span className="text-danger">*</span>
              </label>
              <input
                type="email"
                id="email"
                autoComplete="email"
                aria-required="true"
                aria-describedby={errors.email ? "email-error" : undefined}
                className="w-full border border-mist rounded-md px-4 py-3 text-body text-ink bg-white focus:ring-2 focus:ring-brand-light focus:border-brand outline-none transition-shadow"
                {...register("email")}
              />
              {errors.email && (
                <p id="email-error" role="alert" className="text-danger text-caption mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Ruolo */}
            <div>
              <label
                htmlFor="ruolo"
                className="block text-caption text-graphite font-medium mb-2"
              >
                Ruolo
              </label>
              <input
                type="text"
                id="ruolo"
                autoComplete="organization-title"
                className="w-full border border-mist rounded-md px-4 py-3 text-body text-ink bg-white focus:ring-2 focus:ring-brand-light focus:border-brand outline-none transition-shadow"
                {...register("ruolo")}
              />
            </div>

            {/* Organizzazione */}
            <div>
              <label
                htmlFor="organizzazione"
                className="block text-caption text-graphite font-medium mb-2"
              >
                Organizzazione <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="organizzazione"
                autoComplete="organization"
                aria-required="true"
                aria-describedby={errors.organizzazione ? "organizzazione-error" : undefined}
                className="w-full border border-mist rounded-md px-4 py-3 text-body text-ink bg-white focus:ring-2 focus:ring-brand-light focus:border-brand outline-none transition-shadow"
                {...register("organizzazione")}
              />
              {errors.organizzazione && (
                <p id="organizzazione-error" role="alert" className="text-danger text-caption mt-1">
                  {errors.organizzazione.message}
                </p>
              )}
            </div>

            {/* Settore */}
            <div>
              <label
                htmlFor="settore"
                className="block text-caption text-graphite font-medium mb-2"
              >
                Settore <span className="text-danger">*</span>
              </label>
              <select
                id="settore"
                aria-required="true"
                aria-describedby={errors.settore ? "settore-error" : undefined}
                className="w-full border border-mist rounded-md px-4 py-3 text-body text-ink bg-white focus:ring-2 focus:ring-brand-light focus:border-brand outline-none transition-shadow"
                defaultValue=""
                {...register("settore")}
              >
                <option value="" disabled>
                  Seleziona settore
                </option>
                {settori.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              {errors.settore && (
                <p id="settore-error" role="alert" className="text-danger text-caption mt-1">
                  {errors.settore.message}
                </p>
              )}
            </div>

            {/* Numero dipendenti */}
            <div>
              <label
                htmlFor="dipendenti"
                className="block text-caption text-graphite font-medium mb-2"
              >
                Numero dipendenti
              </label>
              <select
                id="dipendenti"
                className="w-full border border-mist rounded-md px-4 py-3 text-body text-ink bg-white focus:ring-2 focus:ring-brand-light focus:border-brand outline-none transition-shadow"
                defaultValue=""
                {...register("dipendenti")}
              >
                <option value="">Non specificato</option>
                {dipendenti.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            {/* Aree di interesse */}
            <fieldset>
              <legend className="block text-caption text-graphite font-medium mb-3">
                Aree di interesse <span className="text-danger">*</span>
              </legend>
              <div className="space-y-3">
                {areeOptions.map((area) => (
                  <label
                    key={area}
                    className="flex items-start gap-3 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      value={area}
                      className="mt-1 h-4 w-4 rounded border-mist text-brand focus:ring-brand-light"
                      {...register("aree")}
                    />
                    <span className="text-body text-graphite">{area}</span>
                  </label>
                ))}
              </div>
              {errors.aree && (
                <p id="aree-error" role="alert" className="text-danger text-caption mt-1">
                  {errors.aree.message}
                </p>
              )}
            </fieldset>

            {/* Livello di urgenza */}
            <fieldset>
              <legend className="block text-caption text-graphite font-medium mb-3">
                Livello di urgenza <span className="text-danger">*</span>
              </legend>
              <div className="flex flex-wrap gap-4">
                {urgenzaOptions.map((u) => (
                  <label
                    key={u}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      value={u}
                      className="h-4 w-4 border-mist text-brand focus:ring-brand-light"
                      {...register("urgenza")}
                    />
                    <span className="text-body text-graphite">{u}</span>
                  </label>
                ))}
              </div>
              {errors.urgenza && (
                <p id="urgenza-error" role="alert" className="text-danger text-caption mt-1">
                  {errors.urgenza.message}
                </p>
              )}
            </fieldset>

            {/* Descrizione */}
            <div>
              <label
                htmlFor="descrizione"
                className="block text-caption text-graphite font-medium mb-2"
              >
                Descrizione della situazione{" "}
                <span className="text-danger">*</span>
              </label>
              <textarea
                id="descrizione"
                rows={8}
                aria-required="true"
                aria-describedby={`descrizione-counter${errors.descrizione ? " descrizione-error" : ""}`}
                className="w-full border border-mist rounded-md px-4 py-3 text-body text-ink bg-white focus:ring-2 focus:ring-brand-light focus:border-brand outline-none transition-shadow resize-y"
                {...register("descrizione")}
              />
              <div className="flex justify-between mt-1">
                {errors.descrizione ? (
                  <p id="descrizione-error" role="alert" className="text-danger text-caption">
                    {errors.descrizione.message}
                  </p>
                ) : (
                  <span />
                )}
                <span
                  id="descrizione-counter"
                  aria-live="polite"
                  className={`text-caption ${
                    descrizione.length > 2000
                      ? "text-danger"
                      : descrizione.length >= 200
                        ? "text-success"
                        : "text-fog"
                  }`}
                >
                  {descrizione.length}/2000
                </span>
              </div>
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
                  Acconsento al trattamento dei dati personali per la finalità
                  di gestione della richiesta di assessment, ai sensi del Reg.
                  UE 2016/679. Informativa completa nella pagina{" "}
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
                <p id="consensoGdpr-error" role="alert" className="text-danger text-caption mt-1">
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
              {isSubmitting ? "Invio in corso..." : "Invia richiesta"}
            </button>
          </form>
        </div>
      </section>
    </>
  )
}
