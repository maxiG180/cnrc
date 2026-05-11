import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { MapPin, Tag } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/shared/section";
import { Container } from "@/components/shared/container";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { PropertyHero } from "@/components/imobiliario/property-hero";
import { SpecsGrid } from "@/components/imobiliario/specs-grid";
import { PropertyMap } from "@/components/imobiliario/property-map";
import { PropertyCard } from "@/components/imobiliario/property-card";
import { getListingBySlug, getAllListings, type Locale } from "@/lib/mdx";
import { getImobiliarioCategory } from "@/content/shared/imobiliario-categories";

type Params = { category: string; slug: string };

export async function generateStaticParams() {
  return getAllListings("pt").map((l) => ({ category: l.frontmatter.category, slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const locale = (await getLocale()) as Locale;
  const entry = getListingBySlug(slug, locale);
  if (!entry) return {};

  return pageMetadata({
    title: entry.frontmatter.title,
    description: entry.frontmatter.metaDescription || entry.frontmatter.summary || entry.frontmatter.title,
    path: `/imobiliario/${entry.frontmatter.category}/${slug}`,
    image: entry.frontmatter.hero,
  });
}

export default async function ListingPage({ params }: { params: Promise<Params> }) {
  const { category, slug } = await params;
  const locale = (await getLocale()) as Locale;
  const entry = getListingBySlug(slug, locale);
  if (!entry || entry.frontmatter.category !== category) notFound();

  const t = await getTranslations();
  const tDetail = await getTranslations("imobiliario.detail");

  const { frontmatter, content } = entry;
  const cat = getImobiliarioCategory(frontmatter.category);
  const catLabel = cat ? t(cat.labelKey) : frontmatter.category;

  const relatedListings = getAllListings(locale)
    .filter((l) => l.frontmatter.category === frontmatter.category && l.slug !== slug)
    .slice(0, 3);

  return (
    <>
      <Section tone="bone" spacing="sm" className="!pb-0 !pt-0">
        <Container size="wide">
          <PropertyHero frontmatter={frontmatter} />
        </Container>
      </Section>

      <Section tone="bone" spacing="md" className="!pt-8">
        <Container size="wide">
          <Breadcrumbs
            items={[
              { label: t("nav.realEstate"), href: "/imobiliario" },
              { label: catLabel, href: `/imobiliario/${frontmatter.category}` },
              { label: frontmatter.title },
            ]}
          />

          <div className="mt-8 grid lg:grid-cols-[1fr_380px] gap-12">
            <div>
              <div>
                <p className="eyebrow text-[color:var(--color-gold)]">{cat ? catLabel : tDetail("propertyFallback")}</p>
                <h1 className="mt-3 text-[color:var(--color-navy)]">{frontmatter.title}</h1>
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[color:var(--color-ink)]/70">
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="h-4 w-4" /> {frontmatter.location}
                  </span>
                  {frontmatter.price && (
                    <span className="inline-flex items-center gap-2 font-semibold text-[color:var(--color-navy)]">
                      <Tag className="h-4 w-4" /> {frontmatter.price}
                    </span>
                  )}
                </div>
              </div>

              {frontmatter.summary && (
                <p className="mt-6 text-lg leading-relaxed text-[color:var(--color-ink)]/80">{frontmatter.summary}</p>
              )}
            </div>

            <div className="lg:sticky lg:top-6 self-start">
              <div className="p-8 bg-[color:var(--color-navy-deep)] text-[color:var(--color-bone)]">
                <h3 className="text-xl font-display text-white">{tDetail("interested")}</h3>
                <p className="mt-3 text-sm leading-relaxed opacity-85">{tDetail("interestedBody")}</p>
                <a
                  href="/contactos"
                  className="mt-6 block w-full py-3 bg-[color:var(--color-gold)] text-[color:var(--color-navy)] text-center font-medium hover:bg-[color:var(--color-gold-bright)] transition-colors"
                >
                  {tDetail("contact")}
                </a>
                <a
                  href="tel:+351210000000"
                  className="mt-3 block w-full py-3 border border-[color:var(--color-bone)]/30 text-center text-sm hover:bg-[color:var(--color-bone)]/5 transition-colors"
                >
                  210 000 000
                </a>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="bone-soft" spacing="lg">
        <Container size="wide">
          <div className="grid lg:grid-cols-[1fr_380px] gap-12">
            <SpecsGrid frontmatter={frontmatter} />
          </div>
        </Container>
      </Section>

      <Section tone="bone" spacing="lg">
        <Container size="content">
          <article className="prose-legal">
            <MDXRemote source={content} />
          </article>
        </Container>
      </Section>

      {frontmatter.coordinates && (
        <Section tone="bone-soft" spacing="lg">
          <Container size="wide">
            <PropertyMap frontmatter={frontmatter} />
          </Container>
        </Section>
      )}

      {relatedListings.length > 0 && (
        <Section tone="bone" spacing="lg">
          <Container size="wide">
            <div>
              <p className="eyebrow">{tDetail("alsoMayInterest")}</p>
              <h2 className="mt-4">{tDetail("othersTitle", { category: catLabel.toLowerCase() })}</h2>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {relatedListings.map((listing) => (
                <PropertyCard key={listing.slug} slug={listing.slug} frontmatter={listing.frontmatter} />
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}
