import Image from "next/image";
import Link from "next/link";

import type { Speaker } from "@/types/event";

export function SpeakerCard({ speaker, heading = "h3" }: { speaker: Speaker; heading?: "h2" | "h3" }) {
  const Heading = heading;
  return (
    <article className="group h-full bg-white shadow-[0_1px_0_rgba(16,21,27,0.04)]">
      <Link href={`/speakers/${speaker.slug}`} className="flex h-full flex-col focus-visible:outline-offset-4">
        <div className="relative aspect-[3/4] overflow-hidden bg-forest">
          <Image
            src={speaker.image}
            alt={speaker.imageAlt}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-700 group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            style={{ objectPosition: speaker.imagePosition }}
          />
        </div>
        <div className="flex flex-1 flex-col border border-t-0 border-charcoal/10 px-5 py-5">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-gold">{speaker.category}</p>
          <Heading className="mt-2 font-display text-[1.85rem] leading-none text-midnight">{speaker.name}</Heading>
          <p className="mt-3 text-sm text-charcoal/80">
            {speaker.title}
            <span className="text-stone"> · </span>
            {speaker.organization}
          </p>
          <p className="mt-4 border-t border-charcoal/10 pt-4 text-sm leading-6 text-midnight">{speaker.sessionTitle}</p>
        </div>
      </Link>
    </article>
  );
}
