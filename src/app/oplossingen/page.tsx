import { Suspense } from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PlanComparison } from "@/components/oplossingen/PlanComparison";
import { FaqSection } from "@/components/oplossingen/FaqSection";
import { CtaBlock } from "@/components/oplossingen/CtaBlock";
import { ScrollToRecommended } from "@/components/oplossingen/ScrollToRecommended";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { faqs } from "@/lib/faqData";

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

type PageProps = { searchParams: { aanbevolen?: string } };

export default function OplossingenPage({ searchParams }: PageProps) {
  const recommended = searchParams.aanbevolen;
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Oplossingen", href: "/oplossingen" },
        ]}
      />
      <FaqJsonLd faqs={faqs} />
      <section className="relative flex min-h-[calc(100vh-64px)] flex-col bg-white py-16 md:py-20">
        <div className="flex flex-1 flex-col justify-center">
          <Container>
            <h1
              className="text-3xl font-bold text-brand sm:text-[34px] md:text-4xl lg:text-5xl"
              data-letter-stagger
            >
              Oplossingen
            </h1>
            <p
              className="mt-4 max-w-2xl text-lg text-neutral-600"
              data-reveal="fade-up"
              data-delay="0.05"
            >
              Wij ontzorgen ieder type klant, ongeacht uw vloot grootte. Van eenvoudige matching en
              ontzorgen van plannen, tot maatwerk voor grotere operaties. FleetCare Connect heeft
              voor iedere individuele behoefte een oplossing.
            </p>
            <div className="mt-8 flex flex-wrap gap-4" data-reveal="fade-up" data-delay="0.1">
              <Button variant="primary" href="/#plan-test">
                Test uw voorkeur
              </Button>
              <Button variant="secondary" href="#eerlijke-prijzen">
                Bekijk prijzen
              </Button>
            </div>
          </Container>
        </div>
        <a
          href="#eerlijke-prijzen"
          className="group absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-neutral-400 transition-colors hover:text-brand"
          aria-label="Scroll naar beneden"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">Scroll</span>
          <span className="scroll-hint-bounce flex flex-col items-center -space-y-1.5">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-40"
              aria-hidden
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </span>
        </a>
      </section>

      <section id="eerlijke-prijzen" className="bg-white py-section">
        <Container>
          <div
            className="mb-16 grid gap-8 lg:grid-cols-[1fr_2fr] lg:items-start"
            data-reveal="fade-up"
          >
            <div>
              <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl md:text-5xl">
                Eerlijke prijzen
              </h2>
            </div>
            <p className="max-w-2xl text-base text-neutral-600 lg:text-lg">
              Kies het plan dat past bij uw wagenpark. Van eenvoudig tracken tot volledig maatwerk.
              Klein- en grootbedrijven doen meer met FleetCare Connect.
            </p>
          </div>
        </Container>
        <PlanComparison recommended={recommended} />
        <Suspense>
          <ScrollToRecommended />
        </Suspense>
      </section>

      <FaqSection />
      <CtaBlock />
    </>
  );
}
