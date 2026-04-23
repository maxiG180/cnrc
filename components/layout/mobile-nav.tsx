"use client";

import Link from "next/link";
import { useEffect } from "react";
import { X, ChevronDown, Phone } from "lucide-react";
import { mainNav } from "@/content/shared/nav";
import { company } from "@/content/shared/company-info";
import { formatPhoneHref, cn } from "@/lib/utils";
import { Logo } from "./logo";

export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    const prevPosition = document.body.style.position;
    const scrollY = window.scrollY;

    // Lock scroll and fix position
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.position = prevPosition;
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = prev;
      window.scrollTo(0, scrollY);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <div
      className={cn(
        "lg:hidden fixed inset-0 z-[90] transition-opacity",
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}
      aria-hidden={!open}
    >
      <div className="absolute inset-0 bg-[color:var(--color-navy-deep)]/70 backdrop-blur-sm" onClick={onClose} />
      <div
        className={cn(
          "absolute right-0 top-0 h-full w-[88%] max-w-[420px] bg-[color:var(--color-bone)] shadow-[var(--shadow-strong)] transition-transform duration-300 flex flex-col",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-6 border-b border-[color:var(--color-stone)]/30">
          <Logo variant="dark" />
          <button type="button" onClick={onClose} aria-label="Fechar menu" className="p-3">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-6">
          <ul className="space-y-1">
            {mainNav.map((group) => (
              <li key={group.label}>
                {group.columns || group.children ? (
                  <details className="group border-b border-[color:var(--color-stone)]/30 py-3">
                    <summary className="flex items-center justify-between cursor-pointer list-none text-[color:var(--color-navy)] text-sm font-medium uppercase tracking-wider">
                      {group.label}
                      <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                    </summary>
                    <ul className="mt-3 space-y-2 pl-2">
                      {group.children?.map((c) => (
                        <li key={c.href}>
                          <Link
                            href={c.href}
                            onClick={onClose}
                            className="block py-1.5 text-sm text-[color:var(--color-navy)]/85 hover:text-[color:var(--color-gold-dim)]"
                          >
                            {c.label}
                          </Link>
                        </li>
                      ))}
                      {group.columns?.map((col) => (
                        <li key={col.heading} className="mt-3">
                          <p className="eyebrow mb-2">{col.heading}</p>
                          <ul className="space-y-1.5 pl-2">
                            {col.items.map((it) => (
                              <li key={it.href}>
                                <Link
                                  href={it.href}
                                  onClick={onClose}
                                  className="block py-1 text-sm text-[color:var(--color-navy)]/85 hover:text-[color:var(--color-gold-dim)]"
                                >
                                  {it.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : (
                  <Link
                    href={group.href ?? "#"}
                    onClick={onClose}
                    className="block border-b border-[color:var(--color-stone)]/30 py-4 text-sm font-medium uppercase tracking-wider text-[color:var(--color-navy)]"
                  >
                    {group.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-6 border-t border-[color:var(--color-stone)]/30 space-y-2">
          <Link
            href={formatPhoneHref(company.phones.free)}
            className="inline-flex w-full items-center justify-center gap-2 bg-[color:var(--color-navy)] px-4 py-3 text-sm uppercase tracking-wider text-[color:var(--color-bone)]"
          >
            <Phone className="h-4 w-4 text-[color:var(--color-gold-bright)]" />
            {company.phones.free}
          </Link>
          <p className="text-xs text-[color:var(--color-stone-dark)] text-center">Chamada gratuita · {company.hours}</p>
        </div>
      </div>
    </div>
  );
}
