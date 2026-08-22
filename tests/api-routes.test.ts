import assert from "node:assert/strict"
import { afterEach, beforeEach, describe, it } from "node:test"
import { POST as postAssessment } from "../src/app/api/assessment/route"
import { POST as postProtocollo23 } from "../src/app/api/protocollo-23/route"

interface FetchCall {
  url: string
  init: RequestInit
}

const originalFetch = globalThis.fetch
const originalEnv = {
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  ASSESSMENT_NOTIFY_EMAIL: process.env.ASSESSMENT_NOTIFY_EMAIL,
  PROTOCOLLO23_NOTIFY_EMAIL: process.env.PROTOCOLLO23_NOTIFY_EMAIL,
}

const restoreEnv = () => {
  for (const [key, value] of Object.entries(originalEnv)) {
    if (value === undefined) delete process.env[key]
    else process.env[key] = value
  }
}

const stubResendFetch = (): FetchCall[] => {
  const calls: FetchCall[] = []
  globalThis.fetch = ((url: string, init: RequestInit) => {
    calls.push({ url, init })
    return Promise.resolve(
      new Response(JSON.stringify({ id: "email-id" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    )
  }) as typeof fetch
  return calls
}

const jsonRequest = (body: unknown): Request =>
  new Request("http://localhost/api", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: typeof body === "string" ? body : JSON.stringify(body),
  })

const validAssessment = {
  nome: "Mario Rossi",
  email: "mario.rossi@example.com",
  organizzazione: "ACME S.r.l.",
  settore: "Manifatturiero",
  aree: ["Compliance 231"],
  urgenza: "Alta",
  descrizione: "d".repeat(250),
  consensoGdpr: true,
}

const validProtocollo23 = {
  nome: "Giulia Bianchi",
  email: "giulia.bianchi@example.com",
  categoria: "Commercialista",
  studio: "Studio Bianchi",
  professionisti: "2-5",
  statoAml: "Parzialmente adeguato",
  consensoGdpr: true,
}

describe("POST /api/assessment", () => {
  beforeEach(() => {
    process.env.RESEND_API_KEY = "re_test_key"
    delete process.env.ASSESSMENT_NOTIFY_EMAIL
  })

  afterEach(() => {
    restoreEnv()
    globalThis.fetch = originalFetch
  })

  it("returns 400 for an invalid payload", async () => {
    stubResendFetch()
    const response = await postAssessment(jsonRequest({ nome: "Solo nome" }))
    assert.equal(response.status, 400)
    const body = await response.json()
    assert.match(body.error, /Dati non validi/)
  })

  it("returns 400 when the description is too short", async () => {
    stubResendFetch()
    const response = await postAssessment(
      jsonRequest({ ...validAssessment, descrizione: "troppo breve" }),
    )
    assert.equal(response.status, 400)
  })

  it("returns 400 when GDPR consent is missing", async () => {
    stubResendFetch()
    const response = await postAssessment(
      jsonRequest({ ...validAssessment, consensoGdpr: false }),
    )
    assert.equal(response.status, 400)
  })

  // The schema declares website as z.string().max(0), so a filled honeypot
  // is rejected by validation before the dedicated fake-success branch.
  it("rejects filled honeypot submissions without sending email", async () => {
    const calls = stubResendFetch()
    const response = await postAssessment(
      jsonRequest({ ...validAssessment, website: "spam" }),
    )
    assert.equal(response.status, 400)
    assert.equal(calls.length, 0)
  })

  it("treats an empty honeypot as a normal submission", async () => {
    const calls = stubResendFetch()
    const response = await postAssessment(
      jsonRequest({ ...validAssessment, website: "" }),
    )
    assert.equal(response.status, 200)
    assert.equal(calls.length, 1)
  })

  it("returns 503 when RESEND_API_KEY is not configured", async () => {
    delete process.env.RESEND_API_KEY
    const calls = stubResendFetch()
    const response = await postAssessment(jsonRequest(validAssessment))
    assert.equal(response.status, 503)
    assert.equal(calls.length, 0)
  })

  it("sends the notification email and reports success", async () => {
    const calls = stubResendFetch()
    const response = await postAssessment(jsonRequest(validAssessment))

    assert.equal(response.status, 200)
    assert.deepEqual(await response.json(), { success: true })
    assert.equal(calls.length, 1)

    const payload = JSON.parse(String(calls[0].init.body))
    assert.deepEqual(payload.to, ["info@gmconsulting.one"])
    assert.match(payload.subject, /ACME S\.r\.l\./)
    assert.match(payload.html, /Mario Rossi/)
  })

  it("honors ASSESSMENT_NOTIFY_EMAIL and escapes HTML in user input", async () => {
    process.env.ASSESSMENT_NOTIFY_EMAIL = "notifiche@example.com"
    const calls = stubResendFetch()
    const response = await postAssessment(
      jsonRequest({
        ...validAssessment,
        nome: `<script>alert("x")</script> & 'quote'`,
      }),
    )

    assert.equal(response.status, 200)
    const payload = JSON.parse(String(calls[0].init.body))
    assert.deepEqual(payload.to, ["notifiche@example.com"])
    assert.doesNotMatch(payload.html, /<script>/)
    assert.match(payload.html, /&lt;script&gt;/)
    assert.match(payload.html, /&amp;/)
    assert.match(payload.html, /&quot;x&quot;/)
    assert.match(payload.html, /&#039;quote&#039;/)
  })

  it("returns 500 when the request body is not valid JSON", async () => {
    stubResendFetch()
    const response = await postAssessment(jsonRequest("not json"))
    assert.equal(response.status, 500)
    const body = await response.json()
    assert.match(body.error, /Errore interno/)
  })
})

describe("POST /api/protocollo-23", () => {
  beforeEach(() => {
    process.env.RESEND_API_KEY = "re_test_key"
    delete process.env.ASSESSMENT_NOTIFY_EMAIL
    delete process.env.PROTOCOLLO23_NOTIFY_EMAIL
  })

  afterEach(() => {
    restoreEnv()
    globalThis.fetch = originalFetch
  })

  it("returns 400 for an invalid payload", async () => {
    stubResendFetch()
    const response = await postProtocollo23(jsonRequest({ email: "invalid" }))
    assert.equal(response.status, 400)
  })

  it("returns 400 when notes exceed the allowed length", async () => {
    stubResendFetch()
    const response = await postProtocollo23(
      jsonRequest({ ...validProtocollo23, note: "n".repeat(1001) }),
    )
    assert.equal(response.status, 400)
  })

  // Same honeypot behavior as the assessment route: max(0) rejects any value.
  it("rejects filled honeypot submissions without sending email", async () => {
    const calls = stubResendFetch()
    const response = await postProtocollo23(
      jsonRequest({ ...validProtocollo23, website: "spam" }),
    )
    assert.equal(response.status, 400)
    assert.equal(calls.length, 0)
  })

  it("treats an empty honeypot as a normal submission", async () => {
    const calls = stubResendFetch()
    const response = await postProtocollo23(
      jsonRequest({ ...validProtocollo23, website: "" }),
    )
    assert.equal(response.status, 200)
    assert.equal(calls.length, 1)
  })

  it("returns 503 when RESEND_API_KEY is not configured", async () => {
    delete process.env.RESEND_API_KEY
    const calls = stubResendFetch()
    const response = await postProtocollo23(jsonRequest(validProtocollo23))
    assert.equal(response.status, 503)
    assert.equal(calls.length, 0)
  })

  it("sends the notification email with the default recipient", async () => {
    const calls = stubResendFetch()
    const response = await postProtocollo23(jsonRequest(validProtocollo23))

    assert.equal(response.status, 200)
    assert.deepEqual(await response.json(), { success: true })
    assert.equal(calls.length, 1)

    const payload = JSON.parse(String(calls[0].init.body))
    assert.deepEqual(payload.to, ["info@gmconsulting.one"])
    assert.match(payload.subject, /Studio Bianchi/)
    assert.match(payload.html, /Giulia Bianchi/)
  })

  it("prefers PROTOCOLLO23_NOTIFY_EMAIL over the assessment fallback", async () => {
    process.env.ASSESSMENT_NOTIFY_EMAIL = "assessment@example.com"
    process.env.PROTOCOLLO23_NOTIFY_EMAIL = "protocollo@example.com"
    const calls = stubResendFetch()
    await postProtocollo23(jsonRequest(validProtocollo23))

    const payload = JSON.parse(String(calls[0].init.body))
    assert.deepEqual(payload.to, ["protocollo@example.com"])
  })

  it("falls back to ASSESSMENT_NOTIFY_EMAIL when the dedicated address is unset", async () => {
    process.env.ASSESSMENT_NOTIFY_EMAIL = "assessment@example.com"
    const calls = stubResendFetch()
    await postProtocollo23(jsonRequest(validProtocollo23))

    const payload = JSON.parse(String(calls[0].init.body))
    assert.deepEqual(payload.to, ["assessment@example.com"])
  })

  it("escapes HTML in user input", async () => {
    const calls = stubResendFetch()
    await postProtocollo23(
      jsonRequest({ ...validProtocollo23, studio: `<b>Studio</b> & C.` }),
    )

    const payload = JSON.parse(String(calls[0].init.body))
    assert.doesNotMatch(payload.html, /<b>Studio<\/b>/)
    assert.match(payload.html, /&lt;b&gt;Studio&lt;\/b&gt; &amp; C\./)
  })

  it("returns 500 when the request body is not valid JSON", async () => {
    stubResendFetch()
    const response = await postProtocollo23(jsonRequest("not json"))
    assert.equal(response.status, 500)
  })
})
