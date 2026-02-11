"use client";

import { useRef, useEffect, type RefObject } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useGsapContext } from "@/hooks/useGsapContext";
import { animateCounter } from "@/lib/gsap/counter";

/**
 * Teller die bij scroll in beeld van 0 naar doelwaarde telt.
 * Cleanup via gsap.context. Bij prefers-reduced-motion geen animatie (toon direct de waarde).
 */
export function useCounter<T extends HTMLElement>(
  to: number,
  duration?: number
): RefObject<T | null> {
  const ref = useRef<T>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGsapContext(ref, () => {
    if (ref.current) animateCounter(ref.current, to, duration);
  }, { enabled: !prefersReducedMotion });

  useEffect(() => {
    if (prefersReducedMotion && ref.current) {
      ref.current.textContent = String(to);
    }
  }, [prefersReducedMotion, to]);

  return ref;
}
