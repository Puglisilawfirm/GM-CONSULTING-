import { cn } from "@/lib/utils"

interface HeroProps {
  variant: "full" | "compact"
  eyebrow: string
  title: string
  lead: string
  children?: React.ReactNode
}

export function Hero({ variant, eyebrow, title, lead, children }: HeroProps) {
  return (
    <section
      className={cn(
        "bg-white",
        variant === "full" ? "py-32 lg:py-40" : "py-20 lg:py-28"
      )}
    >
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <p className="text-eyebrow uppercase tracking-[0.12em] text-brand mb-6">
          {eyebrow}
        </p>
        <h1
          className={cn(
            "text-ink",
            variant === "full" ? "text-display" : "text-h1"
          )}
        >
          {title}
        </h1>
        <p className="text-body-lg text-steel max-w-3xl mt-6">{lead}</p>
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  )
}
