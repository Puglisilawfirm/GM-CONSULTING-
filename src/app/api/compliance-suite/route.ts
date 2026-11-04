import { NextResponse } from "next/server"
import { z } from "zod"

const complianceSuiteSchema = z.object({
  nome: z.string().min(1),
  email: z.string().email(),
  telefono: z.string().optional(),
  ragioneSociale: z.string().min(1),
  settore: z.string().min(1),
  dipendenti: z.string().min(1),
  ambiti: z.array(z.string()).optional(),
  statoCompliance: z.string().min(1),
  note: z.string().max(1000).optional(),
  consensoGdpr: z.literal(true),
  consensoMarketing: z.boolean().optional(),
  website: z.string().max(0).optional(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const data = complianceSuiteSchema.parse(body)

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
      process.env.COMPLIANCE_SUITE_NOTIFY_EMAIL ||
      process.env.ASSESSMENT_NOTIFY_EMAIL ||
      "info@gmconsulting.one"

    const { Resend } = await import("resend")
    const resend = new Resend(apiKey)

    const row = (label: string, value: string, last = false) => `
        <tr${last ? "" : ' style="border-bottom:1px solid #E2E8F0;"'}>
          <td style="padding:12px 16px;font-weight:600;color:#1F2937;width:220px;vertical-align:top;">${label}</td>
          <td style="padding:12px 16px;color:#475569;white-space:pre-wrap;">${value}</td>
        </tr>`

    const htmlBody = `
      <h2>Nuova richiesta di demo — Compliance Suite</h2>
      <table style="border-collapse:collapse;width:100%;max-width:640px;font-family:sans-serif;">
        ${row("Nome e cognome", escapeHtml(data.nome))}
        ${row("Email", escapeHtml(data.email))}
        ${row("Telefono", escapeHtml(data.telefono || "Non specificato"))}
        ${row("Ragione sociale", escapeHtml(data.ragioneSociale))}
        ${row("Settore di attività", escapeHtml(data.settore))}
        ${row("Numero di dipendenti", escapeHtml(data.dipendenti))}
        ${row(
          "Ambiti di interesse",
          data.ambiti && data.ambiti.length > 0
            ? escapeHtml(data.ambiti.join(" · "))
            : "Non specificati"
        )}
        ${row("Stato attuale della compliance", escapeHtml(data.statoCompliance))}
        ${row("Note", escapeHtml(data.note || "—"))}
        ${row("Consenso GDPR", "Sì")}
        ${row("Consenso marketing", data.consensoMarketing ? "Sì" : "No", true)}
      </table>
    `

    await resend.emails.send({
      from: "GM Consulting Compliance Suite <assessment@gmconsulting.one>",
      to: [notifyEmail],
      subject: `[Compliance Suite] Nuova richiesta di demo — ${data.ragioneSociale}`,
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

    console.error("Compliance Suite submission error:", error)
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
