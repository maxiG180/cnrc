import {
  Bed,
  Bath,
  Ruler,
  Calendar,
  MapPin,
  Zap,
  CheckCircle2,
  Maximize2,
} from "lucide-react";
import type { ListingFrontmatter } from "@/lib/mdx";

type SpecsGridProps = {
  frontmatter: ListingFrontmatter;
};

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
      {/* Main Specs Grid */}
      {hasSpecs && (
        <div>
          <h2 className="text-xl font-display text-[color:var(--color-navy)] mb-4">
            Características
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {frontmatter.bedrooms && (
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[color:var(--color-bone-soft)] rounded">
                  <Bed className="h-5 w-5 text-[color:var(--color-navy)]" />
                </div>
                <div>
                  <p className="text-sm text-[color:var(--color-stone-dark)] uppercase tracking-wider">
                    Quartos
                  </p>
                  <p className="text-lg font-semibold text-[color:var(--color-navy)] mt-0.5">
                    {frontmatter.bedrooms}
                  </p>
                </div>
              </div>
            )}

            {frontmatter.bathrooms && (
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[color:var(--color-bone-soft)] rounded">
                  <Bath className="h-5 w-5 text-[color:var(--color-navy)]" />
                </div>
                <div>
                  <p className="text-sm text-[color:var(--color-stone-dark)] uppercase tracking-wider">
                    Casas de Banho
                  </p>
                  <p className="text-lg font-semibold text-[color:var(--color-navy)] mt-0.5">
                    {frontmatter.bathrooms}
                  </p>
                </div>
              </div>
            )}

            {frontmatter.area && (
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[color:var(--color-bone-soft)] rounded">
                  <Ruler className="h-5 w-5 text-[color:var(--color-navy)]" />
                </div>
                <div>
                  <p className="text-sm text-[color:var(--color-stone-dark)] uppercase tracking-wider">
                    Área Útil
                  </p>
                  <p className="text-lg font-semibold text-[color:var(--color-navy)] mt-0.5">
                    {frontmatter.area} m²
                  </p>
                </div>
              </div>
            )}

            {frontmatter.plotArea && (
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[color:var(--color-bone-soft)] rounded">
                  <Maximize2 className="h-5 w-5 text-[color:var(--color-navy)]" />
                </div>
                <div>
                  <p className="text-sm text-[color:var(--color-stone-dark)] uppercase tracking-wider">
                    Área do Terreno
                  </p>
                  <p className="text-lg font-semibold text-[color:var(--color-navy)] mt-0.5">
                    {frontmatter.plotArea >= 10000
                      ? `${(frontmatter.plotArea / 10000).toFixed(1)} ha`
                      : `${frontmatter.plotArea.toLocaleString("pt-PT")} m²`}
                  </p>
                </div>
              </div>
            )}

            {frontmatter.year && (
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[color:var(--color-bone-soft)] rounded">
                  <Calendar className="h-5 w-5 text-[color:var(--color-navy)]" />
                </div>
                <div>
                  <p className="text-sm text-[color:var(--color-stone-dark)] uppercase tracking-wider">
                    Ano de Construção
                  </p>
                  <p className="text-lg font-semibold text-[color:var(--color-navy)] mt-0.5">
                    {frontmatter.year}
                  </p>
                </div>
              </div>
            )}

            {frontmatter.energyRating && (
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[color:var(--color-bone-soft)] rounded">
                  <Zap className="h-5 w-5 text-[color:var(--color-navy)]" />
                </div>
                <div>
                  <p className="text-sm text-[color:var(--color-stone-dark)] uppercase tracking-wider">
                    Certificado Energético
                  </p>
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
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[color:var(--color-bone-soft)] rounded">
                  <MapPin className="h-5 w-5 text-[color:var(--color-navy)]" />
                </div>
                <div>
                  <p className="text-sm text-[color:var(--color-stone-dark)] uppercase tracking-wider">
                    Concelho
                  </p>
                  <p className="text-lg font-semibold text-[color:var(--color-navy)] mt-0.5">
                    {frontmatter.municipality}
                  </p>
                </div>
              </div>
            )}

            {frontmatter.district && (
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[color:var(--color-bone-soft)] rounded">
                  <MapPin className="h-5 w-5 text-[color:var(--color-navy)]" />
                </div>
                <div>
                  <p className="text-sm text-[color:var(--color-stone-dark)] uppercase tracking-wider">
                    Distrito
                  </p>
                  <p className="text-lg font-semibold text-[color:var(--color-navy)] mt-0.5">
                    {frontmatter.district}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Features Tags */}
      {frontmatter.features && frontmatter.features.length > 0 && (
        <div>
          <h3 className="text-lg font-display text-[color:var(--color-navy)] mb-4">Comodidades</h3>
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
