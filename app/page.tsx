import { Section } from "@/components/shared/section";
import { CtaBanner } from "@/components/shared/cta-banner";
import { HeroSlider } from "@/components/home/hero-slider";
import { ServicesGrid } from "@/components/home/services-grid";
import { CompanyIntro } from "@/components/home/company-intro";
import { ThreePillars } from "@/components/home/three-pillars";
import { TrustSection } from "@/components/home/trust-section";
import { StatsCounters } from "@/components/home/stats-counters";
import { NewsTeaser } from "@/components/home/news-teaser";

export default function HomePage() {
  return (
    <>
      <HeroSlider />

      <Section tone="bone" spacing="lg">
        <ServicesGrid />
      </Section>

      <Section tone="bone-soft" spacing="xl">
        <CompanyIntro />
      </Section>

      <Section tone="bone" spacing="lg">
        <ThreePillars />
      </Section>

      <Section tone="bone-soft" spacing="xl">
        <TrustSection />
      </Section>

      <Section tone="navy" spacing="lg">
        <StatsCounters />
      </Section>

      <Section tone="bone" spacing="lg">
        <NewsTeaser />
      </Section>

      <CtaBanner />
    </>
  );
}
