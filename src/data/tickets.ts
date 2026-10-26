import type { FaqItem, TicketTier } from "@/types/event";

export const maxTicketsPerOrder = 6;

export const ticketTiers: TicketTier[] = [
  {
    id: "general",
    name: "General Admission",
    price: { amount: 350, currency: "GHS" },
    priceStatus: "provisional-demonstration",
    availability: "open",
    inventory: null,
    maxPerOrder: 6,
    suggested: false,
    eligibility: "Open to professionals, founders, and guests.",
    benefits: [
      "Access to the scheduled conference sessions",
      "General networking access",
      "Event materials where they are actually provided",
    ],
  },
  {
    id: "vip",
    name: "VIP Experience",
    price: { amount: 750, currency: "GHS" },
    priceStatus: "provisional-demonstration",
    availability: "open",
    inventory: null,
    maxPerOrder: 4,
    suggested: true,
    eligibility: "Open to guests who want the fuller hosted experience, once those benefits are confirmed.",
    benefits: [
      "Everything proposed for General Admission",
      "Priority check-in when the venue operation supports it",
      "Access to a designated VIP networking gathering",
      "Reserved plenary seating where the room plan allows",
    ],
  },
  {
    id: "student",
    name: "Student Pass",
    price: { amount: 150, currency: "GHS" },
    priceStatus: "provisional-demonstration",
    availability: "open",
    inventory: null,
    maxPerOrder: 2,
    suggested: false,
    eligibility:
      "Proposed for currently enrolled students. A live event would need a verification step. This demonstration does not check student status.",
    benefits: [
      "Discounted admission for eligible students",
      "Access to the scheduled conference sessions",
      "General networking access",
    ],
  },
];

export const ticketingPolicy = {
  status: "unconfirmed" as const,
  refunds:
    "A refund and cancellation policy has not been confirmed. This website does not take payment, so there is nothing to refund. Publish the organiser’s real terms before any ticket is sold.",
  inventory:
    "Inventory is not connected. Availability is shown as open because no live stock is being counted. The site will not claim that tickets are scarce.",
  payment:
    "No card details are collected. A registration on this site is a demonstration submission, not a purchase and not a reserved seat.",
};

export const ticketFaqs: FaqItem[] = [
  {
    id: "payment",
    question: "Can I buy a ticket here?",
    answer:
      "Not yet. Prices are provisional demonstration values in Ghanaian cedis. The form checks your details and returns a reference, but it does not charge a card, reserve a seat, or store a booking in a database.",
  },
  {
    id: "refunds",
    question: "What is the refund policy?",
    answer: ticketingPolicy.refunds,
  },
  {
    id: "students",
    question: "How does the student pass work?",
    answer:
      "The student price is a proposal for currently enrolled students. The form asks for an institution so the shape of the request is clear. It does not verify enrolment.",
  },
  {
    id: "access",
    question: "Can I share an access requirement?",
    answer:
      "Yes. The registration form has an optional field for access requests. Until a venue plan is confirmed, that note is a request for follow-up, not a confirmed accommodation.",
  },
  {
    id: "group",
    question: "Do you take group registrations?",
    answer:
      "A single demonstration submission can include more than one pass, up to the limit on that ticket. Larger groups should use the contact form under Group Registrations. No group rate has been published.",
  },
];

export function getTicket(id: string): TicketTier | undefined {
  return ticketTiers.find((tier) => tier.id === id);
}

export const comparisonRows: { label: string; values: Record<TicketTier["id"], string> }[] = [
  {
    label: "Provisional price",
    values: { general: "GHS 350", vip: "GHS 750", student: "GHS 150" },
  },
  {
    label: "Scheduled sessions",
    values: { general: "Included", vip: "Included", student: "Included" },
  },
  {
    label: "General networking",
    values: { general: "Included", vip: "Included", student: "Included" },
  },
  {
    label: "Event materials",
    values: {
      general: "Where provided",
      vip: "Where provided",
      student: "Where provided",
    },
  },
  {
    label: "Priority check-in",
    values: { general: "Not included", vip: "When operations allow", student: "Not included" },
  },
  {
    label: "VIP networking",
    values: { general: "Not included", vip: "Proposed", student: "Not included" },
  },
  {
    label: "Student eligibility",
    values: { general: "Not required", vip: "Not required", student: "Required, unverified here" },
  },
];
