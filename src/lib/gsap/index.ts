/**
 * Data-attribute animatie-systeem.
 * Eén init-call per scope (bijv. page wrapper); cleanup via gsap.context.
 */

export { registerGSAP, gsap, ScrollTrigger } from "./gsapClient";
export { createRevealAnimations, revealElement, type RevealType } from "./reveal";
export { createCounterAnimations, animateCounter } from "./counter";
export { createStaggerAnimations, staggerChildren } from "./stagger";
export { createLetterStaggerAnimations } from "./letterStagger";
