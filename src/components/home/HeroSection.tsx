"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Image } from "@/components/ui/Image";
import { ShaderBackground } from "@/components/ui/ShaderBackground";
import { usePhoneScrollAnimation } from "@/hooks/usePhoneScrollAnimation";
import { useHeroStaggerAnimation } from "@/hooks/useHeroStaggerAnimation";
import { useMobilePhoneFit } from "@/hooks/useMobilePhoneFit";

import appInterfaceImage from "@/assets/app-interface.webp";

/** Scherm van de iPhone-mockup: blauwe statusbalkzone + app-screenshot op volle breedte. */
function PhoneScreen({ priority = false }: { priority?: boolean }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[2.7rem] bg-[#fcfcfc]">
      {/* Zone achter statusbalk en Dynamic Island, in de kleur van de app-header */}
      <div className="h-12 w-full bg-[var(--color-brand)]" aria-hidden />
      <Image
        src={appInterfaceImage}
        alt="FleetCare Connect app interface"
        className="relative -mt-px block h-auto w-full"
        sizes="300px"
        quality={90}
        priority={priority}
      />
      <div className="screen-glass-overlay pointer-events-none absolute inset-0" />
      {/* Home Indicator */}
      <div className="absolute bottom-2 left-1/2 z-30 h-1 w-32 -translate-x-1/2 rounded-full bg-black/20" />
    </div>
  );
}

export function HeroSection() {
  const heroScopeRef = useRef<HTMLDivElement>(null);
  const mobilePhoneSlotRef = useRef<HTMLDivElement>(null);
  const mobilePhoneRef = useRef<HTMLDivElement>(null);

  usePhoneScrollAnimation(heroScopeRef);
  useHeroStaggerAnimation(heroScopeRef);
  useMobilePhoneFit(mobilePhoneSlotRef, mobilePhoneRef);

  return (
    <div ref={heroScopeRef} className="relative -mt-16">
      {/* Hero scrolt mee (niet sticky); dient tegelijk als scroll-trigger voor de telefoonlaag */}
      <div
        id="hero"
        data-scroll-trigger
        className="relative isolate z-[1] min-h-screen lg:h-screen"
      >
        {/* 1. Aurora bewegende achtergrond (achter) */}
        <ShaderBackground />
        {/* 2. Premium gradient overlay — boven canvas, onder content */}
        <div
          className="hero-gradient-overlay pointer-events-none absolute inset-0 z-10"
          aria-hidden
        />
        <section className="relative z-20 min-h-screen w-full max-w-none overflow-x-hidden overflow-y-visible lg:h-screen lg:overflow-hidden">
          {/* Layer 3: Content — full width, clamp padding voor alle schermgroottes */}
          <div
            className="relative z-10 mx-auto flex min-h-svh w-full max-w-none flex-col justify-start pb-6 pt-20 sm:pb-16 sm:pt-24 lg:min-h-screen lg:justify-center lg:pb-16 lg:pt-24 xl:pb-12 xl:pt-12 2xl:justify-center 2xl:pt-16"
            style={{
              paddingLeft: "clamp(24px, 4vw, 120px)",
              paddingRight: "clamp(24px, 4vw, 120px)",
            }}
          >
            {/* 2 gelijke onzichtbare gridkolommen: links content, rechts ruimte voor phone */}
            <div className="flex flex-1 flex-col gap-8 sm:gap-12 lg:grid lg:flex-none lg:grid-cols-[3fr_2fr] lg:items-center lg:gap-16 xl:grid-cols-2 2xl:grid-cols-2 2xl:items-center 2xl:gap-16">
              {/* Links: content linksuitgelijnd in linker grid; op 2xl omhoog (gecentreerd) */}
              <div
                className="flex min-w-0 max-w-2xl flex-1 flex-col lg:block xl:max-w-4xl 2xl:max-w-5xl 2xl:justify-self-start"
                data-hero-stagger
                suppressHydrationWarning
              >
                {/* Mobile: the phone fills the free space above the text, which sits bottom-left */}
                <div
                  ref={mobilePhoneSlotRef}
                  className="mb-4 flex min-h-[320px] w-full flex-1 items-end justify-center overflow-x-clip lg:hidden"
                >
                  <div
                    ref={mobilePhoneRef}
                    className="phoneMockupMobile relative h-[320px] w-[140px]"
                  >
                    <div
                      className="absolute bottom-0 left-1/2 h-[630px] w-[310px] origin-bottom"
                      style={{ transform: "translateX(-50%) scale(var(--phone-scale, 0.508))" }}
                    >
                      <div className="iphone-frame-sheen iphone-floating relative z-10 h-full w-full overflow-visible rounded-[3.5rem] border-[1px] border-slate-700/50 p-[8px]">
                        <div className="relative h-full w-full overflow-hidden rounded-[3rem] bg-black p-[4px]">
                          <div className="absolute left-1/2 top-6 z-40 flex h-7 w-24 -translate-x-1/2 items-center justify-between rounded-full border border-white/5 bg-black px-4">
                            <div className="flex h-2 w-2 items-center justify-center rounded-full border border-white/10 bg-[#0a0a0a]">
                              <div className="h-1 w-1 rounded-full bg-blue-500/20 blur-[1px]" />
                            </div>
                            <div className="h-1.5 w-1.5 rounded-full bg-white/5" />
                          </div>
                          <div className="pointer-events-none absolute top-7 z-30 flex w-full justify-between px-8 text-xs font-semibold text-white">
                            <span>9:41</span>
                            <div className="flex items-center gap-1">
                              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 21l-12-18h24z" />
                              </svg>
                              <div className="relative h-2 w-4 rounded-sm border border-white/40">
                                <div className="absolute inset-[1px] w-[80%] rounded-sm bg-white" />
                              </div>
                            </div>
                          </div>
                          <PhoneScreen />
                        </div>
                        <div className="absolute left-[-2px] top-28 h-12 w-[3px] rounded-l-sm border-l border-white/10 bg-slate-800" />
                        <div className="absolute left-[-2px] top-44 h-12 w-[3px] rounded-l-sm border-l border-white/10 bg-slate-800" />
                        <div className="absolute right-[-2px] top-36 h-20 w-[3px] rounded-r-sm border-r border-white/10 bg-slate-800" />
                      </div>
                      <div className="absolute -bottom-6 left-1/2 -z-10 h-6 w-[70%] -translate-x-1/2 rounded-[100%] bg-black/35 blur-2xl" />
                    </div>
                  </div>
                </div>
                <div className="max-w-2xl xl:max-w-4xl 2xl:max-w-5xl">
                  <h1
                    className="max-w-full text-[26px] font-extrabold leading-tight text-brand sm:text-[28px] sm:font-bold md:text-3xl md:font-semibold lg:text-[32px] xl:text-[44px] xl:leading-none 2xl:text-6xl"
                    data-reveal="fade-up"
                    data-reveal-no-reverse
                    suppressHydrationWarning
                  >
                    <span className="block">Uw vloot,</span>
                    <span className="block sm:mt-2">altijd en overal</span>
                    <span className="hidden sm:mt-2 lg:block 2xl:hidden">verbonden</span>
                    <span className="lg:hidden 2xl:inline"> verbonden</span>
                  </h1>
                  <p
                    className="mt-2 text-base font-bold text-brand sm:text-[17px] md:text-lg lg:text-base xl:text-[22px] 2xl:text-[24px]"
                    data-reveal="fade-up"
                    data-reveal-no-reverse
                    suppressHydrationWarning
                  >
                    Light Electric Vehicles aftersales service & planning management
                  </p>
                </div>
                <p className="mt-4 max-w-full text-base leading-normal text-neutral-700 sm:max-w-[584px]">
                  In 1 minuut uw aanvraag doen voor service, onderhoud en reparatie binnen ons
                  landelijke netwerk van gecertificeerde service partners.
                  <span className="hidden sm:inline">
                    <br />
                    Dit alles in de FCC-App, met realtime status en transparante afhandeling.
                  </span>
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Button variant="primary" href="/contact">
                    Contact
                  </Button>
                  <Button variant="secondary" href="/oplossingen">
                    Bekijk oplossingen
                  </Button>
                </div>
              </div>
              {/* Right: lege kolom zodat layout gelijk blijft; phone staat in aparte z-30 laag */}
              <div className="relative flex justify-center lg:justify-end" aria-hidden />
            </div>
          </div>
        </section>
      </div>

      {/* iPhone mockup: fixed (sticky) op desktop, z-3 boven sectie 2 (z-2), onder rest (z-4) */}
      {/* Laag over hero + sectie 2 (2x schermhoogte); de telefoon is daarin sticky. Zo blijft hij
          in beeld tijdens de hero en landt hij vanzelf op sectie 2, zonder JS-wissel van positie. */}
      <div
        id="phone-layer"
        className="pointer-events-none absolute inset-x-0 top-0 hidden h-[200vh] overflow-x-clip lg:block"
        aria-hidden
      >
        <div
          className="sticky top-0 grid h-screen grid-cols-[3fr_2fr] items-center pb-24 pt-24 xl:grid-cols-2"
          style={{
            paddingLeft: "clamp(24px, 4vw, 120px)",
            paddingRight: "clamp(24px, 4vw, 120px)",
          }}
        >
          <div className="hidden lg:block" aria-hidden />
          <div className="phoneWrap relative flex w-full items-end justify-center lg:ml-16 lg:items-center lg:justify-center xl:translate-x-8 2xl:ml-0 2xl:translate-x-0">
            {/* Glasmorphism card: animeert naar rechterbovenhoek iPhone bij scroll */}
            <div
              className="phoneCard absolute bottom-6 right-4 z-20 rounded-lg border border-brand bg-brand px-6 py-3 shadow-xl backdrop-blur-md md:bottom-8 md:right-6 lg:bottom-auto lg:right-6 lg:top-[calc(50vh+100px)] xl:left-[calc(25vw+60px)] xl:right-auto 2xl:top-[calc(50vh-12px)]"
              style={{
                boxShadow:
                  "0 8px 32px -8px rgba(var(--color-brand-rgb), 0.25), 0 4px 12px rgba(0,0,0,0.3), 0 12px 24px -4px rgba(0,0,0,0.25)",
              }}
            >
              <div className="flex items-start justify-end gap-2">
                <span
                  className="mt-2 h-2 w-2 shrink-0 rounded-full bg-white"
                  style={{ minWidth: "8px" }}
                />
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-white">Realtime tracking</span>
                  <p className="mt-2 text-xs uppercase tracking-wider text-white/90">
                    Altijd actueel
                  </p>
                </div>
              </div>
            </div>
            {/* Extra cards:zelfde hoogte als phoneCard, horizontaal, zonder pivot */}
            <div
              className="phoneCardLeft absolute left-0 top-[30%] z-20 hidden items-start gap-2 rounded-lg border border-brand bg-brand px-4 py-3 opacity-0 shadow-xl backdrop-blur-md lg:flex"
              style={{
                boxShadow:
                  "0 8px 32px -8px rgba(var(--color-brand-rgb), 0.2), 0 4px 12px rgba(0,0,0,0.3), 0 12px 24px -4px rgba(0,0,0,0.25)",
              }}
            >
              <span
                className="mt-2 h-2 w-2 shrink-0 rounded-full bg-white"
                style={{ minWidth: "8px" }}
              />
              <div className="flex flex-col">
                <span className="text-xs font-medium text-white">Onderhoud</span>
                <p className="mt-2 text-xs uppercase tracking-wider text-white/90">Planning</p>
              </div>
            </div>
            <div
              className="phoneCardRight absolute bottom-[30%] right-0 z-20 hidden items-start gap-2 rounded-lg border border-brand bg-brand px-4 py-3 opacity-0 shadow-xl backdrop-blur-md lg:flex"
              style={{
                boxShadow:
                  "0 8px 32px -8px rgba(var(--color-brand-rgb), 0.2), 0 4px 12px rgba(0,0,0,0.3), 0 12px 24px -4px rgba(0,0,0,0.25)",
              }}
            >
              <span
                className="mt-2 h-2 w-2 shrink-0 rounded-full bg-white"
                style={{ minWidth: "8px" }}
              />
              <div className="flex flex-col">
                <span className="text-xs font-medium text-white">Rapportages</span>
                <p className="mt-2 text-xs uppercase tracking-wider text-white/90">Overzicht</p>
              </div>
            </div>
            <div className="phoneMockup relative z-10 mx-auto h-[320px] w-[160px] sm:h-[400px] sm:w-[200px] md:h-[440px] md:w-[220px] lg:h-[480px] lg:w-[240px] xl:h-[520px] xl:w-[260px] 2xl:h-[560px] 2xl:w-[280px]">
              {/* Canonical size 310×630 — Premium iPhone 16 Pro mockup; beginstate groter op xl/2xl, eindstate ongewijzigd (GSAP) */}
              <div className="absolute bottom-0 left-1/2 h-[630px] w-[310px] origin-bottom -translate-x-1/2 scale-[0.508] sm:scale-[0.635] md:scale-[0.698] lg:scale-[0.762] xl:scale-[0.82] 2xl:scale-[0.88]">
                {/* Behuizing (Frame) — titanium metaal-glans, geavanceerde schaduwen */}
                <div className="iphone-frame-sheen iphone-floating relative z-10 h-full w-full overflow-visible rounded-[3.5rem] border-[1px] border-slate-700/50 p-[8px]">
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
                    <div className="pointer-events-none absolute top-7 z-30 flex w-full justify-between px-8 text-xs font-semibold text-white">
                      <span>9:41</span>
                      <div className="flex items-center gap-1">
                        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 21l-12-18h24z" />
                        </svg>
                        <div className="relative h-2 w-4 rounded-sm border border-white/40">
                          <div className="absolute inset-[1px] w-[80%] rounded-sm bg-white" />
                        </div>
                      </div>
                    </div>

                    <PhoneScreen priority />
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
      </div>
    </div>
  );
}
