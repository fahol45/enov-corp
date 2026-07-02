import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export async function GET() {
  const { data: sessions, error } = await supabaseServer
    .from("sessions")
    .select("*, enrollments(count)")
    .order("scheduled_at", { ascending: false });

  if (error) {
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, sessions: sessions ?? [] });
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "JSON invalide." }, { status: 400 });
  }

  const title = typeof body.title === "string" ? body.title.trim() : "";
  const training_slug = typeof body.training_slug === "string" ? body.training_slug.trim() : "";
  const scheduled_at = typeof body.scheduled_at === "string" ? body.scheduled_at : null;

  if (!title || !training_slug || !scheduled_at) {
    return NextResponse.json({ ok: false, message: "Titre, formation et date requis." }, { status: 400 });
  }

  const jitsi_room_id =
    typeof body.jitsi_room_id === "string" && body.jitsi_room_id.trim()
      ? body.jitsi_room_id.trim()
      : `enov-${training_slug}-${Date.now()}`;

  const jitsi_password =
    typeof body.jitsi_password === "string" && body.jitsi_password.trim()
      ? body.jitsi_password.trim()
      : Math.random().toString(36).slice(2, 10);

  const row = {
    title,
    training_slug,
    scheduled_at,
    duration_minutes: typeof body.duration_minutes === "number" ? body.duration_minutes : 120,
    max_participants: typeof body.max_participants === "number" ? body.max_participants : 8,
    jitsi_room_id,
    jitsi_password,
    youtube_stream_key: typeof body.youtube_stream_key === "string" ? body.youtube_stream_key.trim() || null : null,
    youtube_replay_url: typeof body.youtube_replay_url === "string" ? body.youtube_replay_url.trim() || null : null,
    status: "upcoming",
  };

  const { data, error } = await supabaseServer.from("sessions").insert([row]).select().single();

  if (error) {
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, session: data }, { status: 201 });
}
