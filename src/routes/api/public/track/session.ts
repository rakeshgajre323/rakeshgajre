import { createFileRoute } from "@tanstack/react-router";
import { getRequestIP } from "@tanstack/react-start/server";

export const Route = createFileRoute("/api/public/track/session")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as {
            session_token?: string;
            referrer?: string | null;
            user?: { id?: string; email?: string; name?: string; avatar?: string } | null;
          };
          if (!body.session_token || body.session_token.length > 100) {
            return new Response("Bad request", { status: 400 });
          }

          const { parseUserAgent, classifyReferrer, lookupGeo } = await import(
            "@/lib/analytics-helpers.server"
          );
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

          const ua = request.headers.get("user-agent") ?? "";
          const { device_type, os, browser } = parseUserAgent(ua);
          const { source, url } = classifyReferrer(body.referrer ?? null);
          const ip = getRequestIP({ xForwardedFor: true }) ?? null;
          const geo = await lookupGeo(ip);

          const now = new Date().toISOString();

          // Upsert by session_token
          const { data: existing } = await supabaseAdmin
            .from("visitor_sessions")
            .select("id")
            .eq("session_token", body.session_token)
            .maybeSingle();

          if (existing) {
            await supabaseAdmin
              .from("visitor_sessions")
              .update({
                last_seen: now,
                user_id: body.user?.id ?? null,
                user_email: body.user?.email ?? null,
                user_name: body.user?.name ?? null,
                user_avatar: body.user?.avatar ?? null,
              })
              .eq("id", existing.id);
            return Response.json({ session_id: existing.id });
          }

          const { data: inserted, error } = await supabaseAdmin
            .from("visitor_sessions")
            .insert({
              session_token: body.session_token,
              first_seen: now,
              last_seen: now,
              country: geo.country,
              region: geo.region,
              city: geo.city,
              device_type,
              os,
              browser,
              referrer_source: source,
              referrer_url: url,
              user_id: body.user?.id ?? null,
              user_email: body.user?.email ?? null,
              user_name: body.user?.name ?? null,
              user_avatar: body.user?.avatar ?? null,
            })
            .select("id")
            .single();
          if (error) {
            console.error("session insert error", error);
            return new Response("error", { status: 500 });
          }
          return Response.json({ session_id: inserted.id });
        } catch (e) {
          console.error(e);
          return new Response("error", { status: 500 });
        }
      },
      OPTIONS: async () => new Response(null, { status: 204 }),
    },
  },
});
