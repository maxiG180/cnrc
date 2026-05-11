import Image from "next/image";
import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/shared/section";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { CtaBanner } from "@/components/shared/cta-banner";
import { company } from "@/content/shared/company-info";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("escritorios");
  return pageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/os-nossos-escritorios",
  });
}

export default async function EscritoriosPage() {
  const t = await getTranslations("escritorios");
  return (
    <>
      <Section tone="navy-deep" spacing="lg" className="pt-12 relative">
        <div className="absolute inset-0 opacity-20">
          <Image src="/Logos/CNRC/Logo_CNRC_Light.png" alt="CNRC" fill sizes="100vw" className="object-cover" priority />
        </div>
        <Container size="wide" className="relative z-10">
          <Reveal>
            <p className="eyebrow text-[color:var(--color-gold)]">{t("hero.eyebrow")}</p>
            <h1 className="mt-6 text-[color:var(--color-bone)] max-w-[20ch]">{t("hero.title")}</h1>
            <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-[color:var(--color-bone)]/85">{t("hero.subtitle")}</p>
          </Reveal>
        </Container>
      </Section>

      <Section tone="bone" spacing="lg">
        <Container size="wide">
          <div className="grid gap-px bg-[color:var(--color-stone)]/40 border border-[color:var(--color-stone)]/40 md:grid-cols-2 lg:grid-cols-3">
            {company.offices.map((o) => (
              <div key={o.slug} className="bg-[color:var(--color-bone)] p-8 md:p-10">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-5 w-5 text-[color:var(--color-gold-dim)]" />
                  <div>
                    <p className="eyebrow">{t("officeLabel")}</p>
                    <h3 className="mt-2 text-xl">{o.name}</h3>
                    <p className="mt-4 text-sm text-[color:var(--color-ink)]/75">{t("placeholder")}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBanner />
    </>
  );
}
