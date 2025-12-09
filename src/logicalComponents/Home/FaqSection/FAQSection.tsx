import { faqData } from "../../../data/faqData";
import FAQItem from "./FAQItems";

interface FAQSectionProps {
  className?: string;
}

export default function FAQSection({ className }: FAQSectionProps) {
  return (
    <div className={`mt-6 ${className ?? ""}`}>
      {faqData.map((faq, index) => (
        <FAQItem key={index} question={faq.question} answer={faq.answer} />
      ))}
    </div>
  );
}
