import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_ROOT = path.join(process.cwd(), "content");

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
  capabilities?: string[];
  gallery?: string[];
};

export type ListingFrontmatter = {
  // Core info
  title: string;
  category: string;
  location: string;
  price?: string;
  summary?: string;

  // Media
  hero?: string;
  videos?: string[];
  gallery?: string[];

  // Property specifications
  bedrooms?: number;
  bathrooms?: number;
  area?: number; // m²
  plotArea?: number; // m² (for land/terrenos)
  year?: number; // construction year
  energyRating?: string; // A+, A, B, C, D, E, F

  // Location details
  district?: string; // Lisboa, Porto, Faro, etc.
  municipality?: string; // Cascais, Sintra, etc.
  coordinates?: {
    lat: number;
    lng: number;
  };

  // Features & badges
  features?: string[]; // piscina, jardim, garagem, varanda, etc.
  badges?: string[]; // novo, investimento, exclusivo, reduzido

  // SEO & Display
  metaDescription?: string;
  featured?: boolean; // highlight on homepage
};

function readMdx<T>(filePath: string) {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return { frontmatter: data as T, content };
}

function listMdxSlugs(dir: string) {
  const full = path.join(CONTENT_ROOT, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getNewsSlugs() {
  return listMdxSlugs("news");
}

export function getNewsBySlug(slug: string) {
  const filePath = path.join(CONTENT_ROOT, "news", `${slug}.mdx`);
  const { frontmatter, content } = readMdx<NewsFrontmatter>(filePath);
  return { slug, frontmatter, content };
}

export function getAllNews() {
  return getNewsSlugs()
    .map((slug) => getNewsBySlug(slug))
    .sort(
      (a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
    );
}

export function getDiligenciaSlugs() {
  return listMdxSlugs("diligencias");
}

export function getDiligenciaBySlug(slug: string) {
  const filePath = path.join(CONTENT_ROOT, "diligencias", `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const { frontmatter, content } = readMdx<DiligenciaFrontmatter>(filePath);
  return { slug, frontmatter, content };
}

export function getListingSlugs() {
  const dir = path.join(CONTENT_ROOT, "imobiliario", "listings");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getListingBySlug(slug: string) {
  const filePath = path.join(CONTENT_ROOT, "imobiliario", "listings", `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const { frontmatter, content } = readMdx<ListingFrontmatter>(filePath);
  return { slug, frontmatter, content };
}

export function getAllListings() {
  return getListingSlugs()
    .map((slug) => getListingBySlug(slug))
    .filter((l): l is NonNullable<ReturnType<typeof getListingBySlug>> => l !== null);
}

export function getListingsByCategory(category: string) {
  return getAllListings().filter((l) => l.frontmatter.category === category);
}

export function getAllListingCategories() {
  const seen = new Set<string>();
  for (const listing of getAllListings()) {
    seen.add(listing.frontmatter.category);
  }
  return Array.from(seen);
}
