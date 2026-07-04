"use client";

import { useEffect, useState, useCallback } from "react";

type SessionStatus = "upcoming" | "live" | "ended";

type Session = {
  id: string;
  training_slug: string;
  title: string;
  scheduled_at: string;
  duration_minutes: number;
  max_participants: number;
  jitsi_room_id: string;
  jitsi_password: string;
  youtube_stream_key: string | null;
  youtube_replay_url: string | null;
  status: SessionStatus;
  created_at: string;
  enrollments?: { count: number }[];
};

type Enrollment = {
  id: string;
  user_id: string;
  enrolled_at: string;
  email?: string | null;
  name?: string | null;
};

const STATUS_LABELS: Record<SessionStatus, string> = {
  upcoming: "À venir",
  live: "En direct",
  ended: "Terminé",
};

const STATUS_COLORS: Record<SessionStatus, string> = {
  upcoming: "border-sky-500/40 bg-sky-500/10 text-sky-300",
  live: "border-red-500/40 bg-red-500/15 text-red-300",
  ended: "border-slate-600/40 bg-slate-700/20 text-slate-400",
};

const inputClass =
  "w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2.5 text-sm text-white outline-none transition focus:border-fuchsia-500/60 placeholder:text-slate-600";

const labelClass = "flex flex-col gap-1.5 text-xs text-slate-400";

const emptyForm = {
  title: "",
  training_slug: "",
  scheduled_at: "",
  duration_minutes: 120,
  max_participants: 8,
  jitsi_room_id: "",
  jitsi_password: "",
  youtube_stream_key: "",
  youtube_replay_url: "",
  status: "upcoming" as SessionStatus,
};

export function SessionsAdmin() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [isCreating, setIsCreating] = useState(false);
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState<{ msg: string; ok: boolean } | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<Session | null>(null);
  const [enrollEmail, setEnrollEmail] = useState("");
  const [enrollBusy, setEnrollBusy] = useState(false);
  const [enrollFeedback, setEnrollFeedback] = useState<{ msg: string; ok: boolean } | null>(null);

  const showMsg = (msg: string, ok = true) => {
    setFeedback({ msg, ok });
    setTimeout(() => setFeedback(null), 3000);
  };

  const loadSessions = useCallback(async () => {
    setBusy(true);
    try {
      const r = await fetch("/api/admin/sessions", { credentials: "include" });
      const d = await r.json() as { ok: boolean; sessions?: Session[] };
      if (d.ok) setSessions(d.sessions ?? []);
    } finally {
      setBusy(false);
    }
  }, []);

  useEffect(() => { loadSessions(); }, [loadSessions]);

  const selected = sessions.find((s) => s.id === selectedId) ?? null;

  const selectSession = (session: Session) => {
    setSelectedId(session.id);
    setIsCreating(false);
    setForm({
      title: session.title,
      training_slug: session.training_slug,
      scheduled_at: session.scheduled_at.slice(0, 16),
      duration_minutes: session.duration_minutes,
      max_participants: session.max_participants,
      jitsi_room_id: session.jitsi_room_id ?? "",
      jitsi_password: session.jitsi_password ?? "",
      youtube_stream_key: session.youtube_stream_key ?? "",
      youtube_replay_url: session.youtube_replay_url ?? "",
      status: session.status,
    });
    loadEnrollments(session.id);
  };

  const startCreate = () => {
    setSelectedId(null);
    setIsCreating(true);
    setForm(emptyForm);
  };

  const loadEnrollments = async (sessionId: string) => {
    try {
      const r = await fetch(`/api/admin/sessions/${sessionId}`, { credentials: "include" });
      const d = await r.json() as { ok: boolean; enrollments?: Enrollment[]; message?: string };
      if (d.ok) {
        setEnrollments(d.enrollments ?? []);
      } else {
        showMsg(d.message ?? "Erreur chargement inscrits.", false);
      }
    } catch {
      showMsg("Impossible de charger les inscrits.", false);
    }
  };

  const handleEnrollByEmail = async () => {
    if (!selectedId || !enrollEmail.trim()) return;
    setEnrollBusy(true);
    try {
      const r = await fetch(`/api/admin/sessions/${selectedId}/enroll-user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: enrollEmail.trim() }),
      });
      let d: { ok: boolean; message?: string };
      try {
        d = await r.json();
      } catch {
        setEnrollFeedback({ msg: `Erreur HTTP ${r.status} — réessaie ou vérifie la connexion admin.`, ok: false });
        return;
      }
      setEnrollFeedback({ msg: d.message ?? (d.ok ? "Inscrit." : "Erreur."), ok: d.ok });
      if (d.ok) {
        setEnrollEmail("");
        await loadEnrollments(selectedId);
        await loadSessions();
      }
    } catch (err) {
      setEnrollFeedback({ msg: `Erreur réseau : ${String(err)}`, ok: false });
    } finally {
      setEnrollBusy(false);
    }
  };

  const handleRemoveEnrollment = async (userId: string) => {
    if (!selectedId) return;
    const r = await fetch(`/api/admin/sessions/${selectedId}/enroll-user?user_id=${userId}`, {
      method: "DELETE",
      credentials: "include",
    });
    const d = await r.json() as { ok: boolean };
    if (d.ok) {
      setEnrollments((prev) => prev.filter((e) => e.user_id !== userId));
      await loadSessions();
    }
  };

  const handleSave = async () => {
    if (!form.title || !form.training_slug || !form.scheduled_at) {
      showMsg("Titre, formation et date requis.", false);
      return;
    }
    setBusy(true);
    try {
      if (isCreating) {
        const r = await fetch("/api/admin/sessions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            ...form,
            scheduled_at: new Date(form.scheduled_at).toISOString(),
            youtube_stream_key: form.youtube_stream_key || null,
            youtube_replay_url: form.youtube_replay_url || null,
          }),
        });
        const d = await r.json() as { ok: boolean; session?: Session; message?: string };
        if (!d.ok) { showMsg(d.message ?? "Erreur.", false); return; }
        showMsg("Session créée.");
        setIsCreating(false);
        await loadSessions();
        if (d.session) setSelectedId(d.session.id);
      } else if (selectedId) {
        const r = await fetch(`/api/admin/sessions/${selectedId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            ...form,
            scheduled_at: new Date(form.scheduled_at).toISOString(),
            youtube_stream_key: form.youtube_stream_key || null,
            youtube_replay_url: form.youtube_replay_url || null,
          }),
        });
        const d = await r.json() as { ok: boolean; message?: string };
        if (!d.ok) { showMsg(d.message ?? "Erreur.", false); return; }
        showMsg("Session mise à jour.");
        await loadSessions();
      }
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;
    setBusy(true);
    try {
      const r = await fetch(`/api/admin/sessions/${confirmDelete.id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const d = await r.json() as { ok: boolean };
      if (d.ok) {
        showMsg("Session supprimée.");
        setConfirmDelete(null);
        setSelectedId(null);
        setIsCreating(false);
        await loadSessions();
      }
    } finally {
      setBusy(false);
    }
  };

  const enrollCount = (s: Session) => s.enrollments?.[0]?.count ?? 0;

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString("fr-FR", {
      day: "2-digit", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/8 bg-slate-900/50 px-5 py-4">
        <div className="flex items-center gap-3">
          <h2 className="text-base font-bold text-white">Sessions live</h2>
          <span className="rounded-full border border-white/8 bg-white/5 px-2.5 py-0.5 text-xs text-slate-400">
            {sessions.length} session{sessions.length !== 1 ? "s" : ""}
          </span>
          {busy && !feedback && (
            <span className="text-xs text-slate-500">Chargement…</span>
          )}
          {feedback && (
            <span className={`rounded-full border px-2.5 py-0.5 text-xs ${feedback.ok ? "border-fuchsia-500/40 bg-fuchsia-500/10 text-fuchsia-300" : "border-red-500/40 bg-red-500/10 text-red-300"}`}>
              {feedback.msg}
            </span>
          )}
        </div>
        <button
          onClick={startCreate}
          className="rounded-full border border-fuchsia-500/40 bg-fuchsia-500/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-fuchsia-500/20"
        >
          + Nouvelle session
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        {/* Session list */}
        <aside className="space-y-2 rounded-2xl border border-white/8 bg-slate-900/40 p-4">
          {sessions.length === 0 && !busy && (
            <p className="text-sm text-slate-500">Aucune session. Créez-en une →</p>
          )}
          {sessions.map((s) => {
            const isActive = s.id === selectedId;
            return (
              <button
                key={s.id}
                onClick={() => selectSession(s)}
                className={`flex w-full flex-col gap-1.5 rounded-xl border px-3 py-3 text-left transition ${
                  isActive
                    ? "border-fuchsia-500/50 bg-fuchsia-500/10"
                    : "border-white/8 bg-white/3 hover:border-white/15"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-white line-clamp-1">{s.title}</span>
                  <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${STATUS_COLORS[s.status]}`}>
                    {STATUS_LABELS[s.status]}
                  </span>
                </div>
                <span className="text-xs text-slate-400">{formatDate(s.scheduled_at)}</span>
                <span className="text-xs text-slate-500">{enrollCount(s)} inscrit{enrollCount(s) !== 1 ? "s" : ""} · {s.duration_minutes} min</span>
              </button>
            );
          })}
        </aside>

        {/* Form */}
        {(isCreating || selected) ? (
          <div className="space-y-5 rounded-2xl border border-white/8 bg-slate-900/40 p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">
                {isCreating ? "Nouvelle session" : "Modifier la session"}
              </h3>
              <div className="flex gap-2">
                {!isCreating && selected && (
                  <>
                    <button
                      onClick={() => loadEnrollments(selected.id)}
                      className="rounded-xl border border-sky-500/30 bg-sky-500/10 px-3 py-1.5 text-xs font-semibold text-sky-300 transition hover:bg-sky-500/20"
                    >
                      ↻ {enrollments.length} inscrit{enrollments.length !== 1 ? "s" : ""}
                    </button>
                    <button
                      onClick={() => setConfirmDelete(selected)}
                      className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-300 transition hover:bg-red-500/20"
                    >
                      Supprimer
                    </button>
                  </>
                )}
                <button
                  onClick={handleSave}
                  disabled={busy}
                  className="rounded-xl border border-fuchsia-500/40 bg-fuchsia-500/15 px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-fuchsia-500/25 disabled:opacity-50"
                >
                  {isCreating ? "Créer" : "Enregistrer"}
                </button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className={labelClass}>
                Titre
                <input
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  placeholder="Ex: Formation Python — Juillet 2026"
                  className={inputClass}
                />
              </label>
              <label className={labelClass}>
                Slug formation
                <input
                  value={form.training_slug}
                  onChange={(e) => setForm((f) => ({ ...f, training_slug: e.target.value }))}
                  placeholder="Ex: python-data-science"
                  className={inputClass}
                />
              </label>
              <label className={labelClass}>
                Date et heure
                <input
                  type="datetime-local"
                  value={form.scheduled_at}
                  onChange={(e) => setForm((f) => ({ ...f, scheduled_at: e.target.value }))}
                  className={inputClass}
                />
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className={labelClass}>
                  Durée (min)
                  <input
                    type="number"
                    min={30}
                    value={form.duration_minutes}
                    onChange={(e) => setForm((f) => ({ ...f, duration_minutes: Number(e.target.value) }))}
                    className={inputClass}
                  />
                </label>
                <label className={labelClass}>
                  Places max
                  <input
                    type="number"
                    min={1}
                    value={form.max_participants}
                    onChange={(e) => setForm((f) => ({ ...f, max_participants: Number(e.target.value) }))}
                    className={inputClass}
                  />
                </label>
              </div>
            </div>

            {!isCreating && (
              <label className={labelClass}>
                Statut
                <select
                  value={form.status}
                  onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as SessionStatus }))}
                  className={inputClass}
                >
                  <option value="upcoming">À venir</option>
                  <option value="live">En direct (LIVE)</option>
                  <option value="ended">Terminé</option>
                </select>
              </label>
            )}

            <div className="rounded-xl border border-white/8 bg-slate-950/40 p-4 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Jitsi Meet</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className={labelClass}>
                  ID de salle (auto si vide)
                  <input
                    value={form.jitsi_room_id}
                    onChange={(e) => setForm((f) => ({ ...f, jitsi_room_id: e.target.value }))}
                    placeholder="enov-python-1751234567"
                    className={inputClass}
                  />
                </label>
                <label className={labelClass}>
                  Mot de passe (auto si vide)
                  <input
                    value={form.jitsi_password}
                    onChange={(e) => setForm((f) => ({ ...f, jitsi_password: e.target.value }))}
                    placeholder="abc12345"
                    className={inputClass}
                  />
                </label>
              </div>
              {selected && (
                <p className="text-xs text-slate-500">
                  Lien direct :{" "}
                  <a
                    href={`https://meet.jit.si/${selected.jitsi_room_id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-fuchsia-400 hover:underline"
                  >
                    meet.jit.si/{selected.jitsi_room_id}
                  </a>
                </p>
              )}
            </div>

            <div className="rounded-xl border border-white/8 bg-slate-950/40 p-4 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">YouTube</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className={labelClass}>
                  Clé de stream (live)
                  <input
                    value={form.youtube_stream_key ?? ""}
                    onChange={(e) => setForm((f) => ({ ...f, youtube_stream_key: e.target.value }))}
                    placeholder="xxxx-xxxx-xxxx-xxxx"
                    className={inputClass}
                  />
                </label>
                <label className={labelClass}>
                  URL replay (après session)
                  <input
                    value={form.youtube_replay_url ?? ""}
                    onChange={(e) => setForm((f) => ({ ...f, youtube_replay_url: e.target.value }))}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className={inputClass}
                  />
                </label>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center rounded-2xl border border-white/8 bg-slate-900/20 p-12 text-slate-500 text-sm">
            Sélectionne une session ou crée-en une nouvelle
          </div>
        )}
      </div>

      {/* Enrollments panel */}
      {selected && (
        <div className="rounded-2xl border border-white/8 bg-slate-900/40 p-5 space-y-4">
          <h3 className="text-sm font-bold text-white">
            Inscrits — {selected.title}
          </h3>

          {/* Add by email */}
          <div className="flex gap-2">
            <input
              type="email"
              value={enrollEmail}
              onChange={(e) => setEnrollEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleEnrollByEmail()}
              placeholder="email@utilisateur.com"
              className="flex-1 rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2 text-sm text-white outline-none focus:border-fuchsia-500/60 placeholder:text-slate-600"
            />
            <button
              onClick={handleEnrollByEmail}
              disabled={enrollBusy || !enrollEmail.trim()}
              className="rounded-xl border border-fuchsia-500/40 bg-fuchsia-500/15 px-4 py-2 text-sm font-semibold text-white transition hover:bg-fuchsia-500/25 disabled:opacity-50"
            >
              {enrollBusy ? "…" : "Inscrire"}
            </button>
          </div>
          {enrollFeedback && (
            <div className={`rounded-xl border px-4 py-2.5 text-sm ${enrollFeedback.ok ? "border-fuchsia-500/30 bg-fuchsia-500/10 text-fuchsia-300" : "border-red-500/30 bg-red-500/10 text-red-300"}`}>
              {enrollFeedback.msg}
            </div>
          )}

          {/* List */}
          {enrollments.length === 0 ? (
            <p className="text-sm text-slate-500">Aucun inscrit pour le moment.</p>
          ) : (
            <div className="space-y-2">
              {enrollments.map((e, i) => (
                <div key={e.id} className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/3 px-4 py-2.5">
                  <span className="text-xs text-slate-500">#{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    {e.name && <p className="text-xs font-semibold text-white truncate">{e.name}</p>}
                    <p className="text-xs text-slate-400 truncate">{e.email ?? e.user_id}</p>
                  </div>
                  <span className="text-xs text-slate-500 shrink-0">{new Date(e.enrolled_at).toLocaleDateString("fr-FR")}</span>
                  <button
                    onClick={() => handleRemoveEnrollment(e.user_id)}
                    className="text-xs text-red-400 hover:text-red-300 transition shrink-0"
                  >
                    Retirer
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Confirm delete modal */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur" onClick={() => setConfirmDelete(null)} />
          <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white">Supprimer cette session ?</h3>
            <p className="mt-2 text-sm text-slate-400">
              <span className="font-semibold text-white">{confirmDelete.title}</span> sera supprimée définitivement, ainsi que toutes les inscriptions associées.
            </p>
            <div className="mt-5 flex justify-end gap-3">
              <button onClick={() => setConfirmDelete(null)} className="rounded-xl border border-white/15 px-4 py-2 text-sm text-slate-400 hover:text-white">
                Annuler
              </button>
              <button onClick={handleDelete} disabled={busy} className="rounded-xl border border-red-500/50 bg-red-500/15 px-4 py-2 text-sm font-semibold text-red-300 hover:bg-red-500/25 disabled:opacity-50">
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
