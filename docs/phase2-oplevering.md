# Phase 2: Core Pages — Oplevering

## Aangepaste en nieuwe bestanden

### Nieuwe bestanden
- **src/lib/storeLinks.ts** — App store CTA: `getStoreLink()`, `getStorePlatform()`; nu placeholder (disabled, "Binnenkort beschikbaar").
- **src/data/plans.ts** — Plandata (Standaard, Smart, Enterprise) en feature-labels.
- **src/components/home/HeroSection.tsx** — Premium hero met gradient, wordmark, telefoonmockup, CTAs.
- **src/components/home/WhatWeDoSection.tsx** — Sectie "Wat we doen" (full height) met data-reveal/data-stagger.
- **src/components/home/IntroPanels.tsx** — Client component: slideshow-scroll Hero → Wat we doen (ScrollTrigger scrub).
- **src/components/home/PlansOverview.tsx** — Drie plancards op de homepage.
- **src/components/home/HowItWorks.tsx** — Drie stappen "Hoe het werkt".
- **src/components/home/StatsSection.tsx** — Drie tellers met `data-counter`.
- **src/components/home/KlantenPreview.tsx** — Drie placeholder-klantquotes.
- **src/components/home/index.ts** — Barrel export.
- **src/components/oplossingen/PlanComparison.tsx** — Vergelijkingstabel (desktop, sticky eerste kolom) en cards (mobile).
- **src/components/oplossingen/FaqSection.tsx** — Zes FAQ-items met data-stagger.
- **src/components/oplossingen/CtaBlock.tsx** — CTA-blok naar contact.
- **src/hooks/useReveal.ts** — Hook voor scroll-reveal (fade up + opacity) op één element.
- **src/hooks/useStaggerList.ts** — Hook voor stagger op kinderen van een container.
- **src/hooks/useCounter.ts** — Hook voor teller-animatie; bij reduced motion direct eindwaarde.

### Aangepaste bestanden
- **src/app/page.tsx** — Homepage met IntroPanels, PlansOverview, HowItWorks, StatsSection, KlantenPreview.
- **src/app/oplossingen/page.tsx** — Intro-hero, PlanComparison, FaqSection, CtaBlock.
- **src/app/contact/page.tsx** — Titel en korte intro toegevoegd boven het formulier.
- **src/app/over/page.tsx** — Ongewijzigd (placeholder).
- **src/app/klanten/page.tsx** — Ongewijzigd (placeholder).
- **src/components/layout/Header.tsx** — Home-link, active state via `usePathname()`, app-CTA via `getStoreLink()` (disabled + "Binnenkort beschikbaar").
- **src/components/layout/Footer.tsx** — Sectie "Neem contact op" met ContactForm, copy en links bijgewerkt.
- **src/lib/gsap/reveal.ts** — `revealElement()` en export `RevealType` toegevoegd.
- **src/lib/gsap/index.ts** — Export van `revealElement` en `RevealType`.
- **src/hooks/useGSAP.ts** — Fix: context als parameter aan callback (geen TDZ).

---

## Screenshot-assets (hero telefoon)

Plaats een app-screenshot voor de hero als:

- **public/phone-screen.png**

De hero gebruikt nu een div met `background-image: url(/phone-screen.png)`. Als het bestand ontbreekt, blijft de achtergrondkleur `bg-neutral-800` zichtbaar. Voor een echte afbeelding: vervang de div door `next/Image` met `src="/phone-screen.png"` (zie commentaar in `HeroSection.tsx`).

---

## IntroPanels en triggers — korte uitleg

**Doel:** De eerste scroll op de homepage voelt als een slideshow: de hero blijft in beeld, de sectie "Wat we doen" schuift eroverheen tot die het scherm vult. Daarna scrollt de pagina normaal verder.

**Werking:**
- Een wrapper heeft een hoogte van **200vh**. Binnen de wrapper zijn twee panels, elk **100vh**, allebei **sticky top-0**.
- **Panel 1** toont de hero.
- **Panel 2** toont "Wat we doen" en start met **yPercent: 100** (onder de viewport). Beide panels hebben `position: sticky`, dus ze blijven bovenaan tijdens scrollen binnen de wrapper.
- **ScrollTrigger** is gekoppeld aan de wrapper: `start: "top top"`, `end: "bottom bottom"`, **scrub: true**. In `onUpdate` wordt `panel2` geanimeerd van `yPercent: 100` naar `yPercent: 0` op basis van de scrollprogress. Daardoor schuift panel 2 omhoog over de hero.
- Alle GSAP/ScrollTrigger-setup gebeurt binnen **gsap.context(scope)**; bij unmount wordt **ctx.revert()** aangeroepen, zodat er geen dubbele triggers of lekken zijn bij routewissels.

**Reduced motion:** Als `prefers-reduced-motion: reduce` staat, wordt geen ScrollTrigger gebruikt. Dezelfde content wordt dan als twee gewone secties onder elkaar getoond (geen 200vh, geen sticky, geen scrub).

---

## Kwaliteit

- **Build:** `npm run build` slaagt.
- **Design tokens:** Kleuren, radius en shadows via tokens of Tailwind-mappings; geen hardcoded waarden in componenten (hero gradient gebruikt `var(--color-accent-rgb)`).
- **GSAP:** Alleen in client components; cleanup via `gsap.context`; reduced motion gerespecteerd in IntroPanels en in de hooks useReveal, useStaggerList, useCounter.
- **Copy:** Professioneel Nederlands, geen streepjes in website-copy.
