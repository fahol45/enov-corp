import { NextResponse } from "next/server";
import { sendContactNotification } from "@/lib/email";

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  message?: string;
};

const REQUIRED_FIELDS: Array<keyof ContactPayload> = ["name", "email", "message"];

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 10 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count += 1;
  return false;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { message: "Trop de demandes. Réessayez dans quelques minutes." },
      { status: 429 },
    );
  }

  let payload: ContactPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid payload." }, { status: 400 });
  }

  const missingField = REQUIRED_FIELDS.find(
    (field) => !payload[field] || payload[field]?.toString().trim() === "",
  );
  if (missingField) {
    return NextResponse.json(
      { message: `Missing field: ${missingField}` },
      { status: 400 },
    );
  }

  try {
    await sendContactNotification({
      name: payload.name!,
      email: payload.email!,
      phone: payload.phone,
      company: payload.company,
      message: payload.message!,
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { message: "Unable to send your message right now." },
      { status: 500 },
    );
  }
}
