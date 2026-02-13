"use client";

import { useRef, useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Card } from "@/components/ui/Card";
import { registerGSAP, gsap } from "@/lib/gsap/gsapClient";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const testimonials = [
  {
    company: "Logistiek Transport",
    person: "Jan de Vries",
    logo: "LT",
    quote:
      "Eindelijk overzicht over al onze ritten. We zien direct waar elk voertuig staat en kunnen onderhoud plannen zonder gedoe. FleetCare Connect heeft ons werk echt vereenvoudigd.",
  },
  {
    company: "Bouw & Infra",
    person: "Maria van der Berg",
    logo: "BI",
    quote:
      "Onderhoud nooit meer vergeten. Het platform stuurt ons een seintje wanneer een voertuig aan de beurt is. Sinds we FleetCare Connect gebruiken loopt alles soepeler.",
  },
  {
    company: "Dienstverlening BV",
    person: "Peter Jansen",
    logo: "DB",
    quote:
      "Eén platform voor ons hele wagenpark. Realtime tracking, onderhoudsplanning en rapportages op één plek. Precies wat we nodig hadden voor ons groeiende bedrijf.",
  },
];

const DURATION = 36;

function TestimonialCard({ item }: { item: (typeof testimonials)[0] }) {
  return (
    <Card className="relative flex h-full w-[280px] min-h-[240px] shrink-0 flex-col overflow-hidden border-l-4 border-l-brand px-8 pt-3 pb-10 shadow-md transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg sm:min-h-[260px] sm:w-[320px] sm:px-10 sm:pt-4 sm:pb-12">
      <div className="mb-3 flex h-10 shrink-0 items-center sm:mb-4 sm:h-12" aria-hidden>
        <div className="flex h-8 w-16 items-center justify-center rounded bg-neutral-200 text-xs font-semibold text-neutral-900 sm:h-10 sm:w-20">
          {item.logo}
        </div>
      </div>
      <blockquote className="flex-1 break-words text-sm leading-relaxed text-neutral-600">
        &ldquo;{item.quote}&rdquo;
      </blockquote>
      <div className="mt-8 shrink-0 sm:mt-10">
        <h3 className="text-sm font-semibold text-brand">{item.company}</h3>
        <p className="mt-1 text-xs text-neutral-500">{item.person}</p>
      </div>
    </Card>
  );
}

export function TestimonialCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion || typeof window === "undefined") return;
    const track = trackRef.current;
    if (!track) return;

    registerGSAP();

    const startAnimation = () => {
      const fourthCard = track.children[3] as HTMLElement | undefined;
      const firstSetWidth = fourthCard ? fourthCard.offsetLeft : track.scrollWidth / 4;
      gsap.set(track, { x: 0 });
      const tl = gsap.timeline({ repeat: -1 });
      tl.to(track, { x: -firstSetWidth, duration: DURATION, ease: "none" });
      tl.set(track, { x: 0 });
      return tl;
    };

    let tl = startAnimation();
    tlRef.current = tl;

    const ro = new ResizeObserver(() => {
      tl.kill();
      tl = startAnimation();
      tlRef.current = tl;
    });
    ro.observe(track);

    return () => {
      ro.disconnect();
      tl.kill();
      tlRef.current = null;
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    const tl = tlRef.current;
    if (!tl) return;
    if (isHovered) tl.pause();
    else tl.play();
  }, [isHovered]);

  // Extra sets voor brede viewports — voorkomt lege ruimte aan de rechterkant
  const items = [...testimonials, ...testimonials, ...testimonials, ...testimonials];

  const [mobileIndex, setMobileIndex] = useState(0);

  return (
    <>
      {/* Mobiel: slideshow met pijltjes, geen pivot */}
      <div className="relative md:hidden">
        <div className="flex justify-center overflow-hidden">
          <TestimonialCard item={testimonials[mobileIndex]} />
        </div>
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => setMobileIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1))}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-700 shadow-sm transition-colors hover:bg-neutral-50 hover:text-brand"
            aria-label="Vorige testimonial"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <span className="text-sm text-neutral-500">
            {mobileIndex + 1} / {testimonials.length}
          </span>
          <button
            type="button"
            onClick={() => setMobileIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1))}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-700 shadow-sm transition-colors hover:bg-neutral-50 hover:text-brand"
            aria-label="Volgende testimonial"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Desktop: carousel met pivot */}
      <div
        className="relative hidden w-[100vw] max-w-none overflow-hidden py-12 sm:py-16 md:block"
        style={{ marginLeft: "calc(50% - 50vw)", perspective: "800px" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="origin-center"
          style={{
            transformStyle: "preserve-3d",
            transform: "rotateY(-8deg)",
          }}
        >
          <div
            ref={trackRef}
            className="flex items-stretch gap-16"
            style={{ width: "max-content" }}
          >
            {items.map((item, i) => (
              <TestimonialCard key={`${item.company}-${i}`} item={item} />
            ))}
          </div>
        </div>
        {/* Fade mask links */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-neutral-100 to-transparent sm:w-32"
          aria-hidden
        />
      </div>
    </>
  );
}
