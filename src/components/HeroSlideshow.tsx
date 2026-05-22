"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const FALLBACK_SLIDES = [
  "/Academy_images/Hydroponie%20intelligente%20%26%20data.jpg",
  "/Academy_images/Digital%20Twin%20Industrie.webp",
  "/Academy_images/IoT%20%26%20Robotics%20Lab.webp",
  "/Academy_images/Web%20Fullstack.jpg",
  "/Academy_images/Mobile%20Product%20Studio.webp",
];

const INTERVAL = 5000;

export function HeroSlideshow() {
  const [slides, setSlides] = useState<string[]>(FALLBACK_SLIDES);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch("/api/admin/slides")
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        const urls: string[] = data?.slides?.filter((s: { active: boolean; image_url: string }) => s.active).map((s: { image_url: string }) => s.image_url) ?? [];
        if (urls.length >= 2) setSlides(urls);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), INTERVAL);
    return () => clearInterval(t);
  }, [slides.length]);

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 -z-20 h-full overflow-hidden">
      <AnimatePresence mode="sync">
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
        >
          <Image
            src={slides[index]}
            alt=""
            fill
            className="object-cover"
            priority={index === 0}
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-slate-950/80" />
      <div className="absolute inset-0 bg-linear-to-b from-slate-950/40 via-transparent to-slate-950/60" />
    </div>
  );
}
