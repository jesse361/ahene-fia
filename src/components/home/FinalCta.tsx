import { Button } from "@/components/shared/Button";
import { Container } from "@/components/shared/Container";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-midnight py-20 text-ivory sm:py-28" aria-labelledby="close-heading">
      <div className="pattern-lattice absolute inset-0 opacity-40" aria-hidden="true" />
      <Container className="relative max-w-4xl">
        <div className="hairline mb-8 w-24" />
        <h2 id="close-heading" className="font-display text-5xl leading-[0.95] sm:text-7xl">
          Your Next Opportunity Starts with a Conversation.
        </h2>
        <p className="mt-6 max-w-xl text-lg leading-8 text-mist">
          Be part of a gathering built around ideas, ambition, and the people who make progress possible.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/tickets" size="lg">
            Explore Tickets
          </Button>
          <Button href="/contact" variant="secondary" size="lg">
            Contact Our Team
          </Button>
        </div>
      </Container>
    </section>
  );
}
