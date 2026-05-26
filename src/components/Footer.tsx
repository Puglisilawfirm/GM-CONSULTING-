import Link from "next/link"
import { Mail } from "lucide-react"

const navigazione = [
  { label: "Metodo", href: "/metodo" },
  { label: "Aree di intervento", href: "/aree-di-intervento" },
  { label: "Protocollo 23", href: "/protocollo-23" },
  { label: "Compliance", href: "/compliance" },
  { label: "Insights", href: "/insights" },
  { label: "Assessment", href: "/assessment" },
]

const complianceLinks = [
  { label: "ISO 37001", href: "/compliance#iso-37001" },
  { label: "ISO 37301", href: "/compliance#iso-37301" },
  { label: "ISO 31000", href: "/compliance#iso-31000" },
  { label: "D.Lgs. 231/2001", href: "/compliance#dlgs-231-2001" },
  { label: "ISO/IEC 27001", href: "/compliance#iso-iec-27001" },
  { label: "ISO 45001", href: "/compliance#iso-45001" },
  { label: "UNI/PdR 125", href: "/compliance#uni-pdr-125" },
  { label: "ISO 22301", href: "/compliance#iso-22301" },
]

const legalLinks = [
  { label: "Convenzione Studio", href: "/convenzione-studio" },
  { label: "Note legali", href: "/note-legali" },
  { label: "Privacy", href: "/note-legali#privacy" },
  { label: "Accessibilità", href: "/accessibilita" },
]

const protocollo23Links = [
  { label: "Diagnostico AML", href: "/protocollo-23#diagnostico-aml" },
  { label: "Metodo AML", href: "/protocollo-23#metodo-aml" },
  { label: "Suite Continua", href: "/protocollo-23#suite-continua" },
  { label: "Premium Notai", href: "/protocollo-23#premium-notai" },
]

export function Footer() {
  return (
    <footer className="bg-ink border-t border-mist">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Col 1 — Navigazione */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wide mb-6">
              Navigazione
            </h3>
            <ul className="space-y-3">
              {navigazione.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-fog text-sm hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-brand-light focus-visible:ring-offset-2 rounded-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2 — Compliance */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wide mb-6">
              Compliance
            </h3>
            <ul className="space-y-3">
              {complianceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-fog text-sm hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-brand-light focus-visible:ring-offset-2 rounded-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Protocollo 23 */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wide mb-6">
              Protocollo 23
            </h3>
            <ul className="space-y-3">
              {protocollo23Links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-fog text-sm hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-brand-light focus-visible:ring-offset-2 rounded-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Convenzione & Legal */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wide mb-6">
              Convenzione &amp; Legal
            </h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-fog text-sm hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-brand-light focus-visible:ring-offset-2 rounded-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  data-action="open-preferences"
                  className="text-fog text-sm hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-brand-light focus-visible:ring-offset-2 rounded-sm"
                >
                  Cookie preferences
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5 — Contatti */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wide mb-6">
              Contatti
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:info@gmconsulting.one"
                  className="text-fog text-sm hover:text-white transition-colors inline-flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-brand-light focus-visible:ring-offset-2 rounded-sm"
                >
                  <Mail size={14} strokeWidth={1.5} aria-hidden="true" />
                  info@gmconsulting.one
                </a>
              </li>
              <li>
                <a
                  href="mailto:gmconsultingct@legalmail.it"
                  className="text-fog text-sm hover:text-white transition-colors inline-flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-brand-light focus-visible:ring-offset-2 rounded-sm"
                >
                  <Mail size={14} strokeWidth={1.5} aria-hidden="true" />
                  gmconsultingct@legalmail.it
                </a>
              </li>
              {/* TODO: telefono */}
              <li className="text-fog text-sm leading-relaxed">
                Via Nuovalucello 81/C<br />
                95126 Catania (CT)
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Legal line */}
      <div className="border-t border-graphite">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12 py-6">
          <p className="text-fog/70 text-xs text-center">
            &copy; 2026 GM Consulting S.r.l. — P.IVA 04006730875 — REA CT-268069 — Sede legale: Via Nuovalucello 81/C, 95126 Catania (CT)
          </p>
        </div>
      </div>
    </footer>
  )
}
