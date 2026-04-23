import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/shared/section";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { CtaBanner } from "@/components/shared/cta-banner";
import { PropertyCard } from "@/components/imobiliario/property-card";
import { getAllListings } from "@/lib/mdx";
import { imobiliarioCategories } from "@/content/shared/imobiliario-categories";

export const metadata: Metadata = pageMetadata({
  title: "Imobiliário",
  description:
    "Portefólio imobiliário de propriedades recuperadas pela CNRC: apartamentos, moradias, palacetes, herdades, terrenos e empreendimentos únicos em Portugal e no espaço Schengen.",
  path: "/imobiliario",
});

export default function ImobiliarioIndex() {
  const listings = getAllListings();

  return (
    <>
      <Section tone="navy-deep" spacing="lg" className="pt-12">
        <Container size="wide">
          <div className="text-[color:var(--color-bone)]/80">
            <Breadcrumbs items={[{ label: "Imobiliário" }]} />
          </div>
          <Reveal className="mt-8">
            <p className="eyebrow text-[color:var(--color-gold)]">Portefólio</p>
            <h1 className="mt-6 text-[color:var(--color-bone)] max-w-[18ch]">
              Imóveis selecionados do nosso portefólio.
            </h1>
            <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-[color:var(--color-bone)]/85">
              Propriedades recuperadas e disponibilizadas ao mercado em categorias distintas, desde apartamentos urbanos a palacetes históricos, passando por herdades, moradias, terrenos e empreendimentos únicos.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section tone="bone" spacing="lg">
        <Container size="wide">
          <Reveal>
            <p className="eyebrow">Categorias</p>
            <h2 className="mt-4">Explore por tipologia.</h2>
          </Reveal>

          <div className="mt-12 grid gap-px bg-[color:var(--color-stone)]/40 border border-[color:var(--color-stone)]/40 md:grid-cols-2 lg:grid-cols-4">
            {imobiliarioCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/imobiliario/${cat.slug}`}
                className="group flex flex-col justify-between gap-6 bg-[color:var(--color-bone)] p-8 hover:bg-[color:var(--color-bone-soft)] transition-colors"
              >
                <div>
                  <p className="eyebrow text-[color:var(--color-stone-dark)]">Categoria</p>
                  <h3 className="mt-3 text-xl text-[color:var(--color-navy)]">{cat.label}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-ink)]/75">
                    {cat.description}
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[color:var(--color-gold-dim)] group-hover:text-[color:var(--color-navy)]">
                  Ver imóveis <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {listings.length > 0 && (
        <Section tone="bone-soft" spacing="lg">
          <Container size="wide">
            <Reveal>
              <p className="eyebrow">Destaques</p>
              <h2 className="mt-4">Em evidência.</h2>
            </Reveal>

            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {listings.slice(0, 6).map((l) => (
                <PropertyCard
                  key={l.slug}
                  slug={l.slug}
                  title={l.frontmatter.title}
                  category={l.frontmatter.category}
                  location={l.frontmatter.location}
                  hero={l.frontmatter.hero}
                  price={l.frontmatter.price}
                  summary={l.frontmatter.summary}
                />
              ))}
            </div>
          </Container>
        </Section>
      )}

      <CtaBanner />
    </>
  );
}
