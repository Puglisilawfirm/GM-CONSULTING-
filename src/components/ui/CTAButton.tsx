import Link from "next/link"
import { cn } from "@/lib/utils"

interface CTAButtonProps {
  variant: "primary" | "secondary" | "ghost"
  href: string
  children: React.ReactNode
  className?: string
}

const analyticsTargets: Record<string, string> = {
  "/aree-di-intervento": "areas",
  "/assessment": "assessment",
  "/compliance": "compliance",
  "/insights": "insights",
  "/metodo": "method",
  "/protocollo-23": "protocollo_23",
  "#diagnostico-aml": "protocollo_23",
  "#metodo": "protocollo_23",
}

const variantStyles = {
  primary: "bg-brand text-white hover:bg-brand-dark",
  secondary: "border border-brand text-brand hover:bg-brand-soft",
  ghost: "text-brand hover:underline",
}

export function CTAButton({
  variant,
  href,
  children,
  className,
}: CTAButtonProps) {
  return (
    <Link
      href={href}
      data-analytics-target={analyticsTargets[href]}
      className={cn(
        "inline-flex items-center justify-center px-6 py-3 font-medium rounded-md transition-colors text-sm focus-visible:ring-2 focus-visible:ring-brand-light focus-visible:ring-offset-2",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </Link>
  )
}
