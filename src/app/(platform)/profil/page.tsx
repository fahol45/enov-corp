import { createSupabaseServerClient } from "@/lib/supabase/auth-server";
import { supabaseServer } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { PageHero } from "@/components/SiteSections";
import { ProfileForms } from "@/components/academy/ProfileForms";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mon profil — Enov Academy",
};

export const dynamic = "force-dynamic";

export default async function ProfilPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login?next=/profil");

  const { count } = await supabaseServer
    .from("enrollments")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id);

  return (
    <main className="learner-page profile-page min-h-screen text-white">
      <PageHero eyebrow="MON PROFIL / ENOV ACADEMY" title="Mon profil." description="Informations personnelles et mot de passe." secondary={{ href: "/mon-espace", label: "Retour à mon espace" }} />
      <div className="app-shell py-10">
        <ProfileForms user={user} enrollmentCount={count ?? 0} />
      </div>
    </main>
  );
}
