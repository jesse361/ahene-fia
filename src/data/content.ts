import type { FaqItem } from "@/types/event";

export const contactFaqs: FaqItem[] = [
  {
    id: "response",
    question: "Will someone receive this message?",
    answer:
      "Only if an email service has been configured for the site. Otherwise the form validates your message and confirms that it was not delivered. The page will tell you which of those happened.",
  },
  {
    id: "speaking",
    question: "Can I apply to speak?",
    answer:
      "Yes. Choose Speaker Applications and include the session you have in mind. A submission is an enquiry, not an acceptance.",
  },
  {
    id: "press",
    question: "Are press credentials available?",
    answer:
      "No press desk has been confirmed. Media enquiries can be sent through the form and will be answered once a live inbox is connected.",
  },
];

export const enquiryCategories = [
  { id: "general", label: "General Enquiries" },
  { id: "sponsorship", label: "Sponsorship and Partnerships" },
  { id: "speaker", label: "Speaker Applications" },
  { id: "media", label: "Media and Press" },
  { id: "group", label: "Group Registrations" },
  { id: "planning", label: "Event Planning" },
] as const;
