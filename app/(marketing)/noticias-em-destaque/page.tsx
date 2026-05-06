import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/shared/section";
import { Container } from "@/components/shared/container";
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
      {/* Minimal Hero */}
      <Section tone="navy-deep" spacing="sm" className="border-b border-[color:var(--color-bone)]/10">
        <Container size="wide">
          <div className="text-center max-w-2xl mx-auto">
            <p className="eyebrow text-[color:var(--color-gold)]">Atualidade</p>
            <h1 className="mt-3 text-[color:var(--color-bone)]">
              Notícias em Destaque
            </h1>
          </div>
        </Container>
      </Section>

      <SectorNews />

      <CtaBanner />
    </>
  );
}
