import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./AuthShell.module.css";

export function AuthShell({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return <main className={styles.page}><div className={styles.shell}><aside className={styles.intro}><p>ENOV ACADEMY / VOTRE ESPACE</p><h2>Apprendre.<br /><span>Construire.</span><br />Progresser.</h2><p>Retrouvez vos formations, vos sessions et les ressources disponibles dans votre espace personnel.</p><ul><li>Vos programmes</li><li>Vos sessions</li><li>Vos ressources</li></ul><Link href="/academy">Explorer Academy <span aria-hidden="true">↗</span></Link></aside><section className={styles.panel}><p className={styles.eyebrow}>ENOV CORP</p><h1>{title}</h1><p>{description}</p>{children}</section></div></main>;
}
export { styles as authStyles };
