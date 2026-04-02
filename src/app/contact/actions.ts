"use server";

import { contactFormSchema, type ContactFormValues } from "@/lib/contactSchema";

export type ContactResult = { success: true } | { success: false; error: string };

export async function submitContactForm(data: ContactFormValues): Promise<ContactResult> {
  const parsed = contactFormSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: "Validatie mislukt." };
  }

  const { honeypot, ...rest } = parsed.data;
  if (honeypot && honeypot.length > 0) {
    return { success: true };
  }

  const body = new URLSearchParams({
    "form-name": "contact",
    name: rest.name,
    email: rest.email,
    company: rest.company ?? "",
    message: rest.message,
  });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.URL ?? "http://localhost:3000";

  const res = await fetch(`${siteUrl}/__forms.html`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (!res.ok) {
    return { success: false, error: "Verzenden mislukt. Probeer het later opnieuw." };
  }

  return { success: true };
}
