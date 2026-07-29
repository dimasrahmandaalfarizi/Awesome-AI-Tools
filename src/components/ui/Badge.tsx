import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[var(--primary)] text-white hover:bg-[var(--primary)]/80",
        secondary:
          "border-transparent bg-[var(--surface)] text-[var(--foreground)] hover:bg-[var(--surface)]/80",
        destructive:
          "border-transparent bg-[var(--danger)] text-white hover:bg-[var(--danger)]/80",
        outline: "text-[var(--foreground)] border-[var(--border)]",
        accent: "border-transparent bg-[var(--accent)] text-white hover:bg-[var(--accent)]/80",
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
