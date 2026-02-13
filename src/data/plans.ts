export type PlanFeature = boolean | string;

export type Plan = {
  id: string;
  name: string;
  description: string;
  badge?: string;
  price: string;
  priceSub: string;
  minPeriod: string;
  features: {
    app: PlanFeature;
    webPortal: PlanFeature;
    realtimeTracking: PlanFeature;
    chat24_7: PlanFeature;
    whiteLabel: PlanFeature;
    personalContact: PlanFeature;
  };
};

export const plans: Plan[] = [
  {
    id: "standaard",
    name: "Standaard",
    description: "Start met essentiële tracking en beheer voor uw wagenpark. Ideaal voor kleine bedrijven die eenvoud willen.",
    price: "€1,49",
    priceSub: "per voertuig per maand",
    minPeriod: "24 maanden",
    features: {
      app: true,
      webPortal: false,
      realtimeTracking: true,
      chat24_7: false,
      whiteLabel: false,
      personalContact: false,
    },
  },
  {
    id: "smart",
    name: "Smart",
    description: "Voor groeiende bedrijven die meer grip willen op hun wagenpark. Alle tools voor efficiënt beheer.",
    badge: "Meest gekozen",
    price: "€2,99",
    priceSub: "per voertuig per maand",
    minPeriod: "6 maanden",
    features: {
      app: true,
      webPortal: true,
      realtimeTracking: true,
      chat24_7: true,
      whiteLabel: false,
      personalContact: false,
    },
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Volledige flexibiliteit en persoonlijke begeleiding. Voor grote organisaties met specifieke wensen.",
    price: "Op maat",
    priceSub: "service op maat",
    minPeriod: "3 maanden",
    features: {
      app: true,
      webPortal: true,
      realtimeTracking: true,
      chat24_7: true,
      whiteLabel: true,
      personalContact: true,
    },
  },
];

export const featureLabels: Record<keyof Plan["features"], string> = {
  app: "App",
  webPortal: "Webportaal",
  realtimeTracking: "Realtime tracking",
  chat24_7: "Chat 24/7",
  whiteLabel: "White label",
  personalContact: "Persoonlijk contact",
};

export const featureTooltips: Record<keyof Plan["features"], string> = {
  app: "Beheer uw wagenpark via de mobiele FleetCare Connect app.",
  webPortal: "Toegang tot het online portaal voor overzicht en rapportages.",
  realtimeTracking: "Volg uw voertuigen realtime op de kaart.",
  chat24_7: "Direct contact met onze support via chat, 24 uur per dag.",
  whiteLabel: "Uw eigen huisstijl in de app en het portaal.",
  personalContact: "Persoonlijke accountmanager voor uw organisatie.",
};
