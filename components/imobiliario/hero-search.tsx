"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import Image from "next/image";
import { imobiliarioCategories } from "@/content/shared/imobiliario-categories";
import type { FilterState } from "./filter-bar";

type HeroSearchProps = {
  onSearch: (filters: FilterState) => void;
};

const DISTRICTS = [
  "Todos",
  "Lisboa",
  "Porto",
  "Setúbal",
  "Sintra",
  "Faro",
  "Évora",
  "Braga",
  "Coimbra",
  "Aveiro",
];

const LOCATION_TABS = [
  { value: "Todos", label: "Todos" },
  { value: "Lisboa", label: "Lisboa" },
  { value: "Porto", label: "Porto" },
  { value: "Setúbal", label: "Setúbal" },
  { value: "Sintra", label: "Sintra" },
];

export function HeroSearch({ onSearch }: HeroSearchProps) {
  const [selectedLocation, setSelectedLocation] = useState("Todos");
  const [propertyType, setPropertyType] = useState("todos");
  const [zone, setZone] = useState("");

  const applyFilters = (newLocation?: string, newPropertyType?: string) => {
    const location = newLocation ?? selectedLocation;
    const type = newPropertyType ?? propertyType;

    onSearch({
      category: type,
      district: location === "todo-pais" ? "Todos" : location,
      search: "",
      priceRange: [0, 10000000],
      badges: [],
    });
  };

  const handleLocationTabClick = (location: string) => {
    setSelectedLocation(location);
    applyFilters(location, undefined);
  };

  const handlePropertyTypeChange = (type: string) => {
    setPropertyType(type);
    applyFilters(undefined, type);
  };

  const handleSearch = () => {
    applyFilters();

    // Scroll to results
    setTimeout(() => {
      window.scrollTo({
        top: window.innerHeight * 0.7,
        behavior: "smooth",
      });
    }, 100);
  };

  return (
    <section className="relative h-[50vh] min-h-[450px] bg-[color:var(--color-navy-deep)]">
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/Imobiliário/Moradias/Catelo-Royal-Villas_80-moradias-23042026-_site-7-900x550.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ filter: "brightness(0.5)" }}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col">
        {/* Title Area - Top Left */}
        <div className="flex-1 flex items-start pt-12 md:pt-16">
          <div className="w-full max-w-7xl mx-auto px-6 md:px-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-white mb-4 max-w-3xl">
              Descubra o seu próximo imóvel
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl">
              Explore o nosso portefólio de propriedades recuperadas em Portugal e no espaço Schengen.
            </p>
          </div>
        </div>

        {/* Search Card - Bottom, Overlapping */}
        <div className="w-full max-w-7xl mx-auto px-6 md:px-10 pb-0 transform translate-y-1/2">
          <div className="bg-white shadow-2xl overflow-hidden">
            {/* Location Tabs */}
            <div className="px-6 pt-6 pb-4 border-b border-[color:var(--color-stone)]/20">
              <div className="flex flex-wrap gap-2">
                {LOCATION_TABS.map((tab) => (
                  <button
                    key={tab.value}
                    onClick={() => handleLocationTabClick(tab.value)}
                    className={`px-6 py-2.5 text-sm font-medium transition-all rounded-full ${selectedLocation === tab.value
                        ? "bg-white text-[color:var(--color-navy)] shadow-md ring-1 ring-[color:var(--color-stone)]/30"
                        : "bg-white/20 text-[color:var(--color-navy)]/70 hover:bg-white/30"
                      }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Form */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-3">
                {/* Property Type */}
                <div className="relative">
                  <select
                    value={propertyType}
                    onChange={(e) => handlePropertyTypeChange(e.target.value)}
                    className="w-full appearance-none px-4 py-4 bg-[color:var(--color-bone-soft)] text-sm text-[color:var(--color-navy)] font-medium focus:outline-none focus:ring-2 focus:ring-[color:var(--color-gold)] cursor-pointer"
                  >
                    <option value="todos">Tipo de Imóvel</option>
                    {imobiliarioCategories.map((cat) => (
                      <option key={cat.slug} value={cat.slug}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-[color:var(--color-navy)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Zone */}
                <div className="relative">
                  <select
                    disabled
                    className="w-full appearance-none px-4 py-4 bg-[color:var(--color-bone-soft)] text-sm text-[color:var(--color-navy)]/50 font-medium focus:outline-none cursor-not-allowed"
                  >
                    <option>Zona</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-[color:var(--color-navy)]/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Search Button */}
                <button
                  onClick={handleSearch}
                  className="px-8 py-4 bg-[color:var(--color-gold)] hover:bg-[color:var(--color-gold-bright)] text-white text-sm font-bold transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <Search className="h-4 w-4" />
                  PESQUISAR
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
