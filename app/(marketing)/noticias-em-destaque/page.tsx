import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/shared/section";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { CtaBanner } from "@/components/shared/cta-banner";
import { SectorNews } from "@/components/shared/sector-news";

export const metadata: Metadata = pageMetadata({
  title: "Notícias em Destaque",
  description:
    "Atualidade portuguesa sobre recuperação de crédito, justiça, economia e legislação relevante para credores, mandatários e empresas.",
  path: "/noticias-em-destaque",
});

export default function NoticiasIndex() {
  return (
    <>
      <Section tone="navy-deep" spacing="lg" className="pt-12">
        <Container size="wide">
          <div className="text-[color:var(--color-bone)]/80">
            <Breadcrumbs items={[{ label: "Notícias em Destaque" }]} />
          </div>
          <Reveal className="mt-8">
            <p className="eyebrow text-[color:var(--color-gold)]">Atualidade</p>
            <h1 className="mt-6 text-[color:var(--color-bone)] max-w-[20ch]">
              Notícias e análises do sector.
            </h1>
            <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-[color:var(--color-bone)]/85">
              Acompanhamos de perto a atualidade económica, jurídica e imobiliária relevante para credores, mandatários e empresas.
            </p>
          </Reveal>
        </Container>
      </Section>

      <SectorNews />

      <CtaBanner />
    </>
  );
}
