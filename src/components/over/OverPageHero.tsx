import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

/**
 * Hero voor Over pagina.
 */
export function OverPageHero() {
  return (
    <>
      <section
        id="over-hero"
        className="relative z-[1] flex min-h-screen flex-col justify-center bg-white py-20 md:fixed md:inset-0 md:py-24"
      >
        <Container>
          <p
            className="text-sm font-medium uppercase tracking-widest text-brand"
            data-reveal="fade-up"
            data-reveal-no-reverse
          >
            Over ons
          </p>
          <h1
            className="mt-4 text-3xl font-bold tracking-tight text-brand sm:text-[34px] md:text-4xl lg:text-5xl"
            data-delay="0.05"
            data-reveal-no-reverse
          >
            <span className="block" data-letter-stagger>
              Het verhaal achter
            </span>
            <span className="block" data-letter-stagger>
              FleetCare Connect
            </span>
          </h1>
          <p
            className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-900"
            data-reveal="fade-up"
            data-delay="0.1"
            data-reveal-no-reverse
          >
            Van eigen onderzoek naar de LEV branche, tot een nationaal gecentraliseerd aftersales
            platform om aftersales efficiënter en eenvoudiger aan te kunnen bieden voor Light
            Electric Vehicles.
          </p>
          <div className="mt-10" data-reveal="fade-up" data-delay="0.15" data-reveal-no-reverse>
            <Button variant="primary" href="/oplossingen">
              Bekijk oplossingen
            </Button>
          </div>
        </Container>
      </section>
      {/* Spacer: duwt content onder de fixed hero op desktop */}
      <div className="hidden h-screen w-full md:block" aria-hidden />
    </>
  );
}
