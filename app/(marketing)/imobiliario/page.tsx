import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { ImobiliarioPageClient } from "@/components/imobiliario/imobiliario-page-client";
import { getAllListings } from "@/lib/mdx";

export const metadata: Metadata = pageMetadata({
  title: "Imobiliário",
  description:
    "Portefólio imobiliário de propriedades recuperadas pela CNRC: apartamentos, moradias, palacetes, herdades, terrenos e empreendimentos únicos em Portugal e no espaço Schengen.",
  path: "/imobiliario",
});

export default function ImobiliarioIndex() {
  const allListings = getAllListings();

  return <ImobiliarioPageClient listings={allListings} />;
}
