import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import {
  Landmark,
  Scale,
  Gavel,
  KeyRound,
  FileCheck,
  Camera,
  Building2,
} from "lucide-react";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";

const services = [
  { slug: "execucoes", labelKey: "home.services.executions", descKey: "home.services.executionsDescriptor", Icon: Gavel },
  { slug: "arrestos", labelKey: "home.services.seizures", descKey: "home.services.seizuresDescriptor", Icon: Scale },
  { slug: "insolvencia", labelKey: "home.services.insolvency", descKey: "home.services.insolvencyDescriptor", Icon: Landmark },
  { slug: "arrombamentos", labelKey: "home.services.breakIns", descKey: "home.services.breakInsDescriptor", Icon: KeyRound },
  { slug: "prestacao-de-facto", labelKey: "home.services.factProvision", descKey: "home.services.factProvisionDescriptor", Icon: FileCheck },
  { slug: "peritagem-judicial", labelKey: "home.services.expertise", descKey: "home.services.expertiseDescriptor", Icon: Camera },
  { slug: "imobiliario", labelKey: "home.services.realEstate", descKey: "home.services.realEstateDescriptor", Icon: Building2 },
];

export async function ServicesGrid() {
  const t = await getTranslations();
  return (
    <Container size="wide">
      <Reveal>
        <div className="mb-12 md:mb-16 max-w-3xl">
          <p className="eyebrow">{t("home.services.eyebrow")}</p>
          <h2 className="mt-4">
            {t("home.services.title")}
            <span className="text-[color:var(--color-gold-dim)]"> {t("home.services.highlight")}</span>
          </h2>
        </div>
      </Reveal>

      <div className="grid gap-px bg-[color:var(--color-stone)]/40 border border-[color:var(--color-stone)]/40 md:grid-cols-2 lg:grid-cols-4">
        {services.map(({ slug, labelKey, descKey, Icon }, i) => (
          <Link
            key={slug}
            href={`/areas-de-especializacao#${slug}`}
            className="group relative flex flex-col gap-4 bg-[color:var(--color-bone)] p-8 md:p-10 hover:bg-[color:var(--color-bone-soft)] transition-colors"
          >
            <Icon className="h-7 w-7 text-[color:var(--color-gold-dim)] group-hover:text-[color:var(--color-navy)] transition-colors" strokeWidth={1.25} />
            <div className="flex-1">
              <p className="eyebrow">{t(descKey)}</p>
              <h3 className="mt-2 text-[1.375rem] md:text-2xl group-hover:text-[color:var(--color-gold-dim)] transition-colors">
                {t(labelKey)}
              </h3>
            </div>
            <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[color:var(--color-gold)] group-hover:w-full transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
            <span className="absolute top-8 right-8 text-[0.625rem] tracking-[0.2em] text-[color:var(--color-stone-dark)]">
              {String(i + 1).padStart(2, "0")}
            </span>
          </Link>
        ))}

        <div className="hidden lg:flex items-center justify-center bg-[color:var(--color-bone)] p-8 md:p-10">
          <div className="w-32 h-32 relative">
            <Image src="/Logos/CNRC/Logo_CNRC.png" alt="CNRC" fill className="object-contain" />
          </div>
        </div>
      </div>
    </Container>
  );
}
