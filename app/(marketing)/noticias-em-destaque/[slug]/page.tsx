import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft } from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/shared/section";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { CtaBanner } from "@/components/shared/cta-banner";
import { getNewsBySlug, getNewsSlugs, getAllNews } from "@/lib/mdx";
import { formatDatePT } from "@/lib/utils";

type Params = { slug: string };

export async function generateStaticParams() {
  return getNewsSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const entry = getNewsBySlug(slug);
    return pageMetadata({
      title: entry.frontmatter.title,
      description: entry.frontmatter.excerpt.slice(0, 160),
      path: `/noticias-em-destaque/${slug}`,
      image: entry.frontmatter.hero,
    });
  } catch {
    return {};
  }
}

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  let entry;
  try {
    entry = getNewsBySlug(slug);
  } catch {
    notFound();
  }
  if (!entry) notFound();

  const { frontmatter, content } = entry;
  const related = getAllNews()
    .filter((a) => a.slug !== slug)
    .slice(0, 3);

  return (
    <>
      <Section tone="navy-deep" spacing="lg" className="pt-12 overflow-hidden">
        {frontmatter.hero && (
          <div className="absolute inset-0">
            <Image
              src={frontmatter.hero}
              alt={frontmatter.title}
              fill
              sizes="100vw"
              priority
              className="object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--color-navy-deep)] via-[color:var(--color-navy-deep)]/80 to-[color:var(--color-navy-deep)]/50" />
          </div>
        )}
        <Container size="content" className="relative z-10">
          <div className="text-[color:var(--color-bone)]/80">
            <Breadcrumbs
              items={[
                { label: "Notícias em Destaque", href: "/noticias-em-destaque" },
                { label: frontmatter.title },
              ]}
            />
          </div>
          <Reveal className="mt-8">
            <p className="eyebrow text-[color:var(--color-gold)]">
              {frontmatter.category ?? "Notícia"} · {formatDatePT(frontmatter.date)}
            </p>
            <h1 className="mt-6 text-[color:var(--color-bone)]">{frontmatter.title}</h1>
            <p className="mt-6 text-lg leading-relaxed text-[color:var(--color-bone)]/85">
              {frontmatter.excerpt}
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section tone="bone" spacing="lg">
        <Container size="content">
          <article className="prose-legal">
            <MDXRemote source={content} />
          </article>

          {frontmatter.tags && frontmatter.tags.length > 0 && (
            <div className="mt-12 flex flex-wrap gap-2">
              {frontmatter.tags.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center rounded-full border border-[color:var(--color-stone)]/60 px-3 py-1 text-xs uppercase tracking-[0.15em] text-[color:var(--color-stone-dark)]"
                >
                  #{t}
                </span>
              ))}
            </div>
          )}

          <div className="mt-12 border-t border-[color:var(--color-stone)]/40 pt-8">
            <Link
              href="/noticias-em-destaque"
              className="inline-flex items-center gap-2 text-sm text-[color:var(--color-navy)] hover:text-[color:var(--color-gold-dim)]"
            >
              <ArrowLeft className="h-4 w-4" /> Voltar a todas as notícias
            </Link>
          </div>
        </Container>
      </Section>

      {related.length > 0 && (
        <Section tone="bone-soft" spacing="lg">
          <Container size="wide">
            <Reveal>
              <p className="eyebrow">Leitura adicional</p>
              <h2 className="mt-4">Artigos relacionados.</h2>
            </Reveal>
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {related.map((article) => (
                <Link
                  key={article.slug}
                  href={`/noticias-em-destaque/${article.slug}`}
                  className="group block border border-[color:var(--color-stone)]/40 bg-[color:var(--color-bone)] p-6 hover:border-[color:var(--color-gold-dim)] transition-colors"
                >
                  <p className="eyebrow text-[color:var(--color-stone-dark)]">
                    {article.frontmatter.category ?? "Notícia"} · {formatDatePT(article.frontmatter.date)}
                  </p>
                  <h3 className="mt-3 text-lg leading-tight text-[color:var(--color-navy)] group-hover:text-[color:var(--color-gold-dim)]">
                    {article.frontmatter.title}
                  </h3>
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
