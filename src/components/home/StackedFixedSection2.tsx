import { WhatWeDoSection } from "./WhatWeDoSection";

/**
 * Sectie 2 (Wat we doen): scrolt gewoon mee. De telefoon uit de hero landt hier en
 * blijft daarna op deze sectie staan (zie usePhoneScrollAnimation).
 */
export function StackedFixedSection2() {
  return (
    <div id="section2" className="stacked-fixed-section">
      <WhatWeDoSection />
    </div>
  );
}
