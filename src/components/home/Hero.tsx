import Image from "next/image";
import { ArrowDown } from "lucide-react";

import { eventConfig } from "@/config/event";
import { Button } from "@/components/shared/Button";
import { Container } from "@/components/shared/Container";
import { EventMetadata } from "@/components/shared/EventMetadata";
import { Reveal } from "@/components/shared/Reveal";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-midnight text-ivory">
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/images/events/hero.jpg"
          alt="Audience seated in a darkened auditorium during a conference session."
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_40%] opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-midnight via-midnight/88 to-midnight/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-midnight/50" />
        <div className="pattern-lattice absolute inset-0 opacity-30" aria-hidden="true" />
      </div>
      <Container className="relative z-10 flex min-h-[calc(100svh-7.5rem)] flex-col justify-end pt-16 pb-8 sm:pt-20">
        <Reveal className="max-w-4xl">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-gold">Experience. Connection. Excellence.</p>
          <h1 className="mt-4 font-display text-[3.1rem] leading-[0.92] font-medium sm:text-7xl lg:text-[6.4rem]">
            Where Vision Meets Experience.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-mist sm:text-lg">
            Bringing ambitious minds together through extraordinary conferences, meaningful connections, and experiences that move ideas forward.
          </p>
          <p className="mt-5 text-[0.72rem] uppercase tracking-[0.16em] text-gold">Ahene Fia — Events & Conference Hub</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/schedule" size="lg">
              Explore the Event
            </Button>
            <Button href="/tickets" variant="secondary" size="lg">
              Secure Your Ticket
            </Button>
          </div>
        </Reveal>
        <div className="mt-12">
          <EventMetadata />
          <p className="mt-4 max-w-3xl text-sm leading-6 text-mist">
            Theme: {eventConfig.theme}. The programme, speakers, and prices on this site are demonstration content.
          </p>
        </div>
        <a href="#experience" className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-mist hover:text-gold">
          <ArrowDown className="h-4 w-4" aria-hidden="true" />
          Continue
        </a>
      </Container>
    </section>
  );
}
