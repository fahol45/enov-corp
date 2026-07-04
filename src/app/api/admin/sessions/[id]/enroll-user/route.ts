import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  let body: { email?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "JSON invalide." }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!email) {
    return NextResponse.json({ ok: false, message: "Email requis." }, { status: 400 });
  }

  // Find user by email via admin API
  const { data: { users }, error: listError } = await supabaseServer.auth.admin.listUsers({
    page: 1,
    perPage: 1000,
  });

  if (listError) {
    return NextResponse.json({ ok: false, message: "Impossible de récupérer les utilisateurs." }, { status: 500 });
  }

  const user = users.find((u) => u.email?.toLowerCase() === email);
  if (!user) {
    return NextResponse.json({
      ok: false,
      message: `Aucun compte trouvé pour ${email}. L'utilisateur doit d'abord créer un compte sur /auth/register.`,
    }, { status: 404 });
  }

  // Create enrollment
  const { error } = await supabaseServer
    .from("enrollments")
    .insert([{ user_id: user.id, session_id: id }]);

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({ ok: false, message: "Cet utilisateur est déjà inscrit." }, { status: 409 });
    }
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, message: `${email} inscrit avec succès.`, userId: user.id });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("user_id");

  if (!userId) {
    return NextResponse.json({ ok: false, message: "user_id requis." }, { status: 400 });
  }

  const { error } = await supabaseServer
    .from("enrollments")
    .delete()
    .eq("session_id", id)
    .eq("user_id", userId);

  if (error) {
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
