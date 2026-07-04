"use client";

import Link from "next/link";
import { useState } from "react";

type Session = {
  id: string;
  title: string;
  scheduled_at: string;
  duration_minutes: number;
  max_participants: number;
  status: "upcoming" | "live" | "ended";
  enrollments?: { count: number }[];
};

type Props = {
  sessions: Session[];
  trainingSlug: string;
  trainingStatus?: string;
  userLoggedIn?: boolean;
  enrolledSessionIds?: string[];
};

export function SessionsSection({ sessions, trainingSlug, trainingStatus, userLoggedIn = false, enrolledSessionIds = [] }: Props) {
  const upcoming = sessions.filter((s) => s.status !== "ended");
  const [localEnrolled, setLocalEnrolled] = useState<Set<string>>(new Set(enrolledSessionIds));
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [feedbackId, setFeedbackId] = useState<{ id: string; msg: string; ok: boolean } | null>(null);

  if (upcoming.length === 0) return null;

  const handleEnroll = async (sessionId: string) => {
    setLoadingId(sessionId);
    setFeedbackId(null);
    try {
      const r = await fetch(`/api/academy/sessions/${sessionId}/enroll`, { method: "POST" });
      const d = await r.json() as { ok: boolean; message?: string };
      if (d.ok) {
        setLocalEnrolled((prev) => new Set([...prev, sessionId]));
        setFeedbackId({ id: sessionId, msg: "Inscription confirmée ! Retrouve ta session dans Mon Espace.", ok: true });
      } else {
        setFeedbackId({ id: sessionId, msg: d.message ?? "Erreur lors de l'inscription.", ok: false });
      }
    } catch {
      setFeedbackId({ id: sessionId, msg: "Erreur réseau — réessaie.", ok: false });
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <section id="sessions" className="scroll-mt-24 border border-white/10 rounded-2xl p-6 bg-slate-900/60">
      <h2 className="text-xl font-bold mb-2 text-white">Sessions disponibles</h2>
      <p className="text-slate-400 text-sm mb-5">
        {userLoggedIn
          ? "Clique sur S'inscrire pour rejoindre une session. Tu retrouveras ta session dans Mon Espace."
          : "Connecte-toi pour t'inscrire à une session ou laisse tes coordonnées ci-dessous."}
      </p>
      <div className="space-y-3">
        {upcoming.map((s) => {
          const date = new Date(s.scheduled_at);
          const dateStr = date.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
          const timeStr = date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
          const spotsUsed = s.enrollments?.[0]?.count ?? 0;
          const spotsLeft = s.max_participants - spotsUsed;
          const isFull = spotsLeft <= 0;
          const isLive = s.status === "live";
          const isEnrolledHere = localEnrolled.has(s.id);
          const isLoading = loadingId === s.id;
          const sessionFeedback = feedbackId?.id === s.id ? feedbackId : null;

          return (
            <div key={s.id} className={`rounded-xl border p-4 ${isLive ? "border-red-500/40 bg-red-500/5" : "border-white/8 bg-white/3"}`}>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    {isLive && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                        EN DIRECT
                      </span>
                    )}
                    <span className="font-semibold text-white text-sm">{s.title}</span>
                  </div>
                  <p className="text-xs text-slate-400 capitalize">{dateStr} à {timeStr}</p>
                  <p className="text-xs text-slate-500">
                    {s.duration_minutes} min ·{" "}
                    {isFull
                      ? <span className="text-amber-400">Complet</span>
                      : <span>{spotsLeft} place{spotsLeft > 1 ? "s" : ""} restante{spotsLeft > 1 ? "s" : ""}</span>
                    }
                  </p>
                </div>

                {/* CTA button — logic depends on auth state */}
                {isEnrolledHere ? (
                  <Link
                    href="/mon-espace"
                    className="shrink-0 rounded-xl border border-fuchsia-500/50 bg-fuchsia-500/15 px-5 py-2 text-sm font-semibold text-fuchsia-300 hover:bg-fuchsia-500/25 transition text-center"
                  >
                    ✓ Accéder à ma session
                  </Link>
                ) : userLoggedIn ? (
                  <button
                    onClick={() => !isFull && handleEnroll(s.id)}
                    disabled={isFull || isLoading}
                    className={`shrink-0 rounded-xl border px-5 py-2 text-sm font-semibold transition text-center ${
                      isFull
                        ? "border-white/10 text-slate-500 cursor-not-allowed"
                        : "border-fuchsia-500/40 bg-fuchsia-500/10 text-fuchsia-300 hover:bg-fuchsia-500/20"
                    } disabled:opacity-60`}
                  >
                    {isLoading ? "En cours…" : isFull ? "Complet" : "S'inscrire"}
                  </button>
                ) : (
                  <Link
                    href={`/auth/login?next=/academy/${trainingSlug}`}
                    className="shrink-0 rounded-xl border border-white/20 bg-white/5 px-5 py-2 text-sm font-semibold text-slate-300 hover:bg-white/10 transition text-center"
                  >
                    Se connecter →
                  </Link>
                )}
              </div>

              {sessionFeedback && (
                <div className={`mt-3 rounded-lg px-3 py-2 text-xs ${sessionFeedback.ok ? "bg-fuchsia-500/10 text-fuchsia-300 border border-fuchsia-500/20" : "bg-red-500/10 text-red-300 border border-red-500/20"}`}>
                  {sessionFeedback.msg}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!userLoggedIn && (
        <p className="mt-4 text-xs text-slate-500 text-center">
          Déjà un compte ?{" "}
          <Link href={`/auth/login?next=/academy/${trainingSlug}`} className="text-fuchsia-400 hover:text-fuchsia-300 transition">
            Se connecter
          </Link>
        </p>
      )}
    </section>
  );
}
