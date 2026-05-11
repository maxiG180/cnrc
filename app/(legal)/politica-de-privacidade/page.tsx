import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { pageMetadata } from "@/lib/metadata";
import { LegalPage } from "@/components/shared/legal-page";
import { company } from "@/content/shared/company-info";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("legal.privacy");
  return pageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/politica-de-privacidade",
  });
}

export default async function PoliticaPrivacidadePage() {
  const t = await getTranslations("legal.privacy");
  return (
    <LegalPage title={t("title")} eyebrow={t("eyebrow")}>
      <h2>{t("h1")}</h2>
      <p
        dangerouslySetInnerHTML={{
          __html: t("p1", {
            legalName: company.legalName,
            street: company.address.street,
            postal: company.address.postal,
            city: company.address.city,
            nif: company.nif,
            email: company.email,
            phone: company.phones.free,
          }),
        }}
      />

      <h2>{t("h2")}</h2>
      <p>{t("p2")}</p>

      <h2>{t("h3")}</h2>
      <ul>
        <li>{t("li3a")}</li>
        <li>{t("li3b")}</li>
        <li>{t("li3c")}</li>
        <li>{t("li3d")}</li>
      </ul>

      <h2>{t("h4")}</h2>
      <p>{t("p4")}</p>

      <h2>{t("h5")}</h2>
      <p>{t("p5")}</p>

      <h2>{t("h6")}</h2>
      <p>{t("p6")}</p>

      <h2>{t("h7")}</h2>
      <p>{t("p7", { email: company.email })}</p>

      <h2>{t("h8")}</h2>
      <p>{t("p8")}</p>
    </LegalPage>
  );
}
