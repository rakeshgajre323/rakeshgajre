import { createFileRoute, useNavigate, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
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

export const Route = createFileRoute("/admin/dashboard")({
  ssr: false,
  beforeLoad: async () => {
    const res = await adminCheck();
    if (!res.isAdmin) throw redirect({ to: "/admin/login" });
  },
  component: DashboardPage,
});

type Data = Awaited<ReturnType<typeof getDashboardAnalytics>>;

const COLORS = ["#ef4444", "#f59e0b", "#10b981", "#3b82f6", "#a855f7", "#ec4899", "#14b8a6", "#f97316"];

function DashboardPage() {
  const navigate = useNavigate();
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setRefreshing(true);
    setError(null);
    try {
      const d = await getDashboardAnalytics();
      setData(d);
    } catch {
      setError("Unable to load analytics. Please log in again.");
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
    const t = setInterval(load, 30000);
    return () => clearInterval(t);
  }, []);

  const onLogout = async () => {
    await adminLogout();
    await navigate({ to: "/admin/login" });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white/60">
        <RefreshCw className="h-5 w-5 animate-spin" />
      </div>
    );
  }
  if (!data) return null;

  const k = data.kpis;
  const mins = Math.floor(k.avgSessionSeconds / 60);
  const secs = Math.round(k.avgSessionSeconds % 60);

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-lg font-semibold tracking-tight">Analytics Dashboard</h1>
            <p className="text-xs text-white/50">Live visitor data — updates every 30s</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={load}
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
          <div role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        )}

        {/* KPIs */}
        <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <KPI icon={<Users className="h-4 w-4" />} label="Total Visitors" value={k.totalVisitors.toLocaleString()} />
          <KPI icon={<Activity className="h-4 w-4" />} label="Today" value={k.today.toLocaleString()} />
          <KPI icon={<TrendingUp className="h-4 w-4" />} label="This Week" value={k.week.toLocaleString()} />
          <KPI icon={<Globe className="h-4 w-4" />} label="This Month" value={k.month.toLocaleString()} />
          <KPI
            icon={<Clock className="h-4 w-4" />}
            label="Avg. Session"
            value={`${mins}m ${secs}s`}
          />
          <KPI icon={<Eye className="h-4 w-4" />} label="Pages / Session" value={k.avgPagesPerSession.toFixed(2)} />
          <KPI icon={<Activity className="h-4 w-4" />} label="Bounce Rate" value={`${k.bounceRate.toFixed(1)}%`} />
          <KPI
            icon={<Smartphone className="h-4 w-4" />}
            label="Identified Users"
            value={data.identified.length.toLocaleString()}
          />
        </section>

        {/* Traffic over time */}
        <Panel title="Traffic — Last 30 days">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.trafficSeries}>
                <defs>
                  <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity={0.7} />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" tick={{ fill: "#999", fontSize: 11 }} tickFormatter={(d) => d.slice(5)} />
                <YAxis tick={{ fill: "#999", fontSize: 11 }} allowDecimals={false} />
                <Tooltip contentStyle={{ background: "#0a0a0a", border: "1px solid #222", borderRadius: 8 }} />
                <Area type="monotone" dataKey="count" stroke="#ef4444" strokeWidth={2} fill="url(#g)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <div className="grid gap-6 lg:grid-cols-2">
          <Panel title="Devices">
            <ChartPie data={data.devices} />
          </Panel>
          <Panel title="Operating Systems">
            <ChartPie data={data.osBreakdown} />
          </Panel>
          <Panel title="Browsers">
            <ChartBar data={data.browsers} />
          </Panel>
          <Panel title="Traffic Sources">
            <ChartBar data={data.sources} />
          </Panel>
        </div>

        <Panel title="Top Countries">
          <ChartBar data={data.countries.sort((a, b) => b.value - a.value).slice(0, 10)} horizontal />
        </Panel>

        {/* Identified visitors */}
        <Panel title="Identified Visitors">
          {data.identified.length === 0 ? (
            <p className="text-sm text-white/50">No visitors have signed in with an account yet.</p>
          ) : (
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
                  {data.identified.map((u) => (
                    <tr key={u.email} className="border-t border-white/5">
                      <td className="py-2 pr-3">{u.name || "—"}</td>
                      <td className="py-2 pr-3 text-white/80">{u.email}</td>
                      <td className="py-2 pr-3">{u.sessions}</td>
                      <td className="py-2 pr-3 text-white/70">
                        {[u.city, u.country].filter(Boolean).join(", ") || "—"}
                      </td>
                      <td className="py-2 pr-3 text-white/60">
                        {new Date(u.last_seen).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Panel>

        {/* Recent visits */}
        <Panel title="Recent Visits">
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
                {data.recentVisits.map((v) => (
                  <tr key={v.id} className="border-t border-white/5">
                    <td className="py-2 pr-3 text-white/70">
                      {new Date(v.last_seen).toLocaleString()}
                    </td>
                    <td className="py-2 pr-3">
                      {[v.city, v.region, v.country].filter(Boolean).join(", ") || "—"}
                    </td>
                    <td className="py-2 pr-3">{v.device_type || "—"}</td>
                    <td className="py-2 pr-3 text-white/70">
                      {[v.os, v.browser].filter(Boolean).join(" / ") || "—"}
                    </td>
                    <td className="py-2 pr-3">
                      <div>{v.referrer_source || "—"}</div>
                      {v.referrer_url ? <div className="max-w-48 truncate text-xs text-white/40">{v.referrer_url}</div> : null}
                    </td>
                    <td className="py-2 pr-3">{v.pages_viewed}</td>
                    <td className="py-2 pr-3 text-white/70">{formatDuration(v.duration_seconds)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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

function KPI({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-white/50">
        {icon}
        {label}
      </div>
      <div className="mt-2 text-2xl font-semibold tracking-tight">{value}</div>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
      <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-white/70">{title}</h2>
      {children}
    </section>
  );
}

function ChartPie({ data }: { data: { name: string; value: number }[] }) {
  if (!data.length) return <Empty />;
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" innerRadius={45} outerRadius={85} paddingAngle={2}>
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="#000" />
            ))}
          </Pie>
          <Tooltip contentStyle={{ background: "#0a0a0a", border: "1px solid #222", borderRadius: 8 }} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

function ChartBar({
  data,
  horizontal,
}: {
  data: { name: string; value: number }[];
  horizontal?: boolean;
}) {
  if (!data.length) return <Empty />;
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout={horizontal ? "vertical" : "horizontal"}>
          {horizontal ? (
            <>
              <XAxis type="number" tick={{ fill: "#999", fontSize: 11 }} allowDecimals={false} />
              <YAxis type="category" dataKey="name" tick={{ fill: "#999", fontSize: 11 }} width={100} />
            </>
          ) : (
            <>
              <XAxis dataKey="name" tick={{ fill: "#999", fontSize: 11 }} />
              <YAxis tick={{ fill: "#999", fontSize: 11 }} allowDecimals={false} />
            </>
          )}
          <Tooltip contentStyle={{ background: "#0a0a0a", border: "1px solid #222", borderRadius: 8 }} />
          <Bar dataKey="value" fill="#ef4444" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function Empty() {
  return (
    <div className="flex h-48 items-center justify-center text-sm text-white/40">No data yet.</div>
  );
}
