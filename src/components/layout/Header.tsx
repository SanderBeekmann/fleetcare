"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useLayoutEffect, useRef, useEffect } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { AnimatedMobileMenu } from "@/components/ui/AnimatedMobileMenu";
import { getStoreLink } from "@/lib/storeLinks";
import { registerGSAP, gsap, ScrollTrigger } from "@/lib/gsap/gsapClient";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/oplossingen", label: "Oplossingen" },
  { href: "/over", label: "Over ons" },
  { href: "/klanten", label: "Klanten" },
];

const SCROLL_TOP_THRESHOLD = 24;

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navOpaque, setNavOpaque] = useState(false);
  const pathname = usePathname();
  const storeLink = getStoreLink();
  const headerRef = useRef<HTMLElement>(null);
  const lastHideStateRef = useRef<"visible" | "hidden">("visible");
  const mobileOpenRef = useRef(mobileOpen);
  mobileOpenRef.current = mobileOpen;

  useEffect(() => {
    if (!mobileOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useLayoutEffect(() => {
    registerGSAP();
    const header = headerRef.current;
    if (!header) return;

    const applyState = (visible: boolean) => {
      if (visible) {
        if (lastHideStateRef.current !== "visible") {
          lastHideStateRef.current = "visible";
          gsap.to(header, {
            y: 0,
            duration: 0.25,
            ease: "power2.out",
            overwrite: true,
          });
        }
      } else {
        if (lastHideStateRef.current !== "hidden") {
          lastHideStateRef.current = "hidden";
          gsap.to(header, {
            y: -header.offsetHeight,
            duration: 0.25,
            ease: "power2.inOut",
            overwrite: true,
          });
        }
      }
    };

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        onUpdate(self) {
          const scrollY = self.scroll();
          const direction = self.direction;

          if (scrollY < SCROLL_TOP_THRESHOLD) {
            applyState(true);
            return;
          }
          if (direction === 1 && !mobileOpenRef.current) applyState(false);
          else if (direction === -1) applyState(true);
        },
      });

      gsap.set(header, { y: 0 });
      ScrollTrigger.refresh();
    }, header);

    // Fallback: scroll listener voor wanneer ScrollTrigger niet vuurt (bijv. fixed hero-layout)
    let prevScrollY = typeof window !== "undefined" ? window.scrollY : 0;
    const onScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY < SCROLL_TOP_THRESHOLD) {
        applyState(true);
      } else {
        const direction = scrollY > prevScrollY ? 1 : -1;
        if (direction === 1 && !mobileOpenRef.current) applyState(false);
        else applyState(true);
      }
      prevScrollY = scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      ctx.revert();
    };
  }, []);

  useLayoutEffect(() => {
    if (pathname !== "/" && pathname !== "/oplossingen") {
      setNavOpaque(true);
      return;
    }
    if (pathname === "/oplossingen") {
      setNavOpaque(true);
      return;
    }
    const watWeDoen = document.getElementById("wat-we-doen");
    const update = () => {
      if (!watWeDoen) {
        setNavOpaque(window.scrollY > 20);
        return;
      }
      const top = watWeDoen.getBoundingClientRect().top;
      setNavOpaque(top <= 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [pathname]);

  const linkClass = (href: string) => {
    const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
    return `${isActive ? "font-semibold text-brand" : "text-neutral-600 hover:text-brand"}`;
  };

  const headerClass = navOpaque
    ? "sticky top-0 z-50 border-b border-neutral-200 bg-white shadow-sm backdrop-blur transition-[background-color,border-color,box-shadow] duration-300"
    : "sticky top-0 z-50 border-b border-transparent bg-transparent shadow-none backdrop-blur-none transition-[background-color,border-color,box-shadow] duration-300";

  return (
    <header ref={headerRef} className={`${headerClass} w-full`}>
      {/* Desktop: logo links, nav midden, CTA's rechts */}
      <div className="hidden md:flex md:h-16 md:w-full md:items-center">
        <div
          className="flex shrink-0 items-center"
          style={{ paddingLeft: "clamp(24px, 4vw, 48px)" }}
        >
          <Link href="/" className="font-heading text-lg font-semibold text-brand">
            FleetCare Connect
          </Link>
        </div>
        <nav className="flex h-16 flex-1 items-center justify-center gap-8">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`group relative flex h-full items-center text-xs font-medium uppercase tracking-[0.15em] ${linkClass(href)}`}
            >
              {label}
              <span
                className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-brand transition-transform duration-200 ease-out group-hover:scale-x-100"
                aria-hidden
              />
            </Link>
          ))}
        </nav>
        <div
          className="flex shrink-0 items-center"
          style={{ paddingRight: "clamp(24px, 4vw, 48px)" }}
        >
          {storeLink.disabled ? (
            <div className="flex items-stretch">
              <Button variant="primary" href="/contact" className="-mr-px flex h-9 items-center rounded-l-md rounded-r-none px-3 text-xs focus:ring-0 focus:ring-offset-0">
                Contact
              </Button>
              <Button variant="secondary" disabled className="group/btn relative flex h-9 min-w-0 items-center justify-center overflow-hidden rounded-r-md rounded-l-none px-3 text-xs focus:ring-0 focus:ring-offset-0">
                <span className="block truncate transition-opacity duration-200 group-hover/btn:opacity-0">
                  {storeLink.label}
                </span>
                {storeLink.hoverLabel && (
                  <span className="absolute inset-0 flex items-center justify-center truncate opacity-0 transition-opacity duration-200 group-hover/btn:opacity-100">
                    {storeLink.hoverLabel}
                  </span>
                )}
              </Button>
            </div>
          ) : (
            <Button variant="secondary" href={storeLink.href}>
              {storeLink.label}
            </Button>
          )}
        </div>
      </div>

      {/* Mobile: hamburger + animated menu (rechts) */}
      <div className="md:hidden">
        <Container>
          <div className="flex h-16 items-center justify-between">
            <Link
              href="/"
              className="font-heading text-lg font-semibold text-black"
            >
              FleetCare Connect
            </Link>

            <button
              type="button"
              className="rounded p-2 text-black hover:bg-neutral-100"
              onClick={() => setMobileOpen((o) => !o)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Menu sluiten" : "Menu openen"}
            >
              {mobileOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </Container>
      </div>

      <AnimatedMobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navLinks={navLinks}
        storeLink={storeLink}
        linkClass={linkClass}
      />
    </header>
  );
}
