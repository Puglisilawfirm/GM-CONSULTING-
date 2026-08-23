import { z } from "zod"

export const newsletterSources = ["rassegna", "footer", "soluzioni"] as const

export type NewsletterSource = (typeof newsletterSources)[number]

export const newsletterSchema = z.object({
  email: z.string().email("Inserisci un indirizzo email valido").max(320),
  nome: z.string().max(200).optional(),
  source: z.enum(newsletterSources),
  consensoNewsletter: z.literal(true, {
    message: "Il consenso è obbligatorio per iscriversi",
  }),
  website: z.string().max(0).optional(),
})

export type NewsletterInput = z.infer<typeof newsletterSchema>

export type NewsletterDelivery =
  | { channel: "reach" }
  | { channel: "email" }
  | { channel: "none"; reason: string }

/**
 * Hostinger Reach. Il profilo è opzionale: senza uuid l'API usa quello
 * predefinito dell'account. Un indirizzo già presente (409/422) è un esito
 * valido, non un errore da mostrare al lettore.
 */
export async function addContactToReach(
  input: { email: string; nome?: string },
  env: { token: string; profileUuid?: string },
  fetchImpl: typeof fetch = fetch,
): Promise<{ ok: boolean; error?: string }> {
  const profileUuid = env.profileUuid?.trim() ?? ""
  const url = profileUuid
    ? `https://developers.hostinger.com/api/reach/v1/profiles/${encodeURIComponent(profileUuid)}/contacts`
    : "https://developers.hostinger.com/api/reach/v1/contacts"

  const name = input.nome?.trim()

  try {
    const response = await fetchImpl(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(name ? { email: input.email, name } : { email: input.email }),
      signal: AbortSignal.timeout(8_000),
    })
    if (response.ok || response.status === 409 || response.status === 422) return { ok: true }
    return { ok: false, error: `provider responded ${response.status}` }
  } catch {
    return { ok: false, error: "provider request failed" }
  }
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase()
}
