"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

type LogoProps = {
  variant?: "light" | "dark";
  className?: string;
  withTagline?: boolean;
};

export function Logo({ variant = "dark", className, withTagline = false }: LogoProps) {
  const t = useTranslations();
  const fg = variant === "light" ? "var(--color-bone)" : "var(--color-navy)";
  const accent = "var(--color-gold)";

  return (
    <Link href="/" className={cn("group inline-flex items-center gap-3", className)} aria-label={t("common.logoAria")}>
      <Image
        src={variant === "light" ? "/Logos/CNRC/Logo_CNRC_Light.png" : "/Logos/CNRC/Logo_CNRC.png"}
        alt={t("common.logoAlt")}
        width={320}
        height={70}
        className={cn(
          "shrink-0 object-contain w-auto",
          variant === "light" ? "h-[120px]" : "h-[72px]"
        )}
        priority
      />
      {withTagline && (
        <span className="flex flex-col leading-tight">
          <span
            className="font-display text-lg tracking-tight transition-colors"
            style={{ color: fg }}
          >
            Camacho <span style={{ color: accent }}>&amp;</span> Nunes
          </span>
          <span className="text-[0.625rem] tracking-[0.22em] uppercase" style={{ color: fg, opacity: 0.7 }}>
            {t("common.logoTagline")}
          </span>
        </span>
      )}
    </Link>
  );
}
