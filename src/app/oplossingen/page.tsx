import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
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
      <section className="relative flex min-h-[calc(100vh-64px)] flex-col bg-white py-16 md:py-20">
        <div className="flex flex-1 flex-col justify-center">
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
            <div className="mt-8" data-reveal="fade-up" data-delay="0.1">
              <Button variant="secondary" href="#eerlijke-prijzen">
                Bekijk prijzen
              </Button>
            </div>
          </Container>
        </div>
        <a
          href="#eerlijke-prijzen"
          className="scroll-hint-bounce absolute bottom-8 left-1/2 flex w-fit -translate-x-1/2 flex-col items-center gap-1 text-neutral-500 transition-colors hover:text-brand"
          aria-label="Scroll naar beneden"
        >
          <span className="text-xs font-medium uppercase tracking-widest text-inherit">
            Scroll
          </span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
            aria-hidden
          >
            <path d="M12 5v14M6 12l6 6 6-6" />
          </svg>
        </a>
      </section>

      <section id="eerlijke-prijzen" className="bg-white py-section">
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
