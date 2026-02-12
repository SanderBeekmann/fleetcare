# Design Principes — FleetCare Connect

Dit document beschrijft de ontwerpregels die we volgen voor consistentie, toegankelijkheid en conversie.

---

## 1. De Mathematische Basis (De "4-pixel Regel")

De fundering van een goed ontwerp is consistentie door middel van wiskunde.

- **De 4-pixel regel:** Zorg ervoor dat bijna elk element, sectie, container en afstand in je ontwerp **deelbaar is door 4**. Dit zorgt voor een "schoon" en consistent resultaat.
- **Het 8-point grid:** Een alternatief of aanvulling hierop is het systeem dat Google en Apple gebruiken, waarbij afstanden veelvouden van **8** zijn (8, 16, 24, 32 pixels).
- **Geen willekeur:** Vermijd 1 of 2 pixels verschil; dit creëert inconsistentie. Gebruik vaste stappen om beslissingen makkelijker te maken.

---

## 2. Layout en Structuur

Gebruik onzichtbare kaders (containers) en rasters om elementen te ordenen.

- **Kolommen:** Gebruik een raster van **12 kolommen** voor desktop, **8** voor tablets en **4** voor mobiel. 12 is ideaal omdat het deelbaar is door 2, 3, 4 en 6.
- **Containerbreedte:** Kies een vaste breedte voor de containers binnen je kolommen, bijvoorbeeld **56px**, **64px** of **72px** (allen deelbaar door 4).
- **Gootbreedte (Spacing):** De standaard afstand tussen containers is meestal **24px** (voor 80% van de websites), maar **32px** of **40px** kan ook.
- **Totale breedte berekenen:** De maximale breedte van je content wordt bepaald door de som van je containers en tussenruimtes.
  - Voorbeeld: `(12 × 72px) + (11 × 24px) = 1.128px` totale breedte.

---

## 3. Spatiëring (Witruimte)

Gebruik specifieke afstanden om visuele hiërarchie aan te brengen. Hoe gerelateerder de elementen, hoe dichter ze bij elkaar staan.

| Relatie              | Afstand   | Voorbeeld                                      |
|----------------------|-----------|------------------------------------------------|
| Zeer nauw verwant    | **4px**   | Icoon + bijbehorende tekst, elementen in knop |
| Nauw verwant         | **8px**   | Regels in een menu                             |
| Standaard verwant    | **16px**  | Tussen kop en subkop (dubbel van vorige stap)  |
| Niet direct verwant  | **24–32px** | Tussen losse componenten in dezelfde sectie |
| Sectie-afstanden     | **64px+** | Tussen grote secties (dubbel van component)   |

---

## 4. Typografie

Professionele typografie volgt een **type scale** in plaats van willekeurige groottes.

- **Basisgrootte:** **16px** als standaard voor lopende tekst (body text).
- **Schaalvergroting:**
  - **Methode 1 (Vaste stappen):** Verhoog in stappen van 4px. Bijv. Grote paragraaf (20px), Kleine subkop (24px), Medium subkop (28px), tot Display (64px).
  - **Methode 2 (Ratio):** Gebruik een schaal zoals "Major Third" (vergroting ~25%). Basis 16 → 20 → 25, etc.
- **Regelhoogte (line-height):** Lopende tekst **150% (1.5)** van de lettergrootte. Koppen mogen strakker.
- **Letterspatiëring:** Standaard voor body; iets verkleinen naarmate tekst groter wordt (koppen).
- **Fontkeuze:** Vermijd overgebruikte lettertypes. Gebruik bronnen zoals [Fontshare](https://fontshare.com) of [Uncut.wtf](https://uncut.wtf) voor unieke, kwalitatieve fonts.

---

## 5. Kleurgebruik

Beperk je kleurenpalet en gebruik kleur **functioneel**.

- **60-30-10 regel:**
  - **60%** Neutraal: wit, zwart of grijs voor achtergronden en tekst.
  - **30%** Secundair: kaarten, headers, visuals.
  - **10%** Accent: alleen voor actie-elementen (knoppen, CTA's).
- **Variaties:** Geen nieuwe kleuren voor variatie; gebruik **opacity** van bestaande kleuren voor lichtere tinten.
- **Contrast:** Minimaal **4.5:1** voor kleine tekst, **3:1** voor grote tekst (leesbaarheid).

---

## 6. Conversie en Gebruikerservaring (UX)

Ontwerp niet alleen voor het oog, maar voor **actie**.

- **Eén doel per pagina:** Elke pagina heeft één duidelijk doel (bijv. kopen, inschrijven, contact).
- **CTA-plaatsing:** Duidelijke Call-to-Action in de **hero** (bovenaan), in de **navigatie**, en herhaal ongeveer elke **2–3 seconden** scrolltijd.
- **Scanbaarheid:** Mensen scannen; ze lezen niet lineair. Gebruik visuele hiërarchie (grootte, kleur, witruimte) om het oog te leiden.
- **Vertrouwen:** Elementen die vertrouwen wekken: testimonials, reviews ("know, like, trust, and feel").

---

## Toepassing in dit project

- **Tokens:** `src/styles/tokens.css` en `globals.css` gebruiken spacing (4, 8, 16, 24, 32, 64, 80) en kleuren volgens deze principes.
- **Tailwind:** Grid, spacing en typography-classes volgen waar mogelijk het 4px/8px grid.
- **Componenten:** Buttons, cards en secties houden rekening met 60-30-10 en vaste spatiëring.
