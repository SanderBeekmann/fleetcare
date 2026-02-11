/**
 * Teller-animatie: van 0 naar doelwaarde, getriggerd bij in viewport.
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const COUNTER_DURATION = 1.2;
const COUNTER_EASE = "power2.out";
const COUNTER_START = "top 85%";

/**
 * Animeer een getal in el van 0 naar `to` over `duration` seconden.
 * Wordt getriggerd wanneer el in viewport komt (ScrollTrigger).
 * Moet binnen gsap.context(scope) worden aangeroepen voor cleanup.
 */
export function animateCounter(
  el: HTMLElement,
  to: number,
  duration: number = COUNTER_DURATION
): void {
  const obj = { value: 0 };
  gsap.to(obj, {
    value: to,
    duration,
    ease: COUNTER_EASE,
    snap: { value: 1 },
    onUpdate: () => {
      el.textContent = String(Math.round(obj.value));
    },
    scrollTrigger: {
      trigger: el,
      start: COUNTER_START,
      toggleActions: "play none none none",
    },
  });
}

/**
 * Registreer counter-animaties voor alle elementen met data-counter binnen scope.
 * data-counter is het doelgetal (bijv. "1200").
 */
export function createCounterAnimations(scope: HTMLElement | null): void {
  if (!scope) return;

  const elements = scope.querySelectorAll<HTMLElement>("[data-counter]");
  elements.forEach((el) => {
    const raw = el.dataset.counter?.trim();
    const to = raw ? parseInt(raw, 10) : 0;
    if (!Number.isFinite(to)) return;
    animateCounter(el, to);
  });
}
