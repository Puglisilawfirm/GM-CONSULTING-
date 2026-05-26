import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Richiedi assessment preliminare",
  description:
    "Questionario strutturato per una restituzione tecnica al primo contatto. Risposta entro 72 ore lavorative.",
  alternates: { canonical: "https://www.gmconsulting.one/assessment" },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
