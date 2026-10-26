"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Field, fieldClass } from "@/components/forms/Field";
import { Button } from "@/components/shared/Button";
import { ErrorMessage } from "@/components/shared/Status";
import { enquiryCategories } from "@/data/content";
import { zodFormResolver } from "@/lib/validation/resolver";
import { contactFormSchema, type ContactFormValues } from "@/lib/validation/contact";
import type { EnquiryCategory } from "@/types/event";

type ContactSuccess = {
  delivered: boolean;
  message: string;
};

const categories = new Set(enquiryCategories.map((item) => item.id));

export function ContactForm({ initialCategory = "general" }: { initialCategory?: string }) {
  const category = categories.has(initialCategory as EnquiryCategory) ? (initialCategory as EnquiryCategory) : "general";
  const [success, setSuccess] = useState<ContactSuccess | null>(null);
  const [formError, setFormError] = useState("");
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodFormResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      category,
      subject: "",
      message: "",
      privacyAccepted: false,
      ahfHp: "",
    },
  });

  async function onSubmit(values: ContactFormValues, event?: React.BaseSyntheticEvent) {
    setFormError("");
    const form = event?.currentTarget;
    const key = form instanceof HTMLFormElement ? (form.dataset.idempotencyKey ||= crypto.randomUUID()) : crypto.randomUUID();
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, idempotencyKey: key }),
      });
      const payload = (await response.json()) as ContactSuccess & {
        ok: boolean;
        message: string;
        fieldErrors?: Record<string, string>;
      };
      if (!response.ok || !payload.ok) {
        if (payload.fieldErrors) {
          for (const [field, message] of Object.entries(payload.fieldErrors)) {
            setError(field as keyof ContactFormValues, { message });
          }
        }
        setFormError(payload.message || "The message could not be sent. Your text is still in the form.");
        return;
      }
      setSuccess({ delivered: payload.delivered, message: payload.message });
      toast(payload.delivered ? "Message sent" : "Message checked");
    } catch {
      setFormError("The message could not be sent. Your text is still in the form.");
    }
  }

  if (success) {
    return (
      <div role="status" className="border border-gold/50 bg-white p-6 sm:p-8">
        <p className="text-[0.72rem] uppercase tracking-[0.16em] text-gold">{success.delivered ? "Sent" : "Demonstration"}</p>
        <h2 className="mt-3 font-display text-4xl text-midnight">Thank you for writing.</h2>
        <p className="mt-4 text-sm leading-7 text-charcoal/80">{success.message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5 border border-charcoal/10 bg-white p-6 sm:p-8">
      {formError ? <ErrorMessage message={formError} /> : null}
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="ahfHp">Leave this blank</label>
        <input id="ahfHp" tabIndex={-1} autoComplete="off" {...register("ahfHp")} />
      </div>
      <Field label="Full name" htmlFor="contact-name" error={errors.fullName?.message}>
        <input className={fieldClass} autoComplete="name" {...register("fullName")} />
      </Field>
      <Field label="Email" htmlFor="contact-email" error={errors.email?.message}>
        <input className={fieldClass} type="email" autoComplete="email" {...register("email")} />
      </Field>
      <Field label="Enquiry" htmlFor="contact-category" error={errors.category?.message}>
        <select className={fieldClass} {...register("category")}>
          {enquiryCategories.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Subject" htmlFor="contact-subject" error={errors.subject?.message}>
        <input className={fieldClass} {...register("subject")} />
      </Field>
      <Field label="Message" htmlFor="contact-message" error={errors.message?.message}>
        <textarea className={`${fieldClass} h-36 py-3`} {...register("message")} />
      </Field>
      <div>
        <label className="flex items-start gap-3 text-sm leading-6 text-charcoal">
          <input type="checkbox" className="mt-1" {...register("privacyAccepted")} />
          <span>I have read the privacy notice and agree to this message being used to respond to my enquiry.</span>
        </label>
        {errors.privacyAccepted ? <p className="mt-2 text-sm text-red-900">{errors.privacyAccepted.message}</p> : null}
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending" : "Send message"}
      </Button>
    </form>
  );
}
