import { NextResponse } from "next/server";

import { deliverContactMessage } from "@/lib/email/contact";
import { clientAddress, rateLimit, recall, remember } from "@/lib/utils/rate-limit";
import { parseContact } from "@/lib/validation/contact";

const ttlMs = 30 * 60 * 1000;

export async function POST(request: Request) {
  const limit = rateLimit(`contact:${clientAddress(request)}`, 8, 15 * 60 * 1000);
  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, message: "Too many attempts. Wait a little, then try again. Your message is still in the form." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "The message could not be read." }, { status: 400 });
  }

  const parsed = parseContact(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, message: parsed.message, fieldErrors: parsed.fieldErrors }, { status: 400 });
  }

  if (parsed.data.ahfHp.trim()) {
    return NextResponse.json({
      ok: true,
      delivered: false,
      mode: "demonstration",
      message: "Your message was validated on this demonstration site. It was not emailed, because no email service is configured.",
    });
  }

  const memoryKey = `contact:${parsed.data.idempotencyKey}`;
  const existing = recall<{ delivered: boolean; message: string }>(memoryKey);
  if (existing) {
    return NextResponse.json({ ok: true, ...existing });
  }

  const delivery = await deliverContactMessage(parsed.data);
  if (delivery.mode === "error") {
    return NextResponse.json(
      { ok: false, message: "The email service did not accept the message. Your text is still in the form." },
      { status: 502 },
    );
  }

  const message = delivery.delivered
    ? "Your message was sent."
    : "Your message was validated on this demonstration site. It was not emailed, because no email service is configured.";
  const result = { delivered: delivery.delivered, message };
  remember(memoryKey, result, ttlMs);
  return NextResponse.json({ ok: true, mode: delivery.mode, ...result });
}
