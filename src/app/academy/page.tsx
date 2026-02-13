import type { Metadata } from "next";
import Link from "next/link";
import { TrainingFilters } from "@/components/academy/TrainingFilters";
import { academyRegistrationUrl, categories, trainings } from "@/lib/trainings";
import { ogImage, siteName } from "@/lib/seo";

const title = "Enov Academy";
const description =
  "Enov Academy, pôle formation d'ENOV CORP, développe les compétences en technologies innovantes.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/academy",
  },
  openGraph: {
    title,
    description,
    url: "/academy",
    images: [
      {
        url: ogImage,
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage],
  },
};

export default function AcademyPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute -top-24 left-10 h-72 w-72 rounded-full bg-[#ec008c]/25 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#00a3ff]/25 blur-3xl" />
      </div>

      <div className="app-shell section-flow relative">
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-[0_25px_60px_rgba(0,0,0,0.4)] sm:p-10">
          <div className="absolute -right-16 top-0 h-40 w-40 rounded-full bg-[#00a3ff]/20 blur-3xl" />
          <div className="space-y-5">
            <p className="kicker text-slate-400">ENOV ACADEMY</p>
            <h1 className="text-4xl font-bold leading-tight sm:text-4xl">
              Des formations à la pointe de la technologie
            </h1>
            <p className="text-lg text-slate-300 text-pretty">
              Des formations immersives, orientées production et accompagnées
              par les experts d'ENOV CORP pour accélérer vos projets et vos
              équipes.
            </p>
            <div className="flex flex-wrap gap-3 text-sm text-slate-300">
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                Cohortes limitées
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                Mentoring personnalisé
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                Certification Enov
              </span>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="#inscription"
                className="inline-flex items-center gap-2 rounded-full border border-[#ec008c]/60 bg-[#ec008c]/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-[#ec008c] hover:bg-[#ec008c]/30"
              >
                S'inscrire
                <span>→</span>
              </Link>
              {academyRegistrationUrl ? (
                <a
                  href={academyRegistrationUrl}
                  className="inline-flex items-center gap-2 rounded-full border border-[#00a3ff]/40 bg-[#00a3ff]/10 px-6 py-3 text-sm font-semibold text-white transition hover:border-[#00a3ff]/70 hover:bg-[#00a3ff]/20"
                  target="_blank"
                  rel="noreferrer"
                >
                  Formulaire externe
                  <span className="text-[#00a3ff]">→</span>
                </a>
              ) : null}
            </div>
          </div>
        </section>

        <TrainingFilters trainings={trainings} categories={categories} />

        <section
          id="inscription"
          className="scroll-mt-24 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.35)] sm:p-8"
        >
          <div className="space-y-4">
            <p className="kicker text-slate-400">INSCRIPTION</p>
            <h2 className="text-2xl font-semibold text-white">
              Pré-inscription rapide
            </h2>
            <p className="text-sm text-slate-300 text-pretty">
              Choisissez une formation, consultez la fiche détaillée, puis
              soumettez votre demande. Notre équipe vous recontacte avec les
              prochaines disponibilités.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {academyRegistrationUrl ? (
              <a
                href={academyRegistrationUrl}
                className="inline-flex items-center gap-2 rounded-full border border-[#00a3ff]/40 bg-[#00a3ff]/10 px-6 py-3 text-sm font-semibold text-white transition hover:border-[#00a3ff]/70 hover:bg-[#00a3ff]/20"
                target="_blank"
                rel="noreferrer"
              >
                Accéder au formulaire externe
                <span className="text-[#00a3ff]">→</span>
              </a>
            ) : null}
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10"
            >
              Parler à un conseiller
              <span>→</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
