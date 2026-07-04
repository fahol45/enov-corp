import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const { data, error } = await supabaseServer
    .from("enrollments")
    .select("*")
    .eq("session_id", id)
    .order("enrolled_at", { ascending: true });

  if (error) {
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }

  const enrollments = data ?? [];

  // Fetch user details — gracefully handle listUsers failure
  let userMap = new Map<string, { email?: string; user_metadata?: Record<string, string> }>();
  try {
    const { data: usersData, error: usersError } = await supabaseServer.auth.admin.listUsers({ page: 1, perPage: 1000 });
    if (!usersError && usersData?.users) {
      userMap = new Map(usersData.users.map((u) => [u.id, u]));
    }
  } catch {
    // Continue without user details — enrollments still returned
  }

  const enriched = enrollments.map((e) => {
    const u = userMap.get(e.user_id);
    return {
      ...e,
      email: u?.email ?? null,
      name: `${(u?.user_metadata?.first_name ?? "")} ${(u?.user_metadata?.last_name ?? "")}`.trim() || null,
    };
  });

  return NextResponse.json({ ok: true, enrollments: enriched });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "JSON invalide." }, { status: 400 });
  }

  const allowed = [
    "title", "training_slug", "scheduled_at", "duration_minutes",
    "max_participants", "jitsi_room_id", "jitsi_password",
    "youtube_stream_key", "youtube_replay_url", "status",
  ];

  const patch: Record<string, unknown> = {};
  for (const key of allowed) {
    if (key in body) patch[key] = body[key] ?? null;
  }

  if (Object.keys(patch).length === 0) {
    return NextResponse.json({ ok: false, message: "Aucun champ à mettre à jour." }, { status: 400 });
  }

  const { data, error } = await supabaseServer
    .from("sessions")
    .update(patch)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, session: data });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const { error } = await supabaseServer.from("sessions").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
