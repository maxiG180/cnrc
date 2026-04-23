"use client";

import { useLenis } from "lenis/react";

type AreaNavLinksProps = {
  areas: { slug: string; title: string }[];
};

export function AreaNavLinks({ areas }: AreaNavLinksProps) {
  const lenis = useLenis();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
    e.preventDefault();
    const target = document.getElementById(slug);
    if (!target) return;

    if (lenis) {
      lenis.scrollTo(target, {
        offset: -96, // Account for navbar height
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      });
    } else {
      // Fallback for when Lenis isn't available
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="mt-16 flex flex-wrap gap-x-8 gap-y-3">
      {areas.map((a) => (
        <a
          key={a.slug}
          href={`#${a.slug}`}
          onClick={(e) => handleClick(e, a.slug)}
          className="text-sm uppercase tracking-[0.18em] text-[color:var(--color-bone)]/70 hover:text-[color:var(--color-gold-bright)] transition-colors"
        >
          {a.title}
        </a>
      ))}
    </div>
  );
}
