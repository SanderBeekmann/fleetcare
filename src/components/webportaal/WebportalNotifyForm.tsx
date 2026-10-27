"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Laat een e-mailadres achter voor een melding bij livegang. Gaat via het bestaande
 * Netlify-formulier "contact", zodat het in dezelfde mailbox landt als contactaanvragen.
 */
export function WebportalNotifyForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!EMAIL_PATTERN.test(email.trim())) {
      setError("Voer een geldig e-mailadres in");
      return;
    }
    setError(null);
    setStatus("submitting");

    const body = new URLSearchParams({
      "form-name": "contact",
      name: "Aanmelding webportaal",
      email: email.trim(),
      company: "",
      message: "Graag een melding wanneer het FleetCare Connect-webportaal live gaat.",
    });

    try {
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="text-sm font-medium text-brand" role="status">
        Bedankt. We laten het u weten zodra het webportaal live is.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="max-w-lg">
      <label htmlFor="webportal-email" className="mb-1 block text-sm font-medium text-neutral-700">
        Ontvang een melding bij livegang
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="webportal-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Bijv. jan@bedrijf.nl"
          autoComplete="email"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "webportal-email-error" : undefined}
          className="w-full rounded-md border border-neutral-300 bg-neutral-100 px-3 py-2 text-neutral-900 placeholder:text-neutral-400 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
        />
        <Button
          type="submit"
          variant="secondary"
          disabled={status === "submitting"}
          className="shrink-0"
        >
          {status === "submitting" ? "Versturen…" : "Houd mij op de hoogte"}
        </Button>
      </div>
      {error && (
        <p id="webportal-email-error" className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      {status === "error" && (
        <p className="mt-1 text-sm text-red-600" role="alert">
          Er ging iets mis. Probeer het later opnieuw.
        </p>
      )}
    </form>
  );
}
