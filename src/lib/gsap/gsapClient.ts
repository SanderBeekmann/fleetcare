/**
 * GSAP client-only setup.
 * - Register ScrollTrigger
 * - ScrollTrigger.config(ignoreMobileResize: true)
 * Import alleen in client components.
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function registerGSAP(): void {
  if (typeof window === "undefined") return;
  if (registered) return;
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
  registered = true;
}

export { gsap, ScrollTrigger };
