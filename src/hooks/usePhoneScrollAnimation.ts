"use client";

import { useLayoutEffect, useRef } from "react";
import { registerGSAP, gsap, ScrollTrigger } from "@/lib/gsap/gsapClient";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const PHONE_MOVE_X = 60;
const PHONE_MOVE_Y = -15;
/** Op mobiel: eindstate 44px rechts en 36px omhoog extra (voorkomt overlap met titel) */
const MOBILE_BREAKPOINT = 1023;
const PHONE_MOVE_X_MOBILE = PHONE_MOVE_X + 44;
const PHONE_MOVE_Y_MOBILE = PHONE_MOVE_Y - 36;
const CARD_SCALE_END = 0.92;
const PIVOT_ROTATION = 3; // Kleine pivot (graden) aan einde
/** Op kleinere desktop: telefoon verkleint tijdens scroll (alleen binnen matchMedia). */
const SMALL_DESKTOP_BREAKPOINT = "(max-width: 1280px)";
const PHONE_SCALE_END = 0.88; // scale telefoon aan einde scroll (kleinere desktop)
/** Op kleinere desktop: cards 64px lager in endstate (startpositie in hero ongewijzigd). */
const CARD_END_Y_OFFSET_SMALL_DESKTOP = 64;

/**
 * Scroll-gekoppelde animatie: phoneWrap naar rechts, phoneCard naar rechterbovenhoek phoneMockup.
 * Require .phoneWrap, .phoneMockup, .phoneCard en [data-scroll-trigger] binnen scopeRef.
 */
export function usePhoneScrollAnimation(scopeRef: React.RefObject<HTMLElement | null>) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const ctxRef = useRef<ReturnType<typeof gsap.context> | null>(null);
  const mmRef = useRef<ReturnType<typeof gsap.matchMedia> | null>(null);
  const resizeCleanupRef = useRef<(() => void) | null>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion || typeof window === "undefined") return;
    if (!scopeRef.current) return;

    registerGSAP();

    let cancelled = false;
    const runSetup = () => {
      if (cancelled || !scopeRef.current) return;
      ctxRef.current = gsap.context(() => {
      const trigger = scopeRef.current?.querySelector("[data-scroll-trigger]");
      const phoneWrap = scopeRef.current?.querySelector(".phoneWrap");
      const phoneMockup = scopeRef.current?.querySelector(".phoneMockup");
      const phoneCard = scopeRef.current?.querySelector(".phoneCard");
      const cardLeft = scopeRef.current?.querySelector(".phoneCardLeft");
      const cardRight = scopeRef.current?.querySelector(".phoneCardRight");

      if (!trigger || !phoneWrap || !phoneMockup || !phoneCard) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger,
          start: "top top",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      // Cache eindpositie na 5% scroll — voorkomt sprong door layout-wijziging tijdens animatie
      let cachedEnd: { x: number; y: number } | null = null;
      const onResize = () => { cachedEnd = null; };
      window.addEventListener("resize", onResize);
      resizeCleanupRef.current = () => window.removeEventListener("resize", onResize);

      // phoneWrap: subtiel naar rechts, licht omhoog, kleine pivot aan einde
      // Op mobiel: extra 32px rechts, 12px omhoog zodat mockup niet over "Wat we doen" valt
      tl.to(
        phoneWrap,
        {
          x: () => (typeof window !== "undefined" && window.innerWidth <= MOBILE_BREAKPOINT ? PHONE_MOVE_X_MOBILE : PHONE_MOVE_X),
          y: () => (typeof window !== "undefined" && window.innerWidth <= MOBILE_BREAKPOINT ? PHONE_MOVE_Y_MOBILE : PHONE_MOVE_Y),
          rotation: PIVOT_ROTATION,
          transformOrigin: "center bottom",
          ease: "none",
          duration: 1,
        },
        0
      );

      // Kleinere desktop: telefoon verkleint tijdens scroll (zelfde timeline, geen extra trigger)
      mmRef.current = gsap.matchMedia();
      mmRef.current.add(SMALL_DESKTOP_BREAKPOINT, () => {
        gsap.set(phoneMockup, { transformOrigin: "center bottom" });
        tl.to(
          phoneMockup,
          {
            scale: PHONE_SCALE_END,
            ease: "none",
            duration: 1,
          },
          0
        );
        return () => {
          gsap.set(phoneMockup, { scale: 1 });
        };
      });

      // phoneCard: dynamisch naar rechterbovenhoek phoneMockup (relatief t.o.v. phoneWrap)
      // Cache eindpositie na 5% scroll — voorkomt sprong door layout-wijziging (section fixed) tijdens animatie
      const getCardEndPosition = () => {
        const progress = tl.scrollTrigger?.progress ?? 0;
        if (progress < 0.02) cachedEnd = null;

        const pc = phoneCard.getBoundingClientRect();
        const isMobile = typeof window !== "undefined" && window.innerWidth <= 1023;
        const anchor = typeof document !== "undefined" ? document.querySelector("[data-card-anchor]") : null;

        const calc = (): { x: number; y: number } => {
          if (isMobile && anchor) {
            const anchorRect = anchor.getBoundingClientRect();
            const targetTop = (window.innerHeight - anchorRect.height) / 2;
            const containerLeft = (window.innerWidth - Math.min(window.innerWidth - 32, 1280)) / 2 + 16;
            return { x: containerLeft - pc.left, y: targetTop - pc.top };
          }
          const wrap = phoneWrap.getBoundingClientRect();
          const pm = phoneMockup.getBoundingClientRect();
          const phoneRight = pm.right - wrap.left;
          const phoneTop = pm.top - wrap.top;
          const cardRight = pc.right - wrap.left;
          const cardTop = pc.top - wrap.top;
          const yOffset =
            typeof window !== "undefined" && window.innerWidth <= 1280
              ? CARD_END_Y_OFFSET_SMALL_DESKTOP
              : 0;
          return { x: phoneRight - cardRight, y: phoneTop - cardTop + yOffset };
        };

        if (progress >= 0.05 && !cachedEnd) cachedEnd = calc();
        if (cachedEnd) return cachedEnd;
        return calc();
      };

      tl.to(
        phoneCard,
        {
          x: () => getCardEndPosition().x,
          y: () => getCardEndPosition().y,
          scale: CARD_SCALE_END,
          rotation: -PIVOT_ROTATION, // Tegendraaien zodat card horizontaal blijft
          transformOrigin: "top right",
          ease: "none",
          duration: 1,
        },
        0
      );

      // Extra cards: pas zichtbaar aan einde (0.9–1.0), aan linker/rechter rand telefoon
      if (cardLeft && cardRight) {
        gsap.set([cardLeft, cardRight], { autoAlpha: 0 });
        const INWARD_OFFSET = 24; // Cards iets naar binnen (richting telefoon)
        const getCardLeftEnd = () => {
          const wrap = phoneWrap.getBoundingClientRect();
          const pm = phoneMockup.getBoundingClientRect();
          const cl = cardLeft.getBoundingClientRect();
          const phoneLeft = pm.left - wrap.left;
          return { x: phoneLeft - cl.width + INWARD_OFFSET };
        };
        const getCardRightEnd = () => {
          const wrap = phoneWrap.getBoundingClientRect();
          const pm = phoneMockup.getBoundingClientRect();
          const cr = cardRight.getBoundingClientRect();
          const phoneRight = pm.right - wrap.left;
          const wrapWidth = wrap.width;
          return { x: phoneRight - wrapWidth + cr.width - INWARD_OFFSET };
        };
        const cardEndY = () =>
          typeof window !== "undefined" && window.innerWidth <= 1280
            ? CARD_END_Y_OFFSET_SMALL_DESKTOP
            : 0;
        tl.fromTo(
          cardLeft,
          { x: () => getCardLeftEnd().x - 80, y: 0, autoAlpha: 0 },
          {
            x: () => getCardLeftEnd().x,
            y: cardEndY,
            autoAlpha: 1,
            rotation: -PIVOT_ROTATION,
            transformOrigin: "center center",
            ease: "none",
            duration: 0.1,
          },
          0.9
        );
        tl.fromTo(
          cardRight,
          { x: () => getCardRightEnd().x + 80, y: 0, autoAlpha: 0 },
          {
            x: () => getCardRightEnd().x,
            y: cardEndY,
            autoAlpha: 1,
            rotation: -PIVOT_ROTATION,
            transformOrigin: "center center",
            ease: "none",
            duration: 0.1,
          },
          0.9
        );
      }
    }, scopeRef);
    };

    let onLoad: (() => void) | null = null;
    if (document.readyState === "complete") {
      runSetup();
    } else {
      onLoad = () => {
        window.removeEventListener("load", onLoad!);
        runSetup();
      };
      window.addEventListener("load", onLoad);
    }

    return () => {
      cancelled = true;
      if (onLoad) window.removeEventListener("load", onLoad);
      resizeCleanupRef.current?.();
      resizeCleanupRef.current = null;
      mmRef.current?.revert();
      mmRef.current = null;
      ctxRef.current?.revert();
      ctxRef.current = null;
    };
  }, [scopeRef, prefersReducedMotion]);
}
