type ServiceCardProps = {
  title: string;
  description: string;
  cta?: string;
};

export function ServiceCard({
  title,
  description,
  cta = "En savoir plus",
}: ServiceCardProps) {
  return (
    <article className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 text-white">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-slate-300">{description}</p>
      <button
        type="button"
        className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-black"
      >
        {cta}
      </button>
    </article>
  );
}
