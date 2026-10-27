import Image, { type StaticImageData } from "next/image";

/** The image is solid in the bottom-right corner and fades out towards the top-left. */
const IMAGE_MASK =
  "radial-gradient(circle at 100% 100%, #000 0%, #000 30%, rgba(0,0,0,0.72) 50%, rgba(0,0,0,0.18) 68%, transparent 84%)";

type FadeImageBackgroundProps = {
  src: StaticImageData;
  alt: string;
  sizes: string;
  /** Tailwind object-position class; keep the subject in the visible bottom-right area. */
  position?: string;
};

/**
 * Card background: photo in the bottom-right corner that fades into white, so text at the
 * top stays readable. The parent needs `relative isolate overflow-hidden`.
 */
export function FadeImageBackground({
  src,
  alt,
  sizes,
  position = "object-right-bottom",
}: FadeImageBackgroundProps) {
  return (
    <>
      <div
        className="absolute inset-0 -z-10"
        style={{ WebkitMaskImage: IMAGE_MASK, maskImage: IMAGE_MASK }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          quality={85}
          sizes={sizes}
          className={`object-cover ${position}`}
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(165deg,#fff_0%,rgba(255,255,255,0.97)_34%,rgba(255,255,255,0.78)_54%,rgba(255,255,255,0.08)_100%)]"
        aria-hidden
      />
    </>
  );
}
