import { createFileRoute, useNavigate, redirect, isRedirect } from "@tanstack/react-router";
import { useState } from "react";
import { Lock, User as UserIcon, Loader2 } from "lucide-react";
import { adminLogin, adminCheck } from "@/lib/admin-auth.functions";

export const Route = createFileRoute("/admin/login")({
  ssr: false,
  beforeLoad: async () => {
    try {
      const res = await adminCheck();
      if (res.isAdmin) throw redirect({ to: "/admin/dashboard" });
    } catch (e) {
      if (isRedirect(e)) throw e;
    }
  },
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await adminLogin({ data: { username, password } });
      if (res.ok) {
        await navigate({ to: "/admin/dashboard" });
      } else {
        setError("Invalid username or password.");
      }
    } catch {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4">
      <div className="absolute inset-0 -z-0 bg-[radial-gradient(circle_at_30%_20%,rgba(220,38,38,0.15),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.10),transparent_50%)]" />
      <div className="relative z-10 w-full max-w-sm rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl shadow-2xl">
        <form onSubmit={onSubmit} className="space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-xs uppercase tracking-wider text-white/60">
              Username
            </span>
            <div className="relative">
              <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-black/40 py-2.5 pl-10 pr-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-white/30"
                placeholder="username"
              />
            </div>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs uppercase tracking-wider text-white/60">
              Password
            </span>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
              <input
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-black/40 py-2.5 pl-10 pr-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-white/30"
                placeholder="••••••••"
              />
            </div>
          </label>

          {error && (
            <div
              role="alert"
              className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-300"
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-white py-2.5 text-sm font-medium text-black transition hover:bg-white/90 disabled:opacity-60"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {loading ? "Signing in…" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
