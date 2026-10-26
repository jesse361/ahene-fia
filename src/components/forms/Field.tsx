import { cloneElement, isValidElement } from "react";

import { cn } from "@/lib/utils/cn";

type ControlProps = {
  id?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
};

type FieldProps = {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  children: React.ReactElement<ControlProps>;
};

export function Field({ label, htmlFor, error, hint, children }: FieldProps) {
  const errorId = `${htmlFor}-error`;
  const hintId = `${htmlFor}-hint`;
  const describedBy = [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(" ") || undefined;
  const control = isValidElement(children)
    ? cloneElement(children, {
        id: htmlFor,
        "aria-describedby": describedBy,
        "aria-invalid": error ? true : undefined,
      })
    : children;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-sm font-medium text-midnight">
        {label}
      </label>
      <div className={cn(error && "[&_input]:border-red-800 [&_select]:border-red-800 [&_textarea]:border-red-800")}>{control}</div>
      {hint ? (
        <p id={hintId} className="text-xs leading-5 text-charcoal/70">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="text-sm text-red-900">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export const fieldClass = "h-12 w-full border border-charcoal/15 bg-white px-3 text-sm text-midnight outline-none";
