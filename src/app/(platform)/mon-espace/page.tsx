import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/auth-server";
import { supabaseServer } from "@/lib/supabase/server";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function MonEspacePage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const firstName = user.user_metadata?.first_name ?? user.email?.split("@")[0] ?? "Apprenant";
  const initial = firstName[0]?.toUpperCase() ?? "?";

  const { data: enrollments } = await supabaseServer
    .from("enrollments")
    .select("*, sessions(*)")
    .eq("user_id", user.id)
    .order("enrolled_at", { ascending: false });

  const live     = enrollments?.filter((e) => e.sessions?.status === "live")     ?? [];
  const upcoming = enrollments?.filter((e) => e.sessions?.status === "upcoming") ?? [];
  const ended    = enrollments?.filter((e) => e.sessions?.status === "ended")    ?? [];
  const total    = (enrollments ?? []).length;

  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* ── Welcome banner ── */}
      <div className="border-b border-white/[0.05] bg-[#0a0f1a]">
        <div className="app-shell py-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-fuchsia-600 to-violet-700 flex items-center justify-center text-2xl font-black text-white shadow-[0_0_40px_rgba(168,85,247,0.3)] shrink-0">
              {initial}
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fuchsia-400 mb-1">Mon Espace</p>
              <h1 className="text-2xl font-black text-white tracking-tight">Bonjour, {firstName} 👋</h1>
              <p className="text-sm text-slate-500 mt-0.5">{user.email}</p>
            </div>
            {/* Stats */}
            <div className="flex items-center gap-6 sm:gap-8">
              {[
                { value: String(total),    label: "Formations" },
                { value: String(upcoming.length + live.length), label: "À venir" },
                { value: String(ended.length), label: "Replays" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-2xl font-black text-white">{s.value}</p>
                  <p className="text-[0.6rem] uppercase tracking-widest text-slate-600">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="app-shell py-10 space-y-12">

        {/* ── LIVE ── */}
        {live.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-red-400">En direct maintenant</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {live.map((e) => <SessionCard key={e.id} enrollment={e} variant="live" />)}
            </div>
          </section>
        )}

        {/* ── À VENIR ── */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">Sessions à venir</h2>
            <Link href="/academy" className="text-xs text-fuchsia-400 hover:text-fuchsia-300 transition">
              Explorer les formations →
            </Link>
          </div>
          {upcoming.length === 0 ? (
            <EmptyState
              icon={<CalendarIcon />}
              title="Aucune session à venir"
              desc="Inscris-toi à une formation pour voir tes sessions ici."
              cta="Explorer les formations"
              href="/academy"
            />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {upcoming.map((e) => <SessionCard key={e.id} enrollment={e} variant="upcoming" />)}
            </div>
          )}
        </section>

        {/* ── REPLAYS ── */}
        <section>
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500 mb-5">Replays disponibles</h2>
          {ended.length === 0 ? (
            <EmptyState
              icon={<PlayIcon />}
              title="Aucun replay pour l'instant"
              desc="Tes sessions terminées apparaîtront ici avec le lien replay."
            />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {ended.map((e) => <SessionCard key={e.id} enrollment={e} variant="replay" />)}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

/* ─── Session Card ─────────────────────────────────────────────────────────── */

function SessionCard({ enrollment, variant }: { enrollment: any; variant: "live" | "upcoming" | "replay" }) {
  const s = enrollment.sessions;
  if (!s) return null;
  const date = new Date(s.scheduled_at);
  const dateStr = date.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  const timeStr = date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });

  return (
    <div className={`relative flex flex-col rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-0.5 ${
      variant === "live"
        ? "border-red-500/30 bg-red-500/[0.04] hover:shadow-[0_16px_40px_rgba(239,68,68,0.1)]"
        : "border-white/[0.06] bg-[#0c1018] hover:border-white/[0.12]"
    }`}>
      {/* Top accent bar */}
      <div className={`h-0.5 w-full ${variant === "live" ? "bg-linear-to-r from-red-500 to-red-400" : variant === "replay" ? "bg-linear-to-r from-fuchsia-600 to-violet-600" : "bg-linear-to-r from-slate-700 to-slate-600"}`} />

      <div className="p-5 flex flex-col gap-4 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-bold text-white leading-snug">{s.title}</h3>
          {variant === "live" && (
            <span className="shrink-0 inline-flex items-center gap-1.5 text-[0.6rem] font-bold uppercase tracking-widest text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-full">
              <span className="w-1 h-1 rounded-full bg-red-400 animate-pulse" />
              LIVE
            </span>
          )}
          {variant === "replay" && (
            <span className="shrink-0 text-[0.6rem] font-bold uppercase tracking-widest text-fuchsia-400 bg-fuchsia-500/10 border border-fuchsia-500/20 px-2 py-0.5 rounded-full">
              REPLAY
            </span>
          )}
          {variant === "upcoming" && (
            <span className="shrink-0 text-[0.6rem] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
              CONFIRMÉ
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <CalendarIcon size={12} />
          <span>{dateStr} · {timeStr}</span>
          <span className="text-slate-700">·</span>
          <span>{s.duration_minutes} min</span>
        </div>

        {variant === "live" && (
          <Link
            href={`/session/${s.id}`}
            className="mt-auto flex items-center justify-center gap-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold py-3 transition-all shadow-[0_0_30px_rgba(239,68,68,0.3)]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            Rejoindre la session
          </Link>
        )}
        {variant === "upcoming" && (
          <div className="mt-auto flex items-center gap-2 text-xs text-slate-600 font-medium">
            <CalendarIcon size={12} />
            Tu seras notifié au démarrage
          </div>
        )}
        {variant === "replay" && s.youtube_replay_url && (
          <Link
            href={`/session/${s.id}/replay`}
            className="mt-auto flex items-center justify-center gap-2 rounded-xl bg-fuchsia-600 hover:bg-fuchsia-500 text-white text-xs font-bold py-3 transition-all"
          >
            <PlayIcon size={12} />
            Voir le replay
          </Link>
        )}
        {variant === "replay" && !s.youtube_replay_url && (
          <div className="mt-auto text-xs text-slate-600 font-medium">Replay bientôt disponible</div>
        )}
      </div>
    </div>
  );
}

/* ─── Empty State ──────────────────────────────────────────────────────────── */

function EmptyState({ icon, title, desc, cta, href }: { icon: React.ReactNode; title: string; desc: string; cta?: string; href?: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-white/[0.05] bg-white/[0.02] py-14 px-6 text-center">
      <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mb-4 text-slate-600">
        {icon}
      </div>
      <p className="text-sm font-semibold text-slate-400 mb-1">{title}</p>
      <p className="text-xs text-slate-600 mb-5 max-w-xs">{desc}</p>
      {cta && href && (
        <Link href={href} className="text-xs font-semibold text-fuchsia-400 hover:text-fuchsia-300 transition border border-fuchsia-500/30 hover:border-fuchsia-500/60 px-4 py-2 rounded-full">
          {cta} →
        </Link>
      )}
    </div>
  );
}

/* ─── Icons ────────────────────────────────────────────────────────────────── */

function CalendarIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
    </svg>
  );
}

function PlayIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="5 3 19 12 5 21 5 3"/>
    </svg>
  );
}
