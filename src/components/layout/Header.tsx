"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useLayoutEffect, useRef } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { getStoreLink } from "@/lib/storeLinks";
import { registerGSAP, gsap, ScrollTrigger } from "@/lib/gsap/gsapClient";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/oplossingen", label: "Oplossingen" },
  { href: "/over", label: "Over" },
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
          if (direction === 1) applyState(false);
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
        if (direction === 1) applyState(false);
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
      {/* Desktop: grid 1fr auto 1fr zodat logo+nav centraal staan tussen gelijke flanken */}
      <div className="hidden md:grid md:w-full md:grid-cols-[1fr_auto_1fr] md:items-stretch">
        <div aria-hidden />
        <div className="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 2xl:px-12" style={{ maxWidth: "var(--container-xl, 1280px)" }}>
          <div className="flex pt-2 pb-0">
            <Link href="/" className="font-heading text-lg font-semibold text-brand">
              FleetCare Connect
            </Link>
          </div>
          <nav className="flex h-12 -mt-2 w-full items-center justify-center gap-8">
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
        </div>
        <div
          className="flex items-center justify-end pl-8"
          style={{ paddingRight: "clamp(24px, 4vw, 48px)" }}
        >
          {storeLink.disabled ? (
            <div className="flex">
              <Button variant="primary" href="/contact" className="-mr-px rounded-l-md rounded-r-none px-3 py-2 text-xs focus:ring-0 focus:ring-offset-0">
                Contact
              </Button>
              <Button variant="secondary" disabled className="rounded-r-md rounded-l-none px-3 py-2 text-xs focus:ring-0 focus:ring-offset-0">
                {storeLink.label}
              </Button>
            </div>
          ) : (
            <Button variant="secondary" href={storeLink.href}>
              {storeLink.label}
            </Button>
          )}
        </div>
      </div>

      {/* Mobile: container-based layout, ongewijzigd */}
      <Container className="md:hidden">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="font-heading text-lg font-semibold text-black md:hidden"
          >
            FleetCare Connect
          </Link>

          <nav className="hidden md:flex md:h-full md:items-center md:justify-center md:flex-1 md:gap-8">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`group relative flex md:h-full md:items-center text-xs font-medium uppercase tracking-[0.15em] ${linkClass(href)}`}
              >
                {label}
                <span
                  className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-brand transition-transform duration-200 ease-out group-hover:scale-x-100"
                  aria-hidden
                />
              </Link>
            ))}
          </nav>

          <button
            type="button"
            className="md:hidden rounded p-2 text-black hover:bg-neutral-100"
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

        {mobileOpen && (
          <nav
            className="border-t border-neutral-200 py-4 md:hidden"
          >
            <ul className="flex flex-col gap-2">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={`block py-2 ${linkClass(href)}`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                {storeLink.disabled ? (
                  <div className="flex">
                    <Button
                      variant="primary"
                      href="/contact"
                      className="-mr-px flex-1 rounded-l-md rounded-r-none focus:ring-0 focus:ring-offset-0"
                      onClick={() => setMobileOpen(false)}
                    >
                      Contact
                    </Button>
                    <Button
                      variant="secondary"
                      disabled
                      className="flex-1 rounded-r-md rounded-l-none focus:ring-0 focus:ring-offset-0"
                    >
                      {storeLink.label}
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="secondary"
                    className="w-full"
                    href={storeLink.href}
                    onClick={() => setMobileOpen(false)}
                  >
                    {storeLink.label}
                  </Button>
                )}
              </li>
            </ul>
          </nav>
        )}
      </Container>
    </header>
  );
}
