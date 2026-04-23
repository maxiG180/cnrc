import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/shared/section";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { CtaBanner } from "@/components/shared/cta-banner";
import { getAllNews } from "@/lib/mdx";
import { formatDatePT } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "Notícias em Destaque",
  description:
    "Artigos e análises sobre recuperação de crédito, justiça, economia, legislação e o sector imobiliário em Portugal e no espaço Schengen.",
  path: "/noticias-em-destaque",
});

export default function NoticiasIndex() {
  const articles = getAllNews();
  const [featured, ...rest] = articles;

  return (
    <>
      <Section tone="navy-deep" spacing="lg" className="pt-12">
        <Container size="wide">
          <div className="text-[color:var(--color-bone)]/80">
            <Breadcrumbs items={[{ label: "Notícias em Destaque" }]} />
          </div>
          <Reveal className="mt-8">
            <p className="eyebrow text-[color:var(--color-gold)]">Atualidade</p>
            <h1 className="mt-6 text-[color:var(--color-bone)] max-w-[20ch]">
              Notícias e análises do sector.
            </h1>
            <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-[color:var(--color-bone)]/85">
              Acompanhamos de perto a atualidade económica, jurídica e imobiliária relevante para credores, mandatários e empresas.
            </p>
          </Reveal>
        </Container>
      </Section>

      {featured && (
        <Section tone="bone" spacing="lg">
          <Container size="wide">
            <Link
              href={`/noticias-em-destaque/${featured.slug}`}
              className="group grid gap-10 lg:grid-cols-12"
            >
              <div className="lg:col-span-7 relative aspect-[16/10] overflow-hidden bg-[color:var(--color-stone)]/20">
                {featured.frontmatter.hero && (
                  <Image
                    src={featured.frontmatter.hero}
                    alt={featured.frontmatter.title}
                    fill
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                )}
              </div>
              <div className="lg:col-span-5 flex flex-col justify-center">
                <p className="eyebrow text-[color:var(--color-gold-dim)]">
                  {featured.frontmatter.category ?? "Notícia"} · {formatDatePT(featured.frontmatter.date)}
                </p>
                <h2 className="mt-5 text-3xl md:text-4xl leading-tight group-hover:text-[color:var(--color-gold-dim)] transition-colors">
                  {featured.frontmatter.title}
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-[color:var(--color-ink)]/80">
                  {featured.frontmatter.excerpt}
                </p>
                <span className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[color:var(--color-navy)] group-hover:text-[color:var(--color-gold-dim)]">
                  Ler artigo <ArrowUpRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          </Container>
        </Section>
      )}

      {rest.length > 0 && (
        <Section tone="bone-soft" spacing="lg">
          <Container size="wide">
            <Reveal>
              <p className="eyebrow">Mais artigos</p>
              <h2 className="mt-4">Todas as publicações.</h2>
            </Reveal>

            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((article) => (
                <Link
                  key={article.slug}
                  href={`/noticias-em-destaque/${article.slug}`}
                  className="group block border border-[color:var(--color-stone)]/40 bg-[color:var(--color-bone)] hover:border-[color:var(--color-gold-dim)] transition-colors"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[color:var(--color-stone)]/20">
                    {article.frontmatter.hero && (
                      <Image
                        src={article.frontmatter.hero}
                        alt={article.frontmatter.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="p-6">
                    <p className="eyebrow text-[color:var(--color-stone-dark)]">
                      {article.frontmatter.category ?? "Notícia"} · {formatDatePT(article.frontmatter.date)}
                    </p>
                    <h3 className="mt-3 text-xl leading-tight text-[color:var(--color-navy)]">
                      {article.frontmatter.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-ink)]/75 line-clamp-3">
                      {article.frontmatter.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}

      <CtaBanner />
    </>
  );
}
