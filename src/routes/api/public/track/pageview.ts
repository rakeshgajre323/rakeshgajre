import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/track/pageview")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as {
            session_id?: string;
            path?: string;
            referrer?: string | null;
            time_on_page_seconds?: number;
            update_id?: string;
          };
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

          // Update an existing pageview's duration
          if (body.update_id) {
            await supabaseAdmin
              .from("page_views")
              .update({ time_on_page_seconds: Math.min(body.time_on_page_seconds ?? 0, 7200) })
              .eq("id", body.update_id);
            return Response.json({ ok: true });
          }

          if (!body.session_id || !body.path) return new Response("Bad request", { status: 400 });

          const { data, error } = await supabaseAdmin
            .from("page_views")
            .insert({
              session_id: body.session_id,
              path: body.path.slice(0, 500),
              referrer: body.referrer?.slice(0, 500) ?? null,
            })
            .select("id")
            .single();

          if (error) {
            console.error("pageview insert error", error);
            return new Response("error", { status: 500 });
          }

          // Touch session last_seen
          await supabaseAdmin
            .from("visitor_sessions")
            .update({ last_seen: new Date().toISOString() })
            .eq("id", body.session_id);

          return Response.json({ pageview_id: data.id });
        } catch (e) {
          console.error(e);
          return new Response("error", { status: 500 });
        }
      },
    },
  },
});
