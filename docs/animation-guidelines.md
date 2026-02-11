# Animatie-richtlijnen — FleetCare Connect

Premium, subtiel en performance-vriendelijk. Inspiratie: omegawatches.com (rustig, doelgericht), zonder zware effecten.

---

## Principes

- **Calm** — Geen druk gedrag; animaties ondersteunen de content.
- **Purposeful** — Elke animatie heeft een reden (reveal, focus, progress).
- **Fast start, soft landing** — Snel opstarten, zacht eindigen (ease out).

---

## Timing

| Type            | Duur      | Gebruik                    |
|-----------------|-----------|----------------------------|
| **Micro**       | 150–200ms | Kleine feedback, toggles   |
| **Standaard**   | 300ms     | Hover-achtige, kleine UI  |
| **Section reveal** | 500–700ms | Scroll reveals, secties   |

Geen lange durations (> 1s) tenzij expliciet bedoeld (bijv. teller).

---

## Easing

- **Standaard:** `power2.out` — dagelijks gebruik, scroll reveals, staggers.
- **Premium (spaarzaam):** `expo.out` — hero of één keer per pagina.
- **Geen:** bounce, elastic, overdreven overshoot.

---

## Stagger

- **Range:** 0,06–0,12s per item.
- **Standaard:** 0,08s — lijsten, cards, iconen.
- Niet te veel items tegelijk (max ~10–12) om niet traag te voelen.

---

## ScrollTrigger-defaults

- **start:** `"top 85%"` — element komt in beeld wanneer de bovenkant op 85% van de viewport is.
- **toggleActions:** `"play none none reverse"` — play on enter, reverse on enter back (scroll omhoog).
- **ignoreMobileResize:** `true` (in config) — voorkomt flikkeren bij resize op mobiel.

---

## Reduced motion

- **Regel:** Bij `prefers-reduced-motion: reduce` animaties uitzetten of sterk reduceren.
- **Implementatie:** `usePrefersReducedMotion()` — geen ScrollTrigger/tweens registreren als `true`.
- Fallback: content direct zichtbaar (geen opacity/y-animatie).

---

## Wat GSAP wél doet

- Scroll reveals (fade-up, fade, etc.) via `data-reveal`.
- Tellers (counters) die in viewport starten via `data-counter`.
- Staggers (lijsten, grids) via `data-stagger`.
- Panels/slideshows (indien later toegevoegd).

---

## Wat GSAP níet doet

- **Eenvoudige hover states** — CSS (`transition`, `:hover`).
- **Eenvoudige menu open/dicht** — CSS of minimale JS (geen GSAP).
- **Globale page transitions** — liever niet; alleen als strikt nodig (geen standaard).

---

## Technisch

- **Cleanup:** Altijd via `gsap.context()` + `ctx.revert()` bij unmount; ScrollTrigger-instances vallen onder die context en worden gekilld.
- **Scope:** Animaties alleen binnen een scope (bijv. page wrapper); bij routewissel wordt die scope gemount/unmount en cleanup uitgevoerd — geen dubbele registraties.
- **Client only:** GSAP alleen in client components; init via `<GsapProvider>` rond page content.

---

## Gebruik: reveal en counter toevoegen

Pages hoeven geen GSAP-code te bevatten. Gebruik data-attributes binnen de door `<GsapProvider>` gewrapte content.

### Reveal (scroll in beeld)

Op een element:

- `data-reveal="fade-up"` — standaard (fade + omhoog)
- `data-reveal="fade"` — alleen fade
- `data-reveal="fade-down"` — fade + naar beneden
- `data-reveal="fade-up-small"` — kleine y-beweging
- Optioneel: `data-delay="0.1"` — vertraging in seconden

Voorbeeld:

```html
<h2 data-reveal="fade-up">Titel</h2>
<p data-reveal="fade" data-delay="0.1">Tekst</p>
```

### Stagger (kinderen één voor één)

Op de **container** (niet op de kinderen):

- `data-stagger="children"`

De directe kinderen van dat element animeren gestaggerd (opacity + y) bij scroll.

Voorbeeld:

```html
<ul data-stagger="children">
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>
```

### Counter (teller in viewport)

Op het element dat het getal toont:

- `data-counter="1200"` — doelwaarde

De zichtbare tekst wordt bij scroll naar dat getal geanimeerd (van 0).

Voorbeeld:

```html
<span data-counter="1200">0</span>
```

(Zet initieel bijvoorbeeld "0" in de HTML; GSAP animeert naar 1200.)
