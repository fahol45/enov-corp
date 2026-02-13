import Link from "next/link";
import { notFound } from "next/navigation";
import { TrainingMedia } from "@/components/academy/TrainingMedia";
import { TrainingStatusBadge } from "@/components/academy/TrainingStatusBadge";
import { NotifyForm } from "@/components/academy/NotifyForm";
import { RegisterForm } from "@/components/academy/RegisterForm";
import { academyRegistrationUrl, getTraining } from "@/lib/trainings";

type AcademyDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function AcademyDetailPage({
  params,
}: AcademyDetailPageProps) {
  const { slug } = await params;
  const training = getTraining(slug);

  if (!training) {
    notFound();
  }

  const registrationUrl =
    training.registrationUrl || academyRegistrationUrl || "";

  const action =
    training.status === "available"
      ? { href: "#inscription", label: "S'inscrire maintenant" }
      : training.status === "soon"
        ? { href: "#notification", label: "Être notifié à l'ouverture" }
        : { href: "/contact", label: "Contacter l'équipe" };

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute -top-24 right-10 h-72 w-72 rounded-full bg-[#ec008c]/25 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-[#00a3ff]/20 blur-3xl" />
      </div>

      <div className="app-shell section-flow relative">
        <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6 rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-[0_25px_60px_rgba(0,0,0,0.4)] sm:p-10">
            <TrainingStatusBadge status={training.status} />
            <div className="space-y-3">
              <p className="kicker text-slate-400">{training.category}</p>
              <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
                {training.title}
              </h1>
              <p className="text-lg text-slate-300 text-pretty">
                {training.summary}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
                Prix: <span className="font-semibold">{training.details.price}</span>
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
                Prochaine session:{" "}
                <span className="font-semibold">
                  {training.details.nextSession}
                </span>
              </span>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href={action.href}
                className="inline-flex items-center gap-2 rounded-full border border-[#ec008c]/60 bg-[#ec008c]/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-[#ec008c] hover:bg-[#ec008c]/30"
              >
                {action.label}
                <span>→</span>
              </Link>
              {registrationUrl ? (
                <a
                  href={registrationUrl}
                  className="inline-flex items-center gap-2 rounded-full border border-[#00a3ff]/40 bg-[#00a3ff]/10 px-6 py-3 text-sm font-semibold text-white transition hover:border-[#00a3ff]/70 hover:bg-[#00a3ff]/20"
                  target="_blank"
                  rel="noreferrer"
                >
                  Formulaire d'inscription
                  <span className="text-[#00a3ff]">→</span>
                </a>
              ) : null}
              {training.pdfProgram ? (
                <a
                  href={training.pdfProgram}
                  className="inline-flex items-center gap-2 rounded-full border border-[#00a3ff]/40 bg-[#00a3ff]/10 px-6 py-3 text-sm font-semibold text-white transition hover:border-[#00a3ff]/70 hover:bg-[#00a3ff]/20"
                  target="_blank"
                  rel="noreferrer"
                >
                  Télécharger le programme PDF
                  <span className="text-[#00a3ff]">↗</span>
                </a>
              ) : null}
            </div>

            <div className="grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-slate-300 md:grid-cols-2">
              <div className="flex items-center justify-between gap-4">
                <span>Durée</span>
                <span className="text-white">{training.details.duration}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>Niveau</span>
                <span className="text-white">{training.details.level}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>Format</span>
                <span className="text-white">{training.details.format}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>Prochaine session</span>
                <span className="text-white">
                  {training.details.nextSession}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>Prix</span>
                <span className="text-white">{training.details.price}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>Lieu</span>
                <span className="text-white">{training.details.location}</span>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold">Description</h2>
                <p className="mt-3 text-base text-slate-300 text-pretty">
                  {training.description}
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <h3 className="text-lg font-semibold text-white">
                    Objectifs clés
                  </h3>
                  <ul className="mt-4 space-y-3 text-sm text-slate-300">
                    {training.outcomes.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-2 h-2 w-2 rounded-full bg-[#00a3ff]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <h3 className="text-lg font-semibold text-white">
                    Pré-requis
                  </h3>
                  <ul className="mt-4 space-y-3 text-sm text-slate-300">
                    {training.prerequisites.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-2 h-2 w-2 rounded-full bg-[#ec008c]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <TrainingMedia
            title={training.title}
            coverImage={training.coverImage}
            youtubeEmbed={training.youtubeEmbed}
            pdfProgram={training.pdfProgram}
          />
        </section>

        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6 text-slate-300">
            <h2 className="text-2xl font-semibold text-white">Plan d'action</h2>
            <p className="text-sm">
              Nos conseillers vous accompagnent pour structurer votre parcours
              et préparer votre montée en compétence.
            </p>
            <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.25em] text-slate-400">
              <span className="rounded-full border border-white/10 px-4 py-2">
                Coaching
              </span>
              <span className="rounded-full border border-white/10 px-4 py-2">
                Suivi personnalisé
              </span>
              <span className="rounded-full border border-white/10 px-4 py-2">
                Support technique
              </span>
            </div>
          </div>

          {training.status === "available" ? (
            <div id="inscription">
              <RegisterForm slug={training.slug} />
            </div>
          ) : null}

          {training.status === "soon" ? (
            <div id="notification">
              <NotifyForm slug={training.slug} />
            </div>
          ) : null}

          {training.status === "closed" ? (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-slate-300">
              <h3 className="text-2xl font-semibold text-white">
                Formation indisponible
              </h3>
              <p className="mt-3 text-sm">
                Ce programme est actuellement fermé. Contactez-nous pour être
                informé des prochaines ouvertures ou pour une alternative sur
                mesure.
              </p>
              <Link
                href="/contact"
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#ec008c]/60 bg-[#ec008c]/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-[#ec008c] hover:bg-[#ec008c]/30"
              >
                Contacter Enov Academy
                <span>→</span>
              </Link>
            </div>
          ) : null}
        </section>
      </div>
    </main>
  );
}
