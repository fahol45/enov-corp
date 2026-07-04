"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

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
};

export function SessionsSection({ sessions, trainingSlug }: Props) {
  const [enrolledIds, setEnrolledIds] = useState<Set<string>>(new Set());
  const [loadingIds, setLoadingIds] = useState<Set<string>>(new Set());
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/api/user/sessions")
      .then((r) => r.json())
      .then((d: { ok: boolean; sessionIds?: string[] }) => {
        setIsLoggedIn(true);
        setEnrolledIds(new Set(d.sessionIds ?? []));
      })
      .catch(() => setIsLoggedIn(false));
  }, []);

  const enroll = async (sessionId: string) => {
    if (isLoggedIn === false) {
      window.location.href = `/auth/login?next=/academy/${trainingSlug}`;
      return;
    }
    setLoadingIds((prev) => new Set(prev).add(sessionId));
    try {
      const r = await fetch(`/api/sessions/${sessionId}/enroll`, { method: "POST" });
      const d = await r.json() as { ok: boolean; message?: string };
      if (r.status === 401) {
        window.location.href = `/auth/login?next=/academy/${trainingSlug}`;
        return;
      }
      if (d.ok) {
        setEnrolledIds((prev) => new Set(prev).add(sessionId));
      } else {
        alert(d.message ?? "Erreur lors de l'inscription.");
      }
    } finally {
      setLoadingIds((prev) => { const s = new Set(prev); s.delete(sessionId); return s; });
    }
  };

  if (sessions.length === 0) return null;

  const upcoming = sessions.filter((s) => s.status !== "ended");
  if (upcoming.length === 0) return null;

  return (
    <section id="sessions" className="scroll-mt-24 border border-white/10 rounded-2xl p-6 bg-slate-900/60">
      <h2 className="text-xl font-bold mb-5 text-white">Sessions disponibles</h2>
      <div className="space-y-4">
        {upcoming.map((s) => {
          const date = new Date(s.scheduled_at);
          const dateStr = date.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
          const timeStr = date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
          const spotsUsed = s.enrollments?.[0]?.count ?? 0;
          const spotsLeft = s.max_participants - spotsUsed;
          const isFull = spotsLeft <= 0;
          const isEnrolled = enrolledIds.has(s.id);
          const isLoading = loadingIds.has(s.id);
          const isLive = s.status === "live";

          return (
            <div key={s.id} className={`flex flex-col sm:flex-row sm:items-center gap-4 rounded-xl border p-4 transition ${isLive ? "border-red-500/40 bg-red-500/5" : "border-white/8 bg-white/3"}`}>
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
                <p className="text-xs text-slate-500">{s.duration_minutes} min · {isFull ? "Complet" : `${spotsLeft} place${spotsLeft > 1 ? "s" : ""} restante${spotsLeft > 1 ? "s" : ""}`}</p>
              </div>

              {isEnrolled ? (
                <Link
                  href={`/session/${s.id}`}
                  className="shrink-0 rounded-xl border border-fuchsia-500/50 bg-fuchsia-500/10 px-5 py-2 text-sm font-semibold text-fuchsia-300 hover:bg-fuchsia-500/20 transition text-center"
                >
                  {isLive ? "Rejoindre →" : "Accéder →"}
                </Link>
              ) : isFull ? (
                <span className="shrink-0 rounded-xl border border-white/10 bg-white/5 px-5 py-2 text-sm text-slate-500 text-center">
                  Complet
                </span>
              ) : (
                <button
                  onClick={() => enroll(s.id)}
                  disabled={isLoading || isLoggedIn === null}
                  className="shrink-0 rounded-xl border border-fuchsia-500/50 bg-fuchsia-600 hover:bg-fuchsia-500 px-5 py-2 text-sm font-bold text-white transition disabled:opacity-50 disabled:cursor-wait"
                >
                  {isLoading ? "…" : "S'inscrire"}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
