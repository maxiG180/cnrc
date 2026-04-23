export type NavChild = {
  label: string;
  href: string;
  description?: string;
};

export type NavGroup = {
  label: string;
  href?: string;
  heading?: string;
  children?: NavChild[];
  columns?: { heading: string; items: NavChild[] }[];
};

export const mainNav: NavGroup[] = [
  {
    label: "Quem Somos",
    href: "/sobre-nos",
    children: [
      { label: "Sobre Nós", href: "/sobre-nos", description: "A empresa, valores e estrutura nacional" },
      { label: "A Nossa Equipa", href: "/a-nossa-equipa", description: "Profissionais multidisciplinares" },
      { label: "Os Nossos Escritórios", href: "/os-nossos-escritorios", description: "Lisboa, Barreiro, Montijo, Coimbra, Braga, Huelva" },
      { label: "As Nossas Instalações", href: "/as-nossas-instalacoes", description: "Pinhal Novo — heliporto e viveiros" },
      { label: "Áreas de Especialização", href: "/areas-de-especializacao", description: "Execuções, Arrestos, Insolvência e mais" },
    ],
  },
  {
    label: "Diligências Judiciais",
    columns: [
      {
        heading: "Meios Operacionais",
        items: [
          { label: "Arrombamento", href: "/diligencias/com-arrombamento" },
          { label: "Veículo Especial", href: "/diligencias/com-veiculo-especial-em-arrombamento" },
          { label: "Força Policial", href: "/diligencias/com-forca-policial" },
          { label: "Bloqueios Automóveis", href: "/diligencias/bloqueios-automoveis" },
          { label: "Sinalização de Estrada", href: "/diligencias/com-sinalizacao-de-estrada" },
          { label: "Helicóptero", href: "/diligencias/com-o-nosso-helicoptero" },
          { label: "Grua", href: "/diligencias/com-grua" },
          { label: "Empilhador", href: "/diligencias/com-empilhador" },
          { label: "Cozinha Móvel", href: "/diligencias/com-cozinha-movel-e-cozinheiro-privado" },
        ],
      },
      {
        heading: "Áreas de Atuação",
        items: [
          { label: "Em Habitação", href: "/diligencias/em-habitacao" },
          { label: "Em Estabelecimentos Comerciais", href: "/diligencias/em-estabelecimentos-comerciais" },
          { label: "Em Animais Vivos", href: "/diligencias/em-animais-vivos" },
          { label: "Especiais", href: "/diligencias/especiais" },
          { label: "Noturnas", href: "/diligencias/noturnas" },
        ],
      },
    ],
  },
  {
    label: "Imobiliário",
    href: "/imobiliario",
    children: [
      { label: "Apartamentos", href: "/imobiliario/apartamentos" },
      { label: "Estabelecimentos", href: "/imobiliario/estabelecimentos" },
      { label: "Herdades", href: "/imobiliario/herdades" },
      { label: "Moradias", href: "/imobiliario/moradias" },
      { label: "Palacetes", href: "/imobiliario/palacetes" },
      { label: "Prédios", href: "/imobiliario/predios" },
      { label: "Terrenos", href: "/imobiliario/terrenos" },
      { label: "Outros Empreendimentos", href: "/imobiliario/outros-empreendimentos" },
    ],
  },
  { label: "Notícias", href: "/noticias-em-destaque" },
  { label: "TV Direto", href: "/tv-direto" },
  { label: "Contactos", href: "/contactos" },
];

export const footerLinks = [
  { label: "Política de Privacidade", href: "/politica-de-privacidade" },
  { label: "Termos e Condições", href: "/termos-e-condicoes" },
  { label: "Política de Cookies", href: "/politica-de-cookies" },
  { label: "Livro de Reclamações", href: "https://www.livroreclamacoes.pt/inicio", external: true },
];
