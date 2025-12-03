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

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid payload." },
      { status: 400 },
    );
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

  const recipient =
    process.env.CONTACT_RECIPIENT ?? "enovcorporation@gmail.com";

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    console.error(
      "Missing SMTP configuration. Please set SMTP_HOST, SMTP_PORT, SMTP_USER and SMTP_PASS.",
    );
    return NextResponse.json(
      { message: "Email service is not configured." },
      { status: 500 },
    );
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

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
        <p><strong>Nom:</strong> ${payload.name}</p>
        <p><strong>Email:</strong> ${payload.email}</p>
        <p><strong>Telephone:</strong> ${payload.phone ?? "-"}</p>
        <p><strong>Entreprise:</strong> ${payload.company ?? "-"}</p>
        <p><strong>Message:</strong></p>
        <p>${(payload.message ?? "").replace(/\n/g, "<br/>")}</p>
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
