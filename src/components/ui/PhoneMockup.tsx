import Image from "next/image";
import appInterfaceImage from "@/assets/app-interface.webp";

type PhoneMockupProps = {
  /** Sizes the outer box; must match the scaled 310x630 phone (e.g. "h-[315px] w-[155px]"). */
  className?: string;
  /** Scale classes for the 310x630 phone, matching className (e.g. "scale-50"). */
  scaleClassName?: string;
  alt?: string;
};

/** Static iPhone frame with the FCC app screen, without drop shadow. */
export function PhoneMockup({
  className = "",
  scaleClassName = "",
  alt = "FleetCare Connect app",
}: PhoneMockupProps) {
  return (
    <div className={`relative ${className}`}>
      <div
        className={`iphone-frame-sheen absolute left-0 top-0 h-[630px] w-[310px] origin-top-left rounded-[3.5rem] border border-slate-700/50 p-[8px] ${scaleClassName}`}
      >
        <div className="relative h-full w-full overflow-hidden rounded-[3rem] bg-black p-[4px]">
          <div className="absolute left-1/2 top-6 z-40 h-7 w-24 -translate-x-1/2 rounded-full bg-black" />
          <div className="relative h-full w-full overflow-hidden rounded-[2.7rem] bg-[#fcfcfc]">
            <div className="h-12 w-full bg-[var(--color-brand)]" aria-hidden />
            <Image
              src={appInterfaceImage}
              alt={alt}
              className="relative -mt-px block h-auto w-full"
              sizes="300px"
              quality={90}
            />
            <div className="screen-glass-overlay pointer-events-none absolute inset-0" />
            <div className="absolute bottom-2 left-1/2 z-30 h-1 w-32 -translate-x-1/2 rounded-full bg-black/20" />
          </div>
        </div>
      </div>
    </div>
  );
}
