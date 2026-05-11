import type { Metadata } from "next";
import { Radio } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/shared/section";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { CtaBanner } from "@/components/shared/cta-banner";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("tvDireto");
  return pageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/tv-direto",
  });
}

export default async function TvDiretoPage() {
  const t = await getTranslations("tvDireto");
  return (
    <>
      <Section tone="navy-deep" spacing="lg" className="pt-12">
        <Container size="wide">
          <Reveal>
            <p className="eyebrow text-[color:var(--color-gold)]">{t("hero.eyebrow")}</p>
            <h1 className="mt-6 text-[color:var(--color-bone)] max-w-[20ch]">{t("hero.title")}</h1>
            <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-[color:var(--color-bone)]/85">{t("hero.subtitle")}</p>
          </Reveal>
        </Container>
      </Section>

      <Section tone="bone" spacing="lg">
        <Container size="content">
          <div className="border border-[color:var(--color-stone)]/40 bg-[color:var(--color-bone-soft)] p-12 text-center">
            <Radio className="mx-auto h-10 w-10 text-[color:var(--color-gold-dim)]" />
            <p className="mt-6 eyebrow">{t("preparing.eyebrow")}</p>
            <h2 className="mt-3 text-2xl md:text-3xl">{t("preparing.title")}</h2>
            <p className="mt-4 max-w-[62ch] mx-auto text-[color:var(--color-ink)]/80">{t("preparing.body")}</p>
          </div>
        </Container>
      </Section>

      <CtaBanner />
    </>
  );
}
