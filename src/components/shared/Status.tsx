import { cn } from "@/lib/utils/cn";

export function EmptyState({ title, body, action }: { title: string; body: string; action?: React.ReactNode }) {
  return (
    <div className="border border-dashed border-charcoal/20 bg-white/60 px-6 py-12 text-center">
      <h3 className="font-display text-3xl text-midnight">{title}</h3>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-charcoal/80">{body}</p>
      {action ? <div className="mt-6 flex justify-center">{action}</div> : null}
    </div>
  );
}

export function LoadingState({ label = "Loading" }: { label?: string }) {
  return (
    <div role="status" className="flex items-center gap-3 text-sm text-charcoal">
      <span className="h-2 w-2 animate-pulse rounded-full bg-gold motion-reduce:animate-none" aria-hidden="true" />
      {label}
    </div>
  );
}

export function ErrorMessage({
  title = "Something went wrong",
  message,
  onRetry,
}: {
  title?: string;
  message: string;
  onRetry?: () => void;
}) {
  return (
    <div role="alert" className="border border-red-900/20 bg-red-50 px-5 py-4 text-red-950">
      <p className="font-semibold">{title}</p>
      <p className="mt-1 text-sm leading-6">{message}</p>
      {onRetry ? (
        <button type="button" onClick={onRetry} className="mt-3 text-sm font-semibold underline underline-offset-4">
          Try again
        </button>
      ) : null}
    </div>
  );
}

export function StatusNote({ tone = "dark", className, children }: { tone?: "dark" | "light"; className?: string; children: React.ReactNode }) {
  return <p className={cn("text-sm leading-6", tone === "light" ? "text-mist" : "text-charcoal/75", className)}>{children}</p>;
}
