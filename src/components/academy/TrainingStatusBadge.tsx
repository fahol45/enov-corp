import type { TrainingStatus } from "@/lib/trainings";

const labels: Record<TrainingStatus, string> = { available: "Disponible", soon: "Bientôt", closed: "Fermée" };
export function TrainingStatusBadge({ status, className = "" }: { status: TrainingStatus; className?: string }) {
  return <span className={`training-status training-status-${status} ${className}`}>{labels[status]}</span>;
}
