import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const plans = [
  {
    name: "Standaard",
    price: "€1,49",
    period: "per voertuig per maand",
    min: "12 maanden",
    cta: "Bekijk details",
    href: "/oplossingen#standaard",
    badge: null,
    included: ["App", "Realtime tracking"],
  },
  {
    name: "Smart",
    price: "€2,99",
    period: "per voertuig per maand",
    min: "6 maanden",
    cta: "Bekijk details",
    href: "/oplossingen#smart",
    badge: "Populair",
    included: ["App", "Realtime tracking", "Webportaal", "Chat 24/7"],
  },
  {
    name: "Enterprise",
    price: "Op maat",
    period: "service op maat",
    min: "3 maanden",
    cta: "Neem contact op",
    href: "/contact",
    badge: null,
    included: ["App", "Realtime tracking", "Webportaal", "Chat 24/7", "White label", "Persoonlijk contact"],
  },
];

export function PlansOverview() {
  return (
    <section id="plannen" className="py-section bg-brand">
      <Container>
        <h2
          className="text-3xl font-bold text-white sm:text-[33px] md:text-4xl"
          data-letter-stagger
        >
          Kies het plan dat bij
          <br />
          {" "}uw organisatie past
        </h2>
        <p
          className="mt-3 max-w-2xl text-white/90"
          data-reveal="fade-up"
          data-delay="0.05"
        >
          Van eenvoudige matching en ontzorgen van plannen, tot maatwerk voor grotere operaties.
        </p>
        <div className="plans-cards-wrapper relative mt-10 bg-brand">
          {/* Schaduwlaag achter alle cards — schaduw valt altijd onder, nooit over andere cards */}
          <div
            className="plan-shadow-layer absolute inset-0 hidden grid grid-cols-1 gap-6 bg-brand md:grid-cols-3 md:items-stretch"
            aria-hidden
          >
            {plans.map((plan) => (
<div
            key={plan.name}
            className="min-h-[280px] rounded-lg bg-white shadow-plan-card transition-shadow duration-300 md:min-h-[320px]"
              />
            ))}
          </div>
          <ul
            className="relative z-10 grid gap-6 md:grid-cols-3 md:items-stretch"
            data-stagger="children"
            data-stagger-delay="0.5"
          >
            {plans.map((plan) => (
              <li key={plan.name} className="flex">
                <Card className="plan-card shadow-none relative flex min-h-[280px] flex-1 flex-col md:min-h-[320px]">
                {plan.badge && (
                  <div className="absolute right-4 top-4">
                    <Badge>{plan.badge}</Badge>
                  </div>
                )}
                <h3 className="text-xl font-weight-semibold text-brand">
                  {plan.name}
                </h3>
                <p className="mt-2 text-xl font-bold text-neutral-900 sm:text-2xl">
                  {plan.price}
                </p>
                <p className="text-sm text-neutral-500">{plan.period}</p>
                <div className="mt-6 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-neutral-600">
                    Inbegrepen
                  </p>
                  <ul className="mt-2 space-y-1.5 text-sm text-neutral-600">
                    {plan.included.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="h-1 w-1 shrink-0 rounded-full bg-brand" aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6 pt-6 -mb-2">
                  <Button variant="secondary" href={plan.href}>
                    {plan.cta}
                  </Button>
                </div>
                <p className="absolute bottom-4 right-4 text-right text-xs text-neutral-500">
                  * Minimum {plan.min}
                </p>
              </Card>
            </li>
          ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
