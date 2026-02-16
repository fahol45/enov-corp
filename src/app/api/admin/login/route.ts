import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

export async function POST(request: NextRequest) {
  const adminUser = process.env.ADMIN_USER;
  const adminPass = process.env.ADMIN_PASS;
  const sessionToken = process.env.ADMIN_SESSION_TOKEN;

  if (!adminUser || !adminPass || !sessionToken) {
    return NextResponse.json(
      { ok: false, message: "Configuration admin manquante." },
      { status: 500 }
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "JSON invalide." },
      { status: 400 }
    );
  }

  const body = payload as Record<string, unknown>;
  const username = body.username;
  const password = body.password;

  if (!isNonEmptyString(username) || !isNonEmptyString(password)) {
    return NextResponse.json(
      { ok: false, message: "Identifiants invalides." },
      { status: 400 }
    );
  }

  if (username.trim() !== adminUser || password.trim() !== adminPass) {
    return NextResponse.json(
      { ok: false, message: "Identifiants incorrects." },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ ok: true }, { status: 200 });
  response.cookies.set("enov_admin_session", sessionToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 12,
    path: "/",
  });

  return response;
}
