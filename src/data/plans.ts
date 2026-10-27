export type PlanId = "essentieel" | "op-maat";

export type PlanCta = {
  label: string;
  href: string;
  variant: "primary" | "secondary";
};

export type Plan = {
  id: PlanId;
  name: string;
  description: string;
  badge?: string;
  pricePrefix?: string;
  price: string;
  priceSub: string;
  featuresIntro?: string;
  features: string[];
  ctas: PlanCta[];
};

export const plans: Plan[] = [
  {
    id: "essentieel",
    name: "Essentieel",
    description:
      "De kern van het platform om direct digitaal te starten met uw aftersalesafhandelingen.",
    pricePrefix: "vanaf",
    price: "€1,99",
    priceSub: "per voertuig per maand, excl. btw",
    features: [
      "Digitaal onderhoudsdossier",
      "Storingen melden via de app",
      "Opdrachten naar servicepartners",
      "Status- en kostenoverzicht",
    ],
    ctas: [{ label: "Vraag de essentiële versie aan", href: "/contact", variant: "secondary" }],
  },
  {
    id: "op-maat",
    name: "Op maat",
    badge: "Aanbevolen",
    description:
      "Elke organisatie heeft eigen wensen, eisen en koppelingen. Samen bepalen we welke functionaliteit u nodig heeft, en u krijgt een vaste prijs per voertuig die daarbij past.",
    price: "Op aanvraag",
    priceSub: "vaste prijs per voertuig per maand, afgestemd op uw vloot, excl. btw",
    featuresIntro: "Alles in Essentieel +",
    features: [
      "Functies en modules naar behoefte",
      "Koppeling met uw systemen (API)",
      "Servicegaranties (SLA)",
      "Eenvoudige team onboarding",
      "Administratie geregeld",
      "Begeleide implementatie",
      "Persoonlijk contact",
    ],
    ctas: [
      { label: "Neem contact op met sales", href: "/contact", variant: "primary" },
      { label: "Plan een demo", href: "/contact", variant: "secondary" },
    ],
  },
];
