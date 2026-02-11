import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { getStoreLink } from "@/lib/storeLinks";

/**
 * Premium hero: donkere gradient, telefoon mockup, wordmark, titel linksonder, CTAs.
 * Screenshot: plaats public/phone-screen.png (of hero-screenshot.png) voor app preview.
 */
export function HeroSection() {
  const storeLink = getStoreLink();

  return (
    <section className="relative flex min-h-screen flex-col justify-end overflow-hidden bg-neutral-900">
      {/* Gradient en glows */}
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 70% 40%, rgba(var(--color-accent-rgb), 0.12) 0%, transparent 50%), linear-gradient(180deg, var(--color-neutral-900) 0%, var(--color-neutral-800) 100%)",
        }}
      />
      {/* Groot wordmark achter telefoon */}
      <div
        className="pointer-events-none absolute right-0 top-1/2 flex -translate-y-1/2 items-center justify-end pr-4 opacity-[0.07] md:pr-16"
        aria-hidden
      >
        <span className="font-black text-white select-none text-[clamp(4rem,15vw,12rem)] tracking-tighter">
          FLEETCARE
        </span>
      </div>

      <Container className="relative z-10 flex min-h-screen flex-col justify-end pb-16 pt-24 md:pb-20">
        <div className="grid items-end gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-xl">
            <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              Fleetmanagement dat werkt. Eenvoudig, inzichtelijk, betrouwbaar.
            </h1>
            <p className="mt-4 text-lg text-neutral-300">
              Volg uw voertuigen in realtime, beheer onderhoud en blijf in control. 
              Alles in één app.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              {storeLink.disabled ? (
                <Button variant="primary" disabled>
                  {storeLink.label}
                </Button>
              ) : (
                <Button variant="primary" href={storeLink.href}>
                  {storeLink.label}
                </Button>
              )}
              <Button variant="secondary" href="/oplossingen">
                Bekijk oplossingen
              </Button>
            </div>
          </div>

          {/* Telefoon mockup: centraal/rechts */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative h-[min(70vh,520px)] w-[min(280px,85vw)]">
              {/* Device frame (placeholder: eenvoudige rounded rect) */}
              <div className="absolute inset-0 rounded-[2.5rem] border-[10px] border-neutral-700 bg-neutral-800 shadow-lg" />
              <div className="absolute inset-[10px] overflow-hidden rounded-[1.75rem] bg-neutral-800">
                {/* Plaats public/phone-screen.png en gebruik bijv. next/Image voor app-screenshot */}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
