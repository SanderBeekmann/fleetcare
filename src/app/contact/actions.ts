"use server";

import { contactFormSchema, type ContactFormValues } from "@/lib/contactSchema";

export type ContactResult = { success: true } | { success: false; error: string };

export async function submitContactForm(data: ContactFormValues): Promise<ContactResult> {
  const parsed = contactFormSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: "Validatie mislukt." };
  }

  const { honeypot } = parsed.data;
  if (honeypot && honeypot.length > 0) {
    return { success: true };
  }

  return { success: true };
}
