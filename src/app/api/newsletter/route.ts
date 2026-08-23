import { NextResponse } from "next/server"
import { z } from "zod"
import { addContactToReach, newsletterSchema, normalizeEmail } from "@/lib/newsletter"

/**
 * Iscrizione alla newsletter. Il contatto va in Hostinger Reach quando il token
 * è configurato; in assenza di provider l'indirizzo non viene perso ma
 * notificato per e-mail, così l'iscrizione resta registrata da qualche parte.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const data = newsletterSchema.parse(body)

    if (data.website && data.website.length > 0) {
      return NextResponse.json({ success: true })
    }

    const email = normalizeEmail(data.email)
    const reachToken = process.env.HOSTINGER_REACH_API_TOKEN

    if (reachToken) {
      const result = await addContactToReach(
        { email, nome: data.nome },
        { token: reachToken, profileUuid: process.env.HOSTINGER_REACH_PROFILE_UUID },
      )
      if (result.ok) return NextResponse.json({ success: true })
      console.error("Newsletter provider error:", result.error)
    }

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: "Servizio di iscrizione non disponibile. Scrivi a info@gmconsulting.one." },
        { status: 503 },
      )
    }

    const notifyEmail = process.env.NEWSLETTER_NOTIFY_EMAIL || "info@gmconsulting.one"
    const { Resend } = await import("resend")
    const resend = new Resend(apiKey)

    await resend.emails.send({
      from: "GM Consulting Newsletter <assessment@gmconsulting.one>",
      to: [notifyEmail],
      subject: "[Newsletter] Nuova iscrizione",
      html: `<p>Nuova iscrizione alla newsletter.</p>
<p>Indirizzo: ${escapeHtml(email)}<br />
Nome: ${escapeHtml(data.nome?.trim() || "—")}<br />
Origine: ${escapeHtml(data.source)}<br />
Consenso: sì, raccolto il ${new Date().toISOString()}</p>`,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Dati non validi. Verifica i campi e riprova." },
        { status: 400 },
      )
    }

    console.error("Newsletter submission error:", error)
    return NextResponse.json(
      { error: "Errore interno del server. Riprova più tardi." },
      { status: 500 },
    )
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}
