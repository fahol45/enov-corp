"use client";

import { useState } from "react";
import { TrainingAdmin } from "@/components/admin/academy/TrainingAdmin";
import { PortfolioAdmin } from "@/components/admin/PortfolioAdmin";
import { SlidesAdmin } from "@/components/admin/SlidesAdmin";
import { SessionsAdmin } from "@/components/admin/SessionsAdmin";
import Link from "next/link";

const NAV = [
  {
    id: "formations",
    label: "Formations",
    desc: "Fiches · statuts · médias",
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    ),
    accent: "fuchsia",
    activeText: "text-fuchsia-300",
    activeBg: "bg-fuchsia-500/10 border-fuchsia-500/30",
    dot: "bg-fuchsia-400",
  },
  {
    id: "sessions",
    label: "Sessions live",
    desc: "Jitsi · inscriptions",
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.069A1 1 0 0121 8.882v6.236a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    accent: "red",
    activeText: "text-red-300",
    activeBg: "bg-red-500/10 border-red-500/30",
    dot: "bg-red-400 animate-pulse",
  },
  {
    id: "portfolio",
    label: "Portfolio",
    desc: "Projets · visuels · liens",
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    accent: "purple",
    activeText: "text-purple-300",
    activeBg: "bg-purple-500/10 border-purple-500/30",
    dot: "bg-purple-400",
  },
  {
    id: "slides",
    label: "Slides d'accueil",
    desc: "Carrousel hero",
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    accent: "sky",
    activeText: "text-sky-300",
    activeBg: "bg-sky-500/10 border-sky-500/30",
    dot: "bg-sky-400",
  },
] as const;

type TabId = (typeof NAV)[number]["id"];

export function AdminTabs() {
  const [active, setActive] = useState<TabId>("formations");
  const [mobileOpen, setMobileOpen] = useState(false);

  const activeTab = NAV.find((n) => n.id === active)!;

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST", credentials: "include" });
    } finally {
      window.location.href = "/admin/login";
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">

      {/* ── Sidebar ── */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 flex w-60 flex-col border-r border-white/8 bg-slate-900/80 backdrop-blur-xl
        transition-transform duration-300
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}>
        {/* Brand */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-white/8">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-fuchsia-500 to-sky-500 shadow-lg">
            <span className="text-xs font-black text-white">E</span>
          </div>
          <div>
            <p className="text-sm font-bold tracking-tight text-white">Enov CORP</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest">Admin</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {NAV.map((item) => {
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setActive(item.id); setMobileOpen(false); }}
                className={`
                  w-full flex items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-all duration-200
                  ${isActive
                    ? `${item.activeBg} ${item.activeText}`
                    : "border-transparent text-slate-500 hover:bg-white/5 hover:text-slate-300"}
                `}
              >
                <span className={`shrink-0 ${isActive ? item.activeText : ""}`}>{item.icon}</span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold truncate">{item.label}</span>
                    {item.id === "sessions" && (
                      <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse shrink-0" />
                    )}
                  </div>
                  <span className="text-[10px] leading-tight opacity-50 truncate block">{item.desc}</span>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Bottom: site link + logout */}
        <div className="border-t border-white/8 px-3 py-4 space-y-1">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-slate-500 hover:bg-white/5 hover:text-slate-300 transition"
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            <span className="text-sm">Voir le site</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-slate-500 hover:bg-red-500/10 hover:text-red-300 transition"
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="text-sm font-semibold">Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── Main content ── */}
      <div className="flex flex-1 flex-col lg:ml-60">

        {/* Top bar (mobile + breadcrumb) */}
        <header className="sticky top-0 z-20 flex h-14 items-center gap-4 border-b border-white/8 bg-slate-950/90 backdrop-blur-xl px-4 lg:px-8">
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-slate-400 hover:text-white transition"
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-500">Admin</span>
            <span className="text-slate-700">/</span>
            <span className={`font-semibold ${activeTab.activeText}`}>{activeTab.label}</span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 px-4 py-6 lg:px-8 lg:py-8">
          {active === "formations" && <TrainingAdmin />}
          {active === "sessions" && <SessionsAdmin />}
          {active === "portfolio" && <PortfolioAdmin />}
          {active === "slides" && <SlidesAdmin />}
        </main>
      </div>
    </div>
  );
}
