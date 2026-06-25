import { createServerFn } from "@tanstack/react-start";

async function ensureAdmin() {
  const { getAdminSession } = await import("./admin-session.server");
  const session = await getAdminSession();
  if (!session.data.isAdmin) throw new Error("Unauthorized");
}

export const getDashboardAnalytics = createServerFn({ method: "GET" }).handler(async () => {
  await ensureAdmin();
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  const now = new Date();
  const dayAgo = new Date(now.getTime() - 24 * 3600 * 1000).toISOString();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 3600 * 1000).toISOString();
  const monthAgo = new Date(now.getTime() - 30 * 24 * 3600 * 1000).toISOString();

  const { data: sessions } = await supabaseAdmin
    .from("visitor_sessions")
    .select("*")
    .order("last_seen", { ascending: false })
    .limit(2000);

  const { data: pageviews } = await supabaseAdmin
    .from("page_views")
    .select("*")
    .gte("viewed_at", monthAgo)
    .order("viewed_at", { ascending: false })
    .limit(5000);

  const ss = sessions ?? [];
  const pv = pageviews ?? [];

  const totalVisitors = ss.length;
  const today = ss.filter((s) => s.last_seen >= dayAgo).length;
  const week = ss.filter((s) => s.last_seen >= weekAgo).length;
  const month = ss.filter((s) => s.last_seen >= monthAgo).length;

  // Sessions per day (last 30)
  const trafficMap = new Map<string, number>();
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 24 * 3600 * 1000);
    trafficMap.set(d.toISOString().slice(0, 10), 0);
  }
  for (const s of ss) {
    const k = s.first_seen.slice(0, 10);
    if (trafficMap.has(k)) trafficMap.set(k, (trafficMap.get(k) ?? 0) + 1);
  }
  const trafficSeries = [...trafficMap.entries()].map(([date, count]) => ({ date, count }));

  // Group helper
  const groupBy = (key: keyof typeof ss[number]) => {
    const m = new Map<string, number>();
    for (const s of ss) {
      const v = (s[key] as string) || "Unknown";
      m.set(v, (m.get(v) ?? 0) + 1);
    }
    return [...m.entries()].map(([name, value]) => ({ name, value }));
  };

  const devices = groupBy("device_type");
  const osBreakdown = groupBy("os");
  const browsers = groupBy("browser");
  const sources = groupBy("referrer_source");
  const countries = groupBy("country");

  // Pages per session + bounce rate
  const pvBySession = new Map<string, number>();
  for (const p of pv) {
    pvBySession.set(p.session_id, (pvBySession.get(p.session_id) ?? 0) + 1);
  }
  const totalSessionsWithPV = pvBySession.size || 1;
  const avgPagesPerSession =
    [...pvBySession.values()].reduce((a, b) => a + b, 0) / totalSessionsWithPV;
  const bounces = [...pvBySession.values()].filter((n) => n === 1).length;
  const bounceRate = (bounces / totalSessionsWithPV) * 100;

  const avgSessionSeconds = (() => {
    const durations = ss
      .map((s) => (new Date(s.last_seen).getTime() - new Date(s.first_seen).getTime()) / 1000)
      .filter((n) => n > 0 && n < 3600);
    if (!durations.length) return 0;
    return durations.reduce((a, b) => a + b, 0) / durations.length;
  })();

  const recentVisits = ss.slice(0, 25).map((s) => ({
    id: s.id,
    last_seen: s.last_seen,
    country: s.country,
    city: s.city,
    device_type: s.device_type,
    os: s.os,
    browser: s.browser,
    referrer_source: s.referrer_source,
  }));

  const identified = ss
    .filter((s) => s.user_email)
    .reduce((acc, s) => {
      const key = s.user_email!;
      const existing = acc.get(key);
      if (existing) {
        existing.sessions += 1;
        if (s.first_seen < existing.first_seen) existing.first_seen = s.first_seen;
        if (s.last_seen > existing.last_seen) existing.last_seen = s.last_seen;
      } else {
        acc.set(key, {
          email: s.user_email!,
          name: s.user_name ?? "",
          avatar: s.user_avatar ?? null,
          first_seen: s.first_seen,
          last_seen: s.last_seen,
          sessions: 1,
          country: s.country,
          city: s.city,
          device_type: s.device_type,
        });
      }
      return acc;
    }, new Map<string, {
      email: string; name: string; avatar: string | null;
      first_seen: string; last_seen: string; sessions: number;
      country: string | null; city: string | null; device_type: string | null;
    }>());

  return {
    kpis: {
      totalVisitors,
      today,
      week,
      month,
      avgSessionSeconds,
      bounceRate,
      avgPagesPerSession,
    },
    trafficSeries,
    devices,
    osBreakdown,
    browsers,
    sources,
    countries,
    recentVisits,
    identified: [...identified.values()].sort((a, b) => (b.last_seen > a.last_seen ? 1 : -1)),
  };
});
