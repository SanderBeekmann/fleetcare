"use client";

import { useRef, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useGsapContext } from "@/hooks/useGsapContext";
import {
  createRevealAnimations,
  createCounterAnimations,
  createStaggerAnimations,
  createLetterStaggerAnimations,
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
      createLetterStaggerAnimations(scope);
    },
    { enabled: !prefersReducedMotion, deps: [pathname] }
  );

  // Na registratie: ScrollTrigger posities bijwerken zodra layout klaar is
  // Meerdere refresh-momenten voor betrouwbare posities na font/image load
  useLayoutEffect(() => {
    if (prefersReducedMotion) return;
    registerGSAP();

    const refresh = () => ScrollTrigger.refresh();

    // Direct + rAF + korte delay
    refresh();
    const raf = requestAnimationFrame(refresh);
    const t1 = setTimeout(refresh, 150);

    // Na fonts geladen (belangrijk voor correcte layout)
    document.fonts?.ready?.then(refresh);

    // Na volledige page load
    const onLoad = () => {
      refresh();
      window.removeEventListener("load", onLoad);
    };
    window.addEventListener("load", onLoad);
    if (document.readyState === "complete") onLoad();

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      window.removeEventListener("load", onLoad);
    };
  }, [pathname, prefersReducedMotion]);

  return <div ref={scopeRef}>{children}</div>;
}
