"use client";

import Image from "next/image";
import { useStackedFixedSection } from "@/hooks/useStackedFixedSection";
import { Container } from "@/components/ui/Container";
import daanImg from "@/assets/Daan.webp";
import simonImg from "@/assets/Simon.webp";

/**
 * Ons verhaal-sectie: wordt fixed wanneer de top de viewport bereikt, schuift zo over de hero.
 */
export function OverStackedSection() {
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
        className={`stacked-fixed-section flex min-h-screen flex-col justify-center border-t border-brand bg-white ${isFixed ? "is-fixed" : ""}`}
        style={isFixed && slotHeight != null ? { height: `${slotHeight}px` } : undefined}
        {...(isFixed ? { "data-stacked-fixed": "true" } : {})}
      >
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div className="grid grid-cols-2 gap-3" data-reveal="fade-up">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={daanImg}
                  alt="Daan — Co-founder FleetCare Connect"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="space-y-3">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={simonImg}
                    alt="Simon — Co-founder FleetCare Connect"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="flex aspect-[4/3] items-center justify-center bg-brand p-4">
                  <p className="text-center text-sm font-semibold leading-snug text-white">
                    Founders
                    <br />
                    FleetCare Connect
                  </p>
                </div>
              </div>
            </div>
            <div className="max-w-3xl text-left">
              <h2 className="text-2xl font-bold text-brand md:text-3xl" data-letter-stagger>
                Ons verhaal
              </h2>
              <p
                className="mt-6 text-base leading-relaxed text-neutral-600"
                data-reveal="fade-up"
                data-delay="0.05"
              >
                Aan de hand van de resultaten van een onderzoeksstage, ging er een belletje rinkelen
                rondom aftersales organisatie. Uit onderzoek bleek dat de aftersales voor de Light
                Electric vehicle-branche te wensen overliet. Op basis hiervan is FleetCare Connect
                opgezet om de elektrificering in Nederland écht te kunnen helpen.
              </p>
              <p
                className="mt-6 text-base leading-relaxed text-neutral-600"
                data-reveal="fade-up"
                data-delay="0.1"
              >
                Door ons centrale platform willen wij LEV-fleetowners en servicepartners
                samenbrengen om in iedere operatie downtime te minimaliseren. Dit, zonder complexe
                processen en eindeloze handmatige administratieve taken.
              </p>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
