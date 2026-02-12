/**
 * Stagger-animaties voor containers: kinderen komen gestaggerd in.
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const STAGGER_DURATION = 0.5;
const STAGGER_DELAY = 0.08;
const STAGGER_Y = 16;
const STAGGER_EASE = "power2.out";
const STAGGER_START = "top 85%";
const STAGGER_TOGGLE = "play none none reverse";

/**
 * Animeer directe kinderen van container met stagger.
 * Moet binnen gsap.context(scope) worden aangeroepen voor cleanup.
 */
export function staggerChildren(
  container: HTMLElement | null,
  opts?: {
    duration?: number;
    stagger?: number;
    y?: number;
  }
): void {
  if (!container) return;

  const children = Array.from(container.children) as HTMLElement[];
  if (children.length === 0) return;

  const duration = opts?.duration ?? STAGGER_DURATION;
  const stagger = opts?.stagger ?? STAGGER_DELAY;
  const y = opts?.y ?? STAGGER_Y;

  gsap.fromTo(
    children,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      ease: STAGGER_EASE,
      scrollTrigger: {
        trigger: container,
        start: STAGGER_START,
        toggleActions: STAGGER_TOGGLE,
      },
    }
  );
}

/**
 * Zoek alle elementen met data-stagger="children" binnen scope en run staggerChildren erop.
 * Optioneel: data-stagger-delay en data-stagger-duration (getal als string).
 */
export function createStaggerAnimations(scope: HTMLElement | null): void {
  if (!scope) return;

  const containers = scope.querySelectorAll<HTMLElement>('[data-stagger="children"]');
  containers.forEach((container) => {
    const delayRaw = container.dataset.staggerDelay;
    const durationRaw = container.dataset.staggerDuration;
    const opts: Parameters<typeof staggerChildren>[1] = {};
    if (delayRaw) {
      const n = parseFloat(delayRaw);
      if (Number.isFinite(n)) opts.stagger = n;
    }
    if (durationRaw) {
      const n = parseFloat(durationRaw);
      if (Number.isFinite(n)) opts.duration = n;
    }
    staggerChildren(container, opts);
  });
}
