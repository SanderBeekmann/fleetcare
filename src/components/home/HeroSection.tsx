"use client";

import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
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
      <div className="fixed inset-0 z-10">
        <section
          className="relative h-screen overflow-hidden"
          style={{ background: "var(--gradient-hero)" }}
        >
      {/* Layer 3: Content grid (zonder phone) */}
      <Container className="relative z-10 flex min-h-screen flex-col justify-end pb-20 pt-24 md:pb-24">
        <div className="grid items-end gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: tekst */}
          <div className="max-w-sm">
            <p className="mb-3 text-sm font-medium uppercase tracking-wider text-neutral-600">
              Uw wagenpark in één oogopslag
            </p>
            <h1 className="text-2xl font-semibold leading-[1.25] text-neutral-900 md:text-3xl lg:text-4xl">
              LEV-Fleetmanagement Van De <span className="italic text-brand">Toekomst</span>.
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

      {/* iPhone mockup in aparte fixed laag (z-30): mobil onderaan gecentreerd, desktop rechts gecentreerd in fictieve rechtergrid */}
      <div
        className="fixed inset-0 z-30 pointer-events-none flex items-end justify-center px-4 pb-20 pt-24 sm:px-6 md:pb-24 lg:grid lg:grid-cols-2 lg:items-center lg:px-8"
        aria-hidden
      >
        <div className="hidden lg:block" aria-hidden />
        <div className="phoneWrap relative flex w-full items-end justify-center lg:items-center lg:justify-center">
          {/* Glasmorphism card: animeert naar rechterbovenhoek iPhone bij scroll */}
          <div
            className="phoneCard absolute bottom-6 right-4 z-20 rounded-lg border border-brand bg-white/40 px-4 py-3 shadow-lg backdrop-blur-md md:bottom-8 md:right-6 lg:left-[calc(25vw+60px)] lg:top-[calc(50vh+100px)] lg:bottom-auto lg:right-auto"
            style={{
              boxShadow: "0 8px 32px -8px rgba(var(--color-brand-rgb), 0.25)",
            }}
          >
            <div className="phoneCardHeroContent relative flex flex-col opacity-100">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-brand" style={{ minWidth: "8px" }} />
                <span className="text-xs font-medium text-neutral-800">
                  Realtime tracking
                </span>
              </div>
              <p className="mt-1 text-[10px] uppercase tracking-wider text-neutral-600">
                Altijd actueel
              </p>
            </div>
            <div
              className="phoneCardSectionContent absolute inset-0 flex flex-col justify-center opacity-0"
              aria-hidden
            >
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-brand" style={{ minWidth: "8px" }} />
                <span className="text-xs font-medium text-neutral-800">
                  Eén platform
                </span>
              </div>
              <p className="mt-1 text-[10px] uppercase tracking-wider text-neutral-600">
                Onderhoud & tracking
              </p>
            </div>
          </div>
          {/* Extra cards:zelfde hoogte als phoneCard, horizontaal, zonder pivot */}
          <div
            className="phoneCardLeft absolute top-[30%] left-0 z-20 hidden flex-col opacity-0 rounded-lg border border-brand bg-white/40 px-4 py-3 shadow-lg backdrop-blur-md lg:flex"
            style={{ boxShadow: "0 8px 32px -8px rgba(var(--color-brand-rgb), 0.2)" }}
          >
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-brand" style={{ minWidth: "8px" }} />
              <span className="text-xs font-medium text-neutral-800">Onderhoud</span>
            </div>
            <p className="mt-1 text-[10px] uppercase tracking-wider text-neutral-600">Planning</p>
          </div>
          <div
            className="phoneCardRight absolute bottom-[30%] right-0 z-20 hidden flex-col opacity-0 rounded-lg border border-brand bg-white/40 px-4 py-3 shadow-lg backdrop-blur-md lg:flex"
            style={{ boxShadow: "0 8px 32px -8px rgba(var(--color-brand-rgb), 0.2)" }}
          >
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-brand" style={{ minWidth: "8px" }} />
              <span className="text-xs font-medium text-neutral-800">Rapportages</span>
            </div>
            <p className="mt-1 text-[10px] uppercase tracking-wider text-neutral-600">Real-time</p>
          </div>
          <div className="phoneMockup relative z-10 mx-auto h-[320px] w-[160px] sm:h-[400px] sm:w-[200px] md:h-[440px] md:w-[220px] lg:h-[480px] lg:w-[240px]">
          {/* Canonical size 300×600, geschaald via transform — alle elementen blijven in verhouding */}
          <div className="absolute bottom-0 left-1/2 h-[600px] w-[300px] -translate-x-1/2 origin-bottom scale-[0.533] sm:scale-[0.667] md:scale-[0.733] lg:scale-[0.8]">
            {/* Behuizing (Frame) — box-shadow op frame i.p.v. scaled div, zodat schaduw afgeronde hoeken volgt */}
            <div
              className="relative z-10 h-full w-full overflow-visible rounded-[3.5rem] border-4 border-slate-800 bg-slate-900 p-3"
              style={{
                boxShadow:
                  "0 20px 40px -12px rgba(0, 0, 0, 0.15), 0 12px 24px -16px rgba(0, 0, 0, 0.2)",
              }}
            >
              {/* Dynamic Island */}
              <div className="absolute left-1/2 top-6 z-30 flex h-7 w-24 -translate-x-1/2 items-center justify-end rounded-full bg-black px-4">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-900/40" />
              </div>

              {/* Volume knoppen */}
              <div className="absolute left-[-4px] top-28 h-12 w-1 rounded-l-md bg-slate-700" />
              <div className="absolute left-[-4px] top-44 h-12 w-1 rounded-l-md bg-slate-700" />

              {/* Power knop */}
              <div className="absolute right-[-4px] top-36 h-20 w-1 rounded-r-md bg-slate-700" />

              {/* Scherm */}
              <div className="relative h-full w-full overflow-hidden rounded-[2.8rem] border border-black/10 bg-white">
                <img
                  src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80"
                  alt=""
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-40" />
              </div>
            </div>

            {/* Schaduw op de vloer */}
            <div className="absolute -bottom-5 left-1/2 h-4 w-[60%] -translate-x-1/2 rounded-full bg-black/8 blur-xl" />
          </div>
        </div>
        </div>
      </div>

      {/* Spacer: trigger voor scroll-animatie; secties scrollen over de hero (z-20) */}
      <div data-scroll-trigger className="h-screen w-full" aria-hidden />
    </div>
  );
}
