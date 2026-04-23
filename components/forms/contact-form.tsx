"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { consent: undefined as unknown as true },
  });

  async function onSubmit(values: FormValues) {
    setStatus("sending");
    try {
      const result = await submitContactForm({
        name: values.name,
        email: values.email,
        phone: values.phone,
        subject: values.subject,
        message: values.message,
      });
      if (result.ok) {
        setStatus("ok");
        reset();
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
