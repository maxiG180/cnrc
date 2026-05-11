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
      <Section tone="navy-deep" spacing="lg" className="pt-12">
        <Container size="wide">
          <Reveal>
            <p className="eyebrow text-[color:var(--color-gold)]">{t("hero.eyebrow")}</p>
            <h1 className="mt-6 text-[color:var(--color-bone)] max-w-[22ch]">{t("hero.title")}</h1>
            <div className="mt-6 space-y-4 max-w-[62ch]">
              <p className="text-lg leading-relaxed text-[color:var(--color-bone)]/85">{t("hero.p1")}</p>
              <p className="text-base leading-relaxed text-[color:var(--color-bone)]/70">{t("hero.p2")}</p>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section tone="bone" spacing="lg">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-center">
            <Reveal className="lg:col-span-7">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src="/instalacoes/helipad.png" alt={t("heliport.alt")} fill sizes="(min-width:1024px) 58vw, 100vw" className="object-cover" priority />
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

      <Section tone="bone-soft" spacing="lg" className="!pb-0">
        <Container size="wide">
          <Reveal>
            <p className="eyebrow">{t("kennels.eyebrow")}</p>
            <h2 className="mt-4 rule max-w-[32ch]">{t("kennels.title")}</h2>
            <p className="mt-6 max-w-[60ch] leading-relaxed text-[color:var(--color-ink)]/80">{t("kennels.body")}</p>
          </Reveal>

          <div className="mt-12 grid gap-3 sm:grid-cols-2">
            <Reveal>
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src="/instalacoes/viveiro-close-up.png" alt={t("kennels.alt1")} fill sizes="(min-width:640px) 50vw, 100vw" className="object-cover" />
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src="/instalacoes/viveiros-passaros.jpg" alt={t("kennels.alt2")} fill sizes="(min-width:640px) 50vw, 100vw" className="object-cover" />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="bone-soft" spacing="lg" className="!pt-0">
        <Container size="wide">
          <Reveal>
            <VideoPlayer
              src="https://res.cloudinary.com/dqd3l6zf5/video/upload/v1778104702/Viveiros-passaros_video_pv2frh.mp4"
              title={t("kennels.videoTitle")}
            />
          </Reveal>
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
