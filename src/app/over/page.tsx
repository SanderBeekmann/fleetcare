import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CtaBlock } from "@/components/oplossingen/CtaBlock";

export const metadata: Metadata = {
  title: "Over ons",
  description:
    "FleetCare Connect is hét centrale aftersalesplatform voor Light Electric Vehicles. Wij brengen gecertificeerde servicepartners en LEV-gebruikers samen.",
  openGraph: {
    title: "Over ons | FleetCare Connect",
    description:
      "FleetCare Connect is hét centrale aftersalesplatform voor Light Electric Vehicles. Wij brengen gecertificeerde servicepartners en LEV-gebruikers samen.",
  },
  alternates: { canonical: "/over" },
};

const values = [
  {
    title: "Eenvoud",
    description:
      "Één platform voor tracking, onderhoud en rapportages. Geen versnipperde systemen meer.",
  },
  {
    title: "Inzicht",
    description:
      "Realtime data over uw wagenpark. Altijd weten waar uw voertuigen zijn en wat de status is.",
  },
  {
    title: "Betrouwbaarheid",
    description:
      "Stabiele techniek, duidelijke afspraken en support wanneer u ons nodig heeft.",
  },
];

export default function OverPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-neutral-200 bg-white py-16 md:py-20">
        <Container>
          <h1
            className="text-3xl font-bold text-brand md:text-4xl lg:text-5xl"
            data-reveal="fade-up"
          >
            Over ons
          </h1>
          <p
            className="mt-4 max-w-2xl text-lg text-neutral-600"
            data-reveal="fade-up"
            data-delay="0.05"
          >
            Het verhaal van de oprichters: van onderzoeksresultaten in de LEV-branche tot één centraal platform dat aftersales sneller en eenvoudiger maakt.
          </p>
        </Container>
      </section>

      {/* Ons verhaal */}
      <section className="py-section">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2
              className="text-2xl font-bold text-brand md:text-3xl"
              data-reveal="fade-up"
            >
              Ons verhaal
            </h2>
            <p
              className="mt-4 text-neutral-600 leading-relaxed"
              data-reveal="fade-up"
              data-delay="0.05"
            >
              Aan de hand van resultaten van een van onze onderzoeksstages ging er een belletje rinkelen. Uit onderzoek bleek dat aftersales in de Light Electric Vehicle-branche te wensen overliet. Hiervoor is FleetCare Connect de juiste oplossing.
            </p>
            <p
              className="mt-4 text-neutral-600 leading-relaxed"
              data-reveal="fade-up"
              data-delay="0.1"
            >
              Door ons centrale platform willen wij LEV-gebruikers en servicepartners bij elkaar brengen om downtime zo veel mogelijk te reduceren en aftersales-afhandelingen zo snel mogelijk te laten verlopen, zonder complexe procedures.
            </p>
          </div>
        </Container>
      </section>

      {/* Wat is FleetCare Connect */}
      <section className="border-t border-neutral-200 bg-neutral-50 py-section">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2
              className="text-2xl font-bold text-brand md:text-3xl"
              data-reveal="fade-up"
            >
              Wat is FleetCare Connect
            </h2>
            <p
              className="mt-4 text-neutral-600 leading-relaxed"
              data-reveal="fade-up"
              data-delay="0.05"
            >
              FleetCare Connect (FCC) is hét centrale aftersalesplatform voor Light Electric Vehicles (LEV&apos;s). Wij brengen gecertificeerde servicepartners en LEV-gebruikers samen, om onderhoud, reparaties en pechhulp eenvoudig en betrouwbaar aan te bieden.
            </p>
            <h3
              className="mt-8 text-lg font-semibold text-neutral-900"
              data-reveal="fade-up"
            >
              Met FCC kunt u:
            </h3>
            <ul
              className="mt-4 space-y-3 text-neutral-600 leading-relaxed"
              data-stagger="children"
              data-stagger-delay="0.06"
            >
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                In 1 minuut een aanvraag doen voor de oplossing die het beste bij uw situatie past
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                Een passende oplossing krijgen voor uw LEV-voertuig
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                Realtime statusupdates over uw aanvraag volgen
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                Profiteren van een landelijk netwerk aan gecertificeerde servicepartners
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                Dit allemaal beschikbaar in de FCC-app
              </li>
            </ul>
          </div>
        </Container>
      </section>

      {/* Waarom FleetCare Connect */}
      <section className="border-t border-neutral-200 bg-neutral-50 py-section">
        <Container>
          <h2
            className="text-2xl font-bold text-brand md:text-3xl"
            data-reveal="fade-up"
          >
            Waarom FleetCare Connect
          </h2>
          <ul
            className="mt-8 grid gap-8 md:grid-cols-3"
            data-stagger="children"
            data-stagger-delay="0.08"
          >
            {values.map((item) => (
              <li key={item.title} className="flex flex-col">
                <h3 className="text-lg font-semibold text-neutral-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-neutral-600 leading-relaxed">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-section">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2
              className="text-2xl font-bold text-brand md:text-3xl"
              data-reveal="fade-up"
            >
              Kennis gemaakt?
            </h2>
            <p
              className="mt-4 text-neutral-600"
              data-reveal="fade-up"
              data-delay="0.05"
            >
              Bekijk onze oplossingen of neem direct contact op voor een vrijblijvend gesprek.
            </p>
            <div
              className="mt-8 flex flex-wrap justify-center gap-4"
              data-reveal="fade-up"
            >
              <Button variant="primary" href="/oplossingen">
                Bekijk oplossingen
              </Button>
              <Button variant="secondary" href="/contact">
                Contact opnemen
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <CtaBlock />
    </>
  );
}
