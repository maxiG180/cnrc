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
type ExhaustedStatus = "rate_limited" | "unauthorized";
type KeyHealth = { status: ExhaustedStatus; expiresAt: number };
type TopicCacheEntry = { result: SectorNewsResult; expiresAt: number };
const keyHealth = new Map<string, KeyHealth>();
const topicCache = new Map<string, TopicCacheEntry>();

function getApiKeys(): string[] {
  return [
    process.env.GNEWS_API_KEY,
    process.env.GNEWS_API_KEY_FALLBACK,
    process.env.GNEWS_API_KEY_FALLBACK_2,
  ].filter((k): k is string => Boolean(k && k.trim()));
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

  const topicCacheKey = getTopicCacheKey(query, label, keys);
  const cached = getCachedTopic(topicCacheKey);
  if (cached) return cached;

  const blockedStatuses = keys
    .map((key) => getBlockedStatus(key))
    .filter((status): status is ExhaustedStatus => Boolean(status));

  if (blockedStatuses.length === keys.length) {
    if (blockedStatuses.includes("rate_limited")) {
      return cacheTopic(topicCacheKey, { status: "rate_limited", label });
    }
    return cacheTopic(topicCacheKey, { status: "unauthorized", label });
  }

  let lastResult: SectorNewsResult = { status: "error", label, reason: "no_attempt" };
  for (let i = 0; i < keys.length; i++) {
    const blockedStatus = getBlockedStatus(keys[i]);
    if (blockedStatus) {
      lastResult = { status: blockedStatus, label };
      continue;
    }

    const result = await fetchOnce(query, label, keys[i]);
    if (result.status === "ok" || result.status === "empty") return cacheTopic(topicCacheKey, result);
    lastResult = result;
    const exhausted = result.status === "rate_limited" || result.status === "unauthorized";
    if (exhausted) {
      markKeyBlocked(keys[i], result.status);
    }
    if (!exhausted) return cacheTopic(topicCacheKey, result);
    if (process.env.NODE_ENV !== "production" && hasRemainingUsableKey(keys, i + 1)) {
      console.warn(`[gnews] ${label} key #${i + 1} ${result.status}, trying fallback`);
    }
  }
  return cacheTopic(topicCacheKey, lastResult);
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
  url.searchParams.set("max", "10");
  url.searchParams.set("expand", "content");
  url.searchParams.set("apikey", apiKey);

  // Calculate seconds until midnight to ensure fresh news daily
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setHours(24, 0, 0, 0);
  const secondsUntilMidnight = Math.floor((tomorrow.getTime() - now.getTime()) / 1000);

  try {
    const res = await fetch(url.toString(), {
      next: { revalidate: secondsUntilMidnight },
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

function getBlockedStatus(apiKey: string): ExhaustedStatus | null {
  const state = keyHealth.get(apiKey);
  if (!state) return null;
  if (Date.now() >= state.expiresAt) {
    keyHealth.delete(apiKey);
    return null;
  }
  return state.status;
}

function markKeyBlocked(apiKey: string, status: ExhaustedStatus) {
  keyHealth.set(apiKey, {
    status,
    expiresAt: getTomorrowMidnightTimestamp(),
  });
}

function getTomorrowMidnightTimestamp() {
  const tomorrow = new Date();
  tomorrow.setHours(24, 0, 0, 0);
  return tomorrow.getTime();
}

function hasRemainingUsableKey(keys: string[], start: number) {
  for (let i = start; i < keys.length; i++) {
    if (!getBlockedStatus(keys[i])) return true;
  }
  return false;
}

function getTopicCacheKey(query: string, label: string, keys: string[]) {
  return `${label}::${query}::${keys.join("|")}`;
}

function getCachedTopic(cacheKey: string): SectorNewsResult | null {
  const cached = topicCache.get(cacheKey);
  if (!cached) return null;
  if (Date.now() >= cached.expiresAt) {
    topicCache.delete(cacheKey);
    return null;
  }
  return cached.result;
}

function cacheTopic(cacheKey: string, result: SectorNewsResult): SectorNewsResult {
  topicCache.set(cacheKey, {
    result,
    expiresAt: getTomorrowMidnightTimestamp(),
  });
  return result;
}
