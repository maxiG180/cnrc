"use client";

import { useState } from "react";
import { HeroSearch } from "./hero-search";
import { ListingsView } from "./listings-view";
import type { FilterState } from "./filter-bar";
import type { ListingFrontmatter } from "@/lib/mdx";

type Listing = {
  slug: string;
  frontmatter: ListingFrontmatter;
  content: string;
};

type ImobiliarioPageClientProps = {
  listings: Listing[];
};

export function ImobiliarioPageClient({ listings }: ImobiliarioPageClientProps) {
  const [heroFilters, setHeroFilters] = useState<FilterState | null>(null);

  return (
    <>
      {/* Hero with integrated search */}
      <HeroSearch onSearch={setHeroFilters} />

      {/* Spacing to accommodate the overlapping search card */}
      <div className="pt-20 md:pt-24" />

      {/* Client-side filtered listings - hide category tabs since they're in hero */}
      <ListingsView
        listings={listings}
        showCategoryTabs={false}
        heroFilters={heroFilters}
      />
    </>
  );
}
