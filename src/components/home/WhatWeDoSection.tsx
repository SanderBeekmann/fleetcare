import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { webportal } from "@/lib/company";

/**
 * Sectie "Wat we doen" — full height, tekst onder de hero.
 */
export function WhatWeDoSection() {
  return (
    <section
      id="wat-we-doen"
      className="surface-ambient flex flex-col justify-center py-section lg:min-h-screen lg:py-0"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left column: text with staggered reveal */}
          <div className="flex flex-col justify-center">
            <h2
              className="text-3xl font-bold text-brand sm:text-[33px] md:text-4xl"
              data-letter-stagger
              data-delay="0"
            >
              Wat we doen
            </h2>
            <p
              className="mt-4 max-w-2xl text-lg text-neutral-600"
              data-reveal="fade-up"
              data-delay="0.08"
            >
              FleetCare Connect ontzorgt u in het koppelen van uw LEV aan de best passende
              servicepartner bij u in de buurt, door heel Nederland.
            </p>
            <p
              className="mt-4 max-w-2xl text-lg text-neutral-600"
              data-reveal="fade-up"
              data-delay="0.08"
            >
              Behoefte, voertuig informatie, matching met service partner en (primaire) diagnose
              voor de best match staan bij FleetCare Connect centraal. Dit alles om uw operatie zo
              efficiënt mogelijk te laten verlopen. Wij hebben een oplossing voor iedere vloot
              grootte.
            </p>
            <div className="mt-8" data-reveal="fade-up" data-delay="0.12">
              <Button variant="secondary" href={webportal.href} className="!bg-white">
                Naar het webportaal
              </Button>
            </div>
          </div>
          {/* Rechtergrid: leeg of toekomstige content */}
          <div className="hidden lg:block" aria-hidden />
        </div>
      </Container>
    </section>
  );
}
