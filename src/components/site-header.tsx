"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Menu, X } from "lucide-react"

const NAV_ITEMS = [
  { href: "/metodo", label: "Metodo" },
  { href: "/aree-di-intervento", label: "Aree di intervento" },
  { href: "/compliance", label: "Compliance" },
  { href: "/insights", label: "Insights" },
]

export function SiteHeader() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-paper-50/95 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto h-[72px] md:h-[88px] px-6 md:px-10 lg:px-14 flex items-center gap-6">
        {/* Logo lockup */}
        <Link href="/" className="flex items-center gap-3 group shrink-0" aria-label="GM Consulting — Home">
          <Image
            src="/logo-gmconsulting-72.webp"
            alt=""
            width={72}
            height={72}
            priority
            className="h-14 w-14 md:h-[72px] md:w-[72px] transition-transform group-hover:scale-[1.02]"
          />
          <div className="flex flex-col leading-none">
            <span className="font-display font-medium text-[18px] md:text-[22px] text-ink tracking-[-0.01em]">
              GM Consulting
            </span>
            <span className="font-sans font-medium text-[9.5px] md:text-[10.5px] uppercase tracking-[0.16em] text-gold-600 mt-1">
              S.r.l. · Compliance &amp; Business Strategy
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="ml-auto hidden md:flex items-center gap-8" aria-label="Navigazione principale">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink hover:text-navy-700 underline-offset-8 decoration-2 decoration-gold-500 hover:underline transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA desktop */}
        <Link
          href="/assessment"
          className="hidden md:inline-flex items-center bg-navy-900 hover:bg-navy-800 text-paper-50 font-medium text-sm px-5 py-2.5 rounded-md transition-colors"
        >
          Richiedi assessment
          <ArrowRight className="ml-2 h-3.5 w-3.5 text-gold-400" />
        </Link>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden ml-auto p-2 text-ink hover:text-navy-700 transition-colors"
          onClick={() => setDrawerOpen(!drawerOpen)}
          aria-expanded={drawerOpen}
          aria-label={drawerOpen ? "Chiudi menu" : "Apri menu"}
        >
          {drawerOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="md:hidden fixed inset-0 top-[72px] z-40 bg-paper-50" role="dialog" aria-modal="true" aria-label="Menu di navigazione">
          <nav className="max-w-7xl mx-auto px-6 py-8 flex flex-col gap-1" aria-label="Navigazione mobile">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-display text-[22px] text-ink py-4 border-b border-border hover:text-navy-700 transition-colors"
                onClick={() => setDrawerOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/assessment"
              className="mt-6 flex items-center justify-center bg-navy-900 hover:bg-navy-800 text-paper-50 font-medium text-base px-6 py-3.5 rounded-md transition-colors"
              onClick={() => setDrawerOpen(false)}
            >
              Richiedi assessment
              <ArrowRight className="ml-2 h-4 w-4 text-gold-400" />
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
