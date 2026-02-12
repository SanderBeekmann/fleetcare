"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useLayoutEffect } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { getStoreLink } from "@/lib/storeLinks";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/oplossingen", label: "Oplossingen" },
  { href: "/over", label: "Over" },
  { href: "/klanten", label: "Klanten" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navOpaque, setNavOpaque] = useState(false);
  const pathname = usePathname();
  const storeLink = getStoreLink();

  useLayoutEffect(() => {
    if (pathname !== "/") {
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
    return `text-black hover:text-brand ${isActive ? "font-semibold text-brand" : ""}`;
  };

  const headerClass = navOpaque
    ? "sticky top-0 z-50 border-b border-neutral-200 bg-white/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/80 transition-[background-color,border-color,box-shadow] duration-300"
    : "sticky top-0 z-50 border-b border-transparent bg-transparent shadow-none backdrop-blur-none transition-[background-color,border-color,box-shadow] duration-300";

  return (
    <header className={headerClass}>
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="text-lg font-semibold text-black"
          >
            FleetCare Connect
          </Link>

          <nav className="hidden md:flex md:items-center md:gap-8">
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href} className={linkClass(href)}>
                {label}
              </Link>
            ))}
            {storeLink.disabled ? (
              <Button variant="primary" disabled>
                {storeLink.label}
              </Button>
            ) : (
              <Button variant="primary" href={storeLink.href}>
                {storeLink.label}
              </Button>
            )}
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
                  <Button variant="primary" className="w-full" disabled>
                    {storeLink.label}
                  </Button>
                ) : (
                  <Button
                    variant="primary"
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
