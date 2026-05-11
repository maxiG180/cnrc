"use client";

import { useLocale } from "next-intl";
import { useTransition } from "react";
import { setLocale } from "@/i18n/actions";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/config";

export function LanguageSwitcher({ variant = "header" }: { variant?: "header" | "mobile" }) {
  const current = useLocale() as Locale;
  const [isPending, startTransition] = useTransition();

  const change = (next: Locale) => {
    if (next === current || isPending) return;
    startTransition(() => {
      setLocale(next);
    });
  };

  const base =
    "inline-flex items-center text-xs font-medium uppercase tracking-wider transition-colors";
  const wrapper =
    variant === "header"
      ? "border border-[color:var(--color-stone)]/40 divide-x divide-[color:var(--color-stone)]/40"
      : "border border-[color:var(--color-stone)]/40 divide-x divide-[color:var(--color-stone)]/40 w-full justify-center";

  return (
    <div className={cn("inline-flex", wrapper)} role="group" aria-label="Language">
      {(["pt", "en"] as const).map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => change(loc)}
          aria-pressed={current === loc}
          disabled={isPending}
          className={cn(
            base,
            "px-2.5 py-1.5",
            current === loc
              ? "bg-[color:var(--color-navy)] text-[color:var(--color-bone)]"
              : "text-[color:var(--color-navy)]/70 hover:text-[color:var(--color-navy)]",
            isPending && "opacity-60"
          )}
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
