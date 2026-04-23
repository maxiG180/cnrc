import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { LegalPage } from "@/components/shared/legal-page";
import { company } from "@/content/shared/company-info";

export const metadata: Metadata = pageMetadata({
  title: "Termos e Condições",
  description:
    "Termos e Condições de utilização do sítio da Camacho & Nunes Recuperação de Crédito.",
  path: "/termos-e-condicoes",
});

export default function TermosPage() {
  return (
    <LegalPage title="Termos e Condições" eyebrow="Utilização do sítio" updatedAt="19 de abril de 2026">
      <h2>1. Enquadramento</h2>
      <p>
        O presente sítio é propriedade de <strong>{company.legalName}</strong>, NIF {company.nif}, com sede em {company.address.street}, {company.address.postal} {company.address.city}. A utilização deste sítio pressupõe a aceitação integral dos presentes Termos e Condições.
      </p>

      <h2>2. Propriedade intelectual</h2>
      <p>
        Todos os conteúdos disponibilizados — incluindo textos, imagens, vídeos, logótipo, identidade visual e código — são propriedade da {company.legalName} ou estão licenciados para utilização exclusiva neste sítio. A reprodução, total ou parcial, sem autorização expressa, é expressamente proibida.
      </p>

      <h2>3. Utilização permitida</h2>
      <p>
        O sítio destina-se a fornecer informação institucional sobre os serviços da {company.shortName}. É expressamente proibida qualquer utilização que possa comprometer a segurança, integridade ou disponibilidade do sítio.
      </p>

      <h2>4. Limitação de responsabilidade</h2>
      <p>
        A {company.shortName} procura manter a informação atualizada e correta, mas não assume responsabilidade por eventuais imprecisões, omissões ou indisponibilidades temporárias. O presente sítio não constitui aconselhamento jurídico personalizado.
      </p>

      <h2>5. Ligações a sítios de terceiros</h2>
      <p>
        O sítio pode conter ligações a conteúdos de terceiros, sobre os quais não exercemos controlo editorial. A utilização desses conteúdos é da exclusiva responsabilidade do utilizador.
      </p>

      <h2>6. Alterações</h2>
      <p>
        Reservamo-nos o direito de alterar, a qualquer momento, os presentes Termos e Condições. As alterações entram em vigor com a publicação no sítio.
      </p>

      <h2>7. Lei aplicável e foro</h2>
      <p>
        Os presentes Termos regem-se pela lei portuguesa. Para qualquer litígio emergente da utilização do sítio será competente o foro da comarca do Barreiro, com expressa renúncia a qualquer outro.
      </p>
    </LegalPage>
  );
}
