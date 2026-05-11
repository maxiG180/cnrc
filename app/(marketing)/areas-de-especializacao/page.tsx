import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/shared/section";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { CtaBanner } from "@/components/shared/cta-banner";
import { AreaNavLinks } from "@/components/areas/area-nav-links";
import { cn } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("areas");
  return pageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/areas-de-especializacao",
  });
}

type Area = {
  slug: string;
  eyebrow: string;
  title: string;
  paragraphs: string[];
  bullets?: { heading?: string; items: string[] }[];
};

export default async function AreasDeEspecializacaoPage() {
  const t = await getTranslations("areas");

  const areas: Area[] = [
    {
      slug: "execucoes",
      eyebrow: t("executions.eyebrow"),
      title: t("executions.title"),
      paragraphs: [t("executions.p1"), t("executions.p2"), t("executions.p3")],
    },
    {
      slug: "arrestos",
      eyebrow: t("seizures.eyebrow"),
      title: t("seizures.title"),
      paragraphs: [t("seizures.p1"), t("seizures.p2")],
    },
    {
      slug: "insolvencia",
      eyebrow: t("insolvency.eyebrow"),
      title: t("insolvency.title"),
      paragraphs: [t("insolvency.p1")],
      bullets: [
        {
          heading: t("insolvency.bulletsHeading"),
          items: [
            t("insolvency.b1"),
            t("insolvency.b2"),
            t("insolvency.b3"),
            t("insolvency.b4"),
            t("insolvency.b5"),
          ],
        },
      ],
    },
    {
      slug: "arrombamentos",
      eyebrow: t("breakIns.eyebrow"),
      title: t("breakIns.title"),
      paragraphs: [t("breakIns.p1"), t("breakIns.p2")],
    },
    {
      slug: "prestacao-de-facto",
      eyebrow: t("factProvision.eyebrow"),
      title: t("factProvision.title"),
      paragraphs: [t("factProvision.p1"), t("factProvision.p2")],
    },
    {
      slug: "peritagem-judicial",
      eyebrow: t("expertise.eyebrow"),
      title: t("expertise.title"),
      paragraphs: [t("expertise.p1")],
      bullets: [
        {
          heading: t("expertise.bulletsHeading"),
          items: [
            t("expertise.b1"),
            t("expertise.b2"),
            t("expertise.b3"),
            t("expertise.b4"),
          ],
        },
      ],
    },
    {
      slug: "imobiliario",
      eyebrow: t("realEstate.eyebrow"),
      title: t("realEstate.title"),
      paragraphs: [t("realEstate.p1"), t("realEstate.p2")],
    },
  ];

  return (
    <>
      <Section tone="navy-deep" spacing="lg" className="pt-12 relative">
        <div className="absolute inset-0 opacity-20">
          <Image src="/Logos/CNRC/Logo_CNRC_Light.png" alt="CNRC" fill sizes="100vw" className="object-cover" priority />
        </div>
        <Container size="wide" className="relative z-10">
          <Reveal>
            <p className="eyebrow text-[color:var(--color-gold)]">{t("hero.eyebrow")}</p>
            <h1 className="mt-6 text-[color:var(--color-bone)] max-w-[18ch]">
              {t("hero.titleLine1")}
              <span className="block text-[color:var(--color-gold-bright)]">{t("hero.titleHighlight")}</span>
            </h1>
          </Reveal>

          <AreaNavLinks areas={areas.map((a) => ({ slug: a.slug, title: a.title }))} />
        </Container>
      </Section>

      {areas.map((area, i) => (
        <Section key={area.slug} id={area.slug} tone={i % 2 === 0 ? "bone" : "bone-soft"} spacing="lg" className="scroll-mt-20">
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
                        pi > 0 && "mt-5",
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
