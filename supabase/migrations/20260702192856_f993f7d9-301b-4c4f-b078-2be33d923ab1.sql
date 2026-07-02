-- Remove permissive USING (true) UPDATE policies. All writes go through server-side
-- admin client (service_role) in /api/public/track/*, so anon does not need UPDATE.
DROP POLICY IF EXISTS "anyone can update their session" ON public.visitor_sessions;
DROP POLICY IF EXISTS "anyone can update their pageview duration" ON public.page_views;

-- Remove visitor_sessions from Realtime publication. The dashboard uses polling,
-- and without a SELECT policy no rows would be delivered anyway. Dropping the
-- publication membership eliminates the exposure risk if a SELECT policy is later added.
ALTER PUBLICATION supabase_realtime DROP TABLE public.visitor_sessions;