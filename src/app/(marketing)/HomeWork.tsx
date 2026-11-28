"use client";
import Image from "next/image";
import { mediaSource } from "@/lib/media";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { EngineeringVisual } from "@/components/EngineeringVisual";
import type { PortfolioItem } from "@/lib/portfolio";
import styles from "./HomeSections.module.css";
export function HomeWork({reference}:{reference?:PortfolioItem}){
 const {language}=useLanguage();const fr=language==="fr";
 return <div className={styles.workGrid}><div><p className="brand-eyebrow">{fr?"SOLUTIONS & RÉALISATIONS":"SOLUTIONS & WORK"}</p><h2>{reference?reference.title:fr?"Voir ce que nous pouvons réaliser.":"See what we can build."}</h2>{reference?<><p className={styles.client}>{fr?"Projet client":"Client project"} · {reference.client_name}</p><p>{reference.description||reference.results}</p><Link className={styles.textLink} href={`/portfolio/${reference.id}`}>{fr?"Consulter le projet":"View the project"}</Link></>:<><p>{fr?"Applications métier, automatisation et supervision : découvrez nos exemples de solutions et notre façon d’aborder les projets.":"Business applications, automation and monitoring: explore solution examples and how we approach projects."}</p><Link className={styles.textLink} href="/portfolio">{fr?"Solutions & réalisations":"Solutions & work"}</Link></>}</div><div className={styles.workVisual}>{reference?.image_url?<Image src={mediaSource(reference.image_url)} alt={reference.title} fill sizes="(max-width:800px) 100vw, 50vw" unoptimized={reference.image_url.startsWith("http")}/>:<EngineeringVisual variant="software"/>}</div></div>;
}
