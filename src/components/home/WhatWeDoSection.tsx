import { Container } from "@/components/ui/Container";

/**
 * Sectie "Wat we doen" — full height, inhoud voor na de hero slideshow.
 */
export function WhatWeDoSection() {
  return (
    <section id="wat-we-doen" className="flex min-h-screen flex-col justify-center bg-neutral-100">
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
        <ul
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          data-stagger="children"
        >
          {[
            {
              title: "Realtime tracking",
              text: "Zie waar uw voertuigen zijn en hoe ze worden ingezet.",
            },
            {
              title: "Onderhoud in beeld",
              text: "Plan onderhoud, ontvang meldingen en houd de historie bij.",
            },
            {
              title: "Eén overzicht",
              text: "Dashboard, rapportages en inzichten op één plek.",
            },
          ].map((item) => (
            <li
              key={item.title}
              className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm"
            >
              <h3 className="font-semibold text-neutral-900">{item.title}</h3>
              <p className="mt-2 text-sm text-neutral-600">{item.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
