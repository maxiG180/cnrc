"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Grid, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { Section } from "@/components/shared/section";
import { Container } from "@/components/shared/container";
import { PropertyCard } from "@/components/imobiliario/property-card";
import { FilterBar, type FilterState } from "@/components/imobiliario/filter-bar";
import type { ListingFrontmatter } from "@/lib/mdx";

const MapEmbed = dynamic(() => import("@/components/imobiliario/map-embed").then(mod => mod.MapEmbed), {
  ssr: false,
  loading: () => <MapLoading />,
});

function MapLoading() {
  const t = useTranslations("imobiliario.listings");
  return (
    <div className="w-full h-full rounded-lg bg-[color:var(--color-bone-soft)] flex items-center justify-center">
      <p className="text-[color:var(--color-stone-dark)] text-sm">{t("loadingMap")}</p>
    </div>
  );
}

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
  const t = useTranslations("imobiliario.listings");

  const [filters, setFilters] = useState<FilterState>({
    category: initialCategory,
    district: "Todos",
    search: "",
    priceRange: [0, 10000000],
    badges: [],
  });

  useEffect(() => {
    if (heroFilters) {
      setFilters(heroFilters);
    }
  }, [heroFilters]);

  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [highlightedSlug, setHighlightedSlug] = useState<string | null>(null);
  const [visibleSlugs, setVisibleSlugs] = useState<string[] | null>(null);
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handleMarkerClick = (slug: string) => {
    setHighlightedSlug(slug);
    setTimeout(() => setHighlightedSlug(null), 3000);
  };

  const handleClusterClick = (_slugs: string[]) => {};
  const handleVisibleListingsChange = (slugs: string[]) => {
    setVisibleSlugs(slugs.length > 0 ? slugs : null);
  };

  const filteredListings = useMemo(() => {
    return listings.filter((listing) => {
      const { frontmatter } = listing;

      if (viewMode === "map" && visibleSlugs !== null) {
        if (!visibleSlugs.includes(listing.slug)) return false;
      }

      if (filters.category !== "todos" && frontmatter.category !== filters.category) return false;
      if (filters.district !== "Todos" && frontmatter.district !== filters.district) return false;

      if (filters.search) {
        const s = filters.search.toLowerCase();
        const titleMatch = frontmatter.title.toLowerCase().includes(s);
        const locationMatch = frontmatter.location.toLowerCase().includes(s);
        const municipalityMatch = frontmatter.municipality?.toLowerCase().includes(s);
        if (!titleMatch && !locationMatch && !municipalityMatch) return false;
      }

      if (filters.badges.length > 0) {
        if (!frontmatter.badges || frontmatter.badges.length === 0) return false;
        const hasMatchingBadge = filters.badges.some((b) => frontmatter.badges?.includes(b));
        if (!hasMatchingBadge) return false;
      }

      return true;
    });
  }, [listings, filters, visibleSlugs, viewMode]);

  return (
    <>
      {showCategoryTabs && (
        <FilterBar initialFilters={filters} onFilterChange={setFilters} showCategoryTabs={showCategoryTabs} />
      )}

      <Section tone="bone" spacing="lg" className={className}>
        <Container size="wide">
          <div className="mb-8 flex items-center justify-between">
            <p className="text-sm text-[color:var(--color-stone-dark)]">
              {filteredListings.length === 1
                ? t("oneFound")
                : t("manyFound", { count: filteredListings.length })}
            </p>

            <div className="hidden lg:flex gap-2 bg-white border border-[color:var(--color-stone)]/30 p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
                  viewMode === "grid" ? "bg-[color:var(--color-navy)] text-white" : "text-[color:var(--color-ink)]/70 hover:text-[color:var(--color-navy)]"
                }`}
                aria-label={t("gridView")}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("map")}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
                  viewMode === "map" ? "bg-[color:var(--color-navy)] text-white" : "text-[color:var(--color-ink)]/70 hover:text-[color:var(--color-navy)]"
                }`}
                aria-label={t("mapView")}
              >
                <MapPin className="h-4 w-4" />
              </button>
            </div>
          </div>

          {filteredListings.length > 0 ? (
            viewMode === "map" ? (
              <div className="flex gap-6">
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
                      <PropertyCard slug={listing.slug} frontmatter={listing.frontmatter} />
                    </div>
                  ))}
                </div>

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
                  <PropertyCard key={listing.slug} slug={listing.slug} frontmatter={listing.frontmatter} />
                ))}
              </div>
            )
          ) : (
            <div className="py-20 text-center">
              <p className="text-lg text-[color:var(--color-stone-dark)] mb-4">{t("noResults")}</p>
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
                {t("clearAll")}
              </button>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
