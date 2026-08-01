"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { trackSiteEvent } from "@/lib/site-analytics"

const categoriaOptions = [
  "Notaio",
  "Avvocato",
  "Dottore Commercialista",
  "Studio multidisciplinare",
  "Altro",
] as const

const professionistiOptions = ["1", "2-5", "6-15", "oltre 15"] as const

const onboardingOptions = [
  "Meno di 50",
  "50-200",
  "201-500",
  "oltre 500",
] as const

const statoAmlOptions = [
  "Manuale AML formalizzato e operativo",
  "Manuale AML formalizzato ma applicazione disomogenea",
  "Procedura informale",
  "Da costruire ex novo",
  "Non so",
] as const

const tierInteresseOptions = [
  "Diagnostico AML",
  "Metodo AML",
  "Suite Continua",
  "Premium Notai",
  "Non so, consigliatemi voi",
] as const

const protocollo23Schema = z.object({
  nome: z.string().min(1, "Campo obbligatorio"),
  email: z.string().email("Inserisci un indirizzo email valido"),
  telefono: z.string().optional(),
  categoria: z.string().min(1, "Seleziona la categoria professionale"),
  studio: z.string().min(1, "Campo obbligatorio"),
  professionisti: z.string().min(1, "Seleziona il numero di professionisti"),
  onboarding: z.string().optional(),
  statoAml: z.string().min(1, "Seleziona lo stato attuale"),
  tierInteresse: z.string().optional(),
  note: z.string().max(1000).optional(),
  consensoGdpr: z.literal(true, {
    message: "Il consenso è obbligatorio per procedere",
  }),
  consensoMarketing: z.boolean().optional(),
  website: z.string().max(0).optional(),
})

type Protocollo23Form = z.infer<typeof protocollo23Schema>

export function FormProtocollo23() {
  const router = useRouter()
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Protocollo23Form>({
    resolver: zodResolver(protocollo23Schema),
    defaultValues: {
      consensoGdpr: undefined,
      consensoMarketing: false,
      website: "",
    },
  })

  async function onSubmit(data: Protocollo23Form) {
    setServerError(null)
    try {
      const res = await fetch("/api/protocollo-23", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      const result = await res.json()
      if (res.ok && result.success) {
        await trackSiteEvent({
          eventName: "lead_submit",
          pagePath: "/protocollo-23",
          target: "protocollo_23",
        })
        router.push("/protocollo-23/inviato")
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
    <div className="mx-auto max-w-2xl">
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
            aria-describedby={errors.nome ? "p23-nome-error" : undefined}
            className="w-full border border-mist rounded-md px-4 py-3 text-body text-ink bg-white focus:ring-2 focus:ring-brand-light focus:border-brand outline-none transition-colors"
            {...register("nome")}
          />
          {errors.nome && (
            <p id="p23-nome-error" role="alert" className="text-danger text-caption mt-1">
              {errors.nome.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-caption text-graphite font-medium mb-2"
          >
            Email <span className="text-danger">*</span>
          </label>
          <input
            type="email"
            id="email"
            autoComplete="email"
            aria-required="true"
            aria-describedby={errors.email ? "p23-email-error" : undefined}
            className="w-full border border-mist rounded-md px-4 py-3 text-body text-ink bg-white focus:ring-2 focus:ring-brand-light focus:border-brand outline-none transition-colors"
            {...register("email")}
          />
          {errors.email && (
            <p id="p23-email-error" role="alert" className="text-danger text-caption mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Telefono */}
        <div>
          <label
            htmlFor="telefono"
            className="block text-caption text-graphite font-medium mb-2"
          >
            Telefono
          </label>
          <input
            type="tel"
            id="telefono"
            autoComplete="tel"
            className="w-full border border-mist rounded-md px-4 py-3 text-body text-ink bg-white focus:ring-2 focus:ring-brand-light focus:border-brand outline-none transition-colors"
            {...register("telefono")}
          />
        </div>

        {/* Categoria professionale */}
        <fieldset>
          <legend className="block text-caption text-graphite font-medium mb-3">
            Categoria professionale <span className="text-danger">*</span>
          </legend>
          <div className="space-y-3">
            {categoriaOptions.map((cat) => (
              <label
                key={cat}
                className="flex items-center gap-3 cursor-pointer"
              >
                <input
                  type="radio"
                  value={cat}
                  className="h-4 w-4 border-mist text-brand focus:ring-brand-light"
                  {...register("categoria")}
                />
                <span className="text-body text-graphite">{cat}</span>
              </label>
            ))}
          </div>
          {errors.categoria && (
            <p id="p23-categoria-error" role="alert" className="text-danger text-caption mt-1">
              {errors.categoria.message}
            </p>
          )}
        </fieldset>

        {/* Nome dello studio */}
        <div>
          <label
            htmlFor="studio"
            className="block text-caption text-graphite font-medium mb-2"
          >
            Nome dello studio <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            id="studio"
            autoComplete="organization"
            aria-required="true"
            aria-describedby={errors.studio ? "p23-studio-error" : undefined}
            className="w-full border border-mist rounded-md px-4 py-3 text-body text-ink bg-white focus:ring-2 focus:ring-brand-light focus:border-brand outline-none transition-colors"
            {...register("studio")}
          />
          {errors.studio && (
            <p id="p23-studio-error" role="alert" className="text-danger text-caption mt-1">
              {errors.studio.message}
            </p>
          )}
        </div>

        {/* Numero di professionisti */}
        <div>
          <label
            htmlFor="professionisti"
            className="block text-caption text-graphite font-medium mb-2"
          >
            Numero di professionisti <span className="text-danger">*</span>
          </label>
          <select
            id="professionisti"
            aria-required="true"
            aria-describedby={errors.professionisti ? "p23-professionisti-error" : undefined}
            className="w-full border border-mist rounded-md px-4 py-3 text-body text-ink bg-white focus:ring-2 focus:ring-brand-light focus:border-brand outline-none transition-colors"
            defaultValue=""
            {...register("professionisti")}
          >
            <option value="" disabled>
              Seleziona
            </option>
            {professionistiOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {errors.professionisti && (
            <p id="p23-professionisti-error" role="alert" className="text-danger text-caption mt-1">
              {errors.professionisti.message}
            </p>
          )}
        </div>

        {/* Onboarding annuali */}
        <div>
          <label
            htmlFor="onboarding"
            className="block text-caption text-graphite font-medium mb-2"
          >
            Onboarding clienti annui (stima)
          </label>
          <select
            id="onboarding"
            className="w-full border border-mist rounded-md px-4 py-3 text-body text-ink bg-white focus:ring-2 focus:ring-brand-light focus:border-brand outline-none transition-colors"
            defaultValue=""
            {...register("onboarding")}
          >
            <option value="">Non specificato</option>
            {onboardingOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Stato attuale AML */}
        <div>
          <label
            htmlFor="statoAml"
            className="block text-caption text-graphite font-medium mb-2"
          >
            Stato attuale della procedura AML <span className="text-danger">*</span>
          </label>
          <select
            id="statoAml"
            aria-required="true"
            aria-describedby={errors.statoAml ? "p23-statoAml-error" : undefined}
            className="w-full border border-mist rounded-md px-4 py-3 text-body text-ink bg-white focus:ring-2 focus:ring-brand-light focus:border-brand outline-none transition-colors"
            defaultValue=""
            {...register("statoAml")}
          >
            <option value="" disabled>
              Seleziona
            </option>
            {statoAmlOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {errors.statoAml && (
            <p id="p23-statoAml-error" role="alert" className="text-danger text-caption mt-1">
              {errors.statoAml.message}
            </p>
          )}
        </div>

        {/* Tier di interesse */}
        <div>
          <label
            htmlFor="tierInteresse"
            className="block text-caption text-graphite font-medium mb-2"
          >
            Componente di interesse
          </label>
          <select
            id="tierInteresse"
            className="w-full border border-mist rounded-md px-4 py-3 text-body text-ink bg-white focus:ring-2 focus:ring-brand-light focus:border-brand outline-none transition-colors"
            defaultValue=""
            {...register("tierInteresse")}
          >
            <option value="">Non specificato</option>
            {tierInteresseOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Note */}
        <div>
          <label
            htmlFor="note"
            className="block text-caption text-graphite font-medium mb-2"
          >
            Note aggiuntive
          </label>
          <textarea
            id="note"
            rows={5}
            className="w-full border border-mist rounded-md px-4 py-3 text-body text-ink bg-white focus:ring-2 focus:ring-brand-light focus:border-brand outline-none transition-colors resize-y"
            {...register("note")}
          />
          {errors.note && (
            <p id="p23-note-error" role="alert" className="text-danger text-caption mt-1">
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
              Acconsento al trattamento dei dati personali per la finalità
              di gestione della richiesta, ai sensi del Reg. UE 2016/679.
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
            <p id="p23-consensoGdpr-error" role="alert" className="text-danger text-caption mt-1">
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
          {isSubmitting ? "Invio in corso..." : "Richiedi Diagnostico AML"}
        </button>
      </form>
    </div>
  )
}
