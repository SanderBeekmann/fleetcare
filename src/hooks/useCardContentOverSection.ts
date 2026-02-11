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
    const card = document.querySelector(".phoneCard") as HTMLElement;
    const heroContent = document.querySelector(".phoneCardHeroContent");
    const sectionContent = document.querySelector(".phoneCardSectionContent");

    if (!section || !card || !heroContent || !sectionContent) return;

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
          // Eerst hero volledig uit, daarna sectie in (geen crossfade)
          if (p <= 0.5) {
            gsap.set(heroContent, { opacity: 1 - p * 2 });
            gsap.set(sectionContent, { opacity: 0 });
            gsap.set(sectionContent.querySelectorAll("*"), { clearProps: "color" });
            gsap.set(card, {
              backgroundColor: "rgba(255, 255, 255, 0.4)",
              borderColor: "#074789",
            });
          } else {
            gsap.set(heroContent, { opacity: 0 });
            const fade = (p - 0.5) * 2;
            gsap.set(sectionContent, { opacity: fade });
            // Card fadet soepel van glasmorphism naar blauw (blijft dunne blauwe stroke)
            const r = Math.round(255 - 248 * fade);
            const g = Math.round(255 - 184 * fade);
            const b = Math.round(255 - 118 * fade);
            const a = 0.8 + 0.1 * fade;
            gsap.set(card, {
              backgroundColor: `rgba(${r}, ${g}, ${b}, ${a})`,
              borderColor: "#074789",
            });
            // Tekst fade van donker naar wit voor leesbaarheid op blauwe achtergrond
            const tr = Math.round(30 + 225 * fade);
            const tg = Math.round(41 + 214 * fade);
            const tb = Math.round(59 + 196 * fade);
            gsap.set(sectionContent.querySelectorAll("*"), {
              color: `rgb(${tr}, ${tg}, ${tb})`,
            });
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
