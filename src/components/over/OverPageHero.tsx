"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

/**
 * Vaste hero voor Over pagina + spacer. Bij scroll schuift de volgende sectie (Ons verhaal) eroverheen.
 */
export function OverPageHero() {
  return (
    <>
      <section
        id="over-hero"
        className="fixed inset-0 z-[1] flex min-h-screen flex-col justify-center bg-white py-20 md:py-24"
      >
        <Container>
          <p
            className="text-sm font-medium uppercase tracking-widest text-brand"
            data-reveal="fade-up"
            data-reveal-no-reverse
          >
            Over ons
          </p>
          <h1
            className="mt-4 text-3xl font-bold tracking-tight text-brand md:text-4xl lg:text-5xl"
            data-reveal="fade-up"
            data-delay="0.05"
            data-reveal-no-reverse
          >
            Het verhaal achter FleetCare Connect
          </h1>
          <p
            className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-900"
            data-reveal="fade-up"
            data-delay="0.1"
            data-reveal-no-reverse
          >
            Van onderzoeksresultaten in de LEV-branche tot één centraal platform
            dat aftersales sneller en eenvoudiger maakt.
          </p>
          <div className="mt-10" data-reveal="fade-up" data-delay="0.15" data-reveal-no-reverse>
            <Button variant="primary" href="/oplossingen">
              Bekijk oplossingen
            </Button>
          </div>
        </Container>
      </section>
      {/* Spacer: bij scroll schuift Ons verhaal over de hero */}
      <div className="h-screen w-full" aria-hidden />
    </>
  );
}
