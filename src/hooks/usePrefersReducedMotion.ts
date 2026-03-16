"use client";

import { useState, useEffect } from "react";

/**
 * Leest de prefers-reduced-motion media query.
 * Gebruik om GSAP-animaties niet te starten of sterk te reduceren.
 *
 * Start met `false` op zowel server als client (hydration-safe),
 * en schakelt naar de werkelijke waarde na mount.
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return prefersReducedMotion;
}
