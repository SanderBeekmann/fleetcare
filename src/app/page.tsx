import {
  HeroSection,
  WhatWeDoSection,
  PlansOverview,
  HowItWorks,
  StatsSection,
  KlantenPreview,
} from "@/components/home";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "FleetCare Connect",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://fleetcareconnect.nl",
  description:
    "FleetCare Connect — Uw partner in fleetmanagement. Eenvoudig, inzichtelijk, betrouwbaar.",
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <HeroSection />
      <div className="relative z-20">
        <WhatWeDoSection />
      </div>
      <div className="relative z-30">
        <PlansOverview />
        <HowItWorks />
        <StatsSection />
        <KlantenPreview />
      </div>
    </>
  );
}
