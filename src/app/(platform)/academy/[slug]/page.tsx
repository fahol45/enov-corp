import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TrainingStatusBadge } from "@/components/academy/TrainingStatusBadge";
import { NotifyForm } from "@/components/academy/NotifyForm";
import { RegisterForm } from "@/components/academy/RegisterForm";
import { SessionsSection } from "@/components/academy/SessionsSection";
import { fetchAcademyTraining } from "@/lib/academy-data";
import { absoluteUrl, ogImage, siteName, siteUrl } from "@/lib/seo";
import { supabaseServer } from "@/lib/supabase/server";
import { createSupabaseServerClient } from "@/lib/supabase/auth-server";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const training = await fetchAcademyTraining(slug);
  if (!training) return { title: "Formation introuvable", robots: { index: false, follow: false } };
  return {
    title: training.title,
    description: training.summary,
    alternates: { canonical: `/academy/${training.slug}` },
    openGraph: {
      title: training.title,
      description: training.summary,
      url: `/academy/${training.slug}`,
      images: [{ url: training.coverImage || ogImage, alt: siteName }],
    },
    twitter: { card: "summary_large_image", title: training.title, description: training.summary, images: [training.coverImage || ogImage] },
  };
}

const LEVEL_COLOR: Record<string, string> = {
  "Débutant":     "text-emerald-400",
  "Intermédiaire":"text-amber-400",
  "Avancé":       "text-red-400",
  "Tous niveaux": "text-sky-400",
};

const LEVEL_BG: Record<string, string> = {
  "Débutant":     "bg-emerald-500/10 border-emerald-500/25",
  "Intermédiaire":"bg-amber-500/10 border-amber-500/25",
  "Avancé":       "bg-red-500/10 border-red-500/25",
  "Tous niveaux": "bg-sky-500/10 border-sky-500/25",
};

export default async function AcademyDetailPage({ params }: Props) {
  const { slug } = await params;
  const training = await fetchAcademyTraining(slug);
  if (!training) notFound();

  const { data: sessions } = await supabaseServer
    .from("sessions")
    .select("id, title, scheduled_at, duration_minutes, max_participants, status, enrollments(count)")
    .eq("training_slug", slug)
    .neq("status", "ended")
    .order("scheduled_at", { ascending: true });

  let userLoggedIn = false;
  let enrolledSessionIds: string[] = [];
  try {
    const authClient = await createSupabaseServerClient();
    const { data: { user } } = await authClient.auth.getUser();
    if (user) {
      userLoggedIn = true;
      if (sessions && sessions.length > 0) {
        const sessionIds = sessions.map((s: { id: string }) => s.id);
        const { data: enrollments } = await supabaseServer
          .from("enrollments")
          .select("session_id")
          .eq("user_id", user.id)
          .in("session_id", sessionIds);
        enrolledSessionIds = (enrollments ?? []).map((e: { session_id: string }) => e.session_id);
      }
    }
  } catch { /* not logged in */ }
  const isEnrolled = enrolledSessionIds.length > 0;

  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: training.title,
    description: training.summary,
    provider: { "@type": "Organization", name: siteName, url: siteUrl, logo: absoluteUrl(ogImage) },
    inLanguage: "fr",
    educationalLevel: training.details.level,
    courseMode: training.details.format,
  };

  const levelColor = LEVEL_COLOR[training.details.level] ?? "text-slate-400";
  const levelBg    = LEVEL_BG[training.details.level]    ?? "bg-slate-800 border-slate-700";

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }} />

      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden border-b border-white/[0.06]">

        {/* Cover image */}
        {training.coverImage && (
          <div className="absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={training.coverImage} alt="" className="h-full w-full object-cover opacity-10 scale-105 blur-sm" />
          </div>
        )}

        {/* Dark gradients */}
        <div className="absolute inset-0 bg-linear-to-b from-slate-950/80 via-slate-950/90 to-slate-950" />
        <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-transparent to-slate-950" />

        {/* Glow */}
        <div className="pointer-events-none absolute -top-16 left-1/3 w-[500px] h-[300px] bg-fuchsia-700/10 blur-[100px] rounded-full" />

        <div className="app-shell relative py-12">

          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-[0.7rem] text-slate-600">
            <Link href="/academy" className="hover:text-slate-400 transition">Academy</Link>
            <span>/</span>
            <span className="text-fuchsia-500">{training.category}</span>
            <span>/</span>
            <span className="text-slate-500 truncate max-w-[200px]">{training.title}</span>
          </nav>

          <div className="max-w-3xl space-y-5">

            {/* Badges row */}
            <div className="flex items-center flex-wrap gap-2">
              <TrainingStatusBadge status={training.status} />
              <span className={`text-[0.6rem] font-bold uppercase tracking-[0.18em] px-2.5 py-1 rounded-full border ${levelBg} ${levelColor}`}>
                {training.details.level}
              </span>
              <span className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-fuchsia-400 bg-fuchsia-500/10 border border-fuchsia-500/25 px-2.5 py-1 rounded-full">
                {training.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.07] tracking-tight text-white">
              {training.title}
            </h1>

            {/* Summary */}
            <p className="text-base text-slate-400 leading-relaxed max-w-2xl">{training.summary}</p>

            {/* Quick-specs inline */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2">
              {[
                { icon: <ClockIcon />, label: training.details.duration },
                { icon: <CalIcon />, label: training.details.nextSession },
                { icon: <PinIcon />, label: training.details.location },
                { icon: <MonitorIcon />, label: training.details.format },
              ].map(({ icon, label }) => (
                <span key={label} className="flex items-center gap-1.5 text-xs text-slate-500">
                  <span className="text-slate-700">{icon}</span>
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN LAYOUT ──────────────────────────────────────────────────────── */}
      <div className="app-shell py-12">
        <div className="grid gap-10 xl:grid-cols-[1fr_360px]">

          {/* ── LEFT ── */}
          <div className="space-y-10 min-w-0">

            {/* Ce que vous apprendrez */}
            {training.outcomes.length > 0 && (
              <ContentSection title="Ce que vous apprendrez" glow>
                <ul className="grid sm:grid-cols-2 gap-2.5">
                  {training.outcomes.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-slate-400">
                      <span className="mt-0.5 w-5 h-5 rounded-md bg-fuchsia-500/15 border border-fuchsia-500/25 flex items-center justify-center shrink-0">
                        <CheckIcon />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </ContentSection>
            )}

            {/* Prérequis */}
            {training.prerequisites.length > 0 && (
              <ContentSection title="Prérequis">
                <ul className="space-y-2.5">
                  {training.prerequisites.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-slate-400">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-slate-700 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </ContentSection>
            )}

            {/* Description */}
            <ContentSection title="À propos de cette formation">
              <p className="text-sm text-slate-400 leading-relaxed whitespace-pre-line">{training.description}</p>
            </ContentSection>

            {/* Programme PDF */}
            {training.pdfProgram && (
              <a
                href={training.pdfProgram}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 rounded-xl px-5 py-3 text-sm text-white transition"
              >
                <DocumentIcon />
                Télécharger le programme PDF
              </a>
            )}

            {/* Aperçu vidéo */}
            {training.youtubeEmbed && (
              <ContentSection title="Aperçu de la formation">
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-white/[0.06]">
                  <iframe
                    src={training.youtubeEmbed}
                    title={training.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              </ContentSection>
            )}

            {/* Sessions */}
            {sessions && sessions.length > 0 && (
              <SessionsSection
                sessions={sessions as any}
                trainingSlug={slug}
                trainingStatus={training.status}
                userLoggedIn={userLoggedIn}
                enrolledSessionIds={enrolledSessionIds}
              />
            )}

            {/* Enrollment states */}
            {isEnrolled ? (
              <div className="rounded-2xl border border-fuchsia-500/30 bg-fuchsia-950/20 p-8 text-center">
                <div className="w-12 h-12 rounded-2xl bg-fuchsia-600/20 border border-fuchsia-500/30 flex items-center justify-center mx-auto mb-4">
                  <CheckIcon size={20} color="text-fuchsia-400" />
                </div>
                <p className="text-lg font-black text-fuchsia-300 mb-1">Tu es inscrit !</p>
                <p className="text-sm text-slate-500 mb-6">Retrouve ta session dans ton espace personnel.</p>
                <Link
                  href="/mon-espace"
                  className="inline-flex items-center gap-2 bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold text-sm rounded-xl px-6 py-3 transition shadow-[0_0_30px_rgba(168,85,247,0.25)]"
                >
                  Accéder à Mon Espace →
                </Link>
              </div>
            ) : userLoggedIn ? null : training.status === "available" ? (
              <ContentSection title="S'inscrire" id="inscription">
                <RegisterForm slug={training.slug} />
              </ContentSection>
            ) : training.status === "soon" ? (
              <ContentSection title="Être notifié à l'ouverture" id="notification">
                <NotifyForm slug={training.slug} />
              </ContentSection>
            ) : null}
          </div>

          {/* ── RIGHT: sticky card ── */}
          <aside className="xl:sticky xl:top-8 h-fit">
            <div className="rounded-2xl border border-white/[0.07] bg-[#0c1018] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.5)]">

              {/* Cover thumb */}
              {training.coverImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={training.coverImage} alt={training.title} className="w-full h-44 object-cover" />
              ) : (
                <div className="w-full h-32 bg-linear-to-br from-fuchsia-950/60 via-slate-900 to-violet-950/60 flex items-center justify-center">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="opacity-10">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}

              <div className="p-6 space-y-5">

                {/* Price */}
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-white">{training.details.price}</span>
                </div>

                {/* CTA button */}
                {isEnrolled ? (
                  <Link href="/mon-espace" className="cta-primary block w-full text-center">
                    ✓ Accéder à ma session
                  </Link>
                ) : userLoggedIn && sessions && sessions.length > 0 ? (
                  <Link href="#sessions" className="cta-primary block w-full text-center">
                    Voir les sessions disponibles →
                  </Link>
                ) : training.status === "available" ? (
                  <Link href={userLoggedIn ? "#sessions" : "#inscription"} className="cta-primary block w-full text-center">
                    S&apos;inscrire maintenant
                  </Link>
                ) : training.status === "soon" ? (
                  <Link href="#notification" className="block w-full text-center bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm rounded-xl py-3 transition">
                    Être notifié à l&apos;ouverture
                  </Link>
                ) : (
                  <Link href="/contact" className="block w-full text-center bg-white/[0.06] border border-white/[0.1] hover:bg-white/[0.1] text-white font-bold text-sm rounded-xl py-3 transition">
                    Contacter l&apos;équipe
                  </Link>
                )}

                {/* Specs list */}
                <ul className="space-y-3 border-t border-white/[0.06] pt-5">
                  {[
                    { icon: <CalIcon />, text: <>Prochaine session : <strong className="text-white">{training.details.nextSession}</strong></> },
                    { icon: <ClockIcon />, text: <>Durée : <strong className="text-white">{training.details.duration}</strong></> },
                    { icon: <TargetIcon />, text: <>Niveau : <strong className={levelColor}>{training.details.level}</strong></> },
                    { icon: <MonitorIcon />, text: <>Format : <strong className="text-white">{training.details.format}</strong></> },
                    { icon: <PinIcon />, text: <>Lieu : <strong className="text-white">{training.details.location}</strong></> },
                    { icon: <GraduateIcon />, text: <>Accompagnement personnalisé inclus</> },
                    { icon: <PlayIcon />, text: <>Replay de la session inclus</> },
                  ].map(({ icon, text }, i) => (
                    <li key={i} className="flex items-center gap-3 text-xs text-slate-500">
                      <span className="text-slate-700 shrink-0">{icon}</span>
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>

                {/* Secondary link */}
                <Link
                  href="/contact"
                  className="block w-full text-center border border-white/[0.07] hover:border-white/20 text-slate-400 hover:text-white text-xs rounded-xl py-2.5 transition"
                >
                  Parler à un conseiller
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

/* ─── Content Section ──────────────────────────────────────────────────────── */

function ContentSection({ title, children, glow, id }: { title: string; children: React.ReactNode; glow?: boolean; id?: string }) {
  return (
    <section id={id} className={`scroll-mt-24 rounded-2xl border overflow-hidden ${glow ? "border-fuchsia-500/15 bg-fuchsia-950/[0.06]" : "border-white/[0.06] bg-[#0c1018]"}`}>
      <div className={`px-6 py-4 border-b ${glow ? "border-fuchsia-500/10" : "border-white/[0.05]"}`}>
        <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-slate-400">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
    </section>
  );
}

/* ─── Icons ────────────────────────────────────────────────────────────────── */

function CheckIcon({ size = 12, color = "text-fuchsia-400" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={color}>
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}
function ClockIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
}
function CalIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>;
}
function PinIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
}
function MonitorIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>;
}
function TargetIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>;
}
function GraduateIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>;
}
function PlayIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>;
}
function DocumentIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>;
}
