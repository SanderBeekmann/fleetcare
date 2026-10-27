import type { Metadata } from "next";
import {
  HeroSection,
  StackedFixedSection2,
  PlansOverview,
  // Tijdelijk verborgen tot er echte klantreviews zijn om de placeholders te vervangen
  // KlantenPreview,
  AppShowcaseSection,
  PlanFunnel,
  WhyFCCSection,
} from "@/components/home";
import { MethodSection } from "@/components/sections/MethodSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { company, companyPostalAddressSchema } from "@/lib/company";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fleetcareconnect.com";

export const metadata: Metadata = {
  title: { absolute: "FleetCare Connect | Aftersales platform voor Light Electric Vehicles" },
  description:
    "Eén platform voor de aftersales van uw Light Electric Vehicles. Meld onderhoud en reparaties in 1 minuut en volg alles realtime, met een landelijk netwerk van servicepartners.",
  openGraph: {
    title: "FleetCare Connect | Aftersales platform voor Light Electric Vehicles",
    description:
      "Eén platform voor de aftersales van uw Light Electric Vehicles. Meld onderhoud en reparaties in 1 minuut en volg alles realtime, met een landelijk netwerk van servicepartners.",
  },
  alternates: { canonical: "/" },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "FleetCare Connect",
  url: baseUrl,
  logo: `${baseUrl}/icon.png`,
  description:
    "FleetCare Connect is het centrale aftersalesplatform voor Light Electric Vehicles. Eenvoudig, inzichtelijk, betrouwbaar.",
  email: company.email,
  address: companyPostalAddressSchema,
  contactPoint: company.contacts.map((contact) => ({
    "@type": "ContactPoint",
    name: contact.name,
    telephone: contact.phone.replace(/\s/g, ""),
    contactType: "sales",
    areaServed: "NL",
    availableLanguage: "Dutch",
  })),
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
    lowPrice: "1.99",
    offerCount: "2",
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
        <AppShowcaseSection />
        <MethodSection />
        <WhyFCCSection />
        <PlanFunnel />
        {/* Tijdelijk verborgen tot er echte klantreviews zijn om de placeholders te vervangen */}
        {/* <KlantenPreview /> */}
        <ContactSection variant="onDark" />
      </div>
    </>
  );
}
