"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { ArrowRight, Phone } from "lucide-react";
import { company } from "@/content/shared/company-info";
import { formatPhoneHref } from "@/lib/utils";

export type HeroSlide = {
  eyebrow?: string;
  title: string;
  quote: string;
  cta: { label: string; href: string };
  image: string;
};

export const homeHeroSlides: HeroSlide[] = [
  {
    title: "Juntos conseguimos recuperar<br/>O SEU CRÉDITO",
    quote:
      "O direito é uma escolha, é um direito de todos, mas só alguns a exercem com elegância. Obrigada por nos ter escolhido.",
    cta: { label: "Chamada gratuita", href: formatPhoneHref(company.phones.free) },
    image: "/images/hero/slide-1.png",
  },
  {
    eyebrow: "Processo Executivo",
    title: "Execuções",
    quote: "Liberdade é o direito de fazer tudo o que a lei permite.",
    cta: { label: "Saber mais", href: "/areas-de-especializacao#execucoes" },
    image: "/images/hero/slide-2.png",
  },
  {
    eyebrow: "Medida Cautelar",
    title: "Arrestos",
    quote: "A justiça pode demorar, mas tem uma hora que todo o mundo paga os seus pecados.",
    cta: { label: "Saber mais", href: "/areas-de-especializacao#arrestos" },
    image: "/images/hero/slide-3.png",
  },
  {
    eyebrow: "Processo Judicial",
    title: "Insolvência",
    quote: "A justiça é não dar a todos por igual, mas a cada um o que merece.",
    cta: { label: "Saber mais", href: "/areas-de-especializacao#insolvencia" },
    image: "/images/hero/slide-4.png",
  },
  {
    eyebrow: "Diligência Judicial",
    title: "Arrombamentos",
    quote: "A justiça é um valor que nasce no coração e se revela na coragem das nossas ações.",
    cta: { label: "Saber mais", href: "/areas-de-especializacao#arrombamentos" },
    image: "/images/hero/slide-5.png",
  },
  {
    eyebrow: "Cumprimento Coercivo",
    title: "Prestação de Facto",
    quote: "Não basta que todos sejam iguais perante a lei, é preciso que a lei seja igual perante todos.",
    cta: { label: "Saber mais", href: "/areas-de-especializacao#prestacao-de-facto" },
    image: "/images/hero/slide-6.png",
  },
  {
    eyebrow: "Avaliação Técnica",
    title: "Peritagem Judicial",
    quote: "Na vida é preciso coragem para ser diferente e muita competência para fazer a diferença.",
    cta: { label: "Saber mais", href: "/areas-de-especializacao#peritagem-judicial" },
    image: "/images/hero/slide-2.png",
  },
  {
    eyebrow: "Gestão de Ativos",
    title: "Imobiliário",
    quote: "O valor de um imóvel depende da dedicação e importância que nós lhe damos.",
    cta: { label: "Saber mais", href: "/areas-de-especializacao#imobiliario" },
    image: "/images/hero/slide-5.png",
  },
];

export function HeroSlider() {
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
    // Trigger animation after mount
    setIsReady(true);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="relative w-full bg-[color:var(--color-navy-deep)] text-[color:var(--color-bone)] overflow-hidden">
      <div className="absolute inset-0 z-0" ref={emblaRef}>
        <div className="flex h-full">
          {homeHeroSlides.map((slide, i) => (
            <div key={i} className="relative h-[76vh] min-h-[560px] w-full shrink-0 grow-0 basis-full">
              <Image
                src={slide.image}
                alt={slide.title}
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
          {homeHeroSlides.map((slide, i) => (
            <div
              key={`content-${i}`}
              className="transition-opacity duration-500"
              style={{
                display: i === selected ? "block" : "none",
              }}
            >
              {slide.eyebrow && <p className="eyebrow text-[color:var(--color-gold)]">{slide.eyebrow}</p>}
              <h1
                className="mt-4 max-w-[18ch] text-[color:var(--color-bone)] text-balance"
                dangerouslySetInnerHTML={{
                  __html: slide.title.replace(/O SEU CRÉDITO/g, '<span class="text-[color:var(--color-gold)]">O SEU CRÉDITO</span>')
                }}
              />
              <p className="mt-6 max-w-[52ch] font-display text-lg italic text-[color:var(--color-bone)]/85 md:text-xl">
                &ldquo;{slide.quote}&rdquo;
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  href={slide.cta.href}
                  className="inline-flex items-center gap-3 bg-[color:var(--color-gold)] px-7 py-4 text-[color:var(--color-navy-deep)] text-xs font-medium uppercase tracking-[0.2em] hover:bg-[color:var(--color-gold-bright)] transition-colors"
                >
                  {slide.cta.label === "Chamada gratuita" && <Phone className="h-4 w-4" />}
                  {slide.cta.label}
                  {slide.cta.label !== "Chamada gratuita" && <ArrowRight className="h-4 w-4" />}
                </Link>
                <Link
                  href="/contactos"
                  className="inline-flex items-center gap-3 border border-[color:var(--color-bone)]/30 px-7 py-4 text-xs uppercase tracking-[0.2em] text-[color:var(--color-bone)] hover:border-[color:var(--color-gold)] hover:text-[color:var(--color-gold-bright)] transition-colors"
                >
                  Fale connosco
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-6 left-6 right-6 z-10 flex items-center gap-2 md:left-10 md:right-10">
        {homeHeroSlides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => emblaApi?.scrollTo(i)}
            className="group relative h-px flex-1 bg-[color:var(--color-bone)]/20"
            aria-label={`Ir para slide ${i + 1}`}
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
