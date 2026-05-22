"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const FALLBACK_SLIDES = [
  "/Academy_images/Hydroponie%20intelligente%20%26%20data.jpg",
  "/Academy_images/Digital%20Twin%20Industrie.webp",
  "/Academy_images/IoT%20%26%20Robotics%20Lab.webp",
  "/Academy_images/Web%20Fullstack.jpg",
  "/Academy_images/Mobile%20Product%20Studio.webp",
];

const INTERVAL = 6000;

export function HeroSlideshow() {
  const [slides, setSlides] = useState<string[]>(FALLBACK_SLIDES);
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [direction, setDirection] = useState(1);
  const startRef = useRef<number>(Date.now());
  const rafRef = useRef<number>(0);

  useEffect(() => {
    fetch("/api/slides")
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        const urls: string[] = data?.slides?.map((s: { image_url: string }) => s.image_url) ?? [];
        if (urls.length >= 2) setSlides(urls);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    startRef.current = Date.now();
    setProgress(0);

    const tick = () => {
      const elapsed = Date.now() - startRef.current;
      setProgress(Math.min(elapsed / INTERVAL, 1));
      if (elapsed < INTERVAL) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);

    const t = setTimeout(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % slides.length);
    }, INTERVAL);

    return () => {
      clearTimeout(t);
      cancelAnimationFrame(rafRef.current);
    };
  }, [index, slides.length]);

  const goTo = (i: number) => {
    setDirection(i > index ? 1 : -1);
    setIndex(i);
  };

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir * 40, scale: 1.04 }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit: (dir: number) => ({ opacity: 0, x: dir * -30, scale: 0.98 }),
  };

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 -z-20 h-full overflow-hidden">
      {/* Slides */}
      <AnimatePresence mode="sync" custom={direction}>
        <motion.div
          key={index}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
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
      <div className="absolute inset-0 bg-slate-950/75" />
      <div className="absolute inset-0 bg-linear-to-b from-slate-950/50 via-transparent to-slate-950/70" />

      {/* Scan line effect */}
      <motion.div
        className="absolute inset-x-0 h-px bg-linear-to-r from-transparent via-cyan-400/40 to-transparent"
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      {/* Corner brackets */}
      <div className="pointer-events-auto absolute left-6 top-6 h-8 w-8 border-l-2 border-t-2 border-cyan-400/40" />
      <div className="pointer-events-auto absolute right-6 top-6 h-8 w-8 border-r-2 border-t-2 border-cyan-400/40" />
      <div className="pointer-events-auto absolute bottom-16 left-6 h-8 w-8 border-b-2 border-l-2 border-cyan-400/40" />
      <div className="pointer-events-auto absolute bottom-16 right-6 h-8 w-8 border-b-2 border-r-2 border-cyan-400/40" />

      {/* Bottom controls */}
      <div className="pointer-events-auto absolute inset-x-0 bottom-6 flex flex-col items-center gap-3 px-6">
        {/* Progress bar */}
        <div className="h-px w-48 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full bg-linear-to-r from-cyan-400 to-fuchsia-400"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        {/* Dot indicators */}
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === index
                  ? "h-1.5 w-6 bg-cyan-400"
                  : "h-1.5 w-1.5 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
