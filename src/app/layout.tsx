import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

import "./globals.css";

const headingFont = Montserrat({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { GsapProvider } from "@/components/animations/GsapProvider";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fleetcareconnect.com";

export const metadata: Metadata = {
  title: {
    default: "FleetCare Connect",
    template: "%s | FleetCare Connect",
  },
  description: "FleetCare Connect is uw partner in fleetmanagement.",
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
    <html lang="nl" className={headingFont.variable} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Header />
        <GsapProvider>
          <main>{children}</main>
          <Footer />
        </GsapProvider>
        <CookieBanner />
      </body>
    </html>
  );
}
