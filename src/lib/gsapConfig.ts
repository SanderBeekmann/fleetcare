/**
 * GSAP defaults en utilities.
 * Gebruik alleen in client components via useGSAP.
 */

import { gsap } from "gsap";

export const DEFAULT_DURATION = 0.5;
export const DEFAULT_STAGGER = 0.1;
export const DEFAULT_EASE = "power2.out" as const;

export function sectionReveal(
  element: HTMLElement,
  opts?: { y?: number; duration?: number; ease?: string }
) {
  const y = opts?.y ?? 24;
  const duration = opts?.duration ?? DEFAULT_DURATION;
  const ease = opts?.ease ?? DEFAULT_EASE;
  gsap.fromTo(
    element,
    { opacity: 0, y },
    { opacity: 1, y: 0, duration, ease }
  );
}

export function fadeIn(
  element: HTMLElement,
  opts?: { duration?: number; delay?: number }
) {
  const duration = opts?.duration ?? DEFAULT_DURATION;
  const delay = opts?.delay ?? 0;
  gsap.fromTo(element, { opacity: 0 }, { opacity: 1, duration, delay });
}

export function staggerReveal(
  elements: HTMLElement[] | gsap.TweenTarget,
  opts?: { duration?: number; stagger?: number; y?: number }
) {
  const duration = opts?.duration ?? DEFAULT_DURATION;
  const stagger = opts?.stagger ?? DEFAULT_STAGGER;
  const y = opts?.y ?? 12;
  gsap.fromTo(
    elements,
    { opacity: 0, y },
    { opacity: 1, y: 0, duration, stagger, ease: DEFAULT_EASE }
  );
}
