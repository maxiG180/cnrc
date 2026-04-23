export const company = {
  legalName: "Camacho Nunes Recuperação de Crédito, Lda.",
  shortName: "Camacho & Nunes",
  acronym: "CNRC",
  tagline: "Juntos conseguimos recuperar o seu crédito",
  founded: 2016,
  nif: "514 120 584",
  ceo: "Dr. António Nunes",
  email: "geral@cnrc.pt",
  phones: {
    free: "800 080 000",
    mobile: "+351 918 836 375",
    landline: "300 600 000",
  },
  address: {
    street: "Rua José Joaquim Marques, 9A",
    postal: "2870-252",
    city: "Montijo",
    country: "Portugal",
  },
  hours: "Seg–Sex: 09:00–18:00",
  offices: [
    { name: "Lisboa", slug: "lisboa" },
    { name: "Barreiro", slug: "barreiro" },
    { name: "Montijo", slug: "montijo" },
    { name: "Coimbra", slug: "coimbra" },
    { name: "Braga", slug: "braga" },
    { name: "Huelva (Espanha)", slug: "huelva" },
  ],
  social: {
    // placeholders — confirm with client
  },
  external: {
    livroReclamacoes: "https://www.livroreclamacoes.pt/inicio",
  },
} as const;

export type Company = typeof company;
