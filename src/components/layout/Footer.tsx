import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/forms/ContactForm";

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
    <footer className="relative z-40 bg-brand text-white/90">
      <section className="border-b border-white/20 bg-brand-hover/50 py-12">
        <Container>
          <h2 className="mb-6 text-lg font-semibold text-white">
            Neem contact op
          </h2>
          <div className="max-w-xl">
            <ContactForm variant="onDark" />
          </div>
        </Container>
      </section>
      <Container>
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-lg font-semibold text-white">
              FleetCare Connect
            </p>
            <p className="mt-2 text-sm">
              Uw partner in fleetmanagement. Eenvoudig, inzichtelijk, betrouwbaar.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {col.links.map(({ href, label }) => (
                  <li key={`${col.title}-${label}`}>
                    <Link href={href} className="text-sm hover:text-white">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/20 py-6 text-center text-sm text-white/80">
          © {new Date().getFullYear()} FleetCare Connect. Alle rechten voorbehouden.
        </div>
      </Container>
    </footer>
  );
}
