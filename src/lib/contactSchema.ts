import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(1, "Naam is verplicht")
    .min(2, "Naam moet minimaal 2 tekens zijn"),
  email: z
    .string()
    .min(1, "E-mail is verplicht")
    .email("Voer een geldig e-mailadres in"),
  company: z.string().optional(),
  message: z
    .string()
    .min(1, "Bericht is verplicht")
    .min(10, "Bericht moet minimaal 10 tekens zijn"),
  honeypot: z.string().max(0).optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
