"use client";

import React, { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion, type MotionValue } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function ContainerScroll({
  titleComponent,
  children,
  overlay,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
  /** Content that floats in front of the device frame and tilts along with it. */
  overlay?: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  // Explicit offset: the default ("start start" -> "end end") runs backwards when the
  // container is shorter than the viewport (e.g. h-[42rem] on tall phones).
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });
  // Kanteling/schaal volgen het tablet zelf: start pas als het tablet in beeld komt en
  // staat recht zodra het midden van het tablet het midden van het scherm bereikt.
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: cardProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center"],
  });
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      // Same boundary as Tailwind's md: at 768px the md: overlap (-mt-12) applies, so the
      // title needs the animated parallax there or the tablet covers its second line.
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleRange = React.useMemo(
    () => (isMobile ? [0.85, 1] : [1.05, 1]) as [number, number],
    [isMobile]
  );

  // Kanteling en schaal staan al vóór het midden van de scroll exact op 0° en 1, zodat de
  // browser het scherm zonder 3D-transform (en dus zonder wazige resampling) rendert.
  const settleRange = [0.15, 1];
  const rotate = useTransform(cardProgress, settleRange, prefersReducedMotion ? [0, 0] : [20, 0]);
  const scale = useTransform(cardProgress, settleRange, prefersReducedMotion ? [1, 1] : scaleRange);
  const translate = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [0, -100]
  );

  // Mobile shows title and tablet static: no tilt, scale or parallax
  const animate = mounted && !isMobile;

  return (
    <div
      className="relative z-[1] flex items-center justify-center px-4 py-2 md:min-h-[71rem] md:p-20"
      ref={containerRef}
    >
      <div
        className="relative w-full py-10 md:py-40"
        style={{
          perspective: "1000px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} animate={animate} />
        <Card cardRef={cardRef} rotate={rotate} scale={scale} animate={animate} overlay={overlay}>
          {children}
        </Card>
      </div>
    </div>
  );
}

function Header({
  translate,
  titleComponent,
  animate,
}: {
  translate: MotionValue<number>;
  titleComponent: string | React.ReactNode;
  animate: boolean;
}) {
  return (
    <motion.div
      style={animate ? { translateY: translate } : undefined}
      className="relative z-0 mx-auto max-w-5xl text-center"
      suppressHydrationWarning
    >
      {titleComponent}
    </motion.div>
  );
}

function Card({
  cardRef,
  rotate,
  scale,
  children,
  overlay,
  animate,
}: {
  cardRef: React.RefObject<HTMLDivElement>;
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  children: React.ReactNode;
  overlay?: React.ReactNode;
  animate: boolean;
}) {
  return (
    <motion.div
      ref={cardRef}
      style={animate ? { rotateX: rotate, scale } : undefined}
      className="relative z-10 mx-auto mt-10 w-full max-w-xl md:-mt-12 md:max-w-2xl lg:max-w-3xl 2xl:max-w-[56rem]"
      suppressHydrationWarning
    >
      <div className="rounded-[30px] border-4 border-[#6C6C6C] bg-[#222222] p-2 [box-shadow:0_25px_50px_-12px_rgba(0,0,0,0.45)] md:p-3">
        <div className="w-full overflow-hidden rounded-[18px] bg-gray-100 md:rounded-[14px]">
          {children}
        </div>
      </div>
      {overlay}
    </motion.div>
  );
}
