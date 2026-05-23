import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  message?: string;
};

const REQUIRED_FIELDS: Array<keyof ContactPayload> = ["name", "email", "message"];

// In-memory rate limiter: max 3 submissions per IP per 10 minutes
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

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
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

  const recipient = process.env.CONTACT_RECIPIENT ?? "enovcorporation@gmail.com";
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    console.error("Missing SMTP configuration.");
    return NextResponse.json(
      { message: "Email service is not configured." },
      { status: 500 },
    );
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const name = escapeHtml(payload.name ?? "");
  const email = escapeHtml(payload.email ?? "");
  const phone = escapeHtml(payload.phone ?? "-");
  const company = escapeHtml(payload.company ?? "-");
  const message = escapeHtml(payload.message ?? "").replace(/\n/g, "<br/>");

  const textContent = [
    `Nom: ${payload.name}`,
    `Email: ${payload.email}`,
    `Telephone: ${payload.phone ?? "-"}`,
    `Entreprise: ${payload.company ?? "-"}`,
    "",
    "Message:",
    payload.message,
  ].join("\n");

  try {
    await transporter.sendMail({
      from: `"ENOV Contact" <${SMTP_USER}>`,
      replyTo: payload.email,
      to: recipient,
      subject: `Nouvelle demande ENOV - ${payload.name}`,
      text: textContent,
      html: `
        <p><strong>Nom:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telephone:</strong> ${phone}</p>
        <p><strong>Entreprise:</strong> ${company}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
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
