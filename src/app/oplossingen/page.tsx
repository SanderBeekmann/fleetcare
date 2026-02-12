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
      <section className="border-b border-neutral-200 bg-white py-16 md:py-20">
        <Container>
          <h1
            className="text-3xl font-bold text-brand md:text-4xl lg:text-5xl"
            data-reveal="fade-up"
          >
            Oplossingen
          </h1>
          <p
            className="mt-4 max-w-2xl text-lg text-neutral-600"
            data-reveal="fade-up"
            data-delay="0.05"
          >
            Wij bieden een oplossing voor elke LEV vloot. Van een complete oplossing voor minimale downtime, tot service alleen wanneer u het nodig heeft. Voor iedere behoefte, heeft FleetCare Connect een oplossing.
          </p>
        </Container>
      </section>

      <section className="bg-white py-section">
        <Container>
          <div
            className="mb-16 grid gap-8 lg:grid-cols-[1fr_2fr] lg:items-start"
            data-reveal="fade-up"
          >
            <div>
              <h2 className="text-4xl font-bold text-neutral-900 md:text-5xl">
                Eerlijke prijzen
              </h2>
            </div>
            <p className="max-w-2xl text-base text-neutral-600 lg:text-lg">
              Kies het plan dat past bij uw wagenpark. Van eenvoudig tracken tot
              volledig maatwerk. Klein- en grootbedrijven doen meer met
              FleetCare Connect.
            </p>
          </div>
        </Container>
        <PlanComparison />
      </section>

      <FaqSection />
      <CtaBlock />
    </>
  );
}
