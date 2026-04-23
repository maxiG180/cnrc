import { company } from "@/content/shared/company-info";
import { siteUrl } from "./metadata";

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: company.legalName,
    alternateName: company.shortName,
    url: siteUrl,
    email: company.email,
    telephone: company.phones.mobile,
    vatID: `PT${company.nif.replace(/\s+/g, "")}`,
    foundingDate: String(company.founded),
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address.street,
      postalCode: company.address.postal,
      addressLocality: company.address.city,
      addressCountry: "PT",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    areaServed: [
      { "@type": "Country", name: "Portugal" },
      { "@type": "AdministrativeArea", name: "Schengen Area" },
    ],
  };
}

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
