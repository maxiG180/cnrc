import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/shared/section";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { CtaBanner } from "@/components/shared/cta-banner";
import { PropertyCard } from "@/components/imobiliario/property-card";
import { getListingsByCategory } from "@/lib/mdx";
import {
  getImobiliarioCategory,
  imobiliarioCategories,
} from "@/content/shared/imobiliario-categories";

type Params = { category: string };

export async function generateStaticParams() {
  return imobiliarioCategories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { category } = await params;
  const cat = getImobiliarioCategory(category);
  if (!cat) return {};
  return pageMetadata({
    title: `${cat.label} — Imobiliário`,
    description: cat.description,
    path: `/imobiliario/${cat.slug}`,
  });
}

export default async function CategoryPage({ params }: { params: Promise<Params> }) {
  const { category } = await params;
  const cat = getImobiliarioCategory(category);
  if (!cat) notFound();

  const listings = getListingsByCategory(category);

  return (
    <>
      <Section tone="navy-deep" spacing="lg" className="pt-12">
        <Container size="wide">
          <div className="text-[color:var(--color-bone)]/80">
            <Breadcrumbs
              items={[{ label: "Imobiliário", href: "/imobiliario" }, { label: cat.label }]}
            />
          </div>
          <Reveal className="mt-8">
            <p className="eyebrow text-[color:var(--color-gold)]">Categoria</p>
            <h1 className="mt-6 text-[color:var(--color-bone)] max-w-[20ch]">{cat.label}</h1>
            <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-[color:var(--color-bone)]/85">
              {cat.description}
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section tone="bone" spacing="lg">
        <Container size="wide">
          {listings.length === 0 ? (
            <div className="border border-[color:var(--color-stone)]/40 bg-[color:var(--color-bone-soft)] p-12 text-center">
              <p className="eyebrow">Em atualização</p>
              <h2 className="mt-4 text-2xl">Sem imóveis publicados nesta categoria.</h2>
              <p className="mt-4 max-w-[52ch] mx-auto text-[color:var(--color-ink)]/75">
                O nosso portefólio é atualizado regularmente. Contacte-nos para conhecer imóveis disponíveis e oportunidades em preparação.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {listings.map((l) => (
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
          )}
        </Container>
      </Section>

      <CtaBanner />
    </>
  );
}
