import { NextResponse } from "next/server"
import { z } from "zod"
import { Resend } from "resend"

const assessmentSchema = z.object({
  nome: z.string().min(1),
  email: z.string().email(),
  ruolo: z.string().optional(),
  organizzazione: z.string().min(1),
  settore: z.string().min(1),
  dipendenti: z.string().optional(),
  aree: z.array(z.string()).min(1),
  urgenza: z.string().min(1),
  descrizione: z.string().min(200).max(2000),
  consensoGdpr: z.literal(true),
  consensoMarketing: z.boolean().optional(),
  website: z.string().max(0).optional(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const data = assessmentSchema.parse(body)

    // Honeypot check
    if (data.website && data.website.length > 0) {
      return NextResponse.json({ success: true })
    }

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.error("RESEND_API_KEY not configured")
      return NextResponse.json(
        { error: "Servizio email non configurato. Scrivi a info@gmconsulting.one." },
        { status: 503 }
      )
    }

    const notifyEmail =
      process.env.ASSESSMENT_NOTIFY_EMAIL || "info@gmconsulting.one"

    const resend = new Resend(apiKey)

    const htmlBody = `
      <h2>Nuova richiesta assessment</h2>
      <table style="border-collapse:collapse;width:100%;max-width:600px;font-family:sans-serif;">
        <tr style="border-bottom:1px solid #E2E8F0;">
          <td style="padding:12px 16px;font-weight:600;color:#1F2937;width:200px;">Nome e cognome</td>
          <td style="padding:12px 16px;color:#475569;">${escapeHtml(data.nome)}</td>
        </tr>
        <tr style="border-bottom:1px solid #E2E8F0;">
          <td style="padding:12px 16px;font-weight:600;color:#1F2937;">Email</td>
          <td style="padding:12px 16px;color:#475569;">${escapeHtml(data.email)}</td>
        </tr>
        <tr style="border-bottom:1px solid #E2E8F0;">
          <td style="padding:12px 16px;font-weight:600;color:#1F2937;">Ruolo</td>
          <td style="padding:12px 16px;color:#475569;">${escapeHtml(data.ruolo || "Non specificato")}</td>
        </tr>
        <tr style="border-bottom:1px solid #E2E8F0;">
          <td style="padding:12px 16px;font-weight:600;color:#1F2937;">Organizzazione</td>
          <td style="padding:12px 16px;color:#475569;">${escapeHtml(data.organizzazione)}</td>
        </tr>
        <tr style="border-bottom:1px solid #E2E8F0;">
          <td style="padding:12px 16px;font-weight:600;color:#1F2937;">Settore</td>
          <td style="padding:12px 16px;color:#475569;">${escapeHtml(data.settore)}</td>
        </tr>
        <tr style="border-bottom:1px solid #E2E8F0;">
          <td style="padding:12px 16px;font-weight:600;color:#1F2937;">Dipendenti</td>
          <td style="padding:12px 16px;color:#475569;">${escapeHtml(data.dipendenti || "Non specificato")}</td>
        </tr>
        <tr style="border-bottom:1px solid #E2E8F0;">
          <td style="padding:12px 16px;font-weight:600;color:#1F2937;">Aree di interesse</td>
          <td style="padding:12px 16px;color:#475569;">${data.aree.map(escapeHtml).join("<br/>")}</td>
        </tr>
        <tr style="border-bottom:1px solid #E2E8F0;">
          <td style="padding:12px 16px;font-weight:600;color:#1F2937;">Urgenza</td>
          <td style="padding:12px 16px;color:#475569;">${escapeHtml(data.urgenza)}</td>
        </tr>
        <tr style="border-bottom:1px solid #E2E8F0;">
          <td style="padding:12px 16px;font-weight:600;color:#1F2937;">Descrizione</td>
          <td style="padding:12px 16px;color:#475569;white-space:pre-wrap;">${escapeHtml(data.descrizione)}</td>
        </tr>
        <tr style="border-bottom:1px solid #E2E8F0;">
          <td style="padding:12px 16px;font-weight:600;color:#1F2937;">Consenso GDPR</td>
          <td style="padding:12px 16px;color:#475569;">Sì</td>
        </tr>
        <tr>
          <td style="padding:12px 16px;font-weight:600;color:#1F2937;">Consenso marketing</td>
          <td style="padding:12px 16px;color:#475569;">${data.consensoMarketing ? "Sì" : "No"}</td>
        </tr>
      </table>
    `

    await resend.emails.send({
      from: "GM Consulting Assessment <assessment@gmconsulting.one>",
      to: [notifyEmail],
      subject: `Nuova richiesta assessment — ${data.organizzazione}`,
      html: htmlBody,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Dati non validi. Verifica i campi e riprova." },
        { status: 400 }
      )
    }

    console.error("Assessment submission error:", error)
    return NextResponse.json(
      { error: "Errore interno del server. Riprova più tardi." },
      { status: 500 }
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
