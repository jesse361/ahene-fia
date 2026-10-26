import type { EventConfig } from "@/types/event";

/**
 * Single source of truth for the demonstration gathering.
 * Replace these values when a real event is confirmed.
 * Africa/Accra is UTC+0 throughout the year.
 */
export const eventConfig = {
  contentStatus: "demonstration",
  name: "Ahene Fia Leadership & Innovation Summit 2027",
  shortName: "Leadership & Innovation Summit",
  theme: "Leadership, Innovation & The Future of African Enterprise",
  summary:
    "A two-day gathering in Accra for people building companies, institutions, and creative work with long attention.",
  startDate: "2027-10-16",
  endDate: "2027-10-17",
  doorsOpen: "08:30",
  closesAt: "16:00",
  timezone: "Africa/Accra",
  timezoneLabel: "Africa/Accra (GMT)",
  venue: {
    name: "Accra International Conference Centre",
    streetAddress: "Castle Road",
    digitalAddress: "GHA-111-0646",
    city: "Accra",
    country: "Ghana",
    countryCode: "GH",
    mapsQuery: "Accra International Conference Centre, Castle Road, Accra, Ghana",
    notes: [
      "The street address and Ghana digital address are the venue’s published location, not an Ahene Fia office.",
      "Room assignments in the programme are proposed and have not been confirmed with the venue.",
    ],
  },
} as const satisfies EventConfig;

export function eventStartIso(event: EventConfig = eventConfig): string {
  return `${event.startDate}T${event.doorsOpen}:00+00:00`;
}

export function eventEndIso(event: EventConfig = eventConfig): string {
  return `${event.endDate}T${event.closesAt}:00+00:00`;
}

export function mapsUrl(event: EventConfig = eventConfig): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.venue.mapsQuery)}`;
}
