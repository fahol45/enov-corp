import { useId } from "react";
import type { ExpertiseKey } from "@/lib/site-content";
import styles from "./EngineeringVisual.module.css";

/** Abstract engineering diagram, not product telemetry or a product demonstration. */
export function EngineeringVisual({ variant = "ai", className = "" }: { variant?: ExpertiseKey; className?: string }) {
  const gradientId = useId();
  return <div className={`${styles.scene} ${styles[variant]} ${className}`} aria-hidden="true">
    <svg viewBox="0 0 600 600" fill="none" className={styles.diagram}>
      <defs><linearGradient id={gradientId} x1="80" y1="40" x2="510" y2="550" gradientUnits="userSpaceOnUse"><stop stopColor="#F5DCE9" /><stop offset=".5" stopColor="#E01078" /><stop offset="1" stopColor="#8C225A" /></linearGradient></defs>
      <g className={styles.orbits}><ellipse cx="300" cy="300" rx="245" ry="110" transform="rotate(-35 300 300)" /><ellipse cx="300" cy="300" rx="245" ry="110" transform="rotate(35 300 300)" /><ellipse cx="300" cy="300" rx="110" ry="245" /></g>
      <g stroke={`url(#${gradientId})`} className={styles.flow}><path d="M58 300h126l60-104h112l60 104h126" /><path d="M180 90v110l120 100 120 100v110" /><path d="M420 90v110L300 300 180 400v110" /></g>
      <g className={styles.core}>{variant === "software" ? <><rect x="215" y="230" width="170" height="140" rx="6"/><path d="M215 260h170M240 285h46v55h-46zM305 285h55M305 305h55M305 325h32"/></> : variant === "systems" ? <><circle cx="300" cy="300" r="65"/><path d="M220 300h38l14-30 28 60 28-60 14 30h38M300 212v-20M300 408v-20M212 300h-20M408 300h-20"/></> : <><path d="m300 225 65 37v76l-65 37-65-37v-76z"/><path d="m235 262 65 38 65-38M300 300v75"/></>}<circle cx="300" cy="300" r="112" /></g>
      <g className={styles.nodes}>{[[58,300],[542,300],[180,90],[420,90],[180,510],[420,510]].map(([x,y])=><g key={`${x}-${y}`}><circle cx={x} cy={y} r="15" /><circle cx={x} cy={y} r="4" /></g>)}</g>
      <g className={styles.guides}><path d="M30 30h30M30 30v30M570 30h-30M570 30v30M30 570h30M30 570v-30M570 570h-30M570 570v-30" /></g>
    </svg>
  </div>;
}
