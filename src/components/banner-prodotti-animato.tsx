"use client"

import Link from "next/link"

interface Prodotto {
  slug: string
  nome: string
  claim: string | null
  subclaim: string | null
  tagline: string
  eyebrow: string
  statoLabel: string
  statoTone: "attivo" | "imminente" | "futuro"
  href: string
}

const PRODOTTI: Prodotto[] = [
  {
    slug: "protocollo-23",
    nome: "Protocollo 23",
    claim: "Sistema operativo, non manuale d’uso.",
    subclaim: "— Una procedura che si esegue, non un documento da consultare.",
    tagline: "Adeguata verifica AML per notai, avvocati, commercialisti",
    eyebrow: "PRODOTTO GM",
    statoLabel: "Disponibile",
    statoTone: "attivo",
    href: "/protocollo-23",
  },
  {
    slug: "suite-gdpr-nis2",
    nome: "Suite GDPR-NIS2",
    claim: null,
    subclaim: null,
    tagline: "Modulo unificato di compliance dati e sicurezza informatica",
    eyebrow: "IN ARRIVO",
    statoLabel: "In arrivo Q2 2026",
    statoTone: "imminente",
    href: "/insights/suite-gdpr-nis2-roadmap",
  },
  {
    slug: "healthcare-continuity",
    nome: "Healthcare Continuity Toolkit",
    claim: null,
    subclaim: null,
    tagline: "BIA, BCM ed Emergency Plan per strutture sanitarie",
    eyebrow: "IN STUDIO",
    statoLabel: "In studio",
    statoTone: "futuro",
    href: "/insights/healthcare-continuity",
  },
]

const statoStyles = {
  attivo: "bg-gold-500/15 text-gold-300 border border-gold-500/30",
  imminente: "bg-paper-50/10 text-paper-200 border border-paper-50/20",
  futuro: "bg-paper-50/5 text-paper-50/60 border border-paper-50/10",
}

function ShieldIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold-500 shrink-0">
      <path d="M20 4L6 10v10c0 9.94 5.97 19.21 14 22 8.03-2.79 14-12.06 14-22V10L20 4z" />
      <text x="12" y="26" fill="currentColor" stroke="none" fontSize="12" fontWeight="bold" fontFamily="monospace">23</text>
    </svg>
  )
}

function NodesIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold-500 shrink-0">
      <circle cx="20" cy="8" r="4" />
      <circle cx="10" cy="32" r="4" />
      <circle cx="30" cy="32" r="4" />
      <line x1="20" y1="12" x2="10" y2="28" />
      <line x1="20" y1="12" x2="30" y2="28" />
      <line x1="14" y1="32" x2="26" y2="32" />
    </svg>
  )
}

function PulseIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold-500 shrink-0">
      <polyline points="2,20 10,20 14,8 18,32 22,14 26,26 30,20 38,20" />
    </svg>
  )
}

const glyphs: Record<string, () => React.JSX.Element> = {
  "protocollo-23": ShieldIcon,
  "suite-gdpr-nis2": NodesIcon,
  "healthcare-continuity": PulseIcon,
}

function buildAriaLabel(prodotto: Prodotto): string {
  const parts = [`Vai a ${prodotto.nome}`]
  if (prodotto.claim) parts.push(prodotto.claim)
  if (prodotto.subclaim) parts.push(prodotto.subclaim)
  parts.push(prodotto.tagline)
  return parts.join(" — ")
}

function cardMinWidth(prodotto: Prodotto): string {
  if (prodotto.claim && prodotto.subclaim) return "min-w-[480px]"
  if (prodotto.claim) return "min-w-[420px]"
  return "min-w-[360px]"
}

function ProdottoCard({ item }: { item: Prodotto }) {
  const Glyph = glyphs[item.slug]
  return (
    <Link
      href={item.href}
      className={`flex items-center gap-5 px-8 group ${cardMinWidth(item)}`}
      aria-label={buildAriaLabel(item)}
    >
      <Glyph />
      <div className="flex flex-col justify-center min-w-0">
        <span className="font-mono text-mono-label uppercase text-gold-400">
          {item.eyebrow}
        </span>
        <span className="font-display font-medium text-[20px] text-paper-50 leading-tight">
          {item.nome}
        </span>
        {item.claim && (
          <p className="font-display italic text-[15px] text-gold-400 leading-snug mt-0.5">
            {item.claim}
          </p>
        )}
        {item.subclaim && (
          <p className="font-sans italic text-[12.5px] text-paper-200/80 leading-snug mt-0.5">
            {item.subclaim}
          </p>
        )}
        <span className="text-[13px] text-paper-200 leading-snug mt-1">
          {item.tagline}
        </span>
      </div>
      <span className={`ml-4 shrink-0 text-[11px] font-mono px-2.5 py-1 rounded-full whitespace-nowrap ${statoStyles[item.statoTone]}`}>
        {item.statoLabel}
      </span>
    </Link>
  )
}

export function BannerProdottiAnimato() {
  const cards = PRODOTTI.map((item) => (
    <div key={item.slug} className="flex items-center">
      <ProdottoCard item={item} />
      <div className="w-px h-16 bg-gold-700/30 mx-4 shrink-0" aria-hidden="true" />
    </div>
  ))

  return (
    <section
      aria-label="Prodotti verticali di GM Consulting"
      className="relative h-24 md:h-28 bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 border-y border-gold-700/40 overflow-hidden group"
    >
      <div className="marquee-track animate-marquee group-hover:animate-marquee-slow h-full items-center">
        <div className="flex items-center h-full">{cards}</div>
        <div className="flex items-center h-full" aria-hidden="true">{cards}</div>
      </div>
    </section>
  )
}
