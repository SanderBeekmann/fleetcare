import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

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
    <main className="py-section">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h1
            className="text-3xl font-bold text-brand md:text-4xl lg:text-5xl"
            data-reveal="fade-up"
          >
            Uw succesverhaal hier?
          </h1>
          <p
            className="mt-6 text-lg leading-relaxed text-neutral-600"
            data-reveal="fade-up"
            data-delay="0.05"
          >
            Word partner van FleetCare Connect en deel uw ervaring met ons platform.
            Laat zien hoe u samen met ons aftersales voor Light Electric Vehicles
            eenvoudiger en betrouwbaarder maakt. Uw verhaal inspireert anderen en
            helpt het netwerk te groeien.
          </p>
          <p
            className="mt-4 text-base text-neutral-600"
            data-reveal="fade-up"
            data-delay="0.08"
          >
            Bent u servicepartner of LEV-gebruiker en wilt u uw succesverhaal
            delen op deze pagina? Neem contact op. Wij plaatsen graag uw
            ervaring.
          </p>
          <div
            className="mt-10 flex flex-wrap justify-center gap-4"
            data-reveal="fade-up"
            data-delay="0.1"
          >
            <Button variant="primary" href="/contact">
              Word partner
            </Button>
            <Button variant="secondary" href="/contact">
              Deel uw succesverhaal
            </Button>
          </div>
        </div>
      </Container>
    </main>
  );
}
