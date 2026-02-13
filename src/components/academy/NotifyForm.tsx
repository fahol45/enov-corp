"use client";

import { useState } from "react";

type NotifyFormProps = {
  slug: string;
};

type FormState = {
  loading: boolean;
  error: string | null;
  success: string | null;
};

export function NotifyForm({ slug }: NotifyFormProps) {
  const [state, setState] = useState<FormState>({
    loading: false,
    error: null,
    success: null,
  });
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState({ loading: true, error: null, success: null });

    try {
      const response = await fetch("/api/academy/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, ...form }),
      });

      const payload = (await response.json()) as { ok: boolean; message: string };

      if (!response.ok || !payload.ok) {
        setState({
          loading: false,
          error: payload?.message ?? "Une erreur est survenue.",
          success: null,
        });
        return;
      }

      setState({
        loading: false,
        error: null,
        success: payload.message ?? "Nous vous notifierons rapidement.",
      });
      setForm({ name: "", email: "", phone: "" });
    } catch {
      setState({
        loading: false,
        error: "Impossible d'enregistrer votre notification.",
        success: null,
      });
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-5 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
    >
      <div className="space-y-2">
        <h3 className="text-2xl font-semibold text-white">
          Recevoir l'ouverture des inscriptions
        </h3>
        <p className="text-sm text-slate-300">
          Soyez informé dès que la prochaine session est disponible.
        </p>
      </div>

      <label className="flex flex-col gap-2 text-sm text-slate-300">
        Nom complet *
        <input
          name="name"
          value={form.name}
          onChange={onChange}
          required
          className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-[#00a3ff]/60"
          placeholder="Votre nom"
        />
      </label>

      <label className="flex flex-col gap-2 text-sm text-slate-300">
        Email *
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={onChange}
          required
          className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-[#00a3ff]/60"
          placeholder="vous@email.com"
        />
      </label>

      <label className="flex flex-col gap-2 text-sm text-slate-300">
        Téléphone
        <input
          name="phone"
          value={form.phone}
          onChange={onChange}
          className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-[#00a3ff]/60"
          placeholder="+225 ..."
        />
      </label>

      {state.error ? (
        <div className="rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {state.error}
        </div>
      ) : null}

      {state.success ? (
        <div className="rounded-2xl border border-emerald-400/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
          {state.success}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={state.loading}
        className="inline-flex w-full items-center justify-center rounded-full border border-[#00a3ff]/60 bg-[#00a3ff]/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-[#00a3ff] hover:bg-[#00a3ff]/30 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {state.loading ? "Envoi en cours..." : "Me notifier"}
      </button>
    </form>
  );
}
