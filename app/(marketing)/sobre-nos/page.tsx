"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Section } from "@/components/shared/section";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { CtaBanner } from "@/components/shared/cta-banner";
import { OfficeMap, offices, type Office } from "@/components/about/office-map";
import { company } from "@/content/shared/company-info";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";

const meiosImages = [
  "https://res.cloudinary.com/dqd3l6zf5/image/upload/v1778168108/Helic%C3%B3ptero6_m28vz0.png",
  "https://res.cloudinary.com/dqd3l6zf5/image/upload/v1778168108/Helic%C3%B3ptero5_xgzvav.png",
  "https://res.cloudinary.com/dqd3l6zf5/image/upload/v1778200454/Empilhador3_fzfjbw.png",
  "https://res.cloudinary.com/dqd3l6zf5/image/upload/v1778200455/Empilhador4_ulfqna.png",
  "https://res.cloudinary.com/dqd3l6zf5/image/upload/v1779234825/Meios-Operacionais_Com-Forca-Policial-17-900x550.jpg_xypyy1.webp",
  "https://res.cloudinary.com/dqd3l6zf5/image/upload/v1779232193/Grua1_tnoxsb.png",
];

function MeiosCarousel() {
  const t = useTranslations("sobreNos.carousel");
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ delay: 4000, stopOnInteraction: true })]
  );
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative aspect-[4/5] overflow-hidden group">
      <div ref={emblaRef} className="h-full">
        <div className="flex h-full">
          {meiosImages.map((src, i) => (
            <div key={i} className="relative h-full min-w-0 shrink-0 grow-0 basis-full">
              <Image src={src} alt="" fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-[color:var(--color-navy)]/80 hover:bg-[color:var(--color-navy)] text-[color:var(--color-bone)] p-2 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
        disabled={!canScrollPrev}
        aria-label={t("previousImage")}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-[color:var(--color-navy)]/80 hover:bg-[color:var(--color-navy)] text-[color:var(--color-bone)] p-2 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
        disabled={!canScrollNext}
        aria-label={t("nextImage")}
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}

export default function SobreNosPage() {
  const t = useTranslations("sobreNos");
  const [selectedOffice, setSelectedOffice] = useState<Office | null>(null);

  const handleOfficeClick = useCallback((office: Office) => {
    setSelectedOffice(office);
  }, []);

  return (
    <>
      <Section tone="navy-deep" spacing="lg" className="pt-12 relative">
        <div className="absolute inset-0 opacity-20">
          <Image src="https://res.cloudinary.com/dqd3l6zf5/image/upload/v1779236026/Logo_CNRC_Light_vt8i1d.png" alt="CNRC" fill sizes="100vw" className="object-cover" priority />
        </div>
        <Container size="wide" className="relative z-10">
          <Reveal>
            <p className="eyebrow text-[color:var(--color-gold)]">{t("hero.eyebrow")}</p>
            <h1 className="mt-6 text-[color:var(--color-bone)] max-w-[20ch]">{t("hero.title")}</h1>
          </Reveal>
        </Container>
      </Section>

      <Section tone="bone" spacing="lg">
        <Container size="content">
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-8">
              <div className="prose-legal">
                <p className="lead text-xl leading-relaxed text-[color:var(--color-ink)]/85">
                  {t("introLeadPre")}
                  <strong>{t("introLeadBold")}</strong>
                  {t("introLeadPost", { founded: company.founded })}
                </p>
              </div>
            </div>
            <div className="lg:col-span-4">
              <div className="relative w-full max-w-[300px] mx-auto aspect-square">
                <Image src="https://res.cloudinary.com/dqd3l6zf5/image/upload/v1779236022/Logo_CNRC_caeick.png" alt="CNRC" fill sizes="(min-width:1024px) 300px, 200px" className="object-contain" />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="bone-soft" spacing="lg">
        <Container size="wide">
          <div className="grid gap-16 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <p className="eyebrow">{t("structure.eyebrow")}</p>
              <h2 className="mt-4 rule">{t("structure.title")}</h2>
              <p className="mt-8 text-lg leading-relaxed text-[color:var(--color-ink)]/85 max-w-[56ch]">
                {t("structure.body")}
              </p>
              <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 max-w-lg">
                {offices.map((office) => (
                  <li key={office.slug}>
                    <button
                      onClick={() => handleOfficeClick(office)}
                      className="flex items-center gap-3 text-base text-[color:var(--color-navy)] hover:text-[color:var(--color-gold)] transition-all group w-full text-left py-2 px-3 -mx-3 rounded-lg hover:bg-[color:var(--color-bone)]/50 cursor-pointer"
                    >
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 flex-shrink-0 transition-transform group-hover:scale-125 drop-shadow-sm">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill={office.slug === "huelva" ? "var(--color-danger)" : "var(--color-gold)"} stroke="white" strokeWidth="2" />
                        <circle cx="12" cy="9" r="3" fill="white" opacity="0.9" />
                      </svg>
                      <span className="group-hover:translate-x-1 transition-transform">{office.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal className="lg:col-span-7" delay={0.1}>
              <OfficeMap selectedOffice={selectedOffice} />
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="bone" spacing="lg">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <p className="eyebrow">{t("resources.eyebrow")}</p>
              <h2 className="mt-4 rule">
                {t("resources.titleLine1")} <span className="text-[color:var(--color-gold-dim)]">{t("resources.titleHighlight")}</span>
              </h2>
              <div className="mt-10 prose-legal">
                <p>{t("resources.p1")}</p>
                <p className="mt-6"><strong>{t("resources.meansAvailable")}</strong></p>
                <ul>
                  <li>{t("resources.means1")}</li>
                  <li>{t("resources.means2")}</li>
                  <li>{t("resources.means3")}</li>
                  <li>{t("resources.means4")}</li>
                </ul>
              </div>
            </Reveal>
            <Reveal className="lg:col-span-5" delay={0.1}>
              <MeiosCarousel />
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="navy" spacing="lg">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-12 items-start">
            <Reveal className="lg:col-span-5">
              <p className="eyebrow text-[color:var(--color-gold)]">{t("legal.eyebrow")}</p>
              <h2 className="mt-4 text-[color:var(--color-bone)]">{t("legal.title")}</h2>
            </Reveal>
            <div className="lg:col-span-7 text-[color:var(--color-bone)]/85 leading-relaxed space-y-6 max-w-[58ch]">
              <p>{t("legal.p1")}</p>
              <p>{t("legal.partnersIntro")}</p>
              <ul className="space-y-2 pl-0">
                <li className="flex gap-3"><span className="mt-3 h-px w-5 bg-[color:var(--color-gold)]" />{t("legal.partner1")}</li>
                <li className="flex gap-3"><span className="mt-3 h-px w-5 bg-[color:var(--color-gold)]" />{t("legal.partner2")}</li>
              </ul>
              <p>{t("legal.p2")}</p>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="bone-soft" spacing="lg">
        <Container size="wide">
          <div className="grid gap-12 md:grid-cols-2">
            <Reveal>
              <p className="eyebrow">{t("differentiation.eyebrow")}</p>
              <h3 className="mt-4">{t("differentiation.title")}</h3>
              <p className="mt-6 text-[color:var(--color-ink)]/80 leading-relaxed max-w-[48ch]">
                {t("differentiation.p1")}
              </p>
              <p className="mt-4 text-[color:var(--color-ink)]/80 leading-relaxed max-w-[48ch]">
                {t("differentiation.p2", { founded: company.founded })}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="eyebrow">{t("mission.eyebrow")}</p>
              <h3 className="mt-4">{t("mission.title")}</h3>
              <p className="mt-6 text-[color:var(--color-ink)]/80 leading-relaxed max-w-[48ch]">
                {t("mission.body")}
              </p>
              <ul className="mt-6 space-y-2 text-[color:var(--color-ink)]/85">
                <li className="flex gap-3"><span className="mt-3 h-px w-5 bg-[color:var(--color-gold)]" />{t("mission.item1")}</li>
                <li className="flex gap-3"><span className="mt-3 h-px w-5 bg-[color:var(--color-gold)]" />{t("mission.item2")}</li>
                <li className="flex gap-3"><span className="mt-3 h-px w-5 bg-[color:var(--color-gold)]" />{t("mission.item3")}</li>
              </ul>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="bone" spacing="lg">
        <Container size="content">
          <Reveal>
            <p className="eyebrow">{t("invite.eyebrow")}</p>
            <h2 className="mt-4 rule">{t("invite.title")}</h2>
            <p className="mt-10 text-lg leading-relaxed text-[color:var(--color-ink)]/85 max-w-[60ch]">
              {t("invite.bodyPre")}
              <a href={`tel:${company.phones.mobile.replace(/\s/g, "")}`} className="text-[color:var(--color-navy)] underline decoration-[color:var(--color-gold)] underline-offset-4">{company.phones.mobile}</a>
              {t("invite.bodyPost")}
            </p>
            <p className="mt-8 font-display italic text-xl md:text-2xl text-[color:var(--color-navy)] max-w-[52ch]">
              &ldquo;{t("invite.quote")}&rdquo;
            </p>
            <div className="mt-10 flex items-end gap-6">
              <div className="flex flex-col items-center w-[200px]">
                <Image src="https://res.cloudinary.com/dqd3l6zf5/image/upload/v1779236299/assinatura-ceo_ginq9m.png" alt={`${company.ceo} signature`} width={200} height={75} className="object-contain opacity-80 mb-2" />
                <div className="h-px w-full bg-[color:var(--color-gold)]/40" />
              </div>
              <div>
                <p className="font-display italic text-lg text-[color:var(--color-navy)]">{company.ceo}</p>
                <p className="text-[11px] tracking-[0.2em] uppercase text-[color:var(--color-stone-dark)] mt-1">{t("invite.ceoRole")}</p>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <CtaBanner />
    </>
  );
}
