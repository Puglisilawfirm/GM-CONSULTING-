"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

const navLinks = [
  { label: "Metodo", href: "/metodo" },
  { label: "Aree di intervento", href: "/aree-di-intervento" },
  { label: "Compliance", href: "/compliance" },
  { label: "Insights", href: "/insights" },
  { label: "Assessment", href: "/assessment" },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-mist">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-0 shrink-0">
          <span className="font-semibold text-brand text-lg">GM</span>
          <span className="text-ink text-lg">&nbsp;Consulting S.r.l.</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8" aria-label="Navigazione principale">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-graphite hover:text-brand transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/assessment"
            className="bg-brand text-white px-6 py-3 font-medium rounded-md hover:bg-brand-dark transition-colors text-sm"
          >
            Richiedi assessment
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="lg:hidden p-2 text-graphite hover:text-brand transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Chiudi menu" : "Apri menu"}
        >
          {mobileOpen ? (
            <X size={24} strokeWidth={1.5} />
          ) : (
            <Menu size={24} strokeWidth={1.5} />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-mist bg-white">
          <nav className="mx-auto max-w-[1200px] px-6 py-6 flex flex-col gap-4" aria-label="Navigazione mobile">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-base font-medium text-graphite hover:text-brand transition-colors py-2"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/assessment"
              className="bg-brand text-white px-6 py-3 font-medium rounded-md hover:bg-brand-dark transition-colors text-sm text-center mt-2"
              onClick={() => setMobileOpen(false)}
            >
              Richiedi assessment
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
