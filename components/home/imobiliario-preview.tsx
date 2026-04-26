import Link from "next/link";
import { Container } from "@/components/shared/container";
import { PropertyCard } from "@/components/imobiliario/property-card";
import { getAllListings } from "@/lib/mdx";
import { ArrowRight } from "lucide-react";

export function ImobiliarioPreview() {
  const listings = getAllListings().slice(0, 3); // Get first 3 listings

  return (
    <Container size="wide">
      {/* Header with View All Link */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="eyebrow text-[color:var(--color-gold)]">Imobiliário</p>
          <h2 className="mt-2 text-[color:var(--color-navy)]">
            Descubra o seu próximo imóvel
          </h2>
        </div>
        <Link
          href="/imobiliario"
          className="hidden md:inline-flex items-center gap-2 text-[color:var(--color-navy)] hover:text-[color:var(--color-gold)] font-medium transition-colors"
        >
          Ver todos
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Properties Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {listings.map((listing) => (
          <PropertyCard
            key={listing.slug}
            slug={listing.slug}
            frontmatter={listing.frontmatter}
          />
        ))}
      </div>

      {/* Mobile View All Link */}
      <div className="mt-8 text-center md:hidden">
        <Link
          href="/imobiliario"
          className="inline-flex items-center gap-2 text-[color:var(--color-navy)] hover:text-[color:var(--color-gold)] font-medium transition-colors"
        >
          Ver todos os imóveis
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </Container>
  );
}
