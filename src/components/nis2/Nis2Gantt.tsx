import {
  nis2Timeline,
  nis2TimelineMonths,
  nis2TimelineYears,
  type Nis2TimelineBar,
} from "@/lib/landings/nis2-dossier"
import { toneBar } from "./tones"

const mesi = ["G", "F", "M", "A", "M", "G", "L", "A", "S", "O", "N", "D"]

function raggruppa(barre: Nis2TimelineBar[]) {
  const gruppi: { nome: string; barre: Nis2TimelineBar[] }[] = []
  for (const barra of barre) {
    const ultimo = gruppi.at(-1)
    if (ultimo && ultimo.nome === barra.group) ultimo.barre.push(barra)
    else gruppi.push({ nome: barra.group, barre: [barra] })
  }
  return gruppi
}

/** Cronoprogramma degli adempimenti: una griglia di 36 mesi, 2025-2027. */
export function Nis2Gantt() {
  const gruppi = raggruppa(nis2Timeline)

  return (
    <div className="overflow-x-auto rounded-lg border border-mist bg-white p-4 lg:p-6">
      <div className="min-w-[860px]">
        <div className="grid gap-2" style={{ gridTemplateColumns: "18rem 1fr" }}>
          <div />
          <div
            className="grid text-caption text-fog"
            style={{ gridTemplateColumns: `repeat(${nis2TimelineYears.length}, 1fr)` }}
          >
            {nis2TimelineYears.map((anno) => (
              <div key={anno} className="border-l border-mist pl-2 font-medium text-ink">
                {anno}
              </div>
            ))}
          </div>

          <div />
          <div
            className="grid text-[0.65rem] text-fog"
            style={{ gridTemplateColumns: `repeat(${nis2TimelineMonths}, 1fr)` }}
          >
            {Array.from({ length: nis2TimelineMonths }, (_, indice) => (
              <div
                key={indice}
                className={indice % 12 === 0 ? "border-l border-mist text-center" : "text-center"}
              >
                {mesi[indice % 12]}
              </div>
            ))}
          </div>

          {gruppi.map((gruppo) => (
            <div key={gruppo.nome} className="contents">
              <div className="pt-4 text-caption uppercase tracking-wide text-brand">
                {gruppo.nome}
              </div>
              <div className="pt-4" />

              {gruppo.barre.map((barra) => (
                <div key={barra.label} className="contents">
                  <div className="py-1 pr-4 text-body-sm text-steel">{barra.label}</div>
                  <div
                    className="grid items-center py-1"
                    style={{ gridTemplateColumns: `repeat(${nis2TimelineMonths}, 1fr)` }}
                  >
                    <div
                      className={`rounded px-2 py-1 text-[0.7rem] font-medium ${toneBar[barra.tone]}`}
                      style={{ gridColumn: `${barra.start} / span ${barra.span}` }}
                      title={barra.detail}
                    >
                      {barra.span > 2 ? barra.label : ""}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <ul className="mt-8 grid gap-3 border-t border-mist pt-6 md:grid-cols-2">
        {nis2Timeline.map((barra) => (
          <li key={`${barra.group}-${barra.label}`} className="flex gap-3 text-body-sm text-steel">
            <span
              aria-hidden
              className={`mt-1 h-3 w-3 shrink-0 rounded-sm ${toneBar[barra.tone]}`}
            />
            <span>
              <strong className="font-semibold text-ink">{barra.label}</strong> — {barra.detail}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
