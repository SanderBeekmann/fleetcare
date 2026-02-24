# Stappenplan: Klantaanpassingen FleetCare Connect

Dit document bevat een uitgebreid stappenplan voor alle gewenste aanpassingen. Werk de stappen sequentieel uit en vink af na voltooiing.

---

## Voortgangsoverzicht

| Sectie | Status | Stappen |
|--------|--------|---------|
| Homepage – Hero | ✅ | 1–4 |
| Homepage – Wat we doen | ✅ | 5–6 |
| Homepage – Plans | ✅ | 7–9 |
| Homepage – Hoe het werkt | ✅ | 10–13 |
| Oplossingen-pagina | ✅ | 14–19 |
| Over ons-pagina | ✅ | 20–24 |
| Klanten-pagina | ⬜ | 25 (nader te bepalen) |
| Mobiel / telefoon | ✅ | 26 |

---

## 1. Homepage – Hero

### Stap 1.1: Hero-titel aanpassen
- [x] **Bestand:** `HeroSection.tsx` (of vergelijkbaar)
- [ ] **Actie:** Titel wijzigen naar:
  > Uw vloot, altijd overal verbonden 
  > LEV aftersales service & planning management

### Stap 1.2: Hero-subtekst aanpassen
- [x] **Actie:** Subtekst wijzigen naar:
  > In 1 minuut uw aanvraag doen voor service, onderhoud en reparatie binnen ons landelijke netwerk van gecertificeerde service partners. Dit alles in de FCC-App, met realtime status en transparante afhandeling.

### Stap 1.3: Hero-knoppen
- [x] **Actie:** verander de twee knoppen in : **Contact** en **Bekijk oplossingen**

### Stap 1.4: Hero-contentpositie verplaatsen op kleine desktopweergave 
- [x] **Actie:** Tekstblok en cta's in hero iets hoger positioneren zodat knoppen minder snel wegvallen bij scrollen pas alleen aan op kleinere desktopschermen. 

---

## 2. Homepage – Wat we doen

### Stap 2.1: Sectietekst aanpassen
- [x] **Bestand:** `WhatWeDoSection.tsx` (of vergelijkbaar)
- [ ] **Actie:** Tekst wijzigen naar:
  > FleetCare Connect ontzorgt u in het koppelen van uw specifiek LEV aan de best passende servicepartner bij u in de buurt, door heel Nederland.
  > Behoefte, voertuig informatie, matching met service partner en (primaire) diagnose voor de best match staan bij FleetCare Connect centraal. Dit alles om uw operatie zo efficiënt mogelijk te laten verlopen. Wij hebben een oplossing voor iedere vloot grootte.

---

## 3. Homepage – Plans / Prijzen

### Stap 3.1: Plans-introductie
- [x] **Actie:** Tekst boven de plannen wijzigen naar:
  > Kies het plan dat bij uw organisatie past – Van eenvoudige matching en ontzorgen van plannen, tot maatwerk voor grotere operaties.

### Stap 3.2: Minimumperiode aanpassen
- [x] **Actie:** Wijzig minimumperiode van **24 maanden** naar **12 maanden** bij het Standaard-plan

### Stap 3.3: Volgorde features gelijk trekken
- [x] **Actie:** Zorg dat alle drie plannen dezelfde volgorde hebben:

| Feature | Standaard | Smart | Enterprise |
|---------|-----------|-------|------------|
| App | ✓ | ✓ | ✓ |
| Realtime tracking | ✓ | ✓ | ✓ |
| Web portaal | — | ✓ | ✓ |
| Chat 24/7 | — | ✓ | ✓ |
| White label | — | — | ✓ |
| Persoonlijk contact | — | — | ✓ |

---

## 4. Homepage – Hoe het werkt

### Stap 4.1: Sectie-intro
- [x] **Bestand:** `HowItWorks.tsx` (of vergelijkbaar)
- [ ] **Actie:** Tekst onder "Hoe het werkt" wijzigen naar:
  > In drie stappen naar een slim georganiseerd aftersales systeem. Wij combineren data met intuïtieve technologie.

### Stap 4.2: Stap 2-tekst
- [x] **Actie:** Tekst bij stap 2 aanpassen naar:
  > Volledige ontzorging door onze specialisten en het slimme algoritme van de app

### Stap 4.3: Stap 3-tekst
- [x] **Actie:** Tekst bij stap 3 aanpassen naar:
  > Log in op de app, en wij regelen uw aftersales-werkzaamheden.

---

## 5. Oplossingen-pagina

### Stap 5.1: Pagina-intro
- [x] **Bestand:** Oplossingen page / hero
- [ ] **Actie:** Tekst wijzigen naar:
  > Wij ontzorgen ieder type klant, ongeacht uw vloot grootte. Van eenvoudige matching en ontzorgen van plannen, tot maatwerk voor grotere operaties. FleetCare Connect heeft voor iedere individuele behoefte een oplossing.

### Stap 5.2: Planomschrijvingen
- [x] **Standaard:** Maak effectief gebruik van de essentiële functies van FleetCare Connect. Profiteer van ons servicepartner netwerk, door middel van de app en het algoritme.
- [ ] **Smart:** Optimaliseer het gebruik van FleetCare Connect door aanvullende functies zoals toegang tot het web-portaal, wat zorgt voor nóg meer overzicht in uw aftersales operatie.
- [ ] **Enterprise:** Een White label met naadloze integratie met uw eigen bedrijfssystemen, voor optimale aansluiting op uw organisatie. Op maat gemaakt voor de grootte van uw vloot.

### Stap 5.3: Prijsopbouw-tekst
- [x] **Standaard:** Blijft "alles in… +" (of vergelijkbaar)
- [ ] **Smart:** Wijzig naar **alles in Standaard + …**
- [ ] **Enterprise:** Wijzig naar **alles in Smart + …**

### Stap 5.4: Tooltip / info-icoon (i’tje)
- [ ] **Probleem:** Bij hover over info-icoon verdwijnt tekst achter het abonnement ernaast
- [ ] **Actie:** Z-index, overflow of positie aanpassen zodat tooltip volledig zichtbaar blijft

---

## 6. Over ons-pagina

### Stap 6.1: Hero-titel
- [x] **Actie:** Titel wijzigen naar:
  > Het verhaal achter FleetCare Connect

### Stap 6.2: Hero-subtekst
- [x] **Actie:** Subtekst wijzigen naar:
  > Van eigen onderzoek naar de LEV branche, tot een nationaal gecentraliseerd aftersales platform om aftersales efficiënter en eenvoudiger aan te kunnen bieden voor Light Electric Vehicles.

### Stap 6.3: Ons verhaal
- [x] **Actie:** Tekst aanpassen naar:
  > Aan de hand van de resultaten van een onderzoeksstage, ging er een belletje rinkelen rondom aftersales organisatie. Uit onderzoek bleek dat de aftersales voor de Light Electric vehicle-branche te wensen overliet. Op basis hiervan is FleetCare Connect opgezet om de elektrificering in Nederland écht te kunnen helpen.
  > Door ons centrale platform willen wij LEV-fleetowners en servicepartners samenbrengen om in iedere operatie downtime te minimaliseren. Dit, zonder complexe processen en eindeloze handmatige administratieve taken.

### Stap 6.4: Waarom FleetCare Connect
- [x] **Eenvoud:** Één platform voor onderhoud, reparatie en real time tracking. Geen complexe handelingen, alles centraal.
- [ ] **Inzicht:** Realtime data over uw LEV-vloot. Altijd weten welke zorg uw voertuigen nodig hebben, met service status en overzicht.
- [ ] **Betrouwbaarheid:** Transparante communicatie over behoeften, status en administratieve verwachtingen van alle betrokkenen.

---

## 7. Klanten-pagina

### Stap 7.1: Inhoud
- [ ] **Status:** Nader te bepalen door klant
- [ ] **Actie:** Geen wijzigingen tot nadere instructie

---

## 8. Mobiel / telefoon

### Stap 8.1: Overgang en overzicht
- [x] **Probleem:** Op telefoon mist de website de overgang en het overzicht zoals op desktop; tekst valt snel weg door overgang
- [ ] **Actie:** Layout en animaties aanpassen zodat de ervaring op mobiel beter aansluit en tekst niet wegvalt

---

## Bestandenoverzicht (te vinden/aanpassen)

| Component / bestand | Sectie |
|--------------------|--------|
| `HeroSection.tsx` | Homepage Hero |
| `WhatWeDoSection.tsx` | Wat we doen |
| `PlansOverview.tsx` | Plans / prijzen |
| `HowItWorks.tsx` | Hoe het werkt |
| `src/app/oplossingen/page.tsx` + componenten | Oplossingen |
| `src/app/over/page.tsx` + componenten | Over ons |
| `src/app/klanten/page.tsx` | Klanten |

---

## Volgende stap

Start met **Stap 1.1** en werk daarna de stappen in volgorde af. Update dit document met een vinkje (x) na elke voltooide stap.
