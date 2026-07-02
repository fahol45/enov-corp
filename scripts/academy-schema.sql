-- ============================================================
-- Enov Academy — tables sessions & enrollments
-- À exécuter dans Supabase SQL Editor
-- ============================================================

-- Table des sessions programmées
CREATE TABLE IF NOT EXISTS public.sessions (
  id               UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  training_slug    TEXT        NOT NULL,
  title            TEXT        NOT NULL,
  scheduled_at     TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER     NOT NULL DEFAULT 120,
  jitsi_room_id    TEXT        UNIQUE,
  jitsi_password   TEXT,
  youtube_stream_key  TEXT,
  youtube_replay_url  TEXT,
  status           TEXT        NOT NULL DEFAULT 'upcoming'
                               CHECK (status IN ('upcoming', 'live', 'ended')),
  max_participants INTEGER     DEFAULT 8,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- Table des inscriptions utilisateur ↔ session
CREATE TABLE IF NOT EXISTS public.enrollments (
  id           UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id      UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id   UUID        NOT NULL REFERENCES public.sessions(id) ON DELETE CASCADE,
  enrolled_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, session_id)
);

-- RLS sessions
ALTER TABLE public.sessions    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Sessions lisibles par tous"
  ON public.sessions FOR SELECT USING (true);

CREATE POLICY "Enrollments visibles par l utilisateur"
  ON public.enrollments FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Inscription possible si authentifié"
  ON public.enrollments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS pour les tables existantes (correctif)
ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hero_slides     ENABLE ROW LEVEL SECURITY;

CREATE POLICY "portfolio_items public read"
  ON public.portfolio_items FOR SELECT USING (true);

CREATE POLICY "hero_slides public read"
  ON public.hero_slides FOR SELECT USING (true);
