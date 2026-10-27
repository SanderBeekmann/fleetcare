"use client";

import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { Image } from "@/components/ui/Image";
import kpiDashboardImage from "@/assets/dashboard-kpi.jpg";
import levFleetImage from "@/assets/lev-fleet.jpg";
import { useGsapContext } from "@/hooks/useGsapContext";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { registerGSAP, gsap, ScrollTrigger } from "@/lib/gsap/gsapClient";
import type { StaticImageData } from "next/image";
import iconSnelheid from "@/assets/icons/fcc-snelheid.webp";
import iconDekking from "@/assets/icons/fcc-dekking.webp";
import iconInzicht from "@/assets/icons/fcc-inzicht.webp";
import iconGecertificeerd from "@/assets/icons/fcc-gecertificeerd.webp";

type Reason = {
  icon: StaticImageData;
  title: string;
  description: string;
};

const reasons: Reason[] = [
  {
    icon: iconSnelheid,
    title: "In 1 minuut geregeld",
    description:
      "Geen telefoonlijnen of e-mailketens. Dien uw aanvraag in via de app en wij matchen u direct met de juiste servicepartner.",
  },
  {
    icon: iconDekking,
    title: "Landelijk netwerk",
    description:
      "Toegang tot gecertificeerde servicepartners door heel Nederland. Altijd een specialist bij u in de buurt.",
  },
  {
    icon: iconInzicht,
    title: "Realtime inzicht",
    description:
      "Volg de status van elke aanvraag live. Van aanmelding tot afronding, u bent altijd op de hoogte.",
  },
  {
    icon: iconGecertificeerd,
    title: "Gecertificeerde partners",
    description:
      "Elke servicepartner in ons netwerk is gecertificeerd en gecontroleerd. Kwaliteit die u kunt vertrouwen.",
  },
];

export function WhyFCCSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGsapContext(
    sectionRef,
    () => {
      registerGSAP();
      const scope = sectionRef.current;
      if (!scope) return;

      const heading = scope.querySelector(".why-heading");
      const cards = scope.querySelectorAll(".why-card");
      const highlight = scope.querySelector(".why-highlight");

      if (heading) {
        gsap.set(heading, { opacity: 0, y: 12 });
        ScrollTrigger.create({
          trigger: scope,
          start: "top 80%",
          once: true,
          onEnter: () => {
            gsap.to(heading, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
            });
          },
        });
      }

      if (highlight) {
        gsap.set(highlight, { opacity: 0, y: 12 });
        ScrollTrigger.create({
          trigger: highlight,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(highlight, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
              delay: 0.1,
            });
          },
        });
      }

      gsap.set(cards, { opacity: 0, y: 12 });
      cards.forEach((card, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top 88%",
          once: true,
          onEnter: () => {
            gsap.to(card, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power2.out",
              delay: i * 0.08,
              // Release the inline transform so no GSAP leftovers stay on the card
              clearProps: "transform",
            });
          },
        });
      });
    },
    { enabled: !prefersReducedMotion, deps: [] }
  );

  return (
    <section
      ref={sectionRef}
      className="surface-ambient-soft relative z-[3] py-section"
      aria-labelledby="why-fcc-heading"
    >
      <Container>
        {/* Header */}
        <div className="why-heading mb-16 max-w-2xl md:mb-20">
          <h2
            id="why-fcc-heading"
            className="font-heading text-4xl font-light leading-[1.1] tracking-tight text-brand sm:text-5xl md:text-6xl"
          >
            Gebouwd voor <br />
            <span className="font-semibold">uw vloot.</span>
          </h2>
        </div>

        {/* Bento grid */}
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {/* Highlight card - radial reveal on desktop hover; desktop ratio follows the dashboard screenshot */}
          <div className="why-highlight group relative overflow-hidden rounded-md lg:col-span-2 lg:row-span-2 lg:aspect-[1280/697]">
            {/* Front */}
            <div className="surface-portal flex h-full flex-col justify-between p-8 pt-6 text-white [--portal-bottom:70%] [--portal-top:84%] md:p-10 md:pt-8">
              <div>
                <p className="text-2xl font-semibold leading-snug sm:text-3xl md:text-4xl">
                  Eén platform dat uw complete LEV-aftersales verbindt, van aanvraag tot afronding.
                </p>
              </div>
              <div className="mt-10 flex items-end justify-between">
                <div className="flex gap-12">
                  <div>
                    <p className="text-3xl font-bold md:text-4xl">24/7</p>
                    <p className="mt-1 text-xs uppercase tracking-widest text-white/70">
                      Beschikbaar
                    </p>
                  </div>
                </div>
                <p className="hidden text-xs uppercase tracking-widest text-white/40 lg:block">
                  Hover voor preview
                </p>
              </div>
            </div>
            {/* Overlay - radial gradient reveal (desktop only) */}
            <div className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(to_right,#074789_50%,#f9fafc_50%)] transition-[clip-path] duration-700 ease-in-out [clip-path:circle(0%_at_50%_50%)] lg:block lg:group-hover:[clip-path:circle(75%_at_50%_50%)]">
              <Image
                src={kpiDashboardImage}
                alt="FleetCare Connect KPI-overzicht met vlootprestaties en meldingen per maand"
                fill
                unoptimized
                className="object-contain"
              />
            </div>
          </div>

          {/* Reason cards */}
          {reasons.map((reason) => {
            return (
              <div
                key={reason.title}
                className="why-card card-lift flex flex-col justify-between rounded-md bg-white/80 p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_32px_-16px_rgba(7,40,80,0.18)] ring-1 ring-black/[0.04] backdrop-blur-sm md:p-8"
              >
                <div>
                  <Image
                    src={reason.icon}
                    alt=""
                    aria-hidden
                    className="mb-5 h-12 w-12"
                    sizes="48px"
                  />
                  <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-neutral-900">
                    {reason.title}
                  </h3>
                  <p className="text-sm leading-normal text-neutral-600">{reason.description}</p>
                </div>
              </div>
            );
          })}

          {/* Sfeerbeeld rechtsonder: vloot van lichte elektrische voertuigen (AI-gegenereerd) */}
          <div className="relative min-h-[220px] overflow-hidden rounded-md bg-neutral-100">
            <Image
              src={levFleetImage}
              alt="Vloot van elektrische bakfietsen, kleine elektrische bedrijfswagens en e-scooters bij laadpalen"
              fill
              className="object-cover object-[40%_60%]"
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              quality={85}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
