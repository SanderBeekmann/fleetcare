/**
 * Page intro: hero elements marked with data-intro-item rise in one by one on page load.
 * globals.css hides them until this runs (with a failsafe), so there is no flash of content.
 */

import { gsap } from "gsap";

const INTRO_Y = 28;
const INTRO_DURATION = 1;
const INTRO_STAGGER = 0.1;
const INTRO_DELAY = 0.1;
const INTRO_EASE = "power3.out";

/** Must run inside gsap.context(scope) for cleanup. */
export function createIntroAnimations(scope: HTMLElement | null): void {
  if (!scope) return;
  const items = scope.querySelectorAll<HTMLElement>("[data-intro-item]");
  if (items.length === 0) return;

  gsap.fromTo(
    items,
    { opacity: 0, y: INTRO_Y },
    {
      opacity: 1,
      y: 0,
      duration: INTRO_DURATION,
      stagger: INTRO_STAGGER,
      delay: INTRO_DELAY,
      ease: INTRO_EASE,
      // No lingering transform once settled
      clearProps: "transform",
    }
  );
}
