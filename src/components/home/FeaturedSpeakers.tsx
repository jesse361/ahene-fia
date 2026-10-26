import Link from "next/link";

import { featuredSpeakers } from "@/data/speakers";
import { SpeakerCard } from "@/components/speakers/SpeakerCard";
import { Button } from "@/components/shared/Button";
import { Container } from "@/components/shared/Container";
import { DemoNotice } from "@/components/shared/DemoNotice";
import { SectionHeading } from "@/components/shared/SectionHeading";

export function FeaturedSpeakers() {
  const speakers = featuredSpeakers();
  return (
    <section className="bg-ivory py-20 sm:py-28" aria-labelledby="speakers-heading">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading id="speakers-heading" overline="Voices" title="People the programme is written around." className="max-w-2xl" />
          <Button href="/speakers" variant="line">
            All speakers
          </Button>
        </div>
        <div className="mt-8">
          <DemoNotice>
            These profiles are samples. Portraits are illustrative stock photographs, not pictures of the named speakers, and nobody listed here is a confirmed guest.
          </DemoNotice>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {speakers.map((speaker) => (
            <SpeakerCard key={speaker.slug} speaker={speaker} />
          ))}
        </div>
        <p className="mt-6 text-sm text-charcoal/70">
          <Link href="/speakers" className="underline decoration-gold underline-offset-4">
            Read the full demonstration directory
          </Link>
        </p>
      </Container>
    </section>
  );
}
