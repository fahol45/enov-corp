"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";

export type ContactFormCopy = {
  title: string;
  description: string;
  fields: {
    name: { label: string; placeholder: string };
    email: { label: string; placeholder: string };
    phone: { label: string; placeholder: string };
    company: { label: string; placeholder: string };
    message: { label: string; placeholder: string };
  };
  submitLabel: string;
  successMessage: string;
  errorMessage: string;
  requiredLabel: string;
};

type FormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  message: "",
};

type Props = {
  copy: ContactFormCopy;
};

export function ContactForm({ copy }: Props) {
  const [formData, setFormData] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status !== "idle") {
      setStatus("idle");
      setError(null);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload?.message ?? copy.errorMessage);
      }

      setStatus("success");
      setFormData(initialState);
    } catch (submitError) {
      setStatus("error");
      setError(
        submitError instanceof Error ? submitError.message : copy.errorMessage,
      );
    }
  };

  const disabled = status === "loading";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-white/10 bg-slate-950/70 p-8 shadow-inner shadow-black/40"
    >
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.5em] text-slate-400">{copy.title}</p>
        <p className="text-base text-slate-300">{copy.description}</p>
      </div>
      <div className="mt-8 grid gap-5">
        <div className="grid gap-5 lg:grid-cols-2">
          <Field
            id="contact-name"
            name="name"
            type="text"
            label={copy.fields.name.label}
            placeholder={copy.fields.name.placeholder}
            value={formData.name}
            onChange={handleChange}
            required
            requiredLabel={copy.requiredLabel}
          />
          <Field
            id="contact-email"
            name="email"
            type="email"
            label={copy.fields.email.label}
            placeholder={copy.fields.email.placeholder}
            value={formData.email}
            onChange={handleChange}
            required
            requiredLabel={copy.requiredLabel}
          />
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          <Field
            id="contact-phone"
            name="phone"
            type="tel"
            label={copy.fields.phone.label}
            placeholder={copy.fields.phone.placeholder}
            value={formData.phone}
            onChange={handleChange}
          />
          <Field
            id="contact-company"
            name="company"
            type="text"
            label={copy.fields.company.label}
            placeholder={copy.fields.company.placeholder}
            value={formData.company}
            onChange={handleChange}
          />
        </div>
        <div>
          <label
            htmlFor="contact-message"
            className="text-sm font-medium uppercase tracking-[0.3em] text-slate-300"
          >
            {copy.fields.message.label}{" "}
            <span className="text-fuchsia-300">{copy.requiredLabel}</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={5}
            placeholder={copy.fields.message.placeholder}
            className="mt-3 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-fuchsia-400 focus:bg-white/10"
            value={formData.message}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={disabled}
          className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-500 via-emerald-500 to-indigo-500 px-8 py-3 text-sm font-semibold uppercase tracking-widest text-white shadow-lg shadow-fuchsia-500/30 transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {disabled ? `${copy.submitLabel}...` : copy.submitLabel}
        </button>
        <div className="min-h-[1.25rem] text-sm" aria-live="polite">
          {status === "success" && (
            <span className="text-emerald-300">{copy.successMessage}</span>
          )}
          {status === "error" && (
            <span className="text-pink-300">{error ?? copy.errorMessage}</span>
          )}
        </div>
      </div>
    </form>
  );
}

type FieldProps = {
  id: string;
  name: keyof FormState;
  type: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  requiredLabel?: string;
};

function Field({
  id,
  name,
  type,
  label,
  placeholder,
  value,
  onChange,
  required,
  requiredLabel,
}: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="text-sm font-medium uppercase tracking-[0.3em] text-slate-300"
      >
        {label} {required ? <span className="text-fuchsia-300">{requiredLabel}</span> : null}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="mt-3 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-fuchsia-400 focus:bg-white/10"
      />
    </div>
  );
}
