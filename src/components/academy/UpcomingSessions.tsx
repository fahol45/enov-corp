import Link from "next/link";
import { supabaseServer } from "@/lib/supabase/server";
import type { Training } from "@/lib/trainings";
import styles from "./UpcomingSessions.module.css";

type Session = { id: string; title: string; training_slug: string; scheduled_at: string; duration_minutes: number; status: string };

export async function UpcomingSessions({ trainings }: { trainings: Training[] }) {
  const { data, error } = await supabaseServer.from("sessions")
    .select("id,title,training_slug,scheduled_at,duration_minutes,status")
    .in("status", ["upcoming", "live"]).order("scheduled_at", { ascending: true });
  const programs = new Map(trainings.map(training => [training.slug, training]));
  const sessions = ((data ?? []) as Session[]).filter(session => programs.has(session.training_slug) && (session.status === "live" || new Date(session.scheduled_at).getTime() >= Date.now())).slice(0, 3);
  return <section className={styles.section} aria-labelledby="upcoming-title">
    <div className={styles.heading}><div><p className="brand-eyebrow">LE CALENDRIER</p><h2 id="upcoming-title">Les prochaines sessions.</h2></div><p>Heure d’Abidjan · UTC</p></div>
    {error ? <p className={styles.empty}>Le calendrier est momentanément indisponible. <Link href="/contact">Contactez-nous pour connaître les prochaines dates.</Link></p> : sessions.length ? <div className={styles.grid}>{sessions.map(session => {
      const training = programs.get(session.training_slug)!;
      const date = new Date(session.scheduled_at);
      return <article key={session.id} className={styles.card}><p className={styles.date}>{session.status === "live" ? "En direct" : date.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "Africa/Abidjan" })}</p><h3>{session.title}</h3><p>{training.title}</p><dl><div><dt>Horaire</dt><dd><time dateTime={session.scheduled_at}>{date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit", timeZone: "Africa/Abidjan" })} UTC</time></dd></div><div><dt>Durée</dt><dd>{session.duration_minutes} min</dd></div>{training.details.format && <div><dt>Format</dt><dd>{training.details.format}</dd></div>}</dl><Link href={`/academy/${training.slug}#sessions`}>Programme et inscription <span aria-hidden="true">↗</span></Link></article>;
    })}</div> : <div className={styles.empty}><h3>Les prochaines dates seront publiées ici.</h3><p>Besoin d’une formation ? Contactez-nous.</p><Link href="/contact">Nous contacter ↗</Link></div>}
  </section>;
}
