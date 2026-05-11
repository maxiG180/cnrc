import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { pageMetadata } from "@/lib/metadata";
import { ImobiliarioPageClient } from "@/components/imobiliario/imobiliario-page-client";
import { getAllListings, type Locale } from "@/lib/mdx";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("imobiliario");
  return pageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/imobiliario",
  });
}

export default async function ImobiliarioIndex() {
  const locale = (await getLocale()) as Locale;
  const allListings = getAllListings(locale);
  return <ImobiliarioPageClient listings={allListings} />;
}
