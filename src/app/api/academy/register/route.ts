import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const slug = body.slug;
    const firstName = body.firstName;
    const lastName = body.lastName;
    const email = body.email;

    if (
      !isNonEmptyString(slug) ||
      !isNonEmptyString(firstName) ||
      !isNonEmptyString(lastName) ||
      !isNonEmptyString(email)
    ) {
      return NextResponse.json(
        { ok: false, message: "Champs invalides." },
        { status: 400 }
      );
    }

    const { error } = await supabaseServer
      .from("academy_registrations")
      .insert([
        {
          training_slug: slug.trim(),
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          email: email.trim(),
          phone: isNonEmptyString(body.phone) ? body.phone.trim() : null,
          city: isNonEmptyString(body.city) ? body.city.trim() : null,
          profile: isNonEmptyString(body.profile) ? body.profile.trim() : null,
          message: isNonEmptyString(body.message) ? body.message.trim() : null,
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
      { ok: true, message: "Inscription enregistrée." },
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
