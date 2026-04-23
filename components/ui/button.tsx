import * as React from "react";
import Link from "next/link";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium tracking-wide uppercase transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        solid:
          "bg-[color:var(--color-navy)] text-[color:var(--color-bone)] hover:bg-[color:var(--color-navy-deep)]",
        gold:
          "bg-[color:var(--color-gold)] text-[color:var(--color-navy-deep)] hover:bg-[color:var(--color-gold-bright)]",
        outline:
          "border border-[color:var(--color-navy)]/30 text-[color:var(--color-navy)] hover:border-[color:var(--color-gold)] hover:text-[color:var(--color-gold-dim)]",
        "outline-light":
          "border border-[color:var(--color-bone)]/30 text-[color:var(--color-bone)] hover:border-[color:var(--color-gold)] hover:text-[color:var(--color-gold-bright)]",
        ghost:
          "text-[color:var(--color-navy)] hover:bg-[color:var(--color-bone-soft)]",
      },
      size: {
        sm: "h-9 px-4",
        md: "h-11 px-6",
        lg: "h-14 px-8 text-[0.875rem]",
      },
    },
    defaultVariants: { variant: "solid", size: "md" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
  }
);
Button.displayName = "Button";

type LinkButtonProps = VariantProps<typeof buttonVariants> &
  React.ComponentProps<typeof Link> & { className?: string };

export function LinkButton({ className, variant, size, ...props }: LinkButtonProps) {
  return <Link className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { Button, buttonVariants };
