import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { sendInvitationEmail } from "@/lib/email";

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

  let userId: string;
  let wasInvited = false;

  const existing = users.find((u) => u.email?.toLowerCase() === email);

  if (existing) {
    userId = existing.id;
  } else {
    // No account → create user + generate invite link + send via Brevo
    const { data: created, error: createError } = await supabaseServer.auth.admin.createUser({
      email,
      email_confirm: false,
    });
    if (createError || !created?.user) {
      return NextResponse.json({
        ok: false,
        message: `Impossible de créer le compte pour ${email} : ${createError?.message ?? "erreur inconnue"}`,
      }, { status: 500 });
    }
    userId = created.user.id;
    wasInvited = true;

    // Generate invite link and send via Brevo
    const { data: linkData } = await supabaseServer.auth.admin.generateLink({
      type: "invite",
      email,
      options: { redirectTo: "https://enovcorp.com/mon-espace" },
    });
    const inviteLink = (linkData as { properties?: { action_link?: string } })?.properties?.action_link ?? "https://enovcorp.com/auth/register";
    sendInvitationEmail({ email, inviteLink }).catch(() => null);
  }

  // Create enrollment
  const { error } = await supabaseServer
    .from("enrollments")
    .insert([{ user_id: userId, session_id: id }]);

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({ ok: false, message: "Cet utilisateur est déjà inscrit." }, { status: 409 });
    }
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }

  const message = wasInvited
    ? `Invitation envoyée à ${email} — il recevra un email pour créer son compte. Inscription enregistrée.`
    : `${email} inscrit avec succès.`;

  return NextResponse.json({ ok: true, message, userId });
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
