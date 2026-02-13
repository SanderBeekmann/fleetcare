import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { plans, featureLabels, featureTooltips, type Plan } from "@/data/plans";

const featureKeys = Object.keys(featureLabels) as (keyof Plan["features"])[];

function getCTAText(plan: Plan): string {
  if (plan.id === "enterprise") return "Neem contact op";
  return `Ga voor ${plan.name}`;
}

export function PlanComparison() {
  return (
    <Container>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => {
          const isHighlighted = plan.id === "smart";
          const enabledFeatures = featureKeys.filter(
            (key) => plan.features[key] === true
          );

          return (
            <article
              key={plan.id}
              id={plan.id}
              className={`relative flex flex-col border border-neutral-200 p-6 pb-16 shadow-sm transition-shadow hover:shadow-md ${isHighlighted ? "bg-[color-mix(in_srgb,var(--color-brand)_10%,white)]" : "bg-white"}`}
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

                <div className="mt-4">
                  <span className="block text-3xl font-bold text-neutral-900">
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
                  <p className="font-semibold text-neutral-900">
                    Alles in {plan.name} +
                  </p>
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
                        <span
                          className="group relative flex shrink-0 cursor-help text-neutral-400 transition-colors hover:text-brand"
                          aria-label={featureTooltips[key]}
                        >
                          <InformationCircleIcon className="h-4 w-4" />
                          <span className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-1.5 -translate-x-1/2 whitespace-nowrap rounded bg-neutral-900 px-2.5 py-1.5 text-xs font-normal text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100">
                            {featureTooltips[key]}
                            <span className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 border-4 border-transparent border-t-neutral-900" />
                          </span>
                        </span>
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
