"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormValues } from "@/lib/contactSchema";
import { submitContactForm } from "@/app/contact/actions";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
      honeypot: "",
    },
  });

  async function onSubmit(data: ContactFormValues) {
    setSubmitStatus("idle");
    const result = await submitContactForm(data);
    if (result.success) {
      setSubmitStatus("success");
      reset();
    } else {
      setSubmitStatus("error");
    }
  }

  if (submitStatus === "success") {
    return (
      <div className="mx-auto max-w-md rounded-lg border border-green-200 bg-green-50 p-6 text-center">
        <p className="font-medium text-green-800">Bedankt voor uw bericht.</p>
        <p className="mt-1 text-sm text-green-700">
          We nemen zo snel mogelijk contact met u op.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-lg space-y-4"
    >
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium text-neutral-700">
          Naam *
        </label>
        <input
          id="name"
          type="text"
          {...register("name")}
          className="w-full rounded-md border border-neutral-300 px-3 py-2 text-neutral-900 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          autoComplete="name"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600" role="alert">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-neutral-700">
          E-mail *
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          className="w-full rounded-md border border-neutral-300 px-3 py-2 text-neutral-900 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          autoComplete="email"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="company" className="mb-1 block text-sm font-medium text-neutral-700">
          Bedrijf
        </label>
        <input
          id="company"
          type="text"
          {...register("company")}
          className="w-full rounded-md border border-neutral-300 px-3 py-2 text-neutral-900 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          autoComplete="organization"
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-neutral-700">
          Bericht *
        </label>
        <textarea
          id="message"
          rows={4}
          {...register("message")}
          className="w-full rounded-md border border-neutral-300 px-3 py-2 text-neutral-900 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600" role="alert">
            {errors.message.message}
          </p>
        )}
      </div>

      <div className="absolute -left-[9999px] opacity-0" aria-hidden>
        <label htmlFor="honeypot">Niet invullen</label>
        <input id="honeypot" type="text" {...register("honeypot")} tabIndex={-1} />
      </div>

      {submitStatus === "error" && (
        <p className="text-sm text-red-600" role="alert">
          Er ging iets mis. Probeer het later opnieuw.
        </p>
      )}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Versturen…" : "Verstuur"}
      </Button>
    </form>
  );
}
