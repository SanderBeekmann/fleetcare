import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Klanten",
  description: "Klanten en cases van FleetCare Connect.",
  openGraph: {
    title: "Klanten | FleetCare Connect",
    description: "Klanten en cases van FleetCare Connect.",
  },
  alternates: { canonical: "/klanten" },
};

export default function KlantenPage() {
  return (
    <Container as="section" className="py-section">
      <p className="text-neutral-600">Klanten — placeholder.</p>
    </Container>
  );
}
