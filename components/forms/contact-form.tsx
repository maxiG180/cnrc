"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Paperclip, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { submitContactForm } from "@/app/api/contact/action";

const schema = z.object({
  name: z.string().min(2, "Por favor indique o seu nome."),
  email: z.string().email("Email inválido."),
  phone: z.string().optional(),
  subject: z.string().min(2, "Indique um assunto."),
  message: z.string().min(10, "Mensagem demasiado curta (mín. 10 caracteres)."),
  website: z.string().max(0, "Honeypot").optional(),
  consent: z.literal(true, { errorMap: () => ({ message: "Tem de aceitar a política de privacidade." }) }),
});

type FormValues = z.infer<typeof schema>;

const ALLOWED_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { consent: undefined as unknown as true },
  });

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setFileError(null);
    if (!file) { setSelectedFile(null); return; }

    if (file.size > MAX_SIZE) {
      setFileError("Ficheiro demasiado grande (máx. 5 MB).");
      setSelectedFile(null);
      e.target.value = "";
      return;
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      setFileError("Tipo não suportado. Use PDF, JPG, PNG ou Word.");
      setSelectedFile(null);
      e.target.value = "";
      return;
    }
    setSelectedFile(file);
  }

  function clearFile() {
    setSelectedFile(null);
    setFileError(null);
    if (fileRef.current) fileRef.current.value = "";
  }

  async function onSubmit(values: FormValues) {
    if (fileError) return;
    setStatus("sending");
    try {
      const fd = new FormData();
      fd.append("name", values.name);
      fd.append("email", values.email);
      if (values.phone) fd.append("phone", values.phone);
      fd.append("subject", values.subject);
      fd.append("message", values.message);
      if (selectedFile) fd.append("attachment", selectedFile);

      const result = await submitContactForm(fd);
      if (result.ok) {
        setStatus("ok");
        reset();
        clearFile();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="border border-[color:var(--color-gold)] bg-[color:var(--color-bone-soft)] p-8">
        <p className="eyebrow text-[color:var(--color-gold-dim)]">Mensagem recebida</p>
        <h3 className="mt-3">Obrigado pelo seu contacto.</h3>
        <p className="mt-4 text-[color:var(--color-ink)]/80">
          Iremos responder com a maior brevidade possível. Para assuntos urgentes, poderá ainda ligar-nos para <strong>800 080 000</strong> (chamada gratuita).
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] opacity-0 pointer-events-none"
        {...register("website")}
      />

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Nome" error={errors.name?.message}>
          <Input type="text" autoComplete="name" {...register("name")} />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <Input type="email" autoComplete="email" {...register("email")} />
        </Field>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Telefone (opcional)" error={errors.phone?.message}>
          <Input type="tel" autoComplete="tel" {...register("phone")} />
        </Field>
        <Field label="Assunto" error={errors.subject?.message}>
          <Input type="text" {...register("subject")} />
        </Field>
      </div>

      <Field label="Mensagem" error={errors.message?.message}>
        <Textarea rows={6} {...register("message")} />
      </Field>

      {/* File attachment */}
      <div>
        <span className="block text-[0.7rem] tracking-[0.2em] uppercase text-[color:var(--color-stone-dark)] mb-2">
          Anexar documento (opcional)
        </span>
        <div className="flex items-center gap-3">
          <label
            htmlFor="file-upload"
            className="inline-flex cursor-pointer items-center gap-2 border border-dashed border-[color:var(--color-stone)]/60 px-4 py-2.5 text-sm text-[color:var(--color-ink)]/70 transition-colors hover:border-[color:var(--color-navy)] hover:text-[color:var(--color-navy)]"
          >
            <Paperclip className="h-4 w-4 shrink-0" />
            <span className="truncate max-w-[200px]">
              {selectedFile ? selectedFile.name : "Escolher ficheiro"}
            </span>
          </label>
          <input
            id="file-upload"
            ref={fileRef}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            className="sr-only"
            onChange={handleFileChange}
          />
          {selectedFile && (
            <button
              type="button"
              onClick={clearFile}
              aria-label="Remover ficheiro"
              className="text-[color:var(--color-stone-dark)] transition-colors hover:text-[color:var(--color-danger)]"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        {fileError && (
          <p className="mt-1 text-xs text-[color:var(--color-danger)]">{fileError}</p>
        )}
        <p className="mt-1.5 text-xs text-[color:var(--color-stone-dark)]">
          PDF, JPG, PNG ou Word — máx. 5 MB
        </p>
      </div>

      <label className="flex items-start gap-3 text-sm text-[color:var(--color-ink)]/80">
        <input type="checkbox" {...register("consent")} className="mt-1 h-4 w-4 accent-[color:var(--color-navy)]" />
        <span>
          Aceito a{" "}
          <a href="/politica-de-privacidade" className="underline decoration-[color:var(--color-gold)] underline-offset-2">
            política de privacidade
          </a>{" "}
          e o tratamento dos meus dados para resposta a este contacto.
        </span>
      </label>
      {errors.consent?.message && <p className="text-xs text-[color:var(--color-danger)]">{errors.consent.message}</p>}

      <Button type="submit" variant="solid" size="lg" disabled={status === "sending"} className="w-full sm:w-auto">
        {status === "sending" ? "A enviar…" : "Enviar mensagem"}
      </Button>

      {status === "error" && (
        <p className="text-sm text-[color:var(--color-danger)]">
          Não foi possível enviar a mensagem. Tente novamente ou contacte-nos por telefone.
        </p>
      )}
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-[0.7rem] tracking-[0.2em] uppercase text-[color:var(--color-stone-dark)] mb-2">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-[color:var(--color-danger)]">{error}</span>}
    </label>
  );
}
