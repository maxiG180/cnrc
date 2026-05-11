import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { pageMetadata } from "@/lib/metadata";
import { LegalPage } from "@/components/shared/legal-page";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("legal.cookies");
  return pageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/politica-de-cookies",
  });
}

export default async function PoliticaCookiesPage() {
  const t = await getTranslations("legal.cookies");
  return (
    <LegalPage title={t("title")} eyebrow={t("eyebrow")}>
      <h2>{t("h1")}</h2>
      <p>{t("p1")}</p>

      <h2>{t("h2")}</h2>
      <h3>{t("h2a")}</h3>
      <p>{t("p2a")}</p>
      <h3>{t("h2b")}</h3>
      <p>{t("p2b")}</p>
      <h3>{t("h2c")}</h3>
      <p>{t("p2c")}</p>
      <h3>{t("h2d")}</h3>
      <p>{t("p2d")}</p>

      <h2>{t("h3")}</h2>
      <p>{t("p3")}</p>

      <h2>{t("h4")}</h2>
      <p>{t("p4")}</p>

      <h2>{t("h5")}</h2>
      <p>{t("p5")}</p>
    </LegalPage>
  );
}
