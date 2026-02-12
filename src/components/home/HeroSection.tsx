"use client";

import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { AuroraBackground } from "@/components/ui/AuroraBackground";
import { getStoreLink } from "@/lib/storeLinks";
import { usePhoneScrollAnimation } from "@/hooks/usePhoneScrollAnimation";
import { useCardContentOverSection } from "@/hooks/useCardContentOverSection";

export function HeroSection() {
  const heroScopeRef = useRef<HTMLDivElement>(null);
  const storeLink = getStoreLink();

  usePhoneScrollAnimation(heroScopeRef);
  useCardContentOverSection();

  return (
    <div ref={heroScopeRef}>
      <div id="hero" className="fixed inset-0 z-[1] isolate">
        {/* 1. Aurora bewegende achtergrond (achter) */}
        <AuroraBackground showRadialGradient={true} />
        {/* 2. Gradient overlay (voor de dots; hogere z-index) */}
        <div
          className="absolute inset-0 z-10 pointer-events-none opacity-95"
          style={{ background: "var(--gradient-hero)" }}
          aria-hidden
        />
        <section className="relative h-screen overflow-hidden z-20">
      {/* Layer 3: Content grid (zonder phone) */}
      <Container className="relative z-10 flex min-h-screen flex-col justify-end pb-20 pt-24 md:pb-24">
        <div className="grid items-end gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: tekst */}
          <div className="max-w-sm">
            <p className="mb-3 text-sm font-medium uppercase tracking-wider text-neutral-600">
              Uw wagenpark in één oogopslag
            </p>
            <h1 className="text-2xl font-semibold leading-[1.25] text-brand md:text-3xl lg:text-4xl">
              LEV-Fleetmanagement Van De Toekomst.
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-neutral-600">
              Volg uw voertuigen in realtime, beheer onderhoud en blijf in
              control. Alles in één app.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              {storeLink.disabled ? (
                <Button variant="primary" disabled className="transition-transform duration-200 hover:scale-[1.02]">
                  {storeLink.label}
                </Button>
              ) : (
                <Button variant="primary" href={storeLink.href} className="transition-transform duration-200 hover:scale-[1.02]">
                  {storeLink.label}
                </Button>
              )}
              <Button variant="secondary" href="/oplossingen" className="transition-transform duration-200 hover:scale-[1.02]">
                Bekijk oplossingen
              </Button>
            </div>
          </div>
          {/* Right: lege kolom zodat layout gelijk blijft; phone staat in aparte z-30 laag */}
          <div className="relative flex justify-center lg:justify-end" aria-hidden />
        </div>
      </Container>

        </section>
      </div>

      {/* iPhone mockup: z-3 — boven sectie 2 (z-2), onder rest (z-4) */}
      <div
        id="phone-layer"
        className="fixed inset-0 pointer-events-none flex items-end justify-center px-4 pb-20 pt-24 sm:px-6 md:pb-24 lg:grid lg:grid-cols-2 lg:items-center lg:px-8"
        aria-hidden
      >
        <div className="hidden lg:block" aria-hidden />
        <div className="phoneWrap relative flex w-full items-end justify-center lg:items-center lg:justify-center">
          {/* Glasmorphism card: animeert naar rechterbovenhoek iPhone bij scroll */}
          <div
            className="phoneCard absolute bottom-6 right-4 z-20 rounded-lg border border-brand bg-brand px-4 py-3 shadow-lg backdrop-blur-md md:bottom-8 md:right-6 lg:left-[calc(25vw+60px)] lg:top-[calc(50vh+100px)] lg:bottom-auto lg:right-auto"
            style={{
              boxShadow: "0 8px 32px -8px rgba(var(--color-brand-rgb), 0.25)",
            }}
          >
            <div className="phoneCardHeroContent relative flex flex-col opacity-100">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-white" style={{ minWidth: "8px" }} />
                <span className="text-xs font-medium text-white">
                  Realtime tracking
                </span>
              </div>
              <p className="mt-1 text-[10px] uppercase tracking-wider text-white/90">
                Altijd actueel
              </p>
            </div>
            <div
              className="phoneCardSectionContent absolute inset-0 flex flex-col justify-center opacity-0"
              aria-hidden
            >
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-white" style={{ minWidth: "8px" }} />
                <span className="text-xs font-medium text-white">
                  Eén platform
                </span>
              </div>
              <p className="mt-1 text-[10px] uppercase tracking-wider text-white/90">
                Onderhoud & tracking
              </p>
            </div>
          </div>
          {/* Extra cards:zelfde hoogte als phoneCard, horizontaal, zonder pivot */}
          <div
            className="phoneCardLeft absolute top-[30%] left-0 z-20 hidden flex-col opacity-0 rounded-lg border border-brand bg-brand px-4 py-3 shadow-lg backdrop-blur-md lg:flex"
            style={{ boxShadow: "0 8px 32px -8px rgba(var(--color-brand-rgb), 0.2)" }}
          >
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-white" style={{ minWidth: "8px" }} />
              <span className="text-xs font-medium text-white">Onderhoud</span>
            </div>
            <p className="mt-1 text-[10px] uppercase tracking-wider text-white/90">Planning</p>
          </div>
          <div
            className="phoneCardRight absolute bottom-[30%] right-0 z-20 hidden flex-col opacity-0 rounded-lg border border-brand bg-brand px-4 py-3 shadow-lg backdrop-blur-md lg:flex"
            style={{ boxShadow: "0 8px 32px -8px rgba(var(--color-brand-rgb), 0.2)" }}
          >
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-white" style={{ minWidth: "8px" }} />
              <span className="text-xs font-medium text-white">Rapportages</span>
            </div>
            <p className="mt-1 text-[10px] uppercase tracking-wider text-white/90">Real-time</p>
          </div>
          <div className="phoneMockup relative z-10 mx-auto h-[320px] w-[160px] sm:h-[400px] sm:w-[200px] md:h-[440px] md:w-[220px] lg:h-[480px] lg:w-[240px]">
          {/* Canonical size 310×630 — Premium iPhone 16 Pro mockup */}
          <div className="absolute bottom-0 left-1/2 h-[630px] w-[310px] -translate-x-1/2 origin-bottom scale-[0.508] sm:scale-[0.635] md:scale-[0.698] lg:scale-[0.762]">
            {/* Behuizing (Frame) — titanium metaal-glans, geavanceerde schaduwen */}
            <div className="relative z-10 iphone-frame-sheen iphone-floating h-full w-full overflow-visible rounded-[3.5rem] border-[1px] border-slate-700/50 p-[8px]">
              {/* Interne Bezel (Zwarte rand) */}
              <div className="relative h-full w-full overflow-hidden rounded-[3rem] bg-black p-[4px]">
                {/* Dynamic Island */}
                <div className="absolute left-1/2 top-6 z-40 flex h-7 w-24 -translate-x-1/2 items-center justify-between rounded-full border border-white/5 bg-black px-4">
                  <div className="flex h-2 w-2 items-center justify-center rounded-full border border-white/10 bg-[#0a0a0a]">
                    <div className="h-1 w-1 rounded-full bg-blue-500/20 blur-[1px]" />
                  </div>
                  <div className="h-1.5 w-1.5 rounded-full bg-white/5" />
                </div>

                {/* Status Bar (iOS Look) */}
                <div className="absolute top-7 z-30 flex w-full justify-between px-8 text-[10px] font-semibold text-white pointer-events-none">
                  <span>9:41</span>
                  <div className="flex items-center gap-1">
                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21l-12-18h24z" /></svg>
                    <div className="relative h-2 w-4 rounded-sm border border-white/40">
                      <div className="absolute inset-[1px] w-[80%] bg-white rounded-sm" />
                    </div>
                  </div>
                </div>

                {/* Scherm */}
                <div className="relative h-full w-full overflow-hidden rounded-[2.7rem] bg-white">
                  {/* Wit placeholder (geen afbeelding) */}
                  <div className="absolute inset-0 pointer-events-none screen-glass-overlay" />
                  {/* Home Indicator */}
                  <div className="absolute bottom-2 left-1/2 z-30 h-1 w-32 -translate-x-1/2 rounded-full bg-black/20" />
                </div>
              </div>

              {/* Volume knoppen */}
              <div className="absolute left-[-2px] top-28 h-12 w-[3px] rounded-l-sm border-l border-white/10 bg-slate-800" />
              <div className="absolute left-[-2px] top-44 h-12 w-[3px] rounded-l-sm border-l border-white/10 bg-slate-800" />
              {/* Power knop */}
              <div className="absolute right-[-2px] top-36 h-20 w-[3px] rounded-r-sm border-r border-white/10 bg-slate-800" />
            </div>

            {/* Schaduw op de vloer */}
            <div className="absolute -bottom-6 left-1/2 -z-10 h-6 w-[70%] -translate-x-1/2 rounded-[100%] bg-black/35 blur-2xl" />
          </div>
        </div>
        </div>
      </div>

      {/* Spacer: trigger voor scroll-animatie; secties scrollen over de hero (z-20) */}
      <div data-scroll-trigger className="h-screen w-full" aria-hidden />
    </div>
  );
}
