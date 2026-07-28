import { createFileRoute, useNavigate, redirect } from "@tanstack/react-router";
import { Suspense, lazy, memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Users,
  Activity,
  Globe,
  Clock,
  TrendingUp,
  LogOut,
  RefreshCw,
  Eye,
  Smartphone,
} from "lucide-react";
import { adminCheck, adminLogout } from "@/lib/admin-auth.functions";
import { getDashboardAnalytics } from "@/lib/analytics.functions";

const Charts = {
  Area: lazy(() =>
    import("@/components/admin/dashboard-charts").then((m) => ({ default: m.ChartArea })),
  ),
  Pie: lazy(() =>
    import("@/components/admin/dashboard-charts").then((m) => ({ default: m.ChartPie })),
  ),
  Bar: lazy(() =>
    import("@/components/admin/dashboard-charts").then((m) => ({ default: m.ChartBar })),
  ),
};

export const Route = createFileRoute("/admin/dashboard")({
  ssr: false,
  beforeLoad: async () => {
    const res = await adminCheck();
    if (!res.isAdmin) throw redirect({ to: "/admin/login" });
  },
  component: DashboardPage,
});

type Response = Awaited<ReturnType<typeof getDashboardAnalytics>>;
type Data = Extract<Response, { unchanged: false }>;

// Adaptive polling: fast while data keeps changing, backs off when idle.
const MIN_INTERVAL = 5000;
const MAX_INTERVAL = 30000;

function ChartFallback({ className = "h-64" }: { className?: string }) {
  return <div className={`${className} animate-pulse rounded-lg bg-white/[0.03]`} />;
}

function DashboardPage() {
  const navigate = useNavigate();
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [live, setLive] = useState(true);
  const fingerprintRef = useRef<string | undefined>(undefined);
  const inFlightRef = useRef(false);
  const intervalRef = useRef(MIN_INTERVAL);

  const load = useCallback(async () => {
    if (inFlightRef.current) return; // never stack requests
    inFlightRef.current = true;
    setRefreshing(true);
    setError(null);
    try {
      const d = await getDashboardAnalytics({ data: { fingerprint: fingerprintRef.current } });
      setLastUpdated(new Date());
      fingerprintRef.current = d.fingerprint;
      if (d.unchanged) {
        // Nothing new — slow the poll down (doubling up to the cap).
        intervalRef.current = Math.min(intervalRef.current * 2, MAX_INTERVAL);
        return;
      }
      intervalRef.current = MIN_INTERVAL;
      setData(d);
    } catch {
      setError("Unable to load analytics. Please log in again.");
      intervalRef.current = Math.min(intervalRef.current * 2, MAX_INTERVAL);
    } finally {
      inFlightRef.current = false;
      setRefreshing(false);
      setLoading(false);
    }
  }, []);

  const manualRefresh = useCallback(() => {
    intervalRef.current = MIN_INTERVAL;
    void load();
  }, [load]);

  useEffect(() => {
    void load();
    if (!live) return;
    let timer: ReturnType<typeof setTimeout>;
    const schedule = () => {
      timer = setTimeout(async () => {
        if (document.visibilityState === "visible") await load();
        schedule();
      }, intervalRef.current);
    };
    schedule();
    const onVis = () => {
      if (document.visibilityState === "visible") {
        intervalRef.current = MIN_INTERVAL;
        void load();
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [live, load]);

  const onLogout = useCallback(async () => {
    await adminLogout();
    await navigate({ to: "/admin/login" });
  }, [navigate]);

  // Derived values memoized so 5s polls don't re-sort/re-format on every render.
  const topCountries = useMemo(
    () => [...(data?.countries ?? [])].sort((a, b) => b.value - a.value).slice(0, 10),
    [data?.countries],
  );
  const sessionLabel = useMemo(() => {
    const s = data?.kpis.avgSessionSeconds ?? 0;
    return `${Math.floor(s / 60)}m ${Math.round(s % 60)}s`;
  }, [data?.kpis.avgSessionSeconds]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white/60">
        <RefreshCw className="h-5 w-5 animate-spin" />
      </div>
    );
  }
  if (!data) return null;

  const k = data.kpis;

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-lg font-semibold tracking-tight">Analytics Dashboard</h1>
            <p className="flex items-center gap-2 text-xs text-white/50">
              <span
                className={`inline-block h-1.5 w-1.5 rounded-full ${live ? "bg-emerald-400 animate-pulse" : "bg-white/30"}`}
              />
              {live ? "Live" : "Paused"}
              {lastUpdated && (
                <span className="text-white/40">· last {lastUpdated.toLocaleTimeString()}</span>
              )}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLive((v) => !v)}
              className="inline-flex items-center gap-1.5 rounded-md border border-white/10 px-3 py-1.5 text-xs text-white/80 hover:bg-white/5"
            >
              {live ? "Pause" : "Resume"}
            </button>
            <button
              onClick={manualRefresh}
              className="inline-flex items-center gap-1.5 rounded-md border border-white/10 px-3 py-1.5 text-xs text-white/80 hover:bg-white/5"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`} />
              Refresh
            </button>
            <button
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 rounded-md border border-white/10 px-3 py-1.5 text-xs text-white/80 hover:bg-white/5"
            >
              <LogOut className="h-3.5 w-3.5" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-6 px-6 py-8">
        {error && (
          <div
            role="alert"
            className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
          >
            {error}
          </div>
        )}

        {/* KPIs */}
        <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <KPI icon={<Users className="h-4 w-4" />} label="Total Visitors" value={k.totalVisitors.toLocaleString()} />
          <KPI icon={<Activity className="h-4 w-4" />} label="Today" value={k.today.toLocaleString()} />
          <KPI icon={<TrendingUp className="h-4 w-4" />} label="This Week" value={k.week.toLocaleString()} />
          <KPI icon={<Globe className="h-4 w-4" />} label="This Month" value={k.month.toLocaleString()} />
          <KPI icon={<Clock className="h-4 w-4" />} label="Avg. Session" value={sessionLabel} />
          <KPI icon={<Eye className="h-4 w-4" />} label="Pages / Session" value={k.avgPagesPerSession.toFixed(2)} />
          <KPI icon={<Activity className="h-4 w-4" />} label="Bounce Rate" value={`${k.bounceRate.toFixed(1)}%`} />
          <KPI
            icon={<Smartphone className="h-4 w-4" />}
            label="Identified Users"
            value={data.identified.length.toLocaleString()}
          />
        </section>

        <Suspense fallback={<ChartFallback className="h-72" />}>
          <Panel title="Traffic — Last 30 days">
            <Charts.Area data={data.trafficSeries} />
          </Panel>

          <div className="grid gap-6 lg:grid-cols-2">
            <Panel title="Devices">
              <Charts.Pie data={data.devices} />
            </Panel>
            <Panel title="Operating Systems">
              <Charts.Pie data={data.osBreakdown} />
            </Panel>
            <Panel title="Browsers">
              <Charts.Bar data={data.browsers} />
            </Panel>
            <Panel title="Traffic Sources">
              <Charts.Bar data={data.sources} />
            </Panel>
          </div>

          <Panel title="Top Countries">
            <Charts.Bar data={topCountries} horizontal />
          </Panel>
        </Suspense>

        <Panel title="Identified Visitors">
          <IdentifiedTable rows={data.identified} />
        </Panel>

        <Panel title="Recent Visits">
          <RecentVisitsTable rows={data.recentVisits} />
        </Panel>
      </main>
    </div>
  );
}

function formatDuration(totalSeconds: number) {
  const mins = Math.floor(totalSeconds / 60);
  const secs = Math.max(0, totalSeconds % 60);
  return mins ? `${mins}m ${secs}s` : `${secs}s`;
}

const IdentifiedTable = memo(function IdentifiedTable({ rows }: { rows: Data["identified"] }) {
  if (!rows.length)
    return <p className="text-sm text-white/50">No visitors have signed in with an account yet.</p>;
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="text-left text-xs uppercase tracking-wider text-white/50">
          <tr>
            <th className="py-2 pr-3">Name</th>
            <th className="py-2 pr-3">Email</th>
            <th className="py-2 pr-3">Sessions</th>
            <th className="py-2 pr-3">Location</th>
            <th className="py-2 pr-3">Last seen</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((u) => (
            <tr key={u.email} className="border-t border-white/5">
              <td className="py-2 pr-3">{u.name || "—"}</td>
              <td className="py-2 pr-3 text-white/80">{u.email}</td>
              <td className="py-2 pr-3">{u.sessions}</td>
              <td className="py-2 pr-3 text-white/70">
                {[u.city, u.country].filter(Boolean).join(", ") || "—"}
              </td>
              <td className="py-2 pr-3 text-white/60">{new Date(u.last_seen).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

const RecentVisitsTable = memo(function RecentVisitsTable({ rows }: { rows: Data["recentVisits"] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="text-left text-xs uppercase tracking-wider text-white/50">
          <tr>
            <th className="py-2 pr-3">Time</th>
            <th className="py-2 pr-3">Location</th>
            <th className="py-2 pr-3">Device</th>
            <th className="py-2 pr-3">OS / Browser</th>
            <th className="py-2 pr-3">Source</th>
            <th className="py-2 pr-3">Pages</th>
            <th className="py-2 pr-3">Time spent</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((v) => (
            <tr key={v.id} className="border-t border-white/5">
              <td className="py-2 pr-3 text-white/70">{new Date(v.last_seen).toLocaleString()}</td>
              <td className="py-2 pr-3">
                {[v.city, v.region, v.country].filter(Boolean).join(", ") || "—"}
              </td>
              <td className="py-2 pr-3">{v.device_type || "—"}</td>
              <td className="py-2 pr-3 text-white/70">
                {[v.os, v.browser].filter(Boolean).join(" / ") || "—"}
              </td>
              <td className="py-2 pr-3">
                <div>{v.referrer_source || "—"}</div>
                {v.referrer_url ? (
                  <div className="max-w-48 truncate text-xs text-white/40">{v.referrer_url}</div>
                ) : null}
              </td>
              <td className="py-2 pr-3">{v.pages_viewed}</td>
              <td className="py-2 pr-3 text-white/70">{formatDuration(v.duration_seconds)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

const KPI = memo(function KPI({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-white/50">
        {icon}
        {label}
      </div>
      <div className="mt-2 text-2xl font-semibold tracking-tight">{value}</div>
    </div>
  );
});

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
      <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-white/70">{title}</h2>
      {children}
    </section>
  );
}
