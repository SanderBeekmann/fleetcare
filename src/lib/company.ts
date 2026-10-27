/**
 * Centrale bedrijfsgegevens. Eén plek voor adres, contactpersonen en de webportaal-link,
 * zodat een wijziging niet door de hele codebase gezocht hoeft te worden.
 */

export type ContactPerson = {
  name: string;
  phone: string;
  href: string;
};

export const company = {
  name: "FleetCare Connect",
  email: "info@fleetcareconnect.com",
  address: {
    street: "Waardhuizenstraat 6A",
    postalCode: "6641 KA",
    city: "Beuningen",
    region: "Gelderland",
    country: "Nederland",
    countryCode: "NL",
  },
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Waardhuizenstraat+6A+6641+KA+Beuningen",
  contacts: [
    { name: "Simon Dopheide", phone: "+31 6 49363446", href: "tel:+31649363446" },
    { name: "Dave Daanen", phone: "+31 6 39874325", href: "tel:+31639874325" },
  ] satisfies ContactPerson[],
} as const;

/** Volledig adres op één regel, bijv. voor metadata en links. */
export const companyAddressLine = `${company.address.street}, ${company.address.postalCode} ${company.address.city}`;

/**
 * Link achter de knop 'Webportaal'. Zolang het platform niet live is wijst deze naar de
 * coming-soon-pagina. Bij livegang alleen NEXT_PUBLIC_WEBPORTAL_URL zetten in Netlify.
 */
export const webportal = {
  href: process.env.NEXT_PUBLIC_WEBPORTAL_URL || "/webportaal",
  label: "Webportaal",
  comingSoonLabel: "Binnenkort",
  isLive: Boolean(process.env.NEXT_PUBLIC_WEBPORTAL_URL),
};

/** schema.org PostalAddress voor gestructureerde data. */
export const companyPostalAddressSchema = {
  "@type": "PostalAddress",
  streetAddress: company.address.street,
  postalCode: company.address.postalCode,
  addressLocality: company.address.city,
  addressRegion: company.address.region,
  addressCountry: company.address.countryCode,
};
