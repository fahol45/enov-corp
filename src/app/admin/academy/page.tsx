import type { Metadata } from "next";
import { AdminTabs } from "@/components/admin/AdminTabs";

export const metadata: Metadata = {
  title: "Admin Enov",
  description: "Interface administration Enov CORP.",
  alternates: { canonical: "/admin/academy" },
};

export default function AdminAcademyPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute -top-24 left-10 h-72 w-72 rounded-full bg-[#ec008c]/25 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#00a3ff]/25 blur-3xl" />
      </div>

      <div className="app-shell section-flow relative">
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-[0_25px_60px_rgba(0,0,0,0.4)] sm:p-10">
          <div className="absolute -right-16 top-0 h-40 w-40 rounded-full bg-[#00a3ff]/20 blur-3xl" />
          <div className="space-y-2">
            <p className="kicker text-slate-400">ENOV CORP ADMIN</p>
            <h1 className="text-3xl font-bold">Tableau de bord</h1>
            <p className="text-slate-300">Gérez les formations, le portfolio et les slides d'accueil depuis cette interface.</p>
          </div>
        </section>

        <AdminTabs />
      </div>
    </main>
  );
}
