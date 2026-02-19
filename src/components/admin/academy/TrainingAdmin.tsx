"use client";

import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import type { Training, TrainingStatus } from "@/lib/trainings";
import { trainings as defaultTrainings } from "@/lib/trainings";
import { TrainingCard } from "@/components/academy/TrainingCard";
import { TrainingMedia } from "@/components/academy/TrainingMedia";
import { TrainingStatusBadge } from "@/components/academy/TrainingStatusBadge";

type TrainingDraft = Training & { _id: string };

const storageKey = "enov_academy_admin_draft_v1";

const statusOptions: { value: TrainingStatus; label: string }[] = [
  { value: "available", label: "Disponible" },
  { value: "soon", label: "Bientot" },
  { value: "closed", label: "Fermee" },
];

const inputClass =
  "rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-[#00a3ff]/60";

const textareaClass =
  "min-h-[120px] rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-[#00a3ff]/60";

const createId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `draft_${Date.now()}_${Math.random().toString(16).slice(2)}`;
};

const cloneTraining = (training: Training): Training => ({
  ...training,
  outcomes: [...training.outcomes],
  prerequisites: [...training.prerequisites],
  details: { ...training.details },
});

const withIds = (items: Training[]): TrainingDraft[] =>
  items.map((item) => ({
    ...cloneTraining(item),
    _id: createId(),
  }));

const stripDraft = ({ _id, ...training }: TrainingDraft): Training => training;

const cleanTraining = (training: Training): Training => {
  const cleaned: Training = {
    ...training,
    slug: training.slug.trim(),
    title: training.title.trim(),
    category: training.category.trim(),
    summary: training.summary.trim(),
    description: training.description.trim(),
    outcomes: training.outcomes
      .map((item) => item.trim())
      .filter(Boolean),
    prerequisites: training.prerequisites
      .map((item) => item.trim())
      .filter(Boolean),
    details: {
      duration: training.details.duration.trim(),
      level: training.details.level.trim(),
      format: training.details.format.trim(),
      nextSession: training.details.nextSession.trim(),
      price: training.details.price.trim(),
      location: training.details.location.trim(),
    },
  };

  if (!cleaned.coverImage?.trim()) delete cleaned.coverImage;
  if (!cleaned.youtubeEmbed?.trim()) delete cleaned.youtubeEmbed;
  if (!cleaned.pdfProgram?.trim()) delete cleaned.pdfProgram;
  if (!cleaned.registrationUrl?.trim()) delete cleaned.registrationUrl;

  return cleaned;
};

const stripDrafts = (drafts: TrainingDraft[]) =>
  drafts.map((draft) => cleanTraining(stripDraft(draft)));

const createBlankDraft = (baseIndex: number): TrainingDraft => ({
  _id: createId(),
  slug: `nouvelle-formation-${baseIndex}`,
  title: "Nouvelle formation",
  category: "Formation",
  status: "soon",
  summary: "",
  description: "",
  outcomes: [],
  prerequisites: [],
  details: {
    duration: "",
    level: "",
    format: "",
    nextSession: "",
    price: "",
    location: "",
  },
  coverImage: "",
  youtubeEmbed: "",
  pdfProgram: "",
  registrationUrl: "",
});

const safeParseDrafts = (raw: string | null): TrainingDraft[] | null => {
  if (!raw) return null;
  try {
    const payload = JSON.parse(raw) as
      | { trainings?: Training[] }
      | Training[];
    const trainings = Array.isArray(payload)
      ? payload
      : payload?.trainings;
    if (!trainings || !Array.isArray(trainings)) {
      return null;
    }
    return withIds(trainings);
  } catch {
    return null;
  }
};

export function TrainingAdmin() {
  const [drafts, setDrafts] = useState<TrainingDraft[]>(() =>
    withIds(defaultTrainings)
  );
  const [selectedId, setSelectedId] = useState<string | null>(() =>
    drafts.length > 0 ? drafts[0]._id : null
  );
  const [search, setSearch] = useState("");
  const [showImport, setShowImport] = useState(false);
  const [importText, setImportText] = useState("");
  const [adminKey, setAdminKey] = useState("");
  const [remoteBusy, setRemoteBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [autoPublish, setAutoPublish] = useState(true);
  const [feedback, setFeedback] = useState<string | null>(null);
  const feedbackTimer = useRef<number | null>(null);

  useEffect(() => {
    const stored = safeParseDrafts(
      typeof window === "undefined" ? null : window.localStorage.getItem(storageKey)
    );
    if (stored && stored.length > 0) {
      setDrafts(stored);
      setSelectedId(stored[0]._id);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (feedbackTimer.current) {
        window.clearTimeout(feedbackTimer.current);
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedKey = window.localStorage.getItem("enov_academy_admin_key");
    if (storedKey) {
      setAdminKey(storedKey);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (adminKey.trim()) {
      window.localStorage.setItem("enov_academy_admin_key", adminKey.trim());
    } else {
      window.localStorage.removeItem("enov_academy_admin_key");
    }
  }, [adminKey]);

  useEffect(() => {
    if (!selectedId && drafts.length > 0) {
      setSelectedId(drafts[0]._id);
    }
  }, [drafts, selectedId]);

  const selected = useMemo(
    () => drafts.find((item) => item._id === selectedId) ?? null,
    [drafts, selectedId]
  );

  const filteredDrafts = useMemo(() => {
    const normalized = search.trim().toLowerCase();
    if (!normalized) return drafts;
    return drafts.filter((item) =>
      [
        item.title,
        item.slug,
        item.category,
        item.summary,
        item.status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalized)
    );
  }, [drafts, search]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    drafts.forEach((item) => {
      if (item.category.trim()) {
        set.add(item.category.trim());
      }
    });
    return Array.from(set);
  }, [drafts]);

  const slugCounts = useMemo(() => {
    return drafts.reduce<Record<string, number>>((acc, item) => {
      const key = item.slug.trim();
      if (!key) return acc;
      acc[key] = (acc[key] ?? 0) + 1;
      return acc;
    }, {});
  }, [drafts]);

  const statusCounts = useMemo(() => {
    return drafts.reduce(
      (acc, item) => {
        acc[item.status] += 1;
        return acc;
      },
      { available: 0, soon: 0, closed: 0 }
    );
  }, [drafts]);

  const showFeedback = (message: string) => {
    setFeedback(message);
    if (feedbackTimer.current) {
      window.clearTimeout(feedbackTimer.current);
    }
    feedbackTimer.current = window.setTimeout(() => {
      setFeedback(null);
    }, 2400);
  };

  const updateSelected = (patch: Partial<Training>) => {
    if (!selected) return;
    setDrafts((prev) =>
      prev.map((item) =>
        item._id === selected._id ? { ...item, ...patch } : item
      )
    );
  };

  const updateDetails = (
    key: keyof Training["details"],
    value: string
  ) => {
    if (!selected) return;
    updateSelected({
      details: {
        ...selected.details,
        [key]: value,
      },
    });
  };

  const handleAdd = () => {
    const next = createBlankDraft(drafts.length + 1);
    setDrafts((prev) => [next, ...prev]);
    setSelectedId(next._id);
  };

  const handleDuplicate = () => {
    if (!selected) return;
    const baseSlug = selected.slug.trim() || "copie";
    let nextSlug = `${baseSlug}-copy`;
    let counter = 2;
    while (drafts.some((item) => item.slug === nextSlug)) {
      nextSlug = `${baseSlug}-copy-${counter}`;
      counter += 1;
    }
    const duplicated: TrainingDraft = {
      ...cloneTraining(selected),
      _id: createId(),
      slug: nextSlug,
      title: `${selected.title} (copie)`.trim(),
    };
    setDrafts((prev) => [duplicated, ...prev]);
    setSelectedId(duplicated._id);
  };

  const handleRemove = () => {
    if (!selected) return;
    const next = drafts.filter((item) => item._id !== selected._id);
    if (next.length === 0) {
      const created = createBlankDraft(1);
      setDrafts([created]);
      setSelectedId(created._id);
      return;
    }
    setDrafts(next);
    setSelectedId(next[0]._id);
  };

  const handleSaveDraft = () => {
    if (typeof window === "undefined") return;
    const payload = {
      trainings: stripDrafts(drafts),
    };
    window.localStorage.setItem(storageKey, JSON.stringify(payload));
    showFeedback("Brouillon sauvegarde en local.");
  };

  const handleReset = () => {
    const reset = withIds(defaultTrainings);
    setDrafts(reset);
    setSelectedId(reset.length > 0 ? reset[0]._id : null);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(storageKey);
    }
    showFeedback("Donnees reinitialisees.");
  };

  const handleExportJson = () => {
    if (typeof window === "undefined") return;
    const payload = JSON.stringify(stripDrafts(drafts), null, 2);
    const blob = new Blob([payload], { type: "application/json" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `enov-academy-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
    showFeedback("Export JSON termine.");
  };

  const handleCopyTypescript = async () => {
    if (typeof navigator === "undefined") return;
    const payload = stripDrafts(drafts);
    const snippet = `export const trainings: Training[] = ${JSON.stringify(
      payload,
      null,
      2
    )};`;
    try {
      await navigator.clipboard.writeText(snippet);
      showFeedback("Snippet TypeScript copie.");
    } catch {
      showFeedback("Copie impossible. Essayez un export JSON.");
    }
  };

  const callAdminApi = async (method: "GET" | "PUT", body?: unknown) => {
    const key = adminKey.trim();
    if (!key) {
      showFeedback("Cle admin requise.");
      return null;
    }
    setRemoteBusy(true);
    try {
      const response = await fetch("/api/admin/academy/trainings", {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": key,
        },
        credentials: "include",
        body: body ? JSON.stringify(body) : undefined,
      });
      if (!response.ok) {
        const payload = (await response.json()) as { message?: string };
        showFeedback(payload?.message ?? "Erreur serveur.");
        return null;
      }
      return (await response.json()) as { trainings?: Training[] };
    } catch {
      showFeedback("Connexion impossible.");
      return null;
    } finally {
      setRemoteBusy(false);
    }
  };

  const handleLoadSupabase = async () => {
    const payload = await callAdminApi("GET");
    if (payload?.trainings && payload.trainings.length > 0) {
      const incoming = withIds(payload.trainings);
      setDrafts(incoming);
      setSelectedId(incoming[0]._id);
      showFeedback("Contenu charge depuis Supabase.");
    }
  };

  const handlePushSupabase = async () => {
    const payload = await callAdminApi("PUT", {
      trainings: stripDrafts(drafts),
    });
    if (payload !== null) {
      showFeedback("Publication Supabase terminee.");
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", {
        method: "POST",
        credentials: "include",
      });
    } finally {
      window.location.href = "/admin/login";
    }
  };

  const updateSelectedDraft = (patch: Partial<Training>) => {
    if (!selected) return null;
    const next = drafts.map((item) =>
      item._id === selected._id ? { ...item, ...patch } : item
    );
    setDrafts(next);
    return next;
  };

  const uploadMedia = async (file: File, kind: "image" | "pdf") => {
    const key = adminKey.trim();
    if (!key) {
      showFeedback("Cle admin requise.");
      return;
    }
    if (!selected?.slug.trim()) {
      showFeedback("Slug requis avant upload.");
      return;
    }
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("slug", selected.slug.trim());
      formData.append("kind", kind);

      const response = await fetch("/api/admin/academy/upload", {
        method: "POST",
        headers: {
          "x-admin-key": key,
        },
        credentials: "include",
        body: formData,
      });

      if (!response.ok) {
        const payload = (await response.json()) as { message?: string };
        showFeedback(payload?.message ?? "Upload impossible.");
        return;
      }

      const payload = (await response.json()) as { url?: string };
      if (!payload.url) {
        showFeedback("URL non retournee.");
        return;
      }

      const nextDrafts =
        kind === "image"
          ? updateSelectedDraft({ coverImage: payload.url })
          : updateSelectedDraft({ pdfProgram: payload.url });
      if (kind === "image") {
        setImageFile(null);
      } else {
        setPdfFile(null);
      }

      if (autoPublish && nextDrafts) {
        const result = await callAdminApi("PUT", {
          trainings: stripDrafts(nextDrafts),
        });
        if (result !== null) {
          showFeedback("Fichier uploade et publie.");
        }
      } else {
        showFeedback("Fichier uploade.");
      }
    } catch {
      showFeedback("Upload impossible.");
    } finally {
      setUploading(false);
    }
  };

  const applyImport = (raw: string) => {
    const imported = safeParseDrafts(raw);
    if (!imported || imported.length === 0) {
      showFeedback("Import invalide.");
      return;
    }
    setDrafts(imported);
    setSelectedId(imported[0]._id);
    setImportText("");
    setShowImport(false);
    showFeedback("Import applique.");
  };

  const handleImportFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const text = typeof reader.result === "string" ? reader.result : "";
      setImportText(text);
    };
    reader.readAsText(file);
  };

  const slugError =
    selected?.slug.trim() ? (slugCounts[selected.slug.trim()] ?? 0) > 1 : false;

  const missingCore =
    !selected?.slug.trim() ||
    !selected?.title.trim() ||
    !selected?.category.trim();

  const remoteDisabled = remoteBusy || !adminKey.trim();
  const uploadDisabled =
    uploading || !adminKey.trim() || !selected?.slug.trim();

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.35)] sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <p className="kicker text-slate-400">ADMIN ACADEMY</p>
            <h2 className="text-2xl font-semibold text-white">
              Gestion des formations et webinaires
            </h2>
            <p className="text-sm text-slate-300 text-pretty">
              Modifiez les fiches, statuts, medias et liens. Sauvegarde locale,
              export JSON ou snippet TypeScript pour mettre a jour la base.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-sm">
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-4 py-2 text-white transition hover:border-white/30 hover:bg-white/10"
            >
              Deconnexion
            </button>
            <button
              type="button"
              onClick={handleSaveDraft}
              className="inline-flex items-center gap-2 rounded-full border border-[#00a3ff]/50 bg-[#00a3ff]/15 px-4 py-2 text-white transition hover:border-[#00a3ff]/80 hover:bg-[#00a3ff]/25"
            >
              Sauvegarder
            </button>
            <button
              type="button"
              onClick={() => setShowImport((prev) => !prev)}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-white transition hover:border-white/40 hover:bg-white/20"
            >
              Importer JSON
            </button>
            <button
              type="button"
              onClick={handleExportJson}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-white transition hover:border-white/40 hover:bg-white/20"
            >
              Export JSON
            </button>
            <button
              type="button"
              onClick={handleCopyTypescript}
              className="inline-flex items-center gap-2 rounded-full border border-[#ec008c]/50 bg-[#ec008c]/15 px-4 py-2 text-white transition hover:border-[#ec008c]/80 hover:bg-[#ec008c]/25"
            >
              Copier TS
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-4 py-2 text-white transition hover:border-white/30 hover:bg-white/10"
            >
              Reinitialiser
            </button>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-slate-300">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
            Disponibles: {statusCounts.available}
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
            Bientot: {statusCounts.soon}
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
            Fermees: {statusCounts.closed}
          </span>
          {missingCore ? (
            <span className="rounded-full border border-[#ec008c]/40 bg-[#ec008c]/15 px-3 py-1 text-[#ffc2e6]">
              Champs requis manquants
            </span>
          ) : null}
          {slugError ? (
            <span className="rounded-full border border-[#ec008c]/40 bg-[#ec008c]/15 px-3 py-1 text-[#ffc2e6]">
              Slug duplique
            </span>
          ) : null}
          {feedback ? (
            <span className="rounded-full border border-[#00a3ff]/40 bg-[#00a3ff]/10 px-3 py-1 text-[#9ad9ff]">
              {feedback}
            </span>
          ) : null}
        </div>
        <div className="mt-6 grid gap-4 rounded-3xl border border-white/10 bg-slate-950/70 p-5 text-sm text-slate-300 md:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
              Supabase
            </p>
            <h3 className="text-lg font-semibold text-white">
              Synchronisation des contenus
            </h3>
            <p className="text-sm text-slate-400">
              Chargez ou publiez la base de formations vers Supabase.
            </p>
          </div>
          <div className="space-y-3">
            <label className="flex flex-col gap-2 text-sm text-slate-300">
              Cle admin (ACADEMY_ADMIN_KEY)
              <input
                value={adminKey}
                onChange={(event) => setAdminKey(event.target.value)}
                placeholder="Saisir la cle admin"
                className={inputClass}
              />
            </label>
            <label className="flex items-center gap-2 text-xs text-slate-400">
              <input
                type="checkbox"
                checked={autoPublish}
                onChange={(event) => setAutoPublish(event.target.checked)}
                className="h-4 w-4 rounded border border-white/20 bg-slate-950/70 accent-[#00a3ff]"
              />
              Publier automatiquement apres upload
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleLoadSupabase}
                disabled={remoteDisabled}
                className={`rounded-full border px-4 py-2 text-white transition ${
                  remoteDisabled
                    ? "border-white/10 bg-white/5 text-slate-500"
                    : "border-[#00a3ff]/50 bg-[#00a3ff]/15 hover:border-[#00a3ff]/80 hover:bg-[#00a3ff]/25"
                }`}
              >
                Charger depuis Supabase
              </button>
              <button
                type="button"
                onClick={handlePushSupabase}
                disabled={remoteDisabled}
                className={`rounded-full border px-4 py-2 text-white transition ${
                  remoteDisabled
                    ? "border-white/10 bg-white/5 text-slate-500"
                    : "border-[#ec008c]/50 bg-[#ec008c]/15 hover:border-[#ec008c]/80 hover:bg-[#ec008c]/25"
                }`}
              >
                Publier vers Supabase
              </button>
            </div>
            <p className="text-xs text-slate-500">
              La cle est stockee en local dans votre navigateur.
            </p>
          </div>
        </div>
        {showImport ? (
          <div className="mt-6 grid gap-4 rounded-3xl border border-white/10 bg-slate-950/70 p-5 text-sm text-slate-300 md:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-3">
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  Import JSON
                </p>
                <p className="text-sm text-slate-400">
                  Collez le JSON exporte (tableau) ou chargez un fichier.
                </p>
              </div>
              <textarea
                value={importText}
                onChange={(event) => setImportText(event.target.value)}
                placeholder='[{"slug":"exemple","title":"Titre"}]'
                className={textareaClass}
              />
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => applyImport(importText)}
                  className="rounded-full border border-[#00a3ff]/50 bg-[#00a3ff]/15 px-4 py-2 text-white transition hover:border-[#00a3ff]/80 hover:bg-[#00a3ff]/25"
                >
                  Appliquer l'import
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowImport(false);
                    setImportText("");
                  }}
                  className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-white transition hover:border-white/40 hover:bg-white/20"
                >
                  Annuler
                </button>
              </div>
            </div>
            <div className="space-y-3">
              <label className="flex flex-col gap-2 text-sm text-slate-300">
                Fichier JSON
                <input
                  type="file"
                  accept="application/json"
                  onChange={handleImportFile}
                  className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white file:mr-4 file:rounded-full file:border-0 file:bg-white/10 file:px-4 file:py-2 file:text-xs file:uppercase file:tracking-[0.2em] file:text-white"
                />
              </label>
              <p className="text-xs text-slate-500">
                L'import remplace la liste actuelle.
              </p>
            </div>
          </div>
        ) : null}
      </section>

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <aside className="rounded-3xl border border-white/10 bg-slate-950/60 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Catalogue</h3>
            <button
              type="button"
              onClick={handleAdd}
              className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white transition hover:border-white/30 hover:bg-white/20"
            >
              Ajouter
            </button>
          </div>
          <label className="mt-4 flex flex-col gap-2 text-xs uppercase tracking-[0.3em] text-slate-400">
            Recherche
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Nom, slug, categorie"
              className="rounded-2xl border border-white/10 bg-slate-950/80 px-3 py-2 text-sm text-white outline-none transition focus:border-[#00a3ff]/60"
            />
          </label>
          <div className="mt-4 space-y-3">
            {filteredDrafts.map((item) => {
              const isActive = item._id === selectedId;
              return (
                <button
                  key={item._id}
                  type="button"
                  onClick={() => setSelectedId(item._id)}
                  className={`flex w-full flex-col gap-2 rounded-2xl border px-4 py-3 text-left transition ${
                    isActive
                      ? "border-[#00a3ff]/60 bg-[#00a3ff]/10"
                      : "border-white/10 bg-white/5 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-white">
                      {item.title || "Sans titre"}
                    </span>
                    <TrainingStatusBadge status={item.status} />
                  </div>
                  <div className="text-xs text-slate-400">
                    {item.category || "Categorie"} · {item.slug || "slug"}
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        <section className="space-y-6">
          {selected ? (
            <>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold text-white">
                    Informations principales
                  </h3>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <button
                      type="button"
                      onClick={handleDuplicate}
                      className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-white transition hover:border-white/40 hover:bg-white/20"
                    >
                      Dupliquer
                    </button>
                    <button
                      type="button"
                      onClick={handleRemove}
                      className="rounded-full border border-[#ec008c]/50 bg-[#ec008c]/15 px-4 py-2 text-white transition hover:border-[#ec008c]/70 hover:bg-[#ec008c]/25"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <label className="flex flex-col gap-2 text-sm text-slate-300">
                    Slug
                    <input
                      value={selected.slug}
                      onChange={(event) =>
                        updateSelected({ slug: event.target.value })
                      }
                      className={`${inputClass} ${
                        slugError ? "border-[#ec008c]/70" : ""
                      }`}
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm text-slate-300">
                    Titre
                    <input
                      value={selected.title}
                      onChange={(event) =>
                        updateSelected({ title: event.target.value })
                      }
                      className={inputClass}
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm text-slate-300">
                    Categorie
                    <input
                      value={selected.category}
                      onChange={(event) =>
                        updateSelected({ category: event.target.value })
                      }
                      list="academy-categories"
                      className={inputClass}
                    />
                    <datalist id="academy-categories">
                      {categories.map((item) => (
                        <option key={item} value={item} />
                      ))}
                    </datalist>
                  </label>
                  <label className="flex flex-col gap-2 text-sm text-slate-300">
                    Statut
                    <select
                      value={selected.status}
                      onChange={(event) =>
                        updateSelected({
                          status: event.target.value as TrainingStatus,
                        })
                      }
                      className={inputClass}
                    >
                      {statusOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <label className="flex flex-col gap-2 text-sm text-slate-300">
                    Resume court
                    <textarea
                      value={selected.summary}
                      onChange={(event) =>
                        updateSelected({ summary: event.target.value })
                      }
                      className={textareaClass}
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm text-slate-300">
                    Description longue
                    <textarea
                      value={selected.description}
                      onChange={(event) =>
                        updateSelected({ description: event.target.value })
                      }
                      className={textareaClass}
                    />
                  </label>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
                <h3 className="text-lg font-semibold text-white">
                  Details de la formation
                </h3>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <label className="flex flex-col gap-2 text-sm text-slate-300">
                    Duree
                    <input
                      value={selected.details.duration}
                      onChange={(event) =>
                        updateDetails("duration", event.target.value)
                      }
                      className={inputClass}
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm text-slate-300">
                    Niveau
                    <input
                      value={selected.details.level}
                      onChange={(event) =>
                        updateDetails("level", event.target.value)
                      }
                      className={inputClass}
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm text-slate-300">
                    Format
                    <input
                      value={selected.details.format}
                      onChange={(event) =>
                        updateDetails("format", event.target.value)
                      }
                      className={inputClass}
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm text-slate-300">
                    Prochaine session
                    <input
                      value={selected.details.nextSession}
                      onChange={(event) =>
                        updateDetails("nextSession", event.target.value)
                      }
                      className={inputClass}
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm text-slate-300">
                    Prix
                    <input
                      value={selected.details.price}
                      onChange={(event) =>
                        updateDetails("price", event.target.value)
                      }
                      className={inputClass}
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm text-slate-300">
                    Localisation
                    <input
                      value={selected.details.location}
                      onChange={(event) =>
                        updateDetails("location", event.target.value)
                      }
                      className={inputClass}
                    />
                  </label>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
                <h3 className="text-lg font-semibold text-white">
                  Resultats et prerequis
                </h3>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <label className="flex flex-col gap-2 text-sm text-slate-300">
                    Outcomes (une ligne par item)
                    <textarea
                      value={selected.outcomes.join("\n")}
                      onChange={(event) =>
                        updateSelected({
                          outcomes: event.target.value.split("\n"),
                        })
                      }
                      className={textareaClass}
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm text-slate-300">
                    Prerequis (une ligne par item)
                    <textarea
                      value={selected.prerequisites.join("\n")}
                      onChange={(event) =>
                        updateSelected({
                          prerequisites: event.target.value.split("\n"),
                        })
                      }
                      className={textareaClass}
                    />
                  </label>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
                <h3 className="text-lg font-semibold text-white">
                  Medias et liens
                </h3>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <label className="flex flex-col gap-2 text-sm text-slate-300">
                    Image de couverture (URL ou /public)
                    <input
                      value={selected.coverImage ?? ""}
                      onChange={(event) =>
                        updateSelected({ coverImage: event.target.value })
                      }
                      className={inputClass}
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm text-slate-300">
                    YouTube embed (https://www.youtube.com/embed/...)
                    <input
                      value={selected.youtubeEmbed ?? ""}
                      onChange={(event) =>
                        updateSelected({ youtubeEmbed: event.target.value })
                      }
                      className={inputClass}
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm text-slate-300">
                    Programme PDF (URL ou /public)
                    <input
                      value={selected.pdfProgram ?? ""}
                      onChange={(event) =>
                        updateSelected({ pdfProgram: event.target.value })
                      }
                      className={inputClass}
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm text-slate-300">
                    Lien d'inscription (optionnel)
                    <input
                      value={selected.registrationUrl ?? ""}
                      onChange={(event) =>
                        updateSelected({ registrationUrl: event.target.value })
                      }
                      className={inputClass}
                    />
                  </label>
                </div>
                <div className="mt-6 grid gap-4 rounded-3xl border border-white/10 bg-slate-950/70 p-4 text-sm text-slate-300 md:grid-cols-2">
                  <div className="space-y-3">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                      Upload image
                    </p>
                    <input
                      type="file"
                      accept="image/jpeg,image/png"
                      onChange={(event) =>
                        setImageFile(event.target.files?.[0] ?? null)
                      }
                      className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-2 text-white file:mr-4 file:rounded-full file:border-0 file:bg-white/10 file:px-4 file:py-2 file:text-xs file:uppercase file:tracking-[0.2em] file:text-white"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        imageFile ? uploadMedia(imageFile, "image") : null
                      }
                      disabled={uploadDisabled || !imageFile}
                      className={`rounded-full border px-4 py-2 text-white transition ${
                        uploadDisabled || !imageFile
                          ? "border-white/10 bg-white/5 text-slate-500"
                          : "border-[#00a3ff]/50 bg-[#00a3ff]/15 hover:border-[#00a3ff]/80 hover:bg-[#00a3ff]/25"
                      }`}
                    >
                      Uploader JPG / PNG
                    </button>
                    <p className="text-xs text-slate-500">
                      Formats acceptes: JPG, PNG.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                      Upload PDF
                    </p>
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={(event) =>
                        setPdfFile(event.target.files?.[0] ?? null)
                      }
                      className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-2 text-white file:mr-4 file:rounded-full file:border-0 file:bg-white/10 file:px-4 file:py-2 file:text-xs file:uppercase file:tracking-[0.2em] file:text-white"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        pdfFile ? uploadMedia(pdfFile, "pdf") : null
                      }
                      disabled={uploadDisabled || !pdfFile}
                      className={`rounded-full border px-4 py-2 text-white transition ${
                        uploadDisabled || !pdfFile
                          ? "border-white/10 bg-white/5 text-slate-500"
                          : "border-[#ec008c]/50 bg-[#ec008c]/15 hover:border-[#ec008c]/80 hover:bg-[#ec008c]/25"
                      }`}
                    >
                      Uploader PDF
                    </button>
                    <p className="text-xs text-slate-500">
                      Format accepte: PDF.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
                <h3 className="text-lg font-semibold text-white">
                  Apercu carte + media
                </h3>
                <div className="mt-5 grid gap-6 lg:grid-cols-2">
                  <TrainingCard training={stripDraft(selected)} />
                  <TrainingMedia
                    title={selected.title}
                    coverImage={selected.coverImage || undefined}
                    youtubeEmbed={selected.youtubeEmbed || undefined}
                    pdfProgram={selected.pdfProgram || undefined}
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-slate-300">
              Aucun contenu selectionne.
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
