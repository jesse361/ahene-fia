import Image from "next/image";

import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";

const notes = [
  { title: "A room with a point of view", body: "Programmes are paced so a keynote can be heard and a conversation can finish." },
  { title: "People before production", body: "Networking is given time of its own, rather than squeezed into a corridor." },
  { title: "Detail as hospitality", body: "Lighting, wayfinding, and the words on a badge are part of how a guest is received." },
];

export function AboutExperience() {
  return (
    <section id="experience" className="bg-ivory py-20 sm:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-12">
        <div className="relative lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden bg-forest">
            <Image
              src="/images/events/stage.jpg"
              alt="A speaker addressing a conference from a lit stage."
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-0 hidden border border-gold/40 bg-midnight px-5 py-4 text-ivory sm:block">
            <p className="font-display text-3xl">Accra</p>
            <p className="text-xs uppercase tracking-[0.16em] text-gold">A gathering, not a feed</p>
          </div>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <SectionHeading
            overline="The house"
            title="More Than an Event. A Meeting of Possibilities."
            description="Ahene Fia brings leaders, innovators, entrepreneurs, creatives, and professionals into the same careful room — to exchange ideas, begin relationships, and look at what a next chapter could be."
          />
          <div className="mt-8 space-y-4 text-base leading-7 text-charcoal/80">
            <p>
              The work is the gathering itself: who is invited to speak, how the day is paced, and whether a guest leaves with a person or an idea they did not arrive with.
            </p>
            <p>
              This website is the public face of that intention. It does not claim a history, a crowd size, or a list of past editions. Those will be published when they are true.
            </p>
          </div>
          <dl className="mt-8 grid gap-6 sm:grid-cols-3">
            {notes.map((note) => (
              <div key={note.title}>
                <dt className="font-display text-2xl leading-none text-midnight">{note.title}</dt>
                <dd className="mt-2 text-sm leading-6 text-charcoal/75">{note.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
