import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/shared/section";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { VideoPlayer } from "@/components/shared/video-player";
import { CtaBanner } from "@/components/shared/cta-banner";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("instalacoes");
  return pageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/as-nossas-instalacoes",
  });
}

export default async function InstalacoesPage() {
  const t = await getTranslations("instalacoes");
  return (
    <>
      <Section tone="bone-soft" spacing="lg" className="pt-12">
        <Container size="wide">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-0">
            <div className="lg:col-span-5 flex flex-col justify-center z-10 lg:pr-12">
              <Reveal>
                <p className="eyebrow">{t("hero.eyebrow")}</p>
                <h1 className="mt-6 max-w-[14ch]">{t("hero.title")}</h1>
                <div className="mt-8 inline-flex items-center gap-3 px-4 py-2 border-l-2 border-[color:var(--color-gold)]">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 drop-shadow-sm">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="var(--color-gold)" stroke="white" strokeWidth="2" />
                  </svg>
                  <span className="text-base font-medium text-[color:var(--color-navy)]">Pinhal Novo</span>
                </div>
              </Reveal>
            </div>
            <div className="lg:col-span-7 relative">
              <Reveal delay={0.1}>
                <div className="relative aspect-[4/3] lg:aspect-[3/2] overflow-hidden">
                  <Image
                    src="https://res.cloudinary.com/dqd3l6zf5/image/upload/v1779933473/Pinhal-Novo_Meios-Operacionais_Pista-Heliporto_puukw0.png"
                    alt={t("hero.eyebrow")}
                    fill
                    sizes="(min-width:1024px) 58vw, 100vw"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-[color:var(--color-stone)]/20" />
                </div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[color:var(--color-gold)]/10 -z-10 hidden lg:block" />
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="bone" spacing="lg">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-center">
            <Reveal className="lg:col-span-7">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src="https://res.cloudinary.com/dqd3l6zf5/image/upload/v1779931698/helipad_rciybo.png" alt={t("heliport.alt")} fill sizes="(min-width:1024px) 58vw, 100vw" className="object-cover" priority />
              </div>
            </Reveal>

            <Reveal className="lg:col-span-5" delay={0.1}>
              <p className="eyebrow">{t("heliport.eyebrow")}</p>
              <h2 className="mt-4 rule">
                {t("heliport.titleLine1")}<br />
                <span className="text-[color:var(--color-gold-dim)]">{t("heliport.titleLine2")}</span>
              </h2>
              <p className="mt-8 leading-relaxed text-[color:var(--color-ink)]/80 max-w-[44ch]">{t("heliport.body")}</p>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="bone-soft" spacing="lg">
        <Container size="wide">
          <Reveal>
            <p className="eyebrow">{t("kennels.eyebrow")}</p>
            <h2 className="mt-4 rule max-w-[32ch]">{t("kennels.title")}</h2>
            <p className="mt-6 max-w-[60ch] leading-relaxed text-[color:var(--color-ink)]/80">{t("kennels.body")}</p>
          </Reveal>

          <div className="mt-12 grid gap-3 md:grid-cols-2 max-w-4xl mx-auto">
            <Reveal>
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image src="https://res.cloudinary.com/dqd3l6zf5/image/upload/v1779931709/viveiros-passaros_apo05k.jpg" alt={t("kennels.alt2")} fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover" />
              </div>
            </Reveal>
            <Reveal delay={0.05} className="hidden md:block">
              <VideoPlayer
                src="https://res.cloudinary.com/dqd3l6zf5/video/upload/v1778104702/Viveiros-passaros_video_pv2frh.mp4"
                title={t("kennels.videoTitle")}
                aspectRatio="3/4"
              />
            </Reveal>
          </div>

          <div className="mt-3 max-w-4xl mx-auto">
            <Reveal delay={0.1}>
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image src="/instalacoes/viveiro-close-up.png" alt={t("kennels.alt1")} fill sizes="(min-width:896px) 896px, 100vw" className="object-cover" />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="bone" spacing="lg">
        <Container size="wide">
          <Reveal>
            <p className="eyebrow">{t("complementary.eyebrow")}</p>
            <h2 className="mt-4 rule max-w-[30ch]">{t("complementary.title")}</h2>
          </Reveal>

          <div className="mt-12 grid gap-px bg-[color:var(--color-stone)]/30 border border-[color:var(--color-stone)]/30 md:grid-cols-2">
            <Reveal>
              <div className="bg-[color:var(--color-bone)] p-10 h-full">
                <p className="eyebrow">{t("complementary.warehouseEyebrow")}</p>
                <h3 className="mt-3 text-xl">{t("complementary.warehouseTitle")}</h3>
                <div className="mt-3 h-px w-8 bg-[color:var(--color-gold)]" />
                <p className="mt-5 leading-relaxed text-[color:var(--color-ink)]/80">{t("complementary.warehouseBody")}</p>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="bg-[color:var(--color-bone)] p-10 h-full">
                <p className="eyebrow">{t("complementary.fleetEyebrow")}</p>
                <h3 className="mt-3 text-xl">{t("complementary.fleetTitle")}</h3>
                <div className="mt-3 h-px w-8 bg-[color:var(--color-gold)]" />
                <p className="mt-5 leading-relaxed text-[color:var(--color-ink)]/80">{t("complementary.fleetBody")}</p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <CtaBanner />
    </>
  );
}
