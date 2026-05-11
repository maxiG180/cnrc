"use client";

import { useState } from "react";
import { Search, ChevronDown, SlidersHorizontal, X } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { imobiliarioCategories } from "@/content/shared/imobiliario-categories";
import type { FilterState } from "./filter-bar";

type HeroSearchProps = {
  onSearch: (filters: FilterState) => void;
};

const QUICK_LOCATIONS = ["Lisboa", "Porto", "Cascais", "Algarve", "Oeiras"];

const CONCELHOS_RAW = [
  "Lisboa", "Oeiras", "Cascais", "Sintra", "Porto", "Matosinhos", "Vila Nova de Gaia",
  "Faro", "Loulé", "Albufeira", "Setúbal", "Grândola", "Braga", "Coimbra", "Aveiro",
];

const FREGUESIAS_BY_CONCELHO_RAW: Record<string, string[]> = {
  "Lisboa": ["Alvalade", "Areeiro", "Arroios", "Avenidas Novas", "Belém", "Benfica", "Campo de Ourique", "Carnide", "Estrela", "Lumiar", "Misericórdia", "Parque das Nações", "Penha de França", "Santa Maria Maior", "Santo António", "São Domingos de Benfica", "São Vicente"],
  "Cascais": ["Alcabideche", "Carcavelos", "Cascais", "Estoril", "Parede", "São Domingos de Rana"],
  "Oeiras": ["Algés", "Carnaxide", "Linda-a-Velha", "Oeiras", "Paço de Arcos", "Porto Salvo", "Queijas"],
  "Porto": ["Aldoar", "Bonfim", "Campanhã", "Cedofeita", "Foz do Douro", "Lordelo do Ouro", "Massarelos", "Paranhos", "Ramalde", "Santo Ildefonso"],
};

const ZONAS_BY_FREGUESIA_RAW: Record<string, string[]> = {
  "Alvalade": ["Alvalade Norte", "Alvalade Sul", "Igreja de Alvalade"],
  "Areeiro": ["Areeiro Centro", "Areeiro Norte"],
  "Arroios": ["Anjos", "Intendente", "Martim Moniz"],
  "Avenidas Novas": ["Fontes Pereira de Melo", "Picoas", "Saldanha"],
  "Parque das Nações": ["Expo", "Olivais Norte", "Olivais Sul"],
  "Cascais": ["Centro Histórico", "Monte Estoril", "São João do Estoril"],
  "Estoril": ["Estoril Centro", "Monte Estoril", "São João do Estoril"],
  "Foz do Douro": ["Foz Velha", "Foz do Douro Passeio Alegre"],
};

export function HeroSearch({ onSearch }: HeroSearchProps) {
  const t = useTranslations();
  const tHero = useTranslations("imobiliario.hero");
  const tPrice = useTranslations("imobiliario.priceRanges");

  const PRICE_RANGES = [
    { value: "", label: tPrice("any") },
    { value: "0-150000", label: tPrice("upTo150") },
    { value: "150000-300000", label: tPrice("150to300") },
    { value: "300000-500000", label: tPrice("300to500") },
    { value: "500000-750000", label: tPrice("500to750") },
    { value: "750000-1000000", label: tPrice("750to1m") },
    { value: "1000000-9999999", label: tPrice("moreThan1m") },
  ];

  const CONCELHO_PLACEHOLDER = tHero("selectConcelho");
  const FREGUESIA_PLACEHOLDER = tHero("selectFreguesia");
  const ZONA_PLACEHOLDER = tHero("selectZona");

  const [selectedLocation, setSelectedLocation] = useState("Todos");
  const [nome, setNome] = useState("");
  const [propertyType, setPropertyType] = useState("todos");
  const [priceRange, setPriceRange] = useState("");
  const [concelho, setConcelho] = useState(CONCELHO_PLACEHOLDER);
  const [freguesia, setFreguesia] = useState(FREGUESIA_PLACEHOLDER);
  const [zona, setZona] = useState(ZONA_PLACEHOLDER);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const availableFreguesias = concelho !== CONCELHO_PLACEHOLDER
    ? [FREGUESIA_PLACEHOLDER, ...(FREGUESIAS_BY_CONCELHO_RAW[concelho] || [])]
    : [FREGUESIA_PLACEHOLDER];

  const availableZonas = freguesia !== FREGUESIA_PLACEHOLDER
    ? [ZONA_PLACEHOLDER, ...(ZONAS_BY_FREGUESIA_RAW[freguesia] || [])]
    : [ZONA_PLACEHOLDER];

  const applyFilters = (newLocation?: string, newPropertyType?: string) => {
    const location = newLocation ?? selectedLocation;
    const type = newPropertyType ?? propertyType;

    let minPrice = 0;
    let maxPrice = 10000000;

    if (priceRange) {
      const [min, max] = priceRange.split("-").map(Number);
      minPrice = min;
      maxPrice = max;
    }

    onSearch({
      category: type,
      district: location === "Todos" ? "Todos" : location,
      search: nome,
      priceRange: [minPrice, maxPrice],
      badges: [],
    });
  };

  const handleQuickLocationClick = (location: string) => {
    setSelectedLocation(location);
    applyFilters(location, undefined);
  };

  const handlePropertyTypeChange = (type: string) => {
    setPropertyType(type);
    applyFilters(undefined, type);
  };

  const handleConcelhoChange = (newConcelho: string) => {
    setConcelho(newConcelho);
    setFreguesia(FREGUESIA_PLACEHOLDER);
    setZona(ZONA_PLACEHOLDER);
  };

  const handleFreguesiaChange = (newFreguesia: string) => {
    setFreguesia(newFreguesia);
    setZona(ZONA_PLACEHOLDER);
  };

  const handleSearch = () => {
    applyFilters();
    setTimeout(() => {
      window.scrollTo({ top: window.innerHeight * 0.7, behavior: "smooth" });
    }, 100);
  };

  const handleClearFilters = () => {
    setSelectedLocation("Todos");
    setNome("");
    setPropertyType("todos");
    setPriceRange("");
    setConcelho(CONCELHO_PLACEHOLDER);
    setFreguesia(FREGUESIA_PLACEHOLDER);
    setZona(ZONA_PLACEHOLDER);
    setShowAdvanced(false);
    onSearch({
      category: "todos",
      district: "Todos",
      search: "",
      priceRange: [0, 10000000],
      badges: [],
    });
  };

  const hasActiveFilters =
    selectedLocation !== "Todos" ||
    nome !== "" ||
    propertyType !== "todos" ||
    priceRange !== "" ||
    concelho !== CONCELHO_PLACEHOLDER ||
    freguesia !== FREGUESIA_PLACEHOLDER ||
    zona !== ZONA_PLACEHOLDER;

  return (
    <section className="relative min-h-[85vh] bg-[color:var(--color-navy-deep)]">
      <div className="absolute inset-0 overflow-hidden">
        <Image src="/Fotos-Lisboa_Horizontais-25-scaled.jpg" alt="" fill priority sizes="100vw" className="object-cover" style={{ filter: "brightness(0.45)" }} />
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-transparent to-black/70" />
      </div>

      <div className="relative h-full">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center min-h-[70vh]">

            <div className="space-y-10">
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-display text-white leading-[1.1] tracking-tight">
                  {tHero("title")}
                </h1>
                <p className="text-lg md:text-xl text-white/80 max-w-xl leading-relaxed">
                  {tHero("subtitle")}
                </p>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-medium text-white/60 uppercase tracking-wider">{tHero("popularLocation")}</p>
                <div className="flex flex-wrap gap-3">
                  {QUICK_LOCATIONS.map((location) => (
                    <motion.button
                      key={location}
                      onClick={() => handleQuickLocationClick(location)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className={`px-5 py-2.5 text-sm font-medium transition-all border ${
                        selectedLocation === location
                          ? "bg-white text-[color:var(--color-navy)] border-white"
                          : "bg-transparent text-white border-white/30 hover:border-white/60"
                      }`}
                    >
                      {location}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white shadow-2xl"
            >
              <div className="p-8 space-y-6">
                <div className="space-y-1">
                  <h2 className="text-2xl font-display text-[color:var(--color-navy)]">{tHero("advancedSearch")}</h2>
                  <p className="text-sm text-[color:var(--color-navy)]/60">{tHero("refineCriteria")}</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-[color:var(--color-navy)]/70 uppercase tracking-wider">{tHero("type")}</label>
                    <div className="relative">
                      <select
                        value={propertyType}
                        onChange={(e) => handlePropertyTypeChange(e.target.value)}
                        className="w-full appearance-none px-4 py-3.5 bg-white border-2 border-[color:var(--color-stone)]/30 text-[color:var(--color-navy)] font-medium focus:outline-none focus:border-[color:var(--color-gold)] transition-colors cursor-pointer"
                      >
                        <option value="todos">{tHero("allTypes")}</option>
                        {imobiliarioCategories.map((cat) => (
                          <option key={cat.slug} value={cat.slug}>{t(cat.labelKey)}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[color:var(--color-navy)]/40 pointer-events-none" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-[color:var(--color-navy)]/70 uppercase tracking-wider">{tHero("price")}</label>
                    <div className="relative">
                      <select
                        value={priceRange}
                        onChange={(e) => setPriceRange(e.target.value)}
                        className="w-full appearance-none px-4 py-3.5 bg-white border-2 border-[color:var(--color-stone)]/30 text-[color:var(--color-navy)] font-medium focus:outline-none focus:border-[color:var(--color-gold)] transition-colors cursor-pointer"
                      >
                        {PRICE_RANGES.map((range) => (
                          <option key={range.value} value={range.value}>{range.label}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[color:var(--color-navy)]/40 pointer-events-none" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-[color:var(--color-navy)]/70 uppercase tracking-wider">{tHero("developmentName")}</label>
                    <input
                      type="text"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      placeholder={tHero("developmentPlaceholder")}
                      className="w-full px-4 py-3.5 bg-white border-2 border-[color:var(--color-stone)]/30 text-[color:var(--color-navy)] font-medium placeholder:text-[color:var(--color-navy)]/40 focus:outline-none focus:border-[color:var(--color-gold)] transition-colors"
                    />
                  </div>
                </div>

                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="flex items-center gap-2 text-sm font-medium text-[color:var(--color-navy)]/70 hover:text-[color:var(--color-navy)] transition-colors group"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  <span>{tHero("advancedFilters")}</span>
                  <motion.div animate={{ rotate: showAdvanced ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown className="h-4 w-4" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {showAdvanced && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="space-y-4 pt-4 border-t border-[color:var(--color-stone)]/20 overflow-hidden"
                    >
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-[color:var(--color-navy)]/70 uppercase tracking-wider">{tHero("concelho")}</label>
                        <div className="relative">
                          <select
                            value={concelho}
                            onChange={(e) => handleConcelhoChange(e.target.value)}
                            className="w-full appearance-none px-4 py-3.5 bg-white border-2 border-[color:var(--color-stone)]/30 text-[color:var(--color-navy)] font-medium focus:outline-none focus:border-[color:var(--color-gold)] transition-colors cursor-pointer"
                          >
                            <option value={CONCELHO_PLACEHOLDER}>{CONCELHO_PLACEHOLDER}</option>
                            {CONCELHOS_RAW.map((c) => (
                              <option key={c} value={c}>{c}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[color:var(--color-navy)]/40 pointer-events-none" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-[color:var(--color-navy)]/70 uppercase tracking-wider">{tHero("freguesia")}</label>
                        <div className="relative">
                          <select
                            value={freguesia}
                            onChange={(e) => handleFreguesiaChange(e.target.value)}
                            disabled={concelho === CONCELHO_PLACEHOLDER}
                            className={`w-full appearance-none px-4 py-3.5 bg-white border-2 border-[color:var(--color-stone)]/30 font-medium focus:outline-none focus:border-[color:var(--color-gold)] transition-colors ${
                              concelho === CONCELHO_PLACEHOLDER
                                ? "text-[color:var(--color-navy)]/40 cursor-not-allowed"
                                : "text-[color:var(--color-navy)] cursor-pointer"
                            }`}
                          >
                            {availableFreguesias.map((f) => (
                              <option key={f} value={f}>{f}</option>
                            ))}
                          </select>
                          <ChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 pointer-events-none ${
                            concelho === CONCELHO_PLACEHOLDER ? "text-[color:var(--color-navy)]/20" : "text-[color:var(--color-navy)]/40"
                          }`} />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-[color:var(--color-navy)]/70 uppercase tracking-wider">{tHero("zona")}</label>
                        <div className="relative">
                          <select
                            value={zona}
                            onChange={(e) => setZona(e.target.value)}
                            disabled={freguesia === FREGUESIA_PLACEHOLDER}
                            className={`w-full appearance-none px-4 py-3.5 bg-white border-2 border-[color:var(--color-stone)]/30 font-medium focus:outline-none focus:border-[color:var(--color-gold)] transition-colors ${
                              freguesia === FREGUESIA_PLACEHOLDER
                                ? "text-[color:var(--color-navy)]/40 cursor-not-allowed"
                                : "text-[color:var(--color-navy)] cursor-pointer"
                            }`}
                          >
                            {availableZonas.map((z) => (
                              <option key={z} value={z}>{z}</option>
                            ))}
                          </select>
                          <ChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 pointer-events-none ${
                            freguesia === FREGUESIA_PLACEHOLDER ? "text-[color:var(--color-navy)]/20" : "text-[color:var(--color-navy)]/40"
                          }`} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex gap-3">
                  <AnimatePresence>
                    {hasActiveFilters && (
                      <motion.button
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={handleClearFilters}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-5 py-4 bg-transparent border-2 border-[color:var(--color-stone)]/40 hover:border-[color:var(--color-navy)]/60 text-[color:var(--color-navy)]/70 hover:text-[color:var(--color-navy)] text-sm font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                      >
                        <X className="h-4 w-4" />
                        {tHero("clear")}
                      </motion.button>
                    )}
                  </AnimatePresence>

                  <motion.button
                    onClick={handleSearch}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 px-6 py-4 bg-[color:var(--color-gold)] hover:bg-[color:var(--color-gold-bright)] text-white text-sm font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-3 shadow-lg"
                  >
                    <Search className="h-5 w-5" />
                    {tHero("search")}
                  </motion.button>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
