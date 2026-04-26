import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Bed, Bath, Ruler } from "lucide-react";
import { getImobiliarioCategory } from "@/content/shared/imobiliario-categories";
import type { ListingFrontmatter } from "@/lib/mdx";

type PropertyCardProps = {
  slug: string;
  frontmatter: ListingFrontmatter;
};

const BADGE_STYLES = {
  novo: "bg-[color:var(--color-success)] text-white",
  investimento: "bg-[color:var(--color-gold)] text-[color:var(--color-navy)]",
  exclusivo: "bg-[color:var(--color-navy)] text-white",
  reduzido: "bg-[color:var(--color-danger)] text-white",
} as const;

const BADGE_LABELS = {
  novo: "Novo",
  investimento: "Investimento",
  exclusivo: "Exclusivo",
  reduzido: "Reduzido",
} as const;

export function PropertyCard({ slug, frontmatter }: PropertyCardProps) {
  const cat = getImobiliarioCategory(frontmatter.category);
  const href = `/imobiliario/${frontmatter.category}/${slug}`;

  return (
    <Link
      href={href}
      className="group block bg-[color:var(--color-bone)] hover:shadow-2xl transition-all duration-500"
    >
      {/* Hero Image with 4:3 aspect ratio (smaller, better quality) */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[color:var(--color-stone)]/20">
        {frontmatter.hero && (
          <>
            <Image
              src={frontmatter.hero}
              alt={frontmatter.title}
              fill
              sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Watermark Overlay */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <Image
                src="/Logos/CNRC/Logos_CNRC_Transparent.png"
                alt=""
                width={60}
                height={24}
                className="opacity-25"
                style={{ objectFit: "contain" }}
              />
            </div>
          </>
        )}

        {/* Badges Overlay */}
        {frontmatter.badges && frontmatter.badges.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            {frontmatter.badges.map((badge) => {
              const badgeKey = badge.toLowerCase() as keyof typeof BADGE_STYLES;
              const style = BADGE_STYLES[badgeKey] || BADGE_STYLES.novo;
              const label = BADGE_LABELS[badgeKey] || badge;

              return (
                <span
                  key={badge}
                  className={`px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider ${style} shadow-md`}
                >
                  {label}
                </span>
              );
            })}
          </div>
        )}

        {/* Energy Rating Badge */}
        {frontmatter.energyRating && (
          <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1.5 shadow-lg z-10">
            <p className="text-[9px] uppercase tracking-wider text-[color:var(--color-stone-dark)] font-medium">
              Classe Energética
            </p>
            <p className="text-xl font-bold text-[color:var(--color-navy)] leading-none mt-0.5">
              {frontmatter.energyRating}
            </p>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Location */}
        <p className="text-xs text-[color:var(--color-stone-dark)] uppercase tracking-wider">
          {frontmatter.location}
        </p>

        {/* Title */}
        <h3 className="mt-1.5 text-base text-[color:var(--color-navy)] leading-tight font-display group-hover:text-[color:var(--color-gold-dim)] transition-colors line-clamp-2">
          {frontmatter.title}
        </h3>

        {/* Specs Icons Row */}
        {(frontmatter.bedrooms || frontmatter.bathrooms || frontmatter.area) && (
          <div className="mt-3 flex items-center gap-3 text-xs text-[color:var(--color-ink)]/60">
            {frontmatter.bedrooms && (
              <div className="flex items-center gap-1">
                <Bed className="h-3.5 w-3.5" />
                <span>T{frontmatter.bedrooms}</span>
              </div>
            )}
            {frontmatter.bathrooms && (
              <div className="flex items-center gap-1">
                <Bath className="h-3.5 w-3.5" />
                <span>{frontmatter.bathrooms}</span>
              </div>
            )}
            {frontmatter.area && (
              <div className="flex items-center gap-1">
                <Ruler className="h-3.5 w-3.5" />
                <span>{frontmatter.area} m²</span>
              </div>
            )}
          </div>
        )}

        {/* Price */}
        <div className="mt-3">
          {frontmatter.price ? (
            <span className="text-base font-semibold text-[color:var(--color-gold)]">
              {frontmatter.price}
            </span>
          ) : (
            <span className="text-sm text-[color:var(--color-stone-dark)]">Sob consulta</span>
          )}
        </div>
      </div>
    </Link>
  );
}
