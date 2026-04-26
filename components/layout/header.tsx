"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Phone } from "lucide-react";
import { mainNav, type NavGroup } from "@/content/shared/nav";
import { company } from "@/content/shared/company-info";
import { formatPhoneHref, cn } from "@/lib/utils";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    // Check scroll position after hydration
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      suppressHydrationWarning
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[color:var(--color-bone)]/80 backdrop-blur-md shadow-sm"
          : "bg-[color:var(--color-bone)]"
      )}
    >
      <div className="mx-auto flex h-[96px] max-w-[var(--container-wide)] items-center justify-between gap-6 px-6 md:px-10">
        <Logo variant="dark" />

        <nav className="hidden lg:flex items-center gap-4 h-full" onMouseLeave={() => setOpenIdx(null)}>
          {mainNav.map((group, i) => (
            <NavItem key={group.label} group={group} open={openIdx === i} onOpen={() => setOpenIdx(i)} />
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <Link
            href="/contactos"
            className="lg:hidden inline-flex items-center gap-1.5 bg-[color:var(--color-gold)] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[color:var(--color-navy)] hover:bg-[color:var(--color-gold-bright)] transition-colors"
          >
            Contactar
          </Link>
          <Link
            href={formatPhoneHref(company.phones.free)}
            className="hidden lg:inline-flex items-center gap-2 bg-[color:var(--color-navy)] px-4 py-2.5 text-xs font-medium uppercase tracking-wider text-[color:var(--color-bone)] hover:bg-[color:var(--color-navy-deep)] transition-colors"
          >
            <Phone className="h-3.5 w-3.5 text-[color:var(--color-gold-bright)]" />
            {company.phones.free}
          </Link>
          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center p-3 text-[color:var(--color-navy)]"
            aria-label="Abrir menu"
            onClick={() => setOpenMobile(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      <MobileNav open={openMobile} onClose={() => setOpenMobile(false)} />
    </header>
  );
}

function NavItem({ group, open, onOpen }: { group: NavGroup; open: boolean; onOpen: () => void }) {
  const hasDropdown = Boolean(group.children?.length || group.columns?.length);

  const trigger = (
    <button
      type="button"
      onMouseEnter={onOpen}
      onFocus={onOpen}
      aria-expanded={open}
      className={cn(
        "relative px-3 py-6 text-sm font-medium uppercase tracking-wider transition-colors",
        open ? "text-[color:var(--color-navy-deep)]" : "text-[color:var(--color-navy)]/80 hover:text-[color:var(--color-navy)]"
      )}
    >
      {group.label}
      <span
        className={cn(
          "absolute left-3 right-3 bottom-5 h-px bg-[color:var(--color-gold)] origin-left transition-transform duration-300",
          open ? "scale-x-100" : "scale-x-0"
        )}
      />
    </button>
  );

  if (!hasDropdown) {
    const isLive = group.label === "TV Direto";
    return (
      <Link
        href={group.href ?? "#"}
        className="px-3 py-6 text-sm font-medium uppercase tracking-wider text-[color:var(--color-navy)]/80 hover:text-[color:var(--color-navy)] transition-colors inline-flex items-center gap-2"
      >
        {isLive && (
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--color-danger)] opacity-75"></span>
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[color:var(--color-danger)]"></span>
          </span>
        )}
        {group.label}
      </Link>
    );
  }

  return (
    <div className="relative h-full flex items-center">
      {group.href ? (
        <Link
          href={group.href}
          onMouseEnter={onOpen}
          onFocus={onOpen}
          className={cn(
            "relative inline-flex px-3 py-6 text-sm font-medium uppercase tracking-wider transition-colors",
            open ? "text-[color:var(--color-navy-deep)]" : "text-[color:var(--color-navy)]/80 hover:text-[color:var(--color-navy)]"
          )}
        >
          {group.label}
          <span
            className={cn(
              "absolute left-3 right-3 bottom-5 h-px bg-[color:var(--color-gold)] origin-left transition-transform duration-300",
              open ? "scale-x-100" : "scale-x-0"
            )}
          />
        </Link>
      ) : (
        trigger
      )}

      {open && <MegaPanel group={group} />}
    </div>
  );
}

function MegaPanel({ group }: { group: NavGroup }) {
  return (
    <div className="absolute left-0 top-full z-50 w-[min(92vw,880px)] border border-[color:var(--color-stone)]/40 bg-[color:var(--color-bone)] shadow-[var(--shadow-strong)]">
      <div className={cn("grid gap-6 p-8", group.columns ? "md:grid-cols-2" : "md:grid-cols-1")}>
        {group.columns?.map((col) => (
          <div key={col.heading}>
            <p className="eyebrow mb-4">{col.heading}</p>
            <ul className="space-y-2.5">
              {col.items.map((it) => (
                <li key={it.href}>
                  <Link
                    href={it.href}
                    className="block text-sm text-[color:var(--color-navy)]/85 hover:text-[color:var(--color-navy)] hover:translate-x-1 transition-all"
                  >
                    {it.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        {group.children && (
          <ul className="space-y-4">
            {group.children.map((c) => (
              <li key={c.href}>
                <Link href={c.href} className="group block">
                  <div className="text-sm font-medium text-[color:var(--color-navy)] group-hover:text-[color:var(--color-gold-dim)] transition-colors">
                    {c.label}
                  </div>
                  {c.description && (
                    <p className="mt-1 text-xs text-[color:var(--color-stone-dark)]">{c.description}</p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
