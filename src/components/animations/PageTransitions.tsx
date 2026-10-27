"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

/** Resolve the transition anyway if the new route never commits (e.g. an error). */
const COMMIT_TIMEOUT_MS = 3000;

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => Promise<void>) => unknown;
};

/** Returns the in-app URL for a click that should get a page transition, or null. */
function transitionTarget(event: MouseEvent): URL | null {
  if (event.defaultPrevented || event.button !== 0) return null;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return null;

  const anchor = (event.target as Element | null)?.closest?.("a[href]");
  if (!(anchor instanceof HTMLAnchorElement)) return null;
  if (anchor.target && anchor.target !== "_self") return null;
  if (anchor.hasAttribute("download")) return null;

  const url = new URL(anchor.href, window.location.href);
  if (url.origin !== window.location.origin) return null;
  // Same page (only the hash differs): let the browser scroll normally
  if (url.pathname === window.location.pathname && url.search === window.location.search) {
    return null;
  }
  return url;
}

/**
 * Smooth page transitions via the View Transitions API: internal link clicks are routed
 * through document.startViewTransition, so the old page fades out while the new one fades in
 * (styles in globals.css). Browsers without support or with reduced motion navigate as usual.
 */
export function PageTransitions() {
  const router = useRouter();
  const pathname = usePathname();
  const finishRef = useRef<(() => void) | null>(null);

  // The new route has rendered: let the browser capture it and run the animation
  useEffect(() => {
    finishRef.current?.();
    finishRef.current = null;
  }, [pathname]);

  useEffect(() => {
    const doc = document as ViewTransitionDocument;
    if (!doc.startViewTransition) return;

    const onClick = (event: MouseEvent) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const url = transitionTarget(event);
      if (!url) return;

      event.preventDefault();
      doc.startViewTransition?.(
        () =>
          new Promise<void>((resolve) => {
            const timeout = window.setTimeout(resolve, COMMIT_TIMEOUT_MS);
            finishRef.current = () => {
              window.clearTimeout(timeout);
              resolve();
            };
            router.push(url.pathname + url.search + url.hash);
          })
      );
    };

    // Capture phase: runs before next/link, which then skips its own navigation
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [router]);

  return null;
}
