"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

type Option = {
  label: string;
  description: string;
  score: number;
  minPlan?: "smart" | "enterprise";
};

type Step = { question: string; options: Option[] };

const steps: Step[] = [
  {
    question: "Hoeveel voertuigen heeft u in uw vloot?",
    options: [
      { label: "1 – 10", description: "Klein wagenpark", score: 0 },
      { label: "10 – 50", description: "Middelgroot wagenpark", score: 1 },
      { label: "50+", description: "Groot wagenpark", score: 2 },
    ],
  },
  {
    question: "Welke functies zijn voor u het belangrijkst?",
    options: [
      { label: "Basistracking", description: "Tracking via de app is voldoende", score: 0 },
      {
        label: "Webportaal",
        description: "Extra overzicht via het online portaal",
        score: 1,
        minPlan: "smart",
      },
      {
        label: "White label",
        description: "Eigen huisstijl en integraties",
        score: 2,
        minPlan: "enterprise",
      },
    ],
  },
  {
    question: "Wilt u FCC koppelen aan uw eigen bedrijfssystemen?",
    options: [
      { label: "Nee", description: "Een standaardoplossing is prima", score: 0 },
      {
        label: "Ja",
        description: "Naadloze integratie met mijn systemen",
        score: 2,
        minPlan: "enterprise",
      },
    ],
  },
  {
    question: "Welk type ondersteuning past bij u?",
    options: [
      { label: "Selfservice", description: "Ik red me prima via de app", score: 0 },
      {
        label: "24/7 chat",
        description: "Direct contact wanneer ik het nodig heb",
        score: 1,
        minPlan: "smart",
      },
      {
        label: "Persoonlijke begeleiding",
        description: "Een vaste accountmanager",
        score: 2,
        minPlan: "enterprise",
      },
    ],
  },
];

const planResults: Record<string, { id: string; name: string; description: string }> = {
  standaard: {
    id: "standaard",
    name: "Standaard",
    description:
      "Met het Standaard-plan profiteert u van de essentiële functies: de app en realtime tracking voor uw wagenpark.",
  },
  smart: {
    id: "smart",
    name: "Smart",
    description:
      "Het Smart-plan biedt extra overzicht via het webportaal en 24/7 chat-ondersteuning voor uw operatie.",
  },
  enterprise: {
    id: "enterprise",
    name: "Enterprise",
    description:
      "Met Enterprise krijgt u een oplossing op maat: white label, persoonlijke begeleiding en naadloze integratie.",
  },
};

type Answer = { score: number; minPlan?: "smart" | "enterprise" } | null;

const planRank: Record<string, number> = { standaard: 0, smart: 1, enterprise: 2 };
const planById = ["standaard", "smart", "enterprise"] as const;

function getRecommendation(answers: Answer[]): string {
  // Knockout: hoogste minPlan wint altijd
  let minRank = 0;
  for (const a of answers) {
    if (a?.minPlan) {
      minRank = Math.max(minRank, planRank[a.minPlan]);
    }
  }
  if (minRank > 0) return planById[minRank];

  // Fallback: score-based
  const total = answers.reduce<number>((sum, a) => sum + (a?.score ?? 0), 0);
  if (total >= 5) return "enterprise";
  if (total >= 2) return "smart";
  return "standaard";
}

export function PlanFunnel() {
  const router = useRouter();
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
      next[currentStep] = { score: option.score, minPlan: option.minPlan };
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
    <section id="plan-test" className="cta-klaar-om-te-starten bg-neutral-900 text-white">
      {/* CTA block */}
      <div className="py-section">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-white md:text-4xl" data-letter-stagger>
              Benieuwd welk plan het best bij u past?
            </h2>
            <p className="mt-4 text-neutral-300" data-reveal="fade-up" data-delay="0.05">
              Doe dan onze test of neem contact op.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4" data-reveal="fade-up">
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  isOpen ? "w-0 opacity-0" : "w-[154px] opacity-100"
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
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium uppercase tracking-widest text-white/60">
                    Keuzehulp
                  </p>
                  <button
                    type="button"
                    onClick={closeFunnel}
                    className="flex items-center gap-1.5 text-sm font-medium text-neutral-400 transition-colors hover:text-white"
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
                      <div className="mt-6 grid gap-3 sm:grid-cols-3">
                        {steps[currentStep].options.map((option) => {
                          const isSelected = answers[currentStep]?.score === option.score;
                          return (
                            <button
                              key={option.label}
                              type="button"
                              onClick={() => selectOption(option)}
                              className={`flex flex-col rounded-lg border-2 p-5 text-left transition-all duration-200 ${
                                isSelected
                                  ? "border-white bg-white/10 shadow-lg"
                                  : "border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10"
                              }`}
                            >
                              <span className="text-base font-semibold text-white">
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
                            className="text-sm font-medium text-neutral-400 transition-colors hover:text-white"
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
                      <div className="rounded-lg border-2 border-white bg-white/10 p-8 shadow-lg">
                        <p className="text-sm font-medium uppercase tracking-widest text-white/60">
                          Onze aanbeveling
                        </p>
                        <h4 className="mt-2 text-2xl font-bold text-white">
                          {recommendation!.name}
                        </h4>
                        <p className="mt-3 text-base leading-relaxed text-neutral-300">
                          {recommendation!.description}
                        </p>
                        <div className="mt-6 flex flex-wrap items-center gap-4">
                          <Button
                            variant="primary"
                            onClick={() =>
                              router.push(
                                `/oplossingen?aanbevolen=${recommendation!.id}#eerlijke-prijzen`
                              )
                            }
                          >
                            Bekijk {recommendation!.name}-plan
                          </Button>
                          <button
                            type="button"
                            onClick={reset}
                            className="text-sm font-medium text-neutral-400 transition-colors hover:text-white"
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
