import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { sendNotifyConfirmation } from "@/lib/email";

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const slug = body.slug;
    const name = body.name;
    const email = body.email;

    if (!isNonEmptyString(slug) || !isNonEmptyString(name) || !isNonEmptyString(email)) {
      return NextResponse.json(
        { ok: false, message: "Champs invalides." },
        { status: 400 }
      );
    }

    const { error } = await supabaseServer
      .from("academy_notifications")
      .insert([{
        training_slug: slug.trim(),
        name: name.trim(),
        email: email.trim(),
        phone: isNonEmptyString(body.phone) ? body.phone.trim() : null,
      }]);

    if (error) {
      return NextResponse.json(
        { ok: false, message: process.env.NODE_ENV === "development" ? error.message : "Erreur serveur." },
        { status: 500 }
      );
    }

    // Send confirmation email (non-blocking)
    sendNotifyConfirmation({
      name: name.trim(),
      email: email.trim(),
      trainingSlug: slug.trim(),
    }).catch((err) => console.error("Email error:", err));

    return NextResponse.json({ ok: true, message: "Notification enregistrée." }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { ok: false, message: process.env.NODE_ENV === "development" ? String(error) : "Erreur serveur." },
      { status: 500 }
    );
  }
}
