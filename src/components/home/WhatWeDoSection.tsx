import { Container } from "@/components/ui/Container";

/**
 * Sectie "Wat we doen" — full height, tekst onder de hero.
 */
export function WhatWeDoSection() {
  return (
    <section id="wat-we-doen" className="flex min-h-screen flex-col justify-center bg-white">
      <Container>
        <h2
          className="text-3xl font-bold text-neutral-900 md:text-4xl"
          data-reveal="fade-up"
        >
          Wat we doen
        </h2>
        <p
          className="mt-4 max-w-2xl text-lg text-neutral-600"
          data-reveal="fade-up"
          data-delay="0.1"
        >
          FleetCare Connect brengt uw wagenpark bij elkaar. Realtime tracking, 
          onderhoudsplanning en overzicht in één platform. Of u nu een handvol 
          voertuigen heeft of een grote vloot, wij maken het beheer eenvoudig.
        </p>
      </Container>
    </section>
  );
}
