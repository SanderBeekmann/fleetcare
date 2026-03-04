# Plan: Mobiele weergave zonder fixed secties

**Doel:** Op mobiel (< 768px) alle fixed/stacked secties vervangen door normale, onder elkaar scrollende secties. Dit verbetert soepel scrollen. Desktop blijft ongewijzigd.

---

## Huidige situatie (fixed secties)

### Homepage

| Component                 | Huidige gedrag                                                                                    | Betrokken bestanden                                                           |
| ------------------------- | ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| **HeroSection**           | `fixed inset-0` – hero + Aurora + iPhone mockup blijven vast; spacer (h-screen) + scroll-animatie | `HeroSection.tsx`, `usePhoneScrollAnimation.ts`, `useHeroStaggerAnimation.ts` |
| **StackedFixedSection2**  | "Wat we doen" – wordt fixed bij scroll, content schuift erover                                    | `StackedFixedSection2.tsx`, `useStackedFixedSection.ts`                       |
| **stacked-content-above** | PlansOverview, MethodSection, etc. – z-index 4, scrollen over hero                                | `page.tsx`, `globals.css`                                                     |

### Over-pagina

| Component                 | Huidige gedrag                     | Betrokken bestanden                                      |
| ------------------------- | ---------------------------------- | -------------------------------------------------------- |
| **OverPageHero**          | `fixed inset-0` – hero blijft vast | `OverPageHero.tsx`                                       |
| **OverStackedSection**    | "Ons verhaal" – stacked fixed      | `OverStackedSection.tsx`, `useStackedFixedSection.ts`    |
| **WatIsFleetCareSection** | "Wat is FCC" – stacked fixed       | `WatIsFleetCareSection.tsx`, `useStackedFixedSection.ts` |

### Globals

- `.stacked-fixed-section.is-fixed` → `position: fixed` (globals.css)
- `.stacked-fixed-slot` → hoogte wordt dynamisch gezet bij fixed state

---

## Strategie: media query / conditional rendering

**Breakpoint:** `md` (768px) – Tailwind `md:` = desktop, default = mobiel.

**Aanpak:** Gebruik `md:` classes en conditional logic zodat:

- **Mobiel (< 768px):** alles `position: relative/static`, normale document flow
- **Desktop (≥ 768px):** huidige fixed/stacked gedrag behouden

---

## Stappenplan

### Stap 1: useStackedFixedSection – mobiel uitschakelen

**Bestand:** `src/hooks/useStackedFixedSection.ts`

- Voeg check toe: `const isDesktop = () => window.matchMedia("(min-width: 768px)").matches`
- In `check()`: als `!isDesktop()`, altijd `setIsFixed(false)` en return
- Gevolg: op mobiel wordt `isFixed` nooit `true` → secties blijven in flow

---

### Stap 2: HeroSection – mobiel: relative i.p.v. fixed

**Bestand:** `src/components/home/HeroSection.tsx`

**Hero container (regel ~20):**

- Huidige: `className="fixed inset-0 z-[1] isolate"`
- Nieuw: `className="relative min-h-screen z-[1] isolate md:fixed md:inset-0"`
- Mobiel: `relative min-h-screen` = normale flow, neemt ruimte in
- Desktop: `md:fixed md:inset-0` = huidige fixed hero

**Phone layer (regel ~67):**

- Huidige: `className="fixed inset-0 ..."`
- Nieuw: op mobiel: `relative` of `absolute` binnen hero, niet fixed
- Optie A: `relative min-h-0 md:fixed md:inset-0` – op mobiel in flow
- Optie B: phone layer op mobiel helemaal anders: inline in hero, geen aparte fixed laag

**Spacer (regel ~169):**

- Huidige: `data-scroll-trigger className="h-screen"` – zorgt dat er 100vh gescrolld wordt voor animatie
- Op mobiel: spacer niet nodig (geen scroll-over-hero). Verbergen met `hidden md:block`
- Of: behouden voor layout, maar geen scroll-animatie (zie stap 3)

---

### Stap 3: usePhoneScrollAnimation – mobiel uitschakelen

**Bestand:** `src/hooks/usePhoneScrollAnimation.ts`

- Voeg check toe: `const isDesktop = () => window.innerWidth >= 768` (of matchMedia)
- Als `!isDesktop()`: geen ScrollTrigger/GSAP-animatie opzetten, direct return
- Gevolg: op mobiel geen scroll-gekoppelde phone-animatie → minder scroll-gerelateerde berekeningen

**Alternatief:** `gsap.matchMedia()` gebruiken om animatie alleen binnen `(min-width: 768px)` te activeren.

---

### Stap 4: OverPageHero – mobiel: relative i.p.v. fixed

**Bestand:** `src/components/over/OverPageHero.tsx`

- Huidige: `className="fixed inset-0 z-[1] ..."`
- Nieuw: `className="relative min-h-screen z-[1] ... md:fixed md:inset-0"`
- Spacer onder hero: `hidden md:block` op mobiel (geen extra viewport nodig)

**Let op:** Over-pagina heeft een spacer `h-screen` na de hero. Op mobiel: hero is relative + min-h-screen, daarna direct OverStackedSection. Geen extra spacer nodig.

---

### Stap 5: globals.css – is-fixed alleen op desktop

**Bestand:** `src/app/globals.css`

- `.stacked-fixed-section.is-fixed` alleen op desktop laten werken
- Optie A: `@media (min-width: 768px) { .stacked-fixed-section.is-fixed { position: fixed; ... } }`
- Optie B: class `is-fixed` op mobiel niet toevoegen (al afgehandeld in useStackedFixedSection)

Stap 1 zorgt dat `isFixed` op mobiel nooit true is, dus `is-fixed` wordt niet toegepast. Geen CSS-wijziging strikt nodig, maar media query is extra veilig.

---

### Stap 6: stacked-fixed-slot hoogte – alleen op desktop

**Bestand:** `StackedFixedSection2.tsx`, `OverStackedSection.tsx`, `WatIsFleetCareSection.tsx`

- `slotHeight` wordt alleen gezet wanneer `isFixed` true is
- Op mobiel is `isFixed` altijd false → `slotHeight` blijft null → geen `height` style
- Geen wijziging nodig; huidige logica dekt dit al

---

### Stap 7: z-index en stacking context

- Op mobiel: geen fixed layers → z-index minder relevant
- `stacked-content-above` (z-4) kan blijven; op mobiel is het gewoon relatief gepositioneerde content
- Geen wijziging nodig

---

### Stap 8: useHeroStaggerAnimation

**Bestand:** `src/hooks/useHeroStaggerAnimation.ts`

- Draait op mount, geen scroll-trigger
- Geen wijziging nodig voor mobiel

---

## Samenvatting wijzigingen per bestand

| Bestand                      | Wijziging                                                                                                                                  |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `useStackedFixedSection.ts`  | `isDesktop()` check; op mobiel altijd `isFixed = false`                                                                                    |
| `HeroSection.tsx`            | Hero: `relative min-h-screen md:fixed md:inset-0`; phone layer: `relative md:fixed md:inset-0` of vergelijkbaar; spacer: `hidden md:block` |
| `usePhoneScrollAnimation.ts` | Animatie alleen op desktop (matchMedia of early return)                                                                                    |
| `OverPageHero.tsx`           | Hero: `relative min-h-screen md:fixed md:inset-0`; spacer: `hidden md:block`                                                               |
| `globals.css`                | (Optioneel) `.stacked-fixed-section.is-fixed` in `@media (min-width: 768px)`                                                               |

---

## Mobiel resultaat

- **Homepage:** Hero als normale sectie (min-h-screen), iPhone mockup inline in hero, "Wat we doen" en rest gewoon onder elkaar
- **Over-pagina:** Hero als normale sectie, "Ons verhaal" en "Wat is FCC" gewoon onder elkaar
- **Scroll:** Geen fixed positioning, geen scroll-animaties → native scroll, soepeler op mobiel

## Desktop resultaat

- Geen wijziging: fixed hero, stacked sections, phone-animatie blijven zoals nu.
