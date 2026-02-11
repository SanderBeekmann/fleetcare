"use client";

import { useLayoutEffect, useRef } from "react";
import { registerGSAP, gsap } from "@/lib/gsap/gsapClient";

/**
 * useGSAP — client-only, useLayoutEffect, gsap.context voor cleanup.
 * Revert bij unmount. Respecteert prefers-reduced-motion.
 */
export function useGSAP(callback: (ctx: ReturnType<typeof gsap.context>) => void) {
  const ref = useRef<HTMLDivElement>(null);
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useLayoutEffect(() => {
    registerGSAP();
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    if (!ref.current) return;
    const ctx = gsap.context((context) => {
      callbackRef.current(context);
    }, ref);
    return () => ctx.revert();
  }, []);

  return ref;
}
