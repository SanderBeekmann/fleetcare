import type { StaticImageData } from "next/image";
import { Container } from "@/components/ui/Container";
import { FadeImageBackground } from "@/components/ui/FadeImageBackground";
import stapKennismakingImage from "@/assets/stap-kennismaking.jpg";
import stapVoorstelImage from "@/assets/stap-voorstel.jpg";
import stapPilotImage from "@/assets/stap-pilot.jpg";

type Step = {
  title: string;
  text: string;
  image: StaticImageData;
  imageAlt: string;
};

const steps: Step[] = [
  {
    title: "Kennismaking",
    text: "We bespreken uw vloot, uw processen en wat u van het platform verwacht.",
    image: stapKennismakingImage,
    imageAlt: "Kennismakingsgesprek aan tafel, met de werkplaats op de achtergrond",
  },
  {
    title: "Voorstel op maat",
    text: "U ontvangt een helder voorstel met een vaste prijs per voertuig per maand, zonder verrassingen.",
    image: stapVoorstelImage,
    imageAlt: "Een voorstel op maat wordt ondertekend aan een bureau",
  },
  {
    title: "Starten met een pilot",
    text: "We beginnen met een deel van uw vloot en schalen op zodra het platform zich bewijst.",
    image: stapPilotImage,
    imageAlt:
      "Monteur en vlootbeheerder registreren drie nieuwe elektrische bakfietsen voor de pilot",
  },
];

/** 'Zo werkt het': drie stappen van eerste gesprek naar platform op maat. */
export function HowItWorksSteps() {
  return (
    <section
      className="bg-white pb-28 pt-12 md:pb-36 md:pt-20"
      aria-labelledby="zo-werkt-het-heading"
    >
      <Container>
        <div className="mb-12 flex flex-col gap-4" data-reveal="fade-up">
          <h2
            id="zo-werkt-het-heading"
            className="text-4xl font-light uppercase leading-tight tracking-tight text-neutral-900 md:text-5xl"
          >
            Zo werkt het
          </h2>
          <p className="max-w-2xl text-base text-neutral-600 lg:text-lg">
            In drie stappen van eerste gesprek naar een platform dat past bij uw organisatie.
          </p>
        </div>
        <ol className="grid gap-6 md:grid-cols-3" data-stagger="children">
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="card-lift relative isolate flex min-h-[340px] flex-col overflow-hidden rounded-md border border-neutral-200 bg-white px-6 pb-6 pt-5 sm:px-8 sm:pb-8 sm:pt-7"
            >
              <FadeImageBackground
                src={step.image}
                alt={step.imageAlt}
                sizes="(min-width: 768px) 33vw, 100vw"
              />
              <span className="block text-xs font-bold leading-none tracking-[0.3em] text-brand">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-xl font-semibold uppercase leading-tight tracking-wide text-neutral-900">
                {step.title}
              </h3>
              <p className="mt-4 max-w-[90%] text-sm leading-normal text-neutral-600">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
