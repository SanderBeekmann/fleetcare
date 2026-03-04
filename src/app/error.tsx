"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // TODO: Sentry.captureException(error) wordt toegevoegd in Fase 4
    console.error("Onverwachte fout:", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h2 className="mb-4 text-2xl font-bold text-neutral-900">Er is iets misgegaan</h2>
      <p className="mb-6 max-w-md text-neutral-600">
        Er is een onverwachte fout opgetreden. Probeer het opnieuw of neem contact met ons op als
        het probleem aanhoudt.
      </p>
      <Button variant="primary" onClick={reset}>
        Opnieuw proberen
      </Button>
    </div>
  );
}
