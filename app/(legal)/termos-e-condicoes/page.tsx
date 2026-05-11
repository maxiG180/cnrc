import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { pageMetadata } from "@/lib/metadata";
import { LegalPage } from "@/components/shared/legal-page";
import { company } from "@/content/shared/company-info";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("legal.terms");
  return pageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/termos-e-condicoes",
  });
}

export default async function TermosPage() {
  const t = await getTranslations("legal.terms");
  return (
    <LegalPage title={t("title")} eyebrow={t("eyebrow")}>
      <h2>{t("h1")}</h2>
      <p
        dangerouslySetInnerHTML={{
          __html: t("p1", {
            legalName: company.legalName,
            nif: company.nif,
            street: company.address.street,
            postal: company.address.postal,
            city: company.address.city,
          }),
        }}
      />

      <h2>{t("h2")}</h2>
      <p>{t("p2", { legalName: company.legalName })}</p>

      <h2>{t("h3")}</h2>
      <p>{t("p3", { shortName: company.shortName })}</p>

      <h2>{t("h4")}</h2>
      <p>{t("p4", { shortName: company.shortName })}</p>

      <h2>{t("h5")}</h2>
      <p>{t("p5")}</p>

      <h2>{t("h6")}</h2>
      <p>{t("p6")}</p>

      <h2>{t("h7")}</h2>
      <p>{t("p7")}</p>
    </LegalPage>
  );
}
