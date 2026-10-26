import { ticketTiers } from "@/data/tickets";
import { TicketCard } from "@/components/tickets/TicketCard";
import { Button } from "@/components/shared/Button";
import { Container } from "@/components/shared/Container";
import { DemoNotice } from "@/components/shared/DemoNotice";
import { SectionHeading } from "@/components/shared/SectionHeading";

export function TicketHighlights() {
  return (
    <section className="bg-white py-20 sm:py-28" aria-labelledby="tickets-heading">
      <Container>
        <SectionHeading
          id="tickets-heading"
          overline="Tickets"
          title="Choose how you want to be in the room."
          description="Three proposed passes. Prices are provisional demonstration values in Ghanaian cedis, not a live offer."
        />
        <div className="mt-8">
          <DemoNotice>Benefits are proposals until the organiser confirms what can actually be delivered. Nothing here is close to selling out, because inventory is not connected.</DemoNotice>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {ticketTiers.map((tier) => (
            <TicketCard
              key={tier.id}
              tier={tier}
              action={
                <Button href={`/tickets?tier=${tier.id}`} variant={tier.suggested ? "primary" : "line"} className="w-full">
                  Register interest
                </Button>
              }
            />
          ))}
        </div>
        <p className="mt-8 text-sm">
          <Button href="/tickets" variant="ghost">
            Compare passes and register
          </Button>
        </p>
      </Container>
    </section>
  );
}
