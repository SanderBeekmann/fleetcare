"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, type Variants } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { webportal } from "@/lib/company";

type NavLink = { href: string; label: string };

type AnimatedMobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  navLinks: NavLink[];
  linkClass: (href: string) => string;
};

export function AnimatedMobileMenu({
  isOpen,
  onClose,
  navLinks,
  linkClass,
}: AnimatedMobileMenuProps) {
  const [mounted, setMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  useEffect(() => setMounted(true), []);

  const dragX = useMotionValue(0);

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    if (info.offset.x > 100) {
      onClose();
    }
    dragX.set(0);
  };

  const instantTransition = { duration: 0 };

  const menuVariants: Variants = {
    closed: {
      x: "100%",
      transition: prefersReducedMotion
        ? instantTransition
        : { type: "spring", stiffness: 200, damping: 30, mass: 0.8 },
    },
    open: {
      x: 0,
      transition: prefersReducedMotion
        ? instantTransition
        : { type: "spring", stiffness: 200, damping: 30, mass: 0.8 },
    },
  };

  const itemVariants: Variants = {
    closed: { x: 0, opacity: prefersReducedMotion ? 1 : 0 },
    open: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: prefersReducedMotion
        ? instantTransition
        : { delay: 0.1 + i * 0.08, type: "spring" as const, stiffness: 250, damping: 25 },
    }),
  };

  const overlayVariants = {
    closed: {
      opacity: 0,
      transition: prefersReducedMotion ? instantTransition : { duration: 0.3 },
    },
    open: {
      opacity: 1,
      transition: prefersReducedMotion ? instantTransition : { duration: 0.4 },
    },
  };

  const menuContent = (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={onClose}
            className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-md md:hidden"
            aria-hidden
          />
        )}
      </AnimatePresence>

      {/* Side Menu — rechts, altijd viewport-fixed via portal */}
      <motion.nav
        variants={menuVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        drag="x"
        dragConstraints={{ left: 0, right: 320 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        style={{ x: dragX }}
        className="surface-ambient fixed right-0 top-0 z-[9999] flex h-full min-h-screen w-[86vw] max-w-sm flex-col shadow-[0_0_80px_-20px_rgba(7,40,80,0.45)] md:hidden"
        aria-label="Navigatiemenu"
      >
        {/* Close Button */}
        <motion.button
          initial={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={prefersReducedMotion ? instantTransition : { delay: 0.2 }}
          whileTap={prefersReducedMotion ? undefined : { scale: 0.9 }}
          onClick={onClose}
          className="absolute right-4 top-3 flex min-h-[44px] min-w-[44px] items-center justify-center text-neutral-900 transition-colors hover:text-brand"
          aria-label="Menu sluiten"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            aria-hidden
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </motion.button>

        <div className="flex flex-1 flex-col px-8 pb-10 pt-24">
          <ul className="space-y-1">
            {navLinks.map((item, i) => (
              <motion.li
                key={item.href}
                custom={i}
                variants={itemVariants}
                initial="closed"
                animate={isOpen ? "open" : "closed"}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={`group flex items-baseline gap-4 py-3 transition-colors ${linkClass(item.href)}`}
                >
                  <span className="w-6 text-xs font-medium tabular-nums text-neutral-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-2xl font-light uppercase tracking-tight">{item.label}</span>
                </Link>
              </motion.li>
            ))}
          </ul>

          <motion.div
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? instantTransition : { delay: 0.7, duration: 0.5 }}
            className="mt-auto"
          >
            <div className="flex gap-0">
              <Link
                href="/contact"
                onClick={onClose}
                className="flex-1 rounded-l-md rounded-r-none border border-brand bg-brand px-4 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-[var(--color-brand-hover)]"
              >
                Contact
              </Link>
              <Link
                href={webportal.href}
                onClick={onClose}
                className="flex flex-1 flex-col items-center justify-center rounded-l-none rounded-r-md border border-neutral-200 bg-white px-4 py-2 text-center text-sm text-brand transition-colors hover:bg-neutral-50"
              >
                {webportal.label}
                {!webportal.isLive && (
                  <span className="text-[10px] uppercase tracking-wider text-neutral-500">
                    {webportal.comingSoonLabel}
                  </span>
                )}
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.nav>
    </>
  );

  if (!mounted || typeof document === "undefined") return null;
  return createPortal(menuContent, document.body);
}
