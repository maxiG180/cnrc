"use client";

import Image from "next/image";
import { Section } from "@/components/shared/section";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { CtaBanner } from "@/components/shared/cta-banner";
import { company } from "@/content/shared/company-info";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";

const meiosImages = [
  { src: "/images/Meios-Operacionais_Helicoptero-2.jpg", alt: "Helicóptero CNRC" },
  { src: "/images/Meios-Operacionais_Helicoptero-3.jpg", alt: "Helicóptero CNRC em voo" },
  { src: "/images/Meios-Operacionais_Com-Empilhador-2.jpg", alt: "Empilhador" },
  { src: "/images/Meios-Operacionais_Com-Forca-Policial-22.jpg", alt: "Operação com força policial" },
  { src: "/images/Meios-Operacionais_Com-Veiculo-Arrombamento-14.jpg", alt: "Veículo de arrombamento" },
  { src: "/images/Meios-Operacionais_Com-Bloqueio-Automoveis-25.jpg", alt: "Bloqueio de automóveis" },
];

function MeiosCarousel() {
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
          {meiosImages.map((image, i) => (
            <div key={i} className="relative h-full min-w-0 shrink-0 grow-0 basis-full">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width:1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-[color:var(--color-navy)]/80 hover:bg-[color:var(--color-navy)] text-[color:var(--color-bone)] p-2 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
        disabled={!canScrollPrev}
        aria-label="Imagem anterior"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-[color:var(--color-navy)]/80 hover:bg-[color:var(--color-navy)] text-[color:var(--color-bone)] p-2 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
        disabled={!canScrollNext}
        aria-label="Próxima imagem"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}

export default function SobreNosPage() {
  return (
    <>
      <Section tone="navy-deep" spacing="lg" className="pt-12 relative">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/Logo_CNRC_Light.png"
            alt="CNRC Logo"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
        <Container size="wide" className="relative z-10">
          <Reveal>
            <p className="eyebrow text-[color:var(--color-gold)]">Sobre Nós</p>
            <h1 className="mt-6 text-[color:var(--color-bone)] max-w-[20ch]">
              Uma sociedade portuguesa com atuação em todo o espaço Schengen.
            </h1>
          </Reveal>
        </Container>
      </Section>

      <Section tone="bone" spacing="lg">
        <Container size="content">
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-8">
              <div className="prose-legal">
                <p className="lead text-xl leading-relaxed text-[color:var(--color-ink)]/85">
                  A <strong>Camacho &amp; Nunes Recuperação de Crédito, Lda. (CNRC)</strong> é uma sociedade comercial especializada em recuperação de crédito, atuando em todo o território nacional, bem como em todo o espaço Schengen. Constituída em {company.founded}, destaca-se pela celeridade, eficácia e honestidade, valores que sustentam a confiança crescente dos nossos clientes e parceiros.
                </p>
              </div>
            </div>
            <div className="lg:col-span-4">
              <div className="relative w-full max-w-[300px] mx-auto aspect-square">
                <Image
                  src="/images/Logo_CNRC.png"
                  alt="CNRC Logo"
                  fill
                  sizes="(min-width:1024px) 300px, 200px"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="bone-soft" spacing="lg">
        <Container size="wide">
          <div className="grid gap-16 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <p className="eyebrow">Estrutura Nacional</p>
              <h2 className="mt-4 rule">Presença em seis localizações estratégicas.</h2>
            </Reveal>
            <div className="lg:col-span-7">
              <p className="text-lg leading-relaxed text-[color:var(--color-ink)]/85 max-w-[56ch]">
                A CNRC dispõe de uma rede de escritórios estrategicamente distribuídos que nos permite atuar com proximidade, rapidez e eficiência:
              </p>
              <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 max-w-lg">
                {company.offices.map((o) => (
                  <li key={o.slug} className="flex items-center gap-3 text-base text-[color:var(--color-navy)]">
                    <span className="h-px w-6 bg-[color:var(--color-gold)]" />
                    {o.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="bone" spacing="lg">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <p className="eyebrow">Recursos e Meios Operacionais</p>
              <h2 className="mt-4 rule">
                Única no país com <span className="text-[color:var(--color-gold-dim)]">autonomia operacional</span> total.
              </h2>
              <div className="mt-10 prose-legal">
                <p>
                  A CNRC é a única sociedade de recuperação de crédito em Portugal Continental e Ilhas, bem como em todo o espaço Schengen com todos os meios humanos e materiais próprios, garantindo total autonomia operacional e capacidade de execução.
                </p>
                <p className="mt-6"><strong>Meios disponíveis:</strong></p>
                <ul>
                  <li>Frota de transportes pesados e ligeiros</li>
                  <li>Oficina móvel equipada para remoção e substituição de fechaduras, desbloqueio e remoção de viaturas e transporte seguro de bens apreendidos</li>
                  <li>Armazéns para depósito de bens até decisão judicial</li>
                  <li>Helicóptero próprio, permitindo deslocações urgentes e resposta imediata quando há risco de ocultação de bens</li>
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
              <p className="eyebrow text-[color:var(--color-gold)]">Atuação Legal e Parcerias</p>
              <h2 className="mt-4 text-[color:var(--color-bone)]">Mandato, segurança, legalidade.</h2>
            </Reveal>
            <div className="lg:col-span-7 text-[color:var(--color-bone)]/85 leading-relaxed space-y-6 max-w-[58ch]">
              <p>
                Todas as diligências da CNRC são realizadas sob mandato e acompanhadas pelas forças de segurança, garantindo o cumprimento rigoroso da lei e a segurança de todos os intervenientes.
              </p>
              <p>A CNRC mantém parcerias estratégicas com:</p>
              <ul className="space-y-2 pl-0">
                <li className="flex gap-3"><span className="mt-3 h-px w-5 bg-[color:var(--color-gold)]" />Agentes de Execução, assegurando rapidez no agendamento e execução das diligências.</li>
                <li className="flex gap-3"><span className="mt-3 h-px w-5 bg-[color:var(--color-gold)]" />Advogados da nossa confiança.</li>
              </ul>
              <p>
                Os clientes podem igualmente recorrer aos seus próprios advogados, enviando posteriormente os elementos necessários para atuação da CNRC.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="bone-soft" spacing="lg">
        <Container size="wide">
          <div className="grid gap-12 md:grid-cols-2">
            <Reveal>
              <p className="eyebrow">Diferenciação</p>
              <h3 className="mt-4">Cumprimento em 4 dias, após despacho judicial.</h3>
              <p className="mt-6 text-[color:var(--color-ink)]/80 leading-relaxed max-w-[48ch]">
                A CNRC destaca-se pela sua capacidade de cumprir decisões judiciais no prazo máximo de 4 dias, após despacho judicial em procedimentos cautelares ou ações executivas sumárias.
              </p>
              <p className="mt-4 text-[color:var(--color-ink)]/80 leading-relaxed max-w-[48ch]">
                O balanço desde {company.founded} é extremamente positivo, com crescimento contínuo da procura e reconhecimento por parte de entidades públicas, incluindo o Ministério Público.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="eyebrow">Missão e Visão</p>
              <h3 className="mt-4">O futuro passa por sociedades especializadas.</h3>
              <p className="mt-6 text-[color:var(--color-ink)]/80 leading-relaxed max-w-[48ch]">
                Acreditamos que o futuro da recuperação de crédito passa por sociedades especializadas como a CNRC, que contribuem para:
              </p>
              <ul className="mt-6 space-y-2 text-[color:var(--color-ink)]/85">
                <li className="flex gap-3"><span className="mt-3 h-px w-5 bg-[color:var(--color-gold)]" />Redução de processos judiciais</li>
                <li className="flex gap-3"><span className="mt-3 h-px w-5 bg-[color:var(--color-gold)]" />Diminuição de custos para credores</li>
                <li className="flex gap-3"><span className="mt-3 h-px w-5 bg-[color:var(--color-gold)]" />Maior eficiência na execução de decisões judiciais</li>
              </ul>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="bone" spacing="lg">
        <Container size="content">
          <Reveal>
            <p className="eyebrow">Convite aos Parceiros</p>
            <h2 className="mt-4 rule">Visitar é compreender.</h2>
            <p className="mt-10 text-lg leading-relaxed text-[color:var(--color-ink)]/85 max-w-[60ch]">
              A CNRC convida V. Exas. a visitar as nossas instalações e conhecer in loco a nossa capacidade operacional. Para agendamento, deverá ser contactado o gerente da CNRC através do número <a href={`tel:${company.phones.mobile.replace(/\s/g, "")}`} className="text-[color:var(--color-navy)] underline decoration-[color:var(--color-gold)] underline-offset-4">{company.phones.mobile}</a>.
            </p>
            <p className="mt-8 font-display italic text-xl md:text-2xl text-[color:var(--color-navy)] max-w-[52ch]">
              &ldquo;Agradecemos a confiança depositada e reiteramos a nossa total disponibilidade para colaborar convosco, assegurando sempre um serviço de excelência.&rdquo;
            </p>
            <div className="mt-10 flex items-end gap-6">
              <div className="flex flex-col items-center w-[200px]">
                <Image
                  src="/images/assinatura-ceo.png"
                  alt="Assinatura Dr. António Nunes"
                  width={200}
                  height={75}
                  className="object-contain opacity-80 mb-2"
                />
                <div className="h-px w-full bg-[color:var(--color-gold)]/40" />
              </div>
              <div>
                <p className="font-display italic text-lg text-[color:var(--color-navy)]">{company.ceo}</p>
                <p className="text-[11px] tracking-[0.2em] uppercase text-[color:var(--color-stone-dark)] mt-1">CEO</p>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <CtaBanner />
    </>
  );
}
