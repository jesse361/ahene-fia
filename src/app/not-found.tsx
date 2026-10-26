import { Button } from "@/components/shared/Button";
import { Container } from "@/components/shared/Container";

export default function NotFound() {
  return (
    <section className="bg-midnight py-24 text-ivory">
      <Container className="max-w-2xl">
        <p className="text-[0.72rem] uppercase tracking-[0.16em] text-gold">404</p>
        <h1 className="mt-4 font-display text-6xl">This page is not on the programme.</h1>
        <p className="mt-4 text-mist">The link may be old, or the page was never part of the house.</p>
        <div className="mt-8">
          <Button href="/">Return home</Button>
        </div>
      </Container>
    </section>
  );
}
