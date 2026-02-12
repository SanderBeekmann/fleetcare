"use client";

import { useLayoutEffect, useRef } from "react";
import { registerGSAP, gsap, ScrollTrigger } from "@/lib/gsap/gsapClient";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Fade card content wanneer deze over de bovengrens van #wat-we-doen beweegt.
 * Vereist .phoneCardHeroContent en .phoneCardSectionContent binnen .phoneCard.
 */
export function useCardContentOverSection() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const ctxRef = useRef<ReturnType<typeof gsap.context> | null>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion || typeof window === "undefined") return;

    const section = document.getElementById("wat-we-doen");
    const heroContent = document.querySelector(".phoneCardHeroContent");
    const sectionContent = document.querySelector(".phoneCardSectionContent");

    if (!section || !heroContent || !sectionContent) return;

    registerGSAP();

    ctxRef.current = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "top top",
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;
          // Eerst hero volledig uit, daarna sectie in (geen crossfade) — alleen tekst, geen opmaak switch
          if (p <= 0.5) {
            gsap.set(heroContent, { opacity: 1 - p * 2 });
            gsap.set(sectionContent, { opacity: 0 });
          } else {
            gsap.set(heroContent, { opacity: 0 });
            const fade = (p - 0.5) * 2;
            gsap.set(sectionContent, { opacity: fade });
          }
        },
      });
    });

    return () => {
      ctxRef.current?.revert();
      ctxRef.current = null;
    };
  }, [prefersReducedMotion]);
}
