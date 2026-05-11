import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/shared/container";
import { PropertyCard } from "@/components/imobiliario/property-card";
import { getAllListings, type Locale } from "@/lib/mdx";
import { ArrowRight } from "lucide-react";

export async function ImobiliarioPreview() {
  const t = await getTranslations();
  const locale = (await getLocale()) as Locale;
  const listings = getAllListings(locale).slice(0, 3);

  return (
    <Container size="wide">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="eyebrow text-[color:var(--color-gold)]">{t("home.imobiliarioPreview.eyebrow")}</p>
          <h2 className="mt-2 text-[color:var(--color-navy)]">{t("home.imobiliarioPreview.title")}</h2>
        </div>
        <Link
          href="/imobiliario"
          className="hidden md:inline-flex items-center gap-2 text-[color:var(--color-navy)] hover:text-[color:var(--color-gold)] font-medium transition-colors"
        >
          {t("home.imobiliarioPreview.viewAll")}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {listings.map((listing) => (
          <PropertyCard key={listing.slug} slug={listing.slug} frontmatter={listing.frontmatter} />
        ))}
      </div>

      <div className="mt-8 text-center md:hidden">
        <Link
          href="/imobiliario"
          className="inline-flex items-center gap-2 text-[color:var(--color-navy)] hover:text-[color:var(--color-gold)] font-medium transition-colors"
        >
          {t("home.imobiliarioPreview.viewAllMobile")}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </Container>
  );
}
