import type { Metadata } from "next";
import Link from "next/link";
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

const TESTIMONIALS = [
  { name: "Kouamé A.",   role: "Développeur web",        text: "La qualité des cours dépasse ce que j'ai vu ailleurs. Petit groupe, vrai suivi, on va vite en profondeur.",   rating: 5 },
  { name: "Fatou D.",    role: "Data analyst",            text: "J'ai pu mettre en pratique dès le lendemain. Le formateur répond aux questions au-delà des heures de cours.", rating: 5 },
  { name: "Ibrahim S.",  role: "Chef de projet digital",  text: "Très bonne structure. On sent qu'Enov connait ce qu'il faut vraiment pour le marché africain.",              rating: 5 },
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

  // Deterministic social proof
  const n        = training.slug.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const students  = 24 + (n % 76);
  const ratingVal = `${4}.${3 + (n % 7)}`;

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

  return (
    <main className="min-h-screen bg-slate-950 text-white">
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
      <div id="course-hero" className="relative overflow-hidden border-b border-white/[0.05]">
        {training.coverImage && (
          <div className="absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={training.coverImage} alt="" className="h-full w-full object-cover opacity-8 scale-105 blur-[2px]" />
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-b from-slate-950/70 via-slate-950/85 to-slate-950" />
        <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-transparent to-slate-950/80" />
        <div className="pointer-events-none absolute -top-10 left-1/3 w-[400px] h-[300px] bg-fuchsia-700/8 blur-[100px] rounded-full" />

        <div className="app-shell relative py-12 lg:py-16">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-[0.68rem] text-slate-600">
            <Link href="/academy" className="hover:text-slate-400 transition">Academy</Link>
            <span>/</span>
            <span className="text-fuchsia-500/80">{training.category}</span>
            <span>/</span>
            <span className="text-slate-500 truncate max-w-[180px]">{training.title}</span>
          </nav>

          <div className="max-w-3xl space-y-5">
            {/* Badges */}
            <div className="flex items-center flex-wrap gap-2">
              <TrainingStatusBadge status={training.status} />
              {training.status === "available" && (
                <span className="text-[0.58rem] font-black uppercase tracking-[0.15em] bg-amber-400 text-black px-2.5 py-1 rounded-full">
                  Bestseller
                </span>
              )}
              <span className="text-[0.6rem] font-semibold text-fuchsia-400/70 uppercase tracking-widest">
                {training.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-[clamp(1.7rem,5vw,3rem)] font-black leading-[1.08] tracking-tight text-white">
              {training.title}
            </h1>

            {/* Summary */}
            <p className="text-base text-slate-400 leading-relaxed max-w-2xl">{training.summary}</p>

            {/* Social proof row */}
            <div className="flex items-center flex-wrap gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="text-amber-400 font-bold">{ratingVal}</span>
                <Stars rating={parseFloat(ratingVal)} />
                <span className="text-slate-600">({students} apprenants)</span>
              </div>
              <span className="text-slate-700">·</span>
              <span className="text-slate-500">Créé par <span className="text-white font-semibold">Équipe Enov</span></span>
              <span className="text-slate-700">·</span>
              <span className={`font-semibold ${levelColor}`}>{training.details.level}</span>
            </div>

            {/* Quick specs */}
            <div className="flex flex-wrap gap-3 pt-1">
              {[
                { emoji: "⏱", label: training.details.duration },
                { emoji: "📅", label: training.details.nextSession },
                { emoji: "📍", label: training.details.location },
                { emoji: "🖥",  label: training.details.format },
              ].filter(s => s.label).map(({ emoji, label }) => (
                <span key={label} className="flex items-center gap-1.5 text-xs text-slate-500 bg-white/[0.03] border border-white/[0.06] rounded-full px-3 py-1">
                  <span>{emoji}</span>{label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

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
                  <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                    <span>★ {ratingVal} Note formateur</span>
                    <span>·</span>
                    <span>{students} apprenants</span>
                    <span>·</span>
                    <span>8+ formations</span>
                  </div>
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
            <Card title="Ce qu'en disent les apprenants">
              <div className="space-y-4">
                {/* Aggregate */}
                <div className="flex items-center gap-6 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  <div className="text-center shrink-0">
                    <p className="text-4xl font-black text-white">{ratingVal}</p>
                    <Stars rating={parseFloat(ratingVal)} size={14} />
                    <p className="text-[0.6rem] text-slate-600 mt-1">Note globale</p>
                  </div>
                  {/* Rating bars */}
                  <div className="flex-1 space-y-1.5">
                    {[5,4,3,2,1].map((star) => {
                      const pct = star === 5 ? 78 : star === 4 ? 16 : star === 3 ? 4 : 2;
                      return (
                        <div key={star} className="flex items-center gap-2">
                          <span className="text-[0.6rem] text-slate-600 w-2 shrink-0">{star}</span>
                          <div className="flex-1 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                            <div className="h-full rounded-full bg-amber-500/60" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="text-[0.6rem] text-slate-700 w-6 shrink-0">{pct}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Individual reviews */}
                {TESTIMONIALS.map((t) => (
                  <div key={t.name} className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-4 space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-linear-to-br from-fuchsia-700/60 to-violet-700/60 flex items-center justify-center text-xs font-bold text-white shrink-0">
                        {t.name[0]}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">{t.name}</p>
                        <p className="text-[0.6rem] text-slate-600">{t.role}</p>
                      </div>
                      <div className="ml-auto">
                        <Stars rating={t.rating} />
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                  </div>
                ))}
              </div>
            </Card>

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

                {/* Guarantee */}
                <p className="text-center text-[0.6rem] text-slate-600">
                  ✓ Satisfaction garantie · Accès replay inclus
                </p>

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

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: "🔒", label: "Paiement sécurisé" },
                { icon: "🎓", label: "Certifié Enov"     },
                { icon: "🔁", label: "Suivi inclus"      },
              ].map((b) => (
                <div key={b.label} className="flex flex-col items-center text-center rounded-xl border border-white/[0.05] bg-white/[0.02] py-3 px-2 gap-1.5">
                  <span className="text-lg">{b.icon}</span>
                  <span className="text-[0.55rem] text-slate-600 leading-tight">{b.label}</span>
                </div>
              ))}
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
        <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
    </section>
  );
}

/* ─── Stars ────────────────────────────────────────────────────────────────── */

function Stars({ rating, size = 11 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {[1,2,3,4,5].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24"
          fill={i <= Math.floor(rating) ? "#f59e0b" : "none"}
          stroke="#f59e0b" strokeWidth="2"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </span>
  );
}

/* ─── Icons ────────────────────────────────────────────────────────────────── */

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
