const STORAGE_KEY = "fleetcare-cookie-consent";

export type CookieConsent = {
  accepted: boolean;
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
};

const defaultConsent: CookieConsent = {
  accepted: false,
  necessary: true,
  analytics: false,
  marketing: false,
  timestamp: "",
};

export function getCookieConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored) as CookieConsent;
    return { ...defaultConsent, ...parsed };
  } catch {
    return null;
  }
}

export function setCookieConsent(consent: Partial<CookieConsent>): void {
  if (typeof window === "undefined") return;
  try {
    const current = getCookieConsent() ?? defaultConsent;
    const updated: CookieConsent = {
      ...current,
      ...consent,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // localStorage not available
  }
}

export function hasCookieConsent(): boolean {
  const consent = getCookieConsent();
  return consent?.accepted ?? false;
}
