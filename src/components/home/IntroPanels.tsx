"use client";

import { useRef, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useGsapContext } from "@/hooks/useGsapContext";
import { registerGSAP, gsap } from "@/lib/gsap/gsapClient";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type IntroPanelsProps = {
  hero: ReactNode;
  nextSection: ReactNode;
};

/**
 * Slideshow-scroll: Hero (panel 1) blijft sticky, "Wat we doen" (panel 2) schuift
 * over de hero heen bij de eerste scroll. Wrapper 200vh; na de scrub normale scroll.
 * Bij prefers-reduced-motion: geen trigger, beide secties gewoon gestapeld (geen animatie).
 */
export function IntroPanels({ hero, nextSection }: IntroPanelsProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const panel2Ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGsapContext(wrapperRef, (ctx) => {
    if (prefersReducedMotion) return;
    registerGSAP();
    const wrapper = wrapperRef.current;
    const panel2 = panel2Ref.current;
    if (!wrapper || !panel2) return;

    ctx.add(() => {
      gsap.set(panel2, { yPercent: 100 });

      ScrollTrigger.create({
        trigger: wrapper,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          gsap.set(panel2, { yPercent: 100 - self.progress * 100 });
        },
      });
    });
  }, { enabled: !prefersReducedMotion });

  if (prefersReducedMotion) {
    return (
      <>
        <div className="-mt-16 min-h-screen w-full">{hero}</div>
        <div className="min-h-screen w-full">{nextSection}</div>
      </>
    );
  }

  return (
    <div ref={wrapperRef} className="relative -mt-16" style={{ height: "200vh" }}>
      <div className="sticky top-0 h-screen w-full" style={{ zIndex: 1 }}>
        {hero}
      </div>
      <div
        ref={panel2Ref}
        className="sticky top-0 h-screen w-full"
        style={{ zIndex: 2 }}
      >
        {nextSection}
      </div>
    </div>
  );
}
