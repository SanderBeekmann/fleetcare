import { Container } from "@/components/ui/Container";

const steps = [
  {
    step: 1,
    title: "Kies uw plan",
    text: "Selecteer Standaard, Smart of Enterprise op basis van uw wensen en vlootgrootte.",
  },
  {
    step: 2,
    title: "Account en installatie",
    text: "Wij zetten uw account in en begeleiden de koppeling met uw voertuigen.",
  },
  {
    step: 3,
    title: "Direct aan de slag",
    text: "Log in op de app of het portaal en begin met beheren en monitoren.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-section bg-neutral-100">
      <Container>
        <h2
          className="text-3xl font-bold text-brand md:text-4xl"
          data-reveal="fade-up"
        >
          Hoe het werkt
        </h2>
        <p
          className="mt-3 max-w-2xl text-neutral-600"
          data-reveal="fade-up"
          data-delay="0.05"
        >
          In drie stappen naar een beter beheerd wagenpark.
        </p>
        <ol
          className="mt-10 grid gap-8 md:grid-cols-3"
          data-stagger="children"
        >
          {steps.map((item) => (
            <li key={item.step} className="relative">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-accent bg-white text-lg font-bold text-accent"
                style={{ borderRadius: "var(--radius-full)" }}
              >
                {item.step}
              </div>
              <h3 className="mt-4 text-xl font-semibold text-brand">
                {item.title}
              </h3>
              <p className="mt-2 text-neutral-600">{item.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
