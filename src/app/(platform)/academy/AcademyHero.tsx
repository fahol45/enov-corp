"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export function AcademyHero({ registrationUrl }: { registrationUrl: string | null }) {
  void registrationUrl;
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  function handleSearch(event: React.FormEvent) {
    event.preventDefault();
    const q = inputRef.current?.value?.trim() ?? "";
    router.push(`/academy?q=${encodeURIComponent(q)}#formations`);
  }
  return (
    <section className="academy-hero">
      <div>
        <p className="brand-eyebrow">ENOV ACADEMY / LE PÔLE FORMATION</p>
        <h1>Apprendre pour<br /><span>passer à l’action.</span></h1>
        <p className="academy-intro">Développement, data, design et systèmes connectés : choisissez une formation adaptée à votre niveau et construisez des compétences concrètes.</p>
        <form onSubmit={handleSearch} className="academy-search">
          <label htmlFor="academy-hero-search" className="sr-only">Rechercher une formation</label>
          <input id="academy-hero-search" ref={inputRef} type="search" placeholder="Une compétence, une technologie…" />
          <button type="submit" className="brand-button">Rechercher <span aria-hidden="true">→</span></button>
        </form>
        <a href="#formations" className="brand-text-link">Explorer le catalogue <span aria-hidden="true">↓</span></a>
      </div>
      <div className="academy-hero-visual">
        <Image src="/Academy_images/IoT & Robotics Lab.webp" alt="Équipements pour les formations IoT et robotique" fill priority sizes="(max-width: 800px) 100vw, 45vw" />
        <div className="academy-visual-caption"><Image src="/icon-enov.png" alt="" width={44} height={36} /><div><strong>Du savoir à la pratique.</strong><p>Des programmes orientés projet.</p></div></div>
      </div>
    </section>
  );
}
