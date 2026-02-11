/**
 * Data-attribute driven scroll reveals.
 * createRevealAnimations(scope) zoekt binnen scope naar [data-reveal].
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const REVEAL_DURATION = 0.6;
const REVEAL_EASE = "power2.out";
const REVEAL_START = "top 85%";
const REVEAL_TOGGLE = "play none none reverse";

export type RevealType = "fade-up" | "fade-down" | "fade" | "fade-up-small";

const revealFrom: Record<RevealType, gsap.TweenVars> = {
  "fade-up": { opacity: 0, y: 28 },
  "fade-down": { opacity: 0, y: -28 },
  "fade-up-small": { opacity: 0, y: 16 },
  fade: { opacity: 0 },
};

function parseDelay(el: HTMLElement): number {
  const raw = el.dataset.delay;
  if (raw == null) return 0;
  const n = parseFloat(raw);
  return Number.isFinite(n) ? n : 0;
}

/**
 * Registreer scroll-reveal voor één element. Moet binnen gsap.context(scope) worden aangeroepen.
 */
export function revealElement(
  el: HTMLElement | null,
  opts?: { type?: RevealType; delay?: number }
): void {
  if (!el) return;
  const type = (opts?.type ?? "fade-up") as RevealType;
  const from = revealFrom[type] ?? revealFrom["fade-up"];
  const delay = opts?.delay ?? 0;
  gsap.fromTo(el, from, {
    opacity: 1,
    y: 0,
    duration: REVEAL_DURATION,
    delay,
    ease: REVEAL_EASE,
    scrollTrigger: {
      trigger: el,
      start: REVEAL_START,
      toggleActions: REVEAL_TOGGLE,
    },
  });
}

/**
 * Registreer ScrollTrigger-reveals voor alle elementen met data-reveal binnen scope.
 * Moet binnen gsap.context(scope) worden aangeroepen voor correcte cleanup.
 */
export function createRevealAnimations(scope: HTMLElement | null): void {
  if (!scope) return;

  const elements = scope.querySelectorAll<HTMLElement>("[data-reveal]");
  elements.forEach((el) => {
    const type = (el.dataset.reveal?.trim() || "fade-up") as RevealType;
    const from = revealFrom[type] ?? revealFrom["fade-up"];
    const delay = parseDelay(el);

    gsap.fromTo(
      el,
      from,
      {
        opacity: 1,
        y: 0,
        duration: REVEAL_DURATION,
        delay,
        ease: REVEAL_EASE,
        scrollTrigger: {
          trigger: el,
          start: REVEAL_START,
          toggleActions: REVEAL_TOGGLE,
        },
      }
    );
  });
}
