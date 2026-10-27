import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Klanten",
  description:
    "Word partner van FleetCare Connect en deel uw succesverhaal. Ontdek hoe andere servicepartners en LEV-gebruikers samenwerken.",
  openGraph: {
    title: "Klanten | FleetCare Connect",
    description:
      "Word partner van FleetCare Connect en deel uw succesverhaal. Ontdek hoe andere servicepartners en LEV-gebruikers samenwerken.",
  },
  alternates: { canonical: "/klanten" },
};

export default function KlantenPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Klanten", href: "/klanten" },
        ]}
      />
      <section className="py-section">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 data-intro-item className="text-3xl font-bold text-brand md:text-4xl lg:text-5xl">
              Uw succesverhaal hier?
            </h1>
            <p data-intro-item className="mt-4 text-lg text-neutral-600">
              Word partner van FleetCare Connect en deel uw ervaring met ons platform. Laat zien hoe
              u samen met ons aftersales voor Light Electric Vehicles eenvoudiger en betrouwbaarder
              maakt. Uw verhaal inspireert anderen en helpt het netwerk te groeien.
            </p>
            <p data-intro-item className="mt-4 text-base text-neutral-600">
              Bent u servicepartner of LEV-gebruiker en wilt u uw succesverhaal delen op deze
              pagina? Neem contact op. Wij plaatsen graag uw ervaring.
            </p>
            <div data-intro-item className="mt-8 flex flex-wrap justify-center gap-4">
              <Button variant="primary" href="/contact">
                Word partner
              </Button>
              <Button variant="secondary" href="/contact">
                Deel uw succesverhaal
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
