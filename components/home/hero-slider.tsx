"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { ArrowRight, Phone } from "lucide-react";
import { company } from "@/content/shared/company-info";
import { formatPhoneHref } from "@/lib/utils";

type SlideDef = {
  eyebrowKey?: string;
  titleKey: string;
  highlightKey?: string;
  quoteKey: string;
  ctaKey: string;
  ctaHref: string;
  image: string;
};

const slides: SlideDef[] = [
  {
    titleKey: "home.hero.slide1Title",
    highlightKey: "home.hero.slide1Highlight",
    quoteKey: "home.hero.slide1Quote",
    ctaKey: "home.hero.slide1Cta",
    ctaHref: formatPhoneHref(company.phones.free),
    image: "/hero/slide-1.png",
  },
  {
    eyebrowKey: "home.hero.executionsEyebrow",
    titleKey: "home.hero.executionsTitle",
    quoteKey: "home.hero.executionsQuote",
    ctaKey: "home.hero.learnMore",
    ctaHref: "/areas-de-especializacao#execucoes",
    image: "/hero/slide-2.png",
  },
  {
    eyebrowKey: "home.hero.seizuresEyebrow",
    titleKey: "home.hero.seizuresTitle",
    quoteKey: "home.hero.seizuresQuote",
    ctaKey: "home.hero.learnMore",
    ctaHref: "/areas-de-especializacao#arrestos",
    image: "/hero/slide-3.png",
  },
  {
    eyebrowKey: "home.hero.insolvencyEyebrow",
    titleKey: "home.hero.insolvencyTitle",
    quoteKey: "home.hero.insolvencyQuote",
    ctaKey: "home.hero.learnMore",
    ctaHref: "/areas-de-especializacao#insolvencia",
    image: "/hero/slide-4.png",
  },
  {
    eyebrowKey: "home.hero.breakInEyebrow",
    titleKey: "home.hero.breakInTitle",
    quoteKey: "home.hero.breakInQuote",
    ctaKey: "home.hero.learnMore",
    ctaHref: "/areas-de-especializacao#arrombamentos",
    image: "/hero/slide-5.png",
  },
  {
    eyebrowKey: "home.hero.factProvisionEyebrow",
    titleKey: "home.hero.factProvisionTitle",
    quoteKey: "home.hero.factProvisionQuote",
    ctaKey: "home.hero.learnMore",
    ctaHref: "/areas-de-especializacao#prestacao-de-facto",
    image: "/hero/slide-6.png",
  },
  {
    eyebrowKey: "home.hero.expertiseEyebrow",
    titleKey: "home.hero.expertiseTitle",
    quoteKey: "home.hero.expertiseQuote",
    ctaKey: "home.hero.learnMore",
    ctaHref: "/areas-de-especializacao#peritagem-judicial",
    image: "/hero/slide-2.png",
  },
  {
    eyebrowKey: "home.hero.realEstateEyebrow",
    titleKey: "home.hero.realEstateTitle",
    quoteKey: "home.hero.realEstateQuote",
    ctaKey: "home.hero.learnMore",
    ctaHref: "/areas-de-especializacao#imobiliario",
    image: "/hero/slide-5.png",
  },
];

export function HeroSlider() {
  const t = useTranslations();
  const tCommon = useTranslations("common");
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 30 },
    [Autoplay({ delay: 6500, stopOnInteraction: false, stopOnMouseEnter: true }), Fade()]
  );
  const [selected, setSelected] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
    setIsReady(true);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const freeCallLabel = t("home.hero.freeCall");

  return (
    <section className="relative w-full bg-[color:var(--color-navy-deep)] text-[color:var(--color-bone)] overflow-hidden">
      <div className="absolute inset-0 z-0" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide, i) => (
            <div key={i} className="relative h-[76vh] min-h-[560px] w-full shrink-0 grow-0 basis-full">
              <Image
                src={slide.image}
                alt={t(slide.titleKey)}
                fill
                sizes="100vw"
                priority={i === 0}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--color-navy-deep)]/90 via-[color:var(--color-navy-deep)]/55 to-[color:var(--color-navy-deep)]/20" />
              <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--color-navy-deep)]/75 via-transparent to-transparent" />
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 flex min-h-[76vh] items-center">
        <div className="mx-auto w-full max-w-[var(--container-wide)] px-6 md:px-10 py-20 md:py-32">
          {slides.map((slide, i) => {
            const title = t(slide.titleKey);
            const highlight = slide.highlightKey ? t(slide.highlightKey) : null;
            const titleHtml = highlight
              ? title.replace(
                  new RegExp(highlight, "g"),
                  `<span class="text-[color:var(--color-gold)]">${highlight}</span>`,
                )
              : title;
            const ctaLabel = t(slide.ctaKey);
            const isFreeCall = ctaLabel === freeCallLabel;
            return (
              <div
                key={`content-${i}`}
                className="transition-opacity duration-500"
                style={{ display: i === selected ? "block" : "none" }}
              >
                {slide.eyebrowKey && (
                  <p className="eyebrow text-[color:var(--color-gold)]">{t(slide.eyebrowKey)}</p>
                )}
                <h1
                  className="mt-4 max-w-[18ch] text-[color:var(--color-bone)] text-balance"
                  dangerouslySetInnerHTML={{ __html: titleHtml }}
                />
                <p className="mt-6 max-w-[52ch] font-display text-lg italic text-[color:var(--color-bone)]/85 md:text-xl">
                  &ldquo;{t(slide.quoteKey)}&rdquo;
                </p>
                <div className="mt-10 flex flex-wrap gap-3">
                  <Link
                    href={slide.ctaHref}
                    className="inline-flex items-center gap-3 bg-[color:var(--color-gold)] px-7 py-4 text-[color:var(--color-navy-deep)] text-xs font-medium uppercase tracking-[0.2em] hover:bg-[color:var(--color-gold-bright)] transition-colors"
                  >
                    {isFreeCall && <Phone className="h-4 w-4" />}
                    {ctaLabel}
                    {!isFreeCall && <ArrowRight className="h-4 w-4" />}
                  </Link>
                  <Link
                    href="/contactos"
                    className="inline-flex items-center gap-3 border border-[color:var(--color-bone)]/30 px-7 py-4 text-xs uppercase tracking-[0.2em] text-[color:var(--color-bone)] hover:border-[color:var(--color-gold)] hover:text-[color:var(--color-gold-bright)] transition-colors"
                  >
                    {tCommon("talkToUs")}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-6 left-6 right-6 z-10 flex items-center gap-2 md:left-10 md:right-10">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => emblaApi?.scrollTo(i)}
            className="group relative h-px flex-1 bg-[color:var(--color-bone)]/20"
            aria-label={`${t("home.hero.goToSlide")} ${i + 1}`}
          >
            <span
              className="absolute inset-0 origin-left bg-[color:var(--color-gold)] ease-linear"
              style={{
                transform: i === selected && isReady ? "scaleX(1)" : "scaleX(0)",
                transition: isReady ? "transform 6500ms linear" : "none",
              }}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
