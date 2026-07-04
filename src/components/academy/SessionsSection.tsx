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

export function SessionsSection({ sessions, trainingSlug, userLoggedIn = false, enrolledSessionIds = [] }: Props) {
  const upcoming = sessions.filter((s) => s.status !== "ended");
  const [localEnrolled, setLocalEnrolled] = useState<Set<string>>(new Set(enrolledSessionIds));
  const [loadingId,     setLoadingId]     = useState<string | null>(null);
  const [feedbackId,    setFeedbackId]    = useState<{ id: string; msg: string; ok: boolean } | null>(null);

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
    <section id="sessions" className="scroll-mt-24 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-slate-400">Sessions disponibles</h2>
        <div className="flex-1 h-px bg-white/[0.05]" />
        <span className="text-[0.6rem] font-bold uppercase tracking-widest text-fuchsia-400/60 border border-fuchsia-500/20 px-2 py-0.5 rounded-full">
          {upcoming.length} session{upcoming.length > 1 ? "s" : ""}
        </span>
      </div>

      {!userLoggedIn && (
        <p className="text-xs text-slate-600 bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3">
          <Link href={`/auth/login?next=/academy/${trainingSlug}`} className="text-fuchsia-400 hover:text-fuchsia-300 font-semibold transition">
            Connecte-toi
          </Link>
          {" "}pour t&apos;inscrire en un clic, ou laisse tes coordonnées ci-dessous.
        </p>
      )}

      <div className="space-y-3">
        {upcoming.map((s) => {
          const date       = new Date(s.scheduled_at);
          const dayStr     = date.toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "short" });
          const yearStr    = date.getFullYear();
          const timeStr    = date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
          const spotsUsed  = s.enrollments?.[0]?.count ?? 0;
          const spotsLeft  = s.max_participants - spotsUsed;
          const isFull     = spotsLeft <= 0;
          const isLive     = s.status === "live";
          const isEnrolled = localEnrolled.has(s.id);
          const isLoading  = loadingId === s.id;
          const feedback   = feedbackId?.id === s.id ? feedbackId : null;
          const fillPct    = Math.min(100, Math.round((spotsUsed / s.max_participants) * 100));

          return (
            <div
              key={s.id}
              className={`rounded-2xl border overflow-hidden transition-all ${
                isLive
                  ? "border-red-500/30 bg-red-500/[0.03] shadow-[0_0_32px_rgba(239,68,68,0.06)]"
                  : isEnrolled
                  ? "border-fuchsia-500/30 bg-fuchsia-950/[0.06]"
                  : "border-white/[0.06] bg-[#0c1018]"
              }`}
            >
              {/* Top bar */}
              <div className={`h-0.5 w-full ${isLive ? "bg-linear-to-r from-red-500 to-red-400" : isEnrolled ? "bg-linear-to-r from-fuchsia-600 to-violet-500" : "bg-white/[0.04]"}`} />

              <div className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">

                  {/* Date block */}
                  <div className="shrink-0 w-16 text-center rounded-xl border border-white/[0.07] bg-white/[0.03] py-2.5 px-1 hidden sm:flex flex-col items-center">
                    <p className="text-[0.55rem] uppercase tracking-widest text-slate-600">{date.toLocaleDateString("fr-FR", { month: "short" })}</p>
                    <p className="text-2xl font-black text-white leading-none">{date.getDate()}</p>
                    <p className="text-[0.55rem] text-slate-600">{yearStr}</p>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      {isLive && (
                        <span className="inline-flex items-center gap-1.5 text-[0.6rem] font-black uppercase tracking-widest text-red-400 bg-red-500/10 border border-red-500/20 px-2.5 py-1 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                          En direct
                        </span>
                      )}
                      {isEnrolled && !isLive && (
                        <span className="text-[0.6rem] font-bold uppercase tracking-widest text-fuchsia-400 bg-fuchsia-500/10 border border-fuchsia-500/20 px-2 py-0.5 rounded-full">
                          Inscrit
                        </span>
                      )}
                      <h3 className="text-sm font-bold text-white">{s.title}</h3>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-500 flex-wrap">
                      <span className="sm:hidden capitalize">{dayStr} {yearStr}</span>
                      <span className="hidden sm:inline">{timeStr}</span>
                      <span className="text-slate-700">·</span>
                      <span>{s.duration_minutes} min</span>
                      <span className="text-slate-700">·</span>
                      <span className={isFull ? "text-amber-400 font-semibold" : spotsLeft <= 3 ? "text-amber-400/80" : "text-slate-500"}>
                        {isFull ? "Complet" : `${spotsLeft} place${spotsLeft > 1 ? "s" : ""} restante${spotsLeft > 1 ? "s" : ""}`}
                      </span>
                    </div>

                    {/* Capacity bar */}
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1 rounded-full bg-white/[0.06] overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${isFull ? "bg-amber-500" : fillPct >= 70 ? "bg-amber-500/70" : "bg-fuchsia-600"}`}
                          style={{ width: `${fillPct}%` }}
                        />
                      </div>
                      <span className="text-[0.6rem] text-slate-600 shrink-0">{spotsUsed}/{s.max_participants}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="shrink-0 sm:self-start">
                    {isEnrolled ? (
                      <Link
                        href="/mon-espace"
                        className="inline-flex items-center gap-1.5 rounded-xl border border-fuchsia-500/40 bg-fuchsia-500/10 px-5 py-2.5 text-xs font-bold text-fuchsia-300 hover:bg-fuchsia-500/20 transition whitespace-nowrap"
                      >
                        ✓ Mon Espace
                      </Link>
                    ) : userLoggedIn ? (
                      <button
                        onClick={() => !isFull && !isLoading && handleEnroll(s.id)}
                        disabled={isFull || isLoading}
                        className={`rounded-xl border px-5 py-2.5 text-xs font-bold transition whitespace-nowrap ${
                          isFull
                            ? "border-white/10 text-slate-600 cursor-not-allowed"
                            : "border-fuchsia-500/40 bg-fuchsia-500/10 text-fuchsia-300 hover:bg-fuchsia-500/25 hover:border-fuchsia-500/60"
                        } disabled:opacity-50`}
                      >
                        {isLoading ? "En cours…" : isFull ? "Complet" : "S'inscrire"}
                      </button>
                    ) : (
                      <Link
                        href={`/auth/login?next=/academy/${trainingSlug}`}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/[0.04] px-5 py-2.5 text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/[0.08] transition whitespace-nowrap"
                      >
                        Se connecter →
                      </Link>
                    )}
                  </div>
                </div>

                {feedback && (
                  <div className={`mt-3 rounded-xl px-4 py-2.5 text-xs ${feedback.ok ? "bg-fuchsia-500/10 text-fuchsia-300 border border-fuchsia-500/20" : "bg-red-500/10 text-red-300 border border-red-500/20"}`}>
                    {feedback.msg}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
