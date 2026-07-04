import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { createSupabaseServerClient } from "@/lib/supabase/auth-server";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const authClient = await createSupabaseServerClient();
  const { data: { user } } = await authClient.auth.getUser();
  if (!user) {
    return NextResponse.json({ ok: false, message: "Non connecté." }, { status: 401 });
  }

  // Check session exists and has capacity
  const { data: session } = await supabaseServer
    .from("sessions")
    .select("id, max_participants, status, enrollments(count)")
    .eq("id", id)
    .single();

  if (!session) {
    return NextResponse.json({ ok: false, message: "Session introuvable." }, { status: 404 });
  }
  if (session.status === "ended") {
    return NextResponse.json({ ok: false, message: "Cette session est terminée." }, { status: 400 });
  }
  const spotsUsed = (session.enrollments as { count: number }[])?.[0]?.count ?? 0;
  if (spotsUsed >= session.max_participants) {
    return NextResponse.json({ ok: false, message: "Cette session est complète." }, { status: 409 });
  }

  const { error } = await supabaseServer
    .from("enrollments")
    .insert([{ user_id: user.id, session_id: id }]);

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({ ok: false, message: "Tu es déjà inscrit à cette session." }, { status: 409 });
    }
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, message: "Inscription confirmée !" });
}
