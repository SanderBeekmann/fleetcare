import { Container } from "@/components/ui/Container";

const faqs = [
  {
    question: "Kan ik mijn bestaande voertuigen eenvoudig koppelen?",
    answer: "Ja. Via de app of het portaal koppelt u voertuigen aan uw account. Onze handleiding en support helpen u op weg.",
  },
  {
    question: "Wat gebeurt er na het einde van mijn contract?",
    answer: "Uw data blijft van u. U kunt uw gegevens exporteren en wij ondersteunen een soepele overgang indien u overstapt.",
  },
  {
    question: "Is er een proefperiode?",
    answer: "Voor het Smart en Enterprise plan bieden we op aanvraag een proefperiode aan. Neem contact met ons op voor de mogelijkheden.",
  },
  {
    question: "Werkt de app ook offline?",
    answer: "De app slaat gegevens lokaal op en synchroniseert zodra er weer verbinding is. Realtime tracking vereist een actieve verbinding.",
  },
  {
    question: "Hoe zit het met privacy en beveiliging?",
    answer: "Uw data wordt veilig en conform AVG verwerkt. We slaan gegevens versleuteld op en bieden alleen toegang aan geautoriseerde gebruikers.",
  },
  {
    question: "Kunnen we het plan later wijzigen?",
    answer: "Ja. U kunt binnen uw contract overstappen naar een hoger plan. Wijzigingen naar een lager plan zijn mogelijk bij verlenging.",
  },
];

export function FaqSection() {
  return (
    <section className="py-section bg-neutral-100">
      <Container>
        <h2
          className="text-3xl font-bold text-neutral-900 md:text-4xl"
          data-reveal="fade-up"
        >
          Veelgestelde vragen
        </h2>
        <ul className="mt-10 space-y-6" data-stagger="children">
          {faqs.map((faq, i) => (
            <li
              key={i}
              className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm"
            >
              <h3 className="font-semibold text-neutral-900">
                {faq.question}
              </h3>
              <p className="mt-2 text-neutral-600">{faq.answer}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
