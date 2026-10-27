import { useEffect, type RefObject } from "react";

/** Design size of the iPhone mockup before scaling. */
const PHONE_WIDTH = 310;
const PHONE_HEIGHT = 630;
const MAX_SCALE = 0.85;
/** Phone never wider than this share of the available width. */
const MAX_WIDTH_SHARE = 0.62;

/**
 * Scales the mobile hero phone to fill the free space above the hero text.
 * Writes the box size and scale to the target element; the frame reads `--phone-scale`.
 */
export function useMobilePhoneFit(
  slotRef: RefObject<HTMLElement | null>,
  phoneRef: RefObject<HTMLElement | null>
) {
  useEffect(() => {
    const slot = slotRef.current;
    const phone = phoneRef.current;
    if (!slot || !phone) return;

    const fit = () => {
      const scale = Math.min(
        slot.clientHeight / PHONE_HEIGHT,
        (slot.clientWidth * MAX_WIDTH_SHARE) / PHONE_WIDTH,
        MAX_SCALE
      );
      if (scale <= 0) return;
      phone.style.width = `${PHONE_WIDTH * scale}px`;
      phone.style.height = `${PHONE_HEIGHT * scale}px`;
      phone.style.setProperty("--phone-scale", String(scale));
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(slot);
    return () => observer.disconnect();
  }, [slotRef, phoneRef]);
}
