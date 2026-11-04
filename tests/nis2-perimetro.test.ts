import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { aggrega, classifica, valutaPerimetro, type InputPerimetro } from "../src/lib/nis2/perimetro"

/** Gli esempi numerici della FAQ ACN AMB.DI.1 (già 2.3). */
describe("classifica — esempi ufficiali ACN", () => {
  it("meno di 50 occupati, fatturato 2-10, bilancio oltre 43 → piccola", () => {
    assert.equal(classifica({ ula: 40, fatturato: 8, bilancio: 60 }), "piccola")
  })
  it("meno di 10 occupati, fatturato e bilancio 10-43 → media", () => {
    assert.equal(classifica({ ula: 8, fatturato: 20, bilancio: 30 }), "media")
  })
  it("meno di 10 occupati, fatturato oltre 50, bilancio 10-43 → media", () => {
    assert.equal(classifica({ ula: 8, fatturato: 60, bilancio: 30 }), "media")
  })
  it("meno di 10 occupati, fatturato ≥ 50 e bilancio ≥ 43 → grande", () => {
    assert.equal(classifica({ ula: 8, fatturato: 51, bilancio: 44 }), "grande")
  })
  it("50-249 occupati, fatturato e bilancio fino a 10 → media", () => {
    assert.equal(classifica({ ula: 120, fatturato: 5, bilancio: 5 }), "media")
  })
  it("250 occupati o più, fatturato e bilancio fino a 10 → grande", () => {
    assert.equal(classifica({ ula: 250, fatturato: 5, bilancio: 5 }), "grande")
  })
  it("sotto ogni soglia → micro", () => {
    assert.equal(classifica({ ula: 5, fatturato: 1, bilancio: 1.5 }), "micro")
  })
})

describe("aggrega — art. 6, par. 2 dell'allegato", () => {
  it("collegate al 100%, associate pro quota", () => {
    const somma = aggrega(
      { ula: 30, fatturato: 6, bilancio: 4 },
      [{ ula: 40, fatturato: 9, bilancio: 7 }],
      [{ ula: 100, fatturato: 20, bilancio: 15, quota: 30 }],
    )
    assert.deepEqual(somma, { ula: 100, fatturato: 21, bilancio: 15.5 })
  })
})

const base: InputPerimetro = {
  attuale: { ula: 30, fatturato: 6, bilancio: 4 },
  collegate: [],
  associate: [],
  tipologia: "allegato-ii",
  art3c5: false,
  art3c10: false,
}

describe("valutaPerimetro", () => {
  it("piccola impresa dell'Allegato II resta fuori ambito", () => {
    const esito = valutaPerimetro(base)
    assert.equal(esito.classeAggregata, "piccola")
    assert.equal(esito.esito, "fuori-ambito")
    assert.equal(esito.clausolaSalvaguardia, "non-pertinente")
  })

  it("l'aggregazione di gruppo porta la piccola impresa a media e a soggetto importante", () => {
    const esito = valutaPerimetro({
      ...base,
      collegate: [{ ula: 40, fatturato: 9, bilancio: 7 }],
      associate: [{ ula: 100, fatturato: 20, bilancio: 15, quota: 30 }],
    })
    assert.equal(esito.classePropria, "piccola")
    assert.equal(esito.classeAggregata, "media")
    assert.equal(esito.esito, "importante")
    assert.equal(esito.clausolaSalvaguardia, "valutabile")
  })

  it("grande impresa dell'Allegato I è soggetto essenziale", () => {
    const esito = valutaPerimetro({
      ...base,
      attuale: { ula: 300, fatturato: 80, bilancio: 60 },
      tipologia: "allegato-i",
    })
    assert.equal(esito.esito, "essenziale")
  })

  it("media impresa dell'Allegato I è soggetto importante", () => {
    const esito = valutaPerimetro({
      ...base,
      attuale: { ula: 120, fatturato: 30, bilancio: 20 },
      tipologia: "allegato-i",
    })
    assert.equal(esito.esito, "importante")
  })

  it("art. 3, c. 10 attrae a prescindere dalla dimensione e preclude la clausola", () => {
    const esito = valutaPerimetro({
      ...base,
      tipologia: "nessuna",
      art3c10: true,
      collegate: [{ ula: 400, fatturato: 90, bilancio: 70 }],
    })
    assert.equal(esito.esito, "in-ambito")
    assert.equal(esito.clausolaSalvaguardia, "preclusa")
  })

  it("nessuna tipologia e nessun criterio di gruppo → fuori ambito anche se grande", () => {
    const esito = valutaPerimetro({
      ...base,
      attuale: { ula: 500, fatturato: 200, bilancio: 150 },
      tipologia: "nessuna",
    })
    assert.equal(esito.esito, "fuori-ambito")
  })

  it("regola dei due esercizi: classe non consolidata se l'esercizio precedente differisce", () => {
    const esito = valutaPerimetro({
      ...base,
      attuale: { ula: 55, fatturato: 6, bilancio: 4 },
      precedente: { ula: 45, fatturato: 6, bilancio: 4 },
    })
    assert.equal(esito.classeAggregata, "media")
    assert.equal(esito.classePrecedente, "piccola")
    assert.equal(esito.classeConsolidata, false)
  })
})
