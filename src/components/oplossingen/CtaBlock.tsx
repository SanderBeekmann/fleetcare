import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function CtaBlock() {
  return (
    <section className="cta-klaar-om-te-starten py-section bg-neutral-900 text-white">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2
            className="text-3xl font-bold text-white md:text-4xl"
            data-reveal="fade-up"
          >
            Klaar om te starten?
          </h2>
          <p
            className="mt-4 text-neutral-300"
            data-reveal="fade-up"
            data-delay="0.05"
          >
            Neem contact op voor een vrijblijvend gesprek of een demo op maat.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4" data-reveal="fade-up">
            <Button variant="primary" href="/contact" className="btn-cta-contact">
              Contact opnemen
            </Button>
            <Button variant="secondary" href="/oplossingen#standaard">
              Bekijk plannen
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
