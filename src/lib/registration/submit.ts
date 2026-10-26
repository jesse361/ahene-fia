import { getTicket } from "@/data/tickets";
import { recall, remember } from "@/lib/utils/rate-limit";
import type { RegistrationInput } from "@/types/event";

export type RegistrationReceipt = {
  ok: true;
  mode: "demonstration";
  stored: false;
  paid: false;
  reference: string;
  tierId: RegistrationInput["tierId"];
  tierName: string;
  quantity: number;
  currency: "GHS";
  unitAmount: number;
  totalAmount: number;
  message: string;
};

const TTL_MS = 30 * 60 * 1000;

function referenceCode(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = crypto.getRandomValues(new Uint8Array(6));
  let code = "";
  for (const byte of bytes) code += alphabet[byte % alphabet.length];
  return `AF-DEMO-${code}`;
}

/**
 * Demonstration adapter. Successful validation returns a receipt and keeps only
 * the idempotency key in process memory. The submission is not written to a
 * database and no payment is taken.
 *
 * To persist registrations, replace this function with a server-side write to
 * your database and return stored: true only after that write succeeds.
 * Charge tickets through a payment provider on the server. Never accept a
 * price or card number from the browser.
 */
export async function submitRegistration(input: RegistrationInput): Promise<RegistrationReceipt> {
  const existing = recall<RegistrationReceipt>(`registration:${input.idempotencyKey}`);
  if (existing) return existing;

  const tier = getTicket(input.tierId);
  if (!tier) {
    throw new Error("Ticket tier disappeared after validation.");
  }

  const receipt: RegistrationReceipt = {
    ok: true,
    mode: "demonstration",
    stored: false,
    paid: false,
    reference: referenceCode(),
    tierId: tier.id,
    tierName: tier.name,
    quantity: input.quantity,
    currency: tier.price.currency,
    unitAmount: tier.price.amount,
    totalAmount: tier.price.amount * input.quantity,
    message:
      "This is a demonstration submission. Nothing was saved to a database, no seat was reserved, and no payment was taken.",
  };

  remember(`registration:${input.idempotencyKey}`, receipt, TTL_MS);
  return receipt;
}
