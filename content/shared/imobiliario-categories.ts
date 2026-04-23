export type ImobiliarioCategory = {
  slug: string;
  label: string;
  description: string;
};

export const imobiliarioCategories: ImobiliarioCategory[] = [
  {
    slug: "apartamentos",
    label: "Apartamentos",
    description: "Tipologias urbanas em localizações consolidadas e de elevada procura.",
  },
  {
    slug: "estabelecimentos",
    label: "Estabelecimentos",
    description: "Espaços comerciais, restauração e unidades de negócio em funcionamento.",
  },
  {
    slug: "herdades",
    label: "Herdades",
    description: "Propriedades rurais de grande dimensão, exploração agrícola e cinegética.",
  },
  {
    slug: "moradias",
    label: "Moradias",
    description: "Habitações unifamiliares, do clássico ao contemporâneo, em zonas nobres.",
  },
  {
    slug: "palacetes",
    label: "Palacetes",
    description: "Imóveis históricos restaurados com carácter patrimonial único.",
  },
  {
    slug: "predios",
    label: "Prédios",
    description: "Edifícios integrais com potencial de investimento ou reabilitação.",
  },
  {
    slug: "terrenos",
    label: "Terrenos",
    description: "Lotes para construção, exploração ou investimento em reserva.",
  },
  {
    slug: "outros-empreendimentos",
    label: "Outros Empreendimentos",
    description: "Projetos diferenciados e oportunidades únicas fora de categoria.",
  },
];

export function getImobiliarioCategory(slug: string) {
  return imobiliarioCategories.find((c) => c.slug === slug);
}
