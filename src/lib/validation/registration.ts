import { z } from "zod";

import { maxTicketsPerOrder, getTicket } from "@/data/tickets";
import type { RegistrationInput } from "@/types/event";

const registrationFields = z.object({
  fullName: z.string().trim().min(2, "Enter your full name.").max(120, "Use 120 characters or fewer."),
  email: z.email("Enter a valid email address."),
  phone: z
    .string()
    .trim()
    .max(30, "Use 30 characters or fewer.")
    .refine((value) => value === "" || /^[+0-9()\-\s]{7,30}$/.test(value), "Enter a valid phone number or leave this blank."),
  tierId: z.enum(["general", "vip", "student"], { error: "Choose a ticket." }),
  quantity: z
    .number({ error: "Choose how many tickets." })
    .int("Choose a whole number of tickets.")
    .min(1, "Choose at least one ticket.")
    .max(maxTicketsPerOrder, `You can request up to ${maxTicketsPerOrder} tickets.`),
  studentInstitution: z.string().trim().max(160, "Use 160 characters or fewer."),
  dietaryRequirements: z.string().trim().max(400, "Use 400 characters or fewer."),
  accessibilityRequests: z.string().trim().max(400, "Use 400 characters or fewer."),
  privacyAccepted: z.boolean().refine((value) => value, "Please acknowledge the privacy notice."),
  marketingConsent: z.boolean(),
  ahfHp: z.string().max(200),
});

function refineRegistration(value: z.infer<typeof registrationFields>, context: z.RefinementCtx) {
  const tier = getTicket(value.tierId);
  if (!tier) {
    context.addIssue({ code: "custom", path: ["tierId"], message: "Choose a ticket." });
    return;
  }
  if (value.quantity > tier.maxPerOrder) {
    context.addIssue({
      code: "custom",
      path: ["quantity"],
      message: `${tier.name} can be requested up to ${tier.maxPerOrder} at a time.`,
    });
  }
  if (value.tierId === "student" && value.studentInstitution.length < 2) {
    context.addIssue({
      code: "custom",
      path: ["studentInstitution"],
      message: "Enter the institution a student pass would be checked against.",
    });
  }
}

export const registrationFormSchema = registrationFields.superRefine(refineRegistration);

export const registrationSchema = registrationFields
  .extend({
    idempotencyKey: z.uuid("Submit the form again so we can protect it from a duplicate."),
  })
  .superRefine(refineRegistration);

export type RegistrationFormValues = z.infer<typeof registrationFormSchema>;

export function parseRegistration(input: unknown):
  | { success: true; data: RegistrationInput }
  | { success: false; fieldErrors: Record<string, string>; message: string } {
  const result = registrationSchema.safeParse(input);
  if (result.success) return { success: true, data: result.data };
  return {
    success: false,
    fieldErrors: fieldErrorsFromZod(result.error.issues),
    message: "Check the highlighted fields and try again.",
  };
}

export function fieldErrorsFromZod(issues: { path: PropertyKey[]; message: string }[]): Record<string, string> {
  const fieldErrors: Record<string, string> = {};
  for (const issue of issues) {
    const key = issue.path.map(String).join(".");
    if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
  }
  return fieldErrors;
}
