import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

const bucketName = "academy-media";

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

const sanitize = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9._-]/g, "");

const isFile = (value: unknown): value is File =>
  typeof value === "object" &&
  value !== null &&
  "arrayBuffer" in value &&
  "name" in value;

const getExtension = (filename: string) => {
  const match = filename.toLowerCase().match(/\.[a-z0-9]+$/);
  return match ? match[0] : "";
};

export async function POST(request: NextRequest) {
  const authError = requireAdmin(request);
  if (authError) return authError;

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Formulaire invalide." },
      { status: 400 }
    );
  }

  const file = formData.get("file");
  const slug = formData.get("slug");
  const kind = formData.get("kind");

  if (!isFile(file)) {
    return NextResponse.json(
      { ok: false, message: "Fichier manquant." },
      { status: 400 }
    );
  }
  if (typeof slug !== "string" || slug.trim().length === 0) {
    return NextResponse.json(
      { ok: false, message: "Slug manquant." },
      { status: 400 }
    );
  }
  if (kind !== "image" && kind !== "pdf") {
    return NextResponse.json(
      { ok: false, message: "Type invalide." },
      { status: 400 }
    );
  }

  const contentType = file.type || "";
  const isImage =
    contentType === "image/jpeg" ||
    contentType === "image/jpg" ||
    contentType === "image/png";
  const isPdf = contentType === "application/pdf";

  if (kind === "image" && !isImage) {
    return NextResponse.json(
      { ok: false, message: "Format image invalide. Utiliser JPG ou PNG." },
      { status: 400 }
    );
  }
  if (kind === "pdf" && !isPdf) {
    return NextResponse.json(
      { ok: false, message: "Format PDF requis." },
      { status: 400 }
    );
  }

  const safeSlug = sanitize(slug);
  const safeName = sanitize(file.name || "upload");
  const baseName = safeName.replace(/\.[a-z0-9]+$/, "") || "media";
  const extension =
    kind === "image"
      ? contentType === "image/png"
        ? ".png"
        : ".jpg"
      : ".pdf";
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const filePath = `${safeSlug || "academy"}/${timestamp}-${baseName}${extension}`;

  const { error } = await supabaseServer.storage
    .from(bucketName)
    .upload(filePath, file, {
      upsert: true,
      contentType: contentType || undefined,
    });

  if (error) {
    return NextResponse.json(
      { ok: false, message: "Upload Supabase impossible." },
      { status: 500 }
    );
  }

  const { data } = supabaseServer.storage
    .from(bucketName)
    .getPublicUrl(filePath);

  return NextResponse.json(
    { ok: true, url: data.publicUrl, path: filePath },
    { status: 200 }
  );
}
