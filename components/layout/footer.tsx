import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { company } from "@/content/shared/company-info";
import { footerLinks, mainNav } from "@/content/shared/nav";
import { formatPhoneHref } from "@/lib/utils";
import { Container } from "@/components/shared/container";

export function Footer() {
  return (
    <footer className="bg-[color:var(--color-navy-deep)] text-[color:var(--color-bone)]">
      <Container size="wide" className="pt-12 pb-16 md:pt-16 md:pb-24">
        <div className="grid gap-12 lg:grid-cols-12 text-center lg:text-left">
          <div className="lg:col-span-3 flex flex-col items-center lg:items-start">
            <p className="eyebrow text-[color:var(--color-gold)]">Contactos</p>
            <div className="mt-5 space-y-2 text-sm">
              <div className="flex flex-row md:flex-col gap-4 md:gap-2 justify-center lg:justify-start">
                <a
                  href={formatPhoneHref(company.phones.free)}
                  className="flex items-center gap-2 hover:text-[color:var(--color-gold-bright)] transition-colors"
                >
                  <Phone className="h-4 w-4 text-[color:var(--color-gold)] shrink-0" />
                  <span className="font-medium text-xs md:text-sm whitespace-nowrap">{company.phones.free}</span>
                </a>
                <a href={`mailto:${company.email}`} className="flex items-center gap-2 hover:text-[color:var(--color-gold-bright)] transition-colors">
                  <Mail className="h-4 w-4 text-[color:var(--color-gold)] shrink-0" />
                  <span className="break-all text-xs md:text-sm">{company.email}</span>
                </a>
              </div>
              <div className="flex items-start gap-2 justify-center lg:justify-start">
                <MapPin className="mt-0.5 h-4 w-4 text-[color:var(--color-gold)] shrink-0" />
                <span className="text-xs leading-relaxed">
                  {company.address.street}, {company.address.postal} {company.address.city}
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <p className="eyebrow text-[color:var(--color-gold)]">Navegação</p>
            <ul className="mt-5 space-y-2.5 text-sm">
              <li>
                <Link href="/sobre-nos" className="text-[color:var(--color-bone)]/80 hover:text-[color:var(--color-gold-bright)] transition-colors">
                  Quem Somos
                </Link>
              </li>
              <li>
                <Link href="/imobiliario" className="text-[color:var(--color-bone)]/80 hover:text-[color:var(--color-gold-bright)] transition-colors">
                  Imobiliário
                </Link>
              </li>
              <li>
                <Link href="/tv-direto" className="text-[color:var(--color-bone)]/80 hover:text-[color:var(--color-gold-bright)] transition-colors">
                  TV Direto
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="eyebrow text-[color:var(--color-gold)]">Diligências Judiciais</p>
            <ul className="mt-5 space-y-2.5 text-sm">
              <li>
                <Link href="/diligencias/com-arrombamento" className="text-[color:var(--color-bone)]/80 hover:text-[color:var(--color-gold-bright)] transition-colors">
                  Com Arrombamento
                </Link>
              </li>
              <li>
                <Link href="/diligencias/com-o-nosso-helicoptero" className="text-[color:var(--color-bone)]/80 hover:text-[color:var(--color-gold-bright)] transition-colors">
                  Com Helicóptero
                </Link>
              </li>
              <li>
                <Link href="/diligencias/especiais" className="text-[color:var(--color-bone)]/80 hover:text-[color:var(--color-gold-bright)] transition-colors">
                  Especiais
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="eyebrow text-[color:var(--color-gold)]">Recursos</p>
            <ul className="mt-5 space-y-2.5 text-sm">
              <li>
                <Link href="/noticias-em-destaque" className="text-[color:var(--color-bone)]/80 hover:text-[color:var(--color-gold-bright)] transition-colors">
                  Notícias
                </Link>
              </li>
              <li>
                <Link href="/contactos" className="text-[color:var(--color-bone)]/80 hover:text-[color:var(--color-gold-bright)] transition-colors">
                  Contactos
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="eyebrow text-[color:var(--color-gold)]">Escritórios</p>
            <ul className="mt-5 space-y-2 text-sm text-[color:var(--color-bone)]/80">
              {company.offices.map((o) => (
                <li key={o.slug}>{o.name}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-[color:var(--color-bone)]/10 pt-8 flex flex-col gap-8 md:flex-row md:items-center md:justify-between text-xs text-[color:var(--color-bone)]/60 items-center md:items-start text-center md:text-left">
          <div className="flex flex-col gap-2 md:flex-row md:gap-0">
            <span>© {new Date().getFullYear()} Camacho Nunes Recuperação de Crédito</span>
            <span className="md:before:content-['_·_']">
              Desenvolvido por{" "}
              <Link href="https://framaxsolutions.com" target="_blank" rel="noopener" className="text-[color:var(--color-gold-bright)] hover:underline">
                Framax Solutions
              </Link>
            </span>
          </div>
          <ul className="flex flex-wrap gap-x-8 gap-y-3 justify-center md:justify-start">
            {footerLinks.map((l) =>
              "external" in l && l.external ? (
                <li key={l.href}>
                  <a href={l.href} target="_blank" rel="noopener" className="hover:text-[color:var(--color-gold-bright)] transition-colors">
                    {l.label}
                  </a>
                </li>
              ) : (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-[color:var(--color-gold-bright)] transition-colors">
                    {l.label}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
