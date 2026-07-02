import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/auth-server";
import { supabaseServer } from "@/lib/supabase/server";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default async function MonEspacePage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const firstName = user.user_metadata?.first_name ?? user.email?.split("@")[0] ?? "Apprenant";

  // Fetch enrollments with session info
  const { data: enrollments } = await supabaseServer
    .from("enrollments")
    .select("*, sessions(*)")
    .eq("user_id", user.id)
    .order("enrolled_at", { ascending: false });

  const upcoming = enrollments?.filter((e) => e.sessions?.status === "upcoming") ?? [];
  const live = enrollments?.filter((e) => e.sessions?.status === "live") ?? [];
  const ended = enrollments?.filter((e) => e.sessions?.status === "ended") ?? [];

  return (
    <main className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="border-b border-white/5 bg-slate-950/80 backdrop-blur sticky top-0 z-10">
        <div className="app-shell flex items-center justify-between py-4">
          <Link href="/" className="text-lg font-black tracking-tight text-white">
            ENOV<span className="text-fuchsia-400">.</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-400">Bonjour, {firstName}</span>
            <LogoutButton />
          </div>
        </div>
      </header>

      <div className="app-shell py-12">
        <h1 className="text-3xl font-bold text-white mb-2">Mon espace</h1>
        <p className="text-slate-400 mb-10">Retrouve tes formations et sessions à venir.</p>

        {/* Sessions live */}
        {live.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-red-400 mb-4 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-red-400 animate-pulse" />
              En direct maintenant
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {live.map((e) => (
                <SessionCard key={e.id} enrollment={e} variant="live" />
              ))}
            </div>
          </section>
        )}

        {/* Sessions à venir */}
        <section className="mb-10">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Sessions à venir</h2>
          {upcoming.length === 0 ? (
            <EmptyState message="Aucune session à venir." cta />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {upcoming.map((e) => (
                <SessionCard key={e.id} enrollment={e} variant="upcoming" />
              ))}
            </div>
          )}
        </section>

        {/* Replays */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Replays disponibles</h2>
          {ended.length === 0 ? (
            <EmptyState message="Aucun replay pour l'instant." />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {ended.map((e) => (
                <SessionCard key={e.id} enrollment={e} variant="replay" />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function SessionCard({ enrollment, variant }: { enrollment: any; variant: "live" | "upcoming" | "replay" }) {
  const session = enrollment.sessions;
  if (!session) return null;

  const date = new Date(session.scheduled_at);
  const dateStr = date.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  const timeStr = date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });

  return (
    <div className={`bg-slate-900 border rounded-2xl p-6 space-y-3 ${variant === "live" ? "border-red-500/40" : "border-white/10"}`}>
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-white font-semibold text-sm leading-snug">{session.title}</h3>
        {variant === "live" && (
          <span className="shrink-0 text-xs font-bold text-red-400 bg-red-500/10 px-2 py-1 rounded-full">LIVE</span>
        )}
        {variant === "replay" && (
          <span className="shrink-0 text-xs font-bold text-fuchsia-400 bg-fuchsia-500/10 px-2 py-1 rounded-full">REPLAY</span>
        )}
      </div>
      <p className="text-xs text-slate-400">{dateStr} à {timeStr} · {session.duration_minutes} min</p>

      {variant === "live" && (
        <Link
          href={`/session/${session.id}`}
          className="block w-full text-center bg-red-600 hover:bg-red-500 text-white text-sm font-semibold rounded-xl py-2 transition"
        >
          Rejoindre la session →
        </Link>
      )}
      {variant === "upcoming" && (
        <div className="text-xs text-slate-500 font-medium">📅 Inscription confirmée</div>
      )}
      {variant === "replay" && session.youtube_replay_url && (
        <Link
          href={`/session/${session.id}/replay`}
          className="block w-full text-center bg-fuchsia-600 hover:bg-fuchsia-500 text-white text-sm font-semibold rounded-xl py-2 transition"
        >
          Voir le replay →
        </Link>
      )}
      {variant === "replay" && !session.youtube_replay_url && (
        <div className="text-xs text-slate-500">Replay bientôt disponible</div>
      )}
    </div>
  );
}

function EmptyState({ message, cta }: { message: string; cta?: boolean }) {
  return (
    <div className="bg-slate-900 border border-white/5 rounded-2xl p-8 text-center">
      <p className="text-slate-500 text-sm mb-4">{message}</p>
      {cta && (
        <Link href="/academy" className="text-fuchsia-400 text-sm hover:text-fuchsia-300 transition font-medium">
          Voir les formations →
        </Link>
      )}
    </div>
  );
}
