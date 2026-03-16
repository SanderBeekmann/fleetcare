import { JsonLd } from "./JsonLd";

type FaqItem = {
  question: string;
  answer: string;
};

type FaqJsonLdProps = {
  faqs: FaqItem[];
};

export function FaqJsonLd({ faqs }: FaqJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return <JsonLd data={data} />;
}
