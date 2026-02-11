import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Over ons",
  description: "Leer FleetCare Connect kennen.",
  openGraph: {
    title: "Over ons | FleetCare Connect",
    description: "Leer FleetCare Connect kennen.",
  },
  alternates: { canonical: "/over" },
};

export default function OverPage() {
  return (
    <Container as="section" className="py-section">
      <p className="text-neutral-600">Over — placeholder.</p>
    </Container>
  );
}
