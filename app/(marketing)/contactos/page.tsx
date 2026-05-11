import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, Phone, Clock, ExternalLink } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/shared/section";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { ContactForm } from "@/components/forms/contact-form";
import { company } from "@/content/shared/company-info";
import { formatPhoneHref } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("contactos");
  return pageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/contactos",
  });
}

export default async function ContactosPage() {
  const t = await getTranslations("contactos");
  return (
    <>
      <Section tone="navy-deep" spacing="lg" className="pt-12">
        <Container size="wide">
          <Reveal>
            <p className="eyebrow text-[color:var(--color-gold)]">{t("hero.eyebrow")}</p>
            <h1 className="mt-6 text-[color:var(--color-bone)] max-w-[16ch]">{t("hero.title")}</h1>
            <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-[color:var(--color-bone)]/85">{t("hero.subtitle")}</p>
          </Reveal>
        </Container>
      </Section>

      <Section tone="bone" spacing="lg">
        <Container size="wide">
          <div className="grid gap-16 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <p className="eyebrow">{t("directContact.eyebrow")}</p>
              <h2 className="mt-4 rule">{t("directContact.title")}</h2>

              <dl className="mt-10 space-y-6">
                <ContactBlock
                  icon={<Phone className="h-5 w-5" />}
                  title={t("directContact.freeCall")}
                  lines={[
                    {
                      text: company.phones.free,
                      href: formatPhoneHref(company.phones.free),
                      meta: t("directContact.freeCallMeta"),
                    },
                    { text: company.phones.mobile, href: formatPhoneHref(company.phones.mobile), meta: t("directContact.mobileMeta") },
                    { text: company.phones.landline, href: formatPhoneHref(company.phones.landline) },
                  ]}
                />
                <ContactBlock
                  icon={<Mail className="h-5 w-5" />}
                  title={t("directContact.email")}
                  lines={[{ text: company.email, href: `mailto:${company.email}` }]}
                />
                <ContactBlock
                  icon={<MapPin className="h-5 w-5" />}
                  title={t("directContact.headquarters")}
                  lines={[
                    { text: company.address.street },
                    { text: `${company.address.postal} ${company.address.city}` },
                  ]}
                />
                <ContactBlock
                  icon={<Clock className="h-5 w-5" />}
                  title={t("directContact.hours")}
                  lines={[{ text: company.hours }]}
                />
              </dl>
            </Reveal>

            <div className="lg:col-span-7">
              <Reveal>
                <div className="border border-[color:var(--color-stone)]/40 bg-[color:var(--color-bone-soft)] p-8 md:p-10">
                  <p className="eyebrow">{t("formSection.eyebrow")}</p>
                  <h2 className="mt-3 text-2xl md:text-3xl">{t("formSection.title")}</h2>
                  <div className="mt-8">
                    <ContactForm />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="bone-soft" spacing="lg">
        <Container size="wide">
          <Reveal>
            <p className="eyebrow">{t("officesSection.eyebrow")}</p>
            <h2 className="mt-4">{t("officesSection.title")}</h2>
          </Reveal>

          <div className="mt-12 grid gap-px bg-[color:var(--color-stone)]/40 border border-[color:var(--color-stone)]/40 md:grid-cols-2 lg:grid-cols-3">
            {company.offices.map((o) => (
              <div key={o.slug} className="bg-[color:var(--color-bone)] p-8 md:p-10">
                <p className="eyebrow">{t("officesSection.officeLabel")}</p>
                <h3 className="mt-3 text-xl">{o.name}</h3>
                <Link href="/os-nossos-escritorios" className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[color:var(--color-navy)] hover:text-[color:var(--color-gold-dim)]">
                  {t("officesSection.viewGallery")} <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}

function ContactBlock({
  icon,
  title,
  lines,
}: {
  icon: React.ReactNode;
  title: string;
  lines: { text: string; href?: string; meta?: string }[];
}) {
  return (
    <div className="flex gap-4">
      <div className="mt-1 text-[color:var(--color-gold-dim)]">{icon}</div>
      <div>
        <dt className="text-[0.7rem] tracking-[0.2em] uppercase text-[color:var(--color-stone-dark)]">{title}</dt>
        <dd className="mt-2 space-y-1.5">
          {lines.map((l, i) => (
            <div key={i}>
              {l.href ? (
                <a href={l.href} className="text-[color:var(--color-navy)] font-medium hover:text-[color:var(--color-gold-dim)] transition-colors">
                  {l.text}
                </a>
              ) : (
                <span className="text-[color:var(--color-ink)]/85">{l.text}</span>
              )}
              {l.meta && <span className="block text-xs text-[color:var(--color-stone-dark)]">{l.meta}</span>}
            </div>
          ))}
        </dd>
      </div>
    </div>
  );
}
