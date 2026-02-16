import { supabaseServer } from "@/lib/supabase/server";
import {
  trainings as fallbackTrainings,
  type Training,
  type TrainingStatus,
} from "@/lib/trainings";

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

export const fetchAcademyTrainings = async (): Promise<Training[]> => {
  try {
    const { data, error } = await supabaseServer
      .from("academy_trainings")
      .select("*")
      .order("category", { ascending: true })
      .order("title", { ascending: true });

    if (error) {
      return fallbackTrainings;
    }

    const rows = (data ?? []) as TrainingRow[];
    if (rows.length === 0) {
      return fallbackTrainings;
    }

    return rows.map((row) => toTraining(row));
  } catch {
    return fallbackTrainings;
  }
};

export const fetchAcademyTraining = async (
  slug: string
): Promise<Training | null> => {
  if (!slug) return null;
  const fallback =
    fallbackTrainings.find((training) => training.slug === slug) ?? null;
  try {
    const { data, error } = await supabaseServer
      .from("academy_trainings")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (error || !data) {
      return fallback;
    }

    return toTraining(data as TrainingRow);
  } catch {
    return fallback;
  }
};
