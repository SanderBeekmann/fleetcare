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
    description: "Maak effectief gebruik van de essentiële functies van FleetCare Connect. Profiteer van ons servicepartner netwerk, door middel van de app en het algoritme.",
    price: "€1,49",
    priceSub: "per voertuig per maand",
    minPeriod: "12 maanden",
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
    description: "Optimaliseer het gebruik van FleetCare Connect door aanvullende functies zoals toegang tot het web-portaal, wat zorgt voor nóg meer overzicht in uw aftersales operatie.",
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
    description: "Een White label met naadloze integratie met uw eigen bedrijfssystemen, voor optimale aansluiting op uw organisatie. Op maat gemaakt voor de grootte van uw vloot.",
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
