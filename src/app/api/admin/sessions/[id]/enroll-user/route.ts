import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { sendEnrollmentEmail, sendInvitationEmail } from "@/lib/email";

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
  let inviteEmailError = "";

  const existing = users.find((u) => u.email?.toLowerCase() === email);

  if (existing) {
    userId = existing.id;
    // Notify existing user of their enrollment
    sendEnrollmentEmail({ email }).catch(() => {});
  } else {
    // No account → create user (email pre-confirmed so recovery link works) + send via Brevo
    const { data: created, error: createError } = await supabaseServer.auth.admin.createUser({
      email,
      email_confirm: true,
    });
    if (createError || !created?.user) {
      return NextResponse.json({
        ok: false,
        message: `Impossible de créer le compte pour ${email} : ${createError?.message ?? "erreur inconnue"}`,
      }, { status: 500 });
    }
    userId = created.user.id;
    wasInvited = true;

    // Generate password-set link and send via Brevo
    try {
      const { data: linkData, error: linkError } = await supabaseServer.auth.admin.generateLink({
        type: "recovery",
        email,
        options: { redirectTo: "https://enovcorp.com/mon-espace" },
      });
      if (linkError) {
        inviteEmailError = `generateLink: ${linkError.message}`;
      } else {
        const inviteLink = linkData?.properties?.action_link ?? "https://enovcorp.com/auth/register";
        await sendInvitationEmail({ email, inviteLink });
      }
    } catch (err) {
      inviteEmailError = String(err);
    }
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

  let message: string;
  if (wasInvited) {
    message = inviteEmailError
      ? `Inscrit, mais l'email d'invitation a échoué : ${inviteEmailError}`
      : `Invitation envoyée à ${email} — il recevra un email pour créer son compte. Inscription enregistrée.`;
  } else {
    message = `${email} inscrit avec succès.`;
  }

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
