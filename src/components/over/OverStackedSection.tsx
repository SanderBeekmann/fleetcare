"use client";

import { useStackedFixedSection } from "@/hooks/useStackedFixedSection";
import { Container } from "@/components/ui/Container";

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
        className={`stacked-fixed-section flex min-h-screen flex-col justify-center bg-white ${isFixed ? "is-fixed" : ""}`}
        style={isFixed && slotHeight != null ? { height: `${slotHeight}px` } : undefined}
        {...(isFixed ? { "data-stacked-fixed": "true" } : {})}
      >
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div
              className="grid grid-cols-2 gap-3"
              data-reveal="fade-up"
            >
              <div className="aspect-[4/5] bg-neutral-200" />
              <div className="space-y-3">
                <div className="aspect-[4/3] bg-neutral-200" />
                <div className="aspect-[4/3] bg-neutral-200" />
              </div>
            </div>
            <div className="max-w-3xl text-left">
              <h2
                className="text-2xl font-bold text-brand md:text-3xl"
                data-letter-stagger
              >
                Ons verhaal
              </h2>
              <p
                className="mt-6 text-base leading-relaxed text-neutral-600"
                data-reveal="fade-up"
                data-delay="0.05"
              >
                Aan de hand van resultaten van een van onze onderzoeksstages ging
                er een belletje rinkelen. Uit onderzoek bleek dat aftersales in
                de Light Electric Vehicle-branche te wensen overliet. Hiervoor is
                FleetCare Connect de juiste oplossing.
              </p>
              <p
                className="mt-6 text-base leading-relaxed text-neutral-600"
                data-reveal="fade-up"
                data-delay="0.1"
              >
                Door ons centrale platform willen wij LEV-gebruikers en
                servicepartners bij elkaar brengen om downtime zo veel mogelijk te
                reduceren en aftersales-afhandelingen zo snel mogelijk te laten
                verlopen, zonder complexe procedures.
              </p>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
