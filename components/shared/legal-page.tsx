import type { ReactNode } from "react";
import { Section } from "@/components/shared/section";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";

type LegalPageProps = {
  title: string;
  eyebrow: string;
  updatedAt: string;
  children: ReactNode;
};

export function LegalPage({ title, eyebrow, updatedAt, children }: LegalPageProps) {
  return (
    <>
      <Section tone="navy-deep" spacing="lg" className="pt-12">
        <Container size="content">
          <div className="text-[color:var(--color-bone)]/80">
            <Breadcrumbs items={[{ label: title }]} />
          </div>
          <Reveal className="mt-8">
            <p className="eyebrow text-[color:var(--color-gold)]">{eyebrow}</p>
            <h1 className="mt-6 text-[color:var(--color-bone)]">{title}</h1>
            <p className="mt-6 text-sm text-[color:var(--color-bone)]/70">
              Última atualização: {updatedAt}
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section tone="bone" spacing="lg">
        <Container size="content">
          <article className="prose-legal">{children}</article>
        </Container>
      </Section>
    </>
  );
}
