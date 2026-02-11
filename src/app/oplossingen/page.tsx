import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PlanComparison } from "@/components/oplossingen/PlanComparison";
import { FaqSection } from "@/components/oplossingen/FaqSection";
import { CtaBlock } from "@/components/oplossingen/CtaBlock";

export const metadata: Metadata = {
  title: "Oplossingen",
  description:
    "Ontdek onze fleetmanagement oplossingen. Standaard, Smart en Enterprise voor elk type wagenpark.",
  openGraph: {
    title: "Oplossingen | FleetCare Connect",
    description:
      "Ontdek onze fleetmanagement oplossingen. Standaard, Smart en Enterprise voor elk type wagenpark.",
  },
  alternates: { canonical: "/oplossingen" },
};

export default function OplossingenPage() {
  return (
    <>
      <section className="border-b border-neutral-200 bg-neutral-50 py-16 md:py-20">
        <Container>
          <h1
            className="text-3xl font-bold text-neutral-900 md:text-4xl lg:text-5xl"
            data-reveal="fade-up"
          >
            Oplossingen
          </h1>
          <p
            className="mt-4 max-w-2xl text-lg text-neutral-600"
            data-reveal="fade-up"
            data-delay="0.05"
          >
            Kies het plan dat past bij uw wagenpark. Van eenvoudig tracken tot volledig maatwerk.
          </p>
        </Container>
      </section>

      <section className="py-section">
        <Container>
          <h2
            className="text-2xl font-bold text-neutral-900 md:text-3xl"
            data-reveal="fade-up"
          >
            Plan vergelijking
          </h2>
        </Container>
        <PlanComparison />
      </section>

      <FaqSection />
      <CtaBlock />
    </>
  );
}
