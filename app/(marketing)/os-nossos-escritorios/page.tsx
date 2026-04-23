import Image from "next/image";
import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/shared/section";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { CtaBanner } from "@/components/shared/cta-banner";
import { company } from "@/content/shared/company-info";

export const metadata: Metadata = pageMetadata({
  title: "Os Nossos Escritórios",
  description:
    "Rede nacional da CNRC com escritórios em Barreiro, Coimbra, Lisboa, Montijo, Vila Verde e Huelva.",
  path: "/os-nossos-escritorios",
});

export default function EscritoriosPage() {
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
            <p className="eyebrow text-[color:var(--color-gold)]">Os Nossos Escritórios</p>
            <h1 className="mt-6 text-[color:var(--color-bone)] max-w-[20ch]">
              Seis localizações estratégicas.
            </h1>
            <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-[color:var(--color-bone)]/85">
              A nossa rede cobre todo o território continental, as ilhas e o Sul de Espanha, garantindo resposta rápida a qualquer operação no espaço Schengen.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section tone="bone" spacing="lg">
        <Container size="wide">
          <div className="grid gap-px bg-[color:var(--color-stone)]/40 border border-[color:var(--color-stone)]/40 md:grid-cols-2 lg:grid-cols-3">
            {company.offices.map((o) => (
              <div key={o.slug} className="bg-[color:var(--color-bone)] p-8 md:p-10">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-5 w-5 text-[color:var(--color-gold-dim)]" />
                  <div>
                    <p className="eyebrow">Escritório</p>
                    <h3 className="mt-2 text-xl">{o.name}</h3>
                    <p className="mt-4 text-sm text-[color:var(--color-ink)]/75">
                      Galeria fotográfica e informação detalhada em preparação.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBanner />
    </>
  );
}
