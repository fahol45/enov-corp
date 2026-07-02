import nodemailer from "nodemailer";

function createTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    throw new Error("SMTP configuration is missing.");
  }
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: false,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function baseTemplate(content: string): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#0f172a;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f172a;padding:40px 20px;">
    <tr><td align="center">
      <table width="100%" style="max-width:560px;background:#1e293b;border-radius:16px;border:1px solid rgba(255,255,255,0.1);overflow:hidden;">
        <tr>
          <td style="padding:32px 32px 24px;border-bottom:1px solid rgba(255,255,255,0.08);">
            <span style="font-size:20px;font-weight:900;color:#fff;letter-spacing:-0.5px;">ENOV<span style="color:#d946ef;">.</span></span>
          </td>
        </tr>
        <tr><td style="padding:32px;">${content}</td></tr>
        <tr>
          <td style="padding:20px 32px;border-top:1px solid rgba(255,255,255,0.08);font-size:11px;color:#64748b;">
            © ${new Date().getFullYear()} Enov Corp · <a href="https://enovcorp.com" style="color:#a855f7;text-decoration:none;">enovcorp.com</a>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function sendContactNotification(payload: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
}) {
  const transporter = createTransporter();
  const name = escapeHtml(payload.name);
  const email = escapeHtml(payload.email);
  const phone = escapeHtml(payload.phone ?? "-");
  const company = escapeHtml(payload.company ?? "-");
  const message = escapeHtml(payload.message).replace(/\n/g, "<br>");

  await transporter.sendMail({
    from: `"Enov Corp" <${process.env.SMTP_FROM ?? "contact@enovcorp.com"}>`,
    replyTo: payload.email,
    to: process.env.CONTACT_RECIPIENT ?? "contact@enovcorp.com",
    subject: `Nouvelle demande - ${payload.name}`,
    html: baseTemplate(`
      <h2 style="margin:0 0 24px;font-size:20px;font-weight:700;color:#fff;">Nouvelle demande de contact</h2>
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr><td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
          <span style="color:#94a3b8;font-size:12px;">Nom</span><br>
          <span style="color:#fff;font-size:14px;font-weight:600;">${name}</span>
        </td></tr>
        <tr><td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
          <span style="color:#94a3b8;font-size:12px;">Email</span><br>
          <a href="mailto:${email}" style="color:#a855f7;font-size:14px;">${email}</a>
        </td></tr>
        <tr><td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
          <span style="color:#94a3b8;font-size:12px;">Téléphone</span><br>
          <span style="color:#fff;font-size:14px;">${phone}</span>
        </td></tr>
        <tr><td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
          <span style="color:#94a3b8;font-size:12px;">Entreprise</span><br>
          <span style="color:#fff;font-size:14px;">${company}</span>
        </td></tr>
        <tr><td style="padding:16px 0 0;">
          <span style="color:#94a3b8;font-size:12px;">Message</span><br>
          <p style="color:#cbd5e1;font-size:14px;line-height:1.7;margin:8px 0 0;">${message}</p>
        </td></tr>
      </table>
    `),
  });
}

export async function sendAcademyRegistrationConfirmation(payload: {
  firstName: string;
  email: string;
  trainingTitle: string;
  trainingSlug: string;
}) {
  const transporter = createTransporter();

  await transporter.sendMail({
    from: `"Enov Academy" <${process.env.SMTP_FROM ?? "contact@enovcorp.com"}>`,
    to: payload.email,
    subject: `Inscription confirmée — ${payload.trainingTitle}`,
    html: baseTemplate(`
      <h2 style="margin:0 0 8px;font-size:20px;font-weight:700;color:#fff;">Inscription reçue ✓</h2>
      <p style="color:#94a3b8;font-size:14px;margin:0 0 24px;">Bonjour ${escapeHtml(payload.firstName)},</p>
      <p style="color:#cbd5e1;font-size:14px;line-height:1.7;margin:0 0 24px;">
        Nous avons bien reçu ta demande d'inscription pour la formation :
      </p>
      <div style="background:rgba(168,85,247,0.1);border:1px solid rgba(168,85,247,0.3);border-radius:12px;padding:16px 20px;margin:0 0 24px;">
        <span style="color:#d946ef;font-size:16px;font-weight:700;">${escapeHtml(payload.trainingTitle)}</span>
      </div>
      <p style="color:#cbd5e1;font-size:14px;line-height:1.7;margin:0 0 24px;">
        Notre équipe va examiner ta demande et te recontacter très prochainement avec les prochaines disponibilités et les détails de la session.
      </p>
      <a href="https://enovcorp.com/academy/${payload.trainingSlug}"
         style="display:inline-block;background:#a855f7;color:#fff;font-weight:700;font-size:14px;text-decoration:none;border-radius:12px;padding:12px 24px;">
        Voir la formation →
      </a>
    `),
  });
}

export async function sendAcademyRegistrationNotification(payload: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  trainingSlug: string;
  profile?: string;
  message?: string;
}) {
  const transporter = createTransporter();

  await transporter.sendMail({
    from: `"Enov Academy" <${process.env.SMTP_FROM ?? "contact@enovcorp.com"}>`,
    to: process.env.CONTACT_RECIPIENT ?? "contact@enovcorp.com",
    subject: `Nouvelle inscription Academy — ${payload.trainingSlug}`,
    html: baseTemplate(`
      <h2 style="margin:0 0 24px;font-size:20px;font-weight:700;color:#fff;">Nouvelle inscription Academy</h2>
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr><td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
          <span style="color:#94a3b8;font-size:12px;">Nom</span><br>
          <span style="color:#fff;font-size:14px;font-weight:600;">${escapeHtml(payload.firstName)} ${escapeHtml(payload.lastName)}</span>
        </td></tr>
        <tr><td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
          <span style="color:#94a3b8;font-size:12px;">Email</span><br>
          <a href="mailto:${escapeHtml(payload.email)}" style="color:#a855f7;font-size:14px;">${escapeHtml(payload.email)}</a>
        </td></tr>
        <tr><td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
          <span style="color:#94a3b8;font-size:12px;">Formation</span><br>
          <span style="color:#d946ef;font-size:14px;font-weight:600;">${escapeHtml(payload.trainingSlug)}</span>
        </td></tr>
        ${payload.phone ? `<tr><td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
          <span style="color:#94a3b8;font-size:12px;">Téléphone</span><br>
          <span style="color:#fff;font-size:14px;">${escapeHtml(payload.phone)}</span>
        </td></tr>` : ""}
        ${payload.profile ? `<tr><td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
          <span style="color:#94a3b8;font-size:12px;">Profil</span><br>
          <span style="color:#fff;font-size:14px;">${escapeHtml(payload.profile)}</span>
        </td></tr>` : ""}
        ${payload.message ? `<tr><td style="padding:8px 0 0;">
          <span style="color:#94a3b8;font-size:12px;">Message</span><br>
          <p style="color:#cbd5e1;font-size:14px;margin:8px 0 0;">${escapeHtml(payload.message)}</p>
        </td></tr>` : ""}
      </table>
    `),
  });
}

export async function sendNotifyConfirmation(payload: {
  name: string;
  email: string;
  trainingSlug: string;
}) {
  const transporter = createTransporter();

  await transporter.sendMail({
    from: `"Enov Academy" <${process.env.SMTP_FROM ?? "contact@enovcorp.com"}>`,
    to: payload.email,
    subject: `Tu seras notifié — ${payload.trainingSlug}`,
    html: baseTemplate(`
      <h2 style="margin:0 0 8px;font-size:20px;font-weight:700;color:#fff;">Notification enregistrée ✓</h2>
      <p style="color:#94a3b8;font-size:14px;margin:0 0 24px;">Bonjour ${escapeHtml(payload.name)},</p>
      <p style="color:#cbd5e1;font-size:14px;line-height:1.7;margin:0 0 24px;">
        Tu seras parmi les premiers informés dès l'ouverture des inscriptions pour :
      </p>
      <div style="background:rgba(168,85,247,0.1);border:1px solid rgba(168,85,247,0.3);border-radius:12px;padding:16px 20px;margin:0 0 24px;">
        <span style="color:#d946ef;font-size:16px;font-weight:700;">${escapeHtml(payload.trainingSlug)}</span>
      </div>
      <a href="https://enovcorp.com/academy"
         style="display:inline-block;background:#a855f7;color:#fff;font-weight:700;font-size:14px;text-decoration:none;border-radius:12px;padding:12px 24px;">
        Voir toutes les formations →
      </a>
    `),
  });
}
