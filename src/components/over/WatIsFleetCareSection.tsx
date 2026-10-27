import Image from "next/image";
import type { StaticImageData } from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PhoneMockup } from "@/components/ui/PhoneMockup";
import dashboardOverviewImage from "@/assets/dashboard-overzicht.jpg";
import iconAanvraag from "@/assets/icons/fcc-aanvraag.webp";
import iconOplossing from "@/assets/icons/fcc-oplossing.webp";
import iconRealtime from "@/assets/icons/fcc-realtime.webp";
import iconNetwerk from "@/assets/icons/fcc-netwerk.webp";
import iconApp from "@/assets/icons/fcc-app.webp";

type Feature = {
  icon: StaticImageData;
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    icon: iconAanvraag,
    title: "Aanvraag in 1 minuut",
    description: "Vraag in één minuut de oplossing aan die het beste bij uw situatie past.",
  },
  {
    icon: iconOplossing,
    title: "Passende oplossing",
    description: "Voor elk LEV-voertuig een oplossing die past bij type, gebruik en urgentie.",
  },
  {
    icon: iconRealtime,
    title: "Realtime updates",
    description: "Volg de status van uw aanvraag live, van melding tot afronding.",
  },
  {
    icon: iconNetwerk,
    title: "Landelijk netwerk",
    description: "Gecertificeerde servicepartners door heel Nederland, altijd bij u in de buurt.",
  },
  {
    icon: iconApp,
    title: "Alles in de FCC-app",
    description: "Aanvragen, status en overzicht van uw vloot op één plek.",
  },
];

/** "Wat is FleetCare Connect": intro naast het klantportaal, daaronder de kernfuncties. */
export function WatIsFleetCareSection() {
  return (
    <section className="bg-neutral-50 py-section" aria-labelledby="wat-is-fcc-heading">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-5">
            <h2
              id="wat-is-fcc-heading"
              className="text-2xl font-bold text-brand md:text-3xl"
              data-letter-stagger
            >
              Wat is FleetCare Connect
            </h2>
            <p
              className="mt-6 text-base leading-relaxed text-neutral-600 md:text-lg"
              data-reveal="fade-up"
              data-delay="0.05"
            >
              FleetCare Connect (FCC) is hét centrale aftersalesplatform voor Light Electric
              Vehicles. Wij brengen gecertificeerde servicepartners en LEV-gebruikers samen, om
              onderhoud, reparaties en pechhulp eenvoudig en betrouwbaar aan te bieden.
            </p>
            <div className="mt-8" data-reveal="fade-up" data-delay="0.1">
              <Button variant="primary" href="/oplossingen">
                Bekijk oplossingen
              </Button>
            </div>
          </div>
          {/* Webportaal met de app-mockup rechtsonder er overheen */}
          <figure
            className="relative pb-12 pr-16 sm:pb-16 sm:pr-24 lg:col-span-7"
            data-reveal="fade-up"
            data-delay="0.1"
          >
            <Image
              src={dashboardOverviewImage}
              alt="Klantportaal van FleetCare Connect met actuele meldingen, status per werkorder en vlootoverzicht"
              sizes="(min-width: 1024px) 50vw, 90vw"
              quality={90}
              className="h-auto w-full rounded-md"
            />
            <PhoneMockup
              className="!absolute bottom-0 right-0 h-[221px] w-[109px] sm:h-[315px] sm:w-[155px] lg:h-[284px] lg:w-[140px] xl:h-[378px] xl:w-[186px]"
              scaleClassName="scale-[0.35] sm:scale-50 lg:scale-[0.45] xl:scale-[0.6]"
              alt="FleetCare Connect app op een smartphone"
            />
          </figure>
        </div>

        <ul
          className="mt-16 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:mt-24 lg:grid-cols-5"
          data-stagger="children"
        >
          {features.map((feature) => (
            <li key={feature.title}>
              <Image src={feature.icon} alt="" aria-hidden className="h-12 w-12" sizes="48px" />
              <h3 className="mt-4 text-base font-semibold leading-tight text-neutral-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{feature.description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
