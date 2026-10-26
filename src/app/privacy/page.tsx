import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { pageMetadata } from "@/lib/seo/structured-data";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "What the Ahene Fia demonstration forms collect, and what they do not store.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <section className="bg-ivory py-16 sm:py-24">
      <Container className="max-w-3xl">
        <SectionHeading as="h1" overline="Privacy" title="What we ask for, and what we keep." />
        <div className="mt-8 space-y-5 text-base leading-7 text-charcoal/85">
          <p>
            This is a demonstration website. The registration and contact forms ask only for what a real enquiry would need: your name, email, an optional phone number, the nature of the request, and any note about diet or access. Marketing permission is a separate choice.
          </p>
          <p>
            Submissions are validated on the server. Unless an email service is configured, a contact message is not delivered anywhere. A registration is not written to a database. The server keeps an idempotency key in memory so a double-click does not create two receipts. That memory is cleared when the process restarts and is not a booking system.
          </p>
          <p>
            Do not send passport numbers, payment cards, or other information the form does not ask for. Card details are never collected.
          </p>
          <p>
            Server logs should record only whether a request succeeded, not the contents of a message. The in-memory rate limit uses an IP address for a short window and does not build a profile.
          </p>
          <p>
            Before this site is used for a real event, connect a proper store with a retention period, a privacy contact, and a way for someone to ask for their information to be deleted. Those operational details are not invented here.
          </p>
        </div>
      </Container>
    </section>
  );
}
