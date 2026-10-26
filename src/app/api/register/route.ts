import { NextResponse } from "next/server";

import { getTicket } from "@/data/tickets";
import { submitRegistration } from "@/lib/registration/submit";
import { clientAddress, rateLimit } from "@/lib/utils/rate-limit";
import { parseRegistration } from "@/lib/validation/registration";

export async function POST(request: Request) {
  const limit = rateLimit(`register:${clientAddress(request)}`, 8, 15 * 60 * 1000);
  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, message: "Too many attempts. Wait a little, then try again. Your details are still in the form." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "The submission could not be read." }, { status: 400 });
  }

  const parsed = parseRegistration(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, message: parsed.message, fieldErrors: parsed.fieldErrors }, { status: 400 });
  }

  if (parsed.data.ahfHp.trim()) {
    const tier = getTicket(parsed.data.tierId);
    return NextResponse.json({
      ok: true,
      mode: "demonstration",
      stored: false,
      paid: false,
      reference: "AF-DEMO-RECEIVED",
      tierId: parsed.data.tierId,
      tierName: tier?.name ?? "Ticket",
      quantity: parsed.data.quantity,
      currency: "GHS",
      unitAmount: tier?.price.amount ?? 0,
      totalAmount: (tier?.price.amount ?? 0) * parsed.data.quantity,
      message: "This is a demonstration submission. Nothing was saved to a database, no seat was reserved, and no payment was taken.",
    });
  }

  try {
    const receipt = await submitRegistration(parsed.data);
    return NextResponse.json(receipt);
  } catch (error) {
    console.error("registration_failed", error instanceof Error ? error.name : "unknown");
    return NextResponse.json(
      { ok: false, message: "The registration could not be completed. Your details are still in the form." },
      { status: 500 },
    );
  }
}
