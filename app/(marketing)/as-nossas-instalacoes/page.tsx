import Image from "next/image";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/shared/section";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { VideoPlayer } from "@/components/shared/video-player";
import { CtaBanner } from "@/components/shared/cta-banner";

export const metadata: Metadata = pageMetadata({
  title: "As Nossas Instalações",
  description:
    "Complexo da CNRC em Pinhal Novo: heliporto, armazém de bens apreendidos, viveiros para animais vivos e parque de viaturas.",
  path: "/as-nossas-instalacoes",
});

export default function InstalacoesPage() {
  return (
    <>
      {/* Hero */}
      <Section tone="navy-deep" spacing="lg" className="pt-12">
        <Container size="wide">
          <Reveal>
            <p className="eyebrow text-[color:var(--color-gold)]">As Nossas Instalações</p>
            <h1 className="mt-6 text-[color:var(--color-bone)] max-w-[22ch]">
              Instalações concebidas para a excelência operacional.
            </h1>
            <div className="mt-6 space-y-4 max-w-[62ch]">
              <p className="text-lg leading-relaxed text-[color:var(--color-bone)]/85">
                As nossas instalações, localizadas no Pinhal Novo, foram concebidas para garantir todas as condições necessárias ao pleno funcionamento dos meios operacionais da Camacho &amp; Nunes. Dispomos de espaços amplos, modernos e totalmente equipados, preparados para responder às exigências de autonomia, eficiência e complexidade técnica dos nossos equipamentos e equipas.
              </p>
              <p className="text-base leading-relaxed text-[color:var(--color-bone)]/70">
                As nossas infraestruturas refletem o compromisso da Camacho &amp; Nunes com a qualidade, a conformidade e a excelência operacional.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Heliporto */}
      <Section tone="bone" spacing="lg">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-center">
            <Reveal className="lg:col-span-7">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/instalacoes/helipad.png"
                  alt="Heliporto CNRC em Pinhal Novo"
                  fill
                  sizes="(min-width:1024px) 58vw, 100vw"
                  className="object-cover"
                  priority
                />
              </div>
            </Reveal>

            <Reveal className="lg:col-span-5" delay={0.1}>
              <p className="eyebrow">Heliporto</p>
              <h2 className="mt-4 rule">
                Resposta imediata,<br />
                <span className="text-[color:var(--color-gold-dim)]">em qualquer ponto do país.</span>
              </h2>
              <p className="mt-8 leading-relaxed text-[color:var(--color-ink)]/80 max-w-[44ch]">
                Estrutura certificada para operação regular do helicóptero próprio da CNRC, com área de manutenção e abastecimento. Permite deslocações urgentes e resposta imediata sempre que há risco de ocultação de bens.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Viveiros — images */}
      <Section tone="bone-soft" spacing="lg" className="!pb-0">
        <Container size="wide">
          <Reveal>
            <p className="eyebrow">Viveiros de Acolhimento Animal</p>
            <h2 className="mt-4 rule max-w-[32ch]">
              Cuidado certificado para cada espécie apreendida.
            </h2>
            <p className="mt-6 max-w-[60ch] leading-relaxed text-[color:var(--color-ink)]/80">
              Além das áreas dedicadas às operações, contamos com instalações específicas para o depósito e guarda de animais apreendidos. Estes espaços asseguram todas as condições de acolhimento, segurança e bem-estar, cumprindo rigorosamente o normativo legal aplicável.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-3 sm:grid-cols-2">
            <Reveal>
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/instalacoes/viveiro-close-up.png"
                  alt="Interior dos viveiros CNRC"
                  fill
                  sizes="(min-width:640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/instalacoes/viveiros-passaros.jpg"
                  alt="Pássaros nos viveiros CNRC"
                  fill
                  sizes="(min-width:640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Viveiros — video */}
      <Section tone="bone-soft" spacing="lg" className="!pt-0">
        <Container size="wide">
          <Reveal>
            <VideoPlayer
              src="https://res.cloudinary.com/dqd3l6zf5/video/upload/v1778104702/Viveiros-passaros_video_pv2frh.mp4"
              title="Viveiros de pássaros CNRC"
            />
          </Reveal>
        </Container>
      </Section>

      {/* Other facilities */}
      <Section tone="bone" spacing="lg">
        <Container size="wide">
          <Reveal>
            <p className="eyebrow">Infraestrutura Complementar</p>
            <h2 className="mt-4 rule max-w-[30ch]">Tudo o que é necessário, sob o mesmo teto.</h2>
          </Reveal>

          <div className="mt-12 grid gap-px bg-[color:var(--color-stone)]/30 border border-[color:var(--color-stone)]/30 md:grid-cols-2">
            <Reveal>
              <div className="bg-[color:var(--color-bone)] p-10 h-full">
                <p className="eyebrow">Armazém</p>
                <h3 className="mt-3 text-xl">Bens Apreendidos</h3>
                <div className="mt-3 h-px w-8 bg-[color:var(--color-gold)]" />
                <p className="mt-5 leading-relaxed text-[color:var(--color-ink)]/80">
                  Instalação segura, videovigiada e com controlo de acessos, para guarda de bens móveis apreendidos até decisão judicial. Capacidade para receber viaturas, equipamentos industriais e outros bens de grande dimensão.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="bg-[color:var(--color-bone)] p-10 h-full">
                <p className="eyebrow">Frota</p>
                <h3 className="mt-3 text-xl">Parque de Viaturas Operacionais</h3>
                <div className="mt-3 h-px w-8 bg-[color:var(--color-gold)]" />
                <p className="mt-5 leading-relaxed text-[color:var(--color-ink)]/80">
                  Frota própria completa: veículos especiais de arrombamento, reboques, gruas, empilhadores e cozinha móvel. Todos os meios são próprios, garantindo total autonomia operacional sem dependência de terceiros.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <CtaBanner />
    </>
  );
}
