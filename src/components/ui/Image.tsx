"use client";

import NextImage, { type ImageProps } from "next/image";

/**
 * Wrapper rond next/image. Voorkomt layout shift door width/height of fill.
 * Gebruik altijd width+height of fill + aspect ratio.
 */
export function Image(props: ImageProps) {
  return <NextImage {...props} alt={props.alt || ""} />;
}
