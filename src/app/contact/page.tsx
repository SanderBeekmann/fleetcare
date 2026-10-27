import type { Metadata } from "next";
import { ContactPageContent } from "@/components/contact/ContactPageContent";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Neem contact op met FleetCare Connect of vraag een vrijblijvende demo aan. Wij laten zien hoe u de aftersales van uw LEV-vloot eenvoudig en centraal regelt.",
  openGraph: {
    title: "Contact | FleetCare Connect",
    description:
      "Neem contact op met FleetCare Connect of vraag een vrijblijvende demo aan. Wij laten zien hoe u de aftersales van uw LEV-vloot eenvoudig en centraal regelt.",
  },
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact" },
        ]}
      />
      <ContactPageContent />
    </>
  );
}
