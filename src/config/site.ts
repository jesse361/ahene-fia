const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";

export const siteConfig = {
  name: "Ahene Fia",
  legalName: "Ahene Fia Events & Conference Hub",
  tagline: "Events & Conference Hub",
  description:
    "Ahene Fia is a premium events and conference house for leadership, innovation, culture, and meaningful connection. This website presents a demonstration programme for Accra.",
  url: siteUrl,
  locale: "en_GH",
  announcement: {
    message: "The next chapter of connection starts here.",
    href: "/tickets",
    linkLabel: "View ticket options",
  },
  /**
   * Public contact details are intentionally unpublished.
   * Add confirmed values here before presenting them as operational.
   */
  contact: {
    email: null as string | null,
    phone: null as string | null,
    office: null as string | null,
  },
  /** Add confirmed profile URLs only. Do not invent accounts. */
  social: [] as { label: string; href: string }[],
  navigation: [
    { href: "/", label: "Home" },
    { href: "/speakers", label: "Speakers" },
    { href: "/schedule", label: "Schedule" },
    { href: "/tickets", label: "Tickets" },
    { href: "/contact", label: "Contact" },
  ],
  footerEventLinks: [
    { href: "/schedule", label: "Programme" },
    { href: "/speakers", label: "Speakers" },
    { href: "/tickets", label: "Tickets" },
    { href: "/about", label: "About the house" },
  ],
  legalLinks: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms and Conditions" },
  ],
} as const;

export type NavItem = (typeof siteConfig.navigation)[number];
