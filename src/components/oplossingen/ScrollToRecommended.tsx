"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

/**
 * Scrollt naar de #eerlijke-prijzen sectie wanneer ?aanbevolen= in de URL staat.
 */
export function ScrollToRecommended() {
  const searchParams = useSearchParams();
  const recommended = searchParams.get("aanbevolen");

  useEffect(() => {
    if (!recommended) return;
    const target = document.getElementById("eerlijke-prijzen");
    if (!target) return;
    // Kleine vertraging zodat layout klaar is
    const t = setTimeout(() => {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 300);
    return () => clearTimeout(t);
  }, [recommended]);

  return null;
}
