"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { TrainingStatus } from "@/lib/trainings";
import styles from "./StickyHeader.module.css";
type Props={title:string;price:string;status:TrainingStatus;isEnrolled:boolean;userLoggedIn:boolean;hasSessions:boolean;slug:string};
export function StickyHeader({title,price,status,isEnrolled,userLoggedIn,hasSessions}:Props){
 const [visible,setVisible]=useState(false);
 useEffect(()=>{const hero=document.getElementById("course-hero");if(!hero)return;const observer=new IntersectionObserver(([entry])=>setVisible(!entry.isIntersecting),{threshold:0});observer.observe(hero);return()=>observer.disconnect();},[]);
 if(!visible)return null;
 const href=isEnrolled?"/mon-espace":userLoggedIn&&hasSessions?"#sessions":status==="available"?userLoggedIn?"#sessions":"#inscription":status==="soon"?"#notification":"/contact";
 const label=isEnrolled?"Accéder à ma session":status==="available"?"S’inscrire":status==="soon"?"Être notifié":"Contacter l’équipe";
 return <div className={`academy-course-sticky ${styles.root}`}><div className={`app-shell ${styles.inner}`}><p className={styles.title}>{title}</p><div className={styles.actions}><span className={styles.price}>{price}</span><Link className={styles.cta} href={href}>{label}</Link><Link className={styles.back} href="/academy">Catalogue</Link></div></div></div>;
}
