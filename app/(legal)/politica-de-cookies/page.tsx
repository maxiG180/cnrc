import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { LegalPage } from "@/components/shared/legal-page";

export const metadata: Metadata = pageMetadata({
  title: "Política de Cookies",
  description:
    "Política de Cookies da Camacho & Nunes Recuperação de Crédito: categorias, finalidades e gestão de preferências.",
  path: "/politica-de-cookies",
});

export default function PoliticaCookiesPage() {
  return (
    <LegalPage title="Política de Cookies" eyebrow="Gestão de Preferências" updatedAt="19 de abril de 2026">
      <h2>1. O que são cookies</h2>
      <p>
        Cookies são pequenos ficheiros de texto armazenados no seu dispositivo quando visita um sítio da internet. Permitem reconhecer o utilizador, memorizar preferências e produzir estatísticas de utilização.
      </p>

      <h2>2. Categorias utilizadas</h2>
      <h3>Funcionais</h3>
      <p>
        Indispensáveis ao funcionamento básico do sítio, nomeadamente à navegação e à utilização de funcionalidades como formulários. Não podem ser desativadas.
      </p>
      <h3>Preferências</h3>
      <p>
        Permitem memorizar escolhas do utilizador para personalizar a experiência de navegação (por exemplo, idioma ou localização).
      </p>
      <h3>Estatísticas</h3>
      <p>
        Recolhem informação agregada e anónima sobre a utilização do sítio, ajudando-nos a melhorar os conteúdos e a experiência. Só são ativadas mediante consentimento.
      </p>
      <h3>Marketing</h3>
      <p>
        Utilizadas para apresentar conteúdo institucional relevante em plataformas de terceiros. Só são ativadas mediante consentimento expresso.
      </p>

      <h2>3. Gestão de preferências</h2>
      <p>
        Pode, a qualquer momento, alterar as suas preferências através do banner de consentimento exibido na primeira visita. A sua escolha é registada localmente e respeitada nas visitas subsequentes.
      </p>

      <h2>4. Cookies de terceiros</h2>
      <p>
        Alguns cookies podem ser instalados por serviços externos (p. ex., plataformas de análise). Esses serviços processam dados de acordo com as respetivas políticas de privacidade, sempre em conformidade com o RGPD.
      </p>

      <h2>5. Contacto</h2>
      <p>
        Para esclarecimentos adicionais, contacte-nos através dos canais indicados na nossa Política de Privacidade.
      </p>
    </LegalPage>
  );
}
