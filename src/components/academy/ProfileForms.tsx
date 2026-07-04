"use client";

import { useState } from "react";
import Link from "next/link";
import { createSupabaseBrowserClient } from "@/lib/supabase/auth-browser";
import type { User } from "@supabase/supabase-js";

type Props = { user: User; enrollmentCount: number };

/* ── Small reusable pieces ── */
function FormCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#0d0d1a] overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-4 border-b border-white/[0.06]">
        <span className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-slate-400">
          {icon}
        </span>
        <h2 className="text-sm font-bold text-white">{title}</h2>
      </div>
      <div className="px-6 py-5">{children}</div>
    </div>
  );
}

function StatusMsg({
  ok,
  msg,
}: {
  ok: boolean;
  msg: string;
}) {
  return (
    <p
      className={`text-xs font-medium flex items-center gap-1.5 ${
        ok ? "text-emerald-400" : "text-red-400"
      }`}
    >
      {ok ? (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      )}
      {msg}
    </p>
  );
}

function Input({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[0.7rem] font-semibold text-slate-500 uppercase tracking-widest">
        {label}
      </label>
      <input
        {...props}
        className="w-full bg-[#09090f] border border-white/[0.08] focus:border-fuchsia-500/50 rounded-xl text-sm text-white placeholder:text-slate-700 px-4 py-2.5 outline-none transition-colors"
      />
    </div>
  );
}

function SaveButton({ loading }: { loading: boolean }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="inline-flex items-center gap-2 bg-[var(--accent)] hover:bg-fuchsia-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-[0_0_20px_var(--accent-glow)]"
    >
      {loading && (
        <svg className="animate-spin" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M21 12a9 9 0 1 1-6.22-8.56" />
        </svg>
      )}
      Sauvegarder
    </button>
  );
}

/* ── Name section ── */
function NameSection({ initialName }: { initialName: string }) {
  const [name,    setName]    = useState(initialName);
  const [loading, setLoading] = useState(false);
  const [status,  setStatus]  = useState<{ ok: boolean; msg: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    const trimmed = name.trim();
    if (!trimmed) { setStatus({ ok: false, msg: "Le prénom ne peut pas être vide." }); return; }
    setLoading(true);
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.updateUser({ data: { first_name: trimmed } });
    setLoading(false);
    if (error) setStatus({ ok: false, msg: error.message });
    else       setStatus({ ok: true,  msg: "Prénom mis à jour avec succès." });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Prénom"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Votre prénom"
        maxLength={50}
        autoComplete="given-name"
      />
      <div className="flex items-center gap-4">
        <SaveButton loading={loading} />
        {status && <StatusMsg ok={status.ok} msg={status.msg} />}
      </div>
    </form>
  );
}

/* ── Email section ── */
function EmailSection({ initialEmail }: { initialEmail: string }) {
  const [email,   setEmail]   = useState(initialEmail);
  const [loading, setLoading] = useState(false);
  const [status,  setStatus]  = useState<{ ok: boolean; msg: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    const trimmed = email.trim().toLowerCase();
    if (!trimmed) { setStatus({ ok: false, msg: "L'adresse email ne peut pas être vide." }); return; }
    if (trimmed === initialEmail) { setStatus({ ok: false, msg: "C'est déjà votre adresse email." }); return; }
    setLoading(true);
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.updateUser({ email: trimmed });
    setLoading(false);
    if (error) setStatus({ ok: false, msg: error.message });
    else       setStatus({ ok: true,  msg: "Un lien de confirmation a été envoyé à votre nouvelle adresse." });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Adresse email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="votre@email.com"
        autoComplete="email"
      />
      <p className="text-[0.65rem] text-slate-600 leading-relaxed">
        Un email de confirmation sera envoyé à la nouvelle adresse. Votre adresse actuelle reste active jusqu&apos;à confirmation.
      </p>
      <div className="flex items-center gap-4">
        <SaveButton loading={loading} />
        {status && <StatusMsg ok={status.ok} msg={status.msg} />}
      </div>
    </form>
  );
}

/* ── Password section ── */
function PasswordSection() {
  const [newPw,    setNewPw]    = useState("");
  const [confirm,  setConfirm]  = useState("");
  const [loading,  setLoading]  = useState(false);
  const [status,   setStatus]   = useState<{ ok: boolean; msg: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    if (newPw.length < 8)  { setStatus({ ok: false, msg: "Le mot de passe doit contenir au moins 8 caractères." }); return; }
    if (newPw !== confirm)  { setStatus({ ok: false, msg: "Les mots de passe ne correspondent pas." }); return; }
    setLoading(true);
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.updateUser({ password: newPw });
    setLoading(false);
    if (error) setStatus({ ok: false, msg: error.message });
    else {
      setStatus({ ok: true, msg: "Mot de passe modifié avec succès." });
      setNewPw("");
      setConfirm("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Nouveau mot de passe"
        type="password"
        value={newPw}
        onChange={(e) => setNewPw(e.target.value)}
        placeholder="8 caractères minimum"
        autoComplete="new-password"
      />
      <Input
        label="Confirmer le mot de passe"
        type="password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        placeholder="Répéter le mot de passe"
        autoComplete="new-password"
      />
      {/* Strength bar */}
      {newPw.length > 0 && (
        <div className="space-y-1">
          <div className="flex gap-1">
            {[1, 2, 3, 4].map((i) => {
              const strength =
                newPw.length < 8 ? 1 :
                newPw.length < 12 ? 2 :
                /[^a-zA-Z0-9]/.test(newPw) ? 4 : 3;
              return (
                <div
                  key={i}
                  className="flex-1 h-1 rounded-full transition-all duration-300"
                  style={{
                    background:
                      i <= strength
                        ? strength === 1 ? "#ef4444"
                          : strength === 2 ? "#f59e0b"
                          : strength === 3 ? "#22d3ee"
                          : "#4ade80"
                        : "rgba(255,255,255,0.06)",
                  }}
                />
              );
            })}
          </div>
          <p className="text-[0.62rem] text-slate-600">
            {newPw.length < 8 ? "Trop court" :
             newPw.length < 12 ? "Correct" :
             /[^a-zA-Z0-9]/.test(newPw) ? "Très fort" : "Fort"}
          </p>
        </div>
      )}
      <div className="flex items-center gap-4">
        <SaveButton loading={loading} />
        {status && <StatusMsg ok={status.ok} msg={status.msg} />}
      </div>
    </form>
  );
}

/* ── Main export ── */
export function ProfileForms({ user, enrollmentCount }: Props) {
  const firstName = (user.user_metadata?.first_name as string | undefined) ?? user.email?.split("@")[0] ?? "Moi";
  const email     = user.email ?? "";
  const initial   = firstName[0]?.toUpperCase() ?? "?";
  const memberSince = new Date(user.created_at).toLocaleDateString("fr-FR", {
    month: "long",
    year:  "numeric",
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8">

      {/* ── Breadcrumb ── */}
      <div className="flex items-center gap-2">
        <Link href="/mon-espace" className="text-xs text-slate-600 hover:text-slate-400 transition flex items-center gap-1.5">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Mon espace
        </Link>
        <span className="text-slate-800 text-xs">/</span>
        <span className="text-xs text-slate-500">Mon profil</span>
      </div>

      {/* ── Header ── */}
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">Mon profil</h1>
        <p className="text-sm text-slate-500 mt-1">Gérez vos informations personnelles et votre sécurité.</p>
      </div>

      <div className="grid xl:grid-cols-[280px_1fr] gap-6">

        {/* ── Left: identity card ── */}
        <div className="space-y-4">
          {/* Avatar card */}
          <div className="rounded-2xl border border-white/[0.07] bg-[#0d0d1a] p-6 flex flex-col items-center text-center gap-4">
            <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-fuchsia-600 to-violet-700 flex items-center justify-center text-3xl font-black text-white shadow-[0_0_32px_rgba(192,38,211,0.35)]">
              {initial}
            </div>
            <div>
              <p className="font-bold text-white text-base">{firstName}</p>
              <p className="text-xs text-slate-500 mt-0.5 break-all">{email}</p>
            </div>
            <div className="w-full h-px bg-white/[0.05]" />
            <div className="w-full grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-white/[0.025] border border-white/[0.05] py-3 px-2 text-center">
                <p className="text-lg font-black text-white">{enrollmentCount}</p>
                <p className="text-[0.6rem] uppercase tracking-widest text-slate-600 mt-0.5">Sessions</p>
              </div>
              <div className="rounded-xl bg-white/[0.025] border border-white/[0.05] py-3 px-2 text-center">
                <p className="text-[0.68rem] font-bold text-white leading-tight">{memberSince}</p>
                <p className="text-[0.6rem] uppercase tracking-widest text-slate-600 mt-0.5">Depuis</p>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div className="rounded-2xl border border-white/[0.07] bg-[#0d0d1a] overflow-hidden">
            <Link href="/mon-espace" className="flex items-center gap-3 px-4 py-3 text-sm text-slate-400 hover:bg-white/[0.04] hover:text-white transition group">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
              <span className="flex-1">Mon espace</span>
              <span className="text-slate-700 group-hover:text-slate-500 transition text-xs">→</span>
            </Link>
            <div className="h-px bg-white/[0.04]" />
            <Link href="/academy" className="flex items-center gap-3 px-4 py-3 text-sm text-slate-400 hover:bg-white/[0.04] hover:text-white transition group">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
              <span className="flex-1">Formations</span>
              <span className="text-slate-700 group-hover:text-slate-500 transition text-xs">→</span>
            </Link>
          </div>
        </div>

        {/* ── Right: forms ── */}
        <div className="space-y-4">
          <FormCard
            title="Informations personnelles"
            icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
              </svg>
            }
          >
            <NameSection initialName={firstName} />
          </FormCard>

          <FormCard
            title="Adresse email"
            icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m2 7 10 7 10-7" />
              </svg>
            }
          >
            <EmailSection initialEmail={email} />
          </FormCard>

          <FormCard
            title="Sécurité — Mot de passe"
            icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            }
          >
            <PasswordSection />
          </FormCard>
        </div>
      </div>
    </div>
  );
}
