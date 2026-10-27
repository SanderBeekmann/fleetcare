import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { FadeImageBackground } from "@/components/ui/FadeImageBackground";
import { Button } from "@/components/ui/Button";
import { OverPageHero } from "@/components/over/OverPageHero";
import { OverStackedSection } from "@/components/over/OverStackedSection";
import { WatIsFleetCareSection } from "@/components/over/WatIsFleetCareSection";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import waaromEenvoudImage from "@/assets/waarom-eenvoud.jpg";
import waaromInzichtImage from "@/assets/waarom-inzicht.jpg";
import waaromBetrouwbaarheidImage from "@/assets/waarom-betrouwbaarheid.jpg";

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
      "Één platform voor onderhoud, reparatie en real time tracking. Geen complexe handelingen, alles centraal.",
    image: waaromEenvoudImage,
    imageAlt: "Smartphone op een witte elektrische bakfiets in een lichte werkplaats",
  },
  {
    title: "Inzicht",
    description:
      "Realtime data over uw LEV-vloot. Altijd weten welke zorg uw voertuigen nodig hebben, met service status en overzicht.",
    image: waaromInzichtImage,
    imageAlt: "Accupack van een licht elektrisch voertuig aangesloten op een diagnoseapparaat",
  },
  {
    title: "Betrouwbaarheid",
    description:
      "Transparante communicatie over behoeften, status en administratieve verwachtingen van alle betrokkenen.",
    image: waaromBetrouwbaarheidImage,
    imageAlt: "Monteur zet het achterwiel van een elektrische bakfiets vast met een momentsleutel",
  },
];

export default function OverPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Over ons", href: "/over" },
        ]}
      />
      <OverPageHero />

      <div className="relative z-[2]">
        <OverStackedSection />

        <WatIsFleetCareSection />

        {/* Why FleetCare Connect: brand background, three value cards */}
        <section className="brand-watermark bg-brand py-section">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold text-white md:text-3xl" data-letter-stagger>
                Waarom FleetCare Connect
              </h2>
              <p
                className="mt-4 text-base text-white/90 md:text-lg"
                data-reveal="fade-up"
                data-delay="0.05"
              >
                Drie pijlers waarop wij bouwen
              </p>
            </div>
            <ul
              className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
              data-stagger="children"
              data-stagger-delay="0.08"
            >
              {values.map((item) => (
                <li
                  key={item.title}
                  className="card-lift relative isolate flex min-h-[340px] flex-col overflow-hidden rounded-md bg-white p-8 pt-6 shadow-xl lg:p-10 lg:pt-8"
                  data-reveal="fade-up"
                >
                  <FadeImageBackground
                    src={item.image}
                    alt={item.imageAlt}
                    sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                  />
                  <h3 className="text-xl font-semibold text-brand">{item.title}</h3>
                  <p className="mt-4 max-w-[90%] text-base leading-normal text-neutral-600">
                    {item.description}
                  </p>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        {/* CTA: centered, one clear action */}
        <section className="bg-neutral-50 py-section">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold text-brand md:text-3xl" data-letter-stagger>
                KENNISMAKEN?
              </h2>
              <p
                className="mt-6 text-base leading-normal text-neutral-600"
                data-reveal="fade-up"
                data-delay="0.05"
              >
                Bekijk onze oplossingen of neem direct contact op voor een vrijblijvend gesprek.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4" data-reveal="fade-up">
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
      </div>
    </>
  );
}
