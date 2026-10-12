import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/SiteSections";
import { notFound } from "next/navigation";
import { TrainingStatusBadge } from "@/components/academy/TrainingStatusBadge";
import { NotifyForm } from "@/components/academy/NotifyForm";
import { RegisterForm } from "@/components/academy/RegisterForm";
import { SessionsSection } from "@/components/academy/SessionsSection";
import { StickyHeader } from "@/components/academy/StickyHeader";
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
  "Avancé":       "text-rose-400",
  "Tous niveaux": "text-sky-400",
};

const INCLUDES = [
  { icon: "🎥", text: "Sessions live interactives en petit groupe (8 max)" },
  { icon: "📹", text: "Replay vidéo disponible après chaque session" },
  { icon: "📂", text: "Ressources et supports de cours inclus" },
  { icon: "🎓", text: "Certificat Enov Academy à la clé" },
  { icon: "💬", text: "Accès au canal de discussion privé" },
  { icon: "🔁", text: "Accompagnement personnalisé post-formation" },
];


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

  const isEnrolled  = enrolledSessionIds.length > 0;
  const hasSessions = (sessions ?? []).length > 0;

  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: training.title,
    description: training.summary,
    provider: { "@type": "Organization", name: siteName, url: siteUrl, logo: absoluteUrl("/icon-enov.png") },
    inLanguage: "fr",
    educationalLevel: training.details.level,
    courseMode: training.details.format,
  };

  const levelColor = LEVEL_COLOR[training.details.level] ?? "text-slate-400";

  return (
    <main className="course-detail-page min-h-screen bg-slate-950 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }} />

      {/* ── Sticky floating header (client, appears after hero scrolls out) ── */}
      <StickyHeader
        title={training.title}
        price={training.details.price}
        status={training.status}
        isEnrolled={isEnrolled}
        userLoggedIn={userLoggedIn}
        hasSessions={hasSessions}
        slug={slug}
      />

      {/* ── HERO ── */}
      <div id="course-hero"><PageHero eyebrow={training.category + " / ENOV ACADEMY"} title={training.title} description={training.summary} image={training.coverImage ? { src: training.coverImage, alt: training.title } : undefined} secondary={{ href: "/academy", label: "Retour au catalogue" }} /></div>

      {/* ── MAIN LAYOUT ── */}
      <div className="app-shell py-12">
        <div className="grid gap-10 xl:grid-cols-[1fr_340px]">

          {/* ── LEFT column ── */}
          <div className="space-y-8 min-w-0">

            {/* Ce que vous apprendrez */}
            {training.outcomes.length > 0 && (
              <Card title="Ce que vous apprendrez" glow>
                <ul className="grid sm:grid-cols-2 gap-2.5">
                  {training.outcomes.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-slate-400">
                      <span className="mt-0.5 w-5 h-5 rounded-md bg-fuchsia-500/12 border border-fuchsia-500/20 flex items-center justify-center shrink-0">
                        <CheckIcon />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            {/* Ce programme inclut */}
            <Card title="Ce programme inclut">
              <ul className="grid sm:grid-cols-2 gap-2.5">
                {INCLUDES.map(({ icon, text }) => (
                  <li key={text} className="flex items-start gap-3 text-sm text-slate-400">
                    <span className="text-base shrink-0 mt-0.5">{icon}</span>
                    {text}
                  </li>
                ))}
              </ul>
            </Card>

            {/* Prérequis */}
            {training.prerequisites.length > 0 && (
              <Card title="Prérequis">
                <ul className="space-y-2.5">
                  {training.prerequisites.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-slate-400">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-700 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            {/* Description */}
            {training.description && (
              <Card title="À propos de cette formation">
                <p className="text-sm text-slate-400 leading-relaxed whitespace-pre-line">{training.description}</p>
              </Card>
            )}

            {/* Aperçu vidéo */}
            {training.youtubeEmbed && (
              <Card title="Aperçu de la formation">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 border border-white/[0.06]">
                  <iframe
                    src={training.youtubeEmbed}
                    title={training.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              </Card>
            )}

            {/* Instructeur */}
            <Card title="Votre formateur">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-fuchsia-700 to-violet-700 flex items-center justify-center text-xl font-black text-white shrink-0 shadow-[0_0_24px_rgba(168,85,247,0.25)]">
                  E
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-white">Équipe Enov</p>
                  <p className="text-xs text-fuchsia-400 mb-2">Expert en Technologies Innovantes</p>

                  <p className="text-sm text-slate-500 leading-relaxed">
                    Enov réunit des experts terrain en développement, data, design et technologies industrielles.
                    Notre approche combine projets réels, feedback continu et petit groupe pour une progression rapide et durable.
                  </p>
                </div>
              </div>
            </Card>

            {/* Sessions */}
            {hasSessions && (
              <SessionsSection
                sessions={sessions as any}
                trainingSlug={slug}
                trainingStatus={training.status}
                userLoggedIn={userLoggedIn}
                enrolledSessionIds={enrolledSessionIds}
              />
            )}

            {/* Témoignages */}


            {/* Enrollment / form sections */}
            {isEnrolled ? (
              <div className="rounded-2xl border border-fuchsia-500/25 bg-fuchsia-950/[0.08] p-8 text-center">
                <div className="w-12 h-12 rounded-2xl bg-fuchsia-600/15 border border-fuchsia-500/25 flex items-center justify-center mx-auto mb-4">
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
              <Card title="S'inscrire" id="inscription">
                <RegisterForm slug={training.slug} />
              </Card>
            ) : training.status === "soon" ? (
              <Card title="Être notifié à l'ouverture" id="notification">
                <NotifyForm slug={training.slug} />
              </Card>
            ) : null}

            {/* PDF */}
            {training.pdfProgram && (
              <a
                href={training.pdfProgram}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 border border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/15 rounded-xl px-5 py-3 text-sm text-white transition"
              >
                <DocIcon />
                Télécharger le programme PDF
              </a>
            )}
          </div>

          {/* ── RIGHT: sticky sidebar ── */}
          <aside className="xl:sticky xl:top-20 h-fit space-y-4">
            <div className="rounded-2xl border border-white/[0.07] bg-[#0a0f18] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.55)]">

              {/* Cover */}
              {training.coverImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={training.coverImage} alt={training.title} className="w-full h-44 object-cover" />
              ) : (
                <div className="w-full h-28 bg-linear-to-br from-fuchsia-950/60 via-slate-900 to-violet-950/60" />
              )}

              <div className="p-6 space-y-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-white">{training.details.price || "À confirmer"}</span>
                </div>

                {/* CTA */}
                {isEnrolled ? (
                  <Link href="/mon-espace" className="block w-full text-center bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold text-sm rounded-xl py-3.5 transition shadow-[0_0_30px_rgba(192,38,211,0.25)]">
                    ✓ Accéder à ma session
                  </Link>
                ) : userLoggedIn && hasSessions ? (
                  <Link href="#sessions" className="block w-full text-center bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold text-sm rounded-xl py-3.5 transition shadow-[0_0_30px_rgba(192,38,211,0.25)]">
                    Voir les sessions →
                  </Link>
                ) : training.status === "available" ? (
                  <Link href={userLoggedIn ? "#sessions" : "#inscription"} className="block w-full text-center bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold text-sm rounded-xl py-3.5 transition shadow-[0_0_30px_rgba(192,38,211,0.25)]">
                    S&apos;inscrire maintenant
                  </Link>
                ) : training.status === "soon" ? (
                  <Link href="#notification" className="block w-full text-center bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm rounded-xl py-3.5 transition">
                    Être notifié à l&apos;ouverture
                  </Link>
                ) : (
                  <Link href="/contact" className="block w-full text-center bg-white/[0.06] border border-white/10 hover:bg-white/10 text-white font-bold text-sm rounded-xl py-3.5 transition">
                    Contacter l&apos;équipe
                  </Link>
                )}

                {/* Specs */}
                <ul className="space-y-2.5 border-t border-white/[0.05] pt-4">
                  {[
                    { icon: "📅", label: "Prochaine session", value: training.details.nextSession },
                    { icon: "⏱",  label: "Durée",             value: training.details.duration    },
                    { icon: "🎯", label: "Niveau",            value: training.details.level, color: levelColor },
                    { icon: "🖥",  label: "Format",            value: training.details.format      },
                    { icon: "📍", label: "Lieu",              value: training.details.location    },
                  ].filter(s => s.value).map(({ icon, label, value, color }) => (
                    <li key={label} className="flex items-center gap-2.5 text-xs text-slate-500">
                      <span className="shrink-0">{icon}</span>
                      <span className="flex-1">{label}</span>
                      <span className={`font-semibold text-right ${color ?? "text-white"}`}>{value}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/contact" className="block w-full text-center border border-white/[0.07] hover:border-white/15 text-slate-500 hover:text-white text-xs rounded-xl py-2.5 transition">
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

/* ─── Card ─────────────────────────────────────────────────────────────────── */

function Card({ title, children, glow, id }: { title: string; children: React.ReactNode; glow?: boolean; id?: string }) {
  return (
    <section id={id} className={`scroll-mt-24 rounded-2xl border overflow-hidden ${glow ? "border-fuchsia-500/12 bg-fuchsia-950/[0.05]" : "border-white/[0.06] bg-[#0c1018]"}`}>
      <div className={`px-6 py-4 border-b ${glow ? "border-fuchsia-500/10" : "border-white/[0.05]"}`}>
        <h2 className="text-lg font-bold text-slate-900">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
    </section>
  );
}

/* ─── Stars ────────────────────────────────────────────────────────────────── */

function CheckIcon({ size = 9, color = "text-fuchsia-400" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={color}>
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}

function DocIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
    </svg>
  );
}
