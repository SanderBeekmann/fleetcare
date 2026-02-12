import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Neem contact op met FleetCare Connect. Wij helpen u graag verder.",
  openGraph: {
    title: "Contact | FleetCare Connect",
    description: "Neem contact op met FleetCare Connect. Wij helpen u graag verder.",
  },
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="py-section">
      <Container>
        <h1
          className="text-3xl font-bold text-brand md:text-4xl"
          data-reveal="fade-up"
        >
          Contact
        </h1>
        <p
          className="mt-3 max-w-2xl text-neutral-600"
          data-reveal="fade-up"
          data-delay="0.05"
        >
          Heeft u een vraag of wilt u een demo? Laat uw gegevens achter en wij nemen zo snel mogelijk contact met u op.
        </p>
        <div className="mt-10">
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
