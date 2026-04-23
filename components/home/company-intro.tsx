import Image from "next/image";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { company } from "@/content/shared/company-info";

export function CompanyIntro() {
  return (
    <Container size="wide">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-20 items-start">
        <Reveal className="lg:col-span-7">
          <p className="eyebrow">Quem Somos</p>
          <h2 className="mt-4 rule">
            Uma sociedade portuguesa,<br />
            <span className="text-[color:var(--color-gold-dim)]">uma atuação Schengen.</span>
          </h2>

          <div className="mt-10 space-y-6 text-[color:var(--color-ink)]/85 leading-relaxed max-w-[56ch]">
            <p>
              A <strong className="text-[color:var(--color-navy)]">Camacho &amp; Nunes Recuperação de Crédito, Lda. (CNRC)</strong> é uma sociedade comercial especializada em recuperação de crédito, atuando em todo o território nacional e também em Espanha. Constituída em {company.founded}, destaca-se pela celeridade, eficácia e honestidade, valores que sustentam a confiança crescente dos nossos clientes e parceiros.
            </p>
            <p>
              Somos a única sociedade de recuperação de crédito em Portugal Continental e Ilhas, bem como em todo o espaço Schengen, com todos os meios humanos e materiais próprios &mdash; garantindo total autonomia operacional.
            </p>
          </div>

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

        <Reveal className="lg:col-span-5" delay={0.12}>
          <div className="relative aspect-[4/5] overflow-hidden bg-[color:var(--color-navy)]">
            <Image
              src="https://www.cnrc.pt/wp-content/uploads/2026/04/Foto-Dr.-Antonio-Nunes-1-1152x1536.jpeg"
              alt={`Dr. António Nunes, CEO da ${company.shortName}`}
              fill
              sizes="(min-width:1024px) 40vw, 100vw"
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--color-navy-deep)]/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-[color:var(--color-bone)]">
              <p className="font-display text-2xl">{company.ceo}</p>
              <p className="text-xs tracking-[0.2em] uppercase opacity-80 mt-1">CEO · {company.shortName}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </Container>
  );
}
