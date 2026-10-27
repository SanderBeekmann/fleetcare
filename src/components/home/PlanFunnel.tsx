"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

type Option = {
  label: string;
  description: string;
  /** Deze keuze vraagt om een platform op maat. */
  custom?: boolean;
};

type Step = { question: string; options: Option[] };

const steps: Step[] = [
  {
    question: "Hoeveel voertuigen heeft u in uw vloot?",
    options: [
      { label: "1 - 10", description: "Klein wagenpark" },
      { label: "10 - 50", description: "Middelgroot wagenpark" },
      { label: "50+", description: "Groot wagenpark", custom: true },
    ],
  },
  {
    question: "Welke functies heeft u nodig?",
    options: [
      {
        label: "De basis",
        description: "Onderhoudsdossier, storingen melden en opdrachten naar servicepartners",
      },
      {
        label: "Extra functies",
        description: "Functies en modules afgestemd op mijn organisatie",
        custom: true,
      },
    ],
  },
  {
    question: "Wilt u FCC koppelen aan uw eigen bedrijfssystemen?",
    options: [
      { label: "Nee", description: "Een standaardoplossing is prima" },
      { label: "Ja", description: "Koppeling met mijn systemen via een API", custom: true },
    ],
  },
  {
    question: "Welk type ondersteuning past bij u?",
    options: [
      { label: "Selfservice", description: "Ik red me prima via de app" },
      {
        label: "Persoonlijke begeleiding",
        description: "Begeleide implementatie, servicegaranties en persoonlijk contact",
        custom: true,
      },
    ],
  },
];

type ResultId = "essentieel" | "op-maat";

const planResults: Record<ResultId, { name: string; description: string }> = {
  essentieel: {
    name: "Essentieel",
    description:
      "Met de essentiële versie start u direct digitaal: een onderhoudsdossier, storingen melden via de app, opdrachten naar servicepartners en een status- en kostenoverzicht. Vanaf €1,99 per voertuig per maand, excl. btw.",
  },
  "op-maat": {
    name: "Op maat",
    description:
      "Uw organisatie vraagt om een platform op maat: functies en modules naar behoefte, koppelingen met uw systemen en persoonlijke begeleiding. Samen bepalen we een vaste prijs per voertuig die daarbij past.",
  },
};

type Answer = { label: string; custom: boolean } | null;

function getRecommendation(answers: Answer[]): ResultId {
  return answers.some((a) => a?.custom) ? "op-maat" : "essentieel";
}

export function PlanFunnel() {
  const funnelRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([null, null, null, null]);
  const [direction, setDirection] = useState<"forward" | "back">("forward");

  // Auto-open funnel wanneer #plan-test in de URL staat
  useEffect(() => {
    if (window.location.hash === "#plan-test") {
      setIsOpen(true);
    }
  }, []);

  const isResult = currentStep === steps.length;
  const recommendation = isResult ? planResults[getRecommendation(answers)] : null;

  function openFunnel() {
    setIsOpen(true);
    // Scroll naar de funnel na opening
    requestAnimationFrame(() => {
      setTimeout(() => {
        funnelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    });
  }

  function selectOption(option: Option) {
    setAnswers((prev) => {
      const next = [...prev];
      next[currentStep] = { label: option.label, custom: Boolean(option.custom) };
      return next;
    });
  }

  function next() {
    if (!answers[currentStep]) return;
    setDirection("forward");
    setCurrentStep((s) => s + 1);
  }

  function back() {
    setDirection("back");
    setCurrentStep((s) => s - 1);
  }

  function closeFunnel() {
    setIsOpen(false);
    reset();
  }

  function reset() {
    setDirection("back");
    setCurrentStep(0);
    setAnswers([null, null, null, null]);
  }

  return (
    <section id="plan-test" className="cta-klaar-om-te-starten surface-ink text-white">
      {/* CTA block */}
      <div className="py-section">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2
              className="text-balance text-3xl font-bold text-white md:text-4xl"
              data-letter-stagger
            >
              Benieuwd welk plan het best bij u past?
            </h2>
            <p className="mt-4 text-neutral-300" data-reveal="fade-up" data-delay="0.05">
              Doe dan onze test of neem contact op.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4" data-reveal="fade-up">
              {/* max-width (not a fixed width) so the wrapper hugs the button and the pair stays centred */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  isOpen ? "max-w-0 opacity-0" : "max-w-[200px] opacity-100"
                }`}
              >
                <Button variant="primary" onClick={openFunnel} className="whitespace-nowrap">
                  Doe de test
                </Button>
              </div>
              <Button variant="secondary" href="/contact" className="btn-cta-contact">
                Contact opnemen
              </Button>
            </div>
          </div>
        </Container>
      </div>

      {/* Collapsible funnel panel */}
      <div className={`funnel-collapse ${isOpen ? "is-open" : ""}`}>
        <div className="funnel-inner" ref={funnelRef}>
          <div className="pb-section pt-12">
            <Container>
              <div className="mx-auto max-w-3xl">
                <div className="flex items-center justify-end">
                  <button
                    type="button"
                    onClick={closeFunnel}
                    className="-m-3 flex items-center gap-1.5 p-3 text-sm font-medium text-neutral-400 transition-colors hover:text-white"
                    aria-label="Keuzehulp sluiten"
                  >
                    Sluiten
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <h3 className="mt-2 text-2xl font-bold text-white md:text-3xl">
                  Welk plan past bij u?
                </h3>
                <p className="mt-3 text-base text-neutral-400">
                  Beantwoord vier korte vragen en ontdek welke oplossing het beste aansluit bij uw
                  situatie.
                </p>

                {/* Progress indicator */}
                <div className="mt-10 flex items-center gap-2">
                  {steps.map((_, i) => (
                    <div
                      key={i}
                      className={`h-2 flex-1 rounded-full transition-colors duration-300 ${
                        i < currentStep
                          ? "bg-white"
                          : i === currentStep && !isResult
                            ? "bg-white/40"
                            : "bg-white/10"
                      }`}
                    />
                  ))}
                </div>

                {/* Step content */}
                <div className="relative mt-8 min-h-[320px]">
                  {!isResult ? (
                    <div key={currentStep} className={`animate-step-${direction}`}>
                      <p className="text-sm font-medium text-neutral-400">
                        Stap {currentStep + 1} van {steps.length}
                      </p>
                      <h4 className="mt-2 text-xl font-semibold text-white">
                        {steps[currentStep].question}
                      </h4>
                      <div
                        className={`mt-6 grid gap-3 ${steps[currentStep].options.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3"}`}
                      >
                        {steps[currentStep].options.map((option) => {
                          const isSelected = answers[currentStep]?.label === option.label;
                          return (
                            <button
                              key={option.label}
                              type="button"
                              onClick={() => selectOption(option)}
                              className={`flex flex-col rounded-lg border-2 px-5 pb-5 pt-4 text-left transition-all duration-200 ${
                                isSelected
                                  ? "border-white bg-white/10 shadow-lg"
                                  : "border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10"
                              }`}
                            >
                              <span className="text-base font-semibold leading-tight text-white">
                                {option.label}
                              </span>
                              <span className="mt-1 text-sm text-neutral-400">
                                {option.description}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                      <div className="mt-8 flex items-center gap-4">
                        {currentStep > 0 && (
                          <button
                            type="button"
                            onClick={back}
                            className="-my-3 py-3 text-sm font-medium text-neutral-400 transition-colors hover:text-white"
                          >
                            Vorige
                          </button>
                        )}
                        <Button variant="primary" disabled={!answers[currentStep]} onClick={next}>
                          {currentStep === steps.length - 1 ? "Bekijk resultaat" : "Volgende"}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div key="result" className="animate-step-forward">
                      <div className="rounded-lg border-2 border-white bg-white/10 px-8 pb-8 pt-7 shadow-lg">
                        <h4 className="text-2xl font-bold leading-none text-white">
                          {recommendation!.name}
                        </h4>
                        <p className="mt-4 text-base leading-normal text-neutral-300">
                          {recommendation!.description}
                        </p>
                        <div className="mt-6 flex flex-wrap items-center gap-4">
                          <Button variant="primary" href="/contact">
                            Neem contact op
                          </Button>
                          <button
                            type="button"
                            onClick={reset}
                            className="-my-3 py-3 text-sm font-medium text-neutral-400 transition-colors hover:text-white"
                          >
                            Opnieuw beginnen
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Container>
          </div>
        </div>
      </div>
    </section>
  );
}
