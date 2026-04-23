import { cn } from "@/lib/utils";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  tone?: "bone" | "bone-soft" | "navy" | "navy-deep";
  spacing?: "sm" | "md" | "lg" | "xl";
};

const TONES = {
  bone: "bg-[color:var(--color-bone)] text-[color:var(--color-ink)]",
  "bone-soft": "bg-[color:var(--color-bone-soft)] text-[color:var(--color-ink)]",
  navy: "bg-[color:var(--color-navy)] text-[color:var(--color-bone)]",
  "navy-deep": "bg-[color:var(--color-navy-deep)] text-[color:var(--color-bone)]",
} as const;

const SPACING = {
  sm: "py-12 md:py-16",
  md: "py-16 md:py-24",
  lg: "py-24 md:py-32",
  xl: "py-28 md:py-40",
} as const;

export function Section({ children, className, id, tone = "bone", spacing = "md" }: SectionProps) {
  return (
    <section id={id} className={cn(TONES[tone], SPACING[spacing], "relative", className)}>
      {children}
    </section>
  );
}
