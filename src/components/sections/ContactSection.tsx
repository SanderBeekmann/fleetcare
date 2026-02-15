import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/forms/ContactForm";

type ContactSectionProps = {
  variant?: "default" | "onDark";
  id?: string;
};

const contactDetails = [
  {
    label: "E-mail",
    value: "info@fleetcareconnect.nl",
    href: "mailto:info@fleetcareconnect.nl",
  },
  {
    label: "Telefoon",
    value: "+31 (0)20 123 4567",
    href: "tel:+31201234567",
  },
  {
    label: "Adres",
    value: "Amsterdam, Nederland",
    href: "https://maps.google.com/?q=Amsterdam+Nederland",
  },
];

export function ContactSection({ variant = "default", id }: ContactSectionProps) {
  const isOnDark = variant === "onDark";
  const sectionClass = isOnDark
    ? "border-t border-white/20 bg-brand py-section text-white"
    : "border-t border-neutral-200 bg-white py-section";
  const textMuted = isOnDark ? "text-white/80" : "text-neutral-600";

  return (
    <section id={id} className={sectionClass}>
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-start">
          <div>
            <h2
              className={`text-2xl font-bold md:text-3xl ${isOnDark ? "text-white" : "text-brand"}`}
              data-letter-stagger
            >
              Neem contact op
            </h2>
            <div className="mt-8">
              <ContactForm variant={isOnDark ? "onDark" : "default"} />
            </div>
          </div>
          <div>
            <h3 className={`text-base font-bold uppercase tracking-wider ${isOnDark ? "text-white" : "text-brand"}`}>
              Contactgegevens
            </h3>
            <ul className="mt-4 space-y-4">
              {contactDetails.map(({ label, value, href }) => (
                <li key={label}>
                  <span className={`block text-sm ${textMuted}`}>{label}</span>
                  <Link
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className={`group relative inline-block cursor-pointer pb-0.5 ${isOnDark ? "text-white" : "text-neutral-900"}`}
                  >
                    {value}
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 transition-transform duration-200 ease-out group-hover:scale-x-100 ${isOnDark ? "bg-white" : "bg-brand"}`}
                      aria-hidden
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
