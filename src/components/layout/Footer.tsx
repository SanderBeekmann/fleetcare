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
    <footer className="bg-neutral-900 text-neutral-300">
      <section className="border-b border-neutral-800 bg-neutral-800/50 py-12">
        <Container>
          <h2 className="mb-6 text-lg font-semibold text-white">
            Neem contact op
          </h2>
          <div className="max-w-xl rounded-lg bg-neutral-100 p-6 shadow-md">
            <ContactForm />
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
        <div className="border-t border-neutral-800 py-6 text-center text-sm text-neutral-500">
          © {new Date().getFullYear()} FleetCare Connect. Alle rechten voorbehouden.
        </div>
      </Container>
    </footer>
  );
}
