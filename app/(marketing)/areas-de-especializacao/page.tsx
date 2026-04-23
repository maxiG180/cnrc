import Image from "next/image";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/shared/section";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { CtaBanner } from "@/components/shared/cta-banner";
import { AreaNavLinks } from "@/components/areas/area-nav-links";
import { cn } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "Áreas de Especialização",
  description:
    "Execuções, Arrestos, Insolvência, Arrombamentos, Prestação de Facto, Peritagem Judicial e Imobiliário. Rigor, celeridade e autonomia operacional total.",
  path: "/areas-de-especializacao",
});

type Area = {
  slug: string;
  eyebrow: string;
  title: string;
  paragraphs: string[];
  bullets?: { heading?: string; items: string[] }[];
};

const areas: Area[] = [
  {
    slug: "execucoes",
    eyebrow: "01 — Execuções",
    title: "Execuções",
    paragraphs: [
      "Prestamos apoio especializado na execução de decisões judiciais, assegurando que direitos reconhecidos em tribunal são efetivamente cumpridos. Atuamos com rapidez, rigor e total conformidade legal, garantindo a concretização prática das obrigações impostas ao executado.",
      "A nossa equipa dispõe de todos os meios operacionais necessários, incluindo viaturas totalmente equipadas, ferramentas adequadas e profissionais experientes, preparados para intervir em contextos simples ou de elevada complexidade.",
      "Os nossos serviços distinguem-se pela capacidade de executar medidas judiciais de forma eficaz, seja na apreensão de bens, na entrega de coisa certa ou na implementação de outras determinações executivas. Trabalhamos em estreita articulação com agentes de execução, tribunais e demais entidades, garantindo processos céleres e juridicamente irrepreensíveis.",
    ],
  },
  {
    slug: "arrestos",
    eyebrow: "02 — Arrestos",
    title: "Arrestos",
    paragraphs: [
      "Realizamos arrestos determinados por autoridade judicial, assegurando a apreensão rápida e segura de bens sempre que necessário para garantir o cumprimento de decisões ou a salvaguarda de créditos. Atuamos com total rigor legal, coordenação eficiente e absoluto respeito pelos procedimentos exigidos.",
      "A nossa equipa dispõe de todos os meios operacionais, incluindo viaturas totalmente equipadas, ferramentas adequadas e profissionais experientes, preparados para atuar em contextos simples ou de elevada complexidade. Cada intervenção é conduzida com precisão, discrição e foco na proteção do património e na eficácia da diligência.",
    ],
  },
  {
    slug: "insolvencia",
    eyebrow: "03 — Insolvência",
    title: "Insolvência",
    paragraphs: [
      "Apoiamos empresas e particulares em processos de insolvência com uma atuação rigorosa, estratégica e orientada para resultados. Trabalhamos para garantir que cada processo decorre com total conformidade legal, proteção dos interesses envolvidos e máxima eficiência na gestão dos bens e responsabilidades.",
    ],
    bullets: [
      {
        heading: "O que fazemos",
        items: [
          "Acompanhamento completo de processos de insolvência decretados judicialmente",
          "Inventariação, apreensão e gestão de bens do devedor",
          "Apoio na preparação e execução de planos de insolvência ou recuperação",
          "Coordenação com administradores judiciais, tribunais e demais entidades",
          "Atuação célere em contextos urgentes ou de elevada complexidade",
        ],
      },
    ],
  },
  {
    slug: "arrombamentos",
    eyebrow: "04 — Arrombamentos",
    title: "Arrombamentos",
    paragraphs: [
      "Executamos arrombamentos no âmbito de diligências judiciais com total conformidade legal, garantindo acesso seguro e controlado a imóveis sempre que determinado por autoridade competente. A nossa atuação combina rapidez, precisão e absoluto respeito pelos procedimentos judiciais.",
      "Dispomos de equipas operacionais altamente treinadas e de viaturas totalmente equipadas para este tipo de ação, permitindo-nos responder de forma eficaz a situações urgentes ou complexas.",
    ],
  },
  {
    slug: "prestacao-de-facto",
    eyebrow: "05 — Prestação de Facto",
    title: "Prestação de Facto",
    paragraphs: [
      "A nossa equipa presta serviços altamente especializados em Prestação de Facto, assegurando a execução eficaz de obrigações que não envolvem pagamento de quantia, mas sim a realização, abstenção ou entrega de um bem específico. Atuamos com rigor jurídico, rapidez processual e foco na concretização prática dos direitos dos nossos clientes.",
      "A nossa experiência traduz-se em casos bem-sucedidos, onde assegurámos a execução integral das decisões judiciais, mesmo em situações complexas ou de resistência ao cumprimento.",
    ],
  },
  {
    slug: "peritagem-judicial",
    eyebrow: "06 — Peritagem Judicial",
    title: "Peritagem Judicial",
    paragraphs: [
      "Atuamos com rigor técnico, imparcialidade e total compromisso com a verdade dos factos. Os nossos serviços de Peritagem Judicial destinam-se a apoiar processos judiciais, administrativos e privados, fornecendo análises especializadas e relatórios periciais completos, fundamentados e de elevada qualidade.",
    ],
    bullets: [
      {
        heading: "A nossa elaboração de Relatórios Periciais assenta em",
        items: [
          "Certificação de Fotografias — validação técnica e documental de imagens, assegurando autenticidade, integridade e conformidade legal",
          "Relatório Fotográfico — registo visual rigoroso de locais, bens, danos ou ocorrências relevantes, com descrição técnica e análise objetiva",
          "Relatório de Ocorrência — investigação técnica, recolha de evidências e análise factual para esclarecer eventos e apoiar decisões",
          "Avaliação de Imóveis — metodologias reconhecidas, análise de mercado, enquadramento legal e determinação fundamentada do valor real",
        ],
      },
    ],
  },
  {
    slug: "imobiliario",
    eyebrow: "07 — Imobiliário",
    title: "Imobiliário",
    paragraphs: [
      "A nossa empresa aposta na gestão e desenvolvimento de investimentos com forte potencial de crescimento, atuando com rigor, transparência e visão estratégica. Ao longo dos anos, construímos um portefólio sólido, composto por ativos cuidadosamente selecionados e com historial de valorização consistente.",
      "O nosso portefólio integra atualmente diversos investimentos que têm registado uma valorização significativa, resultado de uma estratégia focada na qualidade dos ativos, na inovação e na antecipação de tendências.",
    ],
  },
];

export default function AreasDeEspecializacaoPage() {
  return (
    <>
      <Section tone="navy-deep" spacing="lg" className="pt-12 relative">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/Logo_CNRC_Light.png"
            alt="CNRC Logo"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
        <Container size="wide" className="relative z-10">
          <Reveal>
            <p className="eyebrow text-[color:var(--color-gold)]">Áreas de Especialização</p>
            <h1 className="mt-6 text-[color:var(--color-bone)] max-w-[18ch]">
              Sete frentes de especialização.
              <span className="block text-[color:var(--color-gold-bright)]">Rigor absoluto.</span>
            </h1>
          </Reveal>

          <AreaNavLinks areas={areas.map((a) => ({ slug: a.slug, title: a.title }))} />
        </Container>
      </Section>

      {areas.map((area, i) => (
        <Section
          key={area.slug}
          id={area.slug}
          tone={i % 2 === 0 ? "bone" : "bone-soft"}
          spacing="lg"
          className="scroll-mt-20"
        >
          <Container size="wide">
            <div className="grid gap-12 lg:grid-cols-12">
              <Reveal className="lg:col-span-4">
                <p className="eyebrow">{area.eyebrow}</p>
                <h2 className={cn("mt-4 rule text-4xl md:text-5xl")}>{area.title}</h2>
              </Reveal>

              <div className="lg:col-span-8 space-y-6">
                <Reveal>
                  {area.paragraphs.map((p, pi) => (
                    <p
                      key={pi}
                      className={cn(
                        "leading-relaxed text-[color:var(--color-ink)]/85 max-w-[62ch]",
                        pi === 0 && "text-lg",
                        pi > 0 && "mt-5"
                      )}
                    >
                      {p}
                    </p>
                  ))}
                </Reveal>

                {area.bullets?.map((group, gi) => (
                  <Reveal key={gi} delay={0.1}>
                    <div className="mt-8">
                      {group.heading && <p className="eyebrow">{group.heading}</p>}
                      <ul className="mt-4 space-y-2.5">
                        {group.items.map((item, ii) => (
                          <li key={ii} className="flex gap-4">
                            <span className="mt-3 h-px w-6 shrink-0 bg-[color:var(--color-gold)]" />
                            <span className="text-[color:var(--color-ink)]/85">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Container>
        </Section>
      ))}

      <CtaBanner />
    </>
  );
}
