"use client";

import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

interface AuroraBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  showRadialGradient?: boolean;
}

/**
 * Aurora bewegende achtergrond — vervangt de dots. Gebruik als laag (absolute inset-0).
 * Merkkleur-gebaseerd gradient.
 */
export function AuroraBackground({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) {
  const maskClass = showRadialGradient
    ? "[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]"
    : "";

  return (
    <div
      className={cn("absolute inset-0 overflow-hidden", className)}
      {...props}
    >
      <div
        className={cn(
          "aurora-layer aurora-layer-base pointer-events-none absolute -inset-3 opacity-65 will-change-transform",
          maskClass
        )}
      />
      <div
        className={cn(
          "aurora-layer aurora-layer-animate pointer-events-none absolute -inset-3 opacity-65 will-change-transform",
          maskClass
        )}
      />
      {children}
    </div>
  );
}
