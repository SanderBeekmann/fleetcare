"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getCookieConsent, setCookieConsent } from "@/lib/cookieConsent";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function CookieBanner() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const consent = getCookieConsent();
    setVisible(!consent?.accepted);
  }, [mounted]);

  function handleAccept() {
    setCookieConsent({
      accepted: true,
      necessary: true,
      analytics: true,
      marketing: false,
    });
    setVisible(false);
  }

  function handleDecline() {
    setCookieConsent({
      accepted: true,
      necessary: true,
      analytics: false,
      marketing: false,
    });
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-neutral-200 bg-white shadow-lg"
      role="dialog"
      aria-label="Cookievoorkeuren"
    >
      <Container className="py-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-neutral-600">
            Wij gebruiken cookies om onze website te verbeteren en het gebruik te analyseren.
            <Link href="/privacy" className="ml-1 underline hover:text-brand">
              Meer informatie
            </Link>
          </p>
          <div className="flex shrink-0 gap-3">
            <Button
              variant="secondary"
              className="text-sm"
              onClick={handleDecline}
            >
              Alleen noodzakelijk
            </Button>
            <Button
              variant="primary"
              className="text-sm"
              onClick={handleAccept}
            >
              Alles accepteren
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
