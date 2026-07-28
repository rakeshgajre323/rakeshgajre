import { memo } from "react";
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,


  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = [
  "#ef4444",
  "#f59e0b",
  "#10b981",
  "#3b82f6",
  "#a855f7",
  "#ec4899",
  "#14b8a6",
  "#f97316",
];

const TOOLTIP_STYLE = {
  background: "#0a0a0a",
  border: "1px solid #222",
  borderRadius: 8,
} as const;

const AXIS_TICK = { fill: "#999", fontSize: 11 } as const;

function Empty() {
  return (
    <div className="flex h-48 items-center justify-center text-sm text-white/40">No data yet.</div>
  );
}

export const ChartArea = memo(function ChartArea({
  data,
}: {
  data: { date: string; count: number }[];
}) {
  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ef4444" stopOpacity={0.7} />
              <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" tick={AXIS_TICK} tickFormatter={(d: string) => d.slice(5)} />
          <YAxis tick={AXIS_TICK} allowDecimals={false} />
          <Tooltip contentStyle={TOOLTIP_STYLE} />
          <Area
            type="monotone"
            dataKey="count"
            stroke="#ef4444"
            strokeWidth={2}
            fill="url(#g)"
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
});

export const ChartPie = memo(function ChartPie({
  data,
}: {
  data: { name: string; value: number }[];
}) {
  if (!data.length) return <Empty />;
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={45}
            outerRadius={85}
            paddingAngle={2}
            isAnimationActive={false}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="#000" />
            ))}
          </Pie>
          <Tooltip contentStyle={TOOLTIP_STYLE} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
});

// Lightweight CSS bar list — renders instantly, no SVG layout pass.
export const ChartBar = memo(function ChartBar({
  data,
}: {
  data: { name: string; value: number }[];
  horizontal?: boolean;
}) {
  if (!data.length) return <Empty />;
  const max = Math.max(...data.map((d) => d.value), 1);
  const total = data.reduce((a, b) => a + b.value, 0) || 1;
  return (
    <div className="space-y-3 py-1">
      {data.map((d, i) => (
        <div key={d.name}>
          <div className="mb-1 flex items-baseline justify-between text-xs">
            <span className="text-white/70">{d.name}</span>
            <span className="tabular-nums text-white/50">
              {d.value} · {((d.value / total) * 100).toFixed(0)}%
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/5">
            <div
              className="h-full rounded-full transition-[width] duration-500"
              style={{
                width: `${(d.value / max) * 100}%`,
                backgroundColor: COLORS[i % COLORS.length],
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
});

