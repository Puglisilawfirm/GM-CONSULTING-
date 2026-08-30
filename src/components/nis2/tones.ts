import type { Nis2Tone } from "@/lib/landings/nis2-dossier"

/** Una tinta per famiglia di adempimento: la stessa nelle barre e nelle tabelle. */
export const toneBar: Record<Nis2Tone, string> = {
  brand: "bg-brand text-white",
  gold: "bg-gold-500 text-navy-950",
  danger: "bg-danger text-white",
  warning: "bg-warning text-white",
  success: "bg-success text-white",
}

export const toneRow: Record<Nis2Tone, string> = {
  brand: "bg-brand-soft/60",
  gold: "bg-gold-300/30",
  danger: "bg-danger/10",
  warning: "bg-accent-soft/70",
  success: "bg-success/10",
}

export const toneMarker: Record<Nis2Tone, string> = {
  brand: "border-l-4 border-brand",
  gold: "border-l-4 border-gold-500",
  danger: "border-l-4 border-danger",
  warning: "border-l-4 border-warning",
  success: "border-l-4 border-success",
}
