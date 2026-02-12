import { Container } from "@/components/ui/Container";

const stats = [
  { value: 500, suffix: "+", label: "Actieve voertuigen" },
  { value: 98, suffix: "%", label: "Klanttevredenheid" },
  { value: 24, suffix: "/7", label: "Support beschikbaar" },
];

export function StatsSection() {
  return (
    <section className="py-section bg-white">
      <Container>
        <h2 className="sr-only">Onze cijfers</h2>
        <ul className="grid gap-10 sm:grid-cols-3">
          {stats.map((stat) => (
            <li
              key={stat.label}
              className="text-center"
              data-reveal="fade-up"
            >
              <p className="text-4xl font-bold text-brand md:text-5xl">
                <span data-counter={String(stat.value)}>0</span>
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
