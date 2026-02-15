"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  LayoutGrid,
  Settings,
  Rocket,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { useGsapContext } from "@/hooks/useGsapContext";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { registerGSAP, gsap, ScrollTrigger } from "@/lib/gsap/gsapClient";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

type Step = {
  number: number;
  title: string;
  description: string;
  icon: LucideIcon;
};

const steps: Step[] = [
  {
    number: 1,
    title: "Kies uw plan",
    description:
      "Selecteer Standaard, Smart of Enterprise op basis van uw wensen en vlootgrootte. Een fundament op maat voor uw organisatie.",
    icon: LayoutGrid,
  },
  {
    number: 2,
    title: "Account en installatie",
    description:
      "Wij zetten uw account in en begeleiden de koppeling met uw voertuigen. Volledige technische ontzorging door onze specialisten.",
    icon: Settings,
  },
  {
    number: 3,
    title: "Direct aan de slag",
    description:
      "Log in op het portaal en begin direct met monitoren. Real-time inzichten die leiden tot directe kostenbesparing en efficiëntie.",
    icon: Rocket,
  },
];

function StepCard({
  step,
  isLast,
}: {
  step: Step;
  isLast: boolean;
}) {
  const Icon = step.icon;
  return (
    <div className="method-card relative flex gap-8 pb-20 last:pb-0 md:gap-16">
      {/* Icon & vertical line — lijn gecentreerd tussen de iconen */}
      <div className="flex w-14 flex-shrink-0 flex-col items-center">
        <div className="z-10 flex h-14 w-14 items-center justify-center">
          <Icon className="text-brand" size={28} strokeWidth={1.5} />
        </div>
        {!isLast && (
          <div className="relative -mb-20 mt-5 flex min-h-[14rem] flex-1 flex-col items-center pb-5">
            <div className="relative h-full w-px bg-neutral-200">
              <div
                className="method-line-fill absolute inset-0 origin-top bg-brand"
                style={{ transform: "scaleY(0)" }}
                aria-hidden
              />
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pt-2">
        <div className="mb-4 flex items-baseline gap-4">
          <span className="text-sm font-bold uppercase tracking-[0.3em] text-brand">
            {String(step.number).padStart(2, "0")}
          </span>
          <div className="h-px w-12 bg-brand/20" aria-hidden />
        </div>
        <h3 className="mb-4 text-2xl font-light uppercase tracking-tight text-brand md:text-3xl">
          {step.title}
        </h3>
        <p className="max-w-xl text-sm font-light leading-relaxed text-neutral-600">
          {step.description}
        </p>
        <Link
          href="/oplossingen"
          className="mt-6 flex items-center gap-2 font-medium text-brand transition-transform duration-200 hover:translate-x-1"
        >
          <span className="text-sm uppercase tracking-widest">Lees meer</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

export function MethodSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGsapContext(
    sectionRef,
    () => {
      registerGSAP();
      const scope = sectionRef.current;
      if (!scope) return;

      const leftCol = scope.querySelector(".method-sticky");
      const cards = scope.querySelectorAll(".method-card");
      const lineFills = scope.querySelectorAll(".method-line-fill");

      gsap.set(cards, { opacity: 0, y: 16 });
      gsap.set(lineFills, { transformOrigin: "top", scaleY: 0 });
      if (leftCol) gsap.set(leftCol, { opacity: 0, y: 20 });

      if (leftCol) {
        ScrollTrigger.create({
          trigger: scope,
          start: "top 80%",
          once: true,
          onEnter: () => {
            gsap.to(leftCol, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
            });
          },
        });
      }

      cards.forEach((card, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(card, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
            });
            const line = lineFills[i];
            if (line) {
              gsap.to(line, {
                scaleY: 1,
                duration: 1.2,
                delay: 0.2,
                ease: "power2.inOut",
                overwrite: true,
              });
            }
          },
        });
      });
    },
    { enabled: !prefersReducedMotion, deps: [] }
  );

  return (
    <section
      id="method"
      ref={sectionRef}
      className="relative z-[3] py-24 bg-white md:py-32"
      aria-labelledby="method-heading"
    >
      <Container>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          {/* Left: sticky content on desktop */}
          <div className="lg:col-span-5">
            <div className="method-sticky lg:sticky lg:top-24">
              <h4
                id="method-label"
                className="mb-6 border-l-4 border-brand pl-4 text-xs font-bold uppercase tracking-[0.3em] text-brand"
              >
                Onze Methode
              </h4>
              <h2
                id="method-heading"
                className="font-heading text-5xl font-light leading-[1.1] tracking-tighter text-brand md:text-6xl"
                data-reveal="fade-up"
              >
                Hoe het <br />
                <span className="font-bold">werkt.</span>
              </h2>
              <p className="mb-12 max-w-md text-sm font-light leading-relaxed text-neutral-600">
                In drie stappen naar een beter beheerd wagenpark. Wij combineren
                data met intuïtieve technologie.
              </p>
              <Button
                variant="primary"
                href="/#contact"
                className="px-10 py-5 text-sm font-bold uppercase tracking-widest"
              >
                Vraag Demo Aan
              </Button>
            </div>
          </div>

          {/* Right: steps */}
          <div className="lg:col-span-7 pt-8 lg:pt-0">
            <div className="relative">
              {steps.map((step, index) => (
                <StepCard
                  key={step.number}
                  step={step}
                  isLast={index === steps.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
