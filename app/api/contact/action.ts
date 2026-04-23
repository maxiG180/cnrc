"use server";

type Payload = {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
};

export async function submitContactForm(payload: Payload): Promise<{ ok: boolean }> {
  // PHASE 1 STUB: log and return success.
  // PHASE 2: wire Resend → geral@cnrc.pt, add rate limiting and reCAPTCHA.
  if (process.env.NODE_ENV !== "production") {
    console.log("[contact-form]", payload);
  }
  await new Promise((r) => setTimeout(r, 400));
  return { ok: true };
}
