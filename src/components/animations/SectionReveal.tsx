"use client";

import { useGSAP } from "@/hooks/useGSAP";
import { sectionReveal } from "@/lib/gsapConfig";
import { ScrollTrigger } from "@/lib/gsap/gsapClient";
import type { ReactNode } from "react";

type SectionRevealProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Basis section reveal: fade + y. ScrollTrigger alleen als ScrollTrigger reeds geladen.
 * Gebruik alleen in client components.
 */
export function SectionReveal({ children, className = "" }: SectionRevealProps) {
  const ref = useGSAP((ctx) => {
    const el = ref.current;
    if (!el) return;
    ctx.add(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        onEnter: () => sectionReveal(el),
      });
    });
  });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
