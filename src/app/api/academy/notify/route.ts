import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const slug = body.slug;
    const name = body.name;
    const email = body.email;

    if (
      !isNonEmptyString(slug) ||
      !isNonEmptyString(name) ||
      !isNonEmptyString(email)
    ) {
      return NextResponse.json(
        { ok: false, message: "Champs invalides." },
        { status: 400 }
      );
    }

    const { error } = await supabaseServer
      .from("academy_notifications")
      .insert([
        {
          training_slug: slug.trim(),
          name: name.trim(),
          email: email.trim(),
          phone: isNonEmptyString(body.phone) ? body.phone.trim() : null,
        },
      ]);

    if (error) {
      const debugMessage =
        process.env.NODE_ENV === "development"
          ? `Erreur serveur: ${error.message ?? "insertion failed"}`
          : "Erreur serveur.";
      return NextResponse.json(
        { ok: false, message: debugMessage },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { ok: true, message: "Notification enregistrée." },
      { status: 200 }
    );
  } catch (error) {
    const debugMessage =
      process.env.NODE_ENV === "development"
        ? `Erreur serveur: ${
            error instanceof Error ? error.message : "unknown error"
          }`
        : "Erreur serveur.";
    return NextResponse.json(
      { ok: false, message: debugMessage },
      { status: 500 }
    );
  }
}
