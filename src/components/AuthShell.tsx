import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./AuthShell.module.css";

export function AuthShell({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return <main className={styles.page}><div className={styles.shell}><aside className={styles.intro}><p>ENOV ACADEMY / VOTRE ESPACE</p><h2>Votre espace<br /><span>ENOV Academy.</span></h2><p>Vos sessions et les replays publiés.</p><Link href="/academy">Voir les formations <span aria-hidden="true">↗</span></Link></aside><section className={styles.panel}><p className={styles.eyebrow}>ENOV CORP</p><h1>{title}</h1><p>{description}</p>{children}</section></div></main>;
}
export { styles as authStyles };
