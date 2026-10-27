"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/forms/ContactForm";
import { ContactDetails } from "@/components/contact/ContactDetails";

const TABS = [
  { id: "demo", label: "1. Demo aanvragen" },
  { id: "vraag", label: "2. Vraag" },
] as const;

export function ContactPageContent() {
  const [activeTab, setActiveTab] = useState<"vraag" | "demo">("demo");

  return (
    <>
      <section className="surface-ambient-soft -mt-16 flex min-h-[35vh] flex-col pt-32 md:pt-36">
        <Container className="flex flex-1 flex-col">
          <div className="mx-auto flex max-w-2xl flex-1 flex-col text-center">
            <h1
              data-intro-item
              className="text-3xl font-bold text-brand sm:text-[34px] md:text-4xl lg:text-5xl"
            >
              Contact
            </h1>
            <p data-intro-item className="mt-4 text-lg text-neutral-600">
              Heeft u een vraag of wilt u een demo? Laat uw gegevens achter en wij nemen zo snel
              mogelijk contact met u op.
            </p>
            <div className="relative mt-auto flex justify-center gap-4 pt-10 sm:gap-8">
              {TABS.map(({ id, label }) => {
                const isActive = activeTab === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setActiveTab(id)}
                    className={`group relative pb-4 pt-1 text-sm font-medium uppercase tracking-[0.15em] transition-colors duration-200 ${
                      isActive ? "text-brand" : "text-neutral-400 hover:text-neutral-600"
                    }`}
                  >
                    {label}
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 w-full origin-left bg-brand transition-transform duration-200 ease-out ${
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                      aria-hidden
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      <section className="surface-ambient py-section">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
            <div>
              {activeTab === "vraag" && (
                <div className="contact-tab-content">
                  <h2 className="text-2xl font-bold text-brand md:text-3xl">Neem contact op</h2>
                  <div className="mt-8">
                    <ContactForm variant="default" />
                  </div>
                </div>
              )}
              {activeTab === "demo" && (
                <div className="contact-tab-content">
                  <h2 className="text-2xl font-bold text-brand md:text-3xl">Demo aanvragen</h2>
                  <p className="mt-4 max-w-lg text-neutral-600">
                    Plan een vrijblijvende demo in en ontdek hoe FleetCare Connect uw
                    wagenparkbeheer kan verbeteren.
                  </p>
                  <div className="mt-8">
                    <ContactForm variant="default" />
                  </div>
                </div>
              )}
            </div>
            <div>
              <ContactDetails />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
