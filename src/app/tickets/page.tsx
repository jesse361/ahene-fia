import { Suspense } from "react";

import { RegistrationForm } from "@/components/tickets/RegistrationForm";
import { TicketCard } from "@/components/tickets/TicketCard";
import { TicketComparison } from "@/components/tickets/TicketComparison";
import { Button } from "@/components/shared/Button";
import { Container } from "@/components/shared/Container";
import { DemoNotice } from "@/components/shared/DemoNotice";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ticketFaqs, ticketTiers, ticketingPolicy } from "@/data/tickets";
import { pageMetadata } from "@/lib/seo/structured-data";

export const metadata = pageMetadata({
  title: "Tickets",
  description: "Provisional demonstration prices for General Admission, VIP Experience, and the Student Pass, in Ghanaian cedis.",
  path: "/tickets",
});

export default function TicketsPage({ searchParams }: { searchParams: Promise<{ tier?: string }> }) {
  return (
    <>
      <section className="bg-midnight text-ivory">
        <Container className="py-16 sm:py-20">
          <SectionHeading
            as="h1"
            tone="light"
            overline="Tickets"
            title="Find Your Place in the Room."
            description="Choose the experience that matches your ambitions."
          />
        </Container>
      </section>
      <section className="bg-ivory py-14 sm:py-20">
        <Container className="space-y-16">
          <DemoNotice>{ticketingPolicy.payment}</DemoNotice>
          <div className="grid gap-5 lg:grid-cols-3">
            {ticketTiers.map((tier) => (
              <TicketCard
                key={tier.id}
                tier={tier}
                action={
                  <Button href={`/tickets?tier=${tier.id}#register`} variant={tier.suggested ? "primary" : "line"} className="h-auto min-h-12 w-full whitespace-normal px-4 py-3 text-center">
                    Continue with {tier.name}
                  </Button>
                }
              />
            ))}
          </div>
          <div>
            <SectionHeading overline="Compare" title="The same facts, side by side." />
            <div className="mt-8">
              <TicketComparison />
            </div>
          </div>
          <div id="register">
            <SectionHeading overline="Register" title="Tell us which pass you are considering." description="A review step comes before anything is submitted. Prices are checked again on the server." />
            <div className="mt-8 max-w-3xl">
              <Suspense fallback={<p className="text-sm">Loading the registration form.</p>}>
                <RegistrationFromQuery searchParams={searchParams} />
              </Suspense>
            </div>
          </div>
          <div>
            <SectionHeading overline="Policy" title="What is, and is not, promised." />
            <p className="mt-6 max-w-3xl text-sm leading-7 text-charcoal/80">{ticketingPolicy.refunds}</p>
            <div className="mt-8 max-w-3xl">
              <FAQAccordion items={ticketFaqs} label="Ticket questions" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

async function RegistrationFromQuery({ searchParams }: { searchParams: Promise<{ tier?: string }> }) {
  const { tier } = await searchParams;
  return <RegistrationForm key={tier ?? "general"} initialTier={tier} />;
}
