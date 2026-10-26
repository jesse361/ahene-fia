export function AddToCalendar({ sessionId, label = "Add to calendar" }: { sessionId?: string; label?: string }) {
  const href = sessionId ? `/api/calendar?session=${encodeURIComponent(sessionId)}` : "/api/calendar";
  return (
    <a href={href} className="text-sm font-semibold text-forest underline decoration-gold underline-offset-4">
      {label}
    </a>
  );
}
