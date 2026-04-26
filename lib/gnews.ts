export type GNewsArticle = {
  title: string;
  description: string | null;
  url: string;
  image: string | null;
  publishedAt: string;
  source: {
    name: string;
    url: string;
  };
};

export type SectorNewsTopic = {
  label: string;
  articles: GNewsArticle[];
};

export type SectorNewsResult =
  | { status: "ok"; label: string; articles: GNewsArticle[] }
  | { status: "empty"; label: string }
  | { status: "rate_limited"; label: string }
  | { status: "unauthorized"; label: string }
  | { status: "error"; label: string; reason: string };

type GNewsResponse = {
  totalArticles?: number;
  articles?: GNewsArticle[];
  errors?: string[];
};

const ENDPOINT = "https://gnews.io/api/v4/search";

function getApiKeys(): string[] {
  return [process.env.GNEWS_API_KEY, process.env.GNEWS_API_KEY_FALLBACK]
    .filter((k): k is string => Boolean(k && k.trim()));
}

export function isGNewsConfigured() {
  return getApiKeys().length > 0;
}

export async function fetchSectorNews(
  query: string,
  label: string,
): Promise<SectorNewsResult> {
  const keys = getApiKeys();
  if (keys.length === 0) {
    return { status: "error", label, reason: "missing_key" };
  }

  let lastResult: SectorNewsResult = { status: "error", label, reason: "no_attempt" };
  for (let i = 0; i < keys.length; i++) {
    const result = await fetchOnce(query, label, keys[i]);
    if (result.status === "ok" || result.status === "empty") return result;
    lastResult = result;
    const exhausted = result.status === "rate_limited" || result.status === "unauthorized";
    if (!exhausted) return result;
    if (process.env.NODE_ENV !== "production" && i < keys.length - 1) {
      console.warn(`[gnews] ${label} key #${i + 1} ${result.status}, trying fallback`);
    }
  }
  return lastResult;
}

async function fetchOnce(
  query: string,
  label: string,
  apiKey: string,
): Promise<SectorNewsResult> {
  const url = new URL(ENDPOINT);
  url.searchParams.set("q", query);
  url.searchParams.set("lang", "pt");
  url.searchParams.set("country", "pt");
  url.searchParams.set("max", "6");
  url.searchParams.set("expand", "content");
  url.searchParams.set("apikey", apiKey);

  try {
    const res = await fetch(url.toString(), {
      next: { revalidate: 86400 },
    });

    if (res.status === 401 || res.status === 403) {
      return { status: "unauthorized", label };
    }
    if (res.status === 429) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(`[gnews] ${label} rate limited (HTTP 429)`);
      }
      return { status: "rate_limited", label };
    }
    if (!res.ok) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(`[gnews] ${label} HTTP ${res.status}`);
      }
      return { status: "error", label, reason: `http_${res.status}` };
    }

    const data: GNewsResponse = await res.json();

    if (data.errors && data.errors.length > 0) {
      const joined = data.errors.join(" | ").toLowerCase();
      if (process.env.NODE_ENV !== "production") {
        console.warn(`[gnews] ${label} body errors:`, data.errors);
      }
      if (joined.includes("limit") || joined.includes("quota")) {
        return { status: "rate_limited", label };
      }
      if (joined.includes("api key") || joined.includes("apikey")) {
        return { status: "unauthorized", label };
      }
      return { status: "error", label, reason: "api_error" };
    }

    if (!data.articles || data.articles.length === 0) {
      return { status: "empty", label };
    }
    return { status: "ok", label, articles: data.articles };
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[gnews] ${label} request errored:`, err);
    }
    return { status: "error", label, reason: "network" };
  }
}
