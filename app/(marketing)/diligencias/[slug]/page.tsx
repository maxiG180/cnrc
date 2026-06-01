import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getTranslations } from "next-intl/server";
import { getLocale } from "next-intl/server";
import { getDiligenciaBySlug, getDiligenciaSlugs, type Locale } from "@/lib/mdx";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/shared/section";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { Gallery } from "@/components/shared/gallery";
import { CtaBanner } from "@/components/shared/cta-banner";
import { HeroVideo } from "@/components/shared/hero-video";
import { VideoPlayer } from "@/components/shared/video-player";

type Params = { slug: string };

export async function generateStaticParams() {
  return getDiligenciaSlugs("pt").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const locale = (await getLocale()) as Locale;
  const entry = getDiligenciaBySlug(slug, locale);
  if (!entry) return {};
  return pageMetadata({
    title: entry.frontmatter.title,
    description: entry.frontmatter.intro.slice(0, 160),
    path: `/diligencias/${slug}`,
  });
}

export default async function DiligenciaPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const locale = (await getLocale()) as Locale;
  const entry = getDiligenciaBySlug(slug, locale);
  if (!entry) notFound();

  const t = await getTranslations("diligencias");
  const { frontmatter, content } = entry;
  const isHeroVideo = frontmatter.hero?.match(/\.(mp4|webm|ogg)$/i);

  return (
    <>
      <Section tone="navy-deep" spacing="lg" className="pt-12 overflow-hidden">
        {frontmatter.hero && (
          <div className="absolute inset-0">
            {isHeroVideo ? (
              <HeroVideo src={frontmatter.hero} className="absolute inset-0 w-full h-full object-cover opacity-30" />
            ) : (
              <Image src={frontmatter.hero} alt={frontmatter.title} fill sizes="100vw" priority className="object-cover opacity-50" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--color-navy-deep)] via-[color:var(--color-navy-deep)]/60 to-[color:var(--color-navy-deep)]/30" />
          </div>
        )}
        <Container size="wide" className="relative z-10">
          <Reveal>
            <p className="eyebrow text-[color:var(--color-gold)]">{frontmatter.eyebrow}</p>
            <h1 className="mt-6 text-[color:var(--color-bone)] max-w-[22ch]">{frontmatter.title}</h1>
            <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-[color:var(--color-bone)]/85">{frontmatter.intro}</p>
          </Reveal>
        </Container>
      </Section>

      {frontmatter.heroVideo && (
        <Section tone="bone" spacing="lg" className="!pb-0">
          <Container size="content">
            <VideoPlayer
              src={frontmatter.heroVideo}
              aspectRatio={frontmatter.heroVideoAspectRatio || "16/9"}
            />
          </Container>
        </Section>
      )}

      <Section tone="bone" spacing="lg" className={frontmatter.heroVideo ? "!pt-0" : ""}>
        <Container size="content">
          <article className="prose-legal">
            <MDXRemote
              source={content}
              options={{
                mdxOptions: {
                  development: false,
                }
              }}
            />
          </article>
        </Container>
      </Section>

      {frontmatter.gallery && frontmatter.gallery.length > 0 && (
        <Section tone="bone" spacing="lg">
          <Container size="wide">
            <Reveal>
              <p className="eyebrow">{t("galleryEyebrow")}</p>
              <h2 className="mt-4">{t("galleryTitle")}</h2>
            </Reveal>
            <div className="mt-10">
              <Gallery
                images={frontmatter.gallery.map((src, i) => ({
                  src,
                  alt: `${frontmatter.title} — ${t("imageAlt")} ${i + 1}`,
                }))}
                columns={3}
              />
            </div>
          </Container>
        </Section>
      )}

      {frontmatter.capabilities && frontmatter.capabilities.length > 0 && (
        <Section tone="navy" spacing="lg">
          <Container size="wide">
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <Reveal>
                  <p className="eyebrow text-[color:var(--color-gold)]">{t("capabilitiesEyebrow")}</p>
                  <h2 className="mt-4 text-[color:var(--color-bone)]">{t("capabilitiesTitle")}</h2>
                </Reveal>
              </div>
              <div className="lg:col-span-8">
                <ul className="divide-y divide-[color:var(--color-bone)]/10">
                  {frontmatter.capabilities.map((c, i) => (
                    <li key={i} className="flex gap-6 py-5">
                      <span className="font-display text-2xl text-[color:var(--color-gold)] shrink-0 w-10">{String(i + 1).padStart(2, "0")}</span>
                      <p className="text-[color:var(--color-bone)]/90 leading-relaxed">{c}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </Section>
      )}

      <CtaBanner />
    </>
  );
}
