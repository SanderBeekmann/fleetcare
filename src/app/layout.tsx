import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "@/app/globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GsapProvider } from "@/components/animations/GsapProvider";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fleetcareconnect.nl";

export const metadata: Metadata = {
  title: {
    default: "FleetCare Connect",
    template: "%s | FleetCare Connect",
  },
  description: "FleetCare Connect — Uw partner in fleetmanagement.",
  metadataBase: new URL(baseUrl),
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: baseUrl,
    siteName: "FleetCare Connect",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body>
        <Header />
        <main>
          <GsapProvider>{children}</GsapProvider>
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
