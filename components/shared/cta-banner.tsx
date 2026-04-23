import Link from "next/link";
import { Phone } from "lucide-react";
import { company } from "@/content/shared/company-info";
import { formatPhoneHref } from "@/lib/utils";
import { Container } from "./container";
import { cn } from "@/lib/utils";

export function CtaBanner({ className, compact }: { className?: string; compact?: boolean }) {
  return (
    <div className={cn("bg-[color:var(--color-navy)] text-[color:var(--color-bone)]", compact ? "py-10" : "py-16 md:py-24", className)}>
      <Container>
        <div className="flex flex-col items-center gap-6 md:flex-row md:items-center md:justify-between">
          <div className="text-center md:text-left">
            <p className="eyebrow text-[color:var(--color-gold)]">Chamada Gratuita</p>
            <h2 className="mt-3 text-[color:var(--color-bone)] text-3xl md:text-5xl">
              Juntos conseguimos recuperar<br />
              <span className="text-[color:var(--color-gold-bright)]">o seu crédito</span>
            </h2>
          </div>
          <div className="flex flex-col gap-3 w-full md:w-auto">
            <Link
              href={formatPhoneHref(company.phones.free)}
              className="inline-flex items-center justify-center gap-3 bg-[color:var(--color-gold)] px-8 py-4 md:px-10 text-[color:var(--color-navy-deep)] text-sm font-medium tracking-wide uppercase hover:bg-[color:var(--color-gold-bright)] transition-colors"
            >
              <Phone className="h-5 w-5 animate-[vibrate_0.3s_ease-in-out_infinite]" />
              {company.phones.free}
            </Link>
            <Link
              href="/contactos"
              className="inline-flex items-center justify-center gap-3 border border-[color:var(--color-bone)]/30 px-8 py-4 md:px-10 text-sm font-medium tracking-wide uppercase hover:border-[color:var(--color-gold)] hover:text-[color:var(--color-gold-bright)] transition-colors"
            >
              Falar com a nossa equipa
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
