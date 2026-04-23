import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";

const pillars = [
  {
    n: "01",
    title: "Liderança Nacional em Recuperação de Crédito",
    body: "Como líderes reconhecidos no setor, proporcionamos aos nossos clientes uma vantagem comercial distinta.",
  },
  {
    n: "02",
    title: "A Equipa que transforma Desafios em Vitórias",
    body: "A nossa força assenta na dedicação e excelência da equipa de profissionais da CAMACHO & NUNES.",
  },
  {
    n: "03",
    title: "A Estratégia começa com a Sabedoria e Experiência",
    body: "A sabedoria e a experiência são o ponto de partida de qualquer estratégia sólida.",
  },
];

export function ThreePillars() {
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
