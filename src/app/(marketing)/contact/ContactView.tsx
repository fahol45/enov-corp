"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FadeUp } from "@/components/FadeUp";
import { ContactForm, type ContactFormCopy } from "@/components/ContactForm";
import { useLanguage, type SupportedLanguage } from "@/context/LanguageContext";

type ContactCopy = {
  hero: { kicker: string; title: string; highlight: string; sub: string };
  channels: Array<{ label: string; value: string; href: string }>;
  form: ContactFormCopy;
};

const copy: Record<SupportedLanguage, ContactCopy> = {
  fr: {
    hero: {
      kicker: "Contact",
      title: "Décrivez ce que vous voulez.",
      highlight: "On vous répond en 24h.",
      sub: "Envoyez le formulaire ou appelez. On lit, on analyse, on vous rappelle — pas un commercial, la personne qui fera le travail.",
    },
    channels: [
      { label: "Email", value: "contact@enovcorp.com", href: "mailto:contact@enovcorp.com" },
      { label: "Téléphone", value: "+212 6 45 41 08 64", href: "tel:+212645410864" },
    ],
    form: {
      title: "Décrivez votre projet",
      description: "On lit chaque message et on répond vite.",
      fields: {
        name: { label: "Votre nom", placeholder: "Fatima Zahra" },
        email: { label: "Votre email", placeholder: "vous@exemple.com" },
        phone: { label: "Téléphone (optionnel)", placeholder: "+212 6 00 00 00 00" },
        company: { label: "Entreprise ou site", placeholder: "Mon entreprise" },
        message: { label: "Votre besoin", placeholder: "Ex. : je cherche une app de suivi pour mes équipes terrain, ou je veux connecter ma serre..." },
      },
      submitLabel: "Envoyer",
      successMessage: "Message reçu ! On revient vers vous très vite.",
      errorMessage: "Impossible d'envoyer. Écrivez-nous à contact@enovcorp.com",
      requiredLabel: "*",
    },
  },
  en: {
    hero: {
      kicker: "Contact",
      title: "Tell us what you need.",
      highlight: "We reply in 24 hours.",
      sub: "Send the form or call. We read, we assess, we call back — not a salesperson, the person who will do the work.",
    },
    channels: [
      { label: "Email", value: "contact@enovcorp.com", href: "mailto:contact@enovcorp.com" },
      { label: "Phone", value: "+212 6 45 41 08 64", href: "tel:+212645410864" },
    ],
    form: {
      title: "Describe your project",
      description: "We read every message and reply fast.",
      fields: {
        name: { label: "Your name", placeholder: "John Doe" },
        email: { label: "Your email", placeholder: "you@example.com" },
        phone: { label: "Phone (optional)", placeholder: "+212 6 00 00 00 00" },
        company: { label: "Company or site", placeholder: "My company" },
        message: { label: "Your need", placeholder: "E.g.: I need a field team tracking app, or I want to connect my greenhouse..." },
      },
      submitLabel: "Send",
      successMessage: "Message received! We'll get back to you very soon.",
      errorMessage: "Couldn't send. Email us at contact@enovcorp.com",
      requiredLabel: "*",
    },
  },
};

export function ContactView() {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="app-shell section-flow">

        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <section className="relative pt-4 pb-6 lg:pt-10">
          <div className="pointer-events-none absolute -inset-x-(--shell-padding) inset-y-0 -z-10 overflow-hidden">
            <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-fuchsia-500/8 blur-[100px]" />
            <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-emerald-500/8 blur-[80px]" />
          </div>

          <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 0.61, 0.36, 1] }}
              className="flex-1 space-y-8"
            >
              <div className="inline-flex items-center gap-2.5 rounded-full border border-fuchsia-500/25 bg-fuchsia-500/8 px-4 py-2 text-[0.65rem] uppercase tracking-[0.55em] text-fuchsia-300">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-fuchsia-400" />
                {t.hero.kicker}
              </div>

              <h1 className="text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.5rem]">
                {t.hero.title}
                <br />
                <span className="bg-linear-to-r from-fuchsia-400 via-pink-400 to-emerald-400 bg-clip-text text-transparent">
                  {t.hero.highlight}
                </span>
              </h1>

              <p className="max-w-md text-lg text-slate-400">{t.hero.sub}</p>

              <div className="flex flex-col gap-3 sm:flex-row">
                {t.channels.map((c) => (
                  <Link
                    key={c.label}
                    href={c.href}
                    className="group flex items-center gap-4 rounded-2xl border border-white/8 bg-slate-900/40 px-6 py-4 transition hover:border-white/20 hover:bg-slate-900/70"
                  >
                    <div>
                      <p className="text-[0.6rem] uppercase tracking-[0.4em] text-fuchsia-300">{c.label}</p>
                      <p className="mt-1 text-sm font-semibold text-white">{c.value}</p>
                    </div>
                    <span className="ml-auto text-slate-600 transition group-hover:translate-x-1 group-hover:text-white">→</span>
                  </Link>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
              className="flex flex-row gap-4 lg:w-64 lg:shrink-0 lg:flex-col"
            >
              {[
                { value: "24h", label: language === "fr" ? "Délai de réponse garanti" : "Guaranteed response time" },
                { value: "100%", label: language === "fr" ? "Messages lus personnellement" : "Messages read personally" },
                { value: "0", label: language === "fr" ? "Commercial — vous parlez au tech" : "Sales reps — you talk to tech" },
              ].map((s) => (
                <div key={s.label} className="flex-1 rounded-2xl border border-white/8 bg-slate-900/50 p-5 lg:flex-none">
                  <p className="text-2xl font-black lg:text-3xl" style={{ background: "linear-gradient(to right, #e879f9, #f472b6, #34d399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    {s.value}
                  </p>
                  <p className="mt-1 text-xs text-slate-500 leading-relaxed">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── FORM ─────────────────────────────────────────────────────── */}
        <FadeUp>
          <section className="relative overflow-hidden rounded-3xl border border-white/8 bg-slate-900/40 p-5 sm:p-8">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-fuchsia-500/10 blur-3xl" />
              <div className="absolute -bottom-10 -left-10 h-60 w-60 rounded-full bg-emerald-500/10 blur-3xl" />
            </div>
            <div className="relative">
              <ContactForm copy={t.form} />
            </div>
          </section>
        </FadeUp>

      </div>
    </main>
  );
}
