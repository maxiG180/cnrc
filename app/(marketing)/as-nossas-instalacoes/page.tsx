import Image from "next/image";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/shared/section";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { CtaBanner } from "@/components/shared/cta-banner";

export const metadata: Metadata = pageMetadata({
  title: "As Nossas Instalações",
  description:
    "Complexo da CNRC em Pinhal Novo: heliporto, armazém de bens apreendidos, viveiros para animais vivos e parque de viaturas.",
  path: "/as-nossas-instalacoes",
});

const instalacoes = [
  {
    title: "Heliporto",
    description:
      "Estrutura certificada para operação regular do helicóptero CNRC, com área de manutenção e abastecimento.",
  },
  {
    title: "Armazém de Bens Apreendidos",
    description:
      "Instalação segura, videovigiada e com controlo de acessos, para guarda de bens móveis apreendidos.",
  },
  {
    title: "Viveiros de Acolhimento Animal",
    description:
      "Áreas dedicadas a diferentes espécies, com acompanhamento veterinário e protocolos de bem-estar.",
  },
  {
    title: "Parque de Viaturas",
    description:
      "Frota operacional completa: veículos especiais de arrombamento, reboques, gruas, empilhadores e cozinha móvel.",
  },
];

export default function InstalacoesPage() {
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
            <p className="eyebrow text-[color:var(--color-gold)]">As Nossas Instalações</p>
            <h1 className="mt-6 text-[color:var(--color-bone)] max-w-[22ch]">
              Um complexo operacional único.
            </h1>
            <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-[color:var(--color-bone)]/85">
              Em Pinhal Novo mantemos o nosso centro operacional: heliporto próprio, armazém de apreensões, viveiros para animais vivos e uma frota operacional completa.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section tone="bone" spacing="lg">
        <Container size="wide">
          <div className="grid gap-8 md:grid-cols-2">
            {instalacoes.map((i) => (
              <Reveal key={i.title}>
                <div className="h-full border border-[color:var(--color-stone)]/40 bg-[color:var(--color-bone-soft)] p-8">
                  <p className="eyebrow">Instalação</p>
                  <h3 className="mt-3 text-xl">{i.title}</h3>
                  <p className="mt-4 leading-relaxed text-[color:var(--color-ink)]/80">{i.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBanner />
    </>
  );
}
