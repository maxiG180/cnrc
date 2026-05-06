"use client";

import { useState } from "react";
import { Search, ChevronDown, SlidersHorizontal, X } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { imobiliarioCategories } from "@/content/shared/imobiliario-categories";
import type { FilterState } from "./filter-bar";

type HeroSearchProps = {
  onSearch: (filters: FilterState) => void;
};

const QUICK_LOCATIONS = ["Lisboa", "Porto", "Cascais", "Algarve", "Oeiras"];

const CONCELHOS = [
  "Selecionar Concelho",
  "Lisboa",
  "Oeiras",
  "Cascais",
  "Sintra",
  "Porto",
  "Matosinhos",
  "Vila Nova de Gaia",
  "Faro",
  "Loulé",
  "Albufeira",
  "Setúbal",
  "Grândola",
  "Braga",
  "Coimbra",
  "Aveiro",
];

const FREGUESIAS_BY_CONCELHO: Record<string, string[]> = {
  "Lisboa": [
    "Selecionar Freguesia",
    "Alvalade",
    "Areeiro",
    "Arroios",
    "Avenidas Novas",
    "Belém",
    "Benfica",
    "Campo de Ourique",
    "Carnide",
    "Estrela",
    "Lumiar",
    "Misericórdia",
    "Parque das Nações",
    "Penha de França",
    "Santa Maria Maior",
    "Santo António",
    "São Domingos de Benfica",
    "São Vicente",
  ],
  "Cascais": [
    "Selecionar Freguesia",
    "Alcabideche",
    "Carcavelos",
    "Cascais",
    "Estoril",
    "Parede",
    "São Domingos de Rana",
  ],
  "Oeiras": [
    "Selecionar Freguesia",
    "Algés",
    "Carnaxide",
    "Linda-a-Velha",
    "Oeiras",
    "Paço de Arcos",
    "Porto Salvo",
    "Queijas",
  ],
  "Porto": [
    "Selecionar Freguesia",
    "Aldoar",
    "Bonfim",
    "Campanhã",
    "Cedofeita",
    "Foz do Douro",
    "Lordelo do Ouro",
    "Massarelos",
    "Paranhos",
    "Ramalde",
    "Santo Ildefonso",
  ],
};

const ZONAS_BY_FREGUESIA: Record<string, string[]> = {
  "Alvalade": ["Selecionar Zona", "Alvalade Norte", "Alvalade Sul", "Igreja de Alvalade"],
  "Areeiro": ["Selecionar Zona", "Areeiro Centro", "Areeiro Norte"],
  "Arroios": ["Selecionar Zona", "Anjos", "Intendente", "Martim Moniz"],
  "Avenidas Novas": ["Selecionar Zona", "Fontes Pereira de Melo", "Picoas", "Saldanha"],
  "Parque das Nações": ["Selecionar Zona", "Expo", "Olivais Norte", "Olivais Sul"],
  "Cascais": ["Selecionar Zona", "Centro Histórico", "Monte Estoril", "São João do Estoril"],
  "Estoril": ["Selecionar Zona", "Estoril Centro", "Monte Estoril", "São João do Estoril"],
  "Foz do Douro": ["Selecionar Zona", "Foz Velha", "Foz do Douro Passeio Alegre"],
};

const PRICE_RANGES = [
  { value: "", label: "Qualquer Preço" },
  { value: "0-150000", label: "Até 150.000€" },
  { value: "150000-300000", label: "150.000€ - 300.000€" },
  { value: "300000-500000", label: "300.000€ - 500.000€" },
  { value: "500000-750000", label: "500.000€ - 750.000€" },
  { value: "750000-1000000", label: "750.000€ - 1.000.000€" },
  { value: "1000000-9999999", label: "Mais de 1.000.000€" },
];

export function HeroSearch({ onSearch }: HeroSearchProps) {
  const [selectedLocation, setSelectedLocation] = useState("Todos");
  const [nome, setNome] = useState("");
  const [propertyType, setPropertyType] = useState("todos");
  const [priceRange, setPriceRange] = useState("");
  const [concelho, setConcelho] = useState("Selecionar Concelho");
  const [freguesia, setFreguesia] = useState("Selecionar Freguesia");
  const [zona, setZona] = useState("Selecionar Zona");
  const [showAdvanced, setShowAdvanced] = useState(false);

  const availableFreguesias = concelho !== "Selecionar Concelho"
    ? FREGUESIAS_BY_CONCELHO[concelho] || ["Selecionar Freguesia"]
    : ["Selecionar Freguesia"];

  const availableZonas = freguesia !== "Selecionar Freguesia"
    ? ZONAS_BY_FREGUESIA[freguesia] || ["Selecionar Zona"]
    : ["Selecionar Zona"];

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
    setFreguesia("Selecionar Freguesia");
    setZona("Selecionar Zona");
  };

  const handleFreguesiaChange = (newFreguesia: string) => {
    setFreguesia(newFreguesia);
    setZona("Selecionar Zona");
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

  const handleClearFilters = () => {
    setSelectedLocation("Todos");
    setNome("");
    setPropertyType("todos");
    setPriceRange("");
    setConcelho("Selecionar Concelho");
    setFreguesia("Selecionar Freguesia");
    setZona("Selecionar Zona");
    setShowAdvanced(false);

    // Apply cleared filters
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
    concelho !== "Selecionar Concelho" ||
    freguesia !== "Selecionar Freguesia" ||
    zona !== "Selecionar Zona";

  return (
    <section className="relative min-h-[85vh] bg-[color:var(--color-navy-deep)]">
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/Fotos-Lisboa_Horizontais-25-scaled.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ filter: "brightness(0.45)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-transparent to-black/70" />
      </div>

      {/* Content - Asymmetric Split Layout */}
      <div className="relative h-full">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center min-h-[70vh]">

            {/* Left: Bold Headline + Quick Filters */}
            <div className="space-y-10">
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-display text-white leading-[1.1] tracking-tight">
                  Descubra o seu próximo imóvel
                </h1>
                <p className="text-lg md:text-xl text-white/80 max-w-xl leading-relaxed">
                  Portefólio de propriedades recuperadas em Portugal e no espaço Schengen.
                </p>
              </div>

              {/* Quick Location Filters */}
              <div className="space-y-3">
                <p className="text-sm font-medium text-white/60 uppercase tracking-wider">Localização Popular</p>
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

            {/* Right: Refined Search Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white shadow-2xl"
            >
              <div className="p-8 space-y-6">
                <div className="space-y-1">
                  <h2 className="text-2xl font-display text-[color:var(--color-navy)]">
                    Pesquisa Avançada
                  </h2>
                  <p className="text-sm text-[color:var(--color-navy)]/60">
                    Refine os critérios para encontrar o imóvel ideal
                  </p>
                </div>

                {/* Primary Search Fields */}
                <div className="space-y-4">
                  {/* Tipologia */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-[color:var(--color-navy)]/70 uppercase tracking-wider">
                      Tipologia
                    </label>
                    <div className="relative">
                      <select
                        value={propertyType}
                        onChange={(e) => handlePropertyTypeChange(e.target.value)}
                        className="w-full appearance-none px-4 py-3.5 bg-white border-2 border-[color:var(--color-stone)]/30 text-[color:var(--color-navy)] font-medium focus:outline-none focus:border-[color:var(--color-gold)] transition-colors cursor-pointer"
                      >
                        <option value="todos">Todas as Tipologias</option>
                        {imobiliarioCategories.map((cat) => (
                          <option key={cat.slug} value={cat.slug}>
                            {cat.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[color:var(--color-navy)]/40 pointer-events-none" />
                    </div>
                  </div>

                  {/* Preço */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-[color:var(--color-navy)]/70 uppercase tracking-wider">
                      Preço
                    </label>
                    <div className="relative">
                      <select
                        value={priceRange}
                        onChange={(e) => setPriceRange(e.target.value)}
                        className="w-full appearance-none px-4 py-3.5 bg-white border-2 border-[color:var(--color-stone)]/30 text-[color:var(--color-navy)] font-medium focus:outline-none focus:border-[color:var(--color-gold)] transition-colors cursor-pointer"
                      >
                        {PRICE_RANGES.map((range) => (
                          <option key={range.value} value={range.value}>
                            {range.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[color:var(--color-navy)]/40 pointer-events-none" />
                    </div>
                  </div>

                  {/* Nome/Keyword Search */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-[color:var(--color-navy)]/70 uppercase tracking-wider">
                      Empreendimento
                    </label>
                    <input
                      type="text"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      placeholder="Nome ou palavra-chave"
                      className="w-full px-4 py-3.5 bg-white border-2 border-[color:var(--color-stone)]/30 text-[color:var(--color-navy)] font-medium placeholder:text-[color:var(--color-navy)]/40 focus:outline-none focus:border-[color:var(--color-gold)] transition-colors"
                    />
                  </div>
                </div>

                {/* Advanced Filters Toggle */}
                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="flex items-center gap-2 text-sm font-medium text-[color:var(--color-navy)]/70 hover:text-[color:var(--color-navy)] transition-colors group"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  <span>Filtros Avançados</span>
                  <motion.div
                    animate={{ rotate: showAdvanced ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </motion.div>
                </button>

                {/* Advanced Filters Panel */}
                <AnimatePresence>
                  {showAdvanced && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="space-y-4 pt-4 border-t border-[color:var(--color-stone)]/20 overflow-hidden"
                    >
                      {/* Concelho */}
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-[color:var(--color-navy)]/70 uppercase tracking-wider">
                          Concelho
                        </label>
                        <div className="relative">
                          <select
                            value={concelho}
                            onChange={(e) => handleConcelhoChange(e.target.value)}
                            className="w-full appearance-none px-4 py-3.5 bg-white border-2 border-[color:var(--color-stone)]/30 text-[color:var(--color-navy)] font-medium focus:outline-none focus:border-[color:var(--color-gold)] transition-colors cursor-pointer"
                          >
                            {CONCELHOS.map((c) => (
                              <option key={c} value={c}>
                                {c}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[color:var(--color-navy)]/40 pointer-events-none" />
                        </div>
                      </div>

                      {/* Freguesia */}
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-[color:var(--color-navy)]/70 uppercase tracking-wider">
                          Freguesia
                        </label>
                        <div className="relative">
                          <select
                            value={freguesia}
                            onChange={(e) => handleFreguesiaChange(e.target.value)}
                            disabled={concelho === "Selecionar Concelho"}
                            className={`w-full appearance-none px-4 py-3.5 bg-white border-2 border-[color:var(--color-stone)]/30 font-medium focus:outline-none focus:border-[color:var(--color-gold)] transition-colors ${
                              concelho === "Selecionar Concelho"
                                ? "text-[color:var(--color-navy)]/40 cursor-not-allowed"
                                : "text-[color:var(--color-navy)] cursor-pointer"
                            }`}
                          >
                            {availableFreguesias.map((f) => (
                              <option key={f} value={f}>
                                {f}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 pointer-events-none ${
                            concelho === "Selecionar Concelho" ? "text-[color:var(--color-navy)]/20" : "text-[color:var(--color-navy)]/40"
                          }`} />
                        </div>
                      </div>

                      {/* Zona */}
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-[color:var(--color-navy)]/70 uppercase tracking-wider">
                          Zona
                        </label>
                        <div className="relative">
                          <select
                            value={zona}
                            onChange={(e) => setZona(e.target.value)}
                            disabled={freguesia === "Selecionar Freguesia"}
                            className={`w-full appearance-none px-4 py-3.5 bg-white border-2 border-[color:var(--color-stone)]/30 font-medium focus:outline-none focus:border-[color:var(--color-gold)] transition-colors ${
                              freguesia === "Selecionar Freguesia"
                                ? "text-[color:var(--color-navy)]/40 cursor-not-allowed"
                                : "text-[color:var(--color-navy)] cursor-pointer"
                            }`}
                          >
                            {availableZonas.map((z) => (
                              <option key={z} value={z}>
                                {z}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 pointer-events-none ${
                            freguesia === "Selecionar Freguesia" ? "text-[color:var(--color-navy)]/20" : "text-[color:var(--color-navy)]/40"
                          }`} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  {/* Clear Filters Button - Only show when filters are active */}
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
                        Limpar
                      </motion.button>
                    )}
                  </AnimatePresence>

                  {/* Search CTA */}
                  <motion.button
                    onClick={handleSearch}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 px-6 py-4 bg-[color:var(--color-gold)] hover:bg-[color:var(--color-gold-bright)] text-white text-sm font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-3 shadow-lg"
                  >
                    <Search className="h-5 w-5" />
                    Pesquisar
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
