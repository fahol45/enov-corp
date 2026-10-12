"use client";

import { useState } from "react";
import Link from "next/link";
import type { Training } from "@/lib/trainings";
import { TrainingStatusBadge } from "./TrainingStatusBadge";

export function TrainingCard({ training }: { training: Training }) {
  const [imageError, setImageError] = useState(false);
  return (
    <article className="academy-course-card">
      <Link href={`/academy/${training.slug}`} className="academy-course-cover" aria-label={`Découvrir ${training.title}`}>
        {training.coverImage && !imageError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={training.coverImage} alt={training.title} loading="lazy" onError={() => setImageError(true)} />
        ) : <span className="academy-course-placeholder">ENOV<br />ACADEMY</span>}
      </Link>
      <div className="academy-course-body">
        <div className="academy-course-category"><span>{training.category}</span><TrainingStatusBadge status={training.status} /></div>
        <h3><Link href={`/academy/${training.slug}`}>{training.title}</Link></h3>
        <p>{training.summary}</p>
        <dl className="academy-course-specs"><div><dt>Niveau</dt><dd>{training.details.level || "À préciser"}</dd></div><div><dt>Durée</dt><dd>{training.details.duration || "À préciser"}</dd></div></dl>
        {training.outcomes.length > 0 && <ul>{training.outcomes.slice(0, 2).map(outcome => <li key={outcome}>{outcome}</li>)}</ul>}
        <div className="academy-course-bottom"><strong>{training.details.price || "Tarif sur demande"}</strong><Link href={`/academy/${training.slug}`} className="brand-text-link">Programme <span aria-hidden="true">↗</span></Link></div>
      </div>
    </article>
  );
}
