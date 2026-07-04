"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/auth-browser";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const supabase = createSupabaseBrowserClient();
    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: { first_name: form.firstName, last_name: form.lastName },
      },
    });
    if (error) {
      const knownMessages: Record<string, string> = {
        "User already registered": "Cet email est déjà utilisé. Connecte-toi ou utilise un autre email.",
        "Invalid login credentials": "Email ou mot de passe incorrect.",
        "Email rate limit exceeded": "Trop de tentatives. Réessaie dans quelques minutes.",
        "Password should be at least 6 characters": "Le mot de passe doit faire au moins 6 caractères.",
      };
      const msg = knownMessages[error.message] ?? error.message ?? "Une erreur est survenue. Réessaie.";
      setError(msg);
      setLoading(false);
      return;
    }
    if (data.session === null) {
      setEmailSent(true);
      setLoading(false);
      return;
    }
    router.push("/mon-espace");
    router.refresh();
  };

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const header = (
    <div className="text-center mb-8">
      <Link href="/" className="inline-block mb-6">
        <span className="text-2xl font-black tracking-tight text-white">ENOV<span className="text-fuchsia-400">.</span></span>
      </Link>
      <h1 className="text-2xl font-bold text-white">Créer un compte</h1>
      <p className="text-slate-400 text-sm mt-1">Rejoins l&apos;Academy Enov</p>
    </div>
  );

  if (emailSent) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {header}
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-8 text-center space-y-4">
            <div className="text-4xl">📧</div>
            <h2 className="text-white font-bold text-lg">Confirme ton adresse email</h2>
            <p className="text-slate-400 text-sm">
              Un lien de confirmation a été envoyé à{" "}
              <strong className="text-white">{form.email}</strong>.<br />
              Clique sur le lien dans l&apos;email pour activer ton compte.
            </p>
            <Link href="/auth/login" className="inline-block text-fuchsia-400 text-sm hover:text-fuchsia-300 transition">
              Retour à la connexion →
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {header}
        <form onSubmit={handleSubmit} className="bg-slate-900 border border-white/10 rounded-2xl p-8 space-y-5">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-3">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-widest text-slate-400">Prénom</label>
              <input
                type="text"
                value={form.firstName}
                onChange={set("firstName")}
                required
                placeholder="Prénom"
                className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-fuchsia-500 transition"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-widest text-slate-400">Nom</label>
              <input
                type="text"
                value={form.lastName}
                onChange={set("lastName")}
                required
                placeholder="Nom"
                className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-fuchsia-500 transition"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-widest text-slate-400">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={set("email")}
              required
              placeholder="ton@email.com"
              className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-fuchsia-500 transition"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-widest text-slate-400">Mot de passe</label>
            <input
              type="password"
              value={form.password}
              onChange={set("password")}
              required
              minLength={6}
              placeholder="6 caractères minimum"
              className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-fuchsia-500 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-fuchsia-600 hover:bg-fuchsia-500 disabled:opacity-50 text-white font-semibold rounded-xl py-3 transition text-sm"
          >
            {loading ? "Création..." : "Créer mon compte"}
          </button>

          <p className="text-center text-sm text-slate-500">
            Déjà un compte ?{" "}
            <Link href="/auth/login" className="text-fuchsia-400 hover:text-fuchsia-300 transition">
              Se connecter
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
