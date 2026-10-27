"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useLayoutEffect, useRef, useEffect, useCallback } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { AnimatedMobileMenu } from "@/components/ui/AnimatedMobileMenu";
import { webportal } from "@/lib/company";
import { gsap } from "gsap";
import logo from "@/assets/LogoFCCtransparant.png";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/oplossingen", label: "Oplossingen" },
  { href: "/over", label: "Over ons" },
  { href: "/klanten", label: "Klanten" },
];

const SCROLL_TOP_THRESHOLD = 24;

const OPAQUE_CLASS = "header-frosted";
const TRANSPARENT_CLASS = "bg-transparent";
/** Scroll distance after which the header gets its frosted background. */
const OPAQUE_SCROLL_THRESHOLD = 8;

/** Transparent only at the very top of a page; frosted as soon as content scrolls under it. */
function shouldBeOpaque(scrollY: number): boolean {
  return scrollY > OPAQUE_SCROLL_THRESHOLD;
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const lastHideStateRef = useRef<"visible" | "hidden">("visible");
  const mobileOpenRef = useRef(mobileOpen);
  const prevScrollYRef = useRef(0);
  const tickingRef = useRef(false);
  const navOpaqueRef = useRef(false);
  mobileOpenRef.current = mobileOpen;

  // Escape-key + body overflow lock voor mobiel menu
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

  /** Directe DOM toggle voor opaque/transparant — geen React re-render */
  const applyOpaque = useCallback((opaque: boolean) => {
    if (navOpaqueRef.current === opaque) return;
    navOpaqueRef.current = opaque;
    const header = headerRef.current;
    if (!header) return;

    if (opaque) {
      TRANSPARENT_CLASS.split(" ").forEach((c) => header.classList.remove(c));
      OPAQUE_CLASS.split(" ").forEach((c) => header.classList.add(c));
    } else {
      OPAQUE_CLASS.split(" ").forEach((c) => header.classList.remove(c));
      TRANSPARENT_CLASS.split(" ").forEach((c) => header.classList.add(c));
    }
  }, []);

  /** GSAP show/hide — wordt alleen aangeroepen op desktop (mobiel skipt in scroll listener) */
  const applyVisibility = useCallback((visible: boolean) => {
    const header = headerRef.current;
    if (!header) return;

    if (visible && lastHideStateRef.current !== "visible") {
      lastHideStateRef.current = "visible";
      gsap.to(header, { y: 0, duration: 0.25, ease: "power2.out", overwrite: true });
    } else if (!visible && lastHideStateRef.current !== "hidden") {
      lastHideStateRef.current = "hidden";
      gsap.to(header, {
        y: -header.offsetHeight,
        duration: 0.25,
        ease: "power2.inOut",
        overwrite: true,
      });
    }
  }, []);

  // Eén geconsolideerde scroll listener met rAF-throttle
  useLayoutEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const isDesktop = () => window.matchMedia("(min-width: 768px)").matches;

    // Alleen GSAP transform instellen op desktop — voorkomt sticky + transform conflict op mobiel
    if (isDesktop()) {
      gsap.set(header, { y: 0 });
    }

    prevScrollYRef.current = window.scrollY;

    const onTick = () => {
      tickingRef.current = false;
      const scrollY = window.scrollY;

      // Mobiel: geen hide/show logica — navbar altijd zichtbaar via pure CSS sticky
      if (!isDesktop()) {
        applyOpaque(shouldBeOpaque(scrollY));
        prevScrollYRef.current = scrollY;
        return;
      }

      const direction = scrollY > prevScrollYRef.current ? 1 : -1;

      // Hide/show logica
      if (scrollY < SCROLL_TOP_THRESHOLD) {
        applyVisibility(true);
      } else if (direction === 1 && !mobileOpenRef.current) {
        applyVisibility(false);
      } else if (direction === -1) {
        applyVisibility(true);
      }

      applyOpaque(shouldBeOpaque(scrollY));

      prevScrollYRef.current = scrollY;
    };

    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(onTick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    const onResize = () => {
      if (!isDesktop()) {
        // Verwijder GSAP transform volledig zodat sticky puur via CSS werkt
        gsap.set(header, { clearProps: "y" });
        lastHideStateRef.current = "visible";
      }
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [pathname, applyVisibility, applyOpaque]);

  // Initiële opaque-state per route (direct bij mount/route change)
  useLayoutEffect(() => {
    applyOpaque(shouldBeOpaque(window.scrollY));
  }, [pathname, applyOpaque]);

  const linkClass = (href: string) => {
    const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
    return `${isActive ? "font-semibold text-brand" : "text-neutral-600 hover:text-brand"}`;
  };

  // Initial class: transparent at the top; updated via the DOM afterwards
  const opaqueStyles = TRANSPARENT_CLASS;

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 [view-transition-name:site-header] md:transition-[background-color,box-shadow] md:duration-300 ${opaqueStyles} w-full`}
    >
      {/* Desktop: logo links, nav midden, CTA's rechts */}
      <div className="hidden md:flex md:h-16 md:w-full md:items-center">
        <div
          className="flex shrink-0 items-center"
          style={{ paddingLeft: "clamp(24px, 4vw, 48px)" }}
        >
          <Link href="/" className="flex items-center">
            <Image src={logo} alt="FleetCare Connect" height={40} className="w-auto" />
            <span className="hidden font-heading text-sm font-semibold text-brand lg:inline">
              FleetCare Connect
            </span>
          </Link>
        </div>
        <nav className="flex h-16 flex-1 items-center justify-center gap-6 whitespace-nowrap lg:gap-8">
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
          <div className="flex items-stretch">
            <Button
              variant="primary"
              href="/contact"
              className="-mr-px flex h-9 items-center rounded-l-md rounded-r-none px-3 text-xs focus:ring-0 focus:ring-offset-0"
            >
              Contact
            </Button>
            <Button
              variant="secondary"
              href={webportal.href}
              className="group/btn relative flex h-9 min-w-0 items-center justify-center overflow-hidden rounded-l-none rounded-r-md px-3 text-xs focus:ring-0 focus:ring-offset-0"
            >
              <span
                className={`block truncate transition-opacity duration-200 ${webportal.isLive ? "" : "group-hover/btn:opacity-0"}`}
              >
                {webportal.label}
              </span>
              {!webportal.isLive && (
                <span
                  className="absolute inset-0 flex items-center justify-center truncate opacity-0 transition-opacity duration-200 group-hover/btn:opacity-100"
                  aria-hidden
                >
                  {webportal.comingSoonLabel}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile: hamburger + animated menu (rechts) */}
      <div className="md:hidden">
        <Container>
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center">
              <Image src={logo} alt="FleetCare Connect" height={36} className="w-auto" />
              <span className="font-heading text-sm font-semibold text-black">
                FleetCare Connect
              </span>
            </Link>

            <button
              type="button"
              className="-m-2 flex min-h-[44px] min-w-[44px] items-center justify-center rounded p-2 text-black transition-colors hover:text-brand"
              onClick={() => setMobileOpen((o) => !o)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Menu sluiten" : "Menu openen"}
            >
              {mobileOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
            </button>
          </div>
        </Container>
      </div>

      <AnimatedMobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navLinks={navLinks}
        linkClass={linkClass}
      />
    </header>
  );
}
