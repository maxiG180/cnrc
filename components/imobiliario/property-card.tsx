import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getImobiliarioCategory } from "@/content/shared/imobiliario-categories";

type PropertyCardProps = {
  slug: string;
  title: string;
  category: string;
  location: string;
  hero?: string;
  price?: string;
  summary?: string;
};

export function PropertyCard({ slug, title, category, location, hero, price, summary }: PropertyCardProps) {
  const cat = getImobiliarioCategory(category);
  const href = `/imobiliario/${category}/${slug}`;

  return (
    <Link
      href={href}
      className="group block border border-[color:var(--color-stone)]/40 bg-[color:var(--color-bone)] hover:border-[color:var(--color-gold-dim)] transition-colors"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[color:var(--color-stone)]/20">
        {hero && (
          <Image
            src={hero}
            alt={title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
      </div>
      <div className="p-6">
        <p className="eyebrow text-[color:var(--color-stone-dark)]">
          {cat?.label ?? category} · {location}
        </p>
        <h3 className="mt-3 text-xl text-[color:var(--color-navy)] leading-tight">{title}</h3>
        {summary && (
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-ink)]/75 line-clamp-3">
            {summary}
          </p>
        )}
        <div className="mt-5 flex items-center justify-between">
          {price ? (
            <span className="text-sm font-medium text-[color:var(--color-navy)]">{price}</span>
          ) : (
            <span className="text-sm text-[color:var(--color-stone-dark)]">Sob consulta</span>
          )}
          <span className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.2em] text-[color:var(--color-gold-dim)] group-hover:text-[color:var(--color-navy)]">
            Ver <ArrowUpRight className="h-3 w-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}
