"use client";
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import styles from "./Reveal.module.css";
/** Content stays visible without JavaScript; motion starts only after intersection. */
export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element || !window.IntersectionObserver || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(entries => { if (entries.some(entry => entry.isIntersecting)) { element.classList.add(styles.enter); observer.disconnect(); } }, { threshold: .08 });
    observer.observe(element); return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`${styles.reveal} ${className}`}>{children}</div>;
}
