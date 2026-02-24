"use client";

import { useState, useRef, useLayoutEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

type InfoTooltipProps = {
  text: string;
  /** z-index, default 40 (below navbar z-50) */
  zIndex?: number;
};

export function InfoTooltip({ text, zIndex = 40 }: InfoTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLSpanElement>(null);

  const updatePosition = useCallback(() => {
    if (!triggerRef.current || typeof window === "undefined") return;
    const rect = triggerRef.current.getBoundingClientRect();
    const tooltipHeight = 60;
    const tooltipMaxWidth = 220;
    const margin = 6;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const centerX = rect.left + rect.width / 2;
    const leftClamped = Math.max(tooltipMaxWidth / 2 + margin, Math.min(vw - tooltipMaxWidth / 2 - margin, centerX));
    const top = rect.top - tooltipHeight - margin;
    const topClamped = Math.max(margin, Math.min(vh - tooltipHeight - margin, top));
    setPosition({
      top: topClamped,
      left: leftClamped,
    });
  }, []);

  useLayoutEffect(() => {
    if (!isVisible || !triggerRef.current || typeof document === "undefined")
      return;
    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [isVisible, updatePosition]);

  return (
    <>
      <span
        ref={triggerRef}
        className="flex shrink-0 cursor-help items-center justify-center text-neutral-400 transition-colors hover:text-brand min-h-[44px] min-w-[44px] md:min-h-0 md:min-w-0 md:p-0 p-2"
        aria-label={text}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        <InformationCircleIcon className="h-4 w-4" />
      </span>
      {isVisible &&
        typeof document !== "undefined" &&
        createPortal(
          <span
            className="pointer-events-none fixed min-w-[160px] max-w-[min(220px,calc(100vw-24px))] rounded bg-neutral-900 px-2.5 py-1.5 text-left text-xs font-normal leading-snug text-white shadow-xl"
            style={{
              top: position.top,
              left: position.left,
              transform: "translate(-50%, 0)",
              zIndex,
            }}
          >
            {text}
            <span
              className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 border-4 border-transparent border-t-neutral-900"
              aria-hidden
            />
          </span>,
          document.body
        )}
    </>
  );
}
