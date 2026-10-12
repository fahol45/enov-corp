import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./SiteSections.module.css";

export function PageHero({ eyebrow, title, highlight, description, image, action, secondary }: {
  eyebrow: string; title: string; highlight?: string; description: string;
  image?: { src: string; alt: string; contain?: boolean };
  action?: { href: string; label: string }; secondary?: { href: string; label: string };
}) {
  return <section className={`${styles.hero} ${image ? styles.withImage : ""}`}>
    <div className={styles.heroGrid} aria-hidden="true" />
    {image && <div className={`${styles.heroImage} ${image.contain ? styles.contain : ""}`}><Image src={image.src} alt={image.alt} fill priority unoptimized={image.src.startsWith("http")} sizes="(max-width: 800px) 100vw, 55vw" /></div>}
    <div className={`app-shell ${styles.heroInner}`}><p className={styles.eyebrow}><span aria-hidden="true" />{eyebrow}</p><h1>{title}{highlight && <><br /><span>{highlight}</span></>}</h1><p className={styles.description}>{description}</p>{(action || secondary) && <div className={styles.heroActions}>{action && <Link href={action.href} className={styles.primary}>{action.label}<span aria-hidden="true">↗</span></Link>}{secondary && <Link href={secondary.href} className={styles.lightLink}>{secondary.label}<span aria-hidden="true">→</span></Link>}</div>}</div>
  </section>;
}
export function PageSection({ id, eyebrow, title, description, children }: { id?: string; eyebrow?: string; title?: string; description?: string; children: ReactNode }) {
  return <section id={id} className={`app-shell ${styles.section}`}><div className={styles.heading}>{eyebrow && <p className="brand-eyebrow">{eyebrow}</p>}{title && <h2>{title}</h2>}{description && <p>{description}</p>}</div>{children}</section>;
}
export function FeatureGrid({ items }: { items: { title: string; text: string; href?: string }[] }) {
  return <div className={styles.features}>{items.map((item, index) => <article key={item.title}><span className={styles.number}>0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p>{item.href && <Link href={item.href} aria-label={item.title} className={styles.featureLink}>↗</Link>}</article>)}</div>;
}
export function ProcessSteps({ items }: { items: { title: string; text?: string }[] }) {
  return <ol className={`${styles.steps} ${items.length === 4 ? styles.fourSteps : ""}`}>{items.map((item, index) => <li key={item.title}><span>0{index + 1}</span><h3>{item.title}</h3>{item.text && <p>{item.text}</p>}</li>)}</ol>;
}
export function PageCTA({ title, text, label, href = "/contact" }: { title: string; text?: string; label: string; href?: string }) {
  return <section className={`app-shell ${styles.ctaSection}`}><div className={styles.cta}><div><p className="brand-eyebrow">ENOV CORP</p><h2>{title}</h2>{text && <p>{text}</p>}</div><Link href={href} className={styles.primary}>{label}<span aria-hidden="true">↗</span></Link></div></section>;
}
