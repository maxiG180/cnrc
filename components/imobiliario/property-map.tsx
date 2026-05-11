"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import type { ListingFrontmatter } from "@/lib/mdx";

const MapEmbed = dynamic(() => import("@/components/imobiliario/map-embed").then(mod => mod.MapEmbed), {
  ssr: false,
  loading: () => <MapLoading />,
});

function MapLoading() {
  const t = useTranslations("imobiliario.map");
  return (
    <div className="w-full h-96 md:h-[500px] rounded-lg bg-[color:var(--color-bone-soft)] flex items-center justify-center">
      <p className="text-[color:var(--color-stone-dark)] text-sm">{t("loading")}</p>
    </div>
  );
}

type PropertyMapProps = { frontmatter: ListingFrontmatter };

export function PropertyMap({ frontmatter }: PropertyMapProps) {
  if (!frontmatter.coordinates) return null;

  return (
    <div className="w-full h-96 md:h-[500px]">
      <MapEmbed listings={[]} frontmatter={frontmatter} />
    </div>
  );
}
