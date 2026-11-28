"use client";
import Link from "next/link";
import Image from "next/image";
import { mediaSource } from "@/lib/media";
import { useState } from "react";
import { PageCTA, PageHero } from "@/components/SiteSections";
import { useLanguage } from "@/context/LanguageContext";
import type { PortfolioItem } from "@/lib/portfolio";
import styles from "./PortfolioView.module.css";

type Kind = "all" | "client" | "example" | "training";
function kind(item: PortfolioItem): Kind { return item.category === "training" ? "training" : item.client_name ? "client" : "example"; }
export function PortfolioView({ items, available }: { items: PortfolioItem[]; available: boolean }) {
  const { language } = useLanguage(); const fr = language === "fr";
  const [filter, setFilter] = useState<Kind>("all");
  const labels = { all: fr ? "Tout voir" : "View all", client: fr ? "Projets clients" : "Client projects", example: fr ? "Exemples de solutions" : "Solution examples", training: fr ? "Formations" : "Training" };
  const order: Record<Kind, number> = { all: 0, client: 0, example: 1, training: 2 };
  const filtered = items.filter(item => filter === "all" || kind(item) === filter).sort((a, b) => order[kind(a)] - order[kind(b)]);
  return <main><PageHero eyebrow={fr ? "SOLUTIONS & RÉALISATIONS" : "SOLUTIONS & WORK"} title={fr ? "Du besoin" : "From requirements"} highlight={fr ? "à la réalisation." : "to delivery."} description={fr ? "Les références clients sont distinguées des exemples de solutions et des programmes de formation." : "Client references are shown separately from solution examples and training programmes."} />
    <div className={`app-shell ${styles.content}`}>
      {!available ? <div className={styles.empty} role="alert"><h2>{fr ? "Les références sont momentanément indisponibles." : "References are temporarily unavailable."}</h2><p>{fr ? "Contactez-nous pour échanger sur un projet similaire au vôtre." : "Contact us to discuss a project similar to yours."}</p><Link href="/portfolio">{fr ? "Réessayer" : "Try again"}</Link></div> : <>
      <div className={styles.filters} role="group" aria-label={fr ? "Filtrer les réalisations" : "Filter work"}>{(Object.keys(labels) as Kind[]).map(value => <button key={value} type="button" onClick={() => setFilter(value)} aria-pressed={value === filter}>{labels[value]}</button>)}</div>
      <div className={styles.grid} aria-live="polite">{filtered.map(item => <article key={item.id} className={styles.project}>
        <Link href={`/portfolio/${item.id}`} className={styles.image} tabIndex={-1} aria-hidden="true">{item.image_url ? <Image src={mediaSource(item.image_url)} alt="" fill sizes="(max-width:650px) 100vw, 50vw" unoptimized={item.image_url.startsWith("http")} /> : <span>ENOV CORP</span>}</Link>
        <div className={styles.body}><p className={styles.kind}>{labels[kind(item)]}{item.year ? ` · ${item.year}` : ""}</p><h2><Link href={`/portfolio/${item.id}`}>{item.title}</Link></h2>{item.client_name && <p className={styles.client}>{item.client_name}</p>}{item.description && <p>{item.description}</p>}{item.results && <p className={styles.result}>{item.results}</p>}<ul>{item.tags.split("·").map(tag => tag.trim()).filter(Boolean).slice(0, 3).map(tag => <li key={tag}>{tag}</li>)}</ul><Link className={styles.detail} href={`/portfolio/${item.id}`}>{fr ? "Voir la fiche" : "View details"}</Link></div>
      </article>)}</div>{filtered.length === 0 && <div className={styles.empty}><h2>{fr ? "Aucune publication dans cette rubrique." : "No entries in this section."}</h2><p>{fr ? "Nous pouvons vous présenter notre démarche et étudier votre besoin." : "We can explain our approach and discuss your requirements."}</p><Link href="/contact">{fr ? "Nous contacter" : "Contact us"}</Link></div>}</>}
    </div><PageCTA title={fr ? "Un projet à étudier ?" : "Have a project to discuss?"} label={fr ? "Discuter de votre projet" : "Discuss your project"} /></main>;
}
