
-- Visitor sessions: one row per (browser, day) keyed by session_token
CREATE TABLE public.visitor_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_token TEXT NOT NULL UNIQUE,
  first_seen TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_seen TIMESTAMPTZ NOT NULL DEFAULT now(),
  country TEXT,
  region TEXT,
  city TEXT,
  device_type TEXT,
  os TEXT,
  browser TEXT,
  referrer_source TEXT,
  referrer_url TEXT,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  user_email TEXT,
  user_name TEXT,
  user_avatar TEXT
);

CREATE INDEX visitor_sessions_last_seen_idx ON public.visitor_sessions(last_seen DESC);
CREATE INDEX visitor_sessions_user_id_idx ON public.visitor_sessions(user_id);

GRANT SELECT, INSERT, UPDATE ON public.visitor_sessions TO anon;
GRANT SELECT, INSERT, UPDATE ON public.visitor_sessions TO authenticated;
GRANT ALL ON public.visitor_sessions TO service_role;

ALTER TABLE public.visitor_sessions ENABLE ROW LEVEL SECURITY;

-- Anyone can insert / update their own session row (keyed by session_token they generate).
-- Reads are blocked from anon/authenticated entirely — only service_role (admin server fns) can SELECT.
CREATE POLICY "anyone can create a session"
  ON public.visitor_sessions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "anyone can update their session"
  ON public.visitor_sessions FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- No SELECT policy = no reads via anon/authenticated. Admin reads via service_role.

CREATE TABLE public.page_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES public.visitor_sessions(id) ON DELETE CASCADE,
  path TEXT NOT NULL,
  referrer TEXT,
  viewed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  time_on_page_seconds INTEGER
);

CREATE INDEX page_views_viewed_at_idx ON public.page_views(viewed_at DESC);
CREATE INDEX page_views_session_idx ON public.page_views(session_id);

GRANT SELECT, INSERT, UPDATE ON public.page_views TO anon;
GRANT SELECT, INSERT, UPDATE ON public.page_views TO authenticated;
GRANT ALL ON public.page_views TO service_role;

ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone can record a pageview"
  ON public.page_views FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "anyone can update their pageview duration"
  ON public.page_views FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Enable realtime on visitor_sessions for live counter
ALTER PUBLICATION supabase_realtime ADD TABLE public.visitor_sessions;
