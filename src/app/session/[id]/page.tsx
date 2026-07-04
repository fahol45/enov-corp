import { redirect, notFound } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/auth-server";
import { supabaseServer } from "@/lib/supabase/server";
import Link from "next/link";
import JitsiRoom from "./JitsiRoom";
import { EnrollButton } from "./EnrollButton";

type Props = { params: Promise<{ id: string }> };

export const dynamic = "force-dynamic";

export default async function SessionPage({ params }: Props) {
  const { id } = await params;

  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect(`/auth/login?next=/session/${id}`);

  // Fetch session
  const { data: session } = await supabaseServer
    .from("sessions")
    .select("*")
    .eq("id", id)
    .single();

  if (!session) notFound();

  // Check enrollment
  const { data: enrollment } = await supabaseServer
    .from("enrollments")
    .select("id")
    .eq("user_id", user.id)
    .eq("session_id", id)
    .single();

  if (!enrollment) {
    const date = new Date(session.scheduled_at);
    const dateStr = date.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    const timeStr = date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });

    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-6">
          <div className="text-center space-y-2">
            <div className="text-5xl mb-4">📋</div>
            <h1 className="text-2xl font-bold text-white">{session.title}</h1>
            <p className="text-slate-400 text-sm capitalize">{dateStr} à {timeStr} · {session.duration_minutes} min</p>
          </div>
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 space-y-4">
            <p className="text-slate-300 text-sm">Tu n&apos;es pas encore inscrit à cette session.</p>
            <EnrollButton sessionId={id} trainingSlug={session.training_slug} />
          </div>
          <div className="text-center">
            <Link href="/academy" className="text-sm text-slate-500 hover:text-white transition">
              ← Voir toutes les formations
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (session.status === "ended") {
    redirect(`/session/${id}/replay`);
  }

  if (session.status === "upcoming") {
    const date = new Date(session.scheduled_at);
    const dateStr = date.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    const timeStr = date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });

    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="text-center max-w-md space-y-6">
          <div className="text-6xl">⏳</div>
          <h1 className="text-2xl font-bold text-white">{session.title}</h1>
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 space-y-2">
            <p className="text-slate-400 text-sm">La session commence le</p>
            <p className="text-white font-bold text-xl capitalize">{dateStr}</p>
            <p className="text-fuchsia-400 font-semibold text-lg">à {timeStr}</p>
          </div>
          <p className="text-slate-500 text-sm">Tu recevras un accès à cette page dès que la session démarre.</p>
          <Link href="/mon-espace" className="inline-block border border-white/10 hover:border-white/30 text-white text-sm rounded-xl px-6 py-3 transition">
            ← Mon espace
          </Link>
        </div>
      </main>
    );
  }

  // status === "live"
  const roomName = session.jitsi_room_id ?? `enov-${id}`;
  const jitsiUrl = `https://meet.jit.si/${roomName}`;
  const firstName = user.user_metadata?.first_name ?? user.email?.split("@")[0] ?? "Apprenant";

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-lg space-y-8 text-center">

        {/* LIVE badge */}
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 text-sm font-bold text-red-400 bg-red-500/10 border border-red-500/30 px-4 py-2 rounded-full">
            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
            EN DIRECT MAINTENANT
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-white">{session.title}</h1>
          <p className="text-slate-400 text-sm">Bonjour {firstName} — la session est en cours</p>
        </div>

        {/* Join card */}
        <div className="bg-slate-900 border border-white/10 rounded-2xl p-8 space-y-6">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-widest text-slate-500">Salle Jitsi</p>
            <p className="text-white font-mono text-sm">{roomName}</p>
          </div>

          {session.jitsi_password && (
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-widest text-slate-500">Mot de passe</p>
              <p className="text-fuchsia-300 font-mono text-sm">{session.jitsi_password}</p>
            </div>
          )}

          <a
            href={jitsiUrl}
            target="_blank"
            rel="noreferrer"
            className="block w-full text-center bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl py-4 text-base transition"
          >
            Rejoindre la session →
          </a>

          <p className="text-xs text-slate-500">
            La session s&apos;ouvrira dans un nouvel onglet sur Jitsi Meet.
          </p>
        </div>

        <Link href="/mon-espace" className="text-sm text-slate-500 hover:text-white transition">
          ← Mon espace
        </Link>
      </div>
    </main>
  );
}
