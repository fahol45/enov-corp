"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import styles from "./ContactForm.module.css";

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
      aria-label={copy.title}
      className={styles.form}
    >
      <div className={styles.heading}>
        <p className={styles.title}>{copy.title}</p>
        <p className={styles.description}>{copy.description}</p>
      </div>
      <div className={styles.fields}>
        <div className={styles.row}>
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
        <div className={styles.row}>
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
            className={styles.label}
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
            className={styles.input}
            value={formData.message}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className={styles.submitRow}>
        <button
          type="submit"
          disabled={disabled}
          className={styles.submit}
        >
          {disabled ? `${copy.submitLabel}...` : copy.submitLabel}
        </button>
        <div className={styles.feedback} aria-live="polite">
          {status === "success" && (
            <span className={styles.success}>{copy.successMessage}</span>
          )}
          {status === "error" && (
            <span className={styles.error}>{error ?? copy.errorMessage}</span>
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
        className={styles.label}
      >
        {label} {required ? <span className="text-fuchsia-300">{requiredLabel}</span> : null}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={name === "name" ? "name" : name === "email" ? "email" : name === "phone" ? "tel" : name === "company" ? "organization" : undefined}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={styles.input}
      />
    </div>
  );
}
