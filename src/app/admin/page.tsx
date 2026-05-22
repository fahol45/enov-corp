import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin Enov CORP",
  description: "Tableau de bord administration Enov CORP.",
};

const sections = [
  { href: "/admin/academy", label: "Academy", desc: "Formations, webinaires, statuts, médias, liens d'inscription.", color: "from-[#ec008c]/20 to-[#00a3ff]/20", border: "border-[#ec008c]/20 hover:border-[#ec008c]/50" },
  { href: "/admin/portfolio", label: "Portfolio", desc: "Projets réalisés, images, liens vers les sites et apps.", color: "from-sky-500/20 to-fuchsia-500/20", border: "border-sky-500/20 hover:border-sky-500/50" },
  { href: "/admin/slides", label: "Slides d'accueil", desc: "Images du carousel animé sur la page d'accueil.", color: "from-emerald-500/20 to-cyan-500/20", border: "border-emerald-500/20 hover:border-emerald-500/50" },
];

export default function AdminDashboard() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -top-24 left-10 h-72 w-72 rounded-full bg-[#ec008c]/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#00a3ff]/20 blur-3xl" />
      </div>

      <div className="app-shell section-flow relative">
        <section className="space-y-2">
          <p className="kicker text-slate-400">ENOV CORP</p>
          <h1 className="text-4xl font-bold">Administration</h1>
          <p className="text-slate-400">Gérez les contenus du site depuis cette interface.</p>
        </section>

        <section className="grid gap-4 sm:grid-cols-3">
          {sections.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className={`group relative overflow-hidden rounded-3xl border bg-linear-to-br p-6 transition-all duration-300 hover:-translate-y-0.5 ${s.color} ${s.border}`}
            >
              <div className="space-y-2">
                <p className="text-lg font-bold text-white">{s.label}</p>
                <p className="text-sm text-slate-400">{s.desc}</p>
              </div>
              <span className="absolute bottom-4 right-5 text-2xl text-slate-600 transition-all group-hover:translate-x-1 group-hover:text-white">→</span>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
