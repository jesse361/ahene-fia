export type SpeakerCategory =
  | "Technology"
  | "Business"
  | "Leadership"
  | "Entrepreneurship"
  | "Creativity";

export type SessionKind = "keynote" | "session" | "break" | "networking" | "arrival";

export type TicketTierId = "general" | "vip" | "student";

export type EnquiryCategory =
  | "general"
  | "sponsorship"
  | "speaker"
  | "media"
  | "group"
  | "planning";

export type Money = {
  amount: number;
  currency: "GHS";
};

export type Venue = {
  name: string;
  streetAddress: string;
  digitalAddress: string;
  city: string;
  country: string;
  countryCode: "GH";
  mapsQuery: string;
  notes: string[];
};

export type EventConfig = {
  /** Demonstration programme. Replace before publishing a confirmed event. */
  contentStatus: "demonstration";
  name: string;
  shortName: string;
  theme: string;
  summary: string;
  startDate: string;
  endDate: string;
  doorsOpen: string;
  closesAt: string;
  timezone: string;
  timezoneLabel: string;
  venue: Venue;
};

export type Speaker = {
  slug: string;
  name: string;
  title: string;
  organization: string;
  category: SpeakerCategory;
  sessionTitle: string;
  expertise: string;
  biography: string;
  image: string;
  imageAlt: string;
  imagePosition: string;
  featured: boolean;
  /** Illustrative stock portrait. Not a photograph of the named sample speaker. */
  portraitIsIllustrative: true;
  profileUrl?: string;
};

export type ScheduleSession = {
  id: string;
  dayId: "day-1" | "day-2";
  date: string;
  start: string;
  end: string;
  crossesMidnight?: boolean;
  title: string;
  description: string;
  kind: SessionKind;
  category: string;
  speakerIds: string[];
  host: string;
  room: string;
  roomConfirmed: boolean;
};

export type TicketTier = {
  id: TicketTierId;
  name: string;
  price: Money;
  /** Prices are provisional demonstration values, not a live offer. */
  priceStatus: "provisional-demonstration";
  availability: "open";
  /** Null means inventory is not tracked. Do not infer scarcity. */
  inventory: null;
  maxPerOrder: number;
  suggested: boolean;
  eligibility: string;
  benefits: string[];
};

export type Sponsor = {
  id: string;
  name: string;
  role: string;
  monogram: string;
  /** Placeholders are not confirmed sponsors. */
  status: "placeholder";
  href?: string;
};

export type RegistrationInput = {
  fullName: string;
  email: string;
  phone: string;
  tierId: TicketTierId;
  quantity: number;
  studentInstitution: string;
  dietaryRequirements: string;
  accessibilityRequests: string;
  privacyAccepted: boolean;
  marketingConsent: boolean;
  idempotencyKey: string;
  ahfHp: string;
};

export type ContactSubmission = {
  fullName: string;
  email: string;
  category: EnquiryCategory;
  subject: string;
  message: string;
  privacyAccepted: boolean;
  idempotencyKey: string;
  ahfHp: string;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};
