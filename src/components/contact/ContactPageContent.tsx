"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/forms/ContactForm";

const TABS = [
  { id: "demo", label: "1. Demo aanvragen" },
  { id: "vraag", label: "2. Vraag" },
] as const;

const contactDetails = [
  { label: "E-mail", value: "info@fleetcareconnect.nl", href: "mailto:info@fleetcareconnect.nl" },
  { label: "Telefoon", value: "+31 (0)20 123 4567", href: "tel:+31201234567" },
  { label: "Adres", value: "Amsterdam, Nederland", href: "https://maps.google.com/?q=Amsterdam+Nederland" },
];

export function ContactPageContent() {
  const [activeTab, setActiveTab] = useState<"vraag" | "demo">("demo");

  return (
    <>
      <section className="flex min-h-[35vh] flex-col bg-neutral-100 pt-16 md:pt-20">
        <Container className="flex flex-1 flex-col">
          <div className="mx-auto flex max-w-2xl flex-1 flex-col text-center">
            <h1
              className="text-3xl font-bold text-brand md:text-4xl lg:text-5xl"
              data-letter-stagger
            >
              Contact
            </h1>
            <p
              className="mt-4 text-lg text-neutral-600"
              data-reveal="fade-up"
              data-delay="0.05"
            >
              Heeft u een vraag of wilt u een demo? Laat uw gegevens achter en wij nemen zo snel mogelijk contact met u op.
            </p>
            <div className="relative mt-auto flex justify-center gap-8 border-b border-neutral-200 pt-10">
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

      <section className="border-t border-neutral-200 bg-white py-section">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-start">
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
                    Plan een vrijblijvende demo in en ontdek hoe FleetCare Connect uw wagenparkbeheer kan verbeteren.
                  </p>
                  <div className="mt-8">
                    <ContactForm variant="default" />
                  </div>
                </div>
              )}
            </div>
            <div>
              {activeTab === "vraag" && (
                <div className="contact-tab-content">
                  <h3 className="text-base font-bold uppercase tracking-wider text-brand">
                    Contactgegevens
                  </h3>
                  <ul className="mt-4 space-y-4">
                    {contactDetails.map(({ label, value, href }) => (
                      <li key={label}>
                        <span className="block text-sm text-neutral-600">{label}</span>
                        <Link
                          href={href}
                          target={href.startsWith("http") ? "_blank" : undefined}
                          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="group relative inline-block cursor-pointer pb-0.5 text-neutral-900"
                        >
                          {value}
                          <span className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-brand transition-transform duration-200 ease-out group-hover:scale-x-100" aria-hidden />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {activeTab === "demo" && (
                <div className="contact-tab-content">
                  <h3 className="text-base font-bold uppercase tracking-wider text-brand">
                    Wat kunt u verwachten
                  </h3>
                  <ul className="mt-4 space-y-3 text-sm text-neutral-600">
                    <li>• Persoonlijke rondleiding door het platform</li>
                    <li>• Afgestemd op uw specifieke situatie</li>
                    <li>• Geen verplichtingen</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
