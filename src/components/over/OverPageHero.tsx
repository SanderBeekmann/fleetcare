import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import logoImage from "@/assets/LogoFCCtransparant.png";

/**
 * Hero voor Over pagina.
 */
export function OverPageHero() {
  return (
    <>
      <section
        id="over-hero"
        className="relative -mt-16 flex flex-col justify-center bg-white pb-16 pt-40 md:min-h-screen md:py-24"
      >
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="lg:col-span-6">
              <h1 className="text-3xl font-bold tracking-tight text-brand sm:text-[34px] md:text-4xl lg:text-5xl">
                <span data-intro-item className="block">
                  Het verhaal achter
                </span>
                <span data-intro-item className="block">
                  FleetCare Connect
                </span>
              </h1>
              <p data-intro-item className="mt-6 max-w-2xl text-lg leading-normal text-neutral-900">
                Van eigen onderzoek naar de LEV branche, tot een nationaal gecentraliseerd
                aftersales platform om aftersales efficiënter en eenvoudiger aan te kunnen bieden
                voor Light Electric Vehicles.
              </p>
              <div data-intro-item className="mt-10">
                <Button variant="primary" href="/oplossingen">
                  Bekijk oplossingen
                </Button>
              </div>
            </div>
            <div data-intro-item className="hidden lg:col-span-6 lg:flex lg:justify-center">
              <Image
                src={logoImage}
                alt="FleetCare Connect logo"
                priority
                sizes="(min-width: 1024px) 40vw, 0px"
                className="h-auto w-full max-w-[32rem]"
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
