"use client";

import { useLayoutEffect, useRef } from "react";
import { registerGSAP, gsap } from "@/lib/gsap/gsapClient";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const STAGGER_DELAY = 0.14;
const DURATION = 1;
const EASE = "power3.out";
const FROM_Y = 24;

/**
 * High-end staggered entrance-animatie voor hero tekst en buttons.
 * Draait op mount (geen scroll trigger).
 */
export function useHeroStaggerAnimation(scopeRef: React.RefObject<HTMLElement | null>) {
  const prefersReducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (prefersReducedMotion || typeof window === "undefined") return;
    const scope = scopeRef.current;
    if (!scope) return;

    const container = scope.querySelector<HTMLElement>("[data-hero-stagger]");
    if (!container) return;

    registerGSAP();

    const children = Array.from(container.children) as HTMLElement[];
    if (children.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.set(children, { opacity: 0, y: FROM_Y });

      gsap.to(children, {
        opacity: 1,
        y: 0,
        duration: DURATION,
        stagger: STAGGER_DELAY,
        ease: EASE,
      });
    }, scope);

    return () => ctx.revert();
  }, [scopeRef, prefersReducedMotion]);
}
