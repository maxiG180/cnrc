import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { MapPin, Tag } from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/shared/section";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Gallery } from "@/components/shared/gallery";
import { VideoPlayer } from "@/components/shared/video-player";
import { CtaBanner } from "@/components/shared/cta-banner";
import { getListingBySlug, getAllListings } from "@/lib/mdx";
import { getImobiliarioCategory } from "@/content/shared/imobiliario-categories";

type Params = { category: string; slug: string };

export async function generateStaticParams() {
  return getAllListings().map((l) => ({
    category: l.frontmatter.category,
    slug: l.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = getListingBySlug(slug);
  if (!entry) return {};
  return pageMetadata({
    title: entry.frontmatter.title,
    description: (entry.frontmatter.summary ?? entry.frontmatter.title).slice(0, 160),
    path: `/imobiliario/${entry.frontmatter.category}/${slug}`,
    image: entry.frontmatter.hero,
  });
}

export default async function ListingPage({ params }: { params: Promise<Params> }) {
  const { category, slug } = await params;
  const entry = getListingBySlug(slug);
  if (!entry || entry.frontmatter.category !== category) notFound();

  const { frontmatter, content } = entry;
  const cat = getImobiliarioCategory(frontmatter.category);

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
              className="object-cover opacity-35"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--color-navy-deep)] via-[color:var(--color-navy-deep)]/80 to-[color:var(--color-navy-deep)]/50" />
          </div>
        )}
        <Container size="wide" className="relative z-10">
          <div className="text-[color:var(--color-bone)]/80">
            <Breadcrumbs
              items={[
                { label: "Imobiliário", href: "/imobiliario" },
                { label: cat?.label ?? frontmatter.category, href: `/imobiliario/${frontmatter.category}` },
                { label: frontmatter.title },
              ]}
            />
          </div>
          <Reveal className="mt-8">
            <p className="eyebrow text-[color:var(--color-gold)]">{cat?.label ?? "Imóvel"}</p>
            <h1 className="mt-6 text-[color:var(--color-bone)] max-w-[22ch]">{frontmatter.title}</h1>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-[color:var(--color-bone)]/85">
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4" /> {frontmatter.location}
              </span>
              {frontmatter.price && (
                <span className="inline-flex items-center gap-2">
                  <Tag className="h-4 w-4" /> {frontmatter.price}
                </span>
              )}
            </div>
            {frontmatter.summary && (
              <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-[color:var(--color-bone)]/85">
                {frontmatter.summary}
              </p>
            )}
          </Reveal>
        </Container>
      </Section>

      {frontmatter.videos && frontmatter.videos.length > 0 && (
        <Section tone="bone" spacing="md">
          <Container size="wide">
            <VideoPlayer src={frontmatter.videos[0]} title={frontmatter.title} />
          </Container>
        </Section>
      )}

      <Section tone="bone" spacing="lg">
        <Container size="content">
          <article className="prose-legal">
            <MDXRemote source={content} />
          </article>
        </Container>
      </Section>

      {frontmatter.gallery && frontmatter.gallery.length > 0 && (
        <Section tone="bone-soft" spacing="lg">
          <Container size="wide">
            <Reveal>
              <p className="eyebrow">Galeria</p>
              <h2 className="mt-4">Imagens do imóvel.</h2>
            </Reveal>
            <div className="mt-10">
              <Gallery
                images={frontmatter.gallery.map((src, i) => ({
                  src,
                  alt: `${frontmatter.title} — imagem ${i + 1}`,
                }))}
                columns={3}
              />
            </div>
          </Container>
        </Section>
      )}

      <CtaBanner />
    </>
  );
}
