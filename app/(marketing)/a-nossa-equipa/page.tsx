import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/shared/section";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { HeroVideo } from "@/components/shared/hero-video";
import { ContactForm } from "@/components/forms/contact-form";
import { company } from "@/content/shared/company-info";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("equipa");
  return pageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/a-nossa-equipa",
  });
}

export default async function EquipaPage() {
  const t = await getTranslations("equipa");
  const pillars = [
    { number: "01", title: t("pillars.p1Title"), description: t("pillars.p1Desc") },
    { number: "02", title: t("pillars.p2Title"), description: t("pillars.p2Desc") },
    { number: "03", title: t("pillars.p3Title"), description: t("pillars.p3Desc") },
  ];

  return (
    <>
      <Section tone="navy-deep" spacing="lg" className="pt-12 relative">
        <div className="absolute inset-0 opacity-20">
          <Image src="https://res.cloudinary.com/dqd3l6zf5/image/upload/v1778168109/Helic%C3%B3ptero8_wgqcxw.png" alt="" fill sizes="100vw" className="object-cover" priority />
        </div>
        <Container size="wide" className="relative z-10">
          <Reveal>
            <p className="eyebrow text-[color:var(--color-gold)]">{t("hero.eyebrow")}</p>
            <h1 className="mt-6 text-[color:var(--color-bone)] max-w-[22ch]">{t("hero.title")}</h1>
            <div className="mt-6 space-y-4 max-w-[60ch]">
              <p className="text-lg leading-relaxed text-[color:var(--color-bone)]/85">{t("hero.p1")}</p>
              <p className="text-base leading-relaxed text-[color:var(--color-bone)]/70">{t("hero.p2")}</p>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section tone="bone-soft" spacing="lg">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-20 items-end">
            <Reveal className="lg:col-span-5" delay={0.1}>
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="https://res.cloudinary.com/dqd3l6zf5/image/upload/v1779236407/Foto-Dr.-Antonio-Nunes-bg-removed_g2rel5.png"
                  alt={`${company.ceo}, CEO ${company.shortName}`}
                  fill
                  sizes="(min-width:1024px) 40vw, 100vw"
                  className="object-cover object-top"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="font-display text-2xl text-[color:var(--color-navy-deep)]">{company.ceo}</p>
                  <p className="text-xs tracking-[0.2em] uppercase text-[color:var(--color-stone-dark)] mt-1">{t("ceo.role")} · {company.shortName}</p>
                </div>
              </div>
            </Reveal>

            <Reveal className="lg:col-span-7">
              <p className="eyebrow">{t("ceo.eyebrow")}</p>
              <h2 className="mt-4 rule">
                {t("ceo.titleLine1")}<br />
                <span className="text-[color:var(--color-gold-dim)]">{t("ceo.titleLine2")}</span>
              </h2>
              <div className="mt-10 space-y-6 text-[color:var(--color-ink)]/85 leading-relaxed max-w-[56ch]">
                <p>{t("ceo.p1", { ceo: company.ceo })}</p>
                <p>{t("ceo.p2")}</p>
              </div>

              <div className="mt-10 flex items-end gap-6">
                <div className="flex flex-col items-center w-[200px]">
                  <Image src="https://res.cloudinary.com/dqd3l6zf5/image/upload/v1779236299/assinatura-ceo_ginq9m.png" alt={`${company.ceo} signature`} width={200} height={75} className="object-contain opacity-80 mb-2" />
                  <div className="h-px w-full bg-[color:var(--color-gold)]/40" />
                </div>
                <div>
                  <p className="font-display italic text-lg text-[color:var(--color-navy)]">{company.ceo}</p>
                  <p className="text-[11px] tracking-[0.2em] uppercase text-[color:var(--color-stone-dark)] mt-1">{t("ceo.role")} · CNRC</p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="bone" spacing="lg">
        <Container size="wide">
          <Reveal>
            <p className="eyebrow">{t("pillars.eyebrow")}</p>
            <h2 className="mt-4 rule max-w-[28ch]">{t("pillars.title")}</h2>
          </Reveal>

          <div className="mt-16 grid gap-px bg-[color:var(--color-stone)]/30 border border-[color:var(--color-stone)]/30 md:grid-cols-3">
            {pillars.map((p) => (
              <Reveal key={p.title}>
                <div className="bg-[color:var(--color-bone)] p-10 h-full">
                  <span className="font-display text-6xl text-[color:var(--color-gold)]/25 leading-none select-none">{p.number}</span>
                  <h3 className="mt-4 text-xl">{p.title}</h3>
                  <div className="mt-3 h-px w-8 bg-[color:var(--color-gold)]" />
                  <p className="mt-5 leading-relaxed text-[color:var(--color-ink)]/80">{p.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="bone-soft" spacing="lg">
        <Container size="wide">
          <div className="grid gap-16 lg:grid-cols-12">
            <Reveal className="lg:col-span-6">
              <p className="eyebrow">{t("contact.eyebrow")}</p>
              <h2 className="mt-4 text-3xl md:text-4xl text-[color:var(--color-navy)] leading-tight">{t("contact.titleLine1")}</h2>
              <p className="mt-2 font-display italic text-4xl md:text-5xl text-[color:var(--color-gold-dim)]">{t("contact.titleLine2")}</p>
              <div className="mt-10 relative aspect-video overflow-hidden">
                <HeroVideo
                  src="https://res.cloudinary.com/dqd3l6zf5/video/upload/v1777239737/Helicoptero_Apreensao-Viatura_pkvwi3.mp4"
                  className="w-full h-full"
                />
              </div>
            </Reveal>

            <Reveal className="lg:col-span-6" delay={0.1}>
              <div className="border border-[color:var(--color-stone)]/40 bg-[color:var(--color-bone)] p-8 md:p-10">
                <p className="eyebrow">{t("contact.formEyebrow")}</p>
                <h3 className="mt-3 text-2xl">{t("contact.formTitle")}</h3>
                <div className="mt-8">
                  <ContactForm />
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
