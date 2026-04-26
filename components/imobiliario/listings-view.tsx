"use client";

import { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import { Grid, MapPin } from "lucide-react";
import { Section } from "@/components/shared/section";
import { Container } from "@/components/shared/container";
import { PropertyCard } from "@/components/imobiliario/property-card";
import { FilterBar, type FilterState } from "@/components/imobiliario/filter-bar";
import type { ListingFrontmatter } from "@/lib/mdx";

const MapEmbed = dynamic(() => import("@/components/imobiliario/map-embed").then(mod => mod.MapEmbed), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full rounded-lg bg-[color:var(--color-bone-soft)] flex items-center justify-center">
      <p className="text-[color:var(--color-stone-dark)] text-sm">A carregar mapa...</p>
    </div>
  ),
});

type Listing = {
  slug: string;
  frontmatter: ListingFrontmatter;
  content: string;
};

type ListingsViewProps = {
  listings: Listing[];
  showCategoryTabs?: boolean;
  initialCategory?: string;
  heroFilters?: FilterState | null;
};

export function ListingsView({
  listings,
  showCategoryTabs = true,
  initialCategory = "todos",
  heroFilters,
}: ListingsViewProps) {
  const [filters, setFilters] = useState<FilterState>({
    category: initialCategory,
    district: "Todos",
    search: "",
    priceRange: [0, 10000000],
    badges: [],
  });

  // Update filters when hero search is triggered
  useEffect(() => {
    if (heroFilters) {
      setFilters(heroFilters);
    }
  }, [heroFilters]);

  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");

  // Filtered listings
  const filteredListings = useMemo(() => {
    return listings.filter((listing) => {
      const { frontmatter } = listing;

      // Category filter
      if (filters.category !== "todos" && frontmatter.category !== filters.category) {
        return false;
      }

      // District filter
      if (filters.district !== "Todos" && frontmatter.district !== filters.district) {
        return false;
      }

      // Search filter (title or location)
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const titleMatch = frontmatter.title.toLowerCase().includes(searchLower);
        const locationMatch = frontmatter.location.toLowerCase().includes(searchLower);
        const municipalityMatch = frontmatter.municipality?.toLowerCase().includes(searchLower);

        if (!titleMatch && !locationMatch && !municipalityMatch) {
          return false;
        }
      }

      // Badge filters
      if (filters.badges.length > 0) {
        if (!frontmatter.badges || frontmatter.badges.length === 0) {
          return false;
        }

        const hasMatchingBadge = filters.badges.some((filterBadge) =>
          frontmatter.badges?.includes(filterBadge)
        );

        if (!hasMatchingBadge) {
          return false;
        }
      }

      return true;
    });
  }, [listings, filters]);

  return (
    <>
      {/* Filter Bar - only show when hero search is not present */}
      {showCategoryTabs && (
        <FilterBar
          initialFilters={filters}
          onFilterChange={setFilters}
          showCategoryTabs={showCategoryTabs}
        />
      )}

      {/* Listings Grid with Map Split View */}
      <Section tone="bone" spacing="lg">
        <Container size="wide">
          {/* Results count and view toggle */}
          <div className="mb-8 flex items-center justify-between">
            <p className="text-sm text-[color:var(--color-stone-dark)]">
              {filteredListings.length === 1
                ? "1 imóvel encontrado"
                : `${filteredListings.length} imóveis encontrados`}
            </p>

            {/* View Toggle */}
            <div className="flex gap-2 bg-white border border-[color:var(--color-stone)]/30 p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
                  viewMode === "grid"
                    ? "bg-[color:var(--color-navy)] text-white"
                    : "text-[color:var(--color-ink)]/70 hover:text-[color:var(--color-navy)]"
                }`}
                aria-label="Grid view"
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("map")}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
                  viewMode === "map"
                    ? "bg-[color:var(--color-navy)] text-white"
                    : "text-[color:var(--color-ink)]/70 hover:text-[color:var(--color-navy)]"
                }`}
                aria-label="Map view"
              >
                <MapPin className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Content Layout */}
          {filteredListings.length > 0 ? (
            <div className="flex gap-6">
              {/* Left: Property Grid - scrollable */}
              <div className="flex-1 grid gap-6 md:grid-cols-2 auto-rows-max">
                {filteredListings.map((listing) => (
                  <PropertyCard
                    key={listing.slug}
                    slug={listing.slug}
                    frontmatter={listing.frontmatter}
                  />
                ))}
              </div>

              {/* Right: Map (sticky, always visible on desktop) */}
              <div className="hidden lg:block w-[500px] xl:w-[600px] flex-shrink-0">
                <div className="sticky top-24 h-[calc(100vh-8rem)]">
                  <MapEmbed listings={filteredListings} />
                </div>
              </div>
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-lg text-[color:var(--color-stone-dark)] mb-4">
                Nenhum imóvel encontrado com os filtros selecionados.
              </p>
              <button
                onClick={() =>
                  setFilters({
                    category: initialCategory,
                    district: "Todos",
                    search: "",
                    priceRange: [0, 10000000],
                    badges: [],
                  })
                }
                className="text-sm text-[color:var(--color-gold)] hover:text-[color:var(--color-navy)] underline transition-colors"
              >
                Limpar todos os filtros
              </button>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
