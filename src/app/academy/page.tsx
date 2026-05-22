import type { Metadata } from "next";
import Link from "next/link";
import { TrainingFilters } from "@/components/academy/TrainingFilters";
import { academyRegistrationUrl } from "@/lib/trainings";
import { fetchAcademyTrainings } from "@/lib/academy-data";
import { ogImage, siteName } from "@/lib/seo";
import { AcademyHero } from "./AcademyHero";

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

export const dynamic = "force-dynamic";

export default async function AcademyPage() {
  const trainings = await fetchAcademyTrainings();
  const categories = Array.from(
    new Set(trainings.map((training) => training.category))
  );

  return (
    <main className="relative min-h-screen bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 left-10 h-[500px] w-[500px] rounded-full bg-[#ec008c]/10 blur-[100px]" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#00a3ff]/10 blur-[80px]" />
      </div>

      <div className="app-shell section-flow relative">
        <AcademyHero registrationUrl={academyRegistrationUrl} />

        <TrainingFilters trainings={trainings} categories={categories} />

        <section
          id="inscription"
          className="relative scroll-mt-24 overflow-hidden rounded-3xl p-6 sm:p-10"
        >
          <div className="absolute inset-0 bg-linear-to-br from-[#ec008c]/12 via-transparent to-[#00a3ff]/12" />
          <div className="absolute inset-0 rounded-3xl border border-white/10" />
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -left-10 -top-10 h-60 w-60 rounded-full bg-[#ec008c]/15 blur-3xl" />
            <div className="absolute -bottom-10 -right-10 h-60 w-60 rounded-full bg-[#00a3ff]/15 blur-3xl" />
          </div>
          <div className="relative space-y-5">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.5em] text-[#ec008c]/80">
                INSCRIPTION
              </p>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Pré-inscription rapide
              </h2>
              <p className="max-w-xl text-sm text-slate-300 text-pretty">
                Choisissez une formation, consultez la fiche détaillée, puis
                soumettez votre demande. Notre équipe vous recontacte avec les
                prochaines disponibilités.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {academyRegistrationUrl ? (
                <a
                  href={academyRegistrationUrl}
                  className="inline-flex items-center gap-2 rounded-full bg-[#00a3ff]/20 border border-[#00a3ff]/40 px-6 py-3 text-sm font-semibold text-white transition hover:border-[#00a3ff]/70 hover:bg-[#00a3ff]/30"
                  target="_blank"
                  rel="noreferrer"
                >
                  Accéder au formulaire externe
                  <span className="text-[#00a3ff]">→</span>
                </a>
              ) : null}
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10"
              >
                Parler à un conseiller
                <span>→</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
