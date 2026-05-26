import type { Metadata } from "next"
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { BannerProdottiAnimato } from "@/components/banner-prodotti-animato"
import { CookieBanner } from "@/components/CookieBanner"

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
})

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
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
  alternateName: "GM Consulting",
  description:
    "Società di consulenza italiana specializzata in compliance strategica, governance, finanza-controllo, legal tech, automazione di processo e healthcare/emergency management.",
  url: "https://www.gmconsulting.one",
  email: "info@gmconsulting.one",
  logo: "https://www.gmconsulting.one/logo-gmconsulting-512.png",
  image: "https://www.gmconsulting.one/logo-gmconsulting-512.png",
  foundingDate: "2002-10-30",
  vatID: "IT04006730875",
  taxID: "04006730875",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Via Nuovalucello 81/C",
    addressLocality: "Catania",
    addressRegion: "CT",
    postalCode: "95126",
    addressCountry: "IT",
  },
  areaServed: "IT",
  knowsAbout: [
    "Compliance Strategica",
    "Modello 231",
    "GDPR",
    "NIS2",
    "ISO 27001",
    "ISO 37001",
    "UNI 11871:2022",
    "Governance",
    "Business Continuity",
    "Healthcare Emergency Management",
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it" className={`${playfair.variable} ${inter.variable} ${jetbrains.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-gold-500 focus:text-navy-950 focus:px-4 focus:py-2 focus:rounded-md focus:font-medium"
        >
          Vai al contenuto principale
        </a>
        <SiteHeader />
        <BannerProdottiAnimato />
        <main id="main-content">{children}</main>
        <SiteFooter />
        <CookieBanner />
      </body>
    </html>
  )
}
