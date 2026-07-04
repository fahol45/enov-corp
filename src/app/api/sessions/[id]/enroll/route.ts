import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/auth-server";
import { supabaseServer } from "@/lib/supabase/server";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ ok: false, message: "Non authentifié." }, { status: 401 });
  }

  // Fetch session
  const { data: session, error: sessionError } = await supabaseServer
    .from("sessions")
    .select("id, status, max_participants")
    .eq("id", id)
    .single();

  if (sessionError || !session) {
    return NextResponse.json({ ok: false, message: "Session introuvable." }, { status: 404 });
  }

  if (session.status === "ended") {
    return NextResponse.json({ ok: false, message: "Cette session est terminée." }, { status: 400 });
  }

  // Check spots available
  const { count } = await supabaseServer
    .from("enrollments")
    .select("id", { count: "exact", head: true })
    .eq("session_id", id);

  if (session.max_participants && (count ?? 0) >= session.max_participants) {
    return NextResponse.json({ ok: false, message: "Session complète." }, { status: 400 });
  }

  // Insert enrollment (ignore duplicate)
  const { error } = await supabaseServer
    .from("enrollments")
    .insert([{ user_id: user.id, session_id: id }]);

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({ ok: true, message: "Déjà inscrit." });
    }
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, message: "Inscription confirmée." });
}
