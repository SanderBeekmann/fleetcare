/**
 * Heading reveal for [data-letter-stagger]: the heading (or each pre-split line) rises in
 * softly once it scrolls into view. The attribute name is kept for existing markup.
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const DURATION = 0.9;
const EASE = "power3.out";
const FROM = { opacity: 0, y: 12 };
const START = "top 90%";
/** Play once: headings stay in place when scrolling back. */
const TOGGLE = "play none none none";

/** Registers the heading reveal for every [data-letter-stagger] inside scope. */
export function createLetterStaggerAnimations(scope: HTMLElement | null): void {
  if (!scope) return;

  const elements = scope.querySelectorAll<HTMLElement>("[data-letter-stagger]");

  // The heading rises in as a whole instead of letter by letter: calmer and more
  // professional, and the text is never split into spans.
  elements.forEach((el) => {
    const delay = parseFloat(el.dataset.delay ?? "0") || 0;

    gsap.fromTo(
      el,
      { ...FROM, immediateRender: false },
      {
        opacity: 1,
        y: 0,
        duration: DURATION,
        delay,
        ease: EASE,
        scrollTrigger: {
          trigger: el,
          start: START,
          toggleActions: TOGGLE,
        },
      }
    );
  });
}
