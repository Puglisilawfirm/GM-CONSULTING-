import { NextResponse } from "next/server"
import { z } from "zod"

const protocollo23Schema = z.object({
  nome: z.string().min(1),
  email: z.string().email(),
  telefono: z.string().optional(),
  categoria: z.string().min(1),
  studio: z.string().min(1),
  professionisti: z.string().min(1),
  onboarding: z.string().optional(),
  statoAml: z.string().min(1),
  tierInteresse: z.string().optional(),
  note: z.string().max(1000).optional(),
  consensoGdpr: z.literal(true),
  consensoMarketing: z.boolean().optional(),
  website: z.string().max(0).optional(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const data = protocollo23Schema.parse(body)

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
      process.env.PROTOCOLLO23_NOTIFY_EMAIL ||
      process.env.ASSESSMENT_NOTIFY_EMAIL ||
      "info@gmconsulting.one"

    const { Resend } = await import("resend")
    const resend = new Resend(apiKey)

    const htmlBody = `
      <h2>Nuova richiesta Diagnostico AML — Protocollo 23</h2>
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
          <td style="padding:12px 16px;font-weight:600;color:#1F2937;">Telefono</td>
          <td style="padding:12px 16px;color:#475569;">${escapeHtml(data.telefono || "Non specificato")}</td>
        </tr>
        <tr style="border-bottom:1px solid #E2E8F0;">
          <td style="padding:12px 16px;font-weight:600;color:#1F2937;">Categoria professionale</td>
          <td style="padding:12px 16px;color:#475569;">${escapeHtml(data.categoria)}</td>
        </tr>
        <tr style="border-bottom:1px solid #E2E8F0;">
          <td style="padding:12px 16px;font-weight:600;color:#1F2937;">Studio</td>
          <td style="padding:12px 16px;color:#475569;">${escapeHtml(data.studio)}</td>
        </tr>
        <tr style="border-bottom:1px solid #E2E8F0;">
          <td style="padding:12px 16px;font-weight:600;color:#1F2937;">Professionisti</td>
          <td style="padding:12px 16px;color:#475569;">${escapeHtml(data.professionisti)}</td>
        </tr>
        <tr style="border-bottom:1px solid #E2E8F0;">
          <td style="padding:12px 16px;font-weight:600;color:#1F2937;">Onboarding annui</td>
          <td style="padding:12px 16px;color:#475569;">${escapeHtml(data.onboarding || "Non specificato")}</td>
        </tr>
        <tr style="border-bottom:1px solid #E2E8F0;">
          <td style="padding:12px 16px;font-weight:600;color:#1F2937;">Stato AML</td>
          <td style="padding:12px 16px;color:#475569;">${escapeHtml(data.statoAml)}</td>
        </tr>
        <tr style="border-bottom:1px solid #E2E8F0;">
          <td style="padding:12px 16px;font-weight:600;color:#1F2937;">Tier di interesse</td>
          <td style="padding:12px 16px;color:#475569;">${escapeHtml(data.tierInteresse || "Non specificato")}</td>
        </tr>
        <tr style="border-bottom:1px solid #E2E8F0;">
          <td style="padding:12px 16px;font-weight:600;color:#1F2937;">Note</td>
          <td style="padding:12px 16px;color:#475569;white-space:pre-wrap;">${escapeHtml(data.note || "—")}</td>
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
      from: "GM Consulting Protocollo 23 <assessment@gmconsulting.one>",
      to: [notifyEmail],
      subject: `[Protocollo 23] Nuova richiesta di Diagnostico AML — ${data.studio}`,
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

    console.error("Protocollo 23 submission error:", error)
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
