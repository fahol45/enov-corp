import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { Training, TrainingStatus } from "@/lib/trainings";
import { supabaseServer } from "@/lib/supabase/server";

type TrainingRow = {
  slug: string;
  title: string;
  category: string;
  status: TrainingStatus;
  summary: string;
  description: string;
  outcomes: string[] | null;
  prerequisites: string[] | null;
  details: Record<string, unknown> | null;
  cover_image: string | null;
  youtube_embed: string | null;
  pdf_program: string | null;
  registration_url: string | null;
};

const allowedStatuses: TrainingStatus[] = ["available", "soon", "closed"];
const bucketName = "academy-media";

const normalizeText = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";

const normalizeStringArray = (value: unknown) =>
  Array.isArray(value)
    ? value.map((item) => normalizeText(item)).filter(Boolean)
    : [];

const normalizeStatus = (value: unknown): TrainingStatus =>
  allowedStatuses.includes(value as TrainingStatus)
    ? (value as TrainingStatus)
    : "soon";

const normalizeDetails = (value: unknown) => {
  const details =
    value && typeof value === "object" ? (value as Record<string, unknown>) : {};
  return {
    duration: normalizeText(details.duration),
    level: normalizeText(details.level),
    format: normalizeText(details.format),
    nextSession: normalizeText(details.nextSession),
    price: normalizeText(details.price),
    location: normalizeText(details.location),
  };
};

const toTraining = (row: TrainingRow): Training => ({
  slug: normalizeText(row.slug),
  title: normalizeText(row.title),
  category: normalizeText(row.category),
  status: normalizeStatus(row.status),
  summary: normalizeText(row.summary),
  description: normalizeText(row.description),
  outcomes: normalizeStringArray(row.outcomes),
  prerequisites: normalizeStringArray(row.prerequisites),
  details: normalizeDetails(row.details),
  coverImage: normalizeText(row.cover_image) || undefined,
  youtubeEmbed: normalizeText(row.youtube_embed) || undefined,
  pdfProgram: normalizeText(row.pdf_program) || undefined,
  registrationUrl: normalizeText(row.registration_url) || undefined,
});

const toRow = (training: Training): TrainingRow => ({
  slug: normalizeText(training.slug),
  title: normalizeText(training.title),
  category: normalizeText(training.category),
  status: normalizeStatus(training.status),
  summary: normalizeText(training.summary),
  description: normalizeText(training.description),
  outcomes: normalizeStringArray(training.outcomes),
  prerequisites: normalizeStringArray(training.prerequisites),
  details: normalizeDetails(training.details),
  cover_image: normalizeText(training.coverImage) || null,
  youtube_embed: normalizeText(training.youtubeEmbed) || null,
  pdf_program: normalizeText(training.pdfProgram) || null,
  registration_url: normalizeText(training.registrationUrl) || null,
});

const requireAdmin = (request: NextRequest) => {
  const adminKey = process.env.ACADEMY_ADMIN_KEY;
  if (!adminKey) {
    return NextResponse.json(
      { ok: false, message: "ACADEMY_ADMIN_KEY manquant." },
      { status: 500 }
    );
  }
  const provided = request.headers.get("x-admin-key") ?? "";
  if (provided !== adminKey) {
    return NextResponse.json(
      { ok: false, message: "Acces refuse." },
      { status: 401 }
    );
  }
  return null;
};

const getPayloadTrainings = (payload: unknown) => {
  if (Array.isArray(payload)) return payload as Training[];
  if (
    payload &&
    typeof payload === "object" &&
    Array.isArray((payload as { trainings?: Training[] }).trainings)
  ) {
    return (payload as { trainings: Training[] }).trainings;
  }
  return null;
};

const extractStoragePath = (value: string | null) => {
  const text = normalizeText(value);
  if (!text) return null;

  const prefixPublic = `/storage/v1/object/public/${bucketName}/`;
  const prefixSigned = `/storage/v1/object/sign/${bucketName}/`;

  try {
    const parsed = new URL(text);
    const path = parsed.pathname;
    if (path.includes(prefixPublic)) {
      return decodeURIComponent(path.split(prefixPublic)[1] ?? "");
    }
    if (path.includes(prefixSigned)) {
      return decodeURIComponent(path.split(prefixSigned)[1] ?? "");
    }
    return null;
  } catch {
    if (text.includes(prefixPublic)) {
      return text.split(prefixPublic)[1]?.split("?")[0] ?? null;
    }
    if (text.includes(prefixSigned)) {
      return text.split(prefixSigned)[1]?.split("?")[0] ?? null;
    }
    return null;
  }
};

export async function GET(request: NextRequest) {
  const authError = requireAdmin(request);
  if (authError) return authError;

  const { data, error } = await supabaseServer
    .from("academy_trainings")
    .select("*")
    .order("category", { ascending: true })
    .order("title", { ascending: true });

  if (error) {
    return NextResponse.json(
      { ok: false, message: "Erreur Supabase." },
      { status: 500 }
    );
  }

  const trainings = (data ?? []).map((row) => toTraining(row as TrainingRow));
  return NextResponse.json({ ok: true, trainings }, { status: 200 });
}

export async function PUT(request: NextRequest) {
  const authError = requireAdmin(request);
  if (authError) return authError;

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "JSON invalide." },
      { status: 400 }
    );
  }

  const trainings = getPayloadTrainings(payload);
  if (!trainings || trainings.length === 0) {
    return NextResponse.json(
      { ok: false, message: "Aucune formation fournie." },
      { status: 400 }
    );
  }

  const rows = trainings.map(toRow);
  const invalid = rows.find(
    (row) => !row.slug || !row.title || !row.category
  );
  if (invalid) {
    return NextResponse.json(
      { ok: false, message: "Slug, titre et categorie requis." },
      { status: 400 }
    );
  }

  const { data: existing, error: fetchError } = await supabaseServer
    .from("academy_trainings")
    .select("slug, cover_image, pdf_program");
  if (fetchError) {
    return NextResponse.json(
      { ok: false, message: "Erreur Supabase." },
      { status: 500 }
    );
  }

  const incomingSlugs = new Set(rows.map((row) => row.slug));
  const toDelete =
    existing?.filter((row) => !incomingSlugs.has(row.slug)) ?? [];

  if (toDelete.length > 0) {
    const paths = new Set<string>();
    toDelete.forEach((row) => {
      const coverPath = extractStoragePath(
        (row as { cover_image?: string | null }).cover_image ?? null
      );
      const pdfPath = extractStoragePath(
        (row as { pdf_program?: string | null }).pdf_program ?? null
      );
      if (coverPath) paths.add(coverPath);
      if (pdfPath) paths.add(pdfPath);
    });

    if (paths.size > 0) {
      const { error: storageError } = await supabaseServer.storage
        .from(bucketName)
        .remove(Array.from(paths));
      if (storageError) {
        return NextResponse.json(
          { ok: false, message: "Suppression medias impossible." },
          { status: 500 }
        );
      }
    }

    const { error: deleteError } = await supabaseServer
      .from("academy_trainings")
      .delete()
      .in(
        "slug",
        toDelete.map((row) => row.slug)
      );
    if (deleteError) {
      return NextResponse.json(
        { ok: false, message: "Suppression impossible." },
        { status: 500 }
      );
    }
  }

  const { error: upsertError } = await supabaseServer
    .from("academy_trainings")
    .upsert(
      rows.map((row) => ({
        ...row,
        updated_at: new Date().toISOString(),
      })),
      { onConflict: "slug" }
    );

  if (upsertError) {
    return NextResponse.json(
      { ok: false, message: "Ecriture impossible." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
