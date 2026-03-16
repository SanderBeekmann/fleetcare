"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Container } from "@/components/ui/Container";
import { faqs } from "@/lib/faqData";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-neutral-50 py-section">
      <Container>
        <div className="bg-white p-8 md:p-10">
          <h2
            className="text-2xl font-semibold uppercase tracking-wide text-brand md:text-3xl"
            data-letter-stagger
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
                    className="group flex min-h-[44px] w-full items-center justify-between gap-4 py-5 text-left transition-colors"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${i}`}
                    id={`faq-question-${i}`}
                  >
                    <span className="text-base font-normal text-neutral-700 transition-colors hover:text-brand group-hover:text-brand md:text-lg">
                      {faq.question}
                    </span>
                    <span
                      className={`duration-250 flex h-8 w-8 shrink-0 origin-center items-center justify-center text-brand transition-transform ease-[cubic-bezier(0.4,0,0.2,1)] ${isOpen ? "rotate-180" : ""}`}
                      aria-hidden
                    >
                      <ChevronDownIcon className="h-5 w-5" strokeWidth={2} />
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
                      <p className="pb-5 pr-6 text-base leading-relaxed text-neutral-600 sm:pr-12">
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
