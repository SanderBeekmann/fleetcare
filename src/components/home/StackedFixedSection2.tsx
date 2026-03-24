"use client";

import { useStackedFixedSection } from "@/hooks/useStackedFixedSection";
import { WhatWeDoSection } from "./WhatWeDoSection";

/**
 * Wrapper voor sectie 2 (Wat we doen): wordt fixed wanneer de top de viewport bereikt.
 * Gebruikt slot voor layout-behoud. Z-index 2, latere content z-3.
 */
export function StackedFixedSection2() {
  const { slotRef, sectionRef, isFixed, slotHeight, slotWidth } = useStackedFixedSection();

  return (
    <div
      id="section2-slot"
      ref={slotRef}
      className="stacked-fixed-slot"
      style={slotHeight != null ? { height: `${slotHeight}px` } : undefined}
    >
      <div
        id="section2"
        ref={sectionRef}
        data-stacked-section
        className={`stacked-fixed-section flex flex-col justify-center bg-white md:min-h-screen ${isFixed ? "is-fixed" : ""}`}
        style={
          isFixed && slotHeight != null
            ? { height: `${slotHeight}px`, width: slotWidth != null ? `${slotWidth}px` : undefined }
            : undefined
        }
        {...(isFixed ? { "data-stacked-fixed": "true" } : {})}
      >
        <WhatWeDoSection />
      </div>
    </div>
  );
}
