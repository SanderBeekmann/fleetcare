"use client";

import React from "react";
import { ContainerScroll } from "@/components/ui/ContainerScrollAnimation";
import { Container } from "@/components/ui/Container";

const featuresLeft = [
  {
    title: "Real-time inzicht",
    description:
      "Bekijk de status van elk voertuig op één plek. Van onderhoudsplanning tot brandstofverbruik, alles live en overzichtelijk.",
  },
];

const featuresRight = [
  {
    title: "Slimme meldingen",
    description:
      "Ontvang automatisch meldingen bij aankomend onderhoud, APK-verlopen of afwijkend rijgedrag. Nooit meer iets over het hoofd zien.",
  },
  {
    title: "Rapportages op maat",
    description:
      "Genereer gedetailleerde rapportages per voertuig, chauffeur of periode. Ideaal voor kostenbeheer en compliance.",
  },
];

const allFeatures = [...featuresLeft, ...featuresRight];

function FeatureItem({ title, description }: { title: string; description: string }) {
  return (
    <li>
      <h3 className="text-lg font-semibold text-brand">{title}</h3>
      <p className="mt-2 text-sm font-light leading-relaxed text-neutral-600">{description}</p>
    </li>
  );
}

export function AppShowcaseSection() {
  return (
    <section className="relative z-[3] -mt-24 -mb-24 bg-white overflow-hidden md:-mt-32 md:-mb-32">
      <ContainerScroll
        titleComponent={
          <>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-brand">
              Ons Platform
            </h4>
            <h2 className="font-heading text-4xl font-light leading-[1.1] tracking-tighter text-brand sm:text-5xl md:text-6xl">
              Eén dashboard voor <br />
              <span className="font-bold">uw hele vloot.</span>
            </h2>
          </>
        }
      >
        <div className="flex h-full w-full items-center justify-center rounded-2xl bg-neutral-200" />
      </ContainerScroll>

      {/* Mobiel/tablet: onder de wrapper */}
      <Container className="relative z-10 -mt-[10.5rem] pb-24 md:-mt-[14.5rem] xl:hidden">
        <ul className="grid gap-8 md:grid-cols-3 md:gap-10" data-stagger="children">
          {allFeatures.map((f) => (
            <FeatureItem key={f.title} {...f} />
          ))}
        </ul>
      </Container>

      {/* Desktop: links en rechts naast de wrapper */}
      <div className="pointer-events-none absolute inset-0 z-0 hidden xl:flex xl:items-center xl:justify-center">
        <div className="relative flex w-full max-w-[90rem] items-center justify-between px-8 2xl:px-16">
          {/* Links */}
          <div className="pointer-events-auto w-56 2xl:w-64" data-stagger="children">
            <ul className="flex flex-col gap-10">
              {featuresLeft.map((f) => (
                <FeatureItem key={f.title} {...f} />
              ))}
            </ul>
          </div>

          {/* Spacer voor de wrapper */}
          <div className="w-[42rem] flex-shrink-0 2xl:w-[48rem]" />

          {/* Rechts */}
          <div className="pointer-events-auto w-56 2xl:w-64" data-stagger="children">
            <ul className="flex flex-col gap-16">
              {featuresRight.map((f) => (
                <FeatureItem key={f.title} {...f} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
