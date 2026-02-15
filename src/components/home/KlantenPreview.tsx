import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { TestimonialCarousel } from "./TestimonialCarousel";

export function KlantenPreview() {
  return (
    <section className="py-24 bg-neutral-100 md:py-32">
      <Container>
        <h2
          className="text-3xl font-bold text-brand md:text-4xl"
          data-letter-stagger
        >
          Wat klanten zeggen
        </h2>
        <p
          className="mt-3 max-w-2xl text-neutral-600"
          data-reveal="fade-up"
          data-delay="0.05"
        >
          Ontdek hoe andere ondernemers FleetCare Connect inzetten.
        </p>
        <div className="mt-10" data-reveal="fade-up" data-delay="0.1">
          <TestimonialCarousel />
        </div>
        <div className="mt-10 text-center" data-reveal="fade-up">
          <Button variant="secondary" href="/klanten">
            Meer klantverhalen
          </Button>
        </div>
      </Container>
    </section>
  );
}
