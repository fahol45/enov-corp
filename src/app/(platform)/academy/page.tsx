import type { Metadata } from "next";
import { TrainingFilters } from "@/components/academy/TrainingFilters";
import { fetchAcademyTrainings } from "@/lib/academy-data";
import { academyRegistrationUrl } from "@/lib/trainings";
import { ogImage, siteName } from "@/lib/seo";
import { AcademyHero } from "./AcademyHero";

export const metadata: Metadata = {
  title: "Enov Academy",
  description: "Formations intensives en technologies innovantes. Projets réels, petits groupes, certification incluse.",
  alternates: { canonical: "/academy" },
  openGraph: { title: "Enov Academy", description: "Formations intensives en technologies innovantes.", url: "/academy", images: [{ url: ogImage, alt: siteName }] },
};

export const dynamic = "force-dynamic";

export default async function AcademyPage() {
  const trainings = await fetchAcademyTrainings();
  const categories = Array.from(new Set(trainings.map((t) => t.category)));

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="app-shell">
        <AcademyHero registrationUrl={academyRegistrationUrl} />

        <div id="formations" className="scroll-mt-16 pb-20">
          <TrainingFilters trainings={trainings} categories={categories} />
        </div>
      </div>
    </main>
  );
}
