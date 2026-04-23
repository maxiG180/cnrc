import { cn } from "@/lib/utils";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  size?: "narrow" | "content" | "wide";
  as?: "div" | "section" | "article";
};

const SIZE_CLASSES = {
  narrow: "max-w-[var(--container-narrow)]",
  content: "max-w-[var(--container-content)]",
  wide: "max-w-[var(--container-wide)]",
} as const;

export function Container({ children, className, size = "content", as: Tag = "div" }: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full px-6 md:px-10", SIZE_CLASSES[size], className)}>
      {children}
    </Tag>
  );
}
