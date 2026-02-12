"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Container } from "@/components/ui/Container";

const faqs = [
  {
    question: "Kan ik mijn bestaande voertuigen eenvoudig koppelen?",
    answer:
      "Ja. Via de app of het portaal koppelt u voertuigen aan uw account. Onze handleiding en support helpen u op weg.",
  },
  {
    question: "Wat gebeurt er na het einde van mijn contract?",
    answer:
      "Uw data blijft van u. U kunt uw gegevens exporteren en wij ondersteunen een soepele overgang indien u overstapt.",
  },
  {
    question: "Is er een proefperiode?",
    answer:
      "Voor het Smart en Enterprise plan bieden we op aanvraag een proefperiode aan. Neem contact met ons op voor de mogelijkheden.",
  },
  {
    question: "Werkt de app ook offline?",
    answer:
      "De app slaat gegevens lokaal op en synchroniseert zodra er weer verbinding is. Realtime tracking vereist een actieve verbinding.",
  },
  {
    question: "Hoe zit het met privacy en beveiliging?",
    answer:
      "Uw data wordt veilig en conform AVG verwerkt. We slaan gegevens versleuteld op en bieden alleen toegang aan geautoriseerde gebruikers.",
  },
  {
    question: "Kunnen we het plan later wijzigen?",
    answer:
      "Ja. U kunt binnen uw contract overstappen naar een hoger plan. Wijzigingen naar een lager plan zijn mogelijk bij verlenging.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-section bg-neutral-50">
      <Container>
        <div className="bg-white p-8 md:p-10">
          <h2
            className="text-2xl font-semibold uppercase tracking-wide text-brand md:text-3xl"
            data-reveal="fade-up"
          >
            Veelgestelde vragen
          </h2>
          <ul
            className="mt-12 divide-y divide-neutral-200"
          data-stagger="children"
          data-stagger-delay="0.08"
        >
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="group flex w-full items-center justify-between gap-4 py-5 text-left transition-colors"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                  id={`faq-question-${i}`}
                >
                  <span className="text-base font-normal text-neutral-700 transition-colors hover:text-brand md:text-lg group-hover:text-brand">
                    {faq.question}
                  </span>
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center text-brand transition-transform duration-300 ease-out"
                    aria-hidden
                  >
                    <ChevronDownIcon
                      className={`h-5 w-5 ${isOpen ? "rotate-180" : ""}`}
                      strokeWidth={2}
                    />
                  </span>
                </button>
                <div
                  id={`faq-answer-${i}`}
                  role="region"
                  aria-labelledby={`faq-question-${i}`}
                  className="grid transition-[grid-template-rows] duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="min-h-0 overflow-hidden">
                    <p className="pb-5 pr-12 text-base leading-relaxed text-neutral-600">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        </div>
      </Container>
    </section>
  );
}
