import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Oplossingen", href: "/oplossingen" },
      { label: "Bekijk oplossingen", href: "/oplossingen" },
    ],
  },
  {
    title: "Bedrijf",
    links: [
      { label: "Over ons", href: "/over" },
      { label: "Klanten", href: "/klanten" },
    ],
  },
  {
    title: "Contact",
    links: [{ label: "Contact", href: "/contact" }],
  },
];

export function Footer() {
  return (
    <footer className="relative z-40 bg-white text-neutral-700">
      <Container>
        <div className="grid gap-10 py-20 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-lg font-semibold text-neutral-900">
              FleetCare Connect
            </p>
            <p className="mt-2 text-sm text-neutral-600">
              Uw partner in fleetmanagement. Eenvoudig, inzichtelijk, betrouwbaar.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-900">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {col.links.map(({ href, label }) => (
                  <li key={`${col.title}-${label}`}>
                    <Link href={href} className="text-sm text-neutral-600 hover:text-brand">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center justify-between gap-6 border-t border-neutral-200 py-16 sm:flex-row sm:items-center">
          <div className="flex flex-col items-center gap-1 text-center sm:items-start sm:text-left">
            <p className="text-sm text-neutral-500">
              © {new Date().getFullYear()} FleetCare Connect. Alle rechten voorbehouden.
              {" "}
              <Link href="/privacy" className="text-neutral-500 hover:text-brand">
                Privacy & Cookies
              </Link>
            </p>
            <p className="text-xs text-neutral-400">
              Created by{" "}
              <a
                href="https://blitzworx.nl"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-500 hover:text-brand transition-colors"
              >
                BLITZWORX
              </a>
            </p>
          </div>
          <Button variant="secondary" href="/contact">
            Neem contact op
          </Button>
        </div>
      </Container>
    </footer>
  );
}
