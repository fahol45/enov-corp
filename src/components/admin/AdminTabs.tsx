"use client";

import { useState } from "react";
import { TrainingAdmin } from "@/components/admin/academy/TrainingAdmin";
import { PortfolioAdmin } from "@/components/admin/PortfolioAdmin";
import { SlidesAdmin } from "@/components/admin/SlidesAdmin";

const TABS = [
  {
    id: "formations",
    label: "Formations",
    desc: "Fiches · statuts · médias",
    activeClass: "border-fuchsia-500/40 bg-fuchsia-500/10 text-white",
    dotClass: "bg-fuchsia-400",
  },
  {
    id: "portfolio",
    label: "Portfolio",
    desc: "Projets · visuels · liens",
    activeClass: "border-purple-500/40 bg-purple-500/10 text-white",
    dotClass: "bg-purple-400",
  },
  {
    id: "slides",
    label: "Slides d'accueil",
    desc: "Carrousel hero",
    activeClass: "border-sky-500/40 bg-sky-500/10 text-white",
    dotClass: "bg-sky-400",
  },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function AdminTabs() {
  const [active, setActive] = useState<TabId>("formations");

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST", credentials: "include" });
    } finally {
      window.location.href = "/admin/login";
    }
  };

  return (
    <div className="space-y-6">

      {/* Tab bar */}
      <div className="flex items-stretch gap-3">
        <div className="flex flex-1 gap-1.5 rounded-2xl border border-white/8 bg-slate-900/50 p-1.5">
          {TABS.map((tab) => {
            const isActive = active === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className={`flex flex-1 flex-col gap-0.5 rounded-xl border px-3 py-2.5 text-left transition-all duration-200 ${
                  isActive
                    ? tab.activeClass
                    : "border-transparent text-slate-500 hover:bg-white/5 hover:text-slate-300"
                }`}
              >
                <div className="flex items-center gap-1.5">
                  {isActive && (
                    <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${tab.dotClass}`} />
                  )}
                  <span className="text-xs font-semibold sm:text-sm">{tab.label}</span>
                </div>
                <span className="hidden text-[0.6rem] leading-tight opacity-50 sm:block">{tab.desc}</span>
              </button>
            );
          })}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="shrink-0 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-400 transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-300"
        >
          Déconnexion
        </button>
      </div>

      {/* Tab content */}
      {active === "formations" && <TrainingAdmin />}
      {active === "portfolio" && <PortfolioAdmin />}
      {active === "slides" && <SlidesAdmin />}

    </div>
  );
}
