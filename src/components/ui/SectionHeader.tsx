import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  eyebrow: string
  title: string
  lead?: string
  className?: string
  align?: "left" | "center"
}

export function SectionHeader({
  eyebrow,
  title,
  lead,
  className,
  align = "left",
}: SectionHeaderProps) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      <p className="text-eyebrow uppercase tracking-[0.12em] text-brand mb-4">
        {eyebrow}
      </p>
      <h2 className="text-h2 text-ink mb-4">{title}</h2>
      {lead && (
        <p
          className={cn(
            "text-body-lg text-steel max-w-2xl",
            align === "center" && "mx-auto"
          )}
        >
          {lead}
        </p>
      )}
    </div>
  )
}
