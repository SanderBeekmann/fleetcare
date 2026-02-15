/**
 * Letter-by-letter stagger animatie voor titels.
 * Zoekt [data-letter-stagger] en animeert elke letter (span child) met ScrollTrigger.
 * Werkt met AnimatedTitle component of met DOM-split voor elementen die alleen tekst hebben.
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const DURATION = 0.5;
const STAGGER = 0.03;
const EASE = "power2.out";
const FROM = { opacity: 0 };
const START = "top 90%";
const TOGGLE = "play none none reverse";
const TOGGLE_NO_REVERSE = "play none none none";

/**
 * Split tekst in woorden, elk woord in letters. Woorden blijven bij elkaar
 * zodat de natuurlijke regelbreking behouden blijft (geen ongewenste breaks
 * tussen letters door inline-block).
 */
function splitToLetters(el: HTMLElement): HTMLSpanElement[] {
  const text = el.textContent ?? "";
  if (!text.trim()) return [];

  const fragment = document.createDocumentFragment();
  const letterSpans: HTMLSpanElement[] = [];

  const words = text.split(/(\s+)/); // behoud spaties als aparte "woorden"

  for (const word of words) {
    if (word === "") continue;

    if (/^\s+$/.test(word)) {
      // Alleen spaties: één span om de ruimte te behouden
      const spaceSpan = document.createElement("span");
      spaceSpan.style.whiteSpace = "pre";
      spaceSpan.textContent = word;
      fragment.appendChild(spaceSpan);
      continue;
    }

    const wordWrapper = document.createElement("span");
    wordWrapper.style.display = "inline";

    for (const char of word) {
      const span = document.createElement("span");
      span.style.display = "inline-block";
      span.style.verticalAlign = "bottom";
      span.textContent = char;
      wordWrapper.appendChild(span);
      letterSpans.push(span);
    }

    fragment.appendChild(wordWrapper);
  }

  el.textContent = "";
  el.appendChild(fragment);
  return letterSpans;
}

/**
 * Registreer letter-stagger animaties voor alle [data-letter-stagger] binnen scope.
 * Als het element al span-kinderen heeft (van AnimatedTitle), animeer die.
 * Anders splits de tekst eerst in letters.
 */
export function createLetterStaggerAnimations(scope: HTMLElement | null): void {
  if (!scope) return;

  const elements = scope.querySelectorAll<HTMLElement>("[data-letter-stagger]");

  elements.forEach((el) => {
    const hasSpanChildren = el.querySelector(":scope > span");
    const letters = hasSpanChildren
      ? (Array.from(el.children) as HTMLSpanElement[])
      : splitToLetters(el);
    if (letters.length === 0) return;

    const noReverse = el.hasAttribute("data-reveal-no-reverse");
    const delay = parseFloat(el.dataset.delay ?? "0") || 0;
    const toggleActions = noReverse ? TOGGLE_NO_REVERSE : TOGGLE;

    gsap.fromTo(
      letters,
      FROM,
      {
        opacity: 1,
        duration: DURATION,
        delay,
        stagger: STAGGER,
        ease: EASE,
        scrollTrigger: {
          trigger: el,
          start: START,
          toggleActions,
        },
      }
    );
  });
}
