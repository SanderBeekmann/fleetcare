import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { OverPageHero } from "@/components/over/OverPageHero";
import { OverStackedSection } from "@/components/over/OverStackedSection";
import { WatIsFleetCareSection } from "@/components/over/WatIsFleetCareSection";

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
    icon: "zap",
  },
  {
    title: "Inzicht",
    description:
      "Realtime data over uw LEV-vloot. Altijd weten welke zorg uw voertuigen nodig hebben, met service status en overzicht.",
    icon: "eye",
  },
  {
    title: "Betrouwbaarheid",
    description:
      "Transparante communicatie over behoeften, status en administratieve verwachtingen van alle betrokkenen.",
    icon: "shield",
  },
];

export default function OverPage() {
  return (
    <>
      <OverPageHero />
      <OverStackedSection />
      <WatIsFleetCareSection />

      <div className="stacked-content-above relative z-[3]">
      {/* Waarom FleetCare Connect — brand-achtergrond, drie waarden met iconen */}
      <section className="py-16 md:py-24 bg-brand">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2
              className="text-2xl font-bold text-white md:text-3xl lg:text-4xl"
              data-letter-stagger
            >
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
                className="group flex flex-col bg-white p-8 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl lg:p-10"
                data-reveal="fade-up"
              >
                <span
                  className="flex h-12 w-12 items-center justify-center bg-brand/10 text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white"
                  aria-hidden
                >
                  {item.icon === "zap" && (
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  )}
                  {item.icon === "eye" && (
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                  {item.icon === "shield" && (
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  )}
                </span>
                <h3 className="mt-6 text-xl font-semibold text-brand">
                  {item.title}
                </h3>
                <p className="mt-4 flex-1 text-base leading-relaxed text-neutral-600">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* CTA — centraal, één duidelijke actie */}
      <section className="py-section bg-neutral-50">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
<h2
            className="text-2xl font-bold text-brand md:text-3xl"
            data-letter-stagger
          >
            KENNISMAKEN?
          </h2>
            <p
              className="mt-6 text-base leading-relaxed text-neutral-600"
              data-reveal="fade-up"
              data-delay="0.05"
            >
              Bekijk onze oplossingen of neem direct contact op voor een vrijblijvend gesprek.
            </p>
            <div
              className="mt-10 flex flex-wrap justify-center gap-4"
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

      </div>
    </>
  );
}
