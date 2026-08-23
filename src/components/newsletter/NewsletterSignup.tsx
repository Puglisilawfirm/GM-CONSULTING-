"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { Mail } from "lucide-react"
import { newsletterSchema, type NewsletterInput, type NewsletterSource } from "@/lib/newsletter"

interface NewsletterSignupProps {
  source: NewsletterSource
  variant?: "panel" | "footer"
}

export function NewsletterSignup({ source, variant = "panel" }: NewsletterSignupProps) {
  const [serverError, setServerError] = useState<string | null>(null)
  const [subscribed, setSubscribed] = useState(false)
  const isFooter = variant === "footer"

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterInput>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { source, consensoNewsletter: undefined, website: "" },
  })

  async function onSubmit(data: NewsletterInput) {
    setServerError(null)
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      const result = await res.json()
      if (res.ok && result.success) {
        setSubscribed(true)
      } else {
        setServerError(result.error || "Si è verificato un errore. Riprova più tardi.")
      }
    } catch {
      setServerError("Errore di rete. Verifica la connessione e riprova.")
    }
  }

  const fieldId = `newsletter-${source}`
  const labelClass = isFooter
    ? "block text-caption text-paper-200 font-medium mb-2"
    : "block text-caption text-graphite font-medium mb-2"
  const inputClass = isFooter
    ? "w-full rounded-md border border-navy-800 bg-navy-900 px-4 py-3 text-body text-paper-50 outline-none transition-colors focus:border-gold-400 focus:ring-2 focus:ring-gold-400/40"
    : "w-full rounded-md border border-mist bg-white px-4 py-3 text-body text-ink outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand-light"
  const consentClass = isFooter ? "text-caption text-paper-200" : "text-caption text-steel"

  if (subscribed) {
    return (
      <div role="status" className={isFooter ? "text-sm text-paper-100" : "text-body text-ink"}>
        <p className="font-medium">Iscrizione registrata. Grazie.</p>
        <p className={isFooter ? "mt-1 text-paper-200" : "mt-1 text-steel"}>
          Riceverai la prossima edizione della rassegna a questo indirizzo.
        </p>
      </div>
    )
  }

  return (
    <div>
      <h2
        className={
          isFooter
            ? "font-mono text-mono-label uppercase text-gold-400 mb-4"
            : "font-display text-h3 text-ink"
        }
      >
        Newsletter
      </h2>
      <p className={isFooter ? "text-sm text-paper-200" : "text-body mt-3 max-w-2xl text-steel"}>
        Finanziamenti pubblici, strategia, business intelligence e cybersecurity: la
        selezione della rassegna nella tua casella. Nessuna cessione dei dati a terzi,
        disiscrizione in ogni momento.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-6 space-y-4">
        <div className="hidden" aria-hidden="true">
          <label htmlFor={`${fieldId}-website`}>Website</label>
          <input type="text" id={`${fieldId}-website`} autoComplete="off" tabIndex={-1} {...register("website")} />
        </div>

        <div>
          <label htmlFor={`${fieldId}-email`} className={labelClass}>
            Email <span className="text-danger">*</span>
          </label>
          <input
            type="email"
            id={`${fieldId}-email`}
            autoComplete="email"
            aria-required="true"
            aria-describedby={errors.email ? `${fieldId}-email-error` : undefined}
            className={inputClass}
            {...register("email")}
          />
          {errors.email && (
            <p id={`${fieldId}-email-error`} role="alert" className="text-danger text-caption mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id={`${fieldId}-consenso`}
            aria-required="true"
            className="mt-1 h-4 w-4 shrink-0"
            {...register("consensoNewsletter")}
          />
          <label htmlFor={`${fieldId}-consenso`} className={consentClass}>
            Acconsento a ricevere la newsletter di GM Consulting e ho letto l&apos;
            <Link href="/note-legali#privacy" className="underline underline-offset-4">
              informativa privacy
            </Link>
            . <span className="text-danger">*</span>
          </label>
        </div>
        {errors.consensoNewsletter && (
          <p role="alert" className="text-danger text-caption">
            {errors.consensoNewsletter.message}
          </p>
        )}

        {serverError && (
          <p role="alert" className="text-danger text-caption">
            {serverError}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={
            isFooter
              ? "inline-flex items-center gap-2 rounded-md bg-gold-400 px-5 py-3 text-sm font-medium text-navy-900 transition-colors hover:bg-gold-300 disabled:opacity-60"
              : "inline-flex items-center gap-2 rounded-md bg-navy-900 px-5 py-3 text-sm font-medium text-paper-50 transition-colors hover:bg-navy-800 disabled:opacity-60"
          }
        >
          <Mail size={16} strokeWidth={1.5} aria-hidden="true" />
          {isSubmitting ? "Invio in corso…" : "Iscrivimi"}
        </button>
      </form>
    </div>
  )
}
