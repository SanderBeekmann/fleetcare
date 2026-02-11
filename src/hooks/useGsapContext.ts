"use client";

import { useLayoutEffect, useRef, type RefObject } from "react";
import { registerGSAP, gsap } from "@/lib/gsap/gsapClient";

type GsapContextCallback = (ctx: ReturnType<typeof gsap.context>) => void;

export type UseGsapContextOptions = {
  /** Bij false worden geen animaties geregistreerd (bijv. prefers-reduced-motion). */
  enabled?: boolean;
  /** Extra dependencies: effect draait opnieuw wanneer deze wijzigen (bijv. pathname bij route change). */
  deps?: React.DependencyList;
};

/**
 * Zet gsap.context op rond scopeRef en voert callback uit.
 * Bij unmount of dep-change: ctx.revert() — alle tweens en ScrollTriggers in die scope worden gekilld.
 * Voorkomt dubbele registraties bij route transitions.
 */
export function useGsapContext<T extends HTMLElement>(
  scopeRef: RefObject<T | null>,
  callback: GsapContextCallback,
  options: UseGsapContextOptions = {}
): void {
  const { enabled = true, deps = [] } = options;
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useLayoutEffect(() => {
    if (!enabled) return;
    registerGSAP();
    if (!scopeRef.current) return;

    const ctx = gsap.context((context) => {
      callbackRef.current(context);
    }, scopeRef as RefObject<HTMLElement>);

    return () => {
      ctx.revert();
    };
  }, [scopeRef, enabled, ...deps]);
}
