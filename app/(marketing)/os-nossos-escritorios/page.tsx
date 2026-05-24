import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { pageMetadata } from "@/lib/metadata";
import { CtaBanner } from "@/components/shared/cta-banner";
import { OfficeJourney } from "@/components/offices/office-journey";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("escritorios");
  return pageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/os-nossos-escritorios",
  });
}

export default async function EscritoriosPage() {
  return (
    <>
      {/* Cinematic Office Journey */}
      <OfficeJourney />

      {/* CTA Banner */}
      <CtaBanner />
    </>
  );
}
