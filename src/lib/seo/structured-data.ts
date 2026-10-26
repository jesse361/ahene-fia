import type { Metadata } from "next";

import { eventConfig, eventEndIso, eventStartIso } from "@/config/event";
import { siteConfig } from "@/config/site";

type PageMeta = {
  title: string;
  description: string;
  path: string;
};

export function pageMetadata({ title, description, path }: PageMeta): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.legalName,
    url: siteConfig.url,
    description: siteConfig.description,
  };
}

export function eventJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: eventConfig.name,
    description: `${eventConfig.summary} Demonstration programme. Speaker names, prices, and room assignments are sample content until confirmed.`,
    startDate: eventStartIso(),
    endDate: eventEndIso(),
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: eventConfig.venue.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: eventConfig.venue.streetAddress,
        addressLocality: eventConfig.venue.city,
        addressCountry: eventConfig.venue.countryCode,
      },
    },
    organizer: {
      "@type": "Organization",
      name: siteConfig.legalName,
      url: siteConfig.url,
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.path, siteConfig.url).toString(),
    })),
  };
}
