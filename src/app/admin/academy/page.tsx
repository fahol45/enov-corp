import type { Metadata } from "next";
import { TrainingAdmin } from "@/components/admin/academy/TrainingAdmin";

export const metadata: Metadata = {
  title: "Admin Academy",
  description:
    "Interface admin pour gerer les contenus Enov Academy.",
  alternates: {
    canonical: "/admin/academy",
  },
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
          <div className="space-y-4">
            <p className="kicker text-slate-400">ENOV ACADEMY ADMIN</p>
            <h1 className="text-4xl font-bold leading-tight sm:text-4xl">
              Gestion des contenus Enov Academy
            </h1>
            <p className="text-lg text-slate-300 text-pretty">
              Mettez a jour les formations, webinaires, statuts, medias,
              documents PDF et liens d'inscription. Cette interface conserve
              les brouillons en local et vous permet d'exporter la nouvelle
              base.
            </p>
          </div>
        </section>

        <TrainingAdmin />
      </div>
    </main>
  );
}
