import {
  HeroSection,
  StackedFixedSection2,
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
      <StackedFixedSection2 />
      <div className="stacked-content-above relative z-[3]">
        <PlansOverview />
        <HowItWorks />
        <StatsSection />
        <KlantenPreview />
      </div>
    </>
  );
}
