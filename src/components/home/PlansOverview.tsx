import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const plans = [
  {
    name: "Standaard",
    price: "€1,49",
    period: "per voertuig per maand",
    min: "24 maanden",
    cta: "Bekijk details",
    href: "/oplossingen#standaard",
    badge: null,
  },
  {
    name: "Smart",
    price: "€2,99",
    period: "per voertuig per maand",
    min: "6 maanden",
    cta: "Bekijk details",
    href: "/oplossingen#smart",
    badge: "Populair",
  },
  {
    name: "Enterprise",
    price: "Op maat",
    period: "service op maat",
    min: "3 maanden",
    cta: "Neem contact op",
    href: "/contact",
    badge: null,
  },
];

export function PlansOverview() {
  return (
    <section className="py-section bg-brand">
      <Container>
        <h2
          className="text-3xl font-bold text-white md:text-4xl"
          data-reveal="fade-up"
        >
          Kies een plan dat bij u past
        </h2>
        <p
          className="mt-3 max-w-2xl text-white/90"
          data-reveal="fade-up"
          data-delay="0.05"
        >
          Van eenvoudig tracken tot volledig maatwerk. Transparante prijzen, geen verrassingen.
        </p>
        <ul
          className="mt-10 grid gap-6 md:grid-cols-3"
          data-stagger="children"
        >
          {plans.map((plan) => (
            <li key={plan.name}>
              <Card className="flex h-full flex-col">
                {plan.badge && (
                  <div className="mb-4">
                    <Badge>{plan.badge}</Badge>
                  </div>
                )}
                <h3 className="text-xl font-semibold text-brand">
                  {plan.name}
                </h3>
                <p className="mt-2 text-2xl font-bold text-neutral-900">
                  {plan.price}
                </p>
                <p className="text-sm text-neutral-500">{plan.period}</p>
                <p className="mt-2 text-sm text-neutral-600">
                  Minimum {plan.min}
                </p>
                <div className="mt-auto pt-6">
                  <Button variant="secondary" href={plan.href}>
                    {plan.cta}
                  </Button>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
