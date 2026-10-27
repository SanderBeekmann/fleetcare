import Link from "next/link";
import { company } from "@/lib/company";

type ContactDetailsProps = { variant?: "default" | "onDark" };

function DetailLink({
  href,
  children,
  isOnDark,
}: {
  href: string;
  children: React.ReactNode;
  isOnDark: boolean;
}) {
  const isExternal = href.startsWith("http");
  return (
    <Link
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={`group relative inline-block cursor-pointer pb-0.5 ${isOnDark ? "text-white" : "text-neutral-900"}`}
    >
      {children}
      <span
        className={`absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 transition-transform duration-200 ease-out group-hover:scale-x-100 ${isOnDark ? "bg-white" : "bg-brand"}`}
        aria-hidden
      />
    </Link>
  );
}

export function ContactDetails({ variant = "default" }: ContactDetailsProps) {
  const isOnDark = variant === "onDark";
  const textMuted = isOnDark ? "text-white/80" : "text-neutral-600";
  const { address } = company;

  return (
    <>
      <h3
        className={`text-base font-bold uppercase tracking-wider ${isOnDark ? "text-white" : "text-brand"}`}
      >
        Contactgegevens
      </h3>
      <ul className="mt-4 space-y-4">
        <li>
          <span className={`block text-sm ${textMuted}`}>E-mail</span>
          <DetailLink href={`mailto:${company.email}`} isOnDark={isOnDark}>
            {company.email}
          </DetailLink>
        </li>
        <li>
          <span className={`block text-sm ${textMuted}`}>Telefoon</span>
          <ul className="space-y-1">
            {company.contacts.map((contact) => (
              <li key={contact.href}>
                <span className={isOnDark ? "text-white" : "text-neutral-900"}>
                  {contact.name}:{" "}
                </span>
                <DetailLink href={contact.href} isOnDark={isOnDark}>
                  {contact.phone}
                </DetailLink>
              </li>
            ))}
          </ul>
        </li>
        <li>
          <span className={`block text-sm ${textMuted}`}>Adres</span>
          <DetailLink href={company.mapsUrl} isOnDark={isOnDark}>
            <address className="not-italic">
              {address.street}
              <br />
              {address.postalCode} {address.city}, {address.region}
              <br />
              {address.country}
            </address>
          </DetailLink>
        </li>
      </ul>
    </>
  );
}
