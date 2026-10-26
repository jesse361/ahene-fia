"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

import { Field, fieldClass } from "@/components/forms/Field";
import { Button } from "@/components/shared/Button";
import { ErrorMessage } from "@/components/shared/Status";
import { getTicket, ticketTiers } from "@/data/tickets";
import { formatGhs } from "@/lib/utils/money";
import { zodFormResolver } from "@/lib/validation/resolver";
import { registrationFormSchema, type RegistrationFormValues } from "@/lib/validation/registration";
import type { RegistrationReceipt } from "@/lib/registration/submit";
import type { TicketTierId } from "@/types/event";

const tierIds = new Set(ticketTiers.map((tier) => tier.id));

export function RegistrationForm({ initialTier = "general" }: { initialTier?: string }) {
  const tierId: TicketTierId = tierIds.has(initialTier as TicketTierId) ? (initialTier as TicketTierId) : "general";
  const keyRef = useRef("");
  const [step, setStep] = useState<"edit" | "review">("edit");
  const [receipt, setReceipt] = useState<RegistrationReceipt | null>(null);
  const [formError, setFormError] = useState("");
  const {
    register,
    handleSubmit,
    control,
    setError,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormValues>({
    resolver: zodFormResolver(registrationFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      tierId,
      quantity: 1,
      studentInstitution: "",
      dietaryRequirements: "",
      accessibilityRequests: "",
      privacyAccepted: false,
      marketingConsent: false,
      ahfHp: "",
    },
  });

  const selectedTier = useWatch({ control, name: "tierId" });
  const tier = getTicket(selectedTier) ?? ticketTiers[0];

  async function submitRegistration() {
    setFormError("");
    if (!keyRef.current) keyRef.current = crypto.randomUUID();
    const values = getValues();
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, idempotencyKey: keyRef.current }),
      });
      const payload = (await response.json()) as Partial<RegistrationReceipt> & {
        ok?: boolean;
        message?: string;
        fieldErrors?: Record<string, string>;
      };
      if (!response.ok || payload.ok !== true || !payload.reference || !payload.tierName || payload.quantity == null || payload.unitAmount == null || payload.totalAmount == null) {
        if (payload.fieldErrors) {
          for (const [field, message] of Object.entries(payload.fieldErrors)) {
            setError(field as keyof RegistrationFormValues, { message });
          }
          setStep("edit");
        }
        setFormError(payload.message || "The registration could not be completed. Your details are still here.");
        return;
      }
      setReceipt({
        ok: true,
        mode: "demonstration",
        stored: false,
        paid: false,
        reference: payload.reference,
        tierId: payload.tierId ?? values.tierId,
        tierName: payload.tierName,
        quantity: payload.quantity,
        currency: "GHS",
        unitAmount: payload.unitAmount,
        totalAmount: payload.totalAmount,
        message: payload.message ?? "This is a demonstration submission.",
      });
      toast("Demonstration registration checked");
    } catch {
      setFormError("The registration could not be completed. Your details are still here.");
    }
  }

  if (receipt) {
    return (
      <div role="status" className="border border-gold/50 bg-white p-6 sm:p-8">
        <p className="text-[0.72rem] uppercase tracking-[0.16em] text-gold">Demonstration only</p>
        <h2 className="mt-3 font-display text-4xl text-midnight">Reference {receipt.reference}</h2>
        <p className="mt-4 text-sm leading-7 text-charcoal/80">{receipt.message}</p>
        <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-stone">Ticket</dt>
            <dd>{receipt.tierName}</dd>
          </div>
          <div>
            <dt className="text-stone">Quantity</dt>
            <dd>{receipt.quantity}</dd>
          </div>
          <div>
            <dt className="text-stone">Price used by the server</dt>
            <dd>
              {formatGhs(receipt.unitAmount)} each · {formatGhs(receipt.totalAmount)} total
            </dd>
          </div>
          <div>
            <dt className="text-stone">Payment</dt>
            <dd>Not taken</dd>
          </div>
        </dl>
      </div>
    );
  }

  const values = getValues();

  return (
    <div className="border border-charcoal/10 bg-white p-6 sm:p-8">
      <div className="mb-6 flex gap-6 text-[0.72rem] uppercase tracking-[0.16em]">
        <span className={step === "edit" ? "text-gold" : "text-stone"}>1 · Details</span>
        <span className={step === "review" ? "text-gold" : "text-stone"}>2 · Review</span>
      </div>
      {formError ? <div className="mb-5"><ErrorMessage message={formError} /></div> : null}
      {step === "review" ? (
        <div className="space-y-5">
          <h2 className="font-display text-4xl text-midnight">Review before submitting</h2>
          <dl className="grid gap-4 text-sm sm:grid-cols-2">
            <ReviewItem label="Name" value={values.fullName} />
            <ReviewItem label="Email" value={values.email} />
            <ReviewItem label="Phone" value={values.phone || "Not provided"} />
            <ReviewItem label="Ticket" value={tier.name} />
            <ReviewItem label="Quantity" value={String(values.quantity)} />
            <ReviewItem label="Server price" value={`${formatGhs(tier.price.amount)} each`} />
            {values.tierId === "student" ? <ReviewItem label="Institution" value={values.studentInstitution} /> : null}
            <ReviewItem label="Dietary note" value={values.dietaryRequirements || "None"} />
            <ReviewItem label="Access note" value={values.accessibilityRequests || "None"} />
            <ReviewItem label="Updates" value={values.marketingConsent ? "Yes, optional updates" : "No marketing"} />
          </dl>
          <p className="text-sm leading-6 text-charcoal/80">
            Submitting checks this request on the server. It will not charge you, reserve a seat, or store the details in a database.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button type="button" variant="line" onClick={() => setStep("edit")}>
              Back to details
            </Button>
            <Button type="button" onClick={submitRegistration} disabled={isSubmitting}>
              {isSubmitting ? "Submitting" : "Submit registration"}
            </Button>
          </div>
        </div>
      ) : (
        <form
          noValidate
          className="space-y-5"
          onSubmit={handleSubmit(() => {
            setFormError("");
            setStep("review");
          })}
        >
          <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
            <label htmlFor="registration-website">Leave this blank</label>
            <input id="registration-website" tabIndex={-1} autoComplete="off" {...register("ahfHp")} />
          </div>
          <Field label="Full name" htmlFor="reg-name" error={errors.fullName?.message}>
            <input className={fieldClass} autoComplete="name" {...register("fullName")} />
          </Field>
          <Field label="Email" htmlFor="reg-email" error={errors.email?.message}>
            <input className={fieldClass} type="email" autoComplete="email" {...register("email")} />
          </Field>
          <Field label="Phone (optional)" htmlFor="reg-phone" error={errors.phone?.message}>
            <input className={fieldClass} type="tel" autoComplete="tel" {...register("phone")} />
          </Field>
          <Field label="Ticket" htmlFor="reg-tier" error={errors.tierId?.message}>
            <select className={fieldClass} {...register("tierId")}>
              {ticketTiers.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} · {formatGhs(item.price.amount)}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Quantity" htmlFor="reg-quantity" error={errors.quantity?.message} hint={`Up to ${tier.maxPerOrder} for ${tier.name}.`}>
            <input className={fieldClass} type="number" min={1} max={tier.maxPerOrder} {...register("quantity", { valueAsNumber: true })} />
          </Field>
          {selectedTier === "student" ? (
            <Field
              label="Student institution"
              htmlFor="reg-institution"
              error={errors.studentInstitution?.message}
              hint="For the shape of a future verification step. This demonstration does not check enrolment."
            >
              <input className={fieldClass} {...register("studentInstitution")} />
            </Field>
          ) : null}
          <Field label="Dietary requirements (optional)" htmlFor="reg-diet" error={errors.dietaryRequirements?.message}>
            <textarea className={`${fieldClass} h-24 py-3`} {...register("dietaryRequirements")} />
          </Field>
          <Field label="Access requests (optional)" htmlFor="reg-access" error={errors.accessibilityRequests?.message}>
            <textarea className={`${fieldClass} h-24 py-3`} {...register("accessibilityRequests")} />
          </Field>
          <div>
            <label className="flex items-start gap-3 text-sm leading-6">
              <input type="checkbox" className="mt-1" {...register("privacyAccepted")} />
              <span>
                I acknowledge the <Link href="/privacy" className="underline">privacy notice</Link>. Required.
              </span>
            </label>
            {errors.privacyAccepted ? <p className="mt-2 text-sm text-red-900">{errors.privacyAccepted.message}</p> : null}
          </div>
          <label className="flex items-start gap-3 text-sm leading-6">
            <input type="checkbox" className="mt-1" {...register("marketingConsent")} />
            <span>Send occasional updates about Ahene Fia. Optional, and separate from the registration.</span>
          </label>
          <Button type="submit">Review registration</Button>
        </form>
      )}
    </div>
  );
}

function ReviewItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-stone">{label}</dt>
      <dd className="text-midnight">{value}</dd>
    </div>
  );
}
