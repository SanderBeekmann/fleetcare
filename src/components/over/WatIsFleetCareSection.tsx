"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import { Clock, Puzzle, Activity, MapPin, Smartphone } from "lucide-react";
import Image from "next/image";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const SCROLL_HEIGHT = 1800;

/** Mobiel-detectie: 768px breakpoint, consistent met rest van de site */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);
  return isMobile;
}

const features = [
  {
    icon: Clock,
    title: "Aanvraag in 1 minuut",
    description:
      "In 1 minuut een aanvraag doen voor de oplossing die het beste bij uw situatie past",
  },
  {
    icon: Puzzle,
    title: "Passende oplossing",
    description: "Een passende oplossing krijgen voor uw LEV-voertuig",
  },
  {
    icon: Activity,
    title: "Realtime updates",
    description: "Realtime statusupdates over uw aanvraag volgen",
  },
  {
    icon: MapPin,
    title: "Landelijk netwerk",
    description: "Profiteren van een landelijk netwerk aan gecertificeerde servicepartners",
  },
  {
    icon: Smartphone,
    title: "FCC-app",
    description: "Dit allemaal beschikbaar in de FCC-app",
  },
];

export function WatIsFleetCareSection() {
  return (
    <div className="bg-neutral-50">
      <ParallaxHero />
      <FeatureList />
    </div>
  );
}

/* ── Parallax Hero: center image sticky, parallax images scrollen erover ── */

function ParallaxHero() {
  const isMobile = useIsMobile();
  const prefersReducedMotion = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Clip krimpt van 30% inset naar 0% — onthult meer van de afbeelding
  const inset = useTransform(scrollYProgress, [0, 0.5], prefersReducedMotion ? [0, 0] : [30, 0]);
  const clipPath = useMotionTemplate`inset(${inset}% ${inset}% ${inset}% ${inset}%)`;

  /* ── Mobiel: eenvoudige image-grid zonder parallax/sticky/clipPath ── */
  if (isMobile) {
    return (
      <div className="bg-neutral-50 px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop"
              alt="FleetCare Connect platform"
              className="h-auto w-full"
              width={1200}
              height={800}
              unoptimized
            />
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="flex h-full flex-col justify-between border border-neutral-200 bg-white p-4">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-brand" />
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand">
                    Operationeel
                  </p>
                </div>
                <p className="text-sm font-semibold leading-snug text-neutral-900">
                  Volledig wagenpark&shy;beheer
                </p>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-neutral-500">
                Van laadstatus tot onderhouds&shy;planning, alles in één overzicht.
              </p>
            </div>
            <Image
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"
              alt="Dashboard met data analytics"
              className="h-auto w-full"
              width={800}
              height={533}
              unoptimized
            />
            <div className="bg-brand p-4 text-white">
              <p className="text-xs font-medium uppercase tracking-widest text-white/70">
                Ons netwerk
              </p>
              <p className="mt-2 text-sm font-semibold leading-snug">
                Gecertificeerde servicepartners door heel Nederland
              </p>
              <p className="mt-1 text-xs leading-relaxed text-white/80">
                Onderhoud, reparatie en pechhulp - altijd bij u in de buurt.
              </p>
            </div>
            <Image
              src="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?q=80&w=800&auto=format&fit=crop"
              alt="Mobiele app interface"
              className="h-auto w-full"
              width={800}
              height={533}
              unoptimized
            />
          </div>
        </div>
      </div>
    );
  }

  /* ── Desktop: parallax met sticky + clip-path reveal ── */
  return (
    <div
      ref={containerRef}
      style={{ height: `calc(${SCROLL_HEIGHT}px + 100vh)` }}
      className="relative w-full"
    >
      {/* Center image: sticky, wrapper knipt de afbeelding af */}
      <div className="sticky top-0 flex h-screen items-center justify-center bg-neutral-50">
        {/* Clip-venster onthult steeds meer van de afbeelding */}
        <motion.div
          className="max-h-[50vh] max-w-3xl"
          style={{ clipPath, willChange: "clip-path" }}
        >
          <Image
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
            alt="FleetCare Connect platform"
            className="h-auto w-full"
            width={2426}
            height={1617}
            unoptimized
          />
        </motion.div>
      </div>

      {/* Parallax images: scrollen over de sticky center image */}
      <div className="relative z-10 -mt-[100vh]">
        <div className="mx-auto max-w-5xl px-4 pt-[60vh]">
          <ParallaxCard start={-100} end={100} className="w-1/3" variant="charging" />
          <ParallaxImg
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop"
            alt="Dashboard met data analytics"
            start={100}
            end={-120}
            className="mx-auto w-2/3"
          />
          <ParallaxCard start={-100} end={100} className="ml-auto w-1/3" />
          <ParallaxImg
            src="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?q=80&w=2670&auto=format&fit=crop"
            alt="Mobiele app interface"
            start={0}
            end={-200}
            className="ml-24 w-5/12"
          />
        </div>
      </div>

      {/* Gradient fade-out onderaan */}
      <div className="absolute bottom-0 left-0 right-0 z-10 h-48 bg-gradient-to-b from-transparent to-neutral-50" />
    </div>
  );
}

function ParallaxImg({
  className,
  alt,
  src,
  start,
  end,
}: {
  className?: string;
  alt: string;
  src: string;
  start: number;
  end: number;
}) {
  const ref = useRef<HTMLImageElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], prefersReducedMotion ? [1, 1] : [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], prefersReducedMotion ? [1, 1] : [1, 0.85]);
  const y = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [start, end]);
  const transform = useMotionTemplate`translate3d(0,${y}px,0) scale(${scale})`;

  return (
    <motion.img
      src={src}
      alt={alt}
      className={className}
      ref={ref}
      style={{
        transform,
        opacity,
        willChange: prefersReducedMotion ? "auto" : "transform, opacity",
      }}
    />
  );
}

function ParallaxCard({
  className,
  start,
  end,
  variant = "network",
}: {
  className?: string;
  start: number;
  end: number;
  variant?: "network" | "charging";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], prefersReducedMotion ? [1, 1] : [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], prefersReducedMotion ? [1, 1] : [1, 0.85]);
  const y = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [start, end]);
  const transform = useMotionTemplate`translate3d(0,${y}px,0) scale(${scale})`;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        transform,
        opacity,
        willChange: prefersReducedMotion ? "auto" : "transform, opacity",
      }}
    >
      {variant === "network" ? (
        <div className="bg-brand p-6 text-white">
          <p className="text-xs font-medium uppercase tracking-widest text-white/70">Ons netwerk</p>
          <p className="mt-3 text-lg font-semibold leading-snug">
            Gecertificeerde servicepartners door heel Nederland
          </p>
          <p className="mt-2 text-sm leading-relaxed text-white/80">
            Onderhoud, reparatie en pechhulp - altijd bij u in de buurt.
          </p>
        </div>
      ) : (
        <div className="flex flex-col justify-between border border-neutral-200 bg-white p-6">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-brand" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand">
                Operationeel
              </p>
            </div>
            <p className="text-lg font-semibold leading-snug text-neutral-900">
              Volledig wagenpark&shy;beheer
            </p>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-neutral-500">
            Van laadstatus tot onderhouds&shy;planning, alles in één overzicht.
          </p>
        </div>
      )}
    </motion.div>
  );
}

/* ── Feature list ── */

function FeatureList() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const initial = prefersReducedMotion ? { opacity: 1 } : { y: 48, opacity: 0 };
  const whileInView = prefersReducedMotion ? { opacity: 1 } : { y: 0, opacity: 1 };
  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { ease: "easeInOut" as const, duration: 0.75 };

  return (
    <section className="relative z-10 -mt-0 bg-neutral-50 px-4 py-16 md:-mt-[240px] md:py-24">
      <div className="mx-auto max-w-5xl">
        <motion.p
          initial={initial}
          whileInView={whileInView}
          transition={transition}
          className="mb-4 text-xs font-medium uppercase tracking-widest text-brand"
        >
          Het platform
        </motion.p>
        <motion.h2
          initial={initial}
          whileInView={whileInView}
          transition={transition}
          className="mb-6 text-3xl font-bold text-brand md:text-4xl"
        >
          Wat is FleetCare Connect
        </motion.h2>
        <motion.p
          initial={initial}
          whileInView={whileInView}
          transition={transition}
          className="mb-12 max-w-2xl text-base leading-relaxed text-neutral-600 md:text-lg"
        >
          FleetCare Connect (FCC) is hét centrale aftersalesplatform voor Light Electric Vehicles
          (LEV&apos;s). Wij brengen gecertificeerde servicepartners en LEV-gebruikers samen, om
          onderhoud, reparaties en pechhulp eenvoudig en betrouwbaar aan te bieden.
        </motion.p>

        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              initial={initial}
              whileInView={whileInView}
              transition={transition}
              className="mb-9 flex items-center justify-between border-b border-neutral-200 px-3 pb-9"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-brand text-white">
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <div>
                  <p className="text-lg font-semibold text-neutral-900">{feature.title}</p>
                  <p className="text-sm text-neutral-500">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
