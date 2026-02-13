"use client";

import type { TrainingStatus } from "@/lib/trainings";

type TrainingStatusBadgeProps = {
  status: TrainingStatus;
  className?: string;
};

const statusStyles: Record<TrainingStatus, string> = {
  available:
    "border border-[#7fd3ff] bg-[#00a3ff]/90 text-slate-950 shadow-[0_0_22px_rgba(0,163,255,0.45)]",
  soon:
    "border border-[#ff8bd4] bg-[#ec008c]/85 text-slate-950 shadow-[0_0_22px_rgba(236,0,140,0.45)]",
  closed:
    "border border-slate-200/70 bg-slate-200/85 text-slate-950 shadow-[0_0_18px_rgba(226,232,240,0.35)]",
};

const statusLabel: Record<TrainingStatus, string> = {
  available: "Disponible",
  soon: "Bientôt",
  closed: "Fermée",
};

export function TrainingStatusBadge({
  status,
  className,
}: TrainingStatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${statusStyles[status]} ${className ?? ""}`}
    >
      {statusLabel[status]}
    </span>
  );
}
