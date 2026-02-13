/**
 * App store CTA: detecteer platform en geef link.
 * Nu placeholder: retourneert "#", buttons tonen "Binnenkort beschikbaar" en zijn disabled.
 * Later: echte App Store / Play Store URLs invullen.
 */

export type StorePlatform = "ios" | "android" | null;

export function getStorePlatform(): StorePlatform {
  if (typeof window === "undefined") return null;
  const ua = window.navigator.userAgent;
  if (/iPad|iPhone|iPod/.test(ua)) return "ios";
  if (/Android/.test(ua)) return "android";
  return null;
}

export type StoreLinkResult = {
  href: string;
  label: string;
  hoverLabel?: string;
  disabled: boolean;
};

/**
 * Geeft link en label voor de app store CTA.
 * Nu: disabled met label "Webportaal", hover toont "Binnenkort", href "#".
 * Later: echte URLs bij enabled: true.
 */
export function getStoreLink(): StoreLinkResult {
  const platform = typeof window !== "undefined" ? getStorePlatform() : null;
  return {
    href: "#",
    label: "Webportaal",
    hoverLabel: "Binnenkort",
    disabled: true,
  };
}
