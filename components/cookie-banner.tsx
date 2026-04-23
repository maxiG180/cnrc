"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Consent = {
  funcional: true;
  preferencias: boolean;
  estatisticas: boolean;
  marketing: boolean;
};

const STORAGE_KEY = "cnrc.cookie-consent.v1";

function loadConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Consent) : null;
  } catch {
    return null;
  }
}

function saveConsent(c: Consent) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(c));
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [settings, setSettings] = useState(false);
  const [prefs, setPrefs] = useState({ preferencias: false, estatisticas: false, marketing: false });

  useEffect(() => {
    const existing = loadConsent();
    if (!existing) setVisible(true);
  }, []);

  if (!visible) return null;

  const accept = (full: boolean) => {
    const c: Consent = {
      funcional: true,
      preferencias: full ? true : prefs.preferencias,
      estatisticas: full ? true : prefs.estatisticas,
      marketing: full ? true : prefs.marketing,
    };
    saveConsent(c);
    setVisible(false);
  };

  const reject = () => {
    saveConsent({ funcional: true, preferencias: false, estatisticas: false, marketing: false });
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-label="Consentimento de cookies"
      className="fixed bottom-4 left-4 right-4 z-[80] md:left-auto md:right-6 md:bottom-6 md:max-w-md"
    >
      <div className="bg-[color:var(--color-navy)] text-[color:var(--color-bone)] shadow-[var(--shadow-strong)] p-6">
        <p className="eyebrow text-[color:var(--color-gold)]">Cookies</p>
        <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-bone)]/85">
          Utilizamos cookies para melhorar a sua experiência, analisar o desempenho do site e apresentar conteúdo relevante. Pode aceitar todos ou escolher as suas preferências.{" "}
          <Link href="/politica-de-cookies" className="underline underline-offset-2 text-[color:var(--color-gold-bright)]">
            Ler política
          </Link>
          .
        </p>

        {settings && (
          <ul className="mt-5 space-y-2 text-sm">
            <CategoryRow label="Funcional" checked disabled description="Essenciais ao funcionamento do site" />
            <CategoryRow
              label="Preferências"
              checked={prefs.preferencias}
              onChange={(v) => setPrefs((p) => ({ ...p, preferencias: v }))}
            />
            <CategoryRow
              label="Estatísticas"
              checked={prefs.estatisticas}
              onChange={(v) => setPrefs((p) => ({ ...p, estatisticas: v }))}
            />
            <CategoryRow
              label="Marketing"
              checked={prefs.marketing}
              onChange={(v) => setPrefs((p) => ({ ...p, marketing: v }))}
            />
          </ul>
        )}

        <div className="mt-5 flex flex-wrap gap-2">
          <button
            onClick={() => accept(true)}
            className="bg-[color:var(--color-gold)] text-[color:var(--color-navy-deep)] px-4 py-2.5 text-xs uppercase tracking-wider font-medium hover:bg-[color:var(--color-gold-bright)]"
          >
            Aceitar todos
          </button>
          <button
            onClick={reject}
            className="border border-[color:var(--color-bone)]/30 px-4 py-2.5 text-xs uppercase tracking-wider hover:border-[color:var(--color-gold)]"
          >
            Rejeitar
          </button>
          <button
            onClick={() => (settings ? accept(false) : setSettings(true))}
            className="ml-auto text-xs uppercase tracking-wider underline underline-offset-4 hover:text-[color:var(--color-gold-bright)]"
          >
            {settings ? "Guardar preferências" : "Preferências"}
          </button>
        </div>
      </div>
    </div>
  );
}

function CategoryRow({
  label,
  checked,
  disabled,
  description,
  onChange,
}: {
  label: string;
  checked: boolean;
  disabled?: boolean;
  description?: string;
  onChange?: (v: boolean) => void;
}) {
  return (
    <li className="flex items-center justify-between border-t border-[color:var(--color-bone)]/10 pt-2">
      <div>
        <p className="text-sm">{label}</p>
        {description && <p className="text-[11px] text-[color:var(--color-bone)]/55">{description}</p>}
      </div>
      <label className={cn("relative inline-flex h-5 w-9 cursor-pointer items-center", disabled && "opacity-50 cursor-not-allowed")}>
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.checked)}
        />
        <span className="absolute inset-0 bg-[color:var(--color-bone)]/15 peer-checked:bg-[color:var(--color-gold)] transition-colors" />
        <span className="absolute left-0.5 top-0.5 h-4 w-4 bg-[color:var(--color-bone)] transition-transform peer-checked:translate-x-4" />
      </label>
    </li>
  );
}
