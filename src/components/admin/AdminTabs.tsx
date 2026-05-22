"use client";

import { useState } from "react";
import { TrainingAdmin } from "@/components/admin/academy/TrainingAdmin";
import { PortfolioAdmin } from "@/components/admin/PortfolioAdmin";
import { SlidesAdmin } from "@/components/admin/SlidesAdmin";

const TABS = [
  { id: "formations", label: "Formations" },
  { id: "portfolio", label: "Portfolio" },
  { id: "slides", label: "Slides d'accueil" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function AdminTabs() {
  const [active, setActive] = useState<TabId>("formations");

  return (
    <div className="space-y-6">
      {/* Tab bar */}
      <div className="flex gap-2 rounded-2xl border border-white/8 bg-slate-900/40 p-1.5">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
              active === tab.id
                ? "bg-[#ec008c]/20 text-white shadow-sm border border-[#ec008c]/30"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {active === "formations" && <TrainingAdmin />}
      {active === "portfolio" && <PortfolioAdmin />}
      {active === "slides" && <SlidesAdmin />}
    </div>
  );
}
