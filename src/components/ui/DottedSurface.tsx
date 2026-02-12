"use client";

import type React from "react";
import { useEffect, useRef } from "react";
import * as THREE from "three";

type DottedSurfaceProps = Omit<React.ComponentProps<"div">, "ref"> & {
  /** Dotkleur: "light" op donkere achtergrond, "dark" op lichte achtergrond */
  variant?: "light" | "dark";
};

export function DottedSurface({
  className = "",
  variant = "dark",
  ...props
}: DottedSurfaceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    geometry: THREE.BufferGeometry;
    material: THREE.PointsMaterial;
    animationId: number;
    count: number;
  } | null>(null);

  useEffect(() => {
    if (!containerRef.current || typeof window === "undefined") return;

    const prefersReducedMotion =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const SEPARATION = 150;
    const AMOUNTX = 40;
    const AMOUNTY = 60;

    const scene = new THREE.Scene();
    /* Geen fog of ver weg, anders wassen dots uit tegen witte gradient */

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      10000
    );
    camera.position.set(0, 355, 1220);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    const canvas = renderer.domElement;
    canvas.style.position = "absolute";
    canvas.style.inset = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    containerRef.current.appendChild(canvas);

    const positions: number[] = [];
    const colors: number[] = [];

    /* Merkkleur (brand) voor dark variant: Three.js wil 0–1, brand-rgb is 7, 71, 137 */
    const r = variant === "light" ? 200 / 255 : 7 / 255;
    const g = variant === "light" ? 200 / 255 : 71 / 255;
    const b = variant === "light" ? 200 / 255 : 137 / 255;

    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        const x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
        const y = 0;
        const z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;
        positions.push(x, y, z);
        colors.push(r, g, b);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 10,
      vertexColors: true,
      transparent: true,
      opacity: 0.275,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let count = 0;
    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const positionAttribute = geometry.attributes.position;
      const posArray = positionAttribute.array as Float32Array;

      let i = 0;
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          const index = i * 3;
          posArray[index + 1] =
            Math.sin((ix + count) * 0.3) * 50 +
            Math.sin((iy + count) * 0.5) * 50;
          i++;
        }
      }

      positionAttribute.needsUpdate = true;
      renderer.render(scene, camera);
      count += 0.033;
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    animate();

    sceneRef.current = {
      scene,
      camera,
      renderer,
      geometry,
      material,
      animationId,
      count,
    };

    return () => {
      window.removeEventListener("resize", handleResize);
      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId);
        sceneRef.current.geometry.dispose();
        sceneRef.current.material.dispose();
        sceneRef.current.renderer.dispose();
        const canvas = sceneRef.current.renderer.domElement;
        if (containerRef.current && canvas.parentNode === containerRef.current) {
          containerRef.current.removeChild(canvas);
        }
      }
    };
  }, [variant]);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-0 z-0 w-full h-full min-h-full ${className}`.trim()}
      aria-hidden
      {...props}
    />
  );
}
