import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/forms/ContactForm";
import { ContactDetails } from "@/components/contact/ContactDetails";

type ContactSectionProps = {
  variant?: "default" | "onDark";
  id?: string;
};

export function ContactSection({ variant = "default", id }: ContactSectionProps) {
  const isOnDark = variant === "onDark";
  const sectionClass = isOnDark
    ? "surface-brand brand-watermark py-section text-white"
    : "surface-ambient py-section";

  return (
    <section id={id} className={sectionClass}>
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
          <div>
            <h2
              className={`text-2xl font-bold md:text-3xl ${isOnDark ? "text-white" : "text-brand"}`}
              data-letter-stagger
            >
              Neem contact op
            </h2>
            <div className="mt-8">
              <ContactForm variant={isOnDark ? "onDark" : "default"} />
            </div>
          </div>
          <div>
            <ContactDetails variant={variant} />
          </div>
        </div>
      </Container>
    </section>
  );
}
