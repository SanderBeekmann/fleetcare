import { Container } from "@/components/ui/Container";
import { PricingCards } from "@/components/pricing/PricingCards";
import { ServicePartnerBand } from "@/components/pricing/ServicePartnerBand";

export function PlansOverview() {
  return (
    <section
      id="plannen"
      className="surface-brand brand-watermark pb-44 pt-section [--wm-bottom:7rem] md:pb-52 md:[--wm-bottom:9rem]"
    >
      <Container>
        <h2 className="text-3xl font-bold text-white md:text-4xl" data-letter-stagger>
          Kies het plan dat bij
          <br /> uw organisatie past
        </h2>
        <p className="mt-4 max-w-2xl text-white/90" data-reveal="fade-up" data-delay="0.05">
          Start direct met de essentiële versie, of laat ons het platform inrichten op uw
          organisatie. U betaalt alleen voor wat u echt gebruikt.
        </p>
        <div className="mt-10">
          <PricingCards />
        </div>
        <ServicePartnerBand className="mt-6" />
      </Container>
    </section>
  );
}
