"use client";

import React, { useRef } from "react";
import { ContainerScroll } from "@/components/ui/ContainerScrollAnimation";
import { Image } from "@/components/ui/Image";
import { useGsapContext } from "@/hooks/useGsapContext";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { registerGSAP, gsap } from "@/lib/gsap/gsapClient";
import dashboardImage from "@/assets/dashboard-overzicht.jpg";

type Feature = {
  title: string;
  description: string;
  /** Positie op desktop (xl+): over de rand van de tablet. */
  position: string;
  /** Kant waarvandaan de card het scherm in vliegt. */
  from: "left" | "right";
};

const features: Feature[] = [
  {
    title: "Real-time inzicht",
    description:
      "Bekijk de status van elk voertuig op één plek. Van onderhoudsplanning tot energieverbruik, alles live en overzichtelijk.",
    position: "xl:-left-36 xl:top-[22%] 2xl:-left-44",
    from: "left",
  },
  {
    title: "Slimme meldingen",
    description:
      "Ontvang automatisch meldingen bij aankomend onderhoud, APK-verlopen of afwijkend rijgedrag. Nooit meer iets over het hoofd zien.",
    position: "xl:-right-36 xl:top-[4%] 2xl:-right-44",
    from: "right",
  },
  {
    title: "Rapportages op maat",
    description:
      "Genereer gedetailleerde rapportages per voertuig, chauffeur of periode. Ideaal voor kostenbeheer en compliance.",
    position: "xl:-right-24 xl:bottom-[6%] 2xl:-right-32",
    from: "right",
  },
];

function FeatureCard({ title, description, position, from }: Feature) {
  return (
    <li
      data-from={from}
      className={`showcase-card card-lift md:rounded-md md:bg-brand md:p-6 md:shadow-[0_30px_60px_-28px_rgba(7,40,80,0.6)] xl:absolute xl:w-64 ${position}`}
    >
      <h3 className="text-sm font-semibold uppercase leading-none tracking-[0.12em] text-brand md:text-white">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-normal text-neutral-600 md:text-white/85">{description}</p>
    </li>
  );
}

/** Cards vliegen met de scroll mee van buiten het scherm naar hun plek bij de tablet (niet op mobiel). */
function useCardsFlyIn(sectionRef: React.RefObject<HTMLElement | null>) {
  const prefersReducedMotion = usePrefersReducedMotion();

  useGsapContext(
    sectionRef,
    () => {
      registerGSAP();
      if (window.matchMedia("(max-width: 767px)").matches) return;
      const cards = sectionRef.current?.querySelectorAll<HTMLElement>(".showcase-card");
      cards?.forEach((card, i) => {
        const direction = card.dataset.from === "left" ? -1 : 1;
        gsap.fromTo(
          card,
          // Een volle schermbreedte opzij ligt altijd buiten beeld, ongeacht de eindpositie
          { x: () => direction * window.innerWidth },
          {
            x: 0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: `center ${55 - i * 5}%`,
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          }
        );
      });
    },
    { enabled: !prefersReducedMotion, deps: [] }
  );
}

export function AppShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useCardsFlyIn(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="surface-ambient-alt relative z-[3] -mt-24 overflow-hidden md:-mb-32 md:-mt-32"
    >
      <ContainerScroll
        titleComponent={
          <h2 className="font-heading text-4xl font-light leading-[1.1] tracking-tight text-brand sm:text-5xl md:text-6xl">
            Eén dashboard voor <br />
            <span className="font-semibold">uw hele vloot.</span>
          </h2>
        }
        overlay={
          <ul className="relative z-10 mt-10 grid gap-8 md:-mt-10 md:grid-cols-3 md:gap-3 md:px-6 xl:absolute xl:inset-0 xl:mt-0 xl:block xl:px-0">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </ul>
        }
      >
        {/* Scherm in dezelfde verhouding als de screenshot; contain zodat er niets wegvalt.
            Unoptimized: de bron is al een gecomprimeerde JPEG, opnieuw comprimeren maakt de tekst wazig. */}
        <div
          className="relative w-full bg-[#f9fafc]"
          style={{ aspectRatio: `${dashboardImage.width} / ${dashboardImage.height}` }}
        >
          <Image
            src={dashboardImage}
            alt="FleetCare Connect dashboard: meldingen, status per voertuig en recente activiteiten"
            fill
            unoptimized
            className="object-contain"
          />
        </div>
      </ContainerScroll>
    </section>
  );
}
