import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getAllNews } from "@/lib/mdx";
import { formatDatePT } from "@/lib/utils";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";

export function NewsTeaser() {
  const allArticles = getAllNews();
  const articles = allArticles.slice(0, 4);
  if (!articles.length) return null;

  return (
    <Container size="wide">
      <div className="flex items-end justify-between gap-6 mb-10 md:mb-16">
        <Reveal>
          <p className="eyebrow">Notícias em Destaque</p>
          <h2 className="mt-4">Informação que orienta decisão.</h2>
        </Reveal>
        <Link
          href="/noticias-em-destaque"
          className="hidden md:inline-flex items-center gap-2 text-sm uppercase tracking-wider text-[color:var(--color-navy)] hover:text-[color:var(--color-gold-dim)] transition-colors"
        >
          Ver todas
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-px bg-[color:var(--color-stone)]/40 border border-[color:var(--color-stone)]/40 md:grid-cols-2">
        {articles.map((a, i) => (
          <Link
            key={a.slug}
            href={`/noticias-em-destaque/${a.slug}`}
            className={`group bg-[color:var(--color-bone)] p-8 md:p-10 hover:bg-[color:var(--color-bone-soft)] transition-colors ${i >= 2 ? 'hidden md:block' : ''}`}
          >
            <p className="text-xs tracking-[0.2em] uppercase text-[color:var(--color-stone-dark)]">
              {formatDatePT(a.frontmatter.date)}
            </p>
            <h3 className="mt-4 text-xl md:text-2xl text-balance group-hover:text-[color:var(--color-gold-dim)] transition-colors">
              {a.frontmatter.title}
            </h3>
            <p className="mt-4 text-sm text-[color:var(--color-ink)]/70 line-clamp-3">{a.frontmatter.excerpt}</p>
            <span className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[color:var(--color-navy)]">
              Ler artigo
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
            {i < 2 && <div aria-hidden="true" />}
          </Link>
        ))}
      </div>

      <Link
        href="/noticias-em-destaque"
        className="mt-8 inline-flex md:hidden items-center gap-2 text-sm uppercase tracking-wider text-[color:var(--color-navy)]"
      >
        Ver todas as notícias <ArrowUpRight className="h-4 w-4" />
      </Link>
    </Container>
  );
}
