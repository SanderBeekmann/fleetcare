import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const placeholders = [
  { name: "Logistiek", sector: "Transport", quote: "Eindelijk overzicht over al onze ritten." },
  { name: "Bouw", sector: "Bouw & infra", quote: "Onderhoud nooit meer vergeten." },
  { name: "Dienstverlening", sector: "Diensten", quote: "Eén platform voor ons hele wagenpark." },
];

export function KlantenPreview() {
  return (
    <section className="py-section bg-neutral-100">
      <Container>
        <h2
          className="text-3xl font-bold text-brand md:text-4xl"
          data-reveal="fade-up"
        >
          Wat klanten zeggen
        </h2>
        <p
          className="mt-3 max-w-2xl text-neutral-600"
          data-reveal="fade-up"
          data-delay="0.05"
        >
          Ontdek hoe andere ondernemers FleetCare Connect inzetten.
        </p>
        <ul
          className="mt-10 grid gap-6 md:grid-cols-3"
          data-stagger="children"
        >
          {placeholders.map((item) => (
            <li key={item.name}>
              <Card>
                <p className="text-sm font-medium text-neutral-500">
                  {item.sector}
                </p>
                <h3 className="mt-1 font-semibold text-brand">
                  {item.name}
                </h3>
                <p className="mt-3 text-neutral-600">&ldquo;{item.quote}&rdquo;</p>
              </Card>
            </li>
          ))}
        </ul>
        <div className="mt-10 text-center" data-reveal="fade-up">
          <Button variant="secondary" href="/klanten">
            Meer klantverhalen
          </Button>
        </div>
      </Container>
    </section>
  );
}
