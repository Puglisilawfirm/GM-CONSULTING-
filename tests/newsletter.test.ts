import assert from "node:assert/strict"
import { describe, it } from "node:test"
import {
  addContactToReach,
  newsletterSchema,
  normalizeEmail,
} from "../src/lib/newsletter"

const valid = {
  email: "lettore@example.com",
  source: "rassegna" as const,
  consensoNewsletter: true as const,
}

describe("newsletterSchema", () => {
  it("accetta indirizzo, sorgente e consenso", () => {
    assert.equal(newsletterSchema.parse(valid).email, "lettore@example.com")
  })

  it("rifiuta un indirizzo non valido", () => {
    assert.equal(newsletterSchema.safeParse({ ...valid, email: "non-una-email" }).success, false)
  })

  it("rifiuta l'iscrizione senza consenso", () => {
    assert.equal(newsletterSchema.safeParse({ ...valid, consensoNewsletter: false }).success, false)
  })

  it("rifiuta una sorgente sconosciuta", () => {
    assert.equal(newsletterSchema.safeParse({ ...valid, source: "altro" }).success, false)
  })
})

describe("normalizeEmail", () => {
  it("azzera differenze di maiuscole e spazi", () => {
    assert.equal(normalizeEmail("  Lettore@Example.COM "), "lettore@example.com")
  })
})

describe("addContactToReach", () => {
  const okResponse = new Response(null, { status: 201 })

  it("chiama l'endpoint del profilo quando l'uuid è configurato", async () => {
    const calls: { url: string; body: unknown; auth: string | null }[] = []
    const result = await addContactToReach(
      { email: "lettore@example.com", nome: " Maria " },
      { token: "tok", profileUuid: "abc-123" },
      (async (url: string | URL | Request, init?: RequestInit) => {
        calls.push({
          url: String(url),
          body: JSON.parse(String(init?.body)),
          auth: new Headers(init?.headers).get("authorization"),
        })
        return okResponse
      }) as unknown as typeof fetch,
    )

    assert.deepEqual(result, { ok: true })
    assert.equal(
      calls[0].url,
      "https://developers.hostinger.com/api/reach/v1/profiles/abc-123/contacts",
    )
    assert.deepEqual(calls[0].body, { email: "lettore@example.com", name: "Maria" })
    assert.equal(calls[0].auth, "Bearer tok")
  })

  it("usa l'endpoint predefinito senza uuid e omette il nome vuoto", async () => {
    const calls: { url: string; body: unknown }[] = []
    await addContactToReach(
      { email: "lettore@example.com", nome: "  " },
      { token: "tok" },
      (async (url: string | URL | Request, init?: RequestInit) => {
        calls.push({ url: String(url), body: JSON.parse(String(init?.body)) })
        return okResponse
      }) as unknown as typeof fetch,
    )

    assert.equal(calls[0].url, "https://developers.hostinger.com/api/reach/v1/contacts")
    assert.deepEqual(calls[0].body, { email: "lettore@example.com" })
  })

  it("considera riuscita l'iscrizione di un indirizzo già presente", async () => {
    const result = await addContactToReach(
      { email: "lettore@example.com" },
      { token: "tok" },
      (async () => new Response(null, { status: 409 })) as unknown as typeof fetch,
    )
    assert.deepEqual(result, { ok: true })
  })

  it("riporta l'errore quando il provider risponde male", async () => {
    const result = await addContactToReach(
      { email: "lettore@example.com" },
      { token: "tok" },
      (async () => new Response(null, { status: 500 })) as unknown as typeof fetch,
    )
    assert.deepEqual(result, { ok: false, error: "provider responded 500" })
  })

  it("riporta l'errore quando la chiamata non parte", async () => {
    const result = await addContactToReach(
      { email: "lettore@example.com" },
      { token: "tok" },
      (async () => {
        throw new Error("network down")
      }) as unknown as typeof fetch,
    )
    assert.deepEqual(result, { ok: false, error: "provider request failed" })
  })
})
