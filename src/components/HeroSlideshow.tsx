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

const INTERVAL = 6000;

const variants = {
  enter: { opacity: 0, scale: 1.04 },
  center: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1 },
};

export function HeroSlideshow() {
  const [slides, setSlides] = useState<string[]>(FALLBACK_SLIDES);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch("/api/slides")
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        const urls: string[] = data?.slides?.map((s: { image_url: string }) => s.image_url) ?? [];
        if (urls.length >= 1) setSlides(urls);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), INTERVAL);
    return () => clearInterval(t);
  }, [slides.length]);

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 h-screen overflow-hidden">
      <AnimatePresence mode="sync">
        <motion.div
          key={index}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 1.6, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={slides[index]}
            alt=""
            fill
            unoptimized
            className="object-cover"
            priority={index === 0}
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlays */}
      <div className="absolute inset-0 bg-slate-950/60" />
      <div className="absolute inset-0 bg-linear-to-b from-slate-950/50 via-transparent to-slate-950/80" />

      {/* Corner brackets — CSS only, no JS */}
      <div className="absolute left-4 top-16 h-6 w-6 border-l-2 border-t-2 border-white/20 sm:left-6 sm:h-8 sm:w-8" />
      <div className="absolute right-4 top-16 h-6 w-6 border-r-2 border-t-2 border-white/20 sm:right-6 sm:h-8 sm:w-8" />

      {/* Dot indicators — pointer-events enabled for clicks */}
      <div className="pointer-events-auto absolute inset-x-0 bottom-6 flex justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === index ? "h-1.5 w-6 bg-white/80" : "h-1.5 w-1.5 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
