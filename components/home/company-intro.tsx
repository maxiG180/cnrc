import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { company } from "@/content/shared/company-info";

export async function CompanyIntro() {
  const t = await getTranslations();
  return (
    <Container size="wide">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-20 items-start">
        <Reveal className="lg:col-span-7">
          <p className="eyebrow">{t("home.intro.eyebrow")}</p>
          <h2 className="mt-4 rule">
            {t("home.intro.titleLine1")}<br />
            <span className="text-[color:var(--color-gold-dim)]">{t("home.intro.titleLine2")}</span>
          </h2>

          <div className="mt-10 space-y-6 text-[color:var(--color-ink)]/85 leading-relaxed max-w-[56ch]">
            <p>
              {t("home.intro.p1Pre")}
              <strong className="text-[color:var(--color-navy)]">{t("home.intro.p1Bold")}</strong>
              {t("home.intro.p1Post", { founded: company.founded })}
            </p>
            <p>{t("home.intro.p2")}</p>
          </div>

          <div className="mt-10 flex items-end gap-6">
            <div className="flex flex-col items-center w-[200px]">
              <Image
                src="/assinatura-ceo.png"
                alt={`${company.ceo} signature`}
                width={200}
                height={75}
                className="object-contain opacity-80 mb-2"
              />
              <div className="h-px w-full bg-[color:var(--color-gold)]/40" />
            </div>
            <div>
              <p className="font-display italic text-lg text-[color:var(--color-navy)]">{company.ceo}</p>
              <p className="text-[11px] tracking-[0.2em] uppercase text-[color:var(--color-stone-dark)] mt-1">{t("home.intro.ceoRole")}</p>
            </div>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-5" delay={0.12}>
          <div className="relative aspect-[4/5] overflow-hidden bg-transparent">
            <Image
              src="/Quem Somos/Foto-Dr.-Antonio-Nunes-bg-removed.png"
              alt={`${company.ceo}, CEO ${company.shortName}`}
              fill
              sizes="(min-width:1024px) 40vw, 100vw"
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-[color:var(--color-navy-deep)]">
              <p className="font-display text-2xl">{company.ceo}</p>
              <p className="text-xs tracking-[0.2em] uppercase opacity-80 mt-1">{t("home.intro.ceoRole")} · {company.shortName}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </Container>
  );
}
