-- All inserts go through server-side admin client in /api/public/track/*,
-- so anon does not need INSERT either. Remove overly permissive WITH CHECK (true) policies.
DROP POLICY IF EXISTS "anyone can create a session" ON public.visitor_sessions;
DROP POLICY IF EXISTS "anyone can record a pageview" ON public.page_views;