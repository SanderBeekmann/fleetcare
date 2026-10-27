"use client";

import { useLayoutEffect } from "react";
import { registerGSAP, gsap, ScrollTrigger } from "@/lib/gsap/gsapClient";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const DESKTOP_QUERY = "(min-width: 1024px)";
/** Op kleinere desktop verkleint de telefoon en zakken de cards iets (minder overlap met tekst). */
const SMALL_DESKTOP_QUERY = "(min-width: 1024px) and (max-width: 1280px)";

const PHONE_MOVE_X = 60;
/** Op kleinere desktop minder ver naar rechts, anders raakt de telefoon de schermrand. */
const PHONE_MOVE_X_SMALL = 20;
const PHONE_MOVE_Y = -15;
const PIVOT_ROTATION = 3;
const PHONE_SCALE_END_SMALL = 0.88;
const CARD_SCALE_END = 0.92;
const CARD_END_Y_OFFSET_SMALL = 64;
/** Afstand die de zijcards naar binnen schuiven, richting de telefoon. */
const CARD_INWARD_OFFSET = 24;
/** Invliegende cards: start (timeline-positie), duur en aanloop in px. */
const CARD_ENTER_AT = 0.5;
const CARD_ENTER_DURATION = 0.4;
const CARD_ENTER_OFFSET = 40;
const CARD_ENTER_RISE = 16;
/** Kleine naloop: soepel, maar de telefoon blijft strak aan de scroll hangen. */
const SCRUB_SMOOTHING = 0.4;

type Box = { left: number; top: number; width: number; height: number };

/** Layout-positie t.o.v. de offsetParent (phoneWrap), los van lopende transforms. */
function layoutBox(el: HTMLElement): Box {
  return { left: el.offsetLeft, top: el.offsetTop, width: el.offsetWidth, height: el.offsetHeight };
}

/** Rand van de telefoon na schalen vanuit "center bottom". */
function scaledPhoneEdges(phone: Box, scale: number) {
  const centerX = phone.left + phone.width / 2;
  const bottom = phone.top + phone.height;
  return {
    left: centerX - (phone.width / 2) * scale,
    right: centerX + (phone.width / 2) * scale,
    top: bottom - phone.height * scale,
  };
}

type PhoneElements = {
  trigger: HTMLElement;
  phoneWrap: HTMLElement;
  phoneMockup: HTMLElement;
  phoneCard: HTMLElement;
  cardLeft: HTMLElement | null;
  cardRight: HTMLElement | null;
};

function queryElements(scope: HTMLElement): PhoneElements | null {
  const trigger = scope.querySelector<HTMLElement>("[data-scroll-trigger]");
  const layer = scope.querySelector<HTMLElement>("#phone-layer");
  const phoneWrap = layer?.querySelector<HTMLElement>(".phoneWrap");
  const phoneMockup = layer?.querySelector<HTMLElement>(".phoneMockup");
  const phoneCard = layer?.querySelector<HTMLElement>(".phoneCard");
  if (!trigger || !phoneWrap || !phoneMockup || !phoneCard) return null;
  return {
    trigger,
    phoneWrap,
    phoneMockup,
    phoneCard,
    cardLeft: layer?.querySelector<HTMLElement>(".phoneCardLeft") ?? null,
    cardRight: layer?.querySelector<HTMLElement>(".phoneCardRight") ?? null,
  };
}

/**
 * Bouwt de scroll-timeline. Alle eindposities komen uit de layout (offsetLeft/Top), niet uit
 * getBoundingClientRect: zo kloppen ze altijd, ook halverwege de animatie en na een resize.
 */
function buildTimeline(els: PhoneElements, isSmall: boolean) {
  const { trigger, phoneWrap, phoneMockup, phoneCard, cardLeft, cardRight } = els;
  const phoneScale = isSmall ? PHONE_SCALE_END_SMALL : 1;
  const cardEndY = isSmall ? CARD_END_Y_OFFSET_SMALL : 0;
  const phoneEdges = () => scaledPhoneEdges(layoutBox(phoneMockup), phoneScale);

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger,
      start: "top top",
      end: "bottom top",
      scrub: SCRUB_SMOOTHING,
      invalidateOnRefresh: true,
    },
  });

  tl.to(
    phoneWrap,
    {
      x: isSmall ? PHONE_MOVE_X_SMALL : PHONE_MOVE_X,
      y: PHONE_MOVE_Y,
      rotation: PIVOT_ROTATION,
      transformOrigin: "center bottom",
      ease: "none",
      duration: 1,
    },
    0
  );

  if (isSmall) {
    tl.to(
      phoneMockup,
      { scale: phoneScale, transformOrigin: "center bottom", ease: "none", duration: 1 },
      0
    );
  }

  // Hoofdcard landt op de rechterbovenhoek van de telefoon
  tl.to(
    phoneCard,
    {
      x: () => {
        const card = layoutBox(phoneCard);
        return phoneEdges().right - (card.left + card.width);
      },
      y: () => phoneEdges().top - layoutBox(phoneCard).top + cardEndY,
      scale: CARD_SCALE_END,
      rotation: -PIVOT_ROTATION,
      transformOrigin: "top right",
      ease: "none",
      duration: 1,
    },
    0
  );

  if (!cardLeft || !cardRight) return;

  const leftEndX = () => {
    const card = layoutBox(cardLeft);
    return phoneEdges().left - card.width + CARD_INWARD_OFFSET - card.left;
  };
  const rightEndX = () => phoneEdges().right - CARD_INWARD_OFFSET - layoutBox(cardRight).left;

  const enter = (card: HTMLElement, endX: () => number, direction: 1 | -1, at: number) => {
    tl.fromTo(
      card,
      {
        x: () => endX() + CARD_ENTER_OFFSET * direction,
        y: cardEndY + CARD_ENTER_RISE,
        autoAlpha: 0,
      },
      {
        x: endX,
        y: cardEndY,
        autoAlpha: 1,
        rotation: -PIVOT_ROTATION,
        transformOrigin: "center center",
        ease: "power3.out",
        duration: CARD_ENTER_DURATION,
        immediateRender: true,
      },
      at
    );
  };
  enter(cardLeft, leftEndX, -1, CARD_ENTER_AT);
  enter(cardRight, rightEndX, 1, CARD_ENTER_AT + 0.08);
}

/**
 * Scroll-gekoppelde telefoonanimatie (alleen desktop). De telefoon staat sticky in een laag
 * die hero + sectie 2 beslaat (CSS), deze hook animeert alleen de beweging.
 */
export function usePhoneScrollAnimation(scopeRef: React.RefObject<HTMLElement | null>) {
  const prefersReducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (prefersReducedMotion) return;
    const scope = scopeRef.current;
    if (!scope) return;

    registerGSAP();
    let cancelled = false;
    let mm: ReturnType<typeof gsap.matchMedia> | null = null;

    // Pas na het laden van de fonts opzetten: anders kloppen de layoutmaten niet
    document.fonts.ready.then(() => {
      if (cancelled) return;
      mm = gsap.matchMedia(scope);
      mm.add({ isDesktop: DESKTOP_QUERY, isSmall: SMALL_DESKTOP_QUERY }, (context) => {
        const { isDesktop, isSmall } = context.conditions as Record<string, boolean>;
        if (!isDesktop) return;
        const els = queryElements(scope);
        if (els) buildTimeline(els, isSmall);
      });
      ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
      mm?.revert();
    };
  }, [scopeRef, prefersReducedMotion]);
}
