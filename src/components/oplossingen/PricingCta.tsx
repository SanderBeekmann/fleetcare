import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

/** Afsluitende CTA op de prijspagina: 'Wat kost het voor uw vloot?' */
export function PricingCta() {
  return (
    <section className="pricing-cta surface-portal brand-watermark py-section text-white [--wm-bottom:0px] [--wm-width:clamp(140px,14vw,200px)]">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <h2
              className="text-4xl font-light uppercase leading-tight tracking-tight text-white md:text-5xl"
              data-letter-stagger
            >
              Wat kost het voor uw vloot?
            </h2>
            <p
              className="mt-4 text-base text-white/90 lg:text-lg"
              data-reveal="fade-up"
              data-delay="0.05"
            >
              Plan een vrijblijvend gesprek. We denken met u mee en sturen een voorstel op maat.
            </p>
          </div>
          <div className="flex flex-wrap gap-4" data-reveal="fade-up">
            <Button variant="secondary" href="/contact">
              Neem contact op met sales
            </Button>
            <Button variant="secondary" href="/contact">
              Plan een demo
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
