import Image from "next/image";

import { mapsUrl, eventConfig } from "@/config/event";
import { travelNotes } from "@/data/experience";
import { formatEventRange } from "@/lib/utils/dates";
import { Button } from "@/components/shared/Button";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";

export function VenueSection() {
  return (
    <section className="bg-ivory py-20 sm:py-28" aria-labelledby="venue-heading">
      <Container className="grid gap-10 lg:grid-cols-12 lg:items-center">
        <div className="relative aspect-[4/3] overflow-hidden bg-midnight lg:col-span-6">
          <Image
            src="/images/events/auditorium.jpg"
            alt="Rows of seats in a conference auditorium, used as atmosphere rather than a photograph of the venue."
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="lg:col-span-6">
          <SectionHeading id="venue-heading" overline="Place" title={eventConfig.venue.name} description={`${eventConfig.venue.streetAddress}, ${eventConfig.venue.city}, ${eventConfig.venue.country}.`} />
          <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-[0.68rem] uppercase tracking-[0.16em] text-stone">When</dt>
              <dd className="mt-1 text-midnight">{formatEventRange(eventConfig.startDate, eventConfig.endDate)}</dd>
            </div>
            <div>
              <dt className="text-[0.68rem] uppercase tracking-[0.16em] text-stone">Digital address</dt>
              <dd className="mt-1 text-midnight">{eventConfig.venue.digitalAddress}</dd>
            </div>
          </dl>
          <ul className="mt-6 space-y-4">
            {travelNotes.map((note) => (
              <li key={note.title}>
                <p className="font-medium text-midnight">{note.title}</p>
                <p className="mt-1 text-sm leading-6 text-charcoal/75">{note.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs leading-5 text-charcoal/60">{eventConfig.venue.notes.join(" ")}</p>
          <div className="mt-6">
            <Button href={mapsUrl()} variant="forest">
              Directions
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
