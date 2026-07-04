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

export default async function AcademyDetailPage({ params }: Props) {
  const { slug } = await params;
  const training = await fetchAcademyTraining(slug);
  if (!training) notFound();

  // Fetch sessions for this training
  const { data: sessions } = await supabaseServer
    .from("sessions")
    .select("id, title, scheduled_at, duration_minutes, max_participants, status, enrollments(count)")
    .eq("training_slug", slug)
    .neq("status", "ended")
    .order("scheduled_at", { ascending: true });

  // Check auth state and enrolled sessions
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

  const levelColor: Record<string, string> = {
    Débutant: "text-emerald-400",
    Intermédiaire: "text-amber-400",
    Avancé: "text-red-400",
    "Tous niveaux": "text-sky-400",
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }} />

      {/* Hero banner */}
      <div className="relative bg-slate-900 border-b border-white/10">
        {training.coverImage && (
          <div className="absolute inset-0 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={training.coverImage} alt="" className="h-full w-full object-cover opacity-15" />
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-r from-slate-900 via-slate-900/95 to-slate-900/70" />

        <div className="app-shell relative py-10">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-xs text-slate-500">
            <Link href="/academy" className="hover:text-white transition">Academy</Link>
            <span>›</span>
            <span className="text-slate-400">{training.category}</span>
            <span>›</span>
            <span className="text-slate-300 line-clamp-1">{training.title}</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-3">
              <TrainingStatusBadge status={training.status} />
              <span className="text-xs text-fuchsia-400 font-semibold uppercase tracking-widest">{training.category}</span>
            </div>
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl">{training.title}</h1>
            <p className="text-slate-300 text-base leading-relaxed">{training.summary}</p>

            <div className="flex flex-wrap gap-4 text-sm text-slate-300 pt-2">
              <span className="flex items-center gap-1.5">⏱ <strong className="text-white">{training.details.duration}</strong></span>
              <span className="flex items-center gap-1.5">🎯 <strong className={levelColor[training.details.level] ?? "text-white"}>{training.details.level}</strong></span>
              <span className="flex items-center gap-1.5">📅 <strong className="text-white">{training.details.nextSession}</strong></span>
              <span className="flex items-center gap-1.5">📍 <strong className="text-white">{training.details.location}</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content + sidebar */}
      <div className="app-shell py-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">

          {/* Left: content */}
          <div className="space-y-8">

            {/* Ce que vous apprendrez */}
            {training.outcomes.length > 0 && (
              <section className="border border-white/10 rounded-2xl p-6 bg-slate-900/60">
                <h2 className="text-xl font-bold mb-5">Ce que vous apprendrez</h2>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {training.outcomes.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-slate-300">
                      <span className="mt-0.5 text-fuchsia-400 shrink-0">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Prérequis */}
            {training.prerequisites.length > 0 && (
              <section>
                <h2 className="text-xl font-bold mb-4">Prérequis</h2>
                <ul className="space-y-2">
                  {training.prerequisites.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-slate-300">
                      <span className="mt-0.5 text-slate-500 shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Description */}
            <section>
              <h2 className="text-xl font-bold mb-4">Description</h2>
              <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">{training.description}</p>
            </section>

            {/* Programme PDF */}
            {training.pdfProgram && (
              <a
                href={training.pdfProgram}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-white/10 rounded-xl px-5 py-3 text-sm text-white hover:border-white/30 transition"
              >
                📄 Télécharger le programme PDF
              </a>
            )}

            {/* Aperçu vidéo */}
            {training.youtubeEmbed && (
              <section>
                <h2 className="text-xl font-bold mb-4">Aperçu de la formation</h2>
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-800">
                  <iframe
                    src={training.youtubeEmbed}
                    title={training.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              </section>
            )}

            {/* Sessions disponibles */}
            {sessions && sessions.length > 0 && (
              <SessionsSection
                sessions={sessions as any}
                trainingSlug={slug}
                trainingStatus={training.status}
                userLoggedIn={userLoggedIn}
                enrolledSessionIds={enrolledSessionIds}
              />
            )}

            {/* Inscription / état connecté */}
            {isEnrolled ? (
              <section className="border border-fuchsia-500/30 rounded-2xl p-8 bg-fuchsia-950/20 text-center">
                <p className="text-2xl mb-2">✓</p>
                <p className="text-fuchsia-300 font-bold text-lg mb-1">Tu es inscrit à cette formation</p>
                <p className="text-slate-400 text-sm mb-6">Retrouve ta session dans ton espace personnel.</p>
                <Link
                  href="/mon-espace"
                  className="inline-block bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold rounded-xl px-6 py-3 transition"
                >
                  Accéder à ma session →
                </Link>
              </section>
            ) : userLoggedIn ? null : training.status === "available" ? (
              <section id="inscription" className="scroll-mt-24">
                <h2 className="text-xl font-bold mb-4">S&apos;inscrire</h2>
                <RegisterForm slug={training.slug} />
              </section>
            ) : training.status === "soon" ? (
              <section id="notification" className="scroll-mt-24">
                <h2 className="text-xl font-bold mb-4">Être notifié à l&apos;ouverture</h2>
                <NotifyForm slug={training.slug} />
              </section>
            ) : null}
          </div>

          {/* Right: sticky enrollment card */}
          <div className="lg:sticky lg:top-8 h-fit">
            <div className="border border-white/10 rounded-2xl bg-slate-900 overflow-hidden shadow-2xl">
              {training.coverImage && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={training.coverImage} alt={training.title} className="w-full h-40 object-cover" />
              )}
              <div className="p-6 space-y-5">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-white">{training.details.price}</span>
                </div>

                {isEnrolled ? (
                  <Link
                    href="/mon-espace"
                    className="block w-full text-center bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold rounded-xl py-3 transition"
                  >
                    ✓ Accéder à ma session
                  </Link>
                ) : userLoggedIn && sessions && sessions.length > 0 ? (
                  <Link
                    href="#sessions"
                    className="block w-full text-center bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold rounded-xl py-3 transition"
                  >
                    Voir les sessions →
                  </Link>
                ) : training.status === "available" ? (
                  <Link
                    href={userLoggedIn ? "#sessions" : "#inscription"}
                    className="block w-full text-center bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold rounded-xl py-3 transition"
                  >
                    S&apos;inscrire maintenant
                  </Link>
                ) : training.status === "soon" ? (
                  <Link
                    href="#notification"
                    className="block w-full text-center bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl py-3 transition"
                  >
                    Être notifié à l&apos;ouverture
                  </Link>
                ) : (
                  <Link
                    href="/contact"
                    className="block w-full text-center bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-xl py-3 transition"
                  >
                    Contacter l&apos;équipe
                  </Link>
                )}

                <ul className="space-y-3 text-sm text-slate-300 border-t border-white/10 pt-5">
                  <li className="flex items-center gap-3">
                    <span>📅</span>
                    <span>Prochaine session : <strong className="text-white">{training.details.nextSession}</strong></span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span>⏱</span>
                    <span>Durée : <strong className="text-white">{training.details.duration}</strong></span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span>🎯</span>
                    <span>Niveau : <strong className={levelColor[training.details.level] ?? "text-white"}>{training.details.level}</strong></span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span>🖥</span>
                    <span>Format : <strong className="text-white">{training.details.format}</strong></span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span>📍</span>
                    <span>Lieu : <strong className="text-white">{training.details.location}</strong></span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span>🎓</span>
                    <span>Accompagnement personnalisé inclus</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span>📹</span>
                    <span>Accès replay de la session</span>
                  </li>
                </ul>

                <Link
                  href="/contact"
                  className="block w-full text-center border border-white/10 hover:border-white/30 text-white text-sm rounded-xl py-2.5 transition"
                >
                  Parler à un conseiller
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
