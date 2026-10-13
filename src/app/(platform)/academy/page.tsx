import type { Metadata } from "next";
import { TrainingFilters } from "@/components/academy/TrainingFilters";
import { fetchAcademyTrainings } from "@/lib/academy-data";
import { academyRegistrationUrl } from "@/lib/trainings";
import { ogImage, siteName } from "@/lib/seo";
import { AcademyHero } from "./AcademyHero";
import { UpcomingSessions } from "@/components/academy/UpcomingSessions";
import { WhyEnov } from "./WhyEnov";

export const metadata: Metadata = {
  title: "Enov Academy",
  description: "Formations en développement web, data, design et IoT. Consultez les programmes et les sessions ENOV Academy.",
  alternates: { canonical: "/academy" },
  openGraph: {
    title: "Enov Academy",
    description: "Formations en développement web, data, design et IoT.",
    url: "/academy",
    images: [{ url: ogImage, alt: siteName }],
  },
};

export const dynamic = "force-dynamic";

export default async function AcademyPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; cat?: string }>;
}) {
  const { q, cat } = await searchParams;
  const trainings  = await fetchAcademyTrainings();
  const categories = Array.from(new Set(trainings.map((t) => t.category)));

  return (
    <main className="academy-catalogue-page">
      <AcademyHero registrationUrl={academyRegistrationUrl} />
      <div className="app-shell">
        <UpcomingSessions trainings={trainings} />
        <WhyEnov />
        <div id="formations" className="scroll-mt-16 pb-24 pt-10">
          <TrainingFilters
            trainings={trainings}
            categories={categories}
            initialSearch={q ?? ""}
            initialCategory={cat ?? ""}
          />
        </div>
      </div>
    </main>
  );
}
