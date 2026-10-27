import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import logo from "@/assets/LogoFCCtransparant.png";
import { company } from "@/lib/company";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Oplossingen", href: "/oplossingen" },
      { label: "Prijzen", href: "/oplossingen#eerlijke-prijzen" },
      { label: "Word servicepartner", href: "/oplossingen#servicepartners" },
    ],
  },
  {
    title: "Bedrijf",
    links: [
      { label: "Over ons", href: "/over" },
      { label: "Klanten", href: "/klanten" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="surface-ambient-soft relative z-40 text-neutral-700">
      <Container>
        <div
          className="grid gap-10 py-20 sm:grid-cols-2 lg:grid-cols-4"
          data-stagger="children"
          data-stagger-delay="0.06"
        >
          <div>
            <Image src={logo} alt="FleetCare Connect" height={40} className="w-auto" />
            <p className="mt-2 text-sm text-neutral-600">
              Uw partner in fleetmanagement. Eenvoudig, inzichtelijk, betrouwbaar.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-900">
                {col.title}
              </h3>
              <ul className="mt-2 sm:mt-4 sm:space-y-2">
                {col.links.map(({ href, label }) => (
                  <li key={`${col.title}-${label}`}>
                    {/* 44px tap rows on mobile, compact list from sm up */}
                    <Link
                      href={href}
                      className="inline-flex min-h-[44px] items-center text-sm text-neutral-600 hover:text-brand sm:min-h-0"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-900">
              Contact
            </h3>
            <address className="mt-4 space-y-2 text-sm not-italic text-neutral-600">
              <p>
                {company.address.street}
                <br />
                {company.address.postalCode} {company.address.city}
              </p>
              <p>
                <a
                  href={`mailto:${company.email}`}
                  className="-my-1.5 inline-block py-1.5 hover:text-brand sm:my-0 sm:py-0"
                >
                  {company.email}
                </a>
              </p>
              <ul className="space-y-3 sm:space-y-1">
                {company.contacts.map((contact) => (
                  <li key={contact.href}>
                    {contact.name}:{" "}
                    <a
                      href={contact.href}
                      className="-my-1.5 inline-block py-1.5 hover:text-brand sm:my-0 sm:py-0"
                    >
                      {contact.phone}
                    </a>
                  </li>
                ))}
              </ul>
            </address>
          </div>
        </div>
        <div
          className="flex flex-col items-center justify-between gap-6 pb-16 pt-4 sm:flex-row sm:items-center"
          data-stagger="children"
          data-stagger-delay="0.08"
        >
          <div className="flex flex-col items-center gap-1 text-center sm:items-start sm:text-left">
            <p className="text-sm text-neutral-500">
              © {new Date().getFullYear()} FleetCare Connect. Alle rechten voorbehouden.{" "}
              <Link href="/privacy" className="text-neutral-500 hover:text-brand">
                Privacy & Cookies
              </Link>
            </p>
            <p className="text-xs text-neutral-500">Alle genoemde prijzen zijn exclusief btw.</p>
            <p className="text-xs text-neutral-400">
              Created by{" "}
              <a
                href="https://blitzworx.nl"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-500 transition-colors hover:text-brand"
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
