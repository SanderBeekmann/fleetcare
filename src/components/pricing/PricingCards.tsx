import { Button } from "@/components/ui/Button";
import { plans, type Plan } from "@/data/plans";

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-0.5 shrink-0 text-brand"
      aria-hidden
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  const isFeatured = plan.id === "op-maat";

  return (
    <article
      id={plan.id}
      className="flex flex-col rounded-md border border-neutral-200 bg-white px-6 pb-6 pt-5 sm:px-8 sm:pb-8 sm:pt-7 lg:row-span-5 lg:grid lg:grid-rows-subgrid"
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-xl font-semibold uppercase leading-none tracking-wide text-neutral-900">
          {plan.name}
        </h3>
        {plan.badge && (
          <span className="rounded-full bg-brand px-3 py-1 text-xs font-medium text-white">
            {plan.badge}
          </span>
        )}
      </div>
      <p className="mt-4 text-sm leading-normal text-neutral-600">{plan.description}</p>

      <div className="mt-6">
        {/* Lege prefixregel houdt de prijs op gelijke hoogte met de andere kaart */}
        <span
          className={`block text-sm text-neutral-600 ${plan.pricePrefix ? "" : "invisible"}`}
          aria-hidden={!plan.pricePrefix}
        >
          {plan.pricePrefix ?? " "}
        </span>
        <span className="block text-3xl font-bold text-neutral-900 sm:text-4xl">{plan.price}</span>
        <span className="mt-1 block text-sm text-neutral-600">{plan.priceSub}</span>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        {plan.ctas.map((cta) => (
          <Button key={cta.label} variant={cta.variant} href={cta.href} className="flex-1">
            {cta.label}
          </Button>
        ))}
      </div>

      <div className="mt-8">
        {plan.featuresIntro && (
          <p className="mb-4 text-sm font-semibold text-neutral-900">{plan.featuresIntro}</p>
        )}
        <ul className={`grid gap-3 ${isFeatured ? "sm:grid-cols-2" : ""}`}>
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3 text-sm text-neutral-700">
              <CheckIcon />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

/** Twee prijskaarten (Essentieel + Op maat), gedeeld door homepage en Oplossingen. */
export function PricingCards() {
  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_3fr] lg:gap-y-0" data-stagger="children">
      {plans.map((plan) => (
        <PlanCard key={plan.id} plan={plan} />
      ))}
    </div>
  );
}
