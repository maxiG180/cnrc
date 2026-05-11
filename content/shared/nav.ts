export type NavChild = {
  labelKey: string;
  href: string;
  descriptionKey?: string;
};

export type NavGroup = {
  labelKey: string;
  href?: string;
  headingKey?: string;
  children?: NavChild[];
  columns?: { headingKey: string; items: NavChild[] }[];
};

export const mainNav: NavGroup[] = [
  {
    labelKey: "nav.whoWeAre",
    href: "/sobre-nos",
    children: [
      { labelKey: "nav.subnav.aboutUs", href: "/sobre-nos", descriptionKey: "nav.subnav.aboutUsDesc" },
      { labelKey: "nav.subnav.ourTeam", href: "/a-nossa-equipa", descriptionKey: "nav.subnav.ourTeamDesc" },
      { labelKey: "nav.subnav.ourOffices", href: "/os-nossos-escritorios", descriptionKey: "nav.subnav.ourOfficesDesc" },
      { labelKey: "nav.subnav.ourFacilities", href: "/as-nossas-instalacoes", descriptionKey: "nav.subnav.ourFacilitiesDesc" },
      { labelKey: "nav.subnav.areasOfSpecialization", href: "/areas-de-especializacao", descriptionKey: "nav.subnav.areasOfSpecializationDesc" },
    ],
  },
  {
    labelKey: "nav.judicialProcedures",
    columns: [
      {
        headingKey: "nav.operationalMeans",
        items: [
          { labelKey: "nav.subnav.withBreakIn", href: "/diligencias/com-arrombamento" },
          { labelKey: "nav.subnav.specialVehicle", href: "/diligencias/com-veiculo-especial-em-arrombamento" },
          { labelKey: "nav.subnav.policeForce", href: "/diligencias/com-forca-policial" },
          { labelKey: "nav.subnav.carBlocks", href: "/diligencias/bloqueios-automoveis" },
          { labelKey: "nav.subnav.roadSignaling", href: "/diligencias/com-sinalizacao-de-estrada" },
          { labelKey: "nav.subnav.helicopter", href: "/diligencias/com-o-nosso-helicoptero" },
          { labelKey: "nav.subnav.crane", href: "/diligencias/com-grua" },
          { labelKey: "nav.subnav.forklift", href: "/diligencias/com-empilhador" },
          { labelKey: "nav.subnav.mobileKitchen", href: "/diligencias/com-cozinha-movel-e-cozinheiro-privado" },
        ],
      },
      {
        headingKey: "nav.areasOfActivity",
        items: [
          { labelKey: "nav.subnav.inHousing", href: "/diligencias/em-habitacao" },
          { labelKey: "nav.subnav.inCommercial", href: "/diligencias/em-estabelecimentos-comerciais" },
          { labelKey: "nav.subnav.inLiveAnimals", href: "/diligencias/em-animais-vivos" },
          { labelKey: "nav.subnav.special", href: "/diligencias/especiais" },
          { labelKey: "nav.subnav.nocturnal", href: "/diligencias/noturnas" },
        ],
      },
    ],
  },
  {
    labelKey: "nav.realEstate",
    href: "/imobiliario",
    children: [
      { labelKey: "nav.subnav.apartments", href: "/imobiliario/apartamentos" },
      { labelKey: "nav.subnav.establishments", href: "/imobiliario/estabelecimentos" },
      { labelKey: "nav.subnav.estates", href: "/imobiliario/herdades" },
      { labelKey: "nav.subnav.houses", href: "/imobiliario/moradias" },
      { labelKey: "nav.subnav.manorHouses", href: "/imobiliario/palacetes" },
      { labelKey: "nav.subnav.buildings", href: "/imobiliario/predios" },
      { labelKey: "nav.subnav.land", href: "/imobiliario/terrenos" },
      { labelKey: "nav.subnav.otherDevelopments", href: "/imobiliario/outros-empreendimentos" },
    ],
  },
  { labelKey: "nav.news", href: "/noticias-em-destaque" },
  { labelKey: "nav.liveTV", href: "/tv-direto" },
  { labelKey: "nav.contacts", href: "/contactos" },
];

export const footerLegalLinks = [
  { labelKey: "footer.legal.privacy", href: "/politica-de-privacidade" },
  { labelKey: "footer.legal.terms", href: "/termos-e-condicoes" },
  { labelKey: "footer.legal.cookies", href: "/politica-de-cookies" },
  { labelKey: "footer.legal.complaintsBook", href: "https://www.livroreclamacoes.pt/inicio", external: true as const },
];
