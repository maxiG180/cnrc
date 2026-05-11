import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { getTranslations } from "next-intl/server";

export async function ThreePillars() {
  const t = await getTranslations("home.pillars");
  const pillars = [
    {
      n: "01",
      title: t("item1.title"),
      body: t("item1.body"),
    },
    {
      n: "02",
      title: t("item2.title"),
      body: t("item2.body"),
    },
    {
      n: "03",
      title: t("item3.title"),
      body: t("item3.body"),
    },
  ];

  return (
    <Container size="wide">
      <div className="grid gap-12 md:grid-cols-3">
        {pillars.map((p, i) => (
          <Reveal key={p.n} delay={i * 0.1}>
            <div className="relative">
              <span className="font-display text-[4rem] leading-none text-[color:var(--color-gold)]/60">{p.n}</span>
              <h3 className="mt-4 text-xl md:text-[1.5rem] text-balance">{p.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-[color:var(--color-ink)]/70">{p.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Container>
  );
}
