export type ImobiliarioCategory = {
  slug: string;
  labelKey: string;
  descriptionKey: string;
};

export const imobiliarioCategories: ImobiliarioCategory[] = [
  { slug: "apartamentos", labelKey: "imobiliario.categories.apartamentos", descriptionKey: "imobiliario.categories.apartamentosDesc" },
  { slug: "estabelecimentos", labelKey: "imobiliario.categories.estabelecimentos", descriptionKey: "imobiliario.categories.estabelecimentosDesc" },
  { slug: "herdades", labelKey: "imobiliario.categories.herdades", descriptionKey: "imobiliario.categories.herdadesDesc" },
  { slug: "moradias", labelKey: "imobiliario.categories.moradias", descriptionKey: "imobiliario.categories.moradiasDesc" },
  { slug: "palacetes", labelKey: "imobiliario.categories.palacetes", descriptionKey: "imobiliario.categories.palacetesDesc" },
  { slug: "predios", labelKey: "imobiliario.categories.predios", descriptionKey: "imobiliario.categories.prediosDesc" },
  { slug: "terrenos", labelKey: "imobiliario.categories.terrenos", descriptionKey: "imobiliario.categories.terrenosDesc" },
  { slug: "outros-empreendimentos", labelKey: "imobiliario.categories.outros-empreendimentos", descriptionKey: "imobiliario.categories.outros-empreendimentosDesc" },
];

export function getImobiliarioCategory(slug: string) {
  return imobiliarioCategories.find((c) => c.slug === slug);
}
