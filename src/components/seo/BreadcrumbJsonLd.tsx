import { JsonLd } from "./JsonLd";

type BreadcrumbItem = {
  name: string;
  href: string;
};

type BreadcrumbJsonLdProps = {
  items: BreadcrumbItem[];
};

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fleetcareconnect.com";

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${baseUrl}${item.href}`,
    })),
  };

  return <JsonLd data={data} />;
}
