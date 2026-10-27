"use client";

import { useRef } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { useGsapContext } from "@/hooks/useGsapContext";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { gsap } from "@/lib/gsap/gsapClient";
import daanImg from "@/assets/Daan.webp";
import simonImg from "@/assets/Simon.webp";

/** Tiles unveil upwards one by one, then the heading rises from a mask and the paragraphs follow. */
function useStoryStagger(sectionRef: React.RefObject<HTMLElement | null>) {
  const prefersReducedMotion = usePrefersReducedMotion();

  useGsapContext(
    sectionRef,
    () => {
      const section = sectionRef.current;
      if (!section) return;
      const tiles = section.querySelectorAll<HTMLElement>("[data-story-tile]");
      const tileMedia = section.querySelectorAll<HTMLElement>("[data-story-media]");
      const heading = section.querySelector<HTMLElement>("[data-story-heading]");
      const paragraphs = section.querySelectorAll<HTMLElement>("[data-story-text]");

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: section, start: "top 70%", once: true },
      });

      tl.fromTo(
        tiles,
        { clipPath: "inset(100% 0% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, stagger: 0.16 }
      )
        .fromTo(tileMedia, { scale: 1.15 }, { scale: 1, duration: 1.4, stagger: 0.16 }, 0)
        .fromTo(heading, { yPercent: 110 }, { yPercent: 0, duration: 0.9 }, 0.35)
        .fromTo(
          paragraphs,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.14 },
          0.55
        );
    },
    { enabled: !prefersReducedMotion, deps: [] }
  );
}

/**
 * Ons verhaal-sectie.
 */
export function OverStackedSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useStoryStagger(sectionRef);

  return (
    <section ref={sectionRef} className="bg-white py-section">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div className="grid grid-cols-2 gap-3">
            <div className="relative h-full overflow-hidden rounded-md" data-story-tile>
              <div className="absolute inset-0" data-story-media>
                <Image
                  src={daanImg}
                  alt="Daan, co-founder van FleetCare Connect"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
            </div>
            <div className="space-y-3">
              <div className="relative aspect-[4/3] overflow-hidden rounded-md" data-story-tile>
                <div className="absolute inset-0" data-story-media>
                  <Image
                    src={simonImg}
                    alt="Simon, co-founder van FleetCare Connect"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              </div>
              <div
                className="flex aspect-[4/3] items-center justify-center rounded-md bg-brand p-4"
                data-story-tile
              >
                <p className="text-center text-sm font-semibold leading-snug text-white">
                  Founders
                  <br />
                  FleetCare Connect
                </p>
              </div>
            </div>
          </div>
          <div className="max-w-3xl text-left">
            <div className="overflow-hidden">
              <h2 className="text-2xl font-bold text-brand md:text-3xl" data-story-heading>
                Ons verhaal
              </h2>
            </div>
            <p className="mt-6 text-base leading-normal text-neutral-600" data-story-text>
              Aan de hand van de resultaten van een onderzoeksstage, ging er een belletje rinkelen
              rondom aftersales organisatie. Uit onderzoek bleek dat de aftersales voor de Light
              Electric vehicle-branche te wensen overliet. Op basis hiervan is FleetCare Connect
              opgezet om de elektrificering in Nederland écht te kunnen helpen.
            </p>
            <p className="mt-6 text-base leading-normal text-neutral-600" data-story-text>
              Door ons centrale platform willen wij LEV-fleetowners en servicepartners samenbrengen
              om in iedere operatie downtime te minimaliseren. Dit, zonder complexe processen en
              eindeloze handmatige administratieve taken.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
