import Link from "next/link";
import Image from "next/image";
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
  { slug: "execucoes", label: "Execuções", descriptor: "Processo Executivo", Icon: Gavel },
  { slug: "arrestos", label: "Arrestos", descriptor: "Medida Cautelar", Icon: Scale },
  { slug: "insolvencia", label: "Insolvência", descriptor: "Processo Judicial", Icon: Landmark },
  { slug: "arrombamentos", label: "Arrombamentos", descriptor: "Diligência Judicial", Icon: KeyRound },
  { slug: "prestacao-de-facto", label: "Prestação de Facto", descriptor: "Cumprimento Coercivo", Icon: FileCheck },
  { slug: "peritagem-judicial", label: "Peritagem Judicial", descriptor: "Avaliação Técnica", Icon: Camera },
  { slug: "imobiliario", label: "Imobiliário", descriptor: "Gestão de Ativos", Icon: Building2 },
];

export function ServicesGrid() {
  return (
    <Container size="wide">
      <Reveal>
        <div className="mb-12 md:mb-16 max-w-3xl">
          <p className="eyebrow">Áreas de Especialização</p>
          <h2 className="mt-4">
            Sete frentes, uma só exigência:
            <span className="text-[color:var(--color-gold-dim)]"> rigor.</span>
          </h2>
        </div>
      </Reveal>

      <div className="grid gap-px bg-[color:var(--color-stone)]/40 border border-[color:var(--color-stone)]/40 md:grid-cols-2 lg:grid-cols-4">
        {services.map(({ slug, label, descriptor, Icon }, i) => (
          <Link
            key={slug}
            href={`/areas-de-especializacao#${slug}`}
            className="group relative flex flex-col gap-4 bg-[color:var(--color-bone)] p-8 md:p-10 hover:bg-[color:var(--color-bone-soft)] transition-colors"
          >
            <Icon className="h-7 w-7 text-[color:var(--color-gold-dim)] group-hover:text-[color:var(--color-navy)] transition-colors" strokeWidth={1.25} />
            <div className="flex-1">
              <p className="eyebrow">{descriptor}</p>
              <h3 className="mt-2 text-[1.375rem] md:text-2xl group-hover:text-[color:var(--color-gold-dim)] transition-colors">
                {label}
              </h3>
            </div>
            <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[color:var(--color-gold)] group-hover:w-full transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
            <span className="absolute top-8 right-8 text-[0.625rem] tracking-[0.2em] text-[color:var(--color-stone-dark)]">
              {String(i + 1).padStart(2, "0")}
            </span>
          </Link>
        ))}

        {/* Logo block - only visible on desktop */}
        <div className="hidden lg:flex items-center justify-center bg-[color:var(--color-bone)] p-8 md:p-10">
          <div className="w-32 h-32 relative">
            <Image
              src="/images/Logo_CNRC.png"
              alt="CNRC"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </Container>
  );
}
