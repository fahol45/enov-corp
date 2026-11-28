"use client";
import Link from "next/link";
import Image from "next/image";
import { mediaSource } from "@/lib/media";
import { useLanguage } from "@/context/LanguageContext";
import { PageHero, PageSection, PageCTA } from "@/components/SiteSections";
import type { PortfolioItem } from "@/lib/portfolio";
import styles from "./PortfolioDetailView.module.css";
export function PortfolioDetailView({item}:{item:PortfolioItem}){
 const {language}=useLanguage();const fr=language==="fr";
 const kind=item.category==="training"?(fr?"Programme de formation":"Training programme"):item.client_name?(fr?"Projet client":"Client project"):(fr?"Exemple de solution":"Solution example");
 const categories={web:fr?"Logiciel & applications":"Software & apps",hydro:fr?"Systèmes connectés":"Connected systems",training:"ENOV Academy"};
 const tags=item.tags.split("·").map(tag=>tag.trim()).filter(Boolean);
 return <main id="main-content"><PageHero eyebrow={`${categories[item.category]} / ${kind}`} title={item.title} description={item.description || (fr?"Les informations publiées par ENOV CORP sur cette fiche.":"Information published by ENOV CORP about this entry.")} secondary={{href:"/portfolio",label:fr?"Toutes les publications":"All entries"}} /><PageSection><div className={styles.layout}><div>{item.image_url&&<div className={styles.cover}><Image src={mediaSource(item.image_url)} alt={item.title} fill sizes="(max-width:800px) 100vw, 60vw" unoptimized={item.image_url.startsWith("http")}/></div>}{item.description&&<section className={styles.description}><h2>{fr?"Le projet":"Project overview"}</h2><p>{item.description}</p></section>}{item.results&&<section className={styles.results}><h2>{fr?"Résultat publié":"Published result"}</h2><p>{item.results}</p></section>}{tags.length>0&&<section className={styles.description}><h2>{fr?"Domaines & technologies":"Areas & technologies"}</h2><ul className={styles.tags}>{tags.map(tag=><li key={tag}>{tag}</li>)}</ul></section>}</div><aside className={styles.summary}><h2>{fr?"En bref":"At a glance"}</h2><dl>{[{label:fr?"Nature":"Type",value:kind},{label:fr?"Domaine":"Area",value:categories[item.category]},{label:"Client",value:item.client_name},{label:fr?"Année":"Year",value:item.year},{label:fr?"Durée":"Duration",value:item.duration}].filter(detail=>detail.value).map(detail=><div key={detail.label}><dt>{detail.label}</dt><dd>{detail.value}</dd></div>)}</dl>{/^https?:\/\//i.test(item.external_url)&&<a href={item.external_url} target="_blank" rel="noopener noreferrer">{fr?"Consulter le site du projet":"Visit the project website"}</a>}<Link href="/contact">{fr?"Discuter d’un besoin similaire":"Discuss a similar project"}</Link></aside></div></PageSection><PageCTA title={fr?"Un besoin similaire ?":"A similar requirement?"} label={fr?"Nous contacter":"Contact us"}/></main>;
}
