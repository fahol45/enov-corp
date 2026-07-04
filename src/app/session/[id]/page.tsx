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
  const firstName = user.user_metadata?.first_name ?? user.email?.split("@")[0] ?? "Apprenant";
  const lastName = user.user_metadata?.last_name ?? "";

  return (
    <main className="h-screen bg-slate-950 flex flex-col">
      {/* Top bar */}
      <header className="shrink-0 border-b border-white/5 bg-slate-950 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-red-400 bg-red-500/10 px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            LIVE
          </span>
          <span className="text-white font-semibold text-sm">{session.title}</span>
        </div>
        <Link href="/mon-espace" className="text-xs text-slate-500 hover:text-white transition">
          Quitter ←
        </Link>
      </header>

      {/* Jitsi iframe */}
      <div className="flex-1 overflow-hidden">
        <JitsiRoom
          roomName={roomName}
          password={session.jitsi_password ?? undefined}
          displayName={`${firstName} ${lastName}`.trim()}
          userEmail={user.email ?? ""}
        />
      </div>
    </main>
  );
}
