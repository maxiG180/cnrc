import type { Metadata } from "next";
import { company } from "@/content/shared/company-info";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.cnrc.pt";

export function pageMetadata(input: {
  title: string;
  description: string;
  path?: string;
  image?: string;
}): Metadata {
  const url = new URL(input.path ?? "/", SITE_URL).toString();
  const title = `${input.title} | ${company.shortName} Recuperação de Crédito`;

  return {
    title,
    description: input.description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: input.description,
      url,
      siteName: company.legalName,
      type: "website",
      locale: "pt_PT",
      images: input.image ? [{ url: input.image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: input.description,
      images: input.image ? [input.image] : undefined,
    },
  };
}

export const siteUrl = SITE_URL;
