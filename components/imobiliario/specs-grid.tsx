"use client";

import { Bed, Bath, Ruler, Calendar, MapPin, Zap, CheckCircle2, Maximize2 } from "lucide-react";
import { useTranslations } from "next-intl";
import type { ListingFrontmatter } from "@/lib/mdx";

type SpecsGridProps = { frontmatter: ListingFrontmatter };

const ENERGY_RATING_COLORS: Record<string, string> = {
  "A+": "bg-green-600",
  A: "bg-green-500",
  B: "bg-lime-500",
  C: "bg-yellow-500",
  D: "bg-orange-500",
  E: "bg-red-500",
  F: "bg-red-600",
};

export function SpecsGrid({ frontmatter }: SpecsGridProps) {
  const t = useTranslations("imobiliario.specs");
  const hasSpecs =
    frontmatter.bedrooms ||
    frontmatter.bathrooms ||
    frontmatter.area ||
    frontmatter.plotArea ||
    frontmatter.year ||
    frontmatter.energyRating ||
    frontmatter.municipality ||
    frontmatter.district;

  if (!hasSpecs && (!frontmatter.features || frontmatter.features.length === 0)) {
    return null;
  }

  return (
    <div className="space-y-8">
      {hasSpecs && (
        <div>
          <h2 className="text-xl font-display text-[color:var(--color-navy)] mb-4">{t("title")}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {frontmatter.bedrooms && (
              <SpecItem icon={<Bed className="h-5 w-5 text-[color:var(--color-navy)]" />} label={t("bedrooms")} value={String(frontmatter.bedrooms)} />
            )}
            {frontmatter.bathrooms && (
              <SpecItem icon={<Bath className="h-5 w-5 text-[color:var(--color-navy)]" />} label={t("bathrooms")} value={String(frontmatter.bathrooms)} />
            )}
            {frontmatter.area && (
              <SpecItem icon={<Ruler className="h-5 w-5 text-[color:var(--color-navy)]" />} label={t("area")} value={`${frontmatter.area} m²`} />
            )}
            {frontmatter.plotArea && (
              <SpecItem
                icon={<Maximize2 className="h-5 w-5 text-[color:var(--color-navy)]" />}
                label={t("plotArea")}
                value={
                  frontmatter.plotArea >= 10000
                    ? `${(frontmatter.plotArea / 10000).toFixed(1)} ha`
                    : `${frontmatter.plotArea.toLocaleString("pt-PT")} m²`
                }
              />
            )}
            {frontmatter.year && (
              <SpecItem icon={<Calendar className="h-5 w-5 text-[color:var(--color-navy)]" />} label={t("year")} value={String(frontmatter.year)} />
            )}
            {frontmatter.energyRating && (
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[color:var(--color-bone-soft)] rounded">
                  <Zap className="h-5 w-5 text-[color:var(--color-navy)]" />
                </div>
                <div>
                  <p className="text-sm text-[color:var(--color-stone-dark)] uppercase tracking-wider">{t("energy")}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span
                      className={`inline-block px-2 py-0.5 text-white text-sm font-bold rounded ${
                        ENERGY_RATING_COLORS[frontmatter.energyRating] || "bg-gray-500"
                      }`}
                    >
                      {frontmatter.energyRating}
                    </span>
                  </div>
                </div>
              </div>
            )}
            {frontmatter.municipality && (
              <SpecItem icon={<MapPin className="h-5 w-5 text-[color:var(--color-navy)]" />} label={t("municipality")} value={frontmatter.municipality} />
            )}
            {frontmatter.district && (
              <SpecItem icon={<MapPin className="h-5 w-5 text-[color:var(--color-navy)]" />} label={t("district")} value={frontmatter.district} />
            )}
          </div>
        </div>
      )}

      {frontmatter.features && frontmatter.features.length > 0 && (
        <div>
          <h3 className="text-lg font-display text-[color:var(--color-navy)] mb-4">{t("amenities")}</h3>
          <div className="flex flex-wrap gap-2">
            {frontmatter.features.map((feature) => (
              <span
                key={feature}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[color:var(--color-bone-soft)] text-[color:var(--color-navy)] text-sm border border-[color:var(--color-stone)]/30"
              >
                <CheckCircle2 className="h-4 w-4 text-[color:var(--color-gold)]" />
                {feature.charAt(0).toUpperCase() + feature.slice(1)}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function SpecItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="p-2 bg-[color:var(--color-bone-soft)] rounded">{icon}</div>
      <div>
        <p className="text-sm text-[color:var(--color-stone-dark)] uppercase tracking-wider">{label}</p>
        <p className="text-lg font-semibold text-[color:var(--color-navy)] mt-0.5">{value}</p>
      </div>
    </div>
  );
}
