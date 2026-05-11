import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { fetchSectorNews, isGNewsConfigured, type GNewsArticle } from "@/lib/gnews";
import { formatDate } from "@/lib/utils";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { getAllNews, type Locale } from "@/lib/mdx";

type SectorArticle = {
  article: GNewsArticle;
  sector: string;
};

export async function NewsTeaser() {
  const t = await getTranslations();
  const locale = (await getLocale()) as Locale;
  let featured: SectorArticle | null = null;
  const sectorArticles: SectorArticle[] = [];
  let useFallback = false;

  if (isGNewsConfigured()) {
    const results = await Promise.all([
      fetchSectorNews("(imobiliário OR habitação OR arrendamento OR construção) AND portugal", t("noticias.sector.topicReal")),
      fetchSectorNews("(crédito OR insolvência OR dívida OR banco) AND portugal", t("noticias.sector.topicCredit")),
      fetchSectorNews("(economia OR tribunal OR inflação OR PIB) AND portugal", t("noticias.sector.topicJustice")),
    ]);

    const allSectorArticles: SectorArticle[] = [];
    for (const result of results) {
      if (result.status === "ok" && result.articles.length > 0) {
        const articlesToTake = result.articles.slice(0, 2);
        for (const article of articlesToTake) {
          allSectorArticles.push({ article, sector: result.label });
        }
      }
    }

    if (allSectorArticles.length > 0) {
      const withImage = allSectorArticles.find((sa) => Boolean(sa.article.image));
      featured = withImage || allSectorArticles[0];

      const remainingArticles = allSectorArticles.filter((sa) => sa.article.url !== featured?.article.url);
      const sectorsUsed = new Set<string>();
      for (const sa of remainingArticles) {
        if (!sectorsUsed.has(sa.sector)) {
          sectorArticles.push(sa);
          sectorsUsed.add(sa.sector);
        }
        if (sectorArticles.length === 3) break;
      }
    } else {
      useFallback = true;
    }
  } else {
    useFallback = true;
  }

  if (useFallback) {
    const fallbackNews = getAllNews(locale).slice(0, 4);
    if (!fallbackNews.length) return null;

    return (
      <Container size="wide">
        <div className="flex items-end justify-between gap-6 mb-10 md:mb-16">
          <Reveal>
            <p className="eyebrow">{t("home.news.eyebrow")}</p>
            <h2 className="mt-4">{t("home.news.title")}</h2>
          </Reveal>
          <Link
            href="/noticias-em-destaque"
            className="hidden md:inline-flex items-center gap-2 text-sm uppercase tracking-wider text-[color:var(--color-navy)] hover:text-[color:var(--color-gold-dim)] transition-colors"
          >
            {t("home.news.viewAll")}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-px bg-[color:var(--color-stone)]/40 border border-[color:var(--color-stone)]/40 md:grid-cols-2">
          {fallbackNews.map((a, i) => (
            <Link
              key={a.slug}
              href={`/noticias-em-destaque/${a.slug}`}
              className={`group bg-[color:var(--color-bone)] p-8 md:p-10 hover:bg-[color:var(--color-bone-soft)] transition-colors ${i >= 2 ? 'hidden md:block' : ''}`}
            >
              <p className="text-xs tracking-[0.2em] uppercase text-[color:var(--color-stone-dark)]">
                {formatDate(a.frontmatter.date, locale)}
              </p>
              <h3 className="mt-4 text-xl md:text-2xl text-balance group-hover:text-[color:var(--color-gold-dim)] transition-colors">
                {a.frontmatter.title}
              </h3>
              <p className="mt-4 text-sm text-[color:var(--color-ink)]/70 line-clamp-3">{a.frontmatter.excerpt}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[color:var(--color-navy)]">
                {t("home.news.readArticle")}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>

        <Link
          href="/noticias-em-destaque"
          className="mt-8 inline-flex md:hidden items-center gap-2 text-sm uppercase tracking-wider text-[color:var(--color-navy)]"
        >
          {t("home.news.viewAllMobile")} <ArrowUpRight className="h-4 w-4" />
        </Link>
      </Container>
    );
  }

  if (!featured) return null;

  return (
    <Container size="wide">
      <div className="flex items-end justify-between gap-6 mb-10 md:mb-16">
        <Reveal>
          <p className="eyebrow">{t("home.news.eyebrow")}</p>
          <h2 className="mt-4">{t("home.news.title")}</h2>
        </Reveal>
        <Link
          href="/noticias-em-destaque"
          className="hidden md:inline-flex items-center gap-2 text-sm uppercase tracking-wider text-[color:var(--color-navy)] hover:text-[color:var(--color-gold-dim)] transition-colors"
        >
          {t("home.news.viewAll")}
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      <a
        href={featured.article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block mb-px border border-[color:var(--color-stone)]/40 overflow-hidden bg-[color:var(--color-bone)] hover:bg-[color:var(--color-bone-soft)] transition-colors"
      >
        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative aspect-[16/10] md:aspect-auto bg-[color:var(--color-stone)]/20 overflow-hidden">
            {featured.article.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={featured.article.image}
                alt={featured.article.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <span className="eyebrow text-[color:var(--color-stone-dark)]">{featured.sector}</span>
              </div>
            )}
          </div>

          <div className="p-8 md:p-10 flex flex-col justify-center">
            <p className="eyebrow text-[color:var(--color-gold-dim)]">
              {featured.sector} · {featured.article.source.name}
            </p>
            <h3 className="mt-4 text-2xl md:text-3xl leading-tight group-hover:text-[color:var(--color-gold-dim)] transition-colors">
              {featured.article.title}
            </h3>
            {featured.article.description && (
              <p className="mt-4 text-[color:var(--color-ink)]/75 leading-relaxed line-clamp-3">
                {featured.article.description}
              </p>
            )}
            <div className="mt-6 flex items-center justify-between gap-4">
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[color:var(--color-navy)] group-hover:text-[color:var(--color-gold-dim)]">
                {t("home.news.readAtSource")}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
              <p className="text-xs text-[color:var(--color-stone-dark)]">
                {formatDate(featured.article.publishedAt, locale)}
              </p>
            </div>
          </div>
        </div>
      </a>

      {sectorArticles.length > 0 && (
        <div className="grid gap-px bg-[color:var(--color-stone)]/40 border-x border-b border-[color:var(--color-stone)]/40 md:grid-cols-3">
          {sectorArticles.map((sa) => (
            <a
              key={sa.article.url}
              href={sa.article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-[color:var(--color-bone)] hover:bg-[color:var(--color-bone-soft)] transition-colors overflow-hidden"
            >
              {sa.article.image && (
                <div className="relative aspect-[16/10] bg-[color:var(--color-stone)]/20 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={sa.article.image}
                    alt={sa.article.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              )}

              <div className="p-6 md:p-8">
                <p className="eyebrow text-[color:var(--color-gold-dim)]">{sa.sector}</p>
                <h4 className="mt-3 text-lg md:text-xl leading-tight text-[color:var(--color-navy)] group-hover:text-[color:var(--color-gold-dim)] transition-colors line-clamp-2">
                  {sa.article.title}
                </h4>
                {sa.article.description && (
                  <p className="mt-3 text-sm text-[color:var(--color-ink)]/70 line-clamp-3">
                    {sa.article.description}
                  </p>
                )}
                <div className="mt-4 flex items-center justify-between gap-4">
                  <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[color:var(--color-navy)] group-hover:text-[color:var(--color-gold-dim)]">
                    {t("home.news.readAtSource")}
                    <ArrowUpRight className="h-3 w-3" />
                  </span>
                  <p className="text-xs text-[color:var(--color-stone-dark)]">
                    {sa.article.source.name}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}

      <Link
        href="/noticias-em-destaque"
        className="mt-8 inline-flex md:hidden items-center gap-2 text-sm uppercase tracking-wider text-[color:var(--color-navy)]"
      >
        {t("home.news.viewAllMobile")} <ArrowUpRight className="h-4 w-4" />
      </Link>
    </Container>
  );
}
