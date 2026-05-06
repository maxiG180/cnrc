import Link from "next/link";
import { AlertCircle, ArrowUpRight, Clock } from "lucide-react";
import { Section } from "@/components/shared/section";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { getAllNews } from "@/lib/mdx";
import {
  fetchSectorNews,
  isGNewsConfigured,
  type GNewsArticle,
  type SectorNewsResult,
} from "@/lib/gnews";
import { formatDatePT } from "@/lib/utils";

type TopicConfig = {
  query: string;
  label: string;
  keywords: string[];
};

const TOPICS: TopicConfig[] = [
  {
    label: "Mercado Imobiliário",
    query: "(imobiliário OR habitação OR arrendamento OR construção) AND portugal",
    keywords: [
      "imobiliario",
      "habitacao",
      "arrendamento",
      "preco",
      "moradia",
      "apartamento",
      "casa",
      "construcao",
      "imobiliaria",
      "credito habitacao",
      "euribor",
      "propriedade",
      "renda",
    ],
  },
  {
    label: "Crédito & Insolvências",
    query: "(crédito OR insolvência OR dívida OR banco) AND portugal",
    keywords: [
      "credito",
      "insolvencia",
      "falencia",
      "divida",
      "devedor",
      "cobranca",
      "recuperacao",
      "reestruturacao",
      "npl",
      "incumprimento",
      "banco",
      "emprestimo",
      "financiamento",
    ],
  },
  {
    label: "Justiça & Economia",
    query: "(economia OR tribunal OR inflação OR PIB) AND portugal",
    keywords: [
      "economia",
      "tribunal",
      "justica",
      "penhora",
      "executivo",
      "inflacao",
      "banco de portugal",
      "pib",
      "crescimento",
      "lei",
      "legislacao",
      "governo",
      "investimento",
    ],
  },
];

export async function SectorNews() {
  const fallbackNews = getAllNews().slice(0, 6);

  if (!isGNewsConfigured()) {
    if (!fallbackNews.length) return null;

    return (
      <Section tone="bone-soft" spacing="lg">
        <Container size="wide">
          <Reveal>
            <p className="eyebrow">Atualidade do Setor</p>
            <h2 className="mt-4">Manchetes por tópico.</h2>
            <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-[color:var(--color-ink)]/75">
              Notícias selecionadas de fontes portuguesas sobre imobiliário, recuperação de crédito e execuções judiciais relevantes para
              credores, empresas e investidores.
            </p>
          </Reveal>
          <LocalFallbackNews articles={fallbackNews} noticeState="missing_key" />
        </Container>
      </Section>
    );
  }

  const fetchedResults = await Promise.all(
    TOPICS.map((t) => fetchSectorNews(t.query, t.label)),
  );

  const results = fetchedResults.map((result, index) =>
    filterByTopicKeywords(result, TOPICS[index].keywords),
  );

  const featured = pickFeatured(results);
  const allFailed = results.every((r) => r.status !== "ok");
  const globalState = allFailed ? deriveGlobalState(results) : null;
  const showFallbackNews = allFailed && fallbackNews.length > 0;

  return (
    <>
      {featured && <FeaturedArticle article={featured.article} category={featured.category} />}

      <Section tone="bone-soft" spacing="lg">
        <Container size="wide">
          <Reveal>
            <p className="eyebrow">Atualidade do Setor</p>
            <h2 className="mt-4">Manchetes por tópico.</h2>
            <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-[color:var(--color-ink)]/75">
              Notícias selecionadas de fontes portuguesas sobre imobiliário, recuperação de crédito e execuções judiciais relevantes para
              credores, empresas e investidores.
            </p>
          </Reveal>

          {globalState && !showFallbackNews ? (
            <GlobalNotice state={globalState} />
          ) : showFallbackNews ? (
            <LocalFallbackNews articles={fallbackNews} noticeState={globalState} />
          ) : (
            <div className="mt-14 space-y-16">
              {results.map((result) => (
                <TopicBlock
                  key={result.label}
                  result={result}
                  excludeUrl={featured?.article.url}
                />
              ))}
            </div>
          )}

          <p className="mt-16 text-xs text-[color:var(--color-ink)]/55 max-w-[70ch]">
            {showFallbackNews
              ? "A listagem acima usa conteúdo editorial da CNRC enquanto a fonte externa está indisponível."
              : "Notícias agregadas automaticamente via GNews, com cache horária. Os conteúdos pertencem aos respetivos editores e nãorefletem necessariamente a posição da CNRC."}
          </p>
        </Container>
      </Section>
    </>
  );
}

function filterByTopicKeywords(
  result: SectorNewsResult,
  keywords: string[],
): SectorNewsResult {
  if (result.status !== "ok") return result;

  const filtered = result.articles
    .filter((article) => isRelevantToTopic(article, keywords))
    .slice(0, 10); // Get 10 articles (1 for featured + 9 for grid)

  if (filtered.length === 0) {
    return { status: "empty", label: result.label };
  }

  return { ...result, articles: filtered };
}

function isRelevantToTopic(article: GNewsArticle, keywords: string[]) {
  const titleNormalized = normalizeText(article.title);
  const descNormalized = normalizeText(article.description ?? "");
  const haystack = `${titleNormalized} ${descNormalized}`;

  // Reject clear entertainment/celebrity patterns (more selective)
  const irrelevantPatterns = [
    "met gala",
    "passadeira vermelha",
    "vestido de gala",
    "desfile de moda",
    "semana da moda",
    "festival de cinema",
    "oscar",
    "Grammy",
  ];

  if (irrelevantPatterns.some((pattern) => haystack.includes(normalizeText(pattern)))) {
    return false;
  }

  // Require at least one keyword match
  return keywords.some((keyword) => haystack.includes(normalizeText(keyword)));
}

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

type LocalNewsArticle = ReturnType<typeof getAllNews>[number];
type GlobalState = "rate_limited" | "unauthorized" | "empty" | "error";

function LocalFallbackNews({
  articles,
  noticeState,
}: {
  articles: LocalNewsArticle[];
  noticeState: GlobalState | "missing_key" | null;
}) {
  const messages: Record<Exclude<typeof noticeState, null>, string> = {
    missing_key: "A API GNews não está configurada no ambiente. A mostrar notícias editoriais da CNRC.",
    rate_limited: "A API GNews atingiu o limite diário de pedidos. A mostrar notícias editoriais da CNRC.",
    unauthorized: "A API GNews rejeitou a chave configurada. A mostrar notícias editoriais da CNRC.",
    empty: "A API GNews não devolveu notícias recentes para estes tópicos. A mostrar notícias editoriais da CNRC.",
    error: "A API GNews está temporariamente indisponível. A mostrar notícias editoriais da CNRC.",
  };

  return (
    <div className="mt-14">
      {noticeState && (
        <div className="flex items-center gap-3 border border-[color:var(--color-stone)]/40 bg-[color:var(--color-bone)] px-6 py-5 text-sm 
text-[color:var(--color-ink)]/70">
          <AlertCircle className="h-4 w-4 shrink-0 text-[color:var(--color-gold-dim)]" />
          <span>{messages[noticeState]}</span>
        </div>
      )}
      <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/noticias-em-destaque/${article.slug}`}
            className="group block border border-[color:var(--color-stone)]/40 bg-[color:var(--color-bone)] p-6 
hover:border-[color:var(--color-gold-dim)] transition-colors"
          >
            <p className="eyebrow text-[color:var(--color-stone-dark)]">
              {article.frontmatter.category ?? "Notícia"} · {formatDatePT(article.frontmatter.date)}
            </p>
            <h3 className="mt-3 text-xl leading-tight text-[color:var(--color-navy)] group-hover:text-[color:var(--color-gold-dim)] 
transition-colors">
              {article.frontmatter.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-ink)]/75 line-clamp-3">
              {article.frontmatter.excerpt}
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[color:var(--color-navy)] 
group-hover:text-[color:var(--color-gold-dim)]">
              Ler artigo <ArrowUpRight className="h-3 w-3" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function pickFeatured(
  results: SectorNewsResult[],
): { article: GNewsArticle; category: string } | null {
  for (const r of results) {
    if (r.status !== "ok") continue;
    const withImage = r.articles.find((a) => Boolean(a.image));
    if (withImage) return { article: withImage, category: r.label };
  }
  for (const r of results) {
    if (r.status !== "ok") continue;
    if (r.articles[0]) return { article: r.articles[0], category: r.label };
  }
  return null;
}

function FeaturedArticle({
  article,
  category,
}: {
  article: GNewsArticle;
  category: string;
}) {
  return (
    <Section tone="bone" spacing="lg">
      <Container size="wide">
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group grid gap-10 lg:grid-cols-12"
        >
          <div className="lg:col-span-7 relative aspect-[16/10] overflow-hidden bg-[color:var(--color-stone)]/20">
            {article.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={article.image}
                alt={article.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <span className="eyebrow text-[color:var(--color-stone-dark)]">{category}</span>
              </div>
            )}
          </div>
          <div className="lg:col-span-5 flex flex-col justify-center">
            <p className="eyebrow text-[color:var(--color-gold-dim)]">
              {category} · {article.source.name} · {formatDatePT(article.publishedAt)}
            </p>
            <h2 className="mt-5 text-3xl md:text-4xl leading-tight group-hover:text-[color:var(--color-gold-dim)] transition-colors">
              {article.title}
            </h2>
            {article.description && (
              <p className="mt-5 text-lg leading-relaxed text-[color:var(--color-ink)]/80 line-clamp-4">
                {article.description}
              </p>
            )}
            <span className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[color:var(--color-navy)] 
group-hover:text-[color:var(--color-gold-dim)]">
              Ler na fonte <ArrowUpRight className="h-3 w-3" />
            </span>
          </div>
        </a>
      </Container>
    </Section>
  );
}

function deriveGlobalState(results: SectorNewsResult[]): GlobalState {
  if (results.some((r) => r.status === "rate_limited")) return "rate_limited";
  if (results.some((r) => r.status === "unauthorized")) return "unauthorized";
  if (results.every((r) => r.status === "empty")) return "empty";
  return "error";
}

function GlobalNotice({ state }: { state: GlobalState }) {
  const Icon = state === "rate_limited" ? Clock : AlertCircle;
  const messages: Record<GlobalState, { title: string; body: string }> = {
    rate_limited: {
      title: "Limite diário de pedidos atingido.",
      body: "O feed de notícias externas voltará a estar disponível dentro de algumas horas.",
    },
    unauthorized: {
      title: "Serviço de notícias indisponível.",
      body: "Há um problema de configuração com a fonte externa. A nossa equipa foi notificada.",
    },
    empty: {
      title: "Sem notícias recentes.",
      body: "Não foi possível encontrar manchetes nas últimas horas para os tópicos selecionados. Volte mais tarde.",
    },
    error: {
      title: "Não foi possível carregar as notícias.",
      body: "Ocorreu um erro ao contactar a fonte externa. Tente atualizar a página dentro de alguns minutos.",
    },
  };
  const msg = messages[state];
  return (
    <div className="mt-14 border border-[color:var(--color-stone)]/40 bg-[color:var(--color-bone)] p-8 md:p-10 flex gap-5">
      <Icon className="h-6 w-6 shrink-0 text-[color:var(--color-gold-dim)] mt-1" />
      <div>
        <h3 className="text-xl text-[color:var(--color-navy)]">{msg.title}</h3>
        <p className="mt-3 text-[color:var(--color-ink)]/75 leading-relaxed max-w-[60ch]">
          {msg.body}
        </p>
      </div>
    </div>
  );
}

function TopicBlock({
  result,
  excludeUrl,
}: {
  result: SectorNewsResult;
  excludeUrl?: string;
}) {
  const articles =
    result.status === "ok"
      ? result.articles.filter((a) => a.url !== excludeUrl).slice(0, 9)
      : [];

  return (
    <div>
      <div className="flex items-baseline justify-between border-b border-[color:var(--color-stone)]/40 pb-4 gap-4 flex-wrap">
        <h3 className="text-2xl text-[color:var(--color-navy)]">{result.label}</h3>
        {result.status === "ok" && articles.length > 0 && (
          <span className="eyebrow text-[color:var(--color-stone-dark)]">
            {articles.length} {articles.length === 1 ? "artigo" : "artigos"}
          </span>
        )}
      </div>

      {result.status === "ok" && articles.length > 0 ? (
        <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <SectorNewsCard key={article.url} article={article} category={result.label} />
          ))}
        </div>
      ) : (
        <TopicNotice
          status={
            result.status === "ok" ? "empty" : result.status
          }
        />
      )}
    </div>
  );
}

function TopicNotice({
  status,
}: {
  status: "empty" | "rate_limited" | "unauthorized" | "error";
}) {
  const messages: Record<typeof status, string> = {
    empty: "Sem manchetes recentes para este tópico. Volte a consultar mais tarde.",
    rate_limited: "Limite de pedidos atingido neste tópico. Tente novamente mais tarde.",
    unauthorized: "Tópico temporariamente indisponível.",
    error: "Não foi possível carregar este tópico de momento.",
  };
  return (
    <div className="mt-8 flex items-center gap-3 text-sm text-[color:var(--color-ink)]/65 border border-dashed 
border-[color:var(--color-stone)]/40 px-6 py-5">
      <AlertCircle className="h-4 w-4 text-[color:var(--color-stone-dark)]" />
      <span>{messages[status]}</span>
    </div>
  );
}

function SectorNewsCard({
  article,
  category,
}: {
  article: GNewsArticle;
  category: string;
}) {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block border border-[color:var(--color-stone)]/40 bg-[color:var(--color-bone)] 
hover:border-[color:var(--color-gold-dim)] transition-colors"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[color:var(--color-stone)]/20">
        {article.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={article.image}
            alt={article.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="eyebrow text-[color:var(--color-stone-dark)]">{category}</span>
          </div>
        )}
      </div>
      <div className="p-6">
        <p className="eyebrow text-[color:var(--color-stone-dark)]">
          {article.source.name} · {formatDatePT(article.publishedAt)}
        </p>
        <h4 className="mt-3 text-xl leading-tight text-[color:var(--color-navy)] group-hover:text-[color:var(--color-gold-dim)] 
transition-colors">
          {article.title}
        </h4>
        {article.description && (
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-ink)]/75 line-clamp-3">
            {article.description}
          </p>
        )}
        <span className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[color:var(--color-navy)] 
group-hover:text-[color:var(--color-gold-dim)]">
          Ler na fonte <ArrowUpRight className="h-3 w-3" />
        </span>
      </div>
    </a>
  );
}