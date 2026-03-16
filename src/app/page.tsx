import {
  HeroSection,
  StackedFixedSection2,
  PlansOverview,
  StatsSection,
  KlantenPreview,
  AppShowcaseSection,
  PlanFunnel,
  WhyFCCSection,
} from "@/components/home";
import { MethodSection } from "@/components/sections/MethodSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { CtaBlock } from "@/components/oplossingen/CtaBlock";
import { JsonLd } from "@/components/seo/JsonLd";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fleetcareconnect.nl";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "FleetCare Connect",
  url: baseUrl,
  description:
    "FleetCare Connect is uw partner in fleetmanagement. Eenvoudig, inzichtelijk, betrouwbaar.",
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "FleetCare Connect",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web, iOS, Android",
  url: baseUrl,
  description:
    "Fleetmanagement platform voor Light Electric Vehicles. Onderhoud, tracking en service in één app.",
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "EUR",
    lowPrice: "0",
    offerCount: "3",
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd data={softwareSchema} />
      <HeroSection />
      <StackedFixedSection2 />
      <div className="stacked-content-above relative z-[3]">
        <PlansOverview />
        <WhyFCCSection />
        <MethodSection />
        <AppShowcaseSection />
        <StatsSection />
        <PlanFunnel />
        <KlantenPreview />
        <ContactSection variant="onDark" />
      </div>
    </>
  );
}
