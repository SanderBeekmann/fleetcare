"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import daanImg from "@/assets/Daan.webp";
import simonImg from "@/assets/Simon.webp";

/**
 * Ons verhaal-sectie (statisch, geen stacking).
 */
export function OverStackedSection() {
  return (
    <section className="flex min-h-screen flex-col justify-center border-t border-brand bg-white py-16 md:py-0">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div className="grid grid-cols-2 gap-3">
            <div className="relative aspect-[4/5] overflow-hidden" data-reveal="fade-left">
              <Image
                src={daanImg}
                alt="Daan — Co-founder FleetCare Connect"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="space-y-3">
              <div className="relative aspect-[4/3] overflow-hidden" data-reveal="fade-down">
                <Image
                  src={simonImg}
                  alt="Simon — Co-founder FleetCare Connect"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div
                className="flex aspect-[4/3] items-center justify-center bg-brand p-4"
                data-reveal="fade-up"
                data-delay="0.1"
              >
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
    </section>
  );
}
