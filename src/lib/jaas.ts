import { SignJWT, importPKCS8 } from "jose";

const APP_ID = process.env.JAAS_APP_ID!;
const KEY_ID = process.env.JAAS_KEY_ID!;

function getPrivateKeyPem(): string {
  const raw = process.env.JAAS_PRIVATE_KEY ?? "";
  // Support both literal \n in env var and real newlines
  return raw.includes("\\n") ? raw.replace(/\\n/g, "\n") : raw;
}

export async function generateJaasToken({
  userId,
  userName,
  userEmail,
  roomName,
  isModerator = false,
  durationMinutes = 180,
}: {
  userId: string;
  userName: string;
  userEmail: string;
  roomName: string;
  isModerator?: boolean;
  durationMinutes?: number;
}): Promise<string> {
  const pem = getPrivateKeyPem();
  const privateKey = await importPKCS8(pem, "RS256");

  const now = Math.floor(Date.now() / 1000);

  const token = await new SignJWT({
    iss: "chat",
    iat: now,
    exp: now + durationMinutes * 60,
    nbf: now - 10,
    room: "*",
    sub: APP_ID,
    context: {
      user: {
        id: userId,
        name: userName,
        email: userEmail,
        avatar: "",
        moderator: isModerator,
      },
      features: {
        livestreaming: false,
        "outbound-call": false,
        "sip-outbound-call": false,
        transcription: false,
        recording: false,
      },
      room: { regex: false },
    },
  })
    .setProtectedHeader({ alg: "RS256", kid: KEY_ID, typ: "JWT" })
    .sign(privateKey);

  return token;
}

export function getJaasMeetingUrl(roomName: string, token: string): string {
  return `https://8x8.vc/${APP_ID}/${roomName}?jwt=${token}`;
}
