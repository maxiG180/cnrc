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
  lead: string;
  bullets?: { heading?: string; items: string[] }[];
  image: string;
};

export default async function AreasDeEspecializacaoPage() {
  const t = await getTranslations("areas");

  const areas: Area[] = [
    {
      slug: "execucoes",
      eyebrow: t("executions.eyebrow"),
      title: t("executions.title"),
      lead: t("executions.p1"),
      image: "/instalacoes/lisboa-sala-audiencias.jpg",
    },
    {
      slug: "arrestos",
      eyebrow: t("seizures.eyebrow"),
      title: t("seizures.title"),
      lead: t("seizures.p1"),
      image: "https://res.cloudinary.com/dqd3l6zf5/image/upload/v1778196817/Arrombamento1_ylzhc6.png",
    },
    {
      slug: "insolvencia",
      eyebrow: t("insolvency.eyebrow"),
      title: t("insolvency.title"),
      lead: t("insolvency.p1"),
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
      image: "/Quem%20Somos/As%20Nossas%20Instala%C3%A7%C3%B5es/Lisboa/19_Lisboa_-Sala-de-reunioes-1.jpg",
    },
    {
      slug: "arrombamentos",
      eyebrow: t("breakIns.eyebrow"),
      title: t("breakIns.title"),
      lead: t("breakIns.p1"),
      image: "https://res.cloudinary.com/dqd3l6zf5/image/upload/v1778196818/Arrombamento3_uk6yxl.png",
    },
    {
      slug: "prestacao-de-facto",
      eyebrow: t("factProvision.eyebrow"),
      title: t("factProvision.title"),
      lead: t("factProvision.p1"),
      image: "/Quem%20Somos/Os%20Nossos%20Escrit%C3%B3rios/Lisboa/10_Lisboa_-Gabinete-Advogados-3.jpg",
    },
    {
      slug: "peritagem-judicial",
      eyebrow: t("expertise.eyebrow"),
      title: t("expertise.title"),
      lead: t("expertise.p1"),
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
      image: "/Fotos-Lisboa_Horizontais-10-scaled.jpg",
    },
    {
      slug: "imobiliario",
      eyebrow: t("realEstate.eyebrow"),
      title: t("realEstate.title"),
      lead: t("realEstate.p1"),
      image: "https://res.cloudinary.com/dqd3l6zf5/image/upload/v1778332374/Catelo-Royal-Villas_80-moradias-23042026-_site-1-900x550_yucjcm.png",
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
        <Section key={area.slug} id={area.slug} tone={i % 2 === 0 ? "bone" : "bone-soft"} className="!py-0 scroll-mt-20">
          <div className="grid lg:grid-cols-2">
            <div className={cn("relative min-h-[280px] lg:min-h-[540px]", i % 2 === 1 && "lg:order-last")}>
              <Image
                src={area.image}
                alt={area.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col justify-center py-12 px-6 md:py-16 md:px-12 lg:px-16">
              <Reveal>
                <p className="eyebrow">{area.eyebrow}</p>
                <h2 className="mt-4 rule text-4xl md:text-5xl">{area.title}</h2>
                <p className="mt-6 text-lg leading-relaxed text-[color:var(--color-ink)]/85">{area.lead}</p>
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
        </Section>
      ))}

      <CtaBanner />
    </>
  );
}
