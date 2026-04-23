import type { Metadata, Viewport } from "next";
import { Inter, Libre_Baskerville } from "next/font/google";
import "./globals.css";

import { LenisProvider } from "@/lib/lenis-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CookieBanner } from "@/components/cookie-banner";
import { WhatsappWidget } from "@/components/shared/whatsapp-widget";
import { JsonLd, localBusinessSchema } from "@/lib/schema-org";
import { siteUrl } from "@/lib/metadata";
import { company } from "@/content/shared/company-info";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${company.shortName} Recuperação de Crédito — ${company.tagline}`,
    template: `%s | ${company.shortName} Recuperação de Crédito`,
  },
  description:
    "Sociedade portuguesa especializada em recuperação de crédito desde 2016. Atuação em Portugal e em todo o espaço Schengen, com meios operacionais próprios incluindo helicóptero.",
  keywords: [
    "recuperação de crédito",
    "arrestos",
    "execuções",
    "diligências judiciais",
    "insolvência",
    "peritagem judicial",
    "Camacho Nunes",
    "CNRC",
    "Montijo",
    "Portugal",
  ],
  authors: [{ name: "Framax Solutions", url: "https://framaxsolutions.com" }],
  creator: "Framax Solutions",
  openGraph: {
    type: "website",
    locale: "pt_PT",
    siteName: company.legalName,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#0F1B2D",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-PT" className={`${inter.variable} ${libreBaskerville.variable}`}>
      <head>
        <JsonLd data={localBusinessSchema()} />
      </head>
      <body>
        <LenisProvider>
          <Header />
          <main id="main" className="min-h-[60vh]">
            {children}
          </main>
          <Footer />
          <CookieBanner />
        </LenisProvider>
        <WhatsappWidget />
      </body>
    </html>
  );
}
