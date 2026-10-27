import { Button } from "@/components/ui/Button";

type ServicePartnerBandProps = { id?: string; className?: string };

/** Band voor servicepartners: aansluiten op het netwerk is gratis. */
export function ServicePartnerBand({ id, className = "" }: ServicePartnerBandProps) {
  return (
    <div
      id={id}
      className={`flex scroll-mt-24 flex-col gap-6 rounded-md bg-[#E8EDF3] px-6 pb-6 pt-5 sm:px-8 sm:pb-8 sm:pt-7 md:flex-row md:items-center md:justify-between ${className}`}
    >
      <div className="max-w-xl">
        <h3 className="text-xl font-semibold leading-none tracking-wide text-neutral-900 md:text-2xl md:leading-none">
          Aansluiten op het netwerk is gratis
        </h3>
        <p className="mt-4 text-sm leading-normal text-neutral-600 md:text-base">
          Nog geen servicepartner? Start vandaag. Geen werk? Geen kosten. U betaalt alleen voor
          uitgevoerd werk.
        </p>
      </div>
      <Button variant="secondary" href="/contact" className="shrink-0">
        Word servicepartner
      </Button>
    </div>
  );
}
