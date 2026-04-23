import Image from "next/image";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";

export function TrustSection() {
  return (
    <Container size="wide">
      <div className="grid gap-12 lg:grid-cols-12 items-center">
        <Reveal className="lg:col-span-6">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src="/images/12_Lisboa_-Sala-de-Audiencias-1.jpg"
              alt="Sala de reuniões do escritório de Lisboa"
              fill
              sizes="(min-width:1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
        <div className="lg:col-span-6">
          <Reveal>
            <p className="eyebrow">A nossa palavra</p>
            <h2 className="mt-4 rule">
              Conquistamos a sua confiança<br />
              <span className="text-[color:var(--color-gold-dim)]">e somos diligentes no seu caso.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-10 text-lg leading-relaxed text-[color:var(--color-ink)]/85 max-w-[52ch]">
              A força da nossa equipa trabalha todos os dias com um compromisso claro: ganhar a sua confiança através de rigor, dedicação e profissionalismo.
            </p>
            <p className="mt-6 font-display italic text-xl md:text-2xl text-[color:var(--color-navy)] max-w-[42ch]">
              &ldquo;A confiança dos nossos clientes é o nosso maior resultado.&rdquo;
            </p>
          </Reveal>
        </div>
      </div>
    </Container>
  );
}
