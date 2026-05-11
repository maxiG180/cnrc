import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";

export async function TrustSection() {
  const t = await getTranslations();
  return (
    <Container size="wide">
      <div className="grid gap-12 lg:grid-cols-12 items-center">
        <Reveal className="lg:col-span-6">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src="/instalacoes/lisboa-sala-audiencias.jpg"
              alt={t("home.trust.alt")}
              fill
              sizes="(min-width:1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
        <div className="lg:col-span-6">
          <Reveal>
            <p className="eyebrow">{t("home.trust.eyebrow")}</p>
            <h2 className="mt-4 rule">
              {t("home.trust.titleLine1")}<br />
              <span className="text-[color:var(--color-gold-dim)]">{t("home.trust.titleLine2")}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-10 text-lg leading-relaxed text-[color:var(--color-ink)]/85 max-w-[52ch]">
              {t("home.trust.body")}
            </p>
            <p className="mt-6 font-display italic text-xl md:text-2xl text-[color:var(--color-navy)] max-w-[42ch]">
              &ldquo;{t("home.trust.quote")}&rdquo;
            </p>
          </Reveal>
        </div>
      </div>
    </Container>
  );
}
