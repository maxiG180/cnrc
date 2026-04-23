import Image from "next/image";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/shared/section";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { CtaBanner } from "@/components/shared/cta-banner";

export const metadata: Metadata = pageMetadata({
  title: "A Nossa Equipa",
  description:
    "Conheça a equipa multidisciplinar da Camacho & Nunes Recuperação de Crédito: advogados, solicitadores, operacionais e técnicos de peritagem.",
  path: "/a-nossa-equipa",
});

const pillars = [
  {
    title: "Jurídico",
    description:
      "Advogados e solicitadores com vasta experiência em direito processual civil, insolvência e execuções.",
  },
  {
    title: "Operacional",
    description:
      "Equipas de terreno treinadas em técnicas de acesso controlado, maneio animal, operação de grua e piloto de helicóptero.",
  },
  {
    title: "Peritagem e Gestão",
    description:
      "Técnicos de peritagem, gestores de caso e equipa de reporting que garantem a rastreabilidade integral de cada diligência.",
  },
];

export default function EquipaPage() {
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
            <p className="eyebrow text-[color:var(--color-gold)]">A Nossa Equipa</p>
            <h1 className="mt-6 text-[color:var(--color-bone)] max-w-[20ch]">
              Uma equipa multidisciplinar e experiente.
            </h1>
            <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-[color:var(--color-bone)]/85">
              A CNRC reúne profissionais das áreas jurídica, operacional e técnica que trabalham de forma integrada para assegurar resultados em cada processo.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section tone="bone" spacing="lg">
        <Container size="wide">
          <div className="grid gap-8 md:grid-cols-3">
            {pillars.map((p) => (
              <Reveal key={p.title}>
                <div className="h-full border border-[color:var(--color-stone)]/40 bg-[color:var(--color-bone-soft)] p-8">
                  <p className="eyebrow">Pilar</p>
                  <h3 className="mt-3 text-xl">{p.title}</h3>
                  <p className="mt-4 leading-relaxed text-[color:var(--color-ink)]/80">{p.description}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 border border-[color:var(--color-stone)]/40 bg-[color:var(--color-bone-soft)] p-10">
            <p className="eyebrow">Brevemente</p>
            <h2 className="mt-4 text-2xl md:text-3xl">Perfis individuais em atualização.</h2>
            <p className="mt-4 max-w-[62ch] text-[color:var(--color-ink)]/80">
              Estamos a preparar apresentações detalhadas da nossa estrutura de gestão e dos principais responsáveis operacionais. Para necessidades concretas, contacte-nos diretamente.
            </p>
          </div>
        </Container>
      </Section>

      <CtaBanner />
    </>
  );
}
