"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timeout);
  }, []);

  const motionBase = visible
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-6";

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="absolute -left-32 top-8 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
      <div className="absolute right-0 -bottom-20 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />

      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-24 lg:flex-row lg:items-center lg:gap-16">
        <div
          className={`flex-1 space-y-8 text-center lg:text-left ${motionBase} transition-all duration-700 ease-out`}
        >
          <p className="text-sm uppercase tracking-[0.5em] text-slate-400">
            Enov Corp
          </p>
          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Enov CORP reinvente l'hydroponie intelligente
          </h1>
          <p className="text-base text-slate-300 sm:text-lg">
            IoT | Edge Computing | Automatisation | Applications Mobiles
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <Link
              href="/solutions"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-indigo-500 px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-fuchsia-500/30 transition hover:scale-105"
            >
              Decouvrir nos solutions
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:border-fuchsia-400 hover:text-fuchsia-200"
            >
              Parler a un expert
            </Link>
          </div>
        </div>

        <div
          className={`flex flex-1 items-center justify-center ${motionBase} transition-all duration-700 ease-out delay-150`}
        >
          <div className="relative h-[320px] w-[320px] max-w-full">
            <div className="absolute inset-0 animate-pulse rounded-[2.5rem] bg-gradient-to-br from-fuchsia-500 via-violet-500 to-indigo-500 blur-xl" />
            <div className="relative flex h-full w-full flex-col items-center justify-center rounded-[2.5rem] border border-white/10 bg-slate-950/70 p-10 backdrop-blur">
              <div className="mb-6 h-24 w-24 rounded-full bg-gradient-to-br from-fuchsia-400 via-violet-400 to-indigo-400 opacity-80 shadow-2xl shadow-fuchsia-600/30" />
              <span className="text-sm uppercase tracking-[0.5em] text-slate-400">
                ENOV
              </span>
              <p className="mt-3 text-2xl font-semibold">CORP</p>
              <p className="mt-6 text-center text-sm text-slate-400">
                Gradient interactif simulant un module smart farming connecte.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
