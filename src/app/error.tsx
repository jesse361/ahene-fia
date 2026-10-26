"use client";

import { ErrorMessage } from "@/components/shared/Status";
import { Container } from "@/components/shared/Container";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="bg-ivory py-24">
      <Container className="max-w-2xl">
        <h1 className="font-display text-5xl text-midnight">The page could not be shown.</h1>
        <div className="mt-6">
          <ErrorMessage message={error.message || "An unexpected error occurred."} onRetry={reset} />
        </div>
      </Container>
    </section>
  );
}
