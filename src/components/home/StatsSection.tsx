import { Container } from "@/components/ui/Container";

const stats = [
  { value: 500, suffix: "+", label: "Actieve voertuigen" },
  { value: 24, suffix: "/7", label: "Support beschikbaar" },
];

export function StatsSection() {
  return (
    <section className="surface-ambient-alt relative z-[4] py-section">
      <Container>
        <h2 className="sr-only">Onze cijfers</h2>
        <ul className="grid gap-10 sm:grid-cols-2">
          {stats.map((stat) => (
            <li key={stat.label} className="text-center" data-reveal="fade-up">
              <p className="font-heading text-4xl font-bold text-brand md:text-5xl">
                <span data-counter={String(stat.value)}>{stat.value}</span>
                {stat.suffix}
              </p>
              <p className="mt-2 text-neutral-600">{stat.label}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
