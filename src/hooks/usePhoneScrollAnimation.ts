"use client";

import { useLayoutEffect, useRef } from "react";
import { registerGSAP, gsap, ScrollTrigger } from "@/lib/gsap/gsapClient";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const PHONE_MOVE_X = 60;
const PHONE_MOVE_Y = -15;
const CARD_SCALE_END = 0.92;
const PIVOT_ROTATION = 3; // Kleine pivot (graden) aan einde

/**
 * Scroll-gekoppelde animatie: phoneWrap naar rechts, phoneCard naar rechterbovenhoek phoneMockup.
 * Require .phoneWrap, .phoneMockup, .phoneCard en [data-scroll-trigger] binnen scopeRef.
 */
export function usePhoneScrollAnimation(scopeRef: React.RefObject<HTMLElement | null>) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const ctxRef = useRef<ReturnType<typeof gsap.context> | null>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion || typeof window === "undefined") return;
    if (!scopeRef.current) return;

    registerGSAP();

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

      // phoneWrap: subtiel naar rechts, licht omhoog, kleine pivot aan einde
      tl.to(
        phoneWrap,
        {
          x: PHONE_MOVE_X,
          y: PHONE_MOVE_Y,
          rotation: PIVOT_ROTATION,
          transformOrigin: "center bottom",
          ease: "none",
          duration: 1,
        },
        0
      );

      // phoneCard: dynamisch naar rechterbovenhoek phoneMockup (relatief t.o.v. phoneWrap)
      const getCardEndPosition = () => {
        const wrap = phoneWrap.getBoundingClientRect();
        const pm = phoneMockup.getBoundingClientRect();
        const pc = phoneCard.getBoundingClientRect();
        const phoneRight = pm.right - wrap.left;
        const phoneTop = pm.top - wrap.top;
        const cardRight = pc.right - wrap.left;
        const cardTop = pc.top - wrap.top;
        return { x: phoneRight - cardRight, y: phoneTop - cardTop };
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
        tl.fromTo(
          cardLeft,
          { x: () => getCardLeftEnd().x - 80, autoAlpha: 0 },
          {
            x: () => getCardLeftEnd().x,
            autoAlpha: 1,
            rotation: -PIVOT_ROTATION, // Tegendraaien: horizontaal zonder pivot
            transformOrigin: "center center",
            ease: "none",
            duration: 0.1,
          },
          0.9
        );
        tl.fromTo(
          cardRight,
          { x: () => getCardRightEnd().x + 80, autoAlpha: 0 },
          {
            x: () => getCardRightEnd().x,
            autoAlpha: 1,
            rotation: -PIVOT_ROTATION, // Tegendraaien: horizontaal zonder pivot
            transformOrigin: "center center",
            ease: "none",
            duration: 0.1,
          },
          0.9
        );
      }
    }, scopeRef);

    return () => {
      ctxRef.current?.revert();
      ctxRef.current = null;
    };
  }, [scopeRef, prefersReducedMotion]);
}
