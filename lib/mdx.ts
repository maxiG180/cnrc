import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_ROOT = path.join(process.cwd(), "content");
const DEFAULT_LOCALE = "pt";

export type Locale = "pt" | "en";

export type NewsFrontmatter = {
  title: string;
  date: string;
  excerpt: string;
  category?: string;
  tags?: string[];
  hero?: string;
};

export type DiligenciaFrontmatter = {
  title: string;
  breadcrumb: string;
  eyebrow: string;
  intro: string;
  hero?: string;
  heroVideo?: string;
  heroVideoAspectRatio?: string;
  capabilities?: string[];
  gallery?: string[];
};

export type ListingFrontmatter = {
  title: string;
  category: string;
  location: string;
  price?: string;
  summary?: string;
  hero?: string;
  videos?: string[];
  gallery?: string[];
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  plotArea?: number;
  year?: number;
  energyRating?: string;
  district?: string;
  municipality?: string;
  coordinates?: { lat: number; lng: number };
  features?: string[];
  badges?: string[];
  metaDescription?: string;
  featured?: boolean;
};

function readMdx<T>(filePath: string) {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return { frontmatter: data as T, content };
}

function resolveLocalizedFile(relativeDir: string, slug: string, locale: Locale): string | null {
  const localized = path.join(CONTENT_ROOT, locale, relativeDir, `${slug}.mdx`);
  if (fs.existsSync(localized)) return localized;
  const fallback = path.join(CONTENT_ROOT, DEFAULT_LOCALE, relativeDir, `${slug}.mdx`);
  if (fs.existsSync(fallback)) return fallback;
  return null;
}

function listMdxSlugs(relativeDir: string, locale: Locale = DEFAULT_LOCALE) {
  const localizedDir = path.join(CONTENT_ROOT, locale, relativeDir);
  const fallbackDir = path.join(CONTENT_ROOT, DEFAULT_LOCALE, relativeDir);
  const seen = new Set<string>();
  for (const dir of [localizedDir, fallbackDir]) {
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir)) {
      if (f.endsWith(".mdx")) seen.add(f.replace(/\.mdx$/, ""));
    }
  }
  return Array.from(seen);
}

export function getNewsSlugs(locale: Locale = DEFAULT_LOCALE) {
  return listMdxSlugs("news", locale);
}

export function getNewsBySlug(slug: string, locale: Locale = DEFAULT_LOCALE) {
  const filePath = resolveLocalizedFile("news", slug, locale);
  if (!filePath) {
    throw new Error(`News not found: ${slug}`);
  }
  const { frontmatter, content } = readMdx<NewsFrontmatter>(filePath);
  return { slug, frontmatter, content };
}

export function getAllNews(locale: Locale = DEFAULT_LOCALE) {
  return getNewsSlugs(locale)
    .map((slug) => getNewsBySlug(slug, locale))
    .sort(
      (a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
    );
}

export function getDiligenciaSlugs(locale: Locale = DEFAULT_LOCALE) {
  return listMdxSlugs("diligencias", locale);
}

export function getDiligenciaBySlug(slug: string, locale: Locale = DEFAULT_LOCALE) {
  const filePath = resolveLocalizedFile("diligencias", slug, locale);
  if (!filePath) return null;
  const { frontmatter, content } = readMdx<DiligenciaFrontmatter>(filePath);
  return { slug, frontmatter, content };
}

export function getListingSlugs(locale: Locale = DEFAULT_LOCALE) {
  return listMdxSlugs("imobiliario/listings", locale);
}

export function getListingBySlug(slug: string, locale: Locale = DEFAULT_LOCALE) {
  const filePath = resolveLocalizedFile("imobiliario/listings", slug, locale);
  if (!filePath) return null;
  const { frontmatter, content } = readMdx<ListingFrontmatter>(filePath);
  return { slug, frontmatter, content };
}

export function getAllListings(locale: Locale = DEFAULT_LOCALE) {
  return getListingSlugs(locale)
    .map((slug) => getListingBySlug(slug, locale))
    .filter((l): l is NonNullable<ReturnType<typeof getListingBySlug>> => l !== null);
}

export function getListingsByCategory(category: string, locale: Locale = DEFAULT_LOCALE) {
  return getAllListings(locale).filter((l) => l.frontmatter.category === category);
}

export function getAllListingCategories(locale: Locale = DEFAULT_LOCALE) {
  const seen = new Set<string>();
  for (const listing of getAllListings(locale)) {
    seen.add(listing.frontmatter.category);
  }
  return Array.from(seen);
}
