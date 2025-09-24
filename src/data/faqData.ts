export interface FaqItem {
  question: string;
  answer: string;
}

export const faqData: FaqItem[] = [
  {
    question: "What is this app used for?",
    answer:
      "This app allows you to search for doctors, book appointments, and consult in person easily from your phone.",
  },
  {
    question: "How can I find a doctor?",
    answer:
      "You can search for doctors by specialty, location, or name using our search feature.",
  },
  {
    question: "Is the app free to use?",
    answer:
      "Yes, the app is free to download and use. However, consultation fees may apply based on the doctor's rates.",
  },
  {
    question: "Can I cancel my appointment?",
    answer:
      "Yes, you can cancel your appointment through the app. Please check the cancellation policy for any time restrictions.",
  },
  {
    question: "What payment methods are supported?",
    answer:
      "We support various payment methods including credit cards, debit cards, and digital wallets.",
  },
  {
    question: "How do I edit my profile?",
    answer:
      "You can edit your profile by going to the Profile section and selecting 'Edit Profile' option.",
  },
];
