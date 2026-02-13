import type { Metadata } from "next";
import { ContactPageContent } from "@/components/contact/ContactPageContent";

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
  return <ContactPageContent />;
}
