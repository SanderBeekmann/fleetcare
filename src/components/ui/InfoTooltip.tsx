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
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const tooltipHeight = 60;
    const margin = 6;
    setPosition({
      top: rect.top - tooltipHeight - margin,
      left: rect.left + rect.width / 2,
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
        className="flex shrink-0 cursor-help text-neutral-400 transition-colors hover:text-brand"
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
            className="pointer-events-none fixed min-w-[180px] max-w-[220px] rounded bg-neutral-900 px-2.5 py-1.5 text-left text-xs font-normal leading-snug text-white shadow-xl"
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
