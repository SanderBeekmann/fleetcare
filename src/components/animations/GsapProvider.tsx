"use client";

import { useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useGsapContext } from "@/hooks/useGsapContext";
import {
  createRevealAnimations,
  createCounterAnimations,
  createStaggerAnimations,
} from "@/lib/gsap";
import type { ReactNode } from "react";

type GsapProviderProps = {
  children: ReactNode;
};

/**
 * Client wrapper rond page content. Initialiseert het data-attribute animatiesysteem
 * binnen één scope. Bij unmount (route change) wordt gsap.context reverted —
 * geen dubbele ScrollTrigger-registraties.
 * Respecteert prefers-reduced-motion.
 */
export function GsapProvider({ children }: GsapProviderProps) {
  const scopeRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGsapContext(scopeRef, (ctx) => {
    const scope = scopeRef.current;
    if (!scope) return;
    createRevealAnimations(scope);
    createCounterAnimations(scope);
    createStaggerAnimations(scope);
  }, { enabled: !prefersReducedMotion });

  return <div ref={scopeRef}>{children}</div>;
}
