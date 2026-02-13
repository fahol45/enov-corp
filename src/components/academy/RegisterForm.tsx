"use client";

import { useState } from "react";

type RegisterFormProps = {
  slug: string;
};

type FormState = {
  loading: boolean;
  error: string | null;
  success: string | null;
};

export function RegisterForm({ slug }: RegisterFormProps) {
  const [state, setState] = useState<FormState>({
    loading: false,
    error: null,
    success: null,
  });
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    profile: "",
    message: "",
  });

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState({ loading: true, error: null, success: null });

    try {
      const response = await fetch("/api/academy/register", {
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
        success: payload.message ?? "Inscription enregistrée.",
      });
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        city: "",
        profile: "",
        message: "",
      });
    } catch {
      setState({
        loading: false,
        error: "Impossible de soumettre votre inscription.",
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
          Inscription à la formation
        </h3>
        <p className="text-sm text-slate-300">
          Laissez vos informations, notre équipe vous recontacte rapidement.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm text-slate-300">
          Prénom *
          <input
            name="firstName"
            value={form.firstName}
            onChange={onChange}
            required
            className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-[#00a3ff]/60"
            placeholder="Votre prénom"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-slate-300">
          Nom *
          <input
            name="lastName"
            value={form.lastName}
            onChange={onChange}
            required
            className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-[#00a3ff]/60"
            placeholder="Votre nom"
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
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
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm text-slate-300">
          Ville
          <input
            name="city"
            value={form.city}
            onChange={onChange}
            className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-[#00a3ff]/60"
            placeholder="Abidjan"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-slate-300">
          Profil
          <select
            name="profile"
            value={form.profile}
            onChange={onChange}
            className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-[#00a3ff]/60"
          >
            <option value="">Sélectionner</option>
            <option value="Étudiant">Étudiant</option>
            <option value="Professionnel">Professionnel</option>
            <option value="Entreprise">Entreprise</option>
            <option value="Autre">Autre</option>
          </select>
        </label>
      </div>

      <label className="flex flex-col gap-2 text-sm text-slate-300">
        Message
        <textarea
          name="message"
          value={form.message}
          onChange={onChange}
          rows={4}
          className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-[#00a3ff]/60"
          placeholder="Vos objectifs, contraintes, questions..."
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
        className="inline-flex w-full items-center justify-center rounded-full border border-[#ec008c]/60 bg-[#ec008c]/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-[#ec008c] hover:bg-[#ec008c]/30 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {state.loading ? "Envoi en cours..." : "Envoyer ma demande"}
      </button>
    </form>
  );
}
