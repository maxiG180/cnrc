import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/shared/section";
import { Container } from "@/components/shared/container";
import { CtaBanner } from "@/components/shared/cta-banner";
import { SectorNews } from "@/components/shared/sector-news";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("noticias");
  return pageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/noticias-em-destaque",
  });
}

export default async function NoticiasIndex() {
  const t = await getTranslations("noticias");
  return (
    <>
      <Section tone="navy-deep" spacing="sm" className="border-b border-[color:var(--color-bone)]/10">
        <Container size="wide">
          <div className="text-center max-w-2xl mx-auto">
            <p className="eyebrow text-[color:var(--color-gold)]">{t("hero.eyebrow")}</p>
            <h1 className="mt-3 text-[color:var(--color-bone)]">{t("hero.title")}</h1>
          </div>
        </Container>
      </Section>

      <SectorNews />

      <CtaBanner />
    </>
  );
}
