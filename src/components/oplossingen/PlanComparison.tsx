import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { plans, featureLabels, type Plan } from "@/data/plans";

const featureKeys = Object.keys(featureLabels) as (keyof Plan["features"])[];

function FeatureValue({ value }: { value: Plan["features"][keyof Plan["features"]] }) {
  if (value === true) return <span className="text-accent" aria-label="Ja">✓</span>;
  if (value === false) return <span className="text-neutral-400" aria-label="Nee">—</span>;
  return <span>{value}</span>;
}

export function PlanComparison() {
  return (
    <>
      <div className="hidden lg:block">
        <Container>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse text-left">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="sticky left-0 z-10 min-w-[180px] bg-neutral-50 py-4 pr-4 font-semibold text-brand">
                    Plan
                  </th>
                  {plans.map((plan) => (
                    <th
                      key={plan.id}
                      className="min-w-[140px] py-4 px-4 font-semibold text-brand"
                    >
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-neutral-200 bg-neutral-50/50">
                  <td className="sticky left-0 z-10 bg-neutral-50 py-3 pr-4 font-medium text-neutral-700">
                    Prijs
                  </td>
                  {plans.map((plan) => (
                    <td key={plan.id} className="py-3 px-4">
                      <span className="font-semibold">{plan.price}</span>
                      {plan.priceSub && (
                        <span className="ml-1 text-sm text-neutral-500">
                          {plan.priceSub}
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-neutral-200">
                  <td className="sticky left-0 z-10 bg-white py-3 pr-4 font-medium text-neutral-700">
                    Minimum
                  </td>
                  {plans.map((plan) => (
                    <td key={plan.id} className="py-3 px-4">
                      {plan.minPeriod}
                    </td>
                  ))}
                </tr>
                {featureKeys.map((key) => (
                  <tr key={key} className="border-b border-neutral-200">
                    <td className="sticky left-0 z-10 bg-white py-3 pr-4 font-medium text-neutral-700">
                      {featureLabels[key]}
                    </td>
                    {plans.map((plan) => (
                      <td key={plan.id} className="py-3 px-4">
                        <FeatureValue value={plan.features[key]} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            {plans.map((plan) => (
              <Button
                key={plan.id}
                variant={plan.id === "smart" ? "primary" : "secondary"}
                href={plan.id === "enterprise" ? "/contact" : `/oplossingen#${plan.id}`}
              >
                {plan.id === "enterprise" ? "Neem contact op" : "Meer info"}
              </Button>
            ))}
          </div>
        </Container>
      </div>

      <div className="lg:hidden">
        <Container>
          <ul className="space-y-6">
            {plans.map((plan) => (
              <li key={plan.id} id={plan.id}>
                <Card className="overflow-hidden">
                  <div className="border-b border-neutral-200 bg-neutral-50 px-6 py-4">
                    <h3 className="text-xl font-semibold text-brand">
                      {plan.name}
                    </h3>
                    <p className="mt-1 font-semibold text-neutral-900">
                      {plan.price}
                      {plan.priceSub && (
                        <span className="text-sm font-normal text-neutral-500">
                          {" "}{plan.priceSub}
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-neutral-600">
                      Minimum {plan.minPeriod}
                    </p>
                  </div>
                  <ul className="divide-y divide-neutral-200 px-6 py-4">
                    {featureKeys.map((key) => (
                      <li
                        key={key}
                        className="flex justify-between py-3 text-sm"
                      >
                        <span className="text-neutral-700">
                          {featureLabels[key]}
                        </span>
                        <FeatureValue value={plan.features[key]} />
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-neutral-200 px-6 py-4">
                    <Button
                      variant={plan.id === "smart" ? "primary" : "secondary"}
                      href={plan.id === "enterprise" ? "/contact" : `/oplossingen#${plan.id}`}
                      className="w-full"
                    >
                      {plan.id === "enterprise"
                        ? "Neem contact op"
                        : "Meer info"}
                    </Button>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </>
  );
}
