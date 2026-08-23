import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-xs md:text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--border)] disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--foreground)] text-[var(--background)] shadow-xs hover:bg-[var(--foreground)]/90 transition-all",
        destructive:
          "bg-[var(--danger)] text-white shadow-xs hover:bg-[var(--danger)]/90 transition-all",
        outline:
          "border border-[var(--border)] bg-transparent text-[var(--foreground)] shadow-xs hover:bg-[var(--surface)] hover:border-[var(--muted)] transition-all",
        secondary:
          "bg-[var(--surface)] text-[var(--foreground)] shadow-xs hover:bg-[var(--surface-hover)] border border-[var(--border)] transition-all",
        ghost: "text-[var(--muted)] hover:bg-[var(--surface)] hover:text-[var(--foreground)] transition-all",
        link: "text-[var(--foreground)] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-3.5 py-2",
        sm: "h-8 rounded-lg px-2.5 text-xs",
        lg: "h-10 rounded-lg px-6 text-sm",
        icon: "h-8 w-8 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
