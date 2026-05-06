import Image from "next/image";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/shared/section";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { HeroVideo } from "@/components/shared/hero-video";
import { ContactForm } from "@/components/forms/contact-form";
import { company } from "@/content/shared/company-info";

export const metadata: Metadata = pageMetadata({
  title: "A Nossa Equipa",
  description:
    "Conheça a equipa multidisciplinar da Camacho & Nunes Recuperação de Crédito: advogados, solicitadores, operacionais e técnicos de peritagem.",
  path: "/a-nossa-equipa",
});

const pillars = [
  {
    number: "01",
    title: "Jurídico",
    description:
      "Advogados e solicitadores com vasta experiência em direito processual civil, insolvência e execuções.",
  },
  {
    number: "02",
    title: "Operacional",
    description:
      "Equipas de terreno treinadas em técnicas de acesso controlado, maneio animal, operação de grua e piloto de helicóptero.",
  },
  {
    number: "03",
    title: "Peritagem e Gestão",
    description:
      "Técnicos de peritagem, gestores de caso e equipa de reporting que garantem a rastreabilidade integral de cada diligência.",
  },
];

export default function EquipaPage() {
  return (
    <>
      {/* Hero */}
      <Section tone="navy-deep" spacing="lg" className="pt-12">
        <Container size="wide">
          <Reveal>
            <p className="eyebrow text-[color:var(--color-gold)]">A Nossa Equipa</p>
            <h1 className="mt-6 text-[color:var(--color-bone)] max-w-[22ch]">
              O nosso sucesso assenta na competência.
            </h1>
            <div className="mt-6 space-y-4 max-w-[60ch]">
              <p className="text-lg leading-relaxed text-[color:var(--color-bone)]/85">
                Uma equipa multidisciplinar, composta por profissionais altamente qualificados, habituados a atuar em contextos sensíveis e de elevada responsabilidade.
              </p>
              <p className="text-base leading-relaxed text-[color:var(--color-bone)]/70">
                Cada membro contribui com experiência, precisão e sentido ético, assegurando que cada processo é tratado com atenção ao detalhe, responsabilidade e respeito pelo que é mais importante para si.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* CEO Feature */}
      <Section tone="bone-soft" spacing="lg">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-20 items-end">
            <Reveal className="lg:col-span-5" delay={0.1}>
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/Quem Somos/Foto-Dr.-Antonio-Nunes-bg-removed.png"
                  alt={`Dr. António Nunes, CEO da ${company.shortName}`}
                  fill
                  sizes="(min-width:1024px) 40vw, 100vw"
                  className="object-cover object-top"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="font-display text-2xl text-[color:var(--color-navy-deep)]">{company.ceo}</p>
                  <p className="text-xs tracking-[0.2em] uppercase text-[color:var(--color-stone-dark)] mt-1">
                    CEO · {company.shortName}
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal className="lg:col-span-7">
              <p className="eyebrow">Liderança</p>
              <h2 className="mt-4 rule">
                O rosto por detrás<br />
                <span className="text-[color:var(--color-gold-dim)]">de cada operação.</span>
              </h2>
              <div className="mt-10 space-y-6 text-[color:var(--color-ink)]/85 leading-relaxed max-w-[56ch]">
                <p>
                  A liderança da CNRC pauta-se pela exigência e pelo compromisso com a excelência. O {company.ceo} garante pessoalmente a supervisão de cada processo, assegurando os mais elevados padrões de rigor e ética profissional.
                </p>
                <p>
                  Com uma visão clara sobre o futuro da recuperação de crédito em Portugal e em toda a Europa Schengen, lidera uma equipa capaz de dar resposta a qualquer desafio, com celeridade e eficácia.
                </p>
              </div>

              <div className="mt-10 flex items-end gap-6">
                <div className="flex flex-col items-center w-[200px]">
                  <Image
                    src="/assinatura-ceo.png"
                    alt="Assinatura Dr. António Nunes"
                    width={200}
                    height={75}
                    className="object-contain opacity-80 mb-2"
                  />
                  <div className="h-px w-full bg-[color:var(--color-gold)]/40" />
                </div>
                <div>
                  <p className="font-display italic text-lg text-[color:var(--color-navy)]">{company.ceo}</p>
                  <p className="text-[11px] tracking-[0.2em] uppercase text-[color:var(--color-stone-dark)] mt-1">CEO · CNRC</p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Three Pillars */}
      <Section tone="bone" spacing="lg">
        <Container size="wide">
          <Reveal>
            <p className="eyebrow">Estrutura Multidisciplinar</p>
            <h2 className="mt-4 rule max-w-[28ch]">Três pilares que sustentam cada resultado.</h2>
          </Reveal>

          <div className="mt-16 grid gap-px bg-[color:var(--color-stone)]/30 border border-[color:var(--color-stone)]/30 md:grid-cols-3">
            {pillars.map((p) => (
              <Reveal key={p.title}>
                <div className="bg-[color:var(--color-bone)] p-10 h-full">
                  <span className="font-display text-6xl text-[color:var(--color-gold)]/25 leading-none select-none">
                    {p.number}
                  </span>
                  <h3 className="mt-4 text-xl">{p.title}</h3>
                  <div className="mt-3 h-px w-8 bg-[color:var(--color-gold)]" />
                  <p className="mt-5 leading-relaxed text-[color:var(--color-ink)]/80">{p.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Contact CTA with video */}
      <Section tone="bone-soft" spacing="lg">
        <Container size="wide">
          <div className="grid gap-16 lg:grid-cols-12">
            <Reveal className="lg:col-span-6">
              <p className="eyebrow">Contacte-nos</p>
              <h2 className="mt-4 text-3xl md:text-4xl text-[color:var(--color-navy)] leading-tight">
                Juntos conseguimos recuperar
              </h2>
              <p className="mt-2 font-display italic text-4xl md:text-5xl text-[color:var(--color-gold-dim)]">
                o seu crédito.
              </p>
              <div className="mt-10 relative aspect-video overflow-hidden">
                <HeroVideo
                  src="https://res.cloudinary.com/dqd3l6zf5/video/upload/v1777239737/Helicoptero_Apreensao-Viatura_pkvwi3.mp4"
                  className="w-full h-full"
                />
              </div>
            </Reveal>

            <Reveal className="lg:col-span-6" delay={0.1}>
              <div className="border border-[color:var(--color-stone)]/40 bg-[color:var(--color-bone)] p-8 md:p-10">
                <p className="eyebrow">Formulário de contacto</p>
                <h3 className="mt-3 text-2xl">Envie-nos uma mensagem.</h3>
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
