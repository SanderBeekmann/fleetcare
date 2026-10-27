import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PricingCards } from "@/components/pricing/PricingCards";
import { ServicePartnerBand } from "@/components/pricing/ServicePartnerBand";
import { FaqSection } from "@/components/oplossingen/FaqSection";
import { PricingCta } from "@/components/oplossingen/PricingCta";
import { HowItWorksSteps } from "@/components/oplossingen/HowItWorksSteps";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { faqs } from "@/lib/faqData";
import dashboardOverviewImage from "@/assets/dashboard-overzicht.jpg";

export const metadata: Metadata = {
  title: "Oplossingen",
  description:
    "Een platform op maat voor uw vloot. Start met Essentieel vanaf €1,99 per voertuig per maand (excl. btw) of kies een oplossing op maat.",
  openGraph: {
    title: "Oplossingen | FleetCare Connect",
    description:
      "Een platform op maat voor uw vloot. Start met Essentieel vanaf €1,99 per voertuig per maand (excl. btw) of kies een oplossing op maat.",
  },
  alternates: { canonical: "/oplossingen" },
};

export default function OplossingenPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Oplossingen", href: "/oplossingen" },
        ]}
      />
      <FaqJsonLd faqs={faqs} />
      <section className="surface-ambient-alt relative -mt-16 pb-20 pt-32 md:pb-28 md:pt-40">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1
              data-intro-item
              className="text-4xl font-light uppercase tracking-tight text-brand sm:text-5xl md:text-6xl"
            >
              Een platform op maat
            </h1>
            <p data-intro-item className="mx-auto mt-4 max-w-2xl text-lg text-neutral-600">
              Elke vloot is anders. Daarom stemmen we het platform en de prijs af op uw voertuigen,
              processen en koppelingen.
            </p>
            <div data-intro-item className="mt-8 flex flex-wrap justify-center gap-4">
              <Button variant="primary" href="/#plan-test">
                Wat past bij mij?
              </Button>
              <Button variant="secondary" href="#eerlijke-prijzen">
                Bekijk prijzen
              </Button>
            </div>
          </div>
          {/* Unoptimized: the source is already a compressed JPEG, recompressing it blurs the
              small dashboard text. Capped at the source width so it stays sharp. */}
          <div data-intro-item className="mx-auto mt-12 max-w-6xl md:mt-16">
            <Image
              src={dashboardOverviewImage}
              alt="Dashboard van FleetCare Connect met actuele meldingen, status per werkorder en vlootoverzicht"
              priority
              unoptimized
              className="h-auto w-full rounded-md"
            />
          </div>
        </Container>
      </section>

      <section id="eerlijke-prijzen" className="surface-ambient scroll-mt-16 py-section">
        <Container>
          <div className="mb-12 flex flex-col gap-4" data-reveal="fade-up">
            <h2 className="text-4xl font-light uppercase leading-tight tracking-tight text-neutral-900 md:text-5xl">
              Prijs op maat
            </h2>
            <p className="max-w-2xl text-base text-neutral-600 lg:text-lg">
              Start direct, of laat ons het platform inrichten op uw organisatie. U betaalt alleen
              voor wat u echt gebruikt.
            </p>
          </div>
          <PricingCards />
        </Container>
      </section>

      <HowItWorksSteps />

      <section className="bg-white pb-section">
        <Container>
          <ServicePartnerBand id="servicepartners" />
        </Container>
      </section>

      <FaqSection />
      <PricingCta />
    </>
  );
}
