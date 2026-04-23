import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/metadata";
import { getDiligenciaSlugs, getNewsSlugs, getAllListings } from "@/lib/mdx";
import { imobiliarioCategories } from "@/content/shared/imobiliario-categories";

const staticRoutes = [
  "",
  "/sobre-nos",
  "/a-nossa-equipa",
  "/os-nossos-escritorios",
  "/as-nossas-instalacoes",
  "/areas-de-especializacao",
  "/contactos",
  "/imobiliario",
  "/noticias-em-destaque",
  "/tv-direto",
  "/politica-de-privacidade",
  "/termos-e-condicoes",
  "/politica-de-cookies",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const entries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: new URL(path || "/", siteUrl).toString(),
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  for (const slug of getDiligenciaSlugs()) {
    entries.push({
      url: new URL(`/diligencias/${slug}`, siteUrl).toString(),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  for (const slug of getNewsSlugs()) {
    entries.push({
      url: new URL(`/noticias-em-destaque/${slug}`, siteUrl).toString(),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  for (const cat of imobiliarioCategories) {
    entries.push({
      url: new URL(`/imobiliario/${cat.slug}`, siteUrl).toString(),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    });
  }

  for (const listing of getAllListings()) {
    entries.push({
      url: new URL(
        `/imobiliario/${listing.frontmatter.category}/${listing.slug}`,
        siteUrl
      ).toString(),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.5,
    });
  }

  return entries;
}
