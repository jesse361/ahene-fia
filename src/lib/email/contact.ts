import type { ContactSubmission } from "@/types/event";

export type EmailDelivery =
  | { delivered: true; mode: "live"; provider: "resend"; id: string }
  | { delivered: false; mode: "demonstration"; reason: "email_not_configured" }
  | { delivered: false; mode: "error"; reason: "provider_rejected" | "provider_unreachable" };

type EmailConfig = { apiKey: string; to: string; from: string };

function emailConfig(): EmailConfig | null {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) return null;
  return { apiKey, to, from };
}

/**
 * Sends mail only when RESEND_API_KEY, CONTACT_TO_EMAIL, and CONTACT_FROM_EMAIL
 * are all set. Otherwise the caller must tell the visitor that nothing was emailed.
 * Swap the body of this function to use another provider. Keep the API key on the server.
 */
export async function deliverContactMessage(submission: ContactSubmission): Promise<EmailDelivery> {
  const config = emailConfig();
  if (!config) return { delivered: false, mode: "demonstration", reason: "email_not_configured" };

  const text = [
    `Name: ${submission.fullName}`,
    `Email: ${submission.email}`,
    `Category: ${submission.category}`,
    `Subject: ${submission.subject}`,
    "",
    submission.message,
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: config.from,
        to: [config.to],
        reply_to: submission.email,
        subject: `[Ahene Fia] ${submission.subject}`,
        text,
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return { delivered: false, mode: "error", reason: "provider_rejected" };
    const payload = (await response.json()) as { id?: string };
    if (!payload.id) return { delivered: false, mode: "error", reason: "provider_rejected" };
    return { delivered: true, mode: "live", provider: "resend", id: payload.id };
  } catch {
    return { delivered: false, mode: "error", reason: "provider_unreachable" };
  }
}
