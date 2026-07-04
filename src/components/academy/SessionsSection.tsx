"use client";

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
  const upcoming = sessions.filter((s) => s.status !== "ended");
  if (upcoming.length === 0) return null;

  return (
    <section id="sessions" className="scroll-mt-24 border border-white/10 rounded-2xl p-6 bg-slate-900/60">
      <h2 className="text-xl font-bold mb-2 text-white">Sessions disponibles</h2>
      <p className="text-slate-400 text-sm mb-5">
        Inscris-toi à la formation ci-dessous pour accéder à une session. Notre équipe t&apos;attribuera une place après validation.
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

          return (
            <div key={s.id} className={`flex flex-col sm:flex-row sm:items-center gap-4 rounded-xl border p-4 ${isLive ? "border-red-500/40 bg-red-500/5" : "border-white/8 bg-white/3"}`}>
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

              <Link
                href={`#inscription`}
                className="shrink-0 rounded-xl border border-fuchsia-500/40 bg-fuchsia-500/10 px-5 py-2 text-sm font-semibold text-fuchsia-300 hover:bg-fuchsia-500/20 transition text-center"
              >
                S&apos;inscrire à la formation →
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
