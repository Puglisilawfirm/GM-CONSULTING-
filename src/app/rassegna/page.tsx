import { readFile } from "node:fs/promises"
import path from "node:path"
import type { Metadata } from "next"
import { Hero } from "@/components/ui/Hero"
import { NewsBoard } from "@/components/news/NewsBoard"
import type { NewsDigest, SourceStatus } from "@/lib/news/digest"
import { newsCategories, newsSources } from "@/lib/news/sources"

export const metadata: Metadata = {
  title: "Rassegna — Le notizie del giorno",
  description:
    "Strategia, business intelligence, cybersecurity, finanziamenti pubblici e fisco: le notizie del giorno con il link alla fonte, alle 08:00 e alle 20:00.",
  alternates: { canonical: "https://www.gmconsulting.one/rassegna" },
  // Senza immagine propria l'anteprima social erediterebbe `og-default.png`
  // dal layout, rendendo la condivisione della rassegna indistinguibile da
  // quella della home. Gli URL sono assoluti perché il progetto non dichiara
  // `metadataBase`: un percorso relativo finirebbe risolto su localhost.
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName: "GM Consulting S.r.l.",
    title: "Rassegna — Le notizie del giorno per l'impresa",
    description:
      "Finanziamenti pubblici, strategia, business intelligence, cybersecurity e compliance: le notizie del giorno con il link alla fonte, alle 08:00 e alle 20:00.",
    url: "https://www.gmconsulting.one/rassegna",
    images: [
      {
        url: "https://www.gmconsulting.one/images/rassegna-og.jpg",
        width: 1200,
        height: 630,
        alt: "Rassegna GM Consulting — le notizie del giorno per la direzione d'impresa, con il link alla fonte",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rassegna — Le notizie del giorno per l'impresa",
    description:
      "Finanziamenti pubblici, strategia, business intelligence, cybersecurity e compliance: le notizie del giorno con il link alla fonte.",
    images: ["https://www.gmconsulting.one/images/rassegna-og.jpg"],
  },
}

const dateFormatter = new Intl.DateTimeFormat("it-IT", {
  dateStyle: "full",
  timeStyle: "short",
  timeZone: "Europe/Rome",
})

/**
 * Il digest è un file versionato: lo scrive il workflow di raccolta e ogni
 * commit rigenera la pagina, quindi la lettura resta statica al build.
 */
async function loadDigest(): Promise<NewsDigest | null> {
  try {
    const raw = await readFile(
      path.join(process.cwd(), "public", "data", "news-digest.json"),
      "utf8",
    )
    return JSON.parse(raw) as NewsDigest
  } catch {
    return null
  }
}

export default async function RassegnaPage() {
  const digest = await loadDigest()

  const monitored: SourceStatus[] =
    digest !== null
      ? digest.sources.filter(
          (source) => source.status === "manual" || source.status === "error",
        )
      : newsSources
          .filter((source) => source.feed === null)
          .map((source) => ({
            sourceId: source.id,
            name: source.name,
            homepage: source.homepage,
            category: source.category,
            status: "manual" as const,
            itemCount: 0,
          }))

  return (
    <>
      <Hero
        variant="compact"
        eyebrow="Rassegna"
        title="Le notizie del giorno per la direzione d'impresa"
        lead="Strategia, business intelligence, cybersecurity, finanziamenti pubblici agli investimenti, compliance e fisco. Ogni voce rimanda alla fonte originale: la rassegna si aggiorna alle 08:00 e alle 20:00."
      />

      <section className="bg-paper py-16 lg:py-24">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          {digest ? (
            <>
              <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-border pb-6">
                <p className="font-mono text-mono-label uppercase text-ink-scale-400">
                  {digest.slot === "morning"
                    ? "Edizione delle 08:00"
                    : "Edizione delle 20:00"}{" "}
                  · {digest.items.length} notizie · finestra{" "}
                  {digest.windowHours} ore
                </p>
                <p className="text-caption text-steel">
                  Aggiornata il {dateFormatter.format(new Date(digest.generatedAt))}
                </p>
              </div>

              <div className="mt-8">
                <NewsBoard digest={digest} />
              </div>
            </>
          ) : (
            <p className="text-body-lg text-steel">
              La rassegna è in aggiornamento: la prossima edizione è prevista
              alle 08:00 o alle 20:00. Nel frattempo restano consultabili le
              fonti elencate qui sotto.
            </p>
          )}
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <h2 className="font-display text-h2 text-ink">Le materie seguite</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {newsCategories.map((category) => (
              <div
                key={category.id}
                className="rounded-lg border border-border p-5"
              >
                <h3 className="font-mono text-mono-label uppercase text-navy-700">
                  {category.label}
                </h3>
                <p className="mt-2 text-sm text-steel">
                  {category.description}
                </p>
              </div>
            ))}
          </div>

          <h2 className="font-display text-h3 text-ink mt-16">
            Fonti presidiate a mano
          </h2>
          <p className="text-body mt-3 max-w-3xl text-steel">
            Queste {monitored.length} fonti non espongono un feed utilizzabile
            dalla raccolta automatica: le consultiamo direttamente e ne
            riportiamo qui il collegamento.
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            {monitored.map((source) => (
              <li key={source.sourceId}>
                <a
                  href={source.homepage}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-caption text-steel underline-offset-4 hover:text-navy-700 hover:underline"
                >
                  {source.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
