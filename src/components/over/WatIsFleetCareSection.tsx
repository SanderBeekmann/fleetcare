"use client";

import { useStackedFixedSection } from "@/hooks/useStackedFixedSection";
import { Container } from "@/components/ui/Container";

/**
 * Wat is FleetCare Connect-sectie: 1 viewport hoog, wordt fixed wanneer de top de viewport bereikt.
 */
export function WatIsFleetCareSection() {
  const { slotRef, sectionRef, isFixed, slotHeight } = useStackedFixedSection();

  return (
    <div
      ref={slotRef}
      className="stacked-fixed-slot"
      style={slotHeight != null ? { height: `${slotHeight}px` } : undefined}
    >
      <div
        ref={sectionRef}
        data-stacked-section
        className={`stacked-fixed-section flex min-h-screen flex-col justify-center bg-neutral-50 ${isFixed ? "is-fixed" : ""}`}
        style={isFixed && slotHeight != null ? { height: `${slotHeight}px` } : undefined}
        {...(isFixed ? { "data-stacked-fixed": "true" } : {})}
      >
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:items-start">
            <div className="text-left">
              <h2
                className="text-2xl font-bold text-brand md:text-3xl"
                data-reveal="fade-up"
              >
                Wat is FleetCare Connect
              </h2>
            </div>
            <div>
              <p
                className="text-base leading-relaxed text-neutral-600"
                data-reveal="fade-up"
                data-delay="0.05"
              >
                FleetCare Connect (FCC) is hét centrale aftersalesplatform voor Light Electric Vehicles (LEV&apos;s). Wij brengen gecertificeerde servicepartners en LEV-gebruikers samen, om onderhoud, reparaties en pechhulp eenvoudig en betrouwbaar aan te bieden.
              </p>
              <h3
                className="mt-10 text-lg font-semibold text-brand"
                data-reveal="fade-up"
              >
                Met FCC kunt u:
              </h3>
              <ul
                className="mt-6 space-y-4 text-neutral-600 leading-relaxed"
                data-stagger="children"
                data-stagger-delay="0.06"
              >
                <li className="flex gap-4">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand" aria-hidden />
                  <span>In 1 minuut een aanvraag doen voor de oplossing die het beste bij uw situatie past</span>
                </li>
                <li className="flex gap-4">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand" aria-hidden />
                  <span>Een passende oplossing krijgen voor uw LEV-voertuig</span>
                </li>
                <li className="flex gap-4">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand" aria-hidden />
                  <span>Realtime statusupdates over uw aanvraag volgen</span>
                </li>
                <li className="flex gap-4">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand" aria-hidden />
                  <span>Profiteren van een landelijk netwerk aan gecertificeerde servicepartners</span>
                </li>
                <li className="flex gap-4">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand" aria-hidden />
                  <span>Dit allemaal beschikbaar in de FCC-app</span>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
