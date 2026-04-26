"use client";

import dynamic from "next/dynamic";
import type { ListingFrontmatter } from "@/lib/mdx";

const MapEmbed = dynamic(() => import("@/components/imobiliario/map-embed").then(mod => mod.MapEmbed), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 md:h-[500px] rounded-lg bg-[color:var(--color-bone-soft)] flex items-center justify-center">
      <p className="text-[color:var(--color-stone-dark)] text-sm">A carregar mapa...</p>
    </div>
  ),
});

type PropertyMapProps = {
  frontmatter: ListingFrontmatter;
};

export function PropertyMap({ frontmatter }: PropertyMapProps) {
  if (!frontmatter.coordinates) return null;

  return (
    <div className="w-full h-96 md:h-[500px]">
      <MapEmbed listings={[]} frontmatter={frontmatter} />
    </div>
  );
}
