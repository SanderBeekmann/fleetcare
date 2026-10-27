import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import Link from "next/link";
import { company } from "@/lib/company";

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
      <section className="-mt-16 bg-white pb-16 pt-32 md:pb-20 md:pt-36">
        <Container>
          <h1 data-intro-item className="text-3xl font-bold text-brand md:text-4xl lg:text-5xl">
            Privacy & Cookies
          </h1>
          <p data-intro-item className="mt-4 max-w-2xl text-lg text-neutral-600">
            FleetCare Connect hecht waarde aan uw privacy. Hieronder leest u hoe wij omgaan met uw
            gegevens en het gebruik van cookies.
          </p>
        </Container>
      </section>

      <section className="py-section">
        <Container>
          <div className="mx-auto max-w-3xl space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-neutral-900 md:text-3xl">Wie zijn wij</h2>
              <p className="mt-4 leading-normal text-neutral-600">
                Deze website wordt beheerd door {company.name}. Wij zijn verantwoordelijk voor de
                verwerking van persoonsgegevens zoals beschreven in deze verklaring.
              </p>
              <address className="mt-4 not-italic leading-normal text-neutral-600">
                <strong className="text-neutral-900">{company.name}</strong>
                <br />
                {company.address.street}
                <br />
                {company.address.postalCode} {company.address.city}, {company.address.region}
                <br />
                {company.address.country}
                <br />
                <a
                  href={`mailto:${company.email}`}
                  className="text-brand underline hover:no-underline"
                >
                  {company.email}
                </a>
              </address>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-neutral-900 md:text-3xl">
                Wet- en regelgeving
              </h2>
              <h3 className="mt-8 text-lg font-semibold text-neutral-900">
                Algemene verordening gegevensbescherming (AVG)
              </h3>
              <p className="mt-4 leading-normal text-neutral-600">
                Wij verwerken persoonsgegevens volgens de AVG (in het Engels: GDPR). Dat betekent
                dat wij alleen gegevens verwerken met een geldige grondslag, zoals uw toestemming,
                de uitvoering van een overeenkomst of ons gerechtvaardigd belang. Wij verzamelen
                niet meer gegevens dan nodig, bewaren ze niet langer dan noodzakelijk en beveiligen
                ze met passende technische en organisatorische maatregelen. Heeft u een klacht over
                de verwerking van uw gegevens, dan kunt u die indienen bij de Autoriteit
                Persoonsgegevens.
              </p>
              <h3 className="mt-8 text-lg font-semibold text-neutral-900">Europese Data Act</h3>
              <p className="mt-4 leading-normal text-neutral-600">
                De Europese Data Act geeft gebruikers van verbonden producten en diensten meer
                zeggenschap over de data die bij het gebruik daarvan ontstaat. U heeft onder meer
                het recht om die data in te zien en te laten delen met een partij naar keuze, en om
                eenvoudiger over te stappen naar een andere dienstverlener. Data die u via het
                FleetCare Connect-platform vastlegt, blijft van u.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-neutral-900 md:text-3xl">Cookies</h2>
              <p className="mt-4 leading-normal text-neutral-600">
                Wij gebruiken cookies om onze website te verbeteren en het gebruik te analyseren. Uw
                voorkeuren worden opgeslagen in uw browser (localStorage) zodat u niet bij elk
                bezoek opnieuw uw keuze hoeft te maken.
              </p>
              <h3 className="mt-8 text-lg font-semibold text-neutral-900">Soorten cookies</h3>
              <ul className="mt-4 space-y-3 leading-normal text-neutral-600">
                <li>
                  <strong className="text-neutral-900">Noodzakelijke cookies</strong>: Deze cookies
                  zijn essentieel voor het functioneren van de website en kunnen niet worden
                  uitgeschakeld.
                </li>
                <li>
                  <strong className="text-neutral-900">Analytische cookies</strong>: Wij gebruiken
                  o.a. Vercel Analytics om anoniem te meten hoe bezoekers onze website gebruiken.
                  Dit helpt ons de site te verbeteren.
                </li>
                <li>
                  <strong className="text-neutral-900">Marketing cookies</strong>: Deze cookies
                  worden momenteel niet gebruikt op onze website.
                </li>
              </ul>
              <p className="mt-6 leading-normal text-neutral-600">
                U kunt uw cookievoorkeuren op elk moment wijzigen door de cookies in uw browser te
                wissen. Daarna verschijnt de cookiebanner opnieuw bij uw volgende bezoek.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-neutral-900 md:text-3xl">
                Verwerking van gegevens
              </h2>
              <p className="mt-4 leading-normal text-neutral-600">
                Wanneer u contact met ons opneemt via het contactformulier, verwerken wij uw naam,
                e-mailadres, bedrijfsnaam en bericht. Deze gegevens gebruiken wij uitsluitend om uw
                aanvraag te behandelen en worden niet met derden gedeeld zonder uw toestemming.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-neutral-900 md:text-3xl">Uw rechten</h2>
              <p className="mt-4 leading-normal text-neutral-600">
                U heeft het recht om uw gegevens in te zien, te laten corrigeren of te laten
                verwijderen. Neem daarvoor contact met ons op via het{" "}
                <Link href="/contact" className="text-brand underline hover:no-underline">
                  contactformulier
                </Link>
                .
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-neutral-900 md:text-3xl">Vragen</h2>
              <p className="mt-4 leading-normal text-neutral-600">
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
