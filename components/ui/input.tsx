import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        "flex h-12 w-full border border-[color:var(--color-stone)]/60 bg-transparent px-4 py-2 text-sm text-[color:var(--color-ink)] placeholder:text-[color:var(--color-stone-dark)] transition-colors focus:border-[color:var(--color-navy)] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "flex min-h-[140px] w-full border border-[color:var(--color-stone)]/60 bg-transparent px-4 py-3 text-sm text-[color:var(--color-ink)] placeholder:text-[color:var(--color-stone-dark)] transition-colors focus:border-[color:var(--color-navy)] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";
