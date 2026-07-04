import { createSupabaseServerClient } from "@/lib/supabase/auth-server";
import { supabaseServer } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ProfileForms } from "@/components/academy/ProfileForms";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mon profil — Enov Academy",
};

export const dynamic = "force-dynamic";

export default async function ProfilPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const { count } = await supabaseServer
    .from("enrollments")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id);

  return (
    <main className="min-h-screen text-white">
      <div className="app-shell py-10">
        <ProfileForms user={user} enrollmentCount={count ?? 0} />
      </div>
    </main>
  );
}
