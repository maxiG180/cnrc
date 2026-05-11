import { getTranslations } from "next-intl/server";
import { Container } from "@/components/shared/container";
import { Counter } from "@/components/shared/counter";
import { Reveal } from "@/components/shared/reveal";

export async function StatsCounters() {
  const t = await getTranslations();
  const stats = [
    { to: 3656, label: t("home.stats.casesClosed") },
    { to: 93, suffix: "%", label: t("home.stats.successRate") },
    { to: 540, label: t("home.stats.flightHours") },
    { to: 325, label: t("home.stats.monthlyVisits") },
  ];

  return (
    <Container size="wide">
      <div className="grid gap-10 md:grid-cols-4 md:gap-6">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <div className="border-t border-[color:var(--color-gold)]/50 pt-6">
              <div className="flex items-baseline gap-1">
                <Counter
                  to={s.to}
                  suffix={s.suffix}
                  className="font-display text-[3.5rem] md:text-[4.5rem] leading-none tracking-tight text-[color:var(--color-bone)]"
                />
              </div>
              <p className="mt-4 text-sm uppercase tracking-[0.18em] text-[color:var(--color-bone)]/70">{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Container>
  );
}
