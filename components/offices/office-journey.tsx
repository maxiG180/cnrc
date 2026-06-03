"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { company } from "@/content/shared/company-info";

const officeImages: Record<string, string> = {
  lisboa: "https://res.cloudinary.com/dqd3l6zf5/image/upload/v1779931499/office-lisboa_aljhrp.jpg",
  barreiro: "https://res.cloudinary.com/dqd3l6zf5/image/upload/v1779931500/office-barreiro_rp6z54.jpg",
  montijo: "https://res.cloudinary.com/dqd3l6zf5/image/upload/v1779931497/office-montijo_eupval.jpg",
  // Placeholder: University of Coimbra (Wikimedia Commons) until a real office photo is provided
  coimbra: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/%F0%9F%87%B5%F0%9F%87%B9_%F0%9F%87%AA%F0%9F%87%BA_Universidad_de_Co%C3%ADmbra_%28Portugal%2C_23-10-2019%29_%2849587625078%29.jpg/1920px-%F0%9F%87%B5%F0%9F%87%B9_%F0%9F%87%AA%F0%9F%87%BA_Universidad_de_Co%C3%ADmbra_%28Portugal%2C_23-10-2019%29_%2849587625078%29.jpg",
  braga: "https://res.cloudinary.com/dqd3l6zf5/image/upload/v1779931498/office-braga_f18d6v.jpg",
};

const officeDescriptions: Record<string, { pt: string; en: string }> = {
  lisboa: {
    pt: "Sede nacional no coração da capital, equipada com salas de conferência, centro de operações 24/7 e arquivo seguro de documentação. Equipa de 45 profissionais especializados em recuperação de crédito comercial e imobiliário.",
    en: "National headquarters in the heart of the capital, equipped with conference rooms, 24/7 operations center and secure document archive. Team of 45 professionals specialized in commercial and real estate credit recovery."
  },
  barreiro: {
    pt: "Centro regional para a margem sul, com acesso direto a clientes em Setúbal e Península de Setúbal. Infraestrutura logística completa para operações de campo e coordenação com agentes judiciais.",
    en: "Regional center for the south bank, with direct access to clients in Setúbal and Setúbal Peninsula. Complete logistics infrastructure for field operations and coordination with judicial agents."
  },
  montijo: {
    pt: "Base administrativa principal, albergando o departamento financeiro, recursos humanos e tecnologias de informação. Proximidade estratégica ao complexo de instalações operacionais no Pinhal Novo.",
    en: "Main administrative base, housing the financial department, human resources and information technology. Strategic proximity to the operational facilities complex in Pinhal Novo."
  },
  coimbra: {
    pt: "Presença na região Centro, assegurando cobertura entre Lisboa e Porto. Escritório dedicado ao acompanhamento de processos na Beira Litoral e à articulação com os tribunais da região de Coimbra.",
    en: "Presence in the Centro region, ensuring coverage between Lisbon and Porto. Office dedicated to handling cases in Beira Litoral and coordination with the courts of the Coimbra region."
  },
  braga: {
    pt: "Expansão para o norte de Portugal, servindo clientes no Minho e Douro Litoral. Escritório moderno com capacidade para 20 profissionais, focado em recuperação judicial e extrajudicial.",
    en: "Expansion to northern Portugal, serving clients in Minho and Douro Litoral. Modern office with capacity for 20 professionals, focused on judicial and extrajudicial recovery."
  }
};

export function OfficeJourney() {
  const t = useTranslations("escritorios");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showChapter, setShowChapter] = useState(true);
  const [showScrollHint, setShowScrollHint] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.office-journey-section');
      let newIndex = -1;
      let foundSection = false;

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          newIndex = index;
          foundSection = true;
        }
      });

      if (foundSection && newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
        setShowChapter(true);
        setTimeout(() => setShowChapter(false), 2000);
      } else if (!foundSection) {
        setShowChapter(false);
      }

      // Hide scroll hint after last office section
      if (sections.length > 0) {
        const lastSection = sections[sections.length - 1];
        const lastRect = lastSection.getBoundingClientRect();
        setShowScrollHint(lastRect.bottom > window.innerHeight / 2);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentIndex]);

  return (
    <>
      {/* Chapter Indicator (desktop only — overlaps content on mobile) */}
      <div
        className={`hidden md:block fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none transition-opacity duration-500 ${
          showChapter ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="text-center">
          <div className="font-display text-[clamp(6rem,15vw,12rem)] font-light text-[color:var(--color-bone)] opacity-15 leading-none">
            {String(currentIndex + 1).padStart(2, '0')}
          </div>
          <div className="font-display text-[clamp(1.5rem,3vw,2.5rem)] text-[color:var(--color-bone)] mt-4 italic">
            {company.offices[currentIndex].name}
          </div>
        </div>
      </div>

      {/* Scroll Hint */}
      {showScrollHint && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-3 opacity-60 hover:opacity-100 transition-opacity">
          <div className="w-6 h-10 border-2 border-[color:var(--color-bone)] rounded-xl relative">
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1 h-2 bg-[color:var(--color-bone)] rounded-full animate-scroll-bounce" />
          </div>
          <span className="text-[color:var(--color-bone)] text-xs uppercase tracking-[0.15em] font-semibold">
            Scroll
          </span>
        </div>
      )}

      {/* Office Sections */}
      {company.offices.map((office, index) => (
        <section
          key={office.slug}
          className="office-journey-section min-h-screen relative flex items-center"
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <Image
              src={officeImages[office.slug]}
              alt={`${office.name} office`}
              fill
              sizes="100vw"
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f1419]/95 via-[#0f1419]/60 to-[#0f1419]/25 md:bg-gradient-to-r md:from-[#0f1419]/85 md:via-[#0f1419]/40 md:to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-10 lg:px-[60px]">
            <div className="max-w-[600px]">
              <p className="eyebrow text-[color:var(--color-gold)]">
                {t("officeLabel")}
              </p>
              <h2 className="mt-3 font-display text-[clamp(3rem,8vw,5rem)] font-medium leading-[1.2] text-[color:var(--color-bone)]">
                {office.name}
              </h2>
              <p className="mt-6 max-w-[480px] text-lg leading-relaxed text-[color:var(--color-bone)]/90">
                {officeDescriptions[office.slug].pt}
              </p>
            </div>
          </div>
        </section>
      ))}

      <style jsx global>{`
        @keyframes scroll-bounce {
          0%, 100% {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
          }
          50% {
            transform: translateX(-50%) translateY(12px);
            opacity: 0.3;
          }
        }

        .animate-scroll-bounce {
          animation: scroll-bounce 1.5s infinite;
        }
      `}</style>
    </>
  );
}
