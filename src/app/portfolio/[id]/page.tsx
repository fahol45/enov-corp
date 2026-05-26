import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { supabaseServer } from "@/lib/supabase/server";
import { ogImage, siteName } from "@/lib/seo";

type Category = "hydro" | "web" | "training";

type Props = { params: Promise<{ id: string }> };

const CATEGORY_LABEL: Record<Category, string> = {
  hydro: "Hydroponie & IoT",
  web: "Web & Mobile",
  training: "Formation",
};

const CATEGORY_GRADIENT: Record<Category, string> = {
  hydro: "from-emerald-400 to-cyan-400",
  web: "from-fuchsia-400 to-purple-400",
  training: "from-sky-400 to-indigo-400",
};

const CATEGORY_GLOW: Record<Category, string> = {
  hydro: "bg-emerald-500/8",
  web: "bg-fuchsia-500/8",
  training: "bg-sky-500/8",
};

async function getItem(id: string) {
  const { data } = await supabaseServer
    .from("portfolio_items")
    .select("*")
    .eq("id", id)
    .eq("active", true)
    .single();
  return data;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const item = await getItem(id);

  if (!item) return { title: "Projet introuvable", robots: { index: false, follow: false } };

  const title = item.title;
  const description = item.description || `Projet ENOV CORP — ${item.title}. ${item.tags}`;
  const image = item.image_url || ogImage;

  return {
    title,
    description,
    alternates: { canonical: `/portfolio/${id}` },
    openGraph: {
      title,
      description,
      url: `/portfolio/${id}`,
      images: [{ url: image, alt: siteName }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { id } = await params;
  const item = await getItem(id);

  if (!item) notFound();

  const tags = item.tags ? item.tags.split("·").map((t: string) => t.trim()).filter(Boolean) : [];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className={`absolute left-0 top-0 h-[500px] w-[500px] rounded-full ${CATEGORY_GLOW[item.category as Category]} blur-[120px]`} />
        <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-slate-800/50 blur-[80px]" />
      </div>

      <div className="app-shell py-8 sm:py-12">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-400 transition hover:border-white/20 hover:text-white"
        >
          ← Retour au portfolio
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_300px]">

          {/* ── Left: main content ── */}
          <div className="space-y-8">

            {/* Image */}
            {item.image_url && (
              <div className="relative overflow-hidden rounded-3xl border border-white/8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="h-[40vh] w-full object-cover sm:h-[52vh]"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 via-transparent to-transparent" />
              </div>
            )}

            {/* Category */}
            <div>
              <span className={`inline-block text-[0.65rem] font-bold uppercase tracking-[0.5em] bg-linear-to-r ${CATEGORY_GRADIENT[item.category as Category]} bg-clip-text text-transparent`}>
                {CATEGORY_LABEL[item.category as Category]}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
              {item.title}
            </h1>

            {/* Description */}
            {item.description && (
              <p className="text-lg leading-relaxed text-slate-300">
                {item.description}
              </p>
            )}

            {/* Tags */}
            {tags.length > 0 && (
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Technologies & méthodes</p>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Right: sidebar ── */}
          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">

            {item.external_url ? (
              <a
                href={item.external_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 text-sm font-bold text-slate-900 shadow-xl transition hover:scale-[1.02]"
              >
                Voir le projet live ↗
              </a>
            ) : (
              <div className="rounded-2xl border border-white/8 bg-white/3 px-6 py-4 text-center text-sm text-slate-500">
                Projet réalisé en interne — non diffusé publiquement
              </div>
            )}

            <Link
              href="/contact"
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-4 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/10"
            >
              Projet similaire ? Contactez-nous →
            </Link>

            <div className="rounded-2xl border border-white/8 bg-slate-900/40 p-5 space-y-3">
              <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Catégorie</p>
              <p className={`font-semibold bg-linear-to-r ${CATEGORY_GRADIENT[item.category as Category]} bg-clip-text text-transparent`}>
                {CATEGORY_LABEL[item.category as Category]}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
