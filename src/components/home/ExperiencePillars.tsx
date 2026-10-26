import { Compass, Gem, Lightbulb, Waypoints } from "lucide-react";

import { pillars } from "@/data/experience";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";

const icons = {
  compass: Compass,
  waypoints: Waypoints,
  lightbulb: Lightbulb,
  gem: Gem,
};

export function ExperiencePillars() {
  return (
    <section className="bg-midnight py-20 text-ivory sm:py-28" aria-labelledby="pillars-heading">
      <Container>
        <SectionHeading id="pillars-heading" overline="What the days are for" title="Four ways of being in the room." tone="light" />
        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {pillars.map((pillar, index) => {
            const Icon = icons[pillar.icon];
            const featured = index === 0;
            return (
              <article
                key={pillar.id}
                className={
                  featured
                    ? "border border-gold/50 bg-forest p-7 md:col-span-2 xl:col-span-1 xl:row-span-1"
                    : "border border-ivory/10 bg-midnight p-7 transition-colors duration-200 hover:border-gold/60 motion-reduce:transition-none"
                }
              >
                <Icon className="h-6 w-6 text-gold" aria-hidden="true" />
                <h3 className="mt-8 font-display text-4xl leading-none">{pillar.title}</h3>
                <p className="mt-4 text-sm leading-7 text-mist">{pillar.description}</p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
