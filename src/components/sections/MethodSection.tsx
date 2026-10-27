"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import iconPlan from "@/assets/icons/fcc-plan.webp";
import iconStart from "@/assets/icons/fcc-start.webp";
import iconOntzorgd from "@/assets/icons/fcc-ontzorgd.webp";
import { useGsapContext } from "@/hooks/useGsapContext";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { registerGSAP, gsap, ScrollTrigger } from "@/lib/gsap/gsapClient";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

type Step = {
  number: number;
  title: string;
  description: string;
  icon: StaticImageData;
};

const steps: Step[] = [
  {
    number: 1,
    title: "Kies uw plan",
    description:
      "Kies de basis of laat ons het platform op maat inrichten op basis van uw wensen en vlootgrootte.",
    icon: iconPlan,
  },
  {
    number: 2,
    title: "Direct aan de slag",
    description: "Log in op de app, en wij regelen uw aftersales-werkzaamheden.",
    icon: iconStart,
  },
  {
    number: 3,
    title: "Word volledig ontzorgd",
    description: "Volledige ontzorging door onze specialisten en het slimme algoritme van de app",
    icon: iconOntzorgd,
  },
];

/** Hoogte in beeld waar de voortgangslijn loopt: een stap licht op als zijn icoon deze lijn passeert. */
const TIMELINE_LINE = "center 65%";

/** Ruimte tussen de onder-/bovenkant van een icoon en het begin/einde van een lijnstuk. */
const SEGMENT_GAP = 12;

function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function TimelineStep({ step }: { step: Step }) {
  return (
    <li className="method-step flex gap-6 pb-24 last:pb-0 md:gap-12">
      <div className="method-node flex h-14 w-14 flex-shrink-0 items-center justify-center">
        <Image src={step.icon} alt="" aria-hidden className="method-icon h-14 w-14" sizes="56px" />
      </div>
      <div className="method-content flex-1 pt-3">
        <span className="text-sm font-bold uppercase tracking-[0.3em] text-brand">
          {String(step.number).padStart(2, "0")}
        </span>
        <h3 className="mb-4 mt-3 text-xl font-light uppercase tracking-tight text-brand sm:text-2xl md:text-3xl">
          {step.title}
        </h3>
        <p className="max-w-xl text-sm font-light leading-normal text-neutral-600">
          {step.description}
        </p>
        <Link
          href="/oplossingen"
          className="-mb-3 mt-3 flex w-fit items-center gap-2 py-3 font-medium text-brand transition-transform duration-200 hover:translate-x-1"
        >
          <span className="text-sm uppercase tracking-widest">Lees meer</span>
          <ArrowIcon />
        </Link>
      </div>
    </li>
  );
}

/** Plaatst elk lijnstuk van onder het ene icoon tot boven het volgende. */
function useTimelineTrack(timelineRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const el = timelineRef.current;
    if (!el) return;
    const size = () => {
      // Offsets i.p.v. getBoundingClientRect: de schaal-animatie van de iconen mag niet meetellen.
      // The icon fills the whole node (h-14), so each segment starts right below and ends right above a node.
      const nodes = el.querySelectorAll<HTMLElement>(".method-node");
      const segments = el.querySelectorAll<HTMLElement>(".method-segment");
      segments.forEach((segment, i) => {
        const from = nodes[i];
        const to = nodes[i + 1];
        if (!from || !to) return;
        const top = from.offsetTop + from.offsetHeight + SEGMENT_GAP;
        const bottom = to.offsetTop - SEGMENT_GAP;
        segment.style.top = `${top}px`;
        segment.style.height = `${Math.max(0, bottom - top)}px`;
      });
    };
    size();
    const observer = new ResizeObserver(size);
    observer.observe(el);
    return () => observer.disconnect();
  }, [timelineRef]);
}

export function MethodSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useTimelineTrack(timelineRef);

  useGsapContext(
    sectionRef,
    () => {
      registerGSAP();
      const scope = sectionRef.current;
      const timeline = timelineRef.current;
      if (!scope || !timeline) return;

      const leftCol = scope.querySelector(".method-sticky");
      const progressEls = timeline.querySelectorAll<HTMLElement>(".method-progress");
      const stepEls = timeline.querySelectorAll<HTMLElement>(".method-step");
      const nodes = timeline.querySelectorAll<HTMLElement>(".method-node");
      if (nodes.length === 0) return;

      if (leftCol) {
        gsap.fromTo(
          leftCol,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: { trigger: scope, start: "top 80%", once: true },
          }
        );
      }

      // Pas nu dimmen we de stappen: zonder JS of bij reduced motion blijft alles zichtbaar
      timeline.classList.add("is-ready");

      // Op mobiel loopt de lijn lager in beeld, zodat een stap actief is zodra hij goed zichtbaar is
      const activateLine = window.matchMedia("(max-width: 767px)").matches
        ? "center 90%"
        : TIMELINE_LINE;

      // Elk lijnstuk loopt vol terwijl de scroll van het ene icoon naar het volgende gaat
      progressEls.forEach((progress, i) => {
        gsap.fromTo(
          progress,
          { height: "0%" },
          {
            height: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: nodes[i],
              start: activateLine,
              endTrigger: nodes[i + 1],
              end: activateLine,
              scrub: 0.6,
              // Lichtpunt alleen tonen terwijl de lijn onderweg is, niet aan de uiteinden
              onUpdate: (self) =>
                progress.classList.toggle(
                  "is-moving",
                  self.progress > 0.03 && self.progress < 0.97
                ),
            },
          }
        );
      });

      // Een stap licht op zodra de lijn het bolletje bereikt
      stepEls.forEach((stepEl, i) => {
        ScrollTrigger.create({
          trigger: nodes[i],
          start: activateLine,
          onEnter: () => stepEl.classList.add("is-active"),
          onLeaveBack: () => stepEl.classList.remove("is-active"),
        });
      });
    },
    { enabled: !prefersReducedMotion, deps: [] }
  );

  return (
    <section
      id="method"
      ref={sectionRef}
      className="method-surface relative z-[3] py-section"
      aria-labelledby="method-heading"
    >
      <Container>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          {/* Links: sticky op desktop */}
          <div className="lg:col-span-5">
            <div className="method-sticky lg:sticky lg:top-24">
              <h2
                id="method-heading"
                className="font-heading text-4xl font-light leading-[1.1] tracking-tight text-brand sm:text-5xl md:text-6xl"
              >
                Hoe het <br />
                <span className="font-semibold">werkt.</span>
              </h2>
              <p className="mb-12 mt-6 max-w-md text-sm font-light leading-normal text-neutral-600">
                In drie stappen naar een beter beheerd wagenpark. Wij combineren data met intuïtieve
                technologie.
              </p>
              <Button
                variant="primary"
                href="/contact"
                className="px-10 py-5 text-sm font-bold uppercase tracking-widest"
              >
                Vraag Demo Aan
              </Button>
            </div>
          </div>

          {/* Rechts: tijdlijn */}
          <div className="pt-8 lg:col-span-7 lg:pt-0">
            <div ref={timelineRef} className="method-timeline relative">
              {steps.slice(1).map((step) => (
                <div
                  key={step.number}
                  className="method-segment pointer-events-none absolute left-7 w-px -translate-x-1/2 bg-neutral-200"
                  aria-hidden
                >
                  <div className="method-progress absolute inset-x-0 top-0 h-full bg-brand">
                    <span className="method-head" aria-hidden />
                  </div>
                </div>
              ))}
              <ol>
                {steps.map((step) => (
                  <TimelineStep key={step.number} step={step} />
                ))}
              </ol>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
