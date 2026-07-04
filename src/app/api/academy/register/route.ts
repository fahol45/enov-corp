import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import {
  sendAcademyRegistrationConfirmation,
  sendAcademyRegistrationNotification,
} from "@/lib/email";
import { fetchAcademyTraining } from "@/lib/academy-data";

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const slug = body.slug;
    const firstName = body.firstName;
    const lastName = body.lastName;
    const email = body.email;
    const studyField = body.studyField;

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

    const basePayload = {
      training_slug: slug.trim(),
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      email: email.trim().toLowerCase(),
      phone: isNonEmptyString(body.phone) ? body.phone.trim() : null,
      city: isNonEmptyString(body.city) ? body.city.trim() : null,
      profile: isNonEmptyString(body.profile) ? body.profile.trim() : null,
      message: isNonEmptyString(body.message) ? body.message.trim() : null,
    };

    // Block duplicate registrations for the same training
    const { data: existing } = await supabaseServer
      .from("academy_registrations")
      .select("id")
      .eq("email", basePayload.email)
      .eq("training_slug", basePayload.training_slug)
      .maybeSingle();

    if (existing) {
      return NextResponse.json(
        { ok: false, message: "Tu es déjà inscrit à cette formation. Notre équipe te recontactera prochainement." },
        { status: 409 }
      );
    }

    const studyValue = isNonEmptyString(studyField) ? studyField.trim() : null;

    let { error } = await supabaseServer
      .from("academy_registrations")
      .insert([{ ...basePayload, field_of_study: studyValue }]);

    if (error && studyValue && typeof error.message === "string" && error.message.includes("field_of_study")) {
      const mergedMessage = basePayload.message
        ? `${basePayload.message}\nFilière: ${studyValue}`
        : `Filière: ${studyValue}`;
      const retry = await supabaseServer
        .from("academy_registrations")
        .insert([{ ...basePayload, message: mergedMessage }]);
      error = retry.error;
    }

    if (error) {
      return NextResponse.json(
        { ok: false, message: error.message },
        { status: 500 }
      );
    }

    // Send emails (non-blocking — don't fail the request if email fails)
    const training = await fetchAcademyTraining(slug.trim()).catch(() => null);
    const trainingTitle = training?.title ?? slug.trim();

    Promise.all([
      sendAcademyRegistrationConfirmation({
        firstName: firstName.trim(),
        email: email.trim(),
        trainingTitle,
        trainingSlug: slug.trim(),
      }),
      sendAcademyRegistrationNotification({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        phone: basePayload.phone ?? undefined,
        trainingSlug: slug.trim(),
        trainingTitle,
        profile: basePayload.profile ?? undefined,
        message: basePayload.message ?? undefined,
      }),
    ]).catch((err) => console.error("Email error:", err));

    return NextResponse.json({ ok: true, message: "Inscription enregistrée." }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { ok: false, message: String(error) },
      { status: 500 }
    );
  }
}
