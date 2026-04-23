import type { Metadata } from "next";
import { Radio } from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/shared/section";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { CtaBanner } from "@/components/shared/cta-banner";

export const metadata: Metadata = pageMetadata({
  title: "TV Direto",
  description:
    "Canal institucional da CNRC com reportagens, entrevistas e cobertura de diligências judiciais autorizadas.",
  path: "/tv-direto",
});

export default function TvDiretoPage() {
  return (
    <>
      <Section tone="navy-deep" spacing="lg" className="pt-12">
        <Container size="wide">
          <div className="text-[color:var(--color-bone)]/80">
            <Breadcrumbs items={[{ label: "TV Direto" }]} />
          </div>
          <Reveal className="mt-8">
            <p className="eyebrow text-[color:var(--color-gold)]">Canal Institucional</p>
            <h1 className="mt-6 text-[color:var(--color-bone)] max-w-[20ch]">
              CNRC em direto.
            </h1>
            <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-[color:var(--color-bone)]/85">
              Brevemente, este é o canal onde partilharemos reportagens, entrevistas e, sempre que autorizado, cobertura de diligências judiciais de interesse público.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section tone="bone" spacing="lg">
        <Container size="content">
          <div className="border border-[color:var(--color-stone)]/40 bg-[color:var(--color-bone-soft)] p-12 text-center">
            <Radio className="mx-auto h-10 w-10 text-[color:var(--color-gold-dim)]" />
            <p className="mt-6 eyebrow">Em preparação</p>
            <h2 className="mt-3 text-2xl md:text-3xl">Transmissão institucional brevemente disponível.</h2>
            <p className="mt-4 max-w-[62ch] mx-auto text-[color:var(--color-ink)]/80">
              Estamos a finalizar a infraestrutura técnica e editorial para transmissão do nosso canal institucional. Acompanhe-nos nas redes sociais e no nosso sítio para não perder o lançamento.
            </p>
          </div>
        </Container>
      </Section>

      <CtaBanner />
    </>
  );
}
