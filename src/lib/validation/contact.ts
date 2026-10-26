import { z } from "zod";

import { fieldErrorsFromZod } from "@/lib/validation/registration";
import type { ContactSubmission } from "@/types/event";

const contactFields = z.object({
  fullName: z.string().trim().min(2, "Enter your full name.").max(120, "Use 120 characters or fewer."),
  email: z.email("Enter a valid email address."),
  category: z.enum(["general", "sponsorship", "speaker", "media", "group", "planning"], {
    error: "Choose an enquiry type.",
  }),
  subject: z.string().trim().min(3, "Add a short subject.").max(140, "Use 140 characters or fewer."),
  message: z
    .string()
    .trim()
    .min(20, "Write at least a few sentences so we can respond.")
    .max(4000, "Use 4000 characters or fewer."),
  privacyAccepted: z.boolean().refine((value) => value, "Please acknowledge the privacy notice."),
  ahfHp: z.string().max(200),
});

export const contactFormSchema = contactFields;

export const contactSchema = contactFields.extend({
  idempotencyKey: z.uuid("Submit the form again so we can protect it from a duplicate."),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export function parseContact(input: unknown):
  | { success: true; data: ContactSubmission }
  | { success: false; fieldErrors: Record<string, string>; message: string } {
  const result = contactSchema.safeParse(input);
  if (result.success) return { success: true, data: result.data };
  return {
    success: false,
    fieldErrors: fieldErrorsFromZod(result.error.issues),
    message: "Check the highlighted fields and try again.",
  };
}
