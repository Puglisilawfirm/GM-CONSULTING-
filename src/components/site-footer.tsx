"use client"

import Link from "next/link"
import Image from "next/image"
import { Mail } from "lucide-react"
import { NewsletterSignup } from "@/components/newsletter/NewsletterSignup"

const navigazione = [
  { href: "/azienda", label: "Azienda" },
  { href: "/metodo", label: "Metodo" },
  { href: "/soluzioni", label: "Soluzioni" },
  { href: "/aree-di-intervento", label: "Aree di intervento" },
  { href: "/compliance", label: "Compliance" },
  { href: "/insights", label: "Insights" },
  { href: "/rassegna", label: "Cosa Accade" },
  { href: "/assessment", label: "Assessment" },
]

const complianceLinks = [
  { href: "/compliance#iso-27001", label: "ISO 27001" },
  { href: "/compliance#iso-37001", label: "ISO 37001" },
  { href: "/compliance#iso-37301", label: "ISO 37301" },
  { href: "/compliance#iso-31000", label: "ISO 31000" },
  { href: "/compliance#dlgs-231", label: "D.Lgs. 231/2001" },
  { href: "/compliance#iso-45001", label: "ISO 45001" },
  { href: "/compliance#uni-pdr-125", label: "UNI/PdR 125" },
  { href: "/compliance#iso-22301", label: "ISO 22301" },
]

const soluzioniLinks = [
  { href: "/soluzioni/finanziamenti-pubblici-investimenti", label: "Finanziamenti per investimenti" },
  { href: "/soluzioni/pianificazione-strategica", label: "Pianificazione strategica" },
  { href: "/soluzioni/business-intelligence-dati", label: "Business intelligence" },
  { href: "/soluzioni/cybersecurity-nis2", label: "Cybersecurity e NIS2" },
]

const legalLinks = [
  { href: "/convenzione-studio", label: "Convenzione Studio" },
  { href: "/note-legali", label: "Note legali" },
  { href: "/note-legali#privacy", label: "Privacy" },
  { href: "/accessibilita", label: "Accessibilità" },
]

function FooterColumn({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <div>
      <h3 className="font-mono text-mono-label uppercase text-gold-400 mb-4">{title}</h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="text-sm text-paper-200 hover:text-paper-50 transition-colors">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function SiteFooter() {
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-navy-900 text-paper-100">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14 pt-20 pb-10">
        {/* Logo lockup */}
        <div className="flex items-center gap-3">
          <Image
            src="/logo-gmconsulting-128.webp"
            alt="GM Consulting"
            width={128}
            height={128}
            className="h-16 w-16"
          />
          <div className="flex flex-col leading-none">
            <span className="font-display font-medium text-[20px] text-paper-50">GM Consulting</span>
            <span className="font-sans text-[10px] uppercase tracking-[0.16em] text-gold-400 mt-1">
              S.r.l. · Strategic Planning &amp; Business Transformation
            </span>
          </div>
        </div>

        {/* Grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          <FooterColumn title="Navigazione" items={navigazione} />
          <FooterColumn title="Soluzioni" items={soluzioniLinks} />
          <FooterColumn title="Compliance" items={complianceLinks} />
          <div>
            <h3 className="font-mono text-mono-label uppercase text-gold-400 mb-4">Convenzione &amp; Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-paper-200 hover:text-paper-50 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  data-action="open-preferences"
                  className="text-sm text-paper-200 hover:text-paper-50 transition-colors"
                >
                  Cookie preferences
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-mono text-mono-label uppercase text-gold-400 mb-4">Contatti</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:info@gmconsulting.one" className="text-sm text-paper-200 hover:text-paper-50 transition-colors inline-flex items-center gap-2">
                  <Mail size={14} strokeWidth={1.5} aria-hidden="true" />
                  info@gmconsulting.one
                </a>
              </li>
              <li>
                <a href="mailto:gmconsultingct@legalmail.it" className="text-sm text-paper-200 hover:text-paper-50 transition-colors inline-flex items-center gap-2">
                  <Mail size={14} strokeWidth={1.5} aria-hidden="true" />
                  gmconsultingct@legalmail.it
                </a>
              </li>
              <li className="text-sm text-paper-200 leading-relaxed">
                Via Nuovalucello 81/C<br />
                95126 Catania (CT)
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-16 max-w-xl border-t border-navy-800 pt-10">
          <NewsletterSignup source="footer" variant="footer" />
        </div>

        {/* Baseline */}
        <div className="border-t border-navy-800 mt-16 pt-8 flex flex-col md:flex-row justify-between gap-4 text-mono-label text-ink-scale-400 font-mono">
          <p>
            © 2026 GM Consulting S.r.l. — P.IVA 04006730875 — REA CT-268069 — Sede legale: Via Nuovalucello 81/C, 95126 Catania (CT) — Costituita nel 2002
          </p>
          <button onClick={scrollToTop} className="hover:text-paper-100 transition-colors text-left md:text-right">
            Torna su ↑
          </button>
        </div>
      </div>
    </footer>
  )
}
