import { redirect, notFound } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/auth-server";
import { supabaseServer } from "@/lib/supabase/server";
import Link from "next/link";

type Props = { params: Promise<{ id: string }> };

export const dynamic = "force-dynamic";

export default async function ReplayPage({ params }: Props) {
  const { id } = await params;

  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect(`/auth/login?next=/session/${id}/replay`);

  const { data: session } = await supabaseServer
    .from("sessions")
    .select("*")
    .eq("id", id)
    .single();

  if (!session) notFound();

  const { data: enrollment } = await supabaseServer
    .from("enrollments")
    .select("id")
    .eq("user_id", user.id)
    .eq("session_id", id)
    .single();

  if (!enrollment) redirect("/mon-espace");

  // Extract YouTube video ID from URL
  const getYouTubeId = (url: string) => {
    const match = url.match(/(?:v=|youtu\.be\/|\/embed\/)([^&?/]+)/);
    return match?.[1] ?? null;
  };

  const videoId = session.youtube_replay_url ? getYouTubeId(session.youtube_replay_url) : null;
  const date = new Date(session.scheduled_at);
  const dateStr = date.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/5 bg-slate-950/80 backdrop-blur sticky top-0 z-10">
        <div className="app-shell flex items-center justify-between py-4">
          <Link href="/" className="text-lg font-black tracking-tight text-white">
            ENOV<span className="text-fuchsia-400">.</span>
          </Link>
          <Link href="/mon-espace" className="text-sm text-slate-400 hover:text-white transition">
            ← Mon espace
          </Link>
        </div>
      </header>

      <div className="app-shell py-10 max-w-4xl">
        <div className="mb-6 space-y-2">
          <span className="text-xs font-bold text-fuchsia-400 bg-fuchsia-500/10 px-3 py-1 rounded-full">REPLAY</span>
          <h1 className="text-3xl font-bold">{session.title}</h1>
          <p className="text-slate-400 text-sm">Session du {dateStr} · {session.duration_minutes} min</p>
        </div>

        {videoId ? (
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-800 shadow-2xl">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              title={session.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        ) : (
          <div className="aspect-video rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center">
            <div className="text-center space-y-3">
              <div className="text-5xl">🎬</div>
              <p className="text-slate-400 text-sm">Le replay sera disponible très prochainement.</p>
            </div>
          </div>
        )}

        <div className="mt-8 border-t border-white/10 pt-6">
          <Link
            href="/academy"
            className="inline-flex items-center gap-2 text-sm text-fuchsia-400 hover:text-fuchsia-300 transition"
          >
            ← Voir toutes les formations
          </Link>
        </div>
      </div>
    </main>
  );
}
