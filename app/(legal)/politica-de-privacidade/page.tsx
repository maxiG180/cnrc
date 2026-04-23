import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { LegalPage } from "@/components/shared/legal-page";
import { company } from "@/content/shared/company-info";

export const metadata: Metadata = pageMetadata({
  title: "Política de Privacidade",
  description:
    "Política de Privacidade da Camacho & Nunes Recuperação de Crédito, em conformidade com o RGPD e legislação aplicável.",
  path: "/politica-de-privacidade",
});

export default function PoliticaPrivacidadePage() {
  return (
    <LegalPage title="Política de Privacidade" eyebrow="Informação RGPD" updatedAt="19 de abril de 2026">
      <h2>1. Responsável pelo tratamento</h2>
      <p>
        A entidade responsável pelo tratamento dos dados pessoais é a <strong>{company.legalName}</strong>, com sede em {company.address.street}, {company.address.postal} {company.address.city}, NIF {company.nif}.
        Contactos: {company.email} · {company.phones.free}.
      </p>

      <h2>2. Dados recolhidos</h2>
      <p>
        Recolhemos apenas os dados estritamente necessários à prestação dos nossos serviços: dados de identificação, contacto, dados processuais (em diligências judiciais) e dados técnicos de navegação no presente sítio.
      </p>

      <h2>3. Finalidades do tratamento</h2>
      <ul>
        <li>Prestação de serviços de recuperação de crédito e diligências judiciais.</li>
        <li>Resposta a pedidos efetuados através de formulários de contacto.</li>
        <li>Cumprimento de obrigações legais e regulamentares.</li>
        <li>Melhoria contínua da experiência de navegação no sítio, sujeito a consentimento prévio.</li>
      </ul>

      <h2>4. Fundamentos de licitude</h2>
      <p>
        O tratamento fundamenta-se, conforme os casos, no consentimento do titular, na execução de contrato, no cumprimento de obrigação legal ou no interesse legítimo do responsável pelo tratamento.
      </p>

      <h2>5. Conservação dos dados</h2>
      <p>
        Os dados pessoais são conservados pelo período estritamente necessário às finalidades para as quais foram recolhidos, respeitando-se sempre os prazos legais aplicáveis, nomeadamente em matéria fiscal e processual.
      </p>

      <h2>6. Partilha com terceiros</h2>
      <p>
        Os dados podem ser partilhados com autoridades judiciais, agentes de execução, forças policiais e demais entidades legalmente exigidas no âmbito das diligências contratadas. Não cedemos dados a terceiros para fins de marketing.
      </p>

      <h2>7. Direitos do titular</h2>
      <p>
        Nos termos do RGPD, pode exercer, a qualquer momento, os direitos de acesso, retificação, apagamento, limitação, portabilidade e oposição. Para tal, basta contactar-nos através de {company.email}.
      </p>

      <h2>8. Autoridade de controlo</h2>
      <p>
        Tem ainda o direito de apresentar reclamação junto da Comissão Nacional de Proteção de Dados (CNPD), autoridade de controlo competente em Portugal.
      </p>
    </LegalPage>
  );
}
