"use client";

import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { useGsapContext } from "@/hooks/useGsapContext";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { registerGSAP, gsap, ScrollTrigger } from "@/lib/gsap/gsapClient";
import { ShieldCheck, Zap, MapPin, BarChart3, type LucideIcon } from "lucide-react";

type Reason = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const reasons: Reason[] = [
  {
    icon: Zap,
    title: "In 1 minuut geregeld",
    description:
      "Geen telefoonlijnen of e-mailketens. Dien uw aanvraag in via de app en wij matchen u direct met de juiste servicepartner.",
  },
  {
    icon: MapPin,
    title: "Landelijk netwerk",
    description:
      "Toegang tot gecertificeerde servicepartners door heel Nederland. Altijd een specialist bij u in de buurt.",
  },
  {
    icon: BarChart3,
    title: "Realtime inzicht",
    description:
      "Volg de status van elke aanvraag live. Van aanmelding tot afronding, u bent altijd op de hoogte.",
  },
  {
    icon: ShieldCheck,
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
        gsap.set(heading, { opacity: 0, y: 24 });
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
        gsap.set(highlight, { opacity: 0, y: 24 });
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

      gsap.set(cards, { opacity: 0, y: 20 });
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
      className="relative z-[3] bg-neutral-50 py-24 md:py-32"
      aria-labelledby="why-fcc-heading"
    >
      <Container>
        {/* Header */}
        <div className="why-heading mb-16 max-w-2xl md:mb-20">
          <h4 className="mb-6 border-l-4 border-brand pl-4 text-xs font-bold uppercase tracking-[0.3em] text-brand">
            Waarom FleetCare Connect
          </h4>
          <h2
            id="why-fcc-heading"
            className="font-heading text-4xl font-light leading-[1.1] tracking-tighter text-brand sm:text-5xl md:text-6xl"
          >
            Gebouwd voor <br />
            <span className="font-bold">uw vloot.</span>
          </h2>
        </div>

        {/* Bento grid */}
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {/* Highlight card - flip on desktop hover */}
          <div className="why-highlight group [perspective:1200px] lg:col-span-2 lg:row-span-2">
            <div className="relative h-full w-full transition-transform duration-700 ease-in-out [transform-style:preserve-3d] lg:group-hover:[transform:rotateY(180deg)]">
              {/* Front */}
              <div className="flex h-full flex-col justify-between bg-brand p-8 text-white [backface-visibility:hidden] md:p-10">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                    Het verschil
                  </p>
                  <p className="mt-4 text-2xl font-semibold leading-snug sm:text-3xl md:text-4xl">
                    Eén platform dat uw complete LEV-aftersales verbindt, van aanvraag tot
                    afronding.
                  </p>
                </div>
                <div className="mt-10 flex items-end justify-between">
                  <div className="flex gap-12">
                    <div>
                      <p className="text-3xl font-bold md:text-4xl">98%</p>
                      <p className="mt-1 text-xs uppercase tracking-widest text-white/70">
                        Tevredenheid
                      </p>
                    </div>
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
              {/* Back - coming soon placeholder (desktop only) */}
              <div className="absolute inset-0 hidden flex-col items-center justify-center bg-neutral-900 [backface-visibility:hidden] [transform:rotateY(180deg)] lg:flex">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                  Dashboard preview
                </p>
                <p className="mt-3 text-2xl font-semibold text-white">Coming soon</p>
              </div>
            </div>
          </div>

          {/* Reason cards */}
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.title}
                className="why-card hover:border-brand/30 group flex flex-col justify-between border border-neutral-200 bg-white p-6 transition-colors duration-300 md:p-8"
              >
                <div>
                  <div className="bg-brand/5 group-hover:bg-brand/10 mb-4 flex h-10 w-10 items-center justify-center transition-colors duration-300">
                    <Icon className="text-brand" size={20} strokeWidth={1.5} />
                  </div>
                  <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-neutral-900">
                    {reason.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-600">{reason.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
