import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ContactSection } from "@/components/sections/ContactSection";

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
    <>
      <section className="border-b border-neutral-200 bg-white py-16 md:py-20">
        <Container>
          <h1
            className="text-3xl font-bold text-brand md:text-4xl lg:text-5xl"
            data-reveal="fade-up"
          >
            Contact
          </h1>
          <p
            className="mt-4 max-w-2xl text-lg text-neutral-600"
            data-reveal="fade-up"
            data-delay="0.05"
          >
            Heeft u een vraag of wilt u een demo? Laat uw gegevens achter en wij nemen zo snel mogelijk contact met u op.
          </p>
        </Container>
      </section>
      <ContactSection />
    </>
  );
}
