import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { WebportalNotifyForm } from "@/components/webportaal/WebportalNotifyForm";

export const metadata: Metadata = {
  title: "Webportaal",
  description: "Het FleetCare Connect-webportaal is binnenkort beschikbaar.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/webportaal" },
};

export default function WebportaalPage() {
  return (
    <section className="surface-ambient -mt-16 flex min-h-screen flex-col justify-center pb-16 pt-32 md:pb-20 md:pt-36">
      <Container>
        <div className="max-w-2xl">
          <h1
            data-intro-item
            className="text-3xl font-bold tracking-tight text-brand md:text-4xl lg:text-5xl"
          >
            Webportaal
          </h1>
          <p data-intro-item className="mt-4 text-xl font-semibold text-neutral-900 md:text-2xl">
            Binnenkort beschikbaar
          </p>
          <p data-intro-item className="mt-6 text-base leading-normal text-neutral-600 md:text-lg">
            We leggen de laatste hand aan het FleetCare Connect-webportaal. Hier krijgt u straks
            overzicht over uw complete aftersales: voertuigen, serviceopdrachten, planning en
            rapportages op één plek. Wilt u er als eerste mee werken? Neem contact met ons op.
          </p>
          <div data-intro-item className="mt-10">
            <WebportalNotifyForm />
          </div>
          <div data-intro-item className="mt-10 flex flex-wrap gap-4">
            <Button variant="primary" href="/contact">
              Neem contact op
            </Button>
            <Button variant="secondary" href="/">
              Terug naar home
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
