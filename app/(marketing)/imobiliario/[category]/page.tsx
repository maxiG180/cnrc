import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/shared/section";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { CtaBanner } from "@/components/shared/cta-banner";
import { ListingsView } from "@/components/imobiliario/listings-view";
import { getListingsByCategory, type Locale } from "@/lib/mdx";
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
  const t = await getTranslations();
  const label = t(cat.labelKey);
  return pageMetadata({
    title: `${label} — ${t("imobiliario.categoryMetaSuffix")}`,
    description: t(cat.descriptionKey),
    path: `/imobiliario/${cat.slug}`,
  });
}

export default async function CategoryPage({ params }: { params: Promise<Params> }) {
  const { category } = await params;
  const cat = getImobiliarioCategory(category);
  if (!cat) notFound();

  const t = await getTranslations();
  const tImo = await getTranslations("imobiliario.category");
  const label = t(cat.labelKey);
  const description = t(cat.descriptionKey);
  const locale = (await getLocale()) as Locale;
  const allListings = getListingsByCategory(category, locale);

  return (
    <>
      <Section tone="navy-deep" spacing="lg" className="pt-12">
        <Container size="wide">
          <div className="text-[color:var(--color-bone)]/80">
            <Breadcrumbs items={[{ label: t("nav.realEstate"), href: "/imobiliario" }, { label }]} />
          </div>
          <Reveal className="mt-8">
            <p className="eyebrow text-[color:var(--color-gold)]">{tImo("label")}</p>
            <h1 className="mt-6 text-[color:var(--color-bone)] max-w-[20ch]">{label}</h1>
            <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-[color:var(--color-bone)]/85">{description}</p>
          </Reveal>
        </Container>
      </Section>

      {allListings.length === 0 ? (
        <Section tone="bone" spacing="lg">
          <Container size="wide">
            <div className="border border-[color:var(--color-stone)]/40 bg-[color:var(--color-bone-soft)] p-12 text-center">
              <p className="eyebrow">{tImo("noListingsEyebrow")}</p>
              <h2 className="mt-4 text-2xl">{tImo("noListingsTitle")}</h2>
              <p className="mt-4 max-w-[52ch] mx-auto text-[color:var(--color-ink)]/75">{tImo("noListingsBody")}</p>
            </div>
          </Container>
        </Section>
      ) : (
        <ListingsView listings={allListings} showCategoryTabs={false} initialCategory={category} />
      )}

      <CtaBanner />
    </>
  );
}
