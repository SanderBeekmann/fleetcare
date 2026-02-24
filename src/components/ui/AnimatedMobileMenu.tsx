"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, type Variants } from "framer-motion";
import { X, Home, Info, Briefcase, Users, Mail } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type NavLink = { href: string; label: string };
type StoreLink = {
  href: string;
  label: string;
  disabled?: boolean;
  hoverLabel?: string;
};

const iconMap: Record<string, LucideIcon> = {
  "/": Home,
  "/oplossingen": Briefcase,
  "/over": Info,
  "/klanten": Users,
  "/contact": Mail,
};

type AnimatedMobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  navLinks: NavLink[];
  storeLink: StoreLink;
  linkClass: (href: string) => string;
};

export function AnimatedMobileMenu({
  isOpen,
  onClose,
  navLinks,
  storeLink,
  linkClass,
}: AnimatedMobileMenuProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const dragX = useMotionValue(0);

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    if (info.offset.x > 100) {
      onClose();
    }
    dragX.set(0);
  };

  const menuVariants: Variants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 30,
        mass: 0.8,
      },
    },
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 30,
        mass: 0.8,
      },
    },
  };

  const itemVariants: Variants = {
    closed: { x: 50, opacity: 0 },
    open: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: 0.1 + i * 0.08,
        type: "spring" as const,
        stiffness: 250,
        damping: 25,
      },
    }),
  };

  const overlayVariants = {
    closed: {
      opacity: 0,
      transition: { duration: 0.3 },
    },
    open: {
      opacity: 1,
      transition: { duration: 0.4 },
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
        className="fixed top-0 right-0 z-[9999] h-full min-h-screen w-80 bg-white shadow-2xl md:hidden"
        aria-label="Navigatiemenu"
      >
        {/* Close Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="absolute right-12 top-6 rounded-lg bg-neutral-100 p-2 text-neutral-900 transition-colors hover:bg-neutral-200"
          aria-label="Menu sluiten"
        >
          <X size={24} />
        </motion.button>

        <div className="p-8 pt-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-brand">Navigatie</h2>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 80 }}
              transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
              className="mt-2 h-1 rounded bg-brand"
            />
          </motion.div>

          <ul className="space-y-4">
            {navLinks.map((item, i) => {
              const Icon = iconMap[item.href] ?? Info;
              return (
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
                    className={`flex items-center gap-4 rounded-lg p-4 transition-all hover:bg-neutral-100 group ${linkClass(item.href)}`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 8 }}
                      whileTap={{ scale: 0.95 }}
                      className="rounded-lg bg-neutral-200 p-2 transition-colors duration-300 group-hover:bg-brand group-hover:text-white"
                    >
                      <Icon size={24} />
                    </motion.div>
                    <span className="text-lg font-medium">{item.label}</span>
                  </Link>
                </motion.li>
              );
            })}
          </ul>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mt-12 rounded-lg bg-neutral-100 p-4"
          >
            {storeLink.disabled ? (
              <div className="flex gap-0">
                <Link
                  href="/contact"
                  onClick={onClose}
                  className="flex-1 rounded-l-md rounded-r-none border border-brand bg-brand px-4 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-[var(--color-brand-hover)]"
                >
                  Contact
                </Link>
                <span
                  className="flex flex-1 items-center justify-center rounded-r-md rounded-l-none border border-neutral-200 bg-white px-4 py-3 text-center text-sm text-neutral-600"
                  title={storeLink.hoverLabel}
                >
                  {storeLink.label}
                </span>
              </div>
            ) : (
              <Link
                href={storeLink.href}
                onClick={onClose}
                className="flex items-center justify-center gap-2 rounded-md border border-brand bg-white px-4 py-3 text-center text-sm font-medium text-brand transition-colors hover:bg-neutral-50"
              >
                {storeLink.label}
              </Link>
            )}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-4 text-center text-xs text-neutral-500"
          >
            Sleep naar rechts om te sluiten
          </motion.p>
        </div>
      </motion.nav>
    </>
  );

  if (!mounted || typeof document === "undefined") return null;
  return createPortal(menuContent, document.body);
}
