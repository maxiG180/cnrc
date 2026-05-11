"use client";

import { useState, useMemo, useEffect, useRef } from "react";
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
  className?: string;
};

export function ListingsView({
  listings,
  showCategoryTabs = true,
  initialCategory = "todos",
  heroFilters,
  className,
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
  const [highlightedSlug, setHighlightedSlug] = useState<string | null>(null);
  const [visibleSlugs, setVisibleSlugs] = useState<string[] | null>(null);
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Handle marker click from map
  const handleMarkerClick = (slug: string) => {
    setHighlightedSlug(slug);

    // Remove highlight after 3 seconds
    setTimeout(() => {
      setHighlightedSlug(null);
    }, 3000);
  };

  // Handle cluster click from map (deprecated - now handled by visible listings)
  const handleClusterClick = (slugs: string[]) => {
    // This is now handled automatically by onVisibleListingsChange
  };

  // Handle visible listings change from map
  const handleVisibleListingsChange = (slugs: string[]) => {
    setVisibleSlugs(slugs.length > 0 ? slugs : null);
  };

  // Filtered listings
  const filteredListings = useMemo(() => {
    return listings.filter((listing) => {
      const { frontmatter } = listing;

      // In map view, show only visible listings from map viewport
      if (viewMode === "map" && visibleSlugs !== null) {
        if (!visibleSlugs.includes(listing.slug)) {
          return false;
        }
      }

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
  }, [listings, filters, visibleSlugs, viewMode]);

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
      <Section tone="bone" spacing="lg" className={className}>
        <Container size="wide">
          {/* Results count and view toggle */}
          <div className="mb-8 flex items-center justify-between">
            <p className="text-sm text-[color:var(--color-stone-dark)]">
              {filteredListings.length === 1
                ? "1 imóvel encontrado"
                : `${filteredListings.length} imóveis encontrados`}
            </p>

            {/* View Toggle - only show on desktop where map is available */}
            <div className="hidden lg:flex gap-2 bg-white border border-[color:var(--color-stone)]/30 p-1">
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
            viewMode === "map" ? (
              <div className="flex gap-6">
                {/* Left: Property Grid - scrollable */}
                <div className="flex-1 grid gap-6 md:grid-cols-2 auto-rows-max">
                  {filteredListings.map((listing) => (
                    <div
                      key={listing.slug}
                      ref={(el) => {
                        cardRefs.current[listing.slug] = el;
                      }}
                      className={`transition-all duration-300 ${
                        highlightedSlug === listing.slug
                          ? "ring-4 ring-[color:var(--color-gold)] ring-offset-4 rounded-lg"
                          : ""
                      }`}
                    >
                      <PropertyCard
                        slug={listing.slug}
                        frontmatter={listing.frontmatter}
                      />
                    </div>
                  ))}
                </div>

                {/* Right: Map (sticky, always visible on desktop) */}
                <div className="hidden lg:block w-[500px] xl:w-[600px] flex-shrink-0">
                  <div className="sticky top-[112px] h-[calc(100vh-128px)]">
                    <MapEmbed
                      listings={listings}
                      onMarkerClick={handleMarkerClick}
                      onClusterClick={handleClusterClick}
                      onVisibleListingsChange={handleVisibleListingsChange}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredListings.map((listing) => (
                  <PropertyCard
                    key={listing.slug}
                    slug={listing.slug}
                    frontmatter={listing.frontmatter}
                  />
                ))}
              </div>
            )
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
