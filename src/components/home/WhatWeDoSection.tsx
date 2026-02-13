import { Container } from "@/components/ui/Container";

/**
 * Sectie "Wat we doen" — full height, tekst onder de hero.
 */
export function WhatWeDoSection() {
  return (
    <section id="wat-we-doen" className="flex min-h-screen flex-col justify-center bg-white">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Linkergrid: tekst met gestaggerde reveal-animatie — data-card-anchor voor mobiele scroll-animatie */}
          <div className="flex flex-col justify-center pt-32 lg:pt-0" data-card-anchor>
            <h2
              className="text-3xl font-bold text-brand md:text-4xl"
              data-reveal="fade-up"
              data-delay="0"
            >
              Wat we doen
            </h2>
            <p
              className="mt-4 max-w-2xl text-lg text-neutral-600"
              data-reveal="fade-up"
              data-delay="0.08"
            >
              FleetCare Connect brengt uw wagenpark bij elkaar. Realtime tracking, 
              onderhoudsplanning en overzicht in één platform. Of u nu een handvol 
              voertuigen heeft of een grote vloot, wij maken het beheer eenvoudig.
            </p>
          </div>
          {/* Rechtergrid: leeg of toekomstige content */}
          <div className="hidden lg:block" aria-hidden />
        </div>
      </Container>
    </section>
  );
}
