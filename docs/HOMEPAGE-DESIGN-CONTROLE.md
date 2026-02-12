# Homepage — Controle op designprincipes

Controle uitgevoerd tegen `DESIGN-PRINCIPES.md` (4px-regel, spatiëring, typografie, kleur).

---

## ✅ Wat al klopt

- **Tokens:** `--spacing-section: 80px`, `--space-*` (4, 8, 16, 24, 32, 40, 48, 64, 80) zijn veelvouden van 4/8.
- **Container:** `px-4 sm:px-6 lg:px-8` (16, 24, 32 px) — 8-point grid.
- **Secties:** `py-section` (80px), MethodSection `py-24 md:py-32` (96, 128) — deelbaar door 4 en 8.
- **Grids:** `gap-4`, `gap-6`, `gap-8`, `gap-12`, `gap-16` (16–64 px) — consistent.
- **Kleur:** Brand/neutrals via tokens; 60-30-10 grofweg gevolgd.
- **CTA:** Hero + navigatie + herhaling in secties — voldoet aan CTA-plaatsing.

---

## ⚠️ Gevonden afwijkingen

### 1. Spatiëring niet deelbaar door 4

| Locatie | Huidig | Opmerking |
|--------|--------|-----------|
| **HeroSection** | `mt-1.5` (6px) op card-dot en card-tekst | 6 niet in 4/8-grid → `mt-2` (8px). |
| **AuroraBackground** | `-inset-[10px]` | 10 niet deelbaar door 4 → `-inset-3` (12px). |
| **Button** (ui) | `py-2.5` (10px) | 10 niet in 4/8-grid → `py-3` (12px). |
| **Badge** (ui, o.a. PlansOverview) | `px-2.5 py-0.5` (10px, 2px) | 2px expliciet te vermijden → bv. `px-2 py-1` (8px, 4px). |

### 2. Typografie buiten type scale

| Locatie | Huidig | Opmerking |
|--------|--------|-----------|
| **HeroSection** (phone cards, status bar) | `text-[10px]` | 10px niet in 4px-stappen (16, 20, 24…) → `text-xs` (12px). |
| **MethodSection** (titel) | `md:text-7xl` (72px) | Principes: display tot 64px; 72 niet in vaste 4px-stappen → `md:text-6xl` (60px) past beter. |

### 3. Overige (geen aanpassing)

- **leading-[1.25]** en **leading-[1.1]** voor koppen — principes: “koppen mogen strakker” → acceptabel.
- **rounded-[3.5rem]**, **scale-[0.508]** e.d. in phone mockup — decoratief/asset, geen layout-spacing.
- **strokeWidth={1.5}**, **h-1.5 w-1.5** — icon/dot-detail; optioneel later naar 2 (8px) voor strikte 4px.
- **border-[1px]** — 1px randen zijn gangbaar; principes gaan over *afstanden*, niet lijn diktes.

---

## Aanbevolen correcties

1. HeroSection: `mt-1.5` → `mt-2`, `text-[10px]` → `text-xs`.
2. AuroraBackground: `-inset-[10px]` → `-inset-3`.
3. MethodSection: `md:text-7xl` → `md:text-6xl`.
4. Button: `py-2.5` → `py-3`.
5. Badge: `px-2.5 py-0.5` → `px-2 py-1`.

**Status:** Bovenstaande correcties zijn doorgevoerd in de codebase.

---

## Fontgrootte (type scale)

**Designprincipes:** Basis 16px, daarna 4px-stappen (20, 24, 28, 32 … tot 64px display). Geen willekeurige groottes.

**Tailwind-standaard (rem → px bij 16px root):**

| Class    | Tailwind | px  | 4px-scale? |
|----------|----------|-----|------------|
| text-xs  | 0.75rem  | 12  | ✓ (12)     |
| text-sm  | 0.875rem | **14** | ✗ (geen 14 in scale) |
| text-base| 1rem     | 16  | ✓          |
| text-lg  | 1.125rem | **18** | ✗ (scale: 16, 20) |
| text-xl  | 1.25rem  | 20  | ✓          |
| text-2xl | 1.5rem   | 24  | ✓          |
| text-3xl | 1.875rem | **30** | ✗ (scale: 28 of 32) |
| text-4xl | 2.25rem  | 36  | ✓          |
| text-5xl | 3rem     | 48  | ✓          |
| text-6xl | 3.75rem  | 60  | ✓          |
| text-7xl | 4.5rem   | 72  | ✗ (display max 64) |

**Wat we nu gebruiken op de homepage:** o.a. `text-xs`, `text-sm`, `text-lg`, `text-xl`, `text-2xl`, `text-3xl`, `text-4xl`, `text-5xl`, `text-6xl`. De **afwijkingen** ten opzichte van de 4px-type scale zijn daarmee:

- **text-sm (14px)** — o.a. hero label, buttons, nav, cards, form labels. Geen 14 in strikte 4px-schaal (wel 12 en 16).
- **text-lg (18px)** — o.a. hero intro, MethodSection intro. Scale zou 16 of 20 zijn.
- **text-3xl (30px)** — o.a. sectiekoppen (Wat we doen, Plans, enz.). Scale zou 28 of 32 zijn.

**Opties:**

1. **Niets doen** — 14, 18, 30 zijn visueel dicht bij 12/16, 16/20, 28/32; contrast en leesbaarheid blijven goed.
2. **Tailwind-theme aanpassen** — in `tailwind.config.ts` een eigen `fontSize`-scale op basis van 4px (bijv. sm→16, lg→20, 3xl→28 of 32). Dan wijzigt de visuele grootte op de hele site.
3. **Alleen nieuwe componenten** — nieuwe tekst alleen met groottes uit een vaste schaal (bijv. 12, 16, 20, 24, 28, 32, 36, 48, 60, 64) en die eventueel in tokens of theme vastleggen.

**Aanbeveling:** Voor strikte naleving van de 4px-type scale kun je in `tailwind.config.ts` onder `theme.extend` een `fontSize`-object zetten met o.a. `sm: ['1rem', { lineHeight: '1.5rem' }]`, `lg: ['1.25rem', { lineHeight: '1.75rem' }]`, `3xl: ['1.75rem', { lineHeight: '2rem' }]` (28px). Dan worden bestaande `text-sm`, `text-lg`, `text-3xl` automatisch op de schaal getrokken.
