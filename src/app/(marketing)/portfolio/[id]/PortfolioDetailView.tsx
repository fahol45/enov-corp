"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PageCTA, PageHero, PageSection } from "@/components/SiteSections";
import styles from "./PortfolioDetailView.module.css";

type PortfolioItem = { id: string; title: string; description: string; image_url: string; category: "hydro" | "web" | "training"; tags: string; external_url: string; active: boolean; duration: string; year: string; client_name: string; results: string };
const categories = { hydro: "Hydroponie & IoT", web: "Web & Mobile", training: "ENOV Academy" };
export function PortfolioDetailView({ id }: { id: string }) {
  const [item, setItem] = useState<PortfolioItem | null>(null); const [loading, setLoading] = useState(true);
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true); setItem(null);
    fetch(`/api/portfolio/${id}`, { signal: controller.signal }).then(r => r.ok ? r.json() : null).then(data => { if (data?.ok) setItem(data.item); }).catch(() => {}).finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [id]);
  if (loading) return <main><PageHero eyebrow="PORTFOLIO / ENOV CORP" title="Votre projet en détail." description="Chargement de la réalisation…" /><div className={`app-shell ${styles.loading}`} role="status">Chargement du projet…</div></main>;
  if (!item) return <main><PageHero eyebrow="PORTFOLIO / ENOV CORP" title="Projet introuvable." description="Ce projet n’est plus disponible ou son adresse est incorrecte." action={{ href: "/portfolio", label: "Retour aux réalisations" }} /></main>;
  const tags = item.tags.split("·").map(tag => tag.trim()).filter(Boolean);
  const external = /^https?:\/\//.test(item.external_url);
  return <main><PageHero eyebrow={`${categories[item.category]} / RÉALISATION`} title={item.title} description={item.description ? item.description.length > 180 ? item.description.slice(0, 180) + "…" : item.description : "Un projet publié par l’équipe ENOV CORP."} image={item.image_url ? { src: item.image_url, alt: item.title } : undefined} secondary={{ href: "/portfolio", label: "Toutes les réalisations" }} />
    <PageSection eyebrow="01 / LE PROJET"><div className={styles.layout}><div>{item.image_url && <div className={styles.cover}>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={item.image_url} alt={item.title} /></div>}{item.description && <section className={styles.description}><h2>Contexte et solution</h2><p>{item.description}</p></section>}{item.results && <section className={styles.results}><p className="brand-eyebrow">RÉSULTATS</p><p>{item.results}</p></section>}{tags.length > 0 && <section className={styles.description}><h2>Technologies & méthodes</h2><ul className={styles.tags}>{tags.map(tag => <li key={tag}>{tag}</li>)}</ul></section>}</div><aside className={styles.summary}><h2>Repères du projet</h2><dl>{[{ label: "Domaine", value: categories[item.category] }, { label: "Client", value: item.client_name }, { label: "Année", value: item.year }, { label: "Durée", value: item.duration }].filter(detail => detail.value).map(detail => <div key={detail.label}><dt>{detail.label}</dt><dd>{detail.value}</dd></div>)}</dl>{external && <a href={item.external_url} target="_blank" rel="noopener noreferrer">Voir le projet en ligne ↗</a>}<Link href="/contact">Discuter d’un projet similaire →</Link></aside></div></PageSection>
    <PageCTA title="Et si votre projet était le prochain ?" label="Parlons de votre besoin" />
  </main>;
}
