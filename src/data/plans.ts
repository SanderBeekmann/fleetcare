export type PlanFeature = boolean | string;

export type Plan = {
  id: string;
  name: string;
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
