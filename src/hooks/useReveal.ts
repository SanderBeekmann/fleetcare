"use client";

import { useRef, type RefObject } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useGsapContext } from "@/hooks/useGsapContext";
import { revealElement, type RevealType } from "@/lib/gsap/reveal";

type UseRevealOptions = {
  type?: RevealType;
  delay?: number;
};

/**
 * Scroll-reveal (fade up + opacity) voor één element.
 * Cleanup via gsap.context. Bij prefers-reduced-motion geen animatie.
 */
export function useReveal<T extends HTMLElement>(
  opts?: UseRevealOptions
): RefObject<T | null> {
  const ref = useRef<T>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGsapContext(ref, () => {
    revealElement(ref.current, {
      type: opts?.type ?? "fade-up",
      delay: opts?.delay,
    });
  }, { enabled: !prefersReducedMotion });

  return ref;
}
