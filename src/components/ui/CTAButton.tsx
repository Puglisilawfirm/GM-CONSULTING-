import Link from "next/link"
import { cn } from "@/lib/utils"

interface CTAButtonProps {
  variant: "primary" | "secondary" | "ghost"
  href: string
  children: React.ReactNode
  className?: string
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
      className={cn(
        "inline-flex items-center justify-center px-6 py-3 font-medium rounded-md transition-colors text-sm",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </Link>
  )
}
