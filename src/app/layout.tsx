import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { CookieBanner } from "@/components/CookieBanner"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: {
    default: "GM Consulting S.r.l. — Consulenza direzionale, compliance, automazione",
    template: "%s — GM Consulting S.r.l.",
  },
  description:
    "GM Consulting S.r.l. — Consulenza direzionale per imprese italiane: compliance normativa, automazione dei processi, governance e risk management. Sede a Catania.",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName: "GM Consulting S.r.l.",
    title: "GM Consulting S.r.l. — Consulenza direzionale, compliance, automazione",
    description:
      "Consulenza direzionale per imprese italiane: compliance normativa, automazione dei processi, governance e risk management.",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "GM Consulting S.r.l. — Consulenza direzionale, compliance, automazione",
    description:
      "Consulenza direzionale per imprese italiane: compliance normativa, automazione dei processi, governance e risk management.",
    images: ["/og-default.png"],
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "GM Consulting S.r.l.",
  legalName: "GM Consulting S.r.l.",
  description:
    "Consulenza direzionale per imprese italiane: compliance normativa, automazione dei processi, governance e risk management.",
  url: "https://www.gmconsulting.one",
  email: "info@gmconsulting.one",
  logo: "https://www.gmconsulting.one/logo-gmconsulting-512.png",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Via Nuovalucello 81/C",
    addressLocality: "Catania",
    addressRegion: "CT",
    postalCode: "95126",
    addressCountry: "IT",
  },
  vatID: "04006730875",
  areaServed: {
    "@type": "Country",
    name: "IT",
  },
  serviceType: [
    "Consulenza direzionale",
    "Compliance normativa",
    "Automazione processi",
    "Governance aziendale",
    "Risk management",
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className}`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-brand focus:text-white focus:px-4 focus:py-2 focus:rounded-md"
        >
          Vai al contenuto principale
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  )
}
