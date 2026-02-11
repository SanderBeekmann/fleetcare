"use client";

import { useRef, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useGsapContext } from "@/hooks/useGsapContext";
import {
  createRevealAnimations,
  createCounterAnimations,
  createStaggerAnimations,
} from "@/lib/gsap";
import { registerGSAP, ScrollTrigger } from "@/lib/gsap/gsapClient";
import type { ReactNode } from "react";

type GsapProviderProps = {
  children: ReactNode;
};

/**
 * Client wrapper rond page content. Initialiseert het data-attribute animatiesysteem
 * binnen één scope. Bij route change (pathname) wordt opnieuw geregistreerd voor de
 * nieuwe content. ScrollTrigger.refresh() na setup voor correcte posities na layout.
 * Respecteert prefers-reduced-motion.
 */
export function GsapProvider({ children }: GsapProviderProps) {
  const scopeRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const pathname = usePathname();

  useGsapContext(
    scopeRef,
    () => {
      const scope = scopeRef.current;
      if (!scope) return;
      createRevealAnimations(scope);
      createCounterAnimations(scope);
      createStaggerAnimations(scope);
    },
    { enabled: !prefersReducedMotion, deps: [pathname] }
  );

  // Na registratie: ScrollTrigger posities bijwerken zodra layout klaar is
  useLayoutEffect(() => {
    if (prefersReducedMotion) return;
    registerGSAP();
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(raf);
  }, [pathname, prefersReducedMotion]);

  return <div ref={scopeRef}>{children}</div>;
}
