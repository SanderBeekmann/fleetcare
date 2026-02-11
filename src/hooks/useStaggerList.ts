"use client";

import { useRef, type RefObject } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useGsapContext } from "@/hooks/useGsapContext";
import { staggerChildren } from "@/lib/gsap/stagger";

/**
 * Stagger-animatie voor de directe kinderen van de container.
 * Cleanup via gsap.context. Bij prefers-reduced-motion geen animatie.
 */
export function useStaggerList<T extends HTMLElement>(
  opts?: { duration?: number; stagger?: number; y?: number }
): RefObject<T | null> {
  const ref = useRef<T>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGsapContext(ref, () => {
    staggerChildren(ref.current, opts);
  }, { enabled: !prefersReducedMotion });

  return ref;
}
