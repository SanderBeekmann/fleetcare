import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { InfoTooltip } from "@/components/ui/InfoTooltip";
import { plans, featureLabels, featureTooltips, type Plan } from "@/data/plans";

const featureOrder: (keyof Plan["features"])[] = [
  "app",
  "realtimeTracking",
  "webPortal",
  "chat24_7",
  "whiteLabel",
  "personalContact",
];

function getCTAText(plan: Plan): string {
  if (plan.id === "enterprise") return "Neem contact op";
  return `Ga voor ${plan.name}`;
}

export function PlanComparison() {
  return (
    <Container>
      <div className="grid gap-6 overflow-visible sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => {
          const isHighlighted = plan.id === "smart";
          const enabledFeatures = featureOrder.filter(
            (key) => plan.features[key] === true
          );

          return (
            <article
              key={plan.id}
              id={plan.id}
              className={`relative flex flex-col overflow-visible border border-neutral-200 p-6 pb-16 shadow-sm transition-shadow hover:shadow-md ${isHighlighted ? "bg-[color-mix(in_srgb,var(--color-brand)_10%,white)]" : "bg-white"}`}
            >
              {plan.badge && (
                <div className="absolute right-4 top-4">
                  <Badge>{plan.badge}</Badge>
                </div>
              )}

              <div
                className="flex flex-col"
                data-stagger="children"
                data-stagger-delay="0.14"
                data-stagger-duration="0.6"
              >
                <h3 className="text-2xl font-weight-semibold text-neutral-900">
                  {plan.name}
                </h3>
                <p className="mt-2 text-base text-neutral-600">
                  {plan.description}
                </p>

                <div className={plan.id === "standaard" ? "mt-10" : "mt-4"}>
                  <span className="block text-2xl font-bold text-neutral-900 sm:text-3xl">
                    {plan.price}
                  </span>
                  {plan.priceSub && (
                    <span className="mt-0.5 block text-base font-normal leading-tight text-neutral-500">
                      {plan.priceSub}
                    </span>
                  )}
                </div>

                <Button
                  variant={isHighlighted ? "primary" : "secondary"}
                  href={
                    plan.id === "enterprise"
                      ? "/contact"
                      : `/oplossingen#${plan.id}`
                  }
                  className="mt-6 w-full"
                >
                  {getCTAText(plan)}
                </Button>

                <div className="mt-6 overflow-visible border-t border-neutral-100 pt-6">
                  {plan.id !== "standaard" && (
                    <p className="font-semibold text-neutral-900">
                      {plan.id === "smart"
                        ? "Alles in Standaard +"
                        : plan.id === "enterprise"
                          ? "Alles in Smart +"
                          : `Alles in ${plan.name} +`}
                    </p>
                  )}
                  <ul className="mt-4 space-y-4">
                    {enabledFeatures.map((key) => (
                      <li
                        key={key}
                        className="flex items-center gap-2 text-base text-neutral-700"
                      >
                        <span className="shrink-0 text-brand" aria-hidden>
                          ✓
                        </span>
                        <span className="min-w-0 flex-1">{featureLabels[key]}</span>
                        <InfoTooltip text={featureTooltips[key]} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </Container>
  );
}
