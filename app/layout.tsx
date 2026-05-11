import type { Metadata, Viewport } from "next";
import { Inter, Libre_Baskerville } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import "./globals.css";

import { LenisProvider } from "@/lib/lenis-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CookieBanner } from "@/components/cookie-banner";
import { WhatsappWidget } from "@/components/shared/whatsapp-widget";
import { ScrollToTop } from "@/components/scroll-to-top";
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
    default: `${company.shortName} Credit Recovery`,
    template: `%s | ${company.shortName} Credit Recovery`,
  },
  description:
    "Portuguese firm specialized in credit recovery since 2016. Operating across Portugal and the Schengen area with fully owned operational resources, including a helicopter.",
  keywords: [
    "credit recovery",
    "seizures",
    "enforcement",
    "judicial procedures",
    "insolvency",
    "judicial expertise",
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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const messages = await getMessages();
  const htmlLang = locale === "en" ? "en" : "pt-PT";

  return (
    <html lang={htmlLang} className={`${inter.variable} ${libreBaskerville.variable}`}>
      <head>
        <JsonLd data={localBusinessSchema()} />
      </head>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <LenisProvider>
            <ScrollToTop />
            <Header />
            <main id="main" className="min-h-[60vh] pt-[96px]">
              {children}
            </main>
            <Footer />
            <CookieBanner />
          </LenisProvider>
          <WhatsappWidget />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
