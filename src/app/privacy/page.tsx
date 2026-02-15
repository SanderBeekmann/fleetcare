import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy & Cookies",
  description:
    "Privacybeleid en cookie-informatie van FleetCare Connect. Lees hoe wij omgaan met uw gegevens en cookies.",
  openGraph: {
    title: "Privacy & Cookies | FleetCare Connect",
    description:
      "Privacybeleid en cookie-informatie van FleetCare Connect. Lees hoe wij omgaan met uw gegevens en cookies.",
  },
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <section className="border-b border-neutral-200 bg-white py-16 md:py-20">
        <Container>
          <h1
            className="text-3xl font-bold text-brand md:text-4xl lg:text-5xl"
            data-letter-stagger
          >
            Privacy & Cookies
          </h1>
          <p
            className="mt-4 max-w-2xl text-lg text-neutral-600"
            data-reveal="fade-up"
            data-delay="0.05"
          >
            FleetCare Connect hecht waarde aan uw privacy. Hieronder leest u hoe wij omgaan met uw gegevens en het gebruik van cookies.
          </p>
        </Container>
      </section>

      <section className="py-section">
        <Container>
          <div className="mx-auto max-w-3xl space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-neutral-900 md:text-3xl">
                Cookies
              </h2>
              <p className="mt-4 text-neutral-600 leading-relaxed">
                Wij gebruiken cookies om onze website te verbeteren en het gebruik te analyseren. Uw voorkeuren worden opgeslagen in uw browser (localStorage) zodat u niet bij elk bezoek opnieuw uw keuze hoeft te maken.
              </p>
              <h3 className="mt-8 text-lg font-semibold text-neutral-900">
                Soorten cookies
              </h3>
              <ul className="mt-4 space-y-3 text-neutral-600 leading-relaxed">
                <li>
                  <strong className="text-neutral-900">Noodzakelijke cookies</strong>: Deze cookies zijn essentieel voor het functioneren van de website en kunnen niet worden uitgeschakeld.
                </li>
                <li>
                  <strong className="text-neutral-900">Analytische cookies</strong>: Wij gebruiken o.a. Vercel Analytics om anoniem te meten hoe bezoekers onze website gebruiken. Dit helpt ons de site te verbeteren.
                </li>
                <li>
                  <strong className="text-neutral-900">Marketing cookies</strong>: Deze cookies worden momenteel niet gebruikt op onze website.
                </li>
              </ul>
              <p className="mt-6 text-neutral-600 leading-relaxed">
                U kunt uw cookievoorkeuren op elk moment wijzigen door de cookies in uw browser te wissen. Daarna verschijnt de cookiebanner opnieuw bij uw volgende bezoek.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-neutral-900 md:text-3xl">
                Verwerking van gegevens
              </h2>
              <p className="mt-4 text-neutral-600 leading-relaxed">
                Wanneer u contact met ons opneemt via het contactformulier, verwerken wij uw naam, e-mailadres, bedrijfsnaam en bericht. Deze gegevens gebruiken wij uitsluitend om uw aanvraag te behandelen en worden niet met derden gedeeld zonder uw toestemming.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-neutral-900 md:text-3xl">
                Uw rechten
              </h2>
              <p className="mt-4 text-neutral-600 leading-relaxed">
                U heeft het recht om uw gegevens in te zien, te laten corrigeren of te laten verwijderen. Neem daarvoor contact met ons op via het{" "}
                <Link href="/contact" className="text-brand underline hover:no-underline">
                  contactformulier
                </Link>
                .
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-neutral-900 md:text-3xl">
                Vragen
              </h2>
              <p className="mt-4 text-neutral-600 leading-relaxed">
                Heeft u vragen over ons privacybeleid of over cookies?{" "}
                <Link href="/contact" className="text-brand underline hover:no-underline">
                  Neem contact met ons op
                </Link>
                .
              </p>
            </section>
          </div>
        </Container>
      </section>
    </>
  );
}
