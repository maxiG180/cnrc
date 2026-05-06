"use server";

export async function submitContactForm(formData: FormData): Promise<{ ok: boolean }> {
  // PHASE 1 STUB: log and return success.
  // PHASE 2: wire Resend → geral@cnrc.pt, add rate limiting and reCAPTCHA.
  if (process.env.NODE_ENV !== "production") {
    const attachment = formData.get("attachment") as File | null;
    console.log("[contact-form]", {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      subject: formData.get("subject"),
      message: formData.get("message"),
      attachment: attachment?.size ? `${attachment.name} (${(attachment.size / 1024).toFixed(1)} KB)` : null,
    });
  }
  await new Promise((r) => setTimeout(r, 400));
  return { ok: true };
}
