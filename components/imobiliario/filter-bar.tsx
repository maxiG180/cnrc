"use client";

import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { imobiliarioCategories } from "@/content/shared/imobiliario-categories";

export type FilterState = {
  category: string;
  district: string;
  search: string;
  priceRange: [number, number];
  badges: string[];
};

type FilterBarProps = {
  initialFilters?: Partial<FilterState>;
  onFilterChange: (filters: FilterState) => void;
  showCategoryTabs?: boolean;
};

const DISTRICTS = [
  "Todos",
  "Lisboa",
  "Porto",
  "Faro",
  "Setúbal",
  "Évora",
  "Braga",
  "Coimbra",
  "Aveiro",
];

const BADGE_OPTIONS = [
  { value: "novo", label: "Novo" },
  { value: "investimento", label: "Investimento" },
  { value: "exclusivo", label: "Exclusivo" },
  { value: "reduzido", label: "Reduzido" },
];

export function FilterBar({
  initialFilters,
  onFilterChange,
  showCategoryTabs = true,
}: FilterBarProps) {
  const [filters, setFilters] = useState<FilterState>({
    category: initialFilters?.category || "todos",
    district: initialFilters?.district || "Todos",
    search: initialFilters?.search || "",
    priceRange: initialFilters?.priceRange || [0, 10000000],
    badges: initialFilters?.badges || [],
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const toggleBadge = (badge: string) => {
    const newBadges = filters.badges.includes(badge)
      ? filters.badges.filter((b) => b !== badge)
      : [...filters.badges, badge];
    updateFilter("badges", newBadges);
  };

  return (
    <div className="bg-white shadow-lg">
      {/* Category Tabs */}
      {showCategoryTabs && (
        <div className="border-b border-[color:var(--color-stone)]/20 overflow-x-auto">
          <div className="flex min-w-max px-6 md:px-10">
            <button
              onClick={() => updateFilter("category", "todos")}
              className={`px-6 py-4 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${
                filters.category === "todos"
                  ? "border-[color:var(--color-gold)] text-[color:var(--color-navy)]"
                  : "border-transparent text-[color:var(--color-ink)]/60 hover:text-[color:var(--color-navy)]"
              }`}
            >
              Todos
            </button>
            {imobiliarioCategories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => updateFilter("category", cat.slug)}
                className={`px-6 py-4 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${
                  filters.category === cat.slug
                    ? "border-[color:var(--color-gold)] text-[color:var(--color-navy)]"
                    : "border-transparent text-[color:var(--color-ink)]/60 hover:text-[color:var(--color-navy)]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Filter Row - Inline Dropdowns */}
      <div className="px-6 md:px-10 py-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* Location/Search */}
          <div className="relative">
            <select
              value={filters.district}
              onChange={(e) => updateFilter("district", e.target.value)}
              className="w-full appearance-none px-4 py-3.5 bg-[color:var(--color-bone-soft)] text-sm text-[color:var(--color-navy)] font-medium focus:outline-none focus:ring-2 focus:ring-[color:var(--color-gold)] cursor-pointer"
            >
              <option value="Todos">Localização</option>
              {DISTRICTS.slice(1).map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-[color:var(--color-navy)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Property Type */}
          <div className="relative">
            <select
              value={filters.category}
              onChange={(e) => updateFilter("category", e.target.value)}
              className="w-full appearance-none px-4 py-3.5 bg-[color:var(--color-bone-soft)] text-sm text-[color:var(--color-navy)] font-medium focus:outline-none focus:ring-2 focus:ring-[color:var(--color-gold)] cursor-pointer"
            >
              <option value="todos">Tipo de Imóvel</option>
              {imobiliarioCategories.map((cat) => (
                <option key={cat.slug} value={cat.slug}>
                  {cat.label}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-[color:var(--color-navy)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Zone (Placeholder for future) */}
          <div className="relative">
            <select
              disabled
              className="w-full appearance-none px-4 py-3.5 bg-[color:var(--color-bone-soft)] text-sm text-[color:var(--color-navy)]/50 font-medium focus:outline-none cursor-not-allowed"
            >
              <option>Zona</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-[color:var(--color-navy)]/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Search Button */}
          <button className="px-6 py-3.5 bg-[color:var(--color-gold)] hover:bg-[color:var(--color-gold-bright)] text-[color:var(--color-navy)] text-sm font-bold transition-colors flex items-center justify-center gap-2">
            <Search className="h-4 w-4" />
            PESQUISAR
          </button>
        </div>

        {/* Advanced Filters Toggle */}
        <div className="mt-4 flex items-center gap-4">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-2 text-sm text-[color:var(--color-navy)] hover:text-[color:var(--color-gold)] transition-colors"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filtros Avançados
            {filters.badges.length > 0 && (
              <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 bg-[color:var(--color-gold)] text-[color:var(--color-navy)] text-xs font-bold rounded-full">
                {filters.badges.length}
              </span>
            )}
          </button>

          {/* Clear Filters */}
          {(filters.search ||
            filters.district !== "Todos" ||
            filters.badges.length > 0 ||
            filters.category !== "todos") && (
            <button
              onClick={() => {
                const resetFilters: FilterState = {
                  category: "todos",
                  district: "Todos",
                  search: "",
                  priceRange: [0, 10000000],
                  badges: [],
                };
                setFilters(resetFilters);
                onFilterChange(resetFilters);
              }}
              className="text-sm text-[color:var(--color-stone-dark)] hover:text-[color:var(--color-navy)] transition-colors underline"
            >
              Limpar filtros
            </button>
          )}
        </div>

        {/* Advanced Filters Panel */}
        {showAdvanced && (
          <div className="mt-4 pt-4 border-t border-[color:var(--color-stone)]/20">
            <div className="space-y-4">
              {/* Search Input */}
              <div className="relative max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[color:var(--color-stone-dark)]" />
                <input
                  type="text"
                  placeholder="Pesquisar por título ou localização..."
                  value={filters.search}
                  onChange={(e) => updateFilter("search", e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-[color:var(--color-bone-soft)] text-sm text-[color:var(--color-navy)] placeholder:text-[color:var(--color-stone-dark)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-gold)] transition-all"
                />
              </div>

              {/* Badge Filters */}
              <div>
                <p className="text-xs uppercase tracking-wider text-[color:var(--color-stone-dark)] font-medium mb-3">
                  Destaques
                </p>
                <div className="flex flex-wrap gap-2">
                  {BADGE_OPTIONS.map((badge) => (
                    <button
                      key={badge.value}
                      onClick={() => toggleBadge(badge.value)}
                      className={`px-4 py-2 text-sm font-medium transition-colors ${
                        filters.badges.includes(badge.value)
                          ? "bg-[color:var(--color-navy)] text-white"
                          : "bg-[color:var(--color-bone-soft)] text-[color:var(--color-ink)]/70 hover:bg-[color:var(--color-gold)]/20"
                      }`}
                    >
                      {badge.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
