"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Roept ScrollTrigger.refresh() aan indien GSAP geladen. Defensief: geen throw.
 */
function safeScrollTriggerRefresh(): void {
  if (typeof window === "undefined") return;
  import("@/lib/gsap/gsapClient")
    .then(({ ScrollTrigger }) => ScrollTrigger?.refresh?.())
    .catch(() => {});
}

/**
 * Stacked fixed section: wanneer de top van de slot de viewport-top bereikt,
 * wordt de sectie fixed. Slot krijgt height: 100vh om layout te behouden.
 * Roept ScrollTrigger.refresh() aan bij toggle/resize (defensief).
 */
export function useStackedFixedSection() {
  const slotRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isFixed, setIsFixed] = useState(false);
  const [slotHeight, setSlotHeight] = useState<number | null>(null);
  const [slotWidth, setSlotWidth] = useState<number | null>(null);
  const tickingRef = useRef(false);
  const prevFixedRef = useRef(false);

  const refreshScrollTrigger = useCallback(() => {
    safeScrollTriggerRefresh();
  }, []);

  const isDesktop = useCallback(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(min-width: 1024px)").matches;
  }, []);

  const check = useCallback(() => {
    const slot = slotRef.current;
    const section = sectionRef.current;
    if (!slot || !section) return;
    if (!isDesktop()) {
      setIsFixed(false);
      setSlotHeight(null);
      return;
    }

    const top = slot.getBoundingClientRect().top;
    // Hysteresis: voorkomt flikkeren bij de drempel (5px buffer)
    const shouldBeFixed = top <= 0;
    const shouldBeUnfixed = top > 5;

    if (shouldBeFixed) {
      // Gebruik de actuele slot-afmetingen om layout-shift te voorkomen
      const height = slot.offsetHeight;
      const width = slot.offsetWidth;
      setIsFixed(true);
      setSlotHeight(height);
      setSlotWidth(width);
    } else if (shouldBeUnfixed) {
      setIsFixed(false);
      setSlotHeight(null);
      setSlotWidth(null);
    }
  }, [isDesktop]);

  const onScroll = useCallback(() => {
    if (tickingRef.current) return;
    tickingRef.current = true;
    requestAnimationFrame(() => {
      check();
      tickingRef.current = false;
    });
  }, [check]);

  const onResize = useCallback(() => {
    check();
    refreshScrollTrigger();
  }, [check, refreshScrollTrigger]);

  useEffect(() => {
    // On mobile the hook is inert — skip listeners to avoid unnecessary work
    // and prevent ScrollTrigger.refresh() firing on address-bar resize.
    if (!isDesktop()) {
      setIsFixed(false);
      setSlotHeight(null);
      setSlotWidth(null);
      return;
    }

    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [check, onScroll, onResize, isDesktop]);

  // ScrollTrigger.refresh na toggle — UIT: veroorzaakt card-sprong bij eerste scroll
  // Alleen refresh bij resize (onResize)
  useEffect(() => {
    prevFixedRef.current = isFixed;
  }, [isFixed]);

  return { slotRef, sectionRef, isFixed, slotHeight, slotWidth };
}
