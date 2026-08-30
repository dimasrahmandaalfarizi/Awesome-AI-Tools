import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-mono font-medium transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-[var(--border)] bg-[var(--surface-hover)] text-[var(--foreground)]",
        secondary:
          "border-[var(--border)] bg-[var(--surface)] text-[var(--muted)]",
        destructive:
          "border-red-900/50 bg-red-950/40 text-red-400",
        outline: "border-[var(--border)] bg-transparent text-[var(--muted)]",
        accent: "border-emerald-900/50 bg-emerald-950/40 text-emerald-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
