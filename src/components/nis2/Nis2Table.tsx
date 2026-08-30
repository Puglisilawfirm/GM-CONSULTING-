import type { Nis2Table as Nis2TableData } from "@/lib/landings/nis2-dossier"
import { toneMarker, toneRow } from "./tones"

/** Tabella del dossier: righe colorate per famiglia, scorrevoli su schermo stretto. */
export function Nis2Table({ table }: { table: Nis2TableData }) {
  return (
    <figure id={table.id} className="my-8">
      <figcaption className="mb-3">
        <span className="block font-display text-h4 text-ink">{table.caption}</span>
        {table.note && <span className="mt-1 block text-body-sm text-steel">{table.note}</span>}
      </figcaption>
      <div className="overflow-x-auto rounded-lg border border-mist">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead>
            <tr className="bg-navy-900 text-white">
              {table.columns.map((colonna) => (
                <th key={colonna} scope="col" className="px-4 py-3 text-caption uppercase tracking-wide">
                  {colonna}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((riga) => (
              <tr
                key={riga.cells.join("|")}
                className={riga.tone ? toneRow[riga.tone] : "bg-white"}
              >
                {riga.cells.map((cella, indice) =>
                  indice === 0 ? (
                    <th
                      key={cella}
                      scope="row"
                      className={`px-4 py-3 align-top text-body-sm font-semibold text-ink ${
                        riga.tone ? toneMarker[riga.tone] : ""
                      }`}
                    >
                      {cella}
                    </th>
                  ) : (
                    <td key={`${cella}-${indice}`} className="px-4 py-3 align-top text-body-sm text-steel">
                      {cella}
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  )
}
